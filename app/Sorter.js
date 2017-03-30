// This code is copyright 2012 by Gavin Kistner, !@phrogz.net
// It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
// Reuse or modification is free provided you abide by the terms of that license.
// (Including the first two lines above in your source code satisfies the conditions.)

// From http://phrogz.net/JS/Array.prototype.sortBy.js
// Via http://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date

/*************************************************************************************
| Example 1:                                                                         |
|                                                                                    |
|   var a=[ {c:"GK",age:37}, {c:"ZK",age:13}, {c:"TK",age:14}, {c:"AK",age:13} ];    |
|   a.sortBy( function(){ return this.age } );                                       |
|     --> [ {c:"ZK",age:13}, {c:"AK",age:13}, {c:"TK",age:14}, {c:"GK",age:37} ]     |
|   a.sortBy( function(){ return [this.age,this.c] } );                              |
|     --> [ {c:"AK",age:13}, {c:"ZK",age:13}, {c:"TK",age:14}, {c:"GK",age:37} ]     |
|   a.sortBy( function(){ return -this.age } );                                      |
|     --> [ {c:"GK",age:37}, {c:"TK",age:14}, {c:"ZK",age:13}, {c:"AK",age:13} ]     |
|                                                                                    |
| Example 2:                                                                         |
|   var n=[ 1, 99, 15, "2", "100", 3, 34, "foo", "bar" ];                            |
|   n.sort();                                                                        |
|     --> [ 1, "100", 15, "2", 3, 34, 99, "bar", "foo" ]                             |
|   n.sortBy( function(){ return this*1 } );                                         |
|     --> [ "foo", "bar", 1, "2", 3, 15, 34, 99, "100" ]                             |
|   n.sortBy( function(o){ return [typeof o,this] } );                               |
|     --> [1, 3, 15, 34, 99, "100", "2", "bar", "foo"]                               |
|   n.sortBy(function(o){ return [typeof o, typeof o=="string" ? o.length : o] })    |
|     --> [1, 3, 15, 34, 99, "2", "100", "bar", "foo"]                               |
|                                                                                    |
| Note in the last example that (typeof this) happens not to be the same as          |
| (typeof o); see this post for more details:                                        |
| http://stackoverflow.com/questions/4390658/why-does-typeof-this-return-object      |
*************************************************************************************/

(function(){
  if (typeof Object.defineProperty === 'function'){
    try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

  function sb(f){
    for (var i=this.length;i;){
      var o = this[--i];
      this[i] = [].concat(f.call(o,o,i),o);
    }
    this.sort(function(a,b){
      for (var i=0,len=a.length;i<len;++i){
        if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
      }
      return 0;
    });
    for (var i=this.length;i;){
      this[--i]=this[i][this[i].length-1];
    }
    return this;
  }
})();
