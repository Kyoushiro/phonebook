import React, { Component } from "react";
import Delete from "../images/delete.png";
import Cancel from "../images/cancel.png";
import Accept from "../images/accept.png";

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

        if (event.target.value !== "") {
            currentList = this.props.contacts;
            newList = currentList.filter(item => {
                const searchName = item.name.toString().toLowerCase();
                const searchEmail = item.email.toString().toLowerCase();
                const filter = event.target.value.toString().toLowerCase();

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

    // needed so list can be mapped
    componentDidMount() {
        this.setState({
            filtered: this.props.contacts
        });

    }


    // Checks which button is clicked and acts accordingly.
    handleClick(contact, index, event, filtered) {


        if (event.target.name === "deleteButton") {
            this.props.deleteContact(contact);
        }
        else if (event.target.name === "deleteConfirm") {

            this.props.activateEdit(contact);

        }
        else if (event.target.name === "deleteCancel") {
            this.props.deActivateEdit(contact);

        }
        else {
            this.props.listOnClick(contact, index);
        }
    }



    render() {

        if (this.state.filtered) {

            return (
                <div className="contactList">


                    <input type="text"
                        className="input"
                        placeholder="Search..."
                        onChange={this.search}
                    />




                    <ul>
                        {this.state.filtered.map((contact, index) =>
                            <li key={contact.phoneNumber}
                                onClick={(event) =>
                                    this.handleClick(contact, index, event, this.state.filtered)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div>{contact.name}</div>
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

        else {
            return (
                <div>
                    <h1>ContactList</h1>
                    <p>No contacts yet..</p>
                </div>
            )
        }

    }
}

export default ContactList;