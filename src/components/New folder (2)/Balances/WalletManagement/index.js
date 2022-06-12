

import React from 'react' ;

import {useEffect , useState} from 'react' ;

import { useNavigate } from 'react-router-dom' ;

import PropTypes, { objectOf }  from 'prop-types';

import { GetTokenBalanceInfo } from '../../../redux/actions/token.js';

import {useWeb3React} from '@web3-react/core' ;

import { getItem , setItem } from '../../../utils/helper' ;

import { connect } from 'react-redux' ;

import Withdraw from './Withdraw';
import Deposit from './Deposit' ;

import ETH from '../../../assets/avatar/ETH.png' ;

import {
    Card,
    CardContent ,
    Divider ,
    ButtonGroup ,
    Button ,
    Grid,
    CircularProgress ,
    Box ,
    useMediaQuery,
    TableContainer ,
    Table ,
    TableHead,
    TableRow,
    TableBody ,
    TableCell,
    TablePagination,
    Paper
} from '@mui/material' ;

import { makeStyles, ThemeProvider } from '@mui/styles';

import { PRIVATE_CALADEX_API, PUBULIC_EXCHANGE_RATE_API } from '../../../static/constants.js';
import axios from 'axios';

let tokenBalanceInfoTimer ;

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "50px" ,
        border : "1px solid lightgray" ,
        "& .MuiTableHead-root" : {
            backgroundColor : "#f2f2f2 !important" ,
            "& .MuiTableCell-root" : {
                backgroundColor : "#f2f2f2 !important" ,
                fontSize : "0.625rem" ,
                color : "black",
                fontWeight : "bold" ,
                textAlign : "center"
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root:nth-child(even)" : {
                backgroundColor : "#f2f2f2 !important"
            },
            "& .MuiTableCell-root" : {
                textAlign : "center"
            }
        },
        "& .MuiTablePagination-root" : {
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        },
        "& .MuiCardContent-root" : {
            padding : "0px",
        }
    },
    titleContainer : 
    {
        marginTop : "15px" ,
        marginBottom : "15px" ,
        paddingLeft : "20px" ,
        paddingRight : "20px"
    } ,
    titleItem : {
        display : "flex" ,
        alignItems : 'center'
    },
    title : {
        color : "#656D77" ,
        fontSize : "14px"
    },
    action : {
        color : "#656D77" ,
        fontSize : "14px" ,
        display : "flex" ,
        alignItems : "center"
    },
    btnDeposit : {
        backgroundColor : "#f76707 !important"
    },
    btnWithDraw : {
        backgroundColor : "#206bc4 !important"
    } ,
}));

