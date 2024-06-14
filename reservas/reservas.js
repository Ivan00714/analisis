$(document).ready(function() {
    // Cargar la lista de reservas al cargar la página
    limpiarFormularioReserva();
    cargarReservas();

    // Función para cargar la lista de reservas
    function cargarReservas() {
        // Aquí debes realizar una solicitud AJAX para obtener la lista de reservas desde el servidor
        // Luego, puedes usar el resultado para construir la tabla HTML y mostrar las reservas
        // Por ejemplo:
        limpiarFormularioReserva();
        $.ajax({
            url: 'obtener_reservas.php',
            method: 'GET',
            dataType: 'json',
            success: function(reservas) {                
                console.log("reservas: ", JSON.stringify(reservas));
                // Limpiar la tabla antes de cargar nuevas reservas
                $('#reservasTable tbody').empty();
                // Iterar sobre la lista de reservas y agregar cada una a la tabla
                $.each(reservas, function (index, reserva) {
                    var row = "<tr data-reserva-id='" + reserva.id + "'>";
                    row += '<td>' + reserva.id + '</td>';
                    row += '<td>' + reserva.documento + '</td>';
                    row += '<td>' + reserva.nombre + '</td>';
                    row += '<td>' + reserva.apellido + '</td>';
                    row += '<td>' + reserva.contacto + '</td>';
                    row += '<td>' + reserva.fecha + '</td>';
                    row += '<td>' + reserva.hora + '</td>';
                    row += '<td>' + reserva.estado + '</td>';          
                    //row += '<td><button class="btn btn-primary btn-sm ver-imagen" data-url="' + reserva.imagenUrl + '">Ver Imagen</button></td>';                              
                    row += '<td><button class="btn btn-primary btn-sm editar-reserva" data-id="' + reserva.id + '">Editar</button>';
                    row += ' <button class="btn btn-danger btn-sm eliminar-reserva" data-id="' + reserva.id + '">Eliminar</button></td>';                    
                    row += '<td hidden>' + reserva.imagenUrl + '</td>'; 
                    row += '</tr>';
    
                    $("#reservasTable tbody").append(row);
                });


            }
        });
    }
/*
    // Manejar clic en el botón de guardar reserva
    $('#guardarReservaBtn').click(function() {
        // Obtener los datos del formulario de reserva
        var reservaData = $('#reservaForm').serialize();

        // Aquí debes realizar una solicitud AJAX para guardar la reserva en el servidor
        // Puedes enviar los datos del formulario utilizando la variable reservaData
        // Por ejemplo:
        $.ajax({
            url: 'guardar_reserva.php',
            method: 'POST',
            data: reservaData,
            success: function(response) {
                // Recargar la lista de reservas después de guardar la nueva reserva
                cargarReservas();

                // Cerrar el modal de reserva
                $('#reservaModal').modal('hide');
            }
        });
    });*/

    $('#guardarReservaBtn').click(function() {
        // Obtener los datos del formulario de reserva
        var reservaData = $('#reservaForm').serialize();
        var reservaId = $('#reservaId').val(); // Obtener el ID de la reserva (si existe)    
        //var imagenUrl = $('#imagenSeleccionada').val(); // Obtener la imagenUrl del campo oculto

        // Agregar la imagenUrl al array de datos
        //reservaData.imagenUrl = imagenUrl;
        //console.log("guardarReservaBtn imagenUrl: ", imagenUrl);
        // Determinar la URL y el método según si se está insertando o actualizando
        //var url = 'guardar_reserva.php';
        var method = 'POST';
        console.log("reservaId: ", reservaId);
        // Si hay un ID de reserva, cambiar la URL y el método para actualizar en lugar de insertar
        if (reservaId !== '') {
            url = 'guardar_reserva.php?reservaId=' + reservaId;
            method = 'POST'; // Por ejemplo, podrías utilizar el método PUT para actualizar
        }else{
            url = 'crear_reserva.php';
        }
        console.log("guardarReservaBtn reservaData: ", JSON.stringify(reservaData));
        // Realizar la solicitud AJAX para guardar la reserva en el servidor
        $.ajax({
            url: url,
            method: method,
            data: reservaData,
            success: function(response) {
                // Recargar la lista de reservas después de guardar o actualizar la reserva

                console.log("guardarReservaBtn response: ", response);
                cargarReservas();
    
                // Cerrar el modal de reserva
                $('#reservaModal').modal('hide');
            }
        });
    });
    
    
    // Manejar clic en el botón de eliminar reserva
    $('#reservasTable').on('click', '.eliminar-reserva', function() {
        // Obtener el ID de la reserva a eliminar
        var reservaId = $(this).data('id');
        console.log("reservaId: " + reservaId);
        // Aquí debes realizar una solicitud AJAX para eliminar la reserva en el servidor
        // Puedes enviar el ID de la reserva a eliminar
        // Por ejemplo:
        $.ajax({
            url: 'eliminar_reserva.php',
            method: 'POST',
            data: {id: reservaId},
            //data: data,
            success: function(response) {
                // Recargar la lista de reservas después de eliminar la reserva
                cargarReservas();                
            },
            error: function (xhr, status, error) {
                mostrarError("Error al eliminar el cliente: " + error);
            }
        });
    });
    // Capturar el evento de cambio en el campo de documento
    $('#documento').on('change', function() {
        var documento = $(this).val(); // Obtener el valor del documento ingresado
        console.log("DOCUMENTO: " + documento);
        if (documento !== '') {
            // Si se ingresó un documento, recuperar los detalles del cliente asociado
            obtenerDetallesCliente(documento);
        }
    });
    // Función para obtener los detalles del cliente mediante AJAX
    function obtenerDetallesCliente(documento) {
        $.ajax({
            url: 'buscarCliente.php',
            method: 'POST',
            dataType: "json",
            data: { documento: documento },
            success: function(cliente) {

                console.log("json CLIENTE: " + cliente.nombre);
                
                if (cliente) {
                    // Si se encontraron detalles del cliente, precargar los datos en el modal
                    $('#nombre').val(cliente.nombre);
                    $('#apellido').val(cliente.apellido);
                    $('#contacto').val(cliente.contacto);
                } else {
                    // Si no se encontraron detalles del cliente, mostrar un mensaje o proporcionar una opción para agregar un nuevo cliente
                    // Por ejemplo:
                    if (confirm('El cliente con el documento ingresado no existe. ¿Desea agregar un nuevo cliente?')) {
                        // Redirigir a la página de agregar nuevo cliente o mostrar otro modal para agregar un nuevo cliente
                        // window.location.href = 'agregar_cliente.php';
                        // O mostrar otro modal
                    } else {
                        // Limpiar los campos de nombre, apellido y contacto
                        $('#nombre').val('');
                        $('#apellido').val('');
                        $('#contacto').val('');
                    }
                }          
            }
        });
    }    
    // Función para cargar el modal de reserva
    function cargarModalReserva() {
        // Precargar la fecha actual
        var today = new Date().toISOString().slice(0, 10);
        $('#fecha').val(today);

        // Precargar la hora actual
        var now = new Date();
        var hora = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
        $('#hora').val(hora);
    }

    // Mostrar el modal de reserva cuando se hace clic en el botón para agregar reserva
    $('[data-target="#reservaModal"]').click(function () {
        limpiarFormularioReserva();
        cargarModalReserva(); // Llamar a la función para cargar el modal de reserva
    });
    // Otras funciones para editar reserva, buscar cliente por documento, etc.

    // Función para limpiar los campos del formulario de reserva
    function limpiarFormularioReserva() {
        $('#reservaId').val('');
        $('#documento').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#contacto').val('');
        $('#fecha').val('');
        $('#hora').val('');
        $('#estado').val('Pendiente');
        $('#imagenSeleccionada').val('');
        $('#imagenVistaPrevia').attr('src', '').attr('alt', '');
    }
    // Evento al hacer clic en el botón "Editar" de una reserva
    $('#reservasTable').on('click', '.editar-reserva', function() {
        var reservaId = $(this).closest('tr').data('reservaId');
        console.log("reservaId: " + reservaId);
        // Limpiar los campos del formulario antes de cargar los datos de la reserva
        limpiarFormularioReserva();
        
        // Obtener los datos de la reserva para cargarlos en el formulario de edición
        $.ajax({
            url: 'obtener_reserva.php',
            method: 'POST',
            dataType: "json",
            data: {id: reservaId},
            success: function(reserva) {
                console.log("reserva: ", JSON.stringify(reserva));
                console.log("reserva.id: " + reserva.id);
                // Llenar el formulario de edición con los datos de la reserva
                $('#reservaId').val(reserva.id);
                $('#documento').val(reserva.documento);
                $('#nombre').val(reserva.nombre);
                $('#apellido').val(reserva.apellido);
                $('#contacto').val(reserva.contacto);
                $('#fecha').val(reserva.fecha);
                $('#hora').val(reserva.hora);
                $('#estado').val(reserva.estado);
                $('#imagenSeleccionada').val(reserva.imagenUrl);
                $('#imagenVistaPrevia').attr('src', reserva.imagenUrl);                            
                // Mostrar el modal de edición de reserva
                $('#reservaModal').modal('show');

            },
            error: function(xhr, status, error) {
                console.error('Error al obtener la reserva:', error);
            }
        });
    });   
    $('#reservasTable').on('click', '.ver-imagen', function() {
        var imagenUrl = $(this).data('url'); // Obtener la URL de la imagen
        mostrarImagenModalSeleccionada(imagenUrl); // Llamar a la función para mostrar la imagen en la modal
    });
    function mostrarImagenModalSeleccionada(imagenUrl) {
        $('#imagenVistaPreviaModal').attr('src', imagenUrl); // Mostrar la imagen en la modal
        $('#imageModal').modal('show'); // Mostrar la modal
    }    
});
