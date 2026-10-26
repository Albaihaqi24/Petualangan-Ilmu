import { useId, useState } from 'react'
import { PlayCircle } from 'lucide-react'
import { safeImageUrl, youtubeEmbedUrl } from '../../lib/learning'
import { materialBlocks } from '../../lib/materialBlocks'
import { Button, Notice } from './Primitives'
import ComicStoryReader from '../adventure/ComicStoryReader'
import CharacterAvatar from '../adventure/CharacterAvatar'

export default function MaterialRenderer({ content, character: characterProp }) {
  const [loadVideo, setLoadVideo] = useState(false)
  const [fullStory, setFullStory] = useState(false)
  const transcriptId = useId()
  const hasStory = Array.isArray(content.scenes) && content.scenes.length > 0
  const character =
    characterProp ||
    content.character ||
    (String(content.mentor).includes('Bobo')
      ? 'bobo'
      : String(content.mentor).includes('Tobi')
        ? 'tobi'
        : 'rubi')
  const embedUrl = youtubeEmbedUrl(content.video_url)
  const blocks = materialBlocks(content)
  const introduction = [
    {
      type: 'dialog',
      speaker: 'Teman petualanganmu',
      emotion: 'senang',
      text: content.summary || 'Ayo, temukan sesuatu yang menarik hari ini!',
    },
    {
      type: 'dialog',
      speaker: 'Kiki',
      character: 'kiki',
      emotion: 'berpikir',
      text:
        blocks.find((block) => block.type === 'tip')?.body ||
        'Baca satu bagian dulu. Bayangkan contohnya, lalu ceritakan kembali dengan kata-katamu sendiri. Kita belajar selangkah demi selangkah!',
    },
  ]
  const headings = blocks
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => typeof block.heading === 'string' && block.heading.trim())
  return (
    <div className="material-content">
      {content.editorial_notice && <Notice>{content.editorial_notice}</Notice>}
      <ComicStoryReader
        scenes={hasStory ? content.scenes : introduction}
        character={character}
        compact={!hasStory}
      />
      {!hasStory && headings.length > 0 && (
        <nav className="panel chapter-contents" aria-label="Isi bab">
          <h2>Isi bab ini</h2>
          <ol>
            {headings.map(({ block, index }) => (
              <li key={index}>
                <a href={`#material-section-${index}`}>{block.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {hasStory && (
        <button
          type="button"
          className="story-transcript-button"
          aria-expanded={fullStory}
          aria-controls={transcriptId}
          onClick={() => setFullStory((value) => !value)}
        >
          {fullStory ? 'Tutup bacaan lengkap' : 'Baca seluruh cerita sekaligus'}
        </button>
      )}
      <div id={transcriptId} hidden={hasStory && !fullStory}>
        {blocks.map((block, index) => {
          if (block.type === 'text' && typeof block.heading === 'string' && block.heading.trim()) {
            if (block.collapsible === true)
              return (
                <details
                  className="material-section panel"
                  id={`material-section-${index}`}
                  key={index}
                >
                  <summary>{block.heading}</summary>
                  <p>{block.body}</p>
                </details>
              )
            return (
              <section
                className="material-section"
                id={`material-section-${index}`}
                aria-labelledby={`material-heading-${index}`}
                key={index}
              >
                <h2 id={`material-heading-${index}`}>{block.heading}</h2>
                <p>{block.body}</p>
              </section>
            )
          }
          if (block.type === 'text') return <p key={index}>{block.body}</p>
          if (block.type === 'tip')
            return (
              <aside className="material-tip" key={index}>
                <CharacterAvatar character="kiki" emotion="berpikir" size={64} decorative />
                <div>
                  <h3>Tips cepat dari Kiki</h3>
                  <p>{block.body}</p>
                </div>
              </aside>
            )
          if (block.type === 'image') {
            const url = safeImageUrl(block.url)
            return url ? (
              <figure key={index}>
                <img src={url} alt={block.caption || 'Ilustrasi materi'} loading="lazy" />
                <figcaption>{block.caption}</figcaption>
              </figure>
            ) : (
              <Notice key={index}>Ilustrasi ini belum tersedia.</Notice>
            )
          }
          return null
        })}
      </div>
      {embedUrl && (
        <section className="video-section">
          <h2>Tonton dan amati</h2>
          {loadVideo ? (
            <iframe
              src={embedUrl}
              title="Video pendamping materi"
              className="lesson-video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="video-placeholder">
              <PlayCircle size={35} />
              <p>
                Video opsional dari YouTube. Memutarnya akan menghubungkan browser ke YouTube dan
                menggunakan kuota internet.
              </p>
              <Button variant="secondary" onClick={() => setLoadVideo(true)}>
                Muat video
              </Button>
            </div>
          )}
        </section>
      )}
      {content.video_url && !embedUrl && (
        <Notice>Tautan video belum sesuai format YouTube yang diizinkan.</Notice>
      )}
      {Array.isArray(content.source_refs) && (
        <section className="panel">
          <h2>Rujukan pendamping</h2>
          <p className="small muted">
            Tautan berikut untuk memperluas bacaan. Materi ini disusun orisinal, bukan salinan
            halaman buku.
          </p>
          <ul>
            {content.source_refs
              .filter((ref) => ref && typeof ref.title === 'string' && sourceUrl(ref.url))
              .map((ref, i) => (
                <li key={i}>
                  <a href={sourceUrl(ref.url)} target="_blank" rel="noopener noreferrer">
                    {ref.title}
                  </a>
                  {ref.audience === 'teacher' ? ' · panduan guru' : ''}
                </li>
              ))}
          </ul>
          {content.curriculum_note && <p className="small muted">{content.curriculum_note}</p>}
        </section>
      )}
    </div>
  )
}
function sourceUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.href : null
  } catch {
    return null
  }
}
