import React, { useEffect, useState } from "react";

import { transformCharacterData } from "../../constants";

import ENScheck from "../../components/ENScheck";
import GetVotingStatuses from "../../components/GetVotingStatuses";
import { FcAbout } from "react-icons/fc";

import {
  SimpleGrid,
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
  Spinner,
  createStandaloneToast,
  Tooltip,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import Confetti from "react-confetti";

const Arena = ({
  Signer,
  gameContract,
  Provider,
  currentAccount,
  userBeenProposed,
  setuserBeenProposed,
}) => {
  // State

  const [response, setresponse] = useState("1");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [incomingMessage, SetincomingMessage] = useState("");
  const [outgoingMessage, SetoutgoingMessage] = useState("");
  const [hasENS, sethasENS] = useState(0);

  // eslint-disable-next-line
  const [mxarray, setmxarray] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  const toast = createStandaloneToast();

  const {
    isOpen: isOpened,
    onOpen: onOpened,
    onClose: onClosed,
  } = useDisclosure();

  useEffect(() => {
    getMessages();
    const onNewWave = async (
      id,
      waver,
      proposed,
      sender,
      message,
      time,
      vid
    ) => {
      console.log(
        "Incoming message with:",
        id,
        waver,
        proposed,
        sender,
        message,
        time,
        vid
      );
      if (
        gameContract &&
        proposed.toUpperCase() === currentAccount.toUpperCase()
      ) {
        const txn = await gameContract.checkIfUserHasBeenProposed();
        if (txn.ProposalStatus !== 0) {
          console.log("Status has been updated");
          setuserBeenProposed(transformCharacterData(txn));
        } else if (txn.ProposalStatus === 0) {
          alert(`Your marriage has been annuled.`);
          window.location.reload(false);
        }
      } else {
        console.log("Other users event.");
      }
    };

    if (gameContract) {
      gameContract.on("NewWave", onNewWave);
    }

    return () => {
      if (gameContract) {
        gameContract.off("NewWave", onNewWave);
      }
    };
    // eslint-disable-next-line
  }, [gameContract]);

  const respond = async () => {
    setIsLoading(true);
    try {
      const waveTxn = await gameContract.approvals(message, response, hasENS);
      console.log("Response", message, response);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: `${error.message}`,
        description: "Transaction has not been completed",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
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
      console.log(error);
      toast({
        title: `${error.message}`,
        description: "Transaction has not been completed",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const getMessages = async () => {
    var mxarray = [];
    // eslint-disable-next-line
    const myAddress = await Signer.getAddress();
    const filterFrom = gameContract.filters.NewWave(
      null,
      null,
      myAddress,
      null,
      null,
      null
    );
    const query = await gameContract.queryFilter(filterFrom, -1000000);

    if (query.length > 0) {
      for (let i = 0; i < query.length; i++) {
        const { waver, proposed, from, message, timestamp, vid } =
          query[i].args;

        mxarray.push({
          id: i,
          waver: waver,
          proposed: proposed,
          from: from,
          message: message,
          time: Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(timestamp.toNumber() * 1000),
          vid: vid,
        });
      }
    }
    setmxarray(mxarray);
    console.log("Messages are in this array", mxarray);
    try {
      SetincomingMessage(
        mxarray.filter((data) => data.vid === 1).slice(-1)[0].message
      );
    } catch (error) {
      console.log("Not Found Incoming Message");
    }
    try {
      SetoutgoingMessage(
        mxarray.filter((data) => data.vid === 2).slice(-1)[0].message
      );
    } catch (error) {
      console.log("Not Found Outgoing Message");
    }
  };

  const { width, height } = window.innerWidth;

  const renderContent3 = () => {
    if (userBeenProposed.ProposalStatus === 1) {
      return (
        <SimpleGrid columns={1} spacing={8}>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={200}
            recycle={false}
          />

          <Box height="200px">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="5xl"
              fontWeight="extrabold"
            >
              Congratulations!
            </Text>

            <Text
              bgGradient="linear(to-r, green.200, pink.500)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              {userBeenProposed.waver.slice(0, 4)}...
              {userBeenProposed.waver.slice(
                userBeenProposed.waver.length - 4,
                userBeenProposed.waver.length
              )}
            </Text>

            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              has proposed you.
            </Text>
          </Box>
          <Box height="80px">
            <Text
              bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
              bgClip="text"
              fontSize="4xl"
              borderWidth="2px"
              fontWeight="extrabold"
            >
              With a ❤️ note: {incomingMessage}
            </Text>
          </Box>

          <Box height="100px">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              As a committment to partnership {userBeenProposed.stake} ETH is
              being deposited and {userBeenProposed.gift} ETH was offered as a
              gift to you!
            </Text>
          </Box>

          <Box height="80px">
            <Center>
              <VStack spacing="10px">
                <Text
                  bgGradient="linear(to-r, green.500, green.800)"
                  bgClip="text"
                  fontSize="2xl"
                  fontWeight="extrabold"
                >
                  Do you accept this proposal?
                </Text>
                <RadioGroup
                  value={response}
                  onChange={setresponse}
                  name="form-name"
                >
                  <Stack spacing={10} direction="row">
                    <Radio size="lg" value="1" colorScheme="orange">
                      <Text
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                      >
                        Yes
                      </Text>
                    </Radio>
                    <Radio size="lg" value="0" colorScheme="orange">
                      <Text
                        bgGradient="linear(to-l, #7928CA, #FF0080)"
                        bgClip="text"
                        fontSize="2xl"
                        fontWeight="extrabold"
                      >
                        No
                      </Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </VStack>
            </Center>
          </Box>
          <Box height="80px">
            <Center>
              <VStack spacing="5px">
                <Box>
                  <ENScheck
                    Provider={Provider}
                    currentAccount={currentAccount}
                    hasENS={hasENS}
                    sethasENS={sethasENS}
                  />
                </Box>

                <Box
                  as="button"
                  p={4}
                  color="white"
                  fontWeight="bold"
                  borderRadius="md"
                  borderWidth="2px"
                  maxW="lg"
                  bgGradient="linear(to-r, teal.500, green.500)"
                  onClick={onOpen}
                  _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                  }}
                >
                  Respond
                </Box>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <HStack>
                        <Text>Send a short note ❤️.</Text>
                        <Tooltip
                          label="Include memorable message to your partner that will be stored on Ethereum chain forever!"
                          fontSize="md"
                          placement="right"
                          shouldWrapChildren
                        >
                          <FcAbout />
                        </Tooltip>
                      </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {!isLoading ? (
                        <Box>
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Include a memorable note"
                            size="sm"
                          />
                        </Box>
                      ) : (
                        <Center>
                          {" "}
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Center>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="ghost" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button colorScheme="blue" onClick={respond}>
                        Send
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Center>
          </Box>
        </SimpleGrid>
      );
    } else if (userBeenProposed.ProposalStatus === 3) {
      return (
        <SimpleGrid columns={1} spacing={8}>
          <Box height="200px">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="5xl"
              fontWeight="extrabold"
            >
              Congratulations!
            </Text>

            <Text
              bgGradient="linear(to-r, green.200, pink.500)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              {userBeenProposed.waver.slice(0, 4)}...
              {userBeenProposed.waver.slice(
                userBeenProposed.waver.length - 4,
                userBeenProposed.waver.length
              )}
            </Text>

            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              has proposed you.
            </Text>
          </Box>
          <Box height="80px">
            <Text
              bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
              bgClip="text"
              fontSize="4xl"
              borderWidth="2px"
              fontWeight="extrabold"
            >
              Your ❤️ note: {outgoingMessage}
            </Text>
          </Box>

          <Box height="100px">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              As a committment to partnership {userBeenProposed.stake} ETH is
              being deposited and {userBeenProposed.gift} ETH was offered as a
              gift to you!
            </Text>
          </Box>

          <Box height="40px">
            <Center>
              <Text
                bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
                bgClip="text"
                fontSize="2xl"
                fontWeight="extrabold"
              >
                Great! Your loved one will execute the marriage contract soon!
              </Text>
            </Center>
          </Box>
          <Box height="80px">
            <Center>
              <HStack spacing="50px">
                <Box
                  as="button"
                  p={4}
                  color="white"
                  fontWeight="bold"
                  borderRadius="md"
                  borderWidth="2px"
                  maxW="lg"
                  bgGradient="linear(to-r, teal.500, green.500)"
                  onClick={onOpened}
                  _hover={{
                    bgGradient: "linear(to-r, red.500, yellow.500)",
                  }}
                >
                  Cancel
                </Box>
                <AlertDialog
                  motionPreset="slideInBottom"
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
                      {!isLoading ? (
                        <Box>
                          Are you sure you want to cancel your decision?
                        </Box>
                      ) : (
                        <Center>
                          {" "}
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                          />
                        </Center>
                      )}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClosed}>
                        No
                      </Button>
                      <Button colorScheme="red" ml={3} onClick={cancelmrg}>
                        Yes
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </HStack>
            </Center>
          </Box>
        </SimpleGrid>
      );
    } else if (
      userBeenProposed.ProposalStatus === 4 &&
      userBeenProposed.DivorceStatus === 0
    ) {
      return (
        <Grid
          h="200px"
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem colSpan={2}>
            <HStack>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
              >
                Dashboard
              </Text>
            </HStack>
          </GridItem>

          <GridItem colSpan={4}></GridItem>

          <GridItem colSpan={4}></GridItem>
        </Grid>
      );
    }
  };

  return (
    <Box height="1000px">
      <VStack>
        {renderContent3()}
        <Box>
          <GetVotingStatuses
            gameContract={gameContract}
            currentAccount={currentAccount}
            waver={userBeenProposed.waver}
            proposed={userBeenProposed.proposed}
          />
        </Box>
      </VStack>
    </Box>
  );
};
export default Arena;
