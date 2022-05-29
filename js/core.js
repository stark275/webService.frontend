jQuery.ajaxSetup({
    async:false,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

var uri = function (route) {
    return "http://127.0.0.1:8087/api"+route
}


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

function post(uri, params) {
    console.log(uri, params);

    var jqxhr = $.post( uri, params);

    return jqxhr;
}



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


function removeEmployee() {
    $('.delete').on('click',function (e) {

        let id = $(this).attr("data-id");
        let url = '/'+id;
            url = uri(url)
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
        //   window.location.reload();
    })
}

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