const WalletManagement = (props) => {

    const { tokenBalanceInfo , GetTokenBalanceInfo  } = props ;

    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWithdraw , setOpenWithdraw] = useState(false) ;
    const [isLoadedPage , setIsLoadedPage] = useState(false) ; 

    const [ethAmount , setEthAmount] = useState(0) ;
    const [ethRate , setEthRate] = useState(0) ;

    const [amount , setAmount] = useState(0);
    const [logo_url ,setLogoUrl] = useState("") ;
    const [symbol, setSymbol] = useState("") ;
    const [token_id , setTokenId] = useState("") ;
    const [token_address , setTokenAddress] = useState(null) ;
    const [deposit_tokens_array , setUpdateDepositTokensArray] = useState({}) ;
    const [withdraw_tokens_array , setUpdateWithdrawTokensArray] = useState({}) ;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDeposit = () => setOpenDeposit(true);
    const handleCloseDeposit = () => setOpenDeposit(false);

    
    const handleOpenWithdraw = () => setOpenWithdraw(true);
    const handleCloseWithdraw = () => setOpenWithdraw(false) ;

    const navigate = useNavigate() ;

    const {active , account , library } = useWeb3React() ;

    const [isZeroChecked , setZeroCheck] = useState(false) ;

    const setTimerForTokenBalanceList =  async (searchStr) => {
        clearInterval(tokenBalanceInfoTimer) ;

        tokenBalanceInfoTimer = setInterval(async () => {
            if( Number( getItem('pageIndex') ) !== 6 ){
                clearInterval(tokenBalanceInfoTimer) ;
                return ;
            }
            await GetEthBalanceInfo() ;

            await GetTokenBalanceInfo(account , searchStr) ; 
            return ;
        } , 15000 )
    }

    const searchForMoreTokens = async (token_symbol) => {

        await GetEthBalanceInfo() ;

        await GetTokenBalanceInfo(account , token_symbol) ; 

        clearInterval(tokenBalanceInfoTimer) ;

        await setTimerForTokenBalanceList(token_symbol) ;
    }

    const onDeposit = (tokenAmount , symbol ,logo_url , token_id , token_address ) => {
        setAmount(tokenAmount) ;
        setLogoUrl(logo_url) ;
        setSymbol(symbol) ;
        setTokenId(token_id) ;
        setTokenAddress(token_address) ;

        handleOpenDeposit() ;
    } ;
    const onWithdraw = (tokenAmount , symbol ,logo_url , token_id , token_address) => {
        setAmount(tokenAmount) ;
        setLogoUrl(logo_url) ;
        setSymbol(symbol) ;
        setTokenId(token_id) ;
        setTokenAddress(token_address) ;
        handleOpenWithdraw() ;
    }

    const updateDepositTokensArray = async (token_id , value) => {
        // console.log("first") ;
        let tmp = JSON.parse(getItem('depositArray')) ;

        tmp[token_id] = value ;

        await setItem('depositArray' , JSON.stringify(tmp)) ; 
    }

    const updateWithdrawTokensArray = async (token_id , value) => {
        // console.log("second") ;

        let tmp = JSON.parse(getItem('withdrawArray')) ;

        tmp[token_id] = value ;

        await setItem('withdrawArray' , JSON.stringify(tmp)) ;
    }

    const GetEthBalanceInfo = async () => {
        if(active) {
            let ans = await library.getBalance(account) ;
            
            await setEthAmount(parseInt(ans._hex) / 1000000000000000000) ;
        }
        
    }

    useEffect(async () => {
        if(isLoadedPage) {
            // console.log("dfdf") ;
            
            if(getItem('pageIndex') === "6") {
                await setUpdateDepositTokensArray(JSON.parse(getItem('depositArray'))) ;
                await setUpdateWithdrawTokensArray(JSON.parse(getItem('withdrawArray'))) ;

            }
            await GetEthBalanceInfo() ;
        
            await GetTokenBalanceInfo(account , "") ;
        }
    } , [getItem('depositArray') , getItem('withdrawArray')]) ;

    useEffect(async () => {
        if(tokenBalanceInfo.length !== 0 && active) {   

            if(!getItem('depositArray')) {
                let tmp = {};

                await tokenBalanceInfo.map((element) => {
                    tmp[element._id] = true ;
                }) ;


                await setItem('depositArray' , JSON.stringify(tmp)) ;
                await setUpdateDepositTokensArray(JSON.parse(getItem('depositArray'))) ;

            } else {
                await setUpdateDepositTokensArray(JSON.parse(getItem('depositArray'))) ;
            }

            if(!getItem('withdrawArray')) {
                let tmp = {} ;

                await tokenBalanceInfo.map((element , index) => {
                    tmp[element._id] = true ;
                })
                
                await setItem('withdrawArray' , JSON.stringify(tmp)) ;
                await setUpdateWithdrawTokensArray(JSON.parse(getItem('depositArray'))) ;
            
            } else {
                await setUpdateWithdrawTokensArray(JSON.parse(getItem('withdrawArray'))) ;
            }

            setIsLoadedPage(true) ;
        }
    } , [tokenBalanceInfo]) ;

    useEffect(async () =>  {
  
        if(!getItem('pageIndex')){
            setItem('pageIndex' , "6") ;
            return ;
        }
      
        if(active) {

            // if(getItem('depositArray')){
            //     console.log('recognize') ;
            //     await setUpdateDepositTokensArray(JSON.parse(getItem('depositArray'))) ;
            // }
            // if(getItem('withdrawArray')) {
            //     await setUpdateWithdrawTokensArray(JSON.parse(getItem('withdrawArray'))) ;
            // }

            await GetEthBalanceInfo() ;
        
            await GetTokenBalanceInfo(account , "") ;
    
            await setTimerForTokenBalanceList("") ;
        }
    } , [getItem('pageIndex')]);

    useEffect(async () => {
        if(!active) {

            clearInterval(tokenBalanceInfoTimer) ;
            
            setItem('pageIndex' , '0') ;

            navigate('/') ;
        }
        if(active) {
           await GetEthBalanceInfo() ;
        }
    } , [active])


    const classes = useStyles() ;

    const isXs = useMediaQuery("(min-width :730px)");

    return (
        <div className={classes.root}>
            <Card>
                <Grid container className={classes.titleContainer}>
                    <Grid item xs={isXs ? 6 : 12} className={classes.titleItem}>
                        <Box component={"div"} className={classes.title}>
                            <Box component={"input"} type="checkbox" className={"mr-3"} onChange={(e) => setZeroCheck(e.target.checked)}/>
                            Hide zero checkbox
                        </Box>
                    </Grid>
                    <Grid item xs={3} style={{height : isXs ? "0px" : "15px"}}>

                    </Grid>
                    <Grid item xs={isXs ? 3 : 12} >
                        <Box component={"div"} className={classes.action} >
                            <Box component={"div"} className='input-group d-flex align-items-center' >
                                <Box component={"label"} htmlFor='search' className='mr-2'>Search :</Box>
                                <Box component={"input"} className='form-control form-control-sm' type='text' id='search' onChange={(e) => searchForMoreTokens(e.target.value)}/>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Divider />
                <CardContent>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table" >
                                <TableHead >
                                    <TableRow>
                                        <TableCell style={{textAlign:"left"}}>
                                            TOKEN
                                        </TableCell>
                                        <TableCell>
                                            WALLET BALANCE
                                        </TableCell>
                                        <TableCell>
                                            CALADEX BALANCE
                                        </TableCell>
                                        <TableCell>
                                            ON ORDERS
                                        </TableCell>
                                        <TableCell>
                                            VALUE IN USD
                                        </TableCell>
                                        <TableCell>
                                            OPERATION
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        ( tokenBalanceInfo && tokenBalanceInfo.length !== 0 && Object.keys(deposit_tokens_array).length !== 0 && Object.keys(withdraw_tokens_array).length !== 0) ? tokenBalanceInfo.map((element, index) => {
                                            if( !isZeroChecked || ( isZeroChecked && element.balanceOfwallet * element.rate !== 0)) {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell style={{textAlign:"left"}}>
                                                            {
                                                                element.symbol === "ETH" ? <img src={ETH} width={30} height={30}/>
                                                                    : <img src={`${PRIVATE_CALADEX_API}files/${element.logo_url}`} width={30} height={25}/>
                                                            }
                                                            &nbsp;&nbsp;
                                                            {element.symbol}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                element.symbol === "ETH" ? Number(ethAmount).toFixed(5) :
                                                                Number( element.balanceOfwallet)
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {Number(element.balanceOfCaladex)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {Number(element.orderOfCaladex)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                element.symbol === "ETH" ? Number((Number(ethAmount) + Number(element.balanceOfCaladex)) * element.rate).toFixed(4) 
                                                                : Number((Number(element.balanceOfwallet) + Number(element.balanceOfCaladex)) * element.rate).toFixed(4)
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                                <Button className={classes.btnDeposit} onClick={(e) => onDeposit( element.symbol !== "ETH" ? Number( element.balanceOfwallet ) : Number(ethAmount) , element.symbol , element.logo_url , element._id , element.address)} disabled={deposit_tokens_array[element._id] === true ? false : true}>
                                                                    {  deposit_tokens_array[element._id] === true ? "Deposit" : <><CircularProgress size={20} style={{color : "white"}}/>...Deposit</> }
                                                                </Button>
                                                                <Button className={classes.btnWithDraw} onClick={() => onWithdraw(Number( element.balanceOfCaladex ), element.symbol , element.logo_url , element._id , element.address) } disabled={withdraw_tokens_array[element._id] === true ? false : true}>
                                                                    {withdraw_tokens_array[element._id] === true ? "Withdraw" : <><CircularProgress size={20} style={{color : "white"}}/>...Withdraw</> }
                                                                </Button>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                <></>
                                            }
                                    }) : <TableRow>
                                            <TableCell colSpan={6}>
                                                <CircularProgress size={30} />
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={tokenBalanceInfo.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </CardContent>
            </Card>
            {
                token_address === null ? <></> :
                <Deposit
                    amount={amount}
                    logo_url={logo_url}
                    symbol={symbol}
                    token_id={token_id}
                    token_address={token_address}
                    updateDepositTokensArray={updateDepositTokensArray}
                    open={openDeposit}
                    handleClose = {handleCloseDeposit}
                    GetEthBalanceInfo={GetEthBalanceInfo}
                    GetTokenBalanceInfo={GetTokenBalanceInfo}
                />
            }
            {
                token_address === null ? <></> :
                <Withdraw
                    amount={amount}
                    logo_url={logo_url}
                    symbol={symbol}
                    token_id={token_id}
                    token_address={token_address}
                    updateWithdrawTokensArray={updateWithdrawTokensArray}
                    open={openWithdraw}
                    handleClose = {handleCloseWithdraw}
                    GetEthBalanceInfo={GetEthBalanceInfo}
                    GetTokenBalanceInfo={GetTokenBalanceInfo}
                />
            }
        </div>
    )
}

WalletManagement.propsTyps = {
    tokenBalanceInfo : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
   tokenBalanceInfo : state.token.tokenBalanceInfo
});
const mapDispatchToProps = {
    GetTokenBalanceInfo
}

export default connect(mapStateToProps , mapDispatchToProps)(WalletManagement) ;