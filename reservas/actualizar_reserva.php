<?php
include '../conexion.php'; // Incluye el archivo de conexión

// Verificar si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos de la reserva desde el formulario
    $reservaId = $_POST['reservaId'];
    $documento = $_POST['documento'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $contacto = $_POST['contacto'];
    $fecha = $_POST['fecha'];
    $hora = $_POST['hora'];
    $estado = $_POST['estado'];
    $imagenUrl = $_POST['imagenUrl'];

    // Preparar la consulta SQL para actualizar la reserva
    $sql = "UPDATE reservas SET documento = ?, nombre = ?, apellido = ?, contacto = ?, fecha = ?, hora = ?, estado = ?, imagenUrl = ? WHERE id = ?";

    // Preparar la sentencia SQL
    $stmt = $conn->prepare($sql);
    
    // Vincular parámetros a la consulta
    $stmt->bind_param("sssssssi", $documento, $nombre, $apellido, $contacto, $fecha, $hora, $estado, $imagenUrl, $reservaId);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "Reserva actualizada exitosamente";
    } else {
        echo "Error al actualizar la reserva: " . $stmt->error;
    }

    // Cerrar la sentencia
    $stmt->close();
} else {
    echo "Error: Método de solicitud no válido";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
