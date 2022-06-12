


import React from 'react' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        
    }
}));

const CustomDatePicker = (props) => {

    const classes = useStyles() ;

    const {
        id , 
        setStartTime ,
        setEndTime
    } = props ;

    const handleDateTime = (e) => {
        if(id === 1) {
            setStartTime(e.target.value) ;
            return ;
        }
        if(id === 2) {
            setEndTime(e.target.value) ;
            return ;
        }
    }

    return ( 
        <div className={classes.root}>
            <input type="date" className="form-control form-control-sm" defaultValue={id ? (id === 1 ? "2022-01-01" : new Date().toISOString().substring(0,10) ) : "2022-01-01" } onChange={(e) => handleDateTime(e)}/>
        </div>
    )
}

export default CustomDatePicker ;