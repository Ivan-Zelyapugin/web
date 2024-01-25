<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $mes = 'Заявка успешно удалена';
    $fileContent = file_get_contents("JSON_add_application.json");
    $applications = json_decode($fileContent, true);
    $mail = $data['email'];
    $nomer = $data['nomer'];
    $userApplications = [];
    foreach ($applications as $application) {
        if ($application['email'] === $mail) {
            $userApplications[] = $application;
        }
    }
    // удаление заявки
    array_splice($applications, $nomer, 1);
    // Сохранение обновленных данных в файл JSON
    file_put_contents("JSON_add_application.json", json_encode($applications, JSON_UNESCAPED_UNICODE));
    echo json_encode(['mes' => $mes]);
    
} else {
    echo "<h1 style='text-align: center'>GO away!</h1>";
}

