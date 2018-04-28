import Vue from 'vue';

/**
 * Created by liubingwen on 2017/10/23.
 */
var isServer = Vue.prototype.$isServer;

var on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

var off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

var offsetTop = function offsetTop(element) {
  var offsetParent = element.offsetParent;
  return element.offsetTop + (offsetParent ? offsetTop(offsetParent) : 0);
};

var isVisible = function isVisible(ele) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!isServer) {
    var element = window.document.documentElement;
    var offsetTopN = offsetTop(ele);
    var viewTop = window.pageYOffset;
    var elClientHeight = ele.clientHeight;
    var innerHeight = window.innerHeight || document.documentElement.clientHeight;
    var viewBottom = viewTop + Math.min(element.clientHeight, innerHeight) - offset;
    var bottom = offsetTopN + elClientHeight;
    return offsetTopN <= viewBottom && bottom >= viewTop;
  }
};

var UAnimateContainer = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('section', [_vm._t("default")], 2);
  }, staticRenderFns: [],
  name: 'UAnimateContainer',
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {
          mobile: true
        };
      }
    },
    live: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      all: [],
      vmArr: [],
      scrolled: false,
      interval: null
    };
  },
  mounted: function mounted() {
    this.start();
  },

  methods: {
    start: function start() {
      var vmArr = this.vmArr;

      on(window, 'scroll', this.scrollHandler);
      on(window, 'resize', this.scrollHandler);
      this.interval = setInterval(this.scrollCallback, 50);
    },
    setVM: function setVM(vm) {
      var index = this.all.findIndex(function (item) {
        return item._uid === vm._uid;
      });
      if (index < 0) {
        this.all.push(vm);
        this.vmArr.push(vm);
      }
    },
    removeVM: function removeVM(vm) {
      var index = this.vmArr.findIndex(function (item) {
        return item._uid === vm._uid;
      });
      if (index > -1) {
        this.vmArr.splice(index, 1);
      }
    },
    scrollHandler: function scrollHandler() {
      this.scrolled = true;
    },
    scrollCallback: function scrollCallback() {
      var _this = this;

      if (this.scrolled) {
        this.scrolled = false;
        this.vmArr.map(function (vm) {
          try {
            var status = vm.start();
            if (!status) {
              _this.removeVM(vm);
            }
          } catch (e) {
            console.error('子组件需start方法');
          }
        });
        if (this.vmArr.length < 1 && !this.config.live) {
          // 停止监听
          this.stop();
        }
      }
    },
    stop: function stop() {
      this.stopped = true;
      off(window, 'scroll', this.scrollHandler);
      off(window, 'resize', this.scrollHandler);
      if (this.interval !== null) {
        clearInterval(this.interval);
      }
    }
  },
  destroyed: function destroyed() {
    this.stop();
  },

  computed: {}
};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _global$1 = /*#__PURE__*/Object.freeze({
  default: _global,
  __moduleExports: _global
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _core$1 = /*#__PURE__*/Object.freeze({
  default: _core,
  __moduleExports: _core,
  version: _core_1
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

var _aFunction$1 = /*#__PURE__*/Object.freeze({
  default: _aFunction,
  __moduleExports: _aFunction
});

var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

// optional / simple context binding

var _ctx = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _ctx$1 = /*#__PURE__*/Object.freeze({
  default: _ctx,
  __moduleExports: _ctx
});

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _isObject$1 = /*#__PURE__*/Object.freeze({
  default: _isObject,
  __moduleExports: _isObject
});

var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

var _anObject = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _anObject$1 = /*#__PURE__*/Object.freeze({
  default: _anObject,
  __moduleExports: _anObject
});

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

var _fails$1 = /*#__PURE__*/Object.freeze({
  default: _fails,
  __moduleExports: _fails
});

var require$$1 = ( _fails$1 && _fails ) || _fails$1;

// Thank's IE8 for his funny defineProperty
var _descriptors = !require$$1(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var _descriptors$1 = /*#__PURE__*/Object.freeze({
  default: _descriptors,
  __moduleExports: _descriptors
});

var global$1 = ( _global$1 && _global ) || _global$1;

var document$1 = global$1.document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document$1) && isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _domCreate$1 = /*#__PURE__*/Object.freeze({
  default: _domCreate,
  __moduleExports: _domCreate
});

var require$$0 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

var require$$2 = ( _domCreate$1 && _domCreate ) || _domCreate$1;

var _ie8DomDefine = !require$$0 && !require$$1(function () {
  return Object.defineProperty(require$$2('div'), 'a', { get: function () { return 7; } }).a != 7;
});

var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
  default: _ie8DomDefine,
  __moduleExports: _ie8DomDefine
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
  default: _toPrimitive,
  __moduleExports: _toPrimitive
});

var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

var dP = Object.defineProperty;

var f = require$$0 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _objectDp$1 = /*#__PURE__*/Object.freeze({
  default: _objectDp,
  __moduleExports: _objectDp,
  f: f
});

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
  default: _propertyDesc,
  __moduleExports: _propertyDesc
});

