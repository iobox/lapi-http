var $exports = {
 "Body": "body.js",
 "Controller": "controller.js",
 "exception": {
  "HttpException": "exception/http.js",
  "InvalidArgumentException": "exception/invalid-argument.js",
  "NotFoundException": "exception/not-found.js"
 },
 "Header": "header.js",
 "Message": "message.js",
 "query": {
  "extension": {
   "CommonExtension": "query/extension/common.js",
   "QueryExtension": "query/extension/extension.js"
  },
  "Validator": "query/validator.js"
 },
 "Request": "request.js",
 "response": {
  "JsonResponse": "response/json.js"
 },
 "Response": "response.js",
 "routing": {
  "MiddleWare": "routing/middleware.js",
  "Route": "routing/route.js",
  "Router": "routing/router.js"
 },
 "Uri": "uri.js"
};
const distDir = 'dist';
function include(file, name) {
  const pkg = require('./' + distDir + '/' + file);
  return name === undefined ? pkg.default : pkg[name];
}

var exports = function ($exports) {
  Object.keys($exports).forEach(function (name) {
    if (typeof $exports[name] === 'object') {
      exports($exports[name])
    } else {
      $exports[name] = include($exports[name])
    }
  });
};
exports($exports);

module.exports = $exports;