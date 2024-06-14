<?php
// Archivo de conexión a la base de datos
include("../conexion.php");

// Verifica si se recibió un ID de cliente válido
    if (isset($_POST['clienteId'])) {
        $clienteId = $_POST['clienteId'];

        // Sentencia SQL para eliminar el cliente
        $sql = "DELETE FROM clientes WHERE id = $clienteId";
        // Ejecutar la consulta
        if ($conn->query($sql) === TRUE) {
            echo "Cliente eliminado exitosamente";
        } else {
            echo "Error al eliminar el cliente: " . $conn->error;
        }
    }
?>
