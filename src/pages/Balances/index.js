

import React, { useEffect } from 'react' ;

import { makeStyles } from '@mui/styles';

import { 
    Grid ,
    useMediaQuery
} from '@mui/material';

import AddressWidget from '../../components/Balances/AddressWidget';
import WalletManagement from '../../components/Balances/WalletManagement' ;


const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "50px" ,
        marginLeft : "7%",
        marginRight : "7%" , 
        minHeight : "calc(100vh - 124px)" ,
    },
}));

const Balances = () => {

    const classes = useStyles() ;

    const isXs = useMediaQuery("(min-width: 1285px)") ;

    return (
        <>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <AddressWidget />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <WalletManagement />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default Balances ;