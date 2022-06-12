

import React, { useEffect , useState } from 'react' ;

// import ReactApexChart from 'react-apexcharts' ;
import PropTypes from 'prop-types' ;

import {
    useMediaQuery ,
    CircularProgress
} from '@mui/material' ;

// import { MiniChart } from 'react-ts-tradingview-widgets' ;
import { makeStyles } from '@mui/styles';

import MiniCalaDexTradingView from '../../Common/MiniCalaDexTradingView';

import { GetTokenInfoList } from '../../../redux/actions/token';

import { getItem , setItem } from '../../../utils/helper' ;
import { connect } from 'react-redux';

let tokenTradeTimer ;

const useStyles = makeStyles((theme) => ({
   root : {
        marginTop : theme.spacing(4) + " !important" ,
        paddingLeft : "5% !important" ,
        paddingRight : "5% !important" ,
        display : "flex" ,
        justifyContent : "space-around" ,
        alignItems : "center" ,
        minHeight : "250px" ,
      
   } ,
   graphTape : {
        display : "flex" ,
        justifyContent : "space-around" ,
        alignItems:"center" ,
        flexDirection : "row" ,
        width : "100%"
    }
}));

const GraphTape = (props) => {

    const { setFirstTokenInfo , setLastTokenInfo, setMiddleTokenInfo , firstTradingIndex , setCountTokens ,  tokenInfoList, GetTokenInfoList  } = props ;

    const classes = useStyles() ;

    const isXs = useMediaQuery("(min-width : 1227px)") ;
    const isXls = useMediaQuery("(min-width:556px)");

    const setTimerForTokenInfoList =  async () => {
        clearInterval(tokenTradeTimer) ;

        tokenTradeTimer = setInterval(async () => {
            if( Number( getItem('pageIndex') ) !== 0 ){
                clearInterval(tokenTradeTimer) ;
                return ;
            }
            GetTokenInfoList('approved') ;
            return ;
        } , 8000 )
    }

    useEffect(async () =>  {

        if(!getItem('pageIndex')){
            setItem('pageIndex' , "0") ;
            return ;
        }
        
        await GetTokenInfoList('approved') ;

    } , [getItem('pageIndex')]);

    useEffect(() => {
        if(tokenInfoList.length !== 0 && setCountTokens) {
            setCountTokens(tokenInfoList.length) ;
        }
    } , [tokenInfoList]) ;

    useEffect(() => {
        if(tokenInfoList.length >= 3 && setFirstTokenInfo && setLastTokenInfo) {
            setFirstTokenInfo(tokenInfoList[firstTradingIndex].name+"(" + tokenInfoList[firstTradingIndex].symbol + " / " + tokenInfoList[firstTradingIndex].pair_type + ")") ;
            setMiddleTokenInfo(tokenInfoList[firstTradingIndex+1].name+"(" + tokenInfoList[firstTradingIndex+1].symbol +  " / " + tokenInfoList[firstTradingIndex+1].pair_type +  ")")
            setLastTokenInfo(tokenInfoList[firstTradingIndex+2].name+"(" + tokenInfoList[firstTradingIndex+2].symbol + " / " + tokenInfoList[firstTradingIndex+2].pair_type + ")") ;
        }
        if(tokenInfoList.length === 2 && setFirstTokenInfo && setLastTokenInfo) {
            setFirstTokenInfo(tokenInfoList[firstTradingIndex].name+"(" + tokenInfoList[firstTradingIndex].symbol + " / " + tokenInfoList[firstTradingIndex].pair_type + ")") ;
            setLastTokenInfo(tokenInfoList[firstTradingIndex+1].name+"(" + tokenInfoList[firstTradingIndex+1].symbol +  " / " + tokenInfoList[firstTradingIndex+1].pair_type +  ")")
        }
        if(tokenInfoList.length === 1 && setFirstTokenInfo && setLastTokenInfo) {
            setMiddleTokenInfo(tokenInfoList[firstTradingIndex].name+"(" + tokenInfoList[firstTradingIndex].symbol + " / " + tokenInfoList[firstTradingIndex].pair_type + ")") ;
        }
    } , [firstTradingIndex , tokenInfoList]) ;
    
    return (
        <>
            <div className={classes.root}>
                {
                    tokenInfoList.length === 0 ? 
                    <>
                        <CircularProgress />
                    </> : 
                    <div className={classes.graphTape} sx={{flexDirection: isXs ? "row" : "column" , justifyContent: isXs ? "space-around" : "center"}}>
                            <MiniCalaDexTradingView 
                                symbol={tokenInfoList[firstTradingIndex].symbol}
                                pairType={tokenInfoList[firstTradingIndex].pair_type}
                                logoUrl={tokenInfoList[firstTradingIndex].logo_url}
                                tokenName={tokenInfoList[firstTradingIndex].name}
                                pairTokenName={tokenInfoList[firstTradingIndex].pair_type === "ETH" ? "Ethereum" : "Tether"}
                                token_id = {tokenInfoList[firstTradingIndex]._id}
                                currentPrice={"3337.04"}
                                percentChange={"0.11"}
                                total={"3.69"}
                                width={isXs ? "350px" : isXls ? "500px" : "300px"}
                                height={isXs ? "200px" : isXls ? "250px" : "150px"}
                            />
                            {
                                tokenInfoList.length >=2 ? <MiniCalaDexTradingView
                                    symbol={tokenInfoList[firstTradingIndex+1].symbol}
                                    logoUrl={tokenInfoList[firstTradingIndex+1].logo_url}
                                    pairType={tokenInfoList[firstTradingIndex+1].pair_type}
                                    tokenName={tokenInfoList[firstTradingIndex+1].name}
                                    pairTokenName={tokenInfoList[firstTradingIndex+1].pair_type === "ETH" ? "Ethereum" : "Tether"}
                                    token_id = {tokenInfoList[firstTradingIndex+1]._id}
                                    currentPrice={"3337.04"}
                                    percentChange={"0.11"}
                                    total={"3.69"}
                                    width={isXs ? "350px" :  isXls ? "500px" : "300px"}
                                    height={isXs ? "200px" : isXls ? "250px" : "150px"}
                                /> : <></>
                            }
                            {
                                tokenInfoList.length >= 3 ? <MiniCalaDexTradingView
                                    symbol={tokenInfoList[firstTradingIndex+2].symbol}
                                    logoUrl={tokenInfoList[firstTradingIndex+2].logo_url}
                                    pairType={tokenInfoList[firstTradingIndex+2].pair_type}
                                    tokenName={tokenInfoList[firstTradingIndex+2].name}
                                    pairTokenName={tokenInfoList[firstTradingIndex+2].pair_type === "ETH" ? "Ethereum" : "Tether"}
                                    token_id = {tokenInfoList[firstTradingIndex+2]._id}
                                    currentPrice={"3337.04"}
                                    percentChange={"0.11"}
                                    total={"3.69"}
                                    width={isXs ? "350px" : isXls ? "500px" : "300px"}
                                    height={isXs ? "200px" : isXls ? "250px" : "150px"}
                                /> : <></>
                            }
                             
                            
                    </div>
                }
                {/* <CircularProgress /> */}
                
            </div>
        </>
    )
}

GraphTape.propsType = {
    tokenInfoList : PropTypes.array.isRequired
}
const mapStateToProps = state => ({
    tokenInfoList : state.token.tokenInfoList
});

const mapDispatchToProps = {
    GetTokenInfoList
}
export default connect(mapStateToProps , mapDispatchToProps)(GraphTape) ;