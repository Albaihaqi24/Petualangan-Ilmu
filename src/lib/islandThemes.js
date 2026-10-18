const themes = {
  matematika: {
    id: 'numeria',
    name: 'Pulau Numeria',
    character: 'rubi',
    gradient: 'from-orange-400 to-amber-300',
    symbol: '123',
  },
  'bahasa-indonesia': {
    id: 'kata',
    name: 'Pulau Kata',
    character: 'bobo',
    gradient: 'from-sky-400 to-indigo-300',
    symbol: 'Aa',
  },
  ipa: {
    id: 'eksplora',
    name: 'Pulau Eksplora',
    character: 'tobi',
    gradient: 'from-emerald-400 to-teal-300',
    symbol: '✿',
  },
}
export function islandTheme(subject = '') {
  return (
    themes[subject === 'ipas' ? 'ipa' : subject] || {
      id: 'adventure',
      name: '',
      character: 'piko',
      gradient: 'from-violet-400 to-fuchsia-300',
      symbol: '✦',
    }
  )
}

export const characterNames = {
  rubi: 'Kapten Rubi',
  bobo: 'Detektif Bobo',
  tobi: 'Ilmuwan Tobi',
  kiki: 'Kiki si Kelinci Cepat',
  momo: 'Momo si Panda Periang',
  piko: 'Piko si Pinguin Penjelajah',
}
