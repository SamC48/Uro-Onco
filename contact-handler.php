<?php
/**
 * Uro-Onco Congress 2027 contact endpoint.
 * Place beside contact.html. No Composer dependencies required.
 * Matches the supplied uoc27-contact-form and main.js AJAX handler.
 *
 * SETUP: replace the two email placeholders below. The sender must be an
 * address your hosting provider authorises for outgoing website email.
 * Requires PHP hosting with mail() configured; file:// and static hosting
 * cannot execute this file. mail() acceptance does not guarantee delivery.
 * The session throttle and honeypot are basic spam controls, not a CAPTCHA.
 */

$recipient = 'INSERT_CONGRESS_INBOX_EMAIL';
$sender = 'INSERT_WEBSITE_SENDER_EMAIL';

// Keep PHP diagnostics out of the JSON consumed by main.js.
ini_set('display_errors', '0');
ini_set('log_errors', '1');
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function uoc27ContactResponse($status, $success, $message)
{
    http_response_code($status);
    echo json_encode(array('success' => $success, 'message' => $message));
    exit;
}

function uoc27ContactField($key)
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strpos($value, "\0") !== false || preg_match('//u', $value) !== 1) {
        uoc27ContactResponse(422, false, 'Please check the form fields and try again.');
    }
    return trim($value);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    uoc27ContactResponse(405, false, 'Please submit your enquiry using the contact form.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    uoc27ContactResponse(413, false, 'Your enquiry is too long. Please shorten it and try again.');
}

// Reject browser requests from a different host. This is not bot protection.
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $originHost = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $siteHost = parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST);
    if (!$originHost || !$siteHost || strcasecmp($originHost, $siteHost) !== 0) {
        uoc27ContactResponse(403, false, 'Please submit your enquiry from this website.');
    }
}

if (uoc27ContactField('uoc27_contact_website') !== '') {
    uoc27ContactResponse(200, true, 'Thank you. Your enquiry has been submitted to the organising team.');
}

$name = uoc27ContactField('uoc27_contact_name');
$email = uoc27ContactField('uoc27_contact_email');
$organisation = uoc27ContactField('uoc27_contact_organisation');
$type = uoc27ContactField('uoc27_contact_type');
$message = uoc27ContactField('uoc27_contact_message');
$privacy = uoc27ContactField('uoc27_contact_privacy');

$allowedTypes = array(
    'General Enquiry',
    'Delegate Registration',
    'Sponsorship & Exhibition',
    'Scientific Programme',
    'Other'
);

// Byte limits allow for multi-byte UTF-8 characters in the HTML fields.
if ($name === '' || strlen($name) > 480 ||
    strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    preg_match('/[\r\n]/', $email) ||
    strlen($organisation) > 600 || !in_array($type, $allowedTypes, true) ||
    $message === '' || strlen($message) > 16000 || $privacy !== 'yes') {
    uoc27ContactResponse(422, false, 'Please check the required fields and try again.');
}

if (!filter_var($recipient, FILTER_VALIDATE_EMAIL) ||
    !filter_var($sender, FILTER_VALIDATE_EMAIL) ||
    preg_match('/[\r\n]/', $recipient . $sender)) {
    uoc27ContactResponse(500, false, 'The contact form has not yet been configured. Please contact the organisers directly.');
}

// Separate cookie name avoids sharing the website's default PHP session.
session_name('UOC27CONTACT');
session_set_cookie_params(array(
    'lifetime' => 0,
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Lax'
));
ini_set('session.use_strict_mode', '1');
if (!session_start()) {
    uoc27ContactResponse(503, false, 'The contact form is temporarily unavailable. Please try again later.');
}

// Keep the session locked until delivery is attempted to prevent simultaneous
// submissions within this session. Clearing cookies bypasses this basic limit.
$remaining = 30 - (time() - (int) ($_SESSION['uoc27_contact_last_attempt'] ?? 0));
if ($remaining > 0) {
    header('Retry-After: ' . $remaining);
    session_write_close();
    uoc27ContactResponse(429, false, 'Please wait 30 seconds before sending another enquiry.');
}
$_SESSION['uoc27_contact_last_attempt'] = time();

$name = preg_replace('/[\r\n]+/', ' ', $name);
$organisation = preg_replace('/[\r\n]+/', ' ', $organisation);
$subject = 'Uro-Onco Congress 2027 - ' . $type;
$body = "NEW CONGRESS ENQUIRY\r\n\r\n" .
    'Name: ' . $name . "\r\n" .
    'Email: ' . $email . "\r\n" .
    'Organisation: ' . $organisation . "\r\n" .
    'Enquiry type: ' . $type . "\r\n\r\nMESSAGE:\r\n" .
    str_replace(array("\r\n", "\r"), "\n", $message);

$headers = array(
    'From' => $sender,
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'base64'
);

$accepted = false;
try {
    if (function_exists('mail')) {
        $accepted = mail($recipient, $subject, chunk_split(base64_encode($body)), $headers);
    }
} catch (Throwable $error) {
    // Avoid logging the submitted message or personal details.
    error_log('UOC27 contact: outgoing mail failed.');
}
session_write_close();

if (!$accepted) {
    uoc27ContactResponse(500, false, 'Your enquiry could not be sent. Please contact the organisers directly.');
}

uoc27ContactResponse(200, true, 'Thank you. Your enquiry has been submitted to the organising team.');
