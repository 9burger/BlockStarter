//
// This is the "Change Name" page
//

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Header, Icon, Form, Message } from "semantic-ui-react";
import CampaignCard from "../components/campaignCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userAddress: state.userAddress
  };
}

class ChangeName extends Component {
  state = {
    value: "",
    message: "",
    errorMessage: "",
    loading: false,
    campaignId: null
  };


  async componentDidMount() {
    let campaignId = +this.props.location.state.campaignId;
    this.setState({
      campaignId
    });
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.changeName(this.state.campaignId, this.state.value) // contains the campaign ID and the new name
      this.setState({
        loading: false,
        message: "Yay!!!!  I have a brand new name!"
      });
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction"
      });
    }
  };

  render() {
    return (
      <div>
        *<Header icon="browser" content="Please give me a WORTHY name!!" />
        <table>
          <tr>
            <th>
              <CampaignCard
                campaignId={this.state.campaignId}
                campaignName={this.props.location.state.campaignName}
                campaignDNA={this.props.location.state.campaignDNA}
                campaignLevel={this.props.location.state.campaignLevel}
                campaignReadyTime={this.props.location.state.campaignReadyTime}
                campaignWinCount={this.props.location.state.campaignWinCount}
                campaignLossCount={this.props.location.state.campaignLossCount}
                campaignOwner={this.props.userAddress}
                myOwner={false}
              />
            </th>
            <th>
              <img src="static/images/nametag.jpg" alt="name tag" />
            </th>
          </tr>
        </table>
        <br />
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>New Campaign Name</label>
            <input
              placeholder="Name"
              onChange={event =>
                this.setState({
                  value: event.target.value
                })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary type="submit" loading={this.state.loading}>
            <Icon name="check" />
            Change Name
          </Button>
          <Link to="/MyCampaignInventory">
            <Button color="red" inverted>
              <Icon name="cancel" /> Close
            </Button>
          </Link>
          <hr />
          <h2>{this.state.message}</h2>
        </Form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChangeName);
