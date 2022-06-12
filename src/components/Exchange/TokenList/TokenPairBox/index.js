

import React from 'react' ;

import { useState }  from 'react' ;

import StarIcon from '@mui/icons-material/Star';

import {
    Box ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        boxSizing : "border-box" ,

        display:"flex" ,
        alignItems : "flex-end" ,
        justifyContent : "space-around",
        
        borderBottom : "2px solid lightgray" ,
        
        height : "40px" ,
        
        "& div" :{
            cursor : "pointer" ,
            fontWeight : "bold" ,
            paddingLeft :  "20px" ,
            paddingRight : "20px"
        }
    },
    active : {
        borderBottom : "1px solid blue"
    }
}));

const TokenPairBox = () => {

    const classes = useStyles() ;

    const [pairType , setPairType] = useState("ETH") ;

    const emitPairType = (pairType) => {
        setPairType(pairType) ;

        return ;
    }

    return (
        <Box component={"div"} className={classes.root}>
            <Box component={"div"}>
                <StarIcon />
            </Box>
            <Box component={"div"} onClick={() => emitPairType("ETH")} className={pairType === "ETH" ? classes.active : ""}>
                ETH
            </Box>
            <Box component={"div"} onClick={() => emitPairType("USDT")} className={pairType === "USDT" ? classes.active : ""}>
                USDT
            </Box>
        </Box>
    )
}

export default TokenPairBox ;