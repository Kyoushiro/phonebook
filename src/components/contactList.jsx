import React, { Component } from "react";
import Delete from "../images/delete.svg";
import Cancel from "../images/cancel.svg";
import Accept from "../images/accept.svg";

//ToDo: 
/*
 @todo move HTML content to its own components, add/update forms
 @todo move validation functions to separate validation.js file
 @remove unused code
 @comment a bit more on function that do logic operations
*/
class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filtered: [],
            confirmDelete: {},

        }

        this.search = this.search.bind(this);

    }
    // Allows user to search contacts by name and email
    search(event) {
        let currentList = [];
        let newList = [];

        // if search field has a value, do the method

        if (event.target.value !== "") {
            currentList = this.props.contacts;
            // Put everything in lowercase, because filter is case sensitive
            newList = currentList.filter(item => {
                const searchName = item.name.toString().toLowerCase();
                const searchEmail = item.email.toString().toLowerCase();
                const filter = event.target.value.toString().toLowerCase();
                // returns new list that includes either name or email
                return (
                    searchName.includes(filter) +
                    searchEmail.includes(filter)
                );
            });
        } else {
            newList = this.props.contacts;
        }
        this.setState({
            filtered: newList
        })

    }


    // Checks which button is clicked and acts accordingly.
    handleClick(contact, index, event) {

        // if delete is pressed, delete a contact from list
        if (event.target.name === "deleteButton") {
            this.props.deleteContact(contact);

            this.setState(prevState => ({
                filtered: prevState.filtered.filter(contact => contact !== contact)
            }));

        }
        // if confirm button is pressed, activates edit mode
        else if (event.target.name === "deleteConfirm") {

            this.props.activateEdit(contact, index, this.state.filtered);
            this.setState(prevState => ({
                filtered: prevState.filtered.filter(contact => contact !== contact)
            }));

        }
        // if cancel button is pressed, deactivates edit mode
        else if (event.target.name === "deleteCancel") {
            this.props.deActivateEdit(contact);

        }
        // opens update contact view on the clicked contact
        else {
            this.props.listOnClick(contact, index);
        }
    }

    componentDidUpdate(prevProps) {

        var newList = [];
        // Compares contact lists and if there's a difference, filters list according to search input, if there is text
        if (prevProps.contacts !== this.props.contacts) {
            //Filters according to search input if there is text
            if (this.refs.searchInput.value !== "") {
                newList = this.props.contacts.filter(item => {
                    const searchName = item.name.toString().toLowerCase();
                    const searchEmail = item.email.toString().toLowerCase();
                    const filter = this.refs.searchInput.value.toString().toLowerCase();

                    return (
                        searchName.includes(filter) +
                        searchEmail.includes(filter)
                    );
                });
            }
            else {
                newList = this.props.contacts
            }
            this.setState({
                filtered: newList
            });
        }
    }





    render() {



        return (


            <div className="contactList">

                <input type="text"
                    className="inputSearch"
                    placeholder="Search..."
                    onChange={this.search}
                    ref="searchInput"
                />

                <ul>
                    {this.state.filtered.map((contact, index) =>
                        <li key={contact.id}
                            onClick={(event) =>
                                this.handleClick(contact, index, event)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="cell">{contact.name}</div>
                            {contact.editMode ? [<input
                                type="image"
                                name="deleteButton"
                                src={Accept}
                                alt=""
                                width="20"
                                height="20"

                            />, <input
                                type="image"
                                alt=""
                                name="deleteCancel"
                                src={Cancel}
                                width="20"
                                height="20"
                            />]
                                :
                                <input
                                    type="image"
                                    name="deleteConfirm"
                                    src={Delete}
                                    alt=""
                                    width="20"
                                    height="20"
                                />}
                        </li>)}
                </ul>


            </div>
        )
    }
}

export default ContactList;