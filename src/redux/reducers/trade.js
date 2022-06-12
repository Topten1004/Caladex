


import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    tradeInfo : {} ,
    orderSellList : [] ,
    orderBuyList : [] ,
    orderTradeList : []
}

export default (state=INITIAL_STATE , action ) => {
    switch(action.type) {
        case ActionTypes.GetTradeHistory :
            return ({
                ...state ,
                tradeInfo : action.payload
            })
        case ActionTypes.GetTokenOrderSellList :
            return ({
                ...state ,
                orderSellList : action.payload
            })
        case ActionTypes.GetTokenOrderBuyList :
            return ({
                ...state , 
                orderBuyList : action.payload
            })
        case ActionTypes.GetTokenTradeList :
            return ({
                ...state ,
                orderTradeList : action.payload
            })
        default :
            return state;
    }
}