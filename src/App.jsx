import { useState } from "react"
import FindWeather from "./components/FindWeather"

function App() {
	const [searchValue, setSearchValue] = useState(null)
	const [showWeather, setShowWeather] = useState(false)

	function BeginSearch() {
		setShowWeather(true)
	}

	return (
		<>
			<section className="searchSection hide">
				<h2>VEJR SØGNING</h2>
				<label htmlFor="city"></label>
				<input type="text" name="city" id="city" placeholder="Skriv navnet på byen her" onChange={event => setSearchValue(event.target)} />
				<button onClick={BeginSearch}>Find</button>
			</section>

			{showWeather && <FindWeather search={searchValue} />}
		</>
	)
}

export default App