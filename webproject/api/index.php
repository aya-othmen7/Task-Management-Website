<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM tasks";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $tasks = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($tasks);
        break;
    case "POST":
        $task = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO tasks(id, name, time, date) VALUES(null, :name, :time, :date)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $task->name);
        $stmt->bindParam(':time', $task->time);
        $stmt->bindParam(':date', $task->date);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Task created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create task.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $task = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE tasks SET name= :name, time =:time, date =:date WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $task->id);
        $stmt->bindParam(':name', $task->name);
        $stmt->bindParam(':time', $task->time);
        $stmt->bindParam(':date', $task->date);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Task updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update task.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM tasks WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Task deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete task.'];
        }
        echo json_encode($response);
        break;
}
?>
