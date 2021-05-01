import React, { Component } from "react";
import "./campaignChar.css";

class campaignChar extends Component {

    catMode () {
       return ((parseInt(this.props.DNA) % 100) !== 0);
    }

    currentHeadChoice () {
        let i =  parseInt(this.props.DNA.substring(0, 2)) % 7 + 1;
        return "static/campaignparts/head-" + i + "@2x.png";
    }

    currentEyeChoice ()  {
        let i = parseInt(this.props.DNA.substring(2, 4)) % 11 + 1;
        return "static/campaignparts/eyes-" + i + "@2x.png";
    }

    currentShirtChoice ()  {
        let i = parseInt(this.props.DNA.substring(4, 6)) % 6 + 1;
        return "static/campaignparts/shirt-" + i + "@2x.png";

    }

    render() {
        const skinStyle = {
            filter: "hue-rotate(" + parseInt(this.props.DNA.substring(6, 8)) / 100 * 360 + "deg)",
        };

        const eyeStyle = {
            filter: "hue-rotate(" + parseInt(this.props.DNA.substring(8, 10)) / 100 * 360 + "deg)",
        };

        const shirtStyle = {
            filter: "hue-rotate(" + parseInt(this.props.DNA.substring(10,12)) / 100 * 360 + "deg)",
        };

        if (this.catMode()) {
            return (
                <div className="campaign-preview" v-images-loaded="campaignLoaded">
                    <img  style={skinStyle} className="right-upper-arm" src="static/campaignparts/right-upper-arm-1@2x.png" alt="right upper arm" />
                    <img  style={shirtStyle}className="torso" src="static/campaignparts/torso-1@2x.png" alt="torso" />
                    <img  style={skinStyle}className="cat-legs" src="static/campaignparts/catlegs.png" alt="catleg" />
                    <img  style={shirtStyle} className="shirt" src={this.currentShirtChoice()} alt="shirt" />
                    <img  style={skinStyle} className="left-forearm" src="static/campaignparts/left-forearm-1@2x.png" alt="left forearm" />
                    <img  style={skinStyle} className="right-forearm" src="static/campaignparts/right-forearm-1@2x.png" alt="right forearm" />
                    <img  style={skinStyle} className="left-upper-arm" src="static/campaignparts/left-upper-arm-1@2x.png" alt="left upper arm" />
                    <img  style={skinStyle} className="left-hand" src="static/campaignparts/hand1-1@2x.png" alt="left hand" />
                    <img  style={skinStyle} className="right-hand" src="static/campaignparts/hand-2-1@2x.png" alt="right hand" />
                    <img  style={skinStyle} className="head" src={this.currentHeadChoice()} alt="head" />
                    <img  style={eyeStyle}  className="eye"  src={this.currentEyeChoice()} alt="eyes" />
                    <img  className="mouth" src="static/campaignparts/mouth-1@2x.png" alt="mouth" />
                </div>
            )
        } else {
            return (
                <div className="campaign-preview" v-images-loaded="campaignLoaded">
                    <img style={shirtStyle}className="left-feet" src="static/campaignparts/left-feet-1@2x.png" alt="left feet" />
                    <img style={shirtStyle}className="right-feet" src="static/campaignparts/right-feet-1@2x.png" alt="right feet" />
                    <img style={shirtStyle}className="left-leg" src="static/campaignparts/left-leg-1@2x.png" alt="left leg" />
                    <img style={shirtStyle}className="right-leg" src="static/campaignparts/right-leg-1@2x.png" alt="right leg" />
                    <img style={shirtStyle}className="left-thigh" src="static/campaignparts/left-thigh-1@2x.png" alt="left thigh" />
                    <img style={shirtStyle}className="right-thigh" src="static/campaignparts/right-thigh-1@2x.png" alt="right thigh" />

                    <img  style={skinStyle} className="right-upper-arm" src="static/campaignparts/right-upper-arm-1@2x.png" alt="right upper arm" />
                    <img  style={shirtStyle}className="torso" src="static/campaignparts/torso-1@2x.png" alt="torso" />
                    <img  style={shirtStyle} className="shirt" src={this.currentShirtChoice()} alt="shirt" />
                    <img  style={skinStyle} className="left-forearm" src="static/campaignparts/left-forearm-1@2x.png" alt="left forearm" />
                    <img  style={skinStyle} className="right-forearm" src="static/campaignparts/right-forearm-1@2x.png" alt="right forearm" />
                    <img  style={skinStyle} className="left-upper-arm" src="static/campaignparts/left-upper-arm-1@2x.png" alt="left upper arm" />
                    <img  style={skinStyle} className="left-hand" src="static/campaignparts/hand1-1@2x.png" alt="left hand" />
                    <img  style={skinStyle} className="right-hand" src="static/campaignparts/hand-2-1@2x.png" alt="right hand" />
                    <img  style={skinStyle} className="head" src={this.currentHeadChoice()} alt="head" />
                    <img  style={eyeStyle}  className="eye"  src={this.currentEyeChoice()} alt="eyes" />
                    <img  className="mouth" src="static/campaignparts/mouth-1@2x.png" alt="mouth" />
                </div>
            )
        }

    }
}

export default campaignChar;

//                      <img  style={{filter: "hue-rotate(90deg)"}} className="head" src={this.currentHeadChoice()} />