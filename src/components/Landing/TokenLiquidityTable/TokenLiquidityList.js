import React from 'react';

import PropTypes from 'prop-types' ;

import {
    Paper ,
    TableContainer ,
    Table ,
    TableHead,
    TableBody ,
    TableRow ,
    TableCell,
    TablePagination,
    CircularProgress,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import { PRIVATE_CALADEX_API } from '../../../static/constants';

const useStyles = makeStyles(() => ({
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
                textAlign : "right"
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableRow-root:nth-child(even)" : {
                backgroundColor : "#f2f2f2 !important"
            },
            "& .MuiTableCell-root" : {
                textAlign : "right"
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
        }
    }
}));

const TokenLiquidityList = (props) => {

    const { tokenLiquidityList } = props ;
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

    return (
        <div className={classes.root}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign:"left"}}>PAIR</TableCell>
                                <TableCell>LAST PRICE</TableCell>
                                <TableCell>24H CHANGE</TableCell>
                                <TableCell>24H HIGH</TableCell>
                                <TableCell>24H LOW</TableCell>
                                <TableCell>24H VOLUME</TableCell>
                                <TableCell>24H TOTAL</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                ( tokenLiquidityList.length !== 0 && tokenLiquidityList[0] !== "No Avaliable Informations." ) ? tokenLiquidityList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((element, index) => {
                                    return(
                                        <TableRow key={index}>
                                            <TableCell sx={{textAlign:"left"}}><img src={`${PRIVATE_CALADEX_API}files/${element.logo_url}`} width={25} height={25} alt='NO IMAGE.' /> &nbsp; {element.symbol}/{element.pair_type} </TableCell>
                                            <TableCell sx={{color : Number(element.percent_change) <= 0 ? "#d56255" : "#3c868f"}} >{element.last}&nbsp;{ Number(element.percentChange) <= 0 ? "↓" : "↑"}</TableCell>
                                            <TableCell sx={{color : Number(element.percent_change) <= 0 ? "#d56255" : "#3c868f"}}>{element.percentChange}</TableCell>
                                            <TableCell>{element.high24hr}</TableCell>
                                            <TableCell>{element.low24hr}</TableCell>
                                            <TableCell>{element.volume24hr}</TableCell>
                                            <TableCell>{element.total24hr}</TableCell>
                                        </TableRow>
                                    )
                                }) : ( tokenLiquidityList.length === 0 ? 
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
                    count={tokenLiquidityList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

TokenLiquidityList.propsType = {
    tokenLiquidityList : PropTypes.array.isRequired ,
}
export default TokenLiquidityList ;