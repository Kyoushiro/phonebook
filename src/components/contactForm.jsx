import React, { Component } from "react";
import "../App.css";
import emailValidation from "./emailValidation";
import phoneNumberValidation from "./phoneNumberValidation";

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
        this.getFormValues = this.getFormValues.bind(this);
        this.handleUpdateContact = this.handleUpdateContact.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    // Gets form values from parent. Empty if it's add contact and filled with contact data if it's list item

    getFormValues() {
        var name = this.props.name;
        var phoneNumber = this.props.phoneNumber;
        var email = this.props.email;
        this.setState({
            name: name,
            phoneNumber: phoneNumber,
            email: email
        })


    }
    // if listitem, gives state contact values from prop. Else it gives them empty values
    componentDidMount() {

        this.getFormValues();
    }


    // Updates input text when writing
    statusHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    // only allows numbers and + sign to be written
    numberHandler(event) {
        const regex = /^[0-9\b\+]+$/;
        if (event.target.value === "" || regex.test(event.target.value) === true) {

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




    // updates the contact

    handleUpdateContact(event) {
        event.preventDefault();
        var name = event.target.name.value;
        var phoneNumber = event.target.phoneNumber.value;
        var email = event.target.email.value;
        var id = this.props.id;
        var contact = { 'name': name, 'phoneNumber': phoneNumber, 'email': email, 'id': id };

        this.props.updateContact(contact)

    }
    // Validates phonenumber
    validatePhoneNumber(number, contacts, isListItem, id) {
        var checkFail = phoneNumberValidation(number, contacts, isListItem, id);

        return checkFail;
    }
    // Validates email
    validateEmail(em) {
        var checkFail = emailValidation(em);
        return checkFail;
    }
    //validates form and then either calls update contact method or add contact method
    validateForm(event) {
        event.preventDefault();
        var emailWrong = this.validateEmail(event.target.email.value);
        var phoneNumberWrong = this.validatePhoneNumber(event.target.phoneNumber.value, this.props.contacts, this.props.isListItem, this.props.id);

        //checks if email validation and phonenumber validation went through
        if (emailWrong === false && phoneNumberWrong === false) {
            if (this.props.isListItem) {
                this.handleUpdateContact(event);
            }
            else {
                this.handleSubmit(event);
            }
        }
        // if email or phonenumber validation didn't go through, change their state to wrong
        else {
            this.setState({
                emailWrong: emailWrong,
                phoneNumberWrong: phoneNumberWrong
            })
        }
    }


    render() {

        return (
            <React.Fragment>
                <div className="contactContainer">
                    <div className="contactForm">


                        <form className="form" onSubmit={this.validateForm}>
                            {this.props.title}
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
                            {
                                this.state.phoneNumberWrong === true &&
                                <p>Either phoneNumber is not in correct format or it already exists in contacts</p>
                            }

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
                            {
                                this.state.emailWrong === true &&
                                <p>Please write valid email</p>
                            }

                            <br /> <br />
                            {this.props.cancel}
                            <div className="divider" />
                            <input
                                type="submit"
                                value="Save"
                                className="buttons"
                            />
                        </form>


                    </div>
                </div>

            </React.Fragment>
        )
    }



}
export default ContactForm;