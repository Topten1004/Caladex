


import ActionTypes from "./actionTypes";
import * as config from "../../static/constants" ;
import axios from 'axios' ;
import Web3 from 'web3' ;
import { getAddressBalances } from "eth-balance-checker/lib/web3";

// const web3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161') ;
const web3 = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161') ;
// const web3 = new Web3('http://localhost:8545') ;

export const GetAllCryptoInfo = () => async dispatch => {
    try {
        let res = await axios.get(`${config.PUBLIC_API_URL}command=returnTicker`) ;

        let cryptoInfoList = [] ;

        for(let key in res.data) {
            if( key.slice(0 , 5) === "USDT_"){
                cryptoInfoList.push({
                    name : key.slice(5 , key.length) ,
                    info : res.data[key]
                });
            }
        }

        dispatch({
            type : ActionTypes.GetAllCryptoInfo ,
            payload : cryptoInfoList 
        })
        console.log(cryptoInfoList) ;
    }
    catch (err) {
        console.log(err) ;
    }
}

export const GetExchageRateToUSD = (walletInfo) => async dispatch => {
    try {
            let cryptoExchangeRateList = [] ;

            for(let element of walletInfo){
                await axios.get(`${config.PUBULIC_EXCHANGE_RATE_API}${element.Token}`)
                .then(res => {
                    cryptoExchangeRateList.push({
                        rate : res.data.data.rates.USD ,
                    })
                })
                .catch(err => {
                    cryptoExchangeRateList.push({
                        rate : "Invalid" ,
                    })

                    // let jsonString = "{'" + element.Token + "':'Invalid Currency'}" ;
                    // let jsonObj = await JSON.parse(jsonString) ;

                    // cryptoExchangeRateList.push(jsonObj) ;
                })
            
            }

            dispatch({
                type : ActionTypes.GetExchageRateToUSD ,
                payload : cryptoExchangeRateList ,
            })
    }
    catch(err) {

    }
}

export const GetAllTokenBalance = (address  , tokensInfo) => async dispatch => {

    const tokensAddress = [] ;

    await tokensInfo.map((element) => {
        tokensAddress.push(element.Address) ;
    });

    try{
        await getAddressBalances( web3 , address , tokensAddress).then(balances => {
            dispatch({
                type : ActionTypes.GetWalletBalance ,
                payload : balances 
            })
        });
    }
    catch (err) {
        console.log(err) ;
    }
}