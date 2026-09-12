# 🌡️ Land Surface Temperature Analysis of Gilgit — 2024

## 📌 Project Overview

This project analyzes **Land Surface Temperature (LST)** in the Gilgit region using **Landsat 8 Collection 2 Level-2 data** and **Google Earth Engine (GEE)**.

The study produces a continuous LST map in degrees Celsius and a classified LST map showing different temperature zones across the study area.

## 🎯 Objectives

* Calculate Land Surface Temperature for Gilgit.
* Analyze the spatial distribution of surface temperature.
* Classify LST into five temperature classes.
* Calculate LST statistics.
* Produce maps and visualizations suitable for GIS and remote sensing analysis.
* Develop a reproducible Google Earth Engine workflow.

## 🗺️ Study Area

**Study Area:** Gilgit, Gilgit-Baltistan, Pakistan

The study area boundary was imported from a Google Earth Engine asset:

`projects/ee-gudia112211/assets/gilgit`

## 🛰️ Data and Tools

### Satellite Data

* Landsat 8 Collection 2 Level-2
* Surface Temperature Band: `ST_B10`
* Spatial resolution: 30 m

### Software / Platforms

* Google Earth Engine
* JavaScript
* GIS & Remote Sensing techniques

## 🔬 Methodology

The workflow consists of the following major steps:

1. Import the Gilgit study area.
2. Filter Landsat imagery by study area and date.
3. Apply cloud filtering.
4. Create a median composite.
5. Extract the Landsat surface temperature product.
6. Convert temperature from Kelvin to Celsius.
7. Generate the continuous LST map.
8. Calculate minimum, maximum, mean and standard deviation.
9. Classify LST into five temperature categories.
10. Export the final LST products.

## 🌡️ LST Classification

| Class     | Temperature Range |
| --------- | ----------------- |
| Very Low  | < 10°C            |
| Low       | 10–20°C           |
| Moderate  | 20–30°C           |
| High      | 30–40°C           |
| Very High | ≥ 40°C            |

## 📊 Analysis

The project includes:

* Minimum LST
* Maximum LST
* Mean LST
* Standard deviation
* LST distribution histogram
* Classified temperature map

## 📁 Repository Contents

```text
LST-Gilgit-2024/
│
├── README.md
├── LST_Gilgit_2024.js
├── LST_Gilgit_2024.png
└── LST_Classified_2024.png
```

## 📈 Results

The analysis provides a spatial representation of surface temperature across Gilgit and identifies areas with relatively low, moderate and high surface temperatures.

The classified map can be used to support further studies related to:

* Urban heat analysis
* Environmental monitoring
* Climate studies
* Land surface characterization
* Remote sensing research

## 💡 Skills Demonstrated

* Google Earth Engine
* Landsat data processing
* Land Surface Temperature analysis
* Remote sensing
* Spatial analysis
* GIS mapping
* Data visualization
* Raster classification
* Geospatial data export

## 👩‍💻 Author

**Zohra — GIS & Remote Sensing**

GitHub: `zohra-GIS-RS`

---

⭐ This project is part of my GIS and Remote Sensing portfolio, demonstrating practical satellite-image processing and Google Earth Engine analysis.
