/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/base-x@2.0.6";
exports.ids = ["vendor-chunks/base-x@2.0.6"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/base-x@2.0.6/node_modules/base-x/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/.pnpm/base-x@2.0.6/node_modules/base-x/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// base-x encoding\n// Forked from https://github.com/cryptocoinjs/bs58\n// Originally written by Mike Hearn for BitcoinJ\n// Copyright (c) 2011 Google Inc\n// Ported to JavaScript by Stefan Thomas\n// Merged Buffer refactorings from base58-native by Stephen Pair\n// Copyright (c) 2013 BitPay Inc\n\nvar Buffer = (__webpack_require__(/*! safe-buffer */ \"(ssr)/./node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js\").Buffer)\n\nmodule.exports = function base (ALPHABET) {\n  var ALPHABET_MAP = {}\n  var BASE = ALPHABET.length\n  var LEADER = ALPHABET.charAt(0)\n\n  // pre-compute lookup table\n  for (var z = 0; z < ALPHABET.length; z++) {\n    var x = ALPHABET.charAt(z)\n\n    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')\n    ALPHABET_MAP[x] = z\n  }\n\n  function encode (source) {\n    if (source.length === 0) return ''\n\n    var digits = [0]\n    for (var i = 0; i < source.length; ++i) {\n      for (var j = 0, carry = source[i]; j < digits.length; ++j) {\n        carry += digits[j] << 8\n        digits[j] = carry % BASE\n        carry = (carry / BASE) | 0\n      }\n\n      while (carry > 0) {\n        digits.push(carry % BASE)\n        carry = (carry / BASE) | 0\n      }\n    }\n\n    var string = ''\n\n    // deal with leading zeros\n    for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string += ALPHABET[0]\n    // convert digits to a string\n    for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]\n\n    return string\n  }\n\n  function decodeUnsafe (string) {\n    if (string.length === 0) return Buffer.allocUnsafe(0)\n\n    var bytes = [0]\n    for (var i = 0; i < string.length; i++) {\n      var value = ALPHABET_MAP[string[i]]\n      if (value === undefined) return\n\n      for (var j = 0, carry = value; j < bytes.length; ++j) {\n        carry += bytes[j] * BASE\n        bytes[j] = carry & 0xff\n        carry >>= 8\n      }\n\n      while (carry > 0) {\n        bytes.push(carry & 0xff)\n        carry >>= 8\n      }\n    }\n\n    // deal with leading zeros\n    for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {\n      bytes.push(0)\n    }\n\n    return Buffer.from(bytes.reverse())\n  }\n\n  function decode (string) {\n    var buffer = decodeUnsafe(string)\n    if (buffer) return buffer\n\n    throw new Error('Non-base' + BASE + ' character')\n  }\n\n  return {\n    encode: encode,\n    decodeUnsafe: decodeUnsafe,\n    decode: decode\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZS14QDIuMC42L25vZGVfbW9kdWxlcy9iYXNlLXgvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxpSUFBNkI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkMseUNBQXlDLG1CQUFtQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CLDBDQUEwQztBQUM5RDtBQUNBLG9DQUFvQyxRQUFROztBQUU1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsbUJBQW1CO0FBQ3ZDO0FBQ0E7O0FBRUEscUNBQXFDLGtCQUFrQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLCtDQUErQztBQUNuRTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFja2F0aG9uLW5lYXItcmVkYWN0ZWQvLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZS14QDIuMC42L25vZGVfbW9kdWxlcy9iYXNlLXgvaW5kZXguanM/OTljNCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBiYXNlLXggZW5jb2Rpbmdcbi8vIEZvcmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jcnlwdG9jb2luanMvYnM1OFxuLy8gT3JpZ2luYWxseSB3cml0dGVuIGJ5IE1pa2UgSGVhcm4gZm9yIEJpdGNvaW5KXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTEgR29vZ2xlIEluY1xuLy8gUG9ydGVkIHRvIEphdmFTY3JpcHQgYnkgU3RlZmFuIFRob21hc1xuLy8gTWVyZ2VkIEJ1ZmZlciByZWZhY3RvcmluZ3MgZnJvbSBiYXNlNTgtbmF0aXZlIGJ5IFN0ZXBoZW4gUGFpclxuLy8gQ29weXJpZ2h0IChjKSAyMDEzIEJpdFBheSBJbmNcblxudmFyIEJ1ZmZlciA9IHJlcXVpcmUoJ3NhZmUtYnVmZmVyJykuQnVmZmVyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmFzZSAoQUxQSEFCRVQpIHtcbiAgdmFyIEFMUEhBQkVUX01BUCA9IHt9XG4gIHZhciBCQVNFID0gQUxQSEFCRVQubGVuZ3RoXG4gIHZhciBMRUFERVIgPSBBTFBIQUJFVC5jaGFyQXQoMClcblxuICAvLyBwcmUtY29tcHV0ZSBsb29rdXAgdGFibGVcbiAgZm9yICh2YXIgeiA9IDA7IHogPCBBTFBIQUJFVC5sZW5ndGg7IHorKykge1xuICAgIHZhciB4ID0gQUxQSEFCRVQuY2hhckF0KHopXG5cbiAgICBpZiAoQUxQSEFCRVRfTUFQW3hdICE9PSB1bmRlZmluZWQpIHRocm93IG5ldyBUeXBlRXJyb3IoeCArICcgaXMgYW1iaWd1b3VzJylcbiAgICBBTFBIQUJFVF9NQVBbeF0gPSB6XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGUgKHNvdXJjZSkge1xuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm4gJydcblxuICAgIHZhciBkaWdpdHMgPSBbMF1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGNhcnJ5ID0gc291cmNlW2ldOyBqIDwgZGlnaXRzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIGNhcnJ5ICs9IGRpZ2l0c1tqXSA8PCA4XG4gICAgICAgIGRpZ2l0c1tqXSA9IGNhcnJ5ICUgQkFTRVxuICAgICAgICBjYXJyeSA9IChjYXJyeSAvIEJBU0UpIHwgMFxuICAgICAgfVxuXG4gICAgICB3aGlsZSAoY2FycnkgPiAwKSB7XG4gICAgICAgIGRpZ2l0cy5wdXNoKGNhcnJ5ICUgQkFTRSlcbiAgICAgICAgY2FycnkgPSAoY2FycnkgLyBCQVNFKSB8IDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gJydcblxuICAgIC8vIGRlYWwgd2l0aCBsZWFkaW5nIHplcm9zXG4gICAgZm9yICh2YXIgayA9IDA7IHNvdXJjZVtrXSA9PT0gMCAmJiBrIDwgc291cmNlLmxlbmd0aCAtIDE7ICsraykgc3RyaW5nICs9IEFMUEhBQkVUWzBdXG4gICAgLy8gY29udmVydCBkaWdpdHMgdG8gYSBzdHJpbmdcbiAgICBmb3IgKHZhciBxID0gZGlnaXRzLmxlbmd0aCAtIDE7IHEgPj0gMDsgLS1xKSBzdHJpbmcgKz0gQUxQSEFCRVRbZGlnaXRzW3FdXVxuXG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlVW5zYWZlIChzdHJpbmcpIHtcbiAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gMCkgcmV0dXJuIEJ1ZmZlci5hbGxvY1Vuc2FmZSgwKVxuXG4gICAgdmFyIGJ5dGVzID0gWzBdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IEFMUEhBQkVUX01BUFtzdHJpbmdbaV1dXG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuXG5cbiAgICAgIGZvciAodmFyIGogPSAwLCBjYXJyeSA9IHZhbHVlOyBqIDwgYnl0ZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgY2FycnkgKz0gYnl0ZXNbal0gKiBCQVNFXG4gICAgICAgIGJ5dGVzW2pdID0gY2FycnkgJiAweGZmXG4gICAgICAgIGNhcnJ5ID4+PSA4XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChjYXJyeSA+IDApIHtcbiAgICAgICAgYnl0ZXMucHVzaChjYXJyeSAmIDB4ZmYpXG4gICAgICAgIGNhcnJ5ID4+PSA4XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVhbCB3aXRoIGxlYWRpbmcgemVyb3NcbiAgICBmb3IgKHZhciBrID0gMDsgc3RyaW5nW2tdID09PSBMRUFERVIgJiYgayA8IHN0cmluZy5sZW5ndGggLSAxOyArK2spIHtcbiAgICAgIGJ5dGVzLnB1c2goMClcbiAgICB9XG5cbiAgICByZXR1cm4gQnVmZmVyLmZyb20oYnl0ZXMucmV2ZXJzZSgpKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlIChzdHJpbmcpIHtcbiAgICB2YXIgYnVmZmVyID0gZGVjb2RlVW5zYWZlKHN0cmluZylcbiAgICBpZiAoYnVmZmVyKSByZXR1cm4gYnVmZmVyXG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbi1iYXNlJyArIEJBU0UgKyAnIGNoYXJhY3RlcicpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGRlY29kZVVuc2FmZTogZGVjb2RlVW5zYWZlLFxuICAgIGRlY29kZTogZGVjb2RlXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/base-x@2.0.6/node_modules/base-x/index.js\n");

/***/ })

};
;