import React, { Component } from 'react';
import AddContact from './components/addContact';
import UpdateContact from "./components/updateContact";
import ContactList from "./components/contactList";
import "./App.css";
import ContactPic from "./images/pngwave.png";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHomeOpen: true,
      isAddContactOpen: false,
      isListItem: false,
      index: "",
      filtered: [],

      contacts: [{
        name: "",
        phoneNumber: "",
        email: "",
        editMode: false


      }]

    }

    this.backToHome = this.backToHome.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.listOnClick = this.listOnClick.bind(this);
    this.activateEdit = this.activateEdit.bind(this);
    this.deActivateEdit = this.deActivateEdit.bind(this);


    //this.listOnClick = this.listOnClick.bind(this);


  }


  // add the new contact to list
  addToList(obj) {
    this.setState({
      contacts: obj
    })
    console.log(this.state.contacts);
  }

  // update selected contact

  updateList(contact, index) {
    let contacts = [...this.state.contacts];
    let item = { ...contacts[index] };
    item.name = contact.name;
    item.phoneNumber = contact.phoneNumber;
    item.email = contact.email;
    contacts[index] = item;
    this.setState({ contacts });

  }


  // Change page view to AddContact
  transferToAddContact() {
    this.setState({
      isAddContactOpen: true,
      isHomeOpen: false
    });

  }
  // When person clicks on the contact, open that contacts detail page
  listOnClick(contact, index) {
    console.log(index);
    console.log(contact.name);
    console.log(contact.phoneNumber);

    this.setState({
      isHomeOpen: false,
      isListItem: true,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      index: [index]
    })

  }
  // Change view back to Homepage
  backToHome() {
    this.setState({
      isAddContactOpen: false,
      isListItem: false,
      isHomeOpen: true
    });
  }
  // Allows to write into input fields
  updateValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // Delete contact from list
  deleteContact(id) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact !== id)
    }));
  }
  // when user clicks delete button, opens up confirmation buttons
  activateEdit(index) {
    let contacts = [...this.state.contacts];
    contacts[index].editMode = true
    this.setState({ contacts });
  }
  // when user presses cancel when trying to delete a contact, brings back delete button.
  deActivateEdit(index) {
    let contacts = [...this.state.contacts];
    contacts[index].editMode = false
    this.setState({ contacts });
  }






  render() {

    var isHomeOpen = this.state.isHomeOpen;
    var isAddContactOpen = this.state.isAddContactOpen;
    var isListItem = this.state.isListItem;


    if (isHomeOpen) {
      return (
        <div className="form">

          <div className="header">
            <h1>ContactList</h1>
            <input type="image"
              height="50"
              width="50"
              src={ContactPic}
              alt=""
              onClick={this.transferToAddContact.bind(this)} >

            </input>

          </div>

          <React.Fragment>
            <div>
              <ContactList
                contacts={this.state.contacts}
                listOnClick={this.listOnClick}
                deleteContact={this.deleteContact}
                activateEdit={this.activateEdit}
                deActivateEdit={this.deActivateEdit}
              />
            </div>
          </React.Fragment>
        </div>




      );
    }

    else if (isAddContactOpen) {
      return (
        <React.Fragment>
          <div>
            <AddContact
              contacts={this.state.contacts}
              backToHome={this.backToHome}
              addToList={this.addToList.bind(this)}

            />

          </div>
        </React.Fragment>
      );
    }

    else {
      return (
        <div>
          <UpdateContact
            isListItem={isListItem}
            backToHome={this.backToHome}
            name={this.state.name}
            phoneNumber={this.state.phoneNumber}
            email={this.state.email}
            contacts={this.state.contacts}
            updateValue={this.updateValue}
            updateList={this.updateList}
            index={this.state.index}
          />
        </div>
      )
    }




  }
}

export default App;
