//Modal
function modal() {
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
}
	

	//экспортируем эту функцию
	module.exports = modal;