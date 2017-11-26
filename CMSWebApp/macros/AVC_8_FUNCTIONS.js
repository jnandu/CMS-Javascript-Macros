/**
 * Function getContTableRow
 * @param {*} vRngArr
 * @param {number} vAMT
 * return {CContTableRow}
 */
function getContTableRow (vRngArr,vAMT) {
		var i, MaxH, contTableRow;
		contTableRow = new CContTableRow();
		contTableRow.ROW = -1;
		contTableRow.ppt = 0;
		MaxH = vRngArr.getRowCount();
        //ARVConsole("MaxH RowCount="+MaxH+"vAMT="+vAMT);
		for(i=4; i<=MaxH; i++){
            //ARVConsole("vRngArr.getValue(i, 0)="+vRngArr.getValue(i, 0));
			if(vAMT == vRngArr.getValue(i, 0) || i == MaxH ){                
				contTableRow.ROW = i;
				contTableRow.ppt = 0;
                ARVConsole("contTableRow.ROW="+contTableRow.getRow());
				break;
			}else if (vAMT < vRngArr.getValue(i, 0)) {
				contTableRow.ROW = i - 1;
				contTableRow.ppt = (vAMT - vRngArr.getValue(i - 1, 0)) / (vRngArr.getValue(i, 0) - vRngArr.getValue(i - 1, 0));
                //ARVConsole("contTableRow.ROW="+contTableRow.getRow());
                //ARVConsole("contTableRow.ppt="+contTableRow.getPpt());
				break;
			}
		}
        //ARVConsole("contTableRow.ROW="+contTableRow.getRow());
		return contTableRow;
}

/**
 * Function computeRowVal
 * @param {Range} vRNG
 * @param {CContTableRow} contTableRow
 * return {number}
 */
function computeRowVal (vRNG,contTableRow) {
	var returnValue, rowLow, ppt;
	rowLow = contTableRow.getRow();
	ppt = contTableRow.getPpt();
  //ARVConsole("rowLow="+rowLow+"ppt="+ppt);
	if(ppt == 0 ){
      
		returnValue = vRNG.getValue(rowLow, 0);
	}else{
		returnValue = vRNG.getValue(rowLow, 0) + ppt * (vRNG.getValue(rowLow + 1, 0) - vRNG.getValue(rowLow, 0));
	}
	return returnValue;
}

/**
 * Function DeductibleAdj
 * @param {number} vCOST
 * @param {number} vFREQ
 * @param {number} vCOPAY
 * @param {number} vSTD
 * return {number}
 */
function DeductibleAdj (vCOST, vFREQ, vCOPAY, vSTD){

	//check if service is subject to deductible (STD);
	if(vSTD == 0 ){
		//service is ! STD - plan pays cost above copay - shift deductible upwards by amount plan pays,;
		//since the enrollee must now spend more to reach deductible.;
		return Math.max(0, vCOST - vFREQ * vCOPAY);
	}else if (vSTD == 1) {
		//service is STD - enrollee pays copay and cost above copay, but copay does ! count towards deductible,;
		//so increase level of spending to reflect addition amount needed to reach deductible.;
		return Math.min(vCOST, vFREQ * vCOPAY);
	}else{
		//raise error if issue with STD flag;
		DebugAssert(false,"ERROR - subject to deductible array");
	}
}

/**
 * Function EffCoinsNum
 * @param {number} vCOST
 * @param {number} vFREQ
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * @param {number} vSTC
 * return {number}
 */
function EffCoinsNum (vCOST, vFREQ, vCOPAY, vCOINS, vSTC){
	var EFF_COINS_NUM;
	if(vSTC == 0 ){
		//service is ! STC - use copay to determine effective coinsurance rate;
		EFF_COINS_NUM = Math.max(0, vCOST - vFREQ * vCOPAY);
	}else if (vSTC == 1){
		//service is STC - use service coinsurance to determine effective coinsurance rate;
		EFF_COINS_NUM = vCOST * vCOINS;
	}else{
		//raise error if issue with stcoins_array;
		DebugAssert(false, "ERROR - subject to deductible array");
	}
	return EFF_COINS_NUM;
}

