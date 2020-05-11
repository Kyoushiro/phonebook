export default function emailValidation(em) {
    var checkFail = false;

    if (em.length == 0 || em === undefined) {
        checkFail = true;
    }
    else {
        var splitEmail = em.split("@");
        if (splitEmail[0].length <= 2) {
            checkFail = true;
        }
    }
    return checkFail;
}