<?php
include '../conexion.php'; // Incluir el archivo de conexión

// Verificar si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $documento = $_POST["documento"];
    $fecha = $_POST["fecha"];
    $hora = $_POST["hora"];
    $estado = $_POST["estado"];
    $imagenUrl = $_POST["imagenUrl"]; // Obtener la URL de la imagen

   
    // Si no se recibió un ID de reserva, realizar una consulta SQL de inserción
    $sql = "INSERT INTO reservas (documento, fecha, hora, estado, imagenUrl) VALUES ('$documento','$fecha','$hora','$estado','$imagenUrl')";

    if ($conn->query($sql) === TRUE) {
        echo "Reserva guardada exitosamente";
    } else {
        echo "Error al guardar la reserva: " . $conn->error;
    }

}
?>
