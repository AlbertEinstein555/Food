//Calculator
function calculator() {
	//получаем элемент, в который будем все записывать
	const result = document.querySelector('.calculating__result span');
	//в расчете будет участвовать 5 элементов, которые будут меняться
	//зададим дефолтное значение пола человека и его степени активности
	let sex, height, weight, age, ratio;
	//проверяем, есть ли значения в локальном хранилище и если да, то подставим их в переменные
	//если нет, то зададим значения по умолчанию
	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	//создадим функцию, которая будет сохранять классы активности последних выбранных элементов при обновлении страницы
	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		//при заходе на страницу убираем у наших элементов классы активности и добавляем их тем, которые есть в локальном хранилище
		elements.forEach(elem => {
			//убираем класс активности
			elem.classList.remove(activeClass);
			//для элементов пола сравниваем по id
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				//добавляем класс активности, если в результате перебора элементов находим совпадение в локальном хранилище
				elem.classList.add(activeClass);
			}
			//аналогично для элементов активности сравниваем по data-ratio
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				//добавляем класс активности, если в результате перебора элементов находим совпадение в локальном хранилище
				elem.classList.add(activeClass);
			}
		});
	}
	//вызываем функцию
	//добавим div так как обращаемся к элементу внутри селектора
	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	//разбиваем функционал калькулятора на несколько частей, так как что-то будет меняться, а что-то нет
	//создадим ф-ию, которая будет запускаться каждый раз, когда выполняется какое-то изменение, то есть выполнять пересчет
	function calcTotal() {
		//если нет значения, для хотя бы одной переменной, то калькулятор не работает
		//эта проверка также подразумевает недопустимость ввода букв или символов
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = 'Не хватает данных';
			//если ввели данные в инпут, а потом удалили, то сбрасываем стили 
			result.style.cssText = '';
			//досрочно прервем функцию
			return;
		}
		//если все в порядке, то в зависимости от выбранного пола берем формулу из статьи и подставляем наши переменные
		if (sex === 'female') {
			//расчет округлим до ближайшего целого
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
			result.style.cssText = `
			font-size: 30px;
			color: violet;
			text-align: center;
		`;
		} else {
			//расчет округлим до ближайшего целого
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
			result.style.cssText = `
			font-size: 30px;
			color: green;
			text-align: center;
		`;
		}
	}
	//вызовем функцию
	calcTotal();
	//напишем функцию, которая будет отвечать за переключение между элементами
	function getStaticInformation(Selector, activeClass) {
		//получим элементы внутри блока
		const elements = document.querySelectorAll(`${Selector}`);
		//
		elements.forEach(elem => {
			//отслеживаем клики по элементу, игнорируя клики по подложке
			elem.addEventListener('click', (e) => {
				//для определения по чем кликнул пользователь пропишем условие,
				//опираясь на data-atribut или id, которые добавим в верстку
				//если есть data-ratio, то извлекаем его значение
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					//запомним последние введенные данные и запишем их в локальное хранилище
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}
				console.log(ratio, sex);
				//работаем с классами активности
				//обращаемся к элементам 
				//убираем у всех класс активности 
				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				// и добавляем тому div, в который кликнули, назначаем класс активности
				e.target.classList.add(activeClass);
				//выполняем пересчет
				calcTotal();
			});
		});
	}
	//вызываем функцию с родителем и классом активности
	//добавим div так как обращаемся к элементу внутри селектора
	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
	//создадим функцию, которая будет навешиваться на input
	function getDynamicInformation(selector) {
		//получаем input, с которым будем работать
		const input = document.querySelector(selector);
		input.addEventListener('input', () => {

			//проверяем, что пользователь ввел в инпут и подсвечиваем инпут красным, если данные некорректные
			//регулярное выражение /\D/g будет искать все символы в строке, которые не являются цифрами
			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				//проверяем input по id на строку
				case 'height':
					//если это искомый input, то записываем в переменную введенные пользователем данные
					//при этом преобразуем значение в числовой тип данных
					height = +input.value;
					//останавливаем наш case
					break;
				case 'weight':
					//если это искомый input, то записываем в переменную введенные пользователем данные
					weight = +input.value;
					break;
				case 'age':
					//если это искомый input, то записываем в переменную введенные пользователем данные
					age = +input.value;
					break;
			}
			//выполняем пересчет
			calcTotal();
		});
	}
	//вызовем функцию с тремя селекторами
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');
}
	

	//экспортируем эту функцию в стандартах ES6
	export default calculator;