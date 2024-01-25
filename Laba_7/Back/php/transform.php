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
    $nomer = $data['nomer'];
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
    
    // поиск заявки для редактирования
    $mynomer=0;
    
    foreach ($userApplications as $application) {
        $mynomer++;
        if ($application['email'] === $mail && $mynomer === intval($nomer)) {
            $foundApplication = $application;
            break;
        }
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
    
    foreach ($applications as &$app) {
        if ($app['email'] === $foundApplication['email'] && 
            $app['name'] === $foundApplication['name'] && 
            $app['phone'] === $foundApplication['phone'] && 
            $app['city'] === $foundApplication['city'] && 
            $app['text'] === $foundApplication['text'] && 
            $app['zag'] === $foundApplication['zag']) {
            $app['email'] = $data['email'];
            $app['name'] = $data['name'];
            $app['phone'] = $data['phone'];
            $app['city'] = $data['city'];
            $app['text'] = $data['text'];
            $app['zag'] = $data['zag'];
        }
    }

    
    if (!$isDuplicate && preg_match($russianRegex, $data['name']) && 
            preg_match($russianRegex, $data['zag']) && 
            preg_match($russianRegex, $data['text']) && $mesPhone) {
        // Сохранение обновленных данных в файл JSON
        file_put_contents("JSON_add_application.json", json_encode($applications, JSON_UNESCAPED_UNICODE));
    }
    echo json_encode(['mes' => $mes, 'mesZ' => $mesZ, 'mesT' => $mesT, 'mesI' => $mesI, 'mesTel' => $mesTel]);
} else {
    echo "<h1 style='text-align: center'>GO away!</h1>";
}
