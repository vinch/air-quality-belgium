var cities = {
	BRU: {
		name: 'Brussels',
		lat: 50.8503396,
		lon: 4.3517103
	},
	ANR: {
		name: 'Antwerp',
		lat: 51.21992,
		lon: 4.39625
	},
	GNE: {
		name: 'Ghent',
		lat: 51.05665,
		lon: 3.72
	},
	LGG: {
		name: 'Liège',
		lat: 50.63333,
		lon: 5.56666
	},
	CRL: {
		name: 'Charleroi',
		lat: 50.4124306,
		lon: 4.4437222
	}
}

function displayAirQuality(locode) {
	$('#city').text(cities[locode].name);
	$.get('../data.php?city='+locode, function(data) {
		$('#index').text(data.response);
		$('body').attr('id', 'level'+data.response);
	}, 'json');
}

function getDistance(lat1, lon1, lat2, lon2) {
	var R = 6371;
	var x = (lon2-lon1) * Math.cos((lat1+lat2)/2);
	var y = (lat2-lat1);
	return Math.sqrt(x*x + y*y) * R;
}

function success(position) {
	var min = Infinity, distance, locode;
	$.each(cities, function(item) {
		distance = getDistance(position.coords.latitude, position.coords.longitude, cities[item].lat, cities[item].lon);
		if (distance < min) {
			min = distance;
			locode = item;
		}
	});
	displayAirQuality(locode);
}

function error(msg) {
	displayAirQuality('BRU');
}

function resizeIndex() {
	var w = $(window).height() - $('#city').height();
	w = (w > 300) ? w : 300;
	$('#index').css({
		height: w+'px',
		lineHeight: w+'px'
	});
}

$(document).ready(function() {
	
	resizeIndex();
	
	$(window).resize(resizeIndex);
	
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		displayAirQuality('BRU');
	}
	
});