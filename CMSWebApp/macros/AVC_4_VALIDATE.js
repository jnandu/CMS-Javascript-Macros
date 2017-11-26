function validate_tier_specific_inputs (optVTIERNUM){
	var vTIERNUM = (typeof optVTIERNUM == 'undefined' ? "" : optVTIERNUM );
	var i, j, k, l, m, check_med, check_rx, index_;
	if(gERROR_FLAG == 1 ){
		return;
	}
	if(gCB_INT_DEDUCT_IND == 1 ){
		if(!(AVCalcTab.Range("nrDEDUCT" + vTIERNUM).Value) || !(AVCalcTab.Range("nrGENCOINS" + vTIERNUM).Value)|| !(AVCalcTab.Range("nrMOOP_COMBINED" + vTIERNUM).Value)){
			gSTATUS_MSG = "Error: One or more of deductible, coinsurance, or out of pocket maximum fields is missing.";
			gERROR_FLAG = 1;			return;
		}
		if(AVCalcTab.Range("nrGENCOINS" + vTIERNUM).Value > 1 || AVCalcTab.Range("nrGENCOINS" + vTIERNUM).Value < 0 ){
			gSTATUS_MSG = "Error: The coinsurance rate must be between 0% and 100%.";
			gERROR_FLAG = 1;			return;
		}
		if(AVCalcTab.Range("nrGENCOINS" + vTIERNUM).Value != 1 && AVCalcTab.Range("nrDEDUCT" + vTIERNUM).Value == AVCalcTab.Range("nrMOOP_COMBINED" + vTIERNUM).Value ){
			gSTATUS_MSG = "Error: The coinsurance rate should be set at 100% if the deductible is equal to the MOOP.";
			gERROR_FLAG = 1;			return;
		}
	}else if (gCB_INT_DEDUCT_IND != 1 && gCB_SEP_MOOP_IND == 1) {
		if(!(AVCalcTab.Range("nrDEDUCT_MED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrMOOP_MED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrDEDUCT_RX" + vTIERNUM).Value)  || !(AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value) || !(AVCalcTab.Range("nrMOOP_RX" + vTIERNUM).Value)){
			gSTATUS_MSG = "Error: One or more of deductible, coinsurance, or out of pocket maximum fields is missing.";
			gERROR_FLAG = 1;			return;
		}
		if(AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value > 1 || AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value < 0 || AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value > 1 || AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value < 0 ){
			gSTATUS_MSG = "Error: The coinsurance rate must be between 0% and 100%.";
			gERROR_FLAG = 1;			return;
		}
		if((AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value != 1 && AVCalcTab.Range("nrDEDUCT_MED" + vTIERNUM).Value == AVCalcTab.Range("nrMOOP_MED" + vTIERNUM).Value) || (AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value != 1 && AVCalcTab.Range("nrDEDUCT_RX" + vTIERNUM).Value == AVCalcTab.Range("nrMOOP_RX" + vTIERNUM).Value) ){
			gSTATUS_MSG = "Error: The coinsurance rate should be set at 100% if the deductible is equal to the MOOP.";
			gERROR_FLAG = 1;			return;
		}
	}else if (gCB_INT_DEDUCT_IND != 1 && gCB_SEP_MOOP_IND != 1) {
		if(!(AVCalcTab.Range("nrDEDUCT_MED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrMOOP_COMBINED_SEP_DED" + vTIERNUM).Value) || !(AVCalcTab.Range("nrDEDUCT_RX" + vTIERNUM).Value) || !(AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value) ){
			gSTATUS_MSG = "Error: One or more of deductible, coinsurance, or out of pocket maximum fields is missing.";
			gERROR_FLAG = 1;			return;
		}
		if(AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value > 1 || AVCalcTab.Range("nrGENCOINS_MED" + vTIERNUM).Value < 0  || AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value > 1 || AVCalcTab.Range("nrGENCOINS_RX" + vTIERNUM).Value < 0 ){
			gSTATUS_MSG = "Error: The coinsurance rate must be between 0% and 100%.";
			gERROR_FLAG = 1;			return;
		}
	}
	if(AVCalcTab.CheckBoxes("MULTITIER_PLAN").Value == 1 && ((AVCalcTab.Range("nrTIER1_UTIL").Value + AVCalcTab.Range("nrTIER2_UTIL").Value) != 1 || (!(AVCalcTab.Range("nrTIER1_UTIL").Value) || !(AVCalcTab.Range("nrTIER2_UTIL").Value))) ){
		gSTATUS_MSG = "Error: Tier utilizations must sum to 100%";
		gERROR_FLAG = 1;		return;
	}
	if(gCB_INT_DEDUCT_IND == 1 ){
		if(gDEDUCT > gMOOP ){
		gSTATUS_MSG = "Error: Deductible value is higher than maximum out of pocket value.";
		gERROR_FLAG = 1;		return;
		}
		if(gMOOP > gMOOPMAX ){
		gSTATUS_MSG = "Error: The maximum out of pocket value must be less than or equal to $" + gMOOPMAX + " and greater than $0.";
		gERROR_FLAG = 1;		return;
		}
		}else if (gCB_INT_DEDUCT_IND != 1 && gCB_SEP_MOOP_IND != 1) {
		if(gDEDUCT_MED > gMOOP_COMBINED_SEP_DED || gDEDUCT_RX > gMOOP_COMBINED_SEP_DED ){
			gSTATUS_MSG = "Error: Deductible value is higher than maximum out of pocket value.";
			gERROR_FLAG = 1;			return;
		}
		if(gMOOP_COMBINED_SEP_DED > gMOOPMAX || gMOOP_COMBINED_SEP_DED <= 0 ){
			gSTATUS_MSG = "Error: The maximum out of pocket value must be less than or equal to $" + gMOOPMAX + " and greater than $0.";
			gERROR_FLAG = 1;			return;
		}
	}else if (gCB_INT_DEDUCT_IND != 1 && gCB_SEP_MOOP_IND == 1) {
		if(gDEDUCT_MED > gMOOP_MED || gDEDUCT_RX > gMOOP_RX ){
			gSTATUS_MSG = "Error: Deductible value is higher than maximum out of pocket value.";
			gERROR_FLAG = 1;			return;
		}
		if(gMOOP_MED + gMOOP_RX > gMOOPMAX || gMOOP_MED + gMOOP_RX <= 0 ){
			gSTATUS_MSG = "Error: The maximum out of pocket value must be less than or equal to $" + gMOOPMAX + " and greater than $0.";
			gERROR_FLAG = 1;			return;
		}
	}
	for(i=LBound(gRxSvcCopayNR_Arr); i<UBound(gRxSvcCopayNR_Arr); i++){
		if ((AVCalcTab.Range(gRxSvcCopayNR_Arr[i]).Value)  && (AVCalcTab.Range(gRxSvcCoinsNR_Arr[i]).Value)) {
		    gSTATUS_MSG = "Error: You may not specify a separate Rx copay and different Rx coinsurance simultaneously for a given Rx benefit.";
		    gERROR_FLAG = 1;		    return;
		}
	}
	for(j=LBound(gOMIT_ARR); j<UBound(gOMIT_ARR); j++){
		if (gOMIT_ARR[j] == 1 && (gSTDED_ARR[j] != 1 || gSTCOINS_ARR[j] == 1)) {
		    gSTATUS_MSG = "Error: For services where the copay applies only after the deductible, 'Subject to Deductible?' should be selected and 'Subject to Coinsurance' unselected."
		    gERROR_FLAG = 1;			return;
		}
	}
	for(k=LBound(gOMITRX_ARR); k<UBound(gOMITRX_ARR); k++){
		if (gOMITRX_ARR[k] == 1 && (gSTDEDRX_ARR[k] != 1 || gSTCOINSRX_ARR[k] == 1)) {
		    gSTATUS_MSG = "Error: For services where the copay applies only after the deductible, 'Subject to Deductible?' should be selected and 'Subject to Coinsurance' unselected."
		    gERROR_FLAG = 1;			return;
		}
	}
	check_med = 0;
	check_rx = 0;
	for(l=LBound(gSTDED_ARR); l<UBound(gSTDED_ARR); l++){
		if(gSTDED_ARR[l] == 1 ){
			check_med = 1;
		}
	}
	for(m=LBound(gSTDEDRX_ARR); m<UBound(gSTDEDRX_ARR); m++){
		if(gSTDEDRX_ARR[m] == 1 ){
			check_rx = 1;
		}
	}
	if(gCB_INT_DEDUCT_IND == 1 ){
		if(check_med + check_rx == 0 && gDEDUCT != 0 ){
			gSTATUS_MSG = "Error: Deductible must be zero if no benefits are subject to the deductible."
			gERROR_FLAG = 1;			return;
		}
	}else{
		if(check_med == 0 && gDEDUCT_MED != 0 ){
			gSTATUS_MSG = "Error: Medical deductible must be zero if no medical benefits are subject to the deductible."
			gERROR_FLAG = 1;			return;
		}
		if(check_rx == 0 && gDEDUCT_RX != 0 ){
			gSTATUS_MSG = "Error: Drug deductible must be zero if no prescription drug benefits are subject to the deductible."
			gERROR_FLAG = 1;			return;
		}
	}
	index_ = gMedical_Arr.indexOf("PC");
	if (AVCalcTab.CheckBoxes("ofv_copay_limit").Value == 1 && gSTDED_ARR[index_] != 1) {
		gSTATUS_MSG = "Error: Begin Primary Care Deductible/Coinsurance After a Set Number of Copays? has been specified without subjecting primary care to the deductible."
		gERROR_FLAG = 1;		return;
	}
	return;
}

