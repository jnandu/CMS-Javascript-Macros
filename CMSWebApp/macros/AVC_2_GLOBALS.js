var FinalAVR={};
//Data Config
//Platinum_Med Config
var Plat_Med_StartRow=1;
var Plat_Med_StartCol=1;
var Plat_Med_NumRows=87;
var Plat_Med_NumCols=92;

//Platinum_Combined Config
var Plat_Combined_StartRow=1;
var Plat_Combined_StartCol=1;
var Plat_Combined_NumRows=87;
var Plat_Combined_NumCols=100;

//Platinum_Rx Config
var Plat_Rx_StartRow=1;
var Plat_Rx_StartCol=1;
var Plat_Rx_NumRows=87;
var Plat_Rx_NumCols=12;

//Gold_Med Config
var Gold_Med_StartRow=1;
var Gold_Med_StartCol=1;
var Gold_Med_NumRows=87;
var Gold_Med_NumCols=92;

//Gold_Combined Config
var Gold_Combined_StartRow=1;
var Gold_Combined_StartCol=1;
var Gold_Combined_NumRows=87;
var Gold_Combined_NumCols=100;

//Gold_Rx Config
var Gold_Rx_StartRow=1;
var Gold_Rx_StartCol=1;
var Gold_Rx_NumRows=87;
var Gold_Rx_NumCols=12;

//Silver_Med Config
var Silver_Med_StartRow=1;
var Silver_Med_StartCol=1;
var Silver_Med_NumRows=87;
var Silver_Med_NumCols=92;

//Silver_Combined Config
var Silver_Combined_StartRow=1;
var Silver_Combined_StartCol=1;
var Silver_Combined_NumRows=87;
var Silver_Combined_NumCols=100;

//Silver_Rx Config
var Silver_Rx_StartRow=1;
var Silver_Rx_StartCol=1;
var Silver_Rx_NumRows=87;
var Silver_Rx_NumCols=12;

//Bronze_Med Config
var Bronze_Med_StartRow=1;
var Bronze_Med_StartCol=1;
var Bronze_Med_NumRows=87;
var Bronze_Med_NumCols=92;

//Bronze_Combined Config
var Bronze_Combined_StartRow=1;
var Bronze_Combined_StartCol=1;
var Bronze_Combined_NumRows=87;
var Bronze_Combined_NumCols=100;

//Bronze_Rx Config
var Bronze_Rx_StartRow=1;
var Bronze_Rx_StartCol=1;
var Bronze_Rx_NumRows=87;
var Bronze_Rx_NumCols=12;

//Sheets Constants
var AVCalcTab;
var HelperTab;
var checkBox2A1Not;

//constants;
var gAVC_VER = "";
var gMedArrSize = 13;
var gRxArrSize = 3;
var gBottomRow = 87;
var gMOOPMAX = 7600;
var gDISABLE_IMAGE = 0;
var gTOLERANCE = 0.00001;
var gMAX_CONVERGENCE_ITER = 50;
var gTUNING_PRMTR = 5;

//custom classes;
var gContTableCombined;
var gContTableMed;
var gContTableRx;

var gDEDROW;
var gDEDROW_MED;
var gDEDROW_RX;

//marginal distributions;
var gUpToCol;
var gMaxdCol;

var gER;
var gIP;
var gPC;
var gPCN;
var gSP;
var gPSY;
var gIMG;
var gST;
var gOT;
var gPREV;
var gLAB;
var gSNF;
var gUNCL;

var gXRAY;
var gXRAY_PC;
var gXRAY_SP;
var gXRAY_UNC;

var gOPFAC_PSY;
var gOPFAC_IMG;
var gOPFAC_ST;
var gOPFAC_OT;
var gOPFAC_LAB;
var gOPFAC_UNC;

var gOPPROF_PSY;
var gOPPROF_IMG;
var gOPPROF_ST;
var gOPPROF_OT;
var gOPPROF_LAB;
var gOPPROF_SRGRY;

var gRXGEN;
var gRXFORM;
var gRXNONFORM;
var gRXSPCLTY;

var gUpToCol_MEDTBL;
var gMaxdCol_MEDTBL;

var gER_MEDTBL;
var gIP_MEDTBL;
var gPC_MEDTBL;
var gPCN_MEDTBL;
var gSP_MEDTBL;
var gPSY_MEDTBL;
var gIMG_MEDTBL;
var gST_MEDTBL;
var gOT_MEDTBL;
var gPREV_MEDTBL;
var gLAB_MEDTBL;
var gSNF_MEDTBL;
var gUNCL_MEDTBL;

var gXRAY_MEDTBL;
var gXRAY_PC_MEDTBL;
var gXRAY_SP_MEDTBL;
var gXRAY_UNC_MEDTBL;

var gOPFAC_PSY_MEDTBL;
var gOPFAC_IMG_MEDTBL;
var gOPFAC_ST_MEDTBL;
var gOPFAC_OT_MEDTBL;
var gOPFAC_LAB_MEDTBL;
var gOPFAC_UNC_MEDTBL;

var gOPPROF_PSY_MEDTBL;
var gOPPROF_IMG_MEDTBL;
var gOPPROF_ST_MEDTBL;
var gOPPROF_OT_MEDTBL;
var gOPPROF_LAB_MEDTBL;
var gOPPROF_SRGRY_MEDTBL;

