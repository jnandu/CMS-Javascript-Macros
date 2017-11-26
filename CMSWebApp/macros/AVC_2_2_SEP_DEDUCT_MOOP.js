/**
 * Sub SepDeductCombinedMOOP_v2
 * return {void}
 */
function SepDeductCombinedMOOP_v2 () {
	var PRIOR_COINS, COINS, ACTL_COINS_RATE_ACHVD, AMT_STD, ded_maxd_med, dedrow_med, ded_maxd_rx, dedrow_rx, EFF_COINS_DENOM_MED, EFF_COINS_DENOM_RX, med_iter, EFF_COINS_NUM_MED, PLAN_PAY_MED, MOOP_ADJMT_MED, rx_iter, EFF_COINS_NUM_RX, PLAN_PAY_RX, MOOP_ADJMT_RX;
	dedrow_med = new CContTableRow();
	dedrow_rx = new CContTableRow();
	//initial deductible;
	gADJ_DEDUCT_MED = gDEDUCT_MED;
	gADJ_DEDUCT_RX = gDEDUCT_RX;
	//Get average enrollee cost for effective coinsurance calculation.;
	//Use bottom row of Combined Table to compute effective coinsurance rate.;
    //ARVConsole("getNumRow="+gMaxdCol_MEDTBL.Rng(1).getRowCount());
    //ARVConsole("getLastRow="+gMaxdCol_MEDTBL.Rng(1).getLastRow());
    //ARVConsole("getNumColRow="+gMaxdCol_MEDTBL.Rng(1).getNumColumns());
	EFF_COINS_DENOM_MED = gMaxdCol_MEDTBL.Rng(1).getValue(gBottomRow-1, 0);
	EFF_COINS_DENOM_RX = gMaxdCol_RXTBL.Rng(1).getValue(gBottomRow-1, 0);
	//initialize variables;
	COINS = 1;
	PRIOR_COINS = 0;
	ACTL_COINS_RATE_ACHVD = -1;
	//The following code iteratively calculates the amount of spending required to meet the deductible.  Cost sharing below;
	//the deductible means that less than 100% of service costs is being born by the beneficiary; hence a higher amount of;
	//absolute spending is required to satisfy the deductible.;
	//Medical Loop;
	do { 
		gMOOP_ADJMT = 0;
		gPLAN_PAY = 0;
		gBENEPAY = 0;
		gTOT_PAY = 0;
		gEFF_COINS_NUM = 0;
		if(COINS == 0 ){
			gADJ_DEDUCT_MED = gADJ_DEDUCT_MED
        }else { 
          gADJ_DEDUCT_MED = gDEDUCT_MED / COINS;
		}
		//determine row of deductible in continuance table;
		dedrow_med = getContTableRow(gUpToCol_MEDTBL.Rng(1), gADJ_DEDUCT_MED);
		//\\\\\;
		//MEDICAL SERVICES PROCESSING;
		//\\\\\;
		//Emergency Room Services;
		ProcessServiceCostShare(gER_MEDTBL, dedrow_med, gER_COPAY, gER_COINS, med_iter);
		//\\\\\;
		//Inpatient;
		ProcessServiceCostShare(gIP_MEDTBL, dedrow_med, gIP_COPAY, gIP_COINS, med_iter);
		//\\\\\;
		//Primary Care Visit;
		if(gCB_OFV_LIMIT_IND == 0 && gCB_OFV_COPAY_LMT_IND == 0 ){
			ProcessServiceCostShare(gPC_MEDTBL, dedrow_med, gPC_COPAY, gPC_COINS, med_iter);
		}else{
			//PC Additional Plan Options;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//first N visits are free - essentially have a copay of $0;
				ProcessTruncServiceVal(gPC_MEDTBL, gPCN_MEDTBL, dedrow_med, 0, 1, med_iter);
				//cost sharing after N visits;
			ProcessServiceCostShare(gPCN_MEDTBL, dedrow_med, gPC_COPAY, gPC_COINS, med_iter);
			}else if (gCB_OFV_COPAY_LMT_IND == 1) {
				//first N visits paid with copay;
				ProcessTruncServiceVal(gPC_MEDTBL, gPCN_MEDTBL, dedrow_med, gPC_COPAY, 1, med_iter);
				//cost sharing after N visits below the deductible - Assume no cost-sharingso set copay to 0.;
				ProcessServiceCostShare(gPCN_MEDTBL, dedrow_med, 0, gPC_COINS, med_iter);
			}
		}
		//\\\\\;
		//Specialist Visit;
		ProcessServiceCostShare(gSP_MEDTBL, dedrow_med, gSP_COPAY, gSP_COINS, med_iter);
		//\\\\\;
		//Mental/Behavioral Health && Substance Abuse Disorder Oupatient Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_PSY_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_PSY_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPFAC_PSY_MEDTBL, dedrow_med, gPSY_COPAY, gPSY_COINS, med_iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_PSY_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_PSY_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPPROF_PSY_MEDTBL, dedrow_med, gPSY_COPAY, gPSY_COINS, med_iter);
		}
		//\\\\\;
		//Imaging;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_IMG_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_IMG_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPFAC_IMG_MEDTBL, dedrow_med, gIMG_COPAY, gIMG_COINS, med_iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_IMG_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_IMG_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPPROF_IMG_MEDTBL, dedrow_med, gIMG_COPAY, gIMG_COINS, med_iter);
		}
		//\\\\\;
		//Rehabilitative Speech Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_ST_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_ST_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPFAC_ST_MEDTBL, dedrow_med, gST_COPAY, gST_COINS, med_iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_ST_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_ST_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPPROF_ST_MEDTBL, dedrow_med, gST_COPAY, gST_COINS, med_iter);
		}
		//\\\\\;
		//Rehabilitative Occupational && Rehabilitative Physical Therapy;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_OT_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_OT_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPFAC_OT_MEDTBL, dedrow_med, gOT_COPAY, gOT_COINS, med_iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_OT_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_OT_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPPROF_OT_MEDTBL, dedrow_med, gOT_COPAY, gOT_COINS, med_iter);
		}
		//\\\\\;
		//Preventive Care;
		ProcessServiceCostShare(gPREV_MEDTBL, dedrow_med, gPREV_COPAY, gPREV_COINS, med_iter);
		//\\\\\;
		//Laboratory Outpatient && Professional Services;
		//Outpatient Facility Fee Component;
		// -- Use OP Facility cost sharing unless primary service has special cost sharing.;
		if(gOPFAC_LAB_OVRD == 1 ){
			ProcessServiceCostShare(gOPFAC_LAB_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPFAC_LAB_MEDTBL, dedrow_med, gLAB_COPAY, gLAB_COINS, med_iter);
		}
		//Outpatient Services Component;
		// -- Use OP Professional cost sharing unless primary service has special cost sharing.;
		if(gOPPROF_LAB_OVRD == 1 ){
			ProcessServiceCostShare(gOPPROF_LAB_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		}else{
			ProcessServiceCostShare(gOPPROF_LAB_MEDTBL, dedrow_med, gLAB_COPAY, gLAB_COINS, med_iter);
		}
		//\\\\\;
		//X-rays && Diagnostic Imaging;
		//If X-Ray has its own cost sharing paremeters, then;
		//these take precedence over;
		//X-Ray component cost sharing paremeters.  If X-Ray does ! have its own cost;
		//sharing parameters, break X-Ray into component parts && apply component cost;
		//sharing parameters.;
		if(gXRAY_OVRD ){
			ProcessServiceCostShare(gXRAY_MEDTBL, dedrow_med, gXRAY_COPAY, gXRAY_COINS, med_iter);
		}else{
			//X-rays && Diagnostic Imaging - Primary Care Visit Component;
			if(gCB_OFV_LIMIT_IND == 1 ){
				//Special case when "ERROR - subject to deductible array" additional benefit design option is enabled;
				ProcessCostShare_PCXRAY_NVisits(vTABLE=gXRAY_PC_MEDTBL, vDEDROW=dedrow_med, vCOPAY_NVISITS=0, vCOPAY_COINS_RNG=gPC_COPAY, vCOINS=gPC_COINS, vITER=med_iter);
			}else if (gCB_OFV_COPAY_LMT_IND == 1) {
				//Special case when "ERROR - subject to coinsurance array" additional benefit design option is enabled;
				ProcessCostShare_PCXRAY_NVisits(vTABLE=gXRAY_PC_MEDTBL, vDEDROW=dedrow_med, vCOPAY_NVISITS=gPC_COPAY, vCOPAY_COINS_RNG=gPC_COPAY, vCOINS=gPC_COINS, vITER=med_iter);
			}else{
				ProcessServiceCostShare(gXRAY_PC_MEDTBL, dedrow_med, gPC_COPAY, gPC_COINS, med_iter);
			}
			//X-rays && Diagnostic Imaging - Specialist Visit Component;
			ProcessServiceCostShare(gXRAY_SP_MEDTBL, dedrow_med, gSP_COPAY, gSP_COINS, med_iter);
			//X-Rays && Diagnostic Imaging - Unclassified;
			ProcessServiceCostShare(gXRAY_UNC_MEDTBL, dedrow_med, gXRAY_COPAY, gXRAY_COINS, med_iter);
		}
		//\\\\\;
		//Skilled Nursing Facility;
		ProcessServiceCostShare(gSNF_MEDTBL, dedrow_med, gSNF_COPAY, gSNF_COINS, med_iter);
		//\\\\\;
		//Unclassified OPFAC/OPPROF;
		//Outpatient Facility Fee Component;
		ProcessServiceCostShare(gOPFAC_UNC_MEDTBL, dedrow_med, gOPFAC_COPAY, gOPFAC_COINS, med_iter);
		//Outpatient Services Component;
		ProcessServiceCostShare(gOPPROF_SRGRY_MEDTBL, dedrow_med, gOPPROF_COPAY, gOPPROF_COINS, med_iter);
		//\\\\\;
		//Recalculate deductible values;
		AMT_STD = gTOT_PAY;
		if(AMT_STD == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gBENEPAY / AMT_STD;
		}
		PRIOR_COINS = COINS;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS = ACTL_COINS_RATE_ACHVD * Exp(-med_iter / gTUNING_PRMTR) + (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Exp(-med_iter / gTUNING_PRMTR));
		med_iter = med_iter + 1;
	} while((med_iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE));
	
	EFF_COINS_NUM_MED = gEFF_COINS_NUM;
	//Set plan paid amount equal to portion of TOTAL spending below the deductible that the plans pays for.;
	ded_maxd_med = computeRowVal(gMaxdCol_MEDTBL.Rng(1), dedrow_med);
	if(gTOT_PAY == 0 ){
      gPLAN_PAY = 0 
    }else {
      gPLAN_PAY = ded_maxd_med * gPLAN_PAY / gTOT_PAY;
	}
	//Set variables to use in HSA Contribution modification, if needed.;
	gBENEPAY_DEDUCT_MED = gBENEPAY;
	gTOT_PAY_MED = gTOT_PAY;
	//store values from medical services loop;
	PLAN_PAY_MED = gPLAN_PAY;
	MOOP_ADJMT_MED = gMOOP_ADJMT;
	//reset variables for rx loop;
	gMOOP_ADJMT = 0;
	gPLAN_PAY = 0;
	gEFF_COINS_NUM = 0;
	//initialize variables;
	COINS = 1;
	PRIOR_COINS = 0;
	ACTL_COINS_RATE_ACHVD = -1;
	do { 
		gMOOP_ADJMT = 0;
		gPLAN_PAY = 0;
		gBENEPAY = 0;
		gTOT_PAY = 0;
		gEFF_COINS_NUM = 0;
		if(COINS == 0 ){
          gADJ_DEDUCT_RX = gADJ_DEDUCT_RX 
        } else {
          gADJ_DEDUCT_RX = gDEDUCT_RX / COINS;
		}
		//determine row of deductible in continuance table;
		dedrow_rx = getContTableRow(gUpToCol_RXTBL.Rng(1), gADJ_DEDUCT_RX);
		//\\\\\;
		//DRUG PROCESSING;
		//\\\\\;
		//Generics;
		ProcessServiceCostShareRX(gRXGEN_RXTBL, dedrow_rx, gRXGEN_COPAY, gRXGEN_COINS, rx_iter);
		//\\\\\;
		//Preferred Brand Drugs;
		ProcessServiceCostShareRX(gRXFORM_RXTBL, dedrow_rx, gRXFORM_COPAY, gRXFORM_COINS, rx_iter);
		//\\\\\;
		//Non-Preferred Brand Drugs;
		ProcessServiceCostShareRX(gRXNONFORM_RXTBL, dedrow_rx, gRXNONFORM_COPAY, gRXNONFORM_COINS, rx_iter);
		//\\\\\;
		//Specialty Drugs;
		ProcessServiceCostShareRX(gRXSPCLTY_RXTBL, dedrow_rx, gRXSPCLTY_COPAY, gRXSPCLTY_COINS, rx_iter);
		//\\\\\;
		//Recalculate deductible values;
		AMT_STD = gTOT_PAY;
		if(AMT_STD == 0 ){
			ACTL_COINS_RATE_ACHVD = 1;
		}else{
			ACTL_COINS_RATE_ACHVD = gBENEPAY / AMT_STD;
		}
		PRIOR_COINS = COINS;
		//Update for next run of loop;
		//This update+initially weights the actual coinsurance rate achieved highly, but as;
		//the number of iterations climbs && the algorithm fails to converge, the update step;
		//puts additional weight on the average of the old && new coinsurance rates.;
		COINS = ACTL_COINS_RATE_ACHVD * Exp(-rx_iter / gTUNING_PRMTR) + (PRIOR_COINS + ACTL_COINS_RATE_ACHVD) / 2 * (1 - Exp(-rx_iter / gTUNING_PRMTR));
		rx_iter = rx_iter + 1;
	} while((rx_iter > gMAX_CONVERGENCE_ITER) || (Abs(PRIOR_COINS - ACTL_COINS_RATE_ACHVD) < gTOLERANCE));
	
	EFF_COINS_NUM_RX = gEFF_COINS_NUM;
	//Set plan paid amount equal to portion of TOTAL spending below the deductible that the plans pays for.;
	ded_maxd_rx = computeRowVal(gMaxdCol_RXTBL.Rng(1), dedrow_rx);
	if(gTOT_PAY == 0 ){
      gPLAN_PAY = 0 
    } else {
      gPLAN_PAY = ded_maxd_rx * gPLAN_PAY / gTOT_PAY;
	}
	//Set variables to use in HSA Contribution modification, if needed.;
	gBENEPAY_DEDUCT_RX = gBENEPAY;
	gTOT_PAY_RX = gTOT_PAY;
	if(gTOT_PAY_MED + gTOT_PAY_RX == 0 ){
		gBENECOINS_DEDUCT = 1;
	}else{
		gBENECOINS_DEDUCT = (gBENEPAY_DEDUCT_RX + gBENEPAY_DEDUCT_MED) / (gTOT_PAY_MED + gTOT_PAY_RX);
	}
	PLAN_PAY_RX = gPLAN_PAY;
	MOOP_ADJMT_RX = gMOOP_ADJMT;
	//\\\\\;
	//Set variables for next subroutine;
	gDEDROW_MED = dedrow_med;
	gDEDROW_RX = dedrow_rx;
	gPLAN_PAY = PLAN_PAY_RX + PLAN_PAY_MED;
	gMOOP_ADJMT_MED = MOOP_ADJMT_MED;
	gMOOP_ADJMT_RX = MOOP_ADJMT_RX;
	gEFF_COINS_NUM_MED = EFF_COINS_NUM_MED;
	gEFF_COINS_NUM_RX = EFF_COINS_NUM_RX;
	gEFF_COINS_DENOM_MED = EFF_COINS_DENOM_MED;
	gEFF_COINS_DENOM_RX = EFF_COINS_DENOM_RX;
}

