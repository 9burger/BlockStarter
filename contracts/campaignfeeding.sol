pragma solidity >=0.5.0 <0.6.0;

import "./campaignfactory.sol";

contract KittyInterface {
    function getKitty(uint256 _id) external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );
}

contract CampaignFeeding is CampaignFactory {

    KittyInterface kittyContract;

    modifier onlyOwnerOf(uint _campaignId) {
        require(msg.sender == campaignToOwner[_campaignId]);
        _;
    }

    function setKittyContractAddress(address _address) external onlyOwner {
        kittyContract = KittyInterface(_address);
    }

    function _triggerCooldown(Campaign storage _campaign) internal {
        _campaign.readyTime = uint32(now + cooldownTime);
    }

    function _isReady(Campaign storage _campaign) internal view returns (bool) {
        return (_campaign.readyTime <= now);
    }

    function feedAndMultiply(uint _campaignId, uint _targetDna, string memory _species) internal onlyOwnerOf(_campaignId) {
        Campaign storage myCampaign = campaigns[_campaignId];
        require(_isReady(myCampaign));
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myCampaign.dna + _targetDna) / 2;
        if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            newDna = newDna - newDna % 100 + 99;
        }
        _createCampaign("NoName", newDna);
        _triggerCooldown(myCampaign);
    }

    function feedOnKitty(uint _campaignId, uint _kittyId) public {
        //  temporary kluge to use random DNA because can't call MAINNET from RINKEBY
        uint kittyDna;
        //(,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);  // the real code
        kittyDna = uint(keccak256(abi.encodePacked(_kittyId))); // the kluge
        feedAndMultiply(_campaignId, kittyDna, "kitty");
    }
}
