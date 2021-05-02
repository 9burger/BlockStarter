import store from "../redux/store";

export const CAMPAIGN_COUNT = "CAMPAIGN_COUNT"; // action type

// action creator (dispatch sends this to redux reducer)
function campaignCount(data) {
  return {
    type: CAMPAIGN_COUNT,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user campaign count.  Put into redux store.
//

async function getCampaignCount(CZ, userAddress) {
  // get number of campaigns owned by the user account
  let userCampaignCount = +(await CZ.balanceOf(userAddress));  // + convert a string to an integer

  // do a binary search to estimate total campaign count.
  // It is a real shame that the Cryptocampaigns contract doesn't totally comply with ERC720 to include a function
  // that returns totalCampaignount.

  var high = 8192;
  var low = 0;
  var middle = 4096;

  while (low < high) {
      try {
      await CZ.campaigns(middle);
      low = middle + 1;
      middle = Math.floor(low + (high - low) / 2);
    } catch {
      high = middle - 1;
      middle = Math.floor(low + (high - low) / 2);
    }
  }

  // put state data into the REDUX store for easy access from other pages and components

  let data = {
    totalCampaignCount: Math.max(low-1, 1),   // from binary search
    userCampaignCount          //EC7 shorthand for totalCampaignCount:totalCampaignCount because of same variable name
  };

  store.dispatch(campaignCount(data));
}

export default getCampaignCount;
