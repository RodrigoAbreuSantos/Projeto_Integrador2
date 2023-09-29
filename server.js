import app from './app';
const express = require('express');
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views')) //esta estabelecendo views, esta pegando o caminho absoluto usando o path, dentro do path vai pegar o arquivo que esta dentro de ./src/views
app.set('view engine', 'ejs'); //para renderizar os views, tem certas coisas que precisamos fazer dentro do template, fazer um if, fazer um for , isso dentro do proprio html




const port = 3003;
app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
  console.log('CTRL + Clique em http://localhost:3003');
});
