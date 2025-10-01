import { useEffect, useState } from "react"
import "./LoadWeather.css"

export default function LoadWeather({ lat, lon, obj }) {
	const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather"
	const RAIN_API_URL = "https://api.openweathermap.org/data/2.5/forecast"
	const [currentWeather, setCurrentWeather] = useState({})
	const [currentRain, setCurrentRain] = useState({})
	const API_KEY = import.meta.env.VITE_API_KEY

	function returnToSearch() {
		location.reload()
	}

	function returnEmoji(input) {
		if (input.clouds?.all >= 60) {
			return "🌥️"
		} else if (input.clouds?.all >= 40) {
			return "⛅"
		} else if (input.clouds?.all >= 20) {
			return "🌤️"
		} else {
			return "☀️"
		}
	}

	function returnRain() {
		if (currentRain["list"]) {
			return `${currentRain["list"][0]["pop"]}%`
		} else if (currentWeather["rain"]) {
			return `${currentWeather["rain"]["3h"]} mm`
		} else {
			return "0%"
		}
	}

	function returnDescription() {
		if (currentWeather.weather) {
			return currentWeather?.weather[0].description
		} else {
			return "solrig (ukendt)"
		}
	}

	function returnDayName(idx) {
		if (idx == 0) {
			return "i morgen"
		} else {
			return `om ${idx} dag(e)`
		}
	}

	function returnDays() {
		let currentArray = []
		let secondArray = []
		let rainArray = []

		currentRain.list.map((element) => {
			if (!currentArray.includes(element.dt_txt.split(" ")[0])) {
				currentArray.push(element.dt_txt.split(" ")[0])
				rainArray.push(element)
				if (element?.rain) {
					secondArray.push(element.rain["3h"])
				} else {
					secondArray.push(0)
				}
			} else {
				if (element?.rain) {
					let cValue = new Number(secondArray[secondArray.length - 1])
					secondArray.pop()
					secondArray.push(cValue + element.rain["3h"])
				}
			}
		})

		return (
			<>
				{rainArray.map((element, idx) => (
					<li key={idx}>
						<div>
							<p>{returnEmoji(element)}</p>
							<p>{element.main.temp.toFixed(1)} °C</p>
							<p>
								<span>Nedbør:</span> {secondArray[idx].toFixed(2)} mm
							</p>
						</div>
						<p>{returnDayName(idx)} </p>
					</li>
				))}
			</>
		);
	}

	useEffect(() => {
		fetch(`${BASE_API_URL}?lat=${lat}&lon=${lon}&units=metric&lang=da&appid=${API_KEY}`)
			.then(response => response.json())
			.then(data => setCurrentWeather(data))
		fetch(`${RAIN_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
			.then(response => response.json())
			.then(data => setCurrentRain(data))
	}, [lat, lon])

	return (
		<>
			{console.log(currentRain)}
			<section className="output-wrapper">
				<h2>{obj.name} ({obj.state})</h2>
				<p onClick={returnToSearch} className="link">🔍 <span>Søg igen</span></p>
				<div>
					<div>
						{currentRain?.list && (
							<p key="cRain">{returnEmoji(currentRain.list[0])}</p>
						)}
						{currentWeather["main"]?.temp && (
							<p className="temperature">{currentWeather["main"]?.temp.toFixed(1)} °C
								<span>Kan føles som {currentWeather["main"]?.feels_like.toFixed(1)} grader.</span>
							</p>
						)}
					</div>
					<nav>
						<p><span>Nedbør:</span> {returnRain()}</p>
						{currentWeather.main?.humidity && (
							<p><span>Luftfugtighed:</span> {currentWeather["main"]["humidity"]}%</p>
						)}

						{currentWeather.wind?.speed && (
							<p><span>Vind:</span> {currentWeather["wind"]["speed"]} m/s</p>
						)}
					</nav>
					<div>
						<h3>Vejr</h3>
						<p>idag</p>
						<p>{returnDescription()}</p>
					</div>
				</div>
			</section>
			<ol id="list">
				{currentRain?.list && (returnDays())
				}
			</ol>
		</>
	)
}