/**
 * Sub ProcessServiceCostShare
 * @param {CMDist} vTABLE
 * @param {CContTableRow} vDEDROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * @param {number} vITER
 * return {void}
 */
function ProcessServiceCostShare (vTABLE, vDEDROW, vCOPAY, vCOINS, vITER){
	var index_, CAD, STD, STC, cost, freq, AvgCost, AvgFreq;
    ARVConsole("vTABLE.Name"+vTABLE.Name);
	index_ = gMedical_Arr.indexOf(vTABLE.Name);
   ARVConsole("index_"+index_);
	CAD = gOMIT_ARR[index_];
	STD = gSTDED_ARR[index_];
	STC = gSTCOINS_ARR[index_];
	cost = computeRowVal(vTABLE.Rng(1), vDEDROW);
	freq = computeRowVal(vTABLE.Rng(2), vDEDROW);
	if(CAD == 0 ){
		//service is ! STD - plan pays cost above copay;
		if(STD == 0 ){
			gBENEPAY = gBENEPAY + Math.min(cost, freq * vCOPAY);
			gPLAN_PAY = gPLAN_PAY + Math.max(0, cost - freq * vCOPAY);
			gTOT_PAY = gTOT_PAY + cost;
			//service is STD - copays do ! satisfy deductible, but do count towards satisfying MOOP.;
			//Adjust moop to reflect copays enrollee has paid that do ! satisfy deductible.;
		}else if (STD == 1) {
			gBENEPAY = gBENEPAY + Math.max(0, cost - freq * vCOPAY);
			gMOOP_ADJMT = gMOOP_ADJMT + Math.min(cost, freq * vCOPAY);
			gTOT_PAY = gTOT_PAY + cost;
		}
	}else{
	//Copay After Deductible option selected - bene pays full cost below the deductible.;
		gBENEPAY = gBENEPAY + cost;
		gTOT_PAY = gTOT_PAY + cost;
	}
	AvgCost = vTABLE.Rng(1).getValue(gBottomRow, 0);
	AvgFreq = vTABLE.Rng(2).getValue(gBottomRow, 0);
  ARVConsole("AvgCost="+AvgCost);
  ARVConsole("AvgFreq="+AvgFreq);
    ARVConsole("vCOPAY="+vCOPAY);
  ARVConsole("vCOINS="+vCOINS);
  ARVConsole("STC="+STC);
	gEFF_COINS_NUM = gEFF_COINS_NUM + EffCoinsNum(AvgCost, AvgFreq, vCOPAY, vCOINS, STC);
   ARVConsole("gEFF_COINS_NUM="+gEFF_COINS_NUM);

}

/**
 * Sub ProcessServiceCostShareRX
 * @param {CMDist} vTABLE
 * @param {CContTableRow} vDEDROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * @param {number} vITER
 * return {void}
 */
function ProcessServiceCostShareRX (vTABLE, vDEDROW, vCOPAY, vCOINS, vITER){
	var index_, CAD, STD, STC, cost, freq, AvgCost, AvgFreq;
	index_ = gRx_Arr.indexOf(vTABLE.Name);
	CAD = gOMITRX_ARR[index_];
	STD = gSTDEDRX_ARR[index_];
	STC = gSTCOINSRX_ARR[index_];
	cost = computeRowVal(vTABLE.Rng(1), vDEDROW);
	freq = computeRowVal(vTABLE.Rng(2), vDEDROW);
	if(CAD == 0 ){
		//service is ! STD - plan pays cost above copay;
		if(STD == 0 ){
			gBENEPAY = gBENEPAY + Math.min(cost, freq * vCOPAY);
			gPLAN_PAY = gPLAN_PAY + Math.max(0, cost - freq * vCOPAY);
			gTOT_PAY = gTOT_PAY + cost;
			//service is STD - copays do ! satisfy deductible, but do count towards satisfying MOOP.;
			//Adjust moop to reflect copays enrollee has paid that do ! satisfy deductible.;
		}else if (STD == 1) {
			gBENEPAY = gBENEPAY + Math.max(0, cost - freq * vCOPAY);
			gMOOP_ADJMT = gMOOP_ADJMT + Math.min(cost, freq * vCOPAY);
			gTOT_PAY = gTOT_PAY + cost;
		}
	}else{
		//Copay After Deductible option selected - bene pays full cost below the deductible.;
		gBENEPAY = gBENEPAY + cost;
		gTOT_PAY = gTOT_PAY + cost;
	}
	AvgCost = vTABLE.Rng(1).getValue(gBottomRow, 0);
	AvgFreq = vTABLE.Rng(2).getValue(gBottomRow, 0);
	gEFF_COINS_NUM = gEFF_COINS_NUM + EffCoinsNum(AvgCost, AvgFreq, vCOPAY, vCOINS, STC);
}

