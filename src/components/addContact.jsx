import React, { Component } from "react";
import ContactForm from "./contactForm";

class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newContact: true,
            isListItem: false

        }
        this.addContactToDatabase = this.addContactToDatabase.bind(this);
    }




    // adds contact to list and takes user back to homepage
    addContactToList(name, phoneNumber, email) {
        var obj = { 'name': name, 'phoneNumber': phoneNumber, 'email': email, 'editMode': false, 'id': this.props.incrementId() };
        const newContact = this.props.contacts.slice();
        newContact.push(obj);
        console.log(obj.id);
        this.props.addToList(newContact);
        console.log(phoneNumber);
        this.addContactToDatabase(name, phoneNumber, email, obj.id);


        this.props.backToHome();

    }
    // adds contact to database
    addContactToDatabase(name, phoneNumber, email, id) {
        if (id = -Infinity) {
            id = 1;
        }
        fetch(`https://phonebook-277012.ey.r.appspot.com/add_user?name=${name}&phoneNumber=${phoneNumber}&email=${email}&id=${id}`, {
            method: "POST",
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
    // Takes user back to homepage
    cancelAddContact() {
        this.props.backToHome();
    }



    render() {
        return (
            <div className="addContact">


                <React.Fragment>
                    <ContactForm
                        addContact={this.addContactToList.bind(this)}
                        contacts={this.props.contacts}
                        newContact={this.state.newContact}
                        cancel={<input className="button" type="button" value="Cancel" onClick={this.cancelAddContact.bind(this)}></input>}
                        title={<h1>Add Contact</h1>}
                        isListItem={this.state.isListItem}

                    />
                </React.Fragment>
            </div>

        )
    }

}
export default AddContact;