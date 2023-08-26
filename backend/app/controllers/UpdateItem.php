<?php

namespace app\controllers;

require __DIR__ . '/../../../vendor/autoload.php';
include_once __DIR__ . '/Cors.php';
$config = require '../../config.php';

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection($config['database']);
$capsule->bootEloquent();

// Eloquent models
use app\models\Idea;

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $corsHeaders = [
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Headers" => "Content-Type",
        "Access-Control-Allow-Methods" => "PUT"
    ];

    foreach ($corsHeaders as $header => $value) {
        header("$header: $value");
    }
    exit();
}

// Handle other HTTP methods
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if (isset($_GET['id'])) {
        $id = $_GET['id']; // Extract ID from the URL
        
        // Find the idea by ID
        $idea = Idea::find($id);
        
        if (!$idea) {
            header('HTTP/1.1 404 Not Found');
            echo json_encode(['error' => 'Idea not found']);
            exit;
        }

        // Get the updated data from the request body
        $requestData = json_decode(file_get_contents('php://input'), true);

        // Update idea properties if provided
        if (isset($requestData['title'])) {
            $idea->title = $requestData['title'];
        }
        if (isset($requestData['description'])) {
            $idea->description = $requestData['description'];
        }
        if (isset($requestData['ideaDate'])) {
            $idea->ideaDate = $requestData['ideaDate'];
        }
        if (isset($requestData['completed'])) {
            $idea->completed = $requestData['completed'];
        }

        // Save the updated idea
        $idea->save();
        
        // Return success response
        header('Content-Type: application/json');
        echo json_encode(['message' => 'idea updated successfully']);
    } else {
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['error' => 'No idea ID provided']);
    }
} else {
    header('HTTP/1.1 405 Method Not Allowed');
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
