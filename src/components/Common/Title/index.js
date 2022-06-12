

import React from 'react' ;

import { Link } from 'react-router-dom' ;

import {
    Button,
    Container ,
    Grid ,
    Typography
} from '@mui/material' ;


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        padding: "0px !important",
        "& .MuiTypography-root" :{
            color : theme.palette.primary.main ,
            fontWeight : "600 !important" ,
            fontFamily : "Segoe UI !important",
        } , 
        "& a:hover" : {
            textDecoration : "none !important" 
        }
    } ,
    title : {
        textAlign : "center"
    },
    bigTitle : {
        fontSize : "60px !important" ,
        [theme.breakpoints.down("md")] : {
            fontSize: "45px !important"
        },
        [theme.breakpoints.down("sm")] : {
            fontSize: "30px !important"
        },
    },
    mediumTitle : {
        fontSize : "40px !important" ,
        [theme.breakpoints.down("md")] : {
            fontSize: "30px !important"
        },
        [theme.breakpoints.down("sm")] : {
        fontSize: "20px !important"
        },
    } ,
    smallTitle : {
        fontSize : "30px !important" ,
        [theme.breakpoints.down("md")] : {
            fontSize: "20px !important"
        },
        [theme.breakpoints.down("sm")] : {
        fontSize: "15px !important"
        },
    },
    titleFooter : {
        marginBottom : theme.spacing(3) ,
    }
}));
const Title = (props) => {

    const classes = useStyles() ;

    const {
        bigTitle ,
        smallTitle,
        mediumTitle ,
        isVisibleTradeButton ,
        handleCloseTimer
    } = props ;

    return (
        <>
            <Container className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.title}>
                        <Typography className={classes.bigTitle} >{bigTitle}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.title}>
                        <Typography className={classes.mediumTitle} >{mediumTitle}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.title}>
                        <Typography className={classes.smallTitle} >{smallTitle}</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.title} hidden={isVisibleTradeButton ? "" : "hidden"}>
                        <Link to="/exchange">
                            <Button variant="contained" sx={{borderRadius:"20px"}} size='large' onMouseUp={handleCloseTimer}>Trade Now</Button>
                        </Link>
                    </Grid>
                </Grid>
                <div className={classes.titleFooter}></div>
            </Container>
        </>
        
    )
}

export default Title ;