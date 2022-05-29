

var employees = get(uri('/employe'));

console.log(employees.responseJSON);

fillTable(employees)

// fillTable(employees)

//removeRows()

// var param = JSON.stringify({
//     nom: 'Stark',
//     email: 'How@lolo.com',
//     adresse: 'Howard street',
//     phone: '46469649649',
// });


// var Addemployee = $.post(
//     uri('/employe'),
//     param   
// );

// console.log(Addemployee.responseJSON);

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

        console.log(Addemployee);
        console.log("SUBMIT");

  
      event.preventDefault();
      window.location.reload();
    });

    console.log("READY!!");

 });






