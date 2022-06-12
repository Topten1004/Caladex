import rootReducer from './reducers';
import { createStore, applyMiddleware , compose } from 'redux';

import thunk from 'redux-thunk';

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default store;