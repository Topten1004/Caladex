

import React from 'react' ;

import {
    Card ,
    CardContent,
    CircularProgress,
    Grid, 
    IconButton, 
    useMediaQuery,
} from '@mui/material' ;

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    fruit : {
       borderRadius : "0px !important",
       "& .MuiCardContent-root" :{
        paddingTop : '1rem !important' ,
        paddingBottom : '1rem !important' ,
       } ,
       "& .MuiButtonBase-root" : {
           height : "25px !important" ,
           width : "25px !important" ,
       },
       "& svg" : {
            fontSize : "25px !important" ,
            color : "white" ,
            "&:hover" : {
                color : "#235580"
            }
       }
    } ,
    fruitContent : {
        textAlign : "center" ,
        borderRadius : "0px" ,
        backgroundColor  : theme.palette.primary.main ,
    },
    fruitItem : {
        fontSize : "16px" ,
        fontFamily : "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif" ,
        fontWeight : "500" ,
        color : "white" ,
        cursor : "pointer" ,
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,
    },
    loading : {
        color : "white !important"
    },
}));
const FruitBar = (props) => {

    const { goToPrevious , goToNext , firstTokenInfo , lastTokenInfo , middleTokenInfo , countTokens , firstTradingIndex} = props;
    const isXs = useMediaQuery("(min-width : 599px)") ;
    const isXsItem = useMediaQuery("(min-width:930px)") ;
    
    const classes = useStyles() ;
    
    return (
        <>
            <Card className={classes.fruit}>
                <CardContent className={classes.fruitContent}>
                    <Grid container>
                        <Grid item xs={1}  className={classes.fruitItem}>
                            <IconButton size='small' disabled={firstTradingIndex === 0 ? true : false} onClick={() => goToPrevious()}>
                                <ArrowBackIosIcon  />
                            </IconButton>
                        </Grid>
                        <Grid item xs={10}>
                                <Grid container sx={isXsItem ? {display:"flex" , flexDirection:"row" } : {display:"flex" , flexDirection:"column"}}>
                                {
                                    countTokens === 0  ? <>
                                        <Grid item xs={12} >
                                            <CircularProgress size={20} className={classes.loading}/>
                                        </Grid>
                                    </> :<>
                                        <Grid item xs={isXsItem ? (countTokens === 2 ? 6:4) : 12}  className={classes.fruitItem} sx={{display: countTokens >=2  ? "flex" : "none"}}>
                                            {firstTokenInfo}
                                        </Grid>
                                        <Grid item xs={isXsItem ? (countTokens === 1 ? 12 : 4) : 12}  className={classes.fruitItem} sx={{display: countTokens >=3 || countTokens === 1  ? "flex" : "none"}}>
                                            {middleTokenInfo}
                                        </Grid>
                                        <Grid item xs={isXsItem ? (countTokens === 2 ? 6:4) : 12}  className={classes.fruitItem} sx={{display:countTokens >=2  ? "flex" : "none"}}>
                                            {lastTokenInfo}
                                        </Grid>
                                        
                                    </>
                                }
                            </Grid>
                            
                        </Grid>
                        
                        <Grid item xs={1}  className={classes.fruitItem}>
                            <IconButton  size={"small"} disabled={firstTradingIndex < countTokens - 3 ? false : true} onClick={() => goToNext()}>
                                <ArrowForwardIosIcon  />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
        
    )
}

export default FruitBar ;