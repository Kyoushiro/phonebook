import React, { Component } from "react";
import "../App.css";
import BackArrow from "../images/arrowLeft.svg";

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
        this.cancelAddContact = this.cancelAddContact.bind(this);
        this.cancelUpdateContact = this.cancelUpdateContact.bind(this);
        this.getFormValues = this.getFormValues.bind(this);
        this.handleUpdateContact = this.handleUpdateContact.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
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
        if (event.target.value === "" || regex.test(event.target.value) === true) {

            this.setState({ [event.target.name]: event.target.value })
        }
    }

    // When user presses save, adds contact

    handleSubmit(event) {
        event.preventDefault();
        console.log(event.target.name.value);
        var name = event.target.name.value;
        var phoneNumber = event.target.phoneNumber.value;
        var email = event.target.email.value;

        console.log("validation states:");
        console.log(this.state.emailWrong);
        console.log(this.state.phoneNumberWrong);


        if (this.state.emailWrong || this.state.phoneNumberWrong || phoneNumber === "" || email === "") {
            alert("form not valid yet");
        }
        else {
            this.props.addContact(name, phoneNumber, email);
        }


    }

    // Takes user back to homepage
    cancelAddContact() {
        this.props.backToHome();
    }
    cancelUpdateContact() {
        this.props.toggleUpdate();
    }

    // updates the contact

    handleUpdateContact(event) {
        event.preventDefault();
        var name = event.target.name.value;
        var phoneNumber = event.target.phoneNumber.value;
        var email = event.target.email.value;
        var id = event.target.id.value;
        var contact = { 'name': name, 'phoneNumber': phoneNumber, 'email': email, 'id': id };
        if (this.state.emailWrong || this.state.phoneNumberWrong) {
            alert("form not valid yet");
        }
        else {
            this.props.updateContact(contact)
        }

    }

    validatePhoneNumber(event) {
        event.preventDefault();





        var regex = /^((04[0-9]{1})(\s?|-?)|019(\s?|-?)|[+]?358(\s?|-?)19|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|\-)?[0-9]{2,3})$/;

        if (event.target.value === undefined) {
            this.setState({
                phoneNumberWrong: true
            })
        }

        else if (regex.test(event.target.value) === false) {
            this.setState({
                phoneNumberWrong: true

            })

        }
        else if (this.props.contacts.some(contact => contact.phoneNumber === event.target.value) === true) {


            if (this.props.isListItem) {
                var filteredId = this.props.contacts.findIndex(obj => obj.id === this.props.id);
                var filteredPhone = this.props.contacts.findIndex(obj => obj.phoneNumber === event.target.value);


                if (regex.test(event.target.value) === false || filteredId !== filteredPhone) {
                    this.setState({
                        phoneNumberWrong: true
                    })
                }
                else {
                    this.setState({
                        phoneNumberWrong: false
                    })
                }
            }
            else {
                this.setState({
                    phoneNumberWrong: true
                })
            }




        }
        else {
            this.setState({
                phoneNumberWrong: false
            })
        }
    }

    validateEmail(event) {
        var splitEmail = event.target.value.split("@");
        if (splitEmail[0].length < 3 && splitEmail !== undefined) {
            this.setState({
                emailWrong: true
            })
        }
        else {
            this.setState({
                emailWrong: false
            })
        }
    }


    render() {

        var isListItem = this.props.isListItem;
        var title;
        var cancel;
        var onSubmit;
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

            onsubmit = this.handleUpdateContact;

            cancel = <input type="image" height="30" width="30" src={BackArrow} alt="" value="Cancel" onClick={this.cancelUpdateContact}></input>
        }

        else {

            title = <h1>Add Contact</h1>;
            onsubmit = this.handleSubmit;

            cancel = <input className="button" type="button" value="Cancel" onClick={this.cancelAddContact}></input>
            //          onSubmit = this.handleSubmit;

        }

        return (
            <React.Fragment>
                <div className="contactContainer">
                    <div className="contactForm">


                        <form className="form" onSubmit={onSubmit}>
                            {title}
                            <label>
                                Name:
                    </label>
                            <br />
                            <input
                                classname="inputField"
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
                                classname="inputField"
                                name="phoneNumber"
                                type="text"
                                defaultValue={this.props.phoneNumber}
                                onChange={this.numberHandler}
                                onKeyUp={this.validatePhoneNumber}
                            />
                            {warning2}

                            <br />
                            <br />

                            <label>
                                Email:
                    </label>
                            <br />
                            <input
                                classname="inputField"
                                name="email"
                                type="email"
                                defaultValue={this.props.email}
                                onChange={this.statusHandler}
                                onKeyUp={this.validateEmail}
                            />
                            {warning1}
                            <br /> <br />
                            {cancel}
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