



import React from 'react' ;

import { useEffect , useState } from 'react' ;
import { useWeb3React } from '@web3-react/core' ;

import swal from 'sweetalert';

import { GetTokenOrderList } from '../../../../../redux/actions/trade';
import { OrderLimit , OrderMarket} from '../../../../../redux/actions/order';

import axios from 'axios' ;
import { PRIVATE_CALADEX_API, PUBLIC_API_URL, PUBULIC_EXCHANGE_RATE_API } from '../../../../../static/constants' ;

import {
    Box ,
    Grid ,
    TextField ,
    InputAdornment ,
    Button ,
    Slider
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "10px",
        padding : "20px",
        textAlign : "center",
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

const Options = (props) => {
    
    const classes = useStyles() ;

    const { library, account , active } = useWeb3React() ;

    const [ exchangePrice , setExchangePrice ] = useState(0) ;
    const [ exchangeAmount, setExchangeAmount ] = useState(0) ;
    const [ exchangeType , setExchangeType ] = useState(false) ;
    const [ exchangeMarketPrice , setExchangeMarketPrice] = useState(0) ;
    const [ totalAmount , setTotalAmount ] = useState(0) ;
    const [ percentage , setPercentage ] = useState(100) ;

    const {
        tradeToken,
        price,
        status ,
        methodType,
        handleChangePrice ,
        GetTokenOrderList
    } = props ;

    const handleExchangePrice = (e) => {
        setExchangePrice(e.target.value) ;
    }

    const handleExchangeAmount = (e) => {
        let percentage = Number(e.target.value) / totalAmount * 100 ;
        
        setPercentage(percentage) ;
        setExchangeAmount(e.target.value) ;
    }

    const handleExchangeType = () => {
        setExchangeType(!exchangeType);
    }

    const handleAmountPercentage = (e) => {
        setExchangeAmount( Number(totalAmount) / 100 * e.target.value ) ;
        // setExchangePrice(Number(e.target.value / exchangePrice)) ;
    }

    const handleExchangeToken = async () => {

        if(!active){
            swal({
                title: "Warning",
                text: "Please, Connect with Metamask.",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;

            return ;
        }

        // return alert(exchangePrice);
        // return alert(exchangeMarketPrice / 100 * 20);
        if(exchangeMarketPrice / 100 * 20 > exchangePrice){
            swal({
                title: "Warning",
                text: "Underflow Error",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;

            setExchangePrice(exchangeMarketPrice / 100 * 20) ;

            return ;
        }

        if(exchangeMarketPrice / 100 * 500 < exchangePrice){
            swal({
                title: "Warning",
                text: "Overflow Error",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;

            setExchangePrice(exchangeMarketPrice / 100 * 500) ;

            return ;
        }
        if(Number(exchangePrice * exchangeAmount) > totalAmount && !exchangeType){
            swal({
                title: "Warning",
                text: "Please, Deposit " + tradeToken.pair_type,
                icon: "warning",
                timer: 2000,
                button: false
            }) ;

            return ;
        }
        if(Number(exchangeAmount) > totalAmount && exchangeType) {
            swal({
                title: "Warning",
                text: "Please, Deposit " + tradeToken.symbol,
                icon: "warning",
                timer: 2000,
                button: false
            }) ;

            return ;
        }
        if(exchangeAmount * Number(tradeToken.price) === 0) {
            swal({
                title: "Warning",
                text: "Total Value Error",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;
        }

        let orderType ;

        switch(exchangeType) {
            case false : 
                orderType = "buy" ;
                break ;
            case true :
                orderType = "sell" ;
                break ;
            default :
                break;
        }

        // alert(orderType) ;
        // alert(exchangeType) ;

        let resultAPI ;

        if(methodType === 1) {
            resultAPI = await OrderLimit(account , tradeToken._id , tradeToken.pair_type , exchangePrice , exchangeAmount , orderType) ;
        } else {
            resultAPI = await OrderMarket(account , tradeToken._id , tradeToken.pair_type , exchangePrice , exchangeAmount , orderType) ;
        }

        if(resultAPI) {
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "sell" ) ;
            await GetTokenOrderList(tradeToken._id , tradeToken.pair_type , "buy") ;

            swal({
                title: "Success",
                text: "Order Successfully!",
                icon: "success",
                timer: 2000,
                button: false
            }) ;
        } else {
            swal({
                title: "Fail",
                text: "Order Failed!",
                icon: "error",
                timer: 2000,
                button: false
            }) ;
        }

        handleChangePrice(null) ;
    }

    useEffect(() => {
        if(status === "sell") setExchangeType(true);
        if(status === "buy") setExchangeType(false);
    } , [status]) ;

    useEffect(async () => {
        if(!active) {
            setTotalAmount(0) ;
            return ;
        }
        if(tradeToken && active) {

            let symbol ;

            if(!exchangeType) {
                symbol = tradeToken.pair_type
            } else {
                symbol = tradeToken.symbol
            }

            let resId = await axios.post(`${PRIVATE_CALADEX_API}token/getbysymbol` , {
                symbol : symbol
            }) ;

            let res = await axios.post(`${PRIVATE_CALADEX_API}balance/getbalance` , {
                address  : account , 
                token_id : resId.data.data.data._id
            }) ;

            if(res.data.data.doc === null){
                let resRate = await axios.get(`${PUBULIC_EXCHANGE_RATE_API}${tradeToken.symbol}`) ;

                if(price) {
                    setExchangePrice(price) ;
                    handleChangePrice(null) ;
                } else {
                    setExchangePrice(resRate.data.data.rates[tradeToken.pair_type]) ;
                }

                setExchangeAmount(0) ;
            } else {

                if(!exchangeType){
                    let resRate = await axios.get(`${PUBULIC_EXCHANGE_RATE_API}${tradeToken.symbol}`) ;

                    setExchangeMarketPrice(resRate.data.data.rates[tradeToken.pair_type]) ;
                    
                    if(price) {
                        setExchangePrice(price) ;
                        handleChangePrice(null) ;
                    } else {
                        setExchangePrice(resRate.data.data.rates[tradeToken.pair_type]) ;
                    }

                    setTotalAmount( res.data.data.doc.caladex_balance /  resRate.data.data.rates[tradeToken.pair_type] ) ;
                    setExchangeAmount( res.data.data.doc.caladex_balance /  resRate.data.data.rates[tradeToken.pair_type]) ;
                    console.log(resRate) ;
                    
                } else {

                    let resRate = await axios.get(`${PUBULIC_EXCHANGE_RATE_API}${tradeToken.pair_type}`) ;

                    setExchangeMarketPrice( 1 / resRate.data.data.rates[tradeToken.symbol] ) ;

                    if(price) {
                        setExchangePrice(price) ;
                        handleChangePrice(null) ;
                    } else {
                        setExchangePrice( 1 / resRate.data.data.rates[tradeToken.symbol] ) ;
                    }

                    setTotalAmount( res.data.data.doc.caladex_balance ) ;
                    setExchangeAmount( res.data.data.doc.caladex_balance ) ;
                }
                
            }
        }
    } , [tradeToken , active , exchangeType , methodType]) ;

    useEffect(() => {
        if(price) {
            setExchangePrice(price) ;
        }
    } , [price]) ;

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.btGp}>
                    <Grid container>
                        <Grid item xs={5}>
                            <Button variant={'contained'} size={"small"} fullWidth color={!exchangeType ? "primary" : "inherit"} onClick={() => setExchangeType(false)}>Buy</Button>
                        </Grid>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={5}>
                            <Button variant={'contained'} size={"small"} fullWidth color={exchangeType ? "secondary" : "inherit"} onClick={() => setExchangeType(true)}>Sell</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label={"Price"}
                        size={"small"}
                        type={"number"}
                        variant={"outlined"}
                        value={exchangePrice}
                        onChange={handleExchangePrice}
                        InputProps={{
                            endAdornment : <InputAdornment position={"end"}>{tradeToken ? tradeToken.pair_type : "..."}</InputAdornment> ,
                            inputProps: { 
                                // min : tradeToken ? tradeToken.price / 100 * 50 : 0,
                                // max : tradeToken ? tradeToken.price / 100 * 500 : 0
                                readOnly : methodType ? (methodType === 1 ? false : true) : false
                            } 
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label={"Amount"}
                        size={"small"}
                        type={"number"}
                        variant={"outlined"}
                        value={exchangeAmount}
                        onChange={handleExchangeAmount}
                        InputProps={{
                            endAdornment : <InputAdornment position={"end"}>{tradeToken ? tradeToken.symbol : "..."}</InputAdornment>,
                            inputProps: { 
                                min: 0 
                            } 
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Slider
                        size="small"
                        min={0}
                        max={100}
                        onChange={handleAmountPercentage}
                        value={percentage}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        label={"Total"}
                        size={"small"}
                        type={"number"}
                        variant={"outlined"}
                        value={Number(exchangePrice * exchangeAmount).toFixed(18)}
                        InputProps={{
                            endAdornment : <InputAdornment position={"end"}>{tradeToken ? tradeToken.pair_type : "..."}</InputAdornment>
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField 
                        label={"Available"}
                        size={"small"}
                        type={"number"}
                        variant={"outlined"}
                        InputProps={{
                            endAdornment : <InputAdornment position={"end"}>ETH</InputAdornment>
                        }}
                        fullWidth
                    /> */}
                </Grid>
                <Grid item xs={12}>
                    {
                        exchangeType ? <Button variant={"contained"} size={"small"}  color={"secondary"} fullWidth onClick={() => handleExchangeToken()}>
                            Sell { tradeToken ? tradeToken.symbol : ""}
                        </Button> : <Button variant={"contained"} size={"small"}   fullWidth onClick={() => handleExchangeToken()}>
                            Buy { tradeToken ? tradeToken.symbol : "..."}
                        </Button>
                    }
                    
                </Grid>
                {/* <Grid item xs={12} className={classes.btGp}>
                    <Button variant={'contained'} size={"small"} >Buy</Button>

                    <Button variant={'contained'} size={"small"}  color={"secondary"}>Sell</Button>
                </Grid> */}
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    orderSellList : state.trade.orderSellList,
    orderBuyList : state.trade.orderBuyList
})
const mapDispatchToProps = {
    GetTokenOrderList
}

export default connect(mapStateToProps , mapDispatchToProps) (Options) ;
// export default Options;