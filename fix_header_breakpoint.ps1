$files = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -notmatch 'dashboard.html' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $content = $content -replace 'class="d-none d-lg-block"', 'class="d-none d-xl-block"'
    $content = $content -replace 'd-none d-lg-inline-flex ms-2">Login', 'd-none d-xl-inline-flex ms-2">Login'
    $content = $content -replace 'navbar-toggler d-lg-none', 'navbar-toggler d-xl-none'

    Set-Content -Path $file.FullName -Value $content -NoNewline
}
