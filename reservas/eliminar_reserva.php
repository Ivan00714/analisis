<?php
include '../conexion.php'; // Incluye el archivo de conexión

// Verificar si se recibió el ID de la reserva a eliminar
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $reservaId = $_POST["id"];

    // Eliminar reserva
    $sql = "DELETE FROM reservas WHERE id=$reservaId";

    if ($conn->query($sql) === TRUE) {
        echo "Reserva eliminada exitosamente";
    } else {
        echo "Error al eliminar la reserva: " . $conn->error;
    }
}
?>

