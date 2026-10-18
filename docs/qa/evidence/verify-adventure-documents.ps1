# Read-only verification of exported chapter links and local SVG syntax.
$qaRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
$qaBase = Join-Path $qaRoot 'docs/materi/paket-72-bab'
$qaFailures = @()
$qaDocs = @(Get-ChildItem -LiteralPath $qaBase -Filter '*.md' -File -Recurse)
foreach ($qaDoc in $qaDocs) {
    $qaText = Get-Content -LiteralPath $qaDoc.FullName -Raw -Encoding UTF8
    foreach ($qaLink in [regex]::Matches($qaText, '\]\(([^)]+)\)')) {
        $qaTarget = $qaLink.Groups[1].Value
        if ($qaTarget -match '^(https?://|#)') { continue }
        $qaResolved = [IO.Path]::GetFullPath((Join-Path $qaDoc.DirectoryName $qaTarget))
        if (-not (Test-Path -LiteralPath $qaResolved)) { $qaFailures += ($qaDoc.FullName + ': ' + $qaTarget) }
    }
}
$qaSvg = @(Get-ChildItem -LiteralPath (Join-Path $qaRoot 'public/assets') -Filter 'petualangan-*.svg' -File)
foreach ($qaImage in $qaSvg) {
    try { $qaXml = [xml](Get-Content -LiteralPath $qaImage.FullName -Raw -Encoding UTF8) }
    catch { $qaFailures += ($qaImage.Name + ': XML invalid') }
}
Write-Output ('Markdown files: ' + $qaDocs.Count)
Write-Output ('Local SVG diagrams: ' + $qaSvg.Count)
if ($qaDocs.Count -ne 74) { $qaFailures += 'Expected 72 chapters + index + quiz guide.' }
if ($qaSvg.Count -ne 4) { $qaFailures += 'Expected four SVG diagrams.' }
if ($qaFailures.Count -gt 0) { $qaFailures | Write-Output; exit 1 }
Write-Output 'All local links exist and SVG files parse as XML. Visual browser QA not implied.'
exit 0
