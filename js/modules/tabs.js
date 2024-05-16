//TABS
//создадим функцию для вызова этого модуля в нужный момент
function tabs() {
		//в начале скриптов получаем переменные, с которыми будем взаимодействовать
	//1 - табы, на которые будем кликать
	let tabs = document.querySelectorAll('.tabheader__item'),
		//2 - весь контент, который будет находиться в верстке
		tabsContent = document.querySelectorAll('.tabcontent'),
		//3 - родитель, содержащий все табы
		tabsParent = document.querySelector('.tabheader__items');

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
			item.classList.remove('tabheader__item_active');
		});
	}

	//создадим функцию, которая будет показывать табы
	function showTabContent(i = 0) {
		//обращаемся к конкретному элементу
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	//вызываем функцию
	hideTabContent();
	//если функция без аргумента, то по умолчанию i = 0
	showTabContent();

	tabsParent.addEventListener('click', function (event) {
		//event target определим в определенную переменную, так как будем применять его часто
		const target = event.target;
		//при помощи contains определяем, что мы точно кликнули в tab
		if (target && target.classList.contains('tabheader__item')) {
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

//экспортируем эту функцию
module.exports = tabs;