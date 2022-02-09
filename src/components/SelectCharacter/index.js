import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { transformCharacterData } from '../../constants';
import myEpicGame from '../../utils/marriages.json';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Text,
   
    Box,
    

  } from '@chakra-ui/react'

  import { Formik, Form, Field} from 'formik';


const SelectCharacter = ({gameContract, currentAccount,setCharacterNFT}) => {
  
  //const [gameContract, setgameContract] = useState(null);
  const [address, setaddress] = useState("");
  const [stake, setstake] = useState("");
  const [gift, setgift] = useState("0");
  const [message, setMessage] = useState("");
 
/*
  // UseEffect
  useEffect(() => {
    const { ethereum } = window;
  
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        ContractAddress,
        myEpicGame.abi,
        signer
      )
      setgameContract(gameContract) 


    } else {
      console.log('Ethereum object not found');
    }
  }, [ContractAddress]);


*/

  const wave = async () => {
    try {
        console.log(address, stake,gift,message);
        const waveTxn = await gameContract.wave(address, stake,gift, message );
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

      } catch (error) {
        console.log(error)
        alert(`You did not fill all required fields ${error}`);
      }

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
      } else if (isNaN(values.gift)) {
        errors.gift = 'Gift must be a Number'
      } else if (ethers.utils.isAddress(values.name) && !isNaN(values.stake) &&  !isNaN(values.gift)) {
        setaddress(values.name);
        setstake(Number(values.stake) *1000000000);
        setgift(Number(values.gift)*1000000000);
        setMessage(values.message);
      } 
      return errors
    }

  
  


  return (


    
<Box>


<Box>
<Text
      bgGradient='linear(to-l, #7928CA, #FF0080)'
    bgClip='text'
    fontSize='5xl'
    fontWeight='extrabold'>
    Propose your loved one today!
</Text>

</Box>

<Box  >
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
                  
                <Text
            bgGradient= 'linear(to-r, green.200, pink.500)'
            bgClip='text'
            fontSize='2xl'
            fontWeight='bold'>
            Wallet Address ❤️
                </Text>
                  
                  
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

                <Text
                      bgGradient= 'linear(to-r, green.200, pink.500)'
                      bgClip='text'
                      fontSize='2xl'
                      fontWeight='bold'>
                      Family Staking 💰
                </Text>
                  
                  
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
                <Text
                      bgGradient= 'linear(to-r, green.200, pink.500)'
                      bgClip='text'
                      fontSize='2xl'
                      fontWeight='bold'>
                      Gift to your Partner 💍
                </Text>
                  
                  
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

                <Text
                      bgGradient= 'linear(to-r, green.200, pink.500)'
                      bgClip='text'
                      fontSize='2xl'
                      fontWeight='bold'>
                      Include your love note! 
                </Text>
        
                  
                  </FormLabel>
                <Input {...field} id='gift' placeholder='Write your message to a loved one'
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
      

</Box>
  );

  }
export default SelectCharacter;