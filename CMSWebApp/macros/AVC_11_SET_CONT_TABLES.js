/**
 * Sub SetContTable_Combined
 * return {void}
 */
function SetContTable_Combined () {
	gContTableCombined = new CContTable();
	gContTableCombined.MetalTier = gDESIRED_MTIER_NAME;
	gContTableCombined.TableType = "combined";
	ARVConsole("Table="+gDESIRED_MTIER_NAME + "_Combined");
	gContTableCombined.table = sheetCache(gDESIRED_MTIER_NAME + "_Combined");
	
	gContTableCombined.Labels = gCombinedLabels_Arr;
	//\\\\\;
	//assign marginal distributions to variables;
	gUpToCol = gContTableCombined.UpTo;
	gMaxdCol = gContTableCombined.Maxd;
	gER = gContTableCombined.ER;
	if(gCB_IP_COPAY_LMT_IND == 1 ){
		gIP = gContTableCombined.IP(gCB_IPFREQTYPE_IND, gIPDAYSMAX);
	}else{
		gIP = gContTableCombined.IP(gCB_IPFREQTYPE_IND, 0);
	}
	gPC = gContTableCombined.PC(0);
	if(gCB_OFV_LIMIT_IND == 1 ){
		gPCN = gContTableCombined.PC(gPCNVisits);
	}else if (gCB_OFV_COPAY_LMT_IND == 1) {
		gPCN = gContTableCombined.PC(gPCNVisitsCopays);
	}else{
	gPCN = gContTableCombined.PC(0);
	}
	gSP = gContTableCombined.SP;
	gPSY = gContTableCombined.PSY;
	gIMG = gContTableCombined.IMG;
	gST = gContTableCombined.ST;
	gOT = gContTableCombined.OT;
	gPREV = gContTableCombined.PREV;
	gLAB = gContTableCombined.LAB;
	gSNF = gContTableCombined.SNF(gCB_SNFFREQTYPE_IND);
	gUNCL = gContTableCombined.UNCLASSIFIED;
	gXRAY = gContTableCombined.XRAY;
	gXRAY_PC = gContTableCombined.XRAY_PC(gXRAY_OVRD);
	gXRAY_SP = gContTableCombined.XRAY_SP(gXRAY_OVRD);
	gXRAY_UNC = gContTableCombined.XRAY_UNC;
	gOPFAC_PSY = gContTableCombined.OPFAC_PSY(gOPFAC_PSY_OVRD);
	gOPFAC_IMG = gContTableCombined.OPFAC_IMG(gOPFAC_IMG_OVRD);
	gOPFAC_ST = gContTableCombined.OPFAC_ST(gOPFAC_ST_OVRD);
	gOPFAC_OT = gContTableCombined.OPFAC_OT(gOPFAC_OT_OVRD);
	gOPFAC_LAB = gContTableCombined.OPFAC_LAB(gOPFAC_LAB_OVRD);
	gOPFAC_UNC = gContTableCombined.OPFAC_UNC;
	gOPPROF_PSY = gContTableCombined.OPPROF_PSY(gOPPROF_PSY_OVRD);
	gOPPROF_IMG = gContTableCombined.OPPROF_IMG(gOPPROF_IMG_OVRD);
	gOPPROF_ST = gContTableCombined.OPPROF_ST(gOPPROF_ST_OVRD);
	gOPPROF_OT = gContTableCombined.OPPROF_OT(gOPPROF_OT_OVRD);
	gOPPROF_LAB = gContTableCombined.OPPROF_LAB(gOPPROF_LAB_OVRD);
	gOPPROF_SRGRY = gContTableCombined.OPPROF_SRGRY;
	gRXGEN = gContTableCombined.RXGEN;
	gRXFORM = gContTableCombined.RXFORM;
	gRXNONFORM = gContTableCombined.RXNONFORM;
	gRXSPCLTY = gContTableCombined.RXSPCLTY;
}

/**
 * Sub SetContTable_Med_and_Rx
 * return {void}
 */
