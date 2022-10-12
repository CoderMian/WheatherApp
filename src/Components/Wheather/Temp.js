import React, { useEffect, useState } from 'react'
import './style.css'
import Weathercard from './Weathercard'
const Temp = () => {
    const [searchValue, setSearchValue] = useState("lahore")
    const [tempInfo, setTempInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const getWeatherInfo = async () => {
        try {
            setIsLoading(true)
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=2cbe46de3454b8bf977758f9bb336203`
            const res = await fetch(url);
            const data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0]
            // console.log(weathermood)
            const { speed } = data.wind
            const { name } = data
            const { country, sunset } = data.sys
            const myNewWheatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            }
            setTempInfo(myNewWheatherInfo)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getWeatherInfo()

    }, [])
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button className='searchButton' type='button' onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            {isLoading ? <article className='widget'><div className="loader"></div><h3 className='Loading-Text'>Loading...</h3></article> : <Weathercard tempInfo={tempInfo} />}



        </>
    )
}

export default Temp
