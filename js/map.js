let map;
let geocoder;

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
function codeAddress() {
  const address = $("#address").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      console.log(results.slice(0,3))

      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}