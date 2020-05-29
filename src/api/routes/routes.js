/**
 *  @swagger
 * /get_users:
 *  get:
 *    description: Use to request all contacts
 *    responses:
 *      '200':
 *        description: Successfully got all contacts
 *      '508':
 *        description: Connection timed out
 *
 *
 */
function getUsers(pool, array, res) {
    // Gets all contacts from database
    var sql = `SELECT * FROM contacts`;
    pool.query(sql, function (err, data) {
        if (err) throw err;
        array.length = 0;
        array.push(JSON.stringify(data));


        res.send(data);
        res.end();

    });

}
/**
 *  @swagger
 * /add_user:
 *  post:
 *    description: Use to add a new user
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Name of the contact
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *      - name: phoneNumber
 *        in: query
 *        description: Phonenumber of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: query
 *        description: Email of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully added a new contact
 *      '508':
 *        description: Connection timed out
 *      
 *
 */
async function addUser(req, res, array, pool) {
    var name = req.query.name;
    var phoneNumber = req.query.phoneNumber;
    var email = req.query.email;
    var id;
    console.log("LETS SEE THE ARRAY");
    console.log(array);
    console.log(JSON.parse(array));
    // Checking request sent id and then creating new id for new contact accordingly
    if (req.query.id === null || req.query.id === undefined) {

        var newId = JSON.parse(array);
        var newArray = newId.map(data => data.id);
        var maxID = Math.max(...newArray);
        console.log(maxID);
        id = maxID + 1;
        console.log(id);
    }
    else {
        id = req.body.id;
    }

    // Adds new contact to database
    var sql = `INSERT INTO contacts (id, name, phonenumber, email ) VALUES ('${id}', '${name}', '${phoneNumber}', '${email}')`;

    pool.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record updated");
        array.push(JSON.stringify(data));
    });
    //var obj = { 'id': id, 'name': name, 'phoneNumber': phoneNumber, 'email': email }

    res.status(200).send("successfully added a new contact").end();

}
/**
 *  @swagger
 * /delete_user:
 *  post:
 *    description: Use to delete a contact
 *    parameters:
 *      - name: id
 *        in: query
 *        description: Id of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: successfully deleted a contact
 *      '508':
 *        description: Connection timed out
 *
 */
function deleteUser(req, res, pool) {

    id = req.query.id
    // Deletes user from database by id
    var sql = `DELETE FROM contacts WHERE id='${id}'`
    pool.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record deleted");
        res.send(data)
    });
    res.end();
}
/**
 *  @swagger
 * /update_user:
 *  put:
 *    description: Use to update a contact
 *    parameters:
 *      - name: name
 *        in: query
 *        description: Name of the contact
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *      - name: phoneNumber
 *        in: query
 *        description: Phonenumber of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: query
 *        description: Email of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: id
 *        in: query
 *        description: Id of the contact
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Successfully updated a contact
 *      '508':
 *        description: Connection timed out
 *
 */
function updateUser(req, res, pool) {

    name = req.query.name,
        phoneNumber = req.query.phoneNumber,
        email = req.query.email,
        id = req.query.id
    // Updates user with given id
    var sql = `UPDATE contacts SET name = '${name}', phoneNumber = '${phoneNumber}',
    email = '${email}' WHERE id='${id}'`
    pool.query(sql, function (err, data) {
        if (err) throw err;
        console.log("record updated");
        res.send(data)
    });

    res.end();
}
module.exports = { getUsers, addUser, deleteUser, updateUser }