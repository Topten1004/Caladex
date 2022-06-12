import React, { memo } from "react";
// import PropTypes from "prop-types";

import { Routes , Route } from "react-router-dom";

import ProtectedRoute from "../utils/ProtectedRoute";

// Pages
import Landing from "../pages/Landing" ;
import Exchange from "../pages/Exchange" ;
import TokenInfoBase from '../pages/TokenInfoBase' ;
import EarnStaking from '../pages/EarnStaking' ;
import Balances from "../pages/Balances";
import Orders from '../pages/Orders' ;

const Routing = () => {
    // const { selectLanding } = props;

    return (
        <Routes>
            <Route path="/" element={< Landing/>} />
            <Route element={<ProtectedRoute />}>
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/token-info-base" element={<TokenInfoBase/>} />
                <Route path="/earn-staking" element={<EarnStaking/>} />
                <Route path="/balances" element={<Balances/>} />
                <Route path="/orders" element={<Orders />} />
            </Route>
        </Routes>
    );
}

Routing.propTypes = {
    // selectLanding: PropTypes.func.isRequired,
};

export default memo(Routing);
