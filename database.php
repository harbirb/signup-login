<?php

$host = "localhost";
$dbname = 'login_db';
$username = "root";
$password = '';

$mysqli = new mysqli($host, $username, $password, $dbname);
mysqli_report(MYSQLI_REPORT_OFF);


if ($mysqli->connect_errno) {
    die("connection error: " . $mysqli->connect_error);
}

return $mysqli;