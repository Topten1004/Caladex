import React from 'react';

import PropTypes from 'prop-types' ;

import { PRIVATE_CALADEX_API } from '../../../static/constants' ;

import {
    Paper ,
    TableContainer ,
    Table ,
    TableHead,
    TableBody ,
    TableRow ,
    TableCell,
    Box ,
    TablePagination,
    CircularProgress,
} from '@mui/material' ;

import FileCopyIcon from '@mui/icons-material/FileCopy';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined' ;
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiTableCell-root" : {
            cursor : "pointer"
        },
        marginTop : "50px" ,
        "& .MuiTableHead-root" : {
            backgroundColor : "#f2f2f2 !important" ,
            "& .MuiTableCell-root" : {
                backgroundColor : "#f2f2f2 !important" ,
                fontSize : "0.625rem" ,
                color : "black",
                fontWeight : "bold" ,
                textAlign : "left"
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root:nth-child(even)" : {
                backgroundColor : "#f2f2f2 !important"
            },
            "& .MuiTableCell-root" : {
                textAlign : "left"
            }
        },
        "& .MuiTablePagination-root" : {
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        } ,
    },
    addressCell : {
        "&:hover" : {
            color : theme.palette.primary.main
        }
    }
}));

const TokenInfoList = (props) => {

    const { tokenInfoList } = props ;
    const classes = useStyles() ;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const goToPdf = (pdf_url) => {
        window.open(pdf_url , "_blank") ;
    }
    
    const emitCopyEvent = (copyAddress) => {

        let tmp = document.createElement('textarea');

        tmp.value = copyAddress;
        tmp.setAttribute('readonly', '');
        tmp.style.position = 'absolute';
        tmp.style.left = '-9999px';
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);

    }

    return (
        <div className={classes.root}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>TOKEN NAME</TableCell>
                                <TableCell>TOKEN SYMBOL</TableCell>
                                <TableCell>PAIR TYPE</TableCell>
                                <TableCell>TOKEN ADDRESS</TableCell>
                                <TableCell>WEBSITE URL</TableCell>
                                <TableCell>ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ( tokenInfoList.length !== 0 && tokenInfoList[0] !== "No Avaliable Informations." ) ? tokenInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((element, index) => {
                                    return(
                                        <TableRow key={index}>
                                            <TableCell>{element.name}</TableCell>
                                            <TableCell>
                                                <img src={`${PRIVATE_CALADEX_API}files/${element.logo_url}`} width={"30px"} height={"25px"}/>&nbsp;&nbsp;{element.symbol}
                                            </TableCell>
                                            <TableCell>{element.pair_type}</TableCell>
                                            <TableCell className={classes.addressCell} onClick={() => emitCopyEvent(element.address)}>
                                                {element.address}&nbsp;&nbsp;<FileCopyIcon sx={{fontSize:"18px"}} />
                                            </TableCell>
                                            <TableCell>
                                                <Box component={"a"} href={element.website_url} target="_blank">
                                                    {element.website_url}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box component={"button"} type="button"  className='btn btn-sm btn-primary'  onClick={() =>  goToPdf( `${PRIVATE_CALADEX_API}files/${element.short_version_pdf_url}`) } disabled={element.short_version_pdf_url === "" ? true : false}>
                                                    < VisibilityOutlinedIcon />
                                                </Box>&nbsp;&nbsp;
                                                
                                                <Box component={"button"} className='btn btn-sm btn-success' onClick={() =>  goToPdf( `${PRIVATE_CALADEX_API}files/${element.long_version_pdf_url}`) } disabled={element.long_version_pdf_url === "" ? true : false}>
                                                    <DescriptionOutlinedIcon />
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }) : (tokenInfoList.length === 0 ? 
                                        <TableRow>
                                            <TableCell colSpan={7} sx={{textAlign:"center"}}>
                                                <CircularProgress size={30}/>
                                            </TableCell>
                                        </TableRow>
                                        :
                                        <TableRow>
                                            <TableCell colSpan={7} sx={{textAlign:"center"}}>
                                                No Available Informations.
                                            </TableCell>
                                        </TableRow>
                                    ) 
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={tokenInfoList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                {/* <TokenListing /> */}
            </Paper>
        </div>
    );
}

TokenInfoList.propsType = {
    tokenInfoList : PropTypes.array.isRequired ,
}
export default TokenInfoList ;