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

if (isset($_GET['id'])) {
    $ideaId = $_GET['id'];

    // Fetch a single task by ID
    $idea = Idea::find($ideaId);

    // Return task as JSON
    header('Content-Type: application/json');
    echo json_encode($idea);
}
?>


