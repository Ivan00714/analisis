<?php
    include 'conexion.php' ;

    // Obtén los datos del formulario
    $nombre_usuario = $_POST["nombre_usuario"];
    $contrasena = $_POST["contrasena"];
    $email = $_POST["email"];
    
    // Conexión a la base de datos (reemplaza con tus propios datos)

    // Completa el código para verificar la autenticación
    // Realiza una consulta en la base de datos y verifica si las credenciales son válidas
        
    $sql = "SELECT * FROM usuarios WHERE nombre_usuario = '$nombre_usuario' AND contrasena = '$contrasena' AND email = '$email'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        echo "Inicio Exitoso";
        session_start();
    } else {
        echo "error";
    }
    
    $conn->close();

?>