var app = angular.module("MyHealthMarket", []); 
app.controller("healthMainCtrl",  function($scope, $window) {
	var inputParam;
	var now;
	InitModelObjects($scope);
	inputParam = $scope;
	inputParam.output.message ="";
	inputParam.output.duration = 0;
	inputParam.output.avresult = 0;
	FinalAVR = {};
	$scope.executeMacro = function () {
		now = new Date();
		if ($scope.InputAVCalc.plan == undefined) {
			if (confirm("Defaulting all the input fields")) {
				ResetModelObject($scope);
			}else {
				ResetModelObject($scope);
			}
		}
		CalculateARV(inputParam.InputAVCalc, 0);
		inputParam.output.avresult = (FinalAVR.gAV)?FinalAVR.gAV:"";
		ARVConsole("Final AVR ="+ (FinalAVR.gAV)?FinalAVR.gAV:"");
		var duration = (new Date() - now)/1000;
		inputParam.output.duration = duration;
		inputParam.output.message = FinalAVR.gSTATUS_MSG;
		inputParam.output.notes = FinalAVR.gNOTE_MSG;
		inputParam.output.metalTier = FinalAVR.gMTIER_NAME;
	};
	$scope.resetModelObjects = function() {
		if ($scope.InputAVCalc.plan != undefined) {
			if (confirm("Your inputs will be lost. Press ok to save and reset, Press Cancel to reset")) {
				$scope.saveModelObjects($scope);
				ResetModelObject($scope);
			}else {
				ResetModelObject($scope);
			}
		} else {
			ResetModelObject($scope);
		}
	};
	$scope.saveModelObjects = function () {
		$window.sessionStorage.setItem('AVCModelObjects', JSON.stringify(inputParam.InputAVCalc));
	};
	$scope.restoreModelObjects = function () {
		var InputObj = $window.sessionStorage.getItem('AVCModelObjects');
		inputParam.InputAVCalc = JSON.parse(InputObj);
	};

});
function InitModelObjects($scope) {
	$scope.InputAVCalc = {};
	$scope.output = {};
};
function ResetModelObject(scope) {
	scope.InputAVCalc.plan = {};
	scope.InputAVCalc.plan.Checkbox_Int =0;
	scope.InputAVCalc.plan.ip_per_diem = 0;
	scope.InputAVCalc.plan.snf_per_diem = 0;
	scope.InputAVCalc.plan.Checkbox_Sep = 0;
	scope.InputAVCalc.plan.csr_ind = 2;
	scope.InputAVCalc.plan.Dropdown_tier = 2;
  
 
	scope.InputAVCalc.optionAddition = {};  
	scope.InputAVCalc.optionAddition.specrx_coins_max = 1;
	scope.InputAVCalc.optionAddition.nrSPECRX_COINS_MAX = 150;
	scope.InputAVCalc.optionAddition.ip_copay_limit = 0;
	scope.InputAVCalc.optionAddition.nrIP_COPAY_LIMIT = 0;
	scope.InputAVCalc.optionAddition.ofv_limit = 0;
	scope.InputAVCalc.optionAddition.nrOFV_LIMIT = 0;
	scope.InputAVCalc.optionAddition.ofv_copay_limit = 0;
	scope.InputAVCalc.optionAddition.nrOFV_COPAY_LIMIT = 0;
  
  
	scope.InputAVCalc.HSA_HRA = {};
	scope.InputAVCalc.HSA_HRA.hsa = 0;
	scope.InputAVCalc.HSA_HRA.nrHSA_CNTRBTN = 0;
  
	scope.InputAVCalc.TNOption = {};
	scope.InputAVCalc.TNOption.MULTITIER_PLAN = 0;
	scope.InputAVCalc.TNOption.nrTIER1_UTIL = 0;
	scope.InputAVCalc.TNOption.nrTIER2_UTIL = 0;
	
	scope.InputAVCalc.Tier1Plan = {};
	scope.InputAVCalc.Tier1Plan.Medical = {};
	scope.InputAVCalc.Tier1Plan.Medical.nrDEDUCT_MED = 0;
	scope.InputAVCalc.Tier1Plan.Medical.nrGENCOINS_MED = 0;
	scope.InputAVCalc.Tier1Plan.Medical.nrMOOP_COMBINED_SEP_DED = 0;
	scope.InputAVCalc.Tier1Plan.Medical.nrMOOP_MED = 0;

	scope.InputAVCalc.Tier1Plan.Drug = {};
	scope.InputAVCalc.Tier1Plan.Drug.nrDEDUCT_RX = 0;
	scope.InputAVCalc.Tier1Plan.Drug.nrGENCOINS_RX = 0;
	scope.InputAVCalc.Tier1Plan.Drug.nrMOOP_RX = 0;
	
	scope.InputAVCalc.Tier1Plan.Combined = {};
	scope.InputAVCalc.Tier1Plan.Combined.nrDEDUCT = 0;
	scope.InputAVCalc.Tier1Plan.Combined.nrGENCOINS = 0;
	scope.InputAVCalc.Tier1Plan.Combined.nrMOOP_COMBINED = 0;
	
	scope.InputAVCalc.Tier2Plan = {};
	scope.InputAVCalc.Tier2Plan.Medical = {};
	scope.InputAVCalc.Tier2Plan.Medical.nrDEDUCT_MED2 = 0;
	scope.InputAVCalc.Tier2Plan.Medical.nrGENCOINS_MED2 = 0;
	scope.InputAVCalc.Tier2Plan.Medical.nrMOOP_COMBINED_SEP_DED2 = 0;
	scope.InputAVCalc.Tier2Plan.Medical.nrMOOP_MED2 = 0;
		
	scope.InputAVCalc.Tier2Plan.Drug = {};
	scope.InputAVCalc.Tier2Plan.Drug.nrDEDUCT_RX2 = 0;
	scope.InputAVCalc.Tier2Plan.Drug.nrGENCOINS_RX2 = 0;
	scope.InputAVCalc.Tier2Plan.Drug.nrMOOP_RX2 = 0;

	scope.InputAVCalc.Tier2Plan.Combined = {};
	scope.InputAVCalc.Tier2Plan.Combined.nrDEDUCT2 = 0;
	scope.InputAVCalc.Tier2Plan.Combined.nrGENCOINS2 = 0;
	scope.InputAVCalc.Tier2Plan.Combined.nrMOOP_COMBINED2 = 0;

	scope.InputAVCalc.ded = {};
	scope.InputAVCalc.ded.ded_med_all = 0;
	scope.InputAVCalc.ded.ded_ER = 0;
	scope.InputAVCalc.ded.ded_IP = 0;
	scope.InputAVCalc.ded.ded_PC = 0;
	scope.InputAVCalc.ded.ded_SP = 0;
	scope.InputAVCalc.ded.ded_PSY = 0;
	scope.InputAVCalc.ded.ded_IMG = 0;
	scope.InputAVCalc.ded.ded_ST = 0;
	scope.InputAVCalc.ded.ded_OT = 0;
	scope.InputAVCalc.ded.ded_Prev = 0;
	scope.InputAVCalc.ded.ded_Lab = 0;
	scope.InputAVCalc.ded.ded_Xray = 0;
	scope.InputAVCalc.ded.ded_SNF = 0;
	scope.InputAVCalc.ded.ded_Opfac = 0;
	scope.InputAVCalc.ded.ded_Opprof = 0;
	scope.InputAVCalc.ded.ded_rx_all = 0;
	scope.InputAVCalc.ded.ded_RxGen = 0;
	scope.InputAVCalc.ded.ded_RxForm = 0;
	scope.InputAVCalc.ded.ded_RxNonForm = 0;
	scope.InputAVCalc.ded.ded_RxSpclty = 0;

	scope.InputAVCalc.coinst = {};
	scope.InputAVCalc.coinst.nrER_COINS = 0;
	scope.InputAVCalc.coinst.nrIP_COINS = 0;
	scope.InputAVCalc.coinst.nrPC_COINS = 0;
	scope.InputAVCalc.coinst.nrSP_COINS = 0;
	scope.InputAVCalc.coinst.nrPSY_COINS = 0;
	scope.InputAVCalc.coinst.nrIMG_COINS = 0;
	scope.InputAVCalc.coinst.nrST_COINS = 0;
	scope.InputAVCalc.coinst.nrOT_COINS = 0;
	scope.InputAVCalc.coinst.nrPREV_COINS = 0;
	scope.InputAVCalc.coinst.nrLAB_COINS = 0;
	scope.InputAVCalc.coinst.nrXRAY_COINS = 0;
	scope.InputAVCalc.coinst.nrSNF_COINS = 0;
	scope.InputAVCalc.coinst.nrOPFAC_COINS = 0;
	scope.InputAVCalc.coinst.nrOPPROF_COINS = 0;
	scope.InputAVCalc.coinst.nrRXGEN_COINS = 0;
	scope.InputAVCalc.coinst.nrRXFORM_COINS = 0;
	scope.InputAVCalc.coinst.nrRXNONFORM_COINS = 0;
	scope.InputAVCalc.coinst.nrRXSPCLTY_COINS = 0;
	

	scope.InputAVCalc.coins = {};
	scope.InputAVCalc.coins.coins_med_all = 0;
	scope.InputAVCalc.coins.coins_ER = 0;
	scope.InputAVCalc.coins.coins_IP = 0;
	scope.InputAVCalc.coins.coins_PC = 0;
	scope.InputAVCalc.coins.coins_SP = 0;
	scope.InputAVCalc.coins.coins_PSY = 0;
	scope.InputAVCalc.coins.coins_IMG = 0;
	scope.InputAVCalc.coins.coins_ST = 0;
	scope.InputAVCalc.coins.coins_OT = 0;
	scope.InputAVCalc.coins.coins_Prev = 0;
	scope.InputAVCalc.coins.coins_Lab = 0;
	scope.InputAVCalc.coins.coins_Xray = 0;
	scope.InputAVCalc.coins.coins_SNF = 0;
	scope.InputAVCalc.coins.coins_Opfac = 0;
	scope.InputAVCalc.coins.coins_Opprof = 0;
	scope.InputAVCalc.coins.coins_rx_all = 0;
	scope.InputAVCalc.coins.coins_RxGen = 0;
	scope.InputAVCalc.coins.coins_RxForm = 0;
	scope.InputAVCalc.coins.coins_RxNonForm = 0;
	scope.InputAVCalc.coins.coins_RxSpclty = 0;

	scope.InputAVCalc.copay = {};
	scope.InputAVCalc.copay.nrER_COPAY = 0;
	scope.InputAVCalc.copay.nrIP_COPAY = 0;
	scope.InputAVCalc.copay.nrPC_COPAY = 0;
	scope.InputAVCalc.copay.nrSP_COPAY = 0;
	scope.InputAVCalc.copay.nrPSY_COPAY = 0;
	scope.InputAVCalc.copay.nrIMG_COPAY = 0;
	scope.InputAVCalc.copay.nrST_COPAY = 0;
	scope.InputAVCalc.copay.nrOT_COPAY = 0;
	scope.InputAVCalc.copay.nrPREV_COPAY = 0;
	scope.InputAVCalc.copay.nrLAB_COPAY = 0;
	scope.InputAVCalc.copay.nrXRAY_COPAY = 0;
	scope.InputAVCalc.copay.nrSNF_COPAY = 0;
	scope.InputAVCalc.copay.nrOPFAC_COPAY = 0;
	scope.InputAVCalc.copay.nrOPPROF_COPAY = 0;
	scope.InputAVCalc.copay.nrRXGEN_COPAY = 0;
	scope.InputAVCalc.copay.nrRXFORM_COPAY = 0;
	scope.InputAVCalc.copay.nrRXNONFORM_COPAY = 0;
	scope.InputAVCalc.copay.nrRXSPCLTY_COPAY = 0;
	
	
	scope.InputAVCalc.omit = {};
	scope.InputAVCalc.omit.omit_med_all = 0;
	scope.InputAVCalc.omit.omit_ER = 0;
	scope.InputAVCalc.omit.omit_IP = 0;
	scope.InputAVCalc.omit.omit_PC = 0;
	scope.InputAVCalc.omit.omit_SP = 0;
	scope.InputAVCalc.omit.omit_PSY = 0;
	scope.InputAVCalc.omit.omit_IMG = 0;
	scope.InputAVCalc.omit.omit_ST = 0;
	scope.InputAVCalc.omit.omit_OT = 0;
	scope.InputAVCalc.omit.omit_Prev = 0;
	scope.InputAVCalc.omit.omit_Lab = 0;
	scope.InputAVCalc.omit.omit_Xray = 0;
	scope.InputAVCalc.omit.omit_SNF = 0;
	scope.InputAVCalc.omit.omit_Opfac = 0;
	scope.InputAVCalc.omit.omit_Opprof = 0;
	scope.InputAVCalc.omit.omit_rx_all = 0;
	scope.InputAVCalc.omit.omit_RxGen = 0;
	scope.InputAVCalc.omit.omit_RxForm = 0;
	scope.InputAVCalc.omit.omit_RxNonForm = 0;
	scope.InputAVCalc.omit.omit_RxSpclty = 0;	

	scope.InputAVCalc.ded2 = {};
	scope.InputAVCalc.ded2.ded_med_all2 = 0;
	scope.InputAVCalc.ded2.ded_ER2 = 0;
	scope.InputAVCalc.ded2.ded_IP2 = 0;
	scope.InputAVCalc.ded2.ded_PC2 = 0;
	scope.InputAVCalc.ded2.ded_SP2 = 0;
	scope.InputAVCalc.ded2.ded_PSY2 = 0;
	scope.InputAVCalc.ded2.ded_IMG2 = 0;
	scope.InputAVCalc.ded2.ded_ST2 = 0;
	scope.InputAVCalc.ded2.ded_OT2 = 0;
	scope.InputAVCalc.ded2.ded_Prev2 = 0;
	scope.InputAVCalc.ded2.ded_Lab2 = 0;
	scope.InputAVCalc.ded2.ded_Xray2 = 0;
	scope.InputAVCalc.ded2.ded_SNF2 = 0;
	scope.InputAVCalc.ded2.ded_Opfac2 = 0;
	scope.InputAVCalc.ded2.ded_Opprof2 = 0;
	scope.InputAVCalc.ded2.ded_rx_all2 = 0;
	scope.InputAVCalc.ded2.ded_RxGen2 = 0;
	scope.InputAVCalc.ded2.ded_RxForm2 = 0;
	scope.InputAVCalc.ded2.ded_RxNonForm2 = 0;
	scope.InputAVCalc.ded2.ded_RxSpclty2 = 0;

	scope.InputAVCalc.coinst2 = {};
	scope.InputAVCalc.coinst2.nrER_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrIP_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrPC_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrSP_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrPSY_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrIMG_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrST_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrOT_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrPREV_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrLAB_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrXRAY_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrSNF_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrOPFAC_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrOPPROF_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrRXGEN_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrRXFORM_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrRXNONFORM_COINS2 = 0;
	scope.InputAVCalc.coinst2.nrRXSPCLTY_COINS2 = 0;
	
	
	scope.InputAVCalc.coins2 = {};
	scope.InputAVCalc.coins2.coins_med_all2 = 0;
	scope.InputAVCalc.coins2.coins_ER2 = 0;
	scope.InputAVCalc.coins2.coins_IP2 = 0;
	scope.InputAVCalc.coins2.coins_PC2 = 0;
	scope.InputAVCalc.coins2.coins_SP2 = 0;
	scope.InputAVCalc.coins2.coins_PSY2 = 0;
	scope.InputAVCalc.coins2.coins_IMG2 = 0;
	scope.InputAVCalc.coins2.coins_ST2 = 0;
	scope.InputAVCalc.coins2.coins_OT2 = 0;
	scope.InputAVCalc.coins2.coins_Prev2 = 0;
	scope.InputAVCalc.coins2.coins_Lab2 = 0;
	scope.InputAVCalc.coins2.coins_Xray2 = 0;
	scope.InputAVCalc.coins2.coins_SNF2 = 0;
	scope.InputAVCalc.coins2.coins_Opfac2 = 0;
	scope.InputAVCalc.coins2.coins_Opprof2 = 0;
	scope.InputAVCalc.coins2.coins_rx_all2 = 0;
	scope.InputAVCalc.coins2.coins_RxGen2 = 0;
	scope.InputAVCalc.coins2.coins_RxForm2 = 0;
	scope.InputAVCalc.coins2.coins_RxNonForm2 = 0;
	scope.InputAVCalc.coins2.coins_RxSpclty2 = 0;	

	scope.InputAVCalc.copay2 = {};
	scope.InputAVCalc.copay2.nrER_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrIP_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrPC_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrSP_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrPSY_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrIMG_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrST_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrOT_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrPREV_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrLAB_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrXRAY_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrSNF_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrOPFAC_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrOPPROF_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrRXGEN_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrRXFORM_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrRXNONFORM_COPAY2 = 0;
	scope.InputAVCalc.copay2.nrRXSPCLTY_COPAY2 = 0;

	
	scope.InputAVCalc.omit2 = {};
	scope.InputAVCalc.omit2.omit_med_all2 = 0;
	scope.InputAVCalc.omit2.omit_ER2 = 0;
	scope.InputAVCalc.omit2.omit_IP2 = 0;
	scope.InputAVCalc.omit2.omit_PC2 = 0;
	scope.InputAVCalc.omit2.omit_SP2 = 0;
	scope.InputAVCalc.omit2.omit_PSY2 = 0;
	scope.InputAVCalc.omit2.omit_IMG2 = 0;
	scope.InputAVCalc.omit2.omit_ST2 = 0;
	scope.InputAVCalc.omit2.omit_OT2 = 0;
	scope.InputAVCalc.omit2.omit_Prev2 = 0;
	scope.InputAVCalc.omit2.omit_Lab2 = 0;
	scope.InputAVCalc.omit2.omit_Xray2 = 0;
	scope.InputAVCalc.omit2.omit_SNF2 = 0;
	scope.InputAVCalc.omit2.omit_Opfac2 = 0;
	scope.InputAVCalc.omit2.omit_Opprof2 = 0;
	scope.InputAVCalc.omit2.omit_rx_all2 = 0;
	scope.InputAVCalc.omit2.omit_RxGen2 = 0;
	scope.InputAVCalc.omit2.omit_RxForm2 = 0;
	scope.InputAVCalc.omit2.omit_RxNonForm2 = 0;
	scope.InputAVCalc.omit2.omit_RxSpclty2 = 0;
};
