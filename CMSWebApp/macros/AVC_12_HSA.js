/**
 * Function HSA_ADJUSTMENT
 * @param {number} vAV
 * return {number}
 */
function HSA_ADJUSTMENT (vAV){
	var HSA_ROW, HSA_VALUE, AV_DENOM, BENEPAY, HSA_ADJ, HSA_MOD_AV, ROW;
	HSA_ROW = new CContTableRow();
	if(gBENECOINS_DEDUCT == 0 ){
		ROW = 0 
	}else {
		ROW = gHSA_CONTRBTN / gBENECOINS_DEDUCT;
	}
	HSA_ROW = getContTableRow(gUpToCol.Rng(1), ROW);
	HSA_VALUE = computeRowVal(gMaxdCol.Rng(1), HSA_ROW) * gBENECOINS_DEDUCT;
	AV_DENOM = gMaxdCol.Rng(1).getValue(gBottomRow, 0);
    ARVConsole("HSA_VALUE="+HSA_VALUE);
	BENEPAY = (1 - vAV) * AV_DENOM;
  ARVConsole("BENEPAY="+BENEPAY);
  ARVConsole("vAV="+vAV);
  ARVConsole("AV_DENOM="+AV_DENOM);

    HSA_ADJ = Math.min(BENEPAY, HSA_VALUE);
	HSA_MOD_AV = (vAV * AV_DENOM + HSA_ADJ) / AV_DENOM;
	return HSA_MOD_AV;
}