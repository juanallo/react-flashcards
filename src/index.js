import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "./components/App";
import GoogleSheetsApi from "./api/GoogleSheetsApi";

ReactDOM.render(<App api={new GoogleSheetsApi()}/>, document.getElementById('root'));
serviceWorker.unregister();
