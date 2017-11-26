//module AVC_7_INITIALIZE skeleton created by excelLiberation@ramblings.mcpher.com at 11/11/2017 6:03:35 AM
/**
 * Sub initialize_values
 * return {void}
 */
function initialize_values () {
  
//    initCheckBoxes();
//    AVCalcTab = new AVGenericTab("AV Calculator"); 
//    HelperTab  = new AVGenericTab("HelperTab");

// Input Values  
//    gCB_INT_DEDUCT_IND = AVCalcTab.CheckBoxes("Checkbox_Int").Value = 1;
//	gCB_IPFREQTYPE_IND = AVCalcTab.CheckBoxes("ip_per_diem").Value = 0;
//	gCB_SNFFREQTYPE_IND = AVCalcTab.CheckBoxes("snf_per_diem").Value = 0;
//	gCB_SEP_MOOP_IND = AVCalcTab.CheckBoxes("Checkbox_Sep").Value = 0;
//	gCB_CSR_IND = AVCalcTab.CheckBoxes("csr_ind").Value = 0;
//  
//    AVCalcTab.CheckBoxes(checkBox2A1Not.specrx_coins_max).Value = 1;
//    AVCalcTab.Range("nrSPECRX_COINS_MAX").Value = 150;
//    AVCalcTab.Range("nrGENCOINS").Value =0.43; 
//  
//    AVCalcTab.Range("nrDEDUCT").Value =0.0;  
//	gDESIRED_MTIER_NUM = "Gold";
//    AVCalcTab.DropDowns("Dropdown_tier").Value = "2";
//    HelperTab.Range("nrDESIRED_MTIER").Value = "2";
  
// Input End  
  
    
    AVCalcTab.Range("nrSTATUS").Value = "Calculation underway.";
    AVCalcTab.Range("nrAVRESULT").Value = "";
    AVCalcTab.Range("nrMETAL_DETERMINATION").Value = "";
    AVCalcTab.Range("nrVERSION").Value = gAVC_VER;
        
    gCombinedLabels_Arr = "UpTo NumOfEnr AvgCostMax AvgCostBucket ER ERFreq IP IPFreq PC PCFreq SP SPFreq PSY PSYFreq IMG IMGFreq ST STFreq OT OTFreq Prev PrevFreq Lab LabFreq Xray XrayFreq Xray_Sp XrayFreq_Sp Xray_PC XrayFreq_PC Xray_Uncl XrayFreq_Uncl SNF SNFFreq Uncl UnclFreq IPDays SNFDays RxGen RxGenFreq RxForm RxFormFreq RxNonForm RxNonFormFreq RxSpclty RxSpcltyFreq Opfac_Psy OpfacFreq_Psy Opprof_Psy OpprofFreq_Psy Opfac_Img OpfacFreq_Img Opprof_Img OpprofFreq_Img Opfac_ST OpfacFreq_ST Opprof_ST OpprofFreq_ST Opfac_OT OpfacFreq_OT Opprof_OT OpprofFreq_OT Opfac_Lab OpfacFreq_Lab Opprof_Lab OpprofFreq_Lab Opfac OpfacFreq Opprof OpprofFreq IPDays1 IPDays2 IPDays3 IPDays4 IPDays5 IPDays6 IPDays7 IPDays8 IPDays9 IPDays10 PC1 PCFreq1 PC2 PCFreq2 PC3 PCFreq3 PC4 PCFreq4 PC5 PCFreq5 PC6 PCFreq6 PC7 PCFreq7 PC8 PCFreq8 PC9 PCFreq9 PC10 PCFreq10".split(' ');

    gMedicalLabels_Arr = "UpTo NumOfEnr AvgCostMax AvgCostBucket ER ERFreq IP IPFreq PC PCFreq SP SPFreq PSY PSYFreq IMG IMGFreq ST STFreq OT OTFreq Prev PrevFreq Lab LabFreq Xray XrayFreq Xray_Sp XrayFreq_Sp Xray_PC XrayFreq_PC Xray_Uncl XrayFreq_Uncl SNF SNFFreq Uncl UnclFreq IPDays SNFDays Opfac_Psy OpfacFreq_Psy Opprof_Psy OpprofFreq_Psy Opfac_Img OpfacFreq_Img Opprof_Img OpprofFreq_Img Opfac_ST OpfacFreq_ST Opprof_ST OpprofFreq_ST Opfac_OT OpfacFreq_OT Opprof_OT OpprofFreq_OT Opfac_Lab OpfacFreq_Lab Opprof_Lab OpprofFreq_Lab Opfac OpfacFreq Opprof OpprofFreq IPDays1 IPDays2 IPDays3 IPDays4 IPDays5 IPDays6 IPDays7 IPDays8 IPDays9 IPDays10 PC1 PCFreq1 PC2 PCFreq2 PC3 PCFreq3 PC4 PCFreq4 PC5 PCFreq5 PC6 PCFreq6 PC7 PCFreq7 PC8 PCFreq8 PC9 PCFreq9 PC10 PCFreq10".split(' ');
                                                
    gRxLabels_Arr = "UpTo NumOfEnr AvgCostMax AvgCostBucket RxGen RxGenFreq RxForm RxFormFreq RxNonForm RxNonFormFreq RxSpclty RxSpcltyFreq".split(' ');
    
    gMedical_Arr = "ER IP PC SP PSY IMG ST OT Prev Lab Xray SNF Opfac Opprof".split(' ');

    gRx_Arr = "RxGen RxForm RxNonForm RxSpclty".split(' ');

    gMedSvcCopayNR_Arr = "nrER_COPAY nrIP_COPAY nrPC_COPAY nrSP_COPAY nrPSY_COPAY nrIMG_COPAY nrST_COPAY nrOT_COPAY nrPREV_COPAY nrLAB_COPAY nrXRAY_COPAY nrSNF_COPAY nrOPFAC_COPAY nrOPPROF_COPAY".split(' ');
    gMedSvcCoinsNR_Arr = "nrER_COINS nrIP_COINS nrPC_COINS nrSP_COINS nrPSY_COINS nrIMG_COINS nrST_COINS nrOT_COINS nrPREV_COINS nrLAB_COINS nrXRAY_COINS nrSNF_COINS nrOPFAC_COINS nrOPPROF_COINS".split(' ');
    
    gRxSvcCopayNR_Arr = "nrRXGEN_COPAY nrRXFORM_COPAY nrRXNONFORM_COPAY nrRXSPCLTY_COPAY".split(' ');
    gRxSvcCoinsNR_Arr = "nrRXGEN_COINS nrRXFORM_COINS nrRXNONFORM_COINS nrRXSPCLTY_COINS".split(' ');

    gERROR_FLAG = 0

}