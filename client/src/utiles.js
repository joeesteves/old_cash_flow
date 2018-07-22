import angular from "angular"

angular.module('app.utiles',[])
.factory('Utiles', function(){
  return {
    clean: function (obj, keys){
      let defaults = ['_id', '_rev', 'doc_type']
      if(keys){
        if(!Array.isArray(keys)) throw new Error("El argumentos debe ser Array")
        keys = keys.concat(defaults)
      } else {
        keys = defaults
      }
      keys.forEach(key => delete obj[key] )
      return obj
    },
  nonce: function(nonce_length) {
    let text = "",
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < nonce_length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
    }
  }
})
