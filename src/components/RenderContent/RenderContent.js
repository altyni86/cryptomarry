// Render Methods
import React, { useContext, useEffect, useState } from "react";
import { useSortBy, useTable } from "react-table";
// Components
import Identicon from "../identicon";
import { transformCharacterData } from "../../constants";
import { contractContext } from "../../Contexts/Contract";
import { mainContext } from "../../Contexts/MainContext";
import myEpicGame from "../../utils/marriages.json";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  createStandaloneToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  NumberInputStepper,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { ethers } from "ethers";

const RenderContent = () => {
  const {
    currentAccount,
    ethRequestCurrentAccount,
    familyStats,
    Provider,
    setProvider,
    setfamilyStats,
    setuserBeenProposed,
    wrongnetwork,
    setCharacterNFT,
    characterNFT,
    balanceETH,
    setbalanceETH,
  } = useContext(mainContext);
  const { ContractAddress, gameContract, setGameContract, currency } =
    useContext(contractContext);

  // const [characterNFT, setCharacterNFT] = useState(null);
  const [value, setvalue] = useState("");
  const [message, setMessage] = useState("");
  const [marriedto, setmarriedto] = useState("");
  const [imageNFT, setimageNFT] = useState([]);
  // const [currency, setcurrency] = useState("");
  const [familyBudget, setfamilyBudget] = useState("");
  const [txarray, settxarray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lovBalance, setlovBalance] = useState();
  const [lovBalancetimer, setlovBalancetimer] = useState();
  const [saleCap, setsaleCap] = useState();
  const [mintedNFT, setMintedNFT] = useState();
  const [voteMessage, setvoteMessage] = useState("");
  const [voteNumTokens, setvoteNumTokens] = useState();
  const [voteReceiver, setvoteReceiver] =
    useState(0x0000000000000000000000000000000000000000);
  const [voteAmount, setvvoteAmount] = useState(0);
  const [voteEnds, setvoteEnds] = useState();

  const toast = createStandaloneToast();
  const data = React.useMemo(() => txarray, [txarray]);

  useEffect(() => {
    FamilyEthBalance();
    // eslint-disable-next-line
  }, [currentAccount, familyStats]);

  //Balances update
  const FamilyEthBalance = async () => {
    const FamilybalanceInEth =
      Number(familyStats.FamilyBudget) / 1000000000000000000;
    setfamilyBudget(FamilybalanceInEth);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Date/Time",
        accessor: "time",
      },
      {
        Header: "Amount",
        accessor: "amount",
        isNumeric: true,
      },
    ],
    // eslint-disable-next-line
    [txarray]
  );

  const EthBalance = async () => {
    console.log(Provider, "asdasdasdsaasdasw21312312312");
    Provider.getBalance("latest").then((balance) => {
      // convert a currency unit from wei to ether
      const balanceInEth = ethers.utils.formatEther(balance);
      setbalanceETH(balanceInEth);
      console.log(`balance: ${balanceInEth} ETH`);
    });
  };

  const fetchNFTMetadata = async () => {
    console.log("Checking for Character NFT on address:", currentAccount);

    try {
      console.log(gameContract);
      const txn = await gameContract.checkIfUserHasProposed();
      console.log("Proposal Status ", txn.ProposalStatus, txn);

      if (txn.ProposalStatus !== 0) {
        console.log("User has Proposed");
        setCharacterNFT(transformCharacterData(txn));
        setfamilyStats(transformCharacterData(txn));

        console.log("Family Status is: ", familyStats);
      } else {
        console.log("User has not proposed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProposedtodata = async () => {
    console.log("Checking whether address was proposed", currentAccount);
    try {
      const txn2 = await gameContract.checkIfUserHasBeenProposed();

      if (txn2.ProposalStatus !== 0) {
        console.log("User has been Proposed to");
        setuserBeenProposed(transformCharacterData(txn2));
        setfamilyStats(transformCharacterData(txn2));

        console.log("Family Status is: ", familyStats);
      } else {
        console.log("User has not been proposed to");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /*
     * The function we will call that interacts with out smart contract
     */
    if (currentAccount && gameContract) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
      fetchProposedtodata();
      EthBalance();
      // eslint-disable-next-line
    }
  }, [gameContract, currentAccount]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  const finalRef = React.useRef();
  // const [currentAccount, setCurrentAccount] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  const {
    isOpen: isOpen6,
    onOpen: onOpen6,
    onClose: onClose6,
  } = useDisclosure();

  const {
    isOpen: isOpen7,
    onOpen: onOpen7,
    onClose: onClose7,
  } = useDisclosure();

  const {
    isOpen: isOpen8,
    onOpen: onOpen8,
    onClose: onClose8,
  } = useDisclosure();

  const parse = (val) => val.replace(/^\Ξ/, "");
  const format = (val) => `Ξ` + val;

  const connectWalletAction = async (method) => {
    await ethRequestCurrentAccount(method);
    window.location.reload();
  };

  useEffect(() => {
    if (currentAccount && familyStats) {
      setmarriedtofunction();
    }
    // eslint-disable-next-line
  }, [currentAccount, familyStats]);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ContractAddress !== "") {
      console.log("Your Contract address is: ", ContractAddress);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        ContractAddress,
        myEpicGame.abi,
        signer
      );
      //eventFilterv5WithPagination(CONTRACT_ADDRESS,myEpicGame.abi,provider,10);
      /*
       * This is the big difference. Set our gameContract in state.
       */
      setGameContract(gameContract);
      setProvider(signer);
      console.log("Connected to the smart contract.");
    } else {
      console.log("Contract object not found");
    }
  }, [ContractAddress]);

  const setmarriedtofunction = async () => {
    console.log(
      "Setting Married to...",
      currentAccount.toUpperCase(),
      familyStats.proposed.toUpperCase(),
      familyStats.waver.toUpperCase()
    );

    if (currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()) {
      setmarriedto(familyStats.waver);
    } else if (
      currentAccount.toUpperCase() === familyStats.waver.toUpperCase()
    ) {
      setmarriedto(familyStats.proposed);
    }
    console.log("So Married to is.....:", marriedto);
  };

  const buyLovToken = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
      const waveTxn = await gameContract.buyLovToken({
        value: ethers.utils.parseUnits(value, "ether"),
      });
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      setvalue("");
      fetchLovBalance();
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

  const fetchLovBalance = async () => {
    console.log("Checking LOV Balance of the:", currentAccount);
    try {
      const txn2 = await gameContract.balanceOf(currentAccount);
      console.log("LOV Balance is:", txn2.toNumber());
      setlovBalance(txn2.toNumber());
      const txn = await gameContract.claimtimer(currentAccount);
      setlovBalancetimer(txn.toNumber());
      console.log("LOV token Timer is", txn);
      const txn3 = await gameContract.saleCap();
      setsaleCap(txn3.toNumber());
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
  };

  const claimToken = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
      const waveTxn = await gameContract.claimToken();
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      setvalue("");
      toast({
        title: "Status Update",
        description: "You have claimed your token",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      fetchLovBalance();
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
    onClose7();
  };

  const createProposal = async () => {
    setIsLoading(true);

    try {
      const waveTxn = await gameContract.createProposal(
        voteMessage,
        voteEnds,
        voteNumTokens,
        voteReceiver,
        voteAmount
      );
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      onClose5();
      fetchLovBalance();
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

  const MintCertificate = async () => {
    setIsLoading(true);
    try {
      const waveTxn = await gameContract.MintCertificate();
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      setMintedNFT(true);
      onClose8();
      toast({
        title: "Status update",
        description: "Your NFT has been minted!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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

  function validateWalletAddress(values) {
    const errors = {};
    if (!values.votetext) {
      errors.votetext = "Voting text is required";
    } else if (values.votetext.length > 200) {
      errors.votetext = "Text exceeds symbol limit";
    } else if (!values.voteEnds) {
      errors.voteEnds = "# of Days required";
    } else if (isNaN(values.voteEnds)) {
      errors.voteEnds = "# of Days must be a Number";
    } else if (!values.NumTokens) {
      errors.NumTokens = "# of Lov tokens is required";
    } else if (isNaN(values.NumTokens)) {
      errors.NumTokens = "# of Lov tokens must be a Integer";
    } else if (lovBalance < values.NumTokens) {
      errors.NumTokens =
        "# of Lov tokens must less than your balance indicated above";
    } else if (!values.name) {
      errors.name = "Wallet Address is required";
    } else if (!ethers.utils.isAddress(values.name)) {
      errors.name = "Wallet Address is not valid";
    } else if (!values.gift) {
      errors.name = "Amount is required";
    } else if (isNaN(values.gift)) {
      errors.gift = "Amount must be a Number";
    } else if (values.gift > familyBudget) {
      errors.gift = "Amount to be sent is higher than the Family budget";
    } else if (
      values.votetext.length > 0 &&
      ethers.utils.isAddress(values.name) &&
      !isNaN(values.voteEnds) &&
      !isNaN(values.NumTokens) &&
      !isNaN(values.gift) &&
      values.gift < familyBudget &&
      lovBalance > values.NumTokens
    ) {
      setvoteMessage(values.votetext);
      setvoteEnds(values.voteEnds * 86400);
      setvoteNumTokens(Number(values.NumTokens));
      setvoteReceiver(values.name);
      setvvoteAmount(Number(values.gift) * 1000000000);
    }
    return errors;
  }

  const addStake = async () => {
    setIsLoading(true);
    try {
      //implement gas estimation
      const waveTxn = await gameContract.addstake({
        value: ethers.utils.parseUnits(value, "ether"),
      });
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      setvalue("");
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

  const ProposeDivorce = async () => {
    setIsLoading(true);
    try {
      const waveTxn = await gameContract.divorceproposal(message);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
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
    onClose2();
  };

  const getTransactions = async () => {
    setIsLoading(true);
    var txarray = [];
    // eslint-disable-next-line
    const myAddress = await Signer.getAddress();
    const filterFrom = gameContract.filters.AddStake(myAddress, null, null);
    const query = await gameContract.queryFilter(filterFrom, -10000);

    if (query.length > 0) {
      for (let i = 0; i < query.length; i++) {
        const { timestamp, amount } = query[i].args;
        console.log(timestamp.toNumber(), ethers.utils.formatEther(amount));

        txarray.push({
          id: i,
          time: Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(timestamp.toNumber() * 1000),
          amount: ethers.utils.formatEther(amount),
        });
      }
    }
    settxarray(txarray);
    console.log(data);
    console.log(columns);
    console.log(txarray);

    toast({
      title: "Status Update",
      description: "Your Transactions have been loaded",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    setIsLoading(false);
  };

  const loadNFTimage = async () => {
    const { ethereum } = window;
    setIsLoading(true);
    try {
      const ABI = [
        "function nftHolders(address _waver, address _proposed) view returns (uint256 _id)",
        "function tokenURI (uint256 _id) view returns (string)",
      ];
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const NFTContract = new ethers.Contract(
        //"0x8a8771636019e218aAf0b50E7cB90BaA3A4E9301",
        "0x1ef0ffb134e801e7Fc9d11d0620f093Dd7358320",
        ABI,
        signer
      );

      const txn = await NFTContract.nftHolders(
        familyStats.waver,
        familyStats.proposed
      );
      console.log("Token ID", txn);
      const txn2 = await NFTContract.tokenURI(txn);
      console.log(txn2);
      const decodedtxn = txn2.slice(29, txn2.length);
      let base64ToString = atob(decodedtxn);
      const jsonobject = JSON.parse(base64ToString);
      setimageNFT(jsonobject);
      console.log(jsonobject.image);
      toast({
        title: "Status Update",
        description: "Your NFT has been loaded",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
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

  const texttransformer = () => {
    if (familyStats.ProposalStatus === 1 && familyStats.DivorceStatus === 0) {
      return "Proposal Initiated";
    } else if (
      familyStats.ProposalStatus === 2 &&
      familyStats.DivorceStatus === 0
    ) {
      return "Proposal Cancelled";
    } else if (
      familyStats.ProposalStatus === 3 &&
      familyStats.DivorceStatus === 0
    ) {
      return "Proposal Accepted";
    } else if (
      familyStats.ProposalStatus === 4 &&
      familyStats.DivorceStatus === 0
    ) {
      return (
        <HStack>
          <Text color="white" fontSize="md">
            Married
          </Text>
          <Text color="white" fontSize="md">
            to:
          </Text>
          <Text color="white" fontSize="md">
            {marriedto.slice(0, 4)}...
            {marriedto.slice(marriedto.length - 4, marriedto.length)}
          </Text>
        </HStack>
      );
    } else if (
      familyStats.ProposalStatus === 4 &&
      familyStats.DivorceStatus === 1
    ) {
      return (
        <HStack>
          <Text color="white" fontSize="md">
            Divorce
          </Text>
          <Text color="white" fontSize="md">
            with
          </Text>
          <Text color="white" fontSize="md">
            {marriedto.slice(0, 4)}...
            {marriedto.slice(marriedto.length - 4, marriedto.length)}
          </Text>
          <Text color="white" fontSize="md">
            initiated
          </Text>
        </HStack>
      );
    } else if (
      familyStats.ProposalStatus === 4 &&
      familyStats.DivorceStatus === 2
    ) {
      return (
        <HStack>
          <Text color="white" fontSize="md">
            Divorce
          </Text>
          <Text color="white" fontSize="md">
            with
          </Text>
          <Text color="white" fontSize="md">
            {marriedto.slice(0, 4)}...
            {marriedto.slice(marriedto.length - 4, marriedto.length)}
          </Text>
          <Text color="white" fontSize="md">
            initiated
          </Text>
        </HStack>
      );
    } else if (
      familyStats.ProposalStatus === 4 &&
      familyStats.DivorceStatus === 3
    ) {
      return "Divorced.";
    }
  };

  if (!currentAccount && wrongnetwork === false) {
    return (
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        href={"#"}
        onClick={() => connectWalletAction("eth_requestAccounts")}
        _hover={{
          bg: "pink.300",
        }}
      >
        Connect Wallet
      </Button>
    );
  } else if (wrongnetwork === true) {
    return (
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"red.400"}
        href={"#"}
        _hover={{
          bg: "pink.300",
        }}
      >
        Wrong Network
      </Button>
    );
  } else {
    return (
      <HStack>
        {familyStats.ProposalStatus === 4 ? (
          <HStack>
            <Box
              display="flex"
              alignItems="center"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              borderRadius="md"
              py="2"
            >
              <Box px="4">
                <HStack>
                  <Text color="white" fontSize="md">
                    Family
                  </Text>
                  <Text color="white" fontSize="md">
                    Stake:
                  </Text>
                  <Text color="white" fontSize="md">
                    {parseFloat(familyBudget).toFixed(3)}
                  </Text>
                  <Text color="white" fontSize="md">
                    {currency}
                  </Text>
                </HStack>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              bgGradient="linear(to-r, teal.500, green.500)"
              borderRadius="md"
              py="2"
            >
              <Box px="3">{texttransformer()}</Box>
            </Box>
          </HStack>
        ) : null}

        {balanceETH ? (
          <Box
            display="flex"
            alignItems="center"
            background="gray.600"
            borderRadius="md"
            py="2"
          >
            <Box px="5">
              <HStack>
                <Text color="white" fontSize="md">
                  {parseFloat(balanceETH).toFixed(3)}
                </Text>
                <Text color="white" fontSize="md">
                  {currency}
                </Text>
              </HStack>
            </Box>
          </Box>
        ) : null}
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="pink"
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              _hover={{ bg: "gray.400" }}
              _focus={{ boxShadow: "outline" }}
            >
              <HStack spacing={1}>
                <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                  {currentAccount.slice(0, 4)}...
                  {currentAccount.slice(
                    currentAccount.length - 4,
                    currentAccount.length
                  )}
                </Text>
                <Identicon currentAccount={currentAccount} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuGroup title="">
                {familyStats.ProposalStatus === 5 ? (
                  <MenuItem>Initiate Family Voting</MenuItem>
                ) : null}
                {familyStats.ProposalStatus === 4 ? (
                  <MenuItem onClick={onOpen}>
                    Add Stake
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Enter {currency} value</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <NumberInput
                                onChange={(valueString) =>
                                  setvalue(parse(valueString))
                                }
                                value={format(value)}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            </Box>
                          ) : (
                            <Center>
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
                          <Button mr={3} variant="ghost" onClick={onClose}>
                            Close
                          </Button>
                          <Button colorScheme="blue" onClick={addStake}>
                            Add Stake
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}

                {familyStats.ProposalStatus === 4 ? (
                  <MenuItem onClick={onOpen6}>
                    Buy Lov Token
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen6}
                      onClose={onClose6}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Enter {currency} value</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <Text color="blue">
                                {" "}
                                Your current balance is: {lovBalance} LOV{" "}
                              </Text>
                              <Text color="blue">
                                {" "}
                                Available for purchase: {saleCap} LOV tokens{" "}
                              </Text>
                              <NumberInput
                                onChange={(valueString) =>
                                  setvalue(parse(valueString))
                                }
                                value={format(value)}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <Text color="green">
                                {" "}
                                You will get LOV Tokens: {parseInt(
                                  value * 100
                                )}{" "}
                              </Text>
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
                          <Button mr={3} variant="ghost" onClick={onClose6}>
                            Close
                          </Button>

                          <Button colorScheme="blue" onClick={buyLovToken}>
                            {" "}
                            Buy LOV Token
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}

                {familyStats.ProposalStatus === 4 ? (
                  <MenuItem onClick={onOpen7}>
                    Claim Lov Token
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen7}
                      onClose={onClose7}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Claim LOV token</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <Text color="blue">
                                {" "}
                                Your current balance is: {lovBalance} LOV{" "}
                              </Text>

                              <Text color="green">
                                {" "}
                                You can claim: {parseInt(
                                  familyBudget * 100
                                )}{" "}
                                LOV tokens on:{" "}
                                {lovBalancetimer === 0 ? "NOW" : null}{" "}
                                {lovBalancetimer > 0
                                  ? Intl.DateTimeFormat("en-US", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      second: "2-digit",
                                    }).format(lovBalancetimer * 1000 + 86400000)
                                  : null}
                              </Text>
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
                          <Button mr={3} variant="ghost" onClick={onClose7}>
                            Close
                          </Button>
                          <Button colorScheme="blue" onClick={claimToken}>
                            Claim LOV Token
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}

                {familyStats.ProposalStatus === 4 &&
                familyStats.DivorceStatus === 0 ? (
                  <MenuItem onClick={onOpen2}>
                    {" "}
                    Initiate Divorce
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen2}
                      onClose={onClose2}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          Are you sure you want to initiate Divorce?
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <Textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Include a note"
                                size="sm"
                              />
                              <Text fontSize="sm" color="red.500">
                                *If Divorce is accepted, the Family Stake will
                                be split between partners.
                              </Text>
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
                          <Button colorScheme="blue" mr={3} onClick={onClose2}>
                            Close
                          </Button>
                          <Button variant="ghost" onClick={ProposeDivorce}>
                            Proceed
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}
                <MenuItem onClick={onOpen3}>
                  Transactions History
                  <Modal
                    finalFocusRef={finalRef}
                    isOpen={isOpen3}
                    onClose={onClose3}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Transaction History</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        {!isLoading ? (
                          <Box>
                            <Table {...getTableProps()}>
                              <Thead>
                                {headerGroups.map((headerGroup) => (
                                  <Tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                      <Th
                                        {...column.getHeaderProps(
                                          column.getSortByToggleProps()
                                        )}
                                        isNumeric={column.isNumeric}
                                      >
                                        {column.render("Header")}
                                        <chakra.span pl="4">
                                          {column.isSorted ? (
                                            column.isSortedDesc ? (
                                              <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                              <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                          ) : null}
                                        </chakra.span>
                                      </Th>
                                    ))}
                                  </Tr>
                                ))}
                              </Thead>
                              <Tbody {...getTableBodyProps()}>
                                {rows.map((row) => {
                                  prepareRow(row);
                                  return (
                                    <Tr {...row.getRowProps()}>
                                      {row.cells.map((cell) => (
                                        <Td
                                          {...cell.getCellProps()}
                                          isNumeric={cell.column.isNumeric}
                                        >
                                          {cell.render("Cell")}
                                        </Td>
                                      ))}
                                    </Tr>
                                  );
                                })}
                              </Tbody>
                            </Table>
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
                        <Button mr={3} variant="ghost" onClick={onClose3}>
                          Close
                        </Button>
                        <Button colorScheme="blue" onClick={getTransactions}>
                          Get Latest History
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuItem>

                {familyStats.ProposalStatus === 4 && mintedNFT === false ? (
                  <MenuItem onClick={onOpen8}>
                    {" "}
                    Mint your NFT
                    <AlertDialog
                      motionPreset="slideInBottom"
                      leastDestructiveRef={cancelRef}
                      onClose={onClose8}
                      isOpen={isOpen8}
                      isCentered
                    >
                      <AlertDialogOverlay />

                      <AlertDialogContent>
                        <AlertDialogHeader>Mint NFT?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                          {!isLoading ? (
                            <Box>
                              Maximum NFT minting fee may amount up to 0.3 ETHs
                              due to the Ethereum onchain storage. Do you agree?
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
                          <Button ref={cancelRef} onClick={onClose8}>
                            No
                          </Button>
                          <Button
                            colorScheme="green"
                            ml={3}
                            onClick={MintCertificate}
                          >
                            Yes
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </MenuItem>
                ) : null}

                {familyStats.ProposalStatus === 4 && mintedNFT === true ? (
                  <MenuItem onClick={onOpen4}>
                    {" "}
                    See your onchain NFT
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen4}
                      onClose={onClose4}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader> Your NFT</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <Image src={imageNFT.image} alt="Image NFT" />
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
                          <Button mr={3} variant="ghost" onClick={onClose4}>
                            Close
                          </Button>
                          <Button colorScheme="blue" onClick={loadNFTimage}>
                            Load NFT Image
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}

                {familyStats.ProposalStatus === 4 ? (
                  <MenuItem onClick={onOpen5}>
                    {" "}
                    Voting
                    <Modal
                      finalFocusRef={finalRef}
                      isOpen={isOpen5}
                      onClose={onClose5}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>
                          {" "}
                          Your current balance: {lovBalance} LOVs
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          {!isLoading ? (
                            <Box>
                              <FormControl>
                                <Formik
                                  initialValues={{
                                    votetext: "",
                                    voteEnds: "",
                                    NumTokens: "",
                                    name: "0x0000000000000000000000000000000000000000",
                                    gift: "0",
                                  }}
                                  validate={validateWalletAddress}
                                  onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                      alert(JSON.stringify(values, null, 2));
                                      actions.setSubmitting(false);
                                    }, 1000);
                                  }}
                                >
                                  {(props) => (
                                    <Form>
                                      <Field name="votetext">
                                        {({ field, form }) => (
                                          <FormControl
                                            isInvalid={
                                              form.errors.votetext &&
                                              form.touched.votetext
                                            }
                                          >
                                            <FormLabel htmlFor="votetext">
                                              <Text
                                                bgGradient="linear(to-r, green.500, green.800)"
                                                bgClip="text"
                                                fontSize="2xl"
                                                fontWeight="bold"
                                              >
                                                Proposal text:
                                              </Text>
                                            </FormLabel>
                                            <Input
                                              {...field}
                                              id="votetext"
                                              placeholder="Max 200 symbols"
                                            />
                                            <FormErrorMessage>
                                              {form.errors.votetext}
                                            </FormErrorMessage>
                                          </FormControl>
                                        )}
                                      </Field>

                                      <Field name="voteEnds">
                                        {({ field, form }) => (
                                          <FormControl
                                            isInvalid={
                                              form.errors.voteEnds &&
                                              form.touched.voteEnds
                                            }
                                          >
                                            <FormLabel htmlFor="voteEnds">
                                              <Text
                                                bgGradient="linear(to-r, green.500, green.800)"
                                                bgClip="text"
                                                fontSize="2xl"
                                                fontWeight="bold"
                                              >
                                                Voting ends after:
                                              </Text>
                                            </FormLabel>

                                            <Input
                                              {...field}
                                              id="voteEnds"
                                              placeholder="Enter # in Days"
                                            />

                                            <FormErrorMessage>
                                              {form.errors.voteEnds}
                                            </FormErrorMessage>
                                          </FormControl>
                                        )}
                                      </Field>

                                      <Field name="NumTokens">
                                        {({ field, form }) => (
                                          <FormControl
                                            isInvalid={
                                              form.errors.NumTokens &&
                                              form.touched.NumTokens
                                            }
                                          >
                                            <FormLabel htmlFor="NumTokens">
                                              <Text
                                                bgGradient="linear(to-r, green.500, green.800)"
                                                bgClip="text"
                                                fontSize="2xl"
                                                fontWeight="bold"
                                              >
                                                Backed by LOV Tokens:
                                              </Text>
                                            </FormLabel>
                                            <Input
                                              {...field}
                                              id="NumTokens"
                                              placeholder="# of LOV tokens to back your proposal"
                                            />
                                            <FormErrorMessage>
                                              {form.errors.NumTokens}
                                            </FormErrorMessage>
                                          </FormControl>
                                        )}
                                      </Field>

                                      <Accordion allowToggle>
                                        <AccordionItem>
                                          <h2>
                                            <AccordionButton>
                                              <Box flex="1" textAlign="left">
                                                Send funds from the Family
                                                Budget
                                              </Box>
                                              <AccordionIcon />
                                            </AccordionButton>
                                          </h2>
                                          <AccordionPanel pb={4}>
                                            <Field name="name">
                                              {({ field, form }) => (
                                                <FormControl
                                                  isInvalid={
                                                    form.errors.name &&
                                                    form.touched.name
                                                  }
                                                >
                                                  <FormLabel htmlFor="name">
                                                    <Text
                                                      bgGradient="linear(to-r, green.500, green.800)"
                                                      bgClip="text"
                                                      fontSize="2xl"
                                                    >
                                                      Enter Wallet Address
                                                    </Text>
                                                  </FormLabel>
                                                  <Input
                                                    {...field}
                                                    id="name"
                                                    placeholder="Recepient Wallet Address"
                                                  />
                                                  <FormErrorMessage>
                                                    {form.errors.name}
                                                  </FormErrorMessage>
                                                </FormControl>
                                              )}
                                            </Field>

                                            <Field name="gift">
                                              {({ field, form }) => (
                                                <FormControl
                                                  isInvalid={
                                                    form.errors.gift &&
                                                    form.touched.gift
                                                  }
                                                >
                                                  <FormLabel htmlFor="gift">
                                                    <Text
                                                      bgGradient="linear(to-r, green.500, green.800)"
                                                      bgClip="text"
                                                      fontSize="2xl"
                                                    >
                                                      Amount to be sent
                                                    </Text>
                                                  </FormLabel>
                                                  <Input
                                                    {...field}
                                                    id="gift"
                                                    placeholder="Enter amount less than the Family Budget"
                                                  />
                                                  <FormErrorMessage>
                                                    {form.errors.gift}
                                                  </FormErrorMessage>
                                                </FormControl>
                                              )}
                                            </Field>
                                          </AccordionPanel>
                                        </AccordionItem>
                                      </Accordion>
                                    </Form>
                                  )}
                                </Formik>
                              </FormControl>
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
                          <Button mr={3} variant="ghost" onClick={onClose5}>
                            Close
                          </Button>
                          <Button colorScheme="blue" onClick={createProposal}>
                            Create Vote Proposal
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </MenuItem>
                ) : null}
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    );
  }
};

export default RenderContent;
