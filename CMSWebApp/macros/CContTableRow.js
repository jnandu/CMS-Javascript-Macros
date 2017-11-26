//module CContTableRow skeleton created by excelLiberation@ramblings.mcpher.com at 11/11/2017 5:56:53 AM
/**
 * @class CContTableRow
 */
function CContTableRow () {
	var pRow;
	var pPpt;
    Object.defineProperty(this, "ROW", {
    /**
     * Let ROW
     * @param {number} Value
     * return {void}
     */
      set: function(val){
        this.pRow = val;
      }
    }); 

    Object.defineProperty(this, "ppt", {
    /**
     * Let ppt
     * @param {number} Value
     * return {void}
     */      
      set: function(val){
        this.pPpt = val;
      }
    }); 
    
}
/**
 * Get getRow
 * return {number}
 */
CContTableRow.prototype.getRow = function() {
	return this.pRow;
};
/**
 * Get getPpt
 * return {number}
 */
CContTableRow.prototype.getPpt = function() {
	return this.pPpt;
};