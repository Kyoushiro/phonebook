


let addUserSwag = function () {
    // Routes
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
     *        description: Successfully added a user
     *
     */
}
/**
 *  @swagger
 * /get_users:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        descripti
 *
 *
 */
/**
 *  @swagger
 * /delete_user:
 *  post:
 *    description: Use to delete a user
 *    responses:
 *      '200':
 *        description: successfully deleted a user
 *
 */

/**
 *  @swagger
 * /update_user:
 *  put:
 *    description: Use to update a user
 *    responses:
 *      '200':
 *        description: Successfully updated a user
 *
 */

exports.addUserSwag = addUserSwag;