



import React from 'react' ;

import { makeStyles } from '@mui/styles';

import { useEffect } from 'react' ;

import PropTypes from 'prop-types' ;
import { connect } from 'react-redux';

import { GetTokenLiquidityList } from '../../../redux/actions/token' ;
import { PRIVATE_CALADEX_API } from '../../../static/constants';

import {
  Box,
  CircularProgress
} from '@mui/material' ;

const useStyles = makeStyles({
    root : {
        width : "100%" ,
        borderBottom : "1px solid lightgray" ,
        borderTop : "1px solid lightgray" ,
        boxSizing: "borderBox",
        "& div" : {
          display: "block"
        },
        "& .ticker-tape" : {
          width: "100%" ,
          height: "2.5rem" ,
          margin: "0 auto 0"  ,
         
        } ,
        "& .ticker-tape-scroll" :  {
          overflow: "hidden" ,
          whiteSpace: "nowrap"
        } ,
       "& .ticker-tape-collection"  : {
          display: "tale-cell" ,
          position: "relative" ,
          left : props => `-${350 * props.tokenLiquidityList.length}px`,
          animation: `$ticker-tape-scrolling linear infinite running` ,
          animationDuration :  props => `${props.tokenLiquidityList.length * 7}s` ,
        } , 
        "& .ticker-tape-collection:hover" : {
          animationPlayState: "paused" , 
        } ,
       "& .ticker-tape-story" : {
          display: "inline-block" ,
          textAlign : "center" ,
          verticalAlign: "top" ,
          lineHeight: "2.5rem" ,
          borderRight : "1px solid lightgray" ,
          borderLeft : "1px solid lightgray" ,
          paddingLeft : "15px" ,
          paddingRight : "15px" ,
          // minWidth : "320px" ,
          width : "350px",
          "& :after" : {
            overflow: "hidden",
            textIndent: "-9999rem",
            fontSize: "0",
            lineHeight: "0",
            content: "line after",
            display: "inline-block" ,
            height: "1.875rem" ,
            marginBottom: "0.1875rem" ,
            borderRight: "1px solid black" ,
            verticalAlign: "middle",
          },
        } ,
        "& .ticker-tape-link" : {
          display: 'inline-block' ,
          padding: '0 1.25rem' ,
          color: "black"
        } ,
        "& a" : {
          textDecoration: "none" ,
          outline: 0
        },
    },
    tickerShortName : {
      fontSize : "15px" ,
      fontWeight: 700 ,
      color : "#131722",
      fontFamily: "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif"
    },
    tickerLast : {
      fontSize : "15px" ,
      fontFamily: "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif" ,
      color : "#131722"
    } ,
    tickerPtChange : {
      fontSize : "15px" ,
      fontFamily: "Inter,-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif" ,
    },
    "@keyframes ticker-tape-scrolling" : {
        "0%" : {
          left: "0%"
        } ,
    },
    loading : {
      display:"flex !important" , 
      justifyContent:"center !important" , 
      alignItems:"center !important" , 
      height: "100%"
    }
});

const CalaDexTradingTickerTape = (props) => {
    
  const { 
    GetTokenLiquidityList , tokenLiquidityList
  } = props ;

  let tokenTapeInfoTimer = null;

  const classes = useStyles(props) ;

  const setTimerForTokenTapeInfoList =  async () => {
      tokenTapeInfoTimer = setInterval(async () => {
          await GetTokenLiquidityList("approved") ;
          return ;
      } , 15000 )
  }

    useEffect(() => {
        return () => {
            clearInterval(tokenTapeInfoTimer) ;
        }
    } , [])

    useEffect(async () => {
      await GetTokenLiquidityList("approved") ;
      setTimerForTokenTapeInfoList("") ;
    } , []) ;

    return (
      <>
        <section className={classes.root}>
            <div className="ticker-tape">
                <div className="ticker-tape-scroll">
                    <div className="ticker-tape-collection" >
                      {
                        tokenLiquidityList.length !== 0 ? tokenLiquidityList.map((element , index) => {
                          return(
                            <div className='ticker-tape-story' key={index} sx={{width:"33% !important"}}>
                              <a className="ticker-tap-link">
                                  <img src={`${PRIVATE_CALADEX_API}files/${element.logo_url}`} width={30} height={25} /> 
                                  &nbsp;&nbsp;
                                  <span className={classes.tickerShortName}>{element.symbol} / {element.pair_type}</span>
                                  &nbsp; <span className={classes.tickerLast} sx={{color : Number(element.total24hr) <= 0.0 ? "#f7525f" : "#22ab94"}}>{Number(element.total24hr) < 0.0 ? "-" : "+"}{Number(element.total24hr).toFixed(4)}</span>
                                  &nbsp;&nbsp;<span className={classes.tickerPtChange} sx={{color : Number(element.percentChange) <= 0.0 ? "#f7525f" : "#22ab94"}}>( {Number(element.percentChange).toFixed(2)} %)</span>
                                {/* </span> */}
                              </a>
                            </div>
                          )
                        }):<Box component={"div"} className={classes.loading} >
                          <CircularProgress size={30}/>
                        </Box>
                      }
                      {
                        tokenLiquidityList.length !== 0 ? tokenLiquidityList.map((element , index) => {
                          return(
                            <div className='ticker-tape-story' key={index} sx={{width:"33% !important"}}>
                              <a href="ticker-tap-link">
                                {/* <span className={classes.tickerItem}> */}
                                  <img src={`${PRIVATE_CALADEX_API}files/${element.logo_url}`} width={30} height={25} /> 
                                  &nbsp;&nbsp;
                                  <span className={classes.tickerShortName}>{element.symbol} / {element.pair_type}</span>
                                  &nbsp; <span className={classes.tickerLast} sx={{color : Number(element.total24hr) <= 0.0 ? "#f7525f" : "#22ab94"}}>{Number(element.total24hr) < 0.0 ? "-" : "+"}{Number(element.total24hr).toFixed(4)}</span>
                                  {/* &nbsp;&nbsp;{element.baseVolume} */}
                                  &nbsp;&nbsp;<span className={classes.tickerPtChange} sx={{color : Number(element.percentChange) <= 0.0 ? "#f7525f" : "#22ab94"}}>( {Number(element.percentChange).toFixed(2)} %)</span>
                                {/* </span> */}
                              </a>
                            </div>
                          )
                        }):<></>
                      }
                    </div>
                </div>
            </div>
        </section>
      </>
        
    )
}


CalaDexTradingTickerTape.propsType = {
  tokenLiquidityList : PropTypes.array.isRequired 
}

const mapStateToProps = (state) => ({
  tokenLiquidityList : state.token.tokenLiquidityList
})

const mapDispatchToProps = {
  GetTokenLiquidityList
}

export default connect(mapStateToProps , mapDispatchToProps)(CalaDexTradingTickerTape) ;