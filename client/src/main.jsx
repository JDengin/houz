import React from 'react'
import { store } from './app/store';
import { Provider } from 'react-redux'; 
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
