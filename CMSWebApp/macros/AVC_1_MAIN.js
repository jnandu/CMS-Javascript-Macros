/**
 * Sub StartButton_Click
 * return {void}
 */
function StartButton_Click () {
	//Initialize timekeeping var;
	//time_start = Timer();
	var time_paused = 0;
	var time_end = 0;
	initialize_values();
	MAINLOOP();
	//output status message;
	AVCalcTab.Range("nrSTATUS").Value = gSTATUS_MSG;
	AVCalcTab.Range("nrNotesMsg").Value = gNOTE_MSG;
	//create image of AV Calculator output;
	if(gERROR_FLAG == 0 ){
		//Create_Image (gDISABLE_IMAGE);
	}
	FinalAVR.gAV = gERROR_FLAG?"":AVCRound(gAV*100, 2);
	FinalAVR.gSTATUS_MSG = gSTATUS_MSG;
	FinalAVR.gNOTE_MSG = gNOTE_MSG;
	FinalAVR.gMTIER_NAME = gMTIER_NAME;
	//clean up variables;
	clean_up();
	//print time elapsed;
	//time_end = Timer;
	//AVCalcTab.Range("nrTIMEKEEP").Value = Round(time_end - time_start - time_paused, 4) & " seconds";
}

/**
 * Sub MAINLOOP
 * return {void}
 */
function MAINLOOP () {
	var AVTier1, AVTier2, i, rerun;
	get_plan_level_data();
	validate_non_tier_specific_inputs();
	for(i=1; i<=2; i++){
		if(gCB_MULTITIER_PLAN == 1 ){
			get_cost_sharing_parameters();
			validate_tier_specific_inputs();
			if(gERROR_FLAG == 1 ){
				return;
			}
			AVTier1 = CalcAV();
			get_cost_sharing_parameters ("2");
			validate_tier_specific_inputs ("2");
			if(gERROR_FLAG == 1 ){
				return;
			}
			AVTier2 = CalcAV("2");
			gAV = gTIER1_UTIL * AVTier1 + gTIER2_UTIL * AVTier2;
		}else{
			get_cost_sharing_parameters();
			validate_tier_specific_inputs();
			if(gERROR_FLAG == 1 ){
				return;
			}
			gAV = CalcAV();
		}
		//Adjust AV value for HSA funds;
		if(gCB_HSA_IND == 1 ){
			gAV = HSA_ADJUSTMENT(gAV);
		}
		gAV = Math.min(gAV, 1);
      ARVConsole("Before gAV="+gAV);
		//process implications of final AV;
		process_av();
		//output AV info;
        ARVConsole("After gAV="+gAV);
		AVCalcTab.Range("nrAVRESULT").Value = gAV;
		AVCalcTab.Range("nrMETAL_DETERMINATION").Value = gMTIER_NAME;
		if(gACTUAL_MTIER_NUM == gDESIRED_MTIER_NUM || gACTUAL_MTIER_NUM <= 0 || gCB_CSR_IND == 1 ){
			break;
		}else if (i == 1 && gACTUAL_MTIER_NUM > 0) {
			//time_paused = Timer;
			rerun = MsgBox("Tier [" + gMTIER_NAME + "] does not match desired metal tier [" + gDESIRED_MTIER_NAME + "]. Do you want to recalculate using the proper metal tier continuance tables?");
			//time_paused = Timer - time_paused;
			if(rerun == 1 ){
				gDESIRED_MTIER_NUM = gACTUAL_MTIER_NUM;
				gDESIRED_MTIER_NAME = gMTIER_NAME;
				HelperTab.Range("Combined").Value = gACTUAL_MTIER_NUM;
			}else{
				break;
			}
		}
	}
}