function validate_non_tier_specific_inputs() {
	if(gERROR_FLAG == 1 ){
		return;
	}
    if (AVCalcTab.CheckBoxes("specrx_coins_max").Value == 1 && !(AVCalcTab.Range("nrSPECRX_COINS_MAX").Value)) {
	gSTATUS_MSG = "Error: You must input a maximum dollar amount for Specialty Rx Coinsurance."
	gERROR_FLAG = 1;	return;
    }
    
    if (AVCalcTab.CheckBoxes("ip_copay_limit").Value == 1 && !(AVCalcTab.Range("nrIP_COPAY_LIMIT").Value)) {
	gSTATUS_MSG = "Error: You must enter a number of days for the IP Copay Limit."
	gERROR_FLAG = 1;	return;
    }
    
    if (AVCalcTab.CheckBoxes("ofv_limit").Value == 1 && !(AVCalcTab.Range("nrOFV_LIMIT").Value)) {
	gSTATUS_MSG = "Error: You must enter a number of visits for the Primary Care cost-sharing exemption."
	gERROR_FLAG = 1;	return;
    }
    
    if (AVCalcTab.CheckBoxes("ofv_copay_limit").Value == 1 && !(AVCalcTab.Range("nrOFV_COPAY_LIMIT").Value)) {
	gSTATUS_MSG = "Error: You must enter a number of visits for the Primary Care copay to apply to."
	gERROR_FLAG = 1;	return;
    }
    
    if (AVCalcTab.CheckBoxes("ofv_limit").Value == 1 && AVCalcTab.CheckBoxes("ofv_copay_limit").Value == 1){
	gSTATUS_MSG = "Error: You may not simulatenously exempt first Primary Care Visits from cost-sharing as well as requiring copays for the first Primary Care Visits."
	gERROR_FLAG = 1;	return;
    }
    
    if (AVCalcTab.CheckBoxes("ip_copay_limit").Value == 1 && AVCalcTab.CheckBoxes("ip_per_diem").Value != 1) {
	gSTATUS_MSG = "Error: The option to limit the number of days for inpatient copays has been selected while option to apply inpatient copays by day has not been selected."
	gERROR_FLAG = 1;	return;
    }
    return;
}