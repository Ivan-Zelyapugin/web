<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $valid = true;
    $message = "Ошибка";
    $messageEmail = "";
    $messagePassword = "";
    $date = $data['mesdate'];
    $mesdate= '';
    
    if (!preg_match('/^(19[5-9]\d|20[0-1]\d|2020)-\d{2}-\d{2}$/', $date)) {
        $valid = false;
        $mesdate = 'Некорректный год, допустимые года: 1950-2020';
    }
    
    // Проверяем наличие всех полей в полученных данных
    $required_fields = ['name', 'email', 'password', 'repeat-password'];

    // Проверка email
    $email = $data['email'];
    $email_pattern = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';
    if (!preg_match($email_pattern, $email)) {
        $valid = false;
        $messageEmail = "Некорректный email";
    } else {
        $file = file_get_contents("JSON_Reg.json");
        $users = json_decode($file, true);
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                $valid = false;
                $messageEmail = "Пользователь с таким email уже зарегистрирован";
                break;
            }
        }
    }
    // Проверка пароля
    if ($data['password'] !== $data['repeat-password']) {
        $valid = false;
        $messagePassword = "Пароли не совпадают";
    }
    
    // Длина пароля
    if (strlen($data['password']) < 6) {
        $valid = false;
        $messagePassword = "Пароль должен содержать минимум 6 символов";
    }
    // Если все поля заполнены корректно, записываем данные в файл
    if ($valid) {
        $message = "Вы зарегистрировались!";
        $file = fopen("JSON_Reg.json", 'r+');
        $is_empty_file = filesize("JSON_Reg.json") == 0;

        if ($is_empty_file) {
            fwrite($file, "[");
        } else {
            fseek($file, -1, SEEK_END);
            fwrite($file, '');
            fwrite($file, ",");
        }
        fwrite($file, json_encode($data));
        fwrite($file, "\n");
        fwrite($file, "]");
        fclose($file);
    }
    echo json_encode(['messageEmail' => $messageEmail, 'messagePassword' => $messagePassword, 'message' => $message, 'mdate' => $mesdate]);
} else {
    echo "<h1 style='text-align: center'>GO away!</h1>";
}

