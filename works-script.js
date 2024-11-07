const sheetId = '1tZChZ_FO-F7iVDQJb1qgbGeSrTfQ_eMDsBnN9oi6rzM' // ID таблицы Google Sheets
const apiKey = 'AIzaSyDyqBF8G9fevwyAd2Oxq2uGJBfRKZEGoFA' // Ваш API ключ
const sheetName = 'works' // Имя листа (по умолчанию Sheet1)

async function fetchPortfolio() {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
	const response = await fetch(url)
	const data = await response.json()
	displayPortfolio(data.values)
}

function displayPortfolio(rows) {
	const portfolioContainer = document.getElementById('portfolio')
	rows.slice(1).forEach(row => {
		const [title, description, imageUrl, link] = row // Предполагаем, что imageUrl находится в третьей колонке
		if (!imageUrl) return // Проверка на случай пустых ссылок

		const item = document.createElement('div')
		item.className = 'portfolio-item'
		item.innerHTML = `
            <img src="${imageUrl}" alt="${title}" onerror="this.style.display='none'">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${link}" target="_blank">@telegram</a>
        `
		portfolioContainer.appendChild(item)
	})
}

document.addEventListener('DOMContentLoaded', fetchPortfolio)
