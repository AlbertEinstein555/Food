//подключим bandle.js в основной файл
	//объеденим все файлы импортировав их в главный
	//создаем переменные для модулей, указывая путь к ним в стандартах ES6
	//подключаем их до обработчика событий 'DOMContentLoaded'. Порядок подключения не важен
	import tabs from './modules/tabs';
	import modal from './modules/modal';
	import timer from './modules/timer';
	import cards from './modules/cards';
	import calculator from './modules/calculator';
	import forms from './modules/forms';
	import slider from './modules/slider';
	import {openModal} from './modules/modal';
//назначим главный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
		//Реализуем задачу по вызову модального окна через определенный промежуток времени
		//1000mc = 1c
		//запустим стрелочную функцию, которая запустит функцию openModal внутри себя череззаданный промежуток времени
		const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);

	//вызываем функции
	//подставим аргументы tabsSelector, tabsContentSelector, tabsParentSelector, activeClass
	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	//подставим аргументы из переменных modalTrigger и modal
	//triggerSelector - Селектор для элементов, которые будут открывать модальное окно.
	//modalSelector - Селектор для самого модального окна.
	//modalTimerId - Идентификатор таймера, который используется для автоматического открытия модального окна через определенное время.
	modal('[data-modal]', '.modal', modalTimerId);
	//в качестве аргументов устанавливаем селектор таймера и дату
	timer('.timer', '2025-05-20');
	cards();
	calculator();
	//modalTimerId - Идентификатор таймера, который может использоваться для управления временем открытия модального окна.
	forms('form', modalTimerId);
	//передаем объект, содержащий настройки, которые деструктуризируются в файле slider.js
	//порядок аргументов в объекте не важен
	slider({
		container: '.offer__slider',
		nextArrow: '.offer__slider-next',
		slide: '.offer__slide',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current'
	}); 		
});
//сборщик webpack запускаем прописав в терминале npx webpack
//добавить второй терминал можно нажав на +



