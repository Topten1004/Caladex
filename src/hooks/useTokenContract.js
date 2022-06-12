

import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";

import TOKEN_ABI from '../constants/abis/token.json';

export const useTokenContract = (TOKEN_ADDR , SYMBOL) => {

    const { library, active } = useWeb3React();

    return useMemo(() => {
        if (!active || SYMBOL === "ETH") {
            return null;
        }
        
        return new ethers.Contract(TOKEN_ADDR, TOKEN_ABI, library.getSigner());
    })
}