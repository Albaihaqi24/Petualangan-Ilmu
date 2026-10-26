import { useState } from 'react'
import { cpReference } from '../../lib/cpReference'
import { Notice } from './Primitives'

export default function CpReferenceDetails({ scopeIds = [], elementIds = [] }) {
  const [selectedScopeId, setSelectedScopeId] = useState('')
  const scopes = cpReference.scopes.filter(
    (scope) =>
      scopeIds.includes(scope.id) ||
      scope.elements.some((element) => elementIds.includes(element.id)),
  )
  const visibleScopes = scopes.length > 1 ? scopes.filter((s) => s.id === selectedScopeId) : scopes
  return (
    <div className="cp-reference-details">
      <p className="small">
        Keputusan {cpReference.source.metadata.nomor} · Lampiran II · acuan fase untuk pendamping.
      </p>
      {scopes.length > 1 && (
        <label className="field">
          <span>Pilih cabang seni yang digunakan sekolah</span>
          <select
            value={selectedScopeId}
            onChange={(event) => setSelectedScopeId(event.target.value)}
          >
            <option value="">Pilih satu cabang seni</option>
            {scopes.map((scope) => (
              <option key={scope.id} value={scope.id}>
                {scope.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {visibleScopes.map((scope) => (
        <section key={scope.id}>
          <h4>
            {scope.name} · Fase {scope.phase} · kelas {scope.grades.join('–')}
          </h4>
          {scope.warnings.map((warning) => (
            <Notice key={warning}>{warning}</Notice>
          ))}
          {scope.elements
            .filter((element) => !elementIds.length || elementIds.includes(element.id))
            .map((element) => (
              <details className="cp-criterion" key={element.id}>
                <summary>
                  {element.source_code}. {element.label}
                </summary>
                <p>{element.text}</p>
                {element.warnings.map((warning) => (
                  <p className="small muted" key={warning}>
                    {warning}
                  </p>
                ))}
                <a
                  href={`${cpReference.source.official_pdf_url}#page=${element.source_pdf_pages[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat PDF sumber · halaman {element.source_pdf_pages.join(', ')} ↗
                </a>
              </details>
            ))}
        </section>
      ))}
      <p className="small muted">
        Spasi dan baris dirapikan dari ekstraksi teks. Contoh visual dan gambar tetap perlu dilihat
        pada PDF asli. Membuka acuan tidak menandai bab atau CP sudah dikuasai.
      </p>
    </div>
  )
}
