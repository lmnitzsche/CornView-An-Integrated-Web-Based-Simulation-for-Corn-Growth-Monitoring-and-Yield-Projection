const soilColor = document.querySelector(".soil");
const cornPlants = document.querySelectorAll(".corn-plant1, .corn-plant2, .corn-plant3, .corn-plant4, .corn-plant5, .corn-plant6, .corn-plant7, .corn-plant8, .corn-plant9, .corn-plant10, .corn-plant11, .corn-plant12, .corn-plant13, .corn-plant14, .corn-plant15, .corn-plant16, .corn-plant17, .corn-plant18, .corn-plant19, .corn-plant20");
const gduCount = document.getElementById("gduValue");
const selectSoilTexure = document.getElementById("soil-texture");
const selectSeedZone = document.getElementById("seed-zone");
const selectSeedBed = document.getElementById("seed-bed");
const selectSeedingDepth = document.getElementById("seeding-depth");
const selectPlantingDate = document.getElementById("planting-date");
const fileInput = document.getElementById("fileInput");

//MAIN
var maxTemp;
var minTemp;
var baseTemp = 50;
var GDU = 0;
var soilTexture = "fine"; //fine, pH below 7, or coarse, pH above 7
var seedZone = "optimum"; //optimum by default
var seedBed = "normal"; //normal by default
var seedingDepth = "one"; //+15 GDU for each inch below two inches
var plantingDate = "during"; //during by default
var growthLevels = 0;
var days = 1;
var count = 1; //used in read in function
var addedGDU = 0;
const temperatureData = []; //values from file
var randomizerGDU = Math.floor(Math.random() * 30) + 30;

GDU += randomizerGDU; //add 30-60 GDU for fine soil

var VE = false; //Corn Growth Stages... VE Stage
var VTW = false; //V2 Stage
var VTH = false; //V3 Stage
var VS = false; //V6 Stage
var VN = false; //V8 Stage
var VTE = false; //V10 Stage
var VT = false; //VT Stage
var RT = false; //R2 Stage
var RF = false; //R4 Stage
var RV = false; //R5 Stage
var RS = false; //R6 Stage... Final Stage


//END OF MAIN... functions/event listeners
function updateGDUCount() {
  gduCount.textContent = GDU;
}
//FINISH 80html
fileInput.addEventListener("change", function () {
  const selectedFile = fileInput.files[0];
  if(selectedFile) {
    const reader = new FileReader();

    reader.onload = function(event) {
      const fileText = event.target.result;
      const values = fileText.split(',');

      for(let i = 0; i < values.length; i += 2) {
        const maxTempFile = parseInt(values[i].trim());
        const minTempFile = parseInt(values[i + 1].trim());
        temperatureData.push({maxTempFile, minTempFile});
        count++;
      }
      fileInput.value = null;
    }
    reader.readAsText(selectedFile);
  } 
  else {
    console.log("No file selected");
  }
});

