

import React from 'react' ;

import { useState } from 'react';

import Title from '../../components/Common/Title' ;
import FruitBar from '../../components/Common/FruitBar';

import GraphTape from '../../components/Landing/GraphTape' ;
import TokenLiquidityTable from '../../components/Landing/TokenLiquidityTable';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        minHeight : "calc(100vh - 60px - 64px)"
    }
}));
const Landing = () => {

    const classes = useStyles() ;

    const [isOffTimer , setOffTimer] = useState(false) ;

    const [firstTradingIndex , setFirstTradingIndex] = useState(0) ;
    const [firstTokenInfo , setFirstTokenInfo] = useState("") ;
    const [lastTokenInfo , setLastTokenInfo] = useState("") ;
    const [middleTokenInfo , setMiddleTokenInfo] = useState('') ;
    const [countTokens , setCountTokens] = useState(0) ;

    const handleCloseTimer = () => {
        setOffTimer(true) ;
    }

    const goToNext = () => {
        switch(countTokens) {
            case 1:
                return ;
            case 2 :
                return ;
            default :
                if(firstTradingIndex === countTokens-3) {
                    return ;
                }
                setFirstTradingIndex(firstTradingIndex + 1) ;
                return;
        }
    }

    const goToPrevious = () => {

        if(firstTradingIndex === 0) {
            return ;
        }
        setFirstTradingIndex(firstTradingIndex - 1) ;
    }

    return (
        <div className={classes.root}>
            <Title 
                bigTitle={"Tokenize The World With Caladex"}
                mediumTitle={"The ETH Based Decentralized Exchange"}
                smallTitle={"Guaranteed Assets / Open & Transparent / Stake & Earn"}
                isVisibleTradeButton = {true} 
                handleCloseTimer={handleCloseTimer}
            />

            <FruitBar 
                goToPrevious={goToPrevious}
                goToNext={goToNext}
                firstTokenInfo={firstTokenInfo}
                lastTokenInfo={lastTokenInfo}
                middleTokenInfo={middleTokenInfo}
                countTokens={countTokens}
                firstTradingIndex={firstTradingIndex}
            />

            <GraphTape 
                setCountTokens={setCountTokens}
                setFirstTokenInfo={setFirstTokenInfo}
                setMiddleTokenInfo={setMiddleTokenInfo}
                setLastTokenInfo={setLastTokenInfo}
                firstTradingIndex={firstTradingIndex}
            />

            <TokenLiquidityTable 
                isOffTimer={isOffTimer}
            />
        </div>
    )
}

export default Landing ;