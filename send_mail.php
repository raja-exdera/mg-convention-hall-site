<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.9.1/src/Exception.php';
require 'PHPMailer-6.9.1/src/PHPMailer.php';
require 'PHPMailer-6.9.1/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ''));
    $contact = strip_tags(trim($_POST["contact"] ?? ''));
    $date = strip_tags(trim($_POST["date"] ?? ''));
    $eventType = strip_tags(trim($_POST["eventType"] ?? ''));
    $message = strip_tags(trim($_POST["message"] ?? ''));

    if (empty($name) || empty($contact) || empty($date) || empty($eventType)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please fill all required fields."]);
        exit;
    }

    if (!preg_match('/^(?:\+?91[\-\s]?)?[6-9](?:[\-\s]*\d){9}$/', $contact)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please enter a valid 10-digit Indian phone number."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // To use SMTP, uncomment the lines below and configure your SMTP server details
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'aajithelangovan@gmail.com';
        $mail->Password   = 'nytf divn toaf sjoi';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
 
        // Use the default mail() function for now
        $mail->setFrom('noreply@' . ($_SERVER['HTTP_HOST'] ?? 'sapthaaradhana.com'), 'Saptha Aradhana Website');
        $mail->addAddress('contact@sapthaaradhana.com', 'Saptha Aradhana');
        
        $mail->isHTML(true);
        $mail->Subject = 'New Event Enquiry from ' . $name;
        
        $body = "<h2>New Event Enquiry</h2>
                 <p><strong>Name:</strong> {$name}</p>
                 <p><strong>Contact:</strong> {$contact}</p>
                 <p><strong>Event Date:</strong> {$date}</p>
                 <p><strong>Event Type:</strong> {$eventType}</p>
                 <p><strong>Message / Requirements:</strong><br/>" . nl2br($message) . "</p>";
                 
        $mail->Body    = $body;
        $mail->AltBody = strip_tags(str_replace("<br/>", "\n", $body));

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Thank you! Your enquiry has been sent successfully."]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
