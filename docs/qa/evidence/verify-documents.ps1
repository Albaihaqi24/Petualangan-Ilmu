# Read-only check of case numbering and relative Markdown links.
# Run from any working directory: powershell -File <path-to-this-script>
$qaDocs = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$qaFailures = @()
foreach ($qaDoc in (Get-ChildItem -LiteralPath $qaDocs -Filter '*.md' -File)) {
    $qaText = Get-Content -LiteralPath $qaDoc.FullName -Raw -Encoding UTF8
    foreach ($qaLink in [regex]::Matches($qaText, '\]\(([^)]+)\)')) {
        $qaTarget = $qaLink.Groups[1].Value
        if ($qaTarget -match '^(https?://|#)') { continue }
        $qaResolved = [IO.Path]::GetFullPath((Join-Path $qaDoc.DirectoryName $qaTarget))
        if (-not (Test-Path -LiteralPath $qaResolved)) {
            $qaFailures += ($qaDoc.Name + ': missing ' + $qaTarget)
        }
    }
}
foreach ($qaSpec in @(
    @{ File = 'BLACKBOX.md'; Prefix = 'BB'; Count = 116; Digits = 3 },
    @{ File = 'WHITEBOX.md'; Prefix = 'WB'; Count = 36; Digits = 2 }
)) {
    $qaText = Get-Content -LiteralPath (Join-Path $qaDocs $qaSpec.File) -Raw -Encoding UTF8
    $qaPattern = '(?m)^\| (' + $qaSpec.Prefix + '-\d{' + $qaSpec.Digits + '}) \|'
    $qaIds = @([regex]::Matches($qaText, $qaPattern) | ForEach-Object { $_.Groups[1].Value })
    if ($qaIds.Count -ne $qaSpec.Count) { $qaFailures += ($qaSpec.File + ': unexpected row count') }
    for ($qaIndex = 1; $qaIndex -le $qaSpec.Count; $qaIndex++) {
        $qaExpected = $qaSpec.Prefix + '-' + $qaIndex.ToString('D' + $qaSpec.Digits)
        if (@($qaIds | Where-Object { $_ -eq $qaExpected }).Count -ne 1) {
            $qaFailures += ('Missing or duplicate case: ' + $qaExpected)
        }
    }
    Write-Output ($qaSpec.File + ': ' + $qaIds.Count + ' cases')
}
if ($qaFailures.Count -gt 0) {
    $qaFailures | Write-Output
    exit 1
}
Write-Output 'All case IDs are unique and continuous; all relative Markdown links exist.'
exit 0
