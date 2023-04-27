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

function codeAddress () {

  //GET ADDRESS FROM INPUT
  const address = $("#address").val();

  //GET LOCATION FROM ADDRESS
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      
      //CREATE A MARKER IN NEW POSITION
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      //SET MAP IN NEW POSITION
      map.setZoom(15);
      map.setCenter(results[0].geometry.location);
      $('#route-btn')[0].style.display = 'inline'

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function calculateRoute () {

  //INITIALIZE NECESSARY SERVICES
  routeService = new google.maps.DirectionsService(); 
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map)
  directionsRenderer.setPanel(panel)

  //SET MY ADDRESS AS DESTINATION
  const destino = {lat: 40.352, lng: -3.894};  

  //SET ORIGIN AS LAST MARKER ON MAP, TRAVEL MODE AS DRIVING
  const opciones = { 
      origin:map.center,  
      destination:destino, 
      travelMode: google.maps.DirectionsTravelMode.DRIVING 
  };     

  //RENDER DIRECTIONS ON SCREEN
  routeService.route(opciones, function(response, status) { 
      if (status == google.maps.DirectionsStatus.OK) { 
        directionsRenderer.setDirections(response); 
        $('#panel')[0].style.height = '500px';
        }     
      });
}