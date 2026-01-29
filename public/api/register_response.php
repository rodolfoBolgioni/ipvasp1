<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
    exit;
}

require_once 'config.php';

// Conexão MySQL
try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection error"]);
    exit;
}

// Ler Input
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->deputyId)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing deputyId"]);
    exit;
}

$deputyId = (int)$data->deputyId;

// Gerar Hash do Usuário (Proteção de Privacidade e Unicidade)
// Usa IP + UserAgent + Sal
$salt = "IPVA_SP_SECURE_SALT_2026"; 
$ip = $_SERVER['REMOTE_ADDR'];
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
$userHash = hash('sha256', $ip . $userAgent . $salt);

try {
    // Tentar Inserir (UNIQUE constraint vai impedir duplicados)
    $stmt = $conn->prepare("INSERT INTO votos_respostas (deputy_id, user_hash) VALUES (:deputyId, :userHash)");
    $stmt->bindParam(':deputyId', $deputyId);
    $stmt->bindParam(':userHash', $userHash);
    
    $stmt->execute();
    
    echo json_encode(["message" => "Response registered successfully", "status" => "success"]);
} catch(PDOException $e) {
    // Código 23000 = Violação de integridade (Duplicata)
    if ($e->getCode() == 23000) {
        http_response_code(409); // Conflict
        echo json_encode(["message" => "You have already registered a response for this deputy.", "status" => "duplicate"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
}
