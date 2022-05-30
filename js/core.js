/**
 * Definition des fonction et configution
 */

// Configuration de base du clien HTTP
jQuery.ajaxSetup({
    async:false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Permet de construire dynamiquement le point d'entré (l'url)
var uri = function (route) {
    return "http://127.0.0.1:8087/api"+route
}

//permet de Recevoir les données au format JSON depuis l'API
function get(uri, params = {}) {

    var jqxhr = $.get( uri, function() {
        console.log("[REQUEST DONE]");

      }).done(function(data) {
      
        console.log("[REQUEST SUCCESS"); 
          
      }).fail(function() {

        console.log("[REQUEST ERROR]");
        
      }).always(function() {

          console.log("[REQUEST ENDS]");
    });

    return jqxhr;
}

//permet d'envoyer les données au format JSON vers l'API

function post(uri, params) {
    console.log(uri, params);

    var jqxhr = $.post( uri, params);

    return jqxhr;
}


// Affiche les données reçues dans un tableau html
function fillTable(employees){
    var rows = '';
    $.each(employees.responseJSON.response, function(i, item) { 

        let row = `
            <tr class="emp-row" >
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>`+ item.nom +`</td>
                <td>`+ item.email +`</td>
                <td>`+ item.adresse +`</td>
                <td>`+ item.phone +`</td>
                <td>
                    <a href="#editEmployeeModal-`+ item.id +`"  class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Modifier">&#xE254;</i></a>
                    <a href="#" class="delete" data-id="`+ item.id +`" ><i class="material-icons" data-toggle="tooltip" title="Supprimer">&#xE872;</i></a>
                </td>
            </tr>
        `;
        rows += row;

    });

    $('tbody').html(rows);
}

function removeRows() {
    $('.emp-row').remove();
}

// Met à jour les données de l'employé
function updateEployee() {
    $(document).ready(function () {
        $(".updateEmp").submit(function (event) {
    
         let id = $(this).attr("data-id");
    
          let formData = JSON.stringify({
            nom: $(this).find('input[class*="updateName"]').val(),
            email: $(this).find('input[class*="updateEmail"]').val(),
            adresse:  $(this).find('input[class*="updateAdress"]').val(),
            phone: $(this).find('input[class*="updatePhone"]').val(),
            id : id
         });
         
    
         let url = '/employe/'+id;
             url = uri(url)
      
    
        let Addemployee = $.ajax({
            type: 'PUT',
            url : url,
            data : formData
        });
    
        //   console.log(Addemployee.responseJSON);
    
          event.preventDefault();
          window.location.reload();
        });
    
    
     });
}

// Crée un employé
function createEployee() {
    $(document).ready(function () {
        $("#newEmp").submit(function (event) {
    
          var formData = JSON.stringify({
            nom: $("#newName").val(),
            email: $("#newEmail").val(),
            adresse: $("#newAdress").val(),
            phone: $("#newPhone").val(),
         });
      
        let Addemployee = $.post(
            uri('/employe'),
            formData   
        );
    
        //   console.log(Addemployee.responseJSON);
    
          event.preventDefault();
          window.location.reload();
        });
    
    
     });
}

// Supprime un employé

function removeEmployee() {
    $('.delete').on('click',function (e) {

        let id = $(this).attr("data-id");
        let url = '/employe/'+id;
            url = uri(url);

        console.log("delete :"+ id);

        var formData = JSON.stringify({
            id: id,
         });
        
        let Addemployee = $.ajax({
            type: 'DELETE',
            url : url,
            data : formData
        });
    
          console.log(Addemployee.responseJSON);
    
          e.preventDefault();
         window.location.reload();
    })
}


// Remplit les informations de l'employé dans une fenetre modale
function fillModals(employees){
    var rows = '';
    $.each(employees.responseJSON.response, function(i, item) { 

        let row = `
        <div id="editEmployeeModal-`+ item.id +`" class="modal fade" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <form method="POST" class="updateEmp" data-id="`+ item.id +`">
                        <div class="modal-header">						
                            <h4 class="modal-title">Modifier</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">					
                            <div class="form-group">
                                <label>Nom</label>
                                <input type="text" class="form-control updateName" value="`+ item.nom +`" >
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control updateEmail"  value="`+ item.email +`">
                            </div>
                            <div class="form-group">
                                <label>Adresse</label>
                                <input class="form-control updateAdress" value="`+ item.adresse +`" >
                            </div>
                            <div class="form-group">
                                <label>Téléphone</label>
                                <input type="text" class="form-control updatePhone" value="`+ item.phone +`">
                            </div>					
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="submit" class="btn btn-info" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;

        rows += row;

    });

    $('#editEmp').html(rows);
}