runSimulation.addEventListener("click", () => {

  for(let z = 0; z < count - 1; z++) {
    maxTemp = temperatureData[z].maxTempFile;
    minTemp = temperatureData[z].minTempFile;

    if(maxTemp > 86) { 
      maxTemp = 86;   
    } //the growth rate of corn causes HEAT STRESS when exceeding 86F
    if(minTemp < 50) {
      alert("WARNING: CORN DOES NOT GROW WHEN TEMPERATURES ARE BELOW 50F, THUS MINIMUM TEMPERATURE HAS BEEN SET TO 50F.");
      minTemp = 50;
    } //corn will not grow below 50F
    if(minTemp > maxTemp) {
      alert("WARNING: IT IS IMPOSSIBLE FOR THE MINIMUM TEMPERATURE TO BE GREATER THAN THE MAXIMUM TEMPERATURE, THUS MINIMUM TEMPERATURE HAS BEEN SET TO THE MAXIMUM TEMPERATURE.");
      minTemp = maxTemp;
    }
    addedGDU = (maxTemp + minTemp) / 2 - baseTemp;
    GDU += addedGDU;
    days++;
  }
    if(growthLevels < 220) {

      if(GDU > 100 && VE == false)
      {
        growthLevels += 20;
        VE = true;
        alert("Corn emergence has occured! (VE Stage)");
      }
      if(GDU > 200 && VTW == false)
      {
        growthLevels += 20;
        VTW = true;
        alert("2 Leaves are now fully emerged! (V2 Stage)");
      }
      if(GDU > 350 && VTH == false)
      {
        growthLevels += 20;
        VTH = true;
        alert("The photosynthetic process has began! (V3 Stage)");
      }
      if(GDU > 475 && VS == false)
      {
        growthLevels += 20;
        VS = true;
        alert("The growing point of the corn plant is near the surface! (V6 Stage)");
      }
      if(GDU > 610 && VN == false)
      {
        growthLevels += 20;
        VN = true;
        alert("8 Leaves have now formed! (V8 Stage)");
      }
      if(GDU > 740 && VTE == false)
      {
        growthLevels += 20;
        VTE = true;
        alert("10 Leaves have now emerged! (V10 Stage)");
      }
      if(GDU > 1135 && VT == false)
      {
        growthLevels += 20;
        VT = true;
        alert("The last branch of the tassel is visible! (VT Stage)");
      }
      if(GDU > 1660 && RT == false)
      {
        growthLevels += 20;
        RT = true;
        alert("The kernal is now white and shaped like a blister! (R2 Stage)");
      }
      if(GDU > 1925 && RF == false)
      {
        growthLevels += 20;
        RF = true;
        alert("The inner fluid has began thickening! (R4 Stage)");
      }
      if(GDU > 2450 && RV == false)
      {
        growthLevels += 20;
        RV = true;
        alert("The kernals have began to dry down towards the cob! (R5 Stage)");
      }
      if(GDU > 2700 && RS == false)
      {
        growthLevels += 20;
        RS = true;
        alert("The kernals continue to gain weight until physiological maturity! (R6 Stage)");
      }
      cornPlants.forEach(plant => {
        plant.style.height = growthLevels + "px";
      });
    }
    else { //fix
      alert("All corn plants are fully grown; congratulations!");
    }

  updateGDUCount();
});

simulationAssumptions.addEventListener("click", () => {
    alert("This 20-crop simulation assumes statistically average upkeep.");
}); //before april = +10-25 GDU, after May 15 = -50-70 GDU

openTextBox.addEventListener("click", () => { //13html FIX
  if (textBox.style.display === "none") {
    textBox.style.display = "block"; // Show the text box
  } else {
    textBox.style.display = "none"; // Hide the text box
  }
}); 

