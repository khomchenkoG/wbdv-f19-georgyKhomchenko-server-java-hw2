(function() {
        var $usernameFld;
        var $passwordFld;
        var $removeBtn;
        var $editBtn;
        var $createBtn;
        var $firstNameFld;
        var $lastNameFld;
        var $roleFld;
        var $userRowTemplate;
        var $tbody;
        var userService = new AdminUserServiceClient();

        var users = [];
        $(main);

        function main() {
            $usernameFld = $("#usernameFld");
            $passwordFld = $("#passwordFld");
            $removeBtn = $(".wbdv-remove");
            $editBtn = $(".wbdv-edit");
            $createBtn = $(".wbdv-create");
            $firstNameFld = $("#firstNameFld");
            $lastNameFld = $("#lastNameFld");
            $userRowTemplate = $(".wbdv-template");
            $tbody = $(".wbdv-tbody");

            $createBtn.click(createUser);
            findAllUsers(users);
        }

        function createUser() {

            const newUsername = $usernameFld.val();
            const newPass = $passwordFld.val();
            const newFirstN = $firstNameFld.val();
            const newLasrN = $lastNameFld.val();
            const newRole = $('#roleFld option:selected').text();

            $usernameFld.val("").blur();
            $passwordFld.val("").blur();
            $firstNameFld.val("").blur();
            $lastNameFld.val("").blur();

            const newUser = {
                username: newUsername,
                password: newPass,
                first_name: newFirstN,
                last_name: newLasrN,
                role: newRole,
                id: (Date.now()) + ''
            }

            fetch("https://wbdv-generic-server.herokuapp.com/api/khomchenkog/users", {
                method: 'post',
                body: JSON.stringify(newUser),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(findAllUsers)
        }

        function findAllUsers() {
            fetch("https://wbdv-generic-server.herokuapp.com/api/khomchenkog/users")
                .then(response => response.json())
                .then(renderUsers)
        }

        // function findUserById(userId) {
        //     return fetch("https://wbdv-generic-server.herokuapp.com/api/khomchenkog/users/" + userId)
        // }


        // function selectUser() {
        //     const editButton = $(event.currentTarget);
        //     const userIdToUpdate = editButton.attr("id");
        //     findUserById(userIdToUpdate).then(userJson => {
        //             (renderEditUser)
        //         })
        //     }

            function deleteUser() {
                const deleteButton = $(event.currentTarget)
                const userIdToDelete = deleteButton.attr("id")

                fetch("https://wbdv-generic-server.herokuapp.com/api/khomchenkog/users/" + userIdToDelete, {
                        method: 'delete'
                    })
                    .then(findAllUsers)
            }



            // function renderEditUser(user) {
            //     $usernameFld.val(user.username);
            //     $passwordFld.val(user.password);
            //     $firstNameFld.val(user.first_name);;
            //     $lastNameFld.val(user.last_name);
            //     $roleFld.val(user.role);

            // }

            //function updateUser() {}

            function renderUser(user) {
                $tr = $userRowTemplate.clone()
                $tr.find(".wbdv-username").html(user.username)
                $tr.find(".wbdv-first-name").html(user.first_name)
                $tr.find(".wbdv-last-name").html(user.last_name)
                $tr.find("#roleFld").html(user.role)

                $removeBtn = $tr.find(".wbdv-remove")
                $removeBtn.click(deleteUser)
                $removeBtn.attr("id", user.id)

                $editBtn = $tr.find(".wbdv-edit")
                $editBtn.click(selectUser)
                $editBtn.attr("id", user.id)


                return $tr;
            }

            function renderUsers(users) {
                $tbody.empty();

                for (var i = 0; i < users.length; i++) {
                    let user_to_render = renderUser(users[i])

                    $tbody.append(user_to_render)
                }
            }
        })();