let $module = {
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
const publish = function ($object) {
  Object.keys($object).forEach(function($key) {
    if (typeof $object[$key] === 'string') {
      $object[$key] = require('./dist/' + $object[$key]);
    } else if (typeof $object[$key] === 'object') {
      $object[$key] = publish($object[$key])
    }
  });
  
  return $object;
};
module.exports = publish($module);