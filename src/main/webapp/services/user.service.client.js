function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jannunzi/users';
    var self = this;
    function createUser(user, callback) {}
    function findAllUsers(callback) {}
    function findUserById(userId, callback) {}
    function updateUser(userId, user, callback) {}
    function deleteUser(userId, callback) {}
}
