// ===============================
// STEP 2: LAND SURFACE TEMPERATURE
// ===============================

// Study Area
var studyArea = ee.FeatureCollection(
  'projects/ee-gudia112211/assets/gilgit'
);

Map.centerObject(studyArea, 9);

// Landsat 8/9 Collection 2 Level-2
var landsat = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(studyArea)
  .filterDate('2024-05-01', '2024-09-30')
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

print('Number of Images:', landsat.size());

// Create median composite
var image = landsat.median().clip(studyArea);

print('Landsat Composite:', image);

// Surface Temperature
// ST_B10 scale factor and offset from Landsat Collection 2
var lstKelvin = image.select('ST_B10')
  .multiply(0.00341802)
  .add(149.0);

// Convert Kelvin to Celsius
var lstCelsius = lstKelvin.subtract(273.15)
  .rename('LST_Celsius');

print('LST Celsius:', lstCelsius);

// LST visualization
var lstVis = {
  min: 0,
  max: 45,
  palette: [
    '040274',
    '2c7bb6',
    'abd9e9',
    'ffffbf',
    'fdae61',
    'd7191c'
  ]
};

Map.addLayer(
  lstCelsius,
  lstVis,
  'LST (°C)'
);

// Study area boundary
Map.addLayer(
  studyArea.style({
    color: 'black',
    fillColor: '00000000',
    width: 2
  }),
  {},
  'Study Area'
);


// ==========================================
// STEP 3: LST STATISTICS + CHART
// ==========================================

// Calculate LST statistics
var lstStats = lstCelsius.reduceRegion({
  reducer: ee.Reducer.min()
    .combine({
      reducer2: ee.Reducer.max(),
      sharedInputs: true
    })
    .combine({
      reducer2: ee.Reducer.mean(),
      sharedInputs: true
    })
    .combine({
      reducer2: ee.Reducer.stdDev(),
      sharedInputs: true
    }),
  geometry: studyArea.geometry(),
  scale: 30,
  maxPixels: 1e13,
  bestEffort: true
});

print('LST Statistics (°C):', lstStats);

// ------------------------------------------
// LST Histogram
// ------------------------------------------

var lstChart = ui.Chart.image.histogram({
  image: lstCelsius,
  region: studyArea.geometry(),
  scale: 30,
  maxPixels: 1e8,
  minBucketWidth: 1
})
.setOptions({
  title: 'Land Surface Temperature Distribution - Gilgit',
  hAxis: {
    title: 'Land Surface Temperature (°C)'
  },
  vAxis: {
    title: 'Pixel Count'
  },
  legend: {
    position: 'none'
  }
});

print(lstChart);

// ------------------------------------------
// Export LST Map
// ------------------------------------------

Export.image.toDrive({
  image: lstCelsius,
  description: 'Gilgit_LST_2024',
  folder: 'GEE_LST_Project',
  fileNamePrefix: 'Gilgit_LST_2024',
  region: studyArea.geometry(),
  scale: 30,
  maxPixels: 1e13
});

// ==========================================
// STEP 4: LST CLASSIFICATION
// ==========================================

// 5 LST classes (°C)
var lstClass = ee.Image(0)
  .where(lstCelsius.lt(10), 1)                         // Very Low
  .where(lstCelsius.gte(10).and(lstCelsius.lt(20)), 2) // Low
  .where(lstCelsius.gte(20).and(lstCelsius.lt(30)), 3) // Moderate
  .where(lstCelsius.gte(30).and(lstCelsius.lt(40)), 4) // High
  .where(lstCelsius.gte(40), 5)                        // Very High
  .rename('LST_Class')
  .clip(studyArea);

// Visualization
var classVis = {
  min: 1,
  max: 5,
  palette: [
    '313695', // Very Low
    '74add1', // Low
    'ffffbf', // Moderate
    'fdae61', // High
    'd73027'  // Very High
  ]
};

Map.addLayer(
  lstClass,
  classVis,
  'LST Classified'
);

// ==========================================
// LEGEND
// ==========================================

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});

var legendTitle = ui.Label({
  value: 'LST Classes (°C)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 8px 0'
  }
});

legend.add(legendTitle);

var names = [
  'Very Low (<10°C)',
  'Low (10–20°C)',
  'Moderate (20–30°C)',
  'High (30–40°C)',
  'Very High (≥40°C)'
];

var colors = [
  '313695',
  '74add1',
  'ffffbf',
  'fdae61',
  'd73027'
];

for (var i = 0; i < names.length; i++) {

  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + colors[i],
      padding: '8px',
      margin: '0 5px 4px 0'
    }
  });

  var description = ui.Label({
    value: names[i],
    style: {
      margin: '0 0 4px 0'
    }
  });

  var row = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });

  legend.add(row);
}

Map.add(legend);

// ==========================================
// EXPORT CLASSIFIED LST
// ==========================================

Export.image.toDrive({
  image: lstClass,
  description: 'Gilgit_LST_Classified_2024',
  folder: 'GEE_LST_Project',
  fileNamePrefix: 'Gilgit_LST_Classified_2024',
  region: studyArea.geometry(),
  scale: 30,
  maxPixels: 1e13
});
