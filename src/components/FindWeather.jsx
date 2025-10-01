import { useEffect, useState } from "react"
import LoadWeather from "./LoadWeather"

export default function FindWeather({ search }) {
	const BASE_API_URL = "http://api.openweathermap.org/geo/1.0/direct"
	const [locationData, setLocationData] = useState(null)
	const [currentWeather, setCurrentWeather] = useState(0)
	const [showWeather, setShowWeather] = useState(false)
	const API_KEY = import.meta.env.VITE_API_KEY

	search.parentElement.style.display = "none"

	function updateLocation(element) {
		setShowWeather(true)
		setCurrentWeather(Number(element.value))
		if (element.children[0].value == "none") {
			element.children[0].remove()
		}
	}

	useEffect(() => {
		if (!search.value) return
		fetch(`${BASE_API_URL}?q=${search.value}&lang=dk&limit=5&appid=${API_KEY}`)
			.then(response => response.json())
			.then(data => setLocationData(data))
	}, [search.value])

	return (
		<>
			<select name="type" id="type" className="hide" onChange={event => updateLocation(event.target)}>
				<option value="none">Tryk her for at se mulighederne.</option>
				{locationData?.map((location, idx) => <option key={`${location.name}${location.state}`} value={idx}>{location.name} - ({location.state})</option>)}
			</select>

			{showWeather && <LoadWeather lat={locationData[currentWeather].lat} lon={locationData[currentWeather].lon} obj={locationData[currentWeather]} />}
		</>
	)
}