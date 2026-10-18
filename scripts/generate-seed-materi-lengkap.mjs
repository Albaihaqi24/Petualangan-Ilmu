import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { adaptiveSeedUnits } from './seed-materi-adaptif.mjs'
import { userExampleRevisions } from './seed-materi-contoh-pengguna.mjs'
import { adventureDrafts } from '../src/content/adventure/index.js'
import { seedId } from './generate-database-seed.mjs'

const subjects = [
  {
    slug: 'matematika',
    name: 'Matematika',
    island: 'Pulau Numeria',
    mascot: 'Kapten Rubi',
    character: 'rubi',
  },
  {
    slug: 'bahasa-indonesia',
    name: 'Bahasa Indonesia',
    island: 'Pulau Kata',
    mascot: 'Bobo',
    character: 'bobo',
  },
  { slug: 'ipa', name: 'IPA', island: 'Pulau Eksplora', mascot: 'Ilmuwan Tobi', character: 'tobi' },
]
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`
const json = (value) => `${quote(JSON.stringify(value))}::jsonb`

export function completeSeedData() {
  const lessons = adaptiveSeedUnits.map((unit) => {
    const subject = subjects.find((s) => s.slug === unit.subject)
    const base = adventureDrafts.find(
      ({ course, chapter }) =>
        course.subject === (unit.subject === 'ipa' ? 'ipas' : unit.subject) &&
        course.grade === unit.grade &&
        chapter.order === unit.chapter,
    )
    if (!base || !subject || unit.medium.length !== 2 || unit.hard.length !== 2)
      throw new Error('Naskah seed belum lengkap')
    const slug = `komik-${unit.subject}-kelas-${unit.grade}-bab-${unit.chapter}`
    const revision = userExampleRevisions[slug]
    const dialog = (text, stage = 'abstract', emotion = 'berpikir') => ({
      type: 'dialog',
      speaker: subject.mascot,
      emotion,
      stage,
      text,
    })
    const panel = (caption) => ({
      type: 'comic_panel',
      stage: 'representational',
      image_url: '/images/lessons/default-illustration.webp',
      caption,
    })
    // Formative mini-check berbeda dari dua soal easy dan empat butir baru bank.
    const miniSource = revision?.mini || base.draft.quiz[4]
    const miniOptions = [miniSource.wrong[0], miniSource.wrong[1]]
    const miniCorrect = (unit.grade + unit.chapter) % 3
    miniOptions.splice(miniCorrect, 0, miniSource.answer)
    const scenes = [
      dialog(revision?.opening || unit.opening, 'concrete', 'kaget'),
      panel(revision?.visual || unit.visual),
      ...(revision?.sections || base.draft.sections).flatMap((part) => [
        dialog(`${part.heading}. ${part.body}`),
        panel(part.example),
      ]),
      {
        type: 'mini_check',
        stage: 'abstract',
        question: miniSource.prompt,
        options: miniOptions,
        correct_index: miniCorrect,
        feedback: `Hebat, kamu sudah mencoba! ${miniSource.explanation}`,
      },
      dialog(
        `${revision?.recap || base.draft.recap} Ayo terapkan: ${revision?.activity || base.draft.activity}`,
        'abstract',
        'senang',
      ),
    ]
    const raw = [
      ...(revision?.easy || base.draft.quiz.slice(0, 2)).map((q) => ({ ...q, difficulty: 'easy' })),
      ...(revision?.medium || unit.medium).map((q) => ({ ...q, difficulty: 'medium' })),
      ...(revision?.hard || unit.hard).map((q) => ({ ...q, difficulty: 'hard' })),
    ]
    const questions = raw.map((q, index) => {
      const correct = (unit.grade + unit.chapter + index) % 4
      const options = [...q.wrong]
      options.splice(correct, 0, q.answer)
      if (options.length !== 4 || new Set(options.map((v) => v.trim().toLowerCase())).size !== 4)
        throw new Error(`Opsi tidak unik: ${slug}/${index}`)
      return {
        id: seedId(`${slug}-q${index + 1}`),
        prompt: q.prompt,
        options,
        correct_option: correct,
        explanation: q.explanation,
        difficulty: q.difficulty,
        status: 'published',
      }
    })
    return {
      id: seedId(slug),
      subject: subject.slug,
      title: revision?.title || base.chapter.title,
      slug,
      grade: unit.grade,
      phase: base.course.phase,
      chapter: `Komik · Bab ${unit.chapter}`,
      difficulty: unit.grade <= 2 ? 'dasar' : 'sedang',
      status: 'published',
      duration: base.lesson.duration,
      content: {
        character: subject.character,
        summary: revision?.summary || base.lesson.content.summary,
        video_url: '',
        scenes,
        // Validator lama memerlukan array; teks hanya disimpan sekali dalam scenes.
        // Aplikasi membentuk blok bacaan saat ditampilkan, bukan menyimpannya lagi.
        blocks: [],
        ...(revision
          ? {
              source_example: {
                slug: revision.source_example.slug,
                source_title: revision.source_example.source_title,
              },
            }
          : {}),
        package_id: 'seed-materi-lengkap-cra-v1',
        enrichment: unit.subject === 'ipa' && unit.grade <= 2,
        review_status: 'needs_teacher_review',
        curriculum_note:
          unit.subject === 'ipa' && unit.grade <= 2
            ? 'Pengayaan sains Fase A; perlu review guru.'
            : 'Cakupan aplikasi, bukan daftar isi resmi nasional; perlu review guru.',
        source_refs: base.lesson.content.source_refs.map(({ title, url }) => ({ title, url })),
      },
      questions,
    }
  })
  if (lessons.length !== 36 || new Set(lessons.map((l) => l.slug)).size !== 36)
    throw new Error('Harus ada 36 materi unik')
  for (const s of subjects)
    for (let grade = 1; grade <= 6; grade++)
      if (lessons.filter((l) => l.subject === s.slug && l.grade === grade).length !== 2)
        throw new Error('Cakupan kelas/pelajaran tidak lengkap')
  return { subjects, lessons }
}

const compatibilitySql = `-- Penyesuaian minimal untuk skema Petualangan Ilmu yang sudah memiliki migration 001-004.
-- Tidak menghapus mata pelajaran/materi lain; slug ipa ditambahkan tanpa mengganti ipas.
DO $compat$
BEGIN
  IF to_regclass('public.subjects') IS NULL OR to_regclass('public.lessons') IS NULL
     OR to_regclass('public.questions') IS NULL OR to_regclass('private.question_keys') IS NULL THEN
    RAISE EXCEPTION 'Pasang migration Petualangan Ilmu 001-004 sebelum menjalankan seed_materi_lengkap.sql';
  END IF;
