

import axios from 'axios' ;
import { PRIVATE_CALADEX_API } from '../../static/constants';
import { json2array } from '../../utils/helper';
import ActionTypes from './actionTypes';


export const GetTokenStakeInfoList = (account ,method , token_symbol) => async dispatch => {
    
    try {
        let resStakeInfo = await axios.post(`${PRIVATE_CALADEX_API}stake/get` , {search_str : token_symbol}) ;

        if(resStakeInfo.data.data.data.length === 0) {
            return dispatch({
                type : ActionTypes.GetTokenStakeInfoList ,
                payload : "No Available Information."
            }) ;
        } 

        let tokenStakeInfo = {} ;

        let resBalanceInfo = await axios.post(`${PRIVATE_CALADEX_API}balance/get/${account}`) ;

        let tokenBalanceInfo = {} ;

        for(let element of resBalanceInfo.data.data.doc) {
            tokenBalanceInfo[element.token_id.address] = element.caladex_balance ;
        }

        for(let element of resStakeInfo.data.data.data) {
            
            if(typeof tokenBalanceInfo[element.token_id.address] !== "undefined"){
                tokenStakeInfo[element._id] = {
                    ...element ,
                    is_stake : false ,
                    duration : '--' ,
                    balance : tokenBalanceInfo[element.token_id.address]
                }
            } else {
                tokenStakeInfo[element._id] = {
                    ...element ,
                    is_stake : false ,
                    duration : '--' ,
                    balance : 0
                }
            }
        }

        let resStakeLogInfo = await axios.post(`${PRIVATE_CALADEX_API}stakelog/get/${account}`) ;

        for(let element of resStakeLogInfo.data.data.doc) {
            if(typeof tokenStakeInfo[element.stake_id._id] !== "undefined"){
                tokenStakeInfo[element.stake_id._id].is_stake = true ;
                tokenStakeInfo[element.stake_id._id].duration = element.duration ;   
                tokenStakeInfo[element.stake_id._id].stakelog_id = element.stakelog_id ;  
            }
        } 


        let tokenStakeInfoArray = json2array(tokenStakeInfo) ;

        return dispatch({
            type : ActionTypes.GetTokenStakeInfoList ,
            payload : tokenStakeInfoArray
        })
    }
    catch(err) {
        console.log(err) ;
    }
}

export const AddTokenStakeLog = (account , stake_id , amount  , duration) => async dispatch => {
    try{
        let res = await axios.post(`${PRIVATE_CALADEX_API}stakelog/add` , {
            address : account ,
            stake_id : stake_id ,
            amount : amount ,
            duration : duration ,
        });

        if(res.status === 201) {
            return "Error" ;
        }
        return "Ok" ;
    }
    catch (err) {
        console.log(err) ;
        return "Error" ;
    }
}
export const RemoveTokenStakeLog = async (account , stakelog_id) => {
    try {
        let res = await axios.post(`${PRIVATE_CALADEX_API}stakelog/unstake` , {
            address : account ,
            stakelog_id : stakelog_id
        }) ;

        if(res.status === 201) {
            return "Error" ;
        }
        return "Ok" ;
    }
    catch (err) {
        console.log(err) ;
        return "Error" ;
    }
}
export const GetStakingInfo = async (stakelog_id ) => {
    try {
        let res = await axios.post(`${PRIVATE_CALADEX_API}stakelog/info` , {
            stakelog_id : stakelog_id
        }) ;

        if(res.status === 201) {
            return "Error" ;
        }

        return res.data.data.doc ;
    }
    catch (err) {
        console.log(err) ;
        return "Error" ;
    }
}

export const GetStakeDateTime = async () =>  {
    try {
        let resDateTime = await axios.post(`${PRIVATE_CALADEX_API}stake/time` , {}) ;

        return resDateTime.data.current_time ;
    }
    catch (err) {
        console.log(err) ;
    }
}