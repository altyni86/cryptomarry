import React, { useEffect, useState } from 'react';


import { ColorModeSwitcher } from './ColorModeSwitcher';
//import { Logo } from './Logo';
import { ethers } from 'ethers';
import { transformCharacterData } from './constants';
import myEpicGame from './utils/marriages.json';

import { 
  FcAbout,
} from 'react-icons/fc';



//Components
import Identicon from "./components/identicon";
import Blur from "./components/Blur";
import SelectCharacter from "./components/SelectCharacter";
import Arena from './components/Arena';
import { Logo } from './components/Logo';
import Execute from './components/Execute';
import NFTPricing from './components/NFTMenu';

import WrongNetwork from './components/WrongNetwork';


import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Grid,
  theme,
  GridItem,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  //MenuItemOption,
  MenuGroup,
  //MenuOptionGroup,
  //MenuDivider,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  
  createStandaloneToast,
  VisuallyHidden,
  Spinner,
 
  Image,
  IconProps,
  Icon,
  Tooltip,
  Heading,
  Center,

  IconButton,
  
  Stack,
  Collapse,
  
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,

  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  FormControl,
    FormLabel,
    FormErrorMessage,
    Input,

  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel 

  
} from '@chakra-ui/react';

import { Formik, Form, Field} from 'formik';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'

import { FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';



function App() {
// State
const [currentAccount, setCurrentAccount] = useState(null);
const [characterNFT, setCharacterNFT] = useState(null);
const [gameContract, setGameContract] = useState(null);
const [userBeenProposed, setuserBeenProposed] = useState(null);
const [balanceETH, setbalanceETH] = useState("");
const [familyStats,setfamilyStats] = useState("")
const [familyBudget,setfamilyBudget] = useState("")
const [Provider,setProvider] =useState(null);

const [Signer,setSigner] =useState(null);
const [value, setvalue] = useState("");

const [marriedto, setmarriedto] = useState("");
const [imageNFT,setimageNFT] = useState([]);
const [tokenURI,settokenURI] = useState();

const [wrongnetwork,setwrongnetwork] = useState(false);
const [ContractAddress, setContractAddress] = useState("")
const [nftContractAddress, setnftContractAddress] = useState("")
const [mintedNFT, setMintedNFT] = useState()

const [lovBalance, setlovBalance] = useState();
const [lovBalancetimer, setlovBalancetimer] = useState();
const [saleCap, setsaleCap] = useState();
const [policyDays, setpolicyDays] = useState(0);


//for voting 
const [voteMessage, setvoteMessage] = useState("");
const [voteType,setvoteType] = useState(0);
const [voteEnds, setvoteEnds] = useState();
const [voteNumTokens, setvoteNumTokens] = useState();
const [voteReceiver, setvoteReceiver] = useState(0x0000000000000000000000000000000000000000);
const [voteAmount, setvvoteAmount] = useState(0)



const [chainID, setchainID] = useState('')

const [currency, setcurrency] = useState('')
//const [networkParams, setnetworkParams] = useState ([])

const [isLoading, setIsLoading] = useState(false);

//const { isOpen: isMobileNavOpen, onToggle: onToggle2  } = useDisclosure();
const { isOpenother, onToggle } = useDisclosure();


const [txarray,settxarray] = useState([]);

const toast = createStandaloneToast()

const format = (val) => `Ξ` + val;
// eslint-disable-next-line 
const parse = (val) => val.replace(/^\Ξ/, '')

const { isOpen, onOpen, onClose } = useDisclosure()

const supportedNetworks = ["0x1","0x4","0x7a69","0x89"]


const finalRef = React.useRef()



const { 
  isOpen: isOpen2, 
  onOpen: onOpen2, 
  onClose: onClose2 
} = useDisclosure()


const { 
  isOpen: isOpen3, 
  onOpen: onOpen3, 
  onClose: onClose3 
} = useDisclosure()


const { 
  isOpen: isOpen4, 
  onOpen: onOpen4, 
  onClose: onClose4 
} = useDisclosure()


const { 
  isOpen: isOpen6, 
  onOpen: onOpen6, 
  onClose: onClose6 
} = useDisclosure()
 
const { 
  isOpen: isOpen7, 
  onOpen: onOpen7, 
  onClose: onClose7 
} = useDisclosure()
 
const { 
  isOpen: isOpen8, 
  onOpen: onOpen8, 
  onClose: onClose8 
} = useDisclosure()


const data = React.useMemo(
  () => txarray,
  [txarray],
)


const columns = React.useMemo(
  () => [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Date/Time',
      accessor: 'time',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      isNumeric: true,
    },
  ],
  // eslint-disable-next-line 
  [txarray],
)

const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)


    // World of connections to wallets
const checkIfWalletIsConnected = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask!');
      return;
    } else {
      setIsLoading(true);
      console.log('We have the ethereum object', ethereum);

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setCurrentAccount(account);

        let chainId = await ethereum.request({ method: 'eth_chainId' });
        
        console.log("Connected to chain " + chainId);
        
        if (!supportedNetworks.includes(chainId)) {
          setwrongnetwork(true);
          alert("Please connect to a supported network in the dropdown menu or in your wallet.");
          setContractAddress('')

        } else {
          setchainID(chainId);
          OpenContract(chainId);
          setwrongnetwork(false);
        }
        setIsLoading(false);
      } else {
        console.log('No authorized account found');
      }
    }
  } catch (error) {
    console.log(error);
    toast({
      title: `${error.message}`,
      description: 'Transaction has not been completed',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }
};

//Important update Contract Addresses here for each network
const OpenContract = async (chainId) => {
  if (chainId === "0x7a69") {
    setContractAddress('0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0')
    setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
    setcurrency('lETH')
    
  }else if (chainId === "0x89") {
    setContractAddress('0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0')
    setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
    setcurrency('MATIC')
  } else if (chainId === "0x1") {
    setContractAddress('0x0B72B8c9cd6e92156E70Dd0B3dE7C4bc1D991BF8')
    setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
    setcurrency('ETH')

  } else if (chainId === "0x4") {
    setContractAddress('0x97d56097252a67eD71a0F458AC5B8931658A9efD')
    setnftContractAddress('0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320')
    setcurrency('rETH')
} 
}



const setchainParams = (hexChainID) => {

console.log("In function", hexChainID )

try {
  if (hexChainID === "0x7a69") {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: "0x7a69",
          rpcUrls: ["https://127.0.0.1:8545"],
          chainName: "LocalHost",
          nativeCurrency: {
              name: "CryptoMarry",
              symbol: "CMY",
              decimals: 18
          },
          blockExplorerUrls: ["https://polygonscan.com/"]
      }]
  });

  }else if (hexChainID === "0x89") {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
          chainId: "0x89"
          }],
  });
  } else if (hexChainID === "0x1") {
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
          chainId: "0x1"
          }],
  });

  } else if (hexChainID === "0x4") {
 
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
          chainId: "0x4"
          }],
  });    
}} catch (error) {
  alert("Connect to a Metamask first")
}

}





