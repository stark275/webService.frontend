

var employees = get(uri('/employe'));

console.log(employees.responseJSON);

fillTable(employees);

fillModals(employees);

removeEmployee() 

// fillTable(employees)

//removeRows()


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

      console.log(Addemployee.responseJSON);

      event.preventDefault();
      window.location.reload();
    });


 });

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
    
      console.log(Addemployee.responseJSON);

      event.preventDefault();
      window.location.reload();
    });


 });






