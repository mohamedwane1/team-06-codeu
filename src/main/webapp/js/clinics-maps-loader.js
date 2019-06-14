function createClinicsMap(){
    fetch('/clinics-data').then(function(response) {
      return response.json();
    }).then((Clinic) => {
        
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.56602083, lng: -94.1503188},
        zoom:7
      });

      Clinic.forEach((Clinic) => {
          addLandmark(map, Clinic.lat, Clinic.lng, Clinic.title, Clinic.description)
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