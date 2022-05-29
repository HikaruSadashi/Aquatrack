const GeoJsonLayer = deck.GeoJsonLayer;
const GoogleMapsOverlay = deck.GoogleMapsOverlay;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.7848201936765, lng: -87.40461005289102},
        zoom: 6,
        mapId: '58acd8972fb835b2'
        });

        const markers = [ 
           ["Lake Superior", 
           47.77106903208776, 
           -85.25131460472235],
           ["Lake Superior", 48.65801143095989, -87.32242685647755],
           ["Lake Superior", 48.54317973938302, -86.50381749271668],
           ["Lake Superior", 48.682584262531805, -86.75188093628057],
           ["Lake Superior", 46.83175002190238, -91.86198787369706],
           ["Lake Superior", 46.941948899575515, -91.03097533775797],
           ["Lake Superior", 46.71282109298761, -90.70849286112491],
           ["Lake Superior", 46.627711050388065, -90.37360721231362],
           ["Lake Superior", 46.75532585918563, -90.01391521914596],
           ["Lake Huron", 46.105636483584995, -83.34100812790591],
           ["Lake Huron", 45.99372957710892, -82.19991628751193],
           ["Lake Huron", 44.730163289242086, -80.81076100355405], 
           ["Lake Huron", 44.606669689082906, -80.27742459989165], 
           ["Lake Huron", 44.914910342139784, -80.07897384504052], 
           ["Lake Huron", 43.45638653073089, -82.49759242381111], 
           ["Lake Huron", 43.0951767510055, -82.33635118549458],
           ["Lake Huron", 43.33922854339281, -81.87743381490135], 
           ["Lake Michigan", 44.8973408835557, -85.53636960746898], 
           ["Lake Michigan", 45.1165730465603, -85.43714423004342],
           ["Lake Eerie", 42.71825338399616, -80.11914338639328], 
           ["Lake Eerie", 42.78868523461886, -79.35178788642143], 
           ["Lake Eerie", 42.7987403931653, -79.05032679714678]
    
        ];
        //Name
        //Lat,long
        
        for(let i = 0; i<markers.length;i++){
            const currentMarker = markers[i];

            const marker = new google.maps.Marker({
                position : {lat : currentMarker[1], lng : currentMarker[2]},
                map,
                title: currentMarker[0]
            })
            const infowindow = new google.maps.InfoWindow({
                content: currentMarker[0] + " Algae Deposit, High Algae Count",
              });
              marker.addListener("click", () => {
                infowindow.open(map,marker);
              });
             
        }
        
        
        const deckOverlay = new GoogleMapsOverlay({
            layers: [
              new GeoJsonLayer({
                id: "earthquakes",
                data: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
                filled: true,
                pointRadiusMinPixels: 2,
                pointRadiusMaxPixels: 200,
                opacity: 0.4,
                pointRadiusScale: 0.3,
                getRadius: (f) => Math.pow(10, f.properties.mag),
                getFillColor: [255, 70, 30, 180],
                autoHighlight: true,
                transitions: {
                  getRadius: {
                    type: "spring",
                    stiffness: 0.1,
                    damping: 0.15,
                    enter: () => [0],
                    duration: 10000,
                  },
                },
                onDataLoad: () => {
                  /* eslint-disable no-undef */
                  // @ts-ignore defined in include
                  progress.done(); // hides progress bar
                  /* eslint-enable no-undef */
                },
              }),
            ],
          });
        
          deckOverlay.setMap(map);  


          /* const ctaLayer = new google.maps.KmlLayer({
            url: "https://openmaps.gov.bc.ca/kml/geo/layers/whse_fish.fiss_fish_obsrvtn_pnt_sp_loader.kml",
            map: map,
          }); */
        
          window.initMap = initMap;
    }