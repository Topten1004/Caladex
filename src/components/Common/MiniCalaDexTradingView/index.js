

import React, { useEffect, useState } from 'react' ;

import PropTypes from 'prop-types' ;

import ReactApexChart from 'react-apexcharts' ;

import { GetTokenTradeHistory } from '../../../redux/actions/trade' ;

import { makeStyles } from '@mui/styles';

import {
    Box ,
    Grid,
    CircularProgress
} from '@mui/material' ;
import { connect } from 'react-redux';
import { PRIVATE_CALADEX_API } from '../../../static/constants';
// const ApexCharts = window.ApexCharts;

const useStyles = makeStyles((theme) => ({
    root : {
        marginBottom : "20px" ,
        "& .MuiButtonBase-root" : {
            fontSize : "12px"
        },
        borderRadius : "5px" ,
        border : "1px solid lightgray" ,
        "& .apexcharts-toolbar" : {
            visibility : "hidden" ,
            height : "0px !important"
        } 
    },
    selectPanel : {
        backgroundColor : "lightgray"
    },
    infoPanel : {
        paddingTop : "20px",
        paddingLeft : "30px"
    },
    symbol : {
        fontSize : "14px !important" ,
        fontWeight  :"bold"
    } , 
    pairTokenName :{
        fontSize : "12px" ,
        color : "gray"
    } ,
    currentPrice : {
        fontSize : "28px" ,
        fontWeight : "bold"
    } ,
    currentData : {
        display : "flex" ,
        alignItems : "center" ,
    } ,
    currentInfo : {
        display : "flex" ,
        alignItems :"center" ,
        justifyContent : "flex-start" ,
        fontSize : "18px" ,
        color : "#22ab94" ,
        fontWeight : "bold"
    } ,
    emptyTradingView : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" 
    },
    tokenInfo : {
        display : "flex" ,
        alignItems : "center"
    }
}));
const MiniCalaDexTradingView = (props) => {

    const {symbol , pairType , logoUrl ,tokenName , pairTokenName , token_id ,currentPrice , percentChange , total , width , height } = props ;

    const options = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            zoom: {
               enabled :false
            },
            selection :{
                enabled : false
            } ,
            events : {
                selection : true
            }
        },
        stroke: {
            show: true,
            curve: 'straight',
            width: 1,
        },
        grid : {
            show:false,
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            // min: new Date('2022-01-16').getTime(),
            // max : new Date('2022-01-24').getTime(),
            // tickAmount: 6,
            tooltip : {
                enabled : true ,
            },
            axisTicks: {
                show: false,
            },
            tickPlacement: 'off'
        },
        yaxis : {
            opposite : true ,
            show : false ,
            tooltip : {
                enabled : true
            } ,
            // logarithmic: false,
            // logBase: 10,
        },
        tooltip : {
            enabled : true,
           
            style: {
                fontSize: '12px',
            },
            x: {
                show: true,
                format: 'dd MMM y',
            },
            y: {
                show : true ,
                title: {
                    formatter: (seriesName) => "price: "
                },
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    } ;

    useEffect(() => {
        
      }, []);

    const [series , setSeries] = useState([{data:[]}]) ;

    const [thisTokenTradeInfo , setThisTokenTradeInfo] = useState([]) ;

    const classes = useStyles() ;
    const [selection , setSelection] = useState('one_year' );

  
    useEffect(async () => {

        await setThisTokenTradeInfo( await GetTokenTradeHistory( token_id , pairType) ) ;
        // let series = [{
        //     data  : [

        //     ]
        // }]
    } , [token_id , pairType]);
      
    useEffect(async () => {
        if(thisTokenTradeInfo.length === 0) {
            // await setSeries("No Available Information.") ;
            await setSeries([{
                data : [
                    [new Date(Date.now()-24*60*60*1000).getTime() , 0],
                    [new Date(Date.now()).getTime() , 0] 
                ]
            }]);
        } else {
            // console.log(thisTokenTradeInfo) ;

            let data = [] ;

            for(let element of thisTokenTradeInfo) {
                await data.push(
                    [new Date(element.time).getTime() , Number(element.price)]
                )
            }

            let series = [{
                data : data
            }] ;

            await setSeries(series) ;
        }
    } , [thisTokenTradeInfo]);
      
    // useEffect(() => {
    //     switch (selection) {
    //         case 'one_month':
    //           ApexCharts.exec(
    //             'area-datetime',
    //             'zoomX',
    //             new Date('28 Jan 2013').getTime(),
    //             new Date('27 Feb 2013').getTime()
    //           )
    //           break
    //         case 'six_months':
    //           ApexCharts.exec(
    //             'area-datetime',
    //             'zoomX',
    //             new Date('27 Sep 2012').getTime(),
    //             new Date('27 Feb 2013').getTime()
    //           )
    //           break
    //         case 'one_year':
    //           ApexCharts.exec(
    //             'area-datetime',
    //             'zoomX',
    //             new Date('27 Feb 2012').getTime(),
    //             new Date('27 Feb 2013').getTime()
    //           )
    //           break
    //         case 'ytd':
    //           ApexCharts.exec(
    //             'area-datetime',
    //             'zoomX',
    //             new Date('01 Jan 2013').getTime(),
    //             new Date('27 Feb 2013').getTime()
    //           )
    //           break
    //         case 'all':
    //           ApexCharts.exec(
    //             'area-datetime',
    //             'zoomX',
    //             new Date('23 Jan 2012').getTime(),
    //             new Date('27 Feb 2013').getTime()
    //           )
    //           break
    //         default:
    //       }
    // } , [selection]) ;
      
    return (
        <div className={classes.root} >
            <Box component={"div"} className={classes.infoPanel} >
                <Box component={"div"} className={classes.tokenInfo}>
                    <Box component={"div"}>
                        <img src={`${PRIVATE_CALADEX_API}files/${logoUrl}`} width={30} height={25}/>
                    </Box>
                    &nbsp;&nbsp;
                    <Box component={"div"} >
                        <Box component={"div"} className={classes.symbol}>
                            {symbol}{pairType}
                        </Box>
                        <Box component={"div"} className={classes.pairTokenName}>
                        {tokenName} / {pairTokenName}
                        </Box>
                    </Box>
                </Box>
                <Box component={"div"}>
                    <Grid container className={classes.tradeData}>
                        <Grid item xs={6} className={classes.currentPrice}>
                            <Box component={"div"} >
                                {series[0].data.length === 0 ? "0" : currentPrice}
                            </Box>
                        </Grid>
                        <Grid item xs={6} className={classes.currentInfo}>
                            <Box component={"div"} >
                                {percentChange} % ({total})
                            </Box>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Box>
            <Box component={"div"} >
                {
                    series === "No Available Information." ? <Box component={"div"} className={classes.emptyTradingView} width={width} height={height}>
                        No Available Trade History.
                    </Box> :
                    (   series[0].data.length === 0 ? <Box component={"div"} className={classes.emptyTradingView}>
                            <CircularProgress />
                        </Box> :
                        <ReactApexChart options={options} series={series} type="area" width={width} height={height} />
                    )
                }
            </Box>
        </div>
    )
}

MiniCalaDexTradingView.propsType = {
    tradeInfo : PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    tradeInfo : state.trade.tradeInfo
}) ;
const mapDispatchToProps = {
 
}

export default connect(mapStateToProps , mapDispatchToProps)(MiniCalaDexTradingView) ;