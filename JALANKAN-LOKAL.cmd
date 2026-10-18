@echo off
setlocal
cd /d "%~dp0"
set "PI_DEV_PORT=5173"
if not "%~1"=="" set "PI_DEV_PORT=%~1"
if not exist "node_modules\vite\bin\vite.js" (
  echo Dependensi belum terpasang. Jalankan npm ci di folder proyek ini.
  pause
  exit /b 1
)
echo Membuka server Petualangan Ilmu di http://127.0.0.1:%PI_DEV_PORT%
echo Jika port sedang dipakai, jalankan JALANKAN-LOKAL.cmd 5174
echo Tekan Ctrl+C untuk menghentikan server ini.
where node >nul 2>nul
if not errorlevel 1 (
  node node_modules\vite\bin\vite.js --host 127.0.0.1 --port "%PI_DEV_PORT%" --strictPort
) else (
  if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
    "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" node_modules\vite\bin\vite.js --host 127.0.0.1 --port "%PI_DEV_PORT%" --strictPort
  ) else (
    echo Node.js tidak ditemukan. Instal Node.js 22.12 atau lebih baru.
  )
)
pause
