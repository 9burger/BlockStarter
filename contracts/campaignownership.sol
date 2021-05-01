pragma solidity >=0.5.0 <0.6.0;


import "./erc721.sol";
import "./safemath.sol";
import "./ownable.sol";




import getCampaignCount from "../src/utils/getCampaignCount";

/// TODO: Replace this with natspec descriptions
contract CampaignOwnership is Ownable, ERC721 {

    using SafeMath for uint256;

    mapping (uint => address) campaignApprovals;

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerCampaignCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return campaignToOwner[_tokenId];
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwner(_tokenId) {
        campaignApprovals[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

}
