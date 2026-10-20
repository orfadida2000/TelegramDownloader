/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      /******/
    }
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // create a fake namespace object
  /******/ // mode & 1: value is a module id, require it
  /******/ // mode & 2: merge all properties of value into the ns
  /******/ // mode & 4: return value when already ns object
  /******/ // mode & 8|1: behave like require
  /******/ __webpack_require__.t = function (value, mode) {
    /******/ if (mode & 1) value = __webpack_require__(value);
    /******/ if (mode & 8) return value;
    /******/ if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
    /******/ var ns = Object.create(null);
    /******/ __webpack_require__.r(ns);
    /******/ Object.defineProperty(ns, "default", { enumerable: true, value: value });
    /******/ if (mode & 2 && typeof value != "string")
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key),
        );
    /******/ return ns;
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "/";
  /******/
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 3));
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ "188f": /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      // EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
      var vue_runtime_esm = __webpack_require__("2b0e");

      // CONCATENATED MODULE: ./node_modules/vue-i18n/dist/vue-i18n.esm.js
      /*!
       * vue-i18n v8.28.2
       * (c) 2022 kazuya kawaguchi
       * Released under the MIT License.
       */
      /*  */

      /**
       * constants
       */

      var numberFormatKeys = [
        "compactDisplay",
        "currency",
        "currencyDisplay",
        "currencySign",
        "localeMatcher",
        "notation",
        "numberingSystem",
        "signDisplay",
        "style",
        "unit",
        "unitDisplay",
        "useGrouping",
        "minimumIntegerDigits",
        "minimumFractionDigits",
        "maximumFractionDigits",
        "minimumSignificantDigits",
        "maximumSignificantDigits",
      ];

      var dateTimeFormatKeys = [
        "dateStyle",
        "timeStyle",
        "calendar",
        "localeMatcher",
        "hour12",
        "hourCycle",
        "timeZone",
        "formatMatcher",
        "weekday",
        "era",
        "year",
        "month",
        "day",
        "hour",
        "minute",
        "second",
        "timeZoneName",
      ];

      /**
       * utilities
       */

      function warn(msg, err) {
        if (typeof console !== "undefined") {
          console.warn("[vue-i18n] " + msg);
          /* istanbul ignore if */
          if (err) {
            console.warn(err.stack);
          }
        }
      }

      function error(msg, err) {
        if (typeof console !== "undefined") {
          console.error("[vue-i18n] " + msg);
          /* istanbul ignore if */
          if (err) {
            console.error(err.stack);
          }
        }
      }

      var isArray = Array.isArray;

      function isObject(obj) {
        return obj !== null && typeof obj === "object";
      }

      function isBoolean(val) {
        return typeof val === "boolean";
      }

      function isString(val) {
        return typeof val === "string";
      }

      var vue_i18n_esm_toString = Object.prototype.toString;
      var OBJECT_STRING = "[object Object]";
      function isPlainObject(obj) {
        return vue_i18n_esm_toString.call(obj) === OBJECT_STRING;
      }

      function isNull(val) {
        return val === null || val === undefined;
      }

      function isFunction(val) {
        return typeof val === "function";
      }

      function parseArgs() {
        var args = [],
          len = arguments.length;
        while (len--) args[len] = arguments[len];

        var locale = null;
        var params = null;
        if (args.length === 1) {
          if (isObject(args[0]) || isArray(args[0])) {
            params = args[0];
          } else if (typeof args[0] === "string") {
            locale = args[0];
          }
        } else if (args.length === 2) {
          if (typeof args[0] === "string") {
            locale = args[0];
          }
          /* istanbul ignore if */
          if (isObject(args[1]) || isArray(args[1])) {
            params = args[1];
          }
        }

        return { locale: locale, params: params };
      }

      function looseClone(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

      function remove(arr, item) {
        if (arr.delete(item)) {
          return arr;
        }
      }

      function arrayFrom(arr) {
        var ret = [];
        arr.forEach(function (a) {
          return ret.push(a);
        });
        return ret;
      }

      function includes(arr, item) {
        return !!~arr.indexOf(item);
      }

      var vue_i18n_esm_hasOwnProperty = Object.prototype.hasOwnProperty;
      function hasOwn(obj, key) {
        return vue_i18n_esm_hasOwnProperty.call(obj, key);
      }

      function merge(target) {
        var arguments$1 = arguments;

        var output = Object(target);
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments$1[i];
          if (source !== undefined && source !== null) {
            var key = void 0;
            for (key in source) {
              if (hasOwn(source, key)) {
                if (isObject(source[key])) {
                  output[key] = merge(output[key], source[key]);
                } else {
                  output[key] = source[key];
                }
              }
            }
          }
        }
        return output;
      }

      function looseEqual(a, b) {
        if (a === b) {
          return true;
        }
        var isObjectA = isObject(a);
        var isObjectB = isObject(b);
        if (isObjectA && isObjectB) {
          try {
            var isArrayA = isArray(a);
            var isArrayB = isArray(b);
            if (isArrayA && isArrayB) {
              return (
                a.length === b.length &&
                a.every(function (e, i) {
                  return looseEqual(e, b[i]);
                })
              );
            } else if (!isArrayA && !isArrayB) {
              var keysA = Object.keys(a);
              var keysB = Object.keys(b);
              return (
                keysA.length === keysB.length &&
                keysA.every(function (key) {
                  return looseEqual(a[key], b[key]);
                })
              );
            } else {
              /* istanbul ignore next */
              return false;
            }
          } catch (e) {
            /* istanbul ignore next */
            return false;
          }
        } else if (!isObjectA && !isObjectB) {
          return String(a) === String(b);
        } else {
          return false;
        }
      }

      /**
       * Sanitizes html special characters from input strings. For mitigating risk of XSS attacks.
       * @param rawText The raw input from the user that should be escaped.
       */
      function escapeHtml(rawText) {
        return rawText
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");
      }

      /**
       * Escapes html tags and special symbols from all provided params which were returned from parseArgs().params.
       * This method performs an in-place operation on the params object.
       *
       * @param {any} params Parameters as provided from `parseArgs().params`.
       *                     May be either an array of strings or a string->any map.
       *
       * @returns The manipulated `params` object.
       */
      function escapeParams(params) {
        if (params != null) {
          Object.keys(params).forEach(function (key) {
            if (typeof params[key] == "string") {
              params[key] = escapeHtml(params[key]);
            }
          });
        }
        return params;
      }

      /*  */

      function extend(Vue) {
        if (!Vue.prototype.hasOwnProperty("$i18n")) {
          // $FlowFixMe
          Object.defineProperty(Vue.prototype, "$i18n", {
            get: function get() {
              return this._i18n;
            },
          });
        }

        Vue.prototype.$t = function (key) {
          var values = [],
            len = arguments.length - 1;
          while (len-- > 0) values[len] = arguments[len + 1];

          var i18n = this.$i18n;
          return i18n._t.apply(i18n, [key, i18n.locale, i18n._getMessages(), this].concat(values));
        };

        Vue.prototype.$tc = function (key, choice) {
          var values = [],
            len = arguments.length - 2;
          while (len-- > 0) values[len] = arguments[len + 2];

          var i18n = this.$i18n;
          return i18n._tc.apply(
            i18n,
            [key, i18n.locale, i18n._getMessages(), this, choice].concat(values),
          );
        };

        Vue.prototype.$te = function (key, locale) {
          var i18n = this.$i18n;
          return i18n._te(key, i18n.locale, i18n._getMessages(), locale);
        };

        Vue.prototype.$d = function (value) {
          var ref;

          var args = [],
            len = arguments.length - 1;
          while (len-- > 0) args[len] = arguments[len + 1];
          return (ref = this.$i18n).d.apply(ref, [value].concat(args));
        };

        Vue.prototype.$n = function (value) {
          var ref;

          var args = [],
            len = arguments.length - 1;
          while (len-- > 0) args[len] = arguments[len + 1];
          return (ref = this.$i18n).n.apply(ref, [value].concat(args));
        };
      }

      /*  */

      /**
       * Mixin
       *
       * If `bridge` mode, empty mixin is returned,
       * else regulary mixin implementation is returned.
       */
      function defineMixin(bridge) {
        if (bridge === void 0) bridge = false;

        function mounted() {
          if (this !== this.$root && this.$options.__INTLIFY_META__ && this.$el) {
            this.$el.setAttribute("data-intlify", this.$options.__INTLIFY_META__);
          }
        }

        return bridge
          ? { mounted: mounted } // delegate `vue-i18n-bridge` mixin implementation
          : {
              // regulary
              beforeCreate: function beforeCreate() {
                var options = this.$options;
                options.i18n = options.i18n || (options.__i18nBridge || options.__i18n ? {} : null);

                if (options.i18n) {
                  if (options.i18n instanceof VueI18n) {
                    // init locale messages via custom blocks
                    if (options.__i18nBridge || options.__i18n) {
                      try {
                        var localeMessages =
                          options.i18n && options.i18n.messages ? options.i18n.messages : {};
                        var _i18n = options.__i18nBridge || options.__i18n;
                        _i18n.forEach(function (resource) {
                          localeMessages = merge(localeMessages, JSON.parse(resource));
                        });
                        Object.keys(localeMessages).forEach(function (locale) {
                          options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
                        });
                      } catch (e) {
                        if (false) {
                        }
                      }
                    }
                    this._i18n = options.i18n;
                    this._i18nWatcher = this._i18n.watchI18nData();
                  } else if (isPlainObject(options.i18n)) {
                    var rootI18n =
                      this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n
                        ? this.$root.$i18n
                        : null;
                    // component local i18n
                    if (rootI18n) {
                      options.i18n.root = this.$root;
                      options.i18n.formatter = rootI18n.formatter;
                      options.i18n.fallbackLocale = rootI18n.fallbackLocale;
                      options.i18n.formatFallbackMessages = rootI18n.formatFallbackMessages;
                      options.i18n.silentTranslationWarn = rootI18n.silentTranslationWarn;
                      options.i18n.silentFallbackWarn = rootI18n.silentFallbackWarn;
                      options.i18n.pluralizationRules = rootI18n.pluralizationRules;
                      options.i18n.preserveDirectiveContent = rootI18n.preserveDirectiveContent;
                    }

                    // init locale messages via custom blocks
                    if (options.__i18nBridge || options.__i18n) {
                      try {
                        var localeMessages$1 =
                          options.i18n && options.i18n.messages ? options.i18n.messages : {};
                        var _i18n$1 = options.__i18nBridge || options.__i18n;
                        _i18n$1.forEach(function (resource) {
                          localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
                        });
                        options.i18n.messages = localeMessages$1;
                      } catch (e) {
                        if (false) {
                        }
                      }
                    }

                    var ref = options.i18n;
                    var sharedMessages = ref.sharedMessages;
                    if (sharedMessages && isPlainObject(sharedMessages)) {
                      options.i18n.messages = merge(options.i18n.messages, sharedMessages);
                    }

                    this._i18n = new VueI18n(options.i18n);
                    this._i18nWatcher = this._i18n.watchI18nData();

                    if (options.i18n.sync === undefined || !!options.i18n.sync) {
                      this._localeWatcher = this.$i18n.watchLocale();
                    }

                    if (rootI18n) {
                      rootI18n.onComponentInstanceCreated(this._i18n);
                    }
                  } else {
                    if (false) {
                    }
                  }
                } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
                  // root i18n
                  this._i18n = this.$root.$i18n;
                } else if (
                  options.parent &&
                  options.parent.$i18n &&
                  options.parent.$i18n instanceof VueI18n
                ) {
                  // parent i18n
                  this._i18n = options.parent.$i18n;
                }
              },

              beforeMount: function beforeMount() {
                var options = this.$options;
                options.i18n = options.i18n || (options.__i18nBridge || options.__i18n ? {} : null);

                if (options.i18n) {
                  if (options.i18n instanceof VueI18n) {
                    // init locale messages via custom blocks
                    this._i18n.subscribeDataChanging(this);
                    this._subscribing = true;
                  } else if (isPlainObject(options.i18n)) {
                    this._i18n.subscribeDataChanging(this);
                    this._subscribing = true;
                  } else {
                    if (false) {
                    }
                  }
                } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
                  this._i18n.subscribeDataChanging(this);
                  this._subscribing = true;
                } else if (
                  options.parent &&
                  options.parent.$i18n &&
                  options.parent.$i18n instanceof VueI18n
                ) {
                  this._i18n.subscribeDataChanging(this);
                  this._subscribing = true;
                }
              },

              mounted: mounted,

              beforeDestroy: function beforeDestroy() {
                if (!this._i18n) {
                  return;
                }

                var self = this;
                this.$nextTick(function () {
                  if (self._subscribing) {
                    self._i18n.unsubscribeDataChanging(self);
                    delete self._subscribing;
                  }

                  if (self._i18nWatcher) {
                    self._i18nWatcher();
                    self._i18n.destroyVM();
                    delete self._i18nWatcher;
                  }

                  if (self._localeWatcher) {
                    self._localeWatcher();
                    delete self._localeWatcher;
                  }
                });
              },
            };
      }

      /*  */

      var interpolationComponent = {
        name: "i18n",
        functional: true,
        props: {
          tag: {
            type: [String, Boolean, Object],
            default: "span",
          },
          path: {
            type: String,
            required: true,
          },
          locale: {
            type: String,
          },
          places: {
            type: [Array, Object],
          },
        },
        render: function render(h, ref) {
          var data = ref.data;
          var parent = ref.parent;
          var props = ref.props;
          var slots = ref.slots;

          var $i18n = parent.$i18n;
          if (!$i18n) {
            if (false) {
            }
            return;
          }

          var path = props.path;
          var locale = props.locale;
          var places = props.places;
          var params = slots();
          var children = $i18n.i(
            path,
            locale,
            onlyHasDefaultPlace(params) || places
              ? useLegacyPlaces(params.default, places)
              : params,
          );

          var tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : "span";
          return tag ? h(tag, data, children) : children;
        },
      };

      function onlyHasDefaultPlace(params) {
        var prop;
        for (prop in params) {
          if (prop !== "default") {
            return false;
          }
        }
        return Boolean(prop);
      }

      function useLegacyPlaces(children, places) {
        var params = places ? createParamsFromPlaces(places) : {};

        if (!children) {
          return params;
        }

        // Filter empty text nodes
        children = children.filter(function (child) {
          return child.tag || child.text.trim() !== "";
        });

        var everyPlace = children.every(vnodeHasPlaceAttribute);
        if (false) {
        }

        return children.reduce(everyPlace ? assignChildPlace : assignChildIndex, params);
      }

      function createParamsFromPlaces(places) {
        if (false) {
        }

        return Array.isArray(places)
          ? places.reduce(assignChildIndex, {})
          : Object.assign({}, places);
      }

      function assignChildPlace(params, child) {
        if (child.data && child.data.attrs && child.data.attrs.place) {
          params[child.data.attrs.place] = child;
        }
        return params;
      }

      function assignChildIndex(params, child, index) {
        params[index] = child;
        return params;
      }

      function vnodeHasPlaceAttribute(vnode) {
        return Boolean(vnode.data && vnode.data.attrs && vnode.data.attrs.place);
      }

      /*  */

      var numberComponent = {
        name: "i18n-n",
        functional: true,
        props: {
          tag: {
            type: [String, Boolean, Object],
            default: "span",
          },
          value: {
            type: Number,
            required: true,
          },
          format: {
            type: [String, Object],
          },
          locale: {
            type: String,
          },
        },
        render: function render(h, ref) {
          var props = ref.props;
          var parent = ref.parent;
          var data = ref.data;

          var i18n = parent.$i18n;

          if (!i18n) {
            if (false) {
            }
            return null;
          }

          var key = null;
          var options = null;

          if (isString(props.format)) {
            key = props.format;
          } else if (isObject(props.format)) {
            if (props.format.key) {
              key = props.format.key;
            }

            // Filter out number format options only
            options = Object.keys(props.format).reduce(function (acc, prop) {
              var obj;

              if (includes(numberFormatKeys, prop)) {
                return Object.assign({}, acc, ((obj = {}), (obj[prop] = props.format[prop]), obj));
              }
              return acc;
            }, null);
          }

          var locale = props.locale || i18n.locale;
          var parts = i18n._ntp(props.value, locale, key, options);

          var values = parts.map(function (part, index) {
            var obj;

            var slot = data.scopedSlots && data.scopedSlots[part.type];
            return slot
              ? slot(
                  ((obj = {}),
                  (obj[part.type] = part.value),
                  (obj.index = index),
                  (obj.parts = parts),
                  obj),
                )
              : part.value;
          });

          var tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : "span";
          return tag
            ? h(
                tag,
                {
                  attrs: data.attrs,
                  class: data["class"],
                  staticClass: data.staticClass,
                },
                values,
              )
            : values;
        },
      };

      /*  */

      function bind(el, binding, vnode) {
        if (!assert(el, vnode)) {
          return;
        }

        t(el, binding, vnode);
      }

      function update(el, binding, vnode, oldVNode) {
        if (!assert(el, vnode)) {
          return;
        }

        var i18n = vnode.context.$i18n;
        if (
          localeEqual(el, vnode) &&
          looseEqual(binding.value, binding.oldValue) &&
          looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale))
        ) {
          return;
        }

        t(el, binding, vnode);
      }

      function unbind(el, binding, vnode, oldVNode) {
        var vm = vnode.context;
        if (!vm) {
          warn("Vue instance does not exists in VNode context");
          return;
        }

        var i18n = vnode.context.$i18n || {};
        if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
          el.textContent = "";
        }
        el._vt = undefined;
        delete el["_vt"];
        el._locale = undefined;
        delete el["_locale"];
        el._localeMessage = undefined;
        delete el["_localeMessage"];
      }

      function assert(el, vnode) {
        var vm = vnode.context;
        if (!vm) {
          warn("Vue instance does not exists in VNode context");
          return false;
        }

        if (!vm.$i18n) {
          warn("VueI18n instance does not exists in Vue instance");
          return false;
        }

        return true;
      }

      function localeEqual(el, vnode) {
        var vm = vnode.context;
        return el._locale === vm.$i18n.locale;
      }

      function t(el, binding, vnode) {
        var ref$1, ref$2;

        var value = binding.value;

        var ref = parseValue(value);
        var path = ref.path;
        var locale = ref.locale;
        var args = ref.args;
        var choice = ref.choice;
        if (!path && !locale && !args) {
          warn("value type not supported");
          return;
        }

        if (!path) {
          warn("`path` is required in v-t directive");
          return;
        }

        var vm = vnode.context;
        if (choice != null) {
          el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(
            ref$1,
            [path, choice].concat(makeParams(locale, args)),
          );
        } else {
          el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(
            ref$2,
            [path].concat(makeParams(locale, args)),
          );
        }
        el._locale = vm.$i18n.locale;
        el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
      }

      function parseValue(value) {
        var path;
        var locale;
        var args;
        var choice;

        if (isString(value)) {
          path = value;
        } else if (isPlainObject(value)) {
          path = value.path;
          locale = value.locale;
          args = value.args;
          choice = value.choice;
        }

        return { path: path, locale: locale, args: args, choice: choice };
      }

      function makeParams(locale, args) {
        var params = [];

        locale && params.push(locale);
        if (args && (Array.isArray(args) || isPlainObject(args))) {
          params.push(args);
        }

        return params;
      }

      var Vue;

      function install(_Vue, options) {
        if (options === void 0) options = { bridge: false };

        /* istanbul ignore if */
        if (false) {
        }
        install.installed = true;

        Vue = _Vue;

        var version = (Vue.version && Number(Vue.version.split(".")[0])) || -1;
        /* istanbul ignore if */
        if (false) {
        }

        extend(Vue);
        Vue.mixin(defineMixin(options.bridge));
        Vue.directive("t", { bind: bind, update: update, unbind: unbind });
        Vue.component(interpolationComponent.name, interpolationComponent);
        Vue.component(numberComponent.name, numberComponent);

        // use simple mergeStrategies to prevent i18n instance lose '__proto__'
        var strats = Vue.config.optionMergeStrategies;
        strats.i18n = function (parentVal, childVal) {
          return childVal === undefined ? parentVal : childVal;
        };
      }

      /*  */

      var BaseFormatter = function BaseFormatter() {
        this._caches = Object.create(null);
      };

      BaseFormatter.prototype.interpolate = function interpolate(message, values) {
        if (!values) {
          return [message];
        }
        var tokens = this._caches[message];
        if (!tokens) {
          tokens = parse(message);
          this._caches[message] = tokens;
        }
        return compile(tokens, values);
      };

      var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
      var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

      function parse(format) {
        var tokens = [];
        var position = 0;

        var text = "";
        while (position < format.length) {
          var char = format[position++];
          if (char === "{") {
            if (text) {
              tokens.push({ type: "text", value: text });
            }

            text = "";
            var sub = "";
            char = format[position++];
            while (char !== undefined && char !== "}") {
              sub += char;
              char = format[position++];
            }
            var isClosed = char === "}";

            var type = RE_TOKEN_LIST_VALUE.test(sub)
              ? "list"
              : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
                ? "named"
                : "unknown";
            tokens.push({ value: sub, type: type });
          } else if (char === "%") {
            // when found rails i18n syntax, skip text capture
            if (format[position] !== "{") {
              text += char;
            }
          } else {
            text += char;
          }
        }

        text && tokens.push({ type: "text", value: text });

        return tokens;
      }

      function compile(tokens, values) {
        var compiled = [];
        var index = 0;

        var mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
        if (mode === "unknown") {
          return compiled;
        }

        while (index < tokens.length) {
          var token = tokens[index];
          switch (token.type) {
            case "text":
              compiled.push(token.value);
              break;
            case "list":
              compiled.push(values[parseInt(token.value, 10)]);
              break;
            case "named":
              if (mode === "named") {
                compiled.push(values[token.value]);
              } else {
                if (false) {
                }
              }
              break;
            case "unknown":
              if (false) {
              }
              break;
          }
          index++;
        }

        return compiled;
      }

      /*  */

      /**
       *  Path parser
       *  - Inspired:
       *    Vue.js Path parser
       */

      // actions
      var APPEND = 0;
      var PUSH = 1;
      var INC_SUB_PATH_DEPTH = 2;
      var PUSH_SUB_PATH = 3;

      // states
      var BEFORE_PATH = 0;
      var IN_PATH = 1;
      var BEFORE_IDENT = 2;
      var IN_IDENT = 3;
      var IN_SUB_PATH = 4;
      var IN_SINGLE_QUOTE = 5;
      var IN_DOUBLE_QUOTE = 6;
      var AFTER_PATH = 7;
      var ERROR = 8;

      var pathStateMachine = [];

      pathStateMachine[BEFORE_PATH] = {
        ws: [BEFORE_PATH],
        ident: [IN_IDENT, APPEND],
        "[": [IN_SUB_PATH],
        eof: [AFTER_PATH],
      };

      pathStateMachine[IN_PATH] = {
        ws: [IN_PATH],
        ".": [BEFORE_IDENT],
        "[": [IN_SUB_PATH],
        eof: [AFTER_PATH],
      };

      pathStateMachine[BEFORE_IDENT] = {
        ws: [BEFORE_IDENT],
        ident: [IN_IDENT, APPEND],
        0: [IN_IDENT, APPEND],
        number: [IN_IDENT, APPEND],
      };

      pathStateMachine[IN_IDENT] = {
        ident: [IN_IDENT, APPEND],
        0: [IN_IDENT, APPEND],
        number: [IN_IDENT, APPEND],
        ws: [IN_PATH, PUSH],
        ".": [BEFORE_IDENT, PUSH],
        "[": [IN_SUB_PATH, PUSH],
        eof: [AFTER_PATH, PUSH],
      };

      pathStateMachine[IN_SUB_PATH] = {
        "'": [IN_SINGLE_QUOTE, APPEND],
        '"': [IN_DOUBLE_QUOTE, APPEND],
        "[": [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
        "]": [IN_PATH, PUSH_SUB_PATH],
        eof: ERROR,
        else: [IN_SUB_PATH, APPEND],
      };

      pathStateMachine[IN_SINGLE_QUOTE] = {
        "'": [IN_SUB_PATH, APPEND],
        eof: ERROR,
        else: [IN_SINGLE_QUOTE, APPEND],
      };

      pathStateMachine[IN_DOUBLE_QUOTE] = {
        '"': [IN_SUB_PATH, APPEND],
        eof: ERROR,
        else: [IN_DOUBLE_QUOTE, APPEND],
      };

      /**
       * Check if an expression is a literal value.
       */

      var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
      function isLiteral(exp) {
        return literalValueRE.test(exp);
      }

      /**
       * Strip quotes from a string
       */

      function stripQuotes(str) {
        var a = str.charCodeAt(0);
        var b = str.charCodeAt(str.length - 1);
        return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
      }

      /**
       * Determine the type of a character in a keypath.
       */

      function getPathCharType(ch) {
        if (ch === undefined || ch === null) {
          return "eof";
        }

        var code = ch.charCodeAt(0);

        switch (code) {
          case 0x5b: // [
          case 0x5d: // ]
          case 0x2e: // .
          case 0x22: // "
          case 0x27: // '
            return ch;

          case 0x5f: // _
          case 0x24: // $
          case 0x2d: // -
            return "ident";

          case 0x09: // Tab
          case 0x0a: // Newline
          case 0x0d: // Return
          case 0xa0: // No-break space
          case 0xfeff: // Byte Order Mark
          case 0x2028: // Line Separator
          case 0x2029: // Paragraph Separator
            return "ws";
        }

        return "ident";
      }

      /**
       * Format a subPath, return its plain form if it is
       * a literal string or number. Otherwise prepend the
       * dynamic indicator (*).
       */

      function formatSubPath(path) {
        var trimmed = path.trim();
        // invalid leading 0
        if (path.charAt(0) === "0" && isNaN(path)) {
          return false;
        }

        return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
      }

      /**
       * Parse a string path into an array of segments
       */

      function parse$1(path) {
        var keys = [];
        var index = -1;
        var mode = BEFORE_PATH;
        var subPathDepth = 0;
        var c;
        var key;
        var newChar;
        var type;
        var transition;
        var action;
        var typeMap;
        var actions = [];

        actions[PUSH] = function () {
          if (key !== undefined) {
            keys.push(key);
            key = undefined;
          }
        };

        actions[APPEND] = function () {
          if (key === undefined) {
            key = newChar;
          } else {
            key += newChar;
          }
        };

        actions[INC_SUB_PATH_DEPTH] = function () {
          actions[APPEND]();
          subPathDepth++;
        };

        actions[PUSH_SUB_PATH] = function () {
          if (subPathDepth > 0) {
            subPathDepth--;
            mode = IN_SUB_PATH;
            actions[APPEND]();
          } else {
            subPathDepth = 0;
            if (key === undefined) {
              return false;
            }
            key = formatSubPath(key);
            if (key === false) {
              return false;
            } else {
              actions[PUSH]();
            }
          }
        };

        function maybeUnescapeQuote() {
          var nextChar = path[index + 1];
          if (
            (mode === IN_SINGLE_QUOTE && nextChar === "'") ||
            (mode === IN_DOUBLE_QUOTE && nextChar === '"')
          ) {
            index++;
            newChar = "\\" + nextChar;
            actions[APPEND]();
            return true;
          }
        }

        while (mode !== null) {
          index++;
          c = path[index];

          if (c === "\\" && maybeUnescapeQuote()) {
            continue;
          }

          type = getPathCharType(c);
          typeMap = pathStateMachine[mode];
          transition = typeMap[type] || typeMap["else"] || ERROR;

          if (transition === ERROR) {
            return; // parse error
          }

          mode = transition[0];
          action = actions[transition[1]];
          if (action) {
            newChar = transition[2];
            newChar = newChar === undefined ? c : newChar;
            if (action() === false) {
              return;
            }
          }

          if (mode === AFTER_PATH) {
            return keys;
          }
        }
      }

      var I18nPath = function I18nPath() {
        this._cache = Object.create(null);
      };

      /**
       * External parse that check for a cache hit first
       */
      I18nPath.prototype.parsePath = function parsePath(path) {
        var hit = this._cache[path];
        if (!hit) {
          hit = parse$1(path);
          if (hit) {
            this._cache[path] = hit;
          }
        }
        return hit || [];
      };

      /**
       * Get path value from path string
       */
      I18nPath.prototype.getPathValue = function getPathValue(obj, path) {
        if (!isObject(obj)) {
          return null;
        }

        var paths = this.parsePath(path);
        if (paths.length === 0) {
          return null;
        } else {
          var length = paths.length;
          var last = obj;
          var i = 0;
          while (i < length) {
            var value = last[paths[i]];
            if (value === undefined || value === null) {
              return null;
            }
            last = value;
            i++;
          }

          return last;
        }
      };

      /*  */

      var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
      var linkKeyMatcher = /(?:@(?:\.[a-zA-Z]+)?:(?:[\w\-_|./]+|\([\w\-_:|./]+\)))/g;
      var linkKeyPrefixMatcher = /^@(?:\.([a-zA-Z]+))?:/;
      var bracketsMatcher = /[()]/g;
      var defaultModifiers = {
        upper: function (str) {
          return str.toLocaleUpperCase();
        },
        lower: function (str) {
          return str.toLocaleLowerCase();
        },
        capitalize: function (str) {
          return "" + str.charAt(0).toLocaleUpperCase() + str.substr(1);
        },
      };

      var defaultFormatter = new BaseFormatter();

      var VueI18n = function VueI18n(options) {
        var this$1 = this;
        if (options === void 0) options = {};

        // Auto install if it is not done yet and `window` has `Vue`.
        // To allow users to avoid auto-installation in some cases,
        // this code should be placed here. See #290
        /* istanbul ignore if */
        if (!Vue && typeof window !== "undefined" && window.Vue) {
          install(window.Vue);
        }

        var locale = options.locale || "en-US";
        var fallbackLocale =
          options.fallbackLocale === false ? false : options.fallbackLocale || "en-US";
        var messages = options.messages || {};
        var dateTimeFormats = options.dateTimeFormats || options.datetimeFormats || {};
        var numberFormats = options.numberFormats || {};

        this._vm = null;
        this._formatter = options.formatter || defaultFormatter;
        this._modifiers = options.modifiers || {};
        this._missing = options.missing || null;
        this._root = options.root || null;
        this._sync = options.sync === undefined ? true : !!options.sync;
        this._fallbackRoot = options.fallbackRoot === undefined ? true : !!options.fallbackRoot;
        this._fallbackRootWithEmptyString =
          options.fallbackRootWithEmptyString === undefined
            ? true
            : !!options.fallbackRootWithEmptyString;
        this._formatFallbackMessages =
          options.formatFallbackMessages === undefined ? false : !!options.formatFallbackMessages;
        this._silentTranslationWarn =
          options.silentTranslationWarn === undefined ? false : options.silentTranslationWarn;
        this._silentFallbackWarn =
          options.silentFallbackWarn === undefined ? false : !!options.silentFallbackWarn;
        this._dateTimeFormatters = {};
        this._numberFormatters = {};
        this._path = new I18nPath();
        this._dataListeners = new Set();
        this._componentInstanceCreatedListener = options.componentInstanceCreatedListener || null;
        this._preserveDirectiveContent =
          options.preserveDirectiveContent === undefined
            ? false
            : !!options.preserveDirectiveContent;
        this.pluralizationRules = options.pluralizationRules || {};
        this._warnHtmlInMessage = options.warnHtmlInMessage || "off";
        this._postTranslation = options.postTranslation || null;
        this._escapeParameterHtml = options.escapeParameterHtml || false;

        if ("__VUE_I18N_BRIDGE__" in options) {
          this.__VUE_I18N_BRIDGE__ = options.__VUE_I18N_BRIDGE__;
        }

        /**
         * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
         * @param choicesLength {number} an overall amount of available choices
         * @returns a final choice index
         */
        this.getChoiceIndex = function (choice, choicesLength) {
          var thisPrototype = Object.getPrototypeOf(this$1);
          if (thisPrototype && thisPrototype.getChoiceIndex) {
            var prototypeGetChoiceIndex = thisPrototype.getChoiceIndex;
            return prototypeGetChoiceIndex.call(this$1, choice, choicesLength);
          }

          // Default (old) getChoiceIndex implementation - english-compatible
          var defaultImpl = function (_choice, _choicesLength) {
            _choice = Math.abs(_choice);

            if (_choicesLength === 2) {
              return _choice ? (_choice > 1 ? 1 : 0) : 1;
            }

            return _choice ? Math.min(_choice, 2) : 0;
          };

          if (this$1.locale in this$1.pluralizationRules) {
            return this$1.pluralizationRules[this$1.locale].apply(this$1, [choice, choicesLength]);
          } else {
            return defaultImpl(choice, choicesLength);
          }
        };

        this._exist = function (message, key) {
          if (!message || !key) {
            return false;
          }
          if (!isNull(this$1._path.getPathValue(message, key))) {
            return true;
          }
          // fallback for flat key
          if (message[key]) {
            return true;
          }
          return false;
        };

        if (this._warnHtmlInMessage === "warn" || this._warnHtmlInMessage === "error") {
          Object.keys(messages).forEach(function (locale) {
            this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
          });
        }

        this._initVM({
          locale: locale,
          fallbackLocale: fallbackLocale,
          messages: messages,
          dateTimeFormats: dateTimeFormats,
          numberFormats: numberFormats,
        });
      };

      var prototypeAccessors = {
        vm: { configurable: true },
        messages: { configurable: true },
        dateTimeFormats: { configurable: true },
        numberFormats: { configurable: true },
        availableLocales: { configurable: true },
        locale: { configurable: true },
        fallbackLocale: { configurable: true },
        formatFallbackMessages: { configurable: true },
        missing: { configurable: true },
        formatter: { configurable: true },
        silentTranslationWarn: { configurable: true },
        silentFallbackWarn: { configurable: true },
        preserveDirectiveContent: { configurable: true },
        warnHtmlInMessage: { configurable: true },
        postTranslation: { configurable: true },
        sync: { configurable: true },
      };

      VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage(locale, level, message) {
        var paths = [];

        var fn = function (level, locale, message, paths) {
          if (isPlainObject(message)) {
            Object.keys(message).forEach(function (key) {
              var val = message[key];
              if (isPlainObject(val)) {
                paths.push(key);
                paths.push(".");
                fn(level, locale, val, paths);
                paths.pop();
                paths.pop();
              } else {
                paths.push(key);
                fn(level, locale, val, paths);
                paths.pop();
              }
            });
          } else if (isArray(message)) {
            message.forEach(function (item, index) {
              if (isPlainObject(item)) {
                paths.push("[" + index + "]");
                paths.push(".");
                fn(level, locale, item, paths);
                paths.pop();
                paths.pop();
              } else {
                paths.push("[" + index + "]");
                fn(level, locale, item, paths);
                paths.pop();
              }
            });
          } else if (isString(message)) {
            var ret = htmlTagMatcher.test(message);
            if (ret) {
              var msg =
                "Detected HTML in message '" +
                message +
                "' of keypath '" +
                paths.join("") +
                "' at '" +
                locale +
                "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
              if (level === "warn") {
                warn(msg);
              } else if (level === "error") {
                error(msg);
              }
            }
          }
        };

        fn(level, locale, message, paths);
      };

      VueI18n.prototype._initVM = function _initVM(data) {
        var silent = Vue.config.silent;
        Vue.config.silent = true;
        this._vm = new Vue({ data: data, __VUE18N__INSTANCE__: true });
        Vue.config.silent = silent;
      };

      VueI18n.prototype.destroyVM = function destroyVM() {
        this._vm.$destroy();
      };

      VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging(vm) {
        this._dataListeners.add(vm);
      };

      VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging(vm) {
        remove(this._dataListeners, vm);
      };

      VueI18n.prototype.watchI18nData = function watchI18nData() {
        var this$1 = this;
        return this._vm.$watch(
          "$data",
          function () {
            var listeners = arrayFrom(this$1._dataListeners);
            var i = listeners.length;
            while (i--) {
              Vue.nextTick(function () {
                listeners[i] && listeners[i].$forceUpdate();
              });
            }
          },
          { deep: true },
        );
      };

      VueI18n.prototype.watchLocale = function watchLocale(composer) {
        if (!composer) {
          /* istanbul ignore if */
          if (!this._sync || !this._root) {
            return null;
          }
          var target = this._vm;
          return this._root.$i18n.vm.$watch(
            "locale",
            function (val) {
              target.$set(target, "locale", val);
              target.$forceUpdate();
            },
            { immediate: true },
          );
        } else {
          // deal with vue-i18n-bridge
          if (!this.__VUE_I18N_BRIDGE__) {
            return null;
          }
          var self = this;
          var target$1 = this._vm;
          return this.vm.$watch(
            "locale",
            function (val) {
              target$1.$set(target$1, "locale", val);
              if (self.__VUE_I18N_BRIDGE__ && composer) {
                composer.locale.value = val;
              }
              target$1.$forceUpdate();
            },
            { immediate: true },
          );
        }
      };

      VueI18n.prototype.onComponentInstanceCreated = function onComponentInstanceCreated(newI18n) {
        if (this._componentInstanceCreatedListener) {
          this._componentInstanceCreatedListener(newI18n, this);
        }
      };

      prototypeAccessors.vm.get = function () {
        return this._vm;
      };

      prototypeAccessors.messages.get = function () {
        return looseClone(this._getMessages());
      };
      prototypeAccessors.dateTimeFormats.get = function () {
        return looseClone(this._getDateTimeFormats());
      };
      prototypeAccessors.numberFormats.get = function () {
        return looseClone(this._getNumberFormats());
      };
      prototypeAccessors.availableLocales.get = function () {
        return Object.keys(this.messages).sort();
      };

      prototypeAccessors.locale.get = function () {
        return this._vm.locale;
      };
      prototypeAccessors.locale.set = function (locale) {
        this._vm.$set(this._vm, "locale", locale);
      };

      prototypeAccessors.fallbackLocale.get = function () {
        return this._vm.fallbackLocale;
      };
      prototypeAccessors.fallbackLocale.set = function (locale) {
        this._localeChainCache = {};
        this._vm.$set(this._vm, "fallbackLocale", locale);
      };

      prototypeAccessors.formatFallbackMessages.get = function () {
        return this._formatFallbackMessages;
      };
      prototypeAccessors.formatFallbackMessages.set = function (fallback) {
        this._formatFallbackMessages = fallback;
      };

      prototypeAccessors.missing.get = function () {
        return this._missing;
      };
      prototypeAccessors.missing.set = function (handler) {
        this._missing = handler;
      };

      prototypeAccessors.formatter.get = function () {
        return this._formatter;
      };
      prototypeAccessors.formatter.set = function (formatter) {
        this._formatter = formatter;
      };

      prototypeAccessors.silentTranslationWarn.get = function () {
        return this._silentTranslationWarn;
      };
      prototypeAccessors.silentTranslationWarn.set = function (silent) {
        this._silentTranslationWarn = silent;
      };

      prototypeAccessors.silentFallbackWarn.get = function () {
        return this._silentFallbackWarn;
      };
      prototypeAccessors.silentFallbackWarn.set = function (silent) {
        this._silentFallbackWarn = silent;
      };

      prototypeAccessors.preserveDirectiveContent.get = function () {
        return this._preserveDirectiveContent;
      };
      prototypeAccessors.preserveDirectiveContent.set = function (preserve) {
        this._preserveDirectiveContent = preserve;
      };

      prototypeAccessors.warnHtmlInMessage.get = function () {
        return this._warnHtmlInMessage;
      };
      prototypeAccessors.warnHtmlInMessage.set = function (level) {
        var this$1 = this;

        var orgLevel = this._warnHtmlInMessage;
        this._warnHtmlInMessage = level;
        if (orgLevel !== level && (level === "warn" || level === "error")) {
          var messages = this._getMessages();
          Object.keys(messages).forEach(function (locale) {
            this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
          });
        }
      };

      prototypeAccessors.postTranslation.get = function () {
        return this._postTranslation;
      };
      prototypeAccessors.postTranslation.set = function (handler) {
        this._postTranslation = handler;
      };

      prototypeAccessors.sync.get = function () {
        return this._sync;
      };
      prototypeAccessors.sync.set = function (val) {
        this._sync = val;
      };

      VueI18n.prototype._getMessages = function _getMessages() {
        return this._vm.messages;
      };
      VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats() {
        return this._vm.dateTimeFormats;
      };
      VueI18n.prototype._getNumberFormats = function _getNumberFormats() {
        return this._vm.numberFormats;
      };

      VueI18n.prototype._warnDefault = function _warnDefault(
        locale,
        key,
        result,
        vm,
        values,
        interpolateMode,
      ) {
        if (!isNull(result)) {
          return result;
        }
        if (this._missing) {
          var missingRet = this._missing.apply(null, [locale, key, vm, values]);
          if (isString(missingRet)) {
            return missingRet;
          }
        } else {
          if (false) {
          }
        }

        if (this._formatFallbackMessages) {
          var parsedArgs = parseArgs.apply(void 0, values);
          return this._render(key, interpolateMode, parsedArgs.params, key);
        } else {
          return key;
        }
      };

      VueI18n.prototype._isFallbackRoot = function _isFallbackRoot(val) {
        return (
          (this._fallbackRootWithEmptyString ? !val : isNull(val)) &&
          !isNull(this._root) &&
          this._fallbackRoot
        );
      };

      VueI18n.prototype._isSilentFallbackWarn = function _isSilentFallbackWarn(key) {
        return this._silentFallbackWarn instanceof RegExp
          ? this._silentFallbackWarn.test(key)
          : this._silentFallbackWarn;
      };

      VueI18n.prototype._isSilentFallback = function _isSilentFallback(locale, key) {
        return (
          this._isSilentFallbackWarn(key) &&
          (this._isFallbackRoot() || locale !== this.fallbackLocale)
        );
      };

      VueI18n.prototype._isSilentTranslationWarn = function _isSilentTranslationWarn(key) {
        return this._silentTranslationWarn instanceof RegExp
          ? this._silentTranslationWarn.test(key)
          : this._silentTranslationWarn;
      };

      VueI18n.prototype._interpolate = function _interpolate(
        locale,
        message,
        key,
        host,
        interpolateMode,
        values,
        visitedLinkStack,
      ) {
        if (!message) {
          return null;
        }

        var pathRet = this._path.getPathValue(message, key);
        if (isArray(pathRet) || isPlainObject(pathRet)) {
          return pathRet;
        }

        var ret;
        if (isNull(pathRet)) {
          /* istanbul ignore else */
          if (isPlainObject(message)) {
            ret = message[key];
            if (!(isString(ret) || isFunction(ret))) {
              if (false) {
              }
              return null;
            }
          } else {
            return null;
          }
        } else {
          /* istanbul ignore else */
          if (isString(pathRet) || isFunction(pathRet)) {
            ret = pathRet;
          } else {
            if (false) {
            }
            return null;
          }
        }

        // Check for the existence of links within the translated string
        if (isString(ret) && (ret.indexOf("@:") >= 0 || ret.indexOf("@.") >= 0)) {
          ret = this._link(locale, message, ret, host, "raw", values, visitedLinkStack);
        }

        return this._render(ret, interpolateMode, values, key);
      };

      VueI18n.prototype._link = function _link(
        locale,
        message,
        str,
        host,
        interpolateMode,
        values,
        visitedLinkStack,
      ) {
        var ret = str;

        // Match all the links within the local
        // We are going to replace each of
        // them with its translation
        var matches = ret.match(linkKeyMatcher);

        // eslint-disable-next-line no-autofix/prefer-const
        for (var idx in matches) {
          // ie compatible: filter custom array
          // prototype method
          if (!matches.hasOwnProperty(idx)) {
            continue;
          }
          var link = matches[idx];
          var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
          var linkPrefix = linkKeyPrefixMatches[0];
          var formatterName = linkKeyPrefixMatches[1];

          // Remove the leading @:, @.case: and the brackets
          var linkPlaceholder = link.replace(linkPrefix, "").replace(bracketsMatcher, "");

          if (includes(visitedLinkStack, linkPlaceholder)) {
            if (false) {
            }
            return ret;
          }
          visitedLinkStack.push(linkPlaceholder);

          // Translate the link
          var translated = this._interpolate(
            locale,
            message,
            linkPlaceholder,
            host,
            interpolateMode === "raw" ? "string" : interpolateMode,
            interpolateMode === "raw" ? undefined : values,
            visitedLinkStack,
          );

          if (this._isFallbackRoot(translated)) {
            if (false) {
            }
            /* istanbul ignore if */
            if (!this._root) {
              throw Error("unexpected error");
            }
            var root = this._root.$i18n;
            translated = root._translate(
              root._getMessages(),
              root.locale,
              root.fallbackLocale,
              linkPlaceholder,
              host,
              interpolateMode,
              values,
            );
          }
          translated = this._warnDefault(
            locale,
            linkPlaceholder,
            translated,
            host,
            isArray(values) ? values : [values],
            interpolateMode,
          );

          if (this._modifiers.hasOwnProperty(formatterName)) {
            translated = this._modifiers[formatterName](translated);
          } else if (defaultModifiers.hasOwnProperty(formatterName)) {
            translated = defaultModifiers[formatterName](translated);
          }

          visitedLinkStack.pop();

          // Replace the link with the translated
          ret = !translated ? ret : ret.replace(link, translated);
        }

        return ret;
      };

      VueI18n.prototype._createMessageContext = function _createMessageContext(
        values,
        formatter,
        path,
        interpolateMode,
      ) {
        var this$1 = this;

        var _list = isArray(values) ? values : [];
        var _named = isObject(values) ? values : {};
        var list = function (index) {
          return _list[index];
        };
        var named = function (key) {
          return _named[key];
        };
        var messages = this._getMessages();
        var locale = this.locale;

        return {
          list: list,
          named: named,
          values: values,
          formatter: formatter,
          path: path,
          messages: messages,
          locale: locale,
          linked: function (linkedKey) {
            return this$1._interpolate(
              locale,
              messages[locale] || {},
              linkedKey,
              null,
              interpolateMode,
              undefined,
              [linkedKey],
            );
          },
        };
      };

      VueI18n.prototype._render = function _render(message, interpolateMode, values, path) {
        if (isFunction(message)) {
          return message(
            this._createMessageContext(
              values,
              this._formatter || defaultFormatter,
              path,
              interpolateMode,
            ),
          );
        }

        var ret = this._formatter.interpolate(message, values, path);

        // If the custom formatter refuses to work - apply the default one
        if (!ret) {
          ret = defaultFormatter.interpolate(message, values, path);
        }

        // if interpolateMode is **not** 'string' ('row'),
        // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
        return interpolateMode === "string" && !isString(ret) ? ret.join("") : ret;
      };

      VueI18n.prototype._appendItemToChain = function _appendItemToChain(chain, item, blocks) {
        var follow = false;
        if (!includes(chain, item)) {
          follow = true;
          if (item) {
            follow = item[item.length - 1] !== "!";
            item = item.replace(/!/g, "");
            chain.push(item);
            if (blocks && blocks[item]) {
              follow = blocks[item];
            }
          }
        }
        return follow;
      };

      VueI18n.prototype._appendLocaleToChain = function _appendLocaleToChain(
        chain,
        locale,
        blocks,
      ) {
        var follow;
        var tokens = locale.split("-");
        do {
          var item = tokens.join("-");
          follow = this._appendItemToChain(chain, item, blocks);
          tokens.splice(-1, 1);
        } while (tokens.length && follow === true);
        return follow;
      };

      VueI18n.prototype._appendBlockToChain = function _appendBlockToChain(chain, block, blocks) {
        var follow = true;
        for (var i = 0; i < block.length && isBoolean(follow); i++) {
          var locale = block[i];
          if (isString(locale)) {
            follow = this._appendLocaleToChain(chain, locale, blocks);
          }
        }
        return follow;
      };

      VueI18n.prototype._getLocaleChain = function _getLocaleChain(start, fallbackLocale) {
        if (start === "") {
          return [];
        }

        if (!this._localeChainCache) {
          this._localeChainCache = {};
        }

        var chain = this._localeChainCache[start];
        if (!chain) {
          if (!fallbackLocale) {
            fallbackLocale = this.fallbackLocale;
          }
          chain = [];

          // first block defined by start
          var block = [start];

          // while any intervening block found
          while (isArray(block)) {
            block = this._appendBlockToChain(chain, block, fallbackLocale);
          }

          // last block defined by default
          var defaults;
          if (isArray(fallbackLocale)) {
            defaults = fallbackLocale;
          } else if (isObject(fallbackLocale)) {
            /* $FlowFixMe */
            if (fallbackLocale["default"]) {
              defaults = fallbackLocale["default"];
            } else {
              defaults = null;
            }
          } else {
            defaults = fallbackLocale;
          }

          // convert defaults to array
          if (isString(defaults)) {
            block = [defaults];
          } else {
            block = defaults;
          }
          if (block) {
            this._appendBlockToChain(chain, block, null);
          }
          this._localeChainCache[start] = chain;
        }
        return chain;
      };

      VueI18n.prototype._translate = function _translate(
        messages,
        locale,
        fallback,
        key,
        host,
        interpolateMode,
        args,
      ) {
        var chain = this._getLocaleChain(locale, fallback);
        var res;
        for (var i = 0; i < chain.length; i++) {
          var step = chain[i];
          res = this._interpolate(step, messages[step], key, host, interpolateMode, args, [key]);
          if (!isNull(res)) {
            if (
              step !== locale &&
              "production" !== "production" &&
              !this._isSilentTranslationWarn(key) &&
              !this._isSilentFallbackWarn(key)
            ) {
              warn("Fall back to translate the keypath '" + key + "' with '" + step + "' locale.");
            }
            return res;
          }
        }
        return null;
      };

      VueI18n.prototype._t = function _t(key, _locale, messages, host) {
        var ref;

        var values = [],
          len = arguments.length - 4;
        while (len-- > 0) values[len] = arguments[len + 4];
        if (!key) {
          return "";
        }

        var parsedArgs = parseArgs.apply(void 0, values);
        if (this._escapeParameterHtml) {
          parsedArgs.params = escapeParams(parsedArgs.params);
        }

        var locale = parsedArgs.locale || _locale;

        var ret = this._translate(
          messages,
          locale,
          this.fallbackLocale,
          key,
          host,
          "string",
          parsedArgs.params,
        );
        if (this._isFallbackRoot(ret)) {
          if (false) {
          }
          /* istanbul ignore if */
          if (!this._root) {
            throw Error("unexpected error");
          }
          return (ref = this._root).$t.apply(ref, [key].concat(values));
        } else {
          ret = this._warnDefault(locale, key, ret, host, values, "string");
          if (this._postTranslation && ret !== null && ret !== undefined) {
            ret = this._postTranslation(ret, key);
          }
          return ret;
        }
      };

      VueI18n.prototype.t = function t(key) {
        var ref;

        var values = [],
          len = arguments.length - 1;
        while (len-- > 0) values[len] = arguments[len + 1];
        return (ref = this)._t.apply(
          ref,
          [key, this.locale, this._getMessages(), null].concat(values),
        );
      };

      VueI18n.prototype._i = function _i(key, locale, messages, host, values) {
        var ret = this._translate(messages, locale, this.fallbackLocale, key, host, "raw", values);
        if (this._isFallbackRoot(ret)) {
          if (false) {
          }
          if (!this._root) {
            throw Error("unexpected error");
          }
          return this._root.$i18n.i(key, locale, values);
        } else {
          return this._warnDefault(locale, key, ret, host, [values], "raw");
        }
      };

      VueI18n.prototype.i = function i(key, locale, values) {
        /* istanbul ignore if */
        if (!key) {
          return "";
        }

        if (!isString(locale)) {
          locale = this.locale;
        }

        return this._i(key, locale, this._getMessages(), null, values);
      };

      VueI18n.prototype._tc = function _tc(key, _locale, messages, host, choice) {
        var ref;

        var values = [],
          len = arguments.length - 5;
        while (len-- > 0) values[len] = arguments[len + 5];
        if (!key) {
          return "";
        }
        if (choice === undefined) {
          choice = 1;
        }

        var predefined = { count: choice, n: choice };
        var parsedArgs = parseArgs.apply(void 0, values);
        parsedArgs.params = Object.assign(predefined, parsedArgs.params);
        values =
          parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
        return this.fetchChoice(
          (ref = this)._t.apply(ref, [key, _locale, messages, host].concat(values)),
          choice,
        );
      };

      VueI18n.prototype.fetchChoice = function fetchChoice(message, choice) {
        /* istanbul ignore if */
        if (!message || !isString(message)) {
          return null;
        }
        var choices = message.split("|");

        choice = this.getChoiceIndex(choice, choices.length);
        if (!choices[choice]) {
          return message;
        }
        return choices[choice].trim();
      };

      VueI18n.prototype.tc = function tc(key, choice) {
        var ref;

        var values = [],
          len = arguments.length - 2;
        while (len-- > 0) values[len] = arguments[len + 2];
        return (ref = this)._tc.apply(
          ref,
          [key, this.locale, this._getMessages(), null, choice].concat(values),
        );
      };

      VueI18n.prototype._te = function _te(key, locale, messages) {
        var args = [],
          len = arguments.length - 3;
        while (len-- > 0) args[len] = arguments[len + 3];

        var _locale = parseArgs.apply(void 0, args).locale || locale;
        return this._exist(messages[_locale], key);
      };

      VueI18n.prototype.te = function te(key, locale) {
        return this._te(key, this.locale, this._getMessages(), locale);
      };

      VueI18n.prototype.getLocaleMessage = function getLocaleMessage(locale) {
        return looseClone(this._vm.messages[locale] || {});
      };

      VueI18n.prototype.setLocaleMessage = function setLocaleMessage(locale, message) {
        if (this._warnHtmlInMessage === "warn" || this._warnHtmlInMessage === "error") {
          this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
        }
        this._vm.$set(this._vm.messages, locale, message);
      };

      VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage(locale, message) {
        if (this._warnHtmlInMessage === "warn" || this._warnHtmlInMessage === "error") {
          this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
        }
        this._vm.$set(
          this._vm.messages,
          locale,
          merge(
            typeof this._vm.messages[locale] !== "undefined" &&
              Object.keys(this._vm.messages[locale]).length
              ? Object.assign({}, this._vm.messages[locale])
              : {},
            message,
          ),
        );
      };

      VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat(locale) {
        return looseClone(this._vm.dateTimeFormats[locale] || {});
      };

      VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat(locale, format) {
        this._vm.$set(this._vm.dateTimeFormats, locale, format);
        this._clearDateTimeFormat(locale, format);
      };

      VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat(locale, format) {
        this._vm.$set(
          this._vm.dateTimeFormats,
          locale,
          merge(this._vm.dateTimeFormats[locale] || {}, format),
        );
        this._clearDateTimeFormat(locale, format);
      };

      VueI18n.prototype._clearDateTimeFormat = function _clearDateTimeFormat(locale, format) {
        // eslint-disable-next-line no-autofix/prefer-const
        for (var key in format) {
          var id = locale + "__" + key;

          if (!this._dateTimeFormatters.hasOwnProperty(id)) {
            continue;
          }

          delete this._dateTimeFormatters[id];
        }
      };

      VueI18n.prototype._localizeDateTime = function _localizeDateTime(
        value,
        locale,
        fallback,
        dateTimeFormats,
        key,
        options,
      ) {
        var _locale = locale;
        var formats = dateTimeFormats[_locale];

        var chain = this._getLocaleChain(locale, fallback);
        for (var i = 0; i < chain.length; i++) {
          var current = _locale;
          var step = chain[i];
          formats = dateTimeFormats[step];
          _locale = step;
          // fallback locale
          if (isNull(formats) || isNull(formats[key])) {
            if (
              step !== locale &&
              "production" !== "production" &&
              !this._isSilentTranslationWarn(key) &&
              !this._isSilentFallbackWarn(key)
            ) {
              warn(
                "Fall back to '" +
                  step +
                  "' datetime formats from '" +
                  current +
                  "' datetime formats.",
              );
            }
          } else {
            break;
          }
        }

        if (isNull(formats) || isNull(formats[key])) {
          return null;
        } else {
          var format = formats[key];

          var formatter;
          if (options) {
            formatter = new Intl.DateTimeFormat(_locale, Object.assign({}, format, options));
          } else {
            var id = _locale + "__" + key;
            formatter = this._dateTimeFormatters[id];
            if (!formatter) {
              formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
            }
          }

          return formatter.format(value);
        }
      };

      VueI18n.prototype._d = function _d(value, locale, key, options) {
        /* istanbul ignore if */
        if (false) {
        }

        if (!key) {
          var dtf = !options
            ? new Intl.DateTimeFormat(locale)
            : new Intl.DateTimeFormat(locale, options);
          return dtf.format(value);
        }

        var ret = this._localizeDateTime(
          value,
          locale,
          this.fallbackLocale,
          this._getDateTimeFormats(),
          key,
          options,
        );
        if (this._isFallbackRoot(ret)) {
          if (false) {
          }
          /* istanbul ignore if */
          if (!this._root) {
            throw Error("unexpected error");
          }
          return this._root.$i18n.d(value, key, locale);
        } else {
          return ret || "";
        }
      };

      VueI18n.prototype.d = function d(value) {
        var args = [],
          len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        var locale = this.locale;
        var key = null;
        var options = null;

        if (args.length === 1) {
          if (isString(args[0])) {
            key = args[0];
          } else if (isObject(args[0])) {
            if (args[0].locale) {
              locale = args[0].locale;
            }
            if (args[0].key) {
              key = args[0].key;
            }
          }

          options = Object.keys(args[0]).reduce(function (acc, key) {
            var obj;

            if (includes(dateTimeFormatKeys, key)) {
              return Object.assign({}, acc, ((obj = {}), (obj[key] = args[0][key]), obj));
            }
            return acc;
          }, null);
        } else if (args.length === 2) {
          if (isString(args[0])) {
            key = args[0];
          }
          if (isString(args[1])) {
            locale = args[1];
          }
        }

        return this._d(value, locale, key, options);
      };

      VueI18n.prototype.getNumberFormat = function getNumberFormat(locale) {
        return looseClone(this._vm.numberFormats[locale] || {});
      };

      VueI18n.prototype.setNumberFormat = function setNumberFormat(locale, format) {
        this._vm.$set(this._vm.numberFormats, locale, format);
        this._clearNumberFormat(locale, format);
      };

      VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat(locale, format) {
        this._vm.$set(
          this._vm.numberFormats,
          locale,
          merge(this._vm.numberFormats[locale] || {}, format),
        );
        this._clearNumberFormat(locale, format);
      };

      VueI18n.prototype._clearNumberFormat = function _clearNumberFormat(locale, format) {
        // eslint-disable-next-line no-autofix/prefer-const
        for (var key in format) {
          var id = locale + "__" + key;

          if (!this._numberFormatters.hasOwnProperty(id)) {
            continue;
          }

          delete this._numberFormatters[id];
        }
      };

      VueI18n.prototype._getNumberFormatter = function _getNumberFormatter(
        value,
        locale,
        fallback,
        numberFormats,
        key,
        options,
      ) {
        var _locale = locale;
        var formats = numberFormats[_locale];

        var chain = this._getLocaleChain(locale, fallback);
        for (var i = 0; i < chain.length; i++) {
          var current = _locale;
          var step = chain[i];
          formats = numberFormats[step];
          _locale = step;
          // fallback locale
          if (isNull(formats) || isNull(formats[key])) {
            if (
              step !== locale &&
              "production" !== "production" &&
              !this._isSilentTranslationWarn(key) &&
              !this._isSilentFallbackWarn(key)
            ) {
              warn(
                "Fall back to '" + step + "' number formats from '" + current + "' number formats.",
              );
            }
          } else {
            break;
          }
        }

        if (isNull(formats) || isNull(formats[key])) {
          return null;
        } else {
          var format = formats[key];

          var formatter;
          if (options) {
            // If options specified - create one time number formatter
            formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
          } else {
            var id = _locale + "__" + key;
            formatter = this._numberFormatters[id];
            if (!formatter) {
              formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
            }
          }
          return formatter;
        }
      };

      VueI18n.prototype._n = function _n(value, locale, key, options) {
        /* istanbul ignore if */
        if (!VueI18n.availabilities.numberFormat) {
          if (false) {
          }
          return "";
        }

        if (!key) {
          var nf = !options
            ? new Intl.NumberFormat(locale)
            : new Intl.NumberFormat(locale, options);
          return nf.format(value);
        }

        var formatter = this._getNumberFormatter(
          value,
          locale,
          this.fallbackLocale,
          this._getNumberFormats(),
          key,
          options,
        );
        var ret = formatter && formatter.format(value);
        if (this._isFallbackRoot(ret)) {
          if (false) {
          }
          /* istanbul ignore if */
          if (!this._root) {
            throw Error("unexpected error");
          }
          return this._root.$i18n.n(
            value,
            Object.assign({}, { key: key, locale: locale }, options),
          );
        } else {
          return ret || "";
        }
      };

      VueI18n.prototype.n = function n(value) {
        var args = [],
          len = arguments.length - 1;
        while (len-- > 0) args[len] = arguments[len + 1];

        var locale = this.locale;
        var key = null;
        var options = null;

        if (args.length === 1) {
          if (isString(args[0])) {
            key = args[0];
          } else if (isObject(args[0])) {
            if (args[0].locale) {
              locale = args[0].locale;
            }
            if (args[0].key) {
              key = args[0].key;
            }

            // Filter out number format options only
            options = Object.keys(args[0]).reduce(function (acc, key) {
              var obj;

              if (includes(numberFormatKeys, key)) {
                return Object.assign({}, acc, ((obj = {}), (obj[key] = args[0][key]), obj));
              }
              return acc;
            }, null);
          }
        } else if (args.length === 2) {
          if (isString(args[0])) {
            key = args[0];
          }
          if (isString(args[1])) {
            locale = args[1];
          }
        }

        return this._n(value, locale, key, options);
      };

      VueI18n.prototype._ntp = function _ntp(value, locale, key, options) {
        /* istanbul ignore if */
        if (!VueI18n.availabilities.numberFormat) {
          if (false) {
          }
          return [];
        }

        if (!key) {
          var nf = !options
            ? new Intl.NumberFormat(locale)
            : new Intl.NumberFormat(locale, options);
          return nf.formatToParts(value);
        }

        var formatter = this._getNumberFormatter(
          value,
          locale,
          this.fallbackLocale,
          this._getNumberFormats(),
          key,
          options,
        );
        var ret = formatter && formatter.formatToParts(value);
        if (this._isFallbackRoot(ret)) {
          if (false) {
          }
          /* istanbul ignore if */
          if (!this._root) {
            throw Error("unexpected error");
          }
          return this._root.$i18n._ntp(value, locale, key, options);
        } else {
          return ret || [];
        }
      };

      Object.defineProperties(VueI18n.prototype, prototypeAccessors);

      var availabilities;
      // $FlowFixMe
      Object.defineProperty(VueI18n, "availabilities", {
        get: function get() {
          if (!availabilities) {
            var intlDefined = typeof Intl !== "undefined";
            availabilities = {
              dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
              numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined",
            };
          }

          return availabilities;
        },
      });

      VueI18n.install = install;
      VueI18n.version = "8.28.2";

      /* harmony default export */ var vue_i18n_esm = VueI18n;

      // EXTERNAL MODULE: ./src/utils/i18/language.json
      var language = __webpack_require__("7df7");

      // CONCATENATED MODULE: ./src/utils/i18/index.js

      vue_runtime_esm["default"].use(vue_i18n_esm);
      // Get browser default language
      const navLang = navigator.language || navigator.userLanguage;
      let localLang = navLang || false;
      let lang = "";
      let lang18n = "";
      if (localLang) {
        if (localLang.indexOf("zh") !== -1) {
          lang = "zh";
        } else if (localLang.indexOf("he") !== -1) {
          lang = "he";
        } else {
          lang = "en";
        }
        lang18n = localLang;
      } else {
        lang = "en";
        lang18n = "en";
      }
      localStorage.setItem("lang", lang);
      const i18n = new vue_i18n_esm({
        locale: lang18n,
        fallbackLocale: "en",
        messages: language,
      });
      /* harmony default export */ var i18 = (__webpack_exports__["a"] = i18n);

      /***/
    },

    /***/ "24fb": /***/ function (module, exports, __webpack_require__) {
      "use strict";

      /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
      // css base code, injected by the css-loader
      // eslint-disable-next-line func-names
      module.exports = function (useSourceMap) {
        var list = []; // return the list of modules as css string

        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);

            if (item[2]) {
              return "@media ".concat(item[2], " {").concat(content, "}");
            }

            return content;
          }).join("");
        }; // import a list of modules into the list
        // eslint-disable-next-line func-names

        list.i = function (modules, mediaQuery, dedupe) {
          if (typeof modules === "string") {
            // eslint-disable-next-line no-param-reassign
            modules = [[null, modules, ""]];
          }

          var alreadyImportedModules = {};

          if (dedupe) {
            for (var i = 0; i < this.length; i++) {
              // eslint-disable-next-line prefer-destructuring
              var id = this[i][0];

              if (id != null) {
                alreadyImportedModules[id] = true;
              }
            }
          }

          for (var _i = 0; _i < modules.length; _i++) {
            var item = [].concat(modules[_i]);

            if (dedupe && alreadyImportedModules[item[0]]) {
              // eslint-disable-next-line no-continue
              continue;
            }

            if (mediaQuery) {
              if (!item[2]) {
                item[2] = mediaQuery;
              } else {
                item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
              }
            }

            list.push(item);
          }
        };

        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || ""; // eslint-disable-next-line prefer-destructuring

        var cssMapping = item[3];

        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === "function") {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
          });
          return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
        }

        return [content].join("\n");
      } // Adapted from convert-source-map (MIT)

      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
        var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
        return "/*# ".concat(data, " */");
      }

      /***/
    },

    /***/ "2b0e": /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "EffectScope",
        function () {
          return EffectScope;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "computed",
        function () {
          return computed;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "customRef",
        function () {
          return customRef;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "default",
        function () {
          return Vue;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "defineAsyncComponent",
        function () {
          return defineAsyncComponent;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "defineComponent",
        function () {
          return defineComponent;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function () {
        return del;
      });
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "effectScope",
        function () {
          return effectScope;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "getCurrentInstance",
        function () {
          return getCurrentInstance;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "getCurrentScope",
        function () {
          return getCurrentScope;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function () {
        return h;
      });
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "inject",
        function () {
          return inject;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "isProxy",
        function () {
          return isProxy;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "isReactive",
        function () {
          return isReactive;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "isReadonly",
        function () {
          return isReadonly;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "isRef",
        function () {
          return isRef;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "isShallow",
        function () {
          return isShallow;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "markRaw",
        function () {
          return markRaw;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "mergeDefaults",
        function () {
          return mergeDefaults;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "nextTick",
        function () {
          return nextTick;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onActivated",
        function () {
          return onActivated;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onBeforeMount",
        function () {
          return onBeforeMount;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onBeforeUnmount",
        function () {
          return onBeforeUnmount;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onBeforeUpdate",
        function () {
          return onBeforeUpdate;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onDeactivated",
        function () {
          return onDeactivated;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onErrorCaptured",
        function () {
          return onErrorCaptured;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onMounted",
        function () {
          return onMounted;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onRenderTracked",
        function () {
          return onRenderTracked;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onRenderTriggered",
        function () {
          return onRenderTriggered;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onScopeDispose",
        function () {
          return onScopeDispose;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onServerPrefetch",
        function () {
          return onServerPrefetch;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onUnmounted",
        function () {
          return onUnmounted;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "onUpdated",
        function () {
          return onUpdated;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "provide",
        function () {
          return provide;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "proxyRefs",
        function () {
          return proxyRefs;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "reactive",
        function () {
          return reactive;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "readonly",
        function () {
          return readonly;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ref", function () {
        return ref$1;
      });
      /* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function () {
        return set;
      });
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "shallowReactive",
        function () {
          return shallowReactive;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "shallowReadonly",
        function () {
          return shallowReadonly;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "shallowRef",
        function () {
          return shallowRef;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "toRaw",
        function () {
          return toRaw;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "toRef",
        function () {
          return toRef;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "toRefs",
        function () {
          return toRefs;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "triggerRef",
        function () {
          return triggerRef;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "unref",
        function () {
          return unref;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useAttrs",
        function () {
          return useAttrs;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useCssModule",
        function () {
          return useCssModule;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useCssVars",
        function () {
          return useCssVars;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useListeners",
        function () {
          return useListeners;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "useSlots",
        function () {
          return useSlots;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "version",
        function () {
          return version;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "watch",
        function () {
          return watch;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "watchEffect",
        function () {
          return watchEffect;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "watchPostEffect",
        function () {
          return watchPostEffect;
        },
      );
      /* harmony export (binding) */ __webpack_require__.d(
        __webpack_exports__,
        "watchSyncEffect",
        function () {
          return watchSyncEffect;
        },
      );
      /*!
       * Vue.js v2.7.16
       * (c) 2014-2023 Evan You
       * Released under the MIT License.
       */
      var emptyObject = Object.freeze({});
      var isArray = Array.isArray;
      // These helpers produce better VM code in JS engines due to their
      // explicitness and function inlining.
      function isUndef(v) {
        return v === undefined || v === null;
      }
      function isDef(v) {
        return v !== undefined && v !== null;
      }
      function isTrue(v) {
        return v === true;
      }
      function isFalse(v) {
        return v === false;
      }
      /**
       * Check if value is primitive.
       */
      function isPrimitive(value) {
        return (
          typeof value === "string" ||
          typeof value === "number" ||
          // $flow-disable-line
          typeof value === "symbol" ||
          typeof value === "boolean"
        );
      }
      function isFunction(value) {
        return typeof value === "function";
      }
      /**
       * Quick object check - this is primarily used to tell
       * objects from primitive values when we know the value
       * is a JSON-compliant type.
       */
      function isObject(obj) {
        return obj !== null && typeof obj === "object";
      }
      /**
       * Get the raw type string of a value, e.g., [object Object].
       */
      var _toString = Object.prototype.toString;
      function toRawType(value) {
        return _toString.call(value).slice(8, -1);
      }
      /**
       * Strict object type check. Only returns true
       * for plain JavaScript objects.
       */
      function isPlainObject(obj) {
        return _toString.call(obj) === "[object Object]";
      }
      function isRegExp(v) {
        return _toString.call(v) === "[object RegExp]";
      }
      /**
       * Check if val is a valid array index.
       */
      function isValidArrayIndex(val) {
        var n = parseFloat(String(val));
        return n >= 0 && Math.floor(n) === n && isFinite(val);
      }
      function isPromise(val) {
        return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
      }
      /**
       * Convert a value to a string that is actually rendered.
       */
      function toString(val) {
        return val == null
          ? ""
          : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, replacer, 2)
            : String(val);
      }
      function replacer(_key, val) {
        // avoid circular deps from v3
        if (val && val.__v_isRef) {
          return val.value;
        }
        return val;
      }
      /**
       * Convert an input value to a number for persistence.
       * If the conversion fails, return original string.
       */
      function toNumber(val) {
        var n = parseFloat(val);
        return isNaN(n) ? val : n;
      }
      /**
       * Make a map and return a function for checking if a key
       * is in that map.
       */
      function makeMap(str, expectsLowerCase) {
        var map = Object.create(null);
        var list = str.split(",");
        for (var i = 0; i < list.length; i++) {
          map[list[i]] = true;
        }
        return expectsLowerCase
          ? function (val) {
              return map[val.toLowerCase()];
            }
          : function (val) {
              return map[val];
            };
      }
      /**
       * Check if a tag is a built-in tag.
       */
      var isBuiltInTag = makeMap("slot,component", true);
      /**
       * Check if an attribute is a reserved attribute.
       */
      var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
      /**
       * Remove an item from an array.
       */
      function remove$2(arr, item) {
        var len = arr.length;
        if (len) {
          // fast path for the only / last item
          if (item === arr[len - 1]) {
            arr.length = len - 1;
            return;
          }
          var index = arr.indexOf(item);
          if (index > -1) {
            return arr.splice(index, 1);
          }
        }
      }
      /**
       * Check whether an object has the property.
       */
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function hasOwn(obj, key) {
        return hasOwnProperty.call(obj, key);
      }
      /**
       * Create a cached version of a pure function.
       */
      function cached(fn) {
        var cache = Object.create(null);
        return function cachedFn(str) {
          var hit = cache[str];
          return hit || (cache[str] = fn(str));
        };
      }
      /**
       * Camelize a hyphen-delimited string.
       */
      var camelizeRE = /-(\w)/g;
      var camelize = cached(function (str) {
        return str.replace(camelizeRE, function (_, c) {
          return c ? c.toUpperCase() : "";
        });
      });
      /**
       * Capitalize a string.
       */
      var capitalize = cached(function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      });
      /**
       * Hyphenate a camelCase string.
       */
      var hyphenateRE = /\B([A-Z])/g;
      var hyphenate = cached(function (str) {
        return str.replace(hyphenateRE, "-$1").toLowerCase();
      });
      /**
       * Simple bind polyfill for environments that do not support it,
       * e.g., PhantomJS 1.x. Technically, we don't need this anymore
       * since native bind is now performant enough in most browsers.
       * But removing it would mean breaking code that was able to run in
       * PhantomJS 1.x, so this must be kept for backward compatibility.
       */
      /* istanbul ignore next */
      function polyfillBind(fn, ctx) {
        function boundFn(a) {
          var l = arguments.length;
          return l ? (l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a)) : fn.call(ctx);
        }
        boundFn._length = fn.length;
        return boundFn;
      }
      function nativeBind(fn, ctx) {
        return fn.bind(ctx);
      }
      // @ts-expect-error bind cannot be `undefined`
      var bind = Function.prototype.bind ? nativeBind : polyfillBind;
      /**
       * Convert an Array-like object to a real Array.
       */
      function toArray(list, start) {
        start = start || 0;
        var i = list.length - start;
        var ret = new Array(i);
        while (i--) {
          ret[i] = list[i + start];
        }
        return ret;
      }
      /**
       * Mix properties into target object.
       */
      function extend(to, _from) {
        for (var key in _from) {
          to[key] = _from[key];
        }
        return to;
      }
      /**
       * Merge an Array of Objects into a single Object.
       */
      function toObject(arr) {
        var res = {};
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]) {
            extend(res, arr[i]);
          }
        }
        return res;
      }
      /* eslint-disable no-unused-vars */
      /**
       * Perform no operation.
       * Stubbing args to make Flow happy without leaving useless transpiled code
       * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
       */
      function noop(a, b, c) {}
      /**
       * Always return false.
       */
      var no = function (a, b, c) {
        return false;
      };
      /* eslint-enable no-unused-vars */
      /**
       * Return the same value.
       */
      var identity = function (_) {
        return _;
      };
      /**
       * Check if two values are loosely equal - that is,
       * if they are plain objects, do they have the same shape?
       */
      function looseEqual(a, b) {
        if (a === b) return true;
        var isObjectA = isObject(a);
        var isObjectB = isObject(b);
        if (isObjectA && isObjectB) {
          try {
            var isArrayA = Array.isArray(a);
            var isArrayB = Array.isArray(b);
            if (isArrayA && isArrayB) {
              return (
                a.length === b.length &&
                a.every(function (e, i) {
                  return looseEqual(e, b[i]);
                })
              );
            } else if (a instanceof Date && b instanceof Date) {
              return a.getTime() === b.getTime();
            } else if (!isArrayA && !isArrayB) {
              var keysA = Object.keys(a);
              var keysB = Object.keys(b);
              return (
                keysA.length === keysB.length &&
                keysA.every(function (key) {
                  return looseEqual(a[key], b[key]);
                })
              );
            } else {
              /* istanbul ignore next */
              return false;
            }
          } catch (e) {
            /* istanbul ignore next */
            return false;
          }
        } else if (!isObjectA && !isObjectB) {
          return String(a) === String(b);
        } else {
          return false;
        }
      }
      /**
       * Return the first index at which a loosely equal value can be
       * found in the array (if value is a plain object, the array must
       * contain an object of the same shape), or -1 if it is not present.
       */
      function looseIndexOf(arr, val) {
        for (var i = 0; i < arr.length; i++) {
          if (looseEqual(arr[i], val)) return i;
        }
        return -1;
      }
      /**
       * Ensure a function is called only once.
       */
      function once(fn) {
        var called = false;
        return function () {
          if (!called) {
            called = true;
            fn.apply(this, arguments);
          }
        };
      }
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
      function hasChanged(x, y) {
        if (x === y) {
          return x === 0 && 1 / x !== 1 / y;
        } else {
          return x === x || y === y;
        }
      }

      var SSR_ATTR = "data-server-rendered";
      var ASSET_TYPES = ["component", "directive", "filter"];
      var LIFECYCLE_HOOKS = [
        "beforeCreate",
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeDestroy",
        "destroyed",
        "activated",
        "deactivated",
        "errorCaptured",
        "serverPrefetch",
        "renderTracked",
        "renderTriggered",
      ];

      var config = {
        /**
         * Option merge strategies (used in core/util/options)
         */
        // $flow-disable-line
        optionMergeStrategies: Object.create(null),
        /**
         * Whether to suppress warnings.
         */
        silent: false,
        /**
         * Show production mode tip message on boot?
         */
        productionTip: "production" !== "production",
        /**
         * Whether to enable devtools
         */
        devtools: "production" !== "production",
        /**
         * Whether to record perf
         */
        performance: false,
        /**
         * Error handler for watcher errors
         */
        errorHandler: null,
        /**
         * Warn handler for watcher warns
         */
        warnHandler: null,
        /**
         * Ignore certain custom elements
         */
        ignoredElements: [],
        /**
         * Custom user key aliases for v-on
         */
        // $flow-disable-line
        keyCodes: Object.create(null),
        /**
         * Check if a tag is reserved so that it cannot be registered as a
         * component. This is platform-dependent and may be overwritten.
         */
        isReservedTag: no,
        /**
         * Check if an attribute is reserved so that it cannot be used as a component
         * prop. This is platform-dependent and may be overwritten.
         */
        isReservedAttr: no,
        /**
         * Check if a tag is an unknown element.
         * Platform-dependent.
         */
        isUnknownElement: no,
        /**
         * Get the namespace of an element
         */
        getTagNamespace: noop,
        /**
         * Parse the real tag name for the specific platform.
         */
        parsePlatformTagName: identity,
        /**
         * Check if an attribute must be bound using property, e.g. value
         * Platform-dependent.
         */
        mustUseProp: no,
        /**
         * Perform updates asynchronously. Intended to be used by Vue Test Utils
         * This will significantly reduce performance if set to false.
         */
        async: true,
        /**
         * Exposed for legacy reasons
         */
        _lifecycleHooks: LIFECYCLE_HOOKS,
      };

      /**
       * unicode letters used for parsing html tags, component names and property paths.
       * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
       * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
       */
      var unicodeRegExp =
        /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
      /**
       * Check if a string starts with $ or _
       */
      function isReserved(str) {
        var c = (str + "").charCodeAt(0);
        return c === 0x24 || c === 0x5f;
      }
      /**
       * Define a property.
       */
      function def(obj, key, val, enumerable) {
        Object.defineProperty(obj, key, {
          value: val,
          enumerable: !!enumerable,
          writable: true,
          configurable: true,
        });
      }
      /**
       * Parse simple path.
       */
      var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
      function parsePath(path) {
        if (bailRE.test(path)) {
          return;
        }
        var segments = path.split(".");
        return function (obj) {
          for (var i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
          }
          return obj;
        };
      }

      // can we use __proto__?
      var hasProto = "__proto__" in {};
      // Browser environment sniffing
      var inBrowser = typeof window !== "undefined";
      var UA = inBrowser && window.navigator.userAgent.toLowerCase();
      var isIE = UA && /msie|trident/.test(UA);
      var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
      var isEdge = UA && UA.indexOf("edge/") > 0;
      UA && UA.indexOf("android") > 0;
      var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
      UA && /chrome\/\d+/.test(UA) && !isEdge;
      UA && /phantomjs/.test(UA);
      var isFF = UA && UA.match(/firefox\/(\d+)/);
      // Firefox has a "watch" function on Object.prototype...
      // @ts-expect-error firebox support
      var nativeWatch = {}.watch;
      var supportsPassive = false;
      if (inBrowser) {
        try {
          var opts = {};
          Object.defineProperty(opts, "passive", {
            get: function () {
              /* istanbul ignore next */
              supportsPassive = true;
            },
          }); // https://github.com/facebook/flow/issues/285
          window.addEventListener("test-passive", null, opts);
        } catch (e) {}
      }
      // this needs to be lazy-evaled because vue may be required before
      // vue-server-renderer can set VUE_ENV
      var _isServer;
      var isServerRendering = function () {
        if (_isServer === undefined) {
          /* istanbul ignore if */
          if (!inBrowser && typeof global !== "undefined") {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
          } else {
            _isServer = false;
          }
        }
        return _isServer;
      };
      // detect devtools
      var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
      /* istanbul ignore next */
      function isNative(Ctor) {
        return typeof Ctor === "function" && /native code/.test(Ctor.toString());
      }
      var hasSymbol =
        typeof Symbol !== "undefined" &&
        isNative(Symbol) &&
        typeof Reflect !== "undefined" &&
        isNative(Reflect.ownKeys);
      var _Set; // $flow-disable-line
      /* istanbul ignore if */ if (typeof Set !== "undefined" && isNative(Set)) {
        // use native Set when available.
        _Set = Set;
      } else {
        // a non-standard Set polyfill that only works with primitive keys.
        _Set = /** @class */ (function () {
          function Set() {
            this.set = Object.create(null);
          }
          Set.prototype.has = function (key) {
            return this.set[key] === true;
          };
          Set.prototype.add = function (key) {
            this.set[key] = true;
          };
          Set.prototype.clear = function () {
            this.set = Object.create(null);
          };
          return Set;
        })();
      }

      var currentInstance = null;
      /**
       * This is exposed for compatibility with v3 (e.g. some functions in VueUse
       * relies on it). Do not use this internally, just use `currentInstance`.
       *
       * @internal this function needs manual type declaration because it relies
       * on previously manually authored types from Vue 2
       */
      function getCurrentInstance() {
        return currentInstance && { proxy: currentInstance };
      }
      /**
       * @internal
       */
      function setCurrentInstance(vm) {
        if (vm === void 0) {
          vm = null;
        }
        if (!vm) currentInstance && currentInstance._scope.off();
        currentInstance = vm;
        vm && vm._scope.on();
      }

      /**
       * @internal
       */
      var VNode = /** @class */ (function () {
        function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
          this.tag = tag;
          this.data = data;
          this.children = children;
          this.text = text;
          this.elm = elm;
          this.ns = undefined;
          this.context = context;
          this.fnContext = undefined;
          this.fnOptions = undefined;
          this.fnScopeId = undefined;
          this.key = data && data.key;
          this.componentOptions = componentOptions;
          this.componentInstance = undefined;
          this.parent = undefined;
          this.raw = false;
          this.isStatic = false;
          this.isRootInsert = true;
          this.isComment = false;
          this.isCloned = false;
          this.isOnce = false;
          this.asyncFactory = asyncFactory;
          this.asyncMeta = undefined;
          this.isAsyncPlaceholder = false;
        }
        Object.defineProperty(VNode.prototype, "child", {
          // DEPRECATED: alias for componentInstance for backwards compat.
          /* istanbul ignore next */
          get: function () {
            return this.componentInstance;
          },
          enumerable: false,
          configurable: true,
        });
        return VNode;
      })();
      var createEmptyVNode = function (text) {
        if (text === void 0) {
          text = "";
        }
        var node = new VNode();
        node.text = text;
        node.isComment = true;
        return node;
      };
      function createTextVNode(val) {
        return new VNode(undefined, undefined, undefined, String(val));
      }
      // optimized shallow clone
      // used for static nodes and slot nodes because they may be reused across
      // multiple renders, cloning them avoids errors when DOM manipulations rely
      // on their elm reference.
      function cloneVNode(vnode) {
        var cloned = new VNode(
          vnode.tag,
          vnode.data,
          // #7975
          // clone children array to avoid mutating original in case of cloning
          // a child.
          vnode.children && vnode.children.slice(),
          vnode.text,
          vnode.elm,
          vnode.context,
          vnode.componentOptions,
          vnode.asyncFactory,
        );
        cloned.ns = vnode.ns;
        cloned.isStatic = vnode.isStatic;
        cloned.key = vnode.key;
        cloned.isComment = vnode.isComment;
        cloned.fnContext = vnode.fnContext;
        cloned.fnOptions = vnode.fnOptions;
        cloned.fnScopeId = vnode.fnScopeId;
        cloned.asyncMeta = vnode.asyncMeta;
        cloned.isCloned = true;
        return cloned;
      }

      /******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

      var __assign = function () {
        __assign =
          Object.assign ||
          function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
          };
        return __assign.apply(this, arguments);
      };

      typeof SuppressedError === "function"
        ? SuppressedError
        : function (error, suppressed, message) {
            var e = new Error(message);
            return (
              (e.name = "SuppressedError"),
              (e.error = error),
              (e.suppressed = suppressed),
              e
            );
          };

      var uid$2 = 0;
      var pendingCleanupDeps = [];
      var cleanupDeps = function () {
        for (var i = 0; i < pendingCleanupDeps.length; i++) {
          var dep = pendingCleanupDeps[i];
          dep.subs = dep.subs.filter(function (s) {
            return s;
          });
          dep._pending = false;
        }
        pendingCleanupDeps.length = 0;
      };
      /**
       * A dep is an observable that can have multiple
       * directives subscribing to it.
       * @internal
       */
      var Dep = /** @class */ (function () {
        function Dep() {
          // pending subs cleanup
          this._pending = false;
          this.id = uid$2++;
          this.subs = [];
        }
        Dep.prototype.addSub = function (sub) {
          this.subs.push(sub);
        };
        Dep.prototype.removeSub = function (sub) {
          // #12696 deps with massive amount of subscribers are extremely slow to
          // clean up in Chromium
          // to workaround this, we unset the sub for now, and clear them on
          // next scheduler flush.
          this.subs[this.subs.indexOf(sub)] = null;
          if (!this._pending) {
            this._pending = true;
            pendingCleanupDeps.push(this);
          }
        };
        Dep.prototype.depend = function (info) {
          if (Dep.target) {
            Dep.target.addDep(this);
            if (false) {
            }
          }
        };
        Dep.prototype.notify = function (info) {
          // stabilize the subscriber list first
          var subs = this.subs.filter(function (s) {
            return s;
          });
          if (false) {
          }
          for (var i = 0, l = subs.length; i < l; i++) {
            var sub = subs[i];
            if (false) {
            }
            sub.update();
          }
        };
        return Dep;
      })();
      // The current target watcher being evaluated.
      // This is globally unique because only one watcher
      // can be evaluated at a time.
      Dep.target = null;
      var targetStack = [];
      function pushTarget(target) {
        targetStack.push(target);
        Dep.target = target;
      }
      function popTarget() {
        targetStack.pop();
        Dep.target = targetStack[targetStack.length - 1];
      }

      /*
       * not type checking this file because flow doesn't play well with
       * dynamically accessing methods on Array prototype
       */
      var arrayProto = Array.prototype;
      var arrayMethods = Object.create(arrayProto);
      var methodsToPatch = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
      /**
       * Intercept mutating methods and emit events
       */
      methodsToPatch.forEach(function (method) {
        // cache original method
        var original = arrayProto[method];
        def(arrayMethods, method, function mutator() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var result = original.apply(this, args);
          var ob = this.__ob__;
          var inserted;
          switch (method) {
            case "push":
            case "unshift":
              inserted = args;
              break;
            case "splice":
              inserted = args.slice(2);
              break;
          }
          if (inserted) ob.observeArray(inserted);
          // notify change
          if (false) {
          } else {
            ob.dep.notify();
          }
          return result;
        });
      });

      var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
      var NO_INITIAL_VALUE = {};
      /**
       * In some cases we may want to disable observation inside a component's
       * update computation.
       */
      var shouldObserve = true;
      function toggleObserving(value) {
        shouldObserve = value;
      }
      // ssr mock dep
      var mockDep = {
        notify: noop,
        depend: noop,
        addSub: noop,
        removeSub: noop,
      };
      /**
       * Observer class that is attached to each observed
       * object. Once attached, the observer converts the target
       * object's property keys into getter/setters that
       * collect dependencies and dispatch updates.
       */
      var Observer = /** @class */ (function () {
        function Observer(value, shallow, mock) {
          if (shallow === void 0) {
            shallow = false;
          }
          if (mock === void 0) {
            mock = false;
          }
          this.value = value;
          this.shallow = shallow;
          this.mock = mock;
          // this.value = value
          this.dep = mock ? mockDep : new Dep();
          this.vmCount = 0;
          def(value, "__ob__", this);
          if (isArray(value)) {
            if (!mock) {
              if (hasProto) {
                value.__proto__ = arrayMethods;
                /* eslint-enable no-proto */
              } else {
                for (var i = 0, l = arrayKeys.length; i < l; i++) {
                  var key = arrayKeys[i];
                  def(value, key, arrayMethods[key]);
                }
              }
            }
            if (!shallow) {
              this.observeArray(value);
            }
          } else {
            /**
             * Walk through all properties and convert them into
             * getter/setters. This method should only be called when
             * value type is Object.
             */
            var keys = Object.keys(value);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock);
            }
          }
        }
        /**
         * Observe a list of Array items.
         */
        Observer.prototype.observeArray = function (value) {
          for (var i = 0, l = value.length; i < l; i++) {
            observe(value[i], false, this.mock);
          }
        };
        return Observer;
      })();
      // helpers
      /**
       * Attempt to create an observer instance for a value,
       * returns the new observer if successfully observed,
       * or the existing observer if the value already has one.
       */
      function observe(value, shallow, ssrMockReactivity) {
        if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
          return value.__ob__;
        }
        if (
          shouldObserve &&
          (ssrMockReactivity || !isServerRendering()) &&
          (isArray(value) || isPlainObject(value)) &&
          Object.isExtensible(value) &&
          !value.__v_skip /* ReactiveFlags.SKIP */ &&
          !isRef(value) &&
          !(value instanceof VNode)
        ) {
          return new Observer(value, shallow, ssrMockReactivity);
        }
      }
      /**
       * Define a reactive property on an Object.
       */
      function defineReactive(obj, key, val, customSetter, shallow, mock, observeEvenIfShallow) {
        if (observeEvenIfShallow === void 0) {
          observeEvenIfShallow = false;
        }
        var dep = new Dep();
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
          return;
        }
        // cater for pre-defined getter/setters
        var getter = property && property.get;
        var setter = property && property.set;
        if ((!getter || setter) && (val === NO_INITIAL_VALUE || arguments.length === 2)) {
          val = obj[key];
        }
        var childOb = shallow ? val && val.__ob__ : observe(val, false, mock);
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter() {
            var value = getter ? getter.call(obj) : val;
            if (Dep.target) {
              if (false) {
              } else {
                dep.depend();
              }
              if (childOb) {
                childOb.dep.depend();
                if (isArray(value)) {
                  dependArray(value);
                }
              }
            }
            return isRef(value) && !shallow ? value.value : value;
          },
          set: function reactiveSetter(newVal) {
            var value = getter ? getter.call(obj) : val;
            if (!hasChanged(value, newVal)) {
              return;
            }
            if (false) {
            }
            if (setter) {
              setter.call(obj, newVal);
            } else if (getter) {
              // #7981: for accessor properties without setter
              return;
            } else if (!shallow && isRef(value) && !isRef(newVal)) {
              value.value = newVal;
              return;
            } else {
              val = newVal;
            }
            childOb = shallow ? newVal && newVal.__ob__ : observe(newVal, false, mock);
            if (false) {
            } else {
              dep.notify();
            }
          },
        });
        return dep;
      }
      function set(target, key, val) {
        if (false) {
        }
        if (isReadonly(target)) {
          false && false;
          return;
        }
        var ob = target.__ob__;
        if (isArray(target) && isValidArrayIndex(key)) {
          target.length = Math.max(target.length, key);
          target.splice(key, 1, val);
          // when mocking for SSR, array methods are not hijacked
          if (ob && !ob.shallow && ob.mock) {
            observe(val, false, true);
          }
          return val;
        }
        if (key in target && !(key in Object.prototype)) {
          target[key] = val;
          return val;
        }
        if (target._isVue || (ob && ob.vmCount)) {
          false && false;
          return val;
        }
        if (!ob) {
          target[key] = val;
          return val;
        }
        defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
        if (false) {
        } else {
          ob.dep.notify();
        }
        return val;
      }
      function del(target, key) {
        if (false) {
        }
        if (isArray(target) && isValidArrayIndex(key)) {
          target.splice(key, 1);
          return;
        }
        var ob = target.__ob__;
        if (target._isVue || (ob && ob.vmCount)) {
          false && false;
          return;
        }
        if (isReadonly(target)) {
          false && false;
          return;
        }
        if (!hasOwn(target, key)) {
          return;
        }
        delete target[key];
        if (!ob) {
          return;
        }
        if (false) {
        } else {
          ob.dep.notify();
        }
      }
      /**
       * Collect dependencies on array elements when the array is touched, since
       * we cannot intercept array element access like property getters.
       */
      function dependArray(value) {
        for (var e = void 0, i = 0, l = value.length; i < l; i++) {
          e = value[i];
          if (e && e.__ob__) {
            e.__ob__.dep.depend();
          }
          if (isArray(e)) {
            dependArray(e);
          }
        }
      }

      function reactive(target) {
        makeReactive(target, false);
        return target;
      }
      /**
       * Return a shallowly-reactive copy of the original object, where only the root
       * level properties are reactive. It also does not auto-unwrap refs (even at the
       * root level).
       */
      function shallowReactive(target) {
        makeReactive(target, true);
        def(target, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
        return target;
      }
      function makeReactive(target, shallow) {
        // if trying to observe a readonly proxy, return the readonly version.
        if (!isReadonly(target)) {
          if (false) {
            var existingOb;
          }
          var ob = observe(target, shallow, isServerRendering() /* ssr mock reactivity */);
          if (false) {
          }
        }
      }
      function isReactive(value) {
        if (isReadonly(value)) {
          return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
        }
        return !!(value && value.__ob__);
      }
      function isShallow(value) {
        return !!(value && value.__v_isShallow);
      }
      function isReadonly(value) {
        return !!(value && value.__v_isReadonly);
      }
      function isProxy(value) {
        return isReactive(value) || isReadonly(value);
      }
      function toRaw(observed) {
        var raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
        return raw ? toRaw(raw) : observed;
      }
      function markRaw(value) {
        // non-extensible objects won't be observed anyway
        if (Object.isExtensible(value)) {
          def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
        }
        return value;
      }
      /**
       * @internal
       */
      function isCollectionType(value) {
        var type = toRawType(value);
        return type === "Map" || type === "WeakMap" || type === "Set" || type === "WeakSet";
      }

      /**
       * @internal
       */
      var RefFlag = "__v_isRef";
      function isRef(r) {
        return !!(r && r.__v_isRef === true);
      }
      function ref$1(value) {
        return createRef(value, false);
      }
      function shallowRef(value) {
        return createRef(value, true);
      }
      function createRef(rawValue, shallow) {
        if (isRef(rawValue)) {
          return rawValue;
        }
        var ref = {};
        def(ref, RefFlag, true);
        def(ref, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, shallow);
        def(ref, "dep", defineReactive(ref, "value", rawValue, null, shallow, isServerRendering()));
        return ref;
      }
      function triggerRef(ref) {
        if (false) {
        }
        if (false) {
        } else {
          ref.dep && ref.dep.notify();
        }
      }
      function unref(ref) {
        return isRef(ref) ? ref.value : ref;
      }
      function proxyRefs(objectWithRefs) {
        if (isReactive(objectWithRefs)) {
          return objectWithRefs;
        }
        var proxy = {};
        var keys = Object.keys(objectWithRefs);
        for (var i = 0; i < keys.length; i++) {
          proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
        }
        return proxy;
      }
      function proxyWithRefUnwrap(target, source, key) {
        Object.defineProperty(target, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            var val = source[key];
            if (isRef(val)) {
              return val.value;
            } else {
              var ob = val && val.__ob__;
              if (ob) ob.dep.depend();
              return val;
            }
          },
          set: function (value) {
            var oldValue = source[key];
            if (isRef(oldValue) && !isRef(value)) {
              oldValue.value = value;
            } else {
              source[key] = value;
            }
          },
        });
      }
      function customRef(factory) {
        var dep = new Dep();
        var _a = factory(
            function () {
              if (false) {
              } else {
                dep.depend();
              }
            },
            function () {
              if (false) {
              } else {
                dep.notify();
              }
            },
          ),
          get = _a.get,
          set = _a.set;
        var ref = {
          get value() {
            return get();
          },
          set value(newVal) {
            set(newVal);
          },
        };
        def(ref, RefFlag, true);
        return ref;
      }
      function toRefs(object) {
        if (false) {
        }
        var ret = isArray(object) ? new Array(object.length) : {};
        for (var key in object) {
          ret[key] = toRef(object, key);
        }
        return ret;
      }
      function toRef(object, key, defaultValue) {
        var val = object[key];
        if (isRef(val)) {
          return val;
        }
        var ref = {
          get value() {
            var val = object[key];
            return val === undefined ? defaultValue : val;
          },
          set value(newVal) {
            object[key] = newVal;
          },
        };
        def(ref, RefFlag, true);
        return ref;
      }

      var rawToReadonlyFlag = "__v_rawToReadonly";
      var rawToShallowReadonlyFlag = "__v_rawToShallowReadonly";
      function readonly(target) {
        return createReadonly(target, false);
      }
      function createReadonly(target, shallow) {
        if (!isPlainObject(target)) {
          if (false) {
          }
          return target;
        }
        if (false) {
        }
        // already a readonly object
        if (isReadonly(target)) {
          return target;
        }
        // already has a readonly proxy
        var existingFlag = shallow ? rawToShallowReadonlyFlag : rawToReadonlyFlag;
        var existingProxy = target[existingFlag];
        if (existingProxy) {
          return existingProxy;
        }
        var proxy = Object.create(Object.getPrototypeOf(target));
        def(target, existingFlag, proxy);
        def(proxy, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, true);
        def(proxy, "__v_raw" /* ReactiveFlags.RAW */, target);
        if (isRef(target)) {
          def(proxy, RefFlag, true);
        }
        if (shallow || isShallow(target)) {
          def(proxy, "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */, true);
        }
        var keys = Object.keys(target);
        for (var i = 0; i < keys.length; i++) {
          defineReadonlyProperty(proxy, target, keys[i], shallow);
        }
        return proxy;
      }
      function defineReadonlyProperty(proxy, target, key, shallow) {
        Object.defineProperty(proxy, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            var val = target[key];
            return shallow || !isPlainObject(val) ? val : readonly(val);
          },
          set: function () {
            false && false;
          },
        });
      }
      /**
       * Returns a reactive-copy of the original object, where only the root level
       * properties are readonly, and does NOT unwrap refs nor recursively convert
       * returned properties.
       * This is used for creating the props proxy object for stateful components.
       */
      function shallowReadonly(target) {
        return createReadonly(target, true);
      }

      function computed(getterOrOptions, debugOptions) {
        var getter;
        var setter;
        var onlyGetter = isFunction(getterOrOptions);
        if (onlyGetter) {
          getter = getterOrOptions;
          setter = false ? undefined : noop;
        } else {
          getter = getterOrOptions.get;
          setter = getterOrOptions.set;
        }
        var watcher = isServerRendering()
          ? null
          : new Watcher(currentInstance, getter, noop, { lazy: true });
        if (false) {
        }
        var ref = {
          // some libs rely on the presence effect for checking computed refs
          // from normal refs, but the implementation doesn't matter
          effect: watcher,
          get value() {
            if (watcher) {
              if (watcher.dirty) {
                watcher.evaluate();
              }
              if (Dep.target) {
                if (false) {
                }
                watcher.depend();
              }
              return watcher.value;
            } else {
              return getter();
            }
          },
          set value(newVal) {
            setter(newVal);
          },
        };
        def(ref, RefFlag, true);
        def(ref, "__v_isReadonly" /* ReactiveFlags.IS_READONLY */, onlyGetter);
        return ref;
      }

      var WATCHER = "watcher";
      var WATCHER_CB = "".concat(WATCHER, " callback");
      var WATCHER_GETTER = "".concat(WATCHER, " getter");
      var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
      // Simple effect.
      function watchEffect(effect, options) {
        return doWatch(effect, null, options);
      }
      function watchPostEffect(effect, options) {
        return doWatch(effect, null, false ? undefined : { flush: "post" });
      }
      function watchSyncEffect(effect, options) {
        return doWatch(effect, null, false ? undefined : { flush: "sync" });
      }
      // initial value for watchers to trigger on undefined initial values
      var INITIAL_WATCHER_VALUE = {};
      // implementation
      function watch(source, cb, options) {
        if (false) {
        }
        return doWatch(source, cb, options);
      }
      function doWatch(source, cb, _a) {
        var _b = _a === void 0 ? emptyObject : _a,
          immediate = _b.immediate,
          deep = _b.deep,
          _c = _b.flush,
          flush = _c === void 0 ? "pre" : _c,
          onTrack = _b.onTrack,
          onTrigger = _b.onTrigger;
        if (false) {
        }
        var warnInvalidSource = function (s) {
          warn(
            "Invalid watch source: ".concat(s, ". A watch source can only be a getter/effect ") +
              "function, a ref, a reactive object, or an array of these types.",
          );
        };
        var instance = currentInstance;
        var call = function (fn, type, args) {
          if (args === void 0) {
            args = null;
          }
          var res = invokeWithErrorHandling(fn, null, args, instance, type);
          if (deep && res && res.__ob__) res.__ob__.dep.depend();
          return res;
        };
        var getter;
        var forceTrigger = false;
        var isMultiSource = false;
        if (isRef(source)) {
          getter = function () {
            return source.value;
          };
          forceTrigger = isShallow(source);
        } else if (isReactive(source)) {
          getter = function () {
            source.__ob__.dep.depend();
            return source;
          };
          deep = true;
        } else if (isArray(source)) {
          isMultiSource = true;
          forceTrigger = source.some(function (s) {
            return isReactive(s) || isShallow(s);
          });
          getter = function () {
            return source.map(function (s) {
              if (isRef(s)) {
                return s.value;
              } else if (isReactive(s)) {
                s.__ob__.dep.depend();
                return traverse(s);
              } else if (isFunction(s)) {
                return call(s, WATCHER_GETTER);
              } else {
                false && false;
              }
            });
          };
        } else if (isFunction(source)) {
          if (cb) {
            // getter with cb
            getter = function () {
              return call(source, WATCHER_GETTER);
            };
          } else {
            // no cb -> simple effect
            getter = function () {
              if (instance && instance._isDestroyed) {
                return;
              }
              if (cleanup) {
                cleanup();
              }
              return call(source, WATCHER, [onCleanup]);
            };
          }
        } else {
          getter = noop;
          false && false;
        }
        if (cb && deep) {
          var baseGetter_1 = getter;
          getter = function () {
            return traverse(baseGetter_1());
          };
        }
        var cleanup;
        var onCleanup = function (fn) {
          cleanup = watcher.onStop = function () {
            call(fn, WATCHER_CLEANUP);
          };
        };
        // in SSR there is no need to setup an actual effect, and it should be noop
        // unless it's eager
        if (isServerRendering()) {
          // we will also not call the invalidate callback (+ runner is not set up)
          onCleanup = noop;
          if (!cb) {
            getter();
          } else if (immediate) {
            call(cb, WATCHER_CB, [getter(), isMultiSource ? [] : undefined, onCleanup]);
          }
          return noop;
        }
        var watcher = new Watcher(currentInstance, getter, noop, {
          lazy: true,
        });
        watcher.noRecurse = !cb;
        var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
        // overwrite default run
        watcher.run = function () {
          if (!watcher.active) {
            return;
          }
          if (cb) {
            // watch(source, cb)
            var newValue = watcher.get();
            if (
              deep ||
              forceTrigger ||
              (isMultiSource
                ? newValue.some(function (v, i) {
                    return hasChanged(v, oldValue[i]);
                  })
                : hasChanged(newValue, oldValue))
            ) {
              // cleanup before running cb again
              if (cleanup) {
                cleanup();
              }
              call(cb, WATCHER_CB, [
                newValue,
                // pass undefined as the old value when it's changed for the first time
                oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                onCleanup,
              ]);
              oldValue = newValue;
            }
          } else {
            // watchEffect
            watcher.get();
          }
        };
        if (flush === "sync") {
          watcher.update = watcher.run;
        } else if (flush === "post") {
          watcher.post = true;
          watcher.update = function () {
            return queueWatcher(watcher);
          };
        } else {
          // pre
          watcher.update = function () {
            if (instance && instance === currentInstance && !instance._isMounted) {
              // pre-watcher triggered before
              var buffer = instance._preWatchers || (instance._preWatchers = []);
              if (buffer.indexOf(watcher) < 0) buffer.push(watcher);
            } else {
              queueWatcher(watcher);
            }
          };
        }
        if (false) {
        }
        // initial run
        if (cb) {
          if (immediate) {
            watcher.run();
          } else {
            oldValue = watcher.get();
          }
        } else if (flush === "post" && instance) {
          instance.$once("hook:mounted", function () {
            return watcher.get();
          });
        } else {
          watcher.get();
        }
        return function () {
          watcher.teardown();
        };
      }

      var activeEffectScope;
      var EffectScope = /** @class */ (function () {
        function EffectScope(detached) {
          if (detached === void 0) {
            detached = false;
          }
          this.detached = detached;
          /**
           * @internal
           */
          this.active = true;
          /**
           * @internal
           */
          this.effects = [];
          /**
           * @internal
           */
          this.cleanups = [];
          this.parent = activeEffectScope;
          if (!detached && activeEffectScope) {
            this.index =
              (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
          }
        }
        EffectScope.prototype.run = function (fn) {
          if (this.active) {
            var currentEffectScope = activeEffectScope;
            try {
              activeEffectScope = this;
              return fn();
            } finally {
              activeEffectScope = currentEffectScope;
            }
          } else if (false) {
          }
        };
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        EffectScope.prototype.on = function () {
          activeEffectScope = this;
        };
        /**
         * This should only be called on non-detached scopes
         * @internal
         */
        EffectScope.prototype.off = function () {
          activeEffectScope = this.parent;
        };
        EffectScope.prototype.stop = function (fromParent) {
          if (this.active) {
            var i = void 0,
              l = void 0;
            for (i = 0, l = this.effects.length; i < l; i++) {
              this.effects[i].teardown();
            }
            for (i = 0, l = this.cleanups.length; i < l; i++) {
              this.cleanups[i]();
            }
            if (this.scopes) {
              for (i = 0, l = this.scopes.length; i < l; i++) {
                this.scopes[i].stop(true);
              }
            }
            // nested scope, dereference from parent to avoid memory leaks
            if (!this.detached && this.parent && !fromParent) {
              // optimized O(1) removal
              var last = this.parent.scopes.pop();
              if (last && last !== this) {
                this.parent.scopes[this.index] = last;
                last.index = this.index;
              }
            }
            this.parent = undefined;
            this.active = false;
          }
        };
        return EffectScope;
      })();
      function effectScope(detached) {
        return new EffectScope(detached);
      }
      /**
       * @internal
       */
      function recordEffectScope(effect, scope) {
        if (scope === void 0) {
          scope = activeEffectScope;
        }
        if (scope && scope.active) {
          scope.effects.push(effect);
        }
      }
      function getCurrentScope() {
        return activeEffectScope;
      }
      function onScopeDispose(fn) {
        if (activeEffectScope) {
          activeEffectScope.cleanups.push(fn);
        } else if (false) {
        }
      }

      function provide(key, value) {
        if (!currentInstance) {
          if (false) {
          }
        } else {
          // TS doesn't allow symbol as index type
          resolveProvided(currentInstance)[key] = value;
        }
      }
      function resolveProvided(vm) {
        // by default an instance inherits its parent's provides object
        // but when it needs to provide values of its own, it creates its
        // own provides object using parent provides object as prototype.
        // this way in `inject` we can simply look up injections from direct
        // parent and let the prototype chain do the work.
        var existing = vm._provided;
        var parentProvides = vm.$parent && vm.$parent._provided;
        if (parentProvides === existing) {
          return (vm._provided = Object.create(parentProvides));
        } else {
          return existing;
        }
      }
      function inject(key, defaultValue, treatDefaultAsFactory) {
        if (treatDefaultAsFactory === void 0) {
          treatDefaultAsFactory = false;
        }
        // fallback to `currentRenderingInstance` so that this can be called in
        // a functional component
        var instance = currentInstance;
        if (instance) {
          // #2400
          // to support `app.use` plugins,
          // fallback to appContext's `provides` if the instance is at root
          var provides = instance.$parent && instance.$parent._provided;
          if (provides && key in provides) {
            // TS doesn't allow symbol as index type
            return provides[key];
          } else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue)
              ? defaultValue.call(instance)
              : defaultValue;
          } else if (false) {
          }
        } else if (false) {
        }
      }

      var normalizeEvent = cached(function (name) {
        var passive = name.charAt(0) === "&";
        name = passive ? name.slice(1) : name;
        var once = name.charAt(0) === "~"; // Prefixed last, checked first
        name = once ? name.slice(1) : name;
        var capture = name.charAt(0) === "!";
        name = capture ? name.slice(1) : name;
        return {
          name: name,
          once: once,
          capture: capture,
          passive: passive,
        };
      });
      function createFnInvoker(fns, vm) {
        function invoker() {
          var fns = invoker.fns;
          if (isArray(fns)) {
            var cloned = fns.slice();
            for (var i = 0; i < cloned.length; i++) {
              invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
            }
          } else {
            // return handler return value for single handlers
            return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
          }
        }
        invoker.fns = fns;
        return invoker;
      }
      function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
        var name, cur, old, event;
        for (name in on) {
          cur = on[name];
          old = oldOn[name];
          event = normalizeEvent(name);
          if (isUndef(cur)) {
            false && false;
          } else if (isUndef(old)) {
            if (isUndef(cur.fns)) {
              cur = on[name] = createFnInvoker(cur, vm);
            }
            if (isTrue(event.once)) {
              cur = on[name] = createOnceHandler(event.name, cur, event.capture);
            }
            add(event.name, cur, event.capture, event.passive, event.params);
          } else if (cur !== old) {
            old.fns = cur;
            on[name] = old;
          }
        }
        for (name in oldOn) {
          if (isUndef(on[name])) {
            event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
          }
        }
      }

      function mergeVNodeHook(def, hookKey, hook) {
        if (def instanceof VNode) {
          def = def.data.hook || (def.data.hook = {});
        }
        var invoker;
        var oldHook = def[hookKey];
        function wrappedHook() {
          hook.apply(this, arguments);
          // important: remove merged hook to ensure it's called only once
          // and prevent memory leak
          remove$2(invoker.fns, wrappedHook);
        }
        if (isUndef(oldHook)) {
          // no existing hook
          invoker = createFnInvoker([wrappedHook]);
        } else {
          /* istanbul ignore if */
          if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
            // already a merged invoker
            invoker = oldHook;
            invoker.fns.push(wrappedHook);
          } else {
            // existing plain hook
            invoker = createFnInvoker([oldHook, wrappedHook]);
          }
        }
        invoker.merged = true;
        def[hookKey] = invoker;
      }

      function extractPropsFromVNodeData(data, Ctor, tag) {
        // we are only extracting raw values here.
        // validation and default values are handled in the child
        // component itself.
        var propOptions = Ctor.options.props;
        if (isUndef(propOptions)) {
          return;
        }
        var res = {};
        var attrs = data.attrs,
          props = data.props;
        if (isDef(attrs) || isDef(props)) {
          for (var key in propOptions) {
            var altKey = hyphenate(key);
            if (false) {
              var keyInLowerCase;
            }
            checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
          }
        }
        return res;
      }
      function checkProp(res, hash, key, altKey, preserve) {
        if (isDef(hash)) {
          if (hasOwn(hash, key)) {
            res[key] = hash[key];
            if (!preserve) {
              delete hash[key];
            }
            return true;
          } else if (hasOwn(hash, altKey)) {
            res[key] = hash[altKey];
            if (!preserve) {
              delete hash[altKey];
            }
            return true;
          }
        }
        return false;
      }

      // The template compiler attempts to minimize the need for normalization by
      // statically analyzing the template at compile time.
      //
      // For plain HTML markup, normalization can be completely skipped because the
      // generated render function is guaranteed to return Array<VNode>. There are
      // two cases where extra normalization is needed:
      // 1. When the children contains components - because a functional component
      // may return an Array instead of a single root. In this case, just a simple
      // normalization is needed - if any child is an Array, we flatten the whole
      // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
      // because functional components already normalize their own children.
      function simpleNormalizeChildren(children) {
        for (var i = 0; i < children.length; i++) {
          if (isArray(children[i])) {
            return Array.prototype.concat.apply([], children);
          }
        }
        return children;
      }
      // 2. When the children contains constructs that always generated nested Arrays,
      // e.g. <template>, <slot>, v-for, or when the children is provided by user
      // with hand-written render functions / JSX. In such cases a full normalization
      // is needed to cater to all possible types of children values.
      function normalizeChildren(children) {
        return isPrimitive(children)
          ? [createTextVNode(children)]
          : isArray(children)
            ? normalizeArrayChildren(children)
            : undefined;
      }
      function isTextNode(node) {
        return isDef(node) && isDef(node.text) && isFalse(node.isComment);
      }
      function normalizeArrayChildren(children, nestedIndex) {
        var res = [];
        var i, c, lastIndex, last;
        for (i = 0; i < children.length; i++) {
          c = children[i];
          if (isUndef(c) || typeof c === "boolean") continue;
          lastIndex = res.length - 1;
          last = res[lastIndex];
          //  nested
          if (isArray(c)) {
            if (c.length > 0) {
              c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
              // merge adjacent text nodes
              if (isTextNode(c[0]) && isTextNode(last)) {
                res[lastIndex] = createTextVNode(last.text + c[0].text);
                c.shift();
              }
              res.push.apply(res, c);
            }
          } else if (isPrimitive(c)) {
            if (isTextNode(last)) {
              // merge adjacent text nodes
              // this is necessary for SSR hydration because text nodes are
              // essentially merged when rendered to HTML strings
              res[lastIndex] = createTextVNode(last.text + c);
            } else if (c !== "") {
              // convert primitive to vnode
              res.push(createTextVNode(c));
            }
          } else {
            if (isTextNode(c) && isTextNode(last)) {
              // merge adjacent text nodes
              res[lastIndex] = createTextVNode(last.text + c.text);
            } else {
              // default key for nested array children (likely generated by v-for)
              if (
                isTrue(children._isVList) &&
                isDef(c.tag) &&
                isUndef(c.key) &&
                isDef(nestedIndex)
              ) {
                c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
              }
              res.push(c);
            }
          }
        }
        return res;
      }

      /**
       * Runtime helper for rendering v-for lists.
       */
      function renderList(val, render) {
        var ret = null,
          i,
          l,
          keys,
          key;
        if (isArray(val) || typeof val === "string") {
          ret = new Array(val.length);
          for (i = 0, l = val.length; i < l; i++) {
            ret[i] = render(val[i], i);
          }
        } else if (typeof val === "number") {
          ret = new Array(val);
          for (i = 0; i < val; i++) {
            ret[i] = render(i + 1, i);
          }
        } else if (isObject(val)) {
          if (hasSymbol && val[Symbol.iterator]) {
            ret = [];
            var iterator = val[Symbol.iterator]();
            var result = iterator.next();
            while (!result.done) {
              ret.push(render(result.value, ret.length));
              result = iterator.next();
            }
          } else {
            keys = Object.keys(val);
            ret = new Array(keys.length);
            for (i = 0, l = keys.length; i < l; i++) {
              key = keys[i];
              ret[i] = render(val[key], key, i);
            }
          }
        }
        if (!isDef(ret)) {
          ret = [];
        }
        ret._isVList = true;
        return ret;
      }

      /**
       * Runtime helper for rendering <slot>
       */
      function renderSlot(name, fallbackRender, props, bindObject) {
        var scopedSlotFn = this.$scopedSlots[name];
        var nodes;
        if (scopedSlotFn) {
          // scoped slot
          props = props || {};
          if (bindObject) {
            if (false) {
            }
            props = extend(extend({}, bindObject), props);
          }
          nodes =
            scopedSlotFn(props) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
        } else {
          nodes =
            this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
        }
        var target = props && props.slot;
        if (target) {
          return this.$createElement("template", { slot: target }, nodes);
        } else {
          return nodes;
        }
      }

      /**
       * Runtime helper for resolving filters
       */
      function resolveFilter(id) {
        return resolveAsset(this.$options, "filters", id, true) || identity;
      }

      function isKeyNotMatch(expect, actual) {
        if (isArray(expect)) {
          return expect.indexOf(actual) === -1;
        } else {
          return expect !== actual;
        }
      }
      /**
       * Runtime helper for checking keyCodes from config.
       * exposed as Vue.prototype._k
       * passing in eventKeyName as last argument separately for backwards compat
       */
      function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
        var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
        if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
          return isKeyNotMatch(builtInKeyName, eventKeyName);
        } else if (mappedKeyCode) {
          return isKeyNotMatch(mappedKeyCode, eventKeyCode);
        } else if (eventKeyName) {
          return hyphenate(eventKeyName) !== key;
        }
        return eventKeyCode === undefined;
      }

      /**
       * Runtime helper for merging v-bind="object" into a VNode's data.
       */
      function bindObjectProps(data, tag, value, asProp, isSync) {
        if (value) {
          if (!isObject(value)) {
            false && false;
          } else {
            if (isArray(value)) {
              value = toObject(value);
            }
            var hash = void 0;
            var _loop_1 = function (key) {
              if (key === "class" || key === "style" || isReservedAttribute(key)) {
                hash = data;
              } else {
                var type = data.attrs && data.attrs.type;
                hash =
                  asProp || config.mustUseProp(tag, type, key)
                    ? data.domProps || (data.domProps = {})
                    : data.attrs || (data.attrs = {});
              }
              var camelizedKey = camelize(key);
              var hyphenatedKey = hyphenate(key);
              if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                hash[key] = value[key];
                if (isSync) {
                  var on = data.on || (data.on = {});
                  on["update:".concat(key)] = function ($event) {
                    value[key] = $event;
                  };
                }
              }
            };
            for (var key in value) {
              _loop_1(key);
            }
          }
        }
        return data;
      }

      /**
       * Runtime helper for rendering static trees.
       */
      function renderStatic(index, isInFor) {
        var cached = this._staticTrees || (this._staticTrees = []);
        var tree = cached[index];
        // if has already-rendered static tree and not inside v-for,
        // we can reuse the same tree.
        if (tree && !isInFor) {
          return tree;
        }
        // otherwise, render a fresh tree.
        tree = cached[index] = this.$options.staticRenderFns[index].call(
          this._renderProxy,
          this._c,
          this, // for render fns generated for functional component templates
        );
        markStatic(tree, "__static__".concat(index), false);
        return tree;
      }
      /**
       * Runtime helper for v-once.
       * Effectively it means marking the node as static with a unique key.
       */
      function markOnce(tree, index, key) {
        markStatic(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
        return tree;
      }
      function markStatic(tree, key, isOnce) {
        if (isArray(tree)) {
          for (var i = 0; i < tree.length; i++) {
            if (tree[i] && typeof tree[i] !== "string") {
              markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
            }
          }
        } else {
          markStaticNode(tree, key, isOnce);
        }
      }
      function markStaticNode(node, key, isOnce) {
        node.isStatic = true;
        node.key = key;
        node.isOnce = isOnce;
      }

      function bindObjectListeners(data, value) {
        if (value) {
          if (!isPlainObject(value)) {
            false && false;
          } else {
            var on = (data.on = data.on ? extend({}, data.on) : {});
            for (var key in value) {
              var existing = on[key];
              var ours = value[key];
              on[key] = existing ? [].concat(existing, ours) : ours;
            }
          }
        }
        return data;
      }

      function resolveScopedSlots(
        fns,
        res,
        // the following are added in 2.6
        hasDynamicKeys,
        contentHashKey,
      ) {
        res = res || { $stable: !hasDynamicKeys };
        for (var i = 0; i < fns.length; i++) {
          var slot = fns[i];
          if (isArray(slot)) {
            resolveScopedSlots(slot, res, hasDynamicKeys);
          } else if (slot) {
            // marker for reverse proxying v-slot without scope on this.$slots
            // @ts-expect-error
            if (slot.proxy) {
              // @ts-expect-error
              slot.fn.proxy = true;
            }
            res[slot.key] = slot.fn;
          }
        }
        if (contentHashKey) {
          res.$key = contentHashKey;
        }
        return res;
      }

      // helper to process dynamic keys for dynamic arguments in v-bind and v-on.
      function bindDynamicKeys(baseObj, values) {
        for (var i = 0; i < values.length; i += 2) {
          var key = values[i];
          if (typeof key === "string" && key) {
            baseObj[values[i]] = values[i + 1];
          } else if (false) {
          }
        }
        return baseObj;
      }
      // helper to dynamically append modifier runtime markers to event names.
      // ensure only append when value is already string, otherwise it will be cast
      // to string and cause the type check to miss.
      function prependModifier(value, symbol) {
        return typeof value === "string" ? symbol + value : value;
      }

      function installRenderHelpers(target) {
        target._o = markOnce;
        target._n = toNumber;
        target._s = toString;
        target._l = renderList;
        target._t = renderSlot;
        target._q = looseEqual;
        target._i = looseIndexOf;
        target._m = renderStatic;
        target._f = resolveFilter;
        target._k = checkKeyCodes;
        target._b = bindObjectProps;
        target._v = createTextVNode;
        target._e = createEmptyVNode;
        target._u = resolveScopedSlots;
        target._g = bindObjectListeners;
        target._d = bindDynamicKeys;
        target._p = prependModifier;
      }

      /**
       * Runtime helper for resolving raw children VNodes into a slot object.
       */
      function resolveSlots(children, context) {
        if (!children || !children.length) {
          return {};
        }
        var slots = {};
        for (var i = 0, l = children.length; i < l; i++) {
          var child = children[i];
          var data = child.data;
          // remove slot attribute if the node is resolved as a Vue slot node
          if (data && data.attrs && data.attrs.slot) {
            delete data.attrs.slot;
          }
          // named slots should only be respected if the vnode was rendered in the
          // same context.
          if (
            (child.context === context || child.fnContext === context) &&
            data &&
            data.slot != null
          ) {
            var name_1 = data.slot;
            var slot = slots[name_1] || (slots[name_1] = []);
            if (child.tag === "template") {
              slot.push.apply(slot, child.children || []);
            } else {
              slot.push(child);
            }
          } else {
            (slots.default || (slots.default = [])).push(child);
          }
        }
        // ignore slots that contains only whitespace
        for (var name_2 in slots) {
          if (slots[name_2].every(isWhitespace)) {
            delete slots[name_2];
          }
        }
        return slots;
      }
      function isWhitespace(node) {
        return (node.isComment && !node.asyncFactory) || node.text === " ";
      }

      function isAsyncPlaceholder(node) {
        // @ts-expect-error not really boolean type
        return node.isComment && node.asyncFactory;
      }

      function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
        var res;
        var hasNormalSlots = Object.keys(normalSlots).length > 0;
        var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
        var key = scopedSlots && scopedSlots.$key;
        if (!scopedSlots) {
          res = {};
        } else if (scopedSlots._normalized) {
          // fast path 1: child component re-render only, parent did not change
          return scopedSlots._normalized;
        } else if (
          isStable &&
          prevScopedSlots &&
          prevScopedSlots !== emptyObject &&
          key === prevScopedSlots.$key &&
          !hasNormalSlots &&
          !prevScopedSlots.$hasNormal
        ) {
          // fast path 2: stable scoped slots w/ no normal slots to proxy,
          // only need to normalize once
          return prevScopedSlots;
        } else {
          res = {};
          for (var key_1 in scopedSlots) {
            if (scopedSlots[key_1] && key_1[0] !== "$") {
              res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
            }
          }
        }
        // expose normal slots on scopedSlots
        for (var key_2 in normalSlots) {
          if (!(key_2 in res)) {
            res[key_2] = proxyNormalSlot(normalSlots, key_2);
          }
        }
        // avoriaz seems to mock a non-extensible $scopedSlots object
        // and when that is passed down this would cause an error
        if (scopedSlots && Object.isExtensible(scopedSlots)) {
          scopedSlots._normalized = res;
        }
        def(res, "$stable", isStable);
        def(res, "$key", key);
        def(res, "$hasNormal", hasNormalSlots);
        return res;
      }
      function normalizeScopedSlot(vm, normalSlots, key, fn) {
        var normalized = function () {
          var cur = currentInstance;
          setCurrentInstance(vm);
          var res = arguments.length ? fn.apply(null, arguments) : fn({});
          res =
            res && typeof res === "object" && !isArray(res)
              ? [res] // single vnode
              : normalizeChildren(res);
          var vnode = res && res[0];
          setCurrentInstance(cur);
          return res &&
            (!vnode || (res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode))) // #9658, #10391
            ? undefined
            : res;
        };
        // this is a slot using the new v-slot syntax without scope. although it is
        // compiled as a scoped slot, render fn users would expect it to be present
        // on this.$slots because the usage is semantically a normal slot.
        if (fn.proxy) {
          Object.defineProperty(normalSlots, key, {
            get: normalized,
            enumerable: true,
            configurable: true,
          });
        }
        return normalized;
      }
      function proxyNormalSlot(slots, key) {
        return function () {
          return slots[key];
        };
      }

      function initSetup(vm) {
        var options = vm.$options;
        var setup = options.setup;
        if (setup) {
          var ctx = (vm._setupContext = createSetupContext(vm));
          setCurrentInstance(vm);
          pushTarget();
          var setupResult = invokeWithErrorHandling(
            setup,
            null,
            [vm._props || shallowReactive({}), ctx],
            vm,
            "setup",
          );
          popTarget();
          setCurrentInstance();
          if (isFunction(setupResult)) {
            // render function
            // @ts-ignore
            options.render = setupResult;
          } else if (isObject(setupResult)) {
            // bindings
            if (false) {
            }
            vm._setupState = setupResult;
            // __sfc indicates compiled bindings from <script setup>
            if (!setupResult.__sfc) {
              for (var key in setupResult) {
                if (!isReserved(key)) {
                  proxyWithRefUnwrap(vm, setupResult, key);
                } else if (false) {
                }
              }
            } else {
              // exposed for compiled render fn
              var proxy = (vm._setupProxy = {});
              for (var key in setupResult) {
                if (key !== "__sfc") {
                  proxyWithRefUnwrap(proxy, setupResult, key);
                }
              }
            }
          } else if (false) {
          }
        }
      }
      function createSetupContext(vm) {
        var exposeCalled = false;
        return {
          get attrs() {
            if (!vm._attrsProxy) {
              var proxy = (vm._attrsProxy = {});
              def(proxy, "_v_attr_proxy", true);
              syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, "$attrs");
            }
            return vm._attrsProxy;
          },
          get listeners() {
            if (!vm._listenersProxy) {
              var proxy = (vm._listenersProxy = {});
              syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, "$listeners");
            }
            return vm._listenersProxy;
          },
          get slots() {
            return initSlotsProxy(vm);
          },
          emit: bind(vm.$emit, vm),
          expose: function (exposed) {
            if (false) {
            }
            if (exposed) {
              Object.keys(exposed).forEach(function (key) {
                return proxyWithRefUnwrap(vm, exposed, key);
              });
            }
          },
        };
      }
      function syncSetupProxy(to, from, prev, instance, type) {
        var changed = false;
        for (var key in from) {
          if (!(key in to)) {
            changed = true;
            defineProxyAttr(to, key, instance, type);
          } else if (from[key] !== prev[key]) {
            changed = true;
          }
        }
        for (var key in to) {
          if (!(key in from)) {
            changed = true;
            delete to[key];
          }
        }
        return changed;
      }
      function defineProxyAttr(proxy, key, instance, type) {
        Object.defineProperty(proxy, key, {
          enumerable: true,
          configurable: true,
          get: function () {
            return instance[type][key];
          },
        });
      }
      function initSlotsProxy(vm) {
        if (!vm._slotsProxy) {
          syncSetupSlots((vm._slotsProxy = {}), vm.$scopedSlots);
        }
        return vm._slotsProxy;
      }
      function syncSetupSlots(to, from) {
        for (var key in from) {
          to[key] = from[key];
        }
        for (var key in to) {
          if (!(key in from)) {
            delete to[key];
          }
        }
      }
      /**
       * @internal use manual type def because public setup context type relies on
       * legacy VNode types
       */
      function useSlots() {
        return getContext().slots;
      }
      /**
       * @internal use manual type def because public setup context type relies on
       * legacy VNode types
       */
      function useAttrs() {
        return getContext().attrs;
      }
      /**
       * Vue 2 only
       * @internal use manual type def because public setup context type relies on
       * legacy VNode types
       */
      function useListeners() {
        return getContext().listeners;
      }
      function getContext() {
        if (false) {
        }
        var vm = currentInstance;
        return vm._setupContext || (vm._setupContext = createSetupContext(vm));
      }
      /**
       * Runtime helper for merging default declarations. Imported by compiled code
       * only.
       * @internal
       */
      function mergeDefaults(raw, defaults) {
        var props = isArray(raw)
          ? raw.reduce(function (normalized, p) {
              return ((normalized[p] = {}), normalized);
            }, {})
          : raw;
        for (var key in defaults) {
          var opt = props[key];
          if (opt) {
            if (isArray(opt) || isFunction(opt)) {
              props[key] = { type: opt, default: defaults[key] };
            } else {
              opt.default = defaults[key];
            }
          } else if (opt === null) {
            props[key] = { default: defaults[key] };
          } else if (false) {
          }
        }
        return props;
      }

      function initRender(vm) {
        vm._vnode = null; // the root of the child tree
        vm._staticTrees = null; // v-once cached trees
        var options = vm.$options;
        var parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
        var renderContext = parentVnode && parentVnode.context;
        vm.$slots = resolveSlots(options._renderChildren, renderContext);
        vm.$scopedSlots = parentVnode
          ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
          : emptyObject;
        // bind the createElement fn to this instance
        // so that we get proper render context inside it.
        // args order: tag, data, children, normalizationType, alwaysNormalize
        // internal version is used by render functions compiled from templates
        // @ts-expect-error
        vm._c = function (a, b, c, d) {
          return createElement$1(vm, a, b, c, d, false);
        };
        // normalization is always applied for the public version, used in
        // user-written render functions.
        // @ts-expect-error
        vm.$createElement = function (a, b, c, d) {
          return createElement$1(vm, a, b, c, d, true);
        };
        // $attrs & $listeners are exposed for easier HOC creation.
        // they need to be reactive so that HOCs using them are always updated
        var parentData = parentVnode && parentVnode.data;
        /* istanbul ignore else */
        if (false) {
        } else {
          defineReactive(vm, "$attrs", (parentData && parentData.attrs) || emptyObject, null, true);
          defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
        }
      }
      var currentRenderingInstance = null;
      function renderMixin(Vue) {
        // install runtime convenience helpers
        installRenderHelpers(Vue.prototype);
        Vue.prototype.$nextTick = function (fn) {
          return nextTick(fn, this);
        };
        Vue.prototype._render = function () {
          var vm = this;
          var _a = vm.$options,
            render = _a.render,
            _parentVnode = _a._parentVnode;
          if (_parentVnode && vm._isMounted) {
            vm.$scopedSlots = normalizeScopedSlots(
              vm.$parent,
              _parentVnode.data.scopedSlots,
              vm.$slots,
              vm.$scopedSlots,
            );
            if (vm._slotsProxy) {
              syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
            }
          }
          // set parent vnode. this allows render functions to have access
          // to the data on the placeholder node.
          vm.$vnode = _parentVnode;
          // render self
          var prevInst = currentInstance;
          var prevRenderInst = currentRenderingInstance;
          var vnode;
          try {
            setCurrentInstance(vm);
            currentRenderingInstance = vm;
            vnode = render.call(vm._renderProxy, vm.$createElement);
          } catch (e) {
            handleError(e, vm, "render");
            // return error render result,
            // or previous vnode to prevent render error causing blank component
            /* istanbul ignore else */
            if (false) {
            } else {
              vnode = vm._vnode;
            }
          } finally {
            currentRenderingInstance = prevRenderInst;
            setCurrentInstance(prevInst);
          }
          // if the returned array contains only a single node, allow it
          if (isArray(vnode) && vnode.length === 1) {
            vnode = vnode[0];
          }
          // return empty vnode in case the render function errored out
          if (!(vnode instanceof VNode)) {
            if (false) {
            }
            vnode = createEmptyVNode();
          }
          // set parent
          vnode.parent = _parentVnode;
          return vnode;
        };
      }

      function ensureCtor(comp, base) {
        if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === "Module")) {
          comp = comp.default;
        }
        return isObject(comp) ? base.extend(comp) : comp;
      }
      function createAsyncPlaceholder(factory, data, context, children, tag) {
        var node = createEmptyVNode();
        node.asyncFactory = factory;
        node.asyncMeta = { data: data, context: context, children: children, tag: tag };
        return node;
      }
      function resolveAsyncComponent(factory, baseCtor) {
        if (isTrue(factory.error) && isDef(factory.errorComp)) {
          return factory.errorComp;
        }
        if (isDef(factory.resolved)) {
          return factory.resolved;
        }
        var owner = currentRenderingInstance;
        if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
          // already pending
          factory.owners.push(owner);
        }
        if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
          return factory.loadingComp;
        }
        if (owner && !isDef(factory.owners)) {
          var owners_1 = (factory.owners = [owner]);
          var sync_1 = true;
          var timerLoading_1 = null;
          var timerTimeout_1 = null;
          owner.$on("hook:destroyed", function () {
            return remove$2(owners_1, owner);
          });
          var forceRender_1 = function (renderCompleted) {
            for (var i = 0, l = owners_1.length; i < l; i++) {
              owners_1[i].$forceUpdate();
            }
            if (renderCompleted) {
              owners_1.length = 0;
              if (timerLoading_1 !== null) {
                clearTimeout(timerLoading_1);
                timerLoading_1 = null;
              }
              if (timerTimeout_1 !== null) {
                clearTimeout(timerTimeout_1);
                timerTimeout_1 = null;
              }
            }
          };
          var resolve = once(function (res) {
            // cache resolved
            factory.resolved = ensureCtor(res, baseCtor);
            // invoke callbacks only if this is not a synchronous resolve
            // (async resolves are shimmed as synchronous during SSR)
            if (!sync_1) {
              forceRender_1(true);
            } else {
              owners_1.length = 0;
            }
          });
          var reject_1 = once(function (reason) {
            false && false;
            if (isDef(factory.errorComp)) {
              factory.error = true;
              forceRender_1(true);
            }
          });
          var res_1 = factory(resolve, reject_1);
          if (isObject(res_1)) {
            if (isPromise(res_1)) {
              // () => Promise
              if (isUndef(factory.resolved)) {
                res_1.then(resolve, reject_1);
              }
            } else if (isPromise(res_1.component)) {
              res_1.component.then(resolve, reject_1);
              if (isDef(res_1.error)) {
                factory.errorComp = ensureCtor(res_1.error, baseCtor);
              }
              if (isDef(res_1.loading)) {
                factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
                if (res_1.delay === 0) {
                  factory.loading = true;
                } else {
                  // @ts-expect-error NodeJS timeout type
                  timerLoading_1 = setTimeout(function () {
                    timerLoading_1 = null;
                    if (isUndef(factory.resolved) && isUndef(factory.error)) {
                      factory.loading = true;
                      forceRender_1(false);
                    }
                  }, res_1.delay || 200);
                }
              }
              if (isDef(res_1.timeout)) {
                // @ts-expect-error NodeJS timeout type
                timerTimeout_1 = setTimeout(function () {
                  timerTimeout_1 = null;
                  if (isUndef(factory.resolved)) {
                    reject_1(false ? undefined : null);
                  }
                }, res_1.timeout);
              }
            }
          }
          sync_1 = false;
          // return in case resolved synchronously
          return factory.loading ? factory.loadingComp : factory.resolved;
        }
      }

      function getFirstComponentChild(children) {
        if (isArray(children)) {
          for (var i = 0; i < children.length; i++) {
            var c = children[i];
            if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
              return c;
            }
          }
        }
      }

      var SIMPLE_NORMALIZE = 1;
      var ALWAYS_NORMALIZE = 2;
      // wrapper function for providing a more flexible interface
      // without getting yelled at by flow
      function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
        if (isArray(data) || isPrimitive(data)) {
          normalizationType = children;
          children = data;
          data = undefined;
        }
        if (isTrue(alwaysNormalize)) {
          normalizationType = ALWAYS_NORMALIZE;
        }
        return _createElement(context, tag, data, children, normalizationType);
      }
      function _createElement(context, tag, data, children, normalizationType) {
        if (isDef(data) && isDef(data.__ob__)) {
          false && false;
          return createEmptyVNode();
        }
        // object syntax in v-bind
        if (isDef(data) && isDef(data.is)) {
          tag = data.is;
        }
        if (!tag) {
          // in case of component :is set to falsy value
          return createEmptyVNode();
        }
        // warn against non-primitive key
        if (false) {
        }
        // support single function children as default scoped slot
        if (isArray(children) && isFunction(children[0])) {
          data = data || {};
          data.scopedSlots = { default: children[0] };
          children.length = 0;
        }
        if (normalizationType === ALWAYS_NORMALIZE) {
          children = normalizeChildren(children);
        } else if (normalizationType === SIMPLE_NORMALIZE) {
          children = simpleNormalizeChildren(children);
        }
        var vnode, ns;
        if (typeof tag === "string") {
          var Ctor = void 0;
          ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
          if (config.isReservedTag(tag)) {
            // platform built-in elements
            if (false) {
            }
            vnode = new VNode(
              config.parsePlatformTagName(tag),
              data,
              children,
              undefined,
              undefined,
              context,
            );
          } else if (
            (!data || !data.pre) &&
            isDef((Ctor = resolveAsset(context.$options, "components", tag)))
          ) {
            // component
            vnode = createComponent(Ctor, data, context, children, tag);
          } else {
            // unknown or unlisted namespaced elements
            // check at runtime because it may get assigned a namespace when its
            // parent normalizes children
            vnode = new VNode(tag, data, children, undefined, undefined, context);
          }
        } else {
          // direct component options / constructor
          vnode = createComponent(tag, data, context, children);
        }
        if (isArray(vnode)) {
          return vnode;
        } else if (isDef(vnode)) {
          if (isDef(ns)) applyNS(vnode, ns);
          if (isDef(data)) registerDeepBindings(data);
          return vnode;
        } else {
          return createEmptyVNode();
        }
      }
      function applyNS(vnode, ns, force) {
        vnode.ns = ns;
        if (vnode.tag === "foreignObject") {
          // use default namespace inside foreignObject
          ns = undefined;
          force = true;
        }
        if (isDef(vnode.children)) {
          for (var i = 0, l = vnode.children.length; i < l; i++) {
            var child = vnode.children[i];
            if (isDef(child.tag) && (isUndef(child.ns) || (isTrue(force) && child.tag !== "svg"))) {
              applyNS(child, ns, force);
            }
          }
        }
      }
      // ref #5318
      // necessary to ensure parent re-render when deep bindings like :style and
      // :class are used on slot nodes
      function registerDeepBindings(data) {
        if (isObject(data.style)) {
          traverse(data.style);
        }
        if (isObject(data.class)) {
          traverse(data.class);
        }
      }

      /**
       * @internal this function needs manual public type declaration because it relies
       * on previously manually authored types from Vue 2
       */
      function h(type, props, children) {
        if (!currentInstance) {
          false && false;
        }
        return createElement$1(currentInstance, type, props, children, 2, true);
      }

      function handleError(err, vm, info) {
        // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
        // See: https://github.com/vuejs/vuex/issues/1505
        pushTarget();
        try {
          if (vm) {
            var cur = vm;
            while ((cur = cur.$parent)) {
              var hooks = cur.$options.errorCaptured;
              if (hooks) {
                for (var i = 0; i < hooks.length; i++) {
                  try {
                    var capture = hooks[i].call(cur, err, vm, info) === false;
                    if (capture) return;
                  } catch (e) {
                    globalHandleError(e, cur, "errorCaptured hook");
                  }
                }
              }
            }
          }
          globalHandleError(err, vm, info);
        } finally {
          popTarget();
        }
      }
      function invokeWithErrorHandling(handler, context, args, vm, info) {
        var res;
        try {
          res = args ? handler.apply(context, args) : handler.call(context);
          if (res && !res._isVue && isPromise(res) && !res._handled) {
            res.catch(function (e) {
              return handleError(e, vm, info + " (Promise/async)");
            });
            res._handled = true;
          }
        } catch (e) {
          handleError(e, vm, info);
        }
        return res;
      }
      function globalHandleError(err, vm, info) {
        if (config.errorHandler) {
          try {
            return config.errorHandler.call(null, err, vm, info);
          } catch (e) {
            // if the user intentionally throws the original error in the handler,
            // do not log it twice
            if (e !== err) {
              logError(e, null, "config.errorHandler");
            }
          }
        }
        logError(err, vm, info);
      }
      function logError(err, vm, info) {
        if (false) {
        }
        /* istanbul ignore else */
        if (inBrowser && typeof console !== "undefined") {
          console.error(err);
        } else {
          throw err;
        }
      }

      /* globals MutationObserver */
      var isUsingMicroTask = false;
      var callbacks = [];
      var pending = false;
      function flushCallbacks() {
        pending = false;
        var copies = callbacks.slice(0);
        callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
          copies[i]();
        }
      }
      // Here we have async deferring wrappers using microtasks.
      // In 2.5 we used (macro) tasks (in combination with microtasks).
      // However, it has subtle problems when state is changed right before repaint
      // (e.g. #6813, out-in transitions).
      // Also, using (macro) tasks in event handler would cause some weird behaviors
      // that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
      // So we now use microtasks everywhere, again.
      // A major drawback of this tradeoff is that there are some scenarios
      // where microtasks have too high a priority and fire in between supposedly
      // sequential events (e.g. #4521, #6690, which have workarounds)
      // or even between bubbling of the same event (#6566).
      var timerFunc;
      // The nextTick behavior leverages the microtask queue, which can be accessed
      // via either native Promise.then or MutationObserver.
      // MutationObserver has wider support, however it is seriously bugged in
      // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
      // completely stops working after triggering a few times... so, if native
      // Promise is available, we will use it:
      /* istanbul ignore next, $flow-disable-line */
      if (typeof Promise !== "undefined" && isNative(Promise)) {
        var p_1 = Promise.resolve();
        timerFunc = function () {
          p_1.then(flushCallbacks);
          // In problematic UIWebViews, Promise.then doesn't completely break, but
          // it can get stuck in a weird state where callbacks are pushed into the
          // microtask queue but the queue isn't being flushed, until the browser
          // needs to do some other work, e.g. handle a timer. Therefore we can
          // "force" the microtask queue to be flushed by adding an empty timer.
          if (isIOS) setTimeout(noop);
        };
        isUsingMicroTask = true;
      } else if (
        !isIE &&
        typeof MutationObserver !== "undefined" &&
        (isNative(MutationObserver) ||
          // PhantomJS and iOS 7.x
          MutationObserver.toString() === "[object MutationObserverConstructor]")
      ) {
        // Use MutationObserver where native Promise is not available,
        // e.g. PhantomJS, iOS7, Android 4.4
        // (#6466 MutationObserver is unreliable in IE11)
        var counter_1 = 1;
        var observer = new MutationObserver(flushCallbacks);
        var textNode_1 = document.createTextNode(String(counter_1));
        observer.observe(textNode_1, {
          characterData: true,
        });
        timerFunc = function () {
          counter_1 = (counter_1 + 1) % 2;
          textNode_1.data = String(counter_1);
        };
        isUsingMicroTask = true;
      } else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
        // Fallback to setImmediate.
        // Technically it leverages the (macro) task queue,
        // but it is still a better choice than setTimeout.
        timerFunc = function () {
          setImmediate(flushCallbacks);
        };
      } else {
        // Fallback to setTimeout.
        timerFunc = function () {
          setTimeout(flushCallbacks, 0);
        };
      }
      /**
       * @internal
       */
      function nextTick(cb, ctx) {
        var _resolve;
        callbacks.push(function () {
          if (cb) {
            try {
              cb.call(ctx);
            } catch (e) {
              handleError(e, ctx, "nextTick");
            }
          } else if (_resolve) {
            _resolve(ctx);
          }
        });
        if (!pending) {
          pending = true;
          timerFunc();
        }
        // $flow-disable-line
        if (!cb && typeof Promise !== "undefined") {
          return new Promise(function (resolve) {
            _resolve = resolve;
          });
        }
      }

      function useCssModule(name) {
        if (name === void 0) {
          name = "$style";
        }
        /* istanbul ignore else */
        {
          if (!currentInstance) {
            false && false;
            return emptyObject;
          }
          var mod = currentInstance[name];
          if (!mod) {
            false && false;
            return emptyObject;
          }
          return mod;
        }
      }

      /**
       * Runtime helper for SFC's CSS variable injection feature.
       * @private
       */
      function useCssVars(getter) {
        if (!inBrowser && !false) return;
        var instance = currentInstance;
        if (!instance) {
          false && false;
          return;
        }
        watchPostEffect(function () {
          var el = instance.$el;
          var vars = getter(instance, instance._setupProxy);
          if (el && el.nodeType === 1) {
            var style = el.style;
            for (var key in vars) {
              style.setProperty("--".concat(key), vars[key]);
            }
          }
        });
      }

      /**
       * v3-compatible async component API.
       * @internal the type is manually declared in <root>/types/v3-define-async-component.d.ts
       * because it relies on existing manual types
       */
      function defineAsyncComponent(source) {
        if (isFunction(source)) {
          source = { loader: source };
        }
        var loader = source.loader,
          loadingComponent = source.loadingComponent,
          errorComponent = source.errorComponent,
          _a = source.delay,
          delay = _a === void 0 ? 200 : _a,
          timeout = source.timeout, // undefined = never times out
          _b = source.suspensible, // undefined = never times out
          suspensible = _b === void 0 ? false : _b, // in Vue 3 default is true
          userOnError = source.onError;
        if (false) {
        }
        var pendingRequest = null;
        var retries = 0;
        var retry = function () {
          retries++;
          pendingRequest = null;
          return load();
        };
        var load = function () {
          var thisRequest;
          return (
            pendingRequest ||
            (thisRequest = pendingRequest =
              loader()
                .catch(function (err) {
                  err = err instanceof Error ? err : new Error(String(err));
                  if (userOnError) {
                    return new Promise(function (resolve, reject) {
                      var userRetry = function () {
                        return resolve(retry());
                      };
                      var userFail = function () {
                        return reject(err);
                      };
                      userOnError(err, userRetry, userFail, retries + 1);
                    });
                  } else {
                    throw err;
                  }
                })
                .then(function (comp) {
                  if (thisRequest !== pendingRequest && pendingRequest) {
                    return pendingRequest;
                  }
                  if (false) {
                  }
                  // interop module default
                  if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
                    comp = comp.default;
                  }
                  if (false) {
                  }
                  return comp;
                }))
          );
        };
        return function () {
          var component = load();
          return {
            component: component,
            delay: delay,
            timeout: timeout,
            error: errorComponent,
            loading: loadingComponent,
          };
        };
      }

      function createLifeCycle(hookName) {
        return function (fn, target) {
          if (target === void 0) {
            target = currentInstance;
          }
          if (!target) {
            false && false;
            return;
          }
          return injectHook(target, hookName, fn);
        };
      }
      function formatName(name) {
        if (name === "beforeDestroy") {
          name = "beforeUnmount";
        } else if (name === "destroyed") {
          name = "unmounted";
        }
        return "on".concat(name[0].toUpperCase() + name.slice(1));
      }
      function injectHook(instance, hookName, fn) {
        var options = instance.$options;
        options[hookName] = mergeLifecycleHook(options[hookName], fn);
      }
      var onBeforeMount = createLifeCycle("beforeMount");
      var onMounted = createLifeCycle("mounted");
      var onBeforeUpdate = createLifeCycle("beforeUpdate");
      var onUpdated = createLifeCycle("updated");
      var onBeforeUnmount = createLifeCycle("beforeDestroy");
      var onUnmounted = createLifeCycle("destroyed");
      var onActivated = createLifeCycle("activated");
      var onDeactivated = createLifeCycle("deactivated");
      var onServerPrefetch = createLifeCycle("serverPrefetch");
      var onRenderTracked = createLifeCycle("renderTracked");
      var onRenderTriggered = createLifeCycle("renderTriggered");
      var injectErrorCapturedHook = createLifeCycle("errorCaptured");
      function onErrorCaptured(hook, target) {
        if (target === void 0) {
          target = currentInstance;
        }
        injectErrorCapturedHook(hook, target);
      }

      /**
       * Note: also update dist/vue.runtime.mjs when adding new exports to this file.
       */
      var version = "2.7.16";
      /**
       * @internal type is manually declared in <root>/types/v3-define-component.d.ts
       */
      function defineComponent(options) {
        return options;
      }

      var seenObjects = new _Set();
      /**
       * Recursively traverse an object to evoke all converted
       * getters, so that every nested property inside the object
       * is collected as a "deep" dependency.
       */
      function traverse(val) {
        _traverse(val, seenObjects);
        seenObjects.clear();
        return val;
      }
      function _traverse(val, seen) {
        var i, keys;
        var isA = isArray(val);
        if (
          (!isA && !isObject(val)) ||
          val.__v_skip /* ReactiveFlags.SKIP */ ||
          Object.isFrozen(val) ||
          val instanceof VNode
        ) {
          return;
        }
        if (val.__ob__) {
          var depId = val.__ob__.dep.id;
          if (seen.has(depId)) {
            return;
          }
          seen.add(depId);
        }
        if (isA) {
          i = val.length;
          while (i--) _traverse(val[i], seen);
        } else if (isRef(val)) {
          _traverse(val.value, seen);
        } else {
          keys = Object.keys(val);
          i = keys.length;
          while (i--) _traverse(val[keys[i]], seen);
        }
      }

      var uid$1 = 0;
      /**
       * A watcher parses an expression, collects dependencies,
       * and fires callback when the expression value changes.
       * This is used for both the $watch() api and directives.
       * @internal
       */
      var Watcher = /** @class */ (function () {
        function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
          recordEffectScope(
            this,
            // if the active effect scope is manually created (not a component scope),
            // prioritize it
            activeEffectScope && !activeEffectScope._vm
              ? activeEffectScope
              : vm
                ? vm._scope
                : undefined,
          );
          if ((this.vm = vm) && isRenderWatcher) {
            vm._watcher = this;
          }
          // options
          if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
            if (false) {
            }
          } else {
            this.deep = this.user = this.lazy = this.sync = false;
          }
          this.cb = cb;
          this.id = ++uid$1; // uid for batching
          this.active = true;
          this.post = false;
          this.dirty = this.lazy; // for lazy watchers
          this.deps = [];
          this.newDeps = [];
          this.depIds = new _Set();
          this.newDepIds = new _Set();
          this.expression = false ? undefined : "";
          // parse expression for getter
          if (isFunction(expOrFn)) {
            this.getter = expOrFn;
          } else {
            this.getter = parsePath(expOrFn);
            if (!this.getter) {
              this.getter = noop;
              false && false;
            }
          }
          this.value = this.lazy ? undefined : this.get();
        }
        /**
         * Evaluate the getter, and re-collect dependencies.
         */
        Watcher.prototype.get = function () {
          pushTarget(this);
          var value;
          var vm = this.vm;
          try {
            value = this.getter.call(vm, vm);
          } catch (e) {
            if (this.user) {
              handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
            } else {
              throw e;
            }
          } finally {
            // "touch" every property so they are all tracked as
            // dependencies for deep watching
            if (this.deep) {
              traverse(value);
            }
            popTarget();
            this.cleanupDeps();
          }
          return value;
        };
        /**
         * Add a dependency to this directive.
         */
        Watcher.prototype.addDep = function (dep) {
          var id = dep.id;
          if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
              dep.addSub(this);
            }
          }
        };
        /**
         * Clean up for dependency collection.
         */
        Watcher.prototype.cleanupDeps = function () {
          var i = this.deps.length;
          while (i--) {
            var dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
              dep.removeSub(this);
            }
          }
          var tmp = this.depIds;
          this.depIds = this.newDepIds;
          this.newDepIds = tmp;
          this.newDepIds.clear();
          tmp = this.deps;
          this.deps = this.newDeps;
          this.newDeps = tmp;
          this.newDeps.length = 0;
        };
        /**
         * Subscriber interface.
         * Will be called when a dependency changes.
         */
        Watcher.prototype.update = function () {
          /* istanbul ignore else */
          if (this.lazy) {
            this.dirty = true;
          } else if (this.sync) {
            this.run();
          } else {
            queueWatcher(this);
          }
        };
        /**
         * Scheduler job interface.
         * Will be called by the scheduler.
         */
        Watcher.prototype.run = function () {
          if (this.active) {
            var value = this.get();
            if (
              value !== this.value ||
              // Deep watchers and watchers on Object/Arrays should fire even
              // when the value is the same, because the value may
              // have mutated.
              isObject(value) ||
              this.deep
            ) {
              // set new value
              var oldValue = this.value;
              this.value = value;
              if (this.user) {
                var info = 'callback for watcher "'.concat(this.expression, '"');
                invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
              } else {
                this.cb.call(this.vm, value, oldValue);
              }
            }
          }
        };
        /**
         * Evaluate the value of the watcher.
         * This only gets called for lazy watchers.
         */
        Watcher.prototype.evaluate = function () {
          this.value = this.get();
          this.dirty = false;
        };
        /**
         * Depend on all deps collected by this watcher.
         */
        Watcher.prototype.depend = function () {
          var i = this.deps.length;
          while (i--) {
            this.deps[i].depend();
          }
        };
        /**
         * Remove self from all dependencies' subscriber list.
         */
        Watcher.prototype.teardown = function () {
          if (this.vm && !this.vm._isBeingDestroyed) {
            remove$2(this.vm._scope.effects, this);
          }
          if (this.active) {
            var i = this.deps.length;
            while (i--) {
              this.deps[i].removeSub(this);
            }
            this.active = false;
            if (this.onStop) {
              this.onStop();
            }
          }
        };
        return Watcher;
      })();

      var mark;
      var measure;
      if (false) {
        var perf_1;
      }

      function initEvents(vm) {
        vm._events = Object.create(null);
        vm._hasHookEvent = false;
        // init parent attached events
        var listeners = vm.$options._parentListeners;
        if (listeners) {
          updateComponentListeners(vm, listeners);
        }
      }
      var target$1;
      function add$1(event, fn) {
        target$1.$on(event, fn);
      }
      function remove$1(event, fn) {
        target$1.$off(event, fn);
      }
      function createOnceHandler$1(event, fn) {
        var _target = target$1;
        return function onceHandler() {
          var res = fn.apply(null, arguments);
          if (res !== null) {
            _target.$off(event, onceHandler);
          }
        };
      }
      function updateComponentListeners(vm, listeners, oldListeners) {
        target$1 = vm;
        updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
        target$1 = undefined;
      }
      function eventsMixin(Vue) {
        var hookRE = /^hook:/;
        Vue.prototype.$on = function (event, fn) {
          var vm = this;
          if (isArray(event)) {
            for (var i = 0, l = event.length; i < l; i++) {
              vm.$on(event[i], fn);
            }
          } else {
            (vm._events[event] || (vm._events[event] = [])).push(fn);
            // optimize hook:event cost by using a boolean flag marked at registration
            // instead of a hash lookup
            if (hookRE.test(event)) {
              vm._hasHookEvent = true;
            }
          }
          return vm;
        };
        Vue.prototype.$once = function (event, fn) {
          var vm = this;
          function on() {
            vm.$off(event, on);
            fn.apply(vm, arguments);
          }
          on.fn = fn;
          vm.$on(event, on);
          return vm;
        };
        Vue.prototype.$off = function (event, fn) {
          var vm = this;
          // all
          if (!arguments.length) {
            vm._events = Object.create(null);
            return vm;
          }
          // array of events
          if (isArray(event)) {
            for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
              vm.$off(event[i_1], fn);
            }
            return vm;
          }
          // specific event
          var cbs = vm._events[event];
          if (!cbs) {
            return vm;
          }
          if (!fn) {
            vm._events[event] = null;
            return vm;
          }
          // specific handler
          var cb;
          var i = cbs.length;
          while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
              cbs.splice(i, 1);
              break;
            }
          }
          return vm;
        };
        Vue.prototype.$emit = function (event) {
          var vm = this;
          if (false) {
            var lowerCaseEvent;
          }
          var cbs = vm._events[event];
          if (cbs) {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs;
            var args = toArray(arguments, 1);
            var info = 'event handler for "'.concat(event, '"');
            for (var i = 0, l = cbs.length; i < l; i++) {
              invokeWithErrorHandling(cbs[i], vm, args, vm, info);
            }
          }
          return vm;
        };
      }

      var activeInstance = null;
      var isUpdatingChildComponent = false;
      function setActiveInstance(vm) {
        var prevActiveInstance = activeInstance;
        activeInstance = vm;
        return function () {
          activeInstance = prevActiveInstance;
        };
      }
      function initLifecycle(vm) {
        var options = vm.$options;
        // locate first non-abstract parent
        var parent = options.parent;
        if (parent && !options.abstract) {
          while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent;
          }
          parent.$children.push(vm);
        }
        vm.$parent = parent;
        vm.$root = parent ? parent.$root : vm;
        vm.$children = [];
        vm.$refs = {};
        vm._provided = parent ? parent._provided : Object.create(null);
        vm._watcher = null;
        vm._inactive = null;
        vm._directInactive = false;
        vm._isMounted = false;
        vm._isDestroyed = false;
        vm._isBeingDestroyed = false;
      }
      function lifecycleMixin(Vue) {
        Vue.prototype._update = function (vnode, hydrating) {
          var vm = this;
          var prevEl = vm.$el;
          var prevVnode = vm._vnode;
          var restoreActiveInstance = setActiveInstance(vm);
          vm._vnode = vnode;
          // Vue.prototype.__patch__ is injected in entry points
          // based on the rendering backend used.
          if (!prevVnode) {
            // initial render
            vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
          } else {
            // updates
            vm.$el = vm.__patch__(prevVnode, vnode);
          }
          restoreActiveInstance();
          // update __vue__ reference
          if (prevEl) {
            prevEl.__vue__ = null;
          }
          if (vm.$el) {
            vm.$el.__vue__ = vm;
          }
          // if parent is an HOC, update its $el as well
          var wrapper = vm;
          while (
            wrapper &&
            wrapper.$vnode &&
            wrapper.$parent &&
            wrapper.$vnode === wrapper.$parent._vnode
          ) {
            wrapper.$parent.$el = wrapper.$el;
            wrapper = wrapper.$parent;
          }
          // updated hook is called by the scheduler to ensure that children are
          // updated in a parent's updated hook.
        };
        Vue.prototype.$forceUpdate = function () {
          var vm = this;
          if (vm._watcher) {
            vm._watcher.update();
          }
        };
        Vue.prototype.$destroy = function () {
          var vm = this;
          if (vm._isBeingDestroyed) {
            return;
          }
          callHook$1(vm, "beforeDestroy");
          vm._isBeingDestroyed = true;
          // remove self from parent
          var parent = vm.$parent;
          if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
            remove$2(parent.$children, vm);
          }
          // teardown scope. this includes both the render watcher and other
          // watchers created
          vm._scope.stop();
          // remove reference from data ob
          // frozen object may not have observer.
          if (vm._data.__ob__) {
            vm._data.__ob__.vmCount--;
          }
          // call the last hook...
          vm._isDestroyed = true;
          // invoke destroy hooks on current rendered tree
          vm.__patch__(vm._vnode, null);
          // fire destroyed hook
          callHook$1(vm, "destroyed");
          // turn off all instance listeners.
          vm.$off();
          // remove __vue__ reference
          if (vm.$el) {
            vm.$el.__vue__ = null;
          }
          // release circular reference (#6759)
          if (vm.$vnode) {
            vm.$vnode.parent = null;
          }
        };
      }
      function mountComponent(vm, el, hydrating) {
        vm.$el = el;
        if (!vm.$options.render) {
          // @ts-expect-error invalid type
          vm.$options.render = createEmptyVNode;
          if (false) {
          }
        }
        callHook$1(vm, "beforeMount");
        var updateComponent;
        /* istanbul ignore if */
        if (false) {
        } else {
          updateComponent = function () {
            vm._update(vm._render(), hydrating);
          };
        }
        var watcherOptions = {
          before: function () {
            if (vm._isMounted && !vm._isDestroyed) {
              callHook$1(vm, "beforeUpdate");
            }
          },
        };
        if (false) {
        }
        // we set this to vm._watcher inside the watcher's constructor
        // since the watcher's initial patch may call $forceUpdate (e.g. inside child
        // component's mounted hook), which relies on vm._watcher being already defined
        new Watcher(vm, updateComponent, noop, watcherOptions, true /* isRenderWatcher */);
        hydrating = false;
        // flush buffer for flush: "pre" watchers queued in setup()
        var preWatchers = vm._preWatchers;
        if (preWatchers) {
          for (var i = 0; i < preWatchers.length; i++) {
            preWatchers[i].run();
          }
        }
        // manually mounted instance, call mounted on self
        // mounted is called for render-created child components in its inserted hook
        if (vm.$vnode == null) {
          vm._isMounted = true;
          callHook$1(vm, "mounted");
        }
        return vm;
      }
      function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
        if (false) {
        }
        // determine whether component has slot children
        // we need to do this before overwriting $options._renderChildren.
        // check if there are dynamic scopedSlots (hand-written or compiled but with
        // dynamic slot names). Static scoped slots compiled from template has the
        // "$stable" marker.
        var newScopedSlots = parentVnode.data.scopedSlots;
        var oldScopedSlots = vm.$scopedSlots;
        var hasDynamicScopedSlot = !!(
          (newScopedSlots && !newScopedSlots.$stable) ||
          (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
          (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
          (!newScopedSlots && vm.$scopedSlots.$key)
        );
        // Any static slot children from the parent may have changed during parent's
        // update. Dynamic scoped slots may also have changed. In such cases, a forced
        // update is necessary to ensure correctness.
        var needsForceUpdate = !!(
          renderChildren || // has new static slots
          vm.$options._renderChildren || // has old static slots
          hasDynamicScopedSlot
        );
        var prevVNode = vm.$vnode;
        vm.$options._parentVnode = parentVnode;
        vm.$vnode = parentVnode; // update vm's placeholder node without re-render
        if (vm._vnode) {
          // update child tree's parent
          vm._vnode.parent = parentVnode;
        }
        vm.$options._renderChildren = renderChildren;
        // update $attrs and $listeners hash
        // these are also reactive so they may trigger child update if the child
        // used them during render
        var attrs = parentVnode.data.attrs || emptyObject;
        if (vm._attrsProxy) {
          // force update if attrs are accessed and has changed since it may be
          // passed to a child component.
          if (
            syncSetupProxy(
              vm._attrsProxy,
              attrs,
              (prevVNode.data && prevVNode.data.attrs) || emptyObject,
              vm,
              "$attrs",
            )
          ) {
            needsForceUpdate = true;
          }
        }
        vm.$attrs = attrs;
        // update listeners
        listeners = listeners || emptyObject;
        var prevListeners = vm.$options._parentListeners;
        if (vm._listenersProxy) {
          syncSetupProxy(
            vm._listenersProxy,
            listeners,
            prevListeners || emptyObject,
            vm,
            "$listeners",
          );
        }
        vm.$listeners = vm.$options._parentListeners = listeners;
        updateComponentListeners(vm, listeners, prevListeners);
        // update props
        if (propsData && vm.$options.props) {
          toggleObserving(false);
          var props = vm._props;
          var propKeys = vm.$options._propKeys || [];
          for (var i = 0; i < propKeys.length; i++) {
            var key = propKeys[i];
            var propOptions = vm.$options.props; // wtf flow?
            props[key] = validateProp(key, propOptions, propsData, vm);
          }
          toggleObserving(true);
          // keep a copy of raw propsData
          vm.$options.propsData = propsData;
        }
        // resolve slots + force update if has children
        if (needsForceUpdate) {
          vm.$slots = resolveSlots(renderChildren, parentVnode.context);
          vm.$forceUpdate();
        }
        if (false) {
        }
      }
      function isInInactiveTree(vm) {
        while (vm && (vm = vm.$parent)) {
          if (vm._inactive) return true;
        }
        return false;
      }
      function activateChildComponent(vm, direct) {
        if (direct) {
          vm._directInactive = false;
          if (isInInactiveTree(vm)) {
            return;
          }
        } else if (vm._directInactive) {
          return;
        }
        if (vm._inactive || vm._inactive === null) {
          vm._inactive = false;
          for (var i = 0; i < vm.$children.length; i++) {
            activateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, "activated");
        }
      }
      function deactivateChildComponent(vm, direct) {
        if (direct) {
          vm._directInactive = true;
          if (isInInactiveTree(vm)) {
            return;
          }
        }
        if (!vm._inactive) {
          vm._inactive = true;
          for (var i = 0; i < vm.$children.length; i++) {
            deactivateChildComponent(vm.$children[i]);
          }
          callHook$1(vm, "deactivated");
        }
      }
      function callHook$1(vm, hook, args, setContext) {
        if (setContext === void 0) {
          setContext = true;
        }
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var prevInst = currentInstance;
        var prevScope = getCurrentScope();
        setContext && setCurrentInstance(vm);
        var handlers = vm.$options[hook];
        var info = "".concat(hook, " hook");
        if (handlers) {
          for (var i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
          }
        }
        if (vm._hasHookEvent) {
          vm.$emit("hook:" + hook);
        }
        if (setContext) {
          setCurrentInstance(prevInst);
          prevScope && prevScope.on();
        }
        popTarget();
      }

      var MAX_UPDATE_COUNT = 100;
      var queue = [];
      var activatedChildren = [];
      var has = {};
      var circular = {};
      var waiting = false;
      var flushing = false;
      var index = 0;
      /**
       * Reset the scheduler's state.
       */
      function resetSchedulerState() {
        index = queue.length = activatedChildren.length = 0;
        has = {};
        if (false) {
        }
        waiting = flushing = false;
      }
      // Async edge case #6566 requires saving the timestamp when event listeners are
      // attached. However, calling performance.now() has a perf overhead especially
      // if the page has thousands of event listeners. Instead, we take a timestamp
      // every time the scheduler flushes and use that for all event listeners
      // attached during that flush.
      var currentFlushTimestamp = 0;
      // Async edge case fix requires storing an event listener's attach timestamp.
      var getNow = Date.now;
      // Determine what event timestamp the browser is using. Annoyingly, the
      // timestamp can either be hi-res (relative to page load) or low-res
      // (relative to UNIX epoch), so in order to compare time we have to use the
      // same timestamp type when saving the flush timestamp.
      // All IE versions use low-res event timestamps, and have problematic clock
      // implementations (#9632)
      if (inBrowser && !isIE) {
        var performance_1 = window.performance;
        if (
          performance_1 &&
          typeof performance_1.now === "function" &&
          getNow() > document.createEvent("Event").timeStamp
        ) {
          // if the event timestamp, although evaluated AFTER the Date.now(), is
          // smaller than it, it means the event is using a hi-res timestamp,
          // and we need to use the hi-res version for event listener timestamps as
          // well.
          getNow = function () {
            return performance_1.now();
          };
        }
      }
      var sortCompareFn = function (a, b) {
        if (a.post) {
          if (!b.post) return 1;
        } else if (b.post) {
          return -1;
        }
        return a.id - b.id;
      };
      /**
       * Flush both queues and run the watchers.
       */
      function flushSchedulerQueue() {
        currentFlushTimestamp = getNow();
        flushing = true;
        var watcher, id;
        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child)
        // 2. A component's user watchers are run before its render watcher (because
        //    user watchers are created before the render watcher)
        // 3. If a component is destroyed during a parent component's watcher run,
        //    its watchers can be skipped.
        queue.sort(sortCompareFn);
        // do not cache length because more watchers might be pushed
        // as we run existing watchers
        for (index = 0; index < queue.length; index++) {
          watcher = queue[index];
          if (watcher.before) {
            watcher.before();
          }
          id = watcher.id;
          has[id] = null;
          watcher.run();
          // in dev build, check and stop circular updates.
          if (false) {
          }
        }
        // keep copies of post queues before resetting state
        var activatedQueue = activatedChildren.slice();
        var updatedQueue = queue.slice();
        resetSchedulerState();
        // call component updated and activated hooks
        callActivatedHooks(activatedQueue);
        callUpdatedHooks(updatedQueue);
        cleanupDeps();
        // devtool hook
        /* istanbul ignore if */
        if (devtools && config.devtools) {
          devtools.emit("flush");
        }
      }
      function callUpdatedHooks(queue) {
        var i = queue.length;
        while (i--) {
          var watcher = queue[i];
          var vm = watcher.vm;
          if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
            callHook$1(vm, "updated");
          }
        }
      }
      /**
       * Queue a kept-alive component that was activated during patch.
       * The queue will be processed after the entire tree has been patched.
       */
      function queueActivatedComponent(vm) {
        // setting _inactive to false here so that a render function can
        // rely on checking whether it's in an inactive tree (e.g. router-view)
        vm._inactive = false;
        activatedChildren.push(vm);
      }
      function callActivatedHooks(queue) {
        for (var i = 0; i < queue.length; i++) {
          queue[i]._inactive = true;
          activateChildComponent(queue[i], true /* true */);
        }
      }
      /**
       * Push a watcher into the watcher queue.
       * Jobs with duplicate IDs will be skipped unless it's
       * pushed when the queue is being flushed.
       */
      function queueWatcher(watcher) {
        var id = watcher.id;
        if (has[id] != null) {
          return;
        }
        if (watcher === Dep.target && watcher.noRecurse) {
          return;
        }
        has[id] = true;
        if (!flushing) {
          queue.push(watcher);
        } else {
          // if already flushing, splice the watcher based on its id
          // if already past its id, it will be run next immediately.
          var i = queue.length - 1;
          while (i > index && queue[i].id > watcher.id) {
            i--;
          }
          queue.splice(i + 1, 0, watcher);
        }
        // queue the flush
        if (!waiting) {
          waiting = true;
          if (false) {
          }
          nextTick(flushSchedulerQueue);
        }
      }

      function initProvide(vm) {
        var provideOption = vm.$options.provide;
        if (provideOption) {
          var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
          if (!isObject(provided)) {
            return;
          }
          var source = resolveProvided(vm);
          // IE9 doesn't support Object.getOwnPropertyDescriptors so we have to
          // iterate the keys ourselves.
          var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
          }
        }
      }
      function initInjections(vm) {
        var result = resolveInject(vm.$options.inject, vm);
        if (result) {
          toggleObserving(false);
          Object.keys(result).forEach(function (key) {
            /* istanbul ignore else */
            if (false) {
            } else {
              defineReactive(vm, key, result[key]);
            }
          });
          toggleObserving(true);
        }
      }
      function resolveInject(inject, vm) {
        if (inject) {
          // inject is :any because flow is not smart enough to figure out cached
          var result = Object.create(null);
          var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            // #6574 in case the inject object is observed...
            if (key === "__ob__") continue;
            var provideKey = inject[key].from;
            if (provideKey in vm._provided) {
              result[key] = vm._provided[provideKey];
            } else if ("default" in inject[key]) {
              var provideDefault = inject[key].default;
              result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
            } else if (false) {
            }
          }
          return result;
        }
      }

      function FunctionalRenderContext(data, props, children, parent, Ctor) {
        var _this = this;
        var options = Ctor.options;
        // ensure the createElement function in functional components
        // gets a unique context - this is necessary for correct named slot check
        var contextVm;
        if (hasOwn(parent, "_uid")) {
          contextVm = Object.create(parent);
          contextVm._original = parent;
        } else {
          // the context vm passed in is a functional context as well.
          // in this case we want to make sure we are able to get a hold to the
          // real context instance.
          contextVm = parent;
          // @ts-ignore
          parent = parent._original;
        }
        var isCompiled = isTrue(options._compiled);
        var needNormalization = !isCompiled;
        this.data = data;
        this.props = props;
        this.children = children;
        this.parent = parent;
        this.listeners = data.on || emptyObject;
        this.injections = resolveInject(options.inject, parent);
        this.slots = function () {
          if (!_this.$slots) {
            normalizeScopedSlots(
              parent,
              data.scopedSlots,
              (_this.$slots = resolveSlots(children, parent)),
            );
          }
          return _this.$slots;
        };
        Object.defineProperty(this, "scopedSlots", {
          enumerable: true,
          get: function () {
            return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
          },
        });
        // support for compiled functional template
        if (isCompiled) {
          // exposing $options for renderStatic()
          this.$options = options;
          // pre-resolve slots for renderSlot()
          this.$slots = this.slots();
          this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
        }
        if (options._scopeId) {
          this._c = function (a, b, c, d) {
            var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
            if (vnode && !isArray(vnode)) {
              vnode.fnScopeId = options._scopeId;
              vnode.fnContext = parent;
            }
            return vnode;
          };
        } else {
          this._c = function (a, b, c, d) {
            return createElement$1(contextVm, a, b, c, d, needNormalization);
          };
        }
      }
      installRenderHelpers(FunctionalRenderContext.prototype);
      function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
        var options = Ctor.options;
        var props = {};
        var propOptions = options.props;
        if (isDef(propOptions)) {
          for (var key in propOptions) {
            props[key] = validateProp(key, propOptions, propsData || emptyObject);
          }
        } else {
          if (isDef(data.attrs)) mergeProps(props, data.attrs);
          if (isDef(data.props)) mergeProps(props, data.props);
        }
        var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
        var vnode = options.render.call(null, renderContext._c, renderContext);
        if (vnode instanceof VNode) {
          return cloneAndMarkFunctionalResult(
            vnode,
            data,
            renderContext.parent,
            options,
            renderContext,
          );
        } else if (isArray(vnode)) {
          var vnodes = normalizeChildren(vnode) || [];
          var res = new Array(vnodes.length);
          for (var i = 0; i < vnodes.length; i++) {
            res[i] = cloneAndMarkFunctionalResult(
              vnodes[i],
              data,
              renderContext.parent,
              options,
              renderContext,
            );
          }
          return res;
        }
      }
      function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
        // #7817 clone node before setting fnContext, otherwise if the node is reused
        // (e.g. it was from a cached normal slot) the fnContext causes named slots
        // that should not be matched to match.
        var clone = cloneVNode(vnode);
        clone.fnContext = contextVm;
        clone.fnOptions = options;
        if (false) {
        }
        if (data.slot) {
          (clone.data || (clone.data = {})).slot = data.slot;
        }
        return clone;
      }
      function mergeProps(to, from) {
        for (var key in from) {
          to[camelize(key)] = from[key];
        }
      }

      function getComponentName(options) {
        return options.name || options.__name || options._componentTag;
      }
      // inline hooks to be invoked on component VNodes during patch
      var componentVNodeHooks = {
        init: function (vnode, hydrating) {
          if (
            vnode.componentInstance &&
            !vnode.componentInstance._isDestroyed &&
            vnode.data.keepAlive
          ) {
            // kept-alive components, treat as a patch
            var mountedNode = vnode; // work around flow
            componentVNodeHooks.prepatch(mountedNode, mountedNode);
          } else {
            var child = (vnode.componentInstance = createComponentInstanceForVnode(
              vnode,
              activeInstance,
            ));
            child.$mount(hydrating ? vnode.elm : undefined, hydrating);
          }
        },
        prepatch: function (oldVnode, vnode) {
          var options = vnode.componentOptions;
          var child = (vnode.componentInstance = oldVnode.componentInstance);
          updateChildComponent(
            child,
            options.propsData, // updated props
            options.listeners, // updated listeners
            vnode, // new parent vnode
            options.children, // new children
          );
        },
        insert: function (vnode) {
          var context = vnode.context,
            componentInstance = vnode.componentInstance;
          if (!componentInstance._isMounted) {
            componentInstance._isMounted = true;
            callHook$1(componentInstance, "mounted");
          }
          if (vnode.data.keepAlive) {
            if (context._isMounted) {
              // vue-router#1212
              // During updates, a kept-alive component's child components may
              // change, so directly walking the tree here may call activated hooks
              // on incorrect children. Instead we push them into a queue which will
              // be processed after the whole patch process ended.
              queueActivatedComponent(componentInstance);
            } else {
              activateChildComponent(componentInstance, true /* direct */);
            }
          }
        },
        destroy: function (vnode) {
          var componentInstance = vnode.componentInstance;
          if (!componentInstance._isDestroyed) {
            if (!vnode.data.keepAlive) {
              componentInstance.$destroy();
            } else {
              deactivateChildComponent(componentInstance, true /* direct */);
            }
          }
        },
      };
      var hooksToMerge = Object.keys(componentVNodeHooks);
      function createComponent(Ctor, data, context, children, tag) {
        if (isUndef(Ctor)) {
          return;
        }
        var baseCtor = context.$options._base;
        // plain options object: turn it into a constructor
        if (isObject(Ctor)) {
          Ctor = baseCtor.extend(Ctor);
        }
        // if at this stage it's not a constructor or an async component factory,
        // reject.
        if (typeof Ctor !== "function") {
          if (false) {
          }
          return;
        }
        // async component
        var asyncFactory;
        // @ts-expect-error
        if (isUndef(Ctor.cid)) {
          asyncFactory = Ctor;
          Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
          if (Ctor === undefined) {
            // return a placeholder node for async component, which is rendered
            // as a comment node but preserves all the raw information for the node.
            // the information will be used for async server-rendering and hydration.
            return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
          }
        }
        data = data || {};
        // resolve constructor options in case global mixins are applied after
        // component constructor creation
        resolveConstructorOptions(Ctor);
        // transform component v-model data into props & events
        if (isDef(data.model)) {
          // @ts-expect-error
          transformModel(Ctor.options, data);
        }
        // extract props
        // @ts-expect-error
        var propsData = extractPropsFromVNodeData(data, Ctor, tag);
        // functional component
        // @ts-expect-error
        if (isTrue(Ctor.options.functional)) {
          return createFunctionalComponent(Ctor, propsData, data, context, children);
        }
        // extract listeners, since these needs to be treated as
        // child component listeners instead of DOM listeners
        var listeners = data.on;
        // replace with listeners with .native modifier
        // so it gets processed during parent component patch.
        data.on = data.nativeOn;
        // @ts-expect-error
        if (isTrue(Ctor.options.abstract)) {
          // abstract components do not keep anything
          // other than props & listeners & slot
          // work around flow
          var slot = data.slot;
          data = {};
          if (slot) {
            data.slot = slot;
          }
        }
        // install component management hooks onto the placeholder node
        installComponentHooks(data);
        // return a placeholder vnode
        // @ts-expect-error
        var name = getComponentName(Ctor.options) || tag;
        var vnode = new VNode(
          // @ts-expect-error
          "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
          data,
          undefined,
          undefined,
          undefined,
          context,
          // @ts-expect-error
          { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
          asyncFactory,
        );
        return vnode;
      }
      function createComponentInstanceForVnode(
        // we know it's MountedComponentVNode but flow doesn't
        vnode,
        // activeInstance in lifecycle state
        parent,
      ) {
        var options = {
          _isComponent: true,
          _parentVnode: vnode,
          parent: parent,
        };
        // check inline-template render functions
        var inlineTemplate = vnode.data.inlineTemplate;
        if (isDef(inlineTemplate)) {
          options.render = inlineTemplate.render;
          options.staticRenderFns = inlineTemplate.staticRenderFns;
        }
        return new vnode.componentOptions.Ctor(options);
      }
      function installComponentHooks(data) {
        var hooks = data.hook || (data.hook = {});
        for (var i = 0; i < hooksToMerge.length; i++) {
          var key = hooksToMerge[i];
          var existing = hooks[key];
          var toMerge = componentVNodeHooks[key];
          // @ts-expect-error
          if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
          }
        }
      }
      function mergeHook(f1, f2) {
        var merged = function (a, b) {
          // flow complains about extra args which is why we use any
          f1(a, b);
          f2(a, b);
        };
        merged._merged = true;
        return merged;
      }
      // transform component v-model info (value and callback) into
      // prop and event handler respectively.
      function transformModel(options, data) {
        var prop = (options.model && options.model.prop) || "value";
        var event = (options.model && options.model.event) || "input";
        (data.attrs || (data.attrs = {}))[prop] = data.model.value;
        var on = data.on || (data.on = {});
        var existing = on[event];
        var callback = data.model.callback;
        if (isDef(existing)) {
          if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
            on[event] = [callback].concat(existing);
          }
        } else {
          on[event] = callback;
        }
      }

      var warn = noop;
      var tip = noop;
      var generateComponentTrace; // work around flow check
      var formatComponentName;
      if (false) {
        var repeat_1, classify_1, classifyRE_1, hasConsole_1;
      }

      /**
       * Option overwriting strategies are functions that handle
       * how to merge a parent option value and a child option
       * value into the final value.
       */
      var strats = config.optionMergeStrategies;
      /**
       * Options with restrictions
       */
      if (false) {
      }
      /**
       * Helper that recursively merges two data objects together.
       */
      function mergeData(to, from, recursive) {
        if (recursive === void 0) {
          recursive = true;
        }
        if (!from) return to;
        var key, toVal, fromVal;
        var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          // in case the object is already observed...
          if (key === "__ob__") continue;
          toVal = to[key];
          fromVal = from[key];
          if (!recursive || !hasOwn(to, key)) {
            set(to, key, fromVal);
          } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
            mergeData(toVal, fromVal);
          }
        }
        return to;
      }
      /**
       * Data
       */
      function mergeDataOrFn(parentVal, childVal, vm) {
        if (!vm) {
          // in a Vue.extend merge, both should be functions
          if (!childVal) {
            return parentVal;
          }
          if (!parentVal) {
            return childVal;
          }
          // when parentVal & childVal are both present,
          // we need to return a function that returns the
          // merged result of both functions... no need to
          // check if parentVal is a function here because
          // it has to be a function to pass previous merges.
          return function mergedDataFn() {
            return mergeData(
              isFunction(childVal) ? childVal.call(this, this) : childVal,
              isFunction(parentVal) ? parentVal.call(this, this) : parentVal,
            );
          };
        } else {
          return function mergedInstanceDataFn() {
            // instance merge
            var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
            var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
            if (instanceData) {
              return mergeData(instanceData, defaultData);
            } else {
              return defaultData;
            }
          };
        }
      }
      strats.data = function (parentVal, childVal, vm) {
        if (!vm) {
          if (childVal && typeof childVal !== "function") {
            false && false;
            return parentVal;
          }
          return mergeDataOrFn(parentVal, childVal);
        }
        return mergeDataOrFn(parentVal, childVal, vm);
      };
      /**
       * Hooks and props are merged as arrays.
       */
      function mergeLifecycleHook(parentVal, childVal) {
        var res = childVal
          ? parentVal
            ? parentVal.concat(childVal)
            : isArray(childVal)
              ? childVal
              : [childVal]
          : parentVal;
        return res ? dedupeHooks(res) : res;
      }
      function dedupeHooks(hooks) {
        var res = [];
        for (var i = 0; i < hooks.length; i++) {
          if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
          }
        }
        return res;
      }
      LIFECYCLE_HOOKS.forEach(function (hook) {
        strats[hook] = mergeLifecycleHook;
      });
      /**
       * Assets
       *
       * When a vm is present (instance creation), we need to do
       * a three-way merge between constructor options, instance
       * options and parent options.
       */
      function mergeAssets(parentVal, childVal, vm, key) {
        var res = Object.create(parentVal || null);
        if (childVal) {
          false && false;
          return extend(res, childVal);
        } else {
          return res;
        }
      }
      ASSET_TYPES.forEach(function (type) {
        strats[type + "s"] = mergeAssets;
      });
      /**
       * Watchers.
       *
       * Watchers hashes should not overwrite one
       * another, so we merge them as arrays.
       */
      strats.watch = function (parentVal, childVal, vm, key) {
        // work around Firefox's Object.prototype.watch...
        //@ts-expect-error work around
        if (parentVal === nativeWatch) parentVal = undefined;
        //@ts-expect-error work around
        if (childVal === nativeWatch) childVal = undefined;
        /* istanbul ignore if */
        if (!childVal) return Object.create(parentVal || null);
        if (false) {
        }
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key_1 in childVal) {
          var parent_1 = ret[key_1];
          var child = childVal[key_1];
          if (parent_1 && !isArray(parent_1)) {
            parent_1 = [parent_1];
          }
          ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
        }
        return ret;
      };
      /**
       * Other object hashes.
       */
      strats.props =
        strats.methods =
        strats.inject =
        strats.computed =
          function (parentVal, childVal, vm, key) {
            if (childVal && "production" !== "production") {
              assertObjectType(key, childVal, vm);
            }
            if (!parentVal) return childVal;
            var ret = Object.create(null);
            extend(ret, parentVal);
            if (childVal) extend(ret, childVal);
            return ret;
          };
      strats.provide = function (parentVal, childVal) {
        if (!parentVal) return childVal;
        return function () {
          var ret = Object.create(null);
          mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
          if (childVal) {
            mergeData(
              ret,
              isFunction(childVal) ? childVal.call(this) : childVal,
              false, // non-recursive
            );
          }
          return ret;
        };
      };
      /**
       * Default strategy.
       */
      var defaultStrat = function (parentVal, childVal) {
        return childVal === undefined ? parentVal : childVal;
      };
      /**
       * Validate component names
       */
      function checkComponents(options) {
        for (var key in options.components) {
          validateComponentName(key);
        }
      }
      function validateComponentName(name) {
        if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
          warn(
            'Invalid component name: "' +
              name +
              '". Component names ' +
              "should conform to valid custom element name in html5 specification.",
          );
        }
        if (isBuiltInTag(name) || config.isReservedTag(name)) {
          warn("Do not use built-in or reserved HTML elements as component " + "id: " + name);
        }
      }
      /**
       * Ensure all props option syntax are normalized into the
       * Object-based format.
       */
      function normalizeProps(options, vm) {
        var props = options.props;
        if (!props) return;
        var res = {};
        var i, val, name;
        if (isArray(props)) {
          i = props.length;
          while (i--) {
            val = props[i];
            if (typeof val === "string") {
              name = camelize(val);
              res[name] = { type: null };
            } else if (false) {
            }
          }
        } else if (isPlainObject(props)) {
          for (var key in props) {
            val = props[key];
            name = camelize(key);
            res[name] = isPlainObject(val) ? val : { type: val };
          }
        } else if (false) {
        }
        options.props = res;
      }
      /**
       * Normalize all injections into Object-based format
       */
      function normalizeInject(options, vm) {
        var inject = options.inject;
        if (!inject) return;
        var normalized = (options.inject = {});
        if (isArray(inject)) {
          for (var i = 0; i < inject.length; i++) {
            normalized[inject[i]] = { from: inject[i] };
          }
        } else if (isPlainObject(inject)) {
          for (var key in inject) {
            var val = inject[key];
            normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
          }
        } else if (false) {
        }
      }
      /**
       * Normalize raw function directives into object format.
       */
      function normalizeDirectives$1(options) {
        var dirs = options.directives;
        if (dirs) {
          for (var key in dirs) {
            var def = dirs[key];
            if (isFunction(def)) {
              dirs[key] = { bind: def, update: def };
            }
          }
        }
      }
      function assertObjectType(name, value, vm) {
        if (!isPlainObject(value)) {
          warn(
            'Invalid value for option "'.concat(name, '": expected an Object, ') +
              "but got ".concat(toRawType(value), "."),
            vm,
          );
        }
      }
      /**
       * Merge two option objects into a new one.
       * Core utility used in both instantiation and inheritance.
       */
      function mergeOptions(parent, child, vm) {
        if (false) {
        }
        if (isFunction(child)) {
          // @ts-expect-error
          child = child.options;
        }
        normalizeProps(child, vm);
        normalizeInject(child, vm);
        normalizeDirectives$1(child);
        // Apply extends and mixins on the child options,
        // but only if it is a raw options object that isn't
        // the result of another mergeOptions call.
        // Only merged options has the _base property.
        if (!child._base) {
          if (child.extends) {
            parent = mergeOptions(parent, child.extends, vm);
          }
          if (child.mixins) {
            for (var i = 0, l = child.mixins.length; i < l; i++) {
              parent = mergeOptions(parent, child.mixins[i], vm);
            }
          }
        }
        var options = {};
        var key;
        for (key in parent) {
          mergeField(key);
        }
        for (key in child) {
          if (!hasOwn(parent, key)) {
            mergeField(key);
          }
        }
        function mergeField(key) {
          var strat = strats[key] || defaultStrat;
          options[key] = strat(parent[key], child[key], vm, key);
        }
        return options;
      }
      /**
       * Resolve an asset.
       * This function is used because child instances need access
       * to assets defined in its ancestor chain.
       */
      function resolveAsset(options, type, id, warnMissing) {
        /* istanbul ignore if */
        if (typeof id !== "string") {
          return;
        }
        var assets = options[type];
        // check local registration variations first
        if (hasOwn(assets, id)) return assets[id];
        var camelizedId = camelize(id);
        if (hasOwn(assets, camelizedId)) return assets[camelizedId];
        var PascalCaseId = capitalize(camelizedId);
        if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
        // fallback to prototype chain
        var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
        if (false) {
        }
        return res;
      }

      function validateProp(key, propOptions, propsData, vm) {
        var prop = propOptions[key];
        var absent = !hasOwn(propsData, key);
        var value = propsData[key];
        // boolean casting
        var booleanIndex = getTypeIndex(Boolean, prop.type);
        if (booleanIndex > -1) {
          if (absent && !hasOwn(prop, "default")) {
            value = false;
          } else if (value === "" || value === hyphenate(key)) {
            // only cast empty string / same name to boolean if
            // boolean has higher priority
            var stringIndex = getTypeIndex(String, prop.type);
            if (stringIndex < 0 || booleanIndex < stringIndex) {
              value = true;
            }
          }
        }
        // check default value
        if (value === undefined) {
          value = getPropDefaultValue(vm, prop, key);
          // since the default value is a fresh copy,
          // make sure to observe it.
          var prevShouldObserve = shouldObserve;
          toggleObserving(true);
          observe(value);
          toggleObserving(prevShouldObserve);
        }
        if (false) {
        }
        return value;
      }
      /**
       * Get the default value of a prop.
       */
      function getPropDefaultValue(vm, prop, key) {
        // no default, return undefined
        if (!hasOwn(prop, "default")) {
          return undefined;
        }
        var def = prop.default;
        // warn against non-factory defaults for Object & Array
        if (false) {
        }
        // the raw prop value was also undefined from previous render,
        // return previous default value to avoid unnecessary watcher trigger
        if (
          vm &&
          vm.$options.propsData &&
          vm.$options.propsData[key] === undefined &&
          vm._props[key] !== undefined
        ) {
          return vm._props[key];
        }
        // call factory function for non-Function types
        // a value is Function if its prototype is function even across different execution context
        return isFunction(def) && getType(prop.type) !== "Function" ? def.call(vm) : def;
      }
      /**
       * Assert whether a prop is valid.
       */
      function assertProp(prop, name, value, vm, absent) {
        if (prop.required && absent) {
          warn('Missing required prop: "' + name + '"', vm);
          return;
        }
        if (value == null && !prop.required) {
          return;
        }
        var type = prop.type;
        var valid = !type || type === true;
        var expectedTypes = [];
        if (type) {
          if (!isArray(type)) {
            type = [type];
          }
          for (var i = 0; i < type.length && !valid; i++) {
            var assertedType = assertType(value, type[i], vm);
            expectedTypes.push(assertedType.expectedType || "");
            valid = assertedType.valid;
          }
        }
        var haveExpectedTypes = expectedTypes.some(function (t) {
          return t;
        });
        if (!valid && haveExpectedTypes) {
          warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
          return;
        }
        var validator = prop.validator;
        if (validator) {
          if (!validator(value)) {
            warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
          }
        }
      }
      var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
      function assertType(value, type, vm) {
        var valid;
        var expectedType = getType(type);
        if (simpleCheckRE.test(expectedType)) {
          var t = typeof value;
          valid = t === expectedType.toLowerCase();
          // for primitive wrapper objects
          if (!valid && t === "object") {
            valid = value instanceof type;
          }
        } else if (expectedType === "Object") {
          valid = isPlainObject(value);
        } else if (expectedType === "Array") {
          valid = isArray(value);
        } else {
          try {
            valid = value instanceof type;
          } catch (e) {
            warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
            valid = false;
          }
        }
        return {
          valid: valid,
          expectedType: expectedType,
        };
      }
      var functionTypeCheckRE = /^\s*function (\w+)/;
      /**
       * Use function string name to check built-in types,
       * because a simple equality check will fail when running
       * across different vms / iframes.
       */
      function getType(fn) {
        var match = fn && fn.toString().match(functionTypeCheckRE);
        return match ? match[1] : "";
      }
      function isSameType(a, b) {
        return getType(a) === getType(b);
      }
      function getTypeIndex(type, expectedTypes) {
        if (!isArray(expectedTypes)) {
          return isSameType(expectedTypes, type) ? 0 : -1;
        }
        for (var i = 0, len = expectedTypes.length; i < len; i++) {
          if (isSameType(expectedTypes[i], type)) {
            return i;
          }
        }
        return -1;
      }
      function getInvalidTypeMessage(name, value, expectedTypes) {
        var message =
          'Invalid prop: type check failed for prop "'.concat(name, '".') +
          " Expected ".concat(expectedTypes.map(capitalize).join(", "));
        var expectedType = expectedTypes[0];
        var receivedType = toRawType(value);
        // check if we need to specify expected value
        if (
          expectedTypes.length === 1 &&
          isExplicable(expectedType) &&
          isExplicable(typeof value) &&
          !isBoolean(expectedType, receivedType)
        ) {
          message += " with value ".concat(styleValue(value, expectedType));
        }
        message += ", got ".concat(receivedType, " ");
        // check if we need to specify received value
        if (isExplicable(receivedType)) {
          message += "with value ".concat(styleValue(value, receivedType), ".");
        }
        return message;
      }
      function styleValue(value, type) {
        if (type === "String") {
          return '"'.concat(value, '"');
        } else if (type === "Number") {
          return "".concat(Number(value));
        } else {
          return "".concat(value);
        }
      }
      var EXPLICABLE_TYPES = ["string", "number", "boolean"];
      function isExplicable(value) {
        return EXPLICABLE_TYPES.some(function (elem) {
          return value.toLowerCase() === elem;
        });
      }
      function isBoolean() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return args.some(function (elem) {
          return elem.toLowerCase() === "boolean";
        });
      }

      /* not type checking this file because flow doesn't play well with Proxy */
      var initProxy;
      if (false) {
        var getHandler_1,
          hasHandler_1,
          isBuiltInModifier_1,
          hasProxy_1,
          warnReservedPrefix_1,
          warnNonPresent_1,
          allowedGlobals_1;
      }

      var sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop,
      };
      function proxy(target, sourceKey, key) {
        sharedPropertyDefinition.get = function proxyGetter() {
          return this[sourceKey][key];
        };
        sharedPropertyDefinition.set = function proxySetter(val) {
          this[sourceKey][key] = val;
        };
        Object.defineProperty(target, key, sharedPropertyDefinition);
      }
      function initState(vm) {
        var opts = vm.$options;
        if (opts.props) initProps$1(vm, opts.props);
        // Composition API
        initSetup(vm);
        if (opts.methods) initMethods(vm, opts.methods);
        if (opts.data) {
          initData(vm);
        } else {
          var ob = observe((vm._data = {}));
          ob && ob.vmCount++;
        }
        if (opts.computed) initComputed$1(vm, opts.computed);
        if (opts.watch && opts.watch !== nativeWatch) {
          initWatch(vm, opts.watch);
        }
      }
      function initProps$1(vm, propsOptions) {
        var propsData = vm.$options.propsData || {};
        var props = (vm._props = shallowReactive({}));
        // cache prop keys so that future props updates can iterate using Array
        // instead of dynamic object key enumeration.
        var keys = (vm.$options._propKeys = []);
        var isRoot = !vm.$parent;
        // root instance props should be converted
        if (!isRoot) {
          toggleObserving(false);
        }
        var _loop_1 = function (key) {
          keys.push(key);
          var value = validateProp(key, propsOptions, propsData, vm);
          /* istanbul ignore else */
          if (false) {
            var hyphenatedKey;
          } else {
            defineReactive(props, key, value, undefined, true /* shallow */);
          }
          // static props are already proxied on the component's prototype
          // during Vue.extend(). We only need to proxy props defined at
          // instantiation here.
          if (!(key in vm)) {
            proxy(vm, "_props", key);
          }
        };
        for (var key in propsOptions) {
          _loop_1(key);
        }
        toggleObserving(true);
      }
      function initData(vm) {
        var data = vm.$options.data;
        data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
        if (!isPlainObject(data)) {
          data = {};
          false && false;
        }
        // proxy data on instance
        var keys = Object.keys(data);
        var props = vm.$options.props;
        var methods = vm.$options.methods;
        var i = keys.length;
        while (i--) {
          var key = keys[i];
          if (false) {
          }
          if (props && hasOwn(props, key)) {
            false && false;
          } else if (!isReserved(key)) {
            proxy(vm, "_data", key);
          }
        }
        // observe data
        var ob = observe(data);
        ob && ob.vmCount++;
      }
      function getData(data, vm) {
        // #7573 disable dep collection when invoking data getters
        pushTarget();
        try {
          return data.call(vm, vm);
        } catch (e) {
          handleError(e, vm, "data()");
          return {};
        } finally {
          popTarget();
        }
      }
      var computedWatcherOptions = { lazy: true };
      function initComputed$1(vm, computed) {
        // $flow-disable-line
        var watchers = (vm._computedWatchers = Object.create(null));
        // computed properties are just getters during SSR
        var isSSR = isServerRendering();
        for (var key in computed) {
          var userDef = computed[key];
          var getter = isFunction(userDef) ? userDef : userDef.get;
          if (false) {
          }
          if (!isSSR) {
            // create internal watcher for the computed property.
            watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
          }
          // component-defined computed properties are already defined on the
          // component prototype. We only need to define computed properties defined
          // at instantiation here.
          if (!(key in vm)) {
            defineComputed(vm, key, userDef);
          } else if (false) {
          }
        }
      }
      function defineComputed(target, key, userDef) {
        var shouldCache = !isServerRendering();
        if (isFunction(userDef)) {
          sharedPropertyDefinition.get = shouldCache
            ? createComputedGetter(key)
            : createGetterInvoker(userDef);
          sharedPropertyDefinition.set = noop;
        } else {
          sharedPropertyDefinition.get = userDef.get
            ? shouldCache && userDef.cache !== false
              ? createComputedGetter(key)
              : createGetterInvoker(userDef.get)
            : noop;
          sharedPropertyDefinition.set = userDef.set || noop;
        }
        if (false) {
        }
        Object.defineProperty(target, key, sharedPropertyDefinition);
      }
      function createComputedGetter(key) {
        return function computedGetter() {
          var watcher = this._computedWatchers && this._computedWatchers[key];
          if (watcher) {
            if (watcher.dirty) {
              watcher.evaluate();
            }
            if (Dep.target) {
              if (false) {
              }
              watcher.depend();
            }
            return watcher.value;
          }
        };
      }
      function createGetterInvoker(fn) {
        return function computedGetter() {
          return fn.call(this, this);
        };
      }
      function initMethods(vm, methods) {
        var props = vm.$options.props;
        for (var key in methods) {
          if (false) {
          }
          vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
        }
      }
      function initWatch(vm, watch) {
        for (var key in watch) {
          var handler = watch[key];
          if (isArray(handler)) {
            for (var i = 0; i < handler.length; i++) {
              createWatcher(vm, key, handler[i]);
            }
          } else {
            createWatcher(vm, key, handler);
          }
        }
      }
      function createWatcher(vm, expOrFn, handler, options) {
        if (isPlainObject(handler)) {
          options = handler;
          handler = handler.handler;
        }
        if (typeof handler === "string") {
          handler = vm[handler];
        }
        return vm.$watch(expOrFn, handler, options);
      }
      function stateMixin(Vue) {
        // flow somehow has problems with directly declared definition object
        // when using Object.defineProperty, so we have to procedurally build up
        // the object here.
        var dataDef = {};
        dataDef.get = function () {
          return this._data;
        };
        var propsDef = {};
        propsDef.get = function () {
          return this._props;
        };
        if (false) {
        }
        Object.defineProperty(Vue.prototype, "$data", dataDef);
        Object.defineProperty(Vue.prototype, "$props", propsDef);
        Vue.prototype.$set = set;
        Vue.prototype.$delete = del;
        Vue.prototype.$watch = function (expOrFn, cb, options) {
          var vm = this;
          if (isPlainObject(cb)) {
            return createWatcher(vm, expOrFn, cb, options);
          }
          options = options || {};
          options.user = true;
          var watcher = new Watcher(vm, expOrFn, cb, options);
          if (options.immediate) {
            var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
            pushTarget();
            invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
            popTarget();
          }
          return function unwatchFn() {
            watcher.teardown();
          };
        };
      }

      var uid = 0;
      function initMixin$1(Vue) {
        Vue.prototype._init = function (options) {
          var vm = this;
          // a uid
          vm._uid = uid++;
          var startTag, endTag;
          /* istanbul ignore if */
          if (false) {
          }
          // a flag to mark this as a Vue instance without having to do instanceof
          // check
          vm._isVue = true;
          // avoid instances from being observed
          vm.__v_skip = true;
          // effect scope
          vm._scope = new EffectScope(true /* detached */);
          // #13134 edge case where a child component is manually created during the
          // render of a parent component
          vm._scope.parent = undefined;
          vm._scope._vm = true;
          // merge options
          if (options && options._isComponent) {
            // optimize internal component instantiation
            // since dynamic options merging is pretty slow, and none of the
            // internal component options needs special treatment.
            initInternalComponent(vm, options);
          } else {
            vm.$options = mergeOptions(
              resolveConstructorOptions(vm.constructor),
              options || {},
              vm,
            );
          }
          /* istanbul ignore else */
          if (false) {
          } else {
            vm._renderProxy = vm;
          }
          // expose real self
          vm._self = vm;
          initLifecycle(vm);
          initEvents(vm);
          initRender(vm);
          callHook$1(vm, "beforeCreate", undefined, false /* setContext */);
          initInjections(vm); // resolve injections before data/props
          initState(vm);
          initProvide(vm); // resolve provide after data/props
          callHook$1(vm, "created");
          /* istanbul ignore if */
          if (false) {
          }
          if (vm.$options.el) {
            vm.$mount(vm.$options.el);
          }
        };
      }
      function initInternalComponent(vm, options) {
        var opts = (vm.$options = Object.create(vm.constructor.options));
        // doing this because it's faster than dynamic enumeration.
        var parentVnode = options._parentVnode;
        opts.parent = options.parent;
        opts._parentVnode = parentVnode;
        var vnodeComponentOptions = parentVnode.componentOptions;
        opts.propsData = vnodeComponentOptions.propsData;
        opts._parentListeners = vnodeComponentOptions.listeners;
        opts._renderChildren = vnodeComponentOptions.children;
        opts._componentTag = vnodeComponentOptions.tag;
        if (options.render) {
          opts.render = options.render;
          opts.staticRenderFns = options.staticRenderFns;
        }
      }
      function resolveConstructorOptions(Ctor) {
        var options = Ctor.options;
        if (Ctor.super) {
          var superOptions = resolveConstructorOptions(Ctor.super);
          var cachedSuperOptions = Ctor.superOptions;
          if (superOptions !== cachedSuperOptions) {
            // super option changed,
            // need to resolve new options.
            Ctor.superOptions = superOptions;
            // check if there are any late-modified/attached options (#4976)
            var modifiedOptions = resolveModifiedOptions(Ctor);
            // update base extend options
            if (modifiedOptions) {
              extend(Ctor.extendOptions, modifiedOptions);
            }
            options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
            if (options.name) {
              options.components[options.name] = Ctor;
            }
          }
        }
        return options;
      }
      function resolveModifiedOptions(Ctor) {
        var modified;
        var latest = Ctor.options;
        var sealed = Ctor.sealedOptions;
        for (var key in latest) {
          if (latest[key] !== sealed[key]) {
            if (!modified) modified = {};
            modified[key] = latest[key];
          }
        }
        return modified;
      }

      function Vue(options) {
        if (false) {
        }
        this._init(options);
      }
      //@ts-expect-error Vue has function type
      initMixin$1(Vue);
      //@ts-expect-error Vue has function type
      stateMixin(Vue);
      //@ts-expect-error Vue has function type
      eventsMixin(Vue);
      //@ts-expect-error Vue has function type
      lifecycleMixin(Vue);
      //@ts-expect-error Vue has function type
      renderMixin(Vue);

      function initUse(Vue) {
        Vue.use = function (plugin) {
          var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
          if (installedPlugins.indexOf(plugin) > -1) {
            return this;
          }
          // additional parameters
          var args = toArray(arguments, 1);
          args.unshift(this);
          if (isFunction(plugin.install)) {
            plugin.install.apply(plugin, args);
          } else if (isFunction(plugin)) {
            plugin.apply(null, args);
          }
          installedPlugins.push(plugin);
          return this;
        };
      }

      function initMixin(Vue) {
        Vue.mixin = function (mixin) {
          this.options = mergeOptions(this.options, mixin);
          return this;
        };
      }

      function initExtend(Vue) {
        /**
         * Each instance constructor, including Vue, has a unique
         * cid. This enables us to create wrapped "child
         * constructors" for prototypal inheritance and cache them.
         */
        Vue.cid = 0;
        var cid = 1;
        /**
         * Class inheritance
         */
        Vue.extend = function (extendOptions) {
          extendOptions = extendOptions || {};
          var Super = this;
          var SuperId = Super.cid;
          var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
          if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId];
          }
          var name = getComponentName(extendOptions) || getComponentName(Super.options);
          if (false) {
          }
          var Sub = function VueComponent(options) {
            this._init(options);
          };
          Sub.prototype = Object.create(Super.prototype);
          Sub.prototype.constructor = Sub;
          Sub.cid = cid++;
          Sub.options = mergeOptions(Super.options, extendOptions);
          Sub["super"] = Super;
          // For props and computed properties, we define the proxy getters on
          // the Vue instances at extension time, on the extended prototype. This
          // avoids Object.defineProperty calls for each instance created.
          if (Sub.options.props) {
            initProps(Sub);
          }
          if (Sub.options.computed) {
            initComputed(Sub);
          }
          // allow further extension/mixin/plugin usage
          Sub.extend = Super.extend;
          Sub.mixin = Super.mixin;
          Sub.use = Super.use;
          // create asset registers, so extended classes
          // can have their private assets too.
          ASSET_TYPES.forEach(function (type) {
            Sub[type] = Super[type];
          });
          // enable recursive self-lookup
          if (name) {
            Sub.options.components[name] = Sub;
          }
          // keep a reference to the super options at extension time.
          // later at instantiation we can check if Super's options have
          // been updated.
          Sub.superOptions = Super.options;
          Sub.extendOptions = extendOptions;
          Sub.sealedOptions = extend({}, Sub.options);
          // cache constructor
          cachedCtors[SuperId] = Sub;
          return Sub;
        };
      }
      function initProps(Comp) {
        var props = Comp.options.props;
        for (var key in props) {
          proxy(Comp.prototype, "_props", key);
        }
      }
      function initComputed(Comp) {
        var computed = Comp.options.computed;
        for (var key in computed) {
          defineComputed(Comp.prototype, key, computed[key]);
        }
      }

      function initAssetRegisters(Vue) {
        /**
         * Create asset registration methods.
         */
        ASSET_TYPES.forEach(function (type) {
          // @ts-expect-error function is not exact same type
          Vue[type] = function (id, definition) {
            if (!definition) {
              return this.options[type + "s"][id];
            } else {
              /* istanbul ignore if */
              if (false) {
              }
              if (type === "component" && isPlainObject(definition)) {
                // @ts-expect-error
                definition.name = definition.name || id;
                definition = this.options._base.extend(definition);
              }
              if (type === "directive" && isFunction(definition)) {
                definition = { bind: definition, update: definition };
              }
              this.options[type + "s"][id] = definition;
              return definition;
            }
          };
        });
      }

      function _getComponentName(opts) {
        return opts && (getComponentName(opts.Ctor.options) || opts.tag);
      }
      function matches(pattern, name) {
        if (isArray(pattern)) {
          return pattern.indexOf(name) > -1;
        } else if (typeof pattern === "string") {
          return pattern.split(",").indexOf(name) > -1;
        } else if (isRegExp(pattern)) {
          return pattern.test(name);
        }
        /* istanbul ignore next */
        return false;
      }
      function pruneCache(keepAliveInstance, filter) {
        var cache = keepAliveInstance.cache,
          keys = keepAliveInstance.keys,
          _vnode = keepAliveInstance._vnode,
          $vnode = keepAliveInstance.$vnode;
        for (var key in cache) {
          var entry = cache[key];
          if (entry) {
            var name_1 = entry.name;
            if (name_1 && !filter(name_1)) {
              pruneCacheEntry(cache, key, keys, _vnode);
            }
          }
        }
        $vnode.componentOptions.children = undefined;
      }
      function pruneCacheEntry(cache, key, keys, current) {
        var entry = cache[key];
        if (entry && (!current || entry.tag !== current.tag)) {
          // @ts-expect-error can be undefined
          entry.componentInstance.$destroy();
        }
        cache[key] = null;
        remove$2(keys, key);
      }
      var patternTypes = [String, RegExp, Array];
      // TODO defineComponent
      var KeepAlive = {
        name: "keep-alive",
        abstract: true,
        props: {
          include: patternTypes,
          exclude: patternTypes,
          max: [String, Number],
        },
        methods: {
          cacheVNode: function () {
            var _a = this,
              cache = _a.cache,
              keys = _a.keys,
              vnodeToCache = _a.vnodeToCache,
              keyToCache = _a.keyToCache;
            if (vnodeToCache) {
              var tag = vnodeToCache.tag,
                componentInstance = vnodeToCache.componentInstance,
                componentOptions = vnodeToCache.componentOptions;
              cache[keyToCache] = {
                name: _getComponentName(componentOptions),
                tag: tag,
                componentInstance: componentInstance,
              };
              keys.push(keyToCache);
              // prune oldest entry
              if (this.max && keys.length > parseInt(this.max)) {
                pruneCacheEntry(cache, keys[0], keys, this._vnode);
              }
              this.vnodeToCache = null;
            }
          },
        },
        created: function () {
          this.cache = Object.create(null);
          this.keys = [];
        },
        destroyed: function () {
          for (var key in this.cache) {
            pruneCacheEntry(this.cache, key, this.keys);
          }
        },
        mounted: function () {
          var _this = this;
          this.cacheVNode();
          this.$watch("include", function (val) {
            pruneCache(_this, function (name) {
              return matches(val, name);
            });
          });
          this.$watch("exclude", function (val) {
            pruneCache(_this, function (name) {
              return !matches(val, name);
            });
          });
        },
        updated: function () {
          this.cacheVNode();
        },
        render: function () {
          var slot = this.$slots.default;
          var vnode = getFirstComponentChild(slot);
          var componentOptions = vnode && vnode.componentOptions;
          if (componentOptions) {
            // check pattern
            var name_2 = _getComponentName(componentOptions);
            var _a = this,
              include = _a.include,
              exclude = _a.exclude;
            if (
              // not included
              (include && (!name_2 || !matches(include, name_2))) ||
              // excluded
              (exclude && name_2 && matches(exclude, name_2))
            ) {
              return vnode;
            }
            var _b = this,
              cache = _b.cache,
              keys = _b.keys;
            var key =
              vnode.key == null
                ? // same constructor may get registered as different local components
                  // so cid alone is not enough (#3269)
                  componentOptions.Ctor.cid +
                  (componentOptions.tag ? "::".concat(componentOptions.tag) : "")
                : vnode.key;
            if (cache[key]) {
              vnode.componentInstance = cache[key].componentInstance;
              // make current key freshest
              remove$2(keys, key);
              keys.push(key);
            } else {
              // delay setting the cache until update
              this.vnodeToCache = vnode;
              this.keyToCache = key;
            }
            // @ts-expect-error can vnode.data can be undefined
            vnode.data.keepAlive = true;
          }
          return vnode || (slot && slot[0]);
        },
      };

      var builtInComponents = {
        KeepAlive: KeepAlive,
      };

      function initGlobalAPI(Vue) {
        // config
        var configDef = {};
        configDef.get = function () {
          return config;
        };
        if (false) {
        }
        Object.defineProperty(Vue, "config", configDef);
        // exposed util methods.
        // NOTE: these are not considered part of the public API - avoid relying on
        // them unless you are aware of the risk.
        Vue.util = {
          warn: warn,
          extend: extend,
          mergeOptions: mergeOptions,
          defineReactive: defineReactive,
        };
        Vue.set = set;
        Vue.delete = del;
        Vue.nextTick = nextTick;
        // 2.6 explicit observable API
        Vue.observable = function (obj) {
          observe(obj);
          return obj;
        };
        Vue.options = Object.create(null);
        ASSET_TYPES.forEach(function (type) {
          Vue.options[type + "s"] = Object.create(null);
        });
        // this is used to identify the "base" constructor to extend all plain-object
        // components with in Weex's multi-instance scenarios.
        Vue.options._base = Vue;
        extend(Vue.options.components, builtInComponents);
        initUse(Vue);
        initMixin(Vue);
        initExtend(Vue);
        initAssetRegisters(Vue);
      }

      initGlobalAPI(Vue);
      Object.defineProperty(Vue.prototype, "$isServer", {
        get: isServerRendering,
      });
      Object.defineProperty(Vue.prototype, "$ssrContext", {
        get: function () {
          /* istanbul ignore next */
          return this.$vnode && this.$vnode.ssrContext;
        },
      });
      // expose FunctionalRenderContext for ssr runtime helper installation
      Object.defineProperty(Vue, "FunctionalRenderContext", {
        value: FunctionalRenderContext,
      });
      Vue.version = version;

      // these are reserved for web because they are directly compiled away
      // during template compilation
      var isReservedAttr = makeMap("style,class");
      // attributes that should be using props for binding
      var acceptValue = makeMap("input,textarea,option,select,progress");
      var mustUseProp = function (tag, type, attr) {
        return (
          (attr === "value" && acceptValue(tag) && type !== "button") ||
          (attr === "selected" && tag === "option") ||
          (attr === "checked" && tag === "input") ||
          (attr === "muted" && tag === "video")
        );
      };
      var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
      var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
      var convertEnumeratedValue = function (key, value) {
        return isFalsyAttrValue(value) || value === "false"
          ? "false"
          : // allow arbitrary string value for contenteditable
            key === "contenteditable" && isValidContentEditableValue(value)
            ? value
            : "true";
      };
      var isBooleanAttr = makeMap(
        "allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare," +
          "default,defaultchecked,defaultmuted,defaultselected,defer,disabled," +
          "enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple," +
          "muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly," +
          "required,reversed,scoped,seamless,selected,sortable," +
          "truespeed,typemustmatch,visible",
      );
      var xlinkNS = "http://www.w3.org/1999/xlink";
      var isXlink = function (name) {
        return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
      };
      var getXlinkProp = function (name) {
        return isXlink(name) ? name.slice(6, name.length) : "";
      };
      var isFalsyAttrValue = function (val) {
        return val == null || val === false;
      };

      function genClassForVnode(vnode) {
        var data = vnode.data;
        var parentNode = vnode;
        var childNode = vnode;
        while (isDef(childNode.componentInstance)) {
          childNode = childNode.componentInstance._vnode;
          if (childNode && childNode.data) {
            data = mergeClassData(childNode.data, data);
          }
        }
        // @ts-expect-error parentNode.parent not VNodeWithData
        while (isDef((parentNode = parentNode.parent))) {
          if (parentNode && parentNode.data) {
            data = mergeClassData(data, parentNode.data);
          }
        }
        return renderClass(data.staticClass, data.class);
      }
      function mergeClassData(child, parent) {
        return {
          staticClass: concat(child.staticClass, parent.staticClass),
          class: isDef(child.class) ? [child.class, parent.class] : parent.class,
        };
      }
      function renderClass(staticClass, dynamicClass) {
        if (isDef(staticClass) || isDef(dynamicClass)) {
          return concat(staticClass, stringifyClass(dynamicClass));
        }
        /* istanbul ignore next */
        return "";
      }
      function concat(a, b) {
        return a ? (b ? a + " " + b : a) : b || "";
      }
      function stringifyClass(value) {
        if (Array.isArray(value)) {
          return stringifyArray(value);
        }
        if (isObject(value)) {
          return stringifyObject(value);
        }
        if (typeof value === "string") {
          return value;
        }
        /* istanbul ignore next */
        return "";
      }
      function stringifyArray(value) {
        var res = "";
        var stringified;
        for (var i = 0, l = value.length; i < l; i++) {
          if (isDef((stringified = stringifyClass(value[i]))) && stringified !== "") {
            if (res) res += " ";
            res += stringified;
          }
        }
        return res;
      }
      function stringifyObject(value) {
        var res = "";
        for (var key in value) {
          if (value[key]) {
            if (res) res += " ";
            res += key;
          }
        }
        return res;
      }

      var namespaceMap = {
        svg: "http://www.w3.org/2000/svg",
        math: "http://www.w3.org/1998/Math/MathML",
      };
      var isHTMLTag = makeMap(
        "html,body,base,head,link,meta,style,title," +
          "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
          "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
          "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
          "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
          "embed,object,param,source,canvas,script,noscript,del,ins," +
          "caption,col,colgroup,table,thead,tbody,td,th,tr," +
          "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
          "output,progress,select,textarea," +
          "details,dialog,menu,menuitem,summary," +
          "content,element,shadow,template,blockquote,iframe,tfoot",
      );
      // this map is intentionally selective, only covering SVG elements that may
      // contain child elements.
      var isSVG = makeMap(
        "svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," +
          "foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," +
          "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",
        true,
      );
      var isReservedTag = function (tag) {
        return isHTMLTag(tag) || isSVG(tag);
      };
      function getTagNamespace(tag) {
        if (isSVG(tag)) {
          return "svg";
        }
        // basic support for MathML
        // note it doesn't support other MathML elements being component roots
        if (tag === "math") {
          return "math";
        }
      }
      var unknownElementCache = Object.create(null);
      function isUnknownElement(tag) {
        /* istanbul ignore if */
        if (!inBrowser) {
          return true;
        }
        if (isReservedTag(tag)) {
          return false;
        }
        tag = tag.toLowerCase();
        /* istanbul ignore if */
        if (unknownElementCache[tag] != null) {
          return unknownElementCache[tag];
        }
        var el = document.createElement(tag);
        if (tag.indexOf("-") > -1) {
          // https://stackoverflow.com/a/28210364/1070244
          return (unknownElementCache[tag] =
            el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement);
        } else {
          return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()));
        }
      }
      var isTextInputType = makeMap("text,number,password,search,email,tel,url");

      /**
       * Query an element selector if it's not an element already.
       */
      function query(el) {
        if (typeof el === "string") {
          var selected = document.querySelector(el);
          if (!selected) {
            false && false;
            return document.createElement("div");
          }
          return selected;
        } else {
          return el;
        }
      }

      function createElement(tagName, vnode) {
        var elm = document.createElement(tagName);
        if (tagName !== "select") {
          return elm;
        }
        // false or null will remove the attribute but undefined will not
        if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
          elm.setAttribute("multiple", "multiple");
        }
        return elm;
      }
      function createElementNS(namespace, tagName) {
        return document.createElementNS(namespaceMap[namespace], tagName);
      }
      function createTextNode(text) {
        return document.createTextNode(text);
      }
      function createComment(text) {
        return document.createComment(text);
      }
      function insertBefore(parentNode, newNode, referenceNode) {
        parentNode.insertBefore(newNode, referenceNode);
      }
      function removeChild(node, child) {
        node.removeChild(child);
      }
      function appendChild(node, child) {
        node.appendChild(child);
      }
      function parentNode(node) {
        return node.parentNode;
      }
      function nextSibling(node) {
        return node.nextSibling;
      }
      function tagName(node) {
        return node.tagName;
      }
      function setTextContent(node, text) {
        node.textContent = text;
      }
      function setStyleScope(node, scopeId) {
        node.setAttribute(scopeId, "");
      }

      var nodeOps = /*#__PURE__*/ Object.freeze({
        __proto__: null,
        createElement: createElement,
        createElementNS: createElementNS,
        createTextNode: createTextNode,
        createComment: createComment,
        insertBefore: insertBefore,
        removeChild: removeChild,
        appendChild: appendChild,
        parentNode: parentNode,
        nextSibling: nextSibling,
        tagName: tagName,
        setTextContent: setTextContent,
        setStyleScope: setStyleScope,
      });

      var ref = {
        create: function (_, vnode) {
          registerRef(vnode);
        },
        update: function (oldVnode, vnode) {
          if (oldVnode.data.ref !== vnode.data.ref) {
            registerRef(oldVnode, true);
            registerRef(vnode);
          }
        },
        destroy: function (vnode) {
          registerRef(vnode, true);
        },
      };
      function registerRef(vnode, isRemoval) {
        var ref = vnode.data.ref;
        if (!isDef(ref)) return;
        var vm = vnode.context;
        var refValue = vnode.componentInstance || vnode.elm;
        var value = isRemoval ? null : refValue;
        var $refsValue = isRemoval ? undefined : refValue;
        if (isFunction(ref)) {
          invokeWithErrorHandling(ref, vm, [value], vm, "template ref function");
          return;
        }
        var isFor = vnode.data.refInFor;
        var _isString = typeof ref === "string" || typeof ref === "number";
        var _isRef = isRef(ref);
        var refs = vm.$refs;
        if (_isString || _isRef) {
          if (isFor) {
            var existing = _isString ? refs[ref] : ref.value;
            if (isRemoval) {
              isArray(existing) && remove$2(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref] = [refValue];
                  setSetupRef(vm, ref, refs[ref]);
                } else {
                  ref.value = [refValue];
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            if (isRemoval && refs[ref] !== refValue) {
              return;
            }
            refs[ref] = $refsValue;
            setSetupRef(vm, ref, value);
          } else if (_isRef) {
            if (isRemoval && ref.value !== refValue) {
              return;
            }
            ref.value = value;
          } else if (false) {
          }
        }
      }
      function setSetupRef(_a, key, val) {
        var _setupState = _a._setupState;
        if (_setupState && hasOwn(_setupState, key)) {
          if (isRef(_setupState[key])) {
            _setupState[key].value = val;
          } else {
            _setupState[key] = val;
          }
        }
      }

      /**
       * Virtual DOM patching algorithm based on Snabbdom by
       * Simon Friis Vindum (@paldepind)
       * Licensed under the MIT License
       * https://github.com/paldepind/snabbdom/blob/master/LICENSE
       *
       * modified by Evan You (@yyx990803)
       *
       * Not type-checking this because this file is perf-critical and the cost
       * of making flow understand it is not worth it.
       */
      var emptyNode = new VNode("", {}, []);
      var hooks = ["create", "activate", "update", "remove", "destroy"];
      function sameVnode(a, b) {
        return (
          a.key === b.key &&
          a.asyncFactory === b.asyncFactory &&
          ((a.tag === b.tag &&
            a.isComment === b.isComment &&
            isDef(a.data) === isDef(b.data) &&
            sameInputType(a, b)) ||
            (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
        );
      }
      function sameInputType(a, b) {
        if (a.tag !== "input") return true;
        var i;
        var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
        var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
        return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
      }
      function createKeyToOldIdx(children, beginIdx, endIdx) {
        var i, key;
        var map = {};
        for (i = beginIdx; i <= endIdx; ++i) {
          key = children[i].key;
          if (isDef(key)) map[key] = i;
        }
        return map;
      }
      function createPatchFunction(backend) {
        var i, j;
        var cbs = {};
        var modules = backend.modules,
          nodeOps = backend.nodeOps;
        for (i = 0; i < hooks.length; ++i) {
          cbs[hooks[i]] = [];
          for (j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
              cbs[hooks[i]].push(modules[j][hooks[i]]);
            }
          }
        }
        function emptyNodeAt(elm) {
          return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
        }
        function createRmCb(childElm, listeners) {
          function remove() {
            if (--remove.listeners === 0) {
              removeNode(childElm);
            }
          }
          remove.listeners = listeners;
          return remove;
        }
        function removeNode(el) {
          var parent = nodeOps.parentNode(el);
          // element may have already been removed due to v-html / v-text
          if (isDef(parent)) {
            nodeOps.removeChild(parent, el);
          }
        }
        function isUnknownElement(vnode, inVPre) {
          return (
            !inVPre &&
            !vnode.ns &&
            !(
              config.ignoredElements.length &&
              config.ignoredElements.some(function (ignore) {
                return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
              })
            ) &&
            config.isUnknownElement(vnode.tag)
          );
        }
        var creatingElmInVPre = 0;
        function createElm(
          vnode,
          insertedVnodeQueue,
          parentElm,
          refElm,
          nested,
          ownerArray,
          index,
        ) {
          if (isDef(vnode.elm) && isDef(ownerArray)) {
            // This vnode was used in a previous render!
            // now it's used as a new node, overwriting its elm would cause
            // potential patch errors down the road when it's used as an insertion
            // reference node. Instead, we clone the node on-demand before creating
            // associated DOM element for it.
            vnode = ownerArray[index] = cloneVNode(vnode);
          }
          vnode.isRootInsert = !nested; // for transition enter check
          if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return;
          }
          var data = vnode.data;
          var children = vnode.children;
          var tag = vnode.tag;
          if (isDef(tag)) {
            if (false) {
            }
            vnode.elm = vnode.ns
              ? nodeOps.createElementNS(vnode.ns, tag)
              : nodeOps.createElement(tag, vnode);
            setScope(vnode);
            createChildren(vnode, children, insertedVnodeQueue);
            if (isDef(data)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
            }
            insert(parentElm, vnode.elm, refElm);
            if (false) {
            }
          } else if (isTrue(vnode.isComment)) {
            vnode.elm = nodeOps.createComment(vnode.text);
            insert(parentElm, vnode.elm, refElm);
          } else {
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
          }
        }
        function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i = vnode.data;
          if (isDef(i)) {
            var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
            if (isDef((i = i.hook)) && isDef((i = i.init))) {
              i(vnode, false /* hydrating */);
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            if (isDef(vnode.componentInstance)) {
              initComponent(vnode, insertedVnodeQueue);
              insert(parentElm, vnode.elm, refElm);
              if (isTrue(isReactivated)) {
                reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
              }
              return true;
            }
          }
        }
        function initComponent(vnode, insertedVnodeQueue) {
          if (isDef(vnode.data.pendingInsert)) {
            insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
            vnode.data.pendingInsert = null;
          }
          vnode.elm = vnode.componentInstance.$el;
          if (isPatchable(vnode)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            setScope(vnode);
          } else {
            // empty component root.
            // skip all element-related modules except for ref (#3455)
            registerRef(vnode);
            // make sure to invoke the insert hook
            insertedVnodeQueue.push(vnode);
          }
        }
        function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
          var i;
          // hack for #4339: a reactivated component with inner transition
          // does not trigger because the inner node's created hooks are not called
          // again. It's not ideal to involve module-specific logic in here but
          // there doesn't seem to be a better way to do it.
          var innerNode = vnode;
          while (innerNode.componentInstance) {
            innerNode = innerNode.componentInstance._vnode;
            if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
              for (i = 0; i < cbs.activate.length; ++i) {
                cbs.activate[i](emptyNode, innerNode);
              }
              insertedVnodeQueue.push(innerNode);
              break;
            }
          }
          // unlike a newly created component,
          // a reactivated keep-alive component doesn't insert itself
          insert(parentElm, vnode.elm, refElm);
        }
        function insert(parent, elm, ref) {
          if (isDef(parent)) {
            if (isDef(ref)) {
              if (nodeOps.parentNode(ref) === parent) {
                nodeOps.insertBefore(parent, elm, ref);
              }
            } else {
              nodeOps.appendChild(parent, elm);
            }
          }
        }
        function createChildren(vnode, children, insertedVnodeQueue) {
          if (isArray(children)) {
            if (false) {
            }
            for (var i_1 = 0; i_1 < children.length; ++i_1) {
              createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
            }
          } else if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
          }
        }
        function isPatchable(vnode) {
          while (vnode.componentInstance) {
            vnode = vnode.componentInstance._vnode;
          }
          return isDef(vnode.tag);
        }
        function invokeCreateHooks(vnode, insertedVnodeQueue) {
          for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
            cbs.create[i_2](emptyNode, vnode);
          }
          i = vnode.data.hook; // Reuse variable
          if (isDef(i)) {
            if (isDef(i.create)) i.create(emptyNode, vnode);
            if (isDef(i.insert)) insertedVnodeQueue.push(vnode);
          }
        }
        // set scope id attribute for scoped CSS.
        // this is implemented as a special case to avoid the overhead
        // of going through the normal attribute patching process.
        function setScope(vnode) {
          var i;
          if (isDef((i = vnode.fnScopeId))) {
            nodeOps.setStyleScope(vnode.elm, i);
          } else {
            var ancestor = vnode;
            while (ancestor) {
              if (isDef((i = ancestor.context)) && isDef((i = i.$options._scopeId))) {
                nodeOps.setStyleScope(vnode.elm, i);
              }
              ancestor = ancestor.parent;
            }
          }
          // for slot content they should also get the scopeId from the host instance.
          if (
            isDef((i = activeInstance)) &&
            i !== vnode.context &&
            i !== vnode.fnContext &&
            isDef((i = i.$options._scopeId))
          ) {
            nodeOps.setStyleScope(vnode.elm, i);
          }
        }
        function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
          for (; startIdx <= endIdx; ++startIdx) {
            createElm(
              vnodes[startIdx],
              insertedVnodeQueue,
              parentElm,
              refElm,
              false,
              vnodes,
              startIdx,
            );
          }
        }
        function invokeDestroyHook(vnode) {
          var i, j;
          var data = vnode.data;
          if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.destroy))) i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
          }
          if (isDef((i = vnode.children))) {
            for (j = 0; j < vnode.children.length; ++j) {
              invokeDestroyHook(vnode.children[j]);
            }
          }
        }
        function removeVnodes(vnodes, startIdx, endIdx) {
          for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (isDef(ch)) {
              if (isDef(ch.tag)) {
                removeAndInvokeRemoveHook(ch);
                invokeDestroyHook(ch);
              } else {
                // Text node
                removeNode(ch.elm);
              }
            }
          }
        }
        function removeAndInvokeRemoveHook(vnode, rm) {
          if (isDef(rm) || isDef(vnode.data)) {
            var i_3;
            var listeners = cbs.remove.length + 1;
            if (isDef(rm)) {
              // we have a recursively passed down rm callback
              // increase the listeners count
              rm.listeners += listeners;
            } else {
              // directly removing
              rm = createRmCb(vnode.elm, listeners);
            }
            // recursively invoke hooks on child component root node
            if (
              isDef((i_3 = vnode.componentInstance)) &&
              isDef((i_3 = i_3._vnode)) &&
              isDef(i_3.data)
            ) {
              removeAndInvokeRemoveHook(i_3, rm);
            }
            for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
              cbs.remove[i_3](vnode, rm);
            }
            if (isDef((i_3 = vnode.data.hook)) && isDef((i_3 = i_3.remove))) {
              i_3(vnode, rm);
            } else {
              rm();
            }
          } else {
            removeNode(vnode.elm);
          }
        }
        function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
          var oldStartIdx = 0;
          var newStartIdx = 0;
          var oldEndIdx = oldCh.length - 1;
          var oldStartVnode = oldCh[0];
          var oldEndVnode = oldCh[oldEndIdx];
          var newEndIdx = newCh.length - 1;
          var newStartVnode = newCh[0];
          var newEndVnode = newCh[newEndIdx];
          var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
          // removeOnly is a special flag used only by <transition-group>
          // to ensure removed elements stay in correct relative positions
          // during leaving transitions
          var canMove = !removeOnly;
          if (false) {
          }
          while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
              oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            } else if (isUndef(oldEndVnode)) {
              oldEndVnode = oldCh[--oldEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
              patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              oldStartVnode = oldCh[++oldStartIdx];
              newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
              patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
              oldEndVnode = oldCh[--oldEndIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
              // Vnode moved right
              patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
              canMove &&
                nodeOps.insertBefore(
                  parentElm,
                  oldStartVnode.elm,
                  nodeOps.nextSibling(oldEndVnode.elm),
                );
              oldStartVnode = oldCh[++oldStartIdx];
              newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
              // Vnode moved left
              patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
              canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
              oldEndVnode = oldCh[--oldEndIdx];
              newStartVnode = newCh[++newStartIdx];
            } else {
              if (isUndef(oldKeyToIdx))
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
              idxInOld = isDef(newStartVnode.key)
                ? oldKeyToIdx[newStartVnode.key]
                : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
              if (isUndef(idxInOld)) {
                // New element
                createElm(
                  newStartVnode,
                  insertedVnodeQueue,
                  parentElm,
                  oldStartVnode.elm,
                  false,
                  newCh,
                  newStartIdx,
                );
              } else {
                vnodeToMove = oldCh[idxInOld];
                if (sameVnode(vnodeToMove, newStartVnode)) {
                  patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                  oldCh[idxInOld] = undefined;
                  canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                } else {
                  // same key but different element. treat as new element
                  createElm(
                    newStartVnode,
                    insertedVnodeQueue,
                    parentElm,
                    oldStartVnode.elm,
                    false,
                    newCh,
                    newStartIdx,
                  );
                }
              }
              newStartVnode = newCh[++newStartIdx];
            }
          }
          if (oldStartIdx > oldEndIdx) {
            refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
          } else if (newStartIdx > newEndIdx) {
            removeVnodes(oldCh, oldStartIdx, oldEndIdx);
          }
        }
        function checkDuplicateKeys(children) {
          var seenKeys = {};
          for (var i_4 = 0; i_4 < children.length; i_4++) {
            var vnode = children[i_4];
            var key = vnode.key;
            if (isDef(key)) {
              if (seenKeys[key]) {
                warn(
                  "Duplicate keys detected: '".concat(key, "'. This may cause an update error."),
                  vnode.context,
                );
              } else {
                seenKeys[key] = true;
              }
            }
          }
        }
        function findIdxInOld(node, oldCh, start, end) {
          for (var i_5 = start; i_5 < end; i_5++) {
            var c = oldCh[i_5];
            if (isDef(c) && sameVnode(node, c)) return i_5;
          }
        }
        function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
          if (oldVnode === vnode) {
            return;
          }
          if (isDef(vnode.elm) && isDef(ownerArray)) {
            // clone reused vnode
            vnode = ownerArray[index] = cloneVNode(vnode);
          }
          var elm = (vnode.elm = oldVnode.elm);
          if (isTrue(oldVnode.isAsyncPlaceholder)) {
            if (isDef(vnode.asyncFactory.resolved)) {
              hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
            } else {
              vnode.isAsyncPlaceholder = true;
            }
            return;
          }
          // reuse element for static trees.
          // note we only do this if the vnode is cloned -
          // if the new node is not cloned it means the render functions have been
          // reset by the hot-reload-api and we need to do a proper re-render.
          if (
            isTrue(vnode.isStatic) &&
            isTrue(oldVnode.isStatic) &&
            vnode.key === oldVnode.key &&
            (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
          ) {
            vnode.componentInstance = oldVnode.componentInstance;
            return;
          }
          var i;
          var data = vnode.data;
          if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
            i(oldVnode, vnode);
          }
          var oldCh = oldVnode.children;
          var ch = vnode.children;
          if (isDef(data) && isPatchable(vnode)) {
            for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
            if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
          }
          if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
              if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
            } else if (isDef(ch)) {
              if (false) {
              }
              if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
              addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {
              removeVnodes(oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {
              nodeOps.setTextContent(elm, "");
            }
          } else if (oldVnode.text !== vnode.text) {
            nodeOps.setTextContent(elm, vnode.text);
          }
          if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
          }
        }
        function invokeInsertHook(vnode, queue, initial) {
          // delay insert hooks for component root nodes, invoke them after the
          // element is really inserted
          if (isTrue(initial) && isDef(vnode.parent)) {
            vnode.parent.data.pendingInsert = queue;
          } else {
            for (var i_6 = 0; i_6 < queue.length; ++i_6) {
              queue[i_6].data.hook.insert(queue[i_6]);
            }
          }
        }
        var hydrationBailed = false;
        // list of modules that can skip create hook during hydration because they
        // are already rendered on the client or has no need for initialization
        // Note: style is excluded because it relies on initial clone for future
        // deep updates (#7063).
        var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
        // Note: this is a browser-only function so we can assume elms are DOM nodes.
        function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
          var i;
          var tag = vnode.tag,
            data = vnode.data,
            children = vnode.children;
          inVPre = inVPre || (data && data.pre);
          vnode.elm = elm;
          if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
            vnode.isAsyncPlaceholder = true;
            return true;
          }
          // assert node match
          if (false) {
          }
          if (isDef(data)) {
            if (isDef((i = data.hook)) && isDef((i = i.init))) i(vnode, true /* hydrating */);
            if (isDef((i = vnode.componentInstance))) {
              // child component. it should have hydrated its own tree.
              initComponent(vnode, insertedVnodeQueue);
              return true;
            }
          }
          if (isDef(tag)) {
            if (isDef(children)) {
              // empty element, allow client to pick up and populate children
              if (!elm.hasChildNodes()) {
                createChildren(vnode, children, insertedVnodeQueue);
              } else {
                // v-html and domProps: innerHTML
                if (isDef((i = data)) && isDef((i = i.domProps)) && isDef((i = i.innerHTML))) {
                  if (i !== elm.innerHTML) {
                    /* istanbul ignore if */
                    if (false) {
                    }
                    return false;
                  }
                } else {
                  // iterate and compare children lists
                  var childrenMatch = true;
                  var childNode = elm.firstChild;
                  for (var i_7 = 0; i_7 < children.length; i_7++) {
                    if (
                      !childNode ||
                      !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)
                    ) {
                      childrenMatch = false;
                      break;
                    }
                    childNode = childNode.nextSibling;
                  }
                  // if childNode is not null, it means the actual childNodes list is
                  // longer than the virtual children list.
                  if (!childrenMatch || childNode) {
                    /* istanbul ignore if */
                    if (false) {
                    }
                    return false;
                  }
                }
              }
            }
            if (isDef(data)) {
              var fullInvoke = false;
              for (var key in data) {
                if (!isRenderedModule(key)) {
                  fullInvoke = true;
                  invokeCreateHooks(vnode, insertedVnodeQueue);
                  break;
                }
              }
              if (!fullInvoke && data["class"]) {
                // ensure collecting deps for deep class bindings for future updates
                traverse(data["class"]);
              }
            }
          } else if (elm.data !== vnode.text) {
            elm.data = vnode.text;
          }
          return true;
        }
        function assertNodeMatch(node, vnode, inVPre) {
          if (isDef(vnode.tag)) {
            return (
              vnode.tag.indexOf("vue-component") === 0 ||
              (!isUnknownElement(vnode, inVPre) &&
                vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase()))
            );
          } else {
            return node.nodeType === (vnode.isComment ? 8 : 3);
          }
        }
        return function patch(oldVnode, vnode, hydrating, removeOnly) {
          if (isUndef(vnode)) {
            if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
            return;
          }
          var isInitialPatch = false;
          var insertedVnodeQueue = [];
          if (isUndef(oldVnode)) {
            // empty mount (likely as component), create new root element
            isInitialPatch = true;
            createElm(vnode, insertedVnodeQueue);
          } else {
            var isRealElement = isDef(oldVnode.nodeType);
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
              // patch existing root node
              patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
            } else {
              if (isRealElement) {
                // mounting to a real element
                // check if this is server-rendered content and if we can perform
                // a successful hydration.
                if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                  oldVnode.removeAttribute(SSR_ATTR);
                  hydrating = true;
                }
                if (isTrue(hydrating)) {
                  if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                    invokeInsertHook(vnode, insertedVnodeQueue, true);
                    return oldVnode;
                  } else if (false) {
                  }
                }
                // either not server-rendered, or hydration failed.
                // create an empty node and replace it
                oldVnode = emptyNodeAt(oldVnode);
              }
              // replacing existing element
              var oldElm = oldVnode.elm;
              var parentElm = nodeOps.parentNode(oldElm);
              // create new node
              createElm(
                vnode,
                insertedVnodeQueue,
                // extremely rare edge case: do not insert if old element is in a
                // leaving transition. Only happens when combining transition +
                // keep-alive + HOCs. (#4590)
                oldElm._leaveCb ? null : parentElm,
                nodeOps.nextSibling(oldElm),
              );
              // update parent placeholder node element, recursively
              if (isDef(vnode.parent)) {
                var ancestor = vnode.parent;
                var patchable = isPatchable(vnode);
                while (ancestor) {
                  for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                    cbs.destroy[i_8](ancestor);
                  }
                  ancestor.elm = vnode.elm;
                  if (patchable) {
                    for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                      cbs.create[i_9](emptyNode, ancestor);
                    }
                    // #6513
                    // invoke insert hooks that may have been merged by create hooks.
                    // e.g. for directives that uses the "inserted" hook.
                    var insert_1 = ancestor.data.hook.insert;
                    if (insert_1.merged) {
                      // start at index 1 to avoid re-invoking component mounted hook
                      // clone insert hooks to avoid being mutated during iteration.
                      // e.g. for customed directives under transition group.
                      var cloned = insert_1.fns.slice(1);
                      for (var i_10 = 0; i_10 < cloned.length; i_10++) {
                        cloned[i_10]();
                      }
                    }
                  } else {
                    registerRef(ancestor);
                  }
                  ancestor = ancestor.parent;
                }
              }
              // destroy old node
              if (isDef(parentElm)) {
                removeVnodes([oldVnode], 0, 0);
              } else if (isDef(oldVnode.tag)) {
                invokeDestroyHook(oldVnode);
              }
            }
          }
          invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
          return vnode.elm;
        };
      }

      var directives = {
        create: updateDirectives,
        update: updateDirectives,
        destroy: function unbindDirectives(vnode) {
          // @ts-expect-error emptyNode is not VNodeWithData
          updateDirectives(vnode, emptyNode);
        },
      };
      function updateDirectives(oldVnode, vnode) {
        if (oldVnode.data.directives || vnode.data.directives) {
          _update(oldVnode, vnode);
        }
      }
      function _update(oldVnode, vnode) {
        var isCreate = oldVnode === emptyNode;
        var isDestroy = vnode === emptyNode;
        var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
        var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
        var dirsWithInsert = [];
        var dirsWithPostpatch = [];
        var key, oldDir, dir;
        for (key in newDirs) {
          oldDir = oldDirs[key];
          dir = newDirs[key];
          if (!oldDir) {
            // new directive, bind
            callHook(dir, "bind", vnode, oldVnode);
            if (dir.def && dir.def.inserted) {
              dirsWithInsert.push(dir);
            }
          } else {
            // existing directive, update
            dir.oldValue = oldDir.value;
            dir.oldArg = oldDir.arg;
            callHook(dir, "update", vnode, oldVnode);
            if (dir.def && dir.def.componentUpdated) {
              dirsWithPostpatch.push(dir);
            }
          }
        }
        if (dirsWithInsert.length) {
          var callInsert = function () {
            for (var i = 0; i < dirsWithInsert.length; i++) {
              callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
            }
          };
          if (isCreate) {
            mergeVNodeHook(vnode, "insert", callInsert);
          } else {
            callInsert();
          }
        }
        if (dirsWithPostpatch.length) {
          mergeVNodeHook(vnode, "postpatch", function () {
            for (var i = 0; i < dirsWithPostpatch.length; i++) {
              callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
            }
          });
        }
        if (!isCreate) {
          for (key in oldDirs) {
            if (!newDirs[key]) {
              // no longer present, unbind
              callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
            }
          }
        }
      }
      var emptyModifiers = Object.create(null);
      function normalizeDirectives(dirs, vm) {
        var res = Object.create(null);
        if (!dirs) {
          // $flow-disable-line
          return res;
        }
        var i, dir;
        for (i = 0; i < dirs.length; i++) {
          dir = dirs[i];
          if (!dir.modifiers) {
            // $flow-disable-line
            dir.modifiers = emptyModifiers;
          }
          res[getRawDirName(dir)] = dir;
          if (vm._setupState && vm._setupState.__sfc) {
            var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
            if (typeof setupDef === "function") {
              dir.def = {
                bind: setupDef,
                update: setupDef,
              };
            } else {
              dir.def = setupDef;
            }
          }
          dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name, true);
        }
        // $flow-disable-line
        return res;
      }
      function getRawDirName(dir) {
        return (
          dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."))
        );
      }
      function callHook(dir, hook, vnode, oldVnode, isDestroy) {
        var fn = dir.def && dir.def[hook];
        if (fn) {
          try {
            fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
          } catch (e) {
            handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
          }
        }
      }

      var baseModules = [ref, directives];

      function updateAttrs(oldVnode, vnode) {
        var opts = vnode.componentOptions;
        if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
          return;
        }
        if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
          return;
        }
        var key, cur, old;
        var elm = vnode.elm;
        var oldAttrs = oldVnode.data.attrs || {};
        var attrs = vnode.data.attrs || {};
        // clone observed objects, as the user probably wants to mutate it
        if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
          attrs = vnode.data.attrs = extend({}, attrs);
        }
        for (key in attrs) {
          cur = attrs[key];
          old = oldAttrs[key];
          if (old !== cur) {
            setAttr(elm, key, cur, vnode.data.pre);
          }
        }
        // #4391: in IE9, setting type can reset value for input[type=radio]
        // #6666: IE/Edge forces progress value down to 1 before setting a max
        /* istanbul ignore if */
        if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
          setAttr(elm, "value", attrs.value);
        }
        for (key in oldAttrs) {
          if (isUndef(attrs[key])) {
            if (isXlink(key)) {
              elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
            } else if (!isEnumeratedAttr(key)) {
              elm.removeAttribute(key);
            }
          }
        }
      }
      function setAttr(el, key, value, isInPre) {
        if (isInPre || el.tagName.indexOf("-") > -1) {
          baseSetAttr(el, key, value);
        } else if (isBooleanAttr(key)) {
          // set attribute for blank value
          // e.g. <option disabled>Select one</option>
          if (isFalsyAttrValue(value)) {
            el.removeAttribute(key);
          } else {
            // technically allowfullscreen is a boolean attribute for <iframe>,
            // but Flash expects a value of "true" when used on <embed> tag
            value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
            el.setAttribute(key, value);
          }
        } else if (isEnumeratedAttr(key)) {
          el.setAttribute(key, convertEnumeratedValue(key, value));
        } else if (isXlink(key)) {
          if (isFalsyAttrValue(value)) {
            el.removeAttributeNS(xlinkNS, getXlinkProp(key));
          } else {
            el.setAttributeNS(xlinkNS, key, value);
          }
        } else {
          baseSetAttr(el, key, value);
        }
      }
      function baseSetAttr(el, key, value) {
        if (isFalsyAttrValue(value)) {
          el.removeAttribute(key);
        } else {
          // #7138: IE10 & 11 fires input event when setting placeholder on
          // <textarea>... block the first input event and remove the blocker
          // immediately.
          /* istanbul ignore if */
          if (
            isIE &&
            !isIE9 &&
            el.tagName === "TEXTAREA" &&
            key === "placeholder" &&
            value !== "" &&
            !el.__ieph
          ) {
            var blocker_1 = function (e) {
              e.stopImmediatePropagation();
              el.removeEventListener("input", blocker_1);
            };
            el.addEventListener("input", blocker_1);
            // $flow-disable-line
            el.__ieph = true; /* IE placeholder patched */
          }
          el.setAttribute(key, value);
        }
      }
      var attrs = {
        create: updateAttrs,
        update: updateAttrs,
      };

      function updateClass(oldVnode, vnode) {
        var el = vnode.elm;
        var data = vnode.data;
        var oldData = oldVnode.data;
        if (
          isUndef(data.staticClass) &&
          isUndef(data.class) &&
          (isUndef(oldData) || (isUndef(oldData.staticClass) && isUndef(oldData.class)))
        ) {
          return;
        }
        var cls = genClassForVnode(vnode);
        // handle transition classes
        var transitionClass = el._transitionClasses;
        if (isDef(transitionClass)) {
          cls = concat(cls, stringifyClass(transitionClass));
        }
        // set the class
        if (cls !== el._prevClass) {
          el.setAttribute("class", cls);
          el._prevClass = cls;
        }
      }
      var klass = {
        create: updateClass,
        update: updateClass,
      };

      // in some cases, the event used has to be determined at runtime
      // so we used some reserved tokens during compile.
      var RANGE_TOKEN = "__r";
      var CHECKBOX_RADIO_TOKEN = "__c";

      // normalize v-model event tokens that can only be determined at runtime.
      // it's important to place the event as the first in the array because
      // the whole point is ensuring the v-model callback gets called before
      // user-attached handlers.
      function normalizeEvents(on) {
        /* istanbul ignore if */
        if (isDef(on[RANGE_TOKEN])) {
          // IE input[type=range] only supports `change` event
          var event_1 = isIE ? "change" : "input";
          on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
          delete on[RANGE_TOKEN];
        }
        // This was originally intended to fix #4521 but no longer necessary
        // after 2.5. Keeping it for backwards compat with generated code from < 2.4
        /* istanbul ignore if */
        if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
          on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
          delete on[CHECKBOX_RADIO_TOKEN];
        }
      }
      var target;
      function createOnceHandler(event, handler, capture) {
        var _target = target; // save current target element in closure
        return function onceHandler() {
          var res = handler.apply(null, arguments);
          if (res !== null) {
            remove(event, onceHandler, capture, _target);
          }
        };
      }
      // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
      // implementation and does not fire microtasks in between event propagation, so
      // safe to exclude.
      var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
      function add(name, handler, capture, passive) {
        // async edge case #6566: inner click event triggers patch, event handler
        // attached to outer element during patch, and triggered again. This
        // happens because browsers fire microtask ticks between event propagation.
        // the solution is simple: we save the timestamp when a handler is attached,
        // and the handler would only fire if the event passed to it was fired
        // AFTER it was attached.
        if (useMicrotaskFix) {
          var attachedTimestamp_1 = currentFlushTimestamp;
          var original_1 = handler;
          //@ts-expect-error
          handler = original_1._wrapper = function (e) {
            if (
              // no bubbling, should always fire.
              // this is just a safety net in case event.timeStamp is unreliable in
              // certain weird environments...
              e.target === e.currentTarget ||
              // event is fired after handler attachment
              e.timeStamp >= attachedTimestamp_1 ||
              // bail for environments that have buggy event.timeStamp implementations
              // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
              // #9681 QtWebEngine event.timeStamp is negative value
              e.timeStamp <= 0 ||
              // #9448 bail if event is fired in another document in a multi-page
              // electron/nw.js app, since event.timeStamp will be using a different
              // starting reference
              e.target.ownerDocument !== document
            ) {
              return original_1.apply(this, arguments);
            }
          };
        }
        target.addEventListener(
          name,
          handler,
          supportsPassive ? { capture: capture, passive: passive } : capture,
        );
      }
      function remove(name, handler, capture, _target) {
        (_target || target).removeEventListener(
          name,
          //@ts-expect-error
          handler._wrapper || handler,
          capture,
        );
      }
      function updateDOMListeners(oldVnode, vnode) {
        if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
          return;
        }
        var on = vnode.data.on || {};
        var oldOn = oldVnode.data.on || {};
        // vnode is empty when removing all listeners,
        // and use old vnode dom element
        target = vnode.elm || oldVnode.elm;
        normalizeEvents(on);
        updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
        target = undefined;
      }
      var events = {
        create: updateDOMListeners,
        update: updateDOMListeners,
        // @ts-expect-error emptyNode has actually data
        destroy: function (vnode) {
          return updateDOMListeners(vnode, emptyNode);
        },
      };

      var svgContainer;
      function updateDOMProps(oldVnode, vnode) {
        if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
          return;
        }
        var key, cur;
        var elm = vnode.elm;
        var oldProps = oldVnode.data.domProps || {};
        var props = vnode.data.domProps || {};
        // clone observed objects, as the user probably wants to mutate it
        if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
          props = vnode.data.domProps = extend({}, props);
        }
        for (key in oldProps) {
          if (!(key in props)) {
            elm[key] = "";
          }
        }
        for (key in props) {
          cur = props[key];
          // ignore children if the node has textContent or innerHTML,
          // as these will throw away existing DOM nodes and cause removal errors
          // on subsequent patches (#3360)
          if (key === "textContent" || key === "innerHTML") {
            if (vnode.children) vnode.children.length = 0;
            if (cur === oldProps[key]) continue;
            // #6601 work around Chrome version <= 55 bug where single textNode
            // replaced by innerHTML/textContent retains its parentNode property
            if (elm.childNodes.length === 1) {
              elm.removeChild(elm.childNodes[0]);
            }
          }
          if (key === "value" && elm.tagName !== "PROGRESS") {
            // store value as _value as well since
            // non-string values will be stringified
            elm._value = cur;
            // avoid resetting cursor position when value is the same
            var strCur = isUndef(cur) ? "" : String(cur);
            if (shouldUpdateValue(elm, strCur)) {
              elm.value = strCur;
            }
          } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
            // IE doesn't support innerHTML for SVG elements
            svgContainer = svgContainer || document.createElement("div");
            svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
            var svg = svgContainer.firstChild;
            while (elm.firstChild) {
              elm.removeChild(elm.firstChild);
            }
            while (svg.firstChild) {
              elm.appendChild(svg.firstChild);
            }
          } else if (
            // skip the update if old and new VDOM state is the same.
            // `value` is handled separately because the DOM value may be temporarily
            // out of sync with VDOM state due to focus, composition and modifiers.
            // This  #4521 by skipping the unnecessary `checked` update.
            cur !== oldProps[key]
          ) {
            // some property updates can throw
            // e.g. `value` on <progress> w/ non-finite value
            try {
              elm[key] = cur;
            } catch (e) {}
          }
        }
      }
      function shouldUpdateValue(elm, checkVal) {
        return (
          //@ts-expect-error
          !elm.composing &&
          (elm.tagName === "OPTION" ||
            isNotInFocusAndDirty(elm, checkVal) ||
            isDirtyWithModifiers(elm, checkVal))
        );
      }
      function isNotInFocusAndDirty(elm, checkVal) {
        // return true when textbox (.number and .trim) loses focus and its value is
        // not equal to the updated value
        var notInFocus = true;
        // #6157
        // work around IE bug when accessing document.activeElement in an iframe
        try {
          notInFocus = document.activeElement !== elm;
        } catch (e) {}
        return notInFocus && elm.value !== checkVal;
      }
      function isDirtyWithModifiers(elm, newVal) {
        var value = elm.value;
        var modifiers = elm._vModifiers; // injected by v-model runtime
        if (isDef(modifiers)) {
          if (modifiers.number) {
            return toNumber(value) !== toNumber(newVal);
          }
          if (modifiers.trim) {
            return value.trim() !== newVal.trim();
          }
        }
        return value !== newVal;
      }
      var domProps = {
        create: updateDOMProps,
        update: updateDOMProps,
      };

      var parseStyleText = cached(function (cssText) {
        var res = {};
        var listDelimiter = /;(?![^(]*\))/g;
        var propertyDelimiter = /:(.+)/;
        cssText.split(listDelimiter).forEach(function (item) {
          if (item) {
            var tmp = item.split(propertyDelimiter);
            tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
          }
        });
        return res;
      });
      // merge static and dynamic style data on the same vnode
      function normalizeStyleData(data) {
        var style = normalizeStyleBinding(data.style);
        // static style is pre-processed into an object during compilation
        // and is always a fresh object, so it's safe to merge into it
        return data.staticStyle ? extend(data.staticStyle, style) : style;
      }
      // normalize possible array / string values into Object
      function normalizeStyleBinding(bindingStyle) {
        if (Array.isArray(bindingStyle)) {
          return toObject(bindingStyle);
        }
        if (typeof bindingStyle === "string") {
          return parseStyleText(bindingStyle);
        }
        return bindingStyle;
      }
      /**
       * parent component style should be after child's
       * so that parent component's style could override it
       */
      function getStyle(vnode, checkChild) {
        var res = {};
        var styleData;
        if (checkChild) {
          var childNode = vnode;
          while (childNode.componentInstance) {
            childNode = childNode.componentInstance._vnode;
            if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
              extend(res, styleData);
            }
          }
        }
        if ((styleData = normalizeStyleData(vnode.data))) {
          extend(res, styleData);
        }
        var parentNode = vnode;
        // @ts-expect-error parentNode.parent not VNodeWithData
        while ((parentNode = parentNode.parent)) {
          if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
            extend(res, styleData);
          }
        }
        return res;
      }

      var cssVarRE = /^--/;
      var importantRE = /\s*!important$/;
      var setProp = function (el, name, val) {
        /* istanbul ignore if */
        if (cssVarRE.test(name)) {
          el.style.setProperty(name, val);
        } else if (importantRE.test(val)) {
          el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
        } else {
          var normalizedName = normalize(name);
          if (Array.isArray(val)) {
            // Support values array created by autoprefixer, e.g.
            // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
            // Set them one by one, and the browser will only set those it can recognize
            for (var i = 0, len = val.length; i < len; i++) {
              el.style[normalizedName] = val[i];
            }
          } else {
            el.style[normalizedName] = val;
          }
        }
      };
      var vendorNames = ["Webkit", "Moz", "ms"];
      var emptyStyle;
      var normalize = cached(function (prop) {
        emptyStyle = emptyStyle || document.createElement("div").style;
        prop = camelize(prop);
        if (prop !== "filter" && prop in emptyStyle) {
          return prop;
        }
        var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
        for (var i = 0; i < vendorNames.length; i++) {
          var name_1 = vendorNames[i] + capName;
          if (name_1 in emptyStyle) {
            return name_1;
          }
        }
      });
      function updateStyle(oldVnode, vnode) {
        var data = vnode.data;
        var oldData = oldVnode.data;
        if (
          isUndef(data.staticStyle) &&
          isUndef(data.style) &&
          isUndef(oldData.staticStyle) &&
          isUndef(oldData.style)
        ) {
          return;
        }
        var cur, name;
        var el = vnode.elm;
        var oldStaticStyle = oldData.staticStyle;
        var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
        // if static style exists, stylebinding already merged into it when doing normalizeStyleData
        var oldStyle = oldStaticStyle || oldStyleBinding;
        var style = normalizeStyleBinding(vnode.data.style) || {};
        // store normalized style under a different key for next diff
        // make sure to clone it if it's reactive, since the user likely wants
        // to mutate it.
        vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
        var newStyle = getStyle(vnode, true);
        for (name in oldStyle) {
          if (isUndef(newStyle[name])) {
            setProp(el, name, "");
          }
        }
        for (name in newStyle) {
          cur = newStyle[name];
          // ie9 setting to null has no effect, must use empty string
          setProp(el, name, cur == null ? "" : cur);
        }
      }
      var style = {
        create: updateStyle,
        update: updateStyle,
      };

      var whitespaceRE = /\s+/;
      /**
       * Add class with compatibility for SVG since classList is not supported on
       * SVG elements in IE
       */
      function addClass(el, cls) {
        /* istanbul ignore if */
        if (!cls || !(cls = cls.trim())) {
          return;
        }
        /* istanbul ignore else */
        if (el.classList) {
          if (cls.indexOf(" ") > -1) {
            cls.split(whitespaceRE).forEach(function (c) {
              return el.classList.add(c);
            });
          } else {
            el.classList.add(cls);
          }
        } else {
          var cur = " ".concat(el.getAttribute("class") || "", " ");
          if (cur.indexOf(" " + cls + " ") < 0) {
            el.setAttribute("class", (cur + cls).trim());
          }
        }
      }
      /**
       * Remove class with compatibility for SVG since classList is not supported on
       * SVG elements in IE
       */
      function removeClass(el, cls) {
        /* istanbul ignore if */
        if (!cls || !(cls = cls.trim())) {
          return;
        }
        /* istanbul ignore else */
        if (el.classList) {
          if (cls.indexOf(" ") > -1) {
            cls.split(whitespaceRE).forEach(function (c) {
              return el.classList.remove(c);
            });
          } else {
            el.classList.remove(cls);
          }
          if (!el.classList.length) {
            el.removeAttribute("class");
          }
        } else {
          var cur = " ".concat(el.getAttribute("class") || "", " ");
          var tar = " " + cls + " ";
          while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, " ");
          }
          cur = cur.trim();
          if (cur) {
            el.setAttribute("class", cur);
          } else {
            el.removeAttribute("class");
          }
        }
      }

      function resolveTransition(def) {
        if (!def) {
          return;
        }
        /* istanbul ignore else */
        if (typeof def === "object") {
          var res = {};
          if (def.css !== false) {
            extend(res, autoCssTransition(def.name || "v"));
          }
          extend(res, def);
          return res;
        } else if (typeof def === "string") {
          return autoCssTransition(def);
        }
      }
      var autoCssTransition = cached(function (name) {
        return {
          enterClass: "".concat(name, "-enter"),
          enterToClass: "".concat(name, "-enter-to"),
          enterActiveClass: "".concat(name, "-enter-active"),
          leaveClass: "".concat(name, "-leave"),
          leaveToClass: "".concat(name, "-leave-to"),
          leaveActiveClass: "".concat(name, "-leave-active"),
        };
      });
      var hasTransition = inBrowser && !isIE9;
      var TRANSITION = "transition";
      var ANIMATION = "animation";
      // Transition property/event sniffing
      var transitionProp = "transition";
      var transitionEndEvent = "transitionend";
      var animationProp = "animation";
      var animationEndEvent = "animationend";
      if (hasTransition) {
        /* istanbul ignore if */
        if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
          transitionProp = "WebkitTransition";
          transitionEndEvent = "webkitTransitionEnd";
        }
        if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
          animationProp = "WebkitAnimation";
          animationEndEvent = "webkitAnimationEnd";
        }
      }
      // binding to window is necessary to make hot reload work in IE in strict mode
      var raf = inBrowser
        ? window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : setTimeout
        : /* istanbul ignore next */ function (/* istanbul ignore next */ fn) {
            return fn();
          };
      function nextFrame(fn) {
        raf(function () {
          // @ts-expect-error
          raf(fn);
        });
      }
      function addTransitionClass(el, cls) {
        var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
        if (transitionClasses.indexOf(cls) < 0) {
          transitionClasses.push(cls);
          addClass(el, cls);
        }
      }
      function removeTransitionClass(el, cls) {
        if (el._transitionClasses) {
          remove$2(el._transitionClasses, cls);
        }
        removeClass(el, cls);
      }
      function whenTransitionEnds(el, expectedType, cb) {
        var _a = getTransitionInfo(el, expectedType),
          type = _a.type,
          timeout = _a.timeout,
          propCount = _a.propCount;
        if (!type) return cb();
        var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
        var ended = 0;
        var end = function () {
          el.removeEventListener(event, onEnd);
          cb();
        };
        var onEnd = function (e) {
          if (e.target === el) {
            if (++ended >= propCount) {
              end();
            }
          }
        };
        setTimeout(function () {
          if (ended < propCount) {
            end();
          }
        }, timeout + 1);
        el.addEventListener(event, onEnd);
      }
      var transformRE = /\b(transform|all)(,|$)/;
      function getTransitionInfo(el, expectedType) {
        var styles = window.getComputedStyle(el);
        // JSDOM may return undefined for transition properties
        var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
        var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
        var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
        var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
        var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
        var animationTimeout = getTimeout(animationDelays, animationDurations);
        var type;
        var timeout = 0;
        var propCount = 0;
        /* istanbul ignore if */
        if (expectedType === TRANSITION) {
          if (transitionTimeout > 0) {
            type = TRANSITION;
            timeout = transitionTimeout;
            propCount = transitionDurations.length;
          }
        } else if (expectedType === ANIMATION) {
          if (animationTimeout > 0) {
            type = ANIMATION;
            timeout = animationTimeout;
            propCount = animationDurations.length;
          }
        } else {
          timeout = Math.max(transitionTimeout, animationTimeout);
          type =
            timeout > 0 ? (transitionTimeout > animationTimeout ? TRANSITION : ANIMATION) : null;
          propCount = type
            ? type === TRANSITION
              ? transitionDurations.length
              : animationDurations.length
            : 0;
        }
        var hasTransform =
          type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
        return {
          type: type,
          timeout: timeout,
          propCount: propCount,
          hasTransform: hasTransform,
        };
      }
      function getTimeout(delays, durations) {
        /* istanbul ignore next */
        while (delays.length < durations.length) {
          delays = delays.concat(delays);
        }
        return Math.max.apply(
          null,
          durations.map(function (d, i) {
            return toMs(d) + toMs(delays[i]);
          }),
        );
      }
      // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
      // in a locale-dependent way, using a comma instead of a dot.
      // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
      // as a floor function) causing unexpected behaviors
      function toMs(s) {
        return Number(s.slice(0, -1).replace(",", ".")) * 1000;
      }

      function enter(vnode, toggleDisplay) {
        var el = vnode.elm;
        // call leave callback now
        if (isDef(el._leaveCb)) {
          el._leaveCb.cancelled = true;
          el._leaveCb();
        }
        var data = resolveTransition(vnode.data.transition);
        if (isUndef(data)) {
          return;
        }
        /* istanbul ignore if */
        if (isDef(el._enterCb) || el.nodeType !== 1) {
          return;
        }
        var css = data.css,
          type = data.type,
          enterClass = data.enterClass,
          enterToClass = data.enterToClass,
          enterActiveClass = data.enterActiveClass,
          appearClass = data.appearClass,
          appearToClass = data.appearToClass,
          appearActiveClass = data.appearActiveClass,
          beforeEnter = data.beforeEnter,
          enter = data.enter,
          afterEnter = data.afterEnter,
          enterCancelled = data.enterCancelled,
          beforeAppear = data.beforeAppear,
          appear = data.appear,
          afterAppear = data.afterAppear,
          appearCancelled = data.appearCancelled,
          duration = data.duration;
        // activeInstance will always be the <transition> component managing this
        // transition. One edge case to check is when the <transition> is placed
        // as the root node of a child component. In that case we need to check
        // <transition>'s parent for appear check.
        var context = activeInstance;
        var transitionNode = activeInstance.$vnode;
        while (transitionNode && transitionNode.parent) {
          context = transitionNode.context;
          transitionNode = transitionNode.parent;
        }
        var isAppear = !context._isMounted || !vnode.isRootInsert;
        if (isAppear && !appear && appear !== "") {
          return;
        }
        var startClass = isAppear && appearClass ? appearClass : enterClass;
        var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
        var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
        var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
        var enterHook = isAppear ? (isFunction(appear) ? appear : enter) : enter;
        var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
        var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
        var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
        if (false) {
        }
        var expectsCSS = css !== false && !isIE9;
        var userWantsControl = getHookArgumentsLength(enterHook);
        var cb = (el._enterCb = once(function () {
          if (expectsCSS) {
            removeTransitionClass(el, toClass);
            removeTransitionClass(el, activeClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
            if (expectsCSS) {
              removeTransitionClass(el, startClass);
            }
            enterCancelledHook && enterCancelledHook(el);
          } else {
            afterEnterHook && afterEnterHook(el);
          }
          el._enterCb = null;
        }));
        if (!vnode.data.show) {
          // remove pending leave element on enter by injecting an insert hook
          mergeVNodeHook(vnode, "insert", function () {
            var parent = el.parentNode;
            var pendingNode = parent && parent._pending && parent._pending[vnode.key];
            if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
              pendingNode.elm._leaveCb();
            }
            enterHook && enterHook(el, cb);
          });
        }
        // start enter transition
        beforeEnterHook && beforeEnterHook(el);
        if (expectsCSS) {
          addTransitionClass(el, startClass);
          addTransitionClass(el, activeClass);
          nextFrame(function () {
            removeTransitionClass(el, startClass);
            // @ts-expect-error
            if (!cb.cancelled) {
              addTransitionClass(el, toClass);
              if (!userWantsControl) {
                if (isValidDuration(explicitEnterDuration)) {
                  setTimeout(cb, explicitEnterDuration);
                } else {
                  whenTransitionEnds(el, type, cb);
                }
              }
            }
          });
        }
        if (vnode.data.show) {
          toggleDisplay && toggleDisplay();
          enterHook && enterHook(el, cb);
        }
        if (!expectsCSS && !userWantsControl) {
          cb();
        }
      }
      function leave(vnode, rm) {
        var el = vnode.elm;
        // call enter callback now
        if (isDef(el._enterCb)) {
          el._enterCb.cancelled = true;
          el._enterCb();
        }
        var data = resolveTransition(vnode.data.transition);
        if (isUndef(data) || el.nodeType !== 1) {
          return rm();
        }
        /* istanbul ignore if */
        if (isDef(el._leaveCb)) {
          return;
        }
        var css = data.css,
          type = data.type,
          leaveClass = data.leaveClass,
          leaveToClass = data.leaveToClass,
          leaveActiveClass = data.leaveActiveClass,
          beforeLeave = data.beforeLeave,
          leave = data.leave,
          afterLeave = data.afterLeave,
          leaveCancelled = data.leaveCancelled,
          delayLeave = data.delayLeave,
          duration = data.duration;
        var expectsCSS = css !== false && !isIE9;
        var userWantsControl = getHookArgumentsLength(leave);
        var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
        if (false) {
        }
        var cb = (el._leaveCb = once(function () {
          if (el.parentNode && el.parentNode._pending) {
            el.parentNode._pending[vnode.key] = null;
          }
          if (expectsCSS) {
            removeTransitionClass(el, leaveToClass);
            removeTransitionClass(el, leaveActiveClass);
          }
          // @ts-expect-error
          if (cb.cancelled) {
            if (expectsCSS) {
              removeTransitionClass(el, leaveClass);
            }
            leaveCancelled && leaveCancelled(el);
          } else {
            rm();
            afterLeave && afterLeave(el);
          }
          el._leaveCb = null;
        }));
        if (delayLeave) {
          delayLeave(performLeave);
        } else {
          performLeave();
        }
        function performLeave() {
          // the delayed leave may have already been cancelled
          // @ts-expect-error
          if (cb.cancelled) {
            return;
          }
          // record leaving element
          if (!vnode.data.show && el.parentNode) {
            (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
          }
          beforeLeave && beforeLeave(el);
          if (expectsCSS) {
            addTransitionClass(el, leaveClass);
            addTransitionClass(el, leaveActiveClass);
            nextFrame(function () {
              removeTransitionClass(el, leaveClass);
              // @ts-expect-error
              if (!cb.cancelled) {
                addTransitionClass(el, leaveToClass);
                if (!userWantsControl) {
                  if (isValidDuration(explicitLeaveDuration)) {
                    setTimeout(cb, explicitLeaveDuration);
                  } else {
                    whenTransitionEnds(el, type, cb);
                  }
                }
              }
            });
          }
          leave && leave(el, cb);
          if (!expectsCSS && !userWantsControl) {
            cb();
          }
        }
      }
      // only used in dev mode
      function checkDuration(val, name, vnode) {
        if (typeof val !== "number") {
          warn(
            "<transition> explicit ".concat(name, " duration is not a valid number - ") +
              "got ".concat(JSON.stringify(val), "."),
            vnode.context,
          );
        } else if (isNaN(val)) {
          warn(
            "<transition> explicit ".concat(name, " duration is NaN - ") +
              "the duration expression might be incorrect.",
            vnode.context,
          );
        }
      }
      function isValidDuration(val) {
        return typeof val === "number" && !isNaN(val);
      }
      /**
       * Normalize a transition hook's argument length. The hook may be:
       * - a merged hook (invoker) with the original in .fns
       * - a wrapped component method (check ._length)
       * - a plain function (.length)
       */
      function getHookArgumentsLength(fn) {
        if (isUndef(fn)) {
          return false;
        }
        // @ts-expect-error
        var invokerFns = fn.fns;
        if (isDef(invokerFns)) {
          // invoker
          return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
        } else {
          // @ts-expect-error
          return (fn._length || fn.length) > 1;
        }
      }
      function _enter(_, vnode) {
        if (vnode.data.show !== true) {
          enter(vnode);
        }
      }
      var transition = inBrowser
        ? {
            create: _enter,
            activate: _enter,
            remove: function (vnode, rm) {
              /* istanbul ignore else */
              if (vnode.data.show !== true) {
                // @ts-expect-error
                leave(vnode, rm);
              } else {
                rm();
              }
            },
          }
        : {};

      var platformModules = [attrs, klass, events, domProps, style, transition];

      // the directive module should be applied last, after all
      // built-in modules have been applied.
      var modules = platformModules.concat(baseModules);
      var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

      /**
       * Not type checking this file because flow doesn't like attaching
       * properties to Elements.
       */
      /* istanbul ignore if */
      if (isIE9) {
        // http://www.matts411.com/post/internet-explorer-9-oninput/
        document.addEventListener("selectionchange", function () {
          var el = document.activeElement;
          // @ts-expect-error
          if (el && el.vmodel) {
            trigger(el, "input");
          }
        });
      }
      var directive = {
        inserted: function (el, binding, vnode, oldVnode) {
          if (vnode.tag === "select") {
            // #6903
            if (oldVnode.elm && !oldVnode.elm._vOptions) {
              mergeVNodeHook(vnode, "postpatch", function () {
                directive.componentUpdated(el, binding, vnode);
              });
            } else {
              setSelected(el, binding, vnode.context);
            }
            el._vOptions = [].map.call(el.options, getValue);
          } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
            el._vModifiers = binding.modifiers;
            if (!binding.modifiers.lazy) {
              el.addEventListener("compositionstart", onCompositionStart);
              el.addEventListener("compositionend", onCompositionEnd);
              // Safari < 10.2 & UIWebView doesn't fire compositionend when
              // switching focus before confirming composition choice
              // this also fixes the issue where some browsers e.g. iOS Chrome
              // fires "change" instead of "input" on autocomplete.
              el.addEventListener("change", onCompositionEnd);
              /* istanbul ignore if */
              if (isIE9) {
                el.vmodel = true;
              }
            }
          }
        },
        componentUpdated: function (el, binding, vnode) {
          if (vnode.tag === "select") {
            setSelected(el, binding, vnode.context);
            // in case the options rendered by v-for have changed,
            // it's possible that the value is out-of-sync with the rendered options.
            // detect such cases and filter out values that no longer has a matching
            // option in the DOM.
            var prevOptions_1 = el._vOptions;
            var curOptions_1 = (el._vOptions = [].map.call(el.options, getValue));
            if (
              curOptions_1.some(function (o, i) {
                return !looseEqual(o, prevOptions_1[i]);
              })
            ) {
              // trigger change event if
              // no matching option found for at least one value
              var needReset = el.multiple
                ? binding.value.some(function (v) {
                    return hasNoMatchingOption(v, curOptions_1);
                  })
                : binding.value !== binding.oldValue &&
                  hasNoMatchingOption(binding.value, curOptions_1);
              if (needReset) {
                trigger(el, "change");
              }
            }
          }
        },
      };
      function setSelected(el, binding, vm) {
        actuallySetSelected(el, binding, vm);
        /* istanbul ignore if */
        if (isIE || isEdge) {
          setTimeout(function () {
            actuallySetSelected(el, binding, vm);
          }, 0);
        }
      }
      function actuallySetSelected(el, binding, vm) {
        var value = binding.value;
        var isMultiple = el.multiple;
        if (isMultiple && !Array.isArray(value)) {
          false && false;
          return;
        }
        var selected, option;
        for (var i = 0, l = el.options.length; i < l; i++) {
          option = el.options[i];
          if (isMultiple) {
            selected = looseIndexOf(value, getValue(option)) > -1;
            if (option.selected !== selected) {
              option.selected = selected;
            }
          } else {
            if (looseEqual(getValue(option), value)) {
              if (el.selectedIndex !== i) {
                el.selectedIndex = i;
              }
              return;
            }
          }
        }
        if (!isMultiple) {
          el.selectedIndex = -1;
        }
      }
      function hasNoMatchingOption(value, options) {
        return options.every(function (o) {
          return !looseEqual(o, value);
        });
      }
      function getValue(option) {
        return "_value" in option ? option._value : option.value;
      }
      function onCompositionStart(e) {
        e.target.composing = true;
      }
      function onCompositionEnd(e) {
        // prevent triggering an input event for no reason
        if (!e.target.composing) return;
        e.target.composing = false;
        trigger(e.target, "input");
      }
      function trigger(el, type) {
        var e = document.createEvent("HTMLEvents");
        e.initEvent(type, true, true);
        el.dispatchEvent(e);
      }

      // recursively search for possible transition defined inside the component root
      function locateNode(vnode) {
        // @ts-expect-error
        return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
          ? locateNode(vnode.componentInstance._vnode)
          : vnode;
      }
      var show = {
        bind: function (el, _a, vnode) {
          var value = _a.value;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          var originalDisplay = (el.__vOriginalDisplay =
            el.style.display === "none" ? "" : el.style.display);
          if (value && transition) {
            vnode.data.show = true;
            enter(vnode, function () {
              el.style.display = originalDisplay;
            });
          } else {
            el.style.display = value ? originalDisplay : "none";
          }
        },
        update: function (el, _a, vnode) {
          var value = _a.value,
            oldValue = _a.oldValue;
          /* istanbul ignore if */
          if (!value === !oldValue) return;
          vnode = locateNode(vnode);
          var transition = vnode.data && vnode.data.transition;
          if (transition) {
            vnode.data.show = true;
            if (value) {
              enter(vnode, function () {
                el.style.display = el.__vOriginalDisplay;
              });
            } else {
              leave(vnode, function () {
                el.style.display = "none";
              });
            }
          } else {
            el.style.display = value ? el.__vOriginalDisplay : "none";
          }
        },
        unbind: function (el, binding, vnode, oldVnode, isDestroy) {
          if (!isDestroy) {
            el.style.display = el.__vOriginalDisplay;
          }
        },
      };

      var platformDirectives = {
        model: directive,
        show: show,
      };

      // Provides transition support for a single element/component.
      var transitionProps = {
        name: String,
        appear: Boolean,
        css: Boolean,
        mode: String,
        type: String,
        enterClass: String,
        leaveClass: String,
        enterToClass: String,
        leaveToClass: String,
        enterActiveClass: String,
        leaveActiveClass: String,
        appearClass: String,
        appearActiveClass: String,
        appearToClass: String,
        duration: [Number, String, Object],
      };
      // in case the child is also an abstract component, e.g. <keep-alive>
      // we want to recursively retrieve the real component to be rendered
      function getRealChild(vnode) {
        var compOptions = vnode && vnode.componentOptions;
        if (compOptions && compOptions.Ctor.options.abstract) {
          return getRealChild(getFirstComponentChild(compOptions.children));
        } else {
          return vnode;
        }
      }
      function extractTransitionData(comp) {
        var data = {};
        var options = comp.$options;
        // props
        for (var key in options.propsData) {
          data[key] = comp[key];
        }
        // events.
        // extract listeners and pass them directly to the transition methods
        var listeners = options._parentListeners;
        for (var key in listeners) {
          data[camelize(key)] = listeners[key];
        }
        return data;
      }
      function placeholder(h, rawChild) {
        // @ts-expect-error
        if (/\d-keep-alive$/.test(rawChild.tag)) {
          return h("keep-alive", {
            props: rawChild.componentOptions.propsData,
          });
        }
      }
      function hasParentTransition(vnode) {
        while ((vnode = vnode.parent)) {
          if (vnode.data.transition) {
            return true;
          }
        }
      }
      function isSameChild(child, oldChild) {
        return oldChild.key === child.key && oldChild.tag === child.tag;
      }
      var isNotTextNode = function (c) {
        return c.tag || isAsyncPlaceholder(c);
      };
      var isVShowDirective = function (d) {
        return d.name === "show";
      };
      var Transition = {
        name: "transition",
        props: transitionProps,
        abstract: true,
        render: function (h) {
          var _this = this;
          var children = this.$slots.default;
          if (!children) {
            return;
          }
          // filter out text nodes (possible whitespaces)
          children = children.filter(isNotTextNode);
          /* istanbul ignore if */
          if (!children.length) {
            return;
          }
          // warn multiple elements
          if (false) {
          }
          var mode = this.mode;
          // warn invalid mode
          if (false) {
          }
          var rawChild = children[0];
          // if this is a component root node and the component's
          // parent container node also has transition, skip.
          if (hasParentTransition(this.$vnode)) {
            return rawChild;
          }
          // apply transition data to child
          // use getRealChild() to ignore abstract components e.g. keep-alive
          var child = getRealChild(rawChild);
          /* istanbul ignore if */
          if (!child) {
            return rawChild;
          }
          if (this._leaving) {
            return placeholder(h, rawChild);
          }
          // ensure a key that is unique to the vnode type and to this transition
          // component instance. This key will be used to remove pending leaving nodes
          // during entering.
          var id = "__transition-".concat(this._uid, "-");
          child.key =
            child.key == null
              ? child.isComment
                ? id + "comment"
                : id + child.tag
              : isPrimitive(child.key)
                ? String(child.key).indexOf(id) === 0
                  ? child.key
                  : id + child.key
                : child.key;
          var data = ((child.data || (child.data = {})).transition = extractTransitionData(this));
          var oldRawChild = this._vnode;
          var oldChild = getRealChild(oldRawChild);
          // mark v-show
          // so that the transition module can hand over the control to the directive
          if (child.data.directives && child.data.directives.some(isVShowDirective)) {
            child.data.show = true;
          }
          if (
            oldChild &&
            oldChild.data &&
            !isSameChild(child, oldChild) &&
            !isAsyncPlaceholder(oldChild) &&
            // #6687 component root is a comment node
            !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
          ) {
            // replace old child transition data with fresh one
            // important for dynamic transitions!
            var oldData = (oldChild.data.transition = extend({}, data));
            // handle transition mode
            if (mode === "out-in") {
              // return placeholder node and queue update when leave finishes
              this._leaving = true;
              mergeVNodeHook(oldData, "afterLeave", function () {
                _this._leaving = false;
                _this.$forceUpdate();
              });
              return placeholder(h, rawChild);
            } else if (mode === "in-out") {
              if (isAsyncPlaceholder(child)) {
                return oldRawChild;
              }
              var delayedLeave_1;
              var performLeave = function () {
                delayedLeave_1();
              };
              mergeVNodeHook(data, "afterEnter", performLeave);
              mergeVNodeHook(data, "enterCancelled", performLeave);
              mergeVNodeHook(oldData, "delayLeave", function (leave) {
                delayedLeave_1 = leave;
              });
            }
          }
          return rawChild;
        },
      };

      // Provides transition support for list items.
      var props = extend(
        {
          tag: String,
          moveClass: String,
        },
        transitionProps,
      );
      delete props.mode;
      var TransitionGroup = {
        props: props,
        beforeMount: function () {
          var _this = this;
          var update = this._update;
          this._update = function (vnode, hydrating) {
            var restoreActiveInstance = setActiveInstance(_this);
            // force removing pass
            _this.__patch__(
              _this._vnode,
              _this.kept,
              false, // hydrating
              true, // removeOnly (!important, avoids unnecessary moves)
            );
            _this._vnode = _this.kept;
            restoreActiveInstance();
            update.call(_this, vnode, hydrating);
          };
        },
        render: function (h) {
          var tag = this.tag || this.$vnode.data.tag || "span";
          var map = Object.create(null);
          var prevChildren = (this.prevChildren = this.children);
          var rawChildren = this.$slots.default || [];
          var children = (this.children = []);
          var transitionData = extractTransitionData(this);
          for (var i = 0; i < rawChildren.length; i++) {
            var c = rawChildren[i];
            if (c.tag) {
              if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
                children.push(c);
                map[c.key] = c;
                (c.data || (c.data = {})).transition = transitionData;
              } else if (false) {
                var name_1, opts;
              }
            }
          }
          if (prevChildren) {
            var kept = [];
            var removed = [];
            for (var i = 0; i < prevChildren.length; i++) {
              var c = prevChildren[i];
              c.data.transition = transitionData;
              // @ts-expect-error .getBoundingClientRect is not typed in Node
              c.data.pos = c.elm.getBoundingClientRect();
              if (map[c.key]) {
                kept.push(c);
              } else {
                removed.push(c);
              }
            }
            this.kept = h(tag, null, kept);
            this.removed = removed;
          }
          return h(tag, null, children);
        },
        updated: function () {
          var children = this.prevChildren;
          var moveClass = this.moveClass || (this.name || "v") + "-move";
          if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
            return;
          }
          // we divide the work into three loops to avoid mixing DOM reads and writes
          // in each iteration - which helps prevent layout thrashing.
          children.forEach(callPendingCbs);
          children.forEach(recordPosition);
          children.forEach(applyTranslation);
          // force reflow to put everything in position
          // assign to this to avoid being removed in tree-shaking
          // $flow-disable-line
          this._reflow = document.body.offsetHeight;
          children.forEach(function (c) {
            if (c.data.moved) {
              var el_1 = c.elm;
              var s = el_1.style;
              addTransitionClass(el_1, moveClass);
              s.transform = s.WebkitTransform = s.transitionDuration = "";
              el_1.addEventListener(
                transitionEndEvent,
                (el_1._moveCb = function cb(e) {
                  if (e && e.target !== el_1) {
                    return;
                  }
                  if (!e || /transform$/.test(e.propertyName)) {
                    el_1.removeEventListener(transitionEndEvent, cb);
                    el_1._moveCb = null;
                    removeTransitionClass(el_1, moveClass);
                  }
                }),
              );
            }
          });
        },
        methods: {
          hasMove: function (el, moveClass) {
            /* istanbul ignore if */
            if (!hasTransition) {
              return false;
            }
            /* istanbul ignore if */
            if (this._hasMove) {
              return this._hasMove;
            }
            // Detect whether an element with the move class applied has
            // CSS transitions. Since the element may be inside an entering
            // transition at this very moment, we make a clone of it and remove
            // all other transition classes applied to ensure only the move class
            // is applied.
            var clone = el.cloneNode();
            if (el._transitionClasses) {
              el._transitionClasses.forEach(function (cls) {
                removeClass(clone, cls);
              });
            }
            addClass(clone, moveClass);
            clone.style.display = "none";
            this.$el.appendChild(clone);
            var info = getTransitionInfo(clone);
            this.$el.removeChild(clone);
            return (this._hasMove = info.hasTransform);
          },
        },
      };
      function callPendingCbs(c) {
        /* istanbul ignore if */
        if (c.elm._moveCb) {
          c.elm._moveCb();
        }
        /* istanbul ignore if */
        if (c.elm._enterCb) {
          c.elm._enterCb();
        }
      }
      function recordPosition(c) {
        c.data.newPos = c.elm.getBoundingClientRect();
      }
      function applyTranslation(c) {
        var oldPos = c.data.pos;
        var newPos = c.data.newPos;
        var dx = oldPos.left - newPos.left;
        var dy = oldPos.top - newPos.top;
        if (dx || dy) {
          c.data.moved = true;
          var s = c.elm.style;
          s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
          s.transitionDuration = "0s";
        }
      }

      var platformComponents = {
        Transition: Transition,
        TransitionGroup: TransitionGroup,
      };

      // install platform specific utils
      Vue.config.mustUseProp = mustUseProp;
      Vue.config.isReservedTag = isReservedTag;
      Vue.config.isReservedAttr = isReservedAttr;
      Vue.config.getTagNamespace = getTagNamespace;
      Vue.config.isUnknownElement = isUnknownElement;
      // install platform runtime directives & components
      extend(Vue.options.directives, platformDirectives);
      extend(Vue.options.components, platformComponents);
      // install platform patch function
      Vue.prototype.__patch__ = inBrowser ? patch : noop;
      // public mount method
      Vue.prototype.$mount = function (el, hydrating) {
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el, hydrating);
      };
      // devtools global hook
      /* istanbul ignore next */
      if (inBrowser) {
        setTimeout(function () {
          if (config.devtools) {
            if (devtools) {
              devtools.emit("init", Vue);
            } else if (false) {
            }
          }
          if (false) {
          }
        }, 0);
      }

      /***/
    },

    /***/ "2f3a": /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // EXTERNAL MODULE: ./src/utils/i18/index.js + 1 modules
      var i18 = __webpack_require__("188f");

      // CONCATENATED MODULE: ./src/js/content-btn-template.js

      function createDownloadBtn(type, isMulti) {
        let btn_class = "",
          btn_text = "",
          data_text = "FORCE DOWNLOAD";
        switch (type) {
          case "image":
            btn_class = "download-images down_btn_img";
            btn_text = i18["a" /* default */].t("dialog.butImg");
            break;
          case "video":
            btn_class = "download-videos down_btn_video";
            btn_text = i18["a" /* default */].t("dialog.butVideo");
            break;
          case "music":
            btn_class = "download-videos down_btn_music";
            btn_text = i18["a" /* default */].t("dialog.butMusic");
            break;
          default:
            break;
        }
        const btn_warrper_box = document.createElement("div");
        const btn_inner_box = document.createElement("div");
        const btn = document.createElement("button");
        btn_warrper_box.className = isMulti
          ? "content-teleram-script check-all-download"
          : "content-teleram-script";
        btn_inner_box.className = "downloadBtnIns";
        btn.className = isMulti ? "download-checkbox-all" : `${btn_class}`;
        btn.innerText = isMulti ? i18["a" /* default */].t("dialog.butAllFile") : btn_text;
        btn.setAttribute("data-text", data_text);
        let logo = injectLogo();
        btn_inner_box.appendChild(logo);
        btn_inner_box.appendChild(btn);
        btn_warrper_box.appendChild(btn_inner_box);
        return btn_warrper_box;
      }
      function creatDownloadBtnsProgress() {
        const progressDiv = document.createElement("div");
        progressDiv.className = "progress-teleram-script";
        const process_box = document.createElement("div");
        process_box.className = "content-teleram-script  down_btn_progress";
        progressDiv.appendChild(process_box);
        return progressDiv;
      }
      function creatDownloadCheckBox() {
        const checkbox_box = document.createElement("input");
        checkbox_box.className = "download-check-item";
        checkbox_box.type = "checkbox";
        checkbox_box.name = "checkbox-down";
        checkbox_box.value = "down_btn_checkbox";
        checkbox_box.checked = true;
        return checkbox_box;
      }

      function cteateDownloadAllMonthBtn() {
        let downloadParent = document.createElement("div");
        let downloadButton = document.createElement("button");
        downloadParent.className = "download-click-div tgMedia";
        downloadButton.className =
          "download-click-all download-click-btn downloadvideo download-videos";
        downloadParent.style.top = "80px";
        downloadButton.innerText = "Download all Media";
        downloadButton.setAttribute("data-text", "Download all Media");
        let logo = injectLogo();
        downloadButton.appendChild(logo);
        downloadParent.appendChild(downloadButton);
        return downloadParent;
      }
      function createDownloadMonthBtn() {
        let month_downloadButton = document.createElement("button");
        month_downloadButton.className =
          "download-click-month  download-click-btn downloadvideo download-videos";
        month_downloadButton.innerText = i18["a" /* default */].t("dialog.downloadMonth");
        let logo = injectLogo();
        month_downloadButton.appendChild(logo);
        return month_downloadButton;
      }
      function createDownloadAllStoryBtn() {
        let downloadParent = document.createElement("div");
        let downloadButton = document.createElement("button");
        downloadParent.className = "download-click-div tgStory";
        downloadButton.className =
          "download-click-all download-click-btn downloadvideo download-videos";
        downloadParent.style.top = "20px";
        downloadButton.innerText = "Download all Stories";
        downloadButton.setAttribute("data-text", "Download all Stories");
        let logo = injectLogo();
        downloadButton.appendChild(logo);
        downloadParent.appendChild(downloadButton);
        return downloadParent;
      }
      function createDownloadStoryMediaBtn() {
        let downloadButton = document.createElement("button");
        downloadButton.className =
          "download-click-one  download-click-btn downloadvideo download-videos";
        downloadButton.innerText = "Download";
        downloadButton.setAttribute("data-text", "Download");
        let logo = injectLogo();
        downloadButton.appendChild(logo);
        return downloadButton;
      }
      function injectLogo() {
        const logo = document.createElement("img");
        logo.src = chrome.runtime.getURL("/assets/image/logo.png");
        logo.className = "logo-img";
        return logo;
      }

      // EXTERNAL MODULE: ./src/css/main.css
      var main = __webpack_require__("585e");

      // CONCATENATED MODULE: ./src/js/content-telegram.js
      (() => {
        /**
         * Inject download button into container
         * @param {*} container parent element
         * @param {*} type Type of injection video || image
         * @param {*} htmlTemplate HTML template
         * @param {*} injectBox elements to inject
         */
        const injectDownloadButton = (container, type, htmlTemplate, injectBox) => {
          let attachmentMed = null;
          const existingButton = container.querySelector(`.down_btn_${type}`);
          if (injectBox !== "attachment") {
            attachmentMed = injectBox;
          } else {
            attachmentMed = container;
          }

          // delete previous dom Adding again dom Consuming performance, it is judged instead that the same dom No more appending。
          if (!existingButton) {
            const buttonDiv = document.createElement("div");
            buttonDiv.className = `${type}-teleram-script`;
            buttonDiv.appendChild(htmlTemplate);
            if (attachmentMed) {
              attachmentMed.appendChild(buttonDiv.firstChild);
            }
          }
        };

        /**
         * Trigger custom download event
         * @param {*} eventType event type: single or batch
         * @param {*} downloadUrl video or picture URL
         * @param {*} bin_index download ID
         * @param {*} downType Download type: image || video
         * @param {*} container parent element
         */
        let maxProgress = -Infinity;
        function extractStreamIdPath(url = "") {
          if (!String(url).includes("stream/")) return "";
          try {
            var _payload$location;
            const payload = JSON.parse(
              decodeURIComponent(
                String(url)
                  .substring(String(url).indexOf("stream/") + 7)
                  .split("?")[0],
              ),
            );
            return String(
              (payload === null ||
              payload === void 0 ||
              (_payload$location = payload.location) === null ||
              _payload$location === void 0
                ? void 0
                : _payload$location.id) || "",
            );
          } catch (e) {
            return "";
          }
        }
        function getBubbleMediaId(element) {
          var _element$getAttribute,
            _element$closest,
            _element$closest$getA,
            _element$closest2,
            _element$closest2$get,
            _element$querySelecto,
            _element$querySelecto2;
          return (
            (element === null ||
            element === void 0 ||
            (_element$getAttribute = element.getAttribute) === null ||
            _element$getAttribute === void 0
              ? void 0
              : _element$getAttribute.call(element, "data-mid")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest = element.closest) === null ||
            _element$closest === void 0 ||
            (_element$closest = _element$closest.call(element, "[data-mid]")) === null ||
            _element$closest === void 0 ||
            (_element$closest$getA = _element$closest.getAttribute) === null ||
            _element$closest$getA === void 0
              ? void 0
              : _element$closest$getA.call(_element$closest, "data-mid")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest2 = element.closest) === null ||
            _element$closest2 === void 0 ||
            (_element$closest2 = _element$closest2.call(element, "[data-message-id]")) === null ||
            _element$closest2 === void 0 ||
            (_element$closest2$get = _element$closest2.getAttribute) === null ||
            _element$closest2$get === void 0
              ? void 0
              : _element$closest2$get.call(_element$closest2, "data-message-id")) ||
            (element === null ||
            element === void 0 ||
            (_element$querySelecto = element.querySelector) === null ||
            _element$querySelecto === void 0 ||
            (_element$querySelecto = _element$querySelecto.call(element, "[data-mid]")) === null ||
            _element$querySelecto === void 0 ||
            (_element$querySelecto2 = _element$querySelecto.getAttribute) === null ||
            _element$querySelecto2 === void 0
              ? void 0
              : _element$querySelecto2.call(_element$querySelecto, "data-mid")) ||
            ""
          );
        }
        const attachDownloadProgressListener = (container, progressId) => {
          if (!container || !progressId) return () => {};
          const eventName = progressId + "_video_download_progress";
          const onProgress = (value) => {
            var _value$detail;
            const downBtnProgress = container.querySelector(".down_btn_progress");
            const downBtnVideo = container.querySelector(".down_btn_video");
            const downBtnMusic = container.querySelector(".down_btn_music");
            const checkAllDownload = container.querySelector(".check-all-download");
            const progress =
              value === null ||
              value === void 0 ||
              (_value$detail = value.detail) === null ||
              _value$detail === void 0
                ? void 0
                : _value$detail.progress;
            if (progress !== null && progress !== "100.00" && progress !== "100") {
              let progContent = progress;
              if (downBtnVideo) downBtnVideo.style.display = "none";
              if (downBtnMusic) downBtnMusic.style.display = "none";
              if (checkAllDownload) {
                checkAllDownload.style.display = "none";
                const parsed = parseInt(progress, 10);
                if (!Number.isNaN(parsed)) {
                  maxProgress = Math.max(maxProgress, parsed);
                  progContent = maxProgress;
                }
              }
              let progressNode = downBtnProgress;
              if (!progressNode) {
                container.appendChild(creatDownloadBtnsProgress());
                progressNode = container.querySelector(".down_btn_progress");
              }
              if (progressNode) {
                progressNode.style.display = "block";
                progressNode.innerHTML = `${i18["a" /* default */].t("dialog.progressText")} ${progContent}%`;
              }
              return;
            }
            if (downBtnVideo) downBtnVideo.style.display = "block";
            if (downBtnMusic) downBtnMusic.style.display = "block";
            if (checkAllDownload) checkAllDownload.style.display = "flex";
            if (downBtnProgress) downBtnProgress.style.display = "none";
          };
          document.addEventListener(eventName, onProgress);
          return () => document.removeEventListener(eventName, onProgress);
        };
        const waitForDownloadDone = (ids, timeout = 180000) => {
          const wanted = new Set(
            (Array.isArray(ids) ? ids : [ids]).map((id) => String(id || "")).filter(Boolean),
          );
          if (!wanted.size) return Promise.resolve(false);
          return new Promise((resolve) => {
            const matches = (detail = {}) => {
              return [detail.download_id, detail.video_id, detail.mid].some((id) =>
                wanted.has(String(id || "")),
              );
            };
            const onDone = (event) => {
              var _event$detail;
              if (!matches(event.detail || {})) return;
              cleanup();
              resolve(
                Boolean(
                  (_event$detail = event.detail) === null || _event$detail === void 0
                    ? void 0
                    : _event$detail.ok,
                ),
              );
            };
            const onProgress = (event) => {
              var _event$detail2;
              if (!matches(event.detail || {})) return;
              const progress = String(
                ((_event$detail2 = event.detail) === null || _event$detail2 === void 0
                  ? void 0
                  : _event$detail2.progress) || "",
              );
              if (progress === "100" || progress === "100.00") {
                cleanup();
                resolve(true);
              }
            };
            const cleanup = () => {
              window.clearTimeout(timer);
              document.removeEventListener("tvd_download_done", onDone);
              wanted.forEach((id) => {
                document.removeEventListener(id + "_video_download_progress", onProgress);
              });
            };
            document.addEventListener("tvd_download_done", onDone);
            wanted.forEach((id) => {
              document.addEventListener(id + "_video_download_progress", onProgress);
            });
            const timer = window.setTimeout(() => {
              cleanup();
              resolve(false);
            }, timeout);
          });
        };
        const triggerEvent = async (
          eventType,
          downloadUrl,
          bin_index,
          downType,
          container,
          mediaMeta = {},
        ) => {
          const url = String(downloadUrl || "");
          const pending = Boolean(mediaMeta.source_pending);
          const isImageUrl =
            (downType === "image" || downType === "img") && url && !url.startsWith("data:");
          const isMusic = downType === "music";
          const isMusicPending = isMusic && (pending || Boolean(mediaMeta.mid));
          if (
            url.includes("stream/") ||
            url.includes("blob:") ||
            url.includes("progressive/") ||
            isImageUrl ||
            isMusicPending ||
            pending
          ) {
            // Click event anti-shake
            let lastClickTime = 0;
            const clickInterval = 500;
            let currentTime = new Date().getTime();
            if (currentTime - lastClickTime < clickInterval) {
              // If the time interval is too short, the trigger operation is not performed
              return;
            }
            lastClickTime = currentTime;
            let idPath = extractStreamIdPath(url);
            const progressId = String(idPath || bin_index || "");
            const detachProgress = attachDownloadProgressListener(container, progressId);
            const eventDetails = {
              type: eventType,
              video_src: {
                video_url: downloadUrl,
                video_id: idPath || bin_index,
                download_id: bin_index,
                mid: mediaMeta.mid || bin_index,
                pid: mediaMeta.pid || "",
                type: downType,
                source_pending: pending,
                fallback_selector: mediaMeta.fallback_selector || "",
              },
            };
            const videoDownloadEvent = new CustomEvent("video_download", {
              detail: eventDetails,
            });
            const waitDone = mediaMeta.waitForComplete
              ? waitForDownloadDone(
                  [bin_index, idPath, mediaMeta.mid, mediaMeta.download_id],
                  mediaMeta.downloadTimeout || 180000,
                )
              : Promise.resolve(true);
            document.dispatchEvent(videoDownloadEvent);
            try {
              await waitDone;
            } finally {
              detachProgress();
            }
          }
        };
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const isExtensionMediaUrl = (url = "") => {
          const src = String(url || "");
          return src.startsWith("chrome-extension://") || src.startsWith("moz-extension://");
        };
        const isPluginMediaNode = (node) => {
          var _node$classList, _node$closest, _node$getAttribute;
          if (!node) return false;
          if (
            ((_node$classList = node.classList) !== null &&
              _node$classList !== void 0 &&
              _node$classList.contains("logo-img")) ||
            ((_node$closest = node.closest) !== null &&
              _node$closest !== void 0 &&
              _node$closest.call(
                node,
                ".download-click-one, .download-click-div, .download-click-month, .content-teleram-script, .downloadBtnIns",
              ))
          ) {
            return true;
          }
          const src =
            node.currentSrc ||
            node.src ||
            ((_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0
              ? void 0
              : _node$getAttribute.call(node, "src")) ||
            "";
          return isExtensionMediaUrl(src);
        };
        const queryTelegramMediaImage = (root) => {
          if (!root) return null;
          const selectors = [
            "img.media-photo",
            "img.full-media",
            "img.thumbnail",
            ".media-inner img",
            "canvas.media-photo",
            "canvas.canvas-thumbnail",
          ];
          for (const selector of selectors) {
            const nodes = root.querySelectorAll(selector);
            for (const node of nodes) {
              if (!isPluginMediaNode(node)) return node;
            }
          }
          return null;
        };
        const getMediaNodeSrc = (node) => {
          var _node$getAttribute2, _node$querySelector;
          if (!node) return "";
          const src =
            node.currentSrc ||
            node.src ||
            ((_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0
              ? void 0
              : _node$getAttribute2.call(node, "src")) ||
            ((_node$querySelector = node.querySelector) === null ||
            _node$querySelector === void 0 ||
            (_node$querySelector = _node$querySelector.call(node, "source")) === null ||
            _node$querySelector === void 0
              ? void 0
              : _node$querySelector.src) ||
            "";
          if (String(src || "").startsWith("data:")) return "";
          if (isExtensionMediaUrl(src)) return "";
          return src;
        };
        const getSidebarImageSrc = (element) => {
          const node = queryTelegramMediaImage(element);
          if (!node) return "";
          return getMediaNodeSrc(node);
        };
        const getKAudioTitle = (element) => {
          var _element$querySelecto3,
            _element$parentElemen,
            _element$parentElemen2,
            _element$closest3,
            _element$closest3$que;
          const titleNode =
            (element === null ||
            element === void 0 ||
            (_element$querySelecto3 = element.querySelector) === null ||
            _element$querySelecto3 === void 0
              ? void 0
              : _element$querySelecto3.call(element, ".audio-title")) ||
            (element === null ||
            element === void 0 ||
            (_element$parentElemen = element.parentElement) === null ||
            _element$parentElemen === void 0 ||
            (_element$parentElemen2 = _element$parentElemen.querySelector) === null ||
            _element$parentElemen2 === void 0
              ? void 0
              : _element$parentElemen2.call(_element$parentElemen, ".audio-title")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest3 = element.closest) === null ||
            _element$closest3 === void 0 ||
            (_element$closest3 = _element$closest3.call(element, ".bubble")) === null ||
            _element$closest3 === void 0 ||
            (_element$closest3$que = _element$closest3.querySelector) === null ||
            _element$closest3$que === void 0
              ? void 0
              : _element$closest3$que.call(_element$closest3, ".audio-title"));
          if (!titleNode) return "";
          const raw =
            (titleNode.getAttribute("title") || titleNode.innerText || "").split(" ")[0] || "";
          return raw
            .replace(/\(.*?\)/g, "")
            .split(/[,\uFF0C]/)[0]
            .trim();
        };
        const decodeKStreamPayload = (src = "") => {
          if (!src.includes("stream/")) return null;
          try {
            return JSON.parse(
              decodeURIComponent(src.substring(src.indexOf("stream/") + 7).split("?")[0]),
            );
          } catch (e) {
            return null;
          }
        };
        const findKAudioSource = (element, audioButton, audioNodes) => {
          var _element$querySelecto4, _audioButton$parentEl;
          const mid = getBubbleMediaId(element);
          const title = getKAudioTitle(element);
          const containerAudios = [
            ...((element === null ||
            element === void 0 ||
            (_element$querySelecto4 = element.querySelectorAll) === null ||
            _element$querySelecto4 === void 0
              ? void 0
              : _element$querySelecto4.call(element, "audio")) || []),
          ];
          const audios = containerAudios.length ? containerAudios : [...audioNodes];
          const playingInContainer = audios.find(
            (item) => !item.paused && !item.ended && getMediaNodeSrc(item),
          );
          if (playingInContainer) return getMediaNodeSrc(playingInContainer);
          for (const item of audios) {
            var _payload$location2;
            const src = getMediaNodeSrc(item);
            if (!src) continue;
            const payload = decodeKStreamPayload(src);
            if (
              mid &&
              payload !== null &&
              payload !== void 0 &&
              (_payload$location2 = payload.location) !== null &&
              _payload$location2 !== void 0 &&
              _payload$location2.id &&
              String(payload.location.id) === String(mid)
            ) {
              return src;
            }
          }
          for (const item of audios) {
            const src = getMediaNodeSrc(item);
            if (!src) continue;
            const payload = decodeKStreamPayload(src);
            if (
              title &&
              payload !== null &&
              payload !== void 0 &&
              payload.fileName &&
              payload.fileName.includes(title)
            ) {
              return src;
            }
          }
          const playingAudio = [...audioNodes].find(
            (item) => !item.paused && !item.ended && getMediaNodeSrc(item),
          );
          if (playingAudio) return getMediaNodeSrc(playingAudio);
          if (
            audioButton !== null &&
            audioButton !== void 0 &&
            (_audioButton$parentEl = audioButton.parentElement) !== null &&
            _audioButton$parentEl !== void 0 &&
            (_audioButton$parentEl = _audioButton$parentEl.classList) !== null &&
            _audioButton$parentEl !== void 0 &&
            _audioButton$parentEl.contains("playing")
          ) {
            const current = audios.find((item) => getMediaNodeSrc(item));
            if (current) return getMediaNodeSrc(current);
          }
          for (const item of audios) {
            const src = getMediaNodeSrc(item);
            if (src) return src;
          }
          return "";
        };
        const waitForContainerAudioSrc = async (container, timeout = 10000) => {
          const startedAt = Date.now();
          while (Date.now() - startedAt < timeout) {
            const src = findKAudioSource(
              container,
              container.querySelector(".audio-play-icon"),
              document.querySelectorAll("audio"),
            );
            if (src) return src;
            await sleep(250);
          }
          return "";
        };
        const waitForAudioPreload = (timeout = 8000, interval = 200) => {
          return new Promise((resolve) => {
            const startedAt = Date.now();
            const timer = setInterval(() => {
              const hasPreloader =
                document.querySelectorAll("div.audio-download > div.preloader-container.is-visible")
                  .length > 0;
              if (!hasPreloader || Date.now() - startedAt >= timeout) {
                clearInterval(timer);
                resolve(true);
              }
            }, interval);
          });
        };

        /**
         * Handle download events
         * @param {*} container parent element
         * @param {*} element retrieved img || video tag
         * @param {*} type click button type: img || video
         * @param {*} conIndx loop index
         */
        const handleDownload = async (container, element, type, conIndx) => {
          const downloadButton = container.querySelector(`.down_btn_${type}`);
          if (downloadButton) {
            downloadButton.addEventListener("click", async (event) => {
              event.preventDefault();
              event.stopPropagation();

              if (type == "music") {
                const downloadBtn = container.querySelector(`.down_btn_music`);
                const audio_play = container.getElementsByClassName("audio-play-icon");
                const downloadId = getBubbleMediaId(container) || String(conIndx + 1);
                try {
                  if (!audio_play.length) {
                    return;
                  }
                  downloadBtn.innerHTML = "DOWNLOADING...";
                  audio_play[0].click();
                  await sleep(500);
                  await waitForAudioPreload();
                  let audioSrc = await waitForContainerAudioSrc(container, 10000);
                  if (!audioSrc) {
                    audioSrc = findKAudioSource(
                      container,
                      audio_play[0],
                      document.querySelectorAll("audio"),
                    );
                  }
                  await triggerEvent("single", audioSrc || "", downloadId, type, container, {
                    mid: getBubbleMediaId(container) || downloadId,
                    pid: getPeerId(),
                    source_pending: !audioSrc,
                    waitForComplete: true,
                    downloadTimeout: 120000,
                  });
                } finally {
                  var _audio_play$;
                  if (
                    (_audio_play$ = audio_play[0]) !== null &&
                    _audio_play$ !== void 0 &&
                    (_audio_play$ = _audio_play$.parentElement) !== null &&
                    _audio_play$ !== void 0 &&
                    (_audio_play$ = _audio_play$.classList) !== null &&
                    _audio_play$ !== void 0 &&
                    _audio_play$.contains("playing")
                  ) {
                    audio_play[0].click();
                  }
                  downloadBtn.innerHTML = i18["a" /* default */].t("dialog.butMusic");
                }
              } else {
                await triggerEvent("single", element.src, conIndx + 1, type, container, {
                  waitForComplete: true,
                  downloadTimeout: type === "img" ? 60000 : 180000,
                });
              }
            });
          }
        };
        const handleAlbumItem = (checkbox, index, container) => {
          return new Promise((resolve) => {
            setTimeout(async () => {
              checkbox.parentNode.querySelector(".album-item-media").click();
              await mediaDownload(index + 1, container);
              resolve();
            }, 1000);
          });
        };
        async function mediaDownload(id, element) {
          let viewerMedia = await waitForKViewerSource("tgMedia", "video", 10000);
          let url = viewerMedia.url;
          if (url) {
            await triggerEvent("single", url, id, "video", element, {
              waitForComplete: true,
              downloadTimeout: 180000,
            });
          } else {
            const viewerRoot =
              document.querySelector("div.media-viewer-whole") ||
              document.querySelector("#MediaViewer");
            const buttons =
              viewerRoot === null || viewerRoot === void 0
                ? void 0
                : viewerRoot.querySelectorAll(".media-viewer-buttons .btn-icon");
            if (buttons && buttons.length > 2) {
              disPatchClick(buttons[2]);
            }
          }
          await sleep(400);
          await closeKViewer("tgMedia");
        }

        // Initialize chat window download button
        const initialButtonsDownload = () => {
          const elements = document.querySelectorAll(".bubble-content-wrapper");
          elements.forEach((container, conIndx) => {
            const imgElement = container.querySelector("img.media-photo");
            // const videoElement = container.querySelector('.attachment video');
            const paternityCon = container.querySelector(".content-teleram-script");
            const videoElement = container.querySelector(".media-video");
            const albumItem = container.querySelectorAll(".album-item");
            const videoTime = container.querySelector(".video-time");
            const source_music = container.getElementsByClassName("audio");

            // Inject the download button if it does not exist in the parent container
            if (
              paternityCon === null &&
              albumItem.length === 0 &&
              imgElement !== null &&
              source_music.length === 0
            ) {
              // Video download button
              if (videoElement !== null && videoTime !== null) {
                injectDownloadButton(
                  container,
                  "video",
                  createDownloadBtn("video", false),
                  "attachment",
                );
                handleDownload(container, videoElement, "video", conIndx);
              }

              // Without video link
              if (videoTime !== null && videoElement === null) {
                injectDownloadButton(
                  container,
                  "video",
                  createDownloadBtn("video", false),
                  "attachment",
                );
                container
                  .querySelector(".down_btn_video")
                  .addEventListener("click", async (event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    container.querySelector("img.media-photo").click();
                    setTimeout(async () => {
                      await mediaDownload(conIndx + 1, container);
                    }, 1000);
                  });
              }

              // Image download button
              if (videoTime === null && videoElement === null) {
                injectDownloadButton(
                  container,
                  "img",
                  createDownloadBtn("image", false),
                  "attachment",
                );
                handleDownload(container, imgElement, "img", conIndx);
              }
            }

            // Audio/Voice: Yes .audio and no .media-video，No more requests .audio-title
            if (
              albumItem.length === 0 &&
              source_music &&
              source_music.length > 0 &&
              !videoElement
            ) {
              const voiceDocs = container.querySelectorAll(
                ".spoilers-container .document-container",
              );
              const injectAudioTarget = (item) => {
                if (item.querySelector(".down_btn_music")) return;
                injectDownloadButton(
                  item,
                  "music",
                  createDownloadBtn("music", false),
                  "attachment",
                );
                handleDownload(item, null, "music", conIndx);
              };
              if (voiceDocs.length > 0) {
                voiceDocs.forEach((item) => injectAudioTarget(item));
              } else {
                injectAudioTarget(container);
              }
            }

            // checkbox
            albumItem.forEach((item) => {
              const checkboxDown = item.querySelector(".download-check-item");
              if (!checkboxDown) {
                injectDownloadButton(item, "check", creatDownloadCheckBox(), item);
              }
            });

            // Multiple choice download button
            const downCheckAll = container.querySelectorAll(".download-checkbox-all");
            if (downCheckAll.length === 0 && container.querySelector(".album-item") !== null) {
              injectDownloadButton(
                container,
                "downloadAll",
                createDownloadBtn("", true),
                container,
              );
              container.querySelectorAll(".download-checkbox-all").forEach((all, all_index) => {
                const bubbleCoWr = all.parentNode.parentNode.parentNode;
                all.addEventListener("click", async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const checkboxDown = bubbleCoWr.querySelectorAll(".download-check-item");
                  maxProgress = -Infinity;
                  let promiseChain = Promise.resolve();
                  checkboxDown.forEach((checkbox, index) => {
                    if (checkbox.checked !== true) return;
                    promiseChain = promiseChain.then(async () => {
                      const videoTime = checkbox.parentNode.querySelector(".video-time");
                      if (videoTime === null) {
                        const imageNode = checkbox.parentNode.querySelector("img.media-photo");
                        const imageUrl = imageNode ? getMediaNodeSrc(imageNode) : "";
                        if (!imageUrl) return;
                        await triggerEvent("single", imageUrl, index + 1, "image", container, {
                          waitForComplete: true,
                          downloadTimeout: 60000,
                        });
                        return;
                      }
                      await handleAlbumItem(checkbox, index, container);
                    });
                  });
                  await promiseChain.catch(() => {});
                });
              });
            }
          });
        };
        const queryFirst = (selectors) => {
          for (const selector of selectors) {
            const node = document.querySelector(selector);
            if (node) return node;
          }
          return null;
        };
        const getSidebarToolbarHost = (activePanel) => {
          var _activePanel$closest;
          return (
            document.querySelector("#column-right .search-super") ||
            (activePanel === null ||
            activePanel === void 0 ||
            (_activePanel$closest = activePanel.closest) === null ||
            _activePanel$closest === void 0
              ? void 0
              : _activePanel$closest.call(activePanel, "#column-right .search-super")) ||
            document.querySelector("#column-right") ||
            (activePanel === null || activePanel === void 0 ? void 0 : activePanel.parentNode) ||
            null
          );
        };
        const insertSidebarToolbar = (targetElement, toolbar) => {
          var _targetElement$queryS;
          if (!targetElement || !toolbar) return;
          const anchor =
            targetElement.firstChild ||
            ((_targetElement$queryS = targetElement.querySelector) === null ||
            _targetElement$queryS === void 0
              ? void 0
              : _targetElement$queryS.call(
                  targetElement,
                  ".search-super-content, .search-super-container-media.active, .search-super-container-stories.active, .scrollable.scrollable-y",
                ));
          if (anchor && anchor.parentNode === targetElement) {
            targetElement.insertBefore(toolbar, anchor);
            return;
          }
          if (typeof targetElement.prepend === "function") {
            targetElement.prepend(toolbar);
            return;
          }
          targetElement.appendChild(toolbar);
        };
        const getActiveMediaPanel = () => {
          var _document$querySelect;
          const exact = queryFirst([
            "#column-right .search-super-container-media.active",
            "#column-right .search-super-tab-container.active.search-super-container-media",
            '#column-right [class*="search-super-container-media"].active',
          ]);
          if (exact) return exact;
          const activeTab = document.querySelector(
            "#column-right .search-super-tab-container.active",
          );
          if (activeTab && isMediaPanel(activeTab) && !isStoryPanel(activeTab)) {
            return activeTab;
          }
          const tabText = String(
            ((_document$querySelect = document.querySelector(
              '#column-right .search-super-tab.active, #column-right .tabs-tab.active, #column-right .Tab.active, #column-right [aria-selected="true"]',
            )) === null || _document$querySelect === void 0
              ? void 0
              : _document$querySelect.textContent) || "",
          ).toLowerCase();
          if (tabText && /media|photo|video/.test(tabText) && !/stor/.test(tabText)) {
            return document.querySelector("#column-right .search-super-container-media");
          }
          return null;
        };
        const getActiveStoryPanel = () => {
          const exact = queryFirst([
            "#column-right .search-super-container-stories.active",
            "#column-right .search-super-tab-container.active.search-super-container-stories",
            '#column-right [class*="search-super-container-stories"].active',
          ]);
          if (exact) return exact;
          const activeTab = document.querySelector(
            "#column-right .search-super-tab-container.active",
          );
          if (activeTab && isStoryPanel(activeTab)) return activeTab;
          return null;
        };
        const isMediaPanel = (panel) => {
          const className = String(
            (panel === null || panel === void 0 ? void 0 : panel.className) || "",
          );
          return (
            className.includes("search-super-container-media") ||
            className.includes("container-media")
          );
        };
        const isStoryPanel = (panel) => {
          const className = String(
            (panel === null || panel === void 0 ? void 0 : panel.className) || "",
          );
          return (
            className.includes("search-super-container-stories") ||
            className.includes("container-stories")
          );
        };

        //Download all media
        function createDownloadAllMediaButton() {
          var _targetElement$queryS2;
          const panel = getActiveMediaPanel();
          if (!panel || isStoryPanel(panel) || !isMediaPanel(panel)) return;
          const targetElement = getSidebarToolbarHost(panel);
          if (!targetElement) return;
          if (
            ((_targetElement$queryS2 = targetElement.querySelectorAll(
              ".download-click-div.tgStory",
            )) === null || _targetElement$queryS2 === void 0
              ? void 0
              : _targetElement$queryS2.length) > 0
          ) {
            targetElement.querySelector(".download-click-div.tgStory").remove();
          }
          if (targetElement.querySelector(".download-click-div.tgMedia") == null) {
            let downloadParent = cteateDownloadAllMonthBtn();
            insertSidebarToolbar(targetElement, downloadParent);
            downloadParent.addEventListener("click", async function () {
              k_media_downloadClick("batch", "");
            });
          }
        }

        //Download every month media
        function createDownloadMonthMediaButton(groupEle, i) {
          var _groupEle$i;
          let month_class = "search-super-month-name";
          let monthEle =
            (_groupEle$i = groupEle[i]) === null || _groupEle$i === void 0
              ? void 0
              : _groupEle$i.querySelector(`.${month_class}`);
          if (!monthEle) return;
          if (monthEle.querySelector(".download-click-month") == null) {
            monthEle.style.display = "flex";
            let month_downloadButton = createDownloadMonthBtn();
            monthEle.appendChild(month_downloadButton);
            // Add event binding
            month_downloadButton.addEventListener("click", async function () {
              k_media_downloadClick("batch-month", groupEle[i]);
            });
          }
        }

        // Download all story
        function createDownloadAllStoryButton() {
          var _targetElement$queryS3;
          const storyPanel =
            getActiveStoryPanel() || queryFirst(["#column-right .search-super-container-stories"]);
          if (!storyPanel) return;
          const targetElement = getSidebarToolbarHost(storyPanel);
          if (!targetElement) return;
          if (
            ((_targetElement$queryS3 = targetElement.querySelectorAll(
              ".download-click-div.tgMedia",
            )) === null || _targetElement$queryS3 === void 0
              ? void 0
              : _targetElement$queryS3.length) > 0
          ) {
            targetElement.querySelector(".download-click-div.tgMedia").remove();
          }
          if (targetElement.querySelector(".download-click-div.tgStory") == null) {
            let downloadParent = createDownloadAllStoryBtn();
            insertSidebarToolbar(targetElement, downloadParent);
            downloadParent.addEventListener("click", async function () {
              k_story_downloadClick("batch", "");
            });
          }
        }

        // Download a single story/media
        function createDownloadSingleButton(item, initType) {
          if (item.querySelector(".download-click-one") == null) {
            if (
              typeof getComputedStyle === "function" &&
              getComputedStyle(item).position === "static"
            ) {
              item.style.position = "relative";
            }
            let downloadButton = createDownloadStoryMediaBtn();
            item.appendChild(downloadButton);
            // Add event binding
            downloadButton.addEventListener("click", async function (event) {
              var _event$stopImmediateP;
              event.preventDefault();
              event.stopPropagation();
              (_event$stopImmediateP = event.stopImmediatePropagation) === null ||
                _event$stopImmediateP === void 0 ||
                _event$stopImmediateP.call(event);
              initType == "story"
                ? k_story_downloadClick("single", item)
                : k_media_downloadClick("single", item);
            });
          }
        }

        // Initialize group/personal information download button
        let infoButtonsBusy = false;
        const initialInfoButtonsDownload = async () => {
          if (infoButtonsBusy) return;
          infoButtonsBusy = true;
          try {
            const mediaPanel = getActiveMediaPanel();
            const storyPanel = getActiveStoryPanel();
            const activeTab = document.querySelector(
              "#column-right .search-super-tab-container.active",
            );
            const activeClass = String(
              (activeTab === null || activeTab === void 0 ? void 0 : activeTab.className) || "",
            );
            if (
              (mediaPanel && isMediaPanel(mediaPanel) && !isStoryPanel(mediaPanel)) ||
              activeClass.includes("search-super-container-media")
            ) {
              const panel = mediaPanel || activeTab;
              createDownloadAllMediaButton();
              const groupEle = panel.querySelectorAll(".search-super-month");
              groupEle.forEach((_, i) => {
                createDownloadMonthMediaButton(groupEle, i);
              });
              (getKSidebarItems("tgMedia", panel) || []).forEach((item) => {
                createDownloadSingleButton(item, "media");
              });
              return;
            }
            if (
              (storyPanel && isStoryPanel(storyPanel)) ||
              activeClass.includes("search-super-container-stories")
            ) {
              const panel = storyPanel || activeTab;
              createDownloadAllStoryButton();
              (getKSidebarItems("tgStory", panel) || []).forEach((item) => {
                createDownloadSingleButton(item, "story");
              });
              return;
            }
            if (activeTab) {
              document
                .querySelectorAll("#column-right .search-super .download-click-div")
                .forEach((node) => node.remove());
            }
          } finally {
            infoButtonsBusy = false;
          }
        };

        // Check whether a download button needs to be added to the page
        let infoScanTimer = null;
        const scheduleInfoButtonsDownload = () => {
          if (infoScanTimer) return;
          infoScanTimer = setTimeout(() => {
            infoScanTimer = null;
            initialInfoButtonsDownload();
          }, 300);
        };
        initialButtonsDownload();
        initialInfoButtonsDownload();
        setInterval(() => {
          initialButtonsDownload();
          initialInfoButtonsDownload();
        }, 5000);
        const sidebarObserver = new MutationObserver(scheduleInfoButtonsDownload);
        sidebarObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["class"],
        });
        async function getGroupEle(querySelector, timeout) {
          return new Promise((resolve) => {
            let t = document.querySelectorAll(querySelector);
            if (t.length) return resolve(t);
            let settled = false;
            const done = (nodes) => {
              if (settled) return;
              settled = true;
              observer.disconnect();
              if (timer) window.clearTimeout(timer);
              resolve(nodes);
            };
            const observer = new MutationObserver(() => {
              let nodes = document.querySelectorAll(querySelector);
              if (nodes.length) {
                done(nodes);
              }
            });
            const timer = timeout
              ? window.setTimeout(() => {
                  done(document.querySelectorAll(querySelector));
                }, timeout)
              : null;
            observer.observe(document.body, {
              childList: true,
              subtree: true,
            });
          });
        }
        async function k_media_downloadClick(type, ele) {
          if (type == "single") {
            await k_media_downloadResource(ele);
          } else {
            let media_container = [];
            if (type == "batch") {
              media_container = getKSidebarItems("tgMedia");
            } else if (type == "batch-month") {
              media_container = getKSidebarItems("tgMedia", ele);
            }
            for (let i = 0; i < media_container.length; i++) {
              await k_media_downloadResource(media_container[i]);
            }
          }
        }
        async function k_story_downloadClick(type, ele) {
          if (type == "batch") {
            const media_container = getKSidebarItems("tgStory");
            for (let i = 0; i < media_container.length; i++) {
              await k_story_downloadResource(media_container[i]);
            }
          } else {
            await k_story_downloadResource(ele);
          }
        }

        let lastKPeerId = "";
        const K_SIDEBAR_ITEM_SELECTOR = [
          ".media-container[data-mid]",
          ".media-container",
          ".grid-item[data-mid]",
          ".grid-item",
          "[data-mid]",
          "[data-message-id]",
          ".album-item",
          ".media-inner",
          "img.media-photo",
          "img.thumbnail",
          "canvas.media-photo",
          "canvas.canvas-thumbnail",
          "canvas",
          "video.media-video",
          "video",
        ].join(", ");
        const K_SIDEBAR_ITEM_HOST_SELECTOR = [
          ".media-container[data-mid]",
          ".media-container",
          ".grid-item[data-mid]",
          ".grid-item",
          "[data-mid]",
          "[data-message-id]",
          ".album-item",
        ].join(", ");
        function disPatchClick(dom) {
          if (!dom || typeof dom.dispatchEvent !== "function") return;
          try {
            const mouseEvent = document.createEvent("MouseEvents");
            mouseEvent.initEvent("mouseover", true, true);
            dom.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("mousedown", true, true);
            dom.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("mouseup", true, true);
            dom.dispatchEvent(mouseEvent);
            mouseEvent.initEvent("click", true, true);
            dom.dispatchEvent(mouseEvent);
          } catch (e) {
            ["mouseover", "mousedown", "mouseup", "click"].forEach((type) => {
              dom.dispatchEvent(
                new MouseEvent(type, {
                  bubbles: true,
                  cancelable: true,
                  view: window,
                }),
              );
            });
          }
        }
        function getPeerId() {
          const selectors = [
            "div.chat.active div.chat-info div.avatar",
            "div[id=MiddleColumn] div[data-peer-id]",
            "#column-center .chat-info .avatar",
            "#column-center .chat-info [data-peer-id]",
            "#column-center .topbar [data-peer-id]",
            "#column-center .bubble[data-peer-id]",
            "#MiddleColumn [data-peer-id]",
          ];
          for (const selector of selectors) {
            var _document$querySelect2;
            const peerId =
              (_document$querySelect2 = document.querySelector(selector)) === null ||
              _document$querySelect2 === void 0
                ? void 0
                : _document$querySelect2.getAttribute("data-peer-id");
            if (peerId) {
              lastKPeerId = peerId;
              return peerId;
            }
          }
          return lastKPeerId;
        }
        function getSidebarMediaId(element) {
          var _element$closest4,
            _element$closest5,
            _element$querySelecto5,
            _element$querySelecto6,
            _element$closest6,
            _element$querySelecto7;
          let rawId =
            (element === null || element === void 0 ? void 0 : element.getAttribute("data-mid")) ||
            (element === null || element === void 0
              ? void 0
              : element.getAttribute("data-message-id")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest4 = element.closest) === null ||
            _element$closest4 === void 0 ||
            (_element$closest4 = _element$closest4.call(element, "[data-mid]")) === null ||
            _element$closest4 === void 0
              ? void 0
              : _element$closest4.getAttribute("data-mid")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest5 = element.closest) === null ||
            _element$closest5 === void 0 ||
            (_element$closest5 = _element$closest5.call(element, "[data-message-id]")) === null ||
            _element$closest5 === void 0
              ? void 0
              : _element$closest5.getAttribute("data-message-id")) ||
            (element === null ||
            element === void 0 ||
            (_element$querySelecto5 = element.querySelector) === null ||
            _element$querySelecto5 === void 0 ||
            (_element$querySelecto5 = _element$querySelecto5.call(element, "[data-mid]")) ===
              null ||
            _element$querySelecto5 === void 0
              ? void 0
              : _element$querySelecto5.getAttribute("data-mid")) ||
            (element === null ||
            element === void 0 ||
            (_element$querySelecto6 = element.querySelector) === null ||
            _element$querySelecto6 === void 0 ||
            (_element$querySelecto6 = _element$querySelecto6.call(element, "[data-message-id]")) ===
              null ||
            _element$querySelecto6 === void 0
              ? void 0
              : _element$querySelecto6.getAttribute("data-message-id")) ||
            (element === null ||
            element === void 0 ||
            (_element$closest6 = element.closest) === null ||
            _element$closest6 === void 0 ||
            (_element$closest6 = _element$closest6.call(
              element,
              '[id^="shared-mediamessage-"], [id^="shared-media-message-"], [id^="album-media-message"], [id^="media-message-"]',
            )) === null ||
            _element$closest6 === void 0
              ? void 0
              : _element$closest6.getAttribute("id")) ||
            (element === null ||
            element === void 0 ||
            (_element$querySelecto7 = element.querySelector) === null ||
            _element$querySelecto7 === void 0 ||
            (_element$querySelecto7 = _element$querySelecto7.call(
              element,
              '[id^="shared-mediamessage-"], [id^="shared-media-message-"], [id^="album-media-message"], [id^="media-message-"]',
            )) === null ||
            _element$querySelecto7 === void 0
              ? void 0
              : _element$querySelecto7.getAttribute("id")) ||
            (element === null || element === void 0 ? void 0 : element.getAttribute("id")) ||
            "";
          rawId = String(rawId || "")
            .replace(/^info_/, "")
            .replace(/_download$/, "");
          if (rawId.startsWith("shared-mediamessage-")) {
            return rawId.split("shared-mediamessage-")[1];
          }
          if (rawId.startsWith("shared-media-message-")) {
            return rawId.split("shared-media-message-")[1];
          }
          if (rawId.startsWith("media-message-")) {
            return rawId.split("media-message-")[1];
          }
          if (rawId.startsWith("album-media-message-")) {
            return rawId.split("album-media-message-")[1];
          }
          if (rawId.startsWith("album-media-message")) {
            return rawId.split("album-media-message")[1];
          }
          return rawId;
        }
        function getVideoHost(element) {
          var _element$closest7;
          return (
            (element === null ||
            element === void 0 ||
            (_element$closest7 = element.closest) === null ||
            _element$closest7 === void 0
              ? void 0
              : _element$closest7.call(
                  element,
                  ".album-item, .media-container, .grid-item, .bubble, .media-inner",
                )) ||
            (element === null || element === void 0 ? void 0 : element.parentElement) ||
            element
          );
        }
        function isKVideoLikeElement(element) {
          var _element$matches,
            _host$classList,
            _host$classList2,
            _host$classList3,
            _host$querySelector;
          const host = getVideoHost(element);
          return Boolean(
            (element === null ||
            element === void 0 ||
            (_element$matches = element.matches) === null ||
            _element$matches === void 0
              ? void 0
              : _element$matches.call(
                  element,
                  "video.media-video, video, .media-video, .video-time, .video-duration",
                )) ||
            (host === null ||
            host === void 0 ||
            (_host$classList = host.classList) === null ||
            _host$classList === void 0
              ? void 0
              : _host$classList.contains("video")) ||
            (host === null ||
            host === void 0 ||
            (_host$classList2 = host.classList) === null ||
            _host$classList2 === void 0
              ? void 0
              : _host$classList2.contains("round")) ||
            (host === null ||
            host === void 0 ||
            (_host$classList3 = host.classList) === null ||
            _host$classList3 === void 0
              ? void 0
              : _host$classList3.contains("gif")) ||
            (host === null ||
            host === void 0 ||
            (_host$querySelector = host.querySelector) === null ||
            _host$querySelector === void 0
              ? void 0
              : _host$querySelector.call(
                  host,
                  ".video-time, .video-duration, video.media-video, .media-video, video",
                )),
          );
        }
        function hasKSidebarImage(element) {
          return Boolean(queryTelegramMediaImage(element));
        }
        function getKSidebarType(element) {
          if (isKVideoLikeElement(element)) return "video";
          if (hasKSidebarImage(element)) return "image";
          return "";
        }
        function getKViewerClickTarget(element) {
          var _element$querySelecto9;
          const selectors = [
            ".media-inner",
            "div.album-item-media",
            ".video-time",
            ".video-duration",
            "video.media-video",
            ".media-video",
            "img.media-photo",
            "img.thumbnail",
            "canvas.media-photo",
            "canvas.canvas-thumbnail",
          ];
          for (const selector of selectors) {
            var _element$querySelecto8;
            const node =
              element === null ||
              element === void 0 ||
              (_element$querySelecto8 = element.querySelector) === null ||
              _element$querySelecto8 === void 0
                ? void 0
                : _element$querySelecto8.call(element, selector);
            if (node && !isPluginMediaNode(node)) return node;
          }
          const mediaInner =
            element === null ||
            element === void 0 ||
            (_element$querySelecto9 = element.querySelector) === null ||
            _element$querySelecto9 === void 0
              ? void 0
              : _element$querySelecto9.call(element, ".media-inner");
          if (mediaInner) return mediaInner;
          return element;
        }
        function getKViewerMedia(tabType, expectedType = "") {
          const isStory = tabType === "tgStory";
          const root = isStory
            ? document.querySelector("#stories-viewer")
            : document.querySelector(".media-viewer-movers");
          const video =
            root === null || root === void 0
              ? void 0
              : root.querySelector("video.media-video source, video source, video");
          const image = queryTelegramMediaImage(root);
          const videoUrl = getMediaNodeSrc(video);
          const imageUrl = getMediaNodeSrc(image);
          const wantsImage = expectedType === "image";
          return {
            url: wantsImage ? imageUrl || videoUrl : videoUrl || "",
            preview_src: imageUrl || "",
            type: wantsImage ? "image" : "video",
          };
        }
        async function waitForKViewerSource(tabType, expectedType = "video", timeout = 10000) {
          const startedAt = Date.now();
          while (Date.now() - startedAt < timeout) {
            const viewerMedia = getKViewerMedia(tabType, expectedType);
            if (viewerMedia.url) return viewerMedia;
            await sleep(250);
          }
          return getKViewerMedia(tabType, expectedType);
        }
        function isVisibleNode(node) {
          var _node$classList2, _node$classList3, _node$getBoundingClie;
          if (!node) return false;
          if (
            ((_node$classList2 = node.classList) !== null &&
              _node$classList2 !== void 0 &&
              _node$classList2.contains("hide")) ||
            ((_node$classList3 = node.classList) !== null &&
              _node$classList3 !== void 0 &&
              _node$classList3.contains("is-hidden"))
          ) {
            return false;
          }
          if (typeof getComputedStyle === "function") {
            const style = getComputedStyle(node);
            if (
              style.display === "none" ||
              style.visibility === "hidden" ||
              style.opacity === "0"
            ) {
              return false;
            }
          }
          const rect =
            (_node$getBoundingClie = node.getBoundingClientRect) === null ||
            _node$getBoundingClie === void 0
              ? void 0
              : _node$getBoundingClie.call(node);
          return !rect || (rect.width > 0 && rect.height > 0);
        }
        function isKViewerOpen(tabType = "tgMedia") {
          if (tabType === "tgStory") {
            return isVisibleNode(document.querySelector("#stories-viewer"));
          }
          const root =
            document.querySelector("div.media-viewer-whole") ||
            document.querySelector("#MediaViewer");
          return isVisibleNode(root);
        }
        async function waitForKViewerClosed(tabType = "tgMedia", timeout = 5000) {
          const startedAt = Date.now();
          while (Date.now() - startedAt < timeout) {
            if (!isKViewerOpen(tabType)) return true;
            await sleep(200);
          }
          return !isKViewerOpen(tabType);
        }
        function isPreviewCloseButton(btn) {
          var _btn$closest, _btn$closest2, _btn$closest3;
          if (!btn) return false;
          if (
            (_btn$closest = btn.closest) !== null &&
            _btn$closest !== void 0 &&
            _btn$closest.call(btn, ".media-viewer-topbar-left")
          )
            return false;
          if (
            (_btn$closest2 = btn.closest) !== null &&
            _btn$closest2 !== void 0 &&
            _btn$closest2.call(btn, "#column-right") &&
            !(
              (_btn$closest3 = btn.closest) !== null &&
              _btn$closest3 !== void 0 &&
              _btn$closest3.call(btn, ".media-viewer-whole, #MediaViewer, #stories-viewer")
            )
          ) {
            return false;
          }
          return true;
        }
        async function closeKViewer(tabType = "tgMedia") {
          const roots =
            tabType === "tgStory"
              ? [...document.querySelectorAll("#stories-viewer")].filter(isVisibleNode)
              : [...document.querySelectorAll("div.media-viewer-whole, #MediaViewer")].filter(
                  isVisibleNode,
                );
          const candidates = [];
          roots.forEach((root) => {
            const toolbarButtons = [...root.querySelectorAll(".media-viewer-buttons > .btn-icon")];
            const lastToolbar = toolbarButtons[toolbarButtons.length - 1];
            if (lastToolbar) candidates.push(lastToolbar);
            root
              .querySelectorAll("button.media-viewer-close, .tgico-close, [aria-label='Close']")
              .forEach((btn) => candidates.push(btn));
          });
          const seen = new Set();
          for (const closeBtn of candidates) {
            if (!closeBtn || seen.has(closeBtn) || !isPreviewCloseButton(closeBtn)) continue;
            seen.add(closeBtn);
            disPatchClick(closeBtn);
            await sleep(400);
            if (await waitForKViewerClosed(tabType, 1500)) return true;
          }
          return waitForKViewerClosed(tabType, 2000);
        }
        function getSidebarItemHost(node, panel) {
          var _node$matches, _node$closest3, _host$matches;
          if (!node || !panel) return null;
          if (
            (_node$matches = node.matches) !== null &&
            _node$matches !== void 0 &&
            _node$matches.call(node, "img, video, canvas")
          ) {
            var _node$closest2, _mediaHost$matches, _node$parentElement$m, _node$parentElement;
            const mediaHost =
              (_node$closest2 = node.closest) === null || _node$closest2 === void 0
                ? void 0
                : _node$closest2.call(
                    node,
                    ".media-container, .grid-item, .album-item, div, li, a, button, [role='button']",
                  );
            if (
              mediaHost &&
              mediaHost !== panel &&
              !(
                (_mediaHost$matches = mediaHost.matches) !== null &&
                _mediaHost$matches !== void 0 &&
                _mediaHost$matches.call(mediaHost, "img, video, canvas, .media-inner")
              ) &&
              panel.contains(mediaHost)
            ) {
              return mediaHost;
            }
            if (
              node.parentElement &&
              node.parentElement !== panel &&
              !(
                (_node$parentElement$m = (_node$parentElement = node.parentElement).matches) !==
                  null &&
                _node$parentElement$m !== void 0 &&
                _node$parentElement$m.call(_node$parentElement, ".media-inner")
              ) &&
              panel.contains(node.parentElement)
            ) {
              return node.parentElement;
            }
          }
          const host =
            (_node$closest3 = node.closest) === null || _node$closest3 === void 0
              ? void 0
              : _node$closest3.call(node, K_SIDEBAR_ITEM_HOST_SELECTOR);
          if (
            host &&
            host !== panel &&
            !(
              (_host$matches = host.matches) !== null &&
              _host$matches !== void 0 &&
              _host$matches.call(host, "img, video, canvas, .media-inner")
            ) &&
            panel.contains(host)
          ) {
            return host;
          }
          return null;
        }
        function getKSidebarItems(tabType, root = null) {
          var _panel$matches;
          const panel =
            root || (tabType === "tgStory" ? getActiveStoryPanel() : getActiveMediaPanel());
          if (!panel) return [];
          const candidates = [...panel.querySelectorAll(K_SIDEBAR_ITEM_SELECTOR)];
          if (
            (_panel$matches = panel.matches) !== null &&
            _panel$matches !== void 0 &&
            _panel$matches.call(panel, K_SIDEBAR_ITEM_SELECTOR)
          )
            candidates.unshift(panel);
          const seen = new Set();
          const items = [];
          candidates.forEach((node) => {
            var _node$matches2;
            if (isPluginMediaNode(node)) return;
            const item =
              getSidebarItemHost(node, panel) ||
              ((_node$matches2 = node.matches) !== null &&
              _node$matches2 !== void 0 &&
              _node$matches2.call(node, ".media-container, .grid-item, .album-item")
                ? node
                : null);
            if (!item || !panel.contains(item)) return;
            const mid = getSidebarMediaId(item);
            if (!mid || seen.has(mid)) return;
            if (!getKSidebarType(item)) return;
            seen.add(mid);
            items.push(item);
          });
          return items;
        }
        function buildSidebarDownloadMeta(element, tabType) {
          const mid = getSidebarMediaId(element);
          const type = getKSidebarType(element);
          if (!mid || !type) return null;
          const download_id = "info_" + mid;
          const domId = download_id + "_download";
          element.setAttribute("data-tgvd-download-id", domId);
          element.setAttribute("id", domId);
          return {
            mid,
            pid: getPeerId(),
            type,
            download_id,
            fallback_selector: '[data-tgvd-download-id="' + domId + '"]',
            tabType,
          };
        }
        async function dispatchSidebarDownload(element, tabType, url, type, sourcePending) {
          var _element$querySelecto10;
          const meta = buildSidebarDownloadMeta(element, tabType);
          if (!meta) return false;
          (_element$querySelecto10 = element.querySelector(".downloadvideo")) === null ||
            _element$querySelecto10 === void 0 ||
            _element$querySelecto10.classList.add("down_btn_video");
          await triggerEvent("single", url || "", meta.mid, type || meta.type, element, {
            mid: meta.mid,
            pid: meta.pid,
            source_pending: sourcePending,
            fallback_selector: meta.fallback_selector,
            waitForComplete: true,
            downloadTimeout: type === "image" || meta.type === "image" ? 60000 : 180000,
          });
          return true;
        }
        async function downloadKSidebarResourceViaViewer(element, tabType) {
          const meta = buildSidebarDownloadMeta(element, tabType);
          if (!meta) return false;
          if (meta.type === "image") {
            const directUrl = getSidebarImageSrc(element);
            await dispatchSidebarDownload(element, tabType, directUrl || "", "image", !directUrl);
            return true;
          }
          const clickTarget = getKViewerClickTarget(element);
          if (isKViewerOpen(tabType)) {
            await closeKViewer(tabType);
          }
          disPatchClick(clickTarget);
          await sleep(400);
          let viewerMedia = await waitForKViewerSource(tabType, meta.type, 6000);
          let url = viewerMedia.url;
          await dispatchSidebarDownload(
            element,
            tabType,
            url || "",
            viewerMedia.type || meta.type,
            !url,
          );
          await sleep(200);
          await closeKViewer(tabType);
          return true;
        }
        async function k_media_downloadResource(element) {
          await downloadKSidebarResourceViaViewer(element, "tgMedia");
        }
        async function k_story_downloadResource(element) {
          await downloadKSidebarResourceViaViewer(element, "tgStory");
        }
      })();

      function injectPageScript() {
        if (window.__tvdPageScriptInjected) return;
        if (document.documentElement.getAttribute("data-tvd-page-inject") === "1") {
          window.__tvdPageScriptInjected = true;
          return;
        }
        window.__tvdPageScriptInjected = true;
        var script = document.createElement("script");
        script.id = "tvd-inject-script";
        script.src = chrome.runtime.getURL("js/telegram-contextScript.js");
        (document.head || document.documentElement).appendChild(script);
      }
      injectPageScript();

      /***/
    },

    /***/ 3: /***/ function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__("2f3a");

      /***/
    },

    /***/ "499e": /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      // ESM COMPAT FLAG
      __webpack_require__.r(__webpack_exports__);

      // EXPORTS
      __webpack_require__.d(__webpack_exports__, "default", function () {
        return /* binding */ addStylesClient;
      });

      // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
      /**
       * Translates the list format produced by css-loader into something
       * easier to manipulate.
       */
      function listToStyles(parentId, list) {
        var styles = [];
        var newStyles = {};
        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = {
            id: parentId + ":" + i,
            css: css,
            media: media,
            sourceMap: sourceMap,
          };
          if (!newStyles[id]) {
            styles.push((newStyles[id] = { id: id, parts: [part] }));
          } else {
            newStyles[id].parts.push(part);
          }
        }
        return styles;
      }

      // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
      /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

      var hasDocument = typeof document !== "undefined";

      if (typeof DEBUG !== "undefined" && DEBUG) {
        if (!hasDocument) {
          throw new Error(
            "vue-style-loader cannot be used in a non-browser environment. " +
              "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.",
          );
        }
      }

      /*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

      var stylesInDom = {
        /*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/
      };

      var head = hasDocument && (document.head || document.getElementsByTagName("head")[0]);
      var singletonElement = null;
      var singletonCounter = 0;
      var isProduction = false;
      var noop = function () {};
      var options = null;
      var ssrIdKey = "data-vue-ssr-id";

      // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
      // tags it will allow on a page
      var isOldIE =
        typeof navigator !== "undefined" && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

      function addStylesClient(parentId, list, _isProduction, _options) {
        isProduction = _isProduction;

        options = _options || {};

        var styles = listToStyles(parentId, list);
        addStylesToDom(styles);

        return function update(newList) {
          var mayRemove = [];
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];
            domStyle.refs--;
            mayRemove.push(domStyle);
          }
          if (newList) {
            styles = listToStyles(parentId, newList);
            addStylesToDom(styles);
          } else {
            styles = [];
          }
          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];
            if (domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j]();
              }
              delete stylesInDom[domStyle.id];
            }
          }
        };
      }

      function addStylesToDom(styles /* Array<StyleObject> */) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          if (domStyle) {
            domStyle.refs++;
            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }
            for (; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j]));
            }
            if (domStyle.parts.length > item.parts.length) {
              domStyle.parts.length = item.parts.length;
            }
          } else {
            var parts = [];
            for (var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j]));
            }
            stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
          }
        }
      }

      function createStyleElement() {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        head.appendChild(styleElement);
        return styleElement;
      }

      function addStyle(obj /* StyleObjectPart */) {
        var update, remove;
        var styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');

        if (styleElement) {
          if (isProduction) {
            // has SSR styles and in production mode.
            // simply do nothing.
            return noop;
          } else {
            // has SSR styles but in dev mode.
            // for some reason Chrome can't handle source map in server-rendered
            // style tags - source maps in <style> only works if the style tag is
            // created and inserted dynamically. So we remove the server rendered
            // styles and inject new ones.
            styleElement.parentNode.removeChild(styleElement);
          }
        }

        if (isOldIE) {
          // use singleton mode for IE9.
          var styleIndex = singletonCounter++;
          styleElement = singletonElement || (singletonElement = createStyleElement());
          update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
          remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
        } else {
          // use multi-style-tag mode in all other cases
          styleElement = createStyleElement();
          update = applyToTag.bind(null, styleElement);
          remove = function () {
            styleElement.parentNode.removeChild(styleElement);
          };
        }

        update(obj);

        return function updateStyle(newObj /* StyleObjectPart */) {
          if (newObj) {
            if (
              newObj.css === obj.css &&
              newObj.media === obj.media &&
              newObj.sourceMap === obj.sourceMap
            ) {
              return;
            }
            update((obj = newObj));
          } else {
            remove();
          }
        };
      }

      var replaceText = (function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;
          return textStore.filter(Boolean).join("\n");
        };
      })();

      function applyToSingletonTag(styleElement, index, remove, obj) {
        var css = remove ? "" : obj.css;

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = styleElement.childNodes;
          if (childNodes[index]) styleElement.removeChild(childNodes[index]);
          if (childNodes.length) {
            styleElement.insertBefore(cssNode, childNodes[index]);
          } else {
            styleElement.appendChild(cssNode);
          }
        }
      }

      function applyToTag(styleElement, obj) {
        var css = obj.css;
        var media = obj.media;
        var sourceMap = obj.sourceMap;

        if (media) {
          styleElement.setAttribute("media", media);
        }
        if (options.ssrId) {
          styleElement.setAttribute(ssrIdKey, obj.id);
        }

        if (sourceMap) {
          // https://developer.chrome.com/devtools/docs/javascript-debugging
          // this makes source maps inside style tags work properly in Chrome
          css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */";
          // http://stackoverflow.com/a/26603875
          css +=
            "\n/*# sourceMappingURL=data:application/json;base64," +
            btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
            " */";
        }

        if (styleElement.styleSheet) {
          styleElement.styleSheet.cssText = css;
        } else {
          while (styleElement.firstChild) {
            styleElement.removeChild(styleElement.firstChild);
          }
          styleElement.appendChild(document.createTextNode(css));
        }
      }

      /***/
    },

    /***/ "4b47": /***/ function (module, exports, __webpack_require__) {
      // Imports
      var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
      exports = ___CSS_LOADER_API_IMPORT___(false);
      // Module
      exports.push([
        module.i,
        '*{padding:0;margin:0;list-style:none}.content-teleram-script{width:100%;display:flex;flex-direction:row;justify-content:center;margin:10px 0}.content-teleram-script .downloadBtnIns{display:flex;justify-content:center;align-items:center;padding-top:16px;text-align:center;padding:10px 10px;border-radius:10px;background-color:#bd93f9}.content-teleram-script .downloadBtnIns .download-checkbox-all,.content-teleram-script .downloadBtnIns .download-images,.content-teleram-script .downloadBtnIns .download-videos{color:#333}.content-teleram-script .downloadBtnIns .jump-downloader{padding:5px 10px}.progress-teleram-script{width:100%;display:flex;flex-direction:row;justify-content:center;padding-bottom:8px}.progress-teleram-script .down_btn_progress{width:50%;height:30px;text-align:center;background-color:#bd93f9;color:#333;border-radius:5px;margin:2px auto}.download-check-item{width:23px;height:23px;position:absolute;right:0;bottom:0;display:inline-block;margin:2px;cursor:pointer}.download-check-item,.download-check-item:checked{background-color:#bd93f9;z-index:999;opacity:1}.download-check-item:checked:after{content:"";position:absolute;top:5px;left:8px;width:8px;height:13px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg);opacity:1;z-index:999;font-weight:700}input[type=checkbox].download-check-item{opacity:1;z-index:999}.good-modal-dialog{display:none;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background-color:#fff;padding:20px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,.1);z-index:1000;box-shadow:0 0 20px rgba(0,0,0,.2);width:400px}.modal-content{margin-bottom:20px;padding-top:15px}.modal-content-txt{text-align:center}.modal-content-head{font-size:20px;font-weight:700;margin-bottom:10px;text-align:center}.modal-close{position:absolute;top:5px;right:10px;font-size:24px;cursor:pointer}.modal-buttons{text-align:center;padding-top:15px;width:75%;margin:0 auto;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.modal-buttons button{padding:8px 17px;margin:0 5px;border:none;border-radius:5px;cursor:pointer;font-size:16px;font-weight:700;transition:background-color .3s}.modal-buttons button.cancel{background-color:#ccc}.modal-buttons button.confirm{background-color:#bd93f9;color:#fff}.quota-exhausted-dialog .modal-buttons button.confirm{background-color:#0074ff;color:#fff}.quota-exhausted-dialog .modal-buttons button.confirm:hover{background-color:#0066e0}.modal-buttons button:hover{background-color:#bd93f9}.modal-content-loading{text-align:center;margin-top:-20px}.modal-content-loading .loading-txt{margin-top:25px}.loadEffect{width:100px;height:100px;position:relative;margin:0 auto;padding-bottom:10px}.loadEffect span{display:inline-block;width:16px;height:16px;border-radius:50%;background:#bd93f9;position:absolute;-webkit-animation:load 1.04s ease infinite}.loadEffect span:first-child{left:0;top:50%;margin-top:-8px;-webkit-animation-delay:.13s}.loadEffect span:nth-child(2){left:14px;top:14px;-webkit-animation-delay:.26s}.loadEffect span:nth-child(3){left:50%;top:0;margin-left:-8px;-webkit-animation-delay:.39s}.loadEffect span:nth-child(4){top:14px;right:14px;-webkit-animation-delay:.52s}.loadEffect span:nth-child(5){right:0;top:50%;margin-top:-8px;-webkit-animation-delay:.65s}.loadEffect span:nth-child(6){right:14px;bottom:14px;-webkit-animation-delay:.78s}.loadEffect span:nth-child(7){bottom:0;left:50%;margin-left:-8px;-webkit-animation-delay:.91s}.loadEffect span:nth-child(8){bottom:14px;left:14px;-webkit-animation-delay:1.04s}.download-click-div{display:flex;justify-content:center;align-items:center;padding:10px 0;position:sticky;top:30px;right:0;z-index:99999;flex-direction:column}#column-right .search-super>.download-click-div{flex-shrink:0;width:100%;pointer-events:auto}.download-click-all,.download-click-month,.download-click-one{padding:1px 20px;margin-left:10px;font-size:12px;color:#333;background-color:#bd93f9;border:none;border-radius:5px;cursor:pointer;text-align:center}#stories-viewer .progress-teleram-script,button.download-click-one.download-click-btn{position:absolute;right:0;top:0;z-index:99;font-size:12px;padding:5px;background-color:#bd93f9;border:none}button.download-click-all.downloadvideo{font-size:14px;padding:10px 15px}div#tgALL_download{color:#333;width:150px;margin-left:12px;text-align:center;font-size:14px;background-color:#fff}#column-right .down_btn_progress{width:100%;height:auto;z-index:999;font-size:12px;font-weight:600}img.logo-img{width:20px!important;height:20px!important;vertical-align:middle;margin:0 5px}#column-right .media-container,#column-right .search-super-container-stories .media-container{position:relative}',
        "",
      ]);
      // Exports
      module.exports = exports;

      /***/
    },

    /***/ "585e": /***/ function (module, exports, __webpack_require__) {
      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__("4b47");
      if (content.__esModule) content = content.default;
      if (typeof content === "string") content = [[module.i, content, ""]];
      if (content.locals) module.exports = content.locals;
      // add the styles to the DOM
      var add = __webpack_require__("499e").default;
      var update = add("138d1991", content, true, { sourceMap: false, shadowMode: false });

      /***/
    },

    /***/ "7df7": /***/ function (module) {
      module.exports = JSON.parse(
        '{"zh-CN":{"headTitle":"在 web.telegram.org 上创建一个群组或频道。","buttonDown":"现在在所有 Telegram 视频上方都有下载按钮可用。","refreshPage":"如果下载按钮没有出现，请尝试刷新页面。","logoTitle":"电报内容下载器","downSelected":"下载所选","copySelected":"复制所选","clearAll":"清除全部","trouble":"下载遇到问题或未检测到文件？","someVideos":"有些视频需要开始播放后才能下载。或者你可以点击视频下方","the":"的","forcePlay":"强制播放视频","buttonBelow":"按钮。","version":"版本","contactUs":"联系我们","onlineFeedback":"在线反馈","batchDownload":"批量下载","manualDownload":"下载演示","tableIndex":"序号","fileName":"文件名","tableType":"类型","tableSize":"大小","tableOperate":"操作","successTxt":"操作成功！","promopEmp":"暂无数据","dialog":{"title":"🎉恭喜获得限时福利!","context":"今日免费下载次数已用完。去商店五星好评，即可获得 24 小时无限下载！🙏","loading":"正在确认中，请勿关闭当前页面（约 50 秒）…","sure":"去评分","confirm":"残忍拒绝","quotaTitle":"今日免费额度已用尽","quotaContext":"您今天的免费下载次数已用完。升级会员即可解锁无限下载。","quotaUpgrade":"立即升级","quotaCancel":"稍后再说","butImg":"下载图片","butVideo":"下载视频","butMusic":"下载音乐","butAllFile":"强制下载","progressText":"下载进度：","downloadAll":"下载全部","downloadMonth":"下载当月","downloadSingle":"下载"},"userCenter":{"user_center":"用户中心","plane_type":"套餐类型","plane_startTime":"套餐生效时间","plane_endTime":"套餐失效时间","login_btn":"登录账号","cancel_btn":"取消订阅"}},"en":{"headTitle":"Open a Group or Channel(in web.telegram.org/k).","buttonDown":"Now there are download buttons available above all Telegram videos.","refreshPage":"If the download buttons don\'t appear, make sure to refresh the page.","logoTitle":"TG Content Downloader","downSelected":"Download Selected","copySelected":"Copy Selected","clearAll":"Clear All","trouble":"Having trouble downloading or no file detected?","someVideos":"Some videos need to start playing before they can be downloaded. Or you can click","the":"the","forcePlay":"FORCE PLAY VIDEO","buttonBelow":"button below the video","version":"version","contactUs":"Contact Us","onlineFeedback":"Online Feedback","batchDownload":"Batch Download","manualDownload":"Download Demo","tableIndex":"index","fileName":"file name","tableType":"type","tableSize":"size","tableOperate":"Operate","successTxt":"Successful operation!","promopEmp":"No data","dialog":{"title":"🎉Limited-time reward!","context":"You\'ve used today\'s free downloads. Rate ⭐⭐⭐⭐⭐ in the store to unlock 24 hours of unlimited downloads!🙏","loading":"Confirming, please keep this page open (about 50 seconds)…","sure":"Rate now","confirm":"No Thanks","quotaTitle":"Daily free quota used up","quotaContext":"You\'ve used all free downloads for today. Upgrade to unlock unlimited downloads.","quotaUpgrade":"Upgrade now","quotaCancel":"Maybe later","butImg":"DOWNLOAD IMAGE","butVideo":"DOWNLOAD VIDEO","butMusic":"DOWNLOAD MUSIC","butAllFile":"FORCE DOWNLOAD","progressText":"Download progress:","downloadAll":"DOWNLOAD ALL","downloadMonth":"DOWNLOAD MONTH","downloadSingle":"DOWNLOAD"},"userCenter":{"user_center":"User Center","plane_type":"Current Plan","plane_startTime":"Joined Date","plane_endTime":"Plan Deadline","login_btn":"Login","cancel_btn":"Unsubscribe"}},"he":{"headTitle":"פתחו קבוצה או ערוץ ב־web.telegram.org/k.","buttonDown":"כעת כפתורי הורדה זמינים מעל כל הסרטונים בטלגרם.","refreshPage":"אם כפתורי ההורדה אינם מופיעים, נסו לרענן את הדף.","logoTitle":"מוריד התוכן של טלגרם","downSelected":"הורדת הפריטים שנבחרו","copySelected":"העתקת הפריטים שנבחרו","clearAll":"ניקוי הכול","trouble":"נתקלתם בבעיה בהורדה או שלא זוהה קובץ?","someVideos":"יש סרטונים שצריך להתחיל להפעיל לפני שאפשר להוריד אותם. לחלופין, אפשר ללחוץ על","the":"הכפתור","forcePlay":"הפעלה מאולצת של הסרטון","buttonBelow":"שמופיע מתחת לסרטון","version":"גרסה","contactUs":"יצירת קשר","onlineFeedback":"שליחת משוב","batchDownload":"הורדה מרוכזת","manualDownload":"הדגמת הורדה","tableIndex":"מספר","fileName":"שם הקובץ","tableType":"סוג","tableSize":"גודל","tableOperate":"פעולה","successTxt":"הפעולה הושלמה בהצלחה!","promopEmp":"אין נתונים","dialog":{"title":"🎉 הטבה לזמן מוגבל!","context":"מכסת ההורדות החינמיות להיום נוצלה. דרגו אותנו בחמישה כוכבים בחנות כדי לקבל 24 שעות של הורדות ללא הגבלה! 🙏","loading":"מתבצע אימות, נא להשאיר את הדף פתוח (כ־50 שניות)…","sure":"לדרג עכשיו","confirm":"לא תודה","quotaTitle":"מכסת ההורדות היומית נוצלה","quotaContext":"ניצלתם את כל ההורדות החינמיות להיום. שדרגו את המנוי כדי ליהנות מהורדות ללא הגבלה.","quotaUpgrade":"לשדרג עכשיו","quotaCancel":"אולי אחר כך","butImg":"הורדת תמונה","butVideo":"הורדת סרטון","butMusic":"הורדת מוזיקה","butAllFile":"הורדה מאולצת","progressText":"התקדמות ההורדה:","downloadAll":"הורדת הכול","downloadMonth":"הורדת המדיה מהחודש","downloadSingle":"הורדה"},"userCenter":{"user_center":"אזור אישי","plane_type":"סוג המנוי","plane_startTime":"תאריך הצטרפות","plane_endTime":"תאריך סיום המנוי","login_btn":"התחברות","cancel_btn":"ביטול מנוי"}}}',
      );

      /***/
    },

    /******/
  },
);
