

import axios from 'axios' ;
import * as config from '../../static/constants' ;
import ActionTypes from './actionTypes';


export const OrderMarket = async (account , token_id , pair_token , price , amount , type) => {
    try {
        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/market` , {
            orderer : account ,
            token_id : token_id ,
            pair_token : pair_token ,
            price : price,
            amount : amount ,
            type : type
        })
        
        if(res.status === 201){
            return false ;
        } 

        if(res.status === 200){
            return true ;
        }
         
        return true ;
    }
    catch (err) {
        console.log(err) ;
        return false ;
    }
}

export const OrderLimit = async (account , token_id , pair_token , price , amount , type) => {
    try {
        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/addlimit` , {
            orderer : account ,
            token_id : token_id ,
            pair_token : pair_token ,
            price : price,
            amount : amount ,
            type : type
        })
        
        if(res.status === 201){
            return false ;
        } 

        if(res.status === 200){
            return true ;
        }
         
        return true ;
    }
    catch (err) {
        console.log(err) ;
        return false ;
    }
}

export const GetOrderHistory = (orderer , start_time , end_time , token_id , pair_token , type , is_traded) => async dispatch => {
    try {

        let jsonReqBody = {
            orderer : orderer,
            start_time : start_time,
            end_time : end_time,
            token_id : token_id,
            pair_token : pair_token,
            is_traded : is_traded
        }

        if(type !== "all") {
            jsonReqBody = {
                ...jsonReqBody ,
                type : type
            }
        }

        if(token_id === null) {
            jsonReqBody = {
                orderer : orderer,
                start_time : start_time,
                end_time : end_time,
                is_traded : is_traded
            }
        }
        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/search` , jsonReqBody) ;

        if(res.status === 201) {
            return "error" ;
        } 

        if(res.data.data.data.length === 0) {
            return dispatch({
                type : ActionTypes.GetOrderHistory ,
                payload : "No Available Informations."
            })
        }
            
       
        return dispatch({
            type : ActionTypes.GetOrderHistory,
            payload : res.data.data.data
        })
        
    }
    catch (err) {
        return "error" ;
    }
}


export const GetOrderTradeHistory = (orderer , start_time , end_time , token_id , pair_token , type ) => async dispatch => {
    try {

        let jsonReqBody = {
            orderer : orderer,
            start_time : start_time,
            end_time : end_time,
            token_id : token_id,
            pair_token : pair_token,
        }

        if(type !== "all") {
            jsonReqBody = {
                ...jsonReqBody ,
                type : type
            }
        }

        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/search` , jsonReqBody) ;

        if(res.status === 201) {
            return "error" ;
        } 
        if(res.data.data.data.length === 0) {
            return dispatch({
                type : ActionTypes.GetOrderTradeHistory ,
                payload : "No Available Informations."
            })
        }
       
        return dispatch({
            type : ActionTypes.GetOrderTradeHistory,
            payload : res.data.data.data
        })
        
    }
    catch (err) {
        return "error" ;
    }
}

export const GetExchangeOrderList = (start_time , end_time , token_id , pair_token  ) => async dispatch => {
    try {

        let jsonReqBody = {
            start_time : start_time,
            end_time : end_time,
            token_id : token_id,
            pair_token : pair_token,
            is_traded : false
        }

        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/search` , jsonReqBody) ;

        if(res.status === 201) {
            return "error" ;
        } 
        if(res.data.data.data.length === 0) {
            return dispatch({  
                type : ActionTypes.GetExchangeOrderList ,
                payload : "No Available Informations."
            })
        }
       
        return dispatch({
            type : ActionTypes.GetExchangeOrderList,
            payload : res.data.data.data
        })
        
    }
    catch (err) {
        return "error" ;
    }
}