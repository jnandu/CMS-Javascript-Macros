var AVC_NamedRanges;
var debug=0;
function ConfigureAVR(isDebug) {
	debug = isDebug;
	AVC_NamedRanges = {
		"nrRXGEN_COINS2" : "H33",
		"nrOT_COINS2" : "H25",
		"nrOPFAC_COINS2" : "H30",
		"nrXRAY_COINS2" : "H28",
		"nrLAB_COINS2" : "H27",
		"nrIP_COINS" : "D19",
		"nrIMG_COINS" : "D23",
		"nrPC_COINS" : "D20",
		"nrSP_COINS" : "D21",
		"nrIP_COINS2" : "H19",
		"nrIMG_COPAY2" : "I23",
		"nrIMG_COINS2" : "H23",
		"nrIP_COPAY2" : "I19",
		"nrPC_COINS2" : "H20",
		"nrSP_COINS2" : "H21",
		"nrPSY_COINS2" : "H22",
		"nrRXGEN_COPAY2" : "I33",
		"nrER_COPAY2" : "I18",
		"nrOPPROF_COPAY2" : "I31",
		"nrOPFAC_COPAY2" : "I30",
		"nrLAB_COPAY2" : "I27",
		"nrXRAY_COPAY2" : "I28",
		"nrOT_COPAY2" : "I25",
		"nrPREV_COPAY2" : "I26",
		"nrSP_COPAY" : "E21",
		"nrOT_COPAY" : "E25",
		"nrPSY_COPAY" : "E22",
		"nrOPPROF_COPAY" : "E31",
		"nrIP_COPAY" : "E19",
		"nrLAB_COPAY" : "E27",
		"nrLAB_COINS" : "D27",
		"nrER_COINS" : "D18",
		"nrOPFAC_COINS" : "D30",
		"nrTIER1_UTIL" : "H4",
		"nrDEDUCT_RX" : "C10",
		"nrTIER2_UTIL" : "H5",
		"nrHSA_CNTRBTN" : "E4",
		"nrMOOP_RX2" : "G13",
		"nrGENCOINS_MED" : "B11",
		"nrDEDUCT" : "D10",
		"nrGENCOINS_RX2" : "G11",
		"nrMOOP_COMBINED" : "D12",
		"nrDEDUCT_MED2" : "F10",
		"nrDEDUCT2" : "H10",
		"nrDEDUCT_RX2" : "G10",
		"nrGENCOINS_MED2" : "F11",
		"nrOFV_LIMIT" : "B43",
		"nrSPECRX_COINS_MAX" : "B39",
		"nrIP_COPAY_LIMIT" : "B41",
		"nrRXFORM_COINS" : "D34",
		"nrRXNONFORM_COINS" : "D35",
		"nrOPPROF_COINS" : "D31",
		"nrMETAL_DETERMINATION" : "B50",
		"nrNotesMsg" : "B51",
		"nrOFV_COPAY_LIMIT" : "B45",
		"nrTIMEKEEP" : "B52",
		"nrSTATUS" : "B48",
		"nrAVRESULT" : "B49",
		"nrPREV_COINS2" : "H26",
		"nrSNF_COINS2" : "H29",
		"nrRXNONFORM_COINS2" : "H35",
		"nrRXSPCLTY_COINS2" : "H36",
		"nrRXFORM_COINS2" : "H34",
		"nrST_COPAY" : "E24",
		"nrOT_COINS" : "D25",
		"nrST_COINS" : "D24",
		"nrPSY_COINS" : "D22",
		"nrPREV_COINS" : "D26",
		"nrER_COINS2" : "H18",
		"nrST_COINS2" : "H24",
		"nrSNF_COPAY2" : "I29",
		"nrST_COPAY2" : "I24",
		"nrPC_COPAY2" : "I20",
		"nrRXFORM_COPAY2" : "I34",
		"nrIMG_COPAY" : "E23",
		"nrPREV_COPAY" : "E26",
		"nrRXNONFORM_COPAY" : "E35",
		"nrRXGEN_COPAY" : "E33",
		"nrRXSPCLTY_COPAY2" : "I36",
		"nrHSA_RANGE" : "C4:E5",
		"nrRXGEN_COINS" : "D33",
		"nrRXSPCLTY_COINS" : "D36",
		"nrSP_COPAY2" : "I21",
		"nrXRAY_COPAY" : "E28",
		"nrPSY_COPAY2" : "I22",
		"nrMOOP_MED2" : "F13",
		"nrMULTITIER_UTIL_RANGE" : "F4:H5",
		"nrGENCOINS2" : "H11",
		"nrGENCOINS" : "D11",
		"nrMOOP_COMBINED2" : "H12",
		"nrMOOP_COMBINED_SEP_DED2" : "F12",
		"nrGENCOINS_RX" : "C11",
		"nrOPFAC_COPAY" : "E30",
		"nrSNF_COPAY" : "E29",
		"nrMOOP_MED" : "B13",
		"nrMOOP_RX" : "C13",
		"nrER_COPAY" : "E18",
		"nrPC_COPAY" : "E20",
		"nrRXNONFORM_COPAY2" : "I35",
		"nrOPPROF_COINS2" : "H31",
		"nrAVCALCULATOR_AREA" : "A1:L53",
		"nrVERSION" : "E41",
		"nrXRAY_COINS" : "D28",
		"nrSNF_COINS" : "D29",
		"nrRXSPCLTY_COPAY" : "E36",
		"nrRXFORM_COPAY" : "E34",
		"nrDEDUCT_MED" : "B10",
		"nrMOOP_COMBINED_SEP_DED" : "B12",
		"nrDESIRED_MTIER" : "D2"
	}
}

