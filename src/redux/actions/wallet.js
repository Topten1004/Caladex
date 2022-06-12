

import ActionTypes from "./actionTypes"
import { setItem } from '../../utils/helper'
import Web3 from 'web3' ;

export const SetWalletAddress = ( address ) => async dispatch => {
    try {
        
        setItem("address" , address) ;

        dispatch({
            type : ActionTypes.SetWalletAddress ,
            payload : address , 
        });
    }
    catch(err) {
        console.log(err) ;
    }
}

export const GetWalletBalance = (address) => async dispatch => {
    try {
        
        // const web3 = new Web3('http://localhost:8545') ;
    
        // if(web3) web3.eth.getBalance( address, (err,bal) => { 
        //             // console.log('account 1 balance :' , web3.utils.fromWei(bal, 'ether'))
        //         })
    }
    catch(err){
        console.log(err) ;
    }
}
