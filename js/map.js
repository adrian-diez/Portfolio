let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.352, lng: -3.894},
    zoom: 17
  });
}