waterAllButton.addEventListener("click", () => {
    
    if(growthLevels < 220) {
      maxTemp = parseInt(prompt("Enter the day " + days + " maximum temperature:"));
      minTemp = parseInt(prompt("Enter the day " + days + " minimum temperature:"));
      if (maxTemp > 86) { 
        maxTemp = 86;   
      } //the growth rate of corn causes HEAT STRESS when exceeding 86F
      if (minTemp < 50) {
        alert("WARNING: CORN DOES NOT GROW WHEN TEMPERATURES ARE BELOW 50F, THUS MINIMUM TEMPERATURE HAS BEEN SET TO 50F.");
        minTemp = 50;
      } //corn will not grow below 50F
      if(minTemp > maxTemp) {
        alert("WARNING: IT IS IMPOSSIBLE FOR THE MINIMUM TEMPERATURE TO BE GREATER THAN THE MAXIMUM TEMPERATURE, THUS MINIMUM TEMPERATURE HAS BEEN SET TO THE MAXIMUM TEMPERATURE.");
        minTemp = maxTemp;
      }
      addedGDU = (maxTemp + minTemp) / 2 - baseTemp;
      GDU += addedGDU;
      days++;
      
      if(GDU > 100 && VE == false)
      {
        growthLevels += 20;
        VE = true;
        alert("Corn emergence has occured! (VE Stage)");
      }
      if(GDU > 200 && VTW == false)
      {
        growthLevels += 20;
        VTW = true;
        alert("2 Leaves are now fully emerged! (V2 Stage)");
      }
      if(GDU > 350 && VTH == false)
      {
        growthLevels += 20;
        VTH = true;
        alert("The photosynthetic process has began! (V3 Stage)");
      }
      if(GDU > 475 && VS == false)
      {
        growthLevels += 20;
        VS = true;
        alert("The growing point of the corn plant is near the surface! (V6 Stage)");
      }
      if(GDU > 610 && VN == false)
      {
        growthLevels += 20;
        VN = true;
        alert("8 Leaves have now formed! (V8 Stage)");
      }
      if(GDU > 740 && VTE == false)
      {
        growthLevels += 20;
        VTE = true;
        alert("10 Leaves have now emerged! (V10 Stage)");
      }
      if(GDU > 1135 && VT == false)
      {
        growthLevels += 20;
        VT = true;
        alert("The last branch of the tassel is visible! (VT Stage)");
      }
      if(GDU > 1660 && RT == false)
      {
        growthLevels += 20;
        RT = true;
        alert("The kernal is now white and shaped like a blister! (R2 Stage)");
      }
      if(GDU > 1925 && RF == false)
      {
        growthLevels += 20;
        RF = true;
        alert("The inner fluid has began thickening! (R4 Stage)");
      }
      if(GDU > 2450 && RV == false)
      {
        growthLevels += 20;
        RV = true;
        alert("The kernals have began to dry down towards the cob! (R5 Stage)");
      }
      if(GDU > 2700 && RS == false)
      {
        growthLevels += 20;
        RS = true;
        alert("The kernals continue to gain weight until physiological maturity! (R6 Stage)");
      }

      cornPlants.forEach(plant => {
        plant.style.height = growthLevels + "px";
      });
    } else {
      alert("All corn plants are fully grown; congratulations!");
    }
    updateGDUCount();
});

restartSimulation.addEventListener("click", () => {
    soilTexture = "fine";
    growthLevels = 0;
    days = 2;
    addedGDU = 0;
    
    VE = false; //Corn Growth Stages... VE Stage
    VTW = false; //V2 Stage
    VTH = false; //V3 Stage
    VS = false; //V6 Stage
    VN = false; //V8 Stage
    VTE = false; //V10 Stage
    VT = false; //VT Stage
    RT = false; //R2 Stage
    RF = false; //R4 Stage
    RV = false; //R5 Stage
    RS = false; //R6 Stage

    maxTemp = parseInt(prompt("Enter the day 1 maximum temperature:"));
    minTemp = parseInt(prompt("Enter the day 1 minimum temperature:"));

    if(maxTemp > 86) { 
      maxTemp = 86;   
    } //the growth rate of corn causes HEAT STRESS when exceeding 86F
    if(minTemp < 50 ) {
      alert("WARNING: CORN DOES NOT GROW WHEN TEMPERATURES ARE BELOW 50F, THUS MINIMUM TEMPERATURE HAS BEEN SET TO 50F.");
      minTemp = 50;
    }
    if(minTemp > maxTemp) {
      alert("WARNING: IT IS IMPOSSIBLE FOR THE MINIMUM TEMPERATURE TO BE GREATER THAN THE MAXIMUM TEMPERATURE, THUS MINIMUM TEMPERATURE HAS BEEN SET TO THE MAXIMUM TEMPERATURE.");
      minTemp = maxTemp;
    }

    GDU = (maxTemp + minTemp) / 2 - baseTemp; 
    GDU += randomizerGDU //fine soil
    updateGDUCount();

    cornPlants.forEach(plant => {
        plant.style.height = growthLevels + "px";
    });
    soilColor.style.backgroundColor = "brown";
});

