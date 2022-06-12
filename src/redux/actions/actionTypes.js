
const ActionTypes = {
    SignUpUser : "SignUpUser" ,

    SetWalletAddress : "SetWalletAddress" ,
    GetWalletBalance : "GetWalletBalance" ,

    // Landing Page's TokenTable
    GetTokenLiquidityList : "GetTokenLiquidityList" ,
    GetTradeHistory : "GetTradeHistory" ,


    // Balances Page 's WalletMangement
    GetExchageRateToUSD : "GetExchageRateToUSD",
    GetTokenBalanceInfo : "GetTokenBalanceInfo" ,
    SetTokenBalance : "SetTokenBalance" ,
    UpdateDepositStatus : "UpdateDepositStatus" ,
    UpdateWithdrawStatus : "UpdateWithdrawStatus" ,


    //Token Listing Page
    AddTokenSuccess : "AddTokenSuccess" ,
    AddTokenError : "AddTokenError" ,
    ConfirmAddToken : "ConfirmAddToken" ,



    //Token Info Base page
    GetTokenInfoList : "GetTokenInfoList" ,


    //Earn Staking Page
    GetTokenStakeInfoList : "GetTokenStakeInfoList" ,


    // Exchange Page 
    GetTokenOrderSellList : "GetTokenOrderSellList" ,
    GetTokenOrderBuyList : "GetTokenOrderBuyList" ,
    GetTokenTradeList : "GetTokenTradeList" ,
    GetExchangeOrderList : "GetExchangeOrderList" ,

    OrderLimit : "OrderLimit" ,
    OrderMarket : "OrderMarket" ,
    OrderError : "OrderError" ,

    // Orders Page
    GetOrderHistory : "GetOrderHistory" ,
    GetOrderTradeHistory : "GetOrderTradeHistory" ,

}

export default ActionTypes ;