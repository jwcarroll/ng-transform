'use strict';

var Controllers;
(function (Controllers) {

  var TransformCtrl = function () {
    this.input = "Name    FaceShape   LegacyProperty  NeverGetsUsed   NobodyKnowsWhatThisMeans KillMeNow";
    this.output = "";

    this.transformations = [
      this.splitWhiteSpace,
      this.alphabetize,
      this.lowercaseFirst,
      this.propertiesToJSObject
    ];
  };

  TransformCtrl.prototype.splitWhiteSpace = function (input) {
    return input.split(/\s+/);
  };

  TransformCtrl.prototype.alphabetize = function (input) {
    input.sort(function (a, b) {
      return a.localeCompare(b);
    });
    return input;
  };

  TransformCtrl.prototype.lowercaseFirst = function (input) {
    var output = [],
      i = 0;

    for (i = 0; i < input.length; i++) {
      output.push(this.lowercaseFirstSingle(input[i]));
    }

    return output;
  };

  TransformCtrl.prototype.lowercaseFirstSingle = function (str) {
    return str.replace(/^([A-Z]{1})/g, function (match) {
      return match.toLowerCase();
    });
  };

  TransformCtrl.prototype.propertiesToJSObject = function (input) {
    var objLines = ["var NewObj = function(config){"];

    angular.forEach(input, function (prop) {
      objLines.push("  this." + prop + " = config." + prop + ";");
    });

    objLines.push("};");

    return objLines.join("\n");
  };

  TransformCtrl.prototype.transform = function () {
    var input = angular.copy(this.input),
      transformFunctions = this.transformations.slice(0);

    for (var i = 0; i < transformFunctions.length; i++) {
      input = transformFunctions[i].call(this, angular.copy(input));
    }

    this.output = input;
  };

  Controllers.TransformCtrl = TransformCtrl;

}(Controllers || (Controllers = {})));

angular.module('ng-transform')
  .controller('transformCtrl', Controllers.TransformCtrl);
