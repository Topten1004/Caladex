


import React from 'react' ;

import { useNavigate } from 'react-router-dom' ;
import { useWeb3React } from '@web3-react/core' ;

import GridViewIcon from '@mui/icons-material/GridView';

import swal from 'sweetalert' ;
import clsx from 'clsx';

import {
    Box,
    Grid ,
    Stack
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        height : "30px" ,
        display : "flex" ,
        alignItems : "flex-end" ,
        paddingLeft : "30px",
        paddingRight : "30px",
        borderBottom : "1px solid gray"
    },
    tab : {
        paddingLeft : "10px" ,
        paddingRight :"10px" ,
        fontWeight : "bold" ,
        cursor : "grab"
    },
    active : {
        borderBottom : "1px solid blue"
    } ,
    stack : {
        width : "100%"
    }
}));

const RecentSelectBox = () => {
    
    const { active } = useWeb3React() ;

    const classes = useStyles() ;

    const navigate = useNavigate() ;

    const goToMoreOrder = () => {
        if(!active){
            swal({
                title : "Warning" ,
                text : "You have to connect to metamask." ,
                icon : "warning" ,
                timer : 2000 ,
                button : false
            })
        } else navigate("/orders") ;
    }

    return (
        <Box component={"div"} className={classes.root}>
            <Stack flexDirection={"row"} justifyContent={"space-between"} className={classes.stack}>
                <Box component={"div"} className={ clsx(classes.tab , classes.active) }>
                    Current Order
                </Box>
                {/* <Box component={"div"} onClick={() => goToMoreOrder()}>
                    <GridViewIcon /> More
                </Box> */}
            </Stack>
        </Box>
    )
}

export default RecentSelectBox ;