function get2DAddrFromA1Notation(a1name) {
	var colNameMap = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	var colName = a1name.match(/[A-Z]/g);
	var row = a1name.match(/\d+/g);
    var col=0;
    if (colName.length > 1) {
      col = (colNameMap.indexOf(colName[0])+1)*26;
      for (var i=1; i<colName.length; i++) {
        col = col+colNameMap.indexOf(colName[i]);
      }
    }else{
      //ARVConsole(colName[0]);
        col = colNameMap.indexOf(colName[0]);
    }
	var DimAddr = [Number(row[0]), col];
  return DimAddr;
}

function initCheckBoxes() {
  checkBox2A1Not = {};
  checkBox2A1Not.Checkbox_Int ="B2";
  checkBox2A1Not.ip_per_diem = "B3";
  checkBox2A1Not.snf_per_diem = "B4";
  checkBox2A1Not.Checkbox_Sep = "B5";
  checkBox2A1Not.csr_ind = "B6";
  checkBox2A1Not.Dropdown_tier = "B7";
  checkBox2A1Not.specrx_coins_max = "B38";
  checkBox2A1Not.ip_copay_limit = "B40";
  checkBox2A1Not.ofv_limit = "B42";
  checkBox2A1Not.ofv_copay_limit = "B44";
  checkBox2A1Not.hsa = "E3";
  checkBox2A1Not.MULTITIER_PLAN = "H3";
  
  
  var cbox_category = {"ded":["B", "F"], "coins":["C","G"], "omit":["K","L"]};  
  var cbox_details =  [
                        {"med_all" : "17"},
                        {"ER" : "18"},
                        {"IP" : "19"},
                        {"PC" : "20"},
                        {"SP" : "21"},
                        {"PSY" : "22"},
                        {"IMG" : "23"},
                        {"ST" : "24"},
                        {"OT" : "25"},
                        {"Prev" : "26"},
                        {"Lab" : "27"},
                        {"Xray" : "28"},
                        {"SNF" : "29"},
                        {"Opfac" : "30"},
                        {"Opprof" : "31"},
                        {"rx_all" : "32"},
                        {"RxGen" : "33"},
                        {"RxForm" : "34"},
                        {"RxNonForm" : "35"},
                        {"RxSpclty" : "36"}
                      ];
	for (var i=0; i<Object.keys(cbox_details).length; i++) {
	      // Deductible Checkboxes
	      //ARVConsole("Keys="+Object.keys(cbox_details[i]));
	      //ARVConsole("Values="+cbox_details[i][Object.keys(cbox_details[i])]);
	      checkBox2A1Not["ded_"+ Object.keys(cbox_details[i])]= cbox_category.ded[0]+cbox_details[i][Object.keys(cbox_details[i])];
	      checkBox2A1Not["ded_"+ Object.keys(cbox_details[i])+"2"]= cbox_category.ded[1]+cbox_details[i][Object.keys(cbox_details[i])];
	      // Co-insurance Checkboxes
	      checkBox2A1Not["coins_"+ Object.keys(cbox_details[i])]= cbox_category.coins[0]+cbox_details[i][Object.keys(cbox_details[i])];
	      checkBox2A1Not["coins_"+ Object.keys(cbox_details[i])+"2"]= cbox_category.coins[1]+cbox_details[i][Object.keys(cbox_details[i])];
	      //Omit Checkboxes
	      checkBox2A1Not["omit_"+ Object.keys(cbox_details[i])]= cbox_category.omit[0]+cbox_details[i][Object.keys(cbox_details[i])];
	      checkBox2A1Not["omit_"+ Object.keys(cbox_details[i])+"2"]= cbox_category.omit[1]+cbox_details[i][Object.keys(cbox_details[i])];
	}
}

function ARVConsole(arg) {
	if (debug) {
		ARVConsole(arg);
	}
}

function AVCRound(value, decimals) {
	value = value?value:0;
	var rounded = Number(Math.round(value + 'e'+decimals) + 'e-' + decimals).toFixed(decimals);
	return Number(rounded);	
}