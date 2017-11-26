/**
 * Sub SepMacro_v2
 * return {void}
 */
function SepMacro_v2 () {
	//\\\\\;
	//This part of the algorithm is done completely on the separate medical && rx tables and is exactly the same;
	//as the deductible range calculations of the plans that use a separate deductible && combined MOOP.;
	SepDeductCombinedMOOP_v2();
	//\\\\\;
	//True MOOP Calculation - allowed spending required for enrollee to reach his || her MOOP;
	//\\\\\;
	//MED Table;
	gEFF_COINS_MED = Math.min(gEFF_COINS_NUM_MED / gEFF_COINS_DENOM_MED, 1);
	if(gEFF_COINS_MED < 0 || gEFF_COINS_MED > 1 ){
		DebugAssert(false, "ERROR - MED Effective Coinsurance OOB");
	}
	gADJ_MOOP_MED = gMOOP_MED - gMOOP_ADJMT_MED;
	if(gADJ_MOOP_MED < gDEDUCT_MED ){
		gADJ_MOOP_MED = gDEDUCT_MED;
	}
	if(gEFF_COINS_MED == 1 ){
		gTROOP_MED = gADJ_DEDUCT_MED;
	}else{
		//Note that the coinsurance range is always calculated based on the inputted deductible.  This is because this;
		//is the direct amount of spending required to satisfy the deductible range && hence reflects the amount of;
		//MOOP spending that has been met so far.;
		gTROOP_MED = gADJ_DEDUCT_MED + (gADJ_MOOP_MED - gDEDUCT_MED) / (1 - gEFF_COINS_MED);
	}
	//\\\\\;
	//RX Table;
	gEFF_COINS_RX = Math.min(gEFF_COINS_NUM_RX / gEFF_COINS_DENOM_RX, 1);
	if(gEFF_COINS_RX < 0 || gEFF_COINS_RX > 1 ){
		DebugAssert(false, "ERROR - RX Effective Coinsurance OOB");
	}
	gADJ_MOOP_RX = gMOOP_RX - gMOOP_ADJMT_RX;
	if(gADJ_MOOP_RX < gDEDUCT_RX ){
		gADJ_MOOP_RX = gDEDUCT_RX;
	}
	if(gEFF_COINS_RX == 1 ){
		gTROOP_RX = gADJ_DEDUCT_RX;
	}else{
		//Note that the coinsurance range is always calculated based on the inputted deductible.  This is because this;
		//is the direct amount of spending required to satisfy the deductible range && hence reflects the amount of;
		//MOOP spending that has been met so far.;
		gTROOP_RX = gADJ_DEDUCT_RX + (gADJ_MOOP_RX - gDEDUCT_RX) / (1 - gEFF_COINS_RX);
	}
}

/**
 * Sub SepMacro2_v2
 * return {void}
 */
