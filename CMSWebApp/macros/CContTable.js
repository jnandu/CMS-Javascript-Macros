//module CContTable skeleton created by excelLiberation@ramblings.mcpher.com at 11/11/2017 5:53:38 AM
/**
 * @class CContTable
 */
function CContTable () {
	var pMTier; 
	var pTableType;
	var pTable;
	var pLabels;
	var pName;
    
     Object.defineProperty(this, "MetalTier", {
      /**
       * Get pMTier
       * return {string}
       */
        get: function() {
        return this.pMTier;
        },
      /**
       * Let pMTier
       * @param {string} Value
       * return {void}
       */
        set: function(val){
        this.pMTier = val;
        }
     }); 

     Object.defineProperty(this, "TableType", {
      /**
       * Get pTableType
       * return {string}
       */
        get: function() {
        return this.pTableType;
        },
      /**
       * Let pTableType
       * @param {string} Value
       * return {void}
       */
        set: function(val){
        this.pTableType = val;
        }
     }); 

     Object.defineProperty(this, "table", {
      /**
       * Get pTable
       * return {ListObject}
       */
        get: function() {
        return this.pTable;
        },
      /**
       * Let pTable
       * @param {ListObject} Value
       * return {void}
       */
        set: function(val){
        this.pTable = val;
        }
     }); 

     Object.defineProperty(this, "Labels", {
      /**
       * Get pLabels
       * return {*}
       */
        get: function() {
        //ARVConsole("ReadingpLabels");
        //ARVConsole(this.pLabels);
        return this.pLabels;
        },
      /**
       * Let pLabels
       * @param {*} Value
       * return {void}
       */
        set: function(val){
        //ARVConsole("Saving pLabels");
        //ARVConsole(val);
        this.pLabels = val;
        }
     }); 

     Object.defineProperty(this, "Name", {
      /**
       * Get pName
       * return {*}
       */
        get: function() {
        return this.pName;
        },
      /**
       * Let pName
       * @param {*} Value
       * return {void}
       */
        set: function(val){
        this.pName = val;
        }
     }); 

     Object.defineProperty(this, "UpTo", {
      /**
       * Get UpTo
       * return {CMDist}
       */
        get: function() {
          var MDIST = new CMDist();
          var numRows = this.pTable.getRowCount();
          MDIST.MargRange = this.pTable.offset(0,0,numRows-1,1);
          MDIST.Name = "UpTo";
          return MDIST;
        }
     }); 
     
     Object.defineProperty(this, "Maxd", {
      /**
       * Get Maxd
       * return {CMDist}
       */
        get: function() {
          var MDIST = new CMDist();
          var numRows = this.pTable.getRowCount();
          MDIST.MargRange = this.pTable.offset(0,2,numRows-1,1);
          MDIST.Name = "Maxd";
          return MDIST;
        }
     });      

     Object.defineProperty(this, "ER", {
      /**
       * Get ER
       * return {CMDist}
       */
        get: function() {
            return this.Generic("ER");
        }
     });      

     Object.defineProperty(this, "SP", {
      /**
       * Get SP
       * return {CMDist}
       */
        get: function() {
            return this.Generic("SP");
        }
     });      

     Object.defineProperty(this, "PSY", {
      /**
       * Get PSY
       * return {CMDist}
       */
        get: function() {
            return this.Generic("PSY");
        }
     });      

     Object.defineProperty(this, "IMG", {
      /**
       * Get IMG
       * return {CMDist}
       */
        get: function() {
            return this.Generic("IMG");
        }
     });
     
     Object.defineProperty(this, "ST", {
      /**
       * Get ST
       * return {CMDist}
       */
        get: function() {
            return this.Generic("ST");
        }
     });     
     
     Object.defineProperty(this, "OT", {
      /**
       * Get OT
       * return {CMDist}
       */
        get: function() {
            return this.Generic("OT");
        }
     });     
     
     Object.defineProperty(this, "PREV", {
      /**
       * Get PREV
       * return {CMDist}
       */
        get: function() {
            return this.Generic("Prev");
        }
     });     
     
     Object.defineProperty(this, "LAB", {
      /**
       * Get LAB
       * return {CMDist}
       */
        get: function() {
            return this.Generic("Lab");
        }
     });     
     
     Object.defineProperty(this, "XRAY", {
      /**
       * Get XRAY
       * return {CMDist}
       */
        get: function() {
            return this.Generic("Xray");
        }
     });       
     
     Object.defineProperty(this, "XRAY_UNC", {
      /**
       * Get XRAY_UNC
       * return {CMDist}
       */
        get: function() {
            return this.Generic1("Xray", "Uncl");
        }
     });    

    Object.defineProperty(this, "OPFAC_UNC", {
          /**
       * Get OPFAC_UNC
       * return {CMDist}
       */
        get: function() {
            var MDIST = new CMDist();
            var pstart = this.pLabels.indexOf("Opfac");
            var pend = this.pLabels.indexOf("OpfacFreq");
            //ARVConsole(pstart);
            //ARVConsole(pend);
            var numRows = this.pTable.getRowCount();
            MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
            //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
            MDIST.Name = "Opfac";
            return MDIST;
        }
    });
    
    Object.defineProperty(this, "OPPROF_SRGRY", {
          /**
       * Get OPPROF_SRGRY
       * return {CMDist}
       */
        get: function() {
            var MDIST = new CMDist();
            var pstart = this.pLabels.indexOf("Opprof");
            var pend = this.pLabels.indexOf("OpprofFreq");
            //ARVConsole(pstart);
            //ARVConsole(pend);
            var numRows = this.pTable.getRowCount();
            MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
            //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
            MDIST.Name = "Opprof";
            return MDIST;
        }
    });    
    
     Object.defineProperty(this, "RXGEN", {
      /**
       * Get RXGEN
       * return {CMDist}
       */
        get: function() {
            return this.Generic("RxGen");
        }
     });     
    
     Object.defineProperty(this, "RXFORM", {
      /**
       * Get RXFORM
       * return {CMDist}
       */
        get: function() {
            return this.Generic("RxForm");
        }
     });     

     Object.defineProperty(this, "RXNONFORM", {
      /**
       * Get RXNONFORM
       * return {CMDist}
       */
        get: function() {
            return this.Generic("RxNonForm");
        }
     }); 
     
     Object.defineProperty(this, "RXSPCLTY", {
      /**
       * Get RXSPCLTY
       * return {CMDist}
       */
        get: function() {
            return this.Generic("RxSpclty");
        }
     });  
     
     Object.defineProperty(this, "UNCLASSIFIED", {
      /**
       * Get UNCLASSIFIED
       * return {CMDist}
       */
        get: function() {
            return this.Generic("Uncl");
        }
     });      
}

