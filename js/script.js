//подключим bandle.js в основной файл
//назначим главный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
	//объеденим все файлы импортировав их в главный
	//создаем переменные для модулей, указывая путь к ним
	//порядок подключения не важен
	const tabs = require('./modules/tabs'),
			modal = require('./modules/modal'),
			timer = require('./modules/timer'),
			cards = require('./modules/cards'),
			calculator = require('./modules/calculator'),
			forms = require('./modules/forms'),
			slider = require('./modules/slider');

	//вызываем функции
	tabs();
	modal();
	timer();
	cards();
	calculator();
	forms();
	slider(); 		
});
//сборщик webpack запускаем прописав в терминале npx webpack
//добавить второй терминал можно нажав на +



