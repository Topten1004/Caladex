


import axios from 'axios' ;
import { PRIVATE_CALADEX_API } from '../../static/constants';
import ActionTypes from './actionTypes' ;

export const SetTokenBalance = (account , token_id , is_deposit , amount) => async dispatch => {

    try {
        let res = await axios.post(`${PRIVATE_CALADEX_API}balance/set` , {
            address : account ,
            token_id : token_id ,
            is_deposit : is_deposit ,
            amount : amount
        }) ;


        return ;
    }
    catch(err) {
        console.log(err) ;
    }
}

export const ApproveToken = async (amount , address , symbol ) => {
    try {

        let reqBody = {
            amount : amount ,
            symbol : symbol
        };

        if(address !== null) {
            reqBody = {
                ...reqBody ,
                address : address ,
            }
        }

        let res = await axios.post(`${PRIVATE_CALADEX_API}balance/withdraw` , reqBody) ;

        if(res.status === 201) {
            return "Error"
        } 

        return "Ok"
    } 
    catch(err) {
        console.log(err) ;
        return "Error" 
    }
}

export const UpdateDepositStatus = (depositStatusObject) => async dispatch => {
    return dispatch({
        type : ActionTypes.UpdateDepositStatus ,
        payload : depositStatusObject
    })
} 

export const UpdateWithdrawStatus = (withdrawStatusObject) => async dispatch => {
    return dispatch({
        type : ActionTypes.UpdateWithdrawStatus ,
        payload : withdrawStatusObject
    })
}