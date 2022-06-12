
import axios from 'axios' ;
import ActionTypes from './actionTypes';
import * as config from "../../static/constants" ;
import { convertBalance, json2array } from '../../utils/helper';

// import Web3 from 'web3' ;
// import { getAddressBalances } from "eth-balance-checker/lib/web3";

import { getTokensBalance } from '@mycrypto/eth-scan';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider' ;

// Get a Web3 provider from somewhere
// const web3 = new Web3;

const web3 = new Web3('https://ropsten.infura.io/v3/f957dcc0cb6c430f9d32c2c085762bdf') ;
// const web3 = new Web3('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161') ;

export const AddToken = (fn) => async dispatch => {
    try {
        // let fn = new FormData() ;

        const res = await axios.post(`${config.PRIVATE_CALADEX_API}token/add` , fn) ;

        if(res.data.status === "success") {
            dispatch({
                type : ActionTypes.AddTokenSuccess ,
                payload : "SUCCESS"
            })
        } else {
            dispatch({
                type : ActionTypes.AddTokenError ,
                payload : "ERROR"
            })
        }
    }
    catch (err) {
        dispatch({
            type : ActionTypes.AddTokenError ,
            payload : "ERROR"
        })
    }
}


export const ConfirmAddToken = (confirmMessage) => async dispatch => {
    dispatch({
        type : ActionTypes.ConfirmAddToken ,
        payload : confirmMessage
    })
}

export const GetTokenInfoList = (status = "" , pair_type="" , token_symbol = "" ) => async dispatch => {
    
    if(status === "") {
        dispatch({
            type : ActionTypes.GetTokenInfoList ,
            payload : []
        }) ;

        return ;
    }

    try {
        
        let jsonBody ;
        if(pair_type === "") {
            jsonBody = {
                status : status ,
                search_str : token_symbol
            }
        } else {
            jsonBody = {
                status : status ,
                pair_type : pair_type ,
                search_str : token_symbol
            }
        }
        let res = await axios.post(`${config.PRIVATE_CALADEX_API}token/get` , jsonBody) ;

        if(res.data.data.data.length === 0 ){
            return dispatch({
                type : ActionTypes.GetTokenInfoList ,
                payload : ['No Avaliable Informations.']
            });
        }

        let tokenInfoList = [] ;

        for(let element of res.data.data.data) {
            let pair_type_array = element.pair_type.split(",") ;
            for(let pair of pair_type_array) {
                switch(pair_type) {
                    case "ETH" : 
                        if(pair === "ETH") {
                            await tokenInfoList.push({
                                ...element ,
                                pair_type : pair
                            })
                        }
                        break ;
                    case "USDT" :
                        if(pair === "USDT") {
                            await tokenInfoList.push({
                                ...element ,
                                pair_type : pair
                            })
                        }
                        break ;
                    default :
                        await tokenInfoList.push({
                            ...element ,
                            pair_type : pair
                        })
                        break ;
                }
            }
        }

        dispatch({
            type : ActionTypes.GetTokenInfoList ,
            payload : tokenInfoList
        })

    }
    catch (err) {
        console.log(err) ;
    }
}

export const GetTokenLiquidityList = (status = "" , pair_type="" , token_symbol = "") => async dispatch => {
    
    if(status === "") {
        dispatch({
            type : ActionTypes.GetTokenLiquidityList ,
            payload : []
        }) ;

        return ;
    }

    try {
        let jsonBody ;

        if(pair_type === "") {
            jsonBody = {
                status : status ,
                search_str : token_symbol ,
            }
        } else {
            jsonBody = {
                status : status ,
                search_str : token_symbol ,
                pair_type : pair_type
            }
        }
        let resTokenInfo = await axios.post(`${config.PRIVATE_CALADEX_API}token/get` , jsonBody) ;

        if(resTokenInfo.data.data.data.length === 0 ){
            return dispatch({
                type : ActionTypes.GetTokenLiquidityList ,
                payload : ['No Avaliable Informations.']
            });
        }

        /// backend data
        let tokenInfoList = [] ;

        for(let element of resTokenInfo.data.data.data) {
            let pair_type_array = element.pair_type.split(",") ;
            for(let pair of pair_type_array) {
                switch(pair_type) {
                    case "ETH" : 
                        if(pair === "ETH") {
                            await tokenInfoList.push({
                                ...element ,
                                pair_type : pair
                            })
                        }
                        break ;
                    case "USDT" :
                        if(pair === "USDT") {
                            await tokenInfoList.push({
                                ...element ,
                                pair_type : pair
                            })
                        }
                        break ;
                    default :
                        await tokenInfoList.push({
                            ...element ,
                            pair_type : pair
                        })
                        break ;
                }
            }
        }

        // third party data
        let resTicker = await axios.get(`${config.PUBLIC_API_URL}command=returnTicker`) ;

        let tokenLiquidityList = [] ;

        for (let element of tokenInfoList ){
            if ( typeof resTicker.data[element.pair_type + "_" + element.symbol] === "undefined" && typeof resTicker.data[element.symbol + "_" + element.pair_type] === "undefined" ){

                let resToken = await axios.post(`${config.PRIVATE_CALADEX_API}tokenInfo/getOne`,{
                    token_id : element._id ,
                    pair_token : element.pair_type
                }) ;

                await tokenLiquidityList.push({
                    ...element ,
                    price : resToken.data.data.data.price ,
                    last : resToken.data.data.data.last_price ,
                    percentChange : resToken.data.data.data.day_change ,
                    high24hr : resToken.data.data.data.day_high ,
                    low24hr : resToken.data.data.data.day_low ,
                    volume24hr : resToken.data.data.data.volume ,
                    total24hr : 0 ,
                })
            } 
            else if (typeof resTicker.data[element.pair_type + "_" + element.symbol] !== "undefined") {

                    let resToken = await axios.get(`${config.PUBULIC_EXCHANGE_RATE_API}${element.symbol}`) ;

                    await tokenLiquidityList.push({
                        ...resTicker.data[element.pair_type + "_" + element.symbol] ,
                        _id : element._id ,
                        symbol : element.symbol ,
                        pair_type : element.pair_type ,
                        logo_url : element.logo_url ,
                        total24hr : resTicker.data[element.pair_type + "_" + element.symbol].quoteVolume * resToken.data.data.rates.USD ,
                        price : resToken.data.data.rates[element.pair_type]
                    })                
                } else {
                    let resToken = await axios.get(`${config.PUBULIC_EXCHANGE_RATE_API}${element.symbol}`) ;

                    await tokenLiquidityList.push({
                        ...resTicker.data[element.symbol + "_" + element.pair_type] ,
                        _id : element._id ,
                        symbol : element.symbol ,
                        pair_type : element.pair_type ,
                        logo_url : element.logo_url ,
                        total24hr : resTicker.data[element.symbol + "_" + element.pair_type].quoteVolume * resToken.data.data.rates.USD ,
                        price : resToken.data.data.rates[element.pair_type] ,
                    })      
            }

        }
        
        await dispatch({
            type : ActionTypes.GetTokenLiquidityList ,
            payload : tokenLiquidityList 
        })
    }
    catch(err) {
        console.log(err) ;
    }
}


