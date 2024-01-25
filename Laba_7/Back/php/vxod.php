<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $message ="Аккаунт не найден";
    $password = $data['password'];
    $redirect_url=null;
    $json_data = file_get_contents("JSON_Reg.json");
    $users = json_decode($json_data, true);
    foreach ($users as $user) {
        if ($user['email'] === $email) {
            if($password == $user['password']) {
                $redirect_url = "Front/html/Glav.html?email=" . $email . "&name=" . $user['name']; // URL для перенаправления
                $message = "Вы успешно вошли";
            } else {
                $message = "Неверный пароль!";
            }
        }
    }
    $result = ($redirect_url != null) ? ['redirect_url' => $redirect_url] : ['message' => $message];
    echo json_encode($result);
}















