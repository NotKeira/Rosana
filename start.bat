echo off
color 1
cls
:a
node deploy-commands.js
node .
git add *
git push
goto a