CContTable.prototype.Generic = function(arg) {
    var MDIST = new CMDist();
    var pstart = this.pLabels.indexOf(arg);
    var pend = this.pLabels.indexOf(arg+"Freq");
    //ARVConsole("label="+arg+"Freq");
    //ARVConsole(pstart);
    //ARVConsole(pend);
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    MDIST.Name = arg;
    return MDIST;
}

CContTable.prototype.Generic1 = function(arg1, arg2) {
    var MDIST = new CMDist();
    var pstart = this.pLabels.indexOf(arg1+'_'+arg2);
    var pend = this.pLabels.indexOf(arg1+"Freq_"+arg2);
    //ARVConsole(pstart);
    //ARVConsole(pend);
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    MDIST.Name = arg1;
    return MDIST;
}
/**
 * Get IP
 * @param {number} Days
 * @param {number} [optMaxDays=]
 * return {CMDist}
 */
CContTable.prototype.IP = function(Days,optMaxDays) {
    var MaxDays = (typeof optMaxDays == 'undefined' ? undefined : optMaxDays );
    var MDIST = new CMDist();
    
    var strFreq;
    if (Days == 0) {
      strFreq = "IPFreq";
    }else if (Days == 1){
      strFreq = (MaxDays == 0 || IsMissing(MaxDays))?  "IPDays" : "IPDays" + MaxDays;
    }
    
    var pstart = this.pLabels.indexOf("IP");
    var pend = this.pLabels.indexOf(strFreq);
    //ARVConsole(strFreq);
    //ARVConsole(pend);
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
//    var range1 = this.pTable.offset(0,pstart,numRows,1);
//    var range2 = this.pTable.offset(0,pend,numRows,1);
//
//    var newRange = Union(range1, range2);
//    ARVConsole(newRange[0].getA1Notation());
//    ARVConsole(newRange[1].getA1Notation());
//    MDIST.MargRange = newRange;
    MDIST.Name = "IP";
    return MDIST;
};
/**
 * Get PC
 * @param {number} [optGTNVisits=]
 * return {CMDist}
 */
CContTable.prototype.PC = function(optGTNVisits) {
    var GTNVisits = (typeof optGTNVisits == 'undefined' ? undefined : optGTNVisits );
    var MDIST = new CMDist();

    var strFreq, strCost;
    if (GTNVisits == 0 || IsMissing(GTNVisits)) {
        strCost = "PC"
        strFreq = "PCFreq"
    }else {
        strCost = "PC" + GTNVisits
        strFreq = "PCFreq" + GTNVisits
    }
    
    var pstart = this.pLabels.indexOf(strCost);
    var pend = this.pLabels.indexOf(strFreq);
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    MDIST.Name = "PC";
    return MDIST;
};

