
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";

import CALADEX_ABI from '../constants/abis/caladex.json';
import { CALADEX_ADDR } from '../constants' ;

export const useCaladexContract = () => {
    const { library, active } = useWeb3React();

    return useMemo(() => {
        if (!active) {
            return null;
        }

        return new ethers.Contract(CALADEX_ADDR, CALADEX_ABI, library.getSigner());
    })
}