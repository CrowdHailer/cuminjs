var _ = (function(){
  function map(operation){
    return function(collection){
      var results = [];
      collection.forEach(function(value){
        results.push(operation(value));
      });
      return results;
    };
  }
  return {
    map: map
  };
}());