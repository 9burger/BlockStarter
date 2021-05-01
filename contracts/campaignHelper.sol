pragma solidity >=0.5.0 <0.6.0;

import "./campaignfeeding.sol";

contract CampaignHelper is CampaignFeeding {

    uint levelUpFee = 0.001 ether;

    modifier aboveLevel(uint _level, uint _campaignId) {
        require(campaigns[_campaignId].level >= _level);
        _;
    }

    /* function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner));
        _owner.transfer(address(this).balance);
    }
*/
    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function levelUp(uint _campaignId) external payable {
        require(msg.value == levelUpFee);
        campaigns[_campaignId].level = campaigns[_campaignId].level.add(1);
    }

    function changeName(uint _campaignId, string calldata _newName) external aboveLevel(2, _campaignId) onlyOwnerOf(_campaignId) {
        campaigns[_campaignId].name = _newName;
    }

    function changeDna(uint _campaignId, uint _newDna) external aboveLevel(20, _campaignId) onlyOwnerOf(_campaignId) {
        campaigns[_campaignId].dna = _newDna;
    }

    function getCampaignsByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerCampaignCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < campaigns.length; i++) {
            if (campaignToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
            }
        }
    return result;
    }

    function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner()));
        _owner.transfer(address(this).balance);
    }

}
