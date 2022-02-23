import React, { useEffect, useState } from 'react';

import {
    Text,
    Box,
    HStack,
    Radio, 
    RadioGroup,
    Stack,
    createStandaloneToast,
    Center,
    Spinner

  } from '@chakra-ui/react'

const ENScheck = ({Provider,currentAccount,hasENS,sethasENS}) => {

const toast = createStandaloneToast()

const [searchENS, setsearchENS] = useState(null);
const [isLoading, setIsLoading] = useState(false);

const ENSname = async () => {
    setIsLoading(true);
    try {
        const _ENSsearch = await Provider.lookupAddress(currentAccount);
        if (_ENSsearch == null) {
            console.log("ENS not found")
            toast({
                title: 'Status update',
                description: "ENS name not found",
                status: 'info',
                duration: 9000,
                isClosable: true,
              })
        } else {
            console.log("ENS found:",_ENSsearch)
            setsearchENS(_ENSsearch)
            toast({
                title: 'Status update',
                description: "ENS name found",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
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
      setIsLoading(false);
  };


useEffect(() => {
    let isMounted = true;
    if(isMounted ){
    ENSname(); }

    return () => {
        isMounted = false;
        };
    
  // eslint-disable-next-line 
    }, [currentAccount]);

    const renderContent = () => {
        if (isLoading) {return <Center> 
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            /></Center>} 

    if (searchENS!==null) {return (
            <Box>
        <Text>
            Your ENS name is: {searchENS}
         </Text>
         <HStack spacing={15}>
           <Text>
           Do you want to show your ENS in your NFT Certificate?
        </Text>
        <RadioGroup onChange={sethasENS} value={hasENS}>
          <Stack direction='row' spacing={5}>
            <Radio value='1'>Yes</Radio>
            <Radio value='0'>No</Radio>
          </Stack>
        </RadioGroup>
    
        </HStack>
        </Box>)}
        else {return( 
    <Text>
       ENS not found. 
    </Text>)}
    }

return (
    <Box>
        {renderContent()}
    </Box>
)


}
export default ENScheck;