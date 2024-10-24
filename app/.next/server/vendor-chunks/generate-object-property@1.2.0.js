/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/generate-object-property@1.2.0";
exports.ids = ["vendor-chunks/generate-object-property@1.2.0"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/generate-object-property@1.2.0/node_modules/generate-object-property/index.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/generate-object-property@1.2.0/node_modules/generate-object-property/index.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var isProperty = __webpack_require__(/*! is-property */ \"(ssr)/./node_modules/.pnpm/is-property@1.0.2/node_modules/is-property/is-property.js\")\n\nvar gen = function(obj, prop) {\n  return isProperty(prop) ? obj+'.'+prop : obj+'['+JSON.stringify(prop)+']'\n}\n\ngen.valid = isProperty\ngen.property = function (prop) {\n return isProperty(prop) ? prop : JSON.stringify(prop)\n}\n\nmodule.exports = gen\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vZ2VuZXJhdGUtb2JqZWN0LXByb3BlcnR5QDEuMi4wL25vZGVfbW9kdWxlcy9nZW5lcmF0ZS1vYmplY3QtcHJvcGVydHkvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEsaUJBQWlCLG1CQUFPLENBQUMseUdBQWE7O0FBRXRDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2hhY2thdGhvbi1uZWFyLXJlZGFjdGVkLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2dlbmVyYXRlLW9iamVjdC1wcm9wZXJ0eUAxLjIuMC9ub2RlX21vZHVsZXMvZ2VuZXJhdGUtb2JqZWN0LXByb3BlcnR5L2luZGV4LmpzPzQ1OGQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzUHJvcGVydHkgPSByZXF1aXJlKCdpcy1wcm9wZXJ0eScpXG5cbnZhciBnZW4gPSBmdW5jdGlvbihvYmosIHByb3ApIHtcbiAgcmV0dXJuIGlzUHJvcGVydHkocHJvcCkgPyBvYmorJy4nK3Byb3AgOiBvYmorJ1snK0pTT04uc3RyaW5naWZ5KHByb3ApKyddJ1xufVxuXG5nZW4udmFsaWQgPSBpc1Byb3BlcnR5XG5nZW4ucHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcCkge1xuIHJldHVybiBpc1Byb3BlcnR5KHByb3ApID8gcHJvcCA6IEpTT04uc3RyaW5naWZ5KHByb3ApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2VuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/generate-object-property@1.2.0/node_modules/generate-object-property/index.js\n");

/***/ })

};
;