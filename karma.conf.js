module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/helpers.js',
      'src/cumin.js',
      'src/math.js',
      'src/compositions.js',
      'spec/setup.js',
      'spec/core_spec.js',
      'spec/search_spec.js',
      'spec/object_spec.js',
      'spec/array_spec.js',
      'spec/function_spec.js',
      'spec/utilities_spec.js',
      'spec/math_spec.js',
      'spec/compositions_spec.js',
      'spec/examples_spec.js'
    ],
    exclude: [
    ],
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};