var dP$1 = ( _objectDp$1 && _objectDp ) || _objectDp$1;

var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

var _hide = require$$0 ? function (object, key, value) {
  return dP$1.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var _hide$1 = /*#__PURE__*/Object.freeze({
  default: _hide,
  __moduleExports: _hide
});

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _has$1 = /*#__PURE__*/Object.freeze({
  default: _has,
  __moduleExports: _has
});

var core = ( _core$1 && _core ) || _core$1;

var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

var hide = ( _hide$1 && _hide ) || _hide$1;

var has = ( _has$1 && _has ) || _has$1;

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] : (global$1[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var _export$1 = /*#__PURE__*/Object.freeze({
  default: _export,
  __moduleExports: _export
});

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var _cof$1 = /*#__PURE__*/Object.freeze({
  default: _cof,
  __moduleExports: _cof
});

var cof = ( _cof$1 && _cof ) || _cof$1;

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

var _iobject$1 = /*#__PURE__*/Object.freeze({
  default: _iobject,
  __moduleExports: _iobject
});

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

var _defined$1 = /*#__PURE__*/Object.freeze({
  default: _defined,
  __moduleExports: _defined
});

var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

var defined = ( _defined$1 && _defined ) || _defined$1;

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return IObject(defined(it));
};

var _toIobject$1 = /*#__PURE__*/Object.freeze({
  default: _toIobject,
  __moduleExports: _toIobject
});

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

var _toInteger$1 = /*#__PURE__*/Object.freeze({
  default: _toInteger,
  __moduleExports: _toInteger
});

var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var _toLength$1 = /*#__PURE__*/Object.freeze({
  default: _toLength,
  __moduleExports: _toLength
});

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
  default: _toAbsoluteIndex,
  __moduleExports: _toAbsoluteIndex
});

var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
  default: _arrayIncludes,
  __moduleExports: _arrayIncludes
});

var SHARED = '__core-js_shared__';
var store = global$1[SHARED] || (global$1[SHARED] = {});
var _shared = function (key) {
  return store[key] || (store[key] = {});
};

var _shared$1 = /*#__PURE__*/Object.freeze({
  default: _shared,
  __moduleExports: _shared
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _uid$1 = /*#__PURE__*/Object.freeze({
  default: _uid,
  __moduleExports: _uid
});

var require$$0$1 = ( _shared$1 && _shared ) || _shared$1;

var uid = ( _uid$1 && _uid ) || _uid$1;

var shared = require$$0$1('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

var _sharedKey$1 = /*#__PURE__*/Object.freeze({
  default: _sharedKey,
  __moduleExports: _sharedKey
});

var require$$0$2 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

var require$$1$1 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

var arrayIndexOf = require$$0$2(false);
var IE_PROTO = require$$1$1('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
  default: _objectKeysInternal,
  __moduleExports: _objectKeysInternal
});

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
  default: _enumBugKeys,
  __moduleExports: _enumBugKeys
});

var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

var enumBugKeys = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

var _objectKeys$1 = /*#__PURE__*/Object.freeze({
  default: _objectKeys,
  __moduleExports: _objectKeys
});

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var _objectGops$1 = /*#__PURE__*/Object.freeze({
  default: _objectGops,
  __moduleExports: _objectGops,
  f: f$1
});

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

var _objectPie$1 = /*#__PURE__*/Object.freeze({
  default: _objectPie,
  __moduleExports: _objectPie,
  f: f$2
});

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(defined(it));
};

var _toObject$1 = /*#__PURE__*/Object.freeze({
  default: _toObject,
  __moduleExports: _toObject
});

var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

// 19.1.2.1 Object.assign(target, source, ...)





var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || require$$1(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

var _objectAssign$1 = /*#__PURE__*/Object.freeze({
  default: _objectAssign,
  __moduleExports: _objectAssign
});

var $export$1 = ( _export$1 && _export ) || _export$1;

var require$$0$3 = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

// 19.1.3.1 Object.assign(target, source)


$export$1($export$1.S + $export$1.F, 'Object', { assign: require$$0$3 });

var assign = core.Object.assign;

var assign$1 = /*#__PURE__*/Object.freeze({
  default: assign,
  __moduleExports: assign
});

var require$$0$4 = ( assign$1 && assign ) || assign$1;

var assign$2 = createCommonjsModule(function (module) {
module.exports = { "default": require$$0$4, __esModule: true };
});

var assign$3 = unwrapExports(assign$2);

var assign$4 = /*#__PURE__*/Object.freeze({
  default: assign$3,
  __moduleExports: assign$2
});

var _assign = ( assign$4 && assign$3 ) || assign$4;

var _extends = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
});

var _extends$1 = unwrapExports(_extends);

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export$1($export$1.S + $export$1.F * !require$$0, 'Object', { defineProperty: dP$1.f });

var $Object = core.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = /*#__PURE__*/Object.freeze({
  default: defineProperty,
  __moduleExports: defineProperty
});

