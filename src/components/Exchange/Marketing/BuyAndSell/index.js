

import React from 'react' ;

import Options from './Options' ;
import SelectPairToken from './SelectPairToken';

import clsx from 'clsx';

import {
    Box ,
    Grid ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {

        '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor : "lightgray",
            borderRadius : "5px"
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius : "5px"
        },

        overflow :"hidden" ,
        overflowY : "scroll" ,
        height : "calc(100vh - 163px)" ,
        borderBottom : "1px solid gray" ,
        display : "flex " ,
    } ,
    btGp : {
        textAlign : "right" ,
        marginBottom : "15px !important",
        marginRight : clsx( theme.spacing(7) , " !important" ) ,
        "& .MuiButton-root" : {
            marginLeft : "25px"
        }
    }
}));

const BuyAndSell = (props) => {
    
    const {
        tradeToken , price , status , methodType ,
        handleChangePrice 
    } = props ;

    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.panel}>
                    {
                        tradeToken ? <Options 
                            tradeToken={tradeToken}
                            methodType={methodType}
                            price={price}
                            status={status}
                            handleChangePrice={handleChangePrice}
                        /> :<SelectPairToken />
                    }
                    
                </Grid>
            </Grid>
        </Box>
    )
}

export default BuyAndSell ;