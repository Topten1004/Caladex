

import React, { useEffect , useRef } from 'react' ;

import { useWeb3React } from '@web3-react/core';

import { InjectedConnector } from "@web3-react/injected-connector";
import detectEthereumProvider from '@metamask/detect-provider' ;
import { isMobile } from 'react-device-detect' ;

import MetamaskImg from '../../../assets/metamask.jpg';

import {
    Box ,
    Button,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor : "lightgray",
            borderRadius : "5px"
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
            borderRadius : "5px"
        },

        overflow : "hidden" ,
        overflowY : "scroll" ,
        boxSizing : "border-box" ,
        backgroundColor : "white" ,
        display : "flex" ,
        flexDirection :"column" ,
        justifyContent : "center" ,
        alignItems : "center" ,
        top : 0,
        width : '100%' ,
        height : "calc(100vh - 122px)" ,
        position  : "absolute" ,
        zIndex : 1000
    }
}));

const WalletConnect = () => {

    const classes = useStyles() ;

    const { library , account , active , activate } = useWeb3React() ;

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
        <Box component={"div"} className={classes.root} >
            <Box component={"div"} sx={{marginBottom : "15px"}}>
                <img src={MetamaskImg} width={70} height={70} />
            </Box>
            <Box comonent={"div"}>
                <Button variant='contained' onClick={connectToWallet}>Connect Wallet</Button>
            </Box>
        </Box>
    )
}

export default WalletConnect ;