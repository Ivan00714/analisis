<?php
session_start();

// Destruye la sesión
session_destroy();

// Genera un parámetro único para evitar el almacenamiento en caché
$unique_param = uniqid();

// Envía los headers para evitar el almacenamiento en caché
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Establece una cookie para indicar que el usuario ha cerrado sesión
setcookie("cerrar_sesion", "true", time() + 3600, "/"); // La cookie expira en 1 hora

// Redirige al usuario a la página de inicio de sesión con el parámetro único
header("Location: index.html?logout=$unique_param");
exit;
?>

