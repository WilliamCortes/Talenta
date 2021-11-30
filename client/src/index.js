import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from "dotenv";
import axios from 'axios';
import './styles/index.css';
import App from './routes/App';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
