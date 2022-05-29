function uri(route) {
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
            <tr class="emp-row">
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
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        `;

        // let el = $("<tr>").addClass( "emp-row" ).html(row).html('#recordsTable');

    rows += row;

        // console.log(el);

    });

    $('tbody').html(rows);
}

function removeRows() {
    $('.emp-row').remove();
}

