import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {transformCharacterData } from '../../constants';

import GetVotingStatuses from "../../components/GetVotingStatuses";
import { SimpleGrid,
    Box,
    Text,
    Button,
    HStack,
    Center,
 
    Spinner,

    useDisclosure,
   
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
     AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  
    createStandaloneToast,
    Grid, 
    GridItem
   
} from '@chakra-ui/react'

import Confetti from 'react-confetti'

const Execute = ({balanceETH, Signer, gameContract, currentAccount, characterNFT,setCharacterNFT }) => {


// State

const [isLoading, setIsLoading] = useState(false);

const [incomingMessage, SetincomingMessage] = useState("")
const [outgoingMessage, SetoutgoingMessage] = useState("")
//const {isOpen, onOpen, onClose } = useDisclosure()


const toast = createStandaloneToast()
 // eslint-disable-next-line 
const [mxarray,setmxarray] = useState([]);


const cancelRef = React.useRef()

const { 
    isOpen: isOpened, 
    onOpen: onOpened, 
    onClose: onClosed 
} = useDisclosure()





  useEffect(() => {

    const onNewWave = async (id, waver, proposed, sender, message, time,vid) => {
      console.log("Incoming message with:",id, waver,proposed, sender,message,time,vid);
      if (gameContract && waver.toUpperCase() === currentAccount.toUpperCase()) {
        const txn = await gameContract.checkIfUserHasProposed();
        console.log(txn)
        if (txn.ProposalStatus!==0){
          console.log('Status has been updated');
          setCharacterNFT(transformCharacterData(txn));
        
        } else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
          window.location.reload(false);}
      } else {
        console.log('Other users event.');}
      }

      getMessages();

   
//Listeners
    if (gameContract) {
      gameContract.on('NewWave', onNewWave);
   
    }
//Listenersoff
    return () => {
      if (gameContract) {
        gameContract.off('NewWave', onNewWave);
        
      }
    };
// eslint-disable-next-line 
  }, [gameContract]);

  const getMessages = async () => {
    var mxarray =[]
    // eslint-disable-next-line 
    const myAddress = await Signer.getAddress();
    const filterFrom = gameContract.filters.NewWave(null,myAddress,null,null,null,null);
    const query = await gameContract.queryFilter(filterFrom, -1000000);

    if (query.length>0) {
      for (let i=0; i<query.length; i++) {
        const {waver, proposed,message, timestamp,vid} = query[i].args
        
        mxarray.push({
          id: i,
          waver: waver,
          proposed: proposed,
          message: message,
          time: Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp.toNumber()*1000),
          vid: vid})
      }
    }   
    setmxarray(mxarray);
    console.log("Messages are in this array", mxarray);
    try {SetincomingMessage(mxarray.filter(data=> data.vid === 2).slice(-1)[0].message)} catch(error) { console.log("Not Found Incoming Message")}
    SetoutgoingMessage(mxarray.filter(data=> data.vid === 1).slice(-1)[0].message) 
  }


  const execute = async () => {
    setIsLoading(true);
    try {

      if (gameContract) {
      console.log('Executing marriage contract...')

        const value = ((Number(characterNFT.stake) + Number(characterNFT.gift))*1.011).toString()
        const waveTxn = await gameContract.execute( {value: ethers.utils.parseUnits(value, 'ether')});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);}
        

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



  const cancelmrg = async () => {
    setIsLoading(true);
    try {
        const waveTxn = await gameContract.cancel();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        onClosed();
        

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




  const { width, height } = window.innerWidth;


    const renderContent2 = () => {
        if (characterNFT.ProposalStatus === 1) {
            return (
        <SimpleGrid columns={1} spacing={8}>
  
            <Box height='200px'>
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'>
            Congratulations! Your proposal to
              </Text>
          
              <Text
            bgGradient='linear(to-r, green.200, pink.500)'
            bgClip='text'
            fontSize='4xl'
            fontWeight='extrabold'>
            {characterNFT.waver.slice(0, 4)}...{characterNFT.proposed.slice(
              characterNFT.waver.length - 4,
              characterNFT.waver.length
            )}
              </Text>
          
              <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='4xl'
            fontWeight='extrabold'>
            has been sent.
              </Text>
          
            </Box>
            <Box height='80px'>
            <Text
            bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
            bgClip='text'
            fontSize='4xl'
            borderWidth='2px'
            fontWeight='extrabold'>
                
            With your ❤️ note: {outgoingMessage}
              </Text>
            </Box>
            
            <Box height='100px'>
            
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            As a committment to partnership {characterNFT.stake} ETH is being deposited and {characterNFT.gift} ETH was offered as a gift.
          </Text>
            
            </Box>
            
            <Box  height='40px'>
            
            <Center>
            
            <Text
                           bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                          bgClip='text'
                          fontSize='2xl'
                          fontWeight='extrabold'>
                          Your loved one will soon respond! 
              </Text>
            
       
           </Center>
              </Box>
              <Box  height='80px'>
              <Center>
          <HStack spacing='50px' >
              <Box
            as='button'
            p={4}
            color='white'
            fontWeight='bold'
            borderRadius='md'
            borderWidth='2px'
            maxW='lg'
            bgGradient='linear(to-r, teal.500, green.500)'
            onClick={onOpened}
            _hover={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',  
            }}
          >
            Cancel
          </Box>
          <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClosed}
        isOpen={isOpened}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Cancel?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          {!isLoading ? (<Box >
            Are you sure you want to cancel your decision?
            </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                /></Center>}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClosed}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={cancelmrg}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
          
          </HStack>
          </Center>
            </Box>
          </SimpleGrid>
            )} else if (characterNFT.ProposalStatus === 3) { 
                return (
                    
                    <SimpleGrid columns={1} spacing={8}>
                        <Confetti
                            width={width}
                            height= {height}
                            numberOfPieces = {200}
                            
                            recycle = {false}
                         />

  
                    <Box height='200px'>
                    <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='5xl'
                    fontWeight='extrabold'>
                    Congratulations! Your proposal to
                      </Text>
                  
                      <Text
                    bgGradient='linear(to-r, green.200, pink.500)'
                    bgClip='text'
                    fontSize='4xl'
                    fontWeight='extrabold'>
                    {characterNFT.waver.slice(0, 4)}...{characterNFT.proposed.slice(
                      characterNFT.waver.length - 4,
                      characterNFT.waver.length
                    )}
                      </Text>
                  
                      <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='4xl'
                    fontWeight='extrabold'>
                    has been accepted.
                      </Text>
                  
                    </Box>
                    <Box height='80px'>
                    <Text
                    bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                    bgClip='text'
                    fontSize='4xl'
                    borderWidth='2px'
                    fontWeight='extrabold'>
                    With a ❤️ note: {incomingMessage}
                      </Text>
                    </Box>
                    
                    <Box height='100px'>
                    
                    <Text
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    bgClip='text'
                    fontSize='3xl'
                    fontWeight='extrabold'>
                    As a committment to partnership {characterNFT.stake} ETH is being deposited and {characterNFT.gift} ETH was offered as a gift.
                  </Text>
                    
                    </Box>
                    
                    <Box  height='40px'>
                    
                    <Center>
                    {!isLoading ? (<Box >
                    <Text
                                  bgGradient='linear(to-r, green.500, green.800)'
                                  bgClip='text'
                                  fontSize='2xl'
                                  fontWeight='extrabold'>
                                  Please finalize marriage contract below. 
                      </Text>
                      </Box>):<Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  
                /></Center>}
                    
               
                   </Center>
                      </Box>
                      <Box  height='80px'>
                      <Center>
                  <HStack spacing='50px' >
                     { balanceETH-(characterNFT.stake+characterNFT.gift)>0 ? (<Box
                    as='button'
                    p={4}
                    color='white'
                    fontWeight='bold'
                    borderRadius='md'
                    borderWidth='2px'
                    maxW='lg'
                    bgGradient='linear(to-r, teal.500, green.500)'
                    onClick={execute}
                    _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',  
                    }}
                  >
                    Finalize
                  </Box> ) : null
                  }

                { balanceETH-(characterNFT.stake+characterNFT.gift)<0 ? (<Box
                    p={4}
                    color='white'
                    fontWeight='bold'
                    borderRadius='md'
                    borderWidth='2px'
                    maxW='lg'
                    bgGradient='linear(to-r, red.500, red.800)'
                  >
                    Not enough ETH balance to execute the Contract. 
                  </Box> ) : null
                  }


                  </HStack>
                  </Center>
                    </Box>
                  </SimpleGrid>
                )
            }else if (characterNFT.ProposalStatus === 4 ) {
                return(
                    <Grid
                                h='200px'  
                                templateRows='repeat(3, 1fr)'
                                templateColumns='repeat(5, 1fr)'
                                gap={4}
                                >
                                <GridItem colSpan={2}>
                                <Text
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    bgClip='text'
                                    fontSize='4xl'
                                    fontWeight='extrabold'>
                                    Dashboard
                                </Text>
        
                                </GridItem>
                               
                          
                                </Grid>
                    
                );
        
            } 
        


    }





return(
<Box height='800px'> 
<VStack spacing={50}>
<Box>
    {renderContent2()}
    </Box>
<Box>
    <GetVotingStatuses gameContract={gameContract} currentAccount={currentAccount} waver = {characterNFT.waver} proposed = {characterNFT.proposed}/>
  
  </Box>
 </VStack>
</Box>

);



};

export default Execute;