/**
 * Get XRAY_PC
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.XRAY_PC = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Xray_PC");
    var pend = this.pLabels.indexOf("XrayFreq_PC");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Xray"
    }else if(vOVRD == 0) {
        MDIST.Name = "PC"
    }
    return MDIST;
};

/**
 * Get XRAY_SP
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.XRAY_SP = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Xray_Sp");
    var pend = this.pLabels.indexOf("XrayFreq_Sp");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Xray"
    }else if(vOVRD == 0) {
        MDIST.Name = "SP"
    }
    return MDIST;
};

/**
 * Get SNF
 * @param {number} [optDays=]
 * return {CMDist}
 */
CContTable.prototype.SNF = function(optDays) {
    var Days = (typeof optDays == 'undefined' ? undefined : optDays );
    var MDIST = new CMDist();

    var strFreq, strCost;
    if (Days == 0 || IsMissing(Days)) {
        strFreq = "SNFFreq"
    }else if (Days == 1) {
        strFreq = "SNFDays"
    }
    
    var pstart = this.pLabels.indexOf("SNF");
    var pend = this.pLabels.indexOf(strFreq);
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    MDIST.Name = "SNF";
    return MDIST;

};

/**
 * Get OPFAC_PSY
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPFAC_PSY = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opfac_Psy");
    var pend = this.pLabels.indexOf("OpfacFreq_Psy");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opfac"
    }else if(vOVRD == 0) {
        MDIST.Name = "PSY"
    }
    return MDIST;
};

/**
 * Get OPFAC_IMG
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPFAC_IMG = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opfac_Img");
    var pend = this.pLabels.indexOf("OpfacFreq_Img");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opfac"
    }else if(vOVRD == 0) {
        MDIST.Name = "IMG"
    }
    return MDIST;
};
/**
 * Get OPFAC_ST
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPFAC_ST = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opfac_ST");
    var pend = this.pLabels.indexOf("OpfacFreq_ST");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opfac"
    }else if(vOVRD == 0) {
        MDIST.Name = "ST"
    }
    return MDIST;

};

/**
 * Get OPFAC_OT
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPFAC_OT = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opfac_OT");
    var pend = this.pLabels.indexOf("OpfacFreq_OT");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opfac"
    }else if(vOVRD == 0) {
        MDIST.Name = "OT"
    }
    return MDIST;
};

/**
 * Get OPFAC_LAB
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPFAC_LAB = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opfac_Lab");
    var pend = this.pLabels.indexOf("OpfacFreq_Lab");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opfac"
    }else if(vOVRD == 0) {
        MDIST.Name = "Lab"
    }
    return MDIST;
};

/**
 * Get OPPROF_PSY
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPPROF_PSY = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opprof_Psy");
    var pend = this.pLabels.indexOf("OpprofFreq_Psy");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opprof"
    }else if(vOVRD == 0) {
        MDIST.Name = "PSY"
    }
    return MDIST;

};

/**
 * Get OPPROF_IMG
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPPROF_IMG = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opprof_Img");
    var pend = this.pLabels.indexOf("OpprofFreq_Img");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opprof"
    }else if(vOVRD == 0) {
        MDIST.Name = "IMG"
    }
    return MDIST;
};

/**
 * Get OPPROF_ST
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPPROF_ST = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opprof_ST");
    var pend = this.pLabels.indexOf("OpprofFreq_ST");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opprof"
    }else if(vOVRD == 0) {
        MDIST.Name = "ST"
    }
    return MDIST;
};

/**
 * Get OPPROF_OT
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPPROF_OT = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opprof_OT");
    var pend = this.pLabels.indexOf("OpprofFreq_OT");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opprof"
    }else if(vOVRD == 0) {
        MDIST.Name = "OT"
    }
    return MDIST;
};

/**
 * Get OPPROF_LAB
 * @param {number} vOVRD
 * return {CMDist}
 */
CContTable.prototype.OPPROF_LAB = function(vOVRD) {
    var MDIST = new CMDist();
  
    var pstart = this.pLabels.indexOf("Opprof_Lab");
    var pend = this.pLabels.indexOf("OpprofFreq_Lab");
    var numRows = this.pTable.getRowCount();
    MDIST.MargRange = this.pTable.offset(0,pstart,numRows-1,pend-pstart+1);
    //ARVConsole(this.pTable.offset(0,pstart,numRows,pend-pstart+1).getA1Notation());
    

    if (vOVRD == 1) {
        MDIST.Name = "Opprof"
    }else if(vOVRD == 0) {
        MDIST.Name = "Lab"
    }
    return MDIST;
};
