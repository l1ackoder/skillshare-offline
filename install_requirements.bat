@echo off
setlocal

echo Installing base packages from package.json...
npm install

echo Installing additional required packages...
npm install progress chalk follow-redirects cloudflare-scraper node-fetch@2

echo ✅ All packages installed successfully!

pause
