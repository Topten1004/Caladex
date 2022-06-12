



import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    isConnected : false ,
    address : '' ,
    balance : 0 ,
}

export default (state=INITIAL_STATE , action={}) => {
    switch(action.type) {
        case ActionTypes.SetWalletAddress : 
            return ({
                ...state , 
                address : action.payload ,
            })
        default :
            return state ; 
    }
}