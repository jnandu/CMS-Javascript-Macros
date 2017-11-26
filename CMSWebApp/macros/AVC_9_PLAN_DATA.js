/**
 * Sub get_plan_level_data
 * return {void}
 */
function get_plan_level_data () {
	gDESIRED_MTIER_NUM = HelperTab.Range("nrDESIRED_MTIER").Value;
	if(gDESIRED_MTIER_NUM == 1 ){
		gDESIRED_MTIER_NAME = "Platinum";
	}else if (gDESIRED_MTIER_NUM == 2) {
		gDESIRED_MTIER_NAME = "Gold";
	}else if (gDESIRED_MTIER_NUM == 3) {
		gDESIRED_MTIER_NAME = "Silver";
	}else if (gDESIRED_MTIER_NUM == 4) {
        gDESIRED_MTIER_NAME = "Bronze";
	}
	//user options;
	gCB_INT_DEDUCT_IND = AVCalcTab.CheckBoxes("Checkbox_Int").Value;
	gCB_IPFREQTYPE_IND = AVCalcTab.CheckBoxes("ip_per_diem").Value;
	gCB_SNFFREQTYPE_IND = AVCalcTab.CheckBoxes("snf_per_diem").Value;
	gCB_SEP_MOOP_IND = AVCalcTab.CheckBoxes("Checkbox_Sep").Value;
	gCB_CSR_IND = AVCalcTab.CheckBoxes("csr_ind").Value;
	gDESIRED_MTIER_NUM = AVCalcTab.DropDowns("Dropdown_tier").Value;
	//additional benefit design options;
	gCB_SPECRX_LIMIT_IND = AVCalcTab.CheckBoxes("specrx_coins_max").Value;
	gSPECRXCoinsMax = AVCalcTab.Range("nrSPECRX_COINS_MAX").Value;
	gCB_IP_COPAY_LMT_IND = AVCalcTab.CheckBoxes("ip_copay_limit").Value;
	gIPDAYSMAX = AVCalcTab.Range("nrIP_COPAY_LIMIT").Value;
	gCB_OFV_LIMIT_IND = AVCalcTab.CheckBoxes("ofv_limit").Value;
	gPCNVisits = AVCalcTab.Range("nrOFV_LIMIT").Value;
	gCB_OFV_COPAY_LMT_IND = AVCalcTab.CheckBoxes("ofv_copay_limit").Value;
	gPCNVisitsCopays = AVCalcTab.Range("nrOFV_COPAY_LIMIT").Value;
	//top of form options;
	gCB_HSA_IND = AVCalcTab.CheckBoxes("hsa").Value;
	gHSA_CONTRBTN = AVCalcTab.Range("nrHSA_CNTRBTN").Value;
	gCB_MULTITIER_PLAN = AVCalcTab.CheckBoxes("MULTITIER_PLAN").Value;
	gTIER1_UTIL = AVCalcTab.Range("nrTIER1_UTIL").Value;
	gTIER2_UTIL = AVCalcTab.Range("nrTIER2_UTIL").Value;
}

/**
 * Sub get_cost_sharing_parameters
 * @param {string} [optVTIERNUM=]
 * return {void}
 */