END $compat$;

ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS island text;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS mascot text;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS character text;

-- Constraint slug global yang sudah ada tetap dipertahankan.
CREATE UNIQUE INDEX IF NOT EXISTS lessons_subject_grade_slug_seed_lengkap_uidx
  ON public.lessons(subject_id, grade, slug);

ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS correct_option smallint;
ALTER TABLE public.questions ADD COLUMN IF NOT EXISTS explanation text;
DO $checks$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.questions'::regclass AND conname='questions_seed_correct_option_check') THEN
    ALTER TABLE public.questions ADD CONSTRAINT questions_seed_correct_option_check CHECK (correct_option BETWEEN 0 AND 3);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='public.questions'::regclass AND conname='questions_seed_explanation_check') THEN
    ALTER TABLE public.questions ADD CONSTRAINT questions_seed_explanation_check CHECK (explanation IS NULL OR length(btrim(explanation)) BETWEEN 1 AND 3000);
  END IF;
END $checks$;
-- Tetap menerima label lama agar editor/RPC yang sudah ada tidak rusak.
ALTER TABLE public.questions DROP CONSTRAINT IF EXISTS questions_difficulty_check;
ALTER TABLE public.questions ADD CONSTRAINT questions_difficulty_check
  CHECK (difficulty IN ('dasar','sedang','lanjut','easy','medium','hard'));

