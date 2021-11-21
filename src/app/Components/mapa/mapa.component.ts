import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  title = 'locationApp';

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log( 
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'pk.eyJ1IjoiYWxmcmVkby1jYXN0aWxsbyIsImEiOiJja3R6NTVuOXExazV4MnVxbTZlMTd0N2E3In0.Z-U3MFRclsA-vWYq_KY2_Q',
        } 
      ).addTo(mymap);

      var myIcon = L.icon({
        iconUrl: '../assets/img/map-pin.png',
        iconSize: [40, 45]
    });

      let marker = L.marker(latLong,{draggable:true,icon:myIcon}).addTo(mymap);
      marker.on('dragend', (objeto:any)=>{
        alert("El mapa se detuvo en " + objeto.target._latlng.lat +", "+ objeto.target._latlng.lng)
      })


      marker.bindPopup('<b>Hola Guapo</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('Aquí estás') 
        .openOn(mymap);

        // Añadiendo leaflet

        let ruta = L.Routing.control({
          waypoints: [
            L.latLng(coords.latitude, coords.longitude),
            L.latLng( 21.867542071296167, -102.3087799994685 )
          ],
            routeWhileDragging: true,
            reverseWaypoints: true,
            showAlternatives: true,
            altLineOptions: {
                styles: [
                    {color: 'black', opacity: 0.15, weight: 9},
                    {color: 'white', opacity: 0.8, weight: 6},
                    {color: 'blue', opacity: 0.5, weight: 2}
                ]
            }
            
        }).addTo(mymap);
        


        //Añadiendo Esri leaflet
        var arcgisOnlineProvider = L.esri.Geocoding.arcgisOnlineProvider({
          apikey: 'AAPKddfb706fb169401bade2b6c31b4e049a-C5zyF7oA9g6PF0O1lK09hxZi_Aukt2yz4rVvo6UAx8usjGggUTsRsE4LOSxHqGB' // replace with your api key - https://developers.arcgis.com
        });

        let buscador = L.esri.Geocoding.geosearch({
          providers: [arcgisOnlineProvider]
        }).addTo(mymap);
    
        

        let results = L.layerGroup().addTo(mymap)
        buscador.on('results',(data:any)=>{
          results.clearLayers();
          for (var i = data.results.length - 1; i >= 0; i--) {
            results.addLayer(L.marker(data.results[i].latlng));

            //AQUI VA EL CODIGO PARA ACTUALIZAR LA RUTA
            ruta.spliceWaypoints(1,1, data.results[i].latlng);

          }
        });

        

    });
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
