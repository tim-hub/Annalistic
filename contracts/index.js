"use strict";

var Annalistic = function () {
  LocalContractStorage.defineMapProperty(this, "arrayMap");
  LocalContractStorage.defineProperty(this, "size");
};

Annalistic.prototype ={
  init: function(){
    this.size =0;
  },
  append: function(text){
    var index = this.size;
    this.arrayMap.set(index, text);
    this.size +=1;
  },
  len:function(){
    return this.size;
  },
  getAll: function(limit="-1", offset="0"){
    limit = parseInt(limit);
    offset = parseInt(offset);

    if (limit <=0){
      limit = 100;
    }

    if (offset <0 ){
      offset = 0;
    }
    else if(offset>this.size){
      offset = this.size -1;
      limit = 1;
    }

    var number = offset+limit;
    if(number > this.size){
      number = this.size;
    }
    var result = '';
    for(var i=offset;i<number;i++){
        var data = this.arrayMap.get(i);
        result += data+',';
    }
    result = result.substring(0, result.length - 1);

    return result
  }
};

module.exports = Annalistic;
