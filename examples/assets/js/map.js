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

var map;

function displayMarkers() {
	$.get('../data.php', function(data) {
		$.each(data.response, function(item) {
			var infoWindow = new google.maps.InfoWindow({
				content: '<strong>Air quality:</strong> '+data.response[item]
			});
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(cities[item].lat, cities[item].lon), 
				map: map
			});
			infoWindow.open(map,marker);
		});
	}, 'json');
}

function initialize() {
	var latlng = new google.maps.LatLng(50.8503396, 4.3517103); // Brussels
	var myOptions = {
		zoom: 9,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	};
	map = new google.maps.Map($('#map')[0], myOptions);
	displayMarkers();
}

$(document).ready(function() {
	initialize();
});