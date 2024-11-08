const sheetId = '1tZChZ_FO-F7iVDQJb1qgbGeSrTfQ_eMDsBnN9oi6rzM' // ID таблицы Google Sheets
const apiKey = 'AIzaSyDyqBF8G9fevwyAd2Oxq2uGJBfRKZEGoFA' // Ваш API ключ
const sheetName = 'udel' // Имя листа с данными

async function fetchPortfolio() {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
	const response = await fetch(url)
	const data = await response.json()
	displayPortfolio(data.values)
}

function displayPortfolio(rows) {
	const gallery = document.getElementById('portfolio-gallery')

	rows.forEach((row, index) => {
		if (index === 0) return // Пропустить первую строку с заголовками

		const [title, description, imageUrl, artistName, link] = row // Данные из таблицы
		const item = document.createElement('div')
		item.classList.add('portfolio-item')

		// Добавляем изображение
		const img = document.createElement('img')
		img.src = imageUrl
		img.alt = title
		item.appendChild(img)

		// Заголовок
		const itemTitle = document.createElement('h3')
		itemTitle.textContent = title
		item.appendChild(itemTitle)

		// Описание
		const itemDescription = document.createElement('p')
		itemDescription.textContent = description
		item.appendChild(itemDescription)

		// Ссылка на художника
		const artistLink = document.createElement('a')
		artistLink.href = link
		artistLink.target = '_blank' // Открытие в новой вкладке
		artistLink.textContent = artistName
		item.appendChild(artistLink)

		gallery.appendChild(item) // Добавляем элемент в галерею
	})
}

document.addEventListener('DOMContentLoaded', fetchPortfolio)
