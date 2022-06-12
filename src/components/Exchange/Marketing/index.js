

import React, { useState } from 'react' ;

import { useWeb3React } from '@web3-react/core';

import MarketSelectBox from './MarketSelectBox';
import BuyAndSell from './BuyAndSell' ;
import WalletConnect from '../WalletConnect';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        // maxHeight : "calc(50vh - 113.815px)" ,
        // height : "calc(50vh - 113.815px)" ,
    } ,
}));

const Marketing = (props) => {
    
    const classes = useStyles() ;

    const { active } = useWeb3React() ;
    

    const  { 
        tradeToken , price , status , handleChangePrice ,
        methodType , setMethodType
    } = props ;
    
    return (
        <Box component={"div"} className={classes.root}>
            <MarketSelectBox 
                setMethodType={setMethodType}
                methodType={methodType}
                handleChangePrice={handleChangePrice}
                tradeToken={tradeToken}
            />
            {
                active ? <BuyAndSell 
                    price={price}
                    tradeToken={tradeToken}
                    status={status}
                    handleChangePrice={handleChangePrice}
                    methodType={methodType}
                /> : <WalletConnect 
                />
            }
            
        </Box>
    )
}

export default Marketing ;