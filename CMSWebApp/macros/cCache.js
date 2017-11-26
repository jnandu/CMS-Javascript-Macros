/** @description
 * client caching for GAS worksheet access
 * will cache all calls to get..(), set...() methods so they can be done in a single call
 * a separate cache is created for each type of method (getValues,getBackGroundColors) etc.
 * See http://ramblings.mcpher.com/Home/excelquirks/codeuse for more details
 */
 
/**
 * cCache
 * @author <a href="mailto:bruce@mcpher.com">Bruce McPherson</a><a href="http://ramblings.mcpher.com"> ramblings.mcpher.com</a>
 */
 
/**
 * @static
 */
var worksheetCache;
var numRDict=0;
/**
 * Creates the cache container if not already known
 * @return {cCache} a new cache container
 */
function createSheetCache(){
  return worksheetCache ? 
      worksheetCache : 
      (worksheetCache = new cCache());
}

/**
 * finds (or creates) a cache for the identified worksheet
 * @param {string|Sheet|Range} ob Identifies the worksheet target
 * @param {string=} method the required method (default get/setValues())
 * @return {cCache} a new cache container
 */
function sheetCache(ob,method) {
  return createSheetCache().getCache(ob,fixOptional (method,'getValues'));
}

/**
 * a cCache
 * @class 
 * @implements {cCache}
 * @return {cCache} a new cache container
 */
function cCache() {
  var pCaches = new collection();
  this.caches = function () {
    return pCaches;
  }
  return this;
};

/**
 * generate a unique Key to use to identify the cache - used internally
 * @param {string} wn the worksheet name
 * @param {string} method the requested method
 * @return {string} the key
 */
cCache.prototype.getKey = function (wn,method) {
  // will use the same cache for both set and get methods
  return wn + '@' + (Left(method,3) == 'set' ? 'get' + Right(method,Len(method) - 3) : method ) ;
};

/**
 * resolve the type of object being used to identify the cache required and return its worksheet name
 * @param {string|Sheet|Range} ob Identifies the worksheet target
 * @return {string} the worksheet name
 */
cCache.prototype.getWn = function (ob) {
  return ob;          
 };
 
/**
 * resolve the type of object being used to identify the cache required and return its Sheet
 * @param {string|Sheet|Range} ob Identifies the worksheet target
 * @return {Sheet} the worksheet
 */
cCache.prototype.getSheetObj = function (ob) {
  // this one detects the object type & gets the sheet being referred to
  //ARVConsole("getSheetObj="+Sheets(ob).getName());
  //return Sheets(ob);
  if (isTypeString(ob)) {
    //var sheetName = "./jsons/"+ob+".json";
    var sheetName = ob+"_Json";
    switch (sheetName) {
	case 'Platinum_Combined_Json': 
		return Platinum_Combined_Json;
    	case 'Platinum_Med_Json': 
		return Platinum_Med_Json;
	case 'Platinum_Rx_Json': 
		return Platinum_Rx_Json;
	case 'Gold_Combined_Json': 
		return Gold_Combined_Json;
    	case 'Gold_Med_Json': 
		return Gold_Med_Json;
	case 'Gold_Rx_Json': 
		return Gold_Rx_Json;
	case 'Silver_Combined_Json': 
		return Silver_Combined_Json;
    	case 'Silver_Med_Json': 
		return Silver_Med_Json;
	case 'Silver_Rx_Json': 
		return Silver_Rx_Json;
	case 'Bronze_Combined_Json': 
		return Bronze_Combined_Json;
    	case 'Bronze_Med_Json': 
		return Bronze_Med_Json;
	case 'Bronze_Rx_Json': 
		return Bronze_Rx_Json;
	case 'AV Calculator_Json': 
		return AV_Calculator_Json;
	case 'HelperTab_Json': 
		return HelperTab_Json;
	}
//    readTextFile(sheetName, function(text){
//	var data = JSON.parse(text);
//	return data;
//	//ARVConsole("Data="+data[37][4]);
//    });   
  }
//  return (isTypeString(ob) ?                          
//          Sheets(ob) :      //its a sheet name
//          ob.getSheet ?                        
//            ob.getSheet() : //its a range 
//              ob.getName ?                          
//                ob  :       //its a sheet 
//                 null);//,'unknown object making getSheetObj cache request' )   ;  // dont know what it is - give up
                
 };
 
 /**
 * return the cache given an item and its method
 * @param {string|Sheet|Range} ob Identifies the worksheet target
 * @param {string} method the required method
 * @return {cCacheItem} a single cache
 */