selectSoilTexure.addEventListener("change", function() {
    const soilTextureSelecter = selectSoilTexure.value;
    
    switch(soilTextureSelecter) {
      case "fine":
        if(soilTexture === "coarse")
        {
          soilTexture = "fine";
          GDU += 2 * randomizerGDU;
          soilColor.style.backgroundColor = "brown";
        }
        updateGDUCount();
        break;

      case "coarse":
        if(soilTexture === "fine")
        {
          soilTexture = "coarse";
          GDU -= 2 * randomizerGDU;
          soilColor.style.backgroundColor = "gray";
        }
        updateGDUCount();
        break;
    }
});

selectSeedZone.addEventListener("change", function() {
  const seedZoneSelecter = selectSeedZone.value;

  switch(seedZoneSelecter) {
    case "optimum":
      if(seedZone === "belowoptimum")
      {
        seedZone = "optimum";
        GDU -= 30;
      }
      updateGDUCount();
      break;

    case "belowoptimum":
      if(seedZone === "optimum")
      {
        seedZone = "belowoptimum";
        GDU += 30;
      }
      updateGDUCount();
      break;
    }
});

selectSeedBed.addEventListener("change", function() {
  const seedBedSelector = selectSeedBed.value;

  switch(seedBedSelector) {
    case "normal":
      if(seedBed != "normal")
      {
        seedBed = "normal";
        GDU -= 30;
      }
      updateGDUCount();
      break;

    case "soilcrusting":
      if(seedBed === "normal")
      {
        GDU += 30;
      }
      seedBed = "soilcrusting"
      updateGDUCount();
      break;
    
    case "massiveclods":
      if(seedBed === "normal")
      {
        GDU += 30;
      }
      seedBed = "massiveclods"
      updateGDUCount();
      break;
    }
});

selectSeedingDepth.addEventListener("change", function() {
  const seedingDepthSelector = selectSeedingDepth.value;

  switch(seedingDepthSelector) {
    case "one":
      if(seedingDepth === "twofive")
      {
        GDU -= 7.5;
      }
      else if(seedingDepth === "three")
      {
        GDU -= 15;
      }
      seedingDepth = "one";
      updateGDUCount();
      break;

    case "onefive":
      if(seedingDepth === "twofive")
      {
        GDU -= 7.5;
      }
      else if(seedingDepth === "three")
      {
        GDU -= 15;
      }
      seedingDepth = "onefive";
      updateGDUCount();
      break;

    case "two":
      if(seedingDepth === "twofive")
      {
        GDU -= 7.5;
      }
      else if(seedingDepth === "three")
      {
        GDU -= 15;
      }
      seedingDepth = "two";
      updateGDUCount();
      break;

    case "twofive":
      if(seedingDepth === "three")
      {
        GDU -= 7.5;
      }
      else if(seedingDepth != "twofive")
      {
        GDU += 7.5;
      }
      seedingDepth = "twofive";
      updateGDUCount();
      break;

    case "three":
      if(seedingDepth === "twofive")
      {
        GDU += 7.5;
      }
      else if(seedingDepth != "three")
      {
        GDU += 15;
      }
      seedingDepth = "three";
      updateGDUCount();
      break;
  }
});

selectPlantingDate.addEventListener("change", function() {
  const plantingDateSelector = selectPlantingDate.value;

  switch(plantingDateSelector) {
    case "during":
      if(plantingDate === "before")
      {
        GDU -= 15;
      }
      else if(plantingDate == "after")
      {
        GDU += 60;
      }
      plantingDate = "during";
      updateGDUCount();
      break;
    
    case "before":
      if(plantingDate === "during")
      {
        GDU += 15; //+15 GDU for early planting date
      }
      else if(plantingDate == "after")
      {
        GDU += 75;
      }
      plantingDate = "before";
      updateGDUCount();
      break;

    case "after":
      if(plantingDate === "during")
      {
        GDU -= 60; //-60 GDU for late planting date
      }
      else if(plantingDate == "before")
      {
        GDU -= 75; 
      }
      plantingDate = "after";
      updateGDUCount();
      break;

  }
});