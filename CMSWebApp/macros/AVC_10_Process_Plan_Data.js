/**
 * Sub process_plan_data
 * return {void}
 */
function process_plan_data () {
	var nvar, kvar;
	//set unchecked checkbox values to zero instead of -4146;
	if(gCB_INT_DEDUCT_IND != 1 ){
		gCB_INT_DEDUCT_IND = 0;
	}
	if(gCB_SEP_MOOP_IND != 1 ){
		gCB_SEP_MOOP_IND = 0;
	}
	if(gCB_HSA_IND != 1 ){
		gCB_HSA_IND = 0;
	}
	if(gCB_SPECRX_LIMIT_IND != 1 ){
		gCB_SPECRX_LIMIT_IND = 0;
	}
	if(gCB_OFV_LIMIT_IND != 1 ){
		gCB_OFV_LIMIT_IND = 0;
	}
	if(gCB_OFV_COPAY_LMT_IND != 1 ){
		gCB_OFV_COPAY_LMT_IND = 0;
	}
	if(gCB_IP_COPAY_LMT_IND != 1 ){
		gCB_IP_COPAY_LMT_IND = 0;
	}
	if(gCB_IPFREQTYPE_IND != 1 ){
		gCB_IPFREQTYPE_IND = 0;
	}
	if(gCB_SNFFREQTYPE_IND != 1 ){
		gCB_SNFFREQTYPE_IND = 0;
	}
	if(gCB_CSR_IND != 1 ){
		gCB_CSR_IND = 0;
	}
	if(gCB_MULTITIER_PLAN != 1 ){
		gCB_MULTITIER_PLAN = 0;
	}
	//if additional benefits enabled with no information given, then;
	//disable.;
	if(gCB_SPECRX_LIMIT_IND == 1 && !(AVCalcTab.Range("nrSPECRX_COINS_MAX").Value) ){
		gCB_SPECRX_LIMIT_IND = 0;
	}
	if(gCB_IP_COPAY_LMT_IND == 1 && !(AVCalcTab.Range("nrIP_COPAY_LIMIT").Value) ){
		gCB_IP_COPAY_LMT_IND = 0;
	}
	if(gCB_INT_DEDUCT_IND == 0 && gCB_SEP_MOOP_IND == 0 ){
		gMOOP = gMOOP_COMBINED_SEP_DED;
	}
	for(nvar=LBound(gMedical_Arr); nvar<UBound(gMedical_Arr); nvar++){
		gSTDED_ARR[nvar] = Math.max(gSTDED_ARR[nvar], 0);
		gSTCOINS_ARR[nvar] = Math.max(gSTCOINS_ARR[nvar], 0);
		gOMIT_ARR[nvar] = Math.max(gOMIT_ARR[nvar], 0);
	}
	for(kvar=LBound(gRx_Arr); kvar<UBound(gRx_Arr); kvar++){
		gSTDEDRX_ARR[kvar] = Math.max(gSTDEDRX_ARR[kvar], 0);
		gSTCOINSRX_ARR[kvar] = Math.max(gSTCOINSRX_ARR[kvar], 0);
		gOMITRX_ARR[kvar] = Math.max(gOMITRX_ARR[kvar], 0);
	}
	//limit HSA contribution to deductible total;
	if(gCB_INT_DEDUCT_IND == 0 ){
		gHSA_CONTRBTN = Math.min(gHSA_CONTRBTN, gDEDUCT_RX + gDEDUCT_MED);
	}else{
		gHSA_CONTRBTN = Math.min(gHSA_CONTRBTN, gDEDUCT);
	}
	//\\\\\;
	//Set override flags;
	gXRAY_OVRD = 0;
	gOPFAC_PSY_OVRD = 0;
	gOPFAC_IMG_OVRD = 0;
	gOPFAC_ST_OVRD = 0;
	gOPFAC_OT_OVRD = 0;
	gOPFAC_LAB_OVRD = 0;
	gOPPROF_PSY_OVRD = 0;
	gOPPROF_IMG_OVRD = 0;
	gOPPROF_ST_OVRD = 0;
	gOPPROF_OT_OVRD = 0;
	gOPPROF_LAB_OVRD = 0;
	gNOTE_XRAY_OVRD = 0;
	gNOTE_OP_OVRD = 0;
	//Check if X-Ray has any special cost sharing; if so, set override flag to 1.  X-ray cost-sharing will then;
	//take;
	//precedence over PC && SP special cost-sharing.;
	if(ChkSpclCS("Xray", gXRAY_COPAY, gXRAY_COINS) == 1 ){
		gXRAY_OVRD = 1;
	}else if (ChkSpclCS("pc", gPC_COPAY, gPC_COINS) == 1 || ChkSpclCS("sp", gSP_COPAY, gSP_COINS) == 1) {
		//Display status message indicating that PC/SP cost-sharing overrides X-ray cost-sharing in an office setting.;
		gNOTE_XRAY_OVRD = 1;
	}
	//OPFAC/OPPROF special cost sharing works directly opposite of X-ray special cost sharing; whereas special X-ray cost sharing;
	//takes precedence over PC && SP special cost sharing, OPFAC/OPPROF special cost sharing is secondary to service-specific special;
	//cost sharing.;
//    ARVConsole("gOPFAC_COINS="+gOPFAC_COINS);
//  ARVConsole("gOPFAC_COPAY="+gOPFAC_COPAY);
//  ARVConsole("ChkSpclCS(opfac, gOPFAC_COPAY, gOPFAC_COINS)="+ChkSpclCS("opfac", gOPFAC_COPAY, gOPFAC_COINS));
	if(ChkSpclCS("Opfac", gOPFAC_COPAY, gOPFAC_COINS) == 1 ){
		//If OPFAC has special cost sharing, then;
		//set override flags to 1...;
		gOPFAC_PSY_OVRD = 1;
		gOPFAC_IMG_OVRD = 1;
		gOPFAC_ST_OVRD = 1;
		gOPFAC_OT_OVRD = 1;
		gOPFAC_LAB_OVRD = 1;
		//...but if service-specific cost sharing exists, set override flag to 0.;
//          ARVConsole("gPSY_COPAY="+gPSY_COPAY);
//  ARVConsole("gPSY_COINS="+gPSY_COINS);
//      ARVConsole("ChkSpclCS(psy, gPSY_COPAY, gPSY_COINS)="+ChkSpclCS("psy", gPSY_COPAY, gPSY_COINS));
		if(ChkSpclCS("PSY", gPSY_COPAY, gPSY_COINS) == 1 ){
			gOPPROF_PSY_OVRD = 0;
			gOPFAC_PSY_OVRD = 0;
			gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("IMG", gIMG_COPAY, gIMG_COINS) == 1 ){
		gOPPROF_IMG_OVRD = 0;
		gOPFAC_IMG_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("ST", gST_COPAY, gST_COINS) == 1 ){
		gOPPROF_ST_OVRD = 0;
		gOPFAC_ST_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("IMG", gOT_COPAY, gOT_COINS) == 1 ){
		gOPPROF_OT_OVRD = 0;
		gOPFAC_OT_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("Lab", gLAB_COPAY, gLAB_COINS) == 1 ){
		gOPPROF_LAB_OVRD = 0;
		gOPFAC_LAB_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
	}
	if(ChkSpclCS("Opprof", gOPPROF_COPAY, gOPPROF_COINS) == 1 ){
		//If OPPROF has special cost sharing, then;
		//set override flags to 1...;
		gOPPROF_PSY_OVRD = 1;
		gOPPROF_IMG_OVRD = 1;
		gOPPROF_ST_OVRD = 1;
		gOPPROF_OT_OVRD = 1;
		gOPPROF_LAB_OVRD = 1;
		//...but if service-specific cost sharing exists, set override flag to 0.;
		if(ChkSpclCS("PSY", gPSY_COPAY, gPSY_COINS) == 1 ){
		gOPPROF_PSY_OVRD = 0;
		gOPPROF_PSY_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("IMG", gIMG_COPAY, gIMG_COINS) == 1 ){
		gOPPROF_IMG_OVRD = 0;
		gOPPROF_IMG_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("ST", gST_COPAY, gST_COINS) == 1 ){
		gOPPROF_ST_OVRD = 0;
		gOPPROF_ST_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("IMG", gOT_COPAY, gOT_COINS) == 1 ){
		gOPPROF_OT_OVRD = 0;
		gOPPROF_OT_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
		if(ChkSpclCS("Lab", gLAB_COPAY, gLAB_COINS) == 1 ){
		gOPPROF_LAB_OVRD = 0;
		gOPPROF_LAB_OVRD = 0;
		gNOTE_OP_OVRD = 1;
		}
	}
}
