import React, { Component } from "react";
import { Icon, Card, Header, Modal, Button } from "semantic-ui-react";
import ReactTooltip from "react-tooltip";
import ActionButton from "./ActionButton";
import campaignCardContent from "./campaignCardContent";

class campaignCard extends Component {
  state = {
    modalOpen: false
  };

  modalOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose = () => this.setState({ modalOpen: false });

  truncate = (text, startChars, endChars) => {
    if (text.length > 12) {
      var start = text.substring(0, startChars);
      var end = text.substring(text.length - endChars, text.length);
      return start + "..." + end;
    }
    return text;
  };

  render() {
    // define the button labels used in <ActionButton> further on down in the code

    const attackButton = (
      <div>
        {" "}
        Attack campaign <br /> (70% chance of winning){" "}
      </div>
    ); const Transfercampaign = (
      <div>
        {" "}
        Transfer campaign <br /> (to a new owner){" "}
      </div>
    );
    const kittyButton = (
      <div>
        Eat CryptoKitty <br /> (burp!){" "}
      </div>
    );
    const changeNameButton = (
      <div>
        Change Name <br /> (level > 2){" "}
      </div>
    );
    const levelUpButton = (
      <div>
        Level Up
        <br /> (cost = .001 eth){" "}
      </div>
    );

    // create the JSX depending on whether you own the campaign or not

    if (this.props.myOwner)
      // Owner campaign: render card and tooltip and modal for campaign actions

      return (
        <Card style={{ backgroundColor: "LightYellow" }} raised>
          <ReactTooltip delayShow={400} />

          <a
            href="javascript:;"
            data-tip="Click on me to view actions for this campaign"
            onClick={e => this.modalOpen(e)}
          >
            <campaignCardContent campaign={this.props} />
          </a>

          {/* a modal is like an "alert", it's a popup that greys out the lower screen and displays its content on top of everything */}

          <Modal open={this.state.modalOpen} onClose={this.handleClose}>
            <Header
              icon="browser"
              content="These are the actions you can take with your campaign!"
            />

            <Modal.Content>
              <ActionButton
                pathname="/Attackcampaign"
                buttonLabel={attackButton}
                data={this.props}
              />

              <ActionButton
                pathname="/FeedOnKitty"
                buttonLabel={kittyButton}
                data={this.props}
              />
              <ActionButton
              pathname="/Transfercampaign"
              buttonLabel={Transfercampaign}
              data={this.props}
            />

              <ActionButton
                pathname="/ChangeName"
                buttonLabel={changeNameButton}
                disableMe={this.props.campaignLevel <= 2}
                data={this.props}
              />

              <ActionButton
                pathname="/LevelUp"
                buttonLabel={levelUpButton}
                data={this.props}
              />

            </Modal.Content>

            <Modal.Actions>
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="cancel" /> Close
              </Button>
            </Modal.Actions>
          </Modal>
        </Card>
      );
    // someone else's campaign.  just show the card.
    else
      return (
        <Card style={{ backgroundColor: "LavenderBlush" }}>
          <campaignCardContent campaign={this.props} />
        </Card>
      );
  }
}

export default campaignCard;
