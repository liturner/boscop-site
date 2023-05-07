let styleCache = {};

class OptaStyle {
  static ortsverband(opta) {
    return opta.substring(8, 12);
  }

  static imageSrc(opta) {
    const imageSrcMap = {
      2110: 'map/tz/thw-ztrfu.png',
      2200: 'map/tz/thw-b.png'
    };

    const id = opta.substring(13, 17);
    let imageSrc = imageSrcMap[id];
    if (!imageSrc) {
      imageSrc = 'map/tz/thw-helfer.png'
    }
    return imageSrc;
  }

  static styleFunction(feature) {
    console.log('Styling Opta');
    const opta = feature.get('opta');
    let style = styleCache[opta];
    if (!style) {
      if (!opta) {
        style = new ol.layer.Vector().getStyleFunction()();
      } else {
        style = new ol.style.Style({
          image: new ol.style.Icon({
            src: OptaStyle.imageSrc(opta),
            width: 64,
            height: 64,
          }),
          text: new ol.style.Text({
            text: OptaStyle.ortsverband(opta),
            textBaseline: 'top',
            offsetY: 16,
            font: 'bold 14px Calibri,sans-serif',
            fill: new ol.style.Fill({
              color: 'black',
            }),
            stroke: new ol.style.Stroke({
              color: 'white',
              width: 2,
            }),
          }),
        });
      }
      styleCache[opta] = style;
    }
    return style;
  };
}

class HazardStyle {
  static imageSrc(hazardType) {
    const imageSrcMap = {
      "thw-ztrfu": 'map/tz/thw-ztrfu.png',
      "thw-helfer": 'map/tz/thw-helfer.png',
      "fw-abc-erkundung": 'map/tz/fw-abc-erkundung.png',
      "hazard-acute": 'map/tz/gefahr-acute.png',
      "gefahr-gs": 'map/tz/gefahr-gs.png',
      "gefahr-vermutet-strom": 'map/tz/gefahr-vermutet-strom.png'
    };

    let imageSrc = imageSrcMap[hazardType];
    if (!imageSrc) {
      imageSrc = 'map/tz/gefahr-acute.png'
    }
    return imageSrc;
  }

  static styleFunction(feature) {
    console.log('Styling Hazard');
    const hazardType = feature.get('hazardType');
    let style = styleCache[hazardType];
    if (!style) {
      style = new ol.style.Style({
        image: new ol.style.Icon({
          src: HazardStyle.imageSrc(hazardType),
          width: 64,
          height: 64,
        })
      });
      styleCache[hazardType] = style;
    }
    return style;
  }
}

const patternCanvas = document.createElement('canvas');
const patternContext = patternCanvas.getContext('2d');
 
// Give the pattern a width and height of 50
patternCanvas.width = 50;
patternCanvas.height = 50;
 
// Give the pattern a background color and draw an arc
patternContext.fillStyle = 'rgba(0, 0, 255, 0.05)';
patternContext.fillRect(0, 0, patternCanvas.width, patternCanvas.height);
patternContext.arc(0, 0, 30, 0, .5 * Math.PI);
patternContext.stroke();
 
// Create our primary canvas and fill it with the pattern
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const pattern = ctx.createPattern(patternCanvas, 'repeat');

class AreaStyle {
  static styleCache = {};

  static imageSrc(opta) {
    return 'todo';
  }

  static styleFunction(feature) {
    console.log('Styling Area');
    return new ol.style.Style({
      //Width of the stroke
      stroke: new ol.style.Stroke({
        color: [0, 0, 255, 1],
        width: 3
      }),
      //Fill polygon with canvas pattern
      fill: new ol.style.Fill({
        // color: [255, 0, 51, 0.1]
        color: pattern
      })
    })
  };
}

const onlineBasemap = new ol.layer.Tile({
  opacity: 0.7,
  source: new ol.source.WMTS({
    attributions:
      '<a href="https://www.bkg.bund.de">Kartendarstellung: © Bundesamt für Kartographie und Geodäsie (2021)</a>, ' +
      '<a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf">Datenquellen</a>',
    url: 'https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web/default/WEBMERCATOR/{TileMatrix}/{TileRow}/{TileCol}.png',
    requestEncoding: 'REST',
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
      resolutions: [156543.033928041, 78271.5169640205, 39135.7584820102, 19567.8792410051, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.496226281410, 305.748113140705, 152.874056570353, 76.4370282851763, 38.2185141425881, 19.1092570712941, 9.55462853564703, 4.77731426782352, 2.38865713391176, 1.19432856695588, 0.597164283477939],
      matrixIds: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
    }),
    wrapX: true,
  }),
})

const copWfsSource = new ol.source.Vector({
  format: new ol.format.GML32({
    srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
  }),
  strategy: ol.loadingstrategy.bbox
});

const unitSource = new ol.source.Vector({
  format: new ol.format.GML32({
    srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
  }),
  strategy: ol.loadingstrategy.bbox
});

const hazardSource = new ol.source.Vector({
  format: new ol.format.GML32({
    srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
  }),
  strategy: ol.loadingstrategy.bbox
});

const copLayer = new ol.layer.Vector({
  source: copWfsSource,
  style: AreaStyle.styleFunction
});

const unitLayer = new ol.layer.Vector({
  source: unitSource,
  style: OptaStyle.styleFunction
});

const hazardLayer = new ol.layer.Vector({
  source: hazardSource,
  style: HazardStyle.styleFunction
});

const map = new ol.Map({
  controls: ol.control.defaults.defaults().extend([new ol.control.FullScreen(), new ol.control.ScaleLine()]),
  target: 'map',
  layers: [
    onlineBasemap,
    copLayer,
    unitLayer,
    hazardLayer
  ],
  view: new ol.View({
    center: [1244800, 6230600],
    zoom: 17
  })
});

const selectSingleClick = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove
});
//map.addInteraction(selectSingleClick);

let draw;
document.getElementById('insert').addEventListener('click', function () {
  if(draw) {
    map.removeInteraction(draw);
  }
  draw = new ol.interaction.Draw({
    source: copWfsSource,
    type: 'Polygon'
  });
  draw.on('drawend', function (e) {
    e.feature.setProperties({
      "areaType": typeSelect.value
    });
    //map.removeInteraction(draw);
  });
  map.addInteraction(draw);
});

document.getElementById('insertHazard').addEventListener('click', function () {
  if(draw) {
    map.removeInteraction(draw);
  }
  draw = new ol.interaction.Draw({
    source: hazardSource,
    type: 'Point'
  });
  draw.on('drawend', function (e) {
    e.feature.setProperties({
      "hazardType": hazardSelect.value
    });
    //map.removeInteraction(draw);
  });
  map.addInteraction(draw);
});

document.getElementById('insertUnit').addEventListener('click', function () {
  if(draw) {
    map.removeInteraction(draw);
  }
  draw = new ol.interaction.Draw({
    source: hazardSource,
    type: 'Point'
  });
  draw.on('drawend', function (e) {
    e.feature.setProperties({
      "hazardType": unitSelect.value
    });
    //map.removeInteraction(draw);
  });
  map.addInteraction(draw);
});

document.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  map.removeInteraction(draw);
});