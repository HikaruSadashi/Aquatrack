//import * as markers from 'array.js'
//markers.yourArray;

const GeoJsonLayer = deck.GeoJsonLayer;
const GoogleMapsOverlay = deck.GoogleMapsOverlay;

async function getData() {
	const data = await axios.get('http://localhost:8081/list', {
		page_number: 1,
		page_limit: 50,
	});

	console.log('here');
	console.log(data);
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 47.7848201936765, lng: -87.40461005289102 },
		zoom: 6,
		mapId: '58acd8972fb835b2',
	});
	
	const markers = [
		['Lake Superior', 47.77106903208776, -85.25131460472235],
		['Lake Superior', 48.65801143095989, -87.32242685647755],
		['Lake Superior', 48.54317973938302, -86.50381749271668],
		['Lake Superior', 48.682584262531805, -86.75188093628057],
		['Lake Superior', 46.83175002190238, -91.86198787369706],
		['Lake Superior', 46.941948899575515, -91.03097533775797],
		['Lake Superior', 46.71282109298761, -90.70849286112491],
		['Lake Superior', 46.627711050388065, -90.37360721231362],
		['Lake Superior', 46.75532585918563, -90.01391521914596],
		['Lake Huron', 46.105636483584995, -83.34100812790591],
		['Lake Huron', 45.99372957710892, -82.19991628751193],
		['Lake Huron', 44.730163289242086, -80.81076100355405],
		['Lake Huron', 44.606669689082906, -80.27742459989165],
		['Lake Huron', 44.914910342139784, -80.07897384504052],
		['Lake Huron', 43.45638653073089, -82.49759242381111],
		['Lake Huron', 43.0951767510055, -82.33635118549458],
		['Lake Huron', 43.33922854339281, -81.87743381490135],
		['Lake Michigan', 44.8973408835557, -85.53636960746898],
		['Lake Michigan', 45.1165730465603, -85.43714423004342],
		['Lake Eerie', 42.71825338399616, -80.11914338639328],
		['Lake Eerie', 42.78868523461886, -79.35178788642143],
		['Lake Eerie', 42.7987403931653, -79.05032679714678][
			('Rainbow Trout', 1678861.973, 6442826.687)
		],
		['Brook Trout', 1797320.331, 6310040.049],
		['Rainbow Trout', 2127602.147, 5685815.342],
		['Brook Trout', 1949984.175, 5748573.146],
		['Rainbow Trout', 1820765.814, 5620791.386],
		['Brook Trout', 1946267.469, 5740227.102],
		['Brook Trout', 1624904.858, 6283573.878],
		['Rainbow Trout', 1780891.67, 5652792.314],
		['Rainbow Trout', 1792750.328, 5515488.857],
		['Rainbow Trout', 1788513.034, 5515963.536],
		['Rainbow Trout', 2201863.901, 5935070.82],
		['Rainbow Trout', 2186833.993, 5935456.41],
		['Rainbow Trout', 1885546.687, 5904127.548],
		['Westslope (Yellowstone) Cutthroat Trout', 2443872.577, 5785077.915],
		['Rainbow Trout', 1723587.334, 6062634.534],
		['Rainbow Trout', 1780891.67, 5652792.314],
		['Rainbow Trout', 2296182.029, 5845349.569],
		['Brook Trout', 2020007.707, 5771274.733],
		['Rainbow Trout', 1821284.007, 5608415.667],
		['Rainbow Trout', 2030372.706, 5745893.056],
		['Rainbow Trout', 1683600.013, 5584646.308],
		['Rainbow Trout', 1948234.606, 5799991.184],
		['Kokanee', 1896403.598, 5904998.879],
		['Rainbow Trout', 1961464.899, 5731557.222],
		['Rainbow Trout', 1951784.23, 5750371.727],
		['Rainbow Trout', 2296182.029, 5845349.569],
		['Rainbow Trout', 2298851.911, 5835299.236],
		['Rainbow Trout', 1877315.941, 5889078.841],
		['Rainbow Trout', 1738953.67, 5584689.455],
		['Cutthroat Trout', 1728715.975, 5576177.721],
		['Cutthroat Trout', 1611048.557, 5668363.105],
		['Rainbow Trout', 2040002.887, 5685445.785],
		['Cutthroat Trout (Anadromous)', 1797605.712, 5518698.742],
		['Cutthroat Trout', 1583024.141, 5631156.851],
		['Cutthroat Trout', 1599424.52, 5687814.366],
		['Cutthroat Trout', 1725126.535, 5581886.456],
		['Rainbow Trout', 1812078.717, 5622994.663],
	]; 

	var circle = {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'red',
		fillOpacity: 0.4,
		scale: 4.5,
		strokeColor: 'white',
		strokeWeight: 1,
	};

	for (let i = 0; i < markers.length; i++) {
		const currentMarker = markers[i];

		const marker = new google.maps.Marker({
			position: { lat: currentMarker[1], lng: currentMarker[2] },
			map,
			title: currentMarker[0],
			icon: circle,
		});
		const infowindow = new google.maps.InfoWindow({
			content: currentMarker[0] + 'Algae Deposit, High Algae Count',
		});
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}

	/*
	//Name
	//Lat,long
	const json = [ 
		{
			"FSH_BSR_ID": 375786,
			"LIFE_STAGE": Fingerling,
			"SPECIES_NM": RainbowTrout,
			"WTRBDY_ID": Lake,
			"WTRBDY_TYE": Lake,
			"X": 1970959.471,
			"Y": 5803206.897
		},
		{
			"FSH_BSR_ID": 375787,
			"LIFE_STAGE": Fry,
			"SPECIES_NM": RainbowTrout,
			"WTRBDY_ID": THOM,
			"WTRBDY_TYE": Lake,
			"X": 1901228.6,
			"Y": 5812142.944
		}
	]


	
	var i = 0, result = [];

	while(i < json.length){
    	result.push([])
    	for(var key in json[i].fields){
        	result[result.length-1].push(json[i].fields[key])	
    	}
    	i++
	}

	document.write(JSON.stringify(result, null, 4));
	
	//bruh

	console.log(result)

	/*
	for (let i = 0; i < result.length; i++) {
		const currentMarker = result[i];

		const marker = new google.maps.Marker({
			position: { lat: currentMarker[1], lng: currentMarker[2] },
			map,
			title: currentMarker[0],
			icon: circle,
		});
		const infowindow = new google.maps.InfoWindow({
			content: currentMarker[0] + 'Bruh',
		});
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}


	
	/*
	for (let i = 0; i < json.length; i++) {
		var obj = json[i];

		const marker = new google.maps.Marker({
			position: { lat: obj.X, lng: obj.Y },
			map,
			title: obj.SPECIES_NM,
			//icon: circle,
		});
		const infowindow = new google.maps.InfoWindow({
			content: obj.SPECIES_NM,
		});
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}

	*/
	
	/*
	// Looping through all the entries from the JSON data
	for(var i = 0; i < json.length; i++) {
		// Current object
		var obj = json[i];
	
		// Adding a new marker for the object
		var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(obj.X,obj.Y),
		  map: map,
		  title: obj.SPECIES_NM // this works, giving the marker a title with the correct title
		});
		
		// Adding a new info window for the object
		var clicker = addClicker(marker, obj.SPECIES_NM);
	  } // end loop
	  
	  
	  // Adding a new click event listener for the object
	  function addClicker(marker, content) {
		google.maps.event.addListener(marker, 'click', function() {
		  if (infowindow) {infowindow.close();}
		  infowindow = new google.maps.InfoWindow({content: content});
		  infowindow.open(map, marker);
		  
		});
	  }

	
	const marker = new google.maps.Marker({
		position: { lat: data.X, lng: data.Yo },
		map,
		title: data.SPECIES_NM,
		icon: circle,
	});
	const infowindow = new google.maps.InfoWindow({
		content: data.SPECIES_NM,
	});
	marker.addListener('click', () => {
		infowindow.open(map, marker);
	});

	
	$.each(markers, function(key, data)) {
		const marker = new google.maps.Marker({
			position: { lat: data.X, lng: data.Yo },
			map,
			title: data.SPECIES_NM,
			icon: circle,
		});
		const infowindow = new google.maps.InfoWindow({
			content: data.SPECIES_NM,
		});
		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	};
	*/

	const deckOverlay = new GoogleMapsOverlay({
		layers: [
			new GeoJsonLayer({
				id: 'earthquakes',
				data: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
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
						type: 'spring',
						stiffness: 0.1,
						damping: 0.15,
						enter: () => [0],
						duration: 10000,
					},
				},
			}),
		],
	});

	deckOverlay.setMap(map);

	/*
	 const ctaLayer = new google.maps.KmlLayer({
            url: "https://openmaps.gov.bc.ca/kml/geo/layers/whse_fish.fiss_fish_obsrvtn_pnt_sp_loader.kml",
            map: map,
          }); */

	window.initMap = initMap;
}
