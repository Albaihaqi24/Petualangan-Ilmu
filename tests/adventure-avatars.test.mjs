import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { PGlite } from '@electric-sql/pglite'

test('Migration avatar: profil lama tetap, Kiki/Momo/Piko tersimpan, registrasi tetap student tanpa XP', async (t) => {
  const db = new PGlite()
  t.after(() => db.close())
  await db.exec(`create role anon; create role authenticated; create schema auth;
    create table auth.users(id uuid primary key, raw_user_meta_data jsonb default '{}');
    create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
    grant usage on schema public,auth to anon,authenticated;`)
  await db.exec(
    await readFile(
      new URL('../database/migrations/202610160001_initial_schema.sql', import.meta.url),
      'utf8',
    ),
  )
  const original = randomUUID()
  await db.query('insert into auth.users(id) values($1)', [original])
  const migration = await readFile(
    new URL('../database/migrations/202610180005_adventure_avatars.sql', import.meta.url),
    'utf8',
  )
  await db.exec(migration)
  await db.exec(migration)
  assert.equal(
    (await db.query('select avatar from public.profiles where id=$1', [original])).rows[0].avatar,
    'fox',
  )
  for (const avatar of ['kiki', 'momo', 'piko']) {
    const id = randomUUID()
    await db.query('insert into auth.users(id,raw_user_meta_data) values($1,$2)', [
      id,
      { avatar, grade: 4, role: 'admin', total_xp: 9999 },
    ])
    assert.deepEqual(
      (await db.query('select avatar,grade,role,total_xp from public.profiles where id=$1', [id]))
        .rows[0],
      { avatar, grade: 4, role: 'student', total_xp: 0 },
    )
  }
  await db.exec('set role authenticated')
  await db.query("select set_config('request.jwt.claim.sub',$1,false)", [original])
  await db.query("update public.profiles set avatar='piko' where id=$1", [original])
  assert.equal(
    (await db.query('select avatar from public.profiles where id=$1', [original])).rows[0].avatar,
    'piko',
  )
  await assert.rejects(
    db.query("update public.profiles set avatar='unknown' where id=$1", [original]),
    /check constraint/,
  )
  await assert.rejects(
    db.query("update public.profiles set role='admin' where id=$1", [original]),
    /permission denied/,
  )
  await db.exec('reset role')
  assert.equal((await db.query('select count(*)::int n from public.profiles')).rows[0].n, 4)
})
