<?php
// Exemplo de configuração. 
// O arquivo real 'config.php' será gerado automaticamente pelo GitHub Actions.
// NÃO COLOQUE SENHAS REAIS AQUI.

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ipvasp');

// Debug Mode Configuration
define('DEBUG_MODE', true); // Toggle this for local/prod debug
if (DEBUG_MODE) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}
