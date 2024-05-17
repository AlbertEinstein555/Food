	//Slider
	function slider() {
		//создаем переменные, которые будут получаться со страницы
	//слайды по классу
	const slides = document.querySelectorAll('.offer__slide'),
	//переменная для модификации слайдера, чтобы прописать слайдеру position relative 
	slider = document.querySelector('.offer__slider'),
	//стрелка previous
	prev = document.querySelector('.offer__slider-prev'),
	//стрелка next
	next = document.querySelector('.offer__slider-next'),
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

	}
	
	//экспортируем эту функцию в стандартах ES6
	export default slider;