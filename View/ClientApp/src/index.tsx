import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import DateFns from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import registerServiceWorker from './registerServiceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} >
            <MuiPickersUtilsProvider utils={DateFns} locale={ruLocale}>
                <App />
            </MuiPickersUtilsProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
