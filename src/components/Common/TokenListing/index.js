

import React, { useEffect, useState , useRef } from 'react' ;

import swal from 'sweetalert' ;

import { makeStyles } from '@mui/styles';

import {
    Dialog ,
    DialogTitle,
    DialogContent ,
    Box ,
} from '@mui/material' ;

import { AddToken , ConfirmAddToken } from '../../../redux/actions/token';
import  PropTypes, { func }  from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root : {
        "&.MuiDialog-root" : {
            backdropFilter : "blur(4px)" ,
        } ,
        "& .MuiDialogContent-root" : {
            '&::-webkit-scrollbar': {
                width: '0.7em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'lightgray',
                borderRadius : "5px"
            }
        },
        color : "black !important" , 
      
        "& .form-group" : {
            fontSize : "14px"
        } ,
        "& .btn-default" : {
            color : theme.palette.primary.main ,
        },
        "& .btn-default:hover" : {
            color : theme.palette.primary.main ,
            textDecoration : "underline" ,
        }
    } ,
}));
const TokenListing = (props) => {

    const { open , handleClose , AddToken , ConfirmAddToken , message }  = props ;

    const classes = useStyles() ;

    const logoCtrl = useRef(null) ;
    const [name , setTokenName] = useState('');
    const [symbol, setTokenSymbol] = useState('') ;
    const [decimal , setTokenDecimal] = useState(null) ;
    const [pair_type , setTokenPairType] = useState('USDT') ;
    const [address , setTokenAddress] = useState('') ;
    // const [logo_url , setTokenLogoUrl] = useState('') ;
    const [website_url , setTokenWebsiteUrl] = useState('') ;
    const [issuer_name , setTokenIssuerName] = useState('') ;
    const [email_address , setEmailAddress] = useState('') ;

    const validate_email_address = (email_address) => {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;

        return email_address.match(mailformat);
    }

    const validate_token_address = (address) => {
        return (/^(0x){1}[0-9a-fA-F]{40}$/i.test(address));
    }
    
    useEffect(() => {
     
        if(message === "IDLE") return ;

        if(message === "SUCCESS") {
            swal({
                title: "SUCCESS",
                text: "Add Token Successfully!",
                icon: "success",
                timer: 2000,
                button: false
            })
            handleClose() ;  
        }
        if(message === "ERROR"){
            swal({
                title: "ERROR",
                text: "Add Token Failed!",
                icon: "error",
                timer: 2000,
                button: false
            })
        }
        ConfirmAddToken('IDLE') ;

    } , [message]) ;
    
    const onAddToken = () => {
    //    console.log(logoCtrl.current.files[0].name) ;

        if(name === "" || symbol === "" || isNaN( Number(decimal) ) || pair_type === "" || typeof logoCtrl.current.files[0] === "undefined" || website_url === "" || issuer_name === "" ){
            swal({
                title: "Empty Error",
                text: "Please, Input all fields!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }

        if(!validate_email_address(email_address)) {
            swal({
                title: "Email Warning",
                text: "Invalid Email Format!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }
        if(!validate_token_address(address)){
            swal({
                title: "Token Address Error",
                text: "Invalid Token Address Format!!!",
                icon: "warning",
                timer: 2000,
                button: false
            })
            return ;
        }

        // console.log(logoCtrl.current.files[0].name) ;

        const fn = new FormData() ;

        fn.append('name' , name) ;
        fn.append('symbol' , symbol) ;
        fn.append('decimal' , decimal) ;
        fn.append('pair_type' , pair_type) ;
        fn.append('file' , logoCtrl.current.files[0]) ;
        fn.append('issuer_name' , issuer_name) ;
        fn.append('email_address' , email_address) ;
        fn.append('website_url' , website_url) ;
        fn.append('address' , address) ;

        AddToken(fn) ;
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
                <DialogTitle>
                    <Box component={"div"} sx={{display:"flex" , justifyContent : "space-between" , alignItems:"center"}}>
                        <Box component={"span"} className="modal-title" sx={{width : "300px"}}>Token Listing</Box>
                        <Box component={"span"} sx={{fontSize:"10px"}}>
                            ( PLEASE USE THIS FORM ONLY IF YOU HAVE ALREADY CREATED TOKEN ON ETHEREUM MAIN NETWORK. FOR ASSISTANCE IN TOKEN CREATION SEND EMAIL TO CUSTOMERSERVICE@CALAHEX.COM )
                        </Box>
                        <Box component={"button"} type="button" className="close" onClick={handleClose}>&times;</Box>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor = "name" >Token Name</Box>
                        <Box component={"input"} type="text" id="name" className='form-control' onChange={(e) => setTokenName(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="symbol" >Token Symbol</Box>
                        <Box component={"input"} type="text" id="symbol" className='form-control' onChange={(e) => setTokenSymbol(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="decimal" >Decimal</Box>
                        <Box component={"input"} type="text" id="decimal" className='form-control' onChange={(e) => setTokenDecimal(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="pair">Pair Type</Box>
                        <Box component={"select"} type="text" id="pair" className='form-control' onChange={(e) => setTokenPairType(e.target.options[e.target.selectedIndex].value)}>
                            <Box component={"option"} value="USDT" >USDT</Box>
                            <Box component={"option"} value="ETH">ETH</Box>
                            <Box component={"option"} value="USDT,ETH">USDT & ETH</Box>
                        </Box>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="address" >Token address</Box>
                        <Box component={"input"} type="text" id="address" className='form-control' onChange={(e) => setTokenAddress(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="website_url" >Website URL </Box>
                        <Box component={"input"} type="text" id="website_url" className='form-control' onChange={(e) => setTokenWebsiteUrl(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="logo_url" >Logo PNG </Box>
                        <Box component={"input"} type="file" id="logo_url" className='form-control' ref={logoCtrl} />
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="url" >Name Token Issuer</Box>
                        <Box component={"input"} type="text" id="url" className='form-control'onChange={(e) => setTokenIssuerName(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className='form-group'>
                        <Box component={"label"} htmlFor="email_address" >Email address</Box>
                        <Box component={"input"} type="text" id="emial_address" className='form-control' onChange={(e) => setEmailAddress(e.target.value)} autoComplete={"off"}/>
                    </Box>
                    <Box component={"div"} className="modal-footer" sx={{display:"flex" , justifyContent:"space-between"}}>
                        <Box component={"button"} className='btn btn-default' onClick={handleClose} >Cancel</Box>
                        <Box component={"button"} className='btn btn-primary btn-md' onClick={() => onAddToken() }>SUBMIT</Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}

TokenListing.propsType = {
    message : PropTypes.string.isRequired ,
    AddToken : PropTypes.func.isRequired ,
}
const mapStateToProps = state => ({
    message : state.token.message 
})
const mapDispatchToProps = {
    AddToken ,
    ConfirmAddToken ,
}
export default connect(mapStateToProps , mapDispatchToProps)(TokenListing) ;