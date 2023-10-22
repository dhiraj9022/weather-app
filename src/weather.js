import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from 'react-bootstrap/Card';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CloudIcon from '@mui/icons-material/Cloud';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [temp, setTemp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate()
    async function getWeatherData(city) {
        try {
            setLoading(true);
            setError(null);

            let resp = await fetch(`http://api.weatherapi.com/v1/current.json?key=ab2d1f01fd7940339a964836231610&q=${city}&aqi=no`);
            resp = await resp.json();

            if (resp.location) {
                setLocation(resp.location);
                setTemp(resp.current);
             
            } else {
                setError("Location data not found.");
                Swal.fire({
                    title: "Error",
                    text: "Location data not found",
                    icon: "error",
                });
                navigate("/weatherApp")

            }
        } catch (error) {
            setError("Error fetching weather data");
            Swal.fire({
                title: "Error",
                text: "Error fetching weather data",
                icon: "error",
            });
            navigate("/weatherApp")
        } finally {
            setLoading(false);
        }
    }

    // Map weather conditions to corresponding icons
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Overcast':
                return <CloudQueueIcon />;
            case 'Clear':
                return <BeachAccessIcon />;
            default:
                return <CloudIcon />;
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "#333" }}>Weather App</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
                <TextField id="outlined-basic" label="City Name" variant="outlined" onChange={(e) => setCity(e.target.value)} />
                <Button variant="contained" style={{ marginLeft: "20px" }} onClick={() => getWeatherData(city)}>Search</Button>
            </div>
            <br />

            {loading && <p style={{color :"orange"}}>Loading weather data...</p>}
            {error && <p style={{color :"orange"}}>{error}</p>}

            {location.name && !loading && !error && (
                <div style={{ width: '350px', height: '350px', background: "#80B3FF", borderRadius: "10px", color: "white" }}>
                    <Card style={{ background: 'transparent', border: 'none' }}>
                        <Card.Body>
                            <Card.Title style={{ paddingTop: "5px", textAlign: "left", fontSize: "20px" }}>
                                <LocationOnOutlinedIcon /> {location.name}, {location.region}, {location.country}
                            </Card.Title>
                            <Card.Text>
                                <h2 style={{ fontSize: "60px", textAlign: "left", marginLeft: "5px", marginBottom: "40px" }}>
                                    {temp.temp_c}°C
                                </h2>
                                <p>Condition: {temp.condition.text}</p>
                                <p>Humidity: {temp.humidity}%</p>
                                <p>Cloud: {temp.cloud}%</p>
                                <p>UV Index: {temp.uv}</p>
                                <p>Wind: {temp.wind_dir} {temp.wind_kph} km/h</p>
                                <p>{getWeatherIcon(temp.condition.text)}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;