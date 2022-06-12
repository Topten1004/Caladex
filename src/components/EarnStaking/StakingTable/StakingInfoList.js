

import React from 'react' ;

import { useState , useEffect  } from 'react' ;
import { useWeb3React } from '@web3-react/core';

import { InjectedConnector } from "@web3-react/injected-connector";
import detectEthereumProvider from '@metamask/detect-provider' ;
import { isMobile } from 'react-device-detect' ;

import { connect } from 'react-redux' ;

import { makeStyles } from '@mui/styles';

import {
    Box,
    Button, CircularProgress ,
    Paper ,
    TableContainer ,
    Table ,
    TableHead,
    TableBody ,
    TableRow ,
    TableCell,
    TablePagination,
} from '@mui/material' ;
import swal from 'sweetalert' ;

import StakingDialog from '../StakingDialog/index.js';

import axios from 'axios' ;
import { PRIVATE_CALADEX_API , PUBULIC_EXCHANGE_RATE_API } from '../../../static/constants.js';
import { RemoveTokenStakeLog , GetStakeDateTime , GetStakingInfo } from '../../../redux/actions/stake.js';
import { GetTokenBalanceInfo } from '../../../redux/actions/token';
import { GetTokenStakeInfoList } from '../../../redux/actions/stake' ;
import { getItem, setItem } from '../../../utils/helper.js';

import MetamaskImg from '../../../assets/metamask.jpg' ;

const useStyles = makeStyles((theme) => ({
    root : {
        
        marginTop : theme.spacing(4) + " !important" ,
        "& button" : {
            color : "white" ,
            width : "130px" ,
            fontWeight : "bold"
        },
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
        } ,
    },
    actionBtn : {
        backgroundColor : "#f59f00 !important"
    } ,
    walletBt : {
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "center"  ,
        flexDirection : "column" 
    }
})) ;

