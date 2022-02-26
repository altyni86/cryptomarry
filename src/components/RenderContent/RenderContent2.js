// Render Methods
import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Container, Flex, Heading, Image, Stack, Text, Wrap
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { contractContext } from "../../Contexts/Contract";
import { mainContext } from "../../Contexts/MainContext";
import { Blob } from "../../Blob";
import WrongNetwork from "../WrongNetwork";
import Blur from "../Blur";
import SelectCharacter from "../SelectCharacter";
import Arena from "../Arena";
import Execute from "../Execute";


const RenderContent2 = () => {
    const { 
        currentAccount, ethRequestCurrentAccount, 
        familyStats, Provider, setProvider, 
        setfamilyStats, userBeenProposed, setuserBeenProposed,
        wrongnetwork, setwrongnetwork, characterNFT, setCharacterNFT,
        balanceETH, setbalanceETH
    } = useContext(mainContext);
    const { ContractAddress, gameContract, setGameContract } = useContext(contractContext);
    const [Signer,setSigner] =useState(null);
    const connectWalletAction = async (method) => {
        await ethRequestCurrentAccount(method);
        window.location.reload();
    };

    if (!currentAccount) {
      return (
        //Here is a main screen

        <Container maxW={"8xl"}> 
          <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column", md: "row" }}
          >
            <Stack flex={1} spacing={{ base: 4, md: 5 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={700}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                Register your marriage on the{" "}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  Ethereum Blockchain
                </Text>{" "}
                and Get{" "}
                <Text bgGradient="linear(to-r, red.400,pink.400)" bgClip="text">
                  NFT Certificate.
                </Text>
              </Heading>
              <Text>
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  CryptoMarry
                </Text>{" "}
                is more than a registration service, it is a platform that makes
                partners' committment to marriage real. Staked ETHs (or other
                currencies) are split between sides upon divorce. No lawyers
                needed.
              </Text>
              <Center>
                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={{ base: "column", sm: "row" }}
                >
                  <Button
                    fontSize={"lg"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"#"}
                    onClick={() => connectWalletAction("eth_requestAccounts")}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Connect your Wallet to Start
                  </Button>
                </Stack>
              </Center>
            </Stack>
            <Flex
              flex={1}
              justify={"center"}
              align={"center"}
              position={"relative"}
              w={"full"}
            >
              <Blob
                w={"170%"}
                h={"170%"}
                position={"absolute"}
                top={"-20%"}
                left={0}
                zIndex={-1}
              />
              <Box
                position={"relative"}
                height={"480px"}
                rounded={"2xl"}
                boxShadow={"2xl"}
                width={"480px"}
                overflow={"hidden"}
              >
                <Image
                  alt={"Hero Image"}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={"100%"}
                  src={
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDUwMCA1MDAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnPjxkZWZzPjxmaWx0ZXIgaWQ9J2InPjxmZUltYWdlIHJlc3VsdD0ncDAnIHhsaW5rOmhyZWY9J2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU5UQXdJaUJvWldsbmFIUTlJalV3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV3TUNBMU1EQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStQSEJoZEdnZ1ptbHNiRDBpSXpjeU1EbGlOeUlnWkQwaVRUQWdNR2cxTURCMk5UQXdTREI2SWk4K1BDOXpkbWMrJy8+PGZlSW1hZ2UgcmVzdWx0PSdwMScgeGxpbms6aHJlZj0nZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTlRBd0lpQm9aV2xuYUhROUlqVXdNQ0lnZG1sbGQwSnZlRDBpTUNBd0lEVXdNQ0ExTURBaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJK1BHTnBjbU5zWlNCamVEMGlNVEEzSWlCamVUMGlNemN3SWlCeVBTSXhOVEFpSUdacGJHdzlJaU5tTnpJMU9EVWlMejQ4TDNOMlp6ND0nLz48ZmVJbWFnZSByZXN1bHQ9J3AyJyB4bGluazpocmVmPSdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOVEF3SWlCb1pXbG5hSFE5SWpVd01DSWdkbWxsZDBKdmVEMGlNQ0F3SURVd01DQTFNREFpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUkrUEdOcGNtTnNaU0JqZUQwaU1qUTVJaUJqZVQwaU1qUXlJaUJ5UFNJeE1EQWlJR1pwYkd3OUlpTmlOVEUzT1dVaUx6NDhMM04yWno0PScvPjxmZUltYWdlIHJlc3VsdD0ncDMnIHhsaW5rOmhyZWY9J2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU5UQXdJaUJvWldsbmFIUTlJalV3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJRFV3TUNBMU1EQWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SStQR05wY21Oc1pTQmplRDBpTkRJM0lpQmplVDBpTWprd0lpQnlQU0l4TkRBaUlHWnBiR3c5SWlNME9EazFaV1lpTHo0OEwzTjJaejQ9Jy8+PGZlQmxlbmQgbW9kZT0nb3ZlcmxheScgaW49J3AwJyBpbjI9J3AxJy8+PGZlQmxlbmQgbW9kZT0nZXhjbHVzaW9uJyBpbjI9J3AyJy8+PGZlQmxlbmQgbW9kZT0nb3ZlcmxheScgaW4yPSdwMycgcmVzdWx0PSdibGVuZE91dCcvPjxmZUdhdXNzaWFuQmx1ciBpbj0nYmxlbmRPdXQnIHN0ZERldmlhdGlvbj0nNDUnLz48L2ZpbHRlcj48ZmlsdGVyIGlkPSdjJz48ZmVHYXVzc2lhbkJsdXIgaW49J1NvdXJjZUdyYXBoaWMnIHN0ZERldmlhdGlvbj0nMjUnLz48L2ZpbHRlcj48Y2xpcFBhdGggaWQ9J2EnPjxyZWN0IHdpZHRoPSc1MDAnIGhlaWdodD0nNTAwJyByeD0nNDInIHJ5PSc0MicvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0ndXJsKCNhKSc+PHBhdGggZmlsbD0nNmIxNzU0JyBkPSdNMCAwaDUwMHY1MDBIMHonLz48cGF0aCBzdHlsZT0nZmlsdGVyOnVybCgjYiknIGQ9J00wIDBoNTAwdjUwMEgweicvPjxnIHN0eWxlPSdmaWx0ZXI6dXJsKCNjKTt0cmFuc2Zvcm06c2NhbGUoMS41KTt0cmFuc2Zvcm0tb3JpZ2luOmNlbnRlciB0b3AnPjxwYXRoIGZpbGw9J25vbmUnIGQ9J00wIDBoNTAwdjUwMEgweicvPjxlbGxpcHNlIGN4PSc1MCUnIHJ4PScxODAnIHJ5PScxMjAnIG9wYWNpdHk9Jy41NScvPjwvZz48L2c+PGcgbWFzaz0ndXJsKCNnKScgZmlsbD0nI2ZmZicgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3Jz48dGV4dCB5PSc4MCcgeD0nOTAnIGZvbnQtd2VpZ2h0PSc1MjAnIGZvbnQtc2l6ZT0nNTAnPkNFUlRJRklDQVRFPC90ZXh0Pjx0ZXh0IHk9JzEzMCcgeD0nMTMwJyBmb250LXdlaWdodD0nNDAwJyBmb250LXNpemU9JzQwJz5vZiBNYXJyaWFnZTwvdGV4dD48L2c+PHJlY3QgeD0nMTYnIHk9JzE2JyB3aWR0aD0nNDY4JyBoZWlnaHQ9JzQ2OCcgcng9JzI2JyByeT0nMjYnIGZpbGw9J3JnYmEoMCwwLDAsMCknIHN0cm9rZT0ncmdiYSgyNTUsMjU1LDI1NSwwLjIpJy8+PGcgc3R5bGU9J3RyYW5zZm9ybTp0cmFuc2xhdGUoMzVweCwxNzBweCknPjxyZWN0IHdpZHRoPScxNTAnIGhlaWdodD0nNDAnIHJ4PSc4JyByeT0nOCcgZmlsbD0ncmdiYSgwLDAsMCwwLjYpJy8+PHRleHQgeD0nMTInIHk9JzMwJyBmb250LWZhbWlseT0nQ291cmllciBOZXcnIGZvbnQtc2l6ZT0nMzAnIGZpbGw9JyNmZmYnPjx0c3BhbiBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LDAuNiknPklEOiA8L3RzcGFuPjI8L3RleHQ+PC9nPjxnIHN0eWxlPSd0cmFuc2Zvcm06dHJhbnNsYXRlKDM1cHgsMjMwcHgpJz48cmVjdCB3aWR0aD0nMzAwJyBoZWlnaHQ9JzQwJyByeD0nOCcgcnk9JzgnIGZpbGw9J3JnYmEoMCwwLDAsMC42KScvPjx0ZXh0IHg9JzEyJyB5PSczMCcgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzMwJyBmaWxsPScjZmZmJz48dHNwYW4gZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjYpJz5TdGFrZTogPC90c3Bhbj4zMDAwIEVUSDwvdGV4dD48L2c+PGcgc3R5bGU9J3RyYW5zZm9ybTp0cmFuc2xhdGUoMzVweCwyOTBweCknPjxyZWN0IHdpZHRoPSc0MDAnIGhlaWdodD0nNDAnIHJ4PSc4JyByeT0nOCcgZmlsbD0ncmdiYSgwLDAsMCwwLjYpJy8+PHRleHQgeD0nMTInIHk9JzMwJyBmb250LWZhbWlseT0nQ291cmllciBOZXcnIGZvbnQtc2l6ZT0nMzAnIGZpbGw9JyNmZmYnPjx0c3BhbiBmaWxsPSdyZ2JhKDI1NSwyNTUsMjU1LDAuNiknPkJsb2NrIzogPC90c3Bhbj4xNjU8L3RleHQ+PC9nPjxnIHN0eWxlPSd0cmFuc2Zvcm06dHJhbnNsYXRlKDM1cHgsMzUwcHgpJz48cmVjdCB3aWR0aD0nNDMwJyBoZWlnaHQ9Jzk1JyByeD0nOCcgcnk9JzgnIGZpbGw9J3JnYmEoMCwwLDAsMC42KScvPjx0ZXh0IHg9JzEyJyB5PSczMCcgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzMwJyBmaWxsPScjZmZmJz48dHNwYW4gZmlsbD0ncmdiYSgyNTUsMjU1LDI1NSwwLjYpJz5CZXR3ZWVuOiA8L3RzcGFuPjwvdGV4dD48dGV4dCB4PScxMicgeT0nNTUnIGZvbnQtZmFtaWx5PSdDb3VyaWVyIE5ldycgZm9udC1zaXplPScxNicgZmlsbD0nI2ZmZic+MHhiY2Q0MDQyZGU0OTlkMTRlNTUwMDFjY2JiMjRhNTUxZjNiOTU0MDk2PC90ZXh0Pjx0ZXh0IHg9JzEyJyB5PSc3NScgZm9udC1mYW1pbHk9J0NvdXJpZXIgTmV3JyBmb250LXNpemU9JzE2JyBmaWxsPScjZmZmJz4weGNkM2I3NjZjY2RkNmFlNzIxMTQxZjQ1MmM1NTBjYTYzNTk2NGNlNzE8L3RleHQ+PC9nPjwvc3ZnPg=="
                  }
                />
              </Box>
            </Flex>
          </Stack>

          <Container maxW={"7xl"}>
            <Stack
              textAlign={"center"}
              justifyContent={'center'}
              align={"center"}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Setting a Marriage Contract{" "}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  is Easy.
                </Text>{" "}
              </Heading>
              <Text color={"gray.500"} maxW={"3xl"}>
                Propose your loved one and demonstrate your strong commitment to
                the partnership by staking ETHs (or other currencies) and
                minting a NFT Certificate.{" "}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  Ethereum Smart Contracts
                </Text>{" "}
                will make sure that your promises are delivered.
              </Text>
              <Flex
                width={'100%'}
                flex={1}
                justify={"space-around"}
                align={"center"}
                position={"relative"}
                w={"full"}
                flexWrap={'wrap'}
                >
                <Stack spacing={6} direction={"row"} flexWrap={'wrap'} justifyContent={'center'} >
                  <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}><Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${"https://images.unsplash.com/photo-1605101943206-05c8f4e64598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={
                          "https://images.unsplash.com/photo-1605101943206-05c8f4e64598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
                        }
                      />
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                      >
                        STEP 1
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        <Text
                          as={"span"}
                          bgGradient="linear(to-r, red.400,pink.400)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          Make a proposal
                        </Text>
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={300} fontSize={"1xl"}>
                          Within the proposal, indicate partner's wallet
                          address, the amount of ETH (or othe currencies) you
                          are willing to stake. You can also send a Gift in ETH
                          (or other currencies) as a part of the deal.
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                  </div>
                  <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"330px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                    
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${"https://images.unsplash.com/photo-1553915632-175f60dd8e36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={
                          "https://images.unsplash.com/photo-1553915632-175f60dd8e36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        }
                      />
                    </Box>
                    <Stack pt={16}  align={"center"} justify={'center'}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                      >
                        STEP 2
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        <Text
                          as={"span"}
                          bgGradient="linear(to-r, red.400,pink.400)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          Register your marriage
                        </Text>
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={300} fontSize={"1xl"}>
                          If your proposal is accepted, register your Marriage
                          and create a Smart Contract. Both partners will
                          receive NFT Certificate that is 100% stored on the
                          Ethereum Chain.
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </div>
                  <div style={{marginTop: '40px', display: 'flex', justifyContent: 'center'}}>
                  <Box
                    role={"group"}
                    p={6}
                    maxW={"340px"}
                    w={"full"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    pos={"relative"}
                    zIndex={1}
                  >
                    <Box
                      rounded={"lg"}
                      mt={-12}
                      pos={"relative"}
                      height={"230px"}
                      _after={{
                        transition: "all .3s ease",
                        content: '""',
                        w: "full",
                        h: "full",
                        pos: "absolute",
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${"https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"})`,
                        filter: "blur(15px)",
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: "blur(20px)",
                        },
                      }}
                    >
                      <Image
                        rounded={"lg"}
                        height={230}
                        width={282}
                        objectFit={"cover"}
                        src={
                          "https://images.unsplash.com/photo-1496275068113-fff8c90750d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        }
                      />
                    </Box>
                    <Stack pt={10} align={"center"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        textTransform={"uppercase"}
                      >
                        STEP 3
                      </Text>
                      <Heading
                        fontSize={"2xl"}
                        fontFamily={"body"}
                        fontWeight={500}
                      >
                        <Text
                          as={"span"}
                          bgGradient="linear(to-r, red.400,pink.400)"
                          bgClip="text"
                          fontWeight="bold"
                        >
                          Build a Family
                        </Text>
                      </Heading>
                      <Stack direction={"row"} align={"center"}>
                        <Text fontWeight={300} fontSize={"1xl"}>
                          Both partners can inrease Family Staking as a part of
                          their committment. Remember staying out of divorce,
                          but if there are no other options, the Staking amount
                          will be split between partners upon mutual agreement.
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                  </div>
                </Stack>
              </Flex>
            </Stack>
          </Container>
          <Container maxW={"5xl"} marginBottom={'150px'}>
            <Stack
              textAlign={"center"}
              align={"center"}
              spacing={{ base: 8, md: 10 }}
              py={{ base: 20, md: 28 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  fontWeight="bold"
                >
                  F.A.Q.
                </Text>{" "}
              </Heading>

              <Stack spacing={6} direction={"row"}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Is CryptoMarry substitute for IRL experiences?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Absolutely not. CryptoMarry is not substitute for IRL
                      experiences. But the platform provides a number of
                      instruments that are very difficult to arrange in IRL. For
                      example, proposals without Skin in the Game (e.g ETH
                      Staking) are not always credible. The one who proposes
                      through CryptoMarry, can make credible committment to the
                      Partnership. Most importantly, if couples decide to
                      divorce, it can be quite difficult to fairly split joint
                      assets (sometimes legal procedures are unavoidable). But
                      with CryptoMarry, Staked resources are split instantly
                      upon divorce.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Are staked (deposited) ETH (or other currencies) safe?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Ethereum provides unmatched security in ensuring
                      authorized transactions (unless private keys are lost).
                      Security Audit of CryptoMarry Smart Contracts is still in
                      progress, thus Users should consider all associated risks
                      before using the service. The Smart Contracts are Open
                      Sourced for the community review. Developers and
                      Associates do not take any responsibilities in case of
                      loss of Staked ETH Funds by any means. It is also
                      impossible to recover funds if wallet accounts are lost.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Where can I find my NFT Certificate?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      NFT Certificates can be loaded within the CryptoMarry Menu
                      Bar. They are also available in OpenSea and similar
                      indexing platforms. It is possible to import NFT
                      certificates into wallet address if viewing NFT assets is
                      possible within the wallet. For instance, only mobile
                      version of Metamask allows viewing NFTs.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Is it possible to withdraw Staked ETH (or other
                          currencies)?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Withdrawing is possible only through divorcing procedures
                      and will be split between provided wallet addresses. It is
                      done by design. Divorce procedures are complete if both
                      sides have agreed.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          If one of the wallet addresses is lost is it possible
                          to withdraw funds?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Deposits can be withdrawn if the other wallet address does
                      not provide any response within the 60 days. The full
                      amount will be sent to the account that initiated divorce.
                      If both wallet adresses are lost, then it is not possible
                      to recover funds.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          What are the transaction fees and associtated costs?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      There are two types of fees. First, Developer Community
                      fee is 1% from all transactions. There is also an Ethereum
                      fee. Ethereum transaction fees may vary depending on
                      network congestion. It should be noted that transaction
                      fee form Minting NFT Certificate may cost up to 0.6 ETHs.
                      This is because all data in stored on chain. If you are
                      looking for more affordable options, CryptoMarry is
                      available on Polygon Chain.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Do you collect Data?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      CryptoMarry does not collect any personal data. All
                      interactions happen 100% on chain.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Stack>
            </Stack>
          </Container>
        </Container>

        //Here where main screen ends
      );
    } else if (currentAccount && wrongnetwork === true) {
      return <WrongNetwork />;
    } else if (
      currentAccount &&
      gameContract &&
      wrongnetwork === false &&
      !characterNFT &&
      !userBeenProposed
    ) {
      return (
        <Container maxW={"5xl"}>
          <Blur
            position={"absolute"}
            top={-10}
            left={-10}
            style={{ filter: "blur(80px)" }}
          />
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
          >
            <SelectCharacter balanceETH={balanceETH} gameContract={gameContract} Provider = {Provider} setCharacterNFT={setCharacterNFT} currentAccount={currentAccount} 
            />
          </Stack>
        </Container>
      );
    } else if (currentAccount && userBeenProposed && !characterNFT) {
      return (
        <Container maxW={"5xl"}>
          <Blur
            position={"absolute"}
            top={-10}
            left={-10}
            style={{ filter: "blur(80px)" }}
          />
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
          >
            <Arena Signer = {Signer} gameContract={gameContract}  Provider = {Provider} currentAccount={currentAccount} userBeenProposed={userBeenProposed} setuserBeenProposed={setuserBeenProposed}/>
          </Stack>
        </Container>
      );
    } else if (currentAccount && characterNFT && !userBeenProposed) {
      return (
        <Container maxW={"5xl"}>
          <Blur
            position={"absolute"}
            top={-10}
            left={-10}
            style={{ filter: "blur(80px)" }}
          />
          <Stack
            textAlign={"center"}
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
          >
            <Execute balanceETH = {balanceETH} Signer = {Signer} gameContract={gameContract} currentAccount={currentAccount} characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
          </Stack>
        </Container>
      );
    }
  };

export default RenderContent2;