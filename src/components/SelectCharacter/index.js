import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { transformCharacterData } from '../../constants';
import ENScheck from "../../components/ENScheck";
import { 
  FcAbout,
} from 'react-icons/fc';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Text,
    Box,
    createStandaloneToast,
    Spinner,
    Center,
    Tooltip,
    HStack
    

  } from '@chakra-ui/react'

  import { Formik, Form, Field} from 'formik';


const SelectCharacter = ({balanceETH, gameContract,Provider, currentAccount,setCharacterNFT}) => {
  
  //const [gameContract, setgameContract] = useState(null);
  const [address, setaddress] = useState("");
  const [stake, setstake] = useState("");
  const [gift, setgift] = useState(0);
  const [message, setMessage] = useState("");
  const [hasENS, sethasENS] = useState(0);
  //const [addressENS, setaddressENS] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 
  console.log("updated ENS status", hasENS)

  const toast = createStandaloneToast()

  const wave = async () => {
    setIsLoading(true);
    try {
        console.log(address, stake,gift,message);
        const waveTxn = await gameContract.wave(address, stake,gift, message,hasENS);
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


  useEffect(() => {
    

  const onNewWave = async (id, waver, proposed, sender, message, time,vid) => {
    console.log("Incoming message with:",id, waver,proposed, sender,message,time,vid);
    console.log(currentAccount)
    if (sender.toUpperCase() === currentAccount.toUpperCase()) {
      const txn = await gameContract.checkIfUserHasProposed();
      if (txn.ProposalStatus!==0){
        console.log('Status has been updated');
        alert(`Your proposal with message: ${message} to  proposer: ${proposed} has been sent`);
        setCharacterNFT(transformCharacterData(txn));} //else if (txn.ProposalStatus===0) { alert(`Your marriage has been annuled.`)
        //window.location.reload(false);}
      } else {
      console.log('Not your Wave');
    };
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
  
/*
const checkENS = async (_ensname) => {
  try {
  const _addressENS = await Provider.getResolver( _ensname ) 
if (_addressENS != null) {setaddressENS (_addressENS) }
 } catch (error) {
  console.log(error)

}}
*/

function validateWalletAddress(values) {
   
    const errors = {};
      if (!values.name) {
        errors.name = 'Wallet Address is required'
      } else if (!ethers.utils.isAddress(values.name)) { 
       errors.name = "Wallet Address is not valid"       
      } else if (!values.stake) {
        errors.stake = 'Stake is required'
      } else if (isNaN(values.stake)) {
        errors.stake = 'Stake must be a Number'
      }else if (balanceETH<(values.stake)) {
        errors.stake = 'Stake exceeds your ETH balance'
      } else if (isNaN(values.gift)) {
        errors.gift = 'Gift must be a Number'
      }else if (balanceETH<(values.gift)) {
        console.log("Balance is",balanceETH,values.gift+values.stake )
        errors.gift = 'Gift exceeds your ETH balance'
      }else if (!values.message) {
        errors.message = 'Please include a note'
      }else if (values.message.length>200) {
        errors.message = 'Love note cannot be higher than 200 symbols'
      } else if (ethers.utils.isAddress(values.name) && !isNaN(values.stake) &&  !isNaN(values.gift) && values.message.length<200 && balanceETH>values.stake) {
        setaddress(values.name);
        setstake(Number(values.stake) *1000000000);
        setgift(Number(values.gift)*1000000000);
        setMessage(values.message);
      } 
      return errors
    }




    const renderContent = () => {
      if (isLoading) {return <Center> 
          <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
          /></Center>} else 
          { return(<Box>
            <Box>

<FormControl>

<Formik
      initialValues={{ name: '', stake: '', gift: '0', message:''}}
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
          <Field name='name'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor='name'>
          <HStack>
                <Text
            bgGradient= 'linear(to-r, green.500, green.800)'
            bgClip='text'
            fontSize='2xl'
            fontWeight='bold'>
            Wallet Address ❤️
                </Text>
                <Tooltip label='Please enter wallet address of your partner. You might want to send some ETHs to your partner, since there are transaction fees to respond to your proposal. Both sides need to agree to mint Marriage Certificate.' fontSize='md' placement='right' shouldWrapChildren>
                                <FcAbout/>
                      </Tooltip>
                  </HStack>
                  
                  </FormLabel>
                <Input {...field} id='name' placeholder='Enter Partner*s Wallet Address'
                 />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

        
          <Field name='stake'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.stake && form.touched.stake}>
                <FormLabel htmlFor='stake'>
                  <HStack>
                <Text
                      bgGradient= 'linear(to-r, green.500, green.800)'
                      bgClip='text'
                      fontSize='2xl'
                      fontWeight='bold'>
                      Family Staking 💰
                </Text>
                <Tooltip label='This is your Family Staking to ensure that both sides are committed to the Marriage. In case of divorce this value will be split between partners. You can also jointly send ETHs from the Family Staking to make Money Transfers.' fontSize='md' placement='right' shouldWrapChildren>
                                <FcAbout/>
                      </Tooltip>
                  </HStack>
                  
                  </FormLabel>
                <Input {...field} id='stake' placeholder='Enter Marriage Staking'
                />
                <FormErrorMessage>{form.errors.stake}</FormErrorMessage>
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
                      fontWeight='bold'>
                      Gift to your Partner 💍
                </Text>
                  
                <Tooltip label='If the proposal is accepted Gift amount will be sent to your Partner from your wallet. It is like giving Diamond Ring 💍.' fontSize='md' placement='right' shouldWrapChildren>
                                <FcAbout/>
                      </Tooltip>
                  </HStack>
                  </FormLabel>
                <Input {...field} id='gift' placeholder='Enter Gift to Partner'
               />
                <FormErrorMessage>{form.errors.gift}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='message'>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.message && form.touched.message}>
                <FormLabel htmlFor='message'>
                <HStack>

                <Text
                      bgGradient= 'linear(to-r, green.500, green.800)'
                      bgClip='text'
                      fontSize='2xl'
                      fontWeight='bold'>
                      Include your love note! 
                </Text>
                <Tooltip label='Include memorable message to your partner that will be stored on Ethereum chain forever!' fontSize='md' placement='right' shouldWrapChildren>
                                <FcAbout/>
                      </Tooltip>
                  </HStack>
        
                  
                  </FormLabel>
                <Input {...field} id='message' placeholder='Write your message to a loved one. Max 200 symbols.'
               />
                <FormErrorMessage>{form.errors.message}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
            </Form>
      )}
         </Formik>

        </FormControl>

          </Box>

          <Box  p={5} color='white'>
        
          </Box>  

          <Box
                                    as='button'
                                    p={3}
                                    color='white'
                                    fontWeight='bold'
                                    borderRadius='md'
                                    borderWidth='2px'
                                    maxW='md'
                                    bgGradient='linear(to-r, teal.500, green.500)'
                                    onClick={wave}
                                    //isLoading={props.isSubmitting}
                                    _hover={{
                                    bgGradient: 'linear(to-r, red.500, yellow.500)',  
                                    }}
                                    >
                                    Submit
          
          </Box>
          </Box>)
       
          }
        
        
        
        }


  return (

    
<Box>

<Box>
<Text
      bgGradient='linear(to-l, #7928CA, #FF0080)'
    bgClip='text'
    fontSize='5xl'
    fontWeight='extrabold'>
    Propose your loved one on CryptoMarry.
</Text>

</Box>

<Box>
<Text
    bgGradient='linear(to-l, #7928CA, #FF0080)'
    bgClip='text'
    fontSize='2xl'
    fontWeight='extrabold'>
    ENS status:
</Text>
<ENScheck Provider={Provider} currentAccount={currentAccount} hasENS={hasENS} sethasENS = {sethasENS}/>

</Box>

{renderContent()}

</Box>
  );

  }
export default SelectCharacter;