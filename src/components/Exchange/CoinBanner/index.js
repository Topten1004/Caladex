


import React, { useEffect } from 'react' ;

import { useState } from 'react' ;

import { connect } from 'react-redux';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

//_____________styles_______________
import {
    Box, 
    Grid ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : theme.palette.primary.main ,
        display : "flex",
        alignItems : "center" ,

        "& .MuiGrid-item" : {
            display : "flex" ,
            flexDirection : "column" ,
            justifyContent : "center" ,
            alignItems : "flex-end" ,
            paddingLeft: "15px" ,
            paddingRight : "15px",
            paddingTop : "5px" ,
            paddingBottom : "5px" ,
        } ,
        "& .MuiInputBase-root" : {
            color : "white !important" ,
            textAlign : "right" ,
            fontSize : "14px" ,
        },
        "& .MuiSvgIcon-root" :{
            color : "white !important"
        }
    } ,
    label : {
        paddingBottom : "5px" ,
        color : "#8fb5fc" ,
        fontSize : "11px" ,
    } ,
    trade : {
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "flex-end" ,
        fontSize : "14px" ,
        color : "white" ,
    }
})) ;

//___________component_________________
const CoinBanner = (props) => {

    const { 
        tokenLiquidityList ,
        tokenId ,
        handlePairInfoVisible ,
     } = props ;

    const classes = useStyles() ;

    const [ icon , setIcon ] = useState(0) ;

    const labelList = [
        {
            index : "last" ,
            label : "Last Price"
        } ,
        {
            index : "percentChange" ,
            label : "24h Change"
        },
        {
            index : "low24hr" ,
            label : "24h Low"
        },
        {
            index : "high24hr" ,
            label : "24h High"
        } ,
        {
            index : "total24hr" ,
            label : "Volume"
        }
    ]

    const handleChangeIcon = () => {
        setIcon(!icon) ;
    }

    const onClickToken = () => {
        handlePairInfoVisible() ;
        handleChangeIcon() ;
    }

    return (
        <Box component={"div"} className={classes.root}>
            <Grid container>
                <Grid item xs={3} >
                    <Box component={"div"} className={classes.trade} sx={{cursor : "pointer"}} onClick={onClickToken}>
                        {
                            tokenId !== null && tokenLiquidityList.length !== 0 ? <>
                                { tokenLiquidityList[tokenId].symbol + " / " + tokenLiquidityList[tokenId].pair_type} 
                                { icon ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </> :<></>
                        }
                    </Box>
                    <Box component={"div"} className={classes.label} sx={{marginRight : "24px"}}>
                        Tether
                    </Box>
                </Grid>
                {
                    tokenId !== null && tokenLiquidityList.length !== 0 ? 
                        labelList.map(( item , index ) => {
                            return (
                                <Grid item key={index}>
                                    <Box component={"div"} className={classes.label}>
                                        { item.label }
                                    </Box>
                                    <Box component={"div"} className={classes.trade}>
                                        { tokenLiquidityList[tokenId][item.index] }
                                    </Box>
                                </Grid>
                            )
                        })
                     : <>
                    </>
                }
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    tokenLiquidityList : state.token.tokenLiquidityList
})

export default connect(mapStateToProps)(CoinBanner) ;