import React, { Component } from "react";
import ContactForm from "./contactForm";

class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailWrong: false,
            phoneNumberWrong: false

        }
    }
    // validates the contact and then either adds contact to list or if not valid, says to try again



    // adds contact to list
    addContactToList(name, phoneNumber, email) {
        var obj = { 'name': name, 'phoneNumber': phoneNumber, 'email': email, 'editMode': false };
        const newContact = this.props.contacts.slice();
        newContact.push(obj);
        this.props.addToList(newContact);

        this.props.backToHome();
    }



    render() {
        return (

            <React.Fragment>
                <ContactForm
                    backToHome={this.props.backToHome}
                    addContact={this.addContactToList.bind(this)}
                    emailWrong={this.state.emailWrong}
                    phoneNumberWrong={this.state.phoneNumberWrong}
                    contacts={this.props.contacts}

                />
            </React.Fragment>

        )
    }

}
export default AddContact;