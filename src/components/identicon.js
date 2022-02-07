
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Jazzicon from "@metamask/jazzicon";

const StyledIdenticon = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 2.125rem;
  background-color: black;
`;


const Identicon = ({currentAccount}) => {
const ref = useRef(null);



useEffect(() => {
    if (currentAccount && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(32, parseInt(currentAccount.slice(1, 10), 2)));
    }
  }, [currentAccount]);

  return <StyledIdenticon ref={ref} />

}

export default Identicon;