'use strict';

let path = require('path');

module.exports = {
  //режим, в которм работает webpack (development или production)
  mode: 'development',
  //файл, с которым будем начинать. В нем прописаны все зависимости
  entry: './js/script.js',
  //конфигурируем итоговый файл
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  //если true, то включенный webpack будет отслеживать изменения файлов и собирать проект
  watch: true,
  //хранит инфу об исходниках и расположении файлов
  devtool: "source-map",
  //модули и их настройка
  module: {}
};
