//TABS
//создадим функцию для вызова этого модуля в нужный момент
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
		//в начале скриптов получаем переменные, с которыми будем взаимодействовать
		//1 - табы, на которые будем кликать
	let tabs = document.querySelectorAll(tabsSelector),
		//2 - весь контент, который будет находиться в верстке
		tabsContent = document.querySelectorAll(tabsContentSelector),
		//3 - родитель, содержащий все табы
		tabsParent = document.querySelector(tabsParentSelector);

	//скроем все ненужные табы
	function hideTabContent() {
		//так как у нас псевдомассив, то мы должны его перебрать
		//один класс добавляем, а другой удаляем
		tabsContent.forEach(item => {
			//класс faid отвечает за анимацию переключения
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		//работаем с классом активности. Точку не ставим, так как у нас classList
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	//создадим функцию, которая будет показывать табы
	function showTabContent(i = 0) {
		//обращаемся к конкретному элементу
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	//вызываем функцию
	hideTabContent();
	//если функция без аргумента, то по умолчанию i = 0
	showTabContent();

	tabsParent.addEventListener('click', function (event) {
		//event target определим в определенную переменную, так как будем применять его часто
		const target = event.target;
		//при помощи contains определяем, что мы точно кликнули в tab
		//подставим tabsSelector и удалим точку от нашей строки
		//slice(1) формирует новую строку без первого символа. Мы это делаем потому, что в файле script.js .tabheader__item с точкой, так как это класс, а мы используем значение с таким же названием
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			//item - это tab
			//i - номер по порядку
			tabs.forEach((item, i) => {
				if (target == item) {
					//вызываем обе функции, так как когда мы переключаем табы нам нужно вскрыть все остальные
					//и показываем тот, который нужен
					//например, если кликнули на 3 таб, то остальные скрываем 
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
}

//экспортируем эту функцию в стандартах ES6
export default tabs;