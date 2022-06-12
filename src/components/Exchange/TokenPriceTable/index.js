import * as React from 'react';

import {
    Card ,
    CardContent ,
} from '@mui/material' ;

// import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue" ,
        height : "450px"
    } ,
    crpytoList : {
        overflowX : "scroll !important"
    }
}));


const TokenPriceTable = () => {
    const classes = useStyles() ;

    return (
        <Card className={classes.root}>
            <CardContent >
               {/* <CryptoCurrencyMarket 
                    width="100%"
                    height={250}
                    locale='en'

                    className={classes.crpytoList}
               /> */}

                <iframe     src="https://widget.coinlib.io/widget?type=full_v2&amp;theme=light&amp;cnt=9&amp;pref_coin_id=1505&amp;graph=yes" 
                            width="100%" 
                            height="450px" 
                            scrolling="auto" 
                            marginWidth="0" 
                            marginHeight="0" 
                            frameBorder="0" 
                            border="0" 
                            style={{ border:"0px" ,margin:"0px" ,padding:"0px" }} 
                            title="Token Price"
                            className="lv">

                </iframe>
            </CardContent>
        </Card>
       
    );
}

export default TokenPriceTable ;