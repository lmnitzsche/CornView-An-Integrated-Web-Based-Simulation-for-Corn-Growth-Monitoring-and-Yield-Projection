const soilColor = document.querySelector(".soil");
const cornPlants = document.querySelectorAll(".corn-plant1, .corn-plant2, .corn-plant3, .corn-plant4, .corn-plant5, .corn-plant6, .corn-plant7, .corn-plant8, .corn-plant9, .corn-plant10, .corn-plant11, .corn-plant12, .corn-plant13, .corn-plant14, .corn-plant15, .corn-plant16, .corn-plant17, .corn-plant18, .corn-plant19, .corn-plant20");
const dayCount = document.getElementById("dayValue");
const gduCount = document.getElementById("gduValue");
const selectSoilTexure = document.getElementById("soil-texture");
const selectSeedZone = document.getElementById("seed-zone");
const selectSeedBed = document.getElementById("seed-bed");
const selectSeedingDepth = document.getElementById("seeding-depth");
const selectPlantingDate = document.getElementById("planting-date");
const fileInputTemp = document.getElementById("fileInput");
const fileInputEnvironmental = document.getElementById("fileInputEnvironmental");
const textBox = document.getElementById('textBox');

//MAIN
var maxTemp;
var minTemp;
var baseTemp = 50;
var GDU = 0;
var soilTexture = "fine"; //fine, pH below 7, or coarse, pH above 7
var seedZone = "optimum"; //optimum by default
var seedBed = "normal"; //normal by default
var seedingDepth = "one"; //+15 GDU for each inch below two inches
var plantingDate = "before"; //before by default
var growthLevels = 0;
var days = 1;
var count = 1; //used in read in function
var addedGDU = 0;
const temperatureData = []; //values from file
var randomizerGDU = Math.floor(Math.random() * 30) + 30;
var insertSpace = " ";

GDU += randomizerGDU; //add 30-60 GDU for fine soil
GDU += 15; //add 15 GDU for early plant date

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

var moderateDrought = false; //high likilihood of Moderate Drought
var severeDrought = false; //high likilihood of Severe Drought
var extremeDrought = false; //high likilihood of Extreme Drought

//END OF MAIN... functions/event listeners
function updateGDUCount() {
  gduCount.textContent = GDU;
}
function updateDayCount() {
  dayCount.textContent = days + insertSpace;
}
function updateTextBox() {
  let textBoxContent = '';
  textBoxContent += 'Day ${days} GDU: ${GDU} \n';
  textBox.textContent = textBoxContent;
}

fileInputTemp.addEventListener("change", function () {
  const selectedFile = fileInputTemp.files[0];
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
      fileInputTemp.value = null;
    }
    reader.readAsText(selectedFile);
  } 
  else {
    console.log("No file selected");
  }
});

