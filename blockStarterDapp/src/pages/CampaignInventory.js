import React, { Component } from "react";
import {
  Card,
  Grid,
  Input,
  Segment,
  Pagination,
} from "semantic-ui-react";
import { connect } from "react-redux";

import campaignCard from "../components/campaignCard";

function mapStateToProps(state) {
  return {
    CZ: state.CZ,
    totalcampaignCount: state.totalcampaignCount,
    userAddress: state.userAddress
  };
}

class campaignInventory extends Component {
  state = {
    campaignTable: [],
    activePage: 1,
    totalPages: Math.ceil(this.props.totalcampaignCount / 9)
  };

  componentDidMount = async () => {
    await this.makecampaignCards();
  };

  onChange = async (e, pageInfo) => {
    await this.setState({ activePage: pageInfo.activePage });
    this.makecampaignCards();
  };

  handleInputChange = async (e, { value }) => {
      await this.setState({ activePage: value });
      this.makecampaignCards();
  }

  makecampaignCards = async () => {
    let zList = [];
    let zOwner = [];
    await this.setState({ campaignTable: [] }); // clear screen while waiting for data
    for (
      let i = this.state.activePage * 9 - 9;
      i < this.state.activePage * 9;
      i++
    ) {
      try {
        let metaData = await this.props.CZ.campaigns(i);
        zList.push(metaData);
        let myOwner = await this.props.CZ.campaignToOwner(i);
        zOwner.push(myOwner);
      } catch (err) {
        break;
      }
    }

    // create a set of campaign cards in the state table
    let campaignTable = [];
    for (let i = 0; i < zList.length; i++) {
      let myDate = new Date(zList[i].readyTime * 1000).toLocaleString();
      campaignTable.push(
        <campaignCard
          key={i}
          campaignId={this.state.activePage * 9 - 9 + i}
          campaignName={zList[i].name}
          campaignDNA={zList[i].dna.toString()}
          campaignLevel={zList[i].level}
          campaignReadyTime={myDate}
          campaignWinCount={zList[i].winCount}
          campaignLossCount={zList[i].lossCount}
          campaignOwner={zOwner[i]}
          myOwner={this.props.userAddress === zOwner[i]}
        />
      );
    }
    this.setState({ campaignTable });
  };

  render() {
    return (
      <div>
        <hr />
        <h2> Complete campaign Inventory </h2>
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
        <div>
          <Card.Group>{this.state.campaignTable}</Card.Group>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(campaignInventory);
