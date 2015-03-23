$(document).ready(function() {

	var x = document.getElementById("demo");
	function getLocation() {
	    if (Modernizr.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	function showPosition(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
	    x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
		var map = L.map('map').setView([latitude,longitude], 15);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> ',
    	maxZoom: 25
	}).addTo(map);

	L.marker([latitude,longitude]).addTo(map)
			.bindPopup("<b>TU POSICIÓN</b><br /> by Geolocation").openPopup();

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("Coordenadas del  sitio: " + e.latlng.toString())
			.openOn(map);
	}

	map.on('click', onMapClick);
	}

	getLocation();
});
