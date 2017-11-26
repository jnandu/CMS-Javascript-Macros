/**
 * Sub process_av
 * return {void}
 */
function process_av () {
	gSTATUS_MSG = "";
	if(gCB_CSR_IND == 0 ){
		switch( true){
			case (gAV >= 0.88 && gAV <= 0.92):
				gACTUAL_MTIER_NUM = 1;
				gMTIER_NAME = "Platinum";
				break;
			case (gAV >= 0.78 && gAV <= 0.82):
				gACTUAL_MTIER_NUM = 2;
				gMTIER_NAME = "Gold";
				break;
			case (gAV >= 0.68 && gAV <= 0.72):
				gACTUAL_MTIER_NUM = 3;
				gMTIER_NAME = "Silver";
				break;
			case (gAV >= 0.58 && gAV <= 0.72):
				gACTUAL_MTIER_NUM = 4;
				gMTIER_NAME = "Bronze";
				break;
			default:
				gACTUAL_MTIER_NUM = -1;
				gMTIER_NAME = "";
				gSTATUS_MSG = "Error: Result is outside of +/- 2 percent de minimis variation.";
				break;
		}
	}else{
		if(gAV >= 0.93 && gAV <= 0.95 && Optional_Standards_Userform.CSR3.Value == "True" ){
            gACTUAL_MTIER_NUM = 1;
            gMTIER_NAME = "Platinum";
            gSTATUS_MSG = "CSR Level of 94% (100-150% FPL), ";
		}else if (gAV >= 0.86 && gAV <= 0.88 && Optional_Standards_Userform.CSR2.Value == "True") {
            gACTUAL_MTIER_NUM = 2;
            gMTIER_NAME = "Gold";
            gSTATUS_MSG = "CSR Level of 87% (150-200% FPL), ";
		}else if (gAV >= 0.72 && gAV <= 0.74 && Optional_Standards_Userform.CSR1.Value == "True") {
            gACTUAL_MTIER_NUM = 3
            gMTIER_NAME = "Silver";
            gSTATUS_MSG = "CSR Level of 73% (200-250% FPL), ";
		}else if (gAV >= 0.58 && gAV <= 0.65 && Optional_Standards_Userform.ExpandedBronze.Value == "True") {
            gACTUAL_MTIER_NUM = 4
            gMTIER_NAME = "Bronze"
            gSTATUS_MSG = "Expanded Bronze Standard (58% to 65%); "
		}else{
			gACTUAL_MTIER_NUM = -1;
			gMTIER_NAME = "";
//			if (Optional_Standards_Userform.ExpandedBronze.Value == "True") {
//				gSTATUS_MSG = "Error: Result is outside of de minimis variation for Expanded Bronze."
//            }else if ( Optional_Standards_Userform.CSR1.Value == "True" || Optional_Standards_Userform.CSR2.Value == "True" || Optional_Standards_Userform.CSR3.Value == "True" ) {
//				gSTATUS_MSG = "Error: Result is outside of +/- 1 percent de minimis variation for CSRs."
//			}else{
//				gSTATUS_MSG = "Error: CSR/Expand Bronze AV Standard Checkbox Enabled, But No Option Selected."
//			}
		}
	}
	if(gACTUAL_MTIER_NUM == gDESIRED_MTIER_NUM ){
		if(gNESTED_DEDUCT_IND == 1 ){
			gSTATUS_MSG = gSTATUS_MSG + "Calculation Successful, Nested Deductibles Used.";
		}else{
			gSTATUS_MSG = gSTATUS_MSG + "Calculation Successful.";
		}
	}else if (gACTUAL_MTIER_NUM > 0) {
			gSTATUS_MSG = "Calculation resolved without matching metal tiers.";
	}
	gNOTE_MSG = "";
	if(gNOTE_XRAY_OVRD == 1 ){
		gNOTE_MSG = "Office visit-specific cost-sharing applying to x-rays in office settings. ";
	}
	if(gNOTE_OP_OVRD == 1 ){
		gNOTE_MSG = gNOTE_MSG + "Service-specific cost-sharing applying for service(s) with fac/prof components, overriding outpatient inputs for those service(s)."
	}
}
