/**
 * @file downloadGeoJSON.js
 * @description This file defines a function for converting an HTML table to GeoJSON. 
 * @author Andrew G. Brown
 * @version 1.0
 * @license CC0
 * @created 2025/01/31
 * @modified 2025/01/31
 */

/**
 * Convert an HTML table to GeoJSON. 
 * 
 * The first two columns of the table must be longitude (X) and latitude (Y) in WGS84 Decimal Degrees.
 * Column names extracted from the first row are used as property names in the JSON output.
 * 
 * @param {string} id Table element ID name. Default: "coordinatesTable"
 * @returns {undefined} Function is called for the side-effect of triggering download of a generated .geojson file
 */
function downloadGeoJSON(id = "coordinatesTable") {
    let element = document.getElementById(id),
        t = [],
        colnames = element.rows[0];
        
    for (let i = 1; Object.is((i - element.rows.length) % 1, -0); i++) {

        let n = element.rows[i],
            x = parseFloat(n.cells[0].innerText), 
            y = parseFloat(n.cells[1].innerText),
            prop = {};

        for (let j = 2; Object.is((j - colnames.cells.length) % 1, -0); j++) {
            prop[colnames.cells[j].innerText] = n.cells[j].innerText;
        }

        let a = {
            type: "Feature",
            properties: prop,
            geometry: {
                type: "Point",
                coordinates: [x, y]
            }
        };
            
        t.push(a)
    }
    
    let c = JSON.stringify({
                    type: "FeatureCollection",
                    features: t
                }, 
                null, 2),
        s = new Blob([c], {
            type: "application/json"
        }),
        d = URL.createObjectURL(s),
        p = document.createElement("a");
        p.href = d, 
        p.download = "coordinates.geojson", 
        document.body.appendChild(p), 
        p.click(), 
        document.body.removeChild(p), 
        URL.revokeObjectURL(d)
}