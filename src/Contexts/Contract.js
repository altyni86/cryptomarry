import React, {useReducer} from 'react';

export const contractContext = React.createContext();

const INIT_STATE = {
    currency: '',
    ContractAddress: '',
    gameContract: null,
    nftContractAddress: ''
}

const reducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case 'SET_CURRENCY':
            return { ...state, currency: action.payload.currency, ContractAddress: action.payload.ContractAddress };
        case 'SET_CONTRACT_ADDRESS':
            return { ...state, ContractAddress: action.payload.ContractAddress }
        case 'SET_GAME_CONTRACT':
            return { ...state, gameContract: action.payload}
    }
};

const ContractContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    const OpenContract = async (chainId) => {
        if (chainId === "0x7a69") {
          dispatch({
              type: 'SET_CURRENCY',
              payload: {
                ContractAddress: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
                currency: 'lETH'
              }
          })
          setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
        }else if (chainId === "0x89") {
          
          dispatch({
            type: 'SET_CURRENCY',
            payload: {
                ContractAddress: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
                currency: 'MATIC'
            }
          })
          setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
        } else if (chainId === "0x1") {
          
          dispatch({
            type: 'SET_CURRENCY',
            payload: {
                ContractAddress: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
                currency: 'ETH'
            }
        })
        setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
        } else if (chainId === "0x4") {
          
          dispatch({
            type: 'SET_CURRENCY',
            payload: {
                ContractAddress: '0x7b8554aCeE6aE7D39d936CB8617d68E316a502A9',
                currency: 'rETH'
            }
        })
        setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
      } 
      }

      function setnftContractAddress(arg){
        dispatch({
            type: 'SET_NFT_CONTRACT_ADDRESS',
            payload: arg
        })
      }

      function setContractAddress(address) {
        dispatch({
            type: 'SET_CONTRACT_ADDRESS',
            payload: address
        })
      }

      function setGameContract(gamecontr) {
        dispatch({
            type: 'SET_GAME_CONTRACT',
            payload: gamecontr
        })
      }

    const values = {
        OpenContract,
        setContractAddress,
        ContractAddress: state.ContractAddress,
        gameContract: state.gameContract,
        setGameContract,
        currency: state.currency,
        nftContractAddress: state.nftContractAddress
    }
    console.log(state, ' contract context')
    return (
        <contractContext.Provider value={values} >
            {children}
        </contractContext.Provider>
    );
};

export default ContractContextProvider;