/**
 * Sub SepDeductCombinedMOOP2_v2
 * return {void}
 */
function SepDeductCombinedMOOP2_v2 () {
	var EFF_COINS_DENOM, EFF_COINS_NUM, DEDUCT_MAXD, DEDUCT_VALUE, DEDUCT_MAXD_ORIG, DEDUCT_VAL_ORIG, dedrow_med_orig, dedrow_rx_orig, dedrow_orig;
	//\\\\\;
	//True MOOP Calculation - allowed spending required for enrollee to reach his || her MOOP;
	EFF_COINS_DENOM = gEFF_COINS_DENOM_MED + gEFF_COINS_DENOM_RX;
	EFF_COINS_NUM = gEFF_COINS_NUM_RX + gEFF_COINS_NUM_MED;
	gEFF_COINS = Math.min(EFF_COINS_NUM / EFF_COINS_DENOM, 1);
	if(gEFF_COINS < 0 || gEFF_COINS > 1 ){
		DebugAssert(fals , "ERROR - Effective Coinsurance OOB");
	}
	//\\\\\;
	//Determine dedrow to use in combined table for coinsurance range cost sharing;
	DEDUCT_MAXD = computeRowVal(gMaxdCol_MEDTBL.Rng(1), gDEDROW_MED) + computeRowVal(gMaxdCol_RXTBL.Rng(1), gDEDROW_RX);
	gDEDROW = getContTableRow(gMaxdCol.Rng(1), DEDUCT_MAXD);
	DEDUCT_VALUE = computeRowVal(gUpToCol.Rng(1), gDEDROW);
	dedrow_med_orig = new CContTableRow();
	dedrow_rx_orig = new CContTableRow();
	dedrow_orig = new CContTableRow();
	dedrow_med_orig = getContTableRow(gUpToCol_MEDTBL.Rng(1), gDEDUCT_MED);
	dedrow_rx_orig = getContTableRow(gUpToCol_RXTBL.Rng(1), gDEDUCT_RX);
	DEDUCT_MAXD_ORIG = computeRowVal(gMaxdCol_MEDTBL.Rng(1), dedrow_med_orig) + computeRowVal(gMaxdCol_RXTBL.Rng(1), dedrow_rx_orig);
	dedrow_orig = getContTableRow(gMaxdCol.Rng(1), DEDUCT_MAXD_ORIG);
	DEDUCT_VAL_ORIG = computeRowVal(gUpToCol.Rng(1), dedrow_orig);
	gMOOP_ADJMT = gMOOP_ADJMT_RX + gMOOP_ADJMT_MED;
	gADJ_MOOP = gMOOP - gMOOP_ADJMT;
	//set equivalent combined deductible equal to MOOP if enrollee has already exceeded MOOP with spending below deductibles.;
	if(gADJ_MOOP < DEDUCT_VAL_ORIG ){
		DEDUCT_VAL_ORIG = gADJ_MOOP;
		gNESTED_DEDUCT_IND = 1;
	}
	gADJ_DEDUCT = DEDUCT_VALUE;
	gDEDUCT = DEDUCT_VAL_ORIG;
	//\\\\\;
	//True MOOP Calculation - allowed spending required for enrollee to reach his || her MOOP;
	if(gADJ_MOOP - gDEDUCT < 0 ){
		DebugAssert(false , "ERROR - Negative COINS_RANGE");
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
	//This part of the algorithm is done completely on the combined table && is exactly the same;
	//as the coinsurance range calculations of the plans that use a combined deductible && MOOP.;
	CombinedMacro2_v2();
}