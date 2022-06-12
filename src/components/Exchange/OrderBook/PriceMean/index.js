


import React from 'react' ;


import {
    Box
} from '@mui/material' ;


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,
        height : "33px" ,
        fontSize : "14px" ,
        fontWeight : "bold" ,
        color : props => `${props.color}`
    }
}));

const PriceMean = () => {
    
    const classes = useStyles({color :  "#c74a4d"}) ;

    return (
        <Box component={"div"} className={classes.root}>
            36605.21578968 USD
        </Box>
    )
}

export default PriceMean ;