export const GetTokenBalanceInfo = (account , search_token) => async dispatch => {

    try {
        let jsonRequestBody  = {
            status : "approved" ,
            search_str : search_token
        }

        let resTokenInfo = await axios.post(`${config.PRIVATE_CALADEX_API}token/get` , jsonRequestBody) ;

        if(resTokenInfo.data.data.data.length === 0) {
            return dispatch({
                type : ActionTypes.GetTokenBalanceInfo ,
                payload : []
            });
        }

        let tokenBaseInfoList = resTokenInfo.data.data.data ;

        let tokenAddresses = [] ;
        let tokenDecimals = {} ;


        for(let element of resTokenInfo.data.data.data) {
            await tokenAddresses.push(element.address) ;
            tokenDecimals[element.address] = element.decimal ;
        }

        let tokenRateInfoList = new Object() ;

        for(let element of tokenBaseInfoList){
            try {
                let res = await axios.get(`${config.PUBULIC_EXCHANGE_RATE_API}${element.symbol}`) ;

                tokenRateInfoList[element.address] = {
                    ...element, 
                    rate :  res.data.data.rates.USD ,
                    orderOfCaladex : 0 ,
                    balanceOfCaladex : 0
                } ;
            }
            catch (err) {
                tokenRateInfoList[element.address] = {
                    ...element, 
                    rate :  0 ,
                    orderOfCaladex : 0 ,
                    balanceOfCaladex : 0
                } ;
            }
        }

        let tokenBalances = [] ;
      
        await getTokensBalance(web3, account, tokenAddresses)
        .then( (balances) => {
             tokenBalances = balances ;
        })
        .catch(err => {

        });

        let tokenBalanceInfo = [] ;

        for(let address in tokenRateInfoList) {
            tokenRateInfoList[address] = {
                ...tokenRateInfoList[address] ,
                balanceOfwallet : convertBalance( tokenBalances[address] , tokenDecimals[address] ) 
                
            }
        }

        let resTokenBalancesOfCaladex = await axios.post(`${config.PRIVATE_CALADEX_API}balance/get/${account}`) ;

        for(let element of resTokenBalancesOfCaladex.data.data.doc) {
            if(typeof tokenRateInfoList[element.token_id.address] !== "undefined"){
                tokenRateInfoList[element.token_id.address] = {
                    ...tokenRateInfoList[element.token_id.address] ,
                    balanceOfCaladex : element.caladex_balance ,
                    orderOfCaladex : element.order_balance
                }
            }
        }

        tokenBalanceInfo = await json2array(tokenRateInfoList) ;

        dispatch({
            type : ActionTypes.GetTokenBalanceInfo ,
            payload : tokenBalanceInfo 
        })
    }
    catch (err) {
        console.log(err) ;
    }
}

// export const GetTokenPairInfoList = () => async dispatch => {

//     try
//     {
//         let pair_type = "ETH" ;

//         let tokenPairInfoList = [] ;

//         let resTokenInfo = await axios.post(`${config.PRIVATE_CALADEX_API}token/get` , {
//             status : "approved" ,
//             search_str : ""
//         }) ;

//         let resThirdParty = await axios.get(`${config.PUBLIC_API_URL}command=returnTicker`) ;

//         for(let element of resTokenInfo) {
//             resThirdParty[]
//             tokenPairInfoList
//         }

//         console.log(resThirdParty) ;
//         console.log(resTokenInfo);
//     }
//     catch(err) {
//         console.log(err) ;
//     }
// }