const connectWalletAction = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert('Get MetaMask!');
      return;
    }
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    console.log('Connected', accounts[0]);
    
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("2Connected to chain " + chainId);
    
    setCurrentAccount(accounts[0]);
    window.location.reload()
    
    
   /*
    const hexChainID = "0x"+chainID.toString(16);
   
    console.log("2Selected HEX chain " + hexChainID); 

    if (chainId !== hexChainID) {
     await setwrongnetwork(true);
     console.log("Is Wrong network" + wrongnetwork); 
     alert("You are NOT connected to the Selected Network");
    } else if (chainId === hexChainID) {
      OpenContract(chainId) 
    }
    */

  } catch (error) {
    console.log(error);
    toast({
      title: `${error.message}`,
      description: 'Transaction has not been completed',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }
};

useEffect(() => {
  setchainParams(chainID);

}, [chainID]);


useEffect(() => {
  try {
  const { ethereum } = window;
  ethereum.on('chainChanged', (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    window.location.reload();});
  } catch (error) {
      console.log(error);
    }
  
  checkIfWalletIsConnected();
// eslint-disable-next-line
}, []);

// UseEffects
useEffect(() => {
  const { ethereum } = window;

  if (ethereum && ContractAddress !=='' ) {
    console.log("Your Contract address is: ", ContractAddress)
    const provider = new ethers.providers.Web3Provider(ethereum);
    
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      ContractAddress,
      myEpicGame.abi,
      signer
    );

    /*
     * This is the big difference. Set our gameContract in state.
     */
    setGameContract(gameContract);
    setSigner(signer);
    setProvider(provider);
    console.log("Connected to the smart contract.")

    
  } else {
    console.log('Contract object not found');
  }
  // eslint-disable-next-line
}, [ContractAddress])


