<?php
include '../conexion.php'; // Incluye el archivo de conexión

// Verificar si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $clienteId = $_POST["clienteId"];
    $documento = $_POST["documento"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $contacto = $_POST["contacto"];
    $correo = $_POST["correo"];

    // Insertar o actualizar datos en la base de datos
    if ($clienteId !== "") {
        // Actualizar cliente existente
        $sql = "UPDATE clientes SET documento='$documento', nombre='$nombre', apellido='$apellido', contacto='$contacto', correo='$correo' WHERE id=$clienteId";
    } else {
        // Insertar nuevo cliente
        $sql = "INSERT INTO clientes (documento, nombre, apellido, contacto, correo) VALUES ('$documento','$nombre','$apellido','$contacto','$correo')";
    }

    if ($conn->query($sql) === TRUE) {
        echo "Cliente guardado exitosamente";
    } else {
        echo "Error al guardar el cliente: " . $conn->error;
    }
}
?>
