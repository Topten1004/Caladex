



import React from 'react' ;

import {
    Box, 
    CircularProgress ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "10px",
        padding : "20px",
        textAlign : "center" ,
        "& .MuiGrid-item" : {
            marginBottom : "15px"
        },
        "& .MuiButton-root" : {
            borderRadius : "15px",
            marginLeft : "5px",
            marginRight : "5px"
        }
    },
    btGp : {
        "& .MuiButton-root" : {
            borderRadius : "5px",
            marginLeft : "15px",
            marginRight : "15px" ,
            textTransform : "capitalize"
        }
    }
}));

const SelectPairToken = () => {
    
    const classes = useStyles() ;

    return (
        <Box component={"div"} className={classes.root}>
            <CircularProgress size={30} />
        </Box>
    )
}
export default SelectPairToken;