//Need to improve this 
const checkNFT= async (waver,proposed) => {
  
  console.log('Checking NFT for', currentAccount);

  try {
  const txn = await gameContract.nftminted(waver,proposed);
  console.log("NFT Status ", txn)
  setMintedNFT (txn)

} catch (error) {
  console.log(error)
  toast({
    title: `${error.message}`,
    description: 'Transaction has not been completed',
    status: 'warning',
    duration: 9000,
    isClosable: true,
  })
}

}




 /*
 * Add this useEffect right under the other useEffect where you are calling checkIfWalletIsConnected
 */
 useEffect(() => {
  /*
   * The function we will call that interacts with out smart contract
   */

  const fetchNFTMetadata = async () => {
    console.log('Checking for Character NFT on address:', currentAccount);

    try {
    const txn = await gameContract.checkIfUserHasProposed();
    console.log("Proposal Status ",txn.ProposalStatus, txn)
    
    if (txn.ProposalStatus!==0) {
      console.log('User has Proposed');
      setCharacterNFT(transformCharacterData(txn));
      setfamilyStats(transformCharacterData(txn));
  
      console.log("Family Status is: ",familyStats);
    } else {
      console.log('User has not proposed');
    }
  } catch (error) {
    console.log(error)
    toast({
      title: `${error.message}`,
      description: 'Transaction has not been completed',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }
  }

  const fetchProposedtodata = async () => {
    console.log('Checking whether address was proposed', currentAccount);
    try {
    const txn2 = await gameContract.checkIfUserHasBeenProposed();
    console.log(txn2)
  
    if (txn2.ProposalStatus!==0) {
      console.log('User has been Proposed to');
      setuserBeenProposed(transformCharacterData(txn2))
      setfamilyStats(transformCharacterData(txn2));
    
      console.log("Family Status is: ", familyStats);
    } else {
      console.log('User has not been proposed to');
    }
  } catch (error) {
    console.log(error)
    toast({
      title: `${error.message}`,
      description: 'Transaction has not been completed',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    })
  }
  }

  


  if (currentAccount && gameContract) {
    console.log('CurrentAccount:', currentAccount);
    fetchNFTMetadata();
    fetchProposedtodata(); 
    EthBalance();
    fetchLovBalance();
    
  }

  // eslint-disable-next-line 
}, [gameContract, setfamilyStats, currentAccount]);


const fetchLovBalance = async () => {
  console.log('Checking LOV Balance of the:', currentAccount);
  try {
  const txn2 = await gameContract.balanceOf(currentAccount);
  console.log("LOV Balance is:", txn2.toNumber());
  setlovBalance(txn2.toNumber());
  const txn = await gameContract.claimtimer(currentAccount)
  setlovBalancetimer(txn.toNumber())
  console.log("LOV token Timer is", txn)
  const txn3 = await gameContract.saleCap()
  setsaleCap(txn3.toNumber());
  const txn4 = await gameContract.policyDays();
  console.log("POLICY DAYS", txn4.toNumber())
  setpolicyDays(txn4.toNumber());

} catch (error) {
  console.log(error)
  toast({
    title: `${error.message}`,
    description: 'Transaction has not been completed',
    status: 'warning',
    duration: 9000,
    isClosable: true,
  })
}
}


useEffect(() => {
  

  const onNewWave = async (id, waver, proposed, sender, message, time,vid) => {
    console.log("Incoming message with:",id, waver,proposed, sender,message,time,vid);
  
    if (gameContract && sender.toUpperCase() === currentAccount.toUpperCase()) {
      let txn;
  if (currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()) {txn = await gameContract.checkIfUserHasBeenProposed();} 
  else if (currentAccount.toUpperCase() === familyStats.waver.toUpperCase()) {txn = await gameContract.checkIfUserHasProposed();}
  
      if (txn.ProposalStatus!==0){
        console.log('Status has been updated');
        setfamilyStats(transformCharacterData(txn));
        toast({
          title: 'Family Status has been updated',
          description: "Your request has been sent",
          status: 'info',
          duration: 9000,
          isClosable: true,
        })
      
      } 
        else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
        window.location.reload(false);}
    } else {
      console.log('Other users event.');}
    }


const onsendingStake = async (sender,time, value) => { 
console.log("Incoming message with:", sender,time, value);

if (gameContract && sender.toUpperCase() === currentAccount.toUpperCase()) {
  let txn;
  console.log(familyStats.proposed.toUpperCase())
  if (currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()) {txn = await gameContract.checkIfUserHasBeenProposed();} 
  else if (currentAccount.toUpperCase() === familyStats.waver.toUpperCase()) {txn = await gameContract.checkIfUserHasProposed();}
  
  if (txn.ProposalStatus!==0){
    console.log('Status has been updated');
    setfamilyStats(transformCharacterData(txn));
    toast({
      title: 'Status update',
      description: "Your deposit has been received",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    //Close Addstake Modal
    onClose();
    onClose6();
  
  } else if (txn.ProposalStatus===0) { 
    alert(`Your marriage has been annuled.`)
    window.location.reload(false);}
} else {
  console.log('Other users event.');}
};

  if (gameContract) {
    
    /*
     * Setup NFT Minted Listener
     */
    gameContract.on('NewWave', onNewWave);
    gameContract.on('AddStake', onsendingStake);
   
  }

  if (familyStats && familyStats.ProposalStatus!==0) {
    checkNFT(familyStats.waver,familyStats.proposed);
  }

  return () => {
    /*
     * When your component unmounts, let/s make sure to clean up this listener
     */
    if (gameContract) {
      gameContract.off('NewWave', onNewWave);
      gameContract.off('AddStake', onsendingStake);
    }
  };
// eslint-disable-next-line 
}, [familyStats,gameContract, currentAccount]);



useEffect(() => {

  FamilyEthBalance()
    // eslint-disable-next-line 
}, [currentAccount, familyStats]);

useEffect(() => {
if (familyStats && familyStats.ProposalStatus!==0){
  setmarriedtofunction()
}
  
    // eslint-disable-next-line 
}, [currentAccount,familyStats]);


const setmarriedtofunction = async () => {
  if (currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()) {setmarriedto(familyStats.waver)} 
  else if (currentAccount.toUpperCase() === familyStats.waver.toUpperCase()) {setmarriedto(familyStats.proposed)}
  console.log ("So Married to is.....:", marriedto )
}


//Balances update 

const EthBalance = async () => {
  Signer.getBalance("latest").then((balance) => {
    // convert a currency unit from wei to ether
    const balanceInEth = ethers.utils.formatEther(balance)
    setbalanceETH(balanceInEth);
    console.log(`balance: ${balanceInEth} ETH`)
   })
}

const FamilyEthBalance = async () => {
  const FamilybalanceInEth = Number(familyStats.FamilyBudget)/1000000000000000000;
  setfamilyBudget(FamilybalanceInEth);
}




const createProposal = async () => {
  setIsLoading(true);

  console.log(voteMessage,voteType+1,voteEnds,voteNumTokens,voteReceiver,voteAmount)

  try {
      const waveTxn = await gameContract.createProposal(voteMessage,voteType+1, voteEnds,voteNumTokens,voteReceiver,voteAmount);
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      fetchLovBalance();


    } catch (error) {
      console.log(error)
      toast({
        title: `${error.message}`,
        description: 'Transaction has not been completed',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    }
    setvoteMessage();
    setvoteType(0);
    setvoteEnds();
    setvoteNumTokens();
    setvoteReceiver(0x0000000000000000000000000000000000000000);
    setvvoteAmount(0);
    onClose2();
    setIsLoading(false);
};

function validateWalletAddress(values) {
   
  const errors = {};
  if (!values.votetext) {
    errors.votetext = 'Voting text is required'
  } else if (values.votetext.length>200) {
    errors.votetext = 'Text exceeds symbol limit'
  } else if (!values.voteEnds) {
    errors.voteEnds = '# of Days required'
  } else if (isNaN(values.voteEnds)) {
    errors.voteEnds = '# of Days must be a Number'
  }else if (!values.NumTokens) {
    errors.NumTokens = '# of Lov tokens is required'
  } else if (isNaN(values.NumTokens)) {
    errors.NumTokens = '# of Lov tokens must be a Integer'
  }else if (lovBalance<values.NumTokens) {
    errors.NumTokens = '# of Lov tokens must less than your balance indicated above'
  }
    else if (!values.name) {
      errors.name = 'Wallet Address is required'
    } else if (!ethers.utils.isAddress(values.name)) { 
     errors.name = "Wallet Address is not valid"       
    } else if (!values.gift) {
      errors.name = 'Amount is required'
    }
    else if (isNaN(values.gift)) {
      errors.gift = 'Amount must be a Number'
    } else if (values.gift>familyBudget) {
      errors.gift = 'Amount to be sent is higher than the Family budget'
    }else if (values.votetext.length> 0 && ethers.utils.isAddress(values.name) && !isNaN(values.voteEnds) &&  !isNaN(values.NumTokens)&&  !isNaN(values.gift) && values.gift<familyBudget && lovBalance>=values.NumTokens) {
      setvoteMessage(values.votetext);
      setvoteEnds(values.voteEnds * 86400);
      setvoteNumTokens(Number(values.NumTokens));
      setvoteReceiver(values.name);
      setvvoteAmount(Number(values.gift)*1000000000);
    } 
    return errors
  }


// Render Methods
const renderContent = () => {
  if (!currentAccount && wrongnetwork === false ) {
    return (
         
         <Button
         display={{ base: 'none', md: 'inline-flex' }}
         fontSize={'sm'}
         fontWeight={600}
         color={'white'}
         bg={'pink.400'}
         href={'#'}
         onClick={connectWalletAction}
         _hover={{
           bg: 'pink.300',
         }}>
         Connect Wallet
       </Button>
    );
  
} else if (wrongnetwork === true) {

  return (   
    <Button
    display={{ base: 'none', md: 'inline-flex' }}
    fontSize={'sm'}
    fontWeight={600}
    color={'white'}
    bg={'red.400'}
    href={'#'}
    _hover={{
      bg: 'pink.300',
    }}>
    Wrong Network
  </Button>
);

} 

else {
 return (
   
<HStack>
 {familyStats.ProposalStatus === 4 ? ( 
   <HStack>
 <Box
  display="flex"
  alignItems="center"
  bgGradient='linear(to-l, #7928CA, #FF0080)'
  borderRadius="md"
  py="2"
>

<Box px="4">
<HStack>
        <Text color="white" fontSize="md">
        Family
        </Text>
        <Text color="white" fontSize="md">Stake: 
        </Text>
        <Text color="white" fontSize="md">
        {parseFloat(familyBudget).toFixed(3)}
        </Text>
        <Text color="white" fontSize="md">
        {currency}
        </Text>

  </HStack>
      </Box>
</Box>
<Box
  display="flex"
  alignItems="center"
  bgGradient='linear(to-r, teal.500, green.500)'
  borderRadius="md"
  py="2"
>

<Box px="3">
         {texttransformer()}    
      </Box>
</Box>



</HStack>) :null}


{ balanceETH ? (<Box
  display="flex"
  alignItems="center"
  background="gray.600"
  borderRadius="md"
  py="2"
>

<Box px="5">
  <HStack>
        <Text color="white" fontSize="md">
        {parseFloat(balanceETH).toFixed(3)} 
        </Text>
        <Text color="white" fontSize="md">
      {currency}
        </Text>
  </HStack>
</Box>
</Box>):null}
<Box>
<Menu>
  {currentAccount ? ( <MenuButton 
  as={Button} 
  colorScheme='pink'
  px={4}
  py={2}
  transition='all 0.2s'
  borderRadius='md'
  borderWidth='1px'
  _hover={{ bg: 'gray.400' }}
  _focus={{ boxShadow: 'outline' }}
  rightIcon={<ChevronDownIcon />}
  >
  <HStack spacing={1}>
  <Text color="white" fontSize="md" fontWeight="medium" mr="2">    
            {currentAccount.slice(0, 4)}...{currentAccount.slice(
              currentAccount.length - 4,
              currentAccount.length
            )}
        </Text>
        <Identicon currentAccount={currentAccount} />
        </HStack>
  </MenuButton>): null}
  <MenuList>
    <MenuGroup title=''>
   
    {familyStats.ProposalStatus === 4 ? (
      <MenuItem onClick={onOpen}>Add Stake
      
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
                 

          <ModalHeader>
            <HStack>
              <Text>
            Enter {currency} value.
            </Text>

          <Tooltip label='This amount will be sent to the Family Budget.' fontSize='md' placement='right' shouldWrapChildren>
                      <FcAbout/>
            </Tooltip>
            </HStack>
          </ModalHeader>
          
                                    
          <ModalCloseButton />
          <ModalBody>
          {!isLoading ? (<Box >

          <NumberInput
                onChange={(valueString) => setvalue(parse(valueString))}
                value={format(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  
                /></Center>}

          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={addStake} >Add Stake</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
      </MenuItem>):null}

      {familyStats.ProposalStatus === 4 ? (
        
      <MenuItem onClick={onOpen6}>Buy Lov Token
      
      <Modal finalFocusRef={finalRef} isOpen={isOpen6} onClose={onClose6}>
      
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <HStack>
              <Text>
            Enter {currency} value.
            </Text>

          <Tooltip label='You will get 100 LOV Tokens for 1 ETH' fontSize='md' placement='right' shouldWrapChildren>
                      <FcAbout/>
            </Tooltip>
            </HStack>

          
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
          {!isLoading ? (<Box >
            
          <Text color = "blue"> Your current balance is: {lovBalance} LOV </Text>
          <Text color = "blue"> Available for purchase: {saleCap} LOV tokens </Text>
          <NumberInput
                onChange={(valueString) => setvalue(parse(valueString))}
                value={format(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text color = "green"> You will get LOV Tokens: {parseInt(value*100)} </Text>
              </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  
                /></Center>}
        
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='ghost' onClick={onClose6}>
              Close
            </Button>
            
            <Button colorScheme='blue' onClick={buyLovToken}> Buy LOV Token  
            
            </Button>
          </ModalFooter>
        </ModalContent>
        
      </Modal> 
      </MenuItem>
      ):null}
      
      {familyStats.ProposalStatus === 4 ? (
      <MenuItem onClick={onOpen7}>Claim LOV Token
      
      <Modal finalFocusRef={finalRef} isOpen={isOpen7} onClose={onClose7}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <HStack>
              <Text>
              Claim LOV token
            </Text>

          <Tooltip label='You can claim LOV Tokens periodically in the amount of 100*Family Budget.' fontSize='md' placement='right' shouldWrapChildren>
                      <FcAbout/>
            </Tooltip>
            </HStack>
            
            
            
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {!isLoading ? (<Box >
          <Text color = "blue"> Your current balance is: {lovBalance} LOV </Text>
          
          <Text color = "green"> You can claim: {parseInt(familyBudget*100)} LOV tokens on: {lovBalancetimer===0 ? ("NOW"):null} {lovBalancetimer > 0 ? (Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(((lovBalancetimer+ policyDays)*1000))):null}</Text>

          </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  
                /></Center>}

          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='ghost' onClick={onClose7}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={claimToken}>Claim LOV Token</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
      </MenuItem>):null}


   
       <MenuItem onClick={onOpen3}>Transactions History
       
       <Modal finalFocusRef={finalRef} isOpen={isOpen3} onClose={onClose3}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
          <HStack>
              <Text>
              Transaction History
            </Text>

          <Tooltip label='You can view your ETH Transaction History' fontSize='md' placement='right' shouldWrapChildren>
                      <FcAbout/>
            </Tooltip>
            </HStack>
            
            
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {!isLoading ? (<Box >
          <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl='4'>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label='sorted descending' />
                    ) : (
                      <TriangleUpIcon aria-label='sorted ascending' />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
    </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                /></Center>}
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='ghost' onClick={onClose3}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={getTransactions} >Get Latest History</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 

       </MenuItem>

       {familyStats.ProposalStatus === 4 && mintedNFT === false ? <MenuItem onClick={onOpen8}> Mint your NFT
       
       <Modal onClose={onClose8} size={'full'} isOpen={isOpen8}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Minting NFT menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <NFTPricing gameContract = {gameContract} setMintedNFT = {setMintedNFT}/>
          
          
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose8}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

              
       </MenuItem> : null}
       
       {familyStats.ProposalStatus === 4 && mintedNFT === true  ? <MenuItem onClick={onOpen4}> See your onchain NFT
       
       <Modal finalFocusRef={finalRef} isOpen={isOpen4} onClose={onClose4}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> 
          <HStack>
              <Text>
              Your NFT
            </Text>
            </HStack>
            
            
           </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {!isLoading ? (<Box >
            {imageNFT.image ? (
              <VStack spacing={4}>
          <Image src={imageNFT.image} alt='Image NFT' />
          
          <Text fontSize='md' color='blue.800' fontWeight='bold'>Properties:</Text>
          
          <HStack spacing={6}>
          <Box
            p={4}
            bg='blue.50'
            fontWeight='bold'
            borderRadius='md'
            borderWidth='1px'
            borderColor='blue.800'
          >
            <Text fontSize='xs' color='blue.300'>STATUS:</Text>
            <Text fontSize='sm' color='blue.800'>{imageNFT.attributes[1].value}</Text>
          </Box>

          <Box
            p={4}
            bg='blue.50'
            fontWeight='bold'
            borderRadius='md'
            borderWidth='1px'
            borderColor='blue.800'
          >
            <Text fontSize='xs' color='blue.300'>STAKE:</Text>
            <Text fontSize='sm' color='blue.800'>{imageNFT.attributes[0].value}</Text>
            
          </Box>
          
          </HStack>

          <Link
            href={`https://testnets.opensea.io/assets/${nftContractAddress}/${tokenURI}`} 
            p={2}
            color='white'
            fontWeight='bold'
            borderRadius='xl'
            borderWidth='2px'
            maxW='md'
            bgGradient='linear(to-r, teal.500, blue.500)'
            isExternal
            _hover={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',  
            }}
          >
            See your NFT in OpenSea<ExternalLinkIcon mx='3px' />
            
          </Link>

          </VStack>
          
          ): 
          <Text>
            Please load your NFT by clicking "Load NFT Image"
          </Text>
          }



          </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                /></Center>}
        
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} variant='ghost' onClick={onClose4}>
              Close
            </Button>
            <Button colorScheme='blue'onClick={loadNFTimage} >Load NFT Image</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
       </MenuItem> : null}
       {familyStats.ProposalStatus === 4 ? (
       <MenuItem onClick={onOpen2} fontWeight='bold' > Initiate Proposals
      
       <Modal finalFocusRef={finalRef} isOpen={isOpen2} onClose={onClose2} size={'xl'}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Create Proposals Here. Your current balance: {lovBalance} LOVs</ModalHeader>
           <ModalCloseButton />
           <ModalBody>

              <Tabs index={voteType} onChange={(index) => setvoteType(index)} isFitted variant='enclosed'>
               
                      <TabList>
                        <Tab>Vote Proposal</Tab>
                        <Tab>Send from Family Budget</Tab>
                        <Tab>Initiate Divorce</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                        
                          {!isLoading ? (<Box >

                                  <FormControl>
                                  <Formik
                                  initialValues={{ votetext: '', voteEnds: '', NumTokens: '', name: '0x0000000000000000000000000000000000000000', gift: '0'}}
                                  validate={validateWalletAddress}
                                  onSubmit={(values, actions) => {
                                  setTimeout(() => {
                                  alert(JSON.stringify(values, null, 2))
                                  actions.setSubmitting(false)
                                  }, 1000)
                                  }}
                                  >
                                  {(props) => (
                                  <Form>
                                  <Field name='votetext'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.votetext && form.touched.votetext}>
                                        <FormLabel htmlFor='votetext'>

                                        <HStack>
                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                              Proposal text:
                                        </Text>

                                        <Tooltip label='This text will be shown in your Proposal Card.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>
                                        </HStack>

                                          </FormLabel>
                                        <Input {...field} id='votetext' placeholder='Max 200 symbols'
                                      />
                                        <FormErrorMessage>{form.errors.votetext}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>


                                  <Field name='voteEnds'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.voteEnds && form.touched.voteEnds}>
                                        <FormLabel htmlFor='voteEnds'>
                                        <HStack>
                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                              Voting ends after this number of days:  
                                        </Text>
                                        <Tooltip label='If there were no response to your proposal in allocated time you can pass your proposal due to timeout.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>

                                            </HStack>
                                          </FormLabel>

                                        <Input {...field} id='voteEnds' placeholder='Enter # in Days'/>

                                        <FormErrorMessage>{form.errors.voteEnds}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>

                                  <Field name='NumTokens'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.NumTokens && form.touched.NumTokens}>
                                        <FormLabel htmlFor='NumTokens'>
                                          <HStack>

                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                            Backed by LOV Tokens:   
                                        </Text>
                                    
                                        <Tooltip label='LOV token will be used as a Bid. Responder can decline your proposal by providing higher Bid.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>
                                          </HStack>
                                          </FormLabel>
                                        <Input {...field} id='NumTokens' placeholder='# of LOV tokens to back your proposal'
                                        />
                                        <FormErrorMessage>{form.errors.NumTokens}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>

                                    </Form>
                                  )}
                                  </Formik>

                                  </FormControl>
                                  </Box>):<Center> <Spinner
                                          thickness='4px'
                                          speed='0.65s'
                                          emptyColor='gray.200'
                                          color='blue.500'
                                          size='xl'
                                        /></Center>}
                            
                        
                        </TabPanel>


                        <TabPanel>
                         {!isLoading ? (<Box >

                                  <FormControl>

                                  <Formik
                                  initialValues={{ votetext: '', voteEnds: '0', NumTokens: '', name: '', gift: '0'}}
                                  validate={validateWalletAddress}
                                  onSubmit={(values, actions) => {
                                  setTimeout(() => {
                                  alert(JSON.stringify(values, null, 2))
                                  actions.setSubmitting(false)
                                  }, 1000)
                                  }}
                                  >
                                  {(props) => (

                                  <Form>
                                  <Field name='votetext'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.votetext && form.touched.votetext}>
                                        <FormLabel htmlFor='votetext'>

                                        <HStack>
                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                              Proposal text:
                                        </Text>

                                        <Tooltip label='This text will be shown in your Proposal Card.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>
                                        </HStack>

                                          
                                          </FormLabel>
                                        <Input {...field} id='votetext' placeholder='Max 200 symbols'
                                      />
                                        <FormErrorMessage>{form.errors.votetext}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>


                                 

                                  <Field name='NumTokens'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.NumTokens && form.touched.NumTokens}>
                                        <FormLabel htmlFor='NumTokens'>

                                        <HStack>

                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                            Backed by LOV Tokens:   
                                        </Text>
                                    
                                        <Tooltip label='LOV token will be used as a Bid. Responder can decline your proposal by providing a Bid that is higher than your Bid in square root. Financial proposals are easier to vote against.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>
                                        
                                        </HStack>
                                    
                                          
                                          </FormLabel>
                                        <Input {...field} id='NumTokens' placeholder='# of LOV tokens to back your proposal'
                                        />
                                        <FormErrorMessage>{form.errors.NumTokens}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>

                                  <Field name='name'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel htmlFor='name'> 
                                        <HStack>  
                                        <Text
                                    bgGradient= 'linear(to-r, green.500, green.800)'
                                    bgClip='text'
                                    fontSize='2xl'
                                    >
                                    Enter Wallet Address 
                                        </Text>
                                        <Tooltip label='Provide non ENS Wallet Address. The specified amount will be sent to this address from the Family Budget.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>

                                            </HStack>
                                        


                                          </FormLabel>
                                        <Input {...field} id='name' placeholder='Recepient Wallet Address'
                                        />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                      </FormControl>
                                    )}
                                  </Field>

                                  <Field name='gift'>
                                    {({ field, form }) => (
                                      <FormControl isInvalid={form.errors.gift && form.touched.gift}>
                                        <FormLabel htmlFor='gift'>
                                        <HStack>
                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                            >
                                              Amount to be sent in {currency}
                                        </Text>

                                        <Tooltip label='Specified amount will be sent from the Family Budget if proposal is accepted. This should not exceed your Family Budget.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>

                                            </HStack>
                                          


                                          </FormLabel>
                                        <Input {...field} id='gift' placeholder='Enter amount less than the Family Budget'
                                      />
                                        <FormErrorMessage>{form.errors.gift}</FormErrorMessage>
                                        <Text
                                              color = 'blue'
                                              fontSize='1xl'
                                            >
                                              * You can pass your proposal if there were no response in {policyDays} Days.
                                        </Text>
                                      </FormControl>
                                    )}
                                  </Field>

                                    </Form>
                                  )}
                                  </Formik>

                                  </FormControl>
                                  </Box>):<Center> <Spinner
                                          thickness='4px'
                                          speed='0.65s'
                                          emptyColor='gray.200'
                                          color='blue.500'
                                          size='xl'
                                        /></Center>}
                        </TabPanel>
                        
                        <TabPanel>
                        {!isLoading ? (<Box >

                            <FormControl>

                            <Formik
                            initialValues={{ votetext: '', voteEnds: '0', NumTokens: '0', name: '0x0000000000000000000000000000000000000000', gift: '0'}}
                            validate={validateWalletAddress}
                            onSubmit={(values, actions) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2))
                            actions.setSubmitting(false)
                            }, 1000)
                            }}
                            >
                            {(props) => (

                            <Form>
                            <Field name='votetext'>
                              {({ field, form }) => (
                                <FormControl isInvalid={form.errors.votetext && form.touched.votetext}>
                                  <FormLabel htmlFor='votetext'>

                                  <HStack>
                                        <Text
                                              bgGradient= 'linear(to-r, green.500, green.800)'
                                              bgClip='text'
                                              fontSize='2xl'
                                              fontWeight='bold'>
                                              Proposal text:
                                        </Text>

                                        <Tooltip label='This text will be shown in your Proposal Card.' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcAbout/>
                                            </Tooltip>
                                        </HStack>


                                    
                                    </FormLabel>
                                  <Input {...field} id='votetext' placeholder='Max 200 symbols'
                                />
                                  <FormErrorMessage>{form.errors.votetext}</FormErrorMessage>
                                  <Text
                                              color = 'blue'
                                              fontSize='1xl'
                                            >
                                              * You can pass your proposal if there were no response in {policyDays} Days.
                                        </Text>
                                </FormControl>
                              )}
                            </Field>


                              </Form>
                            )}
                            </Formik>

                            </FormControl>
                            </Box>):<Center> <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                  /></Center>}
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
           
           </ModalBody>
 
           <ModalFooter>
             <Button colorScheme='blue' mr={3} onClick={onClose2}>
               Close
             </Button>
             <Button variant='ghost'  onClick={createProposal} >Proceed</Button>
           </ModalFooter>
         </ModalContent>
       </Modal>
       
       
       </MenuItem>):null}
       
      
       
    </MenuGroup>
  </MenuList>
</Menu>
</Box>

</HStack>

 )
} 
}

