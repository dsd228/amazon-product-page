$content = Get-Content index.html -Raw
$start = $content.IndexOf('<!-- MI PROCESO DE DISEÑO -->')
$end = $content.IndexOf('<section id="proceso"', $start)

if ($start -gt 0 -and $end -gt 0) {
  $before = $content.Substring(0, $start)
  $after = $content.Substring($end)
  $new = $before + '<!-- MI PROCESO DE DISEÑO -->' + [Environment]::NewLine + '    ' + $after
  $new | Set-Content index.html
  Write-Host 'Duplicates removed successfully'
} else {
  Write-Host 'Pattern not found'
}
