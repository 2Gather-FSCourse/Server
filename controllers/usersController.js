exports.usersController = {
    getUsers: (req, res) => {
        res.send('GET /users');
    },
    getUserByID: (req, res) => {
        res.send('GET /users/:userId');
    },
    addUser: (req, res) => {
        res.send('POST /users');
    },
    updateUser: (req, res) => {
        res.send('PUT /users/:userId');
    },
    deleteUser: (req, res) => {
        res.send('DELETE /users/:userId');
    }
}
