


import ActionTypes from "../actions/actionTypes" ;

const INITIAL_STATE = {
    tokenStakeInfoList : []
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type) {
        case ActionTypes.GetTokenStakeInfoList :
            return ({
                ...state ,
                tokenStakeInfoList : action.payload
            })
        default :
            return state ;
    }
}