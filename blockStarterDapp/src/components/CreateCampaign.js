import React, { Component } from "react";
import getCampaignCount from "../utils/getCampaignCount";
import { connect } from "react-redux";

import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";

function mapStateToProps(state) {
    return {
        CZ: state.CZ,
        userAddress: state.userAddress,
        userCampaignCount: state.userCampaignCount
    };
}


// Create a new campaign

class CreateCampaign extends Component {
  state = {
    modalOpen: false,
    value: "",
    message: "",
    errorMessage: "",
    loading: false
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      errorMessage: "",
      message: "waiting for blockchain transaction to complete..."
    });
    try {
      await this.props.CZ.createRandomCampaign(this.state.value) // contains the campaign name
      this.setState({
        loading: false,
        message: "You have created a New campaign"
      });
      getCampaignCount(this.props.CZ, this.props.userAddress);
    } catch (err) {
      this.setState({
        loading: false,
        errorMessage: err.message,
        message: "User rejected transaction or else this account is already in use, please try another name."
      });
    }
  };


  render() {
   
      return (
      <Modal
        trigger={
          <Button primary disabled={false} onClick={this.handleOpen}>
            Create campaign
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="browser" content="Create a New campaign" />
        <Modal.Content>
          <img src="static/images/Contract.jpeg" alt="Contract.jpeg could not be found" /><Header>Name Your Campaign Below:</Header>
          <br /> <br />
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Campaign Name:</label>
              <input
                placeholder="myCampaign"
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
              Create campaign
            </Button>
            <hr />
            <h2>{this.state.message}</h2>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.handleClose} inverted>
            <Icon name="cancel" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(CreateCampaign);