
import React from 'react' ;

import { useState , useEffect , useRef} from 'react';
import { useWeb3React } from "@web3-react/core";
import { useCaladexContract } from '../../../../hooks/useCaladexContract';
import { useTokenContract } from '../../../../hooks/useTokenContract';

import { connect } from 'react-redux';

import { SetTokenBalance } from '../../../../redux/actions/balance';

import PropTypes from 'prop-types' ;
import swal from 'sweetalert' ;
import { ethers } from 'ethers';

import { updateDepositTokensArray } from '../../../../utils/helper' ;
import { CALADEX_ADDR ,  BLOCK_CONFIRMATION_THRESHOLD} from '../../../../constants' ;
import { PRIVATE_CALADEX_API } from '../../../../static/constants';

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

const useStyles = makeStyles(() => ({
    root : {

        "& .MuiButton-root" :{
            textTransform : "capitalize" ,
        }
    },
    deposit : {
        backgroundColor : "#f76707 !important"
    }
}));

const Deposit = (props) => {

    const { 
        open , handleClose , symbol , amount , logo_url , token_id , token_address , 
        SetTokenBalance 
    } = props ;

    const { account, library } = useWeb3React();

    const [inputAmount , setInputAmount] = useState(0) ;

    const CaladexContract = useCaladexContract();
    const TokenContract = useTokenContract(token_address , symbol) ;

    const classes = useStyles() ;

    const onDeposit = async () => {
       if(isNaN( Number(inputAmount) ) || inputAmount === "" || Number(inputAmount) <= 0) {
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

        await handleClose() ;

        await updateDepositTokensArray(token_id , false) ;

        let resultTx = 0 ;

        if(symbol !== "ETH") {
            
            try {
                
                let txReceipt = await TokenContract.approve(CALADEX_ADDR,  ethers.utils.parseUnits(inputAmount).toString(), { nonce: 0, gasLimit:250000 });

                try {
                    await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);

                    try {
                        txReceipt = await CaladexContract.deposit(token_address, ethers.utils.formatBytes32String(token_id) , ethers.utils.parseUnits(inputAmount).toString(), { nonce: 0, gasLimit:250000 });
                    
                        try {
                            let txMetamask = await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);

                            if(txMetamask.logs.length !== 0) {
                                resultTx = 1 ;
                            } else {
                                resultTx = 0 ;
                            }
                        }
                        catch (err) {
                            resultTx = 0 ;
                        }
                    }
                    catch (err) {
                        resultTx = "Deposit Rejected."
                    }                    
                }
                catch(err) {
                    
                }
            }
            catch(err) {
                resultTx = "Approval Rejected." ;
            }

        } else {
            let ethValue = ethers.utils.parseEther(inputAmount)  ;
           
            try {
                let txReceipt = await CaladexContract.deposit(token_address, ethers.utils.formatBytes32String("ETH") , ethValue.toString() , { nonce: 0, gasLimit:250000 , value : ethValue });
            
                let txMetamask = await library.waitForTransaction(txReceipt.hash, BLOCK_CONFIRMATION_THRESHOLD);

                resultTx = 1 ;
            }
            catch (err) {
                resultTx = "Deposit Rejected." ;
            }
               
        }
        
        if(resultTx === 1) await SetTokenBalance(account , token_id  ,true , inputAmount) ;

        await updateDepositTokensArray(token_id , true) ;

        if(resultTx === 1) {
            swal({
                title: "SUCCESS",
                text: "Deposit successfully.",
                icon: "success",
                timer: 2000,
                button: false
            }) ;
        } else if(resultTx === 0 ) {
            swal({
                title: "ERROR",
                text: "Deposit Failed.",
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

        return ;
    }

    return (
        <Box component={"div"} >
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className={classes.root}
            >
                <DialogTitle>Deposit</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{display:"flex" , alignItems:"flex-end"}}>
                            <Grid container>
                                <Grid item xs={2} sx={{display:"flex" , alignItems:"flex-end" , padding:"0px"}}>
                                    <Box component={"span"} sx={{fontWeight:"bold"}}>Amount</Box>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        id="input-deposit-amount"
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
                                        focused={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className={classes.btnGroup} sx={{textAlign:"right"}}>
                          <Button variant={'contained'} className={classes.deposit} onClick={async () => onDeposit()}>Deposit</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Box>
    )
}

Deposit.propsType = {
    
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    SetTokenBalance
}

export default connect(mapStateToProps , mapDispatchToProps)(Deposit) ;