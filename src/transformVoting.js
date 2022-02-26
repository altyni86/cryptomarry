
const transformVotingData = (VotingData) => {
    return {
        id: VotingData.id.toNumber(),
        proposer: VotingData.proposer,
        responder: VotingData.responder,
        tokenVoteQuantity: VotingData.tokenVoteQuantity.toNumber(),
        voteProposalText: VotingData.voteProposalText,
        voteStatus: VotingData.voteStatus.toNumber(),
        timestamp: VotingData.timestamp.toNumber(), 
        voteends:VotingData.voteends.toNumber(), 
        receiver: VotingData.receiver,
        amount: VotingData.amount.toNumber(),
    };
  };
  
  export { transformVotingData };