function AVGenericTab (tabName) {
	this.pRangeDict={};
    this.pCheckBoxDict={};
    this.pSheetName = tabName;    
    this.pShCache = sheetCache(this.pSheetName);
    this.pAllNamedRanges = this.pShCache.getNamedRanges();
    //ARVConsole("pAllNamedRanges"+this.pAllNamedRanges);
}

AVGenericTab.prototype.Range = function(rangeName) {
        //ARVConsole("rangeName"+rangeName);
        var rDict = new RangeDict();
        rDict.Range = getRangeOfNamedRange(rangeName,this.pAllNamedRanges);
        //ARVConsole("pShCache="+this.pShCache);
        rDict.setSheetCache(this.pShCache);
        this.pRangeDict[rangeName] = rDict; 
        return rDict;
}

AVGenericTab.prototype.CheckBoxes = function(checkName) {
        ARVConsole("Checkboxes checkName="+checkName);
        var rDict = new RangeDict();
        rDict.Range = getRangeOfCheckBox(this.pShCache.getSheet(), checkName);
        ARVConsole("pShCache="+this.pShCache);
        rDict.setSheetCache(this.pShCache);
        this.pCheckBoxDict[checkName] = rDict; 
        return rDict;
}

AVGenericTab.prototype.DropDowns = function(checkName) {
        //ARVConsole("sheetName"+this.pSheetName);
        var rDict = new RangeDict();
        rDict.Range = getRangeOfCheckBox(this.pShCache.getSheet(), checkName);
        //ARVConsole("pShCache="+this.pShCache);
        rDict.setSheetCache(this.pShCache);
        this.pCheckBoxDict[checkName] = rDict; 
        return rDict;
}

function RangeDict () {
  var pValue;
  var pRange;
  var pSheetCache;
  
  Object.defineProperty(this, "Value", {
    /**
    * Get pValue
    * return {*}
    */
    get: function() {
      var row = this.pRange[0];
      var col = this.pRange[1];
      ARVConsole("pRange="+this.pRange+" Value="+this.pSheetCache.getValue(row, col));      
      return (this.pSheetCache&&this.pRange&&this.pSheetCache.getValue(row, col))?this.pSheetCache.getValue(row, col):0;
      //return (this.pRange&&this.pRange.getValue())?this.pRange.getValue():0;
    },
    /**
    * Let pValue
    * @param {*} Value
    * return {void}
    */
    set: function(val){
      this.pValue = val;
      ARVConsole("set Value Val="+val);
      var row = this.pRange[0];
      var col = this.pRange[1]; 
      this.pSheetCache.setValue(val, row, col);        
      //this.pRange?this.pRange.setValue(val):0;
    }
  }); 
  
  Object.defineProperty(this, "Range", {
    /**
    * Get pRange
    * return {*}
    */
    get: function() {
      return this.pRange;
    },
    /**
    * Let pRange
    * @param {*} Value
    * return {void}
    */
    set: function(val){
      this.pRange = val;
    }
  });   
  
}

RangeDict.prototype.setSheetCache = function(cache) {
        //ARVConsole("sheetName"+this.pSheetName);
        this.pSheetCache = cache;
}
