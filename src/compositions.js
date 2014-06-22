(function(namespace){
  var pluck = _.compose(_.map, _.dot);
  
  var pick = _.compose(_.filter, _.position, _.within);
  var omit = _.compose(_.filter, _.position, _.not, _.within);

  namespace.pluck = pluck;

  namespace.pick = pick;
  namespace.omit = omit;
}(_));