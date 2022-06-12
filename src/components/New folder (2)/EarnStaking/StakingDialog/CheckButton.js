


import React from 'react' ;

import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root :{
        position : 'absolute' ,
        visibility : props => props.visible ? "visible" : "hidden" ,
        width : props => props.width ,
        height : props => props.height,
        right : props => props.right ,
        top : props => props.top  ,
        background : props => `linear-gradient(to top right, transparent 50%, ${props.color} 0)` ,
        borderRadius : props => props.borderRadius ,
        "& .MuiSvgIcon-root" : {
            width: "50%",
            height: "50%" ,
            fontWeight : "bold",
        },
    },
    check : {
        color : "white" ,
        marginBottom : "50%" ,
        marginLeft: "50%" ,
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "center" ,
        fontSize : "18px !important" ,
    }
}));
const CheckButton = (props) => {
    
    const { width  ,  height , right , top , color , borderRadius} = props ;

    const classes = useStyles(props) ;

    return (
        <div className={classes.root}>
            <CheckIcon className={classes.check}/>
        </div>
    )
}


export default CheckButton ;