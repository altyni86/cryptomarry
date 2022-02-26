import {
 CloseIcon, HamburgerIcon
} from "@chakra-ui/icons";
import {
  Box, chakra, ChakraProvider, Collapse, Container, createStandaloneToast, Flex,
  Grid, GridItem, Heading, Icon, IconButton, Link, Select, Stack, Text, theme, useColorModeValue, useDisclosure, VisuallyHidden, VStack
} from "@chakra-ui/react";

import React, { useContext, useEffect } from "react";
import { FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./components/Logo";
// components
import DesktopNav from "./components/DesktopNav/DesktopNav";
import MobileNav from "./components/MobileNav/MobileNav";
import RenderContent from "./components/RenderContent/RenderContent";
import RenderContent2 from "./components/RenderContent/RenderContent2";
import { transformCharacterData } from "./constants";
import { contractContext } from "./Contexts/Contract";
import { mainContext } from "./Contexts/MainContext";
import SocialButton from "./components/SmallComponents/SocialButton";
import Loader from "./components/SmallComponents/Loader";

function App() {
  const { gameContract } = useContext(contractContext);

  const {
    ethRequestCurrentAccount, currentAccount,
    chainID, familyStats, setfamilyStats, 
    setchainID
  } = useContext(mainContext);

  const toast = createStandaloneToast();

  const { onClose, isOpenother, onToggle } = useDisclosure();

  // World of connections to wallets
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
        ethRequestCurrentAccount("eth_accounts");
        // ethrequest
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setchainParams = (hexChainID) => {
    console.log("In function", hexChainID);
    try {
      if (hexChainID === "0x7a69") {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x7a69",
              rpcUrls: ["https://127.0.0.1:8545"],
              chainName: "LocalHost",
              nativeCurrency: {
                name: "CryptoMarry",
                symbol: "CMY",
                decimals: 18,
              },
              blockExplorerUrls: ["https://polygonscan.com/"],
            },
          ],
        });
      } else if (hexChainID === "0x89") {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x89",
            },
          ],
        });
      } else if (hexChainID === "0x1") {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x1",
            },
          ],
        });
      } else if (hexChainID === "0x4") {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x4",
            },
          ],
        });
      }
    } catch (error) {
      alert("Connect to a Metamask first");
    }
  };

  useEffect(() => {
    setchainParams(chainID);
  }, [chainID]);

  useEffect(() => {
    try {
      const { ethereum } = window;
      ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }

    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    const onNewWave = async (
      id, waver,
      proposed, sender,
      message, time, vid
    ) => {
      console.log(
        "Incoming message with:",
        id, waver,
        proposed, sender,
        message, time, vid
      );

      if (
        gameContract &&
        sender.toUpperCase() === currentAccount.toUpperCase()
      ) {
        let txn;
        if (
          currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()
        ) {
          txn = await gameContract.checkIfUserHasBeenProposed();
        } else if (
          currentAccount.toUpperCase() === familyStats.waver.toUpperCase()
        ) {
          txn = await gameContract.checkIfUserHasProposed();
        }

        if (txn.ProposalStatus !== 0) {
          console.log("Status has been updated");
          setfamilyStats(transformCharacterData(txn));
          toast({
            title: "Family Status has been updated",
            description: "Your request has been sent",
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        } else if (txn.ProposalStatus === 0) {
          alert(`Your marriage has been annuled.`);
          window.location.reload(false);
        }
      } else {
        console.log("Other users event.");
      }
    };

    const onsendingStake = async (sender, time, value) => {
      console.log("Incoming message with:", sender, time, value);
      console.log(sender);
      console.log(currentAccount);

      if (
        gameContract &&
        sender.toUpperCase() === currentAccount.toUpperCase()
      ) {
        let txn;
        console.log(familyStats.proposed.toUpperCase());
        if (
          currentAccount.toUpperCase() === familyStats.proposed.toUpperCase()
        ) {
          txn = await gameContract.checkIfUserHasBeenProposed();
        } else if (
          currentAccount.toUpperCase() === familyStats.waver.toUpperCase()
        ) {
          txn = await gameContract.checkIfUserHasProposed();
        }

        if (txn.ProposalStatus !== 0) {
          console.log("Status has been updated");
          setfamilyStats(transformCharacterData(txn));
          toast({
            title: "Family Stake update",
            description: "Your deposit has been sent",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          //Close Addstake Modal
          onClose();
        } else if (txn.ProposalStatus === 0) {
          alert(`Your marriage has been annuled.`);
          window.location.reload(false);
        }
      } else {
        console.log("Other users event.");
      }
    };

    if (gameContract) {
      /*
       * Setup NFT Minted Listener
       */
      gameContract.on("NewWave", onNewWave);
      gameContract.on("AddStake", onsendingStake);
    }

    return () => {
      /*
       * When your component unmounts, let/s make sure to clean up this listener
       */
      if (gameContract) {
        gameContract.off("NewWave", onNewWave);
        gameContract.off("AddStake", onsendingStake);
      }
    };
    // eslint-disable-next-line
  }, [familyStats, gameContract, currentAccount]);


  // interface NavItem {
  //   label: string;
  //   subLabel?: string;
  //   children?: Array<NavItem>;
  //   href?: string;
  // }

  // const NAV_ITEMS: Array<NavItem> = [];
  const NAV_ITEMS = [];

  return (
    <div style={{position: 'relative', minHeight: '100vh',overflowX: 'hidden'}}>
    <ChakraProvider theme={theme}>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(1, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1}>
          <Box>
            <Flex
              bg={useColorModeValue("gray.100", "gray.800")}
              color={useColorModeValue("gray.600", "gray.100")}
              minH={"60px"}
              py={{ base: 2 }}
              px={{ base: 4 }}
              borderBottom={1}
              borderStyle={"solid"}
              borderColor={useColorModeValue("gray.200", "gray.900")}
              align={"center"}
            >
              <Flex
                flex={{ base: 1, md: "auto" }}
                ml={{ base: -2 }}
                display={{ base: "flex", md: "none" }}
              >
                <IconButton
                  onClick={onToggle}
                  icon={
                    isOpenother ? (
                      <CloseIcon w={3} h={3} />
                    ) : (
                      <HamburgerIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                  aria-label={"Toggle Navigation"}
                />
              </Flex>
              <Flex
                flex={{ base: 1 }}
                justify={{ base: "center", md: "start" }}
              >
                <Link href={"/"}>
                  <Stack
                    as={"a"}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={{ base: 1, sm: 1 }}
                  >
                    <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                    <Heading
                      as={"h1"}
                      fontSize={"xl"}
                      display={{ base: "none", md: "block" }}
                    >
                      <Text
                        as={"span"}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text"
                      >
                        CryptoMarry
                      </Text>
                    </Heading>
                  </Stack>
                </Link>

                <Flex display={{ base: "none", md: "flex" }} ml={10}>
                  <Select
                    value={chainID}
                    onChange={(e) => setchainID(e.target.value)}
                    borderColor="pink"
                    border="2px"
                  >
                    <option value="0x1">Ethereum</option>
                    <option value="0x4">Rinkeby</option>
                    <option value="0x89">Polygon</option>
                    <option value="0x7a69">Localhost</option>
                  </Select>

                  <DesktopNav NAV_ITEMS={NAV_ITEMS} />
                </Flex>
              </Flex>

              <Stack
                flex={{ base: 2, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
              >
                <RenderContent />
                <ColorModeSwitcher justifySelf="flex-end" />
              </Stack>
            </Flex>

            <Collapse in={isOpenother} animateOpacity>
              <MobileNav NAV_ITEMS={NAV_ITEMS} />
            </Collapse>
          </Box>
        </GridItem>

        <GridItem colSpan={2}>
          <Box textAlign="center" fontSize="xl">
            <VStack spacing={1}>{RenderContent2()}</VStack>
          </Box>
        </GridItem>
      </Grid>
      <Box
          bg={useColorModeValue("gray.50", "gray.900")}
          color={useColorModeValue("gray.700", "gray.200")}
          position={'absolute'}
          left={0}
          bottom={0}
          width={'100%'}
          height={'80px'}
        >
          <Container
            flex ='1'
            as={Stack}
            maxW={"6xl"}
            py={6}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
            paddingTop={'25px'}
          >
            <Text>© 2022 CryptoMarry. All rights reserved</Text>
            <Stack direction={"row"} spacing={3}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Github"} href={"#"}>
                <FaGithub />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
    </ChakraProvider>
    </div>

  );
}

export default App;
