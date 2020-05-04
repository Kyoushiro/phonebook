import React, { Component } from "react";
import Delete from "../images/delete.svg";
import Cancel from "../images/cancel.svg";
import Accept from "../images/accept.svg";

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
        console.log("after search");
        console.log(this.state.filtered);
        console.log(newList);

    }

    // needed so list can be mapped
    componentDidMount() {
        console.log("is called");
        this.setState({
            filtered: this.props.contacts
        });
        console.log("filtered list on didmount");
        console.log(this.state.filtered);

    }




    // Checks which button is clicked and acts accordingly.
    handleClick(contact, index, event) {


        if (event.target.name === "deleteButton") {
            console.log("let's delete");
            this.props.deleteContact(contact);

            this.setState(prevState => ({
                filtered: prevState.filtered.filter(contact => contact !== contact)
            }));

            console.log("new filtered list:");
            console.log(this.state.filtered);
            console.log(this.props.contacts);


        }
        else if (event.target.name === "deleteConfirm") {

            this.props.activateEdit(contact, index, this.state.filtered);
            this.setState(prevState => ({
                filtered: prevState.filtered.filter(contact => contact !== contact)
            }));

        }
        else if (event.target.name === "deleteCancel") {
            this.props.deActivateEdit(contact);

        }
        else {
            this.props.listOnClick(contact, index);
        }
    }

    componentDidUpdate(prevProps) {

        var newList = [];

        if (prevProps.contacts !== this.props.contacts) {

            if (this.refs.searchInput.value !== "") {
                console.log("we are doing this");
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
        console.log(this.state.filtered);
    }



    render() {



        if (this.state.filtered) {

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