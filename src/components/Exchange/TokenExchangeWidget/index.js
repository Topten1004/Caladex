import * as React from 'react';

import { useState , useRef , useEffect } from 'react' ;

import {
    Card ,
    CardContent, 
    CardHeader,
    Divider,
    Grid,
    Typography ,
    Button,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue" ,
        "& .MuiCardContent-root" : {
            padding : "0px" ,
            marginTop : "24px" ,
        },
        "& .MuiCardHeader-title" : {
            fontSize : "14px !important" ,
            color : "#232E3C" ,
            width : "60px",
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
            paddingRight : theme.spacing(2) ,
            cursor : "pointer"
        } ,
        "& .MuiCardHeader-root" : {
            padding : "0px !important" ,
            height : "36px"
        },
    } ,
    content : {
        '& .MuiGrid-item' :{
            paddingBottom : theme.spacing(1) + " !important" ,
            textAlign : "center" ,
        }
    },
    amountFont : {
        fontSize : '10px',
        color : theme.palette.primary.main,
        fontWeight : "bold 1important" ,
    }
}));


const TokenExchangeWidget = () => {
    const classes = useStyles() ;

    const [amount1 , setUSDTAmount1] = useState(50) ;
    const [amount2 , setUSDTAmount2] = useState(50) ;

    const priceCtrl1 = useRef(null) ;
    const priceCtrl2 = useRef(null) ;
    
    useEffect(() => {
 
        if(priceCtrl1.current && priceCtrl2.current){
            priceCtrl1.current.value = amount1 ;
            priceCtrl2.current.value = amount2 ;
        }

    } , [amount1 , amount2]) ;

    return (
        <Card className={classes.root}>
            <CardHeader
                // className={classes.cardHeader}
                title = "List"
                action = {
                    <>0 trading fee for all orders</>
                }
            >
                
            </CardHeader>
            <Divider />
            <CardContent >
                <Grid container>
                    <Grid item xs={6} >
                        <div className='card ml-3 mr-1'>
                            <div className='card-body'>
                                <Grid container className={classes.content}>
                                    <Grid item xs={12}>
                                        <div className='input-group'>
                                            <label className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    Price
                                                </span>
                                            </label>
                                            <input type="text" className='form-control' ref={priceCtrl1}/>
                                            <label className='input-group-append'>
                                                <span className='input-group-text'>
                                                    USDT
                                                </span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className='input-group'>
                                            <label className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    Amount
                                                </span>
                                            </label>
                                            <input type="text" className='form-control' />
                                            <label className='input-group-append'>
                                                <span className='input-group-text'>
                                                    ETH
                                                </span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input type="range" className="custom-range" min="0" max="100" onChange={(e) => setUSDTAmount1(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.amountFont}>Trading Amount: <span style={{color : "black", fontWeight: "bold"}}> {amount1} USDT </span></Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained">Buy Now</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className='card ml-1 mr-2'>
                            <div className='card-body'>
                                <Grid container className={classes.content}>
                                    <Grid item xs={12}>
                                        <div className='input-group'>
                                            <label className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    Price
                                                </span>
                                            </label>
                                            <input type="text" className='form-control' ref={priceCtrl2}/>
                                            <label className='input-group-append'>
                                                <span className='input-group-text'>
                                                    USDT
                                                </span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className='input-group'>
                                            <label className='input-group-prepend'>
                                                <span className='input-group-text'>
                                                    Amount
                                                </span>
                                            </label>
                                            <input type="text" className='form-control' />
                                            <label className='input-group-append'>
                                                <span className='input-group-text'>ETH</span>
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <input type="range" className="custom-range"  min="0" max="100" onChange={(e) => setUSDTAmount2(e.target.value)}/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.amountFont}>Trading Amount: <span style={{color : "black", fontWeight: "bold"}}> {amount2} USDT </span></Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" style={{backgroundColor : "red"}}>Sell Now</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
       
    );
}

export default TokenExchangeWidget ;