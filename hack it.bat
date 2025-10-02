@echo off
setlocal enabledelayedexpansion

:: Ask user for inputs
set /p classID=Enter Course Class ID: 
set /p phpsessid=Enter PHPSESSID: 
set /p skillshare_user=Enter skillshare_user_: 

:: Run Node.js script with arguments
node index.js "!classID!" "!phpsessid!" "!skillshare_user!"

pause
