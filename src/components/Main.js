

import React, { useEffect , useRef  } from 'react' ;

import { useNavigate    } from 'react-router-dom' ;

import Header from './Layouts/Header';
import Footer from './Layouts/Footer' ;

import Routing from './Routes';

import { makeStyles } from '@mui/styles';

import { getItem , setItem } from '../utils/helper';

const useStyles = makeStyles((theme) => ({
    root : {
        "&::-webkit-scrollbar-thumb" : {
            backgroundColor : "gray" ,
            borderRadius : "5px"
        } ,
        "&::-webkit-scrollbar-track" : {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        "&::-webkit-scrollbar":{
            width : "0.625rem"
        } ,
        maxHeight : "100vh" ,
        overflowY : "scroll" ,
        overflowX : "auto" ,
        padding : "0px !important" ,
        margin : "0px important"
    } ,
}))

const Main = () => {
    const classes = useStyles() ;
    const scrollTop = useRef({                
        current : {
            innerText : "efefef"
        }
    }) ;

    return (
        <div className={classes.root} ref={scrollTop}>
            <Header scrollTop={scrollTop}/>
            <Routing />
            <Footer />
        </div>
    )
}
export default Main ;