fileInputEnvironmental.addEventListener("change", function () {
  const selectedFileX = fileInputEnvironmental.files[0];
  if(selectedFileX) {
    const readerX = new FileReader();

    readerX.onload = function(event) {
      const fileTextX = event.target.result;
      const valuesX = fileTextX.split(',');

      const passedInsoilTexture = valuesX[0].trim();
      const passedInseedZone = valuesX[1].trim();
      const passedInseedBed = valuesX[2].trim();
      const passedInseedingDepth = valuesX[3].trim();
      const passedInplantingDate = valuesX[4].trim();
      
      switch(passedInsoilTexture) {
        case "fine":
          if(soilTexture === "coarse")
          {
            soilTexture = "fine";
            GDU += 2 * randomizerGDU;
            soilColor.style.backgroundColor = "brown";
          }
          updateGDUCount();
          updateDayCount();
          break;
  
        case "coarse":
          if(soilTexture === "fine")
          {
            soilTexture = "coarse";
            GDU -= 2 * randomizerGDU;
            soilColor.style.backgroundColor = "gray";
          }
          updateGDUCount();
          updateDayCount();
          break;
      }
      switch(passedInseedZone) {
        case "optimum":
          if(seedZone === "belowoptimum")
          {
            seedZone = "optimum";
            GDU -= 30;
          }
          updateGDUCount();
          updateDayCount();
          break;
    
        case "belowoptimum":
          if(seedZone === "optimum")
          {
            seedZone = "belowoptimum";
            GDU += 30;
          }
          updateGDUCount();
          updateDayCount();
          break;
        }
        switch(passedInseedBed) {
          case "normal":
            if(seedBed != "normal")
            {
              seedBed = "normal";
              GDU -= 30;
            }
            updateGDUCount();
            updateDayCount();
            break;
      
          case "soilcrusting":
            if(seedBed === "normal")
            {
              GDU += 30;
            }
            seedBed = "soilcrusting"
            updateGDUCount();
            updateDayCount();
            break;
          
          case "massiveclods":
            if(seedBed === "normal")
            {
              GDU += 30;
            }
            seedBed = "massiveclods"
            updateGDUCount();
            updateDayCount();
            break;
          }
          switch(passedInseedingDepth) {
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
              updateDayCount();
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
              updateDayCount();
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
              updateDayCount();
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
              updateDayCount();
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
              updateDayCount();
              break;
          }
          switch(passedInplantingDate) {
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
              updateDayCount();
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
              updateDayCount();
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
              updateDayCount();
              break;
          }

      fileInputEnvironmental.value = null;
    }
    readerX.readAsText(selectedFileX);
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
    updateDayCount();
});

document.getElementById("probability-drought").addEventListener("change", function () {
  var selectedValue = this.value;
  if(selectedValue === "illinois") {
      openModalIllinois();
  }
});

function openModalIllinois() {
  const illinoisContainer = document.getElementById("state-container");
  const illinoisModal = document.getElementById("illinois-Model")
  illinoisContainer.style.display = "block";

  var xRedZone = 150; //X coordinates (right = lower numbers)
  var yRedZone = 150; //Y coordinates (higher = lower numbers)
  var radiusModerate = 40;
  var radiusSevere = 25;
  
  illinoisModal.addEventListener("click", function () {
    var rect = illinoisModal.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    var distance = Math.sqrt(Math.pow(x - xRedZone, 2) + Math.pow(y - yRedZone, 2));

    if(distance <= radiusSevere) {
      alert("Chance of Severe Drought")
      severeDrought = true;
    }
    else if(distance <= radiusModerate) {
      alert("Chance of Moderate Drought");
      moderateDrought = true;
    }
    
    illinoisContainer.style.display = "none";

    //BEGINNING OF DROUGHT WORK
    if(severeDrought == true && VE == false) {
      const randomDelay = [28, 35, 42][Math.floor(Math.random() * 3)];
      days += randomDelay; //Sets you back 4 to 6 weeks
      alert("Severe drought has pushed back your emergence several weeks.")
      updateDayCount();
    }
    else if(severeDrought == true && RT == true) {
      alert("Due to severe drought after silking, your crops have died; the simulation will restart.");
      window.location.href = "index.html";
    }
    else if(severeDrought == true) {
      const chanceOfWholePlantDeath = 0.2;
      const chanceOfPartialDeath = 0.6;
      const maxTasselsToDie = 5;
      
      if(randomOutcome < chanceOfWholePlantDeath) {
        alert("Your crops have died; the simulation will restart.");
        window.location.href = "index.html";
      }
      else if(randomOutcome < chanceOfWholePlantDeath + chanceOfPartialDeath) {
        const numTasselsToDie = Math.floor(Math.random() * (maxTasselsToDie + 1));
      }

      cornPlants.forEach(plant => {
        for(let i = 0; i < numTasselsToDie; i++) {
          const randomTasselIndex = Math.floor(Math.random() * plant.children.length);
          const tassel = plant.children[randomTasselIndex];
  
          if(tassel.style.display !== "none") {
            tassel.style.display = "none";
          }
          else {
            i--;
          }
        }
      });
    }

    else if(moderateDrought == true && VE == false) {
      const randomDelay = [7, 8, 9, 10, 11, 12, 13, 14][Math.floor(Math.random() * 3)];
      days += randomDelay; //Sets you back 1 to 2 weeks
      alert("Moderate drought has pushed back your emergence a couple weeks.")
    }
    else if(moderateDrought == true && RT == true) {
      chanceOfPartialDeath = 0.4;
      maxTasselsToDie = 3;

      if(randomOutcome < chanceOfPartialDeath) {
        numTasselsToDie = Math.floor(Math.random() * (maxTasselsToDie + 1));
      }

      cornPlants.forEach(plant => {
        for(let i = 0; i < numTasselsToDie; i++) {
          randomTasselIndex = Math.floor(Math.random() * plant.children.length);
          tassel = plant.children[randomTasselIndex];
  
          if(tassel.style.display !== "none") {
            tassel.style.display = "none";
          }
          else {
            i--;
          }
        }
      });
    }
    else if(moderateDrought == true) {
      chanceOfPartialDeath = 0.4;
      maxTasselsToDie = 3;

      if(randomOutcome < chanceOfPartialDeath) {
        numTasselsToDie = Math.floor(Math.random() * (maxTasselsToDie + 1));
      }

      cornPlants.forEach(plant => {
        for(let i = 0; i < numTasselsToDie; i++) {
          randomTasselIndex = Math.floor(Math.random() * plant.children.length);
          tassel = plant.children[randomTasselIndex];
  
          if(tassel.style.display !== "none") {
            tassel.style.display = "none";
          }
          else {
            i--;
          }
        }
      });
    }
  });
}
//END OF DROUGHT WORK

simulationAssumptions.addEventListener("click", () => {
    alert("This 20-crop simulation assumes statistically average upkeep and uses precipitation averages from Summer 2022.");
}); //before april = +10-25 GDU, after May 15 = -50-70 GDU

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
    updateDayCount();
    updateTextBox(days, GDU)
});

