import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button } from "semantic-ui-react";

import CreateCampaign from "./CreateCampaign";

import { Menu, Header } from "semantic-ui-react";

function mapStateToProps(state) {
  return {
    userAddress: state.userAddress,
    userCampaignCount: state.userCampaignCount,
    totalCampaignCount: state.totalCampaignCount
  };
}

// This renders the topbar on the webpage as well as the lines listing address and Campaign count.

class TopBar extends Component {
  render() {
    return (
      <div>
        <Menu style={{ marginTop: "10px", backgroundColor: "Charcoal" }}>
          <Menu.Item>
            <CreateCampaign />
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/myCampaignInventory" }}>
              <Button primary>Show My Campaigns</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to={{ pathname: "/CampaignInventory" }}>
              <Button primary>Show All Campaigns</Button>
            </Link>
          </Menu.Item>

          <Menu.Item position="left">
            <Link to={{ pathname: "/" }}>
              <Header size="large">BlockStarter</Header>
            </Link>
          </Menu.Item>
        </Menu>
        <div className="center">
          <h2>The Annonymous Crownfunding Platform</h2>
        </div>
       
        
        Your account address: {this.props.userAddress}
        <br />
        You own {this.props.userCampaignCount} Campaign(s) out of a total of approximately {this.props.totalCampaignCount}.
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopBar);