var gUpToCol_RXTBL;
var gMaxdCol_RXTBL;

var gRXGEN_RXTBL;
var gRXFORM_RXTBL;
var gRXNONFORM_RXTBL;
var gRXSPCLTY_RXTBL;

//arrays;
var gCombinedLabels_Arr=[];
var gMedicalLabels_Arr=[];
var gRxLabels_Arr=[];
var gMedical_Arr=[];
var gRx_Arr=[];

var gMedSvcCopayNR_Arr=[];
var gMedSvcCoinsNR_Arr=[];
var gRxSvcCopayNR_Arr=[];
var gRxSvcCoinsNR_Arr=[];

var gSTDED_ARR=[];
var gSTCOINS_ARR=[];
var gOMIT_ARR=[];
var gSTDEDRX_ARR=[];
var gSTCOINSRX_ARR=[];
var gOMITRX_ARR=[];


//checkboxes;
var gCB_INT_DEDUCT_IND;
var gCB_SEP_MOOP_IND;
var gCB_HSA_IND;
var gCB_SPECRX_LIMIT_IND;
var gCB_OFV_LIMIT_IND;
var gCB_OFV_COPAY_LMT_IND;
var gCB_IP_COPAY_LMT_IND;
var gCB_IPFREQTYPE_IND;
var gCB_SNFFREQTYPE_IND;
var gCB_CSR_IND;
var gCB_MULTITIER_PLAN;

//plan parameters;
var gDEDUCT;
var gDEDUCT_MED;
var gDEDUCT_RX;
var gGENCOINS;
var gGENCOINS_MED;
var gGENCOINS_RX;
var gMOOP;
var gMOOP_MED;
var gMOOP_RX;
var gMOOP_COMBINED_SEP_DED;

var gDESIRED_MTIER_NUM;
var gDESIRED_MTIER_NAME;
var gACTUAL_MTIER_NUM;
var gMTIER_NAME;

var gHSA_CONTRBTN;

var gTIER1_UTIL;
var gTIER2_UTIL;

var gER_COINS;
var gIP_COINS;
var gPC_COINS;
var gSP_COINS;
var gPSY_COINS;
var gIMG_COINS;
var gST_COINS;
var gOT_COINS;
var gPREV_COINS;
var gLAB_COINS;
var gXRAY_COINS;
var gSNF_COINS;
var gOPFAC_COINS;
var gOPPROF_COINS;

var gRXGEN_COINS;
var gRXFORM_COINS;
var gRXNONFORM_COINS;
var gRXSPCLTY_COINS;

var gER_COPAY;
var gIP_COPAY;
var gPC_COPAY;
var gSP_COPAY;
var gPSY_COPAY;
var gIMG_COPAY;
var gST_COPAY;
var gOT_COPAY;
var gPREV_COPAY;
var gLAB_COPAY;
var gXRAY_COPAY;
var gSNF_COPAY;
var gOPFAC_COPAY;
var gOPPROF_COPAY;

var gRXGEN_COPAY;
var gRXFORM_COPAY;
var gRXNONFORM_COPAY;
var gRXSPCLTY_COPAY;

var gIPDAYSMAX;
var gPCNVisits;
var gPCNVisitsCopays;
var gSPECRXCoinsMax;

//other vars;
var gSTATUS_MSG;
var gNOTE_MSG;

var gXRAY_OVRD;
var gOPFAC_PSY_OVRD;
var gOPFAC_IMG_OVRD;
var gOPFAC_ST_OVRD;
var gOPFAC_OT_OVRD;
var gOPFAC_LAB_OVRD;
   ;
var gOPPROF_PSY_OVRD;
var gOPPROF_IMG_OVRD;
var gOPPROF_ST_OVRD;
var gOPPROF_OT_OVRD;
var gOPPROF_LAB_OVRD;

var gNOTE_XRAY_OVRD;
var gNOTE_OP_OVRD;

var gAV;
var gBENEPAY;
var gBENEPAY_COINSRNG;
var gNESTED_DEDUCT_IND;
var gERROR_FLAG;

var gPLAN_PAY;
var gPLAN_PAY_COINSRNG;

var gTOT_PAY;
var gTOT_PAY_MED;
var gTOT_PAY_RX;
var gBENEPAY_DEDUCT_MED;
var gBENEPAY_DEDUCT_RX;
var gBENECOINS_DEDUCT;

var gDEDUCT_ADJMT;
var gMOOP_ADJMT;
var gMOOP_ADJMT_MED;
var gMOOP_ADJMT_RX;

var gADJ_DEDUCT;
var gADJ_DEDUCT_MED;
var gADJ_DEDUCT_RX;

var gADJ_MOOP;
var gADJ_MOOP_MED;
var gADJ_MOOP_RX;

var gTROOP;
var gTROOP_MED;
var gTROOP_RX;

var gEFF_COINS;
var gEFF_COINS_MED;
var gEFF_COINS_RX;

var gEFF_COINS_NUM;
var gEFF_COINS_NUM_MED;
var gEFF_COINS_NUM_RX;

var gEFF_COINS_DENOM_MED;
var gEFF_COINS_DENOM_RX;

var gAV_DENOM;

