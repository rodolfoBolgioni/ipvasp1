<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

function fetchUrl($url)
{
    try {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 3); // Fast timeout

        $headers = [
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Referer: https://impostometro.com.br/",
            "X-Requested-With: XMLHttpRequest",
            "Accept: application/json, text/javascript, */*; q=0.01"
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $data = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200 || !$data)
            return null;
        return $data;
    } catch (Exception $e) {
        return null;
    }
}

function parseImposto($str)
{
    if (!$str)
        return 0;
    // Clean weird chars (non-breaking space, R$, etc)
    $clean = preg_replace('/[^0-9,]/', '', $str);
    // 1234,56 -> 1234.56
    $clean = str_replace(',', '.', $clean);
    return (float) $clean;
}

// Fallback Estimation (Anchor Method)
// Anchor: 2026-01-30 20:41:13 (User Report)
// Value: 411.821.785.817,15
function estimateValues()
{
    $anchorTime = 1769816473; // 2026-01-30 20:41:13
    $anchorBrasil = 411821785817.15;
    $anchorSP = 151550417180.71; // Proportional 36.8%

    $now = time();
    $secondsDiff = $now - $anchorTime;

    // Growth Rates (R$/sec)
    $rateBrasil = 155000.00; // Slightly conservative rate
    $rateSP = 57000.00;

    return [
        "brasil" => $anchorBrasil + ($secondsDiff * $rateBrasil),
        "sp" => $anchorSP + ($secondsDiff * $rateSP)
    ];
}

// 1. Try Fetching
$rawBrasil = fetchUrl("https://impostometro.com.br/Contador/GetTotalArrecadado");
$rawSP = fetchUrl("https://impostometro.com.br/Contador/GetTotalArrecadadoEstado?estado=SP");

$valBrasil = parseImposto($rawBrasil);
$valSP = parseImposto($rawSP);

// 2. Fallback Logic
if ($valBrasil < 1000) {
    $estimates = estimateValues();
    $valBrasil = $estimates["brasil"];
    $valSP = $estimates["sp"];
    $source = "estimate_fallback";
} else {
    $source = "official_api";
}

echo json_encode([
    "brasil" => $valBrasil,
    "sp" => $valSP,
    "source" => $source,
    "timestamp" => time()
]);
?>