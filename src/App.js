import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherApp from './weather';
import Page404 from './Page404';

function App(){
  return(
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<WeatherApp />} />
        <Route path='*' element = {<Page404 />} />
      </Routes>
      </BrowserRouter>
      <weather />
    </div>
  );
}

export default App;