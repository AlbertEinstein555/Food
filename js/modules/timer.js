//TIMER
	function timer() {
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

	}
	
	//экспортируем эту функцию
	module.exports = timer;