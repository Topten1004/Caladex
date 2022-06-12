


import React from 'react' ;

import { makeStyles } from '@mui/styles';

import TokenListing from '../../Common/TokenListing';

import {
    Drawer ,
    List, 
    ListItem ,
    IconButton,
    Divider ,
    Button ,
    Typography ,
    Link ,
    Box ,
    useMediaQuery
} from '@mui/material' ;

import CloseIcon from '@mui/icons-material/Close' ;

const useStyles = makeStyles(theme=> ({
    root: {
        "& .MuiDrawer-paper": {
            width : "100% !important",
            marginTop: "60px !important" ,
            backgroundColor : theme.palette.primary.main + " !important"
        } 
    },
    drawerItem: {
        color : "white !important",
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
    }
}));
const DrawerNavbar = (props) => {

    const {
        menuItems,
        handleMobileDrawerOpen,
        open,
    } = props ;

    const classes = useStyles() ;

    const isXs = useMediaQuery("(min-width : 1316px)") ;

    const linkClicked = (path) => {
        window.location.pathname = path ;
    }
    return (
        <div className={classes.root}>
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List  className={classes.drawer}>
                    
                    <ListItem sx={{display:"flex" , justifyContent: "flex-end" }}>
                            <IconButton
                            aria-label="open drawer"
                            onClick={handleMobileDrawerOpen}
                            >
                            <CloseIcon sx={{color : "white"}}/>
                            </IconButton>
                    </ListItem>

                    <Divider />

                    { !isXs ? menuItems.map( element => {
                            if( element.name === "Token Listing" )
                                return (
                                    <div key={element.index}>
                                        <ListItem button data-toggle="modal" data-target="#myModal">
                                            <Box component="span" display="inline" color="white">
                                                Token Listing
                                            </Box>
                                            <TokenListing />
                                        </ListItem>
                                        <Divider />
                                    </div>
                                )
                            else 
                                return(
                                    <div key={element.index}>
                                        <Link className={classes.drawerItem}
                                            onClick={() => linkClicked(element.link)}
                                        >
                                            <ListItem button onClick={handleMobileDrawerOpen} sx={{height : "50px"}}>
                                                <Typography noWrap>
                                                    
                                                    {element.name}
                                                    
                                                </Typography>
                                            </ListItem>
                                            </Link>
                                        <Divider />
                                    </div>
                                )
                        }) : (
                            <>
                            </>
                        )
                    }

                    <ListItem onClick={handleMobileDrawerOpen}>
                        <Button size="large" variant="contained" sx={{borderRadius : "30px"}} >Wallet Connect</Button>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default DrawerNavbar ;