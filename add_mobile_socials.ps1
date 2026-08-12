$files = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -notmatch 'dashboard.html' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # The string to find (the login button in the offcanvas menu)
    $find = '<a href="login.html" class="btn btn-primary-custom">Login</a>'
    
    # The replacement string (adds margin to login button, and injects social icons)
    $replace = '<a href="login.html" class="btn btn-primary-custom mb-3">Login</a>
        <div class="social-icons justify-content-center mt-2 mb-3">
          <a href="#" class="social-icon-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="social-icon-btn" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
          <a href="#" class="social-icon-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="social-icon-btn" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        </div>'

    $content = $content -replace [regex]::Escape($find), $replace

    Set-Content -Path $file.FullName -Value $content -NoNewline
}
