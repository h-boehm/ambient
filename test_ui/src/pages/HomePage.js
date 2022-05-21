import React from 'react';
import { Link } from 'react-router-dom';
import EntryList from '../components/EntryList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ornament from '../images/ornament.png';
import watercolor from '../images/watercolor.png';
import bumblebee from '../images/bumblebee2.png';
import weather from '../images/weather.png';
import WeatherData from '../components/Weather.js';
import ImageData from '../components/Image.js';


function HomePage({setEntryToEdit}) {

    const [entries, setEntries] = useState([]);

    const history = useHistory();

    const onDelete = async id => {
        const response = await fetch(`/entries/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/entries');
            const entries = await getResponse.json();
            setEntries(entries);
        } else {
            console.error(`Failed to delete entry with id = ${id}, status code = ${response.status}`)
        }
    };

    const onEdit = async entryToEdit => {
        setEntryToEdit(entryToEdit);
        history.push("/edit-entry");
    }

    const loadEntries = async () => {
        const response = await fetch('/entries');
        const entries = await response.json();
        setEntries(entries);
    }

	var weather_text = require("../weather_ms/weather_response.txt");
    let image_url = require("../image_ms/ms5.txt");

    useEffect(() => {
        loadEntries();
    }, []);

    return (
               
        <div id="container">
            

            <img src={ornament} id="ornament" alt="ornament"/>
            <div id="vl"></div>
            <div id="vl2"></div>

            <div id="banner">
                <img src={watercolor} id="watercolor" alt="watercolor"/>
                <div id="header">ambient</div>
                <div id="subheader">an intuitive journal</div>
            </div>

            <div id="left-side">
                
                <Link to="/add-entry" button id="new-entry-button">new entry</Link>

                <img src={weather} id="weather" alt="weather"/>

                <EntryList entries={entries} onDelete={onDelete} onEdit={onEdit}></EntryList>

                <Link to="/archives" id="link">archives...</Link>

            </div>

            <div id="right-side-container">

            <div id="right-column"></div>

            <div id="weather-data"><WeatherData txt={weather_text}/></div>
            
            <div id="right-side">

                <img src={bumblebee} id="bumblebee" alt="bumblebee"/>
               
                <input type="text" id="text-box"/>
                <button id="side-button">search</button>

                <div id="insights">
                    <b>entry analysis</b>
                    <ul id="insights-list">
                        <li></li>
                        <li></li>
                    </ul> 
                </div>

                <div id="statistics">
                    <b>statistics</b>
                </div>

                <div id="statistics-text">
                    word count: 1
                    <br></br>
                    entries: 1
                </div>

            </div>

            </div>

            <img src={ornament} id="ornament2" alt="ornament2"/>
            <div id="vl3"></div>
            <div id="vl4"></div>

        </div>
    );
}

export default HomePage;