/**
 * Function CalcAV
 * @param {string} [optVTIERNUM=]
 * return {string}
 */
function CalcAV (optVTIERNUM) {
    var vTIERNUM = (typeof optVTIERNUM == 'undefined' ? "" : optVTIERNUM );

	process_plan_data();
	SetContTable_Combined();
	SetContTable_Med_and_Rx();
	if(gCB_INT_DEDUCT_IND == 1 ){
		CombinedMacro_v2();
		CombinedMacro2_v2();
	}else if (gCB_INT_DEDUCT_IND == 0 && gCB_SEP_MOOP_IND == 0) {
		SepDeductCombinedMOOP_v2();
		SepDeductCombinedMOOP2_v2();
	}else if (gCB_INT_DEDUCT_IND == 0 && gCB_SEP_MOOP_IND == 1) {
		SepMacro_v2();
		SepMacro2_v2();
	}
	return gAV;
}