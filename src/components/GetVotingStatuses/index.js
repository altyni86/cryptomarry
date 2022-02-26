import React, { useEffect, useState} from 'react';
import { FcInfo,
    FcApproval,
    FcDisapprove,
    FcCancel,
    FcPaid
 } from 'react-icons/fc';


import {    
    Box,
    Text,
    Stack,
    Button,
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
    createStandaloneToast,
    Spinner,
    Center,
    Tooltip

  } from '@chakra-ui/react'

const GetVotingStatuses = ({gameContract, currentAccount,waver,proposed}) => {

    const [votingData, setvotingData] = useState ([])
    const [lovValue, setlovValue] = useState (0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = createStandaloneToast()
    const [lovBalance, setlovBalance] = useState();

    const [isLoading, setIsLoading] = useState(false);


    const fetchVotingMetadata = async () => {
        
    
        try {
        const names = await gameContract.getVotingStatuses(waver,proposed);
        console.log("Voting Status ",names);
        
        //0xDD16309DAF055F2fbb94CDF31ed369e9B70600c8

        const mintRecords = await Promise.all(names.map(async (names) => {
			
			return {
                id: names.id.toNumber(),
                proposer: names.proposer,
                responder: names.responder,
                tokenVoteQuantity: names.tokenVoteQuantity,
                voteProposalText: names.voteProposalText,
                voteStatus: names.voteStatus,
                timestamp: names.timestamp.toNumber(), 
                voteends: names.voteends.toNumber(), 
                receiver: names.receiver,
                amount: names.amount.toNumber(),

			};
		}));
        console.log("Votes FETCHED ", mintRecords);
		setvotingData(mintRecords);
         

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
        fetchVotingMetadata();
        
        
      // eslint-disable-next-line 
        }, [currentAccount]);

        useEffect(() => {

            const onNewVoting = async (id, proposer, responder, voteStatus, time) => {
                console.log("Incoming voting message with:",id, proposer, responder, voteStatus, time);
              
                if ( proposer.toUpperCase() === currentAccount.toUpperCase() ||responder.toUpperCase() === currentAccount.toUpperCase() ) {
                    fetchVotingMetadata();
                  
                    toast({
                      title: 'Voting Status has been updated',
                      description: "Your request has been sent",
                      status: 'info',
                      duration: 9000,
                      isClosable: true,
                    })
                  
                  } else {
                    console.log('Other users event.');}
        
                } 
                if (gameContract) {
                    /*
                     * Setup NFT Minted Listener
                     */
                    gameContract.on('VoteStatus', onNewVoting);
                    fetchLovBalance();
                  }
                
                  return () => {
                    /*
                     * When your component unmounts, let/s make sure to clean up this listener
                     */
                    if (gameContract) {
                        
                      gameContract.off('VoteStatus', onNewVoting);
                      
                    }
                  };
                // eslint-disable-next-line
        }, [gameContract]);


        const agreeVoting = async (_id) => {
            setIsLoading(true);

           console.log(_id)
            try {
                const waveTxn = await gameContract.agreeVoting(_id);
                console.log("Mining...", waveTxn.hash);
                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);
        
        
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


          const fetchLovBalance = async () => {
            console.log('Checking LOV Balance of the:', currentAccount);
            try {
            const txn2 = await gameContract.balanceOf(currentAccount);
            console.log("LOV Balance is:", txn2.toNumber());
            setlovBalance(txn2.toNumber());
        
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

          const cancelVoting = async (_id) => {
            setIsLoading(true);

            console.log(_id)
             try {
                 const waveTxn = await gameContract.cancelVoting(_id);
                 console.log("Mining...", waveTxn.hash);
                 await waveTxn.wait();
                 console.log("Mined -- ", waveTxn.hash);
         
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

           const disagreeVoting = async (_id) => {
            setIsLoading(true);
            console.log(_id)
             try {
                 const waveTxn = await gameContract.disagreeVoting(_id,lovValue);
                 console.log("Mining...", waveTxn.hash);
                 await waveTxn.wait();
                 console.log("Mined -- ", waveTxn.hash);
                 onClose();
                 
         
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

           const endVotingByTime = async (_id) => {
            setIsLoading(true);

            console.log(_id)
             try {
                 const waveTxn = await gameContract.endVotingByTime(_id);
                 console.log("Mining...", waveTxn.hash);
                 await waveTxn.wait();
                 console.log("Mined -- ", waveTxn.hash);
         
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
           
           const executeTransfer = async (_id) => {
            setIsLoading(true);

            console.log(_id)
             try {
                 const waveTxn = await gameContract.executeTransfer(_id);
                 console.log("Mining...", waveTxn.hash);
                 await waveTxn.wait();
                 console.log("Mined -- ", waveTxn.hash);
         
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

    const renderMints = () => {

        if (isLoading) {return <Center> <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            
          /></Center>}
     
        if (currentAccount && votingData.length > 0) {
            return (
        <Box>
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='3xl'
            fontWeight='extrabold'
            > Voting Proposals:</Text>
             {votingData.slice().reverse().map((mint, index) => {
                    
                                return (
                                    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm" key = {index} >
                                            <Stack direction="row" alignItems="center" >
                                                <Text fontWeight="semibold">Proposal #{votingData.length - index}</Text>
                                                { mint.voteStatus === 1 ?(
                                                    <FcInfo/>
                                                    )
                                                : null
                                                }
                                                { mint.voteStatus === 2 ?(
                                                    <Tooltip label='Accepted' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcApproval/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                { mint.voteStatus === 3 ?(
                                                    <Tooltip label='Declined' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcCancel/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                { mint.voteStatus === 4 ?(
                                                    <Tooltip label='Cancelled' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcDisapprove/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                { mint.voteStatus === 5 ?(
                                                     <Tooltip label='Paid' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcPaid/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                            </Stack>

                                            <Stack
                                                direction={{ base: 'column', md: 'column' }}
                                                justifyContent="space-between">
                                                <Stack>
                                                <Text color = "green.500"
                                                fontWeight="bold" fontSize={{ base: 'md' }} textAlign={'left'} maxW={'4xl'}>
                                                {mint.voteProposalText}

                                                </Text>
                                                { mint.amount > 0 ?(
                                                    <Stack>
                                                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                                                    Amount to be transferred from the family budget: {mint.amount/1000000000} ETH
                                                    </Text>
                                                    <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                                                    To Account: {mint.receiver}
                                                    </Text>
                                                    </Stack>
                                                    )
                                                : null
                                                }
                                                <Text fontSize={{ base: 'sm' }} textAlign={'left'} maxW={'4xl'}>
                                                Vote ends: {Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format((mint.timestamp+mint.voteends)*1000)} 
                                                </Text>
                                                

                                                </Stack>
                                                
                                                { mint.responder.toLowerCase() === currentAccount.toLowerCase() && mint.voteStatus === 1 ?(
                                                    <Stack direction={{ base: 'column', md: 'row' }}>
                                                <Button variant="outline" colorScheme="red" onClick={onOpen}>
                                                    Decline
                                                </Button>
                                                <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                    <ModalHeader>Decline vote proposal # {votingData.length-index}</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Text fontWeight='bold' mb='1rem'>
                                                        You need to overbid with your LOV tokens to decline the proposal.
                                                        </Text>
                                                        <NumberInput
                                                            onChange={(e) => setlovValue((e))}
                                                            value={lovValue}
                                                        >
                                                            <NumberInputField />
                                                            <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                            </NumberInputStepper>
                                                        </NumberInput>
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button colorScheme='green' mr={3} onClick={onClose}>
                                                        Close
                                                        </Button>
                                                        <Button variant='ghost' onClick={()=>{disagreeVoting(mint.id);}} >Decline</Button>
                                                    </ModalFooter>
                                                    </ModalContent>
                                                </Modal>


                                                <Button colorScheme="green" onClick={()=>{agreeVoting(mint.id);}}>Accept</Button>
                                                </Stack>)
                                                : null
                                                }

                                                { mint.proposer.toLowerCase() === currentAccount.toLowerCase() && mint.voteStatus === 1 ?(
                                                    <Stack direction={{ base: 'column', md: 'row' }}>
                                                <Button variant="outline" colorScheme="yellow" onClick={()=>{cancelVoting(mint.id);}}>
                                                    Cancel
                                                </Button>
                                                {  mint.proposer.toLowerCase() === currentAccount.toLowerCase() &&
                                                (mint.timestamp + mint.voteends)*1000 < Date.now() && mint.voteStatus === 1 ?(
                                                   
                                                    <Stack direction={{ base: 'column', md: 'row' }}>
                                                <Button variant="outline" colorScheme="green" onClick={()=>{endVotingByTime(mint.id);}}>
                                                    End voting by deadline
                                                </Button>
                                                
                                                </Stack>)
                                                : null
                                                }

                                                </Stack>)
                                                : null
                                                }
                                                { mint.proposer.toLowerCase() === currentAccount.toLowerCase() &&
                                                 mint.voteStatus === 2 &&
                                                  mint.amount>0 ? (
                                                   
                                                    <Stack direction={{ base: 'column', md: 'row' }}>
                                                <Button variant="outline" colorScheme="green" onClick={()=>{executeTransfer(mint.id);}}>
                                                    Execute transfer
                                                </Button>
        
                                                </Stack>)
                                                : null
                                                }  

                                            </Stack>
                                           </Stack>
                                     
                                  )
                        })}

        </Box>
        )
        }
        };

return (
    <Box>

{renderMints()}

    </Box>


)
}
export default GetVotingStatuses;