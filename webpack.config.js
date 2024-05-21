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
  module: {
    //правила для определенных файлов
    rules: [
      {
        test: /\.m?js$/,
        //исключение
        exclude: /(node_modules|bower_components)/,
        //описываем как и что используем
        use: {
          loader: 'babel-loader',
          options: {
            //presets можно допольнительно настроить при необходимости
            presets: [['@babel/preset-env', {
              debug: true,
              corejs: 3,
              useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
