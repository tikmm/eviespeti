<?php
// Ellenőrizzük, hogy az űrlap POST metódussal érkezett-e
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Változók a beküldött adatok számára
    $name = htmlspecialchars($_POST['name']);
    $attendance = htmlspecialchars($_POST['attendance']);

    // Cél e-mail cím (ide fogod megkapni a visszajelzéseket)
    $to = "viktoria.szegedi@outlook.com"; // Cseréld ki a saját e-mail címedre
    $subject = "Esküvői visszajelzés - " . $name;
    
    // E-mail üzenet tartalma
    $message = "Kedves Esküvői Szervező!\n\n";
    $message .= "Név: " . $name . "\n";
    $message .= "Visszajelzés: " . $attendance . "\n";

    // E-mail fejlécek
    $headers = "From: viktoria.szegedi@outlook.com" . "\r\n";
    $headers .= "Reply-To: viktoria.szegedi@outlook.com" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // E-mail küldés
    if (mail($to, $subject, $message, $headers)) {
        echo "Köszönjük a visszajelzésed!";
    } else {
        echo "Hiba történt a visszajelzés küldésekor.";
    }
}