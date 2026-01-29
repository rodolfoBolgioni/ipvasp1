<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once 'config.php';

try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Buscar contagens agrupadas
    $sql = "SELECT deputy_id, COUNT(*) as total FROM votos_respostas GROUP BY deputy_id";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_KEY_PAIR); // Retorna [id => total, id => total]

    // Converter valores para int (MySQL retorna como string)
    $cleanResults = array_map('intval', $results);

    echo json_encode($cleanResults);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error"]);
}