function SetContTable_Med_and_Rx () {

    gContTableMed = new CContTable();
    gContTableMed.MetalTier = gDESIRED_MTIER_NAME;
    gContTableMed.TableType = "medical";
    gContTableMed.table = sheetCache(gDESIRED_MTIER_NAME + "_Med");
    gContTableMed.Labels = gMedicalLabels_Arr;

    gContTableRx = new CContTable();
    gContTableRx.MetalTier = gDESIRED_MTIER_NAME;
    gContTableRx.TableType = "drug";
    gContTableRx.table = sheetCache(gDESIRED_MTIER_NAME + "_Rx");
    gContTableRx.Labels = gRxLabels_Arr;
    
    //assign marginal distributions to variables
    gUpToCol_MEDTBL = gContTableMed.UpTo;
    gMaxdCol_MEDTBL = gContTableMed.Maxd;
    gER_MEDTBL = gContTableMed.ER;
    if (gCB_IP_COPAY_LMT_IND == 1) {
        gIP_MEDTBL = gContTableMed.IP(gCB_IPFREQTYPE_IND, gIPDAYSMAX);
    }else{
        gIP_MEDTBL = gContTableMed.IP(gCB_IPFREQTYPE_IND, 0);
    }
    
    gPC_MEDTBL = gContTableMed.PC(0);
    if (gCB_OFV_LIMIT_IND == 1) {
        gPCN_MEDTBL = gContTableMed.PC(gPCNVisits);
    }else if (gCB_OFV_COPAY_LMT_IND == 1) {
        gPCN_MEDTBL = gContTableMed.PC(gPCNVisitsCopays);
    }else {
        gPCN_MEDTBL = gContTableMed.PC(0);
    }
    gSP_MEDTBL = gContTableMed.SP;
    gPSY_MEDTBL = gContTableMed.PSY;
    gIMG_MEDTBL = gContTableMed.IMG;
    gST_MEDTBL = gContTableMed.ST;
    gOT_MEDTBL = gContTableMed.OT;
    gPREV_MEDTBL = gContTableMed.PREV;
    gLAB_MEDTBL = gContTableMed.LAB;
    gSNF_MEDTBL = gContTableMed.SNF(gCB_SNFFREQTYPE_IND);
    gUNCL_MEDTBL = gContTableMed.UNCLASSIFIED;
    
    gXRAY_MEDTBL = gContTableMed.XRAY;
    gXRAY_PC_MEDTBL = gContTableMed.XRAY_PC(gXRAY_OVRD);
    gXRAY_SP_MEDTBL = gContTableMed.XRAY_SP(gXRAY_OVRD);
    gXRAY_UNC_MEDTBL = gContTableMed.XRAY_UNC;
    
    gOPFAC_PSY_MEDTBL = gContTableMed.OPFAC_PSY(gOPFAC_PSY_OVRD);
    gOPFAC_IMG_MEDTBL = gContTableMed.OPFAC_IMG(gOPFAC_IMG_OVRD);
    gOPFAC_ST_MEDTBL = gContTableMed.OPFAC_ST(gOPFAC_ST_OVRD);
    gOPFAC_OT_MEDTBL = gContTableMed.OPFAC_OT(gOPFAC_OT_OVRD);
    gOPFAC_LAB_MEDTBL = gContTableMed.OPFAC_LAB(gOPFAC_LAB_OVRD);
    gOPFAC_UNC_MEDTBL = gContTableMed.OPFAC_UNC;
    
    gOPPROF_PSY_MEDTBL = gContTableMed.OPPROF_PSY(gOPPROF_PSY_OVRD);
    gOPPROF_IMG_MEDTBL = gContTableMed.OPPROF_IMG(gOPPROF_IMG_OVRD);
    gOPPROF_ST_MEDTBL = gContTableMed.OPPROF_ST(gOPPROF_ST_OVRD);
    gOPPROF_OT_MEDTBL = gContTableMed.OPPROF_OT(gOPPROF_OT_OVRD);
    gOPPROF_LAB_MEDTBL = gContTableMed.OPPROF_LAB(gOPPROF_LAB_OVRD);
    gOPPROF_SRGRY_MEDTBL = gContTableMed.OPPROF_SRGRY;
    
    gUpToCol_RXTBL = gContTableRx.UpTo;
    gMaxdCol_RXTBL = gContTableRx.Maxd;
    gRXGEN_RXTBL = gContTableRx.RXGEN;
    gRXFORM_RXTBL = gContTableRx.RXFORM;
    gRXNONFORM_RXTBL = gContTableRx.RXNONFORM;
    gRXSPCLTY_RXTBL = gContTableRx.RXSPCLTY;

}