restartSimulation.addEventListener("click", () => {
    window.location.href = "index.html"
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
        updateDayCount();
        break;

      case "coarse":
        if(soilTexture === "fine")
        {
          soilTexture = "coarse";
          GDU -= 2 * randomizerGDU;
          soilColor.style.backgroundColor = "gray";
        }
        updateGDUCount();
        updateDayCount();
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
      updateDayCount();
      break;

    case "belowoptimum":
      if(seedZone === "optimum")
      {
        seedZone = "belowoptimum";
        GDU += 30;
      }
      updateGDUCount();
      updateDayCount();
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
      updateDayCount();
      break;

    case "soilcrusting":
      if(seedBed === "normal")
      {
        GDU += 30;
      }
      seedBed = "soilcrusting"
      updateGDUCount();
      updateDayCount();
      break;
    
    case "massiveclods":
      if(seedBed === "normal")
      {
        GDU += 30;
      }
      seedBed = "massiveclods"
      updateGDUCount();
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
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
      updateDayCount();
      break;
  }
});

//Generate File
function generateEnvTextFile() {
  const values = [
    selectSoilTexure.value,
    selectSeedZone.value,
    selectSeedBed.value,
    selectSeedingDepth.value,
    selectPlantingDate.value
  ];

  const content = values.join(', ');

  const blob = new Blob([content], { type: 'text/plain' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'environmentalData.txt';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

function generateTempTextFile() {
  const tempRows = document.querySelectorAll('#temperatureTable tr');
  const temperatureData = [];
  temperatureDaysCount = 0;

  for(let i = 1; i <= 50; i++) {
      const tempRow = tempRows[i];
      const maxTempValue = tempRow.cells[1].querySelector('input[name="maxTemp"]').value;
      const minTempValue = tempRow.cells[2].querySelector('input[name="minTemp"]').value;

      if(maxTempValue || minTempValue) {
          temperatureData.push(`${maxTempValue}, ${minTempValue},`);
      }
  }

  const contentTwo = temperatureData.join('\n');
  const blobTwo = new Blob([contentTwo], { type: 'text/plain' });

  const b = document.createElement('a');
  b.href = URL.createObjectURL(blobTwo);
  b.download = 'temperatureData.txt';
  b.style.display = 'none';
  document.body.appendChild(b);
  b.click();

  document.body.removeChild(b);
  URL.revokeObjectURL(b.href);
}

const extraButton = document.getElementById('toggle-environment-button');
const extraDisplay = document.querySelector('.rv-toggles');

extraButton.addEventListener('click', () => {
  if(extraDisplay.style.display === 'none') {
    extraDisplay.style.display = 'block';
  } else {
    extraDisplay.style.display = 'none';
  }
  extraButton.remove();
});

const fileInputButton = document.getElementById("fileInputButton");
const manualInputButton = document.getElementById("manualInputButton");
const semimanualInputButton = document.getElementById("semimanualInputButton");
const fileInputSection = document.getElementById("fileInputSection");
const manualInputSection = document.getElementById("manualInputSection");
const rvSection = document.getElementById("rvSection");
const semimanualWarningSection = document.getElementById("semimanualHelp")


fileInputButton.addEventListener("click", function () {
  rvSection.style.display = "block";
  fileInputSection.style.display = "block";
  manualInputSection.style.display = "none";
  semimanualWarningSection.style.display = "none";
});
manualInputButton.addEventListener("click", function () {
  rvSection.style.display = "block";
  fileInputSection.style.display = "none";
  manualInputSection.style.display = "block";
  semimanualWarningSection.style.display = "none";
});
semimanualInputButton.addEventListener("click", function () {
  rvSection.style.display = "block";
  fileInputSection.style.display = "block";
  manualInputSection.style.display = "block";
  semimanualWarningSection.style.display = "block"
});

function changeText(element) {
  element.innerHTML = "Temperature Input<br><a><span style='font-size: x-small; color: white;'>Click to Travel to Temperature Text File Creation Page</span></a>";
}

function restoreText(element) {
  element.textContent = "Temperature Input";
}

function changeTextTwo(element) {
  element.innerHTML = "Environmental Input<br><a><span style='font-size: x-small; color: white;'>Click to Travel to Environmental Text File Creation Page</span></a>";
}

function restoreTextTwo(element) {
  element.textContent = "Environmental Input";
}

function calculateCornYield() {
  var earsPerAcre = parseFloat(document.getElementById('number-of-ears').value);
  var kernelRowsPerEar = parseFloat(document.getElementById('number-of-kernels').value);
  var kernelsPerRow = parseFloat(document.getElementById('number-of-kernel-rows').value);
  var kernelsPerBushel = parseFloat(document.getElementById('number-of-bushels').value);

  var cornYield = (earsPerAcre * kernelRowsPerEar * kernelsPerRow) /(kernelsPerBushel * 90000)

  document.getElementById('result').innerText =  cornYield.toFixed(2) + " bushels";
}

const genotypeTraits = {
  CKD932: {
    daysToPollenShedding: 51.33, // 50%
    daysToSilking: 55.00, // 50%
    plantHeight: 154.33, // in cm
    earHeight: 102.70, // in cm
    grainWeight: 43.00, // 100 grain wt (g)
    harvestIndex: 0.347,
    grainYield: 9.031 // kg/plot
  },
  CKD933: {
    daysToPollenShedding: 48.33,
    daysToSilking: 51.33,
    plantHeight: 163.70,
    earHeight: 79.00,
    grainWeight: 50.00,
    harvestIndex: 0.311,
    grainYield: 6.716
  },
  "24K42": {
    daysToPollenShedding: 43.00,
    daysToSilking: 46.67,
    plantHeight: 161.70,
    earHeight: 70.67,
    grainWeight: 26.67,
    harvestIndex: 0.371,
    grainYield: 5.359
  },
  "39K71": {
    daysToPollenShedding: 50.00,
    daysToSilking: 53.33,
    plantHeight: 178.70,
    earHeight: 79.00,
    grainWeight: 30.00,
    harvestIndex: 0.354,
    grainYield: 8.925
  },
  "48K95": {
    daysToPollenShedding: 50.67,
    daysToSilking: 53.67,
    plantHeight: 173.30,
    earHeight: 83.33,
    grainWeight: 29.33,
    harvestIndex: 0.345,
    grainYield: 7.752
  },
  "25K56": {
    daysToPollenShedding: 46.00,
    daysToSilking: 49.33,
    plantHeight: 139.00,
    earHeight: 68.33,
    grainWeight: 30.33,
    harvestIndex: 0.398,
    grainYield: 7.618
  },
  KT303: {
    daysToPollenShedding: 48.00,
    daysToSilking: 54.33,
    plantHeight: 158.67,
    earHeight: 92.67,
    grainWeight: 29.00,
    harvestIndex: 0.374,
    grainYield: 9.532
  },
  KT304: {
    daysToPollenShedding: 49.00,
    daysToSilking: 51.33,
    plantHeight: 230.70,
    earHeight: 90.00,
    grainWeight: 30.33,
    harvestIndex: 0.375,
    grainYield: 9.549
  },
  "2234": {
    daysToPollenShedding: 52.00,
    daysToSilking: 55.67,
    plantHeight: 173.30,
    earHeight: 98.67,
    grainWeight: 29.00,
    harvestIndex: 0.367,
    grainYield: 7.152
  },
  "2235": {
    daysToPollenShedding: 51.00,
    daysToSilking: 51.33,
    plantHeight: 225.33,
    earHeight: 100.67,
    grainWeight: 34.67,
    harvestIndex: 0.461,
    grainYield: 11.910
  },
  "2236": {
    daysToPollenShedding: 53.33,
    daysToSilking: 54.67,
    plantHeight: 227.00,
    earHeight: 104.33,
    grainWeight: 32.00,
    harvestIndex: 0.354,
    grainYield: 6.554
  },
  ND6339: {
    daysToPollenShedding: 48.00,
    daysToSilking: 51.33,
    plantHeight: 185.30,
    earHeight: 86.00,
    grainWeight: 33.00,
    harvestIndex: 0.426,
    grainYield: 9.637
  },
  ND6340: {
    daysToPollenShedding: 48.33,
    daysToSilking: 51.33,
    plantHeight: 177.70,
    earHeight: 81.33,
    grainWeight: 30.33,
    harvestIndex: 0.380,
    grainYield: 9.716
  },
  ND6876: {
    daysToPollenShedding: 47.33,
    daysToSilking: 49.67,
    plantHeight: 224.30,
    earHeight: 98.00,
    grainWeight: 35.33,
    harvestIndex: 0.452,
    grainYield: 12.51
  }
};

const genotypeSelect = document.getElementById('genotype');

// Event listener for genotype dropdown change
genotypeSelect.addEventListener('change', function() {
  const selectedGenotype = genotypeTraits[this.value];

  // Accessing each variable
  const daysToPollenShedding = selectedGenotype.daysToPollenShedding;
  const daysToSilking = selectedGenotype.daysToSilking;
  const plantHeight = selectedGenotype.plantHeight;
  const earHeight = selectedGenotype.earHeight;
  const grainWeight = selectedGenotype.grainWeight;
  const harvestIndex = selectedGenotype.harvestIndex;
  const grainYield = selectedGenotype.grainYield;

});