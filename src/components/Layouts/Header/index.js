
import React, { useEffect, useState , useContext , useCallback} from 'react';

import { connect } from 'react-redux';

import PropTypes, { element } from 'prop-types' ;

import { useWeb3React } from "@web3-react/core";

// import { injected  } from '../../../constants';

import { InjectedConnector } from "@web3-react/injected-connector";
import detectEthereumProvider from '@metamask/detect-provider' ;
import { isMobile } from 'react-device-detect' ;

import { GetWalletBalance, SetWalletAddress } from '../../../redux/actions/wallet' ;

import { removeItem, setItem , isMetaMaskInstalled, getItem } from '../../../utils/helper';

import { Link, useNavigate } from 'react-router-dom' ;


import { makeStyles } from '@mui/styles';

import clsx from 'clsx' ;

import swal from 'sweetalert' ;

import MenuIcon from '@mui/icons-material/Menu' ;
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import {
    AppBar ,
    Toolbar ,
    IconButton ,
    Typography ,
    Button ,
    Hidden,
    Drawer ,
    List , 
    ListItem,
    Divider,
    Grid ,
    useMediaQuery ,
    Box
} from '@mui/material' ;

import LogoImage from "../../../assets/logo.png";

import TokenListing from '../../Common/TokenListing';
import LanguageSelector from './LanguageSelector';

import { Text, LanguageContext } from '../../../utils/Language';

// import WalletConnectProvider from "@walletconnect/web3-provider";

// import { useMoralis } from 'react-moralis' ;
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3Modal from 'web3modal' ;
import WalletLink from 'walletlink' ;
import { ethers } from 'ethers';

// const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

// const providerOptions = {
//   walletconnect: {
//     package: WalletConnectProvider, // required
//     options: {
//       infuraId: INFURA_ID, // required
//     },
//   },
//   'custom-walletlink': {
//     display: {
//       logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
//       name: 'Coinbase',
//       description: 'Connect to Coinbase Wallet (not Coinbase App)',
//     },
//     options: {
//       appName: 'Coinbase', // Your app name
//       networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
//       chainId: 1,
//     },
//     package: WalletLink,
//     connector: async (_, options) => {
//       const { appName, networkUrl, chainId } = options
//       const walletLink = new WalletLink({
//         appName,
//       })
//       const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
//       await provider.enable()
//       return provider
//     },
//   },
// }
// let web3Modal
// if (typeof window !== 'undefined') {
//   web3Modal = new Web3Modal({
//     network: 'mainnet', // optional
//     cacheProvider: true,
//     providerOptions, // required
//   })
// }

const useStyles = makeStyles((theme) => ({
  root: {
    // position:"fixed" ,
    // width : "100%" ,
    flexGrow: 1,
    // zIndex : 3000 ,
    boxShadow : "none !important" ,
    paddingTop : "0px !important" ,
    marginTop : "0px !important" ,
    "& .MuiAppBar-root" : {
      boxShadow : "none !important"
    },
    "& .MuiDrawer-paper": {
      width : "100% !important",
      marginTop: "60px !important" ,
      backgroundColor : theme.palette.primary.main + " !important"
    } ,
  },
  appbar : {
    zIndex: theme.zIndex.drawer + 1 ,
  },
  toolbar: {
    justifyContent : "space-between" ,
    alignItems: 'flex-end',
    paddingTop: "0px !important",
    paddingLeft : "5.578px !important" ,
    backgroundColor : theme.palette.background.default,
    minHeight : "61px !important" ,
  },
  logo : {
    height : 30,
    paddingLeft : "20px"
  },
  menuBar : {
    display : "flex" ,
    justifyContent : "space-between !important" ,
  },
  itemGroup : {
    justifyContent : "flex-start" ,
  },
  itemActive : {
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid ' + theme.palette.primary.main,
    paddingTop : "5px !important" ,
  },
  itemInActive : {
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid white',
    paddingTop : "5px !important" ,
  },
  item: {
    flexGrow: 1,
    color : theme.palette.primary.main ,
    cursor : "pointer" ,
    paddingLeft : theme.spacing(2) ,
    paddingRight : theme.spacing(2) ,
    display : "flex" ,
    alignItems : "flex-end" ,
    fontSize : 14 ,
    textDecoration : 'none' ,
    fontFamily : "Montserrat, sans-serif" ,
    '&:hover' : {
      textDecoration : "none",
      color : "red",
    } ,
    '&:focus' : {
      textDecoration : "none",
      color : theme.palette.primary.main,
    } ,
  },

  btnItemGroup : {
    display : "flex" ,
    justifyContent : "flex-end" ,
    alignItems : "center" ,
  } ,
  btnItem : {
    border : "1px solid lightgray" 
  },
  notificationButton : {
    color : theme.palette.primary.main ,
    cursor : "pointer" ,
    fontSize : "16px !important",
  } ,
  drawerItem: {
    color : theme.palette.background.default,
    cursor : "pointer" ,
    padding : "0px" ,
    textDecoration : 'none' ,
    fontWeight: 'bold' ,
    fontSize : "20px" ,
    height : "430px !important" ,
    '&:hover' : {
      textDecoration : "none",
      color : "white",
    } ,
    '& .MuiListItem-root' :{
        height : "50px"
    }
  },
  drawerMenuBar : {
    "& .MuiListItem-root" : {
      height : "50px" ,
      color : "white !important"
    },
    "& .MuiButton-root" : {
      color : "white" ,
      border : "1px solid white" ,
      borderRadius : "30px" ,
    },
    "& svg" : {
      color : "white !important"
    },
    "& a" : {
      textDecoration : "none" ,
      color : "white"
    }
  }
}));



