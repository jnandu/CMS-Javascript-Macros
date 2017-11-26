/**
 * Sub CombinedMacro_v2
 * return {void}
 */
function CombinedMacro_v2 () {
	var PRIOR_COINS, COINS, ACTL_COINS_RATE_ACHVD, AMT_STD, ded_maxd, dedrow, EFF_COINS_DENOM, iter=0;
	dedrow = new CContTableRow();
	//Get average enrollee cost for effective coinsurance calculation.;
	//Use bottom row to compute effective coinsurance rate.;
    ARVConsole("Inside CombinedMacro_v2");
	EFF_COINS_DENOM = gMaxdCol.Rng(1).getValue(gBottomRow, 0);
  ARVConsole("Inside EFF_COINS_DENOM"+EFF_COINS_DENOM);
	//initialize variables;
	COINS = 1;
	PRIOR_COINS = 0;
	ACTL_COINS_RATE_ACHVD = -1;
	//The following code iteratively calculates the amount of spending required to meet the deductible.  Cost sharing below;
	//the deductible means that less than 100% of service costs is being born by the beneficiary; hence a higher amount of;
	//absolute spending is required to satisfy the deductible.;
	do {
		gMOOP_ADJMT = 0;
		gPLAN_PAY = 0;
		gBENEPAY = 0;
		gTOT_PAY = 0;
		gEFF_COINS_NUM = 0;
		if(COINS == 0 ){
          gADJ_DEDUCT = gADJ_DEDUCT 
        } else { 
          gADJ_DEDUCT = gDEDUCT / COINS;
		}
		//determine row of deductible in continuance table;
		dedrow = getContTableRow(gUpToCol.Rng(1), gADJ_DEDUCT);
		//\\\\\;
		//MEDICAL SERVICES PROCESSING;
		//\\\\\;
		//Emergency Room Services;
      ARVConsole("gEFF_COINS_NUM="+gEFF_COINS_NUM);
		ProcessServiceCostShare(gER, dedrow, gER_COPAY, gER_COINS, iter);
		//\\\\\;
		//Inpatient;
		ProcessServiceCostShare(gIP, dedrow, gIP_COPAY, gIP_COINS, iter);
		//\\\\\;
		//Primary Care Visit;
		if(gCB_OFV_LIMIT_IND == 0 && gCB_OFV_COPAY_LMT_IND == 0 ){
			ProcessServiceCostShare(gPC, dedrow, gPC_COPAY, gPC_COINS, iter);
		}else{
			//PC Additional Plan Options;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//first N visits are free - essentially have a copay of $0;
				ProcessTruncServiceVal(gPC, gPCN, dedrow, 0, 1, iter);
				//cost sharing after N visits;
				ProcessServiceCostShare(gPCN, dedrow, gPC_COPAY, gPC_COINS, iter);
			}else if(gCB_OFV_COPAY_LMT_IND == 1) {
				//first N visits paid with copay;
				ProcessTruncServiceVal(gPC, gPCN, dedrow, gPC_COPAY, 1, iter);
				//cost sharing after N visits below the deductible - Assume no cost-sharing, so set copay to 0.;
				ProcessServiceCostShare(gPCN, dedrow, 0, gPC_COINS, iter);
			}
		}
		//\\\\\;
		//Specialist Visit;
		ProcessServiceCostShare(gSP, dedrow, gSP_COPAY, gSP_COINS, iter);
		//\\\\\;
		//Mental/Behavioral Health && Substance Abuse Disorder Oupatient Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
        ARVConsole("gOPFAC_PSY_OVRD="+gOPFAC_PSY_OVRD);
		if(gOPFAC_PSY_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_PSY, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPFAC_PSY, dedrow, gPSY_COPAY, gPSY_COINS, iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_PSY_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_PSY, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPPROF_PSY, dedrow, gPSY_COPAY, gPSY_COINS, iter);
		}
		//\\\\\;
		//Imaging;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_IMG_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_IMG, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPFAC_IMG, dedrow, gIMG_COPAY, gIMG_COINS, iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_IMG_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_IMG, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPPROF_IMG, dedrow, gIMG_COPAY, gIMG_COINS, iter);
		}
		//\\\\\;
		//Rehabilitative Speech Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_ST_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_ST, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPFAC_ST, dedrow, gST_COPAY, gST_COINS, iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_ST_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_ST, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPPROF_ST, dedrow, gST_COPAY, gST_COINS, iter);
		}
		//\\\\\;
		//Rehabilitative Occupational && Rehabilitative Physical Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_OT_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_OT, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPFAC_OT, dedrow, gOT_COPAY, gOT_COINS, iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_OT_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_OT, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPPROF_OT, dedrow, gOT_COPAY, gOT_COINS, iter);
		}
		//\\\\\;
		//Preventive Care;
		ProcessServiceCostShare(gPREV, dedrow, gPREV_COPAY, gPREV_COINS, iter);
		//\\\\\;
		//Laboratory Outpatient && Professional Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_LAB_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_LAB, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPFAC_LAB, dedrow, gLAB_COPAY, gLAB_COINS, iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_LAB_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_LAB, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		}else{
			ProcessServiceCostShare(gOPPROF_LAB, dedrow, gLAB_COPAY, gLAB_COINS, iter);
		}
		//\\\\\;
		//X-rays && Diagnostic Imaging;
		//If X-Ray has its own cost sharing paremeters, then;
		//these take precedence over;
		//X-Ray component cost sharing paremeters.  If X-Ray does ! have its own cost;
		//sharing parameters, break X-Ray into component parts && apply component cost;
		//sharing parameters.;
		if(gXRAY_OVRD ){
			ProcessServiceCostShare(gXRAY, dedrow, gXRAY_COPAY, gXRAY_COINS, iter);
		}else{
			//X-rays && Diagnostic Imaging - Primary Care Visit Component;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//Special case when "ERROR - subject to deductible array" additional benefit design option is enabled;
				ProcessCostShare_PCXRAY_NVisits(vTABLE=gXRAY_PC, vDEDROW=dedrow, vCOPAY_NVISITS=0, vCOPAY_COINS_RNG=gPC_COPAY, vCOINS=gPC_COINS, vITER=iter);
			}else if ( gCB_OFV_COPAY_LMT_IND == 1) {
				//Special case when "ERROR - subject to coinsurance array" additional benefit design option is enabled;
				ProcessCostShare_PCXRAY_NVisits(vTABLE=gXRAY_PC, vDEDROW=dedrow, vCOPAY_NVISITS=gPC_COPAY, vCOPAY_COINS_RNG=gPC_COPAY, vCOINS=gPC_COINS, vITER=iter);
			}else{
				ProcessServiceCostShare(gXRAY_PC, dedrow, gPC_COPAY, gPC_COINS, iter);
			}
			//X-rays && Diagnostic Imaging - Specialist Visit Component;
			ProcessServiceCostShare(gXRAY_SP, dedrow, gSP_COPAY, gSP_COINS, iter);
			//X-Rays && Diagnostic Imaging - Unclassified;
			ProcessServiceCostShare(gXRAY_UNC, dedrow, gXRAY_COPAY, gXRAY_COINS, iter);
		}
		//\\\\\;
		//Skilled Nursing Facility;
		ProcessServiceCostShare(gSNF, dedrow, gSNF_COPAY, gSNF_COINS, iter);
		//\\\\\;
		//Unclassified OPFAC/OPPROF;
		//Outpatient Facility Fee Component;
		ProcessServiceCostShare(gOPFAC_UNC, dedrow, gOPFAC_COPAY, gOPFAC_COINS, iter);
		//Outpatient Services Component;
		ProcessServiceCostShare(gOPPROF_SRGRY, dedrow, gOPPROF_COPAY, gOPPROF_COINS, iter);
		//\\\\\;
		//DRUG PROCESSING;
		//\\\\\;
		//Generics;
		ProcessServiceCostShareRX(gRXGEN, dedrow, gRXGEN_COPAY, gRXGEN_COINS, iter);
		//\\\\\;
		//Preferred Brand Drugs;
		ProcessServiceCostShareRX(gRXFORM, dedrow, gRXFORM_COPAY, gRXFORM_COINS, iter);
		//\\\\\;
		//Non-Preferred Brand Drugs;
		ProcessServiceCostShareRX(gRXNONFORM, dedrow, gRXNONFORM_COPAY, gRXNONFORM_COINS, iter);
		//\\\\\;
		//Specialty Drugs;
		ProcessServiceCostShareRX(gRXSPCLTY, dedrow, gRXSPCLTY_COPAY, gRXSPCLTY_COINS, iter);
		//\\\\\;
		//Recalculate deductible values;
		AMT_STD = gTOT_PAY;
		if(AMT_STD == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gBENEPAY / AMT_STD;
		}
      ARVConsole("Before COINS"+COINS);
		PRIOR_COINS = COINS;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS = ACTL_COINS_RATE_ACHVD * Exp(-iter / gTUNING_PRMTR) + (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Exp(-iter / gTUNING_PRMTR));
      ARVConsole("After COINS"+COINS);
		iter = iter + 1;
        ARVConsole("PRIOR_COINS="+PRIOR_COINS);
        ARVConsole("ACTL_COINS_RATE_ACHVD="+ACTL_COINS_RATE_ACHVD);
        ARVConsole("condition="+((iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE)));
	} while (!((iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE)));
	//\\\\\;
	//Set plan paid amount equal to portion of TOTAL spending below the deductible that the plans pays for.;
	ded_maxd = computeRowVal(gMaxdCol.Rng(1), dedrow);
    //ded_maxd = gMaxdCol.Rng(1).getValue(dedrow.getRow(), 0);
	if(gTOT_PAY == 0 ){
		gPLAN_PAY = 0
	} else {
		gPLAN_PAY = ded_maxd * gPLAN_PAY / gTOT_PAY;
	}
	//\\\\\;
	//Set variables to use in HSA Contribution modification, if needed.;
	if(gTOT_PAY == 0 ){
		gBENECOINS_DEDUCT = 1 
	}else{ 
		gBENECOINS_DEDUCT = gBENEPAY / gTOT_PAY;
	}
	//\\\\\;
	//True MOOP Calculation - allowed spending required for enrollee to reach his || her MOOP;
    ARVConsole("gEFF_COINS_NUM="+gEFF_COINS_NUM+"EFF_COINS_DENOM="+EFF_COINS_DENOM);
	gEFF_COINS = Math.min(gEFF_COINS_NUM / EFF_COINS_DENOM, 1);
	if(gEFF_COINS < 0 || gEFF_COINS > 1 ){
		DebugAssert(false, "RXSPCLTY");
	}
	gADJ_MOOP = gMOOP - gMOOP_ADJMT;
	if(gADJ_MOOP < gDEDUCT ){
		gADJ_MOOP = gDEDUCT;
	}
	if(gEFF_COINS == 1 ){
		gTROOP = gADJ_DEDUCT;
	}else{
		//Note that the coinsurance range is always calculated based on the inputted deductible.  This is because this;
		//is the direct amount of spending required to satisfy the deductible range && hence reflects the amount of;
		//MOOP spending that has been met so far.;
		gTROOP = gADJ_DEDUCT + (gADJ_MOOP - gDEDUCT) / (1 - gEFF_COINS);
	}
	//\\\\\;
	//Set variables for next subroutine.;
	gDEDROW = dedrow;
}

