pragma solidity >=0.5.0 <0.6.0;

import "./campaignHelper.sol";

contract CampaignAttack is CampaignHelper {
    uint randNonce = 0;
    uint attackVictoryProbability = 70;

    function randMod(uint _modulus) internal returns(uint) {
        randNonce = randNonce.add(1);
        return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))) % _modulus;
    }

    function attack(uint _campaignId, uint _targetId) external onlyOwnerOf(_campaignId) {
        Campaign storage myCampaign = campaigns[_campaignId];
        Campaign storage enemyCampaign = campaigns[_targetId];
        uint rand = randMod(100);
        if (rand <= attackVictoryProbability) {
            myCampaign.winCount = myCampaign.winCount.add(1);
            myCampaign.level = myCampaign.level.add(1);
            enemyCampaign.lossCount = enemyCampaign.lossCount.add(1);
            feedAndMultiply(_campaignId, enemyCampaign.dna, "campaign");
        } else {
            myCampaign.lossCount = myCampaign.lossCount.add(1);
            enemyCampaign.winCount = enemyCampaign.winCount.add(1);
            _triggerCooldown(myCampaign);
        }
    }
}