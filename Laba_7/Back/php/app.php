<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $mes = '';
    $mesZ = '';
    $mesI = '';
    $mesT = '';
    $mesTel = '';
    $fileContent = file_get_contents("JSON_add_application.json");
    $applications = json_decode($fileContent, true);
    $isDuplicate = false;
    $duplicateApplicationNumber = null;
    $mail = $data['email'];
    $userApplications = [];

    // Регулярное выражение для проверки использования только русских букв
    $russianRegex = '/^[А-Яа-я\s]+$/u';

    foreach ($applications as $application) {
        if ($application['email'] === $mail) {
            $userApplications[] = $application;
        }
    }
    $mesPhone = true;
    
    // Проверка длины номера телефона
    if (strlen($data['phone']) !== 11) {
        $mesTel = 'Некорректный номер телефона, должно быть 11 цифр (слитно, без +)';
        $mesPhone = false;
    }

    // Проверка на русский язык в заголовке
    if (!preg_match($russianRegex, $data['zag'])) {
        $mesZ = 'Введите заголовок на русском языке';
    }

    // Проверка на русский язык в тексте
    if (!preg_match($russianRegex, $data['text'])) {
        $mesT = 'Введите текст на русском языке';
    }

    // Проверка на русский язык в имени
    if (!preg_match($russianRegex, $data['name'])) {
        $mesI = 'Введите имя на русском языке';
    }

    // Проверка на повтор заявки
    foreach ($userApplications as $index => $application) {
        if (array_intersect_assoc($data, $application) === $data) {
            $isDuplicate = true;
            $duplicateApplicationNumber = $index + 1;
            $mes = "Заявка с номером $duplicateApplicationNumber уже существует";
            break;
        }
    }

    if (!$isDuplicate && preg_match($russianRegex, $data['name']) && preg_match($russianRegex, $data['zag']) && preg_match($russianRegex, $data['text']) && $mesPhone) {
        $file = fopen("JSON_add_application.json", 'r+');
        $is_empty_file = filesize("JSON_add_application.json") == 0;
        if ($is_empty_file) {
            fwrite($file, "[");
        } else {
            fseek($file, -1, SEEK_END);
            fwrite($file, '');
            fwrite($file, ",");
        }
        fwrite($file, json_encode($data, JSON_UNESCAPED_UNICODE));
        fwrite($file, "\n");
        fwrite($file, "]");
        fclose($file);
    }

    echo json_encode(['mes' => $mes, 'mesZ' => $mesZ, 'mesT' => $mesT, 'mesI' => $mesI, 'mesTel' => $mesTel]);
} else {
    echo "<h1 style='text-align: center'>GO away!</h1>";
}