cCache.prototype.getCache = function (ob,method) {
  // find the existing cache or create it.
  var wn = this.getWn(ob);
  var key = this.getKey(wn,method);
  var cache = this.caches().item(key,false);
  if (!cache) {
    cache = new cCacheItem(this,method);
    var cache = this.caches().add (cache,key);
    cache.xName = wn ;
    cache.xKey = key;
    cache.xWsRange = this.getSheetObj(ob);
    cache.xSheetRange = this.getSheetObj(ob);
  }
  DebugAssert(cache.xName == wn, "somehow using the wrong cache");
  ARVConsole("Cache hit:"+wn);
  return cache;
};


/**
 * create a new cCacheItem
 * @class 
 * @param {string|Sheet|Range} p the parent cCache container
 * @param {string} method the required method
 * @return {cCacheItem} a new cacheitem
 */
function cCacheItem(p,method) {
  this.xValues = null;   // will hold cached values  
  this.xParent = p;
  this.xMethod = method;
  this.xActive = false;
  this.xDirty = true; // force a refresh
};

cCacheItem.prototype.getCacheName = function() {
  return this.xName;
};

cCacheItem.prototype.getWsRange = function() {
  return this.xWsRange;
};

function getCacheKey(name, method) {
  return name + '@' +  method;
};
/**
 * return the values for an entire row
 * @param {number} rn the row number (Base 1)
 * @return {<Array>.*} array of values for the given row
 */
cCacheItem.prototype.getEntireRow = function(rn) {
  return this.getValues()[rn-1];
};
/**
 * return the values for the range given
 * @param {Range=} r the target range (default the whole sheet)
 * @return {<Array>.*} array of values for the given range
 */
cCacheItem.prototype.getValues = function() {
  // get from sheet if we dont have it already
  if (this.dirty() || !this.xActive) { 
    this.xValues = this.xWsRange; 
    this.xActive = true;
    this.setDirty(false);
  }
  return this.xValues ;
};

cCacheItem.prototype.getNamedRanges = function () {
  return AVC_NamedRanges;
}
cCacheItem.prototype.getSheet = function () {
  return this.xSheetRange; 
}
/**
 * return a single value
 * @param {number} rn the row number (Base 1)
 * @param {number} cn the column number (Base 1)
 * @return {*} value at rn,cn
 */
cCacheItem.prototype.getValue = function (rn,cn) {
  // get from cache or if outside range return empty
  return (rn > this.getRowCount() || cn > this.getColumnCount() ) ? 
    Empty() :
    this.getValues()[rn][cn];
};
/**
 * set a single value
 * @param {*} value the value to set
 * @param {number} rn the row number (Base 1)
 * @param {number} cn the column number (Base 1)
 * @return {*} the value that was set
 */
cCacheItem.prototype.setValue = function (value,rn,cn) {
  return (this.extend (rn,cn).setTouched().xValues[rn][cn] = value);
};

/**
 * clear the cCacheItem and delete it without committing the contents
 */
cCacheItem.prototype.quit = function () {
  // abandon changes and kill the cache
  this.clearCache();
  this.xParent.caches().remove(this.xKey);
  return null;
};
/**
 * clear the cCacheItem without committing the contents
 */
cCacheItem.prototype.clearCache = function () {
  this.xData = null;
  return this;
};
/**
 * clear the cCacheItem contents
 */
cCacheItem.prototype.clear = function (optR) {
    var rn = this.getRowCount();
    var cn = this.getColumnCount();
    var rs = 1;
    var cs = 1;
  DebugAssert(this.xMethod=="getValues",
      'Can only clear cache values for now-you asked for', this.xMethod);
  for ( var i= rs ; i < rn+rs ; i++ )
  for ( var j= cs ; j < cn+cs ; j++ ) 
    this.setValue (Empty(), i, j);

  return this;
};
/**
 * Commit the cCacheItem contents to the sheet, and delete the cache
 */