function SepMacro2_v2 () {
	var trooprow_med, trooprow_rx, ded_maxd_med, troop_maxd_med, ded_maxd_rx, troop_maxd_rx, AV_DENOM_MED, AV_DENOM_RX, AV_NUM, ACTL_COINS_RATE_ACHVD, AMT_STC, MOD_AMT, adj, COINS_MED, COINS_RX, PRIOR_COINS, med_iter, PLAN_PAY_COINSRNG_MED, rx_iter, PLAN_PAY_COINSRNG_RX;
	trooprow_med = new CContTableRow();
	trooprow_rx = new CContTableRow();
	//initialize variables;
	COINS_MED = gEFF_COINS_MED;
	PRIOR_COINS = COINS_MED;
	ACTL_COINS_RATE_ACHVD = -1;
	do { 
		if(COINS_MED == 1 ){
			gTROOP_MED = gADJ_DEDUCT_MED;
		}else{
			gTROOP_MED = gADJ_DEDUCT_MED + (gADJ_MOOP_MED - gDEDUCT_MED) / (1 - COINS_MED);
		}
		//determine row of trOOP in continuance table;
		trooprow_med = getContTableRow(gUpToCol_MEDTBL.Rng(1), gTROOP_MED);
		troop_maxd_med = computeRowVal(gMaxdCol_MEDTBL.Rng(1), trooprow_med);
		ded_maxd_med = computeRowVal(gMaxdCol_MEDTBL.Rng(1), gDEDROW_MED);
		//track how much bene pays in coinsurance range;
		gBENEPAY_COINSRNG = 0;
		gPLAN_PAY_COINSRNG = 0;
		//if MOOP=DEDUCTIBLE, then;
		//there is no coins range.;
		if(gADJ_MOOP_MED == gADJ_DEDUCT_MED ){
			break;
		}
		//\\\\\;
		//MEDICAL SERVICES PROCESSING;
		//\\\\\;
		//Emergency Room Services;
		ProcessCostShareCoinsRange(gER_MEDTBL, gDEDROW_MED, trooprow_med, gER_COPAY, gER_COINS);
		//\\\\\;
		//Inpatient;
		ProcessCostShareCoinsRange(gIP_MEDTBL, gDEDROW_MED, trooprow_med, gIP_COPAY, gIP_COINS);
		//\\\\\;
		//Primary Care Visit;
		if(gCB_OFV_LIMIT_IND == 0 && gCB_OFV_COPAY_LMT_IND == 0 ){
			ProcessCostShareCoinsRange(gPC_MEDTBL, gDEDROW_MED, trooprow_med, gPC_COPAY, gPC_COINS);
		}else{
			//PC Additional Plan Options;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//first N visits are free - essentially have a copay of $0;
				ProcessTruncServiceCoinsRange(gPC_MEDTBL, gPCN_MEDTBL, gDEDROW_MED, trooprow_med, 0, 1);
				//cost sharing after N visits;
				ProcessCostShareCoinsRange(gPCN_MEDTBL, gDEDROW_MED, trooprow_med, gPC_COPAY, gPC_COINS);
			}else if (gCB_OFV_COPAY_LMT_IND == 1) {
				//first N visits paid with copay;
				ProcessTruncServiceCoinsRange(gPC_MEDTBL, gPCN_MEDTBL, gDEDROW_MED, trooprow_med, gPC_COPAY, 1);
				//cost sharing after N visits - use whatever user has entered in service row;
				ProcessCostShareCoinsRange(gPCN_MEDTBL, gDEDROW_MED, trooprow_med, gPC_COPAY, gPC_COINS);
			}
		}
		//\\\\\;
		//Specialist Visit;
		ProcessCostShareCoinsRange(gSP_MEDTBL, gDEDROW_MED, trooprow_med, gSP_COPAY, gSP_COINS);
		//\\\\\;
		//Mental/Behavioral Health && Substance Abuse Disorder Oupatient Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_PSY_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_PSY_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_PSY_MEDTBL, gDEDROW_MED, trooprow_med, gPSY_COPAY, gPSY_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_PSY_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_PSY_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_PSY_MEDTBL, gDEDROW_MED, trooprow_med, gPSY_COPAY, gPSY_COINS);
		}
		//\\\\\;
		//Imaging;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_IMG_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_IMG_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_IMG_MEDTBL, gDEDROW_MED, trooprow_med, gIMG_COPAY, gIMG_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_IMG_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_IMG_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_IMG_MEDTBL, gDEDROW_MED, trooprow_med, gIMG_COPAY, gIMG_COINS);
		}
		//\\\\\;
		//Rehabilitative Speech Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_ST_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_ST_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_ST_MEDTBL, gDEDROW_MED, trooprow_med, gST_COPAY, gST_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_ST_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_ST_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_ST_MEDTBL, gDEDROW_MED, trooprow_med, gST_COPAY, gST_COINS);
		}
		//\\\\\;
		//Rehabilitative Occupational && Rehabilitative Physical Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_OT_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_OT_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_OT_MEDTBL, gDEDROW_MED, trooprow_med, gOT_COPAY, gOT_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_OT_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_OT_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_OT_MEDTBL, gDEDROW_MED, trooprow_med, gOT_COPAY, gOT_COINS);
		}
		//\\\\\;
		//Preventive Care;
		ProcessCostShareCoinsRange(gPREV_MEDTBL, gDEDROW_MED, trooprow_med, gPREV_COPAY, gPREV_COINS);
		//\\\\\;
		//Laboratory Outpatient && Professional Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_LAB_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_LAB_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_LAB_MEDTBL, gDEDROW_MED, trooprow_med, gLAB_COPAY, gLAB_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_LAB_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_LAB_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_LAB_MEDTBL, gDEDROW_MED, trooprow_med, gLAB_COPAY, gLAB_COINS);
		}
		//\\\\\;
		//X-rays && Diagnostic Imaging;
		//If X-Ray has its own cost sharing paremeters, then;
		//these take precedence over;
		//X-Ray component cost sharing paremeters.  If X-Ray does ! have its own cost;
		//sharing parameters, break X-Ray into component parts && apply component cost;
		//sharing parameters.;
		if(gXRAY_OVRD ){
			ProcessCostShareCoinsRange(gXRAY_MEDTBL, gDEDROW_MED, trooprow_med, gXRAY_COPAY, gXRAY_COINS);
		}else{
			//X-rays && Diagnostic Imaging - Primary Care Visit Component;
			ProcessCostShareCoinsRange(gXRAY_PC_MEDTBL, gDEDROW_MED, trooprow_med, gPC_COPAY, gPC_COINS);
			//X-rays && Diagnostic Imaging - Specialist Visit Component;
			ProcessCostShareCoinsRange(gXRAY_SP_MEDTBL, gDEDROW_MED, trooprow_med, gSP_COPAY, gSP_COINS);
			//X-Rays && Diagnostic Imaging - Unclassified;
			ProcessCostShareCoinsRange(gXRAY_UNC_MEDTBL, gDEDROW_MED, trooprow_med, gXRAY_COPAY, gXRAY_COINS);
		}
		//\\\\\;
		//Skilled Nursing Facility;
		ProcessCostShareCoinsRange(gSNF_MEDTBL, gDEDROW_MED, trooprow_med, gSNF_COPAY, gSNF_COINS);
		//\\\\\;
		//Unclassified;
		//Outpatient Facility Fee Component;
		ProcessCostShareCoinsRange(gOPFAC_UNC_MEDTBL, gDEDROW_MED, trooprow_med, gOPFAC_COPAY, gOPFAC_COINS);
		//Outpatient Services Component;
		ProcessCostShareCoinsRange(gOPPROF_SRGRY_MEDTBL, gDEDROW_MED, trooprow_med, gOPPROF_COPAY, gOPPROF_COINS);
		AMT_STC = gBENEPAY_COINSRNG + gPLAN_PAY_COINSRNG;
		if(AMT_STC == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gPLAN_PAY_COINSRNG / AMT_STC;
		}
		PRIOR_COINS = COINS_MED;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS_MED = ACTL_COINS_RATE_ACHVD * Exp(-med_iter / gTUNING_PRMTR) +             (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Exp(-med_iter / gTUNING_PRMTR));
		med_iter = med_iter + 1;
	} while ((med_iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE));
	
	PLAN_PAY_COINSRNG_MED = gPLAN_PAY_COINSRNG;
	//reset some variables to o for Rx loop;
	gPLAN_PAY_COINSRNG = 0;
	gBENEPAY_COINSRNG = 0;
	AMT_STC = 0;
	COINS_RX = gEFF_COINS_RX;
	PRIOR_COINS = COINS_RX;
	ACTL_COINS_RATE_ACHVD = -1;
	do { 
		if(COINS_RX == 1 ){
			gTROOP_RX = gADJ_DEDUCT_RX;
		}else{
			gTROOP_RX = gADJ_DEDUCT_RX + (gADJ_MOOP_RX - gDEDUCT_RX) / (1 - COINS_RX);
		}
		//determine row of trOOP in continuance table;
		trooprow_rx = getContTableRow(gUpToCol_RXTBL.Rng(1), gTROOP_RX);
		troop_maxd_rx = computeRowVal(gMaxdCol_RXTBL.Rng(1), trooprow_rx);
		ded_maxd_rx = computeRowVal(gMaxdCol_RXTBL.Rng(1), gDEDROW_RX);
		//track how much bene pays in coinsurance range;
		gBENEPAY_COINSRNG = 0;
		gPLAN_PAY_COINSRNG = 0;
		//if MOOP=DEDUCTIBLE, then;
		//there is no coins range.;
		if(gADJ_MOOP_RX == gADJ_DEDUCT_RX ){
			break;
		}
		//\\\\\;
		//DRUG PROCESSING;
		//\\\\\;
		//Generics;
		ProcessCostShareCoinsRangeRX(gRXGEN_RXTBL, gDEDROW_RX, trooprow_rx, gRXGEN_COPAY, gRXGEN_COINS);
		//\\\\\;
		//Preferred Brand Drugs;
		ProcessCostShareCoinsRangeRX(gRXFORM_RXTBL, gDEDROW_RX, trooprow_rx, gRXFORM_COPAY, gRXFORM_COINS);
		//\\\\\;
		//Non-Preferred Brand Drugs;
		ProcessCostShareCoinsRangeRX(gRXNONFORM_RXTBL, gDEDROW_RX, trooprow_rx, gRXNONFORM_COPAY, gRXNONFORM_COINS);
		//\\\\\;
		//Specialty Drugs;
		ProcessCostShareCoinsRangeRX(gRXSPCLTY_RXTBL, gDEDROW_RX, trooprow_rx, gRXSPCLTY_COPAY, gRXSPCLTY_COINS);
		//\\\\\;
		//Recalculate values for trOOP calculation;
		AMT_STC = gBENEPAY_COINSRNG + gPLAN_PAY_COINSRNG;
		if(AMT_STC == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gPLAN_PAY_COINSRNG / AMT_STC;
		}
		PRIOR_COINS = COINS_RX;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS_RX = ACTL_COINS_RATE_ACHVD * Exp(-rx_iter / gTUNING_PRMTR) + (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Exp(-rx_iter / gTUNING_PRMTR));
		rx_iter = rx_iter + 1;
	} while ((rx_iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE));
	
	PLAN_PAY_COINSRNG_RX = gPLAN_PAY_COINSRNG;
	AV_DENOM_MED = gMaxdCol_MEDTBL.Rng(1).getValue(gBottomRow, 0);
	AV_DENOM_RX = gMaxdCol_RXTBL.Rng(1).getValue(gBottomRow, 0);
	AV_NUM = gPLAN_PAY + (troop_maxd_med - ded_maxd_med) * COINS_MED + (troop_maxd_rx - ded_maxd_rx) * COINS_RX + (AV_DENOM_MED - troop_maxd_med) + (AV_DENOM_RX - troop_maxd_rx);
	gAV = AV_NUM / (AV_DENOM_MED + AV_DENOM_RX);
}