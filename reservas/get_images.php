<?php
header('Content-Type: application/json');

$dir = 'catalogo';

$base_url = 'http://localhost:50/xampp/srcboopstrap/reservas/catalogo/'; // Reemplaza esto con tu URL base correcta

$images = array();

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if ($file != '.' && $file != '..' && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
                $images[] = array(
                    "url" => $base_url . $file,
                    "alt" => pathinfo($file, PATHINFO_FILENAME),
                    "description" => "Codigo: " . pathinfo($file, PATHINFO_FILENAME)
                );
            }
        }
        closedir($dh);
    }
} else {
    echo json_encode(array("message" => "El directorio no existe."));
    exit;
}

// Devolver la lista de imágenes en formato JSON
echo json_encode(array("images" => $images));
?>
