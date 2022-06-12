

import React from 'react' ;

import { useState }  from 'react' ;

import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';

import {
    Box ,
    FormControl,
    RadioGroup,
    FormControlLabel ,
    Radio
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        boxSizing : "border-box" ,
        padding : "5px",

        height : "30px",
        
        display : "flex" ,
        justifyContent : "space-between" ,
        alignItems : "center" ,

        borderBottom : "1px solid gray"
    },
    searchGp : {
        "& svg" : {
            fontSize : "20px"
        },
        "& input" : {
            border : "none" ,
            width : "70%" ,
            fontSize : "12px"
        },
        "& input:focus" : {
            outline : "none"
        }
    },
    radioGp : {
        display : "flex" ,
        alignItems : "center" ,
        fontSize : "12px",
        "& input" :{
            marginLeft : "15px",
            marginRight : "5px"
        }
    }
}));

const TokenSearchBox = () => {

    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
           <Box component={"div"} className={classes.searchGp}>
                <SavedSearchOutlinedIcon />
                <Box component={"input"}/>
           </Box>
           <Box component={"div"} className={classes.radioGp}>
                <Box component={"input"} type="radio" name={"setting"} value={1} defaultChecked/>Volume
                <Box component={"input"} type="radio" name={"setting"} value={2} />Balance
           </Box>
        </Box>
    )
}

export default TokenSearchBox ;