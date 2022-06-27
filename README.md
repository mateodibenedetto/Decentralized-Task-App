# Decentralized-Task-App
Decentralized Task App

Pasos para poder ejecutar la DAPP
1) Clonar el repositorio y abrirlo en Visual Studio Code
2) Abrir la consola en VScode y poner el comando npm i
3) Luego instalar la herramienta truffle npm install -g truffle
4) Instalar Ganache https://trufflesuite.com/ganache/
5) Abrir el Ganache y paretar quikstart
6) En el archivo truffle-config.js > module.exports > networks > development: modificar el host y el port segun el que te aparezca en el Ganache
7) En la consola de vuelta colocar el comando truffle deploy
8) De vuelta en la consola colocar el comando npm run dev para correr el servidor
9) Instalar Metamask en tu navegador y crearte una cuenta
10) En metamask cambiar la red de localhost 8545 y cambiar el nombre y el puerto por el 7545
11) Importar una cuenta con una clave que se obtiene de Ganache en la parte de show keys

