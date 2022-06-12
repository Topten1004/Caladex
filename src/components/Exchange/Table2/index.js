import * as React from 'react';

import {
    Card ,
    CardContent ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

import quotesOne from '../../../static/tokensinfo/quotesOne.json' ;

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(3) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue",
        "& th" : {
            fontSize : ".625rem" ,
        },
        "& td" : {
            fontSize : "14px" ,
            fontFamily : "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif" ,
            color : "#D63939"
        }
    } ,
}));


const Table1 = () => {
    const classes = useStyles() ;

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className='table-responsive'>
                    <table className='table table-striped'>
                        <tbody>
                                <tr>
                                    <th>
                                        PRICE(ETH)
                                    </th>
                                    <th>
                                        AMOUNT(BZTC)
                                    </th>
                                    <th>
                                        TOTAL(ETH)
                                    </th>
                                </tr>
                                {
                                    quotesOne.map((element, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>
                                                    {element.Price}
                                                </td>
                                                <td>
                                                    {element.Amount}
                                                </td>
                                                <td>
                                                    {element.Total}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
                
            </CardContent>
        </Card>
       
    );
}

export default Table1 ;