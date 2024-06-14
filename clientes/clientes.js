$(document).ready(function () {
    cargarListaClientes();

    $("#guardarClienteBtn").click(function () {
        guardarCliente();
    });
});

function cargarListaClientes() {
    $.ajax({
        url: "clientes.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $("#clientesTable tbody").empty();

            $.each(data, function (index, cliente) {
                var row = "<tr>" +
                    "<td>" + cliente.id + "</td>" +
                    "<td>" + cliente.documento + "</td>" +
                    "<td>" + cliente.nombre + "</td>" +
                    "<td>" + cliente.apellido + "</td>" +
                    "<td>" + cliente.contacto + "</td>" +
                    "<td>" + cliente.correo + "</td>" +
                    "<td>" +
                    "<button class='btn btn-warning btn-sm editar' data-id='" + cliente.id + "' data-documento='" + cliente.documento + "' data-nombre='" + cliente.nombre + "' data-apellido='" + cliente.apellido + "' data-contacto='" + cliente.contacto + "' data-correo='" + cliente.correo + "'>Editar</button> " +
                    "<button class='btn btn-danger btn-sm eliminar' data-id='" + cliente.id + "'>Eliminar</button>" +
                    "</td>" +
                    "</tr>";

                $("#clientesTable tbody").append(row);
            });

            $(".editar").click(function () {
                var clienteId = $(this).data("id");
                var documento = $(this).data("documento");
                var nombre = $(this).data("nombre");
                var apellido = $(this).data("apellido");
                var contacto = $(this).data("contacto");
                var correo = $(this).data("correo");

                $("#clienteId").val(clienteId);
                $("#documento").val(documento);
                $("#nombre").val(nombre);
                $("#apellido").val(apellido);
                $("#contacto").val(contacto);
                $("#correo").val(correo);
                $("#clienteModalLabel").text("Editar Cliente");

                $("#clienteModal").modal("show");
            });

            $(".eliminar").click(function () {
                var clienteId = $(this).data("id");

                if (confirm("¿Seguro que desea eliminar este cliente?")) {
                    eliminarCliente(clienteId);
                }
            });
        },
        error: function (xhr, status, error) {
            mostrarError("Error al cargar la lista de clientes: " + error);
        }
    });
}

function guardarCliente() {
    var clienteId = $("#clienteId").val();
    var documento = $("#documento").val();
    var nombre = $("#nombre").val();
    var apellido = $("#apellido").val();
    var contacto = $("#contacto").val();
    var correo = $("#correo").val();
    console.log("documento: " + documento);
    var data = {
        clienteId: clienteId,
        documento: documento,
        nombre: nombre,
        apellido: apellido,
        contacto: contacto,
        correo: correo
    };

    var url = (clienteId !== "") ? "agregar_editar_cliente.php" : "agregar_editar_cliente.php";

    $.ajax({
        url: url,
        method: "POST",
        data: data,
        success: function (response) {
            alert(response);
            cargarListaClientes();
            $("#clienteForm")[0].reset();
            $("#clienteModal").modal("hide");
        },
        error: function (xhr, status, error) {
            mostrarError("Error al guardar el cliente: " + error);
        }
    });
}

function eliminarCliente(clienteId) {
    var data = {
        clienteId: clienteId
    };

    $.ajax({
        url: "eliminar_cliente.php",
        method: "POST",
        data: data,
        success: function (response) {
            alert(response);
            cargarListaClientes();
        },
        error: function (xhr, status, error) {
            mostrarError("Error al eliminar el cliente: " + error);
        }
    });
}

function mostrarError(mensaje) {
    $("#mensajeError").text(mensaje).show();

    // Puedes agregar un temporizador para ocultar automáticamente el mensaje después de cierto tiempo
    setTimeout(function () {
        $("#mensajeError").hide();
    }, 5000); // Ocultar después de 5 segundos (ajusta según tus necesidades)
}
