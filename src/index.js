import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import BingMaps from 'ol/source/BingMaps';
import Draw from 'ol/interaction/Draw';
import { Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style.js';


var raster = new TileLayer({
  source: new BingMaps({
    key: 'Ame9J_T8Eo4bLY9Uwg4Vo-MZC4pQuWSnWFOBi9mYEfrwC3XNxqLNpYSlyMxb2F3q',
    imagerySet: 'AerialWithLabels'
  })
});

var source = new VectorSource({ wrapX: false });

var vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  })
});

var styles = [
  'RoadOnDemand',
  'Aerial',
  'AerialWithLabelsOnDemand',
  'CanvasDark',
  'OrdnanceSurvey'
];





var map = new Map({
  layers: [raster, vector],
  target: 'map',
  view: new View({
    projection: "EPSG:4326",
    center: [-54.1015603474702, -25.2604871173066],
    zoom: 13
  })
});



var typeSelect = document.getElementById('type');

var draw; // global so we can remove it later
function addInteraction() {
  var value = typeSelect.value;
  if (value !== 'None') {
    draw = new Draw({
      source: source,
      type: typeSelect.value
    });
    map.addInteraction(draw);
  }
}


/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();


const button = document.getElementById('capturarCoordenadas');
button.addEventListener('click', function (e) {
  var features = vector.getSource().getFeatures();

  // Go through this array and get coordinates of their geometry.
  features.forEach(function (feature) {
    alert(feature.getGeometry().getCoordinates());
  });
});
