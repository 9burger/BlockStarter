pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";
import "./safemath.sol";

contract CampaignFactory is Ownable {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    event NewCampaign(uint campaignId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 2 minutes; // 1 days;

    struct Campaign {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Campaign[] public campaigns;

    mapping (uint => address) public campaignToOwner;
    mapping (address => uint) ownerCampaignCount;

    function setCooldownTime(uint _seconds) public onlyOwner {
        cooldownTime = _seconds;
    }

    function _createCampaign(string memory _name, uint _dna) internal {
        uint id = campaigns.push(Campaign(_name, _dna, 1, uint32(now + cooldownTime), 0, 0)) - 1;
        campaignToOwner[id] = msg.sender;
        ownerCampaignCount[msg.sender] = ownerCampaignCount[msg.sender].add(1);
        emit NewCampaign(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomCampaign(string memory _name) public {
        //require(ownerCampaignCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createCampaign(_name, randDna);
    }

}
