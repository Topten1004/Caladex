

import React from 'react' ;

import { 
    Card,
    CardContent,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        border : "1px solid lightgray"
    }
}));
const EmptyWidget = () => {
    const classes = useStyles() ;

    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    )
}

export default EmptyWidget ;