const CONTRACT_ADDRESS = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0';

/*
 * Add this method and make sure to export it on the bottom!
 */
const transformCharacterData = (characterData) => {
    return {
        id: characterData.id.toNumber(),
        waver: characterData.waver,
        proposed: characterData.proposed,
        ProposalStatus: characterData.ProposalStatus,
        stake: characterData.stake.toNumber()/1000000000,
        gift: characterData.gift.toNumber()/1000000000, 
        FamilyBudget:characterData.FamilyBudget, 
        marryDate: characterData.marryDate
    };
  };
  
  export { CONTRACT_ADDRESS, transformCharacterData };