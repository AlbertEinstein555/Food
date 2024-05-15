//TABS

//назначим главный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
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

	//TIMER
	//Создадим переменную, определяющую deadline
	const deadline = '2024-05-11'
	//Создадим функцию, которая будет получать разницу
	//между deadline и текущей датой
	function getTimeRemaining(endtime) {
		//чтобы вывести нули вместо таймера, если время истекло, выполним проверку
		let days, hours, minutes, seconds;
		//техническая переменная, в которой превратим дату в числовое значение
		const t = Date.parse(endtime) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			//объявим переменные, которые будут отсекать дни, часы, минуты и секунды, округляя результат
			//округляем результат деления t на кол-во мс в сутках 
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
				//аналогично находим часы, с условием что их будет не больше 23 
				hours = Math.floor((t / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((t / 1000 / 60) % 60),
				seconds = Math.floor((t / 1000) % 60);
		}
		//возвращаем объект
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	//создадим функцию, которая будет добавлять 0 перед число, если оно однозначное
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	//Создадим функцию, которая устанавливает таймер на страницу
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			//обновляем таймер каждую секунду
			timeInterval = setInterval(updateClock, 1000);
		//чтобы убрать мигание верстки запустим функцию раньше
		updateClock();
		//создадим функцию, обновляющую время
		function updateClock() {
			//расчет времени на текущий момент
			const t = getTimeRemaining(endtime);
			//помещаем расчетные велечины на страницу
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			//используем результат переменной t
			//если время вышло, то таймер очищается
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	//вызываем функцию с селектором и переменной
	setClock('.timer', deadline);


	//Modal

	//используем data-атрибуты из html. Пишем их в квадратных скобках
	//переменная для кнопок модального окна
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		//переменная, отвечающая за модальное окно
		modal = document.querySelector('.modal'),
		//переменая для кнопки, отвечающей за закрытие модального окна
		modalCloseBtn = document.querySelector('[data-close]');

	//упрощаем функцию, отвечающую за открытие окна	
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		//уберем возможность скролла страницы при вызове окна
		document.body.style.overflow = 'hidden';
		//очистим интервал появления модального окна, если оно уже было открыто пользователем
		clearInterval(modalTimerId);
	}
	//используем эту функцию, отвечающую за открытие окна
	//переберем псевдомассив, чтобы навесить на него обработчик событий		
	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	//создадим функцию, так как имеем повторяющийся участок кода
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		//добавим возможность скролла страницы при вызове окна
		//оставим пустую строку и браузер поставит значение по умолчанию
		document.body.style.overflow = '';
	}

	//создадим функцию, отвечающую за закрытие окна		
	modalCloseBtn.addEventListener('click', closeModal);

	//создадим функцию, позволяющую закрывать окно через esc или щелчком на пустое пространство	
	modal.addEventListener('click', (e) => {
		//e - объект события
		//если место куда кликнул пользователь будет совпадать c modal
		if (e.target === modal) {
			//вызываем функцию для повторяющейся части кода
			closeModal();
		}
	});

	//пропишем событие keydown, которое происходит когда нажимается кнопка
	document.addEventListener('keydown', (e) => {
		//отслеживаем код конкретной клавиши
		//задаем условие, чтобы событие срабатывало только на открытом окне
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//Реализуем задачу по вызову модального окна через определенный промежуток времени
	//1000mc = 1c
	const modalTimerId = setTimeout(openModal);

	//Реализуем задачу по вызову модального окна при долистывании до конца страницы

	//создадим функцию, чтобы окно появлялось только 1 раз, а не при каждом долистывании
	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			openModal();
			//чтобы удалить обработчик событий, нужно делать ссылку на функцию
			//которая исполнялась как этот обработчик
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

	//Используем классы для карточек
	//название класса всегда с большой буквы
	class MenuCard {
		//берем из верстки все то, что нам нужно для шаблона
		//alt - альтернативный текст, если картинка сломалась
		//используем rest оператор ...
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			//курс валют
			this.transfer = 27;
			//вызовем метод конвертации валют
			this.changeToUAH();
		}
		//создадим метод по конвертации валют
		changeToUAH() {
			this.price = this.price * this.transfer;
		}
		//метод для создания верстки
		render() {
			//создадим элемент
			//поместим в него верстку
			//дополним данными, которые приходят как аргументы
			//поместим на страницу
			const element = document.createElement('div');
			//зададим параметры по умолчанию, если пользователь не передаст ни 1 элемента в классы
			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				//так как classes - массив, то обработаем его, про	демся по каждому элементу, 
				//вытащим название класса и подсоеденим к div
				this.classes.forEach(className => element.classList.add(className));
			}
			//скопируем верстку и отредактируем то, что может меняться
			//уберем обертку menu__item
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			//поместим новосозданный элемент во внутрь родителя
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		//fetch возвращает promise
		const res = await fetch(url);
		//если выкинет ошибку, то сработает catch
		if (!res.ok) {
			//throw выкидывает новую ошибку
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		//наш код при помощи await дожидается окончания работы promise и только потом возвращает его
		return await res.json();
	};

	//при помощи сервера получаем массив с menu
	getResource('http://localhost:3000/menu')
		.then(data => {
			//переберем массив и выполним деструктуризацию объекта внутри него при помощи {}
			data.forEach(({ img, altimg, title, descr, price }) => {
				//передаем эти части вовнутрь конструктора, который создает
				new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
			});
		})


	//Forms - эта часть будет видна и будет полноценно работать, если запустить ее в open server и включить JSON-server


	//получим все формы на странице по тегу
	const forms = document.querySelectorAll('form');

	//создадим сообщение о результате
	const message = {
		//подставим картинку на загрузку
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	//подвяжем функцию на каждую форму, которая будет обработчиком события при отправке
	forms.forEach(item => {
		bindPostData(item);
	});

	//создадим переменную отвечающую за постинг данных используя Function expression
	//При помощи async объявляем, что внутри функции есть асинхронный код.Упрощает работу с ними
	//await его парный оператор  
	const postData = async (url, data) => {
		//fetch возвращает promise
		const res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-type': 'application/json'
			},
			//тело, которое нужно отправлять
			body: data
		});
		//наш код при помощи await дожидается окончания работы promise и только потом возвращает его
		return await res.json();
	};



	//пропишем функцию, отвечающую за привязку постинга данных	
	function bindPostData(form) {
		//событие будет срабатывать каждый раз, когда пытаемся отправить какую-то форму
		form.addEventListener('submit', (e) => {
			//в самом начале отменим стандартное поведение браузера, чтобы он не перезагружался
			e.preventDefault();

			//Создадим блок, в который будет помещаться сообщение о результате
			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			//показываем сообщение
			statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
	   	`;
			//отправим statusMessage на страницу
			form.insertAdjacentElement('afterend', statusMessage);

			//создадим функцию-конструктор, в которую будут помещены все данные, заполненные пользователем
			//в верстке всегда проверяем атрибут name у input
			//при связке XMLHttpRequest и Formdata заголовок request.setRequestHeader пропишется автоматически
			//а для JSON понадобится заголовок
			const formData = new FormData(form);
			//превратим formData в массив массивов, чтобы поработать с ней, превращаем в объект и в формат JSON
			//stringify превращает обычный объект в JSON
			const json = JSON.stringify(Object.fromEntries(formData.entries()));
			//из postData вернется promise, который обработаем при помощи then и отправим json на сервер
			postData('http://localhost:3000/requests', json)
				.then(data => {
					//data - данные, которые возвращаются из промиса
					console.log(data);
					//в случае успешного запроса помещаем другое сообщение
					showThanksModal(message.success);
					//удаляем блок со страницы
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}
	//говорим спасибо при закрытии модального окна
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');
		//скрываем элемент перед показом модального окна при помощи стилей
		prevModalDialog.classList.add('hide')
		//когда вызывается showTanksModal, то внутри подвязывается openModal, которая отвечает за открытие модальных окон
		openModal();

		//создаем новый контент
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		//формируем верстку в этом модальном окне
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>
   	`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	//загружаем файл 'db.json', преобразует его содержимое в формат JSON и выводит его в консоль
	//подставим скопированный адресс
	fetch('http://localhost:3000/menu')
		.then(data => data.json())
		.then(res => console.log(res));


	//Slider

	//создаем переменные, которые будут получаться со страницы
	//слайды по классу
	const slides = document.querySelectorAll('.offer__slide'),
		//переменная для модификации слайдера, чтобы прописать слайдеру position relative 
		slider = document.querySelector('.offer__slider'),
		//стрелка previous
		prev = document.querySelector('.offer__slider-prev'),
		//стрелка next
		next = document.querySelector('.offer__slider-next');
	//номер слайдера
	total = document.querySelector('#total'),
		//блок, отображающий текущий слайд
		current = document.querySelector('#current');
	//index, определяющий текущее положение в слайдере с начальным положением 1
	let slideIndex = 1;

	//проинициализируем наш слайдер, поместив вовнутрь начальное значение
	showSlides(slideIndex);

	//если количество слайдов меньше 10, то добавим 0 перед числом
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	//функция по отображению и скрытию слайдера, принимающую slideIndex в качестве аргумента
	function showSlides(n) {
		//условия для граничных значений слайдера
		if (n > slides.length) {
			//перемещаемся в самое начало, если переместились в самую правую границу
			slideIndex = 1
		}
		//похожая операция, но в обратную сторону
		if (n < 1) {
			slideIndex = slides.length;
		}
		//обращаемся ко всем слайдам в слайдере
		slides.forEach(item => item.style.display = 'none');
		//покажем нужный слайд. Так как первый слайд под индексом 0, то ставим -1
		slides[slideIndex - 1].style.display = 'block'

		//нумерация для текущего слайда
		//если количество слайдов меньше 10, то добавим 0 перед числом
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	//модификация слайдера
	//все элементы внутри слайдера, спозиционированные абсолютно, будут нормально отображаться
	slider.style.position = 'relative';
	//создаем обертку для всех точек и стилизуем ее
	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	//стилизуем
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	//поместим обертку вовнутрь слайдера
	slider.append(indicators);
	//создадим определенное количество точек при помощи цикла
	//цикл закончится после того как закончатся слайды
	for (let i = 0; i < slides.length; i++) {
		//создаем точки
		const dot = document.createElement('li');
		//каждой точке присвоим атрибут data-slide-to и установим нумерацию с 1
		dot.setAttribute('data-slide-to', i + 1);
		//стилизуем
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;
		//пропишем прозрачность для активной точки
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	//функция, увеличивающая или уменьшающая slideIndex при перелистывании
	function plusSlides(n) {
		showSlides(slideIndex += n);
	}
	//работаем с точками, чтобы переключать подсветку при переключении слайдера
	//задаем начальные стили для точек. Поместим их в функцию, так как участок кода будет повторяться
	//модификация слайдера
	function setDotOpacity() {
		// Устанавливаем прозрачность для всех точек
		dots.forEach(dot => dot.style.opacity = '.5');
		// Устанавливаем прозрачность для текущей точки
		dots[slideIndex - 1].style.opacity = 1;
	}
	prev.addEventListener('click', () => {
		plusSlides(-1);
		//модификация слайдера
		// Вызываем функцию для установки прозрачности точек
		setDotOpacity();
	});
	next.addEventListener('click', () => {
		plusSlides(+1);
		//модификация слайдера
		//работаем с точками, чтобы переключать подсветку при переключении слайдера
		//задаем начальные стили для точек
		setDotOpacity();
	});
	//модификация слайдера
	//сделаем возможным переключение слайдеров по точкам
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			// Получаем атрибут data-slide-to
			const slideTo = parseInt(e.target.getAttribute('data-slide-to'));
			// Устанавливаем slideIndex равным номеру слайда, на который нажали
			slideIndex = slideTo;
			// Отображаем соответствующий слайд
			showSlides(slideIndex);
			// Обновляем стили для точек
			setDotOpacity();
		});
	});


	//Calculator

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
			result.textContent = 'Не хватает данных'
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
});



