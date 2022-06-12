

import React, { useEffect, useRef , useState } from 'react' ;

import { useWeb3React } from "@web3-react/core";

import styled from '@emotion/styled';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { 
    Card ,
    CardContent,
    Grid ,
    FormLabel ,
    useMediaQuery ,
    Box
} from '@mui/material';

import {
    MDBContainer ,
    MDBInputGroup,
} from "mdbreact";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import { makeStyles } from '@mui/styles';

const BootstrapTooltip = styled( ({ className, ...props }) => (

    <Tooltip {...props} arrow classes={{ popper: className }} />
    ) ) ( ({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        },
    }));

const useStyles = makeStyles(() => ({
    root : {
        "& .MuiPaper-root" : {
            border : "1px solid lightgray" ,
        } ,
        "& .MuiGrid-root" :{
            textAlign : "center"
        },
        "& input" : {
            fontSize : "14px"
        } ,
    },
    sendBtn : {
        backgroundColor : "#206bc4 !important" ,
    },
    receiveBtn : {
        backgroundColor : "#f76707 !important"
    },
    toolTip : {
        color : "white" ,
        position : "absolute",
        right : "0px" ,
        padding : "5px" ,
        opacity : "0"
    },
}));


const AddressWidget = () => {

    const { active, account, chainId, library, activate  , deactivate} = useWeb3React();

    const classes = useStyles() ;
    const addressCtrl = useRef(null) ;
    const [isCopied , setIsCopied] = useState(false) ;

    const isXs = useMediaQuery("(min-width : 645px)") ;

    useEffect(() =>{
        if(active) {
            if(addressCtrl) {
                addressCtrl.current.value = account ;
            }
        }
    } , [active, account , library]) ;

    const emitCopyEvent = () => {
        setIsCopied(true) ;
        addressCtrl.current.select() ;
        document.execCommand("copy");
    }
    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={1}>
                            <FormLabel>
                                <AccountCircleOutlinedIcon />
                            </FormLabel>
                        </Grid>
                        <Grid item xs={isXs ? 10 : 11} >
                            <MDBContainer>
                                <MDBInputGroup
                                    containerClassName="mb-3"
                                    append={
                                        <BootstrapTooltip title={isCopied ? "Copied" : "Copy"} placement="right" >
                                            <Box component={"span"} className='input-group-text' onClick={() => emitCopyEvent()} onMouseLeave={() => setIsCopied(false)}>
                                                <ContentCopyIcon fontSize={"small"}  />
                                            </Box>
                                        </BootstrapTooltip>
                                    }
                                    inputs={
                                        <Box component={"input"} type="text" className="form-control"  id="address" ref={addressCtrl} readOnly/>
                                    }
                                />
                            </MDBContainer>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddressWidget ;