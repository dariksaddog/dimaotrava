const sheetId = '1tZChZ_FO-F7iVDQJb1qgbGeSrTfQ_eMDsBnN9oi6rzM' // ID таблицы Google Sheets
const apiKey = 'AIzaSyDyqBF8G9fevwyAd2Oxq2uGJBfRKZEGoFA' // Ваш API ключ
const sheetName = 'stuff' // Имя листа с изображениями

async function fetchProducts() {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
	const response = await fetch(url)
	const data = await response.json()
	displayProducts(data.values)
}

function displayProducts(rows) {
	const gallery = document.getElementById('product-gallery')

	rows.forEach((row, index) => {
		if (index === 0) return // Пропустить первую строку с заголовками

		const [title, price, size, imageUrl, sold] = row // Данные из таблицы
		const card = document.createElement('div')
		card.classList.add('product-card')

		// Добавляем изображение
		const img = document.createElement('img')
		img.src = imageUrl
		img.alt = title
		card.appendChild(img)

		// Заголовок
		const productTitle = document.createElement('h2')
		productTitle.textContent = title
		card.appendChild(productTitle)

		// Цена и размеры
		const priceSize = document.createElement('div')
		priceSize.classList.add('price-size')

		const productPrice = document.createElement('span')
		productPrice.textContent = `price: ${price}`

		const productSize = document.createElement('span')
		productSize.textContent = `size: ${size}`

		priceSize.appendChild(productPrice)
		priceSize.appendChild(productSize)
		card.appendChild(priceSize)

		// Проверка на наличие товара в продаже
		if (sold === '0') {
			// Если `0`, то товар распродан
			const soldOutOverlay = document.createElement('div')
			soldOutOverlay.classList.add('sold-out-overlay')
			soldOutOverlay.textContent = 'Sold Out'
			card.appendChild(soldOutOverlay)

			card.style.opacity = '0.5' // Делаем карточку тусклее
		}

		gallery.appendChild(card) // Добавляем карточку в галерею
	})
}

document.addEventListener('DOMContentLoaded', fetchProducts)
