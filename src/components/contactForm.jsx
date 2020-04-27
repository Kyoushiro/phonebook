import React, { Component } from "react";
import "../App.css";
import BackArrow from "../images/back.png";

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            phoneNumber: "",
            email: "",
            emailWrong: false,
            phoneNumberWrong: false
        }

        var contacts = [];

        this.statusHandler = this.statusHandler.bind(this);
        this.numberHandler = this.numberHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.getFormValues = this.getFormValues.bind(this);
        this.handleUpdateContact = this.handleUpdateContact.bind(this);
        this.validateContact = this.validateContact.bind(this);
    }

    //

    getFormValues() {
        var name = this.props.name;
        var phoneNumber = this.props.phoneNumber;
        var email = this.props.email;
        this.setState({
            name: [name],
            phoneNumber: [phoneNumber],
            email: [email]
        })
    }

    componentDidMount() {

        this.getFormValues();
        console.log(this.props.contacts);


    }


    // Updates input text when writing
    statusHandler(event) {

        this.setState({
            [event.target.name]: event.target.value
        })

    }
    // only allows numbers and + sign to be written
    numberHandler(event) {
        const regex = /^[0-9\b\+]+$/;
        if (event.target.value === "" || regex.test(event.target.value)) {
            this.setState({ [event.target.name]: event.target.value })
        }
    }

    // When user presses save, adds contact

    handleSubmit(event) {
        event.preventDefault();
        var name = event.target.name.value;
        var phoneNumber = event.target.phoneNumber.value;
        var email = event.target.email.value;
        this.props.addContact(name, phoneNumber, email);
    }

    // Takes user back to homepage
    cancel() {
        this.props.backToHome();
    }

    // updates the contact

    handleUpdateContact(event) {
        var name = event.target.name.value;
        var phoneNumber = event.target.phoneNumber.value;
        var email = event.target.email.value;
        var contact = { 'name': name, 'phoneNumber': phoneNumber, 'email': email };
        this.props.updateContact(contact)
    }

    validateContact(event) {
        event.preventDefault();
        console.log(this.props.contacts);
        console.log(event.target.email.value)
        var splitEmail = event.target.email.value.split("@");

        var regex = /^((04[0-9]{1})(\s?|-?)|019(\s?|-?)|[+]?358(\s?|-?)19|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|\-)?[0-9]{1,4})$/;

        if (splitEmail[0].length < 3) {
            console.log("email invalid");
            this.setState({
                emailWrong: true
            })
        }
        if (regex.test(event.target.phoneNumber.value) === false) {
            this.setState({
                phoneNumberWrong: true
            })

        }
        else if (this.props.contacts.some(contact => contact.phoneNumber === event.target.phoneNumber.value) === true) {
            if (this.props.isListItem) {
                console.log(this.props.index);
                if (regex.test(event.target.phoneNumber.value) === false) {
                    this.setState({
                        phoneNumberWrong: true
                    })
                }
                else {
                    this.handleUpdateContact(event)
                }

            }
            else {
                this.setState({
                    phoneNumberWrong: true
                })
            }


        }
        else {
            if (this.props.isListItem) {
                console.log("updating");
                this.handleUpdateContact(event)
            }
            else {
                this.handleSubmit(event);
            }
        }
    }




    render() {

        var isListItem = this.props.isListItem;
        var title;
        var cancel;
        //  var onSubmit;
        var phoneNumberWrong = this.state.phoneNumberWrong;
        var emailWrong = this.state.emailWrong
        var warning1;
        var warning2;

        if (emailWrong) {
            warning1 = <p>Please write valid email</p>
        }
        if (phoneNumberWrong) {
            warning2 = <p>Either this phonenumber already exists or it is not valid</p>
        }

        if (isListItem) {
            this.state.name = this.props.name
            title = <h1>View Contact</h1>;

            //      onsubmit = this.handleUpdateContact;

            cancel = <input type="image" height="30" width="30" src={BackArrow} alt="" value="Cancel" onClick={this.cancel}></input>
        }

        else {

            title = <h1>Add Contact</h1>;

            cancel = <input className="button" type="button" value="Cancel" onClick={this.cancel}></input>
            //          onSubmit = this.handleSubmit;

        }

        return (
            <React.Fragment>
                <div className="contactForm">


                    <form className="form" onSubmit={this.validateContact}>
                        {title}
                        <label>
                            Name:
                    </label>
                        <br />
                        <input
                            name="name"
                            type="text"
                            defaultValue={this.props.name}
                            onChange={this.statusHandler}
                        />

                        <br />
                        <br />
                        <label>
                            Phonenumber:
                    </label>
                        <br />
                        <input
                            name="phoneNumber"
                            type="text"
                            defaultValue={this.props.phoneNumber}
                            onChange={this.numberHandler}
                        />
                        {warning2}

                        <br />
                        <br />

                        <label>
                            Email:
                    </label>
                        <br />
                        <input
                            name="email"
                            type="email"
                            defaultValue={this.props.email}
                            onChange={this.statusHandler}
                        />
                        {warning1}
                        <br /> <br />
                        {cancel}
                        <input
                            type="submit"
                            value="Save"
                            className="buttons"
                        />
                    </form>


                </div>

            </React.Fragment>
        )
    }



}
export default ContactForm;