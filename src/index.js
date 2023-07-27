import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';

 ReactDOM.render(
   <Provider store={store}>
     <div>
       <App/>
     </div>
   </Provider>,
   document.getElementById('root')
 );
