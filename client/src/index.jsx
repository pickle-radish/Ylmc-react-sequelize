import React from 'react';
import ReactDOM from 'react-dom';

import MainPage from './MainPage';
import './Main.css';

import dotenv from 'dotenv';
dotenv.config();

ReactDOM.render(
    <MainPage />,
    document.querySelector("#container")
)