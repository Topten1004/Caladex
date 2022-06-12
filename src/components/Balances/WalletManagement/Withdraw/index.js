
import React from 'react' ;

import { useState , useEffect , useMemo , useRef } from 'react' ;
import { connect } from 'react-redux';

import swal from 'sweetalert' ;

import { useWeb3React } from "@web3-react/core";
import { ethers } from 'ethers';
import { SetTokenBalance , ApproveToken } from '../../../../redux/actions/balance';

import {
    Dialog ,
    DialogTitle,
    DialogContent ,
    Grid,
    Button,
    InputAdornment ,
    TextField ,
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import { PRIVATE_CALADEX_API } from '../../../../static/constants';

import { CALADEX_ADDR , BLOCK_CONFIRMATION_THRESHOLD} from '../../../../constants' ;
import CALADEX_ABI from '../../../../constants/abis/caladex.json' ;

const useCaladexContract = () => {
    const { library, active } = useWeb3React();

    return useMemo(() => {
        if (!active) {
            return null;
        }

        return new ethers.Contract(CALADEX_ADDR, CALADEX_ABI, library.getSigner());
    })
}

const useStyles = makeStyles(() => ({
    root : {
        "& .MuiButton-root" :{
            textTransform : "capitalize" ,
        }
    },
    deposit : {
        backgroundColor : "#206bc4 !important"
    },
}));
const Withdraw = (props) => {

    const { open , handleClose , symbol , amount , logo_url , token_id , token_address , updateWithdrawTokensArray ,
            GetEthBalanceInfo ,
            GetTokenBalanceInfo , 
            SetTokenBalance } = props ;

    const {  account, library } = useWeb3React();
    const [inputAmount , setInputAmount] = useState(0) ;

    const classes = useStyles() ;

    const CaladexContract = useCaladexContract();

    const onWithdraw = async () => {
       if(isNaN( Number(inputAmount) ) || Number(inputAmount) <= 0 || inputAmount === "") {
            return swal({
                title: "WARNING",
                text: "Invalid amount type.",
                icon: "warning",
                timer: 2000,
                button: false
            }) ;
       }
       if(Number(inputAmount) > amount) {
            return swal({
                title: "WARNING",
                text: "Insufficient tokens.",
                icon: "warning",
                timer: 2000,
                button: false
            })
        }

        await updateWithdrawTokensArray(token_id , false) ;

        await handleClose() ;
        
        let resultTx = 0 ;

        if(symbol !== "ETH"){
            let result = await ApproveToken(inputAmount , token_address , symbol )  ;

            if(result === "Ok"){
                try {
                    let txReceipt = await CaladexContract.withdraw(account , token_address, ethers.utils.formatBytes32String(token_id) ,ethers.utils.parseUnits(inputAmount).toString(), { nonce: 0, gasLimit:250000 });
                    
                    try {
                        let txMetamask = await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
    
                        if(txMetamask.logs.length !== 0) {
                            resultTx = 1;
                        }
                    }
                    catch (err) {
                        resultTx = 0 ;
                    }
                }
                catch (err) {
                    resultTx = "Withdraw Rejected."
                }
            } else {
                resultTx = 0 ;
            }
        } else {

            let result = await ApproveToken(inputAmount , null , "ETH")  ;
            
            if(result === "Ok") {
                try {
                    let txReceipt = await CaladexContract.withdraw(account , token_address , ethers.utils.formatBytes32String("ETH") , ethers.utils.parseEther(inputAmount).toString() , { nonce : 0 , gasLimit : 250000 }) ;
                    await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);
    
                    resultTx = 1 ;
                }
                catch (err) {
                    resultTx = "Withdraw Rejected."
                }
            } else {
                resultTx = 0 ;
            }
        }
        
        if(resultTx === 1) await SetTokenBalance(account , token_id  , false , inputAmount) ;

        if(resultTx === 1) {
            swal({
                title: "SUCCESS",
                text: "Withdraw Successfully.",
                icon: "success",
                timer: 2000,
                button: false
            }) ;
        } else if(resultTx === 0 ) {
            swal({
                title: "Error",
                text: "Withdraw Failed.",
                icon: "error",
                timer: 2000,
                button: false
            }) ;
        } else {
            swal({
                title: "WARNING",
                text: resultTx,
                icon: "warning",
                timer: 2000,
                button: false
            }) ;
        }

        await updateWithdrawTokensArray(token_id , true) ;
        
        return ;
    }
    return (
        <div >
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.root}
            >
                <DialogTitle>Withdraw</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{display:"flex" , alignItems:"flex-end"}}>
                            <Grid container>
                                <Grid item xs={2} sx={{display:"flex" , alignItems:"flex-end" , padding:"0px"}}>
                                    <Box component={"span"} sx={{fontWeight:"bold"}}>Amount</Box>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <img src={`${PRIVATE_CALADEX_API}files/${logo_url}`} width={30} height={25}/>
                                                    &nbsp;<Box component="span" sx={{fontWeight:"bold"}}>{symbol}</Box> 
                                                    &nbsp;&nbsp;&nbsp;<Box component="span" sx={{fontWeight:"bold" , color : "#f76707"}}>Max</Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="standard"
                                        onChange={(e) => setInputAmount(e.target.value)}
                                        placeholder={amount.toString()}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.btnGroup} sx={{textAlign:"right"}}>
                          <Button variant={'contained'} className={classes.deposit} onClick={async () => onWithdraw()}>Withdraw</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

Withdraw.propsType = {
    
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    SetTokenBalance
}

export default connect(mapStateToProps , mapDispatchToProps)(Withdraw) ;