-- Kolom kunci diminta pada public.questions, tetapi bukan untuk SELECT klien.
-- Editor berizin tetap mendapatkan kunci melalui RPC security-definer yang sudah ada.
REVOKE SELECT ON public.questions FROM PUBLIC, anon, authenticated;
REVOKE SELECT (correct_option, explanation) ON public.questions FROM PUBLIC, anon, authenticated;
GRANT SELECT (id,lesson_id,author_id,prompt,options,difficulty,status) ON public.questions TO authenticated;

-- private.question_keys tetap sumber otoritatif penilaian/snapshot RPC.
-- Mirror disinkronkan juga saat editor mengubah kunci setelah seed dipasang.
CREATE OR REPLACE FUNCTION private.sync_seed_question_key_columns() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $mirror$
BEGIN
  IF TG_OP = 'DELETE' THEN
    UPDATE public.questions SET correct_option=NULL, explanation=NULL WHERE id=OLD.question_id;
    RETURN OLD;
  END IF;
  UPDATE public.questions SET correct_option=NEW.correct_option, explanation=NEW.explanation
    WHERE id=NEW.question_id AND (correct_option,explanation) IS DISTINCT FROM (NEW.correct_option,NEW.explanation);
  RETURN NEW;
END $mirror$;
REVOKE ALL ON FUNCTION private.sync_seed_question_key_columns() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS sync_seed_question_key_columns ON private.question_keys;
CREATE TRIGGER sync_seed_question_key_columns AFTER INSERT OR UPDATE OR DELETE ON private.question_keys
  FOR EACH ROW EXECUTE FUNCTION private.sync_seed_question_key_columns();
