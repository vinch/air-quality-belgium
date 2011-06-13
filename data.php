<?php

require_once 'phar://goutte.phar/autoload.php';

use Goutte\Client;

$cities = array('BRU', 'ANR', 'GNE', 'LGG', 'CRL');
$time = file_exists('cache/data') ? filemtime('cache/data') : 0;

if ($time && time()-$time <= 60*60) {
	$result = json_decode(file_get_contents('cache/data'), true);
}
else {
	$client = new Client();
	$indexes = $client->request('GET', 'http://deus.irceline.be/~celinair/index/subindex_air.php?lan=en')->filter('img[alt!=index]')->each(function($node, $i) {
		return $node->getAttribute('alt');
	});
	
	$result = array_combine($cities, array_slice($indexes, 0, 5));
	
	if (!file_exists('cache')) {
		mkdir('cache');
	}
	file_put_contents('cache/data', json_encode($result));
}

if (isset($_GET['city'])) {
	if (in_array($_GET['city'], $cities)) {
		$city = $_GET['city'];
		$status = 'ok';
		$response = $result[$city];
	}
	else {
		$status = 'error';
		$response = 'Unknown city';
	}
}
else {
	$status = 'ok';
	$response = $result;
}

header('Content-Type: text/plain');
echo json_encode(array('status' => $status, 'response' => $response));