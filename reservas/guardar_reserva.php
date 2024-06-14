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

    // Obtener el ID de la reserva (si se recibió)
    $reservaId = isset($_POST["reservaId"]) ? $_POST["reservaId"] : null;

    // Verificar si se recibió un ID de reserva
    if ($reservaId !== null) {
        // Realizar una consulta SQL de actualización
        $sql = "UPDATE reservas SET documento = '$documento', fecha = '$fecha', hora = '$hora', estado = '$estado', imagenUrl = '$imagenUrl' WHERE id = $reservaId";

        if ($conn->query($sql) === TRUE) {
            echo "Reserva actualizada exitosamente";
        } else {
            echo "Error al actualizar la reserva: " . $conn->error;
        }
    } else {
        // Si no se recibió un ID de reserva, realizar una consulta SQL de inserción
        $sql = "INSERT INTO reservas (documento, fecha, hora, estado, imagenUrl) VALUES ('$documento','$fecha','$hora','$estado','$imagenUrl')";

        if ($conn->query($sql) === TRUE) {
            echo "Reserva guardada exitosamente";
        } else {
            echo "Error al guardar la reserva: " . $conn->error;
        }
    }
}
?>
