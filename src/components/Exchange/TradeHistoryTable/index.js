import * as React from 'react';

import {
    Card ,
    CardContent, 
    CardHeader,
    Divider,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

import tokenHistory from '../../../static/tokensinfo/history.json' ;

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.spacing(5) ,
        boxShadow: "3px -4px 7px 0px lightblue !important",
        border : "1px solid lightblue" ,
        height : "430px" ,
        "& .MuiCardHeader-title" : {
            fontSize : "16px !important" ,
            color : "#206BC4 !important"
        },
        "& th" : {
            fontSize : ".625rem" ,
        } ,
        "& td" : {
            fontSize : "14px" ,
            fontFamily : "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif"
        }
    } ,
}));

const TradeHistoryTable = () => {
    const classes = useStyles() ;

    return (
        <Card className={classes.root}>
            <CardHeader
                title = "Trade History"
            >
                
            </CardHeader>
            <Divider />
            <CardContent>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th>
                                TIME
                            </th>
                            <th>
                                PRICE
                            </th>
                            <th>
                                AMOUNT(BTZC)
                            </th>
                        </tr>
                        {
                            tokenHistory.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {element.Time}
                                        </td>
                                        <td>
                                            {element.Price}
                                        </td>
                                        <td>
                                            {element.Amount}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </CardContent>
        </Card>
        
    );
}

export default TradeHistoryTable ;