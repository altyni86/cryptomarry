import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/marriages.json';
import { SimpleGrid,
    Box,
    Text,
    Button,
    HStack,
    Center,
    Modal,
    Divider,
    Textarea,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Radio, 
    RadioGroup,
    Stack,
    VStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
     AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,

    
    Grid, 
    GridItem
   
} from '@chakra-ui/react'

import Confetti from 'react-confetti'

const Execute = ({gameContract, currentAccount, characterNFT,setCharacterNFT }) => {


// State
//const [gameContract, setGameContract] = useState(null);
const [message, setMessage] = useState("");
const [value, setvalue] = useState("");
const [divresponse, setdivresponse] = useState(null);
// eslint-disable-next-line 
const [isLoading, setIsLoading] = useState(false);

const [incomingMessage, SetincomingMessage] = useState("")
const { isOpen, onOpen, onClose } = useDisclosure()


const cancelRef = React.useRef()

const { 
    isOpen: isOpened, 
    onOpen: onOpened, 
    onClose: onClosed 
} = useDisclosure()


const { 
    isOpen: isOpened2, 
    onOpen: onOpened2, 
    onClose: onClosed2 
} = useDisclosure()



const format = (val) => `Ξ` + val
// eslint-disable-next-line 
const parse = (val) => val.replace(/^\Ξ/, '')


/* UseEffects
useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        ContractAddress,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log('Ethereum object not found');
    }
  }, [ContractAddress]);

*/
  useEffect(() => {

    const onNewWave = async (id, waver, proposed, sender, message, time,vid) => {
      console.log("Incoming message with:",id, waver,proposed, sender,message,time,vid);
      if (gameContract && waver.toUpperCase() === currentAccount.toUpperCase()) {
        const txn = await gameContract.checkIfUserHasProposed();
        console.log(txn)
        if (txn.ProposalStatus!==0){
          console.log('Status has been updated');
          setCharacterNFT(transformCharacterData(txn));
          SetincomingMessage(message);
        
        } else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
          window.location.reload(false);}
      } else {
        console.log('Other users event.');}
      }


/*
    const onCertificateMint = async (waver, proposed, tokenId) => {
      console.log("Incoming message with:",waver, proposed,tokenId);
      if (gameContract && waver.toUpperCase() === currentAccount.toUpperCase()) {
        const txn = await gameContract.checkIfUserHasProposed();
   
        if (txn.ProposalStatus!==0){
          console.log(`CertificateNFTMinted - proposer: ${waver} proposed: ${proposed} tokenId: ${tokenId.toNumber()} characterIndex:}`);
          alert(`Your NFT is all done -- see it here: https://testnets.opensea.io/assets/${gameContract.address}/${tokenId.toNumber()}`)
          
          setCharacterNFT(transformCharacterData(txn));} else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
          window.location.reload(false);}
      } else {
        console.log('Other users event.');}
    }*/
   
//Listeners
    if (gameContract) {
      gameContract.on('NewWave', onNewWave);
   
      //gameContract.on('CertificateNFTMinted', onCertificateMint);
    }
//Listenersoff
    return () => {
      if (gameContract) {
        gameContract.off('NewWave', onNewWave);
        
       // gameContract.off('CertificateNFTMinted', onCertificateMint);
      }
    };
// eslint-disable-next-line 
  }, [gameContract]);


  const execute = async () => {
    setIsLoading(true);
    try {

      if (gameContract) {
      console.log('Executing marriage contract...')

        const value = ((Number(characterNFT.stake) + Number(characterNFT.gift))*1.011).toString()
        const waveTxn = await gameContract.execute( {value: ethers.utils.parseUnits(value, 'ether'),gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 200000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);}
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
  };

  const addStake = async () => {
    setIsLoading(true);
    try {
      const value2 = (Number(value)*1.01).toString()
        const waveTxn = await gameContract.addstake( {value: ethers.utils.parseUnits(value2, 'ether'),gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 100000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
  };

  const cancelmrg = async () => {
    setIsLoading(true);
    try {
        const waveTxn = await gameContract.cancel();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
  };




  const responddiv = async () => {
    setIsLoading(true);
    try {
    
        const waveTxn = await gameContract.divorceresponse(divresponse, message,{gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1500000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
  };

  const timoutwithdraw = async () => {
    setIsLoading(true);
    try {
        const waveTxn = await gameContract.timewithdraw();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
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
                
            With your ❤️ note: {incomingMessage}
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
            Are you sure you want to cancel your decision?
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
                    
                    <Text
                                  bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                                  bgClip='text'
                                  fontSize='2xl'
                                  fontWeight='extrabold'>
                                  You can now execute marriage contract! 
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
                    onClick={onOpen}
                    _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',  
                    }}
                  >
                    Execute
                  </Box>
                  <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader> Transaction Details: </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Stack spacing={2}>
                                <Text fontSize='2xl'>Family stake:.......................{characterNFT.stake} ETH </Text>
                                <Text fontSize='2xl'>Your Gift:..............................{characterNFT.gift} ETH</Text>
                                <Text fontSize='2xl'>Developer comission (1%):.....{(Number(characterNFT.stake)+ Number(characterNFT.gift))*1.01 - (Number(characterNFT.stake)+ Number(characterNFT.gift))} ETH</Text>
                                <Text fontSize='2xl'> Estimated NFT Certificate Transaction fee (max):............................. 0.6 ETH</Text>
                                <Divider />
                                <Text fontSize='3xl'>Total:....................... {(Number(characterNFT.stake)+ Number(characterNFT.gift))*1.01+0.6} ETH</Text>
                                </Stack>
                                <Divider />
                    
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' mr={3} onClick={onClose}>
                            Close
                            </Button>
                            <Button colorScheme='blue'

                            onClick={execute} 
                            >Proceed</Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                  
                  </HStack>
                  </Center>
                    </Box>
                  </SimpleGrid>
                )
            }else if (characterNFT.ProposalStatus === 4 && characterNFT.DivorceStatus === 0 ) {
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
                                <GridItem colSpan={4}> 
                                <Text
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    bgClip='text'
                                    fontSize='3xl'
                                    fontWeight='bold'>
                                    Add ETH to Family Stake
                                </Text>
                                <HStack>
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
        
                                <Box
                                            as='button'
                                            p={3}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            borderWidth='2px'
                                            maxW='md'
                                            bgGradient='linear(to-r, teal.500, green.500)'
                                            onClick={addStake}
                                            _hover={{
                                            bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                            }}
                                            >
                                            Add
                                </Box>
                                </HStack>
                                </GridItem> 
                                <GridItem colSpan={4} >
        
                               
        
                                </GridItem> 
                                
                                </Grid>
                    
                );
        
            } else if (characterNFT.ProposalStatus === 4 && characterNFT.DivorceStatus === 1 ) {
                return(
                    <Grid
                                h='200px'  
                                templateRows='repeat(2, 1fr)'
                                templateColumns='repeat(4, 1fr)'
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
                        
                                <GridItem colSpan={4}> 
                                <Box>
                                <Text
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    bgClip='text'
                                    fontSize='3xl'
                                    fontWeight='bold'>
                                    Add ETH to Family Stake
                                </Text>
                                <HStack>
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
        
                                <Box
                                            as='button'
                                            p={3}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            borderWidth='2px'
                                            maxW='md'
                                            bgGradient='linear(to-r, teal.500, green.500)'
                                            onClick={addStake}
                                            _hover={{
                                            bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                            }}
                                            >
                                            Add
                                </Box>
                                </HStack>
                                </Box>
                                </GridItem> 
                                <GridItem colSpan={4} >
                                <Text
                                     bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    bgClip='text'
                                    fontSize='3xl'
                                    fontWeight='bold'>
                                   Press to claim Family Budget if there were no Response in 90 days.
                                </Text>
        
                                <Box
                                            as='button'
                                            p={3}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            borderWidth='2px'
                                            maxW='md'
                                            bgGradient='linear(to-r, teal.500, green.500)'
                                            onClick={timoutwithdraw}
                                            _hover={{
                                            bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                            }}
                                            >
                                            Timout withdraw
                                </Box>
        
        
                                </GridItem> 
                                
                                </Grid>
                    
                );
        
            } else if (characterNFT.ProposalStatus === 4 && characterNFT.DivorceStatus === 2 ) {
                return(
                    <Grid
                                h='200px'  
                                templateRows='repeat(2, 1fr)'
                                templateColumns='repeat(4, 1fr)'
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
                                <GridItem colSpan={4}> 
                                <Text
                                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                                    bgClip='text'
                                    fontSize='3xl'
                                    fontWeight='bold'>
                                    Add ETH to Family Stake
                                </Text>
                                <HStack>
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
        
                                <Box
                                            as='button'
                                            p={3}
                                            color='white'
                                            fontWeight='bold'
                                            borderRadius='md'
                                            borderWidth='2px'
                                            maxW='md'
                                            bgGradient='linear(to-r, teal.500, green.500)'
                                            onClick={addStake}
                                            _hover={{
                                            bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                            }}
                                            >
                                            Add
                                </Box>
                                </HStack>
                                </GridItem> 
                                <GridItem colSpan={4} >

                                <Box  height='80px'>
                                            
                                            <Center>
                                            <VStack spacing='10px' >
                                            <Text
                                                            bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                                                            bgClip='text'
                                                            fontSize='2xl'
                                                            fontWeight='extrabold'>
                                                            Please respond to Divorce proposal?
                                                </Text>
                                            <RadioGroup 
                                            value={divresponse}
                                            onChange={setdivresponse}
                                            name="form-name" >
                                                <Stack spacing={10} direction='row'>
                                                    <Radio size='lg' value='1' colorScheme='orange'>
                                                        <Text
                                                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                                                            bgClip='text'
                                                            fontSize='2xl'
                                                            fontWeight='extrabold'>
                                                            Accept
                                                        </Text>
                                                    </Radio>
                                                    <Radio size='lg' value='2' colorScheme='orange'>
                                                    <Text
                                                            bgGradient='linear(to-l, #7928CA, #FF0080)'
                                                            bgClip='text'
                                                            fontSize='2xl'
                                                            fontWeight='extrabold'>
                                                           Decline
                                                        </Text>
                                                    </Radio>
                                                    
                                                </Stack>
                                            </RadioGroup>
                                            </VStack>
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
                                            onClick={onOpened2}
                                            _hover={{
                                            bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                            }}
                                            >
                                            Respond
                                            </Box>

                                            <Modal isOpen={isOpened2} onClose={onClosed2}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                    <ModalHeader>Send a note </ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                    
                                                <Textarea
                                                    value={message}
                                                    onChange={e => setMessage(e.target.value)}
                                                    placeholder='Include a memorable note'
                                                    size='sm'
                                                />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button variant='ghost' mr={3} onClick={onClosed2}>
                                                        Close
                                                        </Button>
                                                        <Button colorScheme='blue'

                                                        onClick={responddiv} 
                                                        >Send</Button>
                                                    </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </HStack>
                                            </Center>
                                            </Box>
                               
        


        
                                </GridItem> 
                                
                                </Grid>
                    
                );
        
            }







    }





return(
<Box height='600px'> 
    {renderContent2()}

</Box>

);



};

export default Execute;