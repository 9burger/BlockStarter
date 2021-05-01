import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Create an action button with link

class ActionButton extends Component {
  // format long names and addresses into xxxx...xxxx form

  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    const campaignData = {
      campaignName: this.truncate(this.props.data.campaignName, 8, 8),
      campaignId: this.props.data.campaignId,
      campaignDNA: this.props.data.campaignDNA,
      campaignLevel: this.props.data.campaignLevel,
      campaignReadyTime: this.props.data.campaignReadyTime,
      campaignWinCount: this.props.data.campaignWinCount,
      campaignLossCount: this.props.data.campaignLossCount
    };

    const pathName = this.props.pathname;
    const buttonLabel = this.props.buttonLabel;

    //console.log("button label", this.props.buttonLabel, pathName, campaignData);
    return (
      <Link
        to={{
          pathname:  pathName ,
          state:  campaignData
        }}
      >
        <Button primary disabled={this.props.disableMe}> {buttonLabel} </Button>
      </Link>
    );
  }
}

export default ActionButton;
