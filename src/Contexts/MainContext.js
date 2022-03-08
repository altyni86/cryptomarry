import React, { useContext, useReducer, useState } from "react";
import { contractContext } from "./Contract";

export const mainContext = React.createContext();

const INIT_STATE = {
  currentAccount: "",
  familyStats: "",
  chainID: "",
  wrongnetwork: false,
  characterNFT: null,
  userBeenProposed: null,
  Provider: null,
  balanceETH: "",
  mintedNFT: null, 
  Signer: null
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_ACCOUNT":
      return { ...state, currentAccount: action.payload };
    case "SET_CHAIN_ID":
      return { ...state, chainID: action.payload };
    case "SET_WRONG_NETWORK":
      return { ...state, wrongnetwork: action.payload };
    case "SET_CHARACTER_NFT":
      return { ...state, characterNFT: action.payload };
    case "SET_USER_BEEN_PROPOSED":
      return { ...state, userBeenProposed: action.payload };
    case "SET_PROVIDER":
      return { ...state, Provider: action.payload };
    case "SET_FAMILY_STATS":
      return { ...state, familyStats: action.payload };
    case "SET_BALANCE_ETH":
      return { ...state, balanceETH: action.payload };
    case "SET_MINTED_NFT":
      return { ...state, mintedNFT: action.payload };
    case "SET_SIGNER":
      return { ...state, Signer: action.payload };
  }
};

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { ethereum } = window;
  const { OpenContract, setContractAddress } = useContext(contractContext);
  // const [characterNFT, setCharacterNFT] = useState(null)

  async function ethRequestCurrentAccount(method) {
    const accounts = await ethereum.request({ method: method });
    
    if (accounts.length !== 0) {
      dispatch({
        type: "SET_CURRENT_ACCOUNT",
        payload: accounts[0],
      });
    }
    
    if (accounts[0]) {
      console.log("Found an authorized account:", accounts[0]);
      
      // let chainId = await ethereum.request({ method: 'eth_chainId' });
      const chainId = await ethRequestChainId("eth_chainId");
      
      console.log("Connected to chain " + chainId);
      
      const supportedNetworks = ["0x1", "0x4", "0x7a69", "0x89"];
      
      if (!supportedNetworks.includes(chainId)) {
        
        //   setwrongnetwork(true);
        dispatch({
          type: "SET_WRONG_NETWORK",
          payload: true,
        });
        
        alert(
          "Please connect to a supported network in the dropdown menu or in your wallet."
          );
          setContractAddress("");
        } else {
        setchainID(chainId);
        OpenContract(chainId);
        dispatch({
          type: "SET_WRONG_NETWORK",
          payload: false,
        });
      }
    } else {
      console.log("No authorized account found");
    }
  }

  async function ethRequestChainId(method) {
    const chainId = await ethereum.request({ method: method });
    dispatch({
      type: "SET_CHAIN_ID",
      payload: chainId,
    });
    return chainId;
  }

  function setchainID(arg){
    dispatch({
      type: 'SET_CHAIN_ID',
      payload: arg
    })
  }

  function setMintedNFT(arg){
    dispatch({
      type: 'SET_MINTED_NFT',
      payload: arg
    })
  }

  function setCharacterNFT(arg) {
    dispatch({
      type: "SET_CHARACTER_NFT",
      payload: arg,
    });
  }
  console.log(setCharacterNFT)

  function setuserBeenProposed(arg) {
    dispatch({
      type: "SET_USER_BEEN_PROPOSED",
      payload: arg,
    });
  }

  function setProvider(arg) {
    dispatch({
      type: "SET_PROVIDER",
      payload: arg,
    });
  }

  function setfamilyStats(arg) {
    dispatch({
      type: "SET_FAMILY_STATS",
      payload: arg,
    });
  }

  function setbalanceETH(arg) {
    dispatch({
      type: 'SET_BALANCE_ETH',
      payload: arg
    });
  };

  function setSigner(arg) {
    dispatch({
      type: 'SET_SIGNER',
      payload: arg
    });
  };

  console.log(state, " state");
  const values = {
    currentAccount: state.currentAccount,
    familyStats: state.familyStats,
    chainID: state.chainID,
    characterNFT: state.characterNFT,
    userBeenProposed: state.userBeenProposed,
    Provider: state.Provider,
    wrongnetwork: state.wrongnetwork,
    balanceETH: state.balanceETH,
    mintedNFT: state.mintedNFT,
    Signer: state.Signer,
    setSigner,
    setMintedNFT,
    setbalanceETH,
    ethRequestCurrentAccount,
    ethRequestChainId,
    setCharacterNFT,
    setuserBeenProposed,
    setProvider,
    setfamilyStats,
    setchainID
  };
  return <mainContext.Provider value={values}>{children}</mainContext.Provider>;
};

export default MainContextProvider;
