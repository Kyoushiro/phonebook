import React, { Component } from "react";
import ContactForm from "./contactForm";

class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailWrong: false,
            phoneNumberWrong: false,
            newContact: true

        }
    }
    // validates the contact and then either adds contact to list or if not valid, says to try again



    // adds contact to list
    addContactToList(name, phoneNumber, email) {
        var obj = { 'name': name, 'phoneNumber': phoneNumber, 'email': email, 'editMode': false, 'id': this.props.incrementId() };
        const newContact = this.props.contacts.slice();
        newContact.push(obj);
        this.props.addToList(newContact);
        console.log("new contact");
        console.log(this.props.contacts);
        console.log("islistitem");
        console.log(this.props.isListItem);

        this.props.backToHome();

    }



    render() {
        return (
            <div className="addContact">


                <React.Fragment>
                    <ContactForm
                        backToHome={this.props.backToHome}
                        addContact={this.addContactToList.bind(this)}
                        emailWrong={this.state.emailWrong}
                        phoneNumberWrong={this.state.phoneNumberWrong}
                        contacts={this.props.contacts}
                        newContact={this.state.newContact}

                    />
                </React.Fragment>
            </div>

        )
    }

}
export default AddContact;