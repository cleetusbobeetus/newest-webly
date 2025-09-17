@echo off
echo.
echo ========================================
echo   Webly Industries
echo   Industry-Leading Website Launcher
echo ========================================
echo.
echo Starting your advanced website...
echo.

REM Get the directory where this batch file is located
set "WEBSITE_DIR=%~dp0"

REM Open the website in the default browser
start "" "%WEBSITE_DIR%index.html"

echo Website launched successfully!
echo.
echo Features available:
echo - 3D WebGL Graphics
echo - AI-Powered Chat
echo - Advanced Animations
echo - Mobile-Responsive Design
echo - PWA Capabilities
echo.
echo Press any key to exit...
pause >nul
