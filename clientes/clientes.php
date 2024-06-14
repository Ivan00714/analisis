<?php
// Configuración de la conexión a la base de datos
include '../conexion.php';

// Obtener la lista de clientes desde la base de datos
$resultado = $conn->query("SELECT id, documento, nombre, apellido, contacto, correo FROM clientes");

// Convertir el resultado a un array asociativo
$clientes = [];
while ($fila = $resultado->fetch_assoc()) {
    $clientes[] = $fila;
}

// Devolver la lista de clientes como JSON
echo json_encode($clientes);

$conn->close();
?>