const loadNFTimage = async () => {
  const { ethereum } = window;
  setIsLoading(true);
  try {
    const ABI = [ 'function nftHolders(address _waver, address _proposed) view returns (uint256 _id)',
    'function tokenURI (uint256 _id) view returns (string)'
    ]
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const NFTContract = new ethers.Contract(
      //"0x8a8771636019e218aAf0b50E7cB90BaA3A4E9301",
      nftContractAddress,
      ABI,
      signer
    );

    const txn = await NFTContract.nftHolders(familyStats.waver,familyStats.proposed)
    console.log("Token ID", txn)
    settokenURI(txn.toNumber());
    const txn2 = await NFTContract.tokenURI(txn);
    console.log(txn2)
    const decodedtxn = txn2.slice(29,txn2.length)
    let base64ToString = atob(decodedtxn);
    const jsonobject = JSON.parse(base64ToString);
    setimageNFT(jsonobject);
    console.log("JSON",jsonobject)
    console.log("JSON Attributes",jsonobject.attributes[1].value)
    console.log(jsonobject.image)

    toast({
      title: 'Status Update',
      description: "Your NFT has been loaded",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })


    } catch (error) {
      console.log(error)
      toast({
        title: `${error.message}`,
        description: 'Transaction has not been completed',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    }
    setIsLoading(false);
  }


const texttransformer =  () => {

  if (familyStats.ProposalStatus === 1 ) {
  return ("Proposal Initiated")
  } else if (familyStats.ProposalStatus === 2  ) {
    return("Proposal Cancelled")
  }else if (familyStats.ProposalStatus === 3 ) {
    return("Proposal Accepted")
  }else if (familyStats.ProposalStatus === 4  ) {
    return(
      <HStack>
    <Text color="white" fontSize="md">Married</Text>
      <Text color="white" fontSize="md">to:</Text>
      <Text color="white" fontSize="md">
      {marriedto.slice(0, 4)}...{marriedto.slice(
      marriedto.length - 4,
      marriedto.length)}</Text>
      </HStack>
    )
  }
  } 
 


  const getTransactions = async () => {
    setIsLoading(true);
    var txarray =[]
    // eslint-disable-next-line 
    const myAddress = await Signer.getAddress()
    const filterFrom = gameContract.filters.AddStake(myAddress,null,null)
    const query = await gameContract.queryFilter(filterFrom, -10000);

    if (query.length>0) {
      for (let i=0; i<query.length; i++) {
        const {timestamp,amount} = query[i].args
        console.log(timestamp.toNumber(),ethers.utils.formatEther(amount))
        
        txarray.push({
          id: i,
          time: Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp.toNumber()*1000),
          amount: ethers.utils.formatEther(amount)})
      }
      
    }   
    settxarray(txarray);
    console.log(data)
    console.log(columns)
    console.log(txarray)


    toast({
      title: 'Status Update',
      description: "Your Transactions have been loaded",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    setIsLoading(false);
   
  }




  const addStake = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
        const waveTxn = await gameContract.addstake( {value: ethers.utils.parseUnits(value, 'ether')});
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setvalue('')
      } catch (error) {
        console.log(error)
        toast({
          title: `${error.message}`,
          description: 'Transaction has not been completed',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
      setIsLoading(false);
  };


  const buyLovToken = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
        const waveTxn = await gameContract.buyLovToken( {value: ethers.utils.parseUnits(value, 'ether')});
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setvalue('')
        fetchLovBalance();
      } catch (error) {
        console.log(error)
        toast({
          title: `${error.message}`,
          description: 'Transaction has not been completed',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
      setIsLoading(false);
  };

  const claimToken = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
        const waveTxn = await gameContract.claimToken();
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setvalue('')
        toast({
          title: 'Status Update',
          description: "You have claimed your token",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })

        fetchLovBalance();
    

      } catch (error) {
        console.log(error)
        toast({
          title: `${error.message}`,
          description: 'Transaction has not been completed',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      }
      setIsLoading(false);
      onClose7();
  };






const renderContent2 = () => {


  if (!currentAccount) {
    return (
//Here is a main screen

<Container maxW={'7xl'}>
<Stack
  align={'center'}
  spacing={{ base: 8, md: 10 }}
  py={{ base: 20, md: 28 }}
  direction={{ base: 'column', md: 'row' }}>
  <Stack flex={1} spacing={{ base: 4, md: 5 }}>
    <Heading
      lineHeight={1.1}
      fontWeight={700}
      fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
      Register your marriage on the {' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              Ethereum Blockchain
            </Text>{' '}
            and Get {' '}
            <Text
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              NFT Certificate.
            </Text>
    </Heading>
    <Text >
    <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              CryptoMarry
            </Text> {' '}
    is more than a registration service, it is a platform that makes partners' committment to marriage real.
     Staked ETHs (or other currencies) are split between sides upon divorce. No lawyers needed.  

    </Text>
    <Center>
    <Stack
      spacing={{ base: 4, sm: 6 }}
      direction={{ base: 'column', sm: 'row' }}>
      
       <Button
         fontSize={'lg'}
         fontWeight={600}
         color={'white'}
         bg={'pink.400'}
         href={'#'}
         onClick={connectWalletAction}
         _hover={{
           bg: 'pink.300',
         }}>
         Connect your Wallet to Start
       </Button>
        
    </Stack>
    </Center>
  </Stack>
  <Flex
    flex={1}
    justify={'center'}
    align={'center'}
    position={'relative'}
    w={'full'}>
    <Blob
      w={'170%'}
      h={'170%'}
      position={'absolute'}
      top={'-20%'}
      left={0}
      zIndex={-1}
      
    />
    <Box
      position={'relative'}
      height={'480px'}
      rounded={'2xl'}
      boxShadow={'2xl'}
      width={'480px'}
      overflow={'hidden'}>
      
      <Image
        alt={'Hero Image'}
        fit={'cover'}
        align={'center'}
        w={'100%'}
        h={'100%'}
        src={
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDUwMCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPjxkZWZzPjxmaWx0ZXIgaWQ9J2InPjxmZUltYWdlIHJlc3VsdD0ncDAnIHhsaW5rOmhyZWY9J2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU5UQXdJaUJvWldsbmFIUTlJalV3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV3TUNBMU1EQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStQSEJoZEdnZ1ptbHNiRDBpSXpjeU1EbGlOeUlnWkQwaVRUQWdNR2cxTURCMk5UQXdTREI2SWk4K1BDOXpkbWMrJy8+PGZlSW1hZ2UgcmVzdWx0PSdwMScgeGxpbms6aHJlZj0nZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTlRBd0lpQm9aV2xuYUhROUlqVXdNQ0lnZG1sbGQwSnZlRDBpTUNBd0lEVXdNQ0ExTURBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK1BHTnBjbU5zWlNCamVEMGlNVEEzSWlCamVUMGlNemN3SWlCeVBTSXhOVEFpSUdacGJHdzlJaU5tTnpJMU9EVWlMejQ4TDNOMlp6ND0nLz48ZmVJbWFnZSByZXN1bHQ9J3AyJyB4bGluazpocmVmPSdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOVEF3SWlCb1pXbG5hSFE5SWpVd01DSWdkbWxsZDBKdmVEMGlNQ0F3SURVd01DQTFNREFpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUkrUEdOcGNtTnNaU0JqZUQwaU1qUTVJaUJqZVQwaU1qUXlJaUJ5UFNJeE1EQWlJR1pwYkd3OUlpTmlOVEUzT1dVaUx6NDhMM04yWno0PScvPjxmZUltYWdlIHJlc3VsdD0ncDMnIHhsaW5rOmhyZWY9J2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU5UQXdJaUJvWldsbmFIUTlJalV3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV3TUNBMU1EQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStQR05wY21Oc1pTQmplRDBpTkRJM0lpQmplVDBpTWprd0lpQnlQU0l4TkRBaUlHWnBiR3c5SWlNME9EazFaV1lpTHo0OEwzTjJaejQ9Jy8+PGZlQmxlbmQgbW9kZT0nb3ZlcmxheScgaW49J3AwJyBpbjI9J3AxJy8+PGZlQmxlbmQgbW9kZT0nZXhjbHVzaW9uJyBpbjI9J3AyJy8+PGZlQmxlbmQgbW9kZT0nb3ZlcmxheScgaW4yPSdwMycgcmVzdWx0PSdibGVuZE91dCcvPjxmZUdhdXNzaWFuQmx1ciBpbj0nYmxlbmRPdXQnIHN0ZERldmlhdGlvbj0nNDUnLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSdjJz48ZmVHYXVzc2lhbkJsdXIgaW49J1NvdXJjZUdyYXBoaWMnIHN0ZERldmlhdGlvbj0nMjUnLz48L2ZpbHRlcj48Y2xpcFBhdGggaWQ9J2EnPjxyZWN0IHdpZHRoPSc1MDAnIGhlaWdodD0nNTAwJyByeD0nNDInIHJ5PSc0MicvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0ndXJsKCNhKSc+PHBhdGggZmlsbD0nNmIxNzU0JyBkPSdNMCAwaDUwMHY1MDBIMHonLz48cGF0aCBzdHlsZT0nZmlsdGVyOnVybCgjYiknIGQ9J00wIDBoNTAwdjUwMEgweicvPjxnIHN0eWxlPSdmaWx0ZXI6dXJsKCNjKTt0cmFuc2Zvcm06c2NhbGUoMS41KTt0cmFuc2Zvcm0tb3JpZ2luOmNlbnRlciB0b3AnPjxwYXRoIGZpbGw9J25vbmUnIGQ9J00wIDBoNTAwdjUwMEgweicvPjxlbGxpcHNlIGN4PSc1MCUnIHJ4PScxODAnIHJ5PScxMjAnIG9wYWNpdHk9Jy41NScvPjwvZz48L2c+PGcgbWFzaz0ndXJsKCNnKScgZmlsbD0nI2ZmZicgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3Jz48dGV4dCB5PSc4MCcgeD0nOTAnIGZvbnQtd2VpZ2h0PSc1MjAnIGZvbnQtc2l6ZT0nNTAnPkNFUlRJRklDQVRFPC90ZXh0Pjx0ZXh0IHk9JzEzMCcgeD0nMTMwJyBmb250LXdlaWdodD0nNDAwJyBmb250LXNpemU9JzQwJz5vZiBNYXJyaWFnZTwvdGV4dD48L2c+PHJlY3QgeD0nMTYnIHk9JzE2JyB3aWR0aD0nNDY4JyBoZWlnaHQ9JzQ2OCcgcng9JzI2JyByeT0nMjYnIGZpbGw9J3JnYmEoMCwwLDAsMCknIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjIpJy8+PGcgc3R5bGU9J3RyYW5zZm9ybTp0cmFuc2xhdGUoMzVweCwxNzBweCknPjxyZWN0IHdpZHRoPScxNTAnIGhlaWdodD0nNDAnIHJ4PSc4JyByeT0nOCcgZmlsbD0ncmdiYSgwLDAsMCwwLjYpJy8+PHRleHQgeD0nMTInIHk9JzMwJyBmb250LWZhbWlseT0nQ291cmllciBOZXcnIGZvbnQtc2l6ZT0nMzAnIGZpbGw9JyNmZmYnPjx0c3BhbiBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LDAuNiknPklEOiA8L3RzcGFuPjI8L3RleHQ+PC9nPjxnIHN0eWxlPSd0cmFuc2Zvcm06dHJhbnNsYXRlKDM1cHgsMjMwcHgpJz48cmVjdCB3aWR0aD0nMzAwJyBoZWlnaHQ9JzQwJyByeD0nOCcgcnk9JzgnIGZpbGw9J3JnYmEoMCwwLDAsMC42KScvPjx0ZXh0IHg9JzEyJyB5PSczMCcgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzMwJyBmaWxsPScjZmZmJz48dHNwYW4gZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjYpJz5TdGFrZTogPC90c3Bhbj4zMDAwIEVUSDwvdGV4dD48L2c+PGcgc3R5bGU9J3RyYW5zZm9ybTp0cmFuc2xhdGUoMzVweCwyOTBweCknPjxyZWN0IHdpZHRoPSc0MDAnIGhlaWdodD0nNDAnIHJ4PSc4JyByeT0nOCcgZmlsbD0ncmdiYSgwLDAsMCwwLjYpJy8+PHRleHQgeD0nMTInIHk9JzMwJyBmb250LWZhbWlseT0nQ291cmllciBOZXcnIGZvbnQtc2l6ZT0nMzAnIGZpbGw9JyNmZmYnPjx0c3BhbiBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LDAuNiknPkJsb2NrIzogPC90c3Bhbj4xNjU8L3RleHQ+PC9nPjxnIHN0eWxlPSd0cmFuc2Zvcm06dHJhbnNsYXRlKDM1cHgsMzUwcHgpJz48cmVjdCB3aWR0aD0nNDMwJyBoZWlnaHQ9Jzk1JyByeD0nOCcgcnk9JzgnIGZpbGw9J3JnYmEoMCwwLDAsMC42KScvPjx0ZXh0IHg9JzEyJyB5PSczMCcgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzMwJyBmaWxsPScjZmZmJz48dHNwYW4gZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjYpJz5CZXR3ZWVuOiA8L3RzcGFuPjwvdGV4dD48dGV4dCB4PScxMicgeT0nNTUnIGZvbnQtZmFtaWx5PSdDb3VyaWVyIE5ldycgZm9udC1zaXplPScxNicgZmlsbD0nI2ZmZic+MHhiY2Q0MDQyZGU0OTlkMTRlNTUwMDFjY2JiMjRhNTUxZjNiOTU0MDk2PC90ZXh0Pjx0ZXh0IHg9JzEyJyB5PSc3NScgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzE2JyBmaWxsPScjZmZmJz4weGNkM2I3NjZjY2RkNmFlNzIxMTQxZjQ1MmM1NTBjYTYzNTk2NGNlNzE8L3RleHQ+PC9nPjwvc3ZnPg=='
        }
      />
    </Box>
  </Flex>
</Stack>

<Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Setting a Marriage Contract{' '}
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              is Easy.
            </Text> {' '}
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Propose your loved one and demonstrate your strong commitment to the partnership by staking ETHs (or other currencies) and minting a NFT Certificate. {' '}
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              Ethereum Smart Contracts
            </Text> {' '}
           will make sure that your promises are delivered.  
        </Text>
        <Flex
    flex={1}
    justify={'center'}
    align={'center'}
    position={'relative'}
    w={'full'}>
        <Stack spacing={6} direction={'row'}>
          
        <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
       
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${'https://images.unsplash.com/photo-1605101943206-05c8f4e64598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1605101943206-05c8f4e64598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80'
            }
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            STEP 1
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              Make a proposal 
            </Text> 
            
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={300} fontSize={'1xl'}>
            Within the proposal, indicate partner's wallet address, the amount of ETH (or othe currencies) you are willing to stake. You can also send a Gift in ETH (or other currencies) as a part of the deal.   
            </Text>
          </Stack>
        </Stack>
      </Box>

      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
       
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${'https://images.unsplash.com/photo-1553915632-175f60dd8e36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1553915632-175f60dd8e36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            }
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            STEP 2
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              Register your marriage 
            </Text>  
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={300} fontSize={'1xl'}>
            If your proposal is accepted, register your Marriage and create a Smart Contract. Both partners will receive NFT Certificate that is 100%  stored on the Ethereum Chain.   
            </Text>
          </Stack>
        </Stack>
      </Box>

      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
       
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${'https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
            }
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            STEP 3
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              Build a Family 
            </Text>  
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={300} fontSize={'1xl'}>
            Both partners can inrease Family Staking as a part of their committment. Remember staying out of divorce, but if there are no other options, the Staking amount will be split between partners upon mutual agreement. 
            </Text>
          </Stack>
        </Stack>
      </Box>

        </Stack>
        </Flex>   
</Stack>
    </Container>
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
              fontWeight='bold'>
              F.A.Q.
            </Text> {' '}
        </Heading>
        
        <Stack spacing={6} direction={'row'}>
          
       
        <Accordion 
        allowToggle 
      
        >
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Is CryptoMarry substitute for IRL experiences?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     Absolutely not. CryptoMarry is not substitute for IRL experiences. But the platform provides a number of instruments that are very difficult to arrange in IRL.
     For example, proposals without Skin in the Game (e.g ETH Staking) are not always credible. The one who proposes through CryptoMarry, can make credible committment to the Partnership.
     Most importantly, if couples decide to divorce, it can be quite difficult to fairly split joint assets (sometimes legal procedures are unavoidable). But with CryptoMarry, Staked resources are split instantly upon divorce.     

    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Are staked (deposited) ETH (or other currencies) safe? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     Ethereum provides unmatched security in ensuring authorized transactions (unless private keys are lost). 
     Security Audit of CryptoMarry Smart Contracts is still in progress, thus Users should consider all associated risks before using the service. 
     The Smart Contracts are Open Sourced for the community review.  
     Developers and Associates do not take any responsibilities in case of loss of Staked ETH Funds by any means. It is also impossible to recover funds if wallet accounts are lost. 

     </AccordionPanel>
  </AccordionItem>

<AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Where can I find my NFT Certificate? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    NFT Certificates can be loaded within the CryptoMarry Menu Bar. They are also available in OpenSea and similar indexing platforms. 
    It is possible to import NFT certificates into wallet address if viewing NFT assets is possible within the wallet. For instance, only mobile version of Metamask allows viewing NFTs. 

     </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Is it possible to withdraw Staked ETH (or other currencies)?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   Withdrawing is possible only through divorcing procedures and will be split between provided wallet addresses. It is done by design.
   Divorce procedures are complete if both sides have agreed. 
     </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          If one of the wallet addresses is lost is it possible to withdraw funds? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   Deposits can be withdrawn if the other wallet address does not provide any response within the 60 days. The full amount will be sent to the account that initiated divorce. If both wallet adresses are lost, then it is not possible to recover funds. 
     </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          What are the transaction fees and associtated costs? 
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   There are two types of fees. First, Developer Community fee is 1% from all transactions. There is also an Ethereum fee. 
   Ethereum transaction fees may vary depending on network congestion. It should be noted that transaction fee form Minting NFT Certificate may cost up to 0.6 ETHs. This is because all data in stored on chain. If you are looking for more affordable options, CryptoMarry is available on Polygon Chain. 
     </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Do you collect Data?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
   CryptoMarry does not collect any personal data. All interactions happen 100% on chain. 
     </AccordionPanel>
  </AccordionItem>


</Accordion>
          
        



        </Stack>
</Stack>
  
</Container>



</Container>




//Here where main screen ends 



    );}else if (currentAccount && wrongnetwork === true) { 
     return(<WrongNetwork/>)
    
    
    

  } else if (currentAccount && gameContract && wrongnetwork === false && !characterNFT &&!userBeenProposed) {
    return (
      <Container maxW={'5xl'}>
        <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(80px)' }}
      />
        <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
    <SelectCharacter balanceETH={balanceETH} gameContract={gameContract} Provider = {Provider} setCharacterNFT={setCharacterNFT} currentAccount={currentAccount} 
    />
    </Stack>
    </Container>);	
	
  } else if (currentAccount && userBeenProposed && !characterNFT ) {
    return (
      <Container maxW={'5xl'}>
        <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(80px)' }}
      />
      <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}>
    <Arena Signer = {Signer} gameContract={gameContract}  Provider = {Provider} currentAccount={currentAccount} userBeenProposed={userBeenProposed} setuserBeenProposed={setuserBeenProposed}/>
    </Stack>
    </Container>
      );
  } else if (currentAccount && characterNFT && !userBeenProposed  ) {
    return (
      <Container maxW={'5xl'}>
        <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(80px)' }}
      />
      <Stack
      textAlign={'center'}
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}>
    <Execute balanceETH = {balanceETH} Signer = {Signer} gameContract={gameContract} currentAccount={currentAccount} characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
    </Stack>
    </Container>
      );
  } 

}



const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
 // eslint-disable-next-line 
const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};
 // eslint-disable-next-line 
const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpenother, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpenother ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpenother} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  
];


const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};



  return (
    <ChakraProvider theme={theme}>

<Grid

  templateRows='repeat(1, 1fr)'
  templateColumns='repeat(1, 1fr)'
  gap={2}
>

  <GridItem colSpan={1}>

  <Box>
      <Flex
        bg={useColorModeValue('gray.100', 'gray.800')}
        color={useColorModeValue('gray.600', 'gray.100')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpenother ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
        <Link href={'/'}>
        <Stack
                as={'a'}
                direction={'row'}
                alignItems={'center'}
                spacing={{ base: 1, sm: 1 }}>
                <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                <Heading
                  as={'h1'}
                  fontSize={'xl'}
                  display={{ base: 'none', md: 'block' }}>
                  <Text
                   as={'span'}
                   bgGradient="linear(to-r, red.400,pink.400)"
                   bgClip="text"
                  >CryptoMarry</Text>
                </Heading>
              </Stack>
            </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
          <Select value={chainID} 
          onChange={e => setchainID(e.target.value)}
          borderColor='pink'
          border='2px'>
                <option value='0x1'>Ethereum</option>
                <option value='0x4'>Rinkeby</option>
                <option value='0x89' >Polygon</option>
                <option value='0x7a69'>Localhost</option>
          </Select>
          
           <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 2, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
         
         {renderContent()}
          <ColorModeSwitcher justifySelf="flex-end" />

          
        
        </Stack>
      </Flex>

      <Collapse in={isOpenother} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
    

  </GridItem>
  
  <GridItem colSpan={2} >
  


  <Box textAlign="center" fontSize="xl">

        <VStack spacing={1}>
        
        {renderContent2()}

            </VStack>
      </Box>

  </GridItem>
 
  
  <Box
     
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container
        flex ='1'
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2022 CryptoMarry. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Github'} href={'#'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
   
    </Grid>

    </ChakraProvider>
  );


}



export default App;



export const Blob = (props: IconProps) => {
  return (
    <Icon
      width={'100%'}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="pink"
      />
    </Icon>
  );
};

