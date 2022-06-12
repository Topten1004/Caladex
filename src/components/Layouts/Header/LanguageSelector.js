import React from 'react';

import { useState , useContext , useEffect , useRef } from 'react' ;

import TranslateIcon from '@mui/icons-material/Translate';

import {
    Select ,
    ListItem ,
    List ,
    InputBase ,
    Grid ,
} from '@mui/material';

import { 
    makeStyles ,
    withStyles
} from "@mui/styles";

import clsx from 'clsx';

import { languageOptions } from '../../../static/languages';
import { LanguageContext } from '../../../utils/Language';

const CustomInput = withStyles((theme) => ({
    root : {
        marginLeft : "3px !important" ,
        width : "80px" ,
        opacity : "1 !important" ,
        display : "flex" ,
        alignItems : "center" ,
        "& input" : {
            paddingBottom : "5px" ,
            border : "0px !important", 
            opacity : "1 !important",
            overflow : "visible" ,
            fontSize : "14px" ,
            color : theme.palette.primary.main ,
            textTransform : "uppercase" ,
            fontFamily : [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(',')
        }
    } ,
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    root : {
        color : theme.palette.primary.main ,
    },
    translateIcon : {
        fontSize : "16px !important"
    } ,
    
    langauageSelect : {
        "& .MuiOutlinedInput-root" : {
            border : "0px !important"
        },
    },
    lanPanel : {
        width : "300px" ,
        padding : "0px !important" ,
    } ,
    lanBorder : {
        borderRight : "1px solid " + theme.palette.primary.main
    },
    lanItem : {
        padding : "0px !important" ,
        color : theme.palette.primary.main + " !important" ,
        fontSize : "1rem" ,
        paddingLeft : "10px !important" ,
        height : "30px !important"
    },
    lanHeader : {
        padding : "0px !important" ,
        fontSize : "12px" ,
        paddingLeft : "10px !important",
        color : "gray" ,
        paddingBottom : "15px !important" 
    }
}));

const LanguageSelector = () => {

    const classes = useStyles() ;
    const currencies = ["USD" , "EUR"] ;

    const { userLanguage , userLanguageChange } = useContext(LanguageContext) ;
    const [ currentLan, setCurrentLan ] = useState('');
    const [ currency, setCurrency ] = useState('USD');
    const lanCtrl = useRef(null) ;

    const handleLanguageClick = lan => { userLanguageChange(lan); };
    const handleCurrencyClick = cur => { setCurrency(cur); };

    useEffect(() => {
        lanCtrl.current.childNodes[1].value = userLanguage + "/" + currency ;
    } , [userLanguage , currency]);

    useEffect(() => {
        let defaultLanguage = window.localStorage.getItem('rcml-lang');
        if (!defaultLanguage) {
            defaultLanguage = window.navigator.language.substring(0, 2);
        }
        userLanguageChange(defaultLanguage);
        setCurrentLan(defaultLanguage);
    }, [userLanguageChange]);

    return (
            <div className={classes.root}>
                <TranslateIcon className={classes.translateIcon} />
                <Select className={classes.langauageSelect}
                    id = {"custom-select"}
                    input={<CustomInput ref={lanCtrl}/>}
                >
                
                    <List className={classes.lanPanel} >
                        <Grid container >
                            <Grid item xs={8} >
                                <List className={classes.lanBorder}>
                                    <ListItem className={classes.lanHeader}>Languages</ListItem>
                                    <ListItem button className={classes.lanItem}>
                                        { languageOptions[currentLan] }
                                    </ListItem>
                                    {
                                        Object.entries(languageOptions).map(([id , name]) => {
                                            if(id != currentLan) {
                                                return (
                                                    <ListItem button className={classes.lanItem} value={name} key={id} onClick={() => handleLanguageClick(id)}>
                                                        {name}
                                                    </ListItem>
                                              )  
                                            }
                                        })
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={4} >
                                <List>
                                    <ListItem  className={classes.lanHeader}>Currency</ListItem>
                                    <ListItem button className={classes.lanItem}>
                                        {currency}
                                    </ListItem>
                                    {
                                        currencies.map((element , index) => {
                                            if(element != currency)
                                                return (
                                                    <ListItem button value={index} key={index} className={classes.lanItem}  onClick={() => handleCurrencyClick(element)}>
                                                        {element}
                                                    </ListItem>
                                                )
                                        })
                                    }
                                </List>
                            </Grid>
                        </Grid>
                    </List>
                </Select>
            </div>
    );
};

export default LanguageSelector ;