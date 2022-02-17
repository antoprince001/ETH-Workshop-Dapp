// SPDX-License-Identifier: MIT
pragma solidity >= 0.6.0 < 0.9.0;

contract Workshop {

    struct Participant {
        uint256 id;
        string name;
        uint256  year;
        string feedback;
    }
    
    Participant[] public participants;

    event feedBackCreated(string indexed name, string feedback );
    
    //Addition of new feedback to blockchain
    function createFeedback(string memory _name, uint256 _year,string memory _feedback) public
    {
      uint256 _id = participants.length;
      Participant memory new_participant = Participant( _id , _name, _year , _feedback);
      participants.push(new_participant);

      emit feedBackCreated(_name,_feedback);

    }

    function getAllParticipants() public view returns (Participant[] memory) {
        return participants;
    }
}
