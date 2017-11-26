function CalculateARV(inputParam, isDebug) {
  
  ARVConsole("ip_copay_limit="+inputParam.optionAddition.ip_copay_limit);
  ARVConsole("nrIP_COPAY_LIMIT="+inputParam.optionAddition.nrIP_COPAY_LIMIT);
    
    ConfigureAVR(isDebug);
 
    AVCalcTab = new AVGenericTab("AV Calculator"); 
    HelperTab  = new AVGenericTab("HelperTab");
    initCheckBoxes();
  

    var InputAVCalc = inputParam;
  	InitCheckBoxInputSection(InputAVCalc.ded);	
	InitCheckBoxInputSection(InputAVCalc.coins);	
	InitCheckBoxInputSection(InputAVCalc.omit);	
	InitCheckBoxInputSection(InputAVCalc.ded2);	
	InitCheckBoxInputSection(InputAVCalc.coins2);	
	InitCheckBoxInputSection(InputAVCalc.omit2);	
	
	InitRangeInputSection(InputAVCalc.coinst, 100);
	InitRangeInputSection(InputAVCalc.copay, 1);
	InitRangeInputSection(InputAVCalc.coinst2, 100);
	InitRangeInputSection(InputAVCalc.copay2, 1);

	InitCheckBoxInput(InputAVCalc.plan, "Checkbox_Int");
	InitCheckBoxInput(InputAVCalc.plan, "ip_per_diem");
	InitCheckBoxInput(InputAVCalc.plan, "Checkbox_Int");
	InitCheckBoxInput(InputAVCalc.plan, "snf_per_diem");
	InitCheckBoxInput(InputAVCalc.plan, "Checkbox_Sep");
	InitCheckBoxInput(InputAVCalc.plan, "csr_ind");
	InitDropDownInput(InputAVCalc.plan, "Dropdown_tier");
	  
	InitCheckBoxInput(InputAVCalc.optionAddition, "specrx_coins_max");
	InitCheckBoxInput(InputAVCalc.optionAddition, "ip_copay_limit");
	InitCheckBoxInput(InputAVCalc.optionAddition, "ofv_limit");
	InitCheckBoxInput(InputAVCalc.optionAddition, "ofv_copay_limit");
	InitRangeInput(InputAVCalc.optionAddition, "nrSPECRX_COINS_MAX");
	InitRangeInput(InputAVCalc.optionAddition, "nrIP_COPAY_LIMIT");
	InitRangeInput(InputAVCalc.optionAddition, "nrOFV_LIMIT");
	InitRangeInput(InputAVCalc.optionAddition, "nrOFV_COPAY_LIMIT");
	InitCheckBoxInput(InputAVCalc.HSA_HRA, "hsa");
	InitRangeInput(InputAVCalc.HSA_HRA, "nrHSA_CNTRBTN");
	  
	InitCheckBoxInput(InputAVCalc.TNOption, "MULTITIER_PLAN");
	InitRangeInput(InputAVCalc.TNOption, "nrTIER1_UTIL");
	InitRangeInput(InputAVCalc.TNOption, "nrTIER2_UTIL");

	InitRangeInput(InputAVCalc.Tier1Plan.Medical, "nrDEDUCT_MED");
	InitRangeInput(InputAVCalc.Tier1Plan.Medical, "nrGENCOINS_MED", 100);
	InitRangeInput(InputAVCalc.Tier1Plan.Medical, "nrMOOP_COMBINED_SEP_DED");
	InitRangeInput(InputAVCalc.Tier1Plan.Medical, "nrMOOP_MED");

	InitRangeInput(InputAVCalc.Tier1Plan.Drug, "nrDEDUCT_RX");
	InitRangeInput(InputAVCalc.Tier1Plan.Drug, "nrGENCOINS_RX", 100);
	InitRangeInput(InputAVCalc.Tier1Plan.Drug, "nrMOOP_RX");

	InitRangeInput(InputAVCalc.Tier1Plan.Combined, "nrDEDUCT");
	InitRangeInput(InputAVCalc.Tier1Plan.Combined, "nrGENCOINS", 100);
	InitRangeInput(InputAVCalc.Tier1Plan.Combined, "nrMOOP_COMBINED");

	
	InitRangeInput(InputAVCalc.Tier2Plan.Medical, "nrDEDUCT_MED2");
	InitRangeInput(InputAVCalc.Tier2Plan.Medical, "nrGENCOINS_MED2", 100);
	InitRangeInput(InputAVCalc.Tier2Plan.Medical, "nrMOOP_COMBINED_SEP_DED2");
	InitRangeInput(InputAVCalc.Tier2Plan.Medical, "nrMOOP_MED2");		
	
	InitRangeInput(InputAVCalc.Tier2Plan.Drug, "nrDEDUCT_RX2");
	InitRangeInput(InputAVCalc.Tier2Plan.Drug, "nrGENCOINS_RX2", 100);
	InitRangeInput(InputAVCalc.Tier2Plan.Drug, "nrMOOP_RX2");

	InitRangeInput(InputAVCalc.Tier2Plan.Combined, "nrDEDUCT2");
	InitRangeInput(InputAVCalc.Tier2Plan.Combined, "nrGENCOINS2", 100);
	InitRangeInput(InputAVCalc.Tier2Plan.Combined, "nrMOOP_COMBINED2");
  
    HelperTab.Range("nrDESIRED_MTIER").Value = InputAVCalc.plan["Dropdown_tier"];
    StartButton_Click();
  
    var output = {};
        output.status = AVCalcTab.Range("nrSTATUS").Value;
        output.AVCValue = AVCalcTab.Range("nrAVRESULT").Value;
    return output;  
}


function InitCheckBoxInput(section, field) {
  ARVConsole("Inside InitCheckBoxInput section["+field+"]="+section[field]);
  if (AVCalcTab.CheckBoxes(field).Value != Number(section[field])) {
	AVCalcTab.CheckBoxes(field).Value = Number(section[field]);
  }
}
function InitRangeInput(section, field, inPercent) {
  var percent = (inPercent==undefined)?1:inPercent;
  if (AVCalcTab.Range(field).Value != section[field]) {
	AVCalcTab.Range(field).Value = section[field]*(1/percent);
  }
}
function InitDropDownInput(section, field) {
  if (AVCalcTab.DropDowns(field).Value == section[field]) {
	AVCalcTab.DropDowns(field).Value = section[field];
  }
}
function InitCheckBoxInputSection(section) {
  for (var i=0; i<Object.keys(section).length; i++) {
    ARVConsole("Inside InitCheckBoxInput section["+Object.keys(section)[i]+"]="+section[Object.keys(section)[i]]);
    if (AVCalcTab.CheckBoxes(Object.keys(section)[i]).Value != Number(section[Object.keys(section)[i]])) {
	AVCalcTab.CheckBoxes(Object.keys(section)[i]).Value = Number(section[Object.keys(section)[i]]);
    }
  }
}

function InitRangeInputSection(section, inPercent) {
  for (var i=0; i<Object.keys(section).length; i++) {
    if (AVCalcTab.Range(Object.keys(section)[i]).Value != section[Object.keys(section)[i]]) {
	AVCalcTab.Range(Object.keys(section)[i]).Value = section[Object.keys(section)[i]] * (1/inPercent);
    }
  }
}

function DataDump(name) {
    var table = sheetCache(name);
  var output = {};
    output.jsonData = JSON.stringify(table.getValues());
  return output;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
	if (rawFile.readyState === 4 && rawFile.status == "200") {
	    callback(rawFile.responseText);
	}
    }
    rawFile.send(null);
}
