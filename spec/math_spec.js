describe('round', function(){
  it('should round to integer', function(){
    expect(_.round()(3.243)).toEqual(3);
    expect(_.round()(3.743)).toEqual(4);
  });
  it('should round to integer number of decimals', function(){
    expect(_.round(2)(3.243)).toEqual(3.24);
    expect(_.round(2)(3.747)).toEqual(3.75);
  });
  it('should deal with edgecases well', function(){
    expect(_.round(2)(1.005)).toEqual(1.01);
    expect(_.round(2)(1.994)).toEqual(1.99);
  });
});