function get_cost_sharing_parameters (optVTIERNUM) {
    var vTIERNUM = (typeof optVTIERNUM == 'undefined' ? "" : optVTIERNUM );

	var COINS_MED, COINS_RX, nvar, kvar;
	//cost sharing parameters;
	gDEDUCT = AVCalcTab.Range("nrDEDUCT" + vTIERNUM).Value;
	gDEDUCT_MED = AVCalcTab.Range("nrDEDUCT_MED" + vTIERNUM).Value;
	gDEDUCT_RX = AVCalcTab.Range("nrDEDUCT_RX" + vTIERNUM).Value;
	gGENCOINS = AVCalcTab.Range("nrGENCOINS" + vTIERNUM).Value;
	gGENCOINS_MED = AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value;
	gGENCOINS_RX = AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value;
	gMOOP = AVCalcTab.Range("nrMOOP_COMBINED" + vTIERNUM).Value;
	gMOOP_COMBINED_SEP_DED = AVCalcTab.Range("nrMOOP_COMBINED_SEP_DED" + vTIERNUM).Value;
	gMOOP_MED = AVCalcTab.Range("nrMOOP_MED" + vTIERNUM).Value;
	gMOOP_RX = AVCalcTab.Range("nrMOOP_RX" + vTIERNUM).Value;
	//blank coinsurance values defaulted to general coinsurance rate.;
	if(gCB_INT_DEDUCT_IND == 1 ){
		COINS_MED = gGENCOINS;
		COINS_RX = gGENCOINS;
	}else{
		COINS_MED = gGENCOINS_MED;
		COINS_RX = gGENCOINS_RX;
	}
	if(!(AVCalcTab.Range("nrER_COINS" + vTIERNUM).Value) ){
		gER_COINS = COINS_MED; 
	}else {
		gER_COINS = AVCalcTab.Range("nrER_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrIP_COINS" + vTIERNUM).Value) ){
		gIP_COINS = COINS_MED ;
	}else {
		gIP_COINS = AVCalcTab.Range("nrIP_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrPC_COINS" + vTIERNUM).Value) ){
		gPC_COINS = COINS_MED ;
	}else { 
		gPC_COINS = AVCalcTab.Range("nrPC_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrSP_COINS" + vTIERNUM).Value) ){
		gSP_COINS = COINS_MED ;
	}else {
		gSP_COINS = AVCalcTab.Range("nrSP_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrPSY_COINS" + vTIERNUM).Value) ){
		gPSY_COINS = COINS_MED ;
	}else {
		gPSY_COINS = AVCalcTab.Range("nrPSY_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrIMG_COINS" + vTIERNUM).Value) ){
		gIMG_COINS = COINS_MED ;
	}else {
		gIMG_COINS = AVCalcTab.Range("nrIMG_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrST_COINS" + vTIERNUM).Value) ){
		gST_COINS = COINS_MED ;
	}else {
		gST_COINS = AVCalcTab.Range("nrST_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrOT_COINS" + vTIERNUM).Value) ){
		gOT_COINS = COINS_MED ;
	}else {
		gOT_COINS = AVCalcTab.Range("nrOT_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrPREV_COINS" + vTIERNUM).Value) ){
		gPREV_COINS = COINS_MED; 
	}else {
		gPREV_COINS = AVCalcTab.Range("nrPREV_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrLAB_COINS" + vTIERNUM).Value) ){
		gLAB_COINS = COINS_MED ;
	}else {
		gLAB_COINS = AVCalcTab.Range("nrLAB_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrXRAY_COINS" + vTIERNUM).Value) ){
		gXRAY_COINS = COINS_MED ;
	}else {
		gXRAY_COINS = AVCalcTab.Range("nrXRAY_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrSNF_COINS" + vTIERNUM).Value) ){
		gSNF_COINS = COINS_MED ;
	}else {		
		gSNF_COINS = AVCalcTab.Range("nrSNF_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrOPFAC_COINS" + vTIERNUM).Value) ){
		gOPFAC_COINS = COINS_MED; 
	}else {
		 gOPFAC_COINS = AVCalcTab.Range("nrOPFAC_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrOPPROF_COINS" + vTIERNUM).Value) ){
		gOPPROF_COINS = COINS_MED; 
	}else {
		gOPPROF_COINS = AVCalcTab.Range("nrOPPROF_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrRXGEN_COINS" + vTIERNUM).Value) ){
		gRXGEN_COINS = COINS_RX ;
	}else {
		gRXGEN_COINS = AVCalcTab.Range("nrRXGEN_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrRXFORM_COINS" + vTIERNUM).Value) ){
		gRXFORM_COINS = COINS_RX ;
	}else {
		gRXFORM_COINS = AVCalcTab.Range("nrRXFORM_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrRXNONFORM_COINS" + vTIERNUM).Value) ){
		gRXNONFORM_COINS = COINS_RX; 
	}else {
		gRXNONFORM_COINS = AVCalcTab.Range("nrRXNONFORM_COINS" + vTIERNUM).Value;
	}
	if(!(AVCalcTab.Range("nrRXSPCLTY_COINS" + vTIERNUM).Value) ){
		gRXSPCLTY_COINS = COINS_RX ;
	}else {
		gRXSPCLTY_COINS = AVCalcTab.Range("nrRXSPCLTY_COINS" + vTIERNUM).Value;
	}
	//note: blank copays are defaulted to zero implicitly;
	gER_COPAY = AVCalcTab.Range("nrER_COPAY" + vTIERNUM).Value;
	gIP_COPAY = AVCalcTab.Range("nrIP_COPAY" + vTIERNUM).Value;
	gPC_COPAY = AVCalcTab.Range("nrPC_COPAY" + vTIERNUM).Value;
	gSP_COPAY = AVCalcTab.Range("nrSP_COPAY" + vTIERNUM).Value;
	gPSY_COPAY = AVCalcTab.Range("nrPSY_COPAY" + vTIERNUM).Value;
	gIMG_COPAY = AVCalcTab.Range("nrIMG_COPAY" + vTIERNUM).Value;
	gST_COPAY = AVCalcTab.Range("nrST_COPAY" + vTIERNUM).Value;
	gOT_COPAY = AVCalcTab.Range("nrOT_COPAY" + vTIERNUM).Value;
	gPREV_COPAY = AVCalcTab.Range("nrPREV_COPAY" + vTIERNUM).Value;
	gLAB_COPAY = AVCalcTab.Range("nrLAB_COPAY" + vTIERNUM).Value;
	gXRAY_COPAY = AVCalcTab.Range("nrLAB_COPAY" + vTIERNUM).Value;
	gSNF_COPAY = AVCalcTab.Range("nrSNF_COPAY" + vTIERNUM).Value;
	gOPFAC_COPAY = AVCalcTab.Range("nrOPFAC_COPAY" + vTIERNUM).Value;
	gOPPROF_COPAY = AVCalcTab.Range("nrOPPROF_COPAY" + vTIERNUM).Value;
	gRXGEN_COPAY = AVCalcTab.Range("nrRXGEN_COPAY" + vTIERNUM).Value;
	gRXFORM_COPAY = AVCalcTab.Range("nrRXFORM_COPAY" + vTIERNUM).Value;
	gRXNONFORM_COPAY = AVCalcTab.Range("nrRXNONFORM_COPAY" + vTIERNUM).Value;
	gRXSPCLTY_COPAY = AVCalcTab.Range("nrRXSPCLTY_COPAY" + vTIERNUM).Value;
    
    ARVConsole("UBound(gMedical_Arr="+UBound(gMedical_Arr));
    ARVConsole("UBound(gRx_Arr="+UBound(gRx_Arr));
	for(nvar=LBound(gMedical_Arr); nvar<UBound(gMedical_Arr); nvar++){
		gSTDED_ARR[nvar] = AVCalcTab.CheckBoxes("ded_" + gMedical_Arr[nvar] + vTIERNUM).Value;
		gSTCOINS_ARR[nvar] = AVCalcTab.CheckBoxes("coins_" + gMedical_Arr[nvar] + vTIERNUM).Value;
        ARVConsole("gSTCOINS_ARR[nvar]="+gSTCOINS_ARR[nvar]);
		if(gMedical_Arr[nvar] == "prev" ){
			gOMIT_ARR[nvar] = 0;
		}else{
			gOMIT_ARR[nvar] = AVCalcTab.CheckBoxes("omit_" + gMedical_Arr[nvar] + vTIERNUM).Value;
		}
	}
	for(kvar=LBound(gRx_Arr); kvar<UBound(gRx_Arr); kvar++){
		gSTDEDRX_ARR[kvar] = AVCalcTab.CheckBoxes("ded_" + gRx_Arr[kvar] + vTIERNUM).Value;
		gSTCOINSRX_ARR[kvar] = AVCalcTab.CheckBoxes("coins_" + gRx_Arr[kvar] + vTIERNUM).Value;
		gOMITRX_ARR[kvar] = AVCalcTab.CheckBoxes("omit_" + gRx_Arr[kvar] + vTIERNUM).Value;
	}
}	