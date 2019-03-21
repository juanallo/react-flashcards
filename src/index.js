import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import DeckEffect from "./components/DeckEffect";

ReactDOM.render(<DeckEffect />, document.getElementById('root'));
serviceWorker.unregister();
