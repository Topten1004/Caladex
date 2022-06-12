import { ethers } from 'ethers';

export const setItem = (key, item) => {
    if(item) {
        window.localStorage.setItem(key, item);
    } else {
        window.localStorage.removeItem(key);
    }
}

export const removeItem = (key) => {
    if(key) return window.localStorage.removeItem(key) ;
}
export const getItem = (key) => {
    if(key) {
        return window.localStorage.getItem(key);
    }
}

export const isAuthenticated = () => {
    if(getItem('access_token')) {
        return true ;
    }
    return false ;
}

export const getLibrary = (provider) => {
    return new ethers.providers.Web3Provider(provider) ;
}

export const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask) ;
}
export const sleep =  (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export const convertBalance = (balanceBigInt , decimal) => {
    // console.log(Number(Number(balanceBigInt) / Math.pow(10  , Number(decimal)) ) ) ;
    return Number(Number(balanceBigInt) / Math.pow(10  , Number(decimal)) ) ;


}

export const json2array = (json) => {
    var result = [];
    var keys = Object.keys(json);
    
    keys.forEach( key => {
        result.push(json[key]);
    });

    return result;
}

export const formatDBDate = (db_date) => {

    if(typeof db_date === "undefined") return ;

    let removeT_db_date = db_date.replace("T" , " ") ;

    let removeTail_db_date = removeT_db_date.replace(".000Z" , "") ;

    return removeTail_db_date.toString() ;
}

export const updateDepositTokensArray = async (token_id , value) => {

    let tmp = JSON.parse(getItem('depositArray')) ;

    tmp[token_id] = value ;

    await setItem('depositArray' , JSON.stringify(tmp)) ; 
}

export const updateWithdrawTokensArray = async (token_id , value) => {

    let tmp = JSON.parse(getItem('withdrawArray')) ;

    tmp[token_id] = value ;

    await setItem('withdrawArray' , JSON.stringify(tmp)) ;
}