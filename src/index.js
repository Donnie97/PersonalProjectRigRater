import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';

const muiTheme = getMuiTheme({
    zIndex: {
      popover: '-100',
    }
  });

ReactDOM.render(
<HashRouter>
<Provider store={ store }>
<MuiThemeProvider muiTheme={muiTheme}>
<App />
</MuiThemeProvider>
</Provider>
</HashRouter>
, document.getElementById('root'));
// registerServiceWorker();
