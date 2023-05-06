let styleCache = {};

class OptaStyle {
  static ortsverband(opta) {
    return opta.substring(8, 12);
  }

  static imageSrc(opta) {
    const imageSrcMap = {
      2110: 'tz/thw-ztrfu.png',
      2200: 'tz/thw-b.png'
    };

    const id = opta.substring(13, 17);
    let imageSrc = imageSrcMap[id];
    if (!imageSrc) {
      imageSrc = 'tz/thw-helfer.png'
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
      "hazard-acute": 'tz/gefahr-acute.png'
    };

    let imageSrc = imageSrcMap[hazardType];
    if (!imageSrc) {
      imageSrc = 'tz/gefahr-acute.png'
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

const basemap = new ol.layer.Tile({
  opacity: 1,
  source: new ol.source.XYZ({
    attributions:
      '<a href="https://www.bkg.bund.de">Kartendarstellung: © Bundesamt für Kartographie und Geodäsie (2021)</a>, ' +
      '<a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf">Datenquellen</a>',
    url: 'https://mapproxy.turnertech.de/tms/1.0.0/top_plus_open/webmercator/{z}/{x}/{-y}.png',
    //projection: ol.proj.proj4.fromEPSGCode(3857),
    tileGrid: new ol.tilegrid.TileGrid({
      extent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
      resolutions: [156543.033928041, 78271.5169640205, 39135.7584820102, 19567.8792410051, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.496226281410, 305.748113140705, 152.874056570353, 76.4370282851763, 38.2185141425881, 19.1092570712941, 9.55462853564703, 4.77731426782352, 2.38865713391176, 1.19432856695588, 0.597164283477939]
    })
  }),
});

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
  url: function (extent) {
    return (
      '/ows?SERVICE=WFS&VERSION=2.0.2&REQUEST=GetFeature&TYPENAMES=boscop:Area&' +
      'SRSNAME=http://www.opengis.net/def/crs/EPSG/0/4326&BBOX=' +
      ol.proj.transformExtent(extent, 'EPSG:3857','EPSG:4326').join(',') +
      ',http://www.opengis.net/def/crs/EPSG/0/4326'
    );
  },
  strategy: ol.loadingstrategy.bbox
});

const unitSource = new ol.source.Vector({
  format: new ol.format.GML32({
    srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
  }),
  url: function (extent) {
    return (
      '/ows?SERVICE=WFS&VERSION=2.0.2&REQUEST=GetFeature&TYPENAMES=boscop:Unit&' +
      'SRSNAME=http://www.opengis.net/def/crs/EPSG/0/4326&BBOX=' +
      ol.proj.transformExtent(extent, 'EPSG:3857','EPSG:4326').join(',') +
      ',http://www.opengis.net/def/crs/EPSG/0/4326'
    );
  },
  strategy: ol.loadingstrategy.bbox
});

const hazardSource = new ol.source.Vector({
  format: new ol.format.GML32({
    srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
  }),
  url: function (extent) {
    return (
      '/ows?SERVICE=WFS&VERSION=2.0.2&REQUEST=GetFeature&TYPENAMES=boscop:Hazard&' +
      'SRSNAME=http://www.opengis.net/def/crs/EPSG/0/4326&BBOX=' +
      ol.proj.transformExtent(extent, 'EPSG:3857','EPSG:4326').join(',') +
      ',http://www.opengis.net/def/crs/EPSG/0/4326'
    );
  },
  strategy: ol.loadingstrategy.bbox
});

const copLayer = new ol.layer.Vector({
  //source: copWfsSource,
  style: AreaStyle.styleFunction
});

const unitLayer = new ol.layer.Vector({
  //source: unitSource,
  style: OptaStyle.styleFunction
});

const hazardLayer = new ol.layer.Vector({
  //source: hazardSource,
  style: HazardStyle.styleFunction
});

const map = new ol.Map({
  target: 'map',
  layers: [
    onlineBasemap,
    copLayer,
    unitLayer,
    hazardLayer
  ],
  view: new ol.View({
    center: [1000000, 6650300],
    zoom: 6
  })
});

const selectSingleClick = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove
});
map.addInteraction(selectSingleClick);

function refreshCopLayer() {
  copLayer.getSource().refresh();
  unitLayer.getSource().refresh();
  hazardLayer.getSource().refresh();
}

let draw;
document.getElementById('insert').addEventListener('click', function () {
  draw = new ol.interaction.Draw({
    source: copWfsSource,
    type: 'Polygon'
  });
  draw.on('drawend', function (e) {
    const formatWFS = new ol.format.WFS({
      version: '2.0.0',
      featureNS: 'urn:ns:de:turnertech:boscop'
    });
    e.feature.setProperties({
      "areaType": typeSelect.value
    });
    e.feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    const node = formatWFS.writeTransaction([e.feature], null, null, {
      featureNS: 'urn:ns:de:turnertech:boscop',
      featurePrefix: 'boscop',
      featureType: 'Area',
      srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326',
      version: '2.0.0',
      gmlOptions: {
        featureNS: 'urn:ns:de:turnertech:boscop',
        featureType: 'Area',
        srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
      }
    });
    e.feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const xs = new XMLSerializer();
    const payload = xs.serializeToString(node);
    console.log(payload);
    map.removeInteraction(draw);
  });
  map.addInteraction(draw);
});


document.getElementById('insertHazard').addEventListener('click', function () {
  draw = new ol.interaction.Draw({
    source: hazardSource,
    type: 'Point'
  });
  draw.on('drawend', function (e) {
    const formatWFS = new ol.format.WFS({
      version: '2.0.0',
      featureNS: 'urn:ns:de:turnertech:boscop'
    });
    e.feature.setProperties({
      "hazardType": hazardSelect.value
    });
    e.feature.getGeometry().transform('EPSG:3857', 'EPSG:4326');
    const node = formatWFS.writeTransaction([e.feature], null, null, {
      featureNS: 'urn:ns:de:turnertech:boscop',
      featurePrefix: 'boscop',
      featureType: 'Hazard',
      srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326',
      version: '2.0.0',
      gmlOptions: {
        featureNS: 'urn:ns:de:turnertech:boscop',
        featureType: 'Hazard',
        srsName: 'http://www.opengis.net/def/crs/EPSG/0/4326'
      }
    });
    e.feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const xs = new XMLSerializer();
    const payload = xs.serializeToString(node);
    console.log(payload);
    map.removeInteraction(draw);
  });
  map.addInteraction(draw);
});