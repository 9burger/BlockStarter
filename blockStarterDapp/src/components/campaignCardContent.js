import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import CampaignChar from "./campaignChar";

class CampaignCardContent extends Component {
  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    return (
      <Card.Content>
        <div>
          {" "}
          <CampaignChar DNA={this.props.Campaign.CampaignDNA} />{" "}
        </div>
        <Card.Header>
          Campaign ID: <b>{this.props.Campaign.CampaignId}</b> <br /> Name :{" "}
          <b>{this.truncate(this.props.Campaign.CampaignName, 8, 8)}</b>
        </Card.Header>
        <Card.Description>
          DNA: {this.props.Campaign.CampaignDNA} <br />
          Level: {this.props.Campaign.CampaignLevel} <br />
          Ready Time: {this.props.Campaign.CampaignReadyTime} <br />
          Wins: {this.props.Campaign.CampaignWinCount} <br />
          Losses: {this.props.Campaign.CampaignLossCount} <br />
          Owner: {this.truncate(this.props.Campaign.CampaignOwner, 12, 12)}
        </Card.Description>
      </Card.Content>
    );
  }
}
export default CampaignCardContent;
