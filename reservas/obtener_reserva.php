<?php
// Configuración de la conexión a la base de datos
include '../conexion.php';

// Verificar si se recibió el ID de la reserva por POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $reservaId = $_POST["id"];

    // Preparar la consulta SQL para obtener la reserva específica
    $query = "SELECT r.id, c.documento, c.nombre, c.apellido, c.contacto, r.fecha, r.hora, r.estado, r.imagenUrl FROM reservas r INNER JOIN clientes c ON c.documento = r.documento WHERE r.id = $reservaId";

    // Ejecutar la consulta SQL
    $resultado = $conn->query($query);

    // Verificar si se obtuvieron resultados
    if ($resultado && $resultado->num_rows > 0) {
        // Obtener la reserva
        $reserva = $resultado->fetch_assoc();

        // Devolver la reserva como JSON
        echo json_encode($reserva);
    } else {
        // Si no se obtuvieron resultados, devolver un mensaje de error como JSON
        echo json_encode(array("error" => "No se encontró la reserva con el ID especificado"));
    }

    // Cerrar la resultado
    $resultado->close();
    
    // Cerrar la conexión a la base de datos
    $conn->close();
}
?>