/**
 * Sub ProcessCostShareCoinsRange
 * @param {CMDist} vTABLE
 * @param {CContTableRow} vDEDROW
 * @param {CContTableRow} vTROOPROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * return {void}
 */
function ProcessCostShareCoinsRange (vTABLE, vDEDROW, vTROOPROW, vCOPAY, vCOINS){
	var index_, STC, cost_ded, cost_troop, freq_ded, freq_troop;
	index_ = gMedical_Arr.indexOf(vTABLE.Name);
	STC = gSTCOINS_ARR[index_];
	cost_ded = computeRowVal(vTABLE.Rng(1), vDEDROW);
	freq_ded = computeRowVal(vTABLE.Rng(2), vDEDROW);
	cost_troop = computeRowVal(vTABLE.Rng(1), vTROOPROW);
	freq_troop = computeRowVal(vTABLE.Rng(2), vTROOPROW);
	if(STC == 0 ){
		gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (Math.min(cost_troop, freq_troop * vCOPAY) - Math.min(cost_ded, freq_ded * vCOPAY));
		gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + (Math.max(0, cost_troop - freq_troop * vCOPAY) - Math.max(0, cost_ded - freq_ded * vCOPAY));
	}else if (STC == 1) {
		gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (cost_troop - cost_ded) * (1 - vCOINS);
		gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + (cost_troop - cost_ded) * vCOINS;
	}
}

/**
 * Sub ProcessCostShareCoinsRangeRX
 * @param {CMDist} vTABLE
 * @param {CContTableRow} vDEDROW
 * @param {CContTableRow} vTROOPROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * return {void}
 */
function ProcessCostShareCoinsRangeRX (vTABLE, vDEDROW, vTROOPROW, vCOPAY, vCOINS){
	var index_, STC, cost_ded, cost_troop, freq_ded, freq_troop, COST_COINS_DED, COST_COINS_TROOP;
	index_ = gRx_Arr.indexOf(vTABLE.Name);
	STC = gSTCOINSRX_ARR[index_];
	cost_ded = computeRowVal(vTABLE.Rng(1), vDEDROW);
	freq_ded = computeRowVal(vTABLE.Rng(2), vDEDROW);
	cost_troop = computeRowVal(vTABLE.Rng(1), vTROOPROW);
	freq_troop = computeRowVal(vTABLE.Rng(2), vTROOPROW);
	if(STC == 0 ){
		gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (Math.min(cost_troop, freq_troop * vCOPAY) - Math.min(cost_ded, freq_ded * vCOPAY));
		gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + (Math.max(0, cost_troop - freq_troop * vCOPAY) - Math.max(0, cost_ded - freq_ded * vCOPAY));
	}else if (STC == 1) {
		if(vTABLE.Name == "ERROR - subject to deductible array" && gCB_SPECRX_LIMIT_IND == 1 ){
			COST_COINS_DED = Math.max(cost_ded * vCOINS, cost_ded - gSPECRXCoinsMax * freq_ded);
			COST_COINS_TROOP = Math.max(cost_troop * vCOINS, cost_troop - gSPECRXCoinsMax * freq_troop);
			gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (cost_troop - COST_COINS_TROOP) - (cost_ded - COST_COINS_DED);
			gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + COST_COINS_TROOP - COST_COINS_DED;
		}else{
			gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (cost_troop - cost_ded) * (1 - vCOINS);
			gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + (cost_troop - cost_ded) * vCOINS;
		}
	}
}

