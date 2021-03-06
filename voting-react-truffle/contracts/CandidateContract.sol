pragma solidity ^0.4.18;

contract CandidateContract {
    uint candidateId;
    
    struct CandidateDetails {
        bytes32 name;
        bytes32 dateOfBirth;
        bytes32 standFor;
        uint votesCount;
    }
    
    mapping (uint => CandidateDetails) public candidates;
    
    function idSetCandidate (uint _candidateId) public {
        candidateId = _candidateId;
    }

    function candidateIdSetter (uint _candidateId) public {
        candidateId = _candidateId;
    }

    function getcandidateId () public view returns (uint id) {
        return candidateId;
    }
    
    function setCandidateDetails (
        bytes32 _name,
        bytes32 _dateOfBirth,
        bytes32 _standFor,
        uint _votesCount
    ) public 
    {
        var candidateObject = candidates[candidateId];
        candidateObject.name = _name;
        candidateObject.dateOfBirth = _dateOfBirth;
        candidateObject.standFor = _standFor;
        candidateObject.votesCount = _votesCount;
    }
    
    function getCandidateDetails (uint _candidateId) public view returns (
        bytes32,
        bytes32,
        bytes32,
        uint 
    ) {
        var candidateObject = candidates[_candidateId];
        return (
            candidateObject.name,
            candidateObject.dateOfBirth,
            candidateObject.standFor,
            candidateObject.votesCount
        );
    }
}

