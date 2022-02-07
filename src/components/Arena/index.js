import React, { useEffect, useState} from 'react';

import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/marriages.json';

import { SimpleGrid,
    Box,
    Text,
    Button,
    HStack,
    Center,
    Modal,
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


const Arena = ({ Provider, currentAccount, userBeenProposed, setuserBeenProposed }) => {
    // State
    const [gameContract, setgameContract] = useState(null);
    const [divresponse, setdivresponse] = useState(null);
    const [response, setresponse] = useState("1");
    const [message, setMessage] = useState("");
    const [value, setvalue] = useState("");
   // eslint-disable-next-line 
    const [isLoading, setIsLoading] = useState(false);
   
    const [incomingMessage, SetincomingMessage] = useState("")


    //const [ marray, setmarray] = useState([]);

    
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


  

    const format = (val) => `Ξ` + val;
    // eslint-disable-next-line 
    const parse = (val) => val.replace(/^\Ξ/, '')




    /*

toast({
  title: 'An error occurred.',
  description: 'Unable to create user account.',
  status: 'error',
  duration: 9000,
  isClosable: true,
})


    const crata = useMemo(
        () => marray,
        [marray],
      )
      
      
      const columns2 = useMemo(
        () => [
          {
            Header: 'ID',
            accessor: 'id',
            isNumeric: true,
          },
          {
            Header: 'Message',
            accessor: 'message',
            
          },
          {
            Header: 'To',
            accessor: 'proposed', 
          },
          {
            Header: 'Date/Time',
            accessor: 'time',
          },
         
        ],
        [marray],
      )

      const { 
        getTableProps: getTableProps2, 
        getTableBodyProps: getTableBodyProps2, 
        headerGroups: headerGroups2, 
        rows: rows2, 
        prepareRow: prepareRow2 } =
        useTable({ columns2, crata}, useSortBy)

  // UseEffects
  

   <Table {...getTableProps2()}>
      <Thead>
        {headerGroups2.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
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
      <Tbody {...getTableBodyProps2()}>
        {rows2.map((row) => {
          prepareRow2(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>

  */


    useEffect(() => {
        const { ethereum } = window;
    
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const gameContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            myEpicGame.abi,
            signer
          );
    
          setgameContract(gameContract);
    
        } else {
          console.log('Ethereum object not found');
        }
      }, []);


  useEffect(() => {

    const onNewWave = async (id, waver, proposed, sender, message, time,vid) => {
      console.log("Incoming message with:",id, waver,proposed, sender,message,time,vid);
      if (gameContract && proposed.toUpperCase() === currentAccount.toUpperCase()) {
        const txn = await gameContract.checkIfUserHasBeenProposed();
        if (txn.ProposalStatus!==0){
          console.log('Status has been updated');
          setuserBeenProposed(transformCharacterData(txn))
          SetincomingMessage(message);
          
          ;} else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
          window.location.reload(false);}
      } else {
        console.log('Other users event.');}
      }


    if (gameContract) {
     
      gameContract.on('NewWave', onNewWave);
     
     
    }

    return () => {
     
      if (gameContract) {
        gameContract.off('NewWave', onNewWave);
    
      }
    };
// eslint-disable-next-line 
  }, [gameContract]);

  const addStake = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
        const waveTxn = await gameContract.addstake( {value: ethers.utils.parseUnits(value, 'ether'),gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1000000});
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setIsLoading(false);

      } catch (error) {
        console.log(error)
      }
  };

  const respond = async () => {
    setIsLoading(true);
    try {
        const waveTxn = await gameContract.approvals(message,response);
        console.log("Response",message,response);
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
        const waveTxn = await gameContract.divorceresponse(divresponse, message, {gasPrice: ethers.utils.parseUnits('100', 'gwei'), gasLimit: 1500000});
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




const renderContent3 = () => {

    if (userBeenProposed.ProposalStatus === 1) {
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
  Congratulations! 
    </Text>

    <Text
  bgGradient='linear(to-r, green.200, pink.500)'
  bgClip='text'
  fontSize='4xl'
  fontWeight='extrabold'>
  {userBeenProposed.waver.slice(0, 4)}...{userBeenProposed.waver.slice(
    userBeenProposed.waver.length - 4,
    userBeenProposed.waver.length
  )}
    </Text>

    <Text
  bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  fontSize='4xl'
  fontWeight='extrabold'>
  has proposed you.
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
  As a committment to partnership {userBeenProposed.stake} ETH is being deposited and {userBeenProposed.gift} ETH was offered as a gift to you!
</Text>
  
  </Box>
  
  <Box  height='80px'>
  
  <Center>
  <VStack spacing='10px' >
  <Text
                 bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                bgClip='text'
                fontSize='2xl'
                fontWeight='extrabold'>
                Do you accept this proposal?
    </Text>
  <RadioGroup 
  value={response}
  onChange={setresponse}
  name="form-name" >
      <Stack spacing={10} direction='row'>
        <Radio size='lg' value='1' colorScheme='orange'>
             <Text
                 bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
                fontSize='2xl'
                fontWeight='extrabold'>
                Yes
            </Text>
        </Radio>
        <Radio size='lg' value='0' colorScheme='orange'>
        <Text
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                bgClip='text'
                fontSize='2xl'
                fontWeight='extrabold'>
                No
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
  onClick={onOpen}
  _hover={{
  bgGradient: 'linear(to-r, red.500, yellow.500)',  
  }}
>
  Respond
</Box>

<Modal isOpen={isOpen} onClose={onClose}>
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
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue'

             onClick={respond} 
            >Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</HStack>
</Center>
  </Box>
</SimpleGrid>
        )

    } else if (userBeenProposed.ProposalStatus === 3) { 
        return (
        <SimpleGrid columns={1} spacing={8}>
  
            <Box height='200px'>
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'>
            Congratulations! 
              </Text>
          
              <Text
            bgGradient='linear(to-r, green.200, pink.500)'
            bgClip='text'
            fontSize='4xl'
            fontWeight='extrabold'>
            {userBeenProposed.waver.slice(0, 4)}...{userBeenProposed.waver.slice(
              userBeenProposed.waver.length - 4,
              userBeenProposed.waver.length
            )}
              </Text>
          
              <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='4xl'
            fontWeight='extrabold'>
            has proposed you.
              </Text>
          
            </Box>
            <Box height='80px'>
            <Text
            bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
            bgClip='text'
            fontSize='4xl'
            borderWidth='2px'
            fontWeight='extrabold'>
            Your ❤️ note: {incomingMessage}
              </Text>
            </Box>
            
            <Box height='100px'>
            
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'>
            As a committment to partnership {userBeenProposed.stake} ETH is being deposited and {userBeenProposed.gift} ETH was offered as a gift to you!
          </Text>
            
            </Box>
            
            <Box  height='40px'>
            
            <Center>
            
            <Text
                           bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
                          bgClip='text'
                          fontSize='2xl'
                          fontWeight='extrabold'>
                          Great! Your loved one will execute the marriage contract soon! 
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



        )


    } else if (userBeenProposed.ProposalStatus === 4 && userBeenProposed.DivorceStatus === 0 ) {
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

    } else if (userBeenProposed.ProposalStatus === 4 && userBeenProposed.DivorceStatus === 2 ) {
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
    }else if (userBeenProposed.ProposalStatus === 4 && userBeenProposed.DivorceStatus === 1 ) {
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

/*
const getMessages = async () => {
    var txarray =[]
    const myAddress = await Provider.getAddress()
    
    const filterFrom = gameContract.filters.NewWave(null,myAddress,null)
    console.log(filterFrom)
    const query = await gameContract.queryFilter(filterFrom, -10000);
    
   
    if (query.length>0) {
      for (let i=0; i<query.length; i++) {
        const {message,proposed,timestamp} = query[i].args
        
        console.log(timestamp.toNumber(),proposed, message)
        
        txarray.push({
          id: i,
          message: message,
          proposed: proposed,
          time: Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp.toNumber()),
          })
      }
    }   
    await setmarray(txarray);
    console.log(marray)  
  }

*/





return(

<Box height='600px'> 
    {renderContent3()}

</Box>

   
/*
<Confetti
      width={width}
      height={height}
      numberOfPieces = {200}
      tweenDuration = {1000}
      
    />
*/


)

}
export default Arena;