import React, { Component } from 'react';
import AddContact from './components/addContact';
import UpdateContact from "./components/updateContact";
import ContactList from "./components/contactList";
import "./App.css";
import ContactPic from "./images/user-plus-solid.svg";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHomeOpen: true,
      isAddContactOpen: false,
      isListItem: false,
      index: "",
      filtered: [],
      id: 0,
      showPopup: false,
      showUpdateContact: false,

      contacts: []

    }

    this.backToHome = this.backToHome.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateList = this.updateList.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.listOnClick = this.listOnClick.bind(this);
    this.activateEdit = this.activateEdit.bind(this);
    this.deActivateEdit = this.deActivateEdit.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.getContactsFromDB = this.getContactsFromDB.bind(this);
    this.deleteContactFromDB = this.deleteContactFromDB.bind(this);


    //this.listOnClick = this.listOnClick.bind(this);


  }


  // add the new contact to list
  addToList(obj) {
    this.setState({
      contacts: obj
    })
  }

  incrementId() {
    const maxID = Math.max(...this.state.contacts.map(contact => contact.id));
    return maxID + 1
  }

  // update selected contact

  updateList(contact, index) {

    let contacts = [...this.state.contacts];
    var newIndex = contacts.findIndex(cont => cont.id === contact.id);
    let item = { ...contacts[index] };
    item.name = contact.name;
    item.phoneNumber = contact.phoneNumber;
    item.email = contact.email;
    item.id = contact.id;
    contacts[newIndex] = item;
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

    this.setState({
      isListItem: true,
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      index: [index],
      id: contact.id
    })
    this.toggleUpdate();

  }
  // Change view back to Homepage
  backToHome() {
    this.setState({
      showPopup: !this.state.showPopup,
      isListItem: false,
    });
  }
  toggleUpdate() {
    this.setState({
      showUpdateContact: !this.state.showUpdateContact
    })
  }
  // Allows to write into input fields
  updateValue(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // Delete contact from list
  deleteContact(contacts) {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contacts.id)
    }));
    this.deleteContactFromDB(contacts.id);

  }
  // Deletes contact from database
  deleteContactFromDB(id) {
    fetch("http://localhost:8081/delete_user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "id": id
      })



    })
      .then((result) => result.json())
  }

  // when user clicks delete button, opens up confirmation buttons
  activateEdit(contact, index, filteredList) {
    let contacts = [...this.state.contacts];

    var newIndex = contacts.findIndex(cont => cont.id === contact.id);
    contact.editMode = true
    this.setState({ contacts });
  }
  // when user presses cancel when trying to delete a contact, brings back delete button.
  deActivateEdit(contact) {
    let contacts = [...this.state.contacts];
    var newIndex = this.state.contacts.findIndex(cont => cont.phoneNumber === contact.phoneNumber);
    contacts[newIndex].editMode = false
    this.setState({ contacts });
  }
  //Toggles addContact page to either be shown or hidden
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  // Gets contacts from database
  getContactsFromDB() {
    fetch("http://localhost:8081/get_users")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({ contacts: Object.values(result) })
        }


      )
  }

  componentDidMount() {
    this.getContactsFromDB();
  }






  render() {


    var isListItem = this.state.isListItem;


    return (
      <div className="container">
        <div className="form">

          <div className="header">
            <h1>ContactList</h1>
            <input type="image"
              height="50"
              width="50"
              src={ContactPic}
              alt=""
              onClick={this.togglePopup.bind(this)} >

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



        {this.state.showPopup ?

          <React.Fragment>
            <div>
              <AddContact
                contacts={this.state.contacts}
                backToHome={this.backToHome}
                addToList={this.addToList.bind(this)}
                incrementId={this.incrementId.bind(this)}


              />

            </div>
          </React.Fragment>
          : null
        }




        {this.state.showUpdateContact ?


          <UpdateContact
            isListItem={isListItem}
            backToHome={this.backToHome}
            name={this.state.name}
            phoneNumber={this.state.phoneNumber}
            email={this.state.email}
            id={this.state.id}
            contacts={this.state.contacts}
            updateValue={this.updateValue}
            updateList={this.updateList}
            index={this.state.index}
            toggleUpdate={this.toggleUpdate}
          />

          : null}
      </div>
    )
  }





}

export default App;