cCacheItem.prototype.close = function () {
  //commit changes and kill the cache
  this.commit();
  this.quit();
  return null;
};
/**
 * Extend the cache if rn,cn outside current range of sheet - Internal Use:called automatically if needed
 * @param {number} rn the row number being accessed
 * @param {number} cn the column number being accessed
 * @return {cCacheItem} the cCacheItem
 */
cCacheItem.prototype.extend = function(rn,cn) {

  // maybe we need to extend the number of rows
 var cr = this.getRowCount();
 var cc = this.getColumnCount();
 if (!this.xValues) this.xValues =[];
  // need to add any rows?
  if (rn > cr ) {
    for (var i = cr ; i < rn ; i++) {
      this.xValues[i]= [] ;
      for ( var j=0; j < cc ; j++ ) this.xValues[i][j]= Empty();
    }
  }
  // maybe the number of columns ?
  if ( cn > cc){
      for (var i = 0 ; i < this.getRowCount() ;i++) {
        for (var j= cc ; j < cn ; j++){
          this.xValues[i][j]=Empty();
        }
      }
  }
  
  return this;
}; 
/**
 * set or clear whether the cache has been written to - Internal Use:called automatically if needed
 * @param {boolean=} touched whether cache is written to - default true
 * @return {cCacheItem} the cCacheItem
 */
cCacheItem.prototype.setTouched = function(touched) {
  this.xTouched = fixOptional(touched,true);
  return this;
};

/**
 * check whether the cache has been written to
 * @return {boolean} has cCacheItem been written to?
 */
cCacheItem.prototype.touched = function() {
  return this.xTouched;
}; 

/**
 * set or clear whether the cache is valid and force a refresh
 * @param {boolean=} dirty whether cache is valid - default true
 * @return {cCacheItem} the cCacheItem
 */
cCacheItem.prototype.setDirty = function(dirty) {
  if (dirty) {
    DebugAssert(!this.touched(), 'cache dirty request with outstanding write cache requests'); 
  }
  this.xDirty = fixOptional(dirty,true);
  if (this.xDirty) {
    // force a refresh now
    this.getValue(1,1);
  }
  return this;
}; 

/**
 * check whether the cache is valid- when maintained automatically should always be false
 * @return {boolean} whether cCacheItem is valid
 */
cCacheItem.prototype.dirty = function () {
  return this.xDirty ;
}; 

/**
 * get the number of rows in the cCacheItem
 * @return {number} whether cCacheItem is valid
 */
cCacheItem.prototype.getRowCount = function () {
  return this.getValues() ? this.getValues().length : 0;
};
/**
 * get the max value in cache
 * @return {*} max
 */
cCacheItem.prototype.max = function () {
  var m;
  for (var i=0; i < this.getRowCount() ; i++ )
  for (var j=0; j < this.getColumnCount() ; j++ )
    if (this.xValues[i][j] > m || isUndefined(m)) m = this.xValues[i][j] ;
  
  return m;
};
/**
 * get the min value in cache
 * @return {*} min
 */
cCacheItem.prototype.min = function () {
  var m;
  for (var i=0; i < this.getRowCount() ; i++ )
  for (var j=0; j < this.getColumnCount() ; j++ )
    if (this.xValues[i][j] < m || isUndefined(m)) m = this.xValues[i][j] ;
  
  return m;
};



/**
 * get the number of columns in the cCacheItem
 * @return {number} whether cCacheItem is valid
 */
cCacheItem.prototype.getColumnCount = function () {
  return this.getValues() ? this.getValues()[0].length : 0;
};


