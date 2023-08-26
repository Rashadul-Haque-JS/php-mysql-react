<?php

namespace app\controllers;

require __DIR__ . '/../../../vendor/autoload.php';
include_once __DIR__ . '/Cors.php';
$config = require '../../config.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection($config['database']);
$capsule->bootEloquent();

//Eloquent models
use app\models\Idea; 


// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $corsHeaders = [
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Headers" => "Content-Type",
        "Access-Control-Allow-Methods" => "DELETE"
    ];

    foreach ($corsHeaders as $header => $value) {
        header("$header: $value");
    }
    exit();
}

// Get the id from the URL query parameter
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Fetch the idea by ID
    $idea = Idea::find($id);

    // Check if the idea exists
    if ($idea) {
        // Delete the idea
        $idea->delete();

        // Return a success response
        header('Content-Type: application/json');
        echo json_encode(['message' => 'Idea deleted successfully']);
    } else {
        // Return an error response if the idea doesn't exist
        http_response_code(404);
        echo json_encode(['error' => 'Idea not found']);
    }
} else {
    // Return an error response if the id parameter is not provided
    http_response_code(400);
    echo json_encode(['error' => 'ID parameter missing']);
}

?>
