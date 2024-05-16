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
}

//экспортируем эту функцию
module.exports = cards;