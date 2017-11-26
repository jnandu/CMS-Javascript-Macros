//module CMDist skeleton created by excelLiberation@ramblings.mcpher.com at 11/11/2017 5:57:45 AM
/**
 * @class CMDist
 */
function CMDist () {
	var pRange;
	var pName;
    Object.defineProperty(this, "MargRange", {
      /**
       * Let MargRange
       * @param {Range} Value
       * return {void}
       */
        set: function(val){
        this.pRange = val;
        }
     }); 
     
     Object.defineProperty(this, "Name", {
      /**
       * Get Name
       * return {string}
       */
        get: function() {
        return this.pName;
        },
      /**
       * Let Name
       * @param {string} Value
       * return {void}
       */
        set: function(val){
        this.pName = val;
        }
     }); 
}

/**
 * Get Rng
 * @param {number} vCol
 * return {Range}
 */
CMDist.prototype.Rng = function(vCol) {

    var numRows = this.pRange.getRowCount();
  //ARVConsole("CMDictName="+this.Name+"numRows="+numRows);
	return this.pRange.offset(0,vCol-1,numRows,1);
};