/**
 * Sub ProcessTruncServiceVal
 * @param {CMDist} vTABLE_MAIN
 * @param {CMDist} vTABLE_TRUNC
 * @param {CContTableRow} vDEDROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * @param {number} vITER
 * return {void}
 */
function ProcessTruncServiceVal (vTABLE_MAIN, vTABLE_TRUNC, vDEDROW, vCOPAY, vCOINS, vITER){
	var MAIN_VAL_DEDUCT, MAIN_FREQ_DEDUCT, TRUNC_VAL_DEDUCT, TRUNC_FREQ_DEDUCT, MARG_AVG_DEDUCT, MARG_FREQ_DEDUCT, AvgCost, AvgFreq, STD, STC, index_;
	MAIN_VAL_DEDUCT = computeRowVal(vTABLE_MAIN.Rng(1), vDEDROW);
	MAIN_FREQ_DEDUCT = computeRowVal(vTABLE_MAIN.Rng(2), vDEDROW);
	TRUNC_VAL_DEDUCT = computeRowVal(vTABLE_TRUNC.Rng(1), vDEDROW);
	TRUNC_FREQ_DEDUCT = computeRowVal(vTABLE_TRUNC.Rng(2), vDEDROW);
	MARG_AVG_DEDUCT = MAIN_VAL_DEDUCT - TRUNC_VAL_DEDUCT;
	MARG_FREQ_DEDUCT = MAIN_FREQ_DEDUCT - TRUNC_FREQ_DEDUCT;
	index_ = gMedical_Arr.indexOf(vTABLE_MAIN.Name);
	STC = gSTCOINS_ARR[index_];
	//service is ! STD - plan pays cost above copay;
	gBENEPAY = gBENEPAY + Math.min(MARG_AVG_DEDUCT, MARG_FREQ_DEDUCT * vCOPAY);
	gPLAN_PAY = gPLAN_PAY + Math.max(0, MARG_AVG_DEDUCT - MARG_FREQ_DEDUCT * vCOPAY);
	gTOT_PAY = gTOT_PAY + MARG_AVG_DEDUCT;
	AvgCost = vTABLE_MAIN.Rng(1).getValue(gBottomRow, 0) - vTABLE_TRUNC.Rng(1).getValue(gBottomRow, 0);
	AvgFreq = vTABLE_MAIN.Rng(2).getValue(gBottomRow, 0) - vTABLE_TRUNC.Rng(2).getValue(gBottomRow, 0);
	gEFF_COINS_NUM = gEFF_COINS_NUM + EffCoinsNum(AvgCost, AvgFreq, vCOPAY, vCOINS, STC);
}

/**
 * Sub ProcessTruncServiceCoinsRange
 * @param {CMDist} vTABLE_MAIN
 * @param {CMDist} vTABLE_TRUNC
 * @param {CContTableRow} vDEDROW
 * @param {CContTableRow} vTROOPROW
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * return {void}
 */
