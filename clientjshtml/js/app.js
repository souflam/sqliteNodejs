$(document).ready(function () {
    var urlUser = "http://127.0.0.1:3000/users/";
    var users;
    var idUserData;
    //modals
    $('#ajoutModif').modal();


    $('#ajout').click(function (e) {
        e.preventDefault();
        $('#updateUser').addClass('hidden');
        $('#submitUser').removeClass('hidden');
        $('#deleteAction').addClass('hidden');
        $('#ajoutModif').modal('open');
    });



    //ajouter un nouveau element

    $('#addUser').submit(function (e) {
        e.preventDefault();
        $this = $(this);
        var typeAction = $this.find('.btn:visible').data('type');

        var formData = $('#addUser').serialize();
        alert(typeAction);
        if(typeAction == 'ajout') {
            alert(typeAction);

            ajouter(formData);
        } else if(typeAction == 'modification'){
            modifier(formData, idUserData);
        }

    });

    //suppresion
    $('#deleteAction').click(function (e) {
        e.preventDefault();
        swal("etes-vous sur de vouloir supprimer cet element")
        .then((value) => {
            supprimer(idUserData);
        });
    })
    //update user
    $('.collection').on('click', '.user-element', function (e) {
        e.preventDefault();
        $this = $(this);
        //afficher le bouton
        $('#submitUser').addClass('hidden');
        $('#updateUser').removeClass('hidden');
        $('#deleteAction').removeClass('hidden');
        var idUser = $this.attr('data-id');
         idUserData = $this.data('id');

        $('#ajoutModif').modal('open');
        $.get(urlUser + idUserData, function(user) {
            $('#nom').val(user.nom);
            $('#prenom').val(user.prenom);
            $('#email').val(user.email);
        });


    });
    //functions

    var listUsers = function () {
        $('#users_list').html('');
        $.ajax({
            url: urlUser,
        })
            .done(function(data) {
                users = data;

                console.log(users);
                //recuperation de nombre des users
                $('#number_users').html(users.length);

                var list = '';
                $.each(users, function(index, user) {

                    //<a href="#!" class="collection-item user-element">
                    // <span class="badge">1</span>
                    // Alan
                    // </a>
                    list += `
            <a data-id="${user.id}" href="#!" class="collection-item user-element">
                 <span class="badge">
                    ${user.id}
                 </span>
                 ${user.nom} ${user.prenom}
            </a>
            `;
                });

                $('#users_list').append(list);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    };
    //ajouter
    var ajouter = function (data) {
        $.ajax({
            url: urlUser,
            type: 'POST',
            dataType: 'dataType',
            data: data,
            cache : false,
            processData: false
        })
            .done(function() {
                $('#ajoutModif').modal('close');
                listUsers();
            }).fail(function () {
                $('#ajoutModif').modal('close');
                listUsers();
            });
    }
    //modification
    var modifier = function (data, idUser) {
        $.ajax({
            url: urlUser + idUser,
            type: 'PUT',
            dataType: 'dataType',
            data: data,
            cache : false,
            processData: false
        })
            .done(function() {
                $('#ajoutModif').modal('close');
                listUsers();
            }).fail(function () {
                $('#ajoutModif').modal('close');
                listUsers();
            });
    }
    //supprimer
    var supprimer = function (idUser) {
        $.ajax({
            url: urlUser + idUser,
            type: 'DELETE',
            dataType: 'dataType',
            cache : false,
            processData: false
        })
            .done(function() {
                $('#ajoutModif').modal('close');
                listUsers();
            }).fail(function () {
            $('#ajoutModif').modal('close');
            listUsers();
        });
    }
    //execute functions

    listUsers();
});