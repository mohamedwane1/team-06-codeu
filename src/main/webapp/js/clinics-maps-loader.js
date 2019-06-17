function createClinicsMap(){
    fetch('/clinics-data').then(function(response) {
      return response.json();
    }).then((clinics) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        // Centered at this location because it was the most central 
        // to the data I was using
        center: {lat: 45.56602083, lng: -94.1503188},
        zoom:7
      });

      clinics.forEach((clinic) => {
          addLandmark(map, clinic.lat, clinic.lng, clinic.title, clinic.description)
      });
    });
  }

  /** Adds a marker that shows an info window when clicked. */
  function addLandmark(map, lat, lng, title, description){
    const marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: title
    });
    const infoWindow = new google.maps.InfoWindow({
      content: description
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }