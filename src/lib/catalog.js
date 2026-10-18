// Metadata tampilan saja. Modul ini tidak memuat soal atau kunci jawaban.
export const avatars = [
  { id: 'fox', emoji: '🦊', label: 'Rubah penasaran' },
  { id: 'panda', emoji: '🐼', label: 'Panda penyabar' },
  { id: 'rabbit', emoji: '🐰', label: 'Kelinci ceria' },
  { id: 'tiger', emoji: '🐯', label: 'Harimau pemberani' },
]
export const subjectAppearance = {
  matematika: { icon: 'calculator', color: 'mint', island: 'Pulau Angka' },
  'bahasa-indonesia': { icon: 'book', color: 'peach', island: 'Hutan Cerita' },
  ipas: { icon: 'leaf', color: 'lime', island: 'Kebun Penemuan' },
  pancasila: { icon: 'heart', color: 'pink', island: 'Desa Sahabat' },
  'bahasa-inggris': { icon: 'globe', color: 'blue', island: 'Teluk Bahasa' },
  'seni-budaya': { icon: 'palette', color: 'lavender', island: 'Bukit Kreasi' },
}
export const decorateSubject = (subject) => ({
  icon: 'book',
  color: 'mint',
  island: subject.name,
  ...subjectAppearance[subject.slug],
  ...subject,
})
