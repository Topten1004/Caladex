
import React , { useEffect } from 'react' ;

import {
    Box
} from '@mui/material' ;

import SearchIcon from '@mui/icons-material/Search';

const TokenSearch = (props) => {

    const { searchForMoreTokens  , searchCtrl} = props ;

    return (
        <>
            <Box component={"div"} className='input-group' sx={{width:"auto" , marginLeft:"auto"}}>
                <Box component={"label"} className='input-group-prepend' sx={{marginBottom : "0px"}}>
                    <Box component={"span"} className='input-group-text'>
                        <SearchIcon />
                    </Box>
                </Box>
                <Box component={"input"} type="text" className='form-control' placeholder='Search for more tokens.' sx={{height : "auto"}}  ref={searchCtrl} onKeyUp={(e) => searchForMoreTokens(e.target.value)}/>
            </Box>
        </>
    )
}

export default TokenSearch ;