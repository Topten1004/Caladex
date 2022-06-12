

import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE ={
    orderHistoryList : [],
    orderTradeHistoryList : [] ,
    exchangeOrderList : []
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type) {
        case ActionTypes.GetOrderHistory :
            return ({
                ...state ,
                orderHistoryList : action.payload
            })
        case ActionTypes.GetOrderTradeHistory :
            return ({
                ...state ,
                orderTradeHistoryList : action.payload
            })
        case ActionTypes.GetExchangeOrderList :
            return ({
                ...state ,
                exchangeOrderList : action.payload
            })
        default :
            return state;
    }
}