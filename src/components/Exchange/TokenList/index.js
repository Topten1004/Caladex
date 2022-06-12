

import React, { useEffect , useRef } from 'react' ;

import TokenPairBox from './TokenPairBox';
import TokenSearchBox from './TokenSearchBox';
import TokenInfoList from './TokenInfoList';

import {
    Box ,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        backgroundColor : "white" ,
        top : 0,
        width : '100%' ,
        height : "calc(100vh - 122px)" ,
        position  : "absolute" ,
        zIndex : 2000
    }
}));

const TokenList = (props) => {

    const classes = useStyles() ;

    const {
        handleChangeTokenId , handleChangeToken, handlePairInfoVisible
    } = props ;

    return (
        <Box component={"div"} className={classes.root} >
            <Grid container>
                <Grid item xs={12}>
                    <TokenPairBox />
                </Grid>
                <Grid item xs={12}>
                    <TokenSearchBox />
                </Grid>
                <Grid item xs={12}>
                    <TokenInfoList 
                        handleChangeTokenId={handleChangeTokenId}
                        handleChangeToken={handleChangeToken}
                        handlePairInfoVisible={handlePairInfoVisible}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default TokenList ;