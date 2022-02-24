import { ReactNode} from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  createStandaloneToast,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Center

} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';


 // eslint-disable-next-line 
function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}




export default function NFTPricing({gameContract, setMintedNFT}) {
    const toast = createStandaloneToast()
   
    const { isOpen, onOpen, onClose } = useDisclosure()


   
    const MintCertificate = async () => {
        onOpen()
         try {
          
             const waveTxn = await gameContract.MintCertificate();
             console.log("Mining...", waveTxn.hash);
             await waveTxn.wait();
             console.log("Mined -- ", waveTxn.hash);

             setMintedNFT(true);
             toast({
              title: 'Status update',
              description: "Your NFT has been minted!",
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
           onClose()
       };
      

  return (
    <Box py={12}>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Minting NFT.</ModalHeader>
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
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          Please Select NFT Certificate type
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          All NFTs are stored on the Ethereum Chain. 
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              General
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
              Ξ
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0.1
              </Text>
              
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                100% Stored on the Ethereum Chain.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
               On chain verified ENS name support
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Relentless Heart Beat animation. 
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline" onClick={MintCertificate}>
                Mint General
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                bg={useColorModeValue('red.300', 'red.700')}
                px={3}
                py={1}
                color={useColorModeValue('gray.900', 'gray.300')}
                fontSize="sm"
                fontWeight="600"
                rounded="xl">
                Most Popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Rare
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                Ξ
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  1
                </Text>
                
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  All properties of General NFTs 
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Rare Gradient Heart Beat animation.
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Store Proposal Love Messages within the NFT.
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Updatable Marriage Statuses
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  1 Ξ worth - 100 LOV tokens are split among Partners  
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" onClick={MintCertificate}>
                  Mint Rare
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Super Rare
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
              Ξ
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                10
              </Text>
              
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                All properties of Rare NFTs 
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Super Rare Artist curated designs and animations.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                10 Ξ worth - 1000 LOV tokens are split among Partners
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline" onClick={MintCertificate}>
               Mint Super Rare
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  );
}