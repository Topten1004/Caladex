



import React from 'react' ;

import {
    Box
} from '@mui/material' ;


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        borderBottom : "2px solid lightgray" ,
        height : "40px" ,
        display : "flex" ,
        alignItems : "flex-end" ,
        paddingLeft : "20px" ,
        fontWeight : "bold"
    },
    token :{
        fontSize : "13px",
        paddingLeft : "15px"
    }
}));

const TradeSelectBox = (props) => {

    const { tradeToken  } = props ;

    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            Market Trade  
            <Box component="span" className={classes.token}>
                ({ tradeToken ? ( tradeToken.symbol + " / " + tradeToken.pair_type ) : "..."})
            </Box>
        </Box>
    )
}


export default TradeSelectBox ;