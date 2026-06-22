@echo off
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -Sta -File "%~dp0pilot\scripts\open-app.ps1"
