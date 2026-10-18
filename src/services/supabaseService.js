import { decorateSubject } from '../lib/catalog.js'

export function createSupabaseService(client) {
  async function result(request) {
    const { data, error } = await request
    if (error) throw new Error(error.message || 'Layanan belum dapat dihubungi. Coba lagi.')
    return data
  }
  const rpc = (name, params) => result(client.rpc(name, params))
  async function loadSnapshot(user) {
    const [subjects, lessons] = await Promise.all([
      result(client.from('subjects').select('*').order('name')),
      result(client.from('lessons').select('*').order('title')),
    ])
    const state = {
      subjects: subjects.map(decorateSubject),
      lessons,
      profile: null,
      session: null,
      total_xp: 0,
      readLessonIds: [],
      attempts: [],
      classes: [],
      memberships: [],
      classMembers: [],
      assignments: [],
      submissions: [],
      importedQuestions: [],
      students: [],
      questionCount: 0,
      auditLog: [],
      deletionRequests: [],
    }
    if (!user) return state
    const profile = await result(client.from('profiles').select('*').eq('id', user.id).single())
    state.profile = profile
    state.total_xp = profile.total_xp
    state.session = { role: profile.role, display_name: profile.display_name, user_id: user.id }
    state.deletionRequests = await result(
      client.from('account_deletion_requests').select('*').eq('student_id', user.id),
    )
    if (profile.role === 'student') {
      const [events, attempts, classes, members, assignments, submissions] = await Promise.all([
        result(
          client.from('xp_events').select('event_type,reference_id').eq('student_id', user.id),
        ),
        result(
          client
            .from('quiz_attempts')
            .select('*')
            .eq('student_id', user.id)
            .not('completed_at', 'is', null)
            .order('completed_at'),
        ),
        result(client.from('classes').select('*').order('created_at')),
        result(client.from('class_members').select('*').eq('student_id', user.id)),
        result(client.from('assignments').select('*').order('due_at')),
        result(client.from('submissions').select('*').eq('student_id', user.id)),
      ])
      Object.assign(state, {
        readLessonIds: events
          .filter((e) => e.event_type === 'read_lesson')
          .map((e) => e.reference_id),
        attempts: attempts.map((a) => ({ ...a, created_at: a.completed_at })),
        classes,
        memberships: members.map((m) => m.class_id),
        classMembers: members,
        assignments,
        submissions,
      })
    } else if (profile.role === 'tutor') {
      const [classes, members, assignments, submissions] = await Promise.all([
        result(client.from('classes').select('*').eq('tutor_id', user.id).order('created_at')),
        result(client.from('class_members').select('*')),
        result(client.from('assignments').select('*').order('due_at')),
        result(client.from('submissions').select('*').order('submitted_at')),
      ])
      const rosters = await Promise.all(
        classes.map(async (c) =>
          (await rpc('get_class_students', { p_class_id: c.id })).map((s) => ({
            ...s,
            class_id: c.id,
          })),
        ),
      )
      Object.assign(state, {
        classes,
        classMembers: members,
        memberships: [...new Set(members.map((m) => m.class_id))],
        assignments,
        submissions,
        students: rosters.flat(),
      })
    } else if (profile.role === 'admin') {
      const [countResponse, auditLog, deletionRequests, profiles] = await Promise.all([
        client.from('questions').select('id', { count: 'exact', head: true }),
        rpc('get_audit_log'),
        result(client.from('account_deletion_requests').select('*').order('requested_at')),
        result(client.from('profiles').select('id,display_name,grade,role').order('display_name')),
      ])
      if (countResponse.error) throw new Error(countResponse.error.message)
      Object.assign(state, {
        questionCount: countResponse.count || 0,
        auditLog,
        deletionRequests,
        students: profiles,
      })
    }
    return state
  }
  return {
    result,
    rpc,
    loadSnapshot,
    signIn: (email, password) => result(client.auth.signInWithPassword({ email, password })),
    signUp: (email, password, profile, redirectTo) =>
      result(
        client.auth.signUp({
          email,
          password,
          options: { data: profile, emailRedirectTo: redirectTo },
        }),
      ),
    signOut: () => result(client.auth.signOut({ scope: 'local' })),
    updateProfile: (id, profile) =>
      result(
        client
          .from('profiles')
          .update({
            display_name: profile.display_name,
            grade: profile.grade,
            avatar: profile.avatar,
          })
          .eq('id', id),
      ),
    startQuiz: (lessonId) => rpc('get_lesson_quiz', { p_lesson_id: lessonId, p_limit: 10 }),
    submitQuiz: (attemptId, answers) =>
      rpc('submit_quiz_answers', { p_attempt_id: attemptId, p_answers: answers }),
    getQuizResult: (attemptId) => rpc('get_quiz_result', { p_attempt_id: attemptId }),
    completeReading: (lessonId) => rpc('complete_lesson_reading', { p_lesson_id: lessonId }),
    createClass: (name, grade) => rpc('create_class', { p_name: name, p_grade: Number(grade) }),
    async joinClass(code) {
      const data = await rpc('join_class', { p_code: code })
      if (!data.ok) throw new Error(data.message)
      return data.classroom
    },
    createAssignment: (a) =>
      rpc('create_assignment', {
        p_class_id: a.class_id,
        p_lesson_id: a.lesson_id,
        p_title: a.title,
        p_instructions: a.instructions,
        p_due_at: a.due_at,
      }),
    submitAssignment: (id, answer, filePath = null) =>
      rpc('submit_assignment', { p_assignment_id: id, p_answer: answer, p_file_path: filePath }),
    gradeSubmission: (id, score, feedback) =>
      rpc('grade_submission', {
        p_submission_id: id,
        p_score: Number(score),
        p_feedback: feedback,
      }),
    importQuestions: (items, batchId) =>
      rpc('import_questions', { p_items: items, p_batch_id: batchId }),
    saveLesson: (document, id = null) =>
      rpc('save_lesson', { p_document: document, p_lesson_id: id }),
    editorQuestions: (id) => rpc('get_editor_questions', { p_lesson_id: id }),
    saveDraftQuestion: (item) => rpc('save_draft_question', { p_item: item }),
    publishLesson: (id, publish, confirmed) =>
      rpc('publish_lesson', { p_lesson_id: id, p_publish: publish, p_review_confirmed: confirmed }),
    promoteTutor: (id) => rpc('promote_tutor', { p_user_id: id }),
    saveSubject: (s) =>
      rpc('save_subject', {
        p_name: s.name,
        p_slug: s.slug,
        p_description: s.description,
        p_is_active: s.is_active,
        p_id: s.id || null,
      }),
    requestDeletion: () => rpc('request_account_deletion'),
    resetPassword: (email, redirectTo) =>
      result(client.auth.resetPasswordForEmail(email, { redirectTo })),
    updatePassword: (password) => result(client.auth.updateUser({ password })),
    async uploadFile(userId, assignmentId, file) {
      const extensions = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp',
        'application/pdf': 'pdf',
      }
      if (!extensions[file.type] || file.size > 5 * 1024 * 1024 || file.size === 0)
        throw new Error('Gunakan JPG, PNG, WebP, atau PDF dengan ukuran maksimal 5 MB.')
      const path = `${userId}/${assignmentId}/${crypto.randomUUID()}.${extensions[file.type]}`
      await result(
        client.storage
          .from('student-submissions')
          .upload(path, file, { upsert: false, contentType: file.type }),
      )
      return path
    },
    removeFile: (path) => result(client.storage.from('student-submissions').remove([path])),
    async signedFile(path) {
      const data = await result(
        client.storage.from('student-submissions').createSignedUrl(path, 60),
      )
      return data.signedUrl
    },
  }
}
