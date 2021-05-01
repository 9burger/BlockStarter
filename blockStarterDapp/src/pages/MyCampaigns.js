import React, { Component } from "react";
import { Card, Grid, Input, Segment, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import CampaignCard from "../components/campaignCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    userCampaignCount: state.userCampaignCount,
    userAddress: state.userAddress
  };
}

class MyCampaignInventory extends Component {
  state = {
    CampaignTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.userCampaignCount / 9)
  };

  componentDidMount = async () => {
    await this.makeCampaignCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makeCampaignCards();
  };

  handleInputChange = async (e, { value }) => {
    await this.setState({ activePage: value });
    this.makeCampaignCards();
  };
  makeCampaignCards = async () => {
    const myCampaigns = await this.props.CZ.getCampaignsByOwner(this.props.userAddress);
    let campaignTable = [];
    for (
      var i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let z = myCampaigns[i];
        let campaign = await this.props.CZ.campaigns(z);
        let myDate = new Date(campaign.readyTime * 1000).toLocaleString();
        campaignTable.push(
          <CampaignCard
            key={z}
            campaignId={z.toString()}
            campaignName={campaign.name}
            campaignDNA={campaign.dna.toString()}
            campaignLevel={campaign.level}
            campaignReadyTime={myDate}
            campaignWinCount={campaign.winCount}
            campaignLossCount={campaign.lossCount}
            campaignOwner={this.props.userAddress}
            myOwner={true}
          />
        );
      } catch {
        break;
      }
    }
    this.setState({ campaignTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Your Campaign Inventory </h2>
        The campaigns you own have a yellow background; clicking anywhere on a
        yellow card will bring up a list of actions you can perform.
        <hr />
        <Grid columns={2} verticalAlign="middle">
          <Grid.Column>
            <Segment secondary>
              <div>activePage: {this.state.activePage}</div>
              <Input
                min={1}
                max={this.state.totalPages}
                onChange={this.handleInputChange}
                type="range"
                value={this.state.activePage}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.onChange}
              totalPages={this.state.totalPages}
            />
          </Grid.Column>
        </Grid>
        <br /> <br />
        <Card.Group> {this.state.campaignTable} </Card.Group>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MyCampaignInventory);
