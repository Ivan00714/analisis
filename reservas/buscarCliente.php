<?php
// Configuración de la conexión a la base de datos
include '../conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["documento"])) {
    // Obtener datos del formulario        
    $documento = $_POST["documento"];

    // Obtener la lista de clientes desde la base de datos
    $resultado = $conn->query("SELECT nombre, apellido, contacto FROM clientes WHERE documento =$documento  LIMIT 1");

    // Verificar si se encontró algún resultado
    if ($resultado->num_rows > 0) {
        // Convertir el resultado a un array asociativo
        $cliente = $resultado->fetch_assoc();

        // Devolver los detalles del cliente como JSON
        echo json_encode($cliente);
    } else {
        // Si no se encontró ningún cliente, devolver un mensaje de error o un JSON vacío
        echo json_encode(null); // JSON vacío
    }

    $conn->close();
}else{
    echo json_encode("No encontro ningun cliente");
}
?>