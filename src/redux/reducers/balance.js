import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    depositStatusObject : {} ,
    withdrawStatusObject : {}
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type) {
        case ActionTypes.UpdateDepositStatus :
            return ({
                ...state ,
                depositStatusObject : action.payload
            })
        case ActionTypes.UpdateWithdrawStatus :
            return ({
                ...state,
                withdrawStatusObject : action.payload
            })
        default :
            return state ;
    }
}