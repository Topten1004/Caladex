import React from 'react';

import { useState , useEffect } from 'react' ;
import { useWeb3React } from '@web3-react/core';
import { useNavigate } from 'react-router-dom';

import CurrentOrderList from '../CurrentOrderList';
import OrderHistoryList from '../OrderHistoryList' ;
 
import {makeStyles} from '@mui/styles' ;

import {
    Box ,
    Tab ,
} from '@mui/material' ;

import {
    TabContext ,
    TabList ,
    TabPanel
} from '@mui/lab' ;

const useStyles = makeStyles((theme) => ({
    root : {
        border : "1px solid lightgray"
    } ,
    tabLabel : {
        fontWeight : 'bold !important' ,
    },
}));

const OrdersHistory = () => {

  const classes = useStyles() ;

  const { active } = useWeb3React() ;
  const navigate = useNavigate() ;

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
        if(!active) {
            navigate('/') ;   
        }
  } , [active]);

  return (
        <div className={classes.root}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab className={classes.tabLabel} label="Current Order" value="1" />
                            <Tab className={classes.tabLabel} label="Order History" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <CurrentOrderList />
                    </TabPanel>
                    <TabPanel value="2">
                        <OrderHistoryList />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
  );
}

export default OrdersHistory ;