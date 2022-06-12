
import React, { useEffect , useState} from 'react' ;

import Title from '../../components/Common/Title';
import CalaDexTradingTickerTape from '../../components/Common/CalaDexTradingTickerTape' ;

import StakingTable from '../../components/EarnStaking/StakingTable' ;
import { TickerTape } from 'react-ts-tradingview-widgets';

import { makeStyles } from '@mui/styles';
import { getItem } from '../../utils/helper';

const useStyles = makeStyles(() => ({
    root : {
        minHeight : "calc( 100vh - 125px )" ,
    }
}));
const EarnStaking = () => {

    const classes = useStyles() ;

    return (
        <div className={classes.root}>
            <Title 
                bigTitle = {"Caladex Earn/Staking"}
                mediumTitle = {"Caladex Staking, dedicated to increasing user staking income"}
                smallTitle = {"Simple & Secure. Search popular coins and start earning."}
                isVisibleTradeButton = {false}
            />
            
            <CalaDexTradingTickerTape />
            
            {/* <TickerTape /> */}

            <StakingTable />
        </div>
    )
}

export default EarnStaking ;