`

export function generateCompleteSeedSql() {
  const data = completeSeedData()
  const sql = [
    '-- Petualangan Ilmu: 36 materi komik CRA PUBLISHED, 216 soal PUBLISHED.',
    '-- Tiap kelas 1-6 × Matematika/Bahasa Indonesia/IPA: dua bab, enam soal/bab (2 easy,2 medium,2 hard).',
    '-- Dihasilkan scripts/generate-seed-materi-lengkap.mjs; naskah orisinal, bukan daftar bab resmi nasional.',
    '-- Jalankan sebagai pemilik database pada proyek yang sudah memiliki migration 001-004.',
    '-- Status published sesuai permintaan. review_status tetap needs_teacher_review; tidak mengaku review telah selesai.',
    '-- Berkas ini menimpa isi pada slug komik milik seed ini saat dijalankan ulang (DO UPDATE).',
    '-- Tiga contoh lampiran pengguna digabung pada bab sepadan; slug/ID kanonis lama dipertahankan.',
    '-- Versi ringan: teks disimpan sekali dalam scenes; blocks kosong untuk kompatibilitas validator.',
    '-- Pasang frontend terbaru yang membentuk tampilan bacaan dari scenes.',
    '-- Upsert melewati record identik untuk mengurangi penulisan ulang/WAL.',
    '-- Asset /images/lessons/default-illustration.webp adalah path yang diminta; sediakan asetnya pada frontend.',
    '-- Bank bertingkat disiapkan; mesin pemilihan adaptif bukan bagian seed data ini.',
    'BEGIN;',
    '',
    compatibilitySql,
  ]
  for (const s of data.subjects)
    sql.push(
      `INSERT INTO public.subjects(id,name,slug,description,is_active,island,mascot,character) VALUES (${quote(seedId(s.slug))},${quote(s.name)},${quote(s.slug)},${quote(`${s.island} — bersama ${s.mascot}. Materi komik CRA kelas 1–6.`)},true,${quote(s.island)},${quote(s.mascot)},${quote(s.character)}) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name,description=EXCLUDED.description,is_active=true,island=EXCLUDED.island,mascot=EXCLUDED.mascot,character=EXCLUDED.character WHERE (subjects.name,subjects.description,subjects.is_active,subjects.island,subjects.mascot,subjects.character) IS DISTINCT FROM (EXCLUDED.name,EXCLUDED.description,true,EXCLUDED.island,EXCLUDED.mascot,EXCLUDED.character);`,
    )
  for (const l of data.lessons) {
    sql.push(
      '',
      `-- ${l.subject} | kelas ${l.grade} | ${l.chapter}: ${l.title}`,
      `INSERT INTO public.lessons(id,subject_id,title,slug,grade,phase,chapter,difficulty,status,duration,content) SELECT ${quote(l.id)},s.id,${quote(l.title)},${quote(l.slug)},${l.grade},${quote(l.phase)},${quote(l.chapter)},${quote(l.difficulty)},'published',${l.duration},${json(l.content)} FROM public.subjects s WHERE s.slug=${quote(l.subject)} ON CONFLICT (subject_id, grade, slug) DO UPDATE SET title=EXCLUDED.title,phase=EXCLUDED.phase,chapter=EXCLUDED.chapter,difficulty=EXCLUDED.difficulty,status='published',duration=EXCLUDED.duration,content=EXCLUDED.content WHERE (lessons.title,lessons.phase,lessons.chapter,lessons.difficulty,lessons.status,lessons.duration,lessons.content) IS DISTINCT FROM (EXCLUDED.title,EXCLUDED.phase,EXCLUDED.chapter,EXCLUDED.difficulty,'published',EXCLUDED.duration,EXCLUDED.content);`,
    )
    const values = l.questions
      .map(
        (q) =>
          `(${quote(q.id)}::uuid,${quote(q.prompt)},${json(q.options)},${quote(q.difficulty)},${q.correct_option}::smallint,${quote(q.explanation)})`,
      )
      .join(',\n')
    sql.push(
      `INSERT INTO public.questions(id,lesson_id,prompt,options,difficulty,status,correct_option,explanation) SELECT v.id,l.id,v.prompt,v.options,v.difficulty,'published',v.correct_option,v.explanation FROM (VALUES\n${values}\n) AS v(id,prompt,options,difficulty,correct_option,explanation) JOIN public.lessons l ON l.slug=${quote(l.slug)} AND l.grade=${l.grade} JOIN public.subjects s ON s.id=l.subject_id AND s.slug=${quote(l.subject)} ON CONFLICT (id) DO UPDATE SET lesson_id=EXCLUDED.lesson_id,prompt=EXCLUDED.prompt,options=EXCLUDED.options,difficulty=EXCLUDED.difficulty,status='published',correct_option=EXCLUDED.correct_option,explanation=EXCLUDED.explanation WHERE (questions.lesson_id,questions.prompt,questions.options,questions.difficulty,questions.status,questions.correct_option,questions.explanation) IS DISTINCT FROM (EXCLUDED.lesson_id,EXCLUDED.prompt,EXCLUDED.options,EXCLUDED.difficulty,'published',EXCLUDED.correct_option,EXCLUDED.explanation);`,
    )
  }
  // Pembahasan cukup ditulis sekali dalam SQL; kunci privat diisi dari kolom seed.
  const questionIds = data.lessons.flatMap((l) => l.questions.map((q) => quote(q.id))).join(',')
  sql.push(
    `INSERT INTO private.question_keys(question_id,correct_option,explanation) SELECT id,correct_option,explanation FROM public.questions WHERE id IN (${questionIds}) ON CONFLICT (question_id) DO UPDATE SET correct_option=EXCLUDED.correct_option,explanation=EXCLUDED.explanation WHERE (question_keys.correct_option,question_keys.explanation) IS DISTINCT FROM (EXCLUDED.correct_option,EXCLUDED.explanation);`,
  )
  sql.push(
    '',
    '-- Ringkasan ini hanya mencakup slug komik milik paket seed ini.',
    "SELECT s.slug AS subject, l.grade, count(DISTINCT l.id) AS lessons, count(q.id) AS questions FROM public.lessons l JOIN public.subjects s ON s.id=l.subject_id LEFT JOIN public.questions q ON q.lesson_id=l.id WHERE l.content->>'package_id'='seed-materi-lengkap-cra-v1' GROUP BY s.slug,l.grade ORDER BY s.slug,l.grade;",
    'COMMIT;',
    '',
  )
  return sql.join('\n')
}
if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await writeFile(
    new URL('../supabase/seed_materi_lengkap.sql', import.meta.url),
    generateCompleteSeedSql(),
    'utf8',
  )
  console.log(
    'seed_materi_lengkap.sql: 3 pelajaran, 36 materi published, 216 soal (72 easy/72 medium/72 hard).',
  )
}