const StakingInfoList = (props) => {

    const { 
        tokenStakeInfoList , GetTokenStakeInfoList , 
        coinType  
    } = props ;

    const {active , account , activate } = useWeb3React() ;

    const classes = useStyles() ;

    const [open, setOpen] = useState(false);

    const [isStaking , setIsStaking] = useState(false) ;
    const [symbol , setSymbol] = useState('') ;
    const [logo_url , setLogoUrl] = useState('') ;
    const [est_apy , setEstApy] = useState('') ;
    const [stake_id , setStakeId] = useState(0) ;
    const [token_id , setTokenId] = useState(null) ;
    const [token_address , setTokenAddress] = useState(null) ;
    const [current_token , setCurrentToken] = useState(null) ;
    const [isLoadedPage , setIsLoadedPage] = useState(false) ;
    const [stake_date , setStakeDate] = useState(null) ;

    const [loading_tokens_array , setLoaingTokensArray] = useState({}) ;
    
    const [balance , setTokenBalance] = useState(0) ;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateLoadingStakeArray = async (token_id , value) => {

        let tmp = JSON.parse(getItem('stakeArray')) ;

        tmp[token_id] = value ;

        await setItem('stakeArray' , JSON.stringify(tmp)) ;

    }

    const onViewStakingInfo = async ( logo_url , symbol , _id , est_apy , token_address , token_id , balance  ,stakelog_id ) => {

        let stake_date = await GetStakeDateTime() ;

        let stakeInfo = await GetStakingInfo( stakelog_id.stakelog_id ) ;

        setStakeDate(stake_date) ;
        setLogoUrl(logo_url) ;
        setSymbol(symbol) ;
        setStakeId(_id) ;
        setTokenId(token_id) ;
        setEstApy(est_apy) ;
        setTokenAddress(token_address) ;
        setTokenBalance(balance) ;
        setCurrentToken(stakeInfo) ;
        setIsStaking(true) ;
        
        handleOpen() ;

    }

    const onStake = async (logo_url , symbol , _id , est_apy , token_address , token_id , balance , token_info ) => {

        let stake_date = await GetStakeDateTime() ;

        setStakeDate(stake_date) ;
        setLogoUrl(logo_url) ;
        setSymbol(symbol) ;
        setStakeId(_id) ;
        setTokenId(token_id) ;
        setEstApy(est_apy) ;
        setTokenAddress(token_address) ;
        setTokenBalance(balance) ;
        setCurrentToken(token_info) ;
        setIsStaking(false) ;

        if( !active ){
            swal({
                title: "Warning",
                text: "Please connect to your Metamask.",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;
        } else {
            handleOpen() ;
        }
    }

    const onUnStake = async (address , stakelog_id ,  token_id  , token_info) => {

        let stake_date = await GetStakeDateTime() ;

        let stakeDate = stake_date ;

        stakeDate = stakeDate.split(',') ;

        let ymd = stakeDate[0].split('/') ;

        ymd = ymd[2] + "-" + ymd[1] + "-" + ymd[0] ;

        let stakeInfo = await GetStakingInfo( stakelog_id ) ;
    
        let tmpDuration =  ( new Date(ymd + stakeDate[1]).getTime() - new Date( stakeInfo.begin_date ).getTime() ) ;

        tmpDuration = tmpDuration / 24 / 60 / 60 / 1000 ;

        let exchangeRate ;

        await axios.get(`${PUBULIC_EXCHANGE_RATE_API}${token_info.token_id.symbol}`)
        .then(res => {
            exchangeRate = res.data.data.rates.USD ;
        })
        .catch(err => {
            exchangeRate = 0 ;
        })

        let EstTokenAmount = ( Number(stakeInfo.amount) * token_info.est_apy * Number(tmpDuration) / 365 / 100 ).toFixed(10) ;
        let EstUSDAmount = Number(( Number(stakeInfo.amount) * token_info.est_apy * Number(tmpDuration) / 365 / 100 ).toFixed(10) * exchangeRate).toFixed(10) ;
        
        const isOk = await swal({
            title: "Are you sure?",
            text: "Are you sure you wish to unstake? \n You will forfeit all interest. \n" +  EstTokenAmount  + " " + token_info.token_id.symbol + " / " +  EstUSDAmount + " USD",
            icon: "warning",
            buttons: [
              'No, I am not sure!',
              'Yes, I am sure!'
            ],
        }) ;
        if(isOk){

            await updateLoadingStakeArray(token_id , false) ;

            // setLoaingTokensArray(JSON.parse(getItem('stakeArray'))) ;
            await GetTokenStakeInfoList(account , "get" , "" ) ;
        
            let result = await RemoveTokenStakeLog(address , stakelog_id) ;

            await updateLoadingStakeArray(token_id , true) ;

            // await setLoaingTokensArray(JSON.parse(getItem('stakeArray'))) ;
            await GetTokenStakeInfoList(account , "get" , "") ;

            if(result === "Ok"){

                swal({
                    title: "Success",
                    text: "UnStake Successfully.",
                    icon: "success",
                    timer: 2000,
                    button: false
                }) ;
            } else {
                swal({
                    title: "Error",
                    text: "Unstake Failed.",
                    icon: "error",
                    timer: 2000,
                    button: false
                }) ;
            }

            await  GetTokenBalanceInfo(account, "") ;
        }
    }

    useEffect(async () => {
        if(isLoadedPage) {
            await setLoaingTokensArray(JSON.parse(getItem('stakeArray'))) ;
            await GetTokenStakeInfoList(account , "get" , "") ;
        }
    } , [getItem('stakeArray')]) ;
    
    useEffect(async () => {
        console.log(tokenStakeInfoList) ;
        if(tokenStakeInfoList !== "No Available Information." && tokenStakeInfoList.length !== 0) {

            if(!getItem('stakeArray')){

                let tmp = {} ;

                await tokenStakeInfoList.map(element => {
                    tmp[element.token_id._id] = true ;
                }) ;

                await setItem('stakeArray' , JSON.stringify(tmp)) ;

            } else {
                await setLoaingTokensArray(JSON.parse(getItem('stakeArray'))) ;
            }
            
            setIsLoadedPage(true) ;
        }
    } , [tokenStakeInfoList]) ;

    useEffect(async () => {
        if(active) {
            await GetTokenStakeInfoList(account , "get" , "") ;
            // setTokenStakeInfoListTimer("") ;
        }
    } , [active]) ;

    // useEffect(async () => {

    //     if(!getItem('pageIndex')) {
    //         setItem('pageIndex' , '4') ;
    //         return ;
    //     }

    //     if(active && getItem('pageIndex') === "4") {
            
    //     }
    // } , [getItem('pageIndex') , active]) ;

    const connectToWallet = async () => {

        if(!isMobile) {
          const provider = await detectEthereumProvider() ;
    
          if(provider) {
            
            const chainId = await provider.request({
              method : 'eth_chainId'
            }) ;
        
            const injected = new InjectedConnector({ supportedChainIds: [Number(chainId)] });
    
            try {
        
              await activate(injected);
      
            } catch (exception) {
              // console.log(exception);
            }
    
          } else {
            alert("Please Install MetaMask.") ;
          }
    
        } else {
            window.location.href ="https://metamask.app.link/dapp/caladex.org";
        }
    }

    return (
        <div className={classes.root}>
     
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign:"left"}}>COIN</TableCell>
                                <TableCell>PRODUCT</TableCell>
                                <TableCell>EST.APY</TableCell>
                                <TableCell>DURATION</TableCell>
                                <TableCell>STATE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            active ? (typeof tokenStakeInfoList === "string" ?  <TableRow >
                                <TableCell colSpan={5} sx={{border : "1px solid red"}}>
                                    No Available Information.
                                </TableCell>
                                </TableRow> : <TableRow >
                                    <TableCell colSpan={5} sx={{border : "1px solid red"}}>
                                    
                                    </TableCell>
                                </TableRow>
                            )
                            : <TableRow >
                                <TableCell colSpan={5} sx={{border : "1px solid red"}}>
                                    <Box component={"div"} className={classes.walletBt}>
                                        <Box component={"div"} sx={{marginBottom : "15px"}}>
                                            <Box component={"img"} src={MetamaskImg} width={70} height={70}/>
                                        </Box>
                                        <Box component={"div"}>
                                            <Button variant={"contained"} sx={{width : "200px !important"}} onClick={connectToWallet}>Connect Wallet</Button>
                                        </Box>
                                    </Box>
                                </TableCell>
                            </TableRow> 
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tokenStakeInfoList ? tokenStakeInfoList.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

        {
            token_address === null && !isStaking ? <></> :
            <StakingDialog 
                open = {open}
                logo_url = {logo_url}
                stake_id = {stake_id}
                symbol = {symbol}
                est_apy={est_apy}
                token_address={token_address}
                token_id={token_id}
                current_token={current_token}
                stake_date={stake_date}
                isStaking={isStaking}
                updateLoadingStakeArray={updateLoadingStakeArray}
                balance={balance}
                handleClose = {handleClose}
                GetTokenStakeInfoList={GetTokenStakeInfoList}
            />
        }
        </div>
    )
}

const mapStateToProps = state => ({
    tokenStakeInfoList : state.stake.tokenStakeInfoList
})

const mapDispatchToProps = {
    GetTokenStakeInfoList
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingInfoList) ;
// export default StakingInfoList ;