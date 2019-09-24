function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/khomchenkog/users';
    var self = this;

    function createUser(user, callback) {
        fetch(this.url, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(callback)
    }

    function findAllUsers(callback) {
        fetch(this.url)
            .then(response => response.json())
            .then(callback)
    }

    function findUserById(userId, callback) {
        return fetch(this.url + '/' + userId)
            .then(response => response.json())
            .then(callback)
    }

    function updateUser(userId, user, callback) {
        fetch(this.url + '/' + userId, {
            method: 'put',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(callback)
    }

    function deleteUser(userId, callback) {
                fetch(this.url + '/' + userId, {
                method: 'delete'
            })
            .then(callback)
    }
}