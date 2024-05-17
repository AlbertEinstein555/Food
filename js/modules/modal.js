	//Modal
	//напишем функции, отвечающую за открытие и закрытие окна
	//пишем их в начале, чтобы они работали как отдельные функциональности	
	//создадим функцию, так как имеем повторяющийся участок кода
	//используем селекторы, когда будем вызывать функцию modal. Функция будет определять элемент и работать с ним
	function closeModal(modalSelector) {
		const modal = document.querySelector(modalSelector);
		if (modal) {
			modal.classList.add('hide');
		modal.classList.remove('show');
		//добавим возможность скролла страницы при вызове окна
		//оставим пустую строку и браузер поставит значение по умолчанию
		document.body.style.overflow = '';
		}
	}
	//передаем в качестве аргументов селектор модального окна и уникальный идентификатор таймера, который был запущен
	function openModal(modalSelector, modalTimerId) {
		const modal = document.querySelector(modalSelector);
		if (modal) {
			modal.classList.add('show');
		modal.classList.remove('hide');
		//уберем возможность скролла страницы при вызове окна
		document.body.style.overflow = 'hidden';
		console.log(modalTimerId);
		//если modalTimerId существует, то будем запускать clearInterval
		if (modalTimerId) {
				//очистим интервал появления модального окна, если оно уже было открыто пользователем
				clearInterval(modalTimerId);
			}
		}
	}

	//передаем modalTimerId (который будет приходить из script.js) везде где будет функция openModal внутри функции modal
	function modal(triggerSelector, modalSelector, modalTimerId) {
		//используем data-атрибуты из html. Пишем их в квадратных скобках
		//переменная для кнопок модального окна
		const modalTrigger = document.querySelectorAll(triggerSelector),
				//переменная, отвечающая за модальное окно
				modal = document.querySelector(modalSelector),
				//переменая для кнопки, отвечающей за закрытие модального окна
				modalCloseBtn = document.querySelector('[data-close]');

		//используем функцию, отвечающую за открытие окна
		//переберем псевдомассив, чтобы навесить на него обработчик событий		
		modalTrigger.forEach(btn => {
			//создадим стрелочную функцию, которая оборачивает вызывающуюся функцию и будет ее вызывать внутри себя
			btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
		});

		//создадим функцию, отвечающую за закрытие окна		
		// Добавляем обработчик события для кнопки закрытия модального окна
		if (modalCloseBtn) {
			modalCloseBtn.addEventListener('click', () => closeModal(modalSelector));
	  	}

		//создадим функцию, позволяющую закрывать окно через esc или щелчком на пустое пространство	
		modal.addEventListener('click', (e) => {
			//e - объект события
			//если место куда кликнул пользователь будет совпадать c modal
			if (e.target === modal) {
				//вызываем функцию для повторяющейся части кода
				closeModal(modalSelector);
			}
		});

		//пропишем событие keydown, которое происходит когда нажимается кнопка
		document.addEventListener('keydown', (e) => {
			//отслеживаем код конкретной клавиши
			//задаем условие, чтобы событие срабатывало только на открытом окне
			if (e.code === 'Escape' && modal.classList.contains('show')) {
				closeModal(modalSelector);
			}
		});

		//Реализуем задачу по вызову модального окна при долистывании до конца страницы

		//создадим функцию, чтобы окно появлялось только 1 раз, а не при каждом долистывании
		function showModalByScroll() {
			if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
				openModal(modalSelector, modalTimerId);
				//чтобы удалить обработчик событий, нужно делать ссылку на функцию
				//которая исполнялась как этот обработчик
				window.removeEventListener('scroll', showModalByScroll);
			}
		}
		window.addEventListener('scroll', showModalByScroll);
	}

	//экспортируем эту функцию в стандартах ES6
	export default modal;
	//сделаем 2 именнованых экспорта
	export { closeModal };
	export { openModal };