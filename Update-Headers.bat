@echo off
echo.
echo ========================================
echo   Webly Industries - Header Updater
echo ========================================
echo.
echo This script will update all sublink pages
echo with the standardized header template.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
echo.
echo Starting header update process...
echo.

node update-headers.js

echo.
echo ========================================
echo   Header Update Complete!
echo ========================================
echo.
echo All sublink pages have been updated with
echo the standardized header template.
echo.
echo Backup files have been created for safety.
echo.
pause