var require$$0$5 = ( defineProperty$1 && defineProperty ) || defineProperty$1;

var defineProperty$2 = createCommonjsModule(function (module) {
module.exports = { "default": require$$0$5, __esModule: true };
});

var defineProperty$3 = unwrapExports(defineProperty$2);

var defineProperty$4 = /*#__PURE__*/Object.freeze({
  default: defineProperty$3,
  __moduleExports: defineProperty$2
});

var _defineProperty = ( defineProperty$4 && defineProperty$3 ) || defineProperty$4;

var defineProperty$5 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;



var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
});

var _defineProperty$1 = unwrapExports(defineProperty$5);

/**
 * Created by liubingwen on 2017/10/23.
 */
var isServer$1 = Vue.prototype.$isServer;
// 判断是否为手机
var isMobile = function isMobile() {
  if (!isServer$1) {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
    );
  }
};

/**
 * Created by liubingwen on 2017/10/23.
 */
var mixins = {
  props: {
    offset: {
      type: Number,
      default: 0
    },
    // 是否立即执行
    begin: {
      type: Boolean,
      default: false
    },
    // 禁用滚动计算
    scrollListen: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      end: false,
      status: false
    };
  },
  created: function created() {
    if (!this.$isServer) {
      this.addVM();
    }
  },
  mounted: function mounted() {
    this.start();
  },

  methods: {
    addVM: function addVM() {
      var parent = this.parent;

      parent && parent.setVM(this);
    },
    removeVM: function removeVM() {
      var parent = this.parent;

      parent && parent.removeVM(this);
    },
    start: function start() {
      // 执行运动校验
      var begin = this.begin;

      if (begin || this.isVisible()) {
        var status = this.status,
            end = this.end;

        if (status || end) return '';
        this.status = true;
        this.$emit('start', this);
        this.show();
        return false;
      } else {
        return true;
      }
    },
    endCallback: function endCallback() {
      this.end = true;
      this.status = false;
      this.$emit('end', this);
    },
    isVisible: function isVisible$$1() {
      var scrollListen = this.scrollListen,
          offset = this.offset;

      if (!scrollListen) return false;
      return isVisible(this.$el, offset);
    }
  },
  computed: {
    parent: function parent() {
      var scrollListen = this.scrollListen;

      if (scrollListen) {
        var parent = this.$parent;
        while (parent && parent.$options.name !== 'UAnimateContainer') {
          parent = parent.$parent;
        }
        return parent;
      } else {
        return undefined;
      }
    },

    // 判断是否为手机
    disabled: function disabled() {
      return isMobile();
    }
  }
};

var UAnimate = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.className, style: _vm.style }, [_vm._t("default")], 2);
  }, staticRenderFns: [],
  mixins: [mixins],
  name: 'UAnimate',
  props: {
    duration: {
      type: String,
      default: '1s'
    },
    delay: {
      type: String,
      default: '0s'
    },
    iteration: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    animateClass: {
      type: String,
      default: 'animated'
    }
  },
  data: function data() {
    return {
      style: {
        visibility: 'hidden'
      },
      className: {}
    };
  },
  created: function created() {
    if (!this.$isServer) {
      var disabled = this.disabled;

      if (disabled) {
        this.style.visibility = 'visible';
      } else {
        this.applyStyle(true);
      }
    }
  },

  methods: {
    animate: function animate(callback) {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(callback);
      } else {
        callback();
      }
    },
    applyStyle: function applyStyle() {
      var _this = this;

      var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.animate(function () {
        _this.customStyle(hidden);
      });
    },
    customStyle: function customStyle(hidden) {
      var _className;

      var duration = this.duration,
          delay = this.delay,
          iteration = this.iteration,
          style = this.style,
          name = this.name,
          animateClass = this.animateClass;

      this.className = (_className = {}, _defineProperty$1(_className, name, name && !hidden), _defineProperty$1(_className, animateClass, animateClass && !hidden), _className);
      this.style = _extends$1({}, style, {
        visibility: hidden ? 'hidden' : 'visible',
        animationDuration: duration,
        animationDelay: delay,
        animationIterationCount: iteration
      });
    },
    resetAnimation: function resetAnimation(event) {
      this.removeVM(this);
      var animateClass = this.animateClass;

      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        this.className = {};
        this.style = {};
        this.endCallback();
      }
    },
    show: function show() {
      var _this2 = this;

      this.applyStyle();
      var elem = this.$el;
      var eventArr = ['animationend', 'oanimationend', 'webkitAnimationEnd', 'MSAnimationEnd'];
      eventArr.forEach(function (event) {
        on(elem, event, _this2.resetAnimation);
      });
    }
  },
  computed: {}
};

/**
 * Created by liubingwen on 2017/10/18.
 */
function install(Vue$$1) {
  Vue$$1.component(UAnimateContainer.name, UAnimateContainer);
  Vue$$1.component(UAnimate.name, UAnimate);
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
// export default install

export { install, UAnimate, UAnimateContainer };