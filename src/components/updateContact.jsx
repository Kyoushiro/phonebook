import React, { Component } from "react";
import ContactForm from "./contactForm";
import BackArrow from "../images/arrowLeft.svg";

class updateContact extends Component {
    constructor(props) {
        super(props);
        this.updateContactInDB = this.updateContactInDB.bind(this);
    }
    // Validates contact and then updates the contact
    updateContact(contact) {
        this.props.updateList(contact, this.props.index);
        this.updateContactInDB(contact.name, contact.phoneNumber, contact.email, contact.id)
        this.props.toggleUpdate();


    }

    // Takes user back to homepage if back arrow is pressed
    cancelUpdateContact() {
        this.props.toggleUpdate();
    }

    // adds contact to database
    updateContactInDB(name, phoneNumber, email, id) {
        fetch(`https://phonebook-277012.ey.r.appspot.com/update_user?name=${name}&phoneNumber=${phoneNumber}&email=${email}&id=${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "phoneNumber": phoneNumber,
                "email": email,
                "id": id
            })



        })
            .then((result) => result.json())
    }


    render() {
        return (

            <ContactForm
                isListItem={this.props.isListItem}
                name={this.props.name}
                phoneNumber={this.props.phoneNumber}
                email={this.props.email}
                updateContact={this.updateContact.bind(this)}
                contacts={this.props.contacts}
                index={this.props.index}
                id={this.props.id}
                toggleUpdate={this.props.toggleUpdate}
                cancel={<input type="image" height="30" width="30" src={BackArrow} alt="" value="Cancel" onClick={this.cancelUpdateContact.bind(this)}></input>}
                title={<h1>View Contact</h1>}
            />

        )
    }
}

export default updateContact;