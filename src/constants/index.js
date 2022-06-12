import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337, 31337] });

export const CALADEX_ADDR = "0x695690C290cCaEa84d3101039bd80698B249Ecc1" ;
// export const CALADEX_ADDR = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" ;

export const DAI_ADDR = "0xad6d458402f60fd3bd25163575031acdce07538d" ;

export const BLOCK_CONFIRMATION_THRESHOLD = 1;