

import * as config from "../../static/constants" ;
// import ActionTypes from "./actionTypes";
import axios from 'axios' ;
import ActionTypes from "./actionTypes";

export const GetTokenTradeHistory = async (token_id , pair_type) =>  {

    try {
        let res = await axios.post(`${config.PRIVATE_CALADEX_API}trade/get` , {token_id : token_id , pair_token : pair_type}) ;
        
        if(res.data.data.data.length === 0) {
            return [] ;
        } else {
            // console.log("adfafdads" , res.data.data.data) ;
            return res.data.data.data ;
        }
    }
    catch (err) {
        console.log(err) ;
        return [] ;
    }
}

export const GetTokenOrderList = ( token_id , pair_type , order_type=null) => async dispatch => {

    try {

        let jsonReqBody ;

        if(order_type === null)  {
            jsonReqBody = {
                token_id : token_id ,
                pair_token : pair_type
            }
        } else {
            jsonReqBody = {
                token_id : token_id , 
                pair_token : pair_type ,
                type : order_type
            }
        }


        // alert(JSON.stringify(jsonReqBody));

        let res = await axios.post(`${config.PRIVATE_CALADEX_API}order/get` , jsonReqBody) ;

        if(order_type === "sell") {
            
            return dispatch({
                type : ActionTypes.GetTokenOrderSellList ,
                payload : res.data.data.data
            })
        }
        if(order_type === "buy"){

            return dispatch({
                type : ActionTypes.GetTokenOrderBuyList ,
                payload : res.data.data.data
            })
        }
        
    }
    catch (err) {
        console.log(err) ;
    }
}

export const GetTokenTradeList = (token_id , pair_type) => async dispatch => {
    try {

        let res = await axios.post(`${config.PRIVATE_CALADEX_API}trade/get` , { 
            token_id : token_id ,
            pair_token : pair_type
         });

         return dispatch({
             type : ActionTypes.GetTokenTradeList ,
             payload : res.data.data.data
         })
    }
    catch (err) {
        console.log(err) ;
    }
}
