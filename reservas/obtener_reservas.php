<?php
// Configuración de la conexión a la base de datos
include '../conexion.php';

// Obtener la lista de clientes desde la base de datos
$resultado = $conn->query("SELECT r.id as id, c.documento as documento, c.nombre as nombre, c.apellido as apellido, c.contacto as contacto, r.fecha as fecha, r.hora as hora, r.estado as estado, r.imagenUrl as imagenUrl FROM reservas r inner join clientes c on c.documento = r.documento");

// Convertir el resultado a un array asociativo
$reservas = [];
while ($fila = $resultado->fetch_assoc()) {
    $reservas[] = $fila;
}

// Devolver la lista de clientes como JSON
echo json_encode($reservas);

$conn->close();
?>
