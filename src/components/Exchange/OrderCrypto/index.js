import * as React from 'react';

import {
    Card ,
    CardContent, 
    CardHeader,
    Divider
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue" ,
        "& .MuiCardHeader-title" : {
            fontSize : "14px !important" ,
            color : "#232E3C" ,
            width : "120px",
            height : "36px !important" ,
            display : "flex" ,
            alignItems : "center" ,
            paddingLeft : theme.spacing(2),
            borderBottom : "1px solid #206bc4" ,
            cursor : "pointer"
        } ,
        "& .MuiCardHeader-action" : {
            fontSize : "14px !important" ,
            color : "#232E3C" ,
            margin : "0px" ,
            display : "flex" ,
            alignItems : "center" ,
            height : "36px",
            paddingRight : theme.spacing(2)
        } ,
        "& .MuiCardHeader-root" : {
            padding : "0px !important" ,
            height : "36px"
        },
    } ,
    cardHeader : {
        color : theme.palette.primary.main ,
        fontWeight : "bold" ,
    }
}));

const OrderCrpyto = () => {
    const classes = useStyles() ;

    return (
        <Card className={classes.root}>
            <CardHeader 
                className={classes.cardHeader}
                title = "Current Order"
                action = {
                    <div style={{marginRight : "20px" , color : "gray" , cursor : "pointer"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                            <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                            <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                            <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                        </svg>
                        &nbsp;More
                    </div>
                }
            >

            </CardHeader>
            <Divider />
            <CardContent>
            
            </CardContent>
        </Card>
       
    );
}

export default OrderCrpyto ;