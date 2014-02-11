self.onmessage = function(evt){
  var rgba = evt.data;
  var result = 'none';

  // Anzahl der Pixel die als rot bzw. gelb zu erkennen sind (hier: 40%)
  var targetNumPixels = rgba.length / 4 * 40 / 100;

  // Anzahl der erkannten Pixel
  var numYellowPixels = 0;
  var numRedPixels = 0;

  for(var i = 0; i < rgba.length; i += 4){
    var r = rgba[i];
    var g = rgba[i + 1];
    var b = rgba[i + 2];

    // Gelbe Pixel erkennen
    if(Math.abs(r - g) < 85 && Math.max(r, g) - b > 125){
      numYellowPixels++;
    }
    if(numYellowPixels >= targetNumPixels){
      result = 'yellow';
      break;
    }

    // Rote Pixel erkennen
    if(r - g > 80 && r - b > 80){
      numRedPixels++;
    }
    if(numRedPixels >= targetNumPixels){
      result = 'red';
      break;
    }

  }

  self.postMessage(result);

};
