// Render Methods
import React, { useContext, useEffect, useState } from "react";
import { useSortBy, useTable } from "react-table";
// Components
import Identicon from "../identicon";
import { transformCharacterData } from "../../constants";
import { contractContext } from "../../Contexts/Contract";
import { mainContext } from "../../Contexts/MainContext";
import myEpicGame from "../../utils/marriages.json";

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Box, Button, chakra, HStack, Image, Menu,
  MenuButton, MenuGroup, MenuItem, MenuList, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
  NumberInputField,
  NumberInputStepper, Table, Tbody, Td, Text, Textarea, Th, Thead, Tr, useDisclosure
} from "@chakra-ui/react";
import { ethers } from 'ethers';


const RenderContent = () => {
  const { 
    currentAccount, ethRequestCurrentAccount, 
    familyStats, Provider, setProvider, 
    setfamilyStats, setuserBeenProposed,
    wrongnetwork, setCharacterNFT, characterNFT
} = useContext(mainContext);
const { ContractAddress, gameContract, setGameContract, currency} = useContext(contractContext);

    // const [characterNFT, setCharacterNFT] = useState(null);
    const [balanceETH, setbalanceETH] = useState("");
    const [value, setvalue] = useState("");
    const [message, setMessage] = useState("");
    const [marriedto, setmarriedto] = useState("");
    const [imageNFT, setimageNFT] = useState([]);
    // const [currency, setcurrency] = useState("");
    const [familyBudget, setfamilyBudget] = useState("");
    const [txarray,settxarray] = useState([]);
    const data = React.useMemo(
        () => txarray,
        [txarray],
      )

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
    console.log(Provider, 'asdasdasdsaasdasw21312312312')
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
      console.log(gameContract)
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

  const parse = (val) => val.replace(/^\Ξ/, "");
  const format = (val) => `Ξ` + val;

  const connectWalletAction = async (method) => {
    await ethRequestCurrentAccount(method);
    window.location.reload();
  };

  useEffect(() => {
      if(currentAccount && familyStats){
          setmarriedtofunction();
      }
    // eslint-disable-next-line
  }, [currentAccount, familyStats]);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ContractAddress !=='' ) {
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
        setProvider(signer)
        console.log("Connected to the smart contract.")
    } else {
        console.log('Contract object not found');
    }
  }, [ContractAddress])

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

  const addStake = async () => {
    try {
      //implement gas estimation
      const waveTxn = await gameContract.addstake({
        value: ethers.utils.parseUnits(value, "ether"),
        gasPrice: ethers.utils.parseUnits("100", "gwei"),
        gasLimit: 2000000,
      });
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const ProposeDivorce = async () => {
    try {
      const waveTxn = await gameContract.divorceproposal(message);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    var txarray =[]
    // eslint-disable-next-line 
    const myAddress = await Provider.getAddress()
    const filterFrom = gameContract.filters.AddStake(myAddress,null,null)
    const query = await gameContract.queryFilter(filterFrom, -10000);

    if (query.length>0) {
      for (let i=0; i<query.length; i++) {
        const {timestamp,amount} = query[i].args
        console.log(timestamp.toNumber(),ethers.utils.formatEther(amount))
        
        txarray.push({
          id: i,
          time: Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp.toNumber()),
          amount: ethers.utils.formatEther(amount)})
      }
      
    }   
    settxarray(txarray);
   
  }

  const loadNFTimage = async () => {

    try {
      const txn = await gameContract.nftHolders(familyStats.waver,familyStats.proposed)
      console.log("Token ID", txn)
      const txn2 = await gameContract.tokenURI(txn);
      console.log(txn2)
      const decodedtxn = txn2.slice(29,txn2.length)
      let base64ToString = atob(decodedtxn);
      const jsonobject = JSON.parse(base64ToString);
      setimageNFT(jsonobject);
      console.log(jsonobject.image)
  
  
      } catch (error) {
        console.log(error)
      }
  }

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
                          <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Include a note"
                            size="sm"
                          />
                          <Text fontSize="sm" color="red.500">
                            *If Divorce is accepted, the Family Stake will be
                            split between partners.
                          </Text>
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

                {familyStats.ProposalStatus === 4 ? (
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
                          <Image src={imageNFT.image} alt="Image NFT" />
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
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    );
  }
};

export default RenderContent;
