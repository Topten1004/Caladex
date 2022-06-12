

import React, { useEffect, useRef } from 'react' ;

import { makeStyles } from '@mui/styles';

import {
    AppBar ,
    Toolbar ,
    Typography,
    Box ,
    IconButton,
    useMediaQuery ,
    Grid
} from '@mui/material' ;

const useStyles = makeStyles((theme) => ({
    root : {
        // flexGrow: 1,

        "& svg" : {
            color : "white !important"
        } ,
        "& button" : {
            marginRight : "20px !important"
        },
        "& .MuiToolbar-root" : {
            padding : "0px !important" ,
            paddingTop : "10px !important" ,
            paddingBottom : "15px !important" ,
        },
        "& .MuiGrid-item" : {
            display : "flex" ,
            alignItems : "center",
            justifyContent : 'center'
        },
        // marginTop : "66px" ,
        padding:"0px"
    },
    toolbar : {
        
    } ,
    copyright : {
        fontSize : "15px" ,
    } ,
    iconGroup : {
        // marginRight : theme.spacing(2),
    } ,

}));

const Footer = () => {

    const classes = useStyles() ;

    const isXs = useMediaQuery("(min-width : 700px)") ;

    return (
        <div className={classes.root}  >
            <AppBar position="static" color="primary">
                <Toolbar className={classes.toolbar}>
                    <Grid container>
                        <Grid item xs={isXs ? 2 : 12}>
                            <Box>
                                <Typography color="inherit" className={classes.copyright} sx={{textAlign: isXs ? "left" : "center"}}>
                                    Copyright © 2022 
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid  item xs={6} sx={{marginTop:isXs ? "0px" : "15px"}}>

                        </Grid>
                        <Grid item xs={isXs ? 4 : 12} sx={{textAlign: isXs ? "right" : "center"}}>
                            <Box className={classes.iconGroup}>
                                <IconButton sx={{backgroundColor : "#1da1f2"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{backgroundColor:"#3b5998"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{backgroundColor : "#e4405f"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <rect x="4" y="4" width="16" height="16" rx="4"></rect>
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501"></line>
                                    </svg>
                                </IconButton>
                                <IconButton sx={{backgroundColor : "#181717"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                                    </svg>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Footer ;