/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
      result.style.cssText = `
			font-size: 30px;
			color: violet;
			text-align: center;
		`;
    } else {
      //расчет округлим до ближайшего целого
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
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
      elem.addEventListener('click', e => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
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

  //при помощи сервера получаем массив с menu
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu').then(data => {
    //переберем массив и выполним деструктуризацию объекта внутри него при помощи {}
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      //передаем эти части вовнутрь конструктора, который создает
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

//экспортируем эту функцию в стандартах ES6
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
//Forms - эта часть будет видна и будет полноценно работать, если запустить ее в open server и включить JSON-server
//Импорты всегда должны быть в самом верху
//Используем синтаксис именованных импортов, чтобы использовать функции из модуля modal

//функция postData находится в файле services
//в пути выходим на одну папку выше и заходим в нужную

function forms(formSelector, modalTimerId) {
  //получим все формы на странице по тегу
  const forms = document.querySelectorAll(formSelector);

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

  //пропишем функцию, отвечающую за привязку постинга данных	
  function bindPostData(form) {
    //событие будет срабатывать каждый раз, когда пытаемся отправить какую-то форму
    form.addEventListener('submit', e => {
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
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
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
    prevModalDialog.classList.add('hide');
    //когда вызывается showTanksModal, то внутри подвязывается openModal, которая отвечает за открытие модальных окон
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');

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
      //передаем селектор модального окна, которое будем закывать
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal', modalTimerId);
    }, 4000);
  }

  //загружаем файл 'db.json', преобразует его содержимое в формат JSON и выводит его в консоль
  //подставим скопированный адресс
  fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
}

//экспортируем эту функцию в стандартах ES6
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
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
  modal.addEventListener('click', e => {
    //e - объект события
    //если место куда кликнул пользователь будет совпадать c modal
    if (e.target === modal) {
      //вызываем функцию для повторяющейся части кода
      closeModal(modalSelector);
    }
  });

  //пропишем событие keydown, которое происходит когда нажимается кнопка
  document.addEventListener('keydown', e => {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);
//сделаем 2 именнованых экспорта



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Slider
//container - это переменная slider
//slide - это переменная slides
function slider({
  container,
  slide,
  nextArrow,
  prevArrow,
  totalCounter,
  currentCounter
}) {
  //создаем переменные, которые будут получаться со страницы
  //слайды по классу
  const slides = document.querySelectorAll(slide),
    //переменная для модификации слайдера, чтобы прописать слайдеру position relative 
    slider = document.querySelector(container),
    //стрелка previous
    prev = document.querySelector(prevArrow),
    //стрелка next
    next = document.querySelector(nextArrow),
    //номер слайдера
    total = document.querySelector(totalCounter),
    //блок, отображающий текущий слайд
    current = document.querySelector(currentCounter);
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
      slideIndex = 1;
    }
    //похожая операция, но в обратную сторону
    if (n < 1) {
      slideIndex = slides.length;
    }
    //обращаемся ко всем слайдам в слайдере
    slides.forEach(item => item.style.display = 'none');
    //покажем нужный слайд. Так как первый слайд под индексом 0, то ставим -1
    slides[slideIndex - 1].style.display = 'block';

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
    dot.addEventListener('click', e => {
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
}

//экспортируем эту функцию в стандартах ES6
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//TIMER
//аргументы в функции позволят менять данные динамически вместо переменной const deadline
function timer(id, deadline) {
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
      hours = Math.floor(t / (1000 * 60 * 60) % 24), minutes = Math.floor(t / 1000 / 60 % 60), seconds = Math.floor(t / 1000 % 60);
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
  setClock(id, deadline);
}

//экспортируем эту функцию в стандартах ES6
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
//создадим переменную отвечающую за постинг данных используя Function expression
//она работает с сервером и может пригодится где угодно
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
const getResource = async url => {
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

//экспортируем функции, чтобы иметь возможность использовать их где угодно в проекте



/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (() => {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
//установим полифил внутри наших скриптов
(__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill)();

//подключим bandle.js в основной файл
//объеденим все файлы импортировав их в главный
//создаем переменные для модулей, указывая путь к ним в стандартах ES6
//подключаем их до обработчика событий 'DOMContentLoaded'. Порядок подключения не важен








//назначим главный обработчик событий
window.addEventListener('DOMContentLoaded', () => {
  //Реализуем задачу по вызову модального окна через определенный промежуток времени
  //1000mc = 1c
  //запустим стрелочную функцию, которая запустит функцию openModal внутри себя череззаданный промежуток времени
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 300000);

  //вызываем функции
  //подставим аргументы tabsSelector, tabsContentSelector, tabsParentSelector, activeClass
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  //подставим аргументы из переменных modalTrigger и modal
  //triggerSelector - Селектор для элементов, которые будут открывать модальное окно.
  //modalSelector - Селектор для самого модального окна.
  //modalTimerId - Идентификатор таймера, который используется для автоматического открытия модального окна через определенное время.
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
  //в качестве аргументов устанавливаем селектор таймера и дату
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2025-05-20');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_5__["default"])();
  //modalTimerId - Идентификатор таймера, который может использоваться для управления временем открытия модального окна.
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', modalTimerId);
  //передаем объект, содержащий настройки, которые деструктуризируются в файле slider.js
  //порядок аргументов в объекте не важен
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_7__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map