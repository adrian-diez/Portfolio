let map;
let geocoder;
let routeService;
let directionsRenderer;

function initMap() {
  const options = {}

  //MAP CENTER
  options.center = {lat: 40.352, lng: -3.894}

  //MAP ZOOM
  options.zoom = 17

  //MAP TYPE (TYPES: 'roadmap', 'satellite', 'hybrid', 'terrain')
  options.mapTypeId = 'hybrid'

  //CREATING MAP AND GEOCODER
  map = new google.maps.Map(document.getElementById('map'),options)
  geocoder = new google.maps.Geocoder();
    
  //ADDING A MARKER TO THE MAP
  let mark1 = new google.maps.Marker({
    position: options.center,
    map,
    title: "Hello World!",
  });
 
  //ADDING ONE BOX TO THE DATA (NOT ATTACHED TO ANY MARKER YET)
  let textbox1 = new google.maps.InfoWindow({content: 'Empresa: <b>MasterD Formación online</b><br/>\
  Teléfono: 000000000<br/>dirección: calle , número y piso'})

  //ATTACHING A TEXTBOX TO A MARKER
  google.maps.event.addListener(mark1, 'click', () => {textbox1.open(map,mark1)})

}

function test () {
  console.log('click works')
  return
}

function codeAddress () {
  console.log('codeAddress starting...')
  const address = $("#address").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      map.setZoom(15);
      map.setCenter(results[0].geometry.location);

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function calculateRoute () {

  routeService = new google.maps.DirectionsService(); 
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map)


  const destino = {lat: 40.352, lng: -3.894};  

  var opciones = { 
      origin:map.center,  
      destination:destino, 
      travelMode: google.maps.DirectionsTravelMode.DRIVING 
      //indicamos en este caso que hacemos el viaje en coche/moto     
  };     

  routeService.route(opciones, function(response, status) { 
      if (status == google.maps.DirectionsStatus.OK) { 
        console.log(response)
        directionsRenderer.setDirections(response); }     
      });
}