function ProcessTruncServiceCoinsRange (vTABLE_MAIN, vTABLE_TRUNC, vDEDROW, vTROOPROW, vCOPAY, vCOINS){
	var MAIN_VAL_DEDUCT, TRUNC_VAL_DEDUCT, MARG_VAL_DEDUCT, MAIN_VAL_TROOP, TRUNC_VAL_TROOP, MARG_VAL_TROOP, MAIN_FREQ_DEDUCT, TRUNC_FREQ_DEDUCT, MARG_FREQ_DEDUCT, MAIN_FREQ_TROOP, TRUNC_FREQ_TROOP, MARG_FREQ_TROOP;
	MAIN_VAL_DEDUCT = computeRowVal(vTABLE_MAIN.Rng(1), vDEDROW);
	MAIN_FREQ_DEDUCT = computeRowVal(vTABLE_MAIN.Rng(2), vDEDROW);
	TRUNC_VAL_DEDUCT = computeRowVal(vTABLE_TRUNC.Rng(1), vDEDROW);
	TRUNC_FREQ_DEDUCT = computeRowVal(vTABLE_TRUNC.Rng(2), vDEDROW);
	MARG_VAL_DEDUCT = MAIN_VAL_DEDUCT - TRUNC_VAL_DEDUCT;
	MARG_FREQ_DEDUCT = MAIN_FREQ_DEDUCT - TRUNC_FREQ_DEDUCT;
	MAIN_VAL_TROOP = computeRowVal(vTABLE_MAIN.Rng(1), vTROOPROW);
	MAIN_FREQ_TROOP = computeRowVal(vTABLE_MAIN.Rng(2), vTROOPROW);
	TRUNC_VAL_TROOP = computeRowVal(vTABLE_TRUNC.Rng(1), vTROOPROW);
	TRUNC_FREQ_TROOP = computeRowVal(vTABLE_TRUNC.Rng(2), vTROOPROW);
	MARG_VAL_TROOP = MAIN_VAL_TROOP - TRUNC_VAL_TROOP;
	MARG_FREQ_TROOP = MAIN_FREQ_TROOP - TRUNC_FREQ_TROOP;
	gBENEPAY_COINSRNG = gBENEPAY_COINSRNG + (Math.min(MARG_VAL_TROOP, MARG_FREQ_TROOP * vCOPAY) - Math.min(MARG_VAL_DEDUCT, MARG_FREQ_DEDUCT * vCOPAY));
	gPLAN_PAY_COINSRNG = gPLAN_PAY_COINSRNG + (Math.max(0, MARG_VAL_TROOP - MARG_FREQ_TROOP * vCOPAY) - Math.max(0, MARG_VAL_DEDUCT - MARG_FREQ_DEDUCT * vCOPAY));
}

/**
 * Function ChkSpclCS
 * @param {string} vCAT
 * @param {number} vCOPAY
 * @param {number} vCOINS
 * return {number}
 */
function ChkSpclCS (vCAT, vCOPAY, vCOINS){
	var index_, SCS, STD, STC, GENCOINS;
	if(gCB_INT_DEDUCT_IND ){
		GENCOINS = gGENCOINS 
	} else { 
		GENCOINS = gGENCOINS_MED;
	}
	index_ = gMedical_Arr.indexOf(vCAT);
	STD = gSTDED_ARR[index_];
	STC = gSTCOINS_ARR[index_];
    ARVConsole("STD="+STD+" STC="+STC);
	if(!(STD == 1 && STC == 1 && vCOPAY == 0 && vCOINS == GENCOINS) ){
		SCS = 1 
	}else { 
		SCS = 0;
	}
	return SCS;
}

/**
 * Function ProcessCostShare_PCXRAY_NVisits
 * @param {CMDist} vTABLE
 * @param {CContTableRow} vDEDROW
 * @param {number} vCOPAY_NVISITS
 * @param {number} vCOPAY_COINS_RNG
 * @param {number} vCOINS
 * @param {number} vITER
 * return {*}
 */
function ProcessCostShare_PCXRAY_NVisits (vTABLE, vDEDROW, vCOPAY_NVISITS, vCOPAY_COINS_RNG, vCOINS, vITER){
	var index_, STD, STC, cost, freq, AvgCost, AvgFreq;
	//This function is to be used for the PC X-ray cost-sharing component in the deductible range when either "ERROR - subject to deductible array";
	//or "ERROR - subject to coinsurance array" options is enabled.;
	index_ = gMedical_Arr.indexOf(vTABLE.Name);
	STC = gSTCOINS_ARR[index_];
	cost = computeRowVal(vTABLE.Rng(1), vDEDROW);
	freq = computeRowVal(vTABLE.Rng(2), vDEDROW);
	//service is ! STD - plan pays cost above copay;
	gBENEPAY = gBENEPAY + Math.min(cost, freq * vCOPAY_NVISITS);
	gPLAN_PAY = gPLAN_PAY + Math.max(0, cost - freq * vCOPAY_NVISITS);
	gTOT_PAY = gTOT_PAY + cost;
	//For effective coinsurance calculation, use copay that appears in coinsurance range!;
	AvgCost = vTABLE.Rng(1).getValue(gBottomRow, 0);
	AvgFreq = vTABLE.Rng(2).getValue(gBottomRow, 0);
	gEFF_COINS_NUM = gEFF_COINS_NUM + EffCoinsNum(AvgCost, AvgFreq, vCOPAY_COINS_RNG, vCOINS, STC);
}
