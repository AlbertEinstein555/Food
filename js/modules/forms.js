
	//Forms - эта часть будет видна и будет полноценно работать, если запустить ее в open server и включить JSON-server
	function forms() {
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
	}

	

	//экспортируем эту функцию
	module.exports = forms;