/**
 * Sub CombinedMacro2_v2
 * return {void}
 */
function CombinedMacro2_v2 () {
	var trooprow, ded_maxd, troop_maxd, AV_DENOM, AV_NUM, ACTL_COINS_RATE_ACHVD, AMT_STC, MOD_AMT, adj, COINS, PRIOR_COINS, i=0;
	trooprow = new CContTableRow();
	AV_DENOM = gMaxdCol.Rng(1).getValue(gBottomRow, 0);
	//initialize variables;
	COINS = gEFF_COINS;
	PRIOR_COINS = COINS;
	ACTL_COINS_RATE_ACHVD = -1;
	do { 
		if(COINS == 1 ){
			gTROOP = gADJ_DEDUCT;
		}else{
			//Note that the coinsurance range is always calculated based on the inputted deductible.  This is because this;
			//is the direct amount of spending required to satisfy the deductible range && hence reflects the amount of;
			//MOOP spending that has been met so far.;
			gTROOP = gADJ_DEDUCT + (gADJ_MOOP - gDEDUCT) / (1 - COINS);
		}
		//determine row of trOOP in continuance table;
        ARVConsole("Inside CombinedMacro2_v2");
		trooprow = getContTableRow(gUpToCol.Rng(1), gTROOP);
        ARVConsole("Inside CombinedMacro2_v2 - 1");
		troop_maxd = computeRowVal(gMaxdCol.Rng(1), trooprow);
        ARVConsole("Inside CombinedMacro2_v2 - 2");
        ded_maxd = computeRowVal(gMaxdCol.Rng(1), gDEDROW);
		//track how much bene pays in coinsurance range;
		gBENEPAY_COINSRNG = 0;
		gPLAN_PAY_COINSRNG = 0;
		//if MOOP=DEDUCTIBLE, then;
		//there is no coins range.;
		if(gADJ_MOOP == gADJ_DEDUCT ){
			break;
		}
		//\\\\\;
		//MEDICAL SERVICES PROCESSING;
		//\\\\\;
		//Emergency Room Services;
		ProcessCostShareCoinsRange(gER, gDEDROW, trooprow, gER_COPAY, gER_COINS);
		//\\\\\;
		//Inpatient;
		ProcessCostShareCoinsRange(gIP, gDEDROW, trooprow, gIP_COPAY, gIP_COINS);
		//\\\\\;
		//Primary Care Visit;
		if(gCB_OFV_LIMIT_IND == 0 && gCB_OFV_COPAY_LMT_IND == 0 ){
			ProcessCostShareCoinsRange(gPC, gDEDROW, trooprow, gPC_COPAY, gPC_COINS);
		}else{
			//PC Additional Plan Options;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//first N visits are free - essentially have a copay of $0;
				ProcessTruncServiceCoinsRange(gPC, gPCN, gDEDROW, trooprow, 0, 1);
				//cost sharing after N visits;
				ProcessCostShareCoinsRange(gPCN, gDEDROW, trooprow, gPC_COPAY, gPC_COINS);
			}else if (gCB_OFV_COPAY_LMT_IND == 1) {
				//first N visits paid with copay;
				ProcessTruncServiceCoinsRange(gPC, gPCN, gDEDROW, trooprow, gPC_COPAY, 1);
				//cost sharing after N visits - use whatever user has entered in service row;
				ProcessCostShareCoinsRange(gPCN, gDEDROW, trooprow, gPC_COPAY, gPC_COINS);
			}
		}
		//\\\\\;
		//Specialist Visit;
		ProcessCostShareCoinsRange(gSP, gDEDROW, trooprow, gSP_COPAY, gSP_COINS);
		//\\\\\;
		//Mental/Behavioral Health && Substance Abuse Disorder Oupatient Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_PSY_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_PSY, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_PSY, gDEDROW, trooprow, gPSY_COPAY, gPSY_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_PSY_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_PSY, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_PSY, gDEDROW, trooprow, gPSY_COPAY, gPSY_COINS);
		}
		//\\\\\;
		//Imaging;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_IMG_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_IMG, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_IMG, gDEDROW, trooprow, gIMG_COPAY, gIMG_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_IMG_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_IMG, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_IMG, gDEDROW, trooprow, gIMG_COPAY, gIMG_COINS);
		}
		//\\\\\;
		//Rehabilitative Speech Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_ST_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_ST, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_ST, gDEDROW, trooprow, gST_COPAY, gST_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_ST_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_ST, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_ST, gDEDROW, trooprow, gST_COPAY, gST_COINS);
		}
		//\\\\\;
		//Rehabilitative Occupational && Rehabilitative Physical Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_OT_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_OT, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_OT, gDEDROW, trooprow, gOT_COPAY, gOT_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_OT_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_OT, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_OT, gDEDROW, trooprow, gOT_COPAY, gOT_COINS);
		}
		//\\\\\;
		//Preventive Care;
		ProcessCostShareCoinsRange(gPREV, gDEDROW, trooprow, gPREV_COPAY, gPREV_COINS);
		//\\\\\;
		//Laboratory Outpatient && Professional Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_LAB_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPFAC_LAB, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPFAC_LAB, gDEDROW, trooprow, gLAB_COPAY, gLAB_COINS);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_LAB_OVRD == 1 ){
			ProcessCostShareCoinsRange(gOPPROF_LAB, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		}else{
			ProcessCostShareCoinsRange(gOPPROF_LAB, gDEDROW, trooprow, gLAB_COPAY, gLAB_COINS);
		}
		//\\\\\;
		//X-rays && Diagnostic Imaging;
		//If X-Ray has its own cost sharing paremeters, then;
		//these take precedence over;
		//X-Ray component cost sharing paremeters.  If X-Ray does ! have its own cost;
		//sharing parameters, break X-Ray into component parts && apply component cost;
		//sharing parameters.;
		if(gXRAY_OVRD ){
			ProcessCostShareCoinsRange(gXRAY, gDEDROW, trooprow, gXRAY_COPAY, gXRAY_COINS);
		}else{
			//X-rays && Diagnostic Imaging - Primary Care Visit Component;
			ProcessCostShareCoinsRange(gXRAY_PC, gDEDROW, trooprow, gPC_COPAY, gPC_COINS);
			//X-rays && Diagnostic Imaging - Specialist Visit Component;
			ProcessCostShareCoinsRange(gXRAY_SP, gDEDROW, trooprow, gSP_COPAY, gSP_COINS);
			//X-Rays && Diagnostic Imaging - Unclassified;
			ProcessCostShareCoinsRange(gXRAY_UNC, gDEDROW, trooprow, gXRAY_COPAY, gXRAY_COINS);
		}
		//\\\\\;
		//Skilled Nursing Facility;
		ProcessCostShareCoinsRange(gSNF, gDEDROW, trooprow, gSNF_COPAY, gSNF_COINS);
		//\\\\\;
		//Unclassified;
		//Outpatient Facility Fee Component;
		ProcessCostShareCoinsRange(gOPFAC_UNC, gDEDROW, trooprow, gOPFAC_COPAY, gOPFAC_COINS);
		//Outpatient Services Component;
		ProcessCostShareCoinsRange(gOPPROF_SRGRY, gDEDROW, trooprow, gOPPROF_COPAY, gOPPROF_COINS);
		//\\\\\;
		//DRUG PROCESSING;
		//\\\\\;
		//Generics;
		ProcessCostShareCoinsRangeRX(gRXGEN, gDEDROW, trooprow, gRXGEN_COPAY, gRXGEN_COINS);
		//\\\\\;
		//Preferred Brand Drugs;
		ProcessCostShareCoinsRangeRX(gRXFORM, gDEDROW, trooprow, gRXFORM_COPAY, gRXFORM_COINS);
		//\\\\\;
		//Non-Preferred Brand Drugs;
		ProcessCostShareCoinsRangeRX(gRXNONFORM, gDEDROW, trooprow, gRXNONFORM_COPAY, gRXNONFORM_COINS);
		//\\\\\;
		//Specialty Drugs;
		ProcessCostShareCoinsRangeRX(gRXSPCLTY, gDEDROW, trooprow, gRXSPCLTY_COPAY, gRXSPCLTY_COINS);
		//\\\\\;
		//Recalculate values for trOOP calculation;
		AMT_STC = gBENEPAY_COINSRNG + gPLAN_PAY_COINSRNG;
		if(AMT_STC == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gPLAN_PAY_COINSRNG / AMT_STC;
		}
            ARVConsole("Before COINS"+COINS);

		PRIOR_COINS = COINS;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS = ACTL_COINS_RATE_ACHVD * Math.exp(-i / gTUNING_PRMTR) + (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Math.exp(-i / gTUNING_PRMTR));
            ARVConsole("After COINS"+COINS);

        ARVConsole("COINS="+Math.exp(-i / gTUNING_PRMTR));
        ARVConsole("i / gTUNING_PRMTR="+(-i / gTUNING_PRMTR));
		i = i + 1;
        ARVConsole("PRIOR_COINS="+PRIOR_COINS);
        ARVConsole("ACTL_COINS_RATE_ACHVD="+ACTL_COINS_RATE_ACHVD);
      ARVConsole("condition="+((i > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE)));
	} while (!((i > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE)));
	
	AV_DENOM = gMaxdCol.Rng(1).getValue(gBottomRow, 0);
    ARVConsole("condition="+(i - 1 == gMAX_CONVERGENCE_ITER));
	//if the calculation does ! converge, prefer the effective coinsurance rate that produces a lower AV.;
	if(i - 1 == gMAX_CONVERGENCE_ITER ){
		AV_NUM = Math.min(gPLAN_PAY + (troop_maxd - ded_maxd) * COINS + (AV_DENOM - troop_maxd), gPLAN_PAY + (troop_maxd - ded_maxd) * PRIOR_COINS + (AV_DENOM - troop_maxd));
	}else{
		AV_NUM = gPLAN_PAY + (troop_maxd - ded_maxd) * COINS + (AV_DENOM - troop_maxd);
	}
    ARVConsole("gPLAN_PAY"+gPLAN_PAY);
    ARVConsole("troop_maxd"+troop_maxd);
    ARVConsole("ded_maxd"+ded_maxd);
    ARVConsole("COINS"+COINS);
    ARVConsole("AV_NUM="+AV_NUM);
    ARVConsole("AV_DENOM="+AV_DENOM);
	gAV = (AV_NUM/AV_DENOM);
  ARVConsole("gAV="+gAV);
}
