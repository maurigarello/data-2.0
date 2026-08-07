@echo off
REM Reemplaza TU_USUARIO por tu usuario de GitHub y ejecuta este archivo en la carpeta del proyecto

git init
git add .
git commit -m "Consumo Data 2.0 - dashboard inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/CONSUMO-DATA.git
git push -u origin main

echo.
echo Proyecto listo para subir a GitHub.
echo Reemplaza TU_USUARIO en este archivo antes de ejecutarlo.
