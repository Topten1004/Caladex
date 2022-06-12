import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    cryptoInfoList : [] ,
    cryptoExchangeRateList : [] ,
    cryptoBalanceList : []
}

export default (state = INITIAL_STATE , action ) => {
    switch(action.type) {
        case ActionTypes.GetAllCryptoInfo : 
            return ({
                ...state ,
                cryptoInfoList : action.payload
            }) ;
        case ActionTypes.GetExchageRateToUSD :
            return ({
                ...state ,
                cryptoExchangeRateList : action.payload
            })
        case ActionTypes.GetWalletBalance :
            // console.log(action.payload) ;
            return ({
                ...state ,
                cryptoBalanceList : action.payload
            })
        default :
            return state ;
    }
}