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

	//экспортируем функции, чтобы иметь возможность использовать их где угодно в проекте
	export {postData};
	export {getResource};