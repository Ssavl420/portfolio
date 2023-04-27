<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PhpMailer/src/Exception.php';
require 'PhpMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PhpMailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setFrom('info@savlevich.ru', 'Savlevich.ru');
// Кому отправить
$mail->addAddress('sa.savlevich@gmail.com', 'savlevich@savlevich.ru');
// Тема письма
$mail->Subject = 'Форма с сайта портфолио';

// Тело письма
$body = '<h1>Portfolio form.</h1>';

if (trim(!empty($_POST['name']))) {
   $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
   $body .= '<p><strong>Email:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['phone']))) {
   $body .= '<p><strong>Телефон:</strong> ' . $_POST['phone'] . '</p>';
}
if (trim(!empty($_POST['message']))) {
   $body .= '<p><strong>Сообщение:</strong> ' . $_POST['message'] . '</p>';
}

$mail->Body = $body;

// Отправляем
if (!$mail->send()) {
   $message = 'Ошибка!';
} else {
   $message = 'Данные отправлены.';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
