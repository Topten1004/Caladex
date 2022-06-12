import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import walletReducer from './wallet' ;
import cryptoReducer from './crypto' ;
import tokenReducer from './token' ;
import tradeReducer from './trade' ;
import stakeReducer from './stake' ;
import orderReducer from './order' ;
import balanceReducer from './balance' ;

export default combineReducers({
    auth : authReducer ,
    wallet : walletReducer ,
    crypto : cryptoReducer ,
    token : tokenReducer ,
    trade : tradeReducer ,
    stake : stakeReducer ,
    order : orderReducer,
    balance : balanceReducer,
});