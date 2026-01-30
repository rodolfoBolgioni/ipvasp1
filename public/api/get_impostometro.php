<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function fetchUrl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // Mimic a browser to avoid blocking
    curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

// URLs endpoints (Public endpoints used by their widgets)
$urlBrasil = "https://impostometro.com.br/Contador/GetTotalArrecadado";
$urlSP = "https://impostometro.com.br/Contador/GetTotalArrecadadoEstado?estado=SP";

$rawBrasil = fetchUrl($urlBrasil);
$rawSP = fetchUrl($urlSP);

// Helper to clean number string (e.g. "1.234,56" -> 1234.56)
function parseImposto($str)
{
    if (!$str)
        return 0;
    // Remove "R$" and spaces
    $str = str_replace(['R$', ' '], '', $str);
    // Remove dots (thousands separator)
    $str = str_replace('.', '', $str);
    // Replace comma with dot (decimal separator)
    $str = str_replace(',', '.', $str);
    return (float) $str;
}

$response = [
    "brasil" => parseImposto($rawBrasil),
    "sp" => parseImposto($rawSP),
    "timestamp" => time()
];

echo json_encode($response);
?>