function rngDict () {
  var pName;
  var pRange;
  var pNRow;
  var pNCols;
  var pType;
  var pRowOff;
  var pColOff;
  
  this.getRangeRegion = function () {
//    ARVConsole("rReg[0]="+this.pRowOff);
//    ARVConsole("rReg[1]="+this.pColOff);
//    ARVConsole("rReg[2]="+this.pNRow);
//    ARVConsole("rReg[3]="+this.pNCols);
//    ARVConsole("rowCount"+this.getRowCount());

    var RangeRegion = [this.pRowOff, this.pColOff, this.pNRow, this.pNCols];
    return RangeRegion;
  }
  
  this.setRangeRegion = function (roff, coff, nrow, ncols) {
//    ARVConsole("setRange Region rReg[0]="+roff);
//    ARVConsole("setRange Region rReg[1]="+coff);
//    ARVConsole("setRange Region rReg[2]="+nrow);
//    ARVConsole("setRange Region rReg[3]="+ncols);
    this.pRowOff = roff;
    this.pColOff = coff;
    this.pNRow = nrow;
    this.pNCols = ncols;    
  }
 
  this.getType = function () {
    return this.pType;
  }
  
  this.setType = function (type) {
     this.pType = type;
  }
  
  this.getName = function () {
    return pName;
  }
  
  this.setName = function (name) {
    this.pName=name;
  }
  
  this.setData = function(range) {
    this.pRange = range;
  }
  
  this.getRowCount = function () {
    return this.pNRow;
  }
  
  this.getColumnCount = function () {
    return this.pNCols;
  }
  
  this.getValues = function () {
    return this.pRange;
  }
  
  this.getValue = function (rn, cn) {
    var rReg = this.getRangeRegion();
    //ARVConsole("rReg"+rReg);
//    ARVConsole("rReg[0]="+rReg[0]);
//    ARVConsole("rReg[1]="+rReg[1]);
//    ARVConsole("rReg[2]="+rReg[2]);
//    ARVConsole("rReg[3]="+rReg[3]);
//    ARVConsole("rowCount"+this.getRowCount());
    var realColEnd = rReg[1]+this.getColumnCount();
    if (rn > this.getRowCount() || cn > realColEnd ){
      return Empty();
    }else{
      //ARVConsole("Value[roff="+rReg[0]+"+rn="+rn+"="+(rReg[0]+rn)+"][coff="+rReg[1]+"+cn="+cn+"="+(rReg[1]+cn)+"]=");
      var val = this.getValues()[rReg[0]+rn][rReg[1]+cn];
      //ARVConsole(val);
      return val;
    }
//    return (rn > this.getRowCount() || cn > realColEnd ) ? 
//    Empty() :
//    this.getValues()[rReg[0]+rn][rReg[1]+cn];
  }   
  this.getRow = function () {
    return 0;
  }
  this.getColumn = function () {
    return 0;
  }   
  this.offset = function (roff, coff, nrow, ncols) {
    var rReg = this.getRangeRegion();
    var realColEnd = rReg[1]+this.getColumnCount();
    var rowCount = (this.getRowCount()>=nrow)?nrow:this.getRowCount();
    var colCount = (this.getColumnCount()>=ncols)?ncols:this.getColumnCount();
    return offset(rReg[0]+roff, rReg[1]+coff, rowCount, colCount, this.getValues());
  }
  return this;
}

function offset(roff, coff, nrow, ncols, range){
//  ARVConsole("roff="+roff+"coff="+coff+"nrow="+nrow+"ncols="+ncols);
  var name = "scol:"+coff+"-ecol:"+(coff+ncols);  
  var rng = new rngDict();
  numRDict++; 
  //ARVConsole("Number of rng Created"+numRDict);
  rng.setName(name);
//  ARVConsole("offset name:"+name);
  rng.setType("custRange");
  rng.setRangeRegion(roff, coff, nrow, ncols);
  rng.setData(range);
  return rng;
}



/**
 * get the number of columns in the cCacheItem
 * @return {number} whether cCacheItem is valid
 */
cCacheItem.prototype.offset = function (roff, coff, nrow, ncols) {
  //ARVConsole("Inside offset");
  return offset(roff, coff, nrow, ncols, this.getValues());
};

/**
 * enumerate a the collection in the cCache container
 * @this {cCache} 
 * @param {function(*,number,number)} a function that will be called for each item
 */
cCacheItem.prototype.forEach = function (yourFunction) {
  var nr = this.getRowCount() ;
  var nc = this.getColumnCount() ;
// get the values for this cache
  var v = this.getValues();
// this will call your function for every value
  for (var rowIndex = 0 ; rowIndex < nr ; rowIndex ++ )
  for (var colIndex = 0 ; colIndex < nc ; colIndex ++ ) {
    if ( yourFunction (v[rowIndex][colIndex],rowIndex+1,colIndex+1) ) return true;
  }
};
