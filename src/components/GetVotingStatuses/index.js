import React, { useEffect, useState} from 'react';
import { FcInfo,
    FcApproval,
    FcDisapprove,
    FcCancel,
    FcPaid,
    FcExpired,
    FcHighPriority,
    FcIdea,
    FcMoneyTransfer
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
   
    createStandaloneToast,
    Spinner,
    Center,
    Tooltip,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb

  } from '@chakra-ui/react'

const GetVotingStatuses = ({gameContract, currentAccount,waver,proposed}) => {

    const [votingData, setvotingData] = useState ([])
    const [lovValue, setlovValue] = useState (0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { 
        isOpen: isOpen2, 
        onOpen: onOpen2, 
        onClose: onClose2 
      } = useDisclosure()

    const toast = createStandaloneToast()
    const [lovBalance, setlovBalance] = useState();

   


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
                voteType: names.voteType,
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
            onOpen2();
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
              onClose2();
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
            onOpen2();

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
               onClose2();
           };

           const disagreeVoting = async (_id) => {
            onOpen2();
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
               onClose2();
               
           };

           const endVotingByTime = async (_id) => {
            onOpen2();

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
               onClose2();
           };
           
           const executeVoting = async (_id) => {
            onOpen2();

            console.log(_id)
             try {
                 const waveTxn = await gameContract.executeVoting(_id);
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
               onClose2();
           };

    const renderMints = () => {

        
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
                                                { mint.voteType === 1 ?(
                                                    <Tooltip label='Idea' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcIdea/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                { mint.voteType === 2 ?(
                                                    <Tooltip label='Money Transfer' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcMoneyTransfer/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                { mint.voteType === 3 ?(
                                                    <Tooltip label='Divorce!' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcHighPriority/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }
                                                
                                                { mint.voteStatus === 1 ?(
                                                    <Tooltip label='Proposal Initiated' fontSize='md' placement='right' shouldWrapChildren>
                                                    <FcInfo/>
                                                    </Tooltip>
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
                                                { (mint.timestamp + mint.voteends)*1000 < Date.now() && mint.voteStatus === 1 ?(
                                                     <Tooltip label='Voting Expired' fontSize='md' placement='right' shouldWrapChildren>
                
                                                    <FcExpired/>
                                                    </Tooltip>
                                                    )
                                                : null
                                                }



                                            </Stack>

                                            <Stack
                                                direction={{ base: 'column', md: 'column' }}
                                                justifyContent="space-between">
                                                <Stack>
                                                <Text color = "blue.500"
                                                fontWeight="bold" fontSize={{ base: 'md' }} textAlign={'left'} maxW={'4xl'}>
                                                {mint.voteProposalText}

                                                </Text>
                                                { mint.voteType === 2 ?(
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
                                                    <ModalHeader>Decline proposal. </ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                    <Text fontWeight='bold' mb='1rem' color = 'blue.500'>
                                                    Your Balance: {lovBalance} LOV Tokens
                                                        </Text>
                                                     
                                                            <Box>
                                                        <Text fontWeight='bold' mb='1rem' color = 'blue.500'>
                                                         Select LOV tokens:
                                                        </Text>

                                                        <Slider
                                                                    flex='1'
                                                                    focusThumbOnChange={false}
                                                                    value={lovValue}
                                                                    onChange={(e) => setlovValue((e))}
                                                                    max={lovBalance} 
                                                                >
                                                                    <SliderTrack>
                                                                    <SliderFilledTrack />
                                                                    </SliderTrack>
                                                                    <SliderThumb fontSize='sm' boxSize='32px' children={lovValue} />
                                                                </Slider>

                                                                <Text mb='1rem' color = 'red'>
                                                                *You need to overbid with your LOV tokens to decline the proposal.
                                                                </Text>

                                                               
                                                        </Box>
                                                       
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
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
                                                   Accept proposal due to expiration.
                                                </Button>
                                                
                                                </Stack>)
                                                : null
                                                }

                                                </Stack>)
                                                : null
                                                }
                                                { 
                                                 mint.voteStatus === 2 &&
                                                  mint.voteType !==1 ? (
                                                   
                                                    <Stack direction={{ base: 'column', md: 'row' }}>
                                                <Button variant="outline" colorScheme="green" onClick={()=>{executeVoting(mint.id);}}>
                                                    Finalize Proposal
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
<Modal isCentered isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader> Transaction in process...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Center> <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
                  
                /></Center>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose2}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
{renderMints()}

    </Box>


)
}
export default GetVotingStatuses;