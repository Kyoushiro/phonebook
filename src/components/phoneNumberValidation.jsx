export default function phoneNumberValidation(number, contactList, isListItem, id) {
    var checkFail = false;


    if (number.length == 0 || number === undefined) {
        checkFail = true
    }
    else {
        var regex = /^((04[0-9]{1})(\s?|-?)|019(\s?|-?)|[+]?358(\s?|-?)19|050(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|\-)?[0-9]{2,3})$/;
        if (regex.test(number) === false) {
            checkFail = true;

        }

        //checks if contact number already exists in contact list
        if (contactList.some(contact => contact.phoneNumber === number) === true) {
            // Checks if it is currently a list item.
            if (isListItem) {
                var filteredId = contactList.findIndex(obj => obj.id === id);
                var filteredPhone = contactList.findIndex(obj => obj.phoneNumber === number);
                // checks if the index of id and the phonenumber match.
                if (regex.test(number) === false || filteredId !== filteredPhone) {
                    checkFail = true;
                }
                else {
                    checkFail = false
                }
            }
            else {
                checkFail = true;
            }
        }



        else {
            checkFail = false;
        }
    }
    return checkFail;
}