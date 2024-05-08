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
			data.forEach(({img, altimg, title, descr, price}) => {
				//передаем эти части вовнутрь конструктора, который создает
				new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
			});
	   })


	//Forms - эта часть будет видна, если запустить ее в open server


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
});


