@echo off
echo.
echo ========================================
echo   Webly Industries - Pricing Layout
echo ========================================
echo.
echo This script will update all sublink pages
echo to display pricing plans in a single
echo horizontal row with smooth scrolling.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause >nul
echo.
echo Starting pricing layout update process...
echo.

node update-pricing-layout.js

echo.
echo ========================================
echo   Pricing Layout Update Complete!
echo ========================================
echo.
echo All sublink pages now display pricing
echo plans in a single horizontal row.
echo.
echo Features:
echo - Horizontal scrolling on desktop
echo - Responsive design for mobile
echo - Smooth scrollbar styling
echo - Consistent card sizing
echo.
pause
