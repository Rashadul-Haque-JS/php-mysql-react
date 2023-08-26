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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the JSON data from the request
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Extract values from JSON data
    $title = $data['title'];
    $description = $data['description'];
    $dueDate = $data['ideaDate'];
    $completed = $data['completed'];

    // Create a new idea
    Idea::create([
        'title' => $title,
        'description' => $description,
        'ideaDate' => $dueDate,
        'completed' => $completed
    ]);
}
?>
