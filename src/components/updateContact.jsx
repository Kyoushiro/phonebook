import React, { Component } from "react";
import ContactForm from "./contactForm";
import { render } from "@testing-library/react";

class updateContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailWrong: false,
            phoneNumberWrong: false
        }
    }
    // Validates contact and then updates the contact
    updateContact(contact) {
        console.log("we are here");
        this.props.updateList(contact, this.props.index);
        this.props.backToHome();

    }
    // allows to write into input field
    updateState(event) {
        this.props.updateValue(event);
    }


    render() {
        return (



            <ContactForm
                isListItem={this.props.isListItem}
                backToHome={this.props.backToHome}
                name={this.props.name}
                phoneNumber={this.props.phoneNumber}
                email={this.props.email}
                updateContact={this.updateContact.bind(this)}
                updateState={this.updateState.bind(this)}
                emailWrong={this.state.emailWrong}
                phoneNumberWrong={this.state.phoneNumberWrong}
                contacts={this.props.contacts}
                index={this.props.index}
            />


        )
    }
}

export default updateContact;