const Header = (props) => {
 
  const { walletAddress , SetWalletAddress , GetWalletBalance , scrollTop } = props ;
  const { active, account, library, activate ,chainId , deactivate} = useWeb3React();
  const [ethBalance , setEthBalance] = useState(0.0) ;

  useEffect(() => {

    // console.log(active) ;

    if(!active) {
      initializeWalletInfo() ;
      return ;
    } ;
    
    GetWalletBalance(account) ;
        
    SetWalletAddress(account) ;

  } , [active ,account , chainId , library]) ;
  // fetch token balance using library
  const _fetchTokenBalance = async () => {
      const ans = await library.getBalance(account);
      return ans;
  }
  const getAccountBalance = async () => {
      _fetchTokenBalance().then((bal) => setEthBalance(bal.toString()));
  }
  ////
  const initializeWalletInfo = () => {
    removeItem('address') ;
    SetWalletAddress('') ;
  }

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
       
      
            // const providerOptions = {
            //   infuraId : "9aa3d95b3bc440fa88ea12eaa4456161" ,
            // };
            // const web3Modal = new Web3Modal({
            //   network : 'mainnet' ,
            //   cacheProvider: false,
            //   infuraId : "9aa3d95b3bc440fa88ea12eaa4456161",
            // });

            // let provider = await web3Modal.connect("walletconnect");
            // const web3 = new Web3(provider);
            // const accounts = await web3.eth.getAccounts();

            // alert(accounts[0]) ;
      // const providerOptions = {
      //   walletconnect: {
      //     display: {
      //       name: "Mobile"
      //     },
      //     package: WalletConnectProvider,
      //     options: {
      //       infuraId: "9aa3d95b3bc440fa88ea12eaa4456161" // required
      //     }
      //   },
      //   theme: "dark"
      // };
      
      // const web3Modal = new Web3Modal({
      //   network: "ropsten", // optional
      //   cacheProvider: true, // optional
      //   providerOptions // required
      // });
      
      // const provider = await web3Modal.connectTo("walletconnect");
      
      // provider.getSigner() ;

      // const web = new Web3(provider);
      //   const address = await signer.getAddress()

      //   const network = await web3Provider.getNetwork()

      //   await web3Provider.enable();

        // SetWalletAddress(address) ;

          window.location.href ="https://metamask.app.link/dapp/caladex.org";

          // const provider = new WalletConnectProvider({
          //   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",

          // });
          
          // //  Enable session (triggers QR Code modal)
          // await provider.enable();

          // // provider.enable() ;
    }
  }

  const disconnectFromWallet = async () => {
    const isOk = await swal({
                      title: "Are you sure?",
                      text: "Are you sure that you want to disconnect from your wallet?",
                      icon: "warning",
                      buttons: [
                        'No, I am not sure!',
                        'Yes, I am sure!'
                      ],
                  }) ;
    if(isOk){
      try {
       
        await deactivate();
       
        initializeWalletInfo() ;
  
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  const { dictionary ,  userLanguage} = useContext(LanguageContext);
  
  const classes = useStyles();
  const navigate = useNavigate() ;

  let isDrawerWalletBtn = useMediaQuery("(min-width:1093px)") ;
  let isXs = useMediaQuery("(min-width : 1280px)") ;
  let isDrawerMenuItem = useMediaQuery("(min-width : 930px)");

  const [isVisibleTokenListing , setVisibleTokenListing] = useState(false) ;

  const [isMobileDrawerOpen , setIsMobileDrawerOpen] = useState(false) ;
  const [itemIndex , setItemIndex] = useState(getItem('pageIndex')) ;

  useEffect(() => {
    
      let url = window.location.pathname ;

      if(url.search('exchange') >= 0 ) {
          setItem("pageIndex" , "1") ;
          setItemIndex(1) ;
          return ;
      }
      if(url.search('token-info-base') >= 0) {
          setItem("pageIndex" , "3") ;
          setItemIndex(3) ;
          return ;
      }
      if(url.search('earn-staking') >= 0){
          setItem("pageIndex" , "4") ;
          setItemIndex(4) ;
          return ;
      }
      if(url.search('balances') >= 0) {
          setItem("pageIndex" , "6") ;
          setItemIndex(6) ;
          return ;
      }
      if(url.search('orders') >= 0) {
          setItem("pageIndex" , "7") ;
          setItemIndex(7) ;
          return ;
      }

      setItem('pageIndex' , '0') ;
      setItemIndex(0) ;
  } , [navigate])

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleMobileDrawerOpen =  () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen) ;
  }

  const menuItems = [
      {
          name: dictionary.exchange,
          link: '/exchange',
          index : 1 ,
      },
      {
          name : dictionary.tokenlisting ,
          link: '/token-listing',
          index : 2 ,
      },
      {
          name: dictionary.tokeninfobase,
          link: '/token-info-base',
          index : 3 ,
      },
      {
          name: dictionary.earnstaking,
          link: '/earn-staking',
          index : 4 ,
      },
      {
        name: dictionary.balances,
        link: '/balances',
        index : 5 ,
      },
      {
        name: dictionary.orders,
        link: '/orders',
        index : 6 ,
      },
      // {
      //   name: "Calahex",
      //   link: '/Calahex',
      //   index : 7 ,
      // },
  ];

  useEffect(() => {
    if(isVisibleTokenListing) {
      document.body.style.overflow = "hidden" ;
      setVisibleTokenListing(false) ;
    } else {
      document.body.style.overflow = "visible" ;
    }
  } , [isVisibleTokenListing]) ;

  useEffect(() => {
    if(isMobileDrawerOpen) {
      document.body.style.overflow = "hidden" ;
    } else {
      document.body.style.overflow = "visible" ;
    }
  } , [isMobileDrawerOpen]) ;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
            <Link to="/" onClick={() => { setItem('pageIndex' , '0' ); }} >
              <img  src={LogoImage} 
                    alt='Main Logo'
                    className={classes.logo} />

            </Link>
            <Grid container sx={{display :"flex" , justifyContent : isDrawerMenuItem ?  "space-between" : "flex-end"}}>
              <Grid item className={clsx(classes.itemGroup)} sx={{display: isDrawerMenuItem ? "flex" : "none"}}>
                    {
                      menuItems.map((element) => {
                        if(element.index === 2){
                          return(
                            <div key={element.index}>
                              <div  className={itemIndex === element.index ? classes.itemActive : classes.itemInActive}  onClick={handleOpen}>
                                  <span  className={classes.item}>
                                    {dictionary.tokenlisting}
                                  </span>
                                  
                              </div>
                            </div>
                          )
                        }
                        if(element.index < 5 && element.index !== 2){
                          return (
                            <div key={element.index}>
                              <Typography noWrap className={ itemIndex === element.index ? classes.itemActive : classes.itemInActive}>
                                  <Link className={classes.item}
                                      to={element.link}
                                      onClick={() => { setItem('pageIndex' , element.index)}}
                                  >
                                    {element.name}
                                  </Link>
                              </Typography>
                            </div>
                          )
                        }
                      })
                    }
                    <div>
                      <Typography noWrap className={ itemIndex === 7 ? classes.itemActive : classes.itemInActive}>
                          <Box component={"a"}  className={classes.item}
                              href={"http://calahex.com"}
                              target="_blank"
                              onClick={() => { setItem('pageIndex' , 7);  }}
                          >
                            Calahex
                          </Box>
                      </Typography>
                    </div>    
              </Grid>
              <Grid item className={classes.btnItemGroup}>
                  <Box component={"div"} sx={{display : isXs && active ? "flex" : "none"}}>
                      <Link to={"/balances"}>
                        <Box component={"button"} className={ clsx( classes.btnItem ,  itemIndex === 6 ? " btn btn-primary " : " btn btn-outline-secondary" )   } onClick={() => { setItem('pageIndex' , "6"); }}>
                          {dictionary.balances}
                        </Box>
                      </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                      <Link to={"/orders"}>
                        <Box component={"button"} className={ clsx( classes.btnItem ,  itemIndex === 7 ? " btn btn-primary" : " btn btn-outline-secondary" )  } onClick={() => { setItem('pageIndex' , "7");}}>
                          {dictionary.orders}
                        </Box>
                      </Link>&nbsp;&nbsp;
                
                  </Box>
                  <NotificationsIcon className={classes.notificationButton}/>
                  &nbsp;&nbsp;
                  <LanguageSelector />
                  &nbsp;&nbsp;
                  <Hidden mdDown mdUp={isDrawerWalletBtn ? false : true}>
                    <Button className={classes.btn} 
                            variant="contained" edge="end" 
                            onClick={() => !active ? connectToWallet() : disconnectFromWallet()}
                            sx={{ width : isDrawerWalletBtn ? "auto !important" : "0px !important" , textTransform:'capitalize'}}
                    >
                      <AccountBalanceWalletIcon />
                      &nbsp;&nbsp;{ active ? "" : "Wallet Connect"}
                      { walletAddress === '' ? '' : '( ' + walletAddress.slice(0, 6) + "..." + walletAddress.slice(walletAddress.length -  4 , walletAddress.length) + " )"}
                    </Button>
                  </Hidden>
                
                  <Hidden mdUp={isXs ? true : false} >
                  <IconButton
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleMobileDrawerOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="right"
        open={isMobileDrawerOpen}
      >
        <List className={classes.drawerMenuBar}>
          <ListItem sx={{display:"flex" , justifyContent: "flex-end" }}>
                <IconButton
                  aria-label="open drawer"
                  onClick={handleMobileDrawerOpen}
                >
                  <CloseIcon />
                </IconButton>
          </ListItem>
          <Divider />
          {   menuItems.map( (element) => {
                  if( element.name === "Token Listing" ) {
                    if(!isDrawerMenuItem) {
                      return (
                        <div key={element.name}>
                          <ListItem button onClick={handleOpen }>
                                <Box component={'span'} >
                                  Token Listing
                                </Box>
                          </ListItem>
                        
                          <Divider />
                        </div>
                      )
                    }
                  }
                  else if(element.index < 5){
                    if(!isDrawerMenuItem){
                      return(
                        <div key={element.name}>
                          <Link className={classes.drawerItem}
                            to={element.link}
                            onClick = {() => setItem("pageIndex" , element.index)}
                          >
                            <Box component={"div"}>
                              <ListItem button onClick={handleMobileDrawerOpen} >
                                <Typography noWrap>
                                  
                                    {element.name}
                                  
                                </Typography>
                              </ListItem>
                            </Box>
                          </Link>
                          <Divider />
                        </div>
                      )
                    }
                  } else 
                    if(!isXs && active){
                      return(
                        <div key={element.name} >
                          <Link className={classes.drawerItem}
                            to={element.link}
                            onClick = {() => setItem("pageIndex" , element.index)}
                          >
                            <Box component={"div"}>
                              <ListItem button onClick={handleMobileDrawerOpen} >
                                <Typography noWrap>
                                  
                                    {element.name}
                                  
                                </Typography>
                              </ListItem>
                            </Box>
                          </Link>
                          <Divider />
                        </div>
                      )
                    }
                  })
          }
          {
             !isDrawerMenuItem ? <div key={element.name} >
              <ListItem button>
                <Box component={"a"}  
                  href={"http://calahex.com"}
                  target="_blank"
                  onClick={() => { setItem('pageIndex' , 7);  }} 
                >
                  Calahex
                </Box>
              </ListItem>
            
              <Divider />
            </div> : <></>
          }
          
          {
            !isDrawerWalletBtn ? <>
              <ListItem onClick={handleMobileDrawerOpen}>
                <Button size="large" variant="contained" className={classes.drawerWalletBtn} onClick={() => !active ? connectToWallet() : disconnectFromWallet()} sx={{textTransform:'capitalize'}}>
                  { active ? "" : "Wallet Connect"}
                  { walletAddress === '' ? '' : '( ' + walletAddress.slice(0, 6) + "..." + walletAddress.slice(walletAddress.length -  4 , walletAddress.length) + " )"}
                </Button>
                {/* {web3Provider ? (
                    <button className="button" type="button" onClick={disconnect}>
                      Disconnect
                    </button>
                  ) : (
                    <button className="button" type="button" onClick={connect}>
                      Connect
                    </button>
                  )
                } */}
              </ListItem></> : <></>
          }
        </List>
      </Drawer>
      <TokenListing 
        open = {open}
        handleClose = {handleClose}
      />
    </div>
  );
}

Header.propsType = {
  walletAddress : PropTypes.string.isRequired ,
}
const mapStateToProps = state => ({
  walletAddress : state.wallet.address ,
  walletBalance : state.wallet.balance
})

const mapDispatchToProps = {
  SetWalletAddress ,
  GetWalletBalance
}

export default connect(mapStateToProps , mapDispatchToProps)(Header) ;