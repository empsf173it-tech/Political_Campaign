$files = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -notmatch 'dashboard.html' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Update Login button in navbar
    $content = $content -replace 'd-none d-sm-inline-flex ms-2">Login', 'd-none d-lg-inline-flex ms-2">Login'

    # 2. Update offcanvas classes
    $content = $content -replace '<div class="offcanvas offcanvas-end".*?>', '<div class="offcanvas offcanvas-end bg-section-var2 text-white" tabindex="-1" id="mobileOffcanvas">'

    # 3. Update btn-close
    $content = $content -replace 'class="btn-close"', 'class="btn-close btn-close-white"'

    # 4. Update offcanvas menu items
    $oldUL = '(?s)<ul class="nav flex-column gap-2">.*?</ul>'
    $newUL = '<ul class="nav flex-column gap-2">
        <li class="nav-item"><a class="nav-link text-white" href="index.html">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="about.html">About</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="services.html">Services</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="gallery.html">Gallery</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="contact.html">Contact</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="dashboard.html">Dashboard</a></li>
      </ul>'
    $content = [regex]::Replace($content, $oldUL, $newUL)

    Set-Content -Path $file.FullName -Value $content -NoNewline
}
