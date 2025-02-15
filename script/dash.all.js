function X2JS(a, b, c) {
  function d(a) {
    var b = a.localName;
    return (
      null == b && (b = a.baseName),
      (null == b || "" == b) && (b = a.nodeName),
      b
    );
  }
  function e(a) {
    return a.prefix;
  }
  function f(a) {
    return "string" == typeof a
      ? a
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;")
          .replace(/\//g, "&#x2F;")
      : a;
  }
  function g(a) {
    return a
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/");
  }
  function h(f) {
    if (f.nodeType == u.DOCUMENT_NODE) {
      var i,
        j,
        k,
        l = f.firstChild;
      for (j = 0, k = f.childNodes.length; k > j; j += 1)
        if (f.childNodes[j].nodeType !== u.COMMENT_NODE) {
          l = f.childNodes[j];
          break;
        }
      if (c) i = h(l);
      else {
        i = {};
        var m = d(l);
        i[m] = h(l);
      }
      return i;
    }
    if (f.nodeType == u.ELEMENT_NODE) {
      var i = new Object();
      i.__cnt = 0;
      for (var n = f.childNodes, o = 0; o < n.length; o++) {
        var l = n.item(o),
          m = d(l);
        if ((i.__cnt++, null == i[m]))
          (i[m] = h(l)),
            (i[m + "_asArray"] = new Array(1)),
            (i[m + "_asArray"][0] = i[m]);
        else {
          if (null != i[m] && !(i[m] instanceof Array)) {
            var p = i[m];
            (i[m] = new Array()), (i[m][0] = p), (i[m + "_asArray"] = i[m]);
          }
          for (var q = 0; null != i[m][q]; ) q++;
          i[m][q] = h(l);
        }
      }
      for (var r = 0; r < f.attributes.length; r++) {
        var s = f.attributes.item(r);
        i.__cnt++;
        for (var v = s.value, w = 0, x = a.length; x > w; w++) {
          var y = a[w];
          y.test.call(this, s.value) && (v = y.converter.call(this, s.value));
        }
        i[b + s.name] = v;
      }
      var z = e(f);
      return (
        null != z && "" != z && (i.__cnt++, (i.__prefix = z)),
        1 == i.__cnt && null != i["#text"] && (i = i["#text"]),
        null != i["#text"] &&
          ((i.__text = i["#text"]),
          t && (i.__text = g(i.__text)),
          delete i["#text"],
          delete i["#text_asArray"]),
        null != i["#cdata-section"] &&
          ((i.__cdata = i["#cdata-section"]),
          delete i["#cdata-section"],
          delete i["#cdata-section_asArray"]),
        (null != i.__text || null != i.__cdata) &&
          (i.toString = function () {
            return (
              (null != this.__text ? this.__text : "") +
              (null != this.__cdata ? this.__cdata : "")
            );
          }),
        i
      );
    }
    return f.nodeType == u.TEXT_NODE || f.nodeType == u.CDATA_SECTION_NODE
      ? f.nodeValue
      : f.nodeType == u.COMMENT_NODE
      ? null
      : void 0;
  }
  function i(a, b, c, d) {
    var e = "<" + (null != a && null != a.__prefix ? a.__prefix + ":" : "") + b;
    if (null != c)
      for (var f = 0; f < c.length; f++) {
        var g = c[f],
          h = a[g];
        e += " " + g.substr(1) + "='" + h + "'";
      }
    return (e += d ? "/>" : ">");
  }
  function j(a, b) {
    return "</" + (null != a.__prefix ? a.__prefix + ":" : "") + b + ">";
  }
  function k(a, b) {
    return -1 !== a.indexOf(b, a.length - b.length);
  }
  function l(a, b) {
    return k(b.toString(), "_asArray") ||
      0 == b.toString().indexOf("_") ||
      a[b] instanceof Function
      ? !0
      : !1;
  }
  function m(a) {
    var b = 0;
    if (a instanceof Object) for (var c in a) l(a, c) || b++;
    return b;
  }
  function n(a) {
    var b = [];
    if (a instanceof Object)
      for (var c in a)
        -1 == c.toString().indexOf("__") &&
          0 == c.toString().indexOf("_") &&
          b.push(c);
    return b;
  }
  function o(a) {
    var b = "";
    return (
      null != a.__cdata && (b += "<![CDATA[" + a.__cdata + "]]>"),
      null != a.__text && (b += t ? f(a.__text) : a.__text),
      b
    );
  }
  function p(a) {
    var b = "";
    return (
      a instanceof Object ? (b += o(a)) : null != a && (b += t ? f(a) : a), b
    );
  }
  function q(a, b, c) {
    var d = "";
    if (0 == a.length) d += i(a, b, c, !0);
    else
      for (var e = 0; e < a.length; e++)
        (d += i(a[e], b, n(a[e]), !1)), (d += r(a[e])), (d += j(a[e], b));
    return d;
  }
  function r(a) {
    var b = "",
      c = m(a);
    if (c > 0)
      for (var d in a)
        if (!l(a, d)) {
          var e = a[d],
            f = n(e);
          if (null == e || void 0 == e) b += i(e, d, f, !0);
          else if (e instanceof Object)
            if (e instanceof Array) b += q(e, d, f);
            else {
              var g = m(e);
              g > 0 || null != e.__text || null != e.__cdata
                ? ((b += i(e, d, f, !1)), (b += r(e)), (b += j(e, d)))
                : (b += i(e, d, f, !0));
            }
          else (b += i(e, d, f, !1)), (b += p(e)), (b += j(e, d));
        }
    return (b += p(a));
  }
  (null === b || void 0 === b) && (b = "_"),
    (null === c || void 0 === c) && (c = !1);
  var s = "1.0.11",
    t = !1,
    u = {
      ELEMENT_NODE: 1,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9,
    };
  (this.parseXmlString = function (a) {
    var b;
    if (window.DOMParser) {
      var c = new window.DOMParser();
      b = c.parseFromString(a, "text/xml");
    } else
      0 == a.indexOf("<?") && (a = a.substr(a.indexOf("?>") + 2)),
        (b = new ActiveXObject("Microsoft.XMLDOM")),
        (b.async = "false"),
        b.loadXML(a);
    return b;
  }),
    (this.xml2json = function (a) {
      return h(a);
    }),
    (this.xml_str2json = function (a) {
      var b = this.parseXmlString(a);
      return this.xml2json(b);
    }),
    (this.json2xml_str = function (a) {
      return r(a);
    }),
    (this.json2xml = function (a) {
      var b = this.json2xml_str(a);
      return this.parseXmlString(b);
    }),
    (this.getVersion = function () {
      return s;
    }),
    (this.escapeMode = function (a) {
      t = a;
    });
}
function ObjectIron(a) {
  var b;
  for (b = [], i = 0, len = a.length; len > i; i += 1)
    a[i].isRoot ? b.push("root") : b.push(a[i].name);
  var c = function (a, b) {
      var c;
      if (null !== a && null !== b)
        for (c in a)
          a.hasOwnProperty(c) && (b.hasOwnProperty(c) || (b[c] = a[c]));
    },
    d = function (a, b, d) {
      var e, f, g, h, i;
      if (null !== a && 0 !== a.length)
        for (e = 0, f = a.length; f > e; e += 1)
          (g = a[e]),
            b.hasOwnProperty(g.name) &&
              (d.hasOwnProperty(g.name)
                ? g.merge &&
                  ((h = b[g.name]),
                  (i = d[g.name]),
                  "object" == typeof h && "object" == typeof i
                    ? c(h, i)
                    : (d[g.name] =
                        null != g.mergeFunction
                          ? g.mergeFunction(h, i)
                          : h + i))
                : (d[g.name] = b[g.name]));
    },
    e = function (a, b) {
      var c,
        f,
        g,
        h,
        i,
        j,
        k,
        l = a;
      if (null !== l.children && 0 !== l.children.length)
        for (c = 0, f = l.children.length; f > c; c += 1)
          if (((j = l.children[c]), b.hasOwnProperty(j.name)))
            if (j.isArray)
              for (
                i = b[j.name + "_asArray"], g = 0, h = i.length;
                h > g;
                g += 1
              )
                (k = i[g]), d(l.properties, b, k), e(j, k);
            else (k = b[j.name]), d(l.properties, b, k), e(j, k);
    },
    f = function (c) {
      var d, g, h, i, j, k, l;
      if (null === c) return c;
      if ("object" != typeof c) return c;
      for (d = 0, g = b.length; g > d; d += 1)
        "root" === b[d] && ((j = a[d]), (k = c), e(j, k));
      for (i in c)
        if (c.hasOwnProperty(i)) {
          if (((h = b.indexOf(i)), -1 !== h))
            if (((j = a[h]), j.isArray))
              for (l = c[i + "_asArray"], d = 0, g = l.length; g > d; d += 1)
                (k = l[d]), e(j, k);
            else (k = c[i]), e(j, k);
          f(c[i]);
        }
      return c;
    };
  return { run: f };
}
if (
  ((function (a) {
    "function" == typeof bootstrap
      ? bootstrap("promise", a)
      : "object" == typeof exports
      ? a(void 0, exports)
      : "function" == typeof define
      ? define(a)
      : "undefined" != typeof ses
      ? ses.ok() &&
        (ses.makeQ = function () {
          return a(void 0, {});
        })
      : a(void 0, (Q = {}));
  })(function (a, b) {
    function c(a, b) {
      b.stack &&
        "object" == typeof a &&
        null !== a &&
        a.stack &&
        -1 === a.stack.indexOf(N) &&
        (a.stack = d(a.stack) + "\n" + N + "\n" + d(b.stack));
    }
    function d(a) {
      for (var a = a.split("\n"), b = [], c = 0; c < a.length; ++c) {
        var d,
          e = a[c];
        if ((d = /at .+ \((.*):(\d+):\d+\)/.exec(e))) {
          var f = d[2];
          d = d[1] === w && f >= x && T >= f;
        } else d = !1;
        !d &&
          !(-1 !== e.indexOf("(module.js:") || -1 !== e.indexOf("(node.js:")) &&
          b.push(e);
      }
      return b.join("\n");
    }
    function e() {
      if (Error.captureStackTrace) {
        var a,
          b,
          c = Error.prepareStackTrace;
        return (
          (Error.prepareStackTrace = function (c, d) {
            (a = d[1].getFileName()), (b = d[1].getLineNumber());
          }),
          Error().stack,
          (Error.prepareStackTrace = c),
          (w = a),
          b
        );
      }
    }
    function f(a, b, c) {
      return function () {
        return (
          "undefined" != typeof console &&
            "function" == typeof console.warn &&
            console.warn(
              b + " is deprecated, use " + c + " instead.",
              Error("").stack
            ),
          a.apply(a, arguments)
        );
      };
    }
    function g() {
      function a(a) {
        c &&
          ((b = n(a)),
          H(
            c,
            function (a, c) {
              A(function () {
                b.promiseDispatch.apply(b, c);
              });
            },
            void 0
          ),
          (d = c = void 0));
      }
      var b,
        c = [],
        d = [],
        e = K(g.prototype),
        f = K(h.prototype);
      return (
        (f.promiseDispatch = function (a, e, f) {
          var g = G(arguments);
          c
            ? (c.push(g), "when" === e && f[1] && d.push(f[1]))
            : A(function () {
                b.promiseDispatch.apply(b, g);
              });
        }),
        (f.valueOf = function () {
          return c ? f : b.valueOf();
        }),
        Error.captureStackTrace &&
          (Error.captureStackTrace(f, g),
          (f.stack = f.stack.substring(f.stack.indexOf("\n") + 1))),
        z(f),
        (e.promise = f),
        (e.resolve = a),
        (e.reject = function (b) {
          a(m(b));
        }),
        (e.notify = function (a) {
          c &&
            H(
              d,
              function (b, c) {
                A(function () {
                  c(a);
                });
              },
              void 0
            );
        }),
        e
      );
    }
    function h(a, b, c, d) {
      void 0 === b &&
        (b = function (a) {
          return m(Error("Promise does not support operation: " + a));
        });
      var e = K(h.prototype);
      return (
        (e.promiseDispatch = function (c, d, f) {
          var g;
          try {
            g = a[d] ? a[d].apply(e, f) : b.call(e, d, f);
          } catch (h) {
            g = m(h);
          }
          c && c(g);
        }),
        c && (e.valueOf = c),
        d && (e.exception = d),
        z(e),
        e
      );
    }
    function i(a) {
      return j(a) ? a.valueOf() : a;
    }
    function j(a) {
      return a && "function" == typeof a.promiseDispatch;
    }
    function k(a) {
      return !j(i(a));
    }
    function l(a) {
      return (a = i(a)), j(a) && "exception" in a;
    }
    function m(a) {
      var a = a || Error(),
        b = h(
          {
            when: function (b) {
              if (b) {
                var c = I(P, this);
                -1 !== c && (Q.splice(c, 1), P.splice(c, 1));
              }
              return b ? b(a) : m(a);
            },
          },
          function () {
            return m(a);
          },
          function () {
            return this;
          },
          a
        );
      return (
        !O &&
          "undefined" != typeof window &&
          !window.Touch &&
          window.console &&
          console.log("Should be empty:", Q),
        (O = !0),
        P.push(b),
        Q.push(a),
        b
      );
    }
    function n(a) {
      if (j(a)) return a;
      if ((a = i(a)) && "function" == typeof a.then) {
        var b = g();
        return a.then(b.resolve, b.reject, b.notify), b.promise;
      }
      return h(
        {
          when: function () {
            return a;
          },
          get: function (b) {
            return a[b];
          },
          put: function (b, c) {
            return (a[b] = c), a;
          },
          del: function (b) {
            return delete a[b], a;
          },
          post: function (b, c) {
            return a[b].apply(a, c);
          },
          apply: function (b) {
            return a.apply(void 0, b);
          },
          keys: function () {
            return L(a);
          },
        },
        void 0,
        function () {
          return a;
        }
      );
    }
    function o(a, b, d, e) {
      function f(a) {
        try {
          return b ? b(a) : a;
        } catch (c) {
          return m(c);
        }
      }
      function h(a) {
        if (d) {
          c(a, k);
          try {
            return d(a);
          } catch (b) {
            return m(b);
          }
        }
        return m(a);
      }
      var i = g(),
        j = !1,
        k = n(a);
      return (
        A(function () {
          k.promiseDispatch(
            function (a) {
              j || ((j = !0), i.resolve(f(a)));
            },
            "when",
            [
              function (a) {
                j || ((j = !0), i.resolve(h(a)));
              },
            ]
          );
        }),
        k.promiseDispatch(void 0, "when", [
          void 0,
          function (a) {
            i.notify(e ? e(a) : a);
          },
        ]),
        i.promise
      );
    }
    function p(a, b, c) {
      return o(
        a,
        function (a) {
          return t(a).then(function (a) {
            return b.apply(void 0, a);
          }, c);
        },
        c
      );
    }
    function q(a, b, c) {
      var d = g();
      return (
        A(function () {
          n(a).promiseDispatch(d.resolve, b, c);
        }),
        d.promise
      );
    }
    function r(a) {
      return function (b) {
        var c = G(arguments, 1);
        return q(b, a, c);
      };
    }
    function s(a) {
      var b = G(arguments, 1);
      return S(a, b);
    }
    function t(a) {
      return o(a, function (a) {
        var b = a.length;
        if (0 === b) return n(a);
        var c = g();
        return (
          H(
            a,
            function (d, e, f) {
              k(e)
                ? ((a[f] = i(e)), 0 === --b && c.resolve(a))
                : o(e, function (d) {
                    (a[f] = d), 0 === --b && c.resolve(a);
                  }).fail(c.reject);
            },
            void 0
          ),
          c.promise
        );
      });
    }
    function u(a, b) {
      return o(a, void 0, b);
    }
    function v(a, b) {
      var c = G(arguments, 2),
        d = g();
      return c.push(d.makeNodeResolver()), R(a, b, c).fail(d.reject), d.promise;
    }
    var w,
      x = e(),
      y = function () {},
      z = Object.freeze || y;
    "undefined" != typeof cajaVM && (z = cajaVM.def);
    var A;
    if ("undefined" != typeof process) A = process.nextTick;
    else if ("function" == typeof setImmediate) A = setImmediate;
    else if ("undefined" != typeof MessageChannel) {
      var B = new MessageChannel(),
        C = {},
        D = C;
      (B.port1.onmessage = function () {
        C = C.next;
        var a = C.task;
        delete C.task, a();
      }),
        (A = function (a) {
          (D = D.next = { task: a }), B.port2.postMessage(0);
        });
    } else
      A = function (a) {
        setTimeout(a, 0);
      };
    var E;
    Function.prototype.bind
      ? ((E = Function.prototype.bind), (E = E.bind(E.call)))
      : (E = function (a) {
          return function () {
            return a.call.apply(a, arguments);
          };
        });
    var F,
      G = E(Array.prototype.slice),
      H = E(
        Array.prototype.reduce ||
          function (a, b) {
            var c = 0,
              d = this.length;
            if (1 === arguments.length)
              for (;;) {
                if (c in this) {
                  b = this[c++];
                  break;
                }
                if (++c >= d) throw new TypeError();
              }
            for (; d > c; c++) c in this && (b = a(b, this[c], c));
            return b;
          }
      ),
      I = E(
        Array.prototype.indexOf ||
          function (a) {
            for (var b = 0; b < this.length; b++) if (this[b] === a) return b;
            return -1;
          }
      ),
      J = E(
        Array.prototype.map ||
          function (a, b) {
            var c = this,
              d = [];
            return (
              H(
                c,
                function (e, f, g) {
                  d.push(a.call(b, f, g, c));
                },
                void 0
              ),
              d
            );
          }
      ),
      K =
        Object.create ||
        function (a) {
          function b() {}
          return (b.prototype = a), new b();
        },
      L =
        Object.keys ||
        function (a) {
          var b,
            c = [];
          for (b in a) c.push(b);
          return c;
        },
      M = Object.prototype.toString;
    F =
      "undefined" != typeof ReturnValue
        ? ReturnValue
        : function (a) {
            this.value = a;
          };
    var N = "From previous event:";
    (b.nextTick = A),
      (b.defer = g),
      (g.prototype.makeNodeResolver = function () {
        var a = this;
        return function (b, c) {
          b
            ? a.reject(b)
            : arguments.length > 2
            ? a.resolve(G(arguments, 1))
            : a.resolve(c);
        };
      }),
      (b.promise = function (a) {
        var b = g();
        return s(a, b.resolve, b.reject, b.notify).fail(b.reject), b.promise;
      }),
      (b.makePromise = h),
      (h.prototype.then = function (a, b, c) {
        return o(this, a, b, c);
      }),
      (h.prototype.thenResolve = function (a) {
        return o(this, function () {
          return a;
        });
      }),
      H(
        "isResolved isFulfilled isRejected dispatch when spread get put del post send invoke keys fapply fcall fbind all allResolved timeout delay catch finally fail fin progress end done nfcall nfapply nfbind ncall napply nbind npost nsend ninvoke nend nodeify".split(
          " "
        ),
        function (a, c) {
          h.prototype[c] = function () {
            return b[c].apply(b, [this].concat(G(arguments)));
          };
        },
        void 0
      ),
      (h.prototype.toSource = function () {
        return this.toString();
      }),
      (h.prototype.toString = function () {
        return "[object Promise]";
      }),
      z(h.prototype),
      (b.nearer = i),
      (b.isPromise = j),
      (b.isResolved = function (a) {
        return k(a) || l(a);
      }),
      (b.isFulfilled = k),
      (b.isRejected = l);
    var O,
      P = [],
      Q = [];
    (b.reject = m),
      (b.resolve = n),
      (b.master = function (a) {
        return h(
          { isDef: function () {} },
          function (b, c) {
            return q(a, b, c);
          },
          function () {
            return i(a);
          }
        );
      }),
      (b.when = o),
      (b.spread = p),
      (b.async = function (a) {
        return function () {
          function b(a, b) {
            var f;
            try {
              f = c[a](b);
            } catch (g) {
              return "[object StopIteration]" === M(g) || g instanceof F
                ? g.value
                : m(g);
            }
            return o(f, d, e);
          }
          var c = a.apply(this, arguments),
            d = b.bind(b, "send"),
            e = b.bind(b, "throw");
          return d();
        };
      }),
      (b["return"] = function (a) {
        throw new F(a);
      }),
      (b.promised = function (a) {
        return function () {
          return p([this, t(arguments)], function (b, c) {
            return a.apply(b, c);
          });
        };
      }),
      (b.dispatch = q),
      (b.dispatcher = r),
      (b.get = r("get")),
      (b.put = r("put")),
      (b["delete"] = b.del = r("del"));
    var R = (b.post = r("post"));
    (b.send = function (a, b) {
      var c = G(arguments, 2);
      return R(a, b, c);
    }),
      (b.invoke = f(b.send, "invoke", "send"));
    var S = (b.fapply = r("apply"));
    (b["try"] = s),
      (b.fcall = s),
      (b.fbind = function (a) {
        var b = G(arguments, 1);
        return function () {
          var c = b.concat(G(arguments));
          return S(a, c);
        };
      }),
      (b.keys = r("keys")),
      (b.all = t),
      (b.allResolved = function (a) {
        return o(a, function (a) {
          return o(
            t(
              J(a, function (a) {
                return o(a, y, y);
              })
            ),
            function () {
              return J(a, n);
            }
          );
        });
      }),
      (b["catch"] = b.fail = u),
      (b.progress = function (a, b) {
        return o(a, void 0, void 0, b);
      }),
      (b["finally"] = b.fin =
        function (a, b) {
          return o(
            a,
            function (a) {
              return o(b(), function () {
                return a;
              });
            },
            function (a) {
              return o(b(), function () {
                return m(a);
              });
            }
          );
        }),
      (b.done = function (a, d, e, f) {
        (d = d || e || f ? o(a, d, e, f) : a),
          u(d, function (d) {
            A(function () {
              if ((c(d, a), !b.onerror)) throw d;
              b.onerror(d);
            });
          });
      }),
      (b.timeout = function (a, b) {
        var c = g(),
          d = setTimeout(function () {
            c.reject(Error("Timed out after " + b + " ms"));
          }, b);
        return (
          o(
            a,
            function (a) {
              clearTimeout(d), c.resolve(a);
            },
            function (a) {
              clearTimeout(d), c.reject(a);
            }
          ),
          c.promise
        );
      }),
      (b.delay = function (a, b) {
        void 0 === b && ((b = a), (a = void 0));
        var c = g();
        return (
          setTimeout(function () {
            c.resolve(a);
          }, b),
          c.promise
        );
      }),
      (b.nfapply = function (a, b) {
        var c = G(b),
          d = g();
        return c.push(d.makeNodeResolver()), S(a, c).fail(d.reject), d.promise;
      }),
      (b.nfcall = function (a) {
        var b = G(arguments, 1),
          c = g();
        return b.push(c.makeNodeResolver()), S(a, b).fail(c.reject), c.promise;
      }),
      (b.nfbind = function (a) {
        var b = G(arguments, 1);
        return function () {
          var c = b.concat(G(arguments)),
            d = g();
          return (
            c.push(d.makeNodeResolver()), S(a, c).fail(d.reject), d.promise
          );
        };
      }),
      (b.npost = function (a, b, c) {
        var c = G(c),
          d = g();
        return (
          c.push(d.makeNodeResolver()), R(a, b, c).fail(d.reject), d.promise
        );
      }),
      (b.nsend = v),
      (b.ninvoke = f(v, "ninvoke", "nsend")),
      (b.nodeify = function (a, b) {
        return b
          ? (a.then(
              function (a) {
                A(function () {
                  b(null, a);
                });
              },
              function (a) {
                A(function () {
                  b(a);
                });
              }
            ),
            void 0)
          : a;
      });
    var T = e();
  }),
  (function (a) {
    "use strict";
    var b = { VERSION: "0.5.3" };
    (b.System = function () {
      (this._mappings = {}),
        (this._outlets = {}),
        (this._handlers = {}),
        (this.strictInjections = !0),
        (this.autoMapOutlets = !1),
        (this.postInjectionHook = "setup");
    }),
      (b.System.prototype = {
        _createAndSetupInstance: function (a, b) {
          var c = new b();
          return this.injectInto(c, a), c;
        },
        _retrieveFromCacheOrCreate: function (a, b) {
          "undefined" == typeof b && (b = !1);
          var c;
          if (!this._mappings.hasOwnProperty(a)) throw new Error(1e3);
          var d = this._mappings[a];
          return (
            !b && d.isSingleton
              ? (null == d.object &&
                  (d.object = this._createAndSetupInstance(a, d.clazz)),
                (c = d.object))
              : (c = d.clazz
                  ? this._createAndSetupInstance(a, d.clazz)
                  : d.object),
            c
          );
        },
        mapOutlet: function (a, b, c) {
          if ("undefined" == typeof a) throw new Error(1010);
          return (
            (b = b || "global"),
            (c = c || a),
            this._outlets.hasOwnProperty(b) || (this._outlets[b] = {}),
            (this._outlets[b][c] = a),
            this
          );
        },
        getObject: function (a) {
          if ("undefined" == typeof a) throw new Error(1020);
          return this._retrieveFromCacheOrCreate(a);
        },
        mapValue: function (a, b) {
          if ("undefined" == typeof a) throw new Error(1030);
          return (
            (this._mappings[a] = { clazz: null, object: b, isSingleton: !0 }),
            this.autoMapOutlets && this.mapOutlet(a),
            this.hasMapping(a) && this.injectInto(b, a),
            this
          );
        },
        hasMapping: function (a) {
          if ("undefined" == typeof a) throw new Error(1040);
          return this._mappings.hasOwnProperty(a);
        },
        mapClass: function (a, b) {
          if ("undefined" == typeof a) throw new Error(1050);
          if ("undefined" == typeof b) throw new Error(1051);
          return (
            (this._mappings[a] = { clazz: b, object: null, isSingleton: !1 }),
            this.autoMapOutlets && this.mapOutlet(a),
            this
          );
        },
        mapSingleton: function (a, b) {
          if ("undefined" == typeof a) throw new Error(1060);
          if ("undefined" == typeof b) throw new Error(1061);
          return (
            (this._mappings[a] = { clazz: b, object: null, isSingleton: !0 }),
            this.autoMapOutlets && this.mapOutlet(a),
            this
          );
        },
        instantiate: function (a) {
          if ("undefined" == typeof a) throw new Error(1070);
          return this._retrieveFromCacheOrCreate(a, !0);
        },
        injectInto: function (a, b) {
          if ("undefined" == typeof a) throw new Error(1080);
          if ("object" == typeof a) {
            var c = [];
            this._outlets.hasOwnProperty("global") &&
              c.push(this._outlets.global),
              "undefined" != typeof b &&
                this._outlets.hasOwnProperty(b) &&
                c.push(this._outlets[b]);
            for (var d in c) {
              var e = c[d];
              for (var f in e) {
                var g = e[f];
                (!this.strictInjections || f in a) &&
                  (a[f] = this.getObject(g));
              }
            }
            "setup" in a && a.setup.call(a);
          }
          return this;
        },
        unmap: function (a) {
          if ("undefined" == typeof a) throw new Error(1090);
          return delete this._mappings[a], this;
        },
        unmapOutlet: function (a, b) {
          if ("undefined" == typeof a) throw new Error(1100);
          if ("undefined" == typeof b) throw new Error(1101);
          return delete this._outlets[a][b], this;
        },
        mapHandler: function (a, b, c, d, e) {
          if ("undefined" == typeof a) throw new Error(1110);
          return (
            (b = b || "global"),
            (c = c || a),
            "undefined" == typeof d && (d = !1),
            "undefined" == typeof e && (e = !1),
            this._handlers.hasOwnProperty(a) || (this._handlers[a] = {}),
            this._handlers[a].hasOwnProperty(b) || (this._handlers[a][b] = []),
            this._handlers[a][b].push({ handler: c, oneShot: d, passEvent: e }),
            this
          );
        },
        unmapHandler: function (a, b, c) {
          if ("undefined" == typeof a) throw new Error(1120);
          if (
            ((b = b || "global"),
            (c = c || a),
            this._handlers.hasOwnProperty(a) &&
              this._handlers[a].hasOwnProperty(b))
          ) {
            var d = this._handlers[a][b];
            for (var e in d) {
              var f = d[e];
              if (f.handler === c) {
                d.splice(e, 1);
                break;
              }
            }
          }
          return this;
        },
        notify: function (a) {
          if ("undefined" == typeof a) throw new Error(1130);
          var b = Array.prototype.slice.call(arguments),
            c = b.slice(1);
          if (this._handlers.hasOwnProperty(a)) {
            var d = this._handlers[a];
            for (var e in d) {
              var f,
                g = d[e];
              "global" !== e && (f = this.getObject(e));
              var h,
                i,
                j = [];
              for (h = 0, i = g.length; i > h; h++) {
                var k,
                  l = g[h];
                (k =
                  f && "string" == typeof l.handler ? f[l.handler] : l.handler),
                  l.oneShot && j.unshift(h),
                  l.passEvent ? k.apply(f, b) : k.apply(f, c);
              }
              for (h = 0, i = j.length; i > h; h++) g.splice(j[h], 1);
            }
          }
          return this;
        },
      }),
      (a.dijon = b);
  })(this),
  "undefined" == typeof utils)
)
  var utils = {};
"undefined" == typeof utils.Math && (utils.Math = {}),
  (utils.Math.to64BitNumber = function (a, b) {
    var c, d, e;
    return (
      (c = new goog.math.Long(0, b)),
      (d = new goog.math.Long(a, 0)),
      (e = c.add(d)),
      e.toNumber()
    );
  }),
  (goog = {}),
  (goog.math = {}),
  (goog.math.Long = function (a, b) {
    (this.low_ = 0 | a), (this.high_ = 0 | b);
  }),
  (goog.math.Long.IntCache_ = {}),
  (goog.math.Long.fromInt = function (a) {
    if (a >= -128 && 128 > a) {
      var b = goog.math.Long.IntCache_[a];
      if (b) return b;
    }
    var c = new goog.math.Long(0 | a, 0 > a ? -1 : 0);
    return a >= -128 && 128 > a && (goog.math.Long.IntCache_[a] = c), c;
  }),
  (goog.math.Long.fromNumber = function (a) {
    return isNaN(a) || !isFinite(a)
      ? goog.math.Long.ZERO
      : a <= -goog.math.Long.TWO_PWR_63_DBL_
      ? goog.math.Long.MIN_VALUE
      : a + 1 >= goog.math.Long.TWO_PWR_63_DBL_
      ? goog.math.Long.MAX_VALUE
      : 0 > a
      ? goog.math.Long.fromNumber(-a).negate()
      : new goog.math.Long(
          0 | a % goog.math.Long.TWO_PWR_32_DBL_,
          0 | (a / goog.math.Long.TWO_PWR_32_DBL_)
        );
  }),
  (goog.math.Long.fromBits = function (a, b) {
    return new goog.math.Long(a, b);
  }),
  (goog.math.Long.fromString = function (a, b) {
    if (0 == a.length) throw Error("number format error: empty string");
    var c = b || 10;
    if (2 > c || c > 36) throw Error("radix out of range: " + c);
    if ("-" == a.charAt(0))
      return goog.math.Long.fromString(a.substring(1), c).negate();
    if (a.indexOf("-") >= 0)
      throw Error('number format error: interior "-" character: ' + a);
    for (
      var d = goog.math.Long.fromNumber(Math.pow(c, 8)),
        e = goog.math.Long.ZERO,
        f = 0;
      f < a.length;
      f += 8
    ) {
      var g = Math.min(8, a.length - f),
        h = parseInt(a.substring(f, f + g), c);
      if (8 > g) {
        var i = goog.math.Long.fromNumber(Math.pow(c, g));
        e = e.multiply(i).add(goog.math.Long.fromNumber(h));
      } else (e = e.multiply(d)), (e = e.add(goog.math.Long.fromNumber(h)));
    }
    return e;
  }),
  (goog.math.Long.TWO_PWR_16_DBL_ = 65536),
  (goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24),
  (goog.math.Long.TWO_PWR_32_DBL_ =
    goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_),
  (goog.math.Long.TWO_PWR_31_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ / 2),
  (goog.math.Long.TWO_PWR_48_DBL_ =
    goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_),
  (goog.math.Long.TWO_PWR_64_DBL_ =
    goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_),
  (goog.math.Long.TWO_PWR_63_DBL_ = goog.math.Long.TWO_PWR_64_DBL_ / 2),
  (goog.math.Long.ZERO = goog.math.Long.fromInt(0)),
  (goog.math.Long.ONE = goog.math.Long.fromInt(1)),
  (goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1)),
  (goog.math.Long.MAX_VALUE = goog.math.Long.fromBits(-1, 2147483647)),
  (goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, -2147483648)),
  (goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24)),
  (goog.math.Long.prototype.toInt = function () {
    return this.low_;
  }),
  (goog.math.Long.prototype.toNumber = function () {
    return (
      this.high_ * goog.math.Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
    );
  }),
  (goog.math.Long.prototype.toString = function (a) {
    var b = a || 10;
    if (2 > b || b > 36) throw Error("radix out of range: " + b);
    if (this.isZero()) return "0";
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        var c = goog.math.Long.fromNumber(b),
          d = this.div(c),
          e = d.multiply(c).subtract(this);
        return d.toString(b) + e.toInt().toString(b);
      }
      return "-" + this.negate().toString(b);
    }
    for (
      var f = goog.math.Long.fromNumber(Math.pow(b, 6)), e = this, g = "";
      ;

    ) {
      var h = e.div(f),
        i = e.subtract(h.multiply(f)).toInt(),
        j = i.toString(b);
      if (((e = h), e.isZero())) return j + g;
      for (; j.length < 6; ) j = "0" + j;
      g = "" + j + g;
    }
  }),
  (goog.math.Long.prototype.getHighBits = function () {
    return this.high_;
  }),
  (goog.math.Long.prototype.getLowBits = function () {
    return this.low_;
  }),
  (goog.math.Long.prototype.getLowBitsUnsigned = function () {
    return this.low_ >= 0
      ? this.low_
      : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  }),
  (goog.math.Long.prototype.getNumBitsAbs = function () {
    if (this.isNegative())
      return this.equals(goog.math.Long.MIN_VALUE)
        ? 64
        : this.negate().getNumBitsAbs();
    for (
      var a = 0 != this.high_ ? this.high_ : this.low_, b = 31;
      b > 0 && 0 == (a & (1 << b));
      b--
    );
    return 0 != this.high_ ? b + 33 : b + 1;
  }),
  (goog.math.Long.prototype.isZero = function () {
    return 0 == this.high_ && 0 == this.low_;
  }),
  (goog.math.Long.prototype.isNegative = function () {
    return this.high_ < 0;
  }),
  (goog.math.Long.prototype.isOdd = function () {
    return 1 == (1 & this.low_);
  }),
  (goog.math.Long.prototype.equals = function (a) {
    return this.high_ == a.high_ && this.low_ == a.low_;
  }),
  (goog.math.Long.prototype.notEquals = function (a) {
    return this.high_ != a.high_ || this.low_ != a.low_;
  }),
  (goog.math.Long.prototype.lessThan = function (a) {
    return this.compare(a) < 0;
  }),
  (goog.math.Long.prototype.lessThanOrEqual = function (a) {
    return this.compare(a) <= 0;
  }),
  (goog.math.Long.prototype.greaterThan = function (a) {
    return this.compare(a) > 0;
  }),
  (goog.math.Long.prototype.greaterThanOrEqual = function (a) {
    return this.compare(a) >= 0;
  }),
  (goog.math.Long.prototype.compare = function (a) {
    if (this.equals(a)) return 0;
    var b = this.isNegative(),
      c = a.isNegative();
    return b && !c ? -1 : !b && c ? 1 : this.subtract(a).isNegative() ? -1 : 1;
  }),
  (goog.math.Long.prototype.negate = function () {
    return this.equals(goog.math.Long.MIN_VALUE)
      ? goog.math.Long.MIN_VALUE
      : this.not().add(goog.math.Long.ONE);
  }),
  (goog.math.Long.prototype.add = function (a) {
    var b = this.high_ >>> 16,
      c = 65535 & this.high_,
      d = this.low_ >>> 16,
      e = 65535 & this.low_,
      f = a.high_ >>> 16,
      g = 65535 & a.high_,
      h = a.low_ >>> 16,
      i = 65535 & a.low_,
      j = 0,
      k = 0,
      l = 0,
      m = 0;
    return (
      (m += e + i),
      (l += m >>> 16),
      (m &= 65535),
      (l += d + h),
      (k += l >>> 16),
      (l &= 65535),
      (k += c + g),
      (j += k >>> 16),
      (k &= 65535),
      (j += b + f),
      (j &= 65535),
      goog.math.Long.fromBits((l << 16) | m, (j << 16) | k)
    );
  }),
  (goog.math.Long.prototype.subtract = function (a) {
    return this.add(a.negate());
  }),
  (goog.math.Long.prototype.multiply = function (a) {
    if (this.isZero()) return goog.math.Long.ZERO;
    if (a.isZero()) return goog.math.Long.ZERO;
    if (this.equals(goog.math.Long.MIN_VALUE))
      return a.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    if (a.equals(goog.math.Long.MIN_VALUE))
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    if (this.isNegative())
      return a.isNegative()
        ? this.negate().multiply(a.negate())
        : this.negate().multiply(a).negate();
    if (a.isNegative()) return this.multiply(a.negate()).negate();
    if (
      this.lessThan(goog.math.Long.TWO_PWR_24_) &&
      a.lessThan(goog.math.Long.TWO_PWR_24_)
    )
      return goog.math.Long.fromNumber(this.toNumber() * a.toNumber());
    var b = this.high_ >>> 16,
      c = 65535 & this.high_,
      d = this.low_ >>> 16,
      e = 65535 & this.low_,
      f = a.high_ >>> 16,
      g = 65535 & a.high_,
      h = a.low_ >>> 16,
      i = 65535 & a.low_,
      j = 0,
      k = 0,
      l = 0,
      m = 0;
    return (
      (m += e * i),
      (l += m >>> 16),
      (m &= 65535),
      (l += d * i),
      (k += l >>> 16),
      (l &= 65535),
      (l += e * h),
      (k += l >>> 16),
      (l &= 65535),
      (k += c * i),
      (j += k >>> 16),
      (k &= 65535),
      (k += d * h),
      (j += k >>> 16),
      (k &= 65535),
      (k += e * g),
      (j += k >>> 16),
      (k &= 65535),
      (j += b * i + c * h + d * g + e * f),
      (j &= 65535),
      goog.math.Long.fromBits((l << 16) | m, (j << 16) | k)
    );
  }),
  (goog.math.Long.prototype.div = function (a) {
    if (a.isZero()) throw Error("division by zero");
    if (this.isZero()) return goog.math.Long.ZERO;
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (a.equals(goog.math.Long.ONE) || a.equals(goog.math.Long.NEG_ONE))
        return goog.math.Long.MIN_VALUE;
      if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ONE;
      var b = this.shiftRight(1),
        c = b.div(a).shiftLeft(1);
      if (c.equals(goog.math.Long.ZERO))
        return a.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
      var d = this.subtract(a.multiply(c)),
        e = c.add(d.div(a));
      return e;
    }
    if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ZERO;
    if (this.isNegative())
      return a.isNegative()
        ? this.negate().div(a.negate())
        : this.negate().div(a).negate();
    if (a.isNegative()) return this.div(a.negate()).negate();
    for (var f = goog.math.Long.ZERO, d = this; d.greaterThanOrEqual(a); ) {
      for (
        var c = Math.max(1, Math.floor(d.toNumber() / a.toNumber())),
          g = Math.ceil(Math.log(c) / Math.LN2),
          h = 48 >= g ? 1 : Math.pow(2, g - 48),
          i = goog.math.Long.fromNumber(c),
          j = i.multiply(a);
        j.isNegative() || j.greaterThan(d);

      )
        (c -= h), (i = goog.math.Long.fromNumber(c)), (j = i.multiply(a));
      i.isZero() && (i = goog.math.Long.ONE),
        (f = f.add(i)),
        (d = d.subtract(j));
    }
    return f;
  }),
  (goog.math.Long.prototype.modulo = function (a) {
    return this.subtract(this.div(a).multiply(a));
  }),
  (goog.math.Long.prototype.not = function () {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  }),
  (goog.math.Long.prototype.and = function (a) {
    return goog.math.Long.fromBits(this.low_ & a.low_, this.high_ & a.high_);
  }),
  (goog.math.Long.prototype.or = function (a) {
    return goog.math.Long.fromBits(this.low_ | a.low_, this.high_ | a.high_);
  }),
  (goog.math.Long.prototype.xor = function (a) {
    return goog.math.Long.fromBits(this.low_ ^ a.low_, this.high_ ^ a.high_);
  }),
  (goog.math.Long.prototype.shiftLeft = function (a) {
    if (((a &= 63), 0 == a)) return this;
    var b = this.low_;
    if (32 > a) {
      var c = this.high_;
      return goog.math.Long.fromBits(b << a, (c << a) | (b >>> (32 - a)));
    }
    return goog.math.Long.fromBits(0, b << (a - 32));
  }),
  (goog.math.Long.prototype.shiftRight = function (a) {
    if (((a &= 63), 0 == a)) return this;
    var b = this.high_;
    if (32 > a) {
      var c = this.low_;
      return goog.math.Long.fromBits((c >>> a) | (b << (32 - a)), b >> a);
    }
    return goog.math.Long.fromBits(b >> (a - 32), b >= 0 ? 0 : -1);
  }),
  (goog.math.Long.prototype.shiftRightUnsigned = function (a) {
    if (((a &= 63), 0 == a)) return this;
    var b = this.high_;
    if (32 > a) {
      var c = this.low_;
      return goog.math.Long.fromBits((c >>> a) | (b << (32 - a)), b >>> a);
    }
    return 32 == a
      ? goog.math.Long.fromBits(b, 0)
      : goog.math.Long.fromBits(b >>> (a - 32), 0);
  });
var UTF8 = {};
(UTF8.encode = function (a) {
  for (var b = [], c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    128 > d
      ? b.push(d)
      : 2048 > d
      ? (b.push(192 | (d >> 6)), b.push(128 | (63 & d)))
      : 65536 > d
      ? (b.push(224 | (d >> 12)),
        b.push(128 | (63 & (d >> 6))),
        b.push(128 | (63 & d)))
      : (b.push(240 | (d >> 18)),
        b.push(128 | (63 & (d >> 12))),
        b.push(128 | (63 & (d >> 6))),
        b.push(128 | (63 & d)));
  }
  return b;
}),
  (UTF8.decode = function (a) {
    for (var b = [], c = 0; c < a.length; ) {
      var d = a[c++];
      128 > d ||
        (224 > d
          ? ((d = (31 & d) << 6), (d |= 63 & a[c++]))
          : 240 > d
          ? ((d = (15 & d) << 12),
            (d |= (63 & a[c++]) << 6),
            (d |= 63 & a[c++]))
          : ((d = (7 & d) << 18),
            (d |= (63 & a[c++]) << 12),
            (d |= (63 & a[c++]) << 6),
            (d |= 63 & a[c++]))),
        b.push(String.fromCharCode(d));
    }
    return b.join("");
  });
var BASE64 = {};
if (
  ((function (b) {
    var c = function (a) {
        for (var c = 0, d = [], e = 0 | (a.length / 3); 0 < e--; ) {
          var f = (a[c] << 16) + (a[c + 1] << 8) + a[c + 2];
          (c += 3),
            d.push(b.charAt(63 & (f >> 18))),
            d.push(b.charAt(63 & (f >> 12))),
            d.push(b.charAt(63 & (f >> 6))),
            d.push(b.charAt(63 & f));
        }
        if (2 == a.length - c) {
          var f = (a[c] << 16) + (a[c + 1] << 8);
          d.push(b.charAt(63 & (f >> 18))),
            d.push(b.charAt(63 & (f >> 12))),
            d.push(b.charAt(63 & (f >> 6))),
            d.push("=");
        } else if (1 == a.length - c) {
          var f = a[c] << 16;
          d.push(b.charAt(63 & (f >> 18))),
            d.push(b.charAt(63 & (f >> 12))),
            d.push("==");
        }
        return d.join("");
      },
      d = (function () {
        for (var a = [], c = 0; c < b.length; ++c) a[b.charCodeAt(c)] = c;
        return (a["=".charCodeAt(0)] = 0), a;
      })(),
      e = function (a) {
        for (var b = 0, c = [], e = 0 | (a.length / 4); 0 < e--; ) {
          var f =
            (d[a.charCodeAt(b)] << 18) +
            (d[a.charCodeAt(b + 1)] << 12) +
            (d[a.charCodeAt(b + 2)] << 6) +
            d[a.charCodeAt(b + 3)];
          c.push(255 & (f >> 16)),
            c.push(255 & (f >> 8)),
            c.push(255 & f),
            (b += 4);
        }
        return (
          c &&
            ("=" == a.charAt(b - 2)
              ? (c.pop(), c.pop())
              : "=" == a.charAt(b - 1) && c.pop()),
          c
        );
      },
      f = {};
    (f.encode = function (a) {
      for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c));
      return b;
    }),
      (f.decode = function () {
        for (var b = 0; b < s.length; ++b) a[b] = String.fromCharCode(a[b]);
        return a.join("");
      }),
      (BASE64.decodeArray = function (a) {
        var b = e(a);
        return new Uint8Array(b);
      }),
      (BASE64.encodeASCII = function (a) {
        var b = f.encode(a);
        return c(b);
      }),
      (BASE64.decodeASCII = function (a) {
        var b = e(a);
        return f.decode(b);
      }),
      (BASE64.encode = function (a) {
        var b = UTF8.encode(a);
        return c(b);
      }),
      (BASE64.decode = function (a) {
        var b = e(a);
        return UTF8.decode(b);
      });
  })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),
  void 0 === btoa)
)
  var btoa = BASE64.encode;
if (void 0 === atob) var atob = BASE64.decode;
(MediaPlayer = function (a) {
  "use strict";
  var b,
    c,
    d,
    e,
    f,
    g = "1.0.0",
    h = a,
    i = !1,
    j = !1,
    k = !0,
    l = function () {
      return void 0 !== c && void 0 !== d;
    },
    m = function () {
      if (!i) throw "MediaPlayer not initialized!";
      if (!this.capabilities.supportsMediaSource())
        return (
          alert(
            "Your browser does not support the MediaSource API.  Please try another browser, such as Chrome."
          ),
          void 0
        );
      if (!c || !d) throw "Missing view or source.";
      (j = !0),
        this.debug.log("Playback initiated!"),
        (f = b.getObject("streamController")),
        f.setVideoModel(this.videoModel),
        f.setAutoPlay(k),
        f.load(d);
    },
    n = function () {
      l() && m.call(this);
    };
  return (
    (b = new dijon.System()),
    b.mapValue("system", b),
    b.mapOutlet("system"),
    b.injectInto(h),
    {
      debug: void 0,
      eventBus: void 0,
      capabilities: void 0,
      videoModel: void 0,
      abrController: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      addEventListener: function (a, b, c) {
        this.eventBus.addEventListener(a, b, c);
      },
      removeEventListener: function (a, b, c) {
        this.eventBus.removeEventListener(a, b, c);
      },
      getVersion: function () {
        return g;
      },
      startup: function () {
        i || (b.injectInto(this), (i = !0));
      },
      getDebug: function () {
        return this.debug;
      },
      getVideoModel: function () {
        return this.videoModel;
      },
      setAutoPlay: function (a) {
        k = a;
      },
      getAutoPlay: function () {
        return k;
      },
      getMetricsExt: function () {
        return this.metricsExt;
      },
      getMetricsFor: function (a) {
        var b = this.metricsModel.getReadOnlyMetricsFor(a);
        return b;
      },
      getQualityFor: function (a) {
        return this.abrController.getQualityFor(a);
      },
      setQualityFor: function (a, b) {
        this.abrController.setPlaybackQuality(a, b);
      },
      getAutoSwitchQuality: function () {
        return this.abrController.getAutoSwitchBitrate();
      },
      setAutoSwitchQuality: function (a) {
        this.abrController.setAutoSwitchBitrate(a);
      },
      attachView: function (a) {
        if (!i) throw "MediaPlayer not initialized!";
        (c = a),
          (e = new MediaPlayer.models.VideoModel(c)),
          this.videoModel.setElement(c),
          j || n.call(this);
      },
      attachSource: function (a) {
        if (!i) throw "MediaPlayer not initialized!";
        (d = a), j && (f.reset(), (f = null)), n.call(this);
      },
      play: m,
    }
  );
}),
  (MediaPlayer.prototype = { constructor: MediaPlayer }),
  (MediaPlayer.dependencies = {}),
  (MediaPlayer.utils = {}),
  (MediaPlayer.models = {}),
  (MediaPlayer.vo = {}),
  (MediaPlayer.vo.metrics = {}),
  (MediaPlayer.rules = {}),
  (MediaPlayer.di = {}),
  (MediaPlayer.di.Context = function () {
    "use strict";
    return {
      system: void 0,
      setup: function () {
        (this.system.autoMapOutlets = !0),
          this.system.mapSingleton("debug", MediaPlayer.utils.Debug),
          this.system.mapSingleton("eventBus", MediaPlayer.utils.EventBus),
          this.system.mapSingleton(
            "capabilities",
            MediaPlayer.utils.Capabilities
          ),
          this.system.mapSingleton(
            "textTrackExtensions",
            MediaPlayer.utils.TextTrackExtensions
          ),
          this.system.mapSingleton("vttParser", MediaPlayer.utils.VTTParser),
          this.system.mapClass("videoModel", MediaPlayer.models.VideoModel),
          this.system.mapSingleton(
            "manifestModel",
            MediaPlayer.models.ManifestModel
          ),
          this.system.mapSingleton(
            "metricsModel",
            MediaPlayer.models.MetricsModel
          ),
          this.system.mapClass(
            "protectionModel",
            MediaPlayer.models.ProtectionModel
          ),
          this.system.mapSingleton(
            "textVTTSourceBuffer",
            MediaPlayer.dependencies.TextVTTSourceBuffer
          ),
          this.system.mapSingleton(
            "mediaSourceExt",
            MediaPlayer.dependencies.MediaSourceExtensions
          ),
          this.system.mapSingleton(
            "sourceBufferExt",
            MediaPlayer.dependencies.SourceBufferExtensions
          ),
          this.system.mapSingleton(
            "bufferExt",
            MediaPlayer.dependencies.BufferExtensions
          ),
          this.system.mapSingleton(
            "abrController",
            MediaPlayer.dependencies.AbrController
          ),
          this.system.mapSingleton(
            "errHandler",
            MediaPlayer.dependencies.ErrorHandler
          ),
          this.system.mapSingleton(
            "protectionExt",
            MediaPlayer.dependencies.ProtectionExtensions
          ),
          this.system.mapClass(
            "protectionController",
            MediaPlayer.dependencies.ProtectionController
          ),
          this.system.mapClass("metrics", MediaPlayer.models.MetricsList),
          this.system.mapClass(
            "downloadRatioRule",
            MediaPlayer.rules.DownloadRatioRule
          ),
          this.system.mapClass(
            "insufficientBufferRule",
            MediaPlayer.rules.InsufficientBufferRule
          ),
          this.system.mapClass(
            "limitSwitchesRule",
            MediaPlayer.rules.LimitSwitchesRule
          ),
          this.system.mapClass(
            "abrRulesCollection",
            MediaPlayer.rules.BaseRulesCollection
          ),
          this.system.mapClass(
            "textController",
            MediaPlayer.dependencies.TextController
          ),
          this.system.mapClass(
            "bufferController",
            MediaPlayer.dependencies.BufferController
          ),
          this.system.mapClass(
            "manifestLoader",
            MediaPlayer.dependencies.ManifestLoader
          ),
          this.system.mapClass(
            "manifestUpdater",
            MediaPlayer.dependencies.ManifestUpdater
          ),
          this.system.mapClass(
            "fragmentController",
            MediaPlayer.dependencies.FragmentController
          ),
          this.system.mapClass(
            "fragmentLoader",
            MediaPlayer.dependencies.FragmentLoader
          ),
          this.system.mapSingleton(
            "streamController",
            MediaPlayer.dependencies.StreamController
          ),
          this.system.mapClass("stream", MediaPlayer.dependencies.Stream);
      },
    };
  }),
  (Dash = (function () {
    "use strict";
    return { modules: {}, dependencies: {}, vo: {}, di: {} };
  })()),
  (Dash.di.DashContext = function () {
    "use strict";
    return {
      system: void 0,
      setup: function () {
        Dash.di.DashContext.prototype.setup.call(this),
          this.system.mapClass("parser", Dash.dependencies.DashParser),
          this.system.mapClass("indexHandler", Dash.dependencies.DashHandler),
          this.system.mapClass(
            "baseURLExt",
            Dash.dependencies.BaseURLExtensions
          ),
          this.system.mapClass(
            "fragmentExt",
            Dash.dependencies.FragmentExtensions
          ),
          this.system.mapSingleton(
            "manifestExt",
            Dash.dependencies.DashManifestExtensions
          ),
          this.system.mapSingleton(
            "metricsExt",
            Dash.dependencies.DashMetricsExtensions
          );
      },
    };
  }),
  (Dash.di.DashContext.prototype = new MediaPlayer.di.Context()),
  (Dash.di.DashContext.prototype.constructor = Dash.di.DashContext),
  (Dash.dependencies.BaseURLExtensions = function () {
    "use strict";
    var a = function (a, b) {
        for (
          var c, d, e, f, g, h, i, j, k, l, m = new DataView(a), n = {}, o = 0;
          "sidx" !== j && o < m.byteLength;

        ) {
          for (k = m.getUint32(o), o += 4, j = "", f = 0; 4 > f; f += 1)
            (l = m.getInt8(o)), (j += String.fromCharCode(l)), (o += 1);
          "moof" !== j && "traf" !== j && "sidx" !== j
            ? (o += k - 8)
            : "sidx" === j && (o -= 8);
        }
        if (((e = m.getUint32(o, !1) + o), e > a.byteLength))
          throw "sidx terminates after array buffer";
        for (
          n.version = m.getUint8(o + 8),
            o += 12,
            n.timescale = m.getUint32(o + 4, !1),
            o += 8,
            0 === n.version
              ? ((n.earliest_presentation_time = m.getUint32(o, !1)),
                (n.first_offset = m.getUint32(o + 4, !1)),
                (o += 8))
              : ((n.earliest_presentation_time = utils.Math.to64BitNumber(
                  m.getUint32(o + 4, !1),
                  m.getUint32(o, !1)
                )),
                (n.first_offset =
                  (m.getUint32(o + 8, !1) << 32) + m.getUint32(o + 12, !1)),
                (o += 16)),
            n.first_offset += e + (b || 0),
            n.reference_count = m.getUint16(o + 2, !1),
            o += 4,
            n.references = [],
            c = n.first_offset,
            d = n.earliest_presentation_time,
            f = 0;
          f < n.reference_count;
          f += 1
        )
          (h = m.getUint32(o, !1)),
            (g = h >>> 31),
            (h = 2147483647 & h),
            (i = m.getUint32(o + 4, !1)),
            (o += 12),
            n.references.push({
              size: h,
              type: g,
              offset: c,
              duration: i,
              time: d,
              timescale: n.timescale,
            }),
            (c += h),
            (d += i);
        if (o !== e)
          throw "Error: final pos " + o + " differs from SIDX end " + e;
        return n;
      },
      b = function (b, c, d) {
        var e, f, g, h, i, j, k, l;
        for (
          e = a.call(this, b, d), f = e.references, g = [], i = 0, j = f.length;
          j > i;
          i += 1
        )
          (h = new Dash.vo.Segment()),
            (h.duration = f[i].duration),
            (h.media = c),
            (h.startTime = f[i].time),
            (h.timescale = f[i].timescale),
            (k = f[i].offset),
            (l = f[i].offset + f[i].size - 1),
            (h.mediaRange = k + "-" + l),
            g.push(h);
        return (
          this.debug.log("Parsed SIDX box: " + g.length + " segments."),
          Q.when(g)
        );
      },
      c = function (a, b) {
        var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = Q.defer(),
          l = new DataView(a),
          m = 0,
          n = "",
          o = 0,
          p = !1,
          q = this;
        for (
          q.debug.log("Searching for initialization.");
          "moov" !== n && m < l.byteLength;

        ) {
          for (o = l.getUint32(m), m += 4, n = "", g = 0; 4 > g; g += 1)
            (h = l.getInt8(m)), (n += String.fromCharCode(h)), (m += 1);
          "moov" !== n && (m += o - 8);
        }
        return (
          (f = l.byteLength - m),
          "moov" !== n
            ? (q.debug.log("Loading more bytes to find initialization."),
              (b.range.start = 0),
              (b.range.end = b.bytesLoaded + b.bytesToLoad),
              (i = new XMLHttpRequest()),
              (i.onloadend = function () {
                p || k.reject("Error loading initialization.");
              }),
              (i.onload = function () {
                (p = !0),
                  (b.bytesLoaded = b.range.end),
                  c.call(q, i.response).then(function (a) {
                    k.resolve(a);
                  });
              }),
              (i.onerror = function () {
                k.reject("Error loading initialization.");
              }),
              i.open("GET", b.url),
              (i.responseType = "arraybuffer"),
              i.setRequestHeader(
                "Range",
                "bytes=" + b.range.start + "-" + b.range.end
              ),
              i.send(null))
            : ((d = m - 8),
              (e = d + o - 1),
              (j = d + "-" + e),
              q.debug.log("Found the initialization.  Range: " + j),
              k.resolve(j)),
          k.promise
        );
      },
      d = function (a) {
        var b = Q.defer(),
          d = new XMLHttpRequest(),
          e = !1,
          f = this,
          g = {
            url: a,
            range: {},
            searching: !1,
            bytesLoaded: 0,
            bytesToLoad: 1500,
            request: d,
          };
        return (
          f.debug.log("Start searching for initialization."),
          (g.range.start = 0),
          (g.range.end = g.bytesToLoad),
          (d.onloadend = function () {
            e || b.reject("Error finding initialization.");
          }),
          (d.onload = function () {
            (e = !0),
              (g.bytesLoaded = g.range.end),
              c.call(f, d.response, g).then(function (a) {
                b.resolve(a);
              });
          }),
          (d.onerror = function () {
            b.reject("Error finding initialization.");
          }),
          d.open("GET", g.url),
          (d.responseType = "arraybuffer"),
          d.setRequestHeader(
            "Range",
            "bytes=" + g.range.start + "-" + g.range.end
          ),
          d.send(null),
          f.debug.log("Perform init search: " + g.url),
          b.promise
        );
      },
      e = function (a, c) {
        var d,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m = Q.defer(),
          n = new DataView(a),
          o = new XMLHttpRequest(),
          p = 0,
          q = "",
          r = 0,
          s = !1,
          t = !1,
          u = this;
        for (
          u.debug.log("Searching for SIDX box."),
            u.debug.log(c.bytesLoaded + " bytes loaded.");
          "sidx" !== q && p < n.byteLength;

        ) {
          for (r = n.getUint32(p), p += 4, q = "", i = 0; 4 > i; i += 1)
            (j = n.getInt8(p)), (q += String.fromCharCode(j)), (p += 1);
          "sidx" !== q && (p += r - 8);
        }
        if (((d = n.byteLength - p), "sidx" !== q))
          throw "Could not find SIDX box!";
        if (r - 8 > d)
          u.debug.log("Found SIDX but we don't have all of it."),
            (c.range.start = 0),
            (c.range.end = c.bytesLoaded + (r - d)),
            (o.onloadend = function () {
              s || m.reject("Error loading sidx.");
            }),
            (o.onload = function () {
              (s = !0),
                (c.bytesLoaded = c.range.end),
                e.call(u, o.response, c).then(function (a) {
                  m.resolve(a);
                });
            }),
            (o.onerror = function () {
              m.reject("Error loading sidx.");
            }),
            o.open("GET", c.url),
            (o.responseType = "arraybuffer"),
            o.setRequestHeader(
              "Range",
              "bytes=" + c.range.start + "-" + c.range.end
            ),
            o.send(null);
        else if (
          ((c.range.start = p - 8),
          (c.range.end = c.range.start + r),
          u.debug.log(
            "Found the SIDX box.  Start: " +
              c.range.start +
              " | End: " +
              c.range.end
          ),
          (f = new ArrayBuffer(c.range.end - c.range.start)),
          (h = new Uint8Array(f)),
          (g = new Uint8Array(a, c.range.start, c.range.end - c.range.start)),
          h.set(g),
          (k = this.parseSIDX.call(this, f, c.range.start)),
          (l = k.references),
          null !== l && void 0 !== l && l.length > 0 && (t = 1 === l[0].type),
          t)
        ) {
          u.debug.log("Initiate multiple SIDX load.");
          var v,
            w,
            x,
            y,
            z,
            A,
            B = [];
          for (v = 0, w = l.length; w > v; v += 1)
            (x = l[v].offset),
              (y = l[v].offset + l[v].size - 1),
              (z = x + "-" + y),
              B.push(this.loadSegments.call(u, c.url, z));
          Q.all(B).then(function (a) {
            for (A = [], v = 0, w = a.length; w > v; v += 1) A = A.concat(a[v]);
            m.resolve(A);
          });
        } else
          u.debug.log("Parsing segments from SIDX."),
            b.call(u, f, c.url, c.range.start).then(function (a) {
              m.resolve(a);
            });
        return m.promise;
      },
      f = function (a, c) {
        var d,
          f = Q.defer(),
          g = new XMLHttpRequest(),
          h = !1,
          i = this,
          j = {
            url: a,
            range: {},
            searching: !1,
            bytesLoaded: 0,
            bytesToLoad: 1500,
            request: g,
          };
        return (
          null === c
            ? (i.debug.log("No known range for SIDX request."),
              (j.searching = !0),
              (j.range.start = 0),
              (j.range.end = j.bytesToLoad))
            : ((d = c.split("-")),
              (j.range.start = parseFloat(d[0])),
              (j.range.end = parseFloat(d[1]))),
          (g.onloadend = function () {
            h || f.reject("Error loading sidx.");
          }),
          (g.onload = function () {
            (h = !0),
              j.searching
                ? ((j.bytesLoaded = j.range.end),
                  e.call(i, g.response, j).then(function (a) {
                    f.resolve(a);
                  }))
                : b
                    .call(i, g.response, j.url, j.range.start)
                    .then(function (a) {
                      f.resolve(a);
                    });
          }),
          (g.onerror = function () {
            f.reject("Error loading sidx.");
          }),
          g.open("GET", j.url),
          (g.responseType = "arraybuffer"),
          g.setRequestHeader(
            "Range",
            "bytes=" + j.range.start + "-" + j.range.end
          ),
          g.send(null),
          i.debug.log("Perform SIDX load: " + j.url),
          f.promise
        );
      };
    return {
      debug: void 0,
      loadSegments: f,
      loadInitialization: d,
      parseSegments: b,
      parseSIDX: a,
      findSIDX: e,
    };
  }),
  (Dash.dependencies.BaseURLExtensions.prototype = {
    constructor: Dash.dependencies.BaseURLExtensions,
  }),
  (Dash.dependencies.DashHandler = function () {
    "use strict";
    var a,
      b,
      c,
      d = -1,
      e = function (a, b) {
        var c = null;
        return (
          b &&
            b.Representation_asArray &&
            b.Representation_asArray.length > 0 &&
            (c = b.Representation_asArray[a]),
          c
        );
      },
      f = function (a, b) {
        var c = b.toString();
        return a.split("$Number$").join(c);
      },
      g = function (a, b) {
        var c = b.toString();
        return a.split("$Time$").join(c);
      },
      h = function (a, b) {
        var c = b.toString();
        return a.split("$Bandwidth$").join(c);
      },
      i = function (a, b) {
        if (null === b || -1 === a.indexOf("$RepresentationID$")) return a;
        var c = b.toString();
        return a.split("$RepresentationID$").join(c);
      },
      j = function (a, b) {
        var c;
        return (c = a === b ? a : -1 !== a.indexOf("http://") ? a : b + a);
      },
      k = function (a, b) {
        var d = Q.defer(),
          f = e(a, b),
          g = null,
          k = null,
          l = null,
          m = null,
          n = this;
        return (
          n.debug.log("Getting the initialization request."),
          f.hasOwnProperty("SegmentTemplate")
            ? f.SegmentTemplate.hasOwnProperty("initialization") &&
              ((k = f.SegmentTemplate.initialization),
              (k = h(k, f.bandwidth)),
              (k = i(k, f.id)))
            : f.hasOwnProperty("SegmentList") &&
              f.SegmentList.hasOwnProperty("Initialization") &&
              f.SegmentList.Initialization.hasOwnProperty("sourceURL")
            ? (k = f.SegmentList.Initialization.sourceURL)
            : f.hasOwnProperty("SegmentBase") &&
              f.SegmentBase.hasOwnProperty("Initialization") &&
              f.SegmentBase.Initialization.hasOwnProperty("range")
            ? ((k = f.BaseURL), (m = f.SegmentBase.Initialization.range))
            : f.hasOwnProperty("mimeType") &&
              n.manifestExt.getIsTextTrack(f.mimeType)
            ? ((k = f.BaseURL), (m = 0))
            : ((l = f.BaseURL),
              n.baseURLExt.loadInitialization(l).then(
                function (a) {
                  n.debug.log("Got an initialization."),
                    (g = new MediaPlayer.vo.SegmentRequest()),
                    (g.streamType = c),
                    (g.type = "Initialization Segment"),
                    (g.url = j(l, f.BaseURL)),
                    (g.range = a),
                    d.resolve(g);
                },
                function () {
                  n.errHandler.downloadError("Error loading initialization.");
                }
              )),
          k &&
            k.length > 0 &&
            (n.debug.log("Got an initialization."),
            (g = new MediaPlayer.vo.SegmentRequest()),
            (g.streamType = c),
            (g.type = "Initialization Segment"),
            (g.url = j(k, f.BaseURL)),
            (g.range = m),
            d.resolve(g)),
          d.promise
        );
      },
      l = function (c) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = !1;
        return (
          this.debug.log("Checking for stream end..."),
          a
            ? (this.debug.log("Live never ends! (TODO)"), (k = !1))
            : c.hasOwnProperty("segments") && null !== c.segments
            ? (this.debug.log("Segments: " + d + " / " + c.segments.length),
              (k = d >= c.segments.length))
            : c.hasOwnProperty("SegmentTemplate") &&
              !c.SegmentTemplate.hasOwnProperty("SegmentTimeline") &&
              ((f = 1),
              (i = 1),
              (h = Math.floor(b)),
              c.SegmentTemplate.hasOwnProperty("duration") &&
                ((e = c.SegmentTemplate.duration),
                c.SegmentTemplate.hasOwnProperty("timescale") &&
                  (f = c.SegmentTemplate.timescale),
                c.SegmentTemplate.hasOwnProperty("startNumber") &&
                  (i = c.SegmentTemplate.startNumber),
                (g = e / f),
                (j = d - i),
                this.debug.log(
                  "SegmentTemplate: " +
                    g +
                    " * " +
                    j +
                    " = " +
                    g * j +
                    " / " +
                    h
                ),
                (k = g * j >= h))),
          Q.when(k)
        );
      },
      m = function (a, b) {
        var c,
          d,
          e,
          h,
          i,
          j,
          k,
          l,
          m = [],
          n = 0,
          o = 1,
          p = 1;
        for (
          a.hasOwnProperty("startNumber") && (o = a.startNumber),
            a.hasOwnProperty("timescale") && (p = a.timescale),
            c = b.S_asArray,
            e = 0,
            h = c.length;
          h > e;
          e += 1
        )
          for (
            d = c[e], j = 0, d.hasOwnProperty("r") && (j = d.r), i = 0;
            j >= i;
            i += 1
          )
            (k = new Dash.vo.Segment()),
              (k.timescale = p),
              d.hasOwnProperty("t")
                ? ((k.startTime = d.t), (n = d.t))
                : (k.startTime = n),
              (k.duration = d.d),
              (l = a.media),
              (l = f(l, o)),
              (l = g(l, k.startTime)),
              (k.media = l),
              m.push(k),
              (n += k.duration),
              (o += 1);
        return Q.when(m);
      },
      n = function (a) {
        var b,
          c,
          d,
          e,
          f,
          g = [],
          h = 1;
        for (
          a.hasOwnProperty("startNumber") && (h = Math.max(a.startNumber, 1)),
            f = (h - 1) * a.duration,
            b = 0,
            c = a.SegmentURL_asArray.length;
          c > b;
          b += 1
        )
          (e = a.SegmentURL_asArray[b]),
            (d = new Dash.vo.Segment()),
            (d.media = e.media),
            (d.mediaRange = e.mediaRange),
            (d.index = e.index),
            (d.indexRange = e.indexRange),
            (d.timescale = a.timescale),
            (d.duration = a.duration),
            (d.startTime = f + b * a.duration),
            g.push(d);
        return Q.when(g);
      },
      o = function (a) {
        var b = a.BaseURL,
          c = null;
        return (
          a.hasOwnProperty("SegmentBase") &&
            a.SegmentBase.hasOwnProperty("indexRange") &&
            (c = a.SegmentBase.indexRange),
          this.baseURLExt.loadSegments(b, c)
        );
      },
      p = function (a) {
        var b;
        return (b =
          a.hasOwnProperty("SegmentTemplate") &&
          !a.SegmentTemplate.hasOwnProperty("SegmentTimeline")
            ? Q.when(null)
            : a.hasOwnProperty("segments") && null !== a.segments
            ? Q.when(a.segments)
            : a.hasOwnProperty("SegmentTemplate") &&
              a.SegmentTemplate.hasOwnProperty("SegmentTimeline")
            ? m.call(this, a.SegmentTemplate, a.SegmentTemplate.SegmentTimeline)
            : a.hasOwnProperty("SegmentList")
            ? n.call(this, a.SegmentList)
            : o.call(this, a));
      },
      q = function (a, b) {
        var c,
          d,
          e,
          f,
          g = -1;
        if (b && b.length > 0)
          for (f = b.length - 1; f >= 0; f--)
            if (
              ((c = b[f]),
              (d = c.startTime / c.timescale),
              (e = c.duration / c.timescale),
              a >= d && d + e >= a)
            ) {
              g = f;
              break;
            }
        return (
          -1 === g &&
            (console.log("Couldn't figure out a time!"),
            console.log("Time: " + a),
            console.log(b)),
          Q.when(g)
        );
      },
      r = function (a, b) {
        var c,
          d,
          e = -1,
          f = 1,
          g = 1;
        if (!b.hasOwnProperty("duration"))
          throw "Expected 'duration' attribute on SegmentTemplate!";
        return (
          (c = b.duration),
          b.hasOwnProperty("timescale") && (f = b.timescale),
          b.hasOwnProperty("startNumber") && (g = b.startNumber),
          (d = c / f),
          (e = Math.floor(a / d)),
          (e += g),
          Q.when(e)
        );
      },
      s = function (a, b, d) {
        var e,
          k,
          l = new MediaPlayer.vo.SegmentRequest(),
          m = 1;
        return (
          b.hasOwnProperty("timescale") && (m = b.timescale),
          (k = (b.duration * a) / m),
          (k = Math.floor(k)),
          (e = b.media),
          (e = f(e, a)),
          (e = g(e, k)),
          (e = h(e, d.bandwidth)),
          (e = i(e, d.id)),
          (l.streamType = c),
          (l.type = "Media Segment"),
          (l.url = j(e, d.BaseURL)),
          (l.duration = b.duration / m),
          (l.timescale = m),
          (l.startTime = (a * b.duration) / m),
          Q.when(l)
        );
      },
      t = function (a, b, d) {
        if (null === b || void 0 === b) return Q.when(null);
        var e,
          k = new MediaPlayer.vo.SegmentRequest();
        return (
          (e = j(b.media, d.BaseURL)),
          (e = f(e, a)),
          (e = g(e, b.startTime)),
          (e = h(e, d.bandwidth)),
          (e = i(e, d.id)),
          (k.streamType = c),
          (k.type = "Media Segment"),
          (k.url = e),
          (k.range = b.mediaRange),
          (k.startTime = b.startTime / b.timescale),
          (k.duration = b.duration / b.timescale),
          (k.timescale = b.timescale),
          Q.when(k)
        );
      },
      u = function (a, b, c) {
        var f,
          g,
          h,
          i = e(b, c),
          j = !1,
          k = this;
        return (
          k.debug.log("Getting the request for time: " + a),
          (f = Q.defer()),
          p
            .call(k, i)
            .then(function (b) {
              var c;
              if ((k.debug.log("Got segments."), k.debug.log(b), null === b)) {
                if (!i.hasOwnProperty("SegmentTemplate"))
                  throw "Expected SegmentTemplate!";
                (j = !0),
                  k.debug.log(
                    "No segments found, so we must be using a SegmentTemplate."
                  ),
                  (c = r.call(k, a, i.SegmentTemplate));
              } else k.debug.log("Got a list of segments, so dig deeper."), (i.segments = b), (j = !1), (c = q.call(k, a, b));
              return c;
            })
            .then(function (b) {
              return (
                k.debug.log("Index for time " + a + " is " + b),
                (d = b),
                l.call(k, i)
              );
            })
            .then(function (a) {
              var b = null;
              return (
                k.debug.log("Stream finished? " + a),
                a
                  ? ((g = new MediaPlayer.vo.SegmentRequest()),
                    (g.action = g.ACTION_COMPLETE),
                    k.debug.log("Signal complete."),
                    k.debug.log(g),
                    f.resolve(g))
                  : j
                  ? (b = s.call(k, d, i.SegmentTemplate, i))
                  : ((h = i.segments[d]), (b = t.call(k, d, h, i))),
                b
              );
            })
            .then(function (a) {
              k.debug.log("Got a request."), k.debug.log(a), f.resolve(a);
            }),
          f.promise
        );
      },
      v = function (a, b) {
        var c,
          f,
          g,
          h = e(a, b),
          i = this;
        if ((i.debug.log("Getting the next request."), -1 === d))
          throw "You must call getSegmentRequestForTime first.";
        return (
          (d += 1),
          i.debug.log("New index: " + d),
          (c = Q.defer()),
          l.call(i, h).then(function (a) {
            i.debug.log("Stream finished? " + a),
              a
                ? ((f = new MediaPlayer.vo.SegmentRequest()),
                  (f.action = f.ACTION_COMPLETE),
                  i.debug.log("Signal complete."),
                  i.debug.log(f),
                  c.resolve(f))
                : p
                    .call(i, h)
                    .then(function (a) {
                      var b;
                      if (
                        (i.debug.log("Got segments."),
                        i.debug.log(a),
                        null === a)
                      ) {
                        if (!h.hasOwnProperty("SegmentTemplate"))
                          throw "Expected SegmentTemplate!";
                        i.debug.log(
                          "No segments found, so we must be using a SegmentTemplate."
                        ),
                          (b = s.call(i, d, h.SegmentTemplate, h));
                      } else (h.segments = a), (g = h.segments[d]), (b = t.call(i, d, g, h));
                      return b;
                    })
                    .then(function (a) {
                      i.debug.log("Got a request."),
                        i.debug.log(a),
                        c.resolve(a);
                    });
          }),
          c.promise
        );
      },
      w = function (a, b) {
        if (-1 === d) return Q.when(0);
        var c,
          f,
          g,
          h,
          i,
          j = e(a, b),
          k = 1,
          l = Q.defer();
        return (
          (g = d),
          0 > g && (g = 0),
          p.call(c, j).then(function (a) {
            if (null === a || void 0 === a) {
              if (!j.hasOwnProperty("SegmentTemplate"))
                throw "Expected SegmentTemplate!";
              (i = j.SegmentTemplate.duration),
                j.SegmentTemplate.hasOwnProperty("timescale") &&
                  (k = j.SegmentTemplate.timescale),
                (f = (i / k) * g);
            } else g >= a.length && (g = a.length - 1), (h = a[g].startTime), (i = a[g].duration), a[g].hasOwnProperty("timescale") && (k = a[g].timescale), (f = h / k);
            l.resolve(f);
          }),
          l.promise
        );
      };
    return {
      debug: void 0,
      baseURLExt: void 0,
      manifestModel: void 0,
      manifestExt: void 0,
      errHandler: void 0,
      getType: function () {
        return c;
      },
      setType: function (a) {
        c = a;
      },
      getIsLive: function () {
        return a;
      },
      setIsLive: function (b) {
        a = b;
      },
      getDuration: function () {
        return b;
      },
      setDuration: function (a) {
        b = a;
      },
      getInitRequest: k,
      getSegmentRequestForTime: u,
      getNextSegmentRequest: v,
      getCurrentTime: w,
    };
  }),
  (Dash.dependencies.DashHandler.prototype = {
    constructor: Dash.dependencies.DashHandler,
  }),
  (Dash.dependencies.DashManifestExtensions = function () {
    "use strict";
  }),
  (Dash.dependencies.DashManifestExtensions.prototype = {
    constructor: Dash.dependencies.DashManifestExtensions,
    getIsAudio: function (a) {
      "use strict";
      var b,
        c,
        d,
        e = a.ContentComponent_asArray,
        f = !1,
        g = !1;
      if (e)
        for (b = 0, c = e.length; c > b; b += 1)
          "audio" === e[b].contentType && ((f = !0), (g = !0));
      if (
        (a.hasOwnProperty("mimeType") &&
          ((f = -1 !== a.mimeType.indexOf("audio")), (g = !0)),
        !g)
      )
        for (b = 0, c = a.Representation_asArray.length; !g && c > b; )
          (d = a.Representation_asArray[b]),
            d.hasOwnProperty("mimeType") &&
              ((f = -1 !== d.mimeType.indexOf("audio")), (g = !0)),
            (b += 1);
      return f && (a.type = "audio"), Q.when(f);
    },
    getIsVideo: function (a) {
      "use strict";
      var b,
        c,
        d,
        e = a.ContentComponent_asArray,
        f = !1,
        g = !1;
      if (e)
        for (b = 0, c = e.length; c > b; b += 1)
          "video" === e[b].contentType && ((f = !0), (g = !0));
      if (
        (a.hasOwnProperty("mimeType") &&
          ((f = -1 !== a.mimeType.indexOf("video")), (g = !0)),
        !g)
      )
        for (b = 0, c = a.Representation_asArray.length; !g && c > b; )
          (d = a.Representation_asArray[b]),
            d.hasOwnProperty("mimeType") &&
              ((f = -1 !== d.mimeType.indexOf("video")), (g = !0)),
            (b += 1);
      return f && (a.type = "video"), Q.when(f);
    },
    getIsText: function (a) {
      "use strict";
      var b,
        c,
        d,
        e = a.ContentComponent_asArray,
        f = !1,
        g = !1;
      if (e)
        for (b = 0, c = e.length; c > b; b += 1)
          "text" === e[b].contentType && ((f = !0), (g = !0));
      if (
        (a.hasOwnProperty("mimeType") &&
          ((f = -1 !== a.mimeType.indexOf("text")), (g = !0)),
        !g)
      )
        for (b = 0, c = a.Representation_asArray.length; !g && c > b; )
          (d = a.Representation_asArray[b]),
            d.hasOwnProperty("mimeType") &&
              ((f = -1 !== d.mimeType.indexOf("text")), (g = !0)),
            (b += 1);
      return Q.when(f);
    },
    getIsTextTrack: function (a) {
      return "text/vtt" === a || "application/ttml+xml" === a;
    },
    getIsMain: function () {
      "use strict";
      return Q.when(!1);
    },
    processAdaptation: function (a) {
      "use strict";
      return (
        void 0 !== a.Representation_asArray &&
          null !== a.Representation_asArray &&
          a.Representation_asArray.sort(function (a, b) {
            return a.bandwidth - b.bandwidth;
          }),
        a
      );
    },
    getDataForId: function (a, b, c) {
      "use strict";
      var d,
        e,
        f = b.Period_asArray[c].AdaptationSet_asArray;
      for (d = 0, e = f.length; e > d; d += 1)
        if (f[d].hasOwnProperty("id") && f[d].id === a) return Q.when(f[d]);
      return Q.when(null);
    },
    getDataForIndex: function (a, b, c) {
      "use strict";
      var d = b.Period_asArray[c].AdaptationSet_asArray;
      return Q.when(d[a]);
    },
    getDataIndex: function (a, b, c) {
      "use strict";
      var d,
        e,
        f = b.Period_asArray[c].AdaptationSet_asArray;
      for (d = 0, e = f.length; e > d; d += 1) if (f[d] === a) return Q.when(d);
      return Q.when(-1);
    },
    getVideoData: function (a, b) {
      "use strict";
      var c,
        d,
        e = this,
        f = a.Period_asArray[b].AdaptationSet_asArray,
        g = Q.defer(),
        h = [];
      for (c = 0, d = f.length; d > c; c += 1) h.push(this.getIsVideo(f[c]));
      return (
        Q.all(h).then(function (a) {
          var b = !1;
          for (c = 0, d = a.length; d > c; c += 1)
            a[c] === !0 && ((b = !0), g.resolve(e.processAdaptation(f[c])));
          b || g.resolve(null);
        }),
        g.promise
      );
    },
    getTextData: function (a, b) {
      "use strict";
      var c,
        d,
        e = this,
        f = a.Period_asArray[b].AdaptationSet_asArray,
        g = Q.defer(),
        h = [];
      for (c = 0, d = f.length; d > c; c += 1) h.push(this.getIsText(f[c]));
      return (
        Q.all(h).then(function (a) {
          var b = !1;
          for (c = 0, d = a.length; d > c; c += 1)
            a[c] === !0 && ((b = !0), g.resolve(e.processAdaptation(f[c])));
          b || g.resolve(null);
        }),
        g.promise
      );
    },
    getAudioDatas: function (a, b) {
      "use strict";
      var c,
        d,
        e = this,
        f = a.Period_asArray[b].AdaptationSet_asArray,
        g = Q.defer(),
        h = [];
      for (c = 0, d = f.length; d > c; c += 1) h.push(this.getIsAudio(f[c]));
      return (
        Q.all(h).then(function (a) {
          var b = [];
          for (c = 0, d = a.length; d > c; c += 1)
            a[c] === !0 && b.push(e.processAdaptation(f[c]));
          g.resolve(b);
        }),
        g.promise
      );
    },
    getPrimaryAudioData: function (a, b) {
      "use strict";
      var c,
        d,
        e = Q.defer(),
        f = [],
        g = this;
      return (
        this.getAudioDatas(a, b).then(function (a) {
          for (
            (a && 0 !== a.length) || e.resolve(null), c = 0, d = a.length;
            d > c;
            c += 1
          )
            f.push(g.getIsMain(a[c]));
          Q.all(f).then(function (b) {
            var f = !1;
            for (c = 0, d = b.length; d > c; c += 1)
              b[c] === !0 && ((f = !0), e.resolve(g.processAdaptation(a[c])));
            f || e.resolve(a[0]);
          });
        }),
        e.promise
      );
    },
    getCodec: function (a) {
      "use strict";
      var b = a.Representation_asArray[0],
        c = b.mimeType + ';codecs="' + b.codecs + '"';
      return Q.when(c);
    },
    getMimeType: function (a) {
      "use strict";
      return Q.when(a.Representation_asArray[0].mimeType);
    },
    getKID: function (a) {
      "use strict";
      return a && a.hasOwnProperty("cenc:default_KID")
        ? a["cenc:default_KID"]
        : null;
    },
    getContentProtectionData: function (a) {
      "use strict";
      return a &&
        a.hasOwnProperty("ContentProtection_asArray") &&
        0 !== a.ContentProtection_asArray.length
        ? Q.when(a.ContentProtection_asArray)
        : Q.when(null);
    },
    getSegmentInfoFor: function (a) {
      return a.hasOwnProperty("SegmentBase")
        ? a.SegmentBase
        : a.hasOwnProperty("SegmentList")
        ? a.SegmentList
        : a.hasOwnProperty("SegmentTemplate")
        ? a.SegmentTemplate
        : null;
    },
    getLiveOffset: function (a) {
      "use strict";
      var b = 15;
      return (
        a.hasOwnProperty("suggestedPresentationDelay") &&
          (b = a.suggestedPresentationDelay),
        Q.when(b)
      );
    },
    getLiveStart: function (a, b) {
      var c,
        d,
        e = 0,
        f = 1,
        g = 1,
        h = null,
        i = null;
      return (
        (d =
          a.Period_asArray[b].AdaptationSet_asArray[1]
            .Representation_asArray[0]),
        d.hasOwnProperty("SegmentList")
          ? ((h = d.SegmentList),
            h.hasOwnProperty("startNumber") && (f = Math.max(h.startNumber, 1)),
            h.hasOwnProperty("timescale") && (g = h.timescale),
            (c = h.duration),
            (e = ((f - 1) * c) / g))
          : d.hasOwnProperty("SegmentTemplate") &&
            ((i = d.SegmentTemplate),
            i.hasOwnProperty("startNumber") && (f = Math.max(i.startNumber, 1)),
            i.hasOwnProperty("timescale") && (g = i.timescale),
            (c = i.duration),
            (e = i.hasOwnProperty("SegmentTimeline")
              ? i.SegmentTimeline.S_asArray[0].t / g
              : ((f - 1) * c) / g)),
        Q.when(e)
      );
    },
    getLiveEdge: function (a, b) {
      "use strict";
      var c,
        d = this,
        e = Q.defer(),
        f = 0,
        g = new Date(),
        h = a.availabilityStartTime;
      return (
        d.getLiveOffset(a).then(function (i) {
          a.hasOwnProperty("availabilityEndTime")
            ? ((c = a.availabilityEndTime),
              (f = (c.getTime() - h.getTime()) / 1e3))
            : (f = (g.getTime() - h.getTime()) / 1e3),
            d.getLiveStart(a, b).then(function (a) {
              (f += a), (f -= i), e.resolve(f);
            });
        }),
        e.promise
      );
    },
    getPresentationOffset: function (a, b) {
      var c,
        d,
        e,
        f = 0,
        g = 1;
      return (
        (d =
          a.Period_asArray[b].AdaptationSet_asArray[0]
            .Representation_asArray[0]),
        (e = this.getSegmentInfoFor(d)),
        null !== e &&
          void 0 !== e &&
          e.hasOwnProperty("presentationTimeOffset") &&
          ((c = e.presentationTimeOffset),
          e.hasOwnProperty("timescale") && (g = e.timescale),
          (f = c / g)),
        Q.when(f)
      );
    },
    getIsLive: function (a) {
      "use strict";
      var b = !1,
        c = "dynamic";
      return a.hasOwnProperty("type") && (b = a.type === c), b;
    },
    getIsDVR: function (a, b) {
      "use strict";
      var c, d;
      return (c = !isNaN(a.timeShiftBufferDepth)), (d = b && c), Q.when(d);
    },
    getIsOnDemand: function (a) {
      "use strict";
      var b = !1;
      return (
        a.profiles &&
          a.profiles.length > 0 &&
          (b =
            -1 !==
            a.profiles.indexOf("urn:mpeg:dash:profile:isoff-on-demand:2011")),
        Q.when(b)
      );
    },
    getDuration: function (a, b) {
      "use strict";
      var c = 0 / 0;
      return (
        b
          ? (c = Number.POSITIVE_INFINITY)
          : a.mediaPresentationDuration
          ? (c = a.mediaPresentationDuration)
          : a.availabilityEndTime &&
            a.availabilityStartTime &&
            (c =
              a.availabilityEndTime.getTime() -
              a.availabilityStartTime.getTime()),
        Q.when(c)
      );
    },
    getDurationForPeriod: function (a, b, c) {
      "use strict";
      var d = 0 / 0;
      return (
        c
          ? (d = Number.POSITIVE_INFINITY)
          : b.Period_asArray.length > 1 &&
            void 0 !== b.Period_asArray[a].duration
          ? (d = b.Period_asArray[a].duration)
          : b.mediaPresentationDuration
          ? (d = b.mediaPresentationDuration)
          : b.availabilityEndTime &&
            b.availabilityStartTime &&
            (d =
              b.availabilityEndTime.getTime() -
              b.availabilityStartTime.getTime()),
        Q.when(d)
      );
    },
    getBandwidth: function (a) {
      "use strict";
      return Q.when(a.bandwidth);
    },
    getRefreshDelay: function (a) {
      "use strict";
      var b = 0 / 0;
      return (
        a.hasOwnProperty("minimumUpdatePeriod") &&
          (b = parseFloat(a.minimumUpdatePeriod)),
        Q.when(b)
      );
    },
    getRepresentationCount: function (a) {
      "use strict";
      return Q.when(a.Representation_asArray.length);
    },
    getRepresentationFor: function (a, b) {
      "use strict";
      return Q.when(b.Representation_asArray[a]);
    },
    getPeriodCount: function (a) {
      "use strict";
      return Q.when(a.Period_asArray.length);
    },
    getTimestampOffsetForPeriod: function (a, b, c) {
      var d = this;
      return d.getStartOffsetForPeriod(b, a).then(function (e) {
        var f = b.Period_asArray[a].start;
        if ("undefined" != typeof f)
          return Q.when(b.Period_asArray[a].start - e);
        for (var g = [], h = Q.defer(), i = 0; a > i; i++)
          g.push(d.getDurationForPeriod(i, b, c));
        return (
          Q.all(g).then(function (a) {
            if (a) {
              for (var b = 0, c = 0, d = a.length; d > c; c++) b += a[c];
              h.resolve(b - e);
            } else h.reject("Error calculating timestamp offset for period");
          }),
          h.promise
        );
      });
    },
    getStartOffsetForPeriod: function (a, b) {
      var c,
        d,
        e = this,
        f = a.Period_asArray,
        g = f[b],
        h = 0;
      for (d = 0; b > d; d++)
        if (g.hasOwnProperty("BaseURL") && f[d].BaseURL == g.BaseURL) {
          (c = Q.defer()),
            Q.all([e.getLiveStart(a, d), e.getLiveStart(a, b)]).then(function (
              a
            ) {
              "undefined" == typeof a ||
                isNaN(a[0] && !isNaN(a[0])) ||
                (h = Math.abs(a[0] - a[1])),
                c.resolve(h);
            });
          break;
        }
      return Q.when(c ? c.promise : h);
    },
  }),
  (Dash.dependencies.DashMetricsExtensions = function () {
    "use strict";
    var a = function (a, b) {
        var c, d, e, f, g, h, i, j;
        for (h = 0; h < a.length; h += 1)
          for (
            c = a[h], e = c.AdaptationSet_asArray, i = 0;
            i < e.length;
            i += 1
          )
            for (
              d = e[i], g = d.Representation_asArray, j = 0;
              j < g.length;
              j += 1
            )
              if (((f = g[j]), b === f.id)) return j;
        return -1;
      },
      b = function (a, b) {
        var c, d, e, f, g, h, i, j;
        for (h = 0; h < a.length; h += 1)
          for (
            c = a[h], e = c.AdaptationSet_asArray, i = 0;
            i < e.length;
            i += 1
          )
            for (
              d = e[i], g = d.Representation_asArray, j = 0;
              j < g.length;
              j += 1
            )
              if (((f = g[j]), b === f.id)) return f;
        return null;
      },
      c = function (a, b) {
        var c = !1;
        return (
          "video" === b
            ? (this.manifestExt.getIsVideo(a), "video" === a.type && (c = !0))
            : "audio" === b
            ? (this.manifestExt.getIsAudio(a), "audio" === a.type && (c = !0))
            : (c = !1),
          c
        );
      },
      d = function (a, b) {
        var d, e, f, g, h, i;
        for (h = 0; h < a.length; h += 1)
          for (
            d = a[h], f = d.AdaptationSet_asArray, i = 0;
            i < f.length;
            i += 1
          )
            if (
              ((e = f[i]), (g = e.Representation_asArray), c.call(this, e, b))
            )
              return g.length;
        return -1;
      },
      e = function (a) {
        var c,
          d = this,
          e = d.manifestModel.getValue(),
          f = e.Period_asArray;
        return (c = b.call(d, f, a)), null === c ? null : c.bandwidth;
      },
      f = function (b) {
        var c,
          d = this,
          e = d.manifestModel.getValue(),
          f = e.Period_asArray;
        return (c = a.call(d, f, b));
      },
      g = function (a) {
        var b,
          c = this,
          e = c.manifestModel.getValue(),
          f = e.Period_asArray;
        return (b = d.call(this, f, a));
      },
      h = function (a) {
        if (null === a) return null;
        var b,
          c,
          d,
          e = a.RepSwitchList;
        return null === e || e.length <= 0
          ? null
          : ((b = e.length), (c = b - 1), (d = e[c]));
      },
      i = function (a) {
        if (null === a) return null;
        var b,
          c,
          d,
          e = a.BufferLevel;
        return null === e || e.length <= 0
          ? null
          : ((b = e.length), (c = b - 1), (d = e[c]));
      },
      j = function (a) {
        if (null === a) return null;
        var b,
          c,
          d,
          e = a.HttpList;
        return null === e || e.length <= 0
          ? null
          : ((b = e.length), (c = b - 1), (d = e[c]));
      },
      k = function (a) {
        if (null === a) return null;
        var b,
          c,
          d,
          e = a.DroppedFrames;
        return null === e || e.length <= 0
          ? null
          : ((b = e.length), (c = b - 1), (d = e[c]));
      };
    return {
      manifestModel: void 0,
      manifestExt: void 0,
      getBandwidthForRepresentation: e,
      getIndexForRepresentation: f,
      getMaxIndexForBufferType: g,
      getCurrentRepresentationSwitch: h,
      getCurrentBufferLevel: i,
      getCurrentHttpRequest: j,
      getCurrentDroppedFrames: k,
    };
  }),
  (Dash.dependencies.DashMetricsExtensions.prototype = {
    constructor: Dash.dependencies.DashMetricsExtensions,
  }),
  (Dash.dependencies.DashParser = function () {
    "use strict";
    var a = 31536e3,
      b = 2592e3,
      c = 86400,
      d = 3600,
      e = 60,
      f =
        /P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
      g = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
      h = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,
      i = [
        {
          type: "duration",
          test: function (a) {
            return f.test(a);
          },
          converter: function (g) {
            var h = f.exec(g);
            return (
              parseFloat(h[2] || 0) * a +
              parseFloat(h[4] || 0) * b +
              parseFloat(h[6] || 0) * c +
              parseFloat(h[8] || 0) * d +
              parseFloat(h[10] || 0) * e +
              parseFloat(h[12] || 0)
            );
          },
        },
        {
          type: "datetime",
          test: function (a) {
            return g.test(a);
          },
          converter: function (a) {
            return new Date(a);
          },
        },
        {
          type: "numeric",
          test: function (a) {
            return h.test(a);
          },
          converter: function (a) {
            return parseFloat(a);
          },
        },
      ],
      j = function () {
        var a, b, c, d;
        return (
          (d = [
            { name: "profiles", merge: !1 },
            { name: "width", merge: !1 },
            { name: "height", merge: !1 },
            { name: "sar", merge: !1 },
            { name: "frameRate", merge: !1 },
            { name: "audioSamplingRate", merge: !1 },
            { name: "mimeType", merge: !1 },
            { name: "segmentProfiles", merge: !1 },
            { name: "codecs", merge: !1 },
            { name: "maximumSAPPeriod", merge: !1 },
            { name: "startsWithSap", merge: !1 },
            { name: "maxPlayoutRate", merge: !1 },
            { name: "codingDependency", merge: !1 },
            { name: "scanType", merge: !1 },
            { name: "FramePacking", merge: !0 },
            { name: "AudioChannelConfiguration", merge: !0 },
            { name: "ContentProtection", merge: !0 },
          ]),
          (a = {}),
          (a.name = "AdaptationSet"),
          (a.isRoot = !1),
          (a.isArray = !0),
          (a.parent = null),
          (a.children = []),
          (a.properties = d),
          (b = {}),
          (b.name = "Representation"),
          (b.isRoot = !1),
          (b.isArray = !0),
          (b.parent = a),
          (b.children = []),
          (b.properties = d),
          a.children.push(b),
          (c = {}),
          (c.name = "SubRepresentation"),
          (c.isRoot = !1),
          (c.isArray = !0),
          (c.parent = b),
          (c.children = []),
          (c.properties = d),
          b.children.push(c),
          a
        );
      },
      k = function () {
        var a, b, c, d;
        return (
          (d = [
            { name: "SegmentBase", merge: !0 },
            { name: "SegmentTemplate", merge: !0 },
            { name: "SegmentList", merge: !0 },
          ]),
          (a = {}),
          (a.name = "Period"),
          (a.isRoot = !1),
          (a.isArray = !0),
          (a.parent = null),
          (a.children = []),
          (a.properties = d),
          (b = {}),
          (b.name = "AdaptationSet"),
          (b.isRoot = !1),
          (b.isArray = !0),
          (b.parent = a),
          (b.children = []),
          (b.properties = d),
          a.children.push(b),
          (c = {}),
          (c.name = "Representation"),
          (c.isRoot = !1),
          (c.isArray = !0),
          (c.parent = b),
          (c.children = []),
          (c.properties = d),
          b.children.push(c),
          a
        );
      },
      l = function () {
        var a, b, c, d, e;
        return (
          (e = [
            {
              name: "BaseURL",
              merge: !0,
              mergeFunction: function (a, b) {
                var c;
                return (c = 0 === b.indexOf("http://") ? b : a + b);
              },
            },
          ]),
          (a = {}),
          (a.name = "mpd"),
          (a.isRoot = !0),
          (a.isArray = !0),
          (a.parent = null),
          (a.children = []),
          (a.properties = e),
          (b = {}),
          (b.name = "Period"),
          (b.isRoot = !1),
          (b.isArray = !0),
          (b.parent = null),
          (b.children = []),
          (b.properties = e),
          a.children.push(b),
          (c = {}),
          (c.name = "AdaptationSet"),
          (c.isRoot = !1),
          (c.isArray = !0),
          (c.parent = b),
          (c.children = []),
          (c.properties = e),
          b.children.push(c),
          (d = {}),
          (d.name = "Representation"),
          (d.isRoot = !1),
          (d.isArray = !0),
          (d.parent = c),
          (d.children = []),
          (d.properties = e),
          c.children.push(d),
          a
        );
      },
      m = function () {
        var a = [];
        return a.push(j()), a.push(k()), a.push(l()), a;
      },
      n = function (a, b) {
        this.debug.log("Doing parse.");
        var c,
          d = new X2JS(i, "", !0),
          e = new ObjectIron(m());
        return (
          this.debug.log("Converting from XML."),
          (c = d.xml_str2json(a)),
          c.hasOwnProperty("BaseURL")
            ? (c.BaseURL = c.BaseURL_asArray[0])
            : (this.debug.log("Setting baseURL: " + b), (c.BaseURL = b)),
          0 !== c.BaseURL.indexOf("http") && (c.BaseURL = b + c.BaseURL),
          this.debug.log("Flatten manifest properties."),
          e.run(c),
          this.debug.log("Parsing complete."),
          Q.when(c)
        );
      };
    return { debug: void 0, parse: n };
  }),
  (Dash.dependencies.DashParser.prototype = {
    constructor: Dash.dependencies.DashParser,
  }),
  (Dash.dependencies.FragmentExtensions = function () {
    "use strict";
    var a = function (a) {
        for (
          var b, c, d, e, f, g, h = Q.defer(), i = new DataView(a), j = 0;
          "tfdt" !== e && j < i.byteLength;

        ) {
          for (d = i.getUint32(j), j += 4, e = "", f = 0; 4 > f; f += 1)
            (g = i.getInt8(j)), (e += String.fromCharCode(g)), (j += 1);
          "moof" !== e && "traf" !== e && "tfdt" !== e && (j += d - 8);
        }
        if (j === i.byteLength) throw "Error finding live offset.";
        return (
          (c = i.getUint8(j)),
          this.debug.log("position: " + j),
          0 === c
            ? ((j += 4), (b = i.getUint32(j, !1)))
            : ((j += d - 16),
              (b = utils.Math.to64BitNumber(
                i.getUint32(j + 4, !1),
                i.getUint32(j, !1)
              ))),
          h.resolve({ version: c, base_media_decode_time: b }),
          h.promise
        );
      },
      b = function (a) {
        for (
          var b, c, d, e, f, g, h, i = new DataView(a), j = 0;
          "sidx" !== f && j < i.byteLength;

        ) {
          for (g = i.getUint32(j), j += 4, f = "", e = 0; 4 > e; e += 1)
            (h = i.getInt8(j)), (f += String.fromCharCode(h)), (j += 1);
          "moof" !== f && "traf" !== f && "sidx" !== f
            ? (j += g - 8)
            : "sidx" === f && (j -= 8);
        }
        return (
          (b = i.getUint8(j + 8)),
          (j += 12),
          (c = i.getUint32(j + 4, !1)),
          (j += 8),
          (d =
            0 === b
              ? i.getUint32(j, !1)
              : utils.Math.to64BitNumber(
                  i.getUint32(j + 4, !1),
                  i.getUint32(j, !1)
                )),
          Q.when({ earliestPresentationTime: d, timescale: c })
        );
      },
      c = function (b) {
        var c,
          d,
          e,
          f = Q.defer(),
          g = new XMLHttpRequest(),
          h = !1;
        return (
          (c = b),
          (g.onloadend = function () {
            h || ((d = "Error loading fragment: " + c), f.reject(d));
          }),
          (g.onload = function () {
            (h = !0), (e = a(g.response)), f.resolve(e);
          }),
          (g.onerror = function () {
            (d = "Error loading fragment: " + c), f.reject(d);
          }),
          (g.responseType = "arraybuffer"),
          g.open("GET", c),
          g.send(null),
          f.promise
        );
      };
    return { debug: void 0, loadFragment: c, parseTFDT: a, parseSIDX: b };
  }),
  (Dash.dependencies.FragmentExtensions.prototype = {
    constructor: Dash.dependencies.FragmentExtensions,
  }),
  (Dash.vo.Segment = function () {
    "use strict";
    (this.indexRange = null),
      (this.index = null),
      (this.mediaRange = null),
      (this.media = null),
      (this.duration = 0 / 0),
      (this.startTime = 0 / 0),
      (this.timescale = 0 / 0);
  }),
  (Dash.vo.Segment.prototype = { constructor: Dash.vo.Segment }),
  (MediaPlayer.dependencies.AbrController = function () {
    "use strict";
    var a = !0,
      b = {},
      c = function (a) {
        var c;
        return b.hasOwnProperty(a) || (b[a] = 0), (c = b[a]);
      },
      d = function (a, c) {
        b[a] = c;
      };
    return {
      debug: void 0,
      abrRulesCollection: void 0,
      manifestExt: void 0,
      metricsModel: void 0,
      getAutoSwitchBitrate: function () {
        return a;
      },
      setAutoSwitchBitrate: function (b) {
        a = b;
      },
      getMetricsFor: function (a) {
        var b = Q.defer(),
          c = this;
        return (
          c.manifestExt.getIsVideo(a).then(function (d) {
            d
              ? b.resolve(c.metricsModel.getMetricsFor("video"))
              : c.manifestExt.getIsAudio(a).then(function (a) {
                  a
                    ? b.resolve(c.metricsModel.getMetricsFor("audio"))
                    : b.resolve(c.metricsModel.getMetricsFor("stream"));
                });
          }),
          b.promise
        );
      },
      getPlaybackQuality: function (b, e) {
        var f,
          g,
          h,
          i,
          j,
          k = this,
          l = Q.defer(),
          m = 999,
          n = [];
        return (
          (j = c(b)),
          k.debug.log("ABR enabled? (" + a + ")"),
          a
            ? (k.debug.log("Check ABR rules."),
              k.getMetricsFor(e).then(function (a) {
                k.abrRulesCollection.getRules().then(function (c) {
                  for (f = 0, g = c.length; g > f; f += 1)
                    n.push(c[f].checkIndex(j, a, e));
                  Q.all(n).then(function (a) {
                    for (
                      k.debug.log(a),
                        i = {},
                        i[
                          MediaPlayer.rules.SwitchRequest.prototype.STRONG
                        ] = 999,
                        i[MediaPlayer.rules.SwitchRequest.prototype.WEAK] = 999,
                        i[
                          MediaPlayer.rules.SwitchRequest.prototype.DEFAULT
                        ] = 999,
                        f = 0,
                        g = a.length;
                      g > f;
                      f += 1
                    )
                      (h = a[f]),
                        h.quality !==
                          MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE &&
                          (i[h.priority] = Math.min(i[h.priority], h.quality));
                    999 !== i[MediaPlayer.rules.SwitchRequest.prototype.WEAK] &&
                      (m = i[MediaPlayer.rules.SwitchRequest.prototype.WEAK]),
                      999 !==
                        i[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] &&
                        (m =
                          i[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]),
                      999 !==
                        i[MediaPlayer.rules.SwitchRequest.prototype.STRONG] &&
                        (m =
                          i[MediaPlayer.rules.SwitchRequest.prototype.STRONG]),
                      999 !== m && void 0 !== m && (j = m),
                      k.manifestExt
                        .getRepresentationCount(e)
                        .then(function (a) {
                          0 > j && (j = 0),
                            j >= a && (j = a - 1),
                            d(b, j),
                            k.debug.log("New quality of " + j),
                            l.resolve(j);
                        });
                  });
                });
              }))
            : (k.debug.log("Unchanged quality of " + j), l.resolve(j)),
          l.promise
        );
      },
      setPlaybackQuality: function (a, b) {
        var e = c(a);
        b !== e && d(a, b);
      },
      getQualityFor: function (a) {
        return c(a);
      },
    };
  }),
  (MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController,
  }),
  (MediaPlayer.dependencies.BufferController = function () {
    "use strict";
    var a,
      b,
      c,
      d,
      e,
      f = 1e3,
      g = 0.5,
      h = "WAITING",
      i = "READY",
      j = "VALIDATING",
      k = "LOADING",
      l = h,
      m = !1,
      n = !1,
      o = !1,
      p = !0,
      q = !1,
      r = -1,
      s = !1,
      t = !0,
      u = -1,
      v = null,
      w = null,
      x = !1,
      y = 0,
      z = !1,
      A = !1,
      B = null,
      C = [],
      D = -1,
      E = 0,
      F = null,
      G = null,
      H = !0,
      I = function (a) {
        var c = this;
        c.debug.log("BufferController " + b + " setState to:" + a), (l = a);
      },
      J = function (a, b) {
        var c = 0,
          d = null;
        H === !1 &&
          ((d = G.start),
          (c = a.getTime() - d.getTime()),
          (G.duration = c),
          (G.stopreason = b),
          (H = !0));
      },
      K = function () {
        var a = this.manifestModel.getValue(),
          b = this.manifestExt.getIsLive(a);
        return (A = !0), Q.when(b);
      },
      L = function () {
        if (m && n) {
          var a = this;
          K.call(this).then(function (c) {
            (z = c),
              a.debug.log(
                "BufferController begin " +
                  b +
                  " validation with interval: " +
                  f
              ),
              I.call(a, i),
              clearInterval(v),
              (v = setInterval(w.bind(a), f, a));
          });
        }
      },
      M = function () {
        var a;
        null === v &&
          (q === !1 &&
            ((a = new Date()),
            J(
              a,
              MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON
            ),
            (F = this.metricsModel.addPlayList(
              b,
              a,
              0,
              MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON
            ))),
          this.debug.log("BufferController " + b + " start."),
          (n = !0),
          (o = !0),
          L.call(this));
      },
      N = function (a) {
        var c;
        this.debug.log("BufferController " + b + " seek: " + a),
          (q = !0),
          (r = a - y - E),
          (c = new Date()),
          J(c, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON),
          (F = this.metricsModel.addPlayList(
            b,
            c,
            r,
            MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON
          )),
          M.call(this);
      },
      O = function () {
        this.debug.log("BufferController " + b + " stop."),
          I.call(this, h),
          clearInterval(v),
          (v = null),
          (n = !1),
          (o = !1),
          J(
            new Date(),
            MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON
          );
      },
      P = function (a, b) {
        var c = null;
        return (
          b &&
            b.Representation_asArray &&
            b.Representation_asArray.length > 0 &&
            (c = b.Representation_asArray[a]),
          c
        );
      },
      R = function () {
        var a = this;
        l === k &&
          (x && !o && ((x = !1), this.videoModel.stallStream(b, x)),
          I.call(a, i));
      },
      S = function (a, c) {
        var e = this;
        e.debug.log(b + " Bytes finished loading: " + a.url),
          e.fragmentController.process(c.data).then(function (a) {
            if (null !== a) {
              var c = P(u, e.getData()),
                f = e.videoModel.getCurrentTime(),
                g = new Date();
              e.debug.log("Push (" + b + ") bytes: " + a.byteLength),
                H === !0 &&
                  l !== h &&
                  -1 !== u &&
                  ((H = !1),
                  (G = e.metricsModel.appendPlayListTrace(
                    F,
                    c.id,
                    null,
                    g,
                    f,
                    null,
                    1,
                    null
                  ))),
                Q.when(B || !0).then(function () {
                  (B = e.sourceBufferExt.append(d, a, e.videoModel)),
                    B.then(function () {
                      if (
                        (e.debug.log(
                          "Append " + b + " complete: " + d.buffered.length
                        ),
                        d.buffered.length > 0)
                      ) {
                        var a,
                          c,
                          f = d.buffered;
                        for (
                          e.debug.log(
                            "Number of buffered " + b + " ranges: " + f.length
                          ),
                            a = 0,
                            c = f.length;
                          c > a;
                          a += 1
                        )
                          e.debug.log(
                            "Buffered " +
                              b +
                              " Range: " +
                              f.start(a) +
                              " - " +
                              f.end(a)
                          );
                      }
                      R.call(e);
                    });
                });
            } else e.debug.log("No " + b + " bytes to push."), R.call(e);
          });
      },
      T = function (a) {
        var c = this;
        l === k && I.call(c, i),
          this.errHandler.downloadError(
            "Error loading " + b + " fragment: " + a.url
          );
      },
      U = function () {
        O.call(this);
      },
      V = function (a, d) {
        var e = null;
        return (
          p &&
            (this.debug.log(
              "Marking a special seek for initial " + b + " playback."
            ),
            q || ((q = !0), (r = 0)),
            (p = !1)),
          (e = a ? this.indexHandler.getInitRequest(d, c) : Q.when(null))
        );
      },
      W = function (e) {
        var f,
          g = this;
        if (t && !q)
          g.debug.log(
            "Data changed - loading the " + b + " fragment for time: " + a
          ),
            (f = g.indexHandler.getSegmentRequestForTime(a - E - y, e, c));
        else {
          var h = Q.defer(),
            i = g.videoModel.getCurrentTime();
          (f = h.promise),
            (q = !1),
            g.sourceBufferExt.getBufferRange(d, i).then(function (a) {
              null !== a && (i = a.end),
                g.debug.log("Loading the " + b + " fragment for time: " + i),
                g.indexHandler
                  .getSegmentRequestForTime(i - E - y, e, c)
                  .then(function (a) {
                    h.resolve(a);
                  });
            });
        }
        return (t = !1), f;
      },
      X = function (a) {
        var d = this;
        if (null !== a) {
          switch (a.action) {
            case "complete":
              d.debug.log(b + " Stream is complete."),
                J(
                  new Date(),
                  MediaPlayer.vo.metrics.PlayList.Trace
                    .END_OF_CONTENT_STOP_REASON
                ),
                U.call(d);
              break;
            case "download":
              for (var e = C.length - 1; e >= 0; --e)
                if (C[e].startTime === a.startTime) {
                  if (
                    (d.debug.log(
                      b + " Fragment already loaded for time: " + a.startTime
                    ),
                    C[e].url === a.url)
                  )
                    return (
                      d.debug.log(b + " Fragment url already loaded: " + a.url),
                      d.indexHandler
                        .getNextSegmentRequest(u, c)
                        .then(X.bind(d)),
                      void 0
                    );
                  C.splice(e, 1);
                  break;
                }
              C.push(a),
                d.debug.log("Loading an " + b + " fragment: " + a.url),
                I.call(d, k),
                d.fragmentLoader.load(a).then(S.bind(d, a), T.bind(d, a));
              break;
            default:
              d.debug.log("Unknown request action.");
          }
          a = null;
        }
        l === j && I.call(d, i);
      },
      Y = function (a) {
        o &&
          (e > a
            ? x ||
              (this.debug.log(
                "Waiting for more " + b + " buffer before starting playback."
              ),
              (x = !0),
              this.videoModel.stallStream(b, x))
            : (this.debug.log("Got enough " + b + " buffer to start."),
              (o = !1),
              (x = !1),
              this.videoModel.stallStream(b, x)));
      },
      Z = function () {
        var a = -1;
        return (
          (a = this.videoModel.getCurrentTime()),
          this.debug.log("Working time is video time: " + a),
          a
        );
      },
      $ = function () {
        var a,
          e = this,
          h = null,
          m = new Date(),
          n = e.videoModel.getCurrentTime(),
          p = Z.call(e);
        e.debug.log("BufferController.validate() " + b + " | state: " + l),
          e.debug.log(
            b + " Playback rate: " + e.videoModel.getElement().playbackRate
          ),
          e.debug.log(b + " Working time: " + p),
          e.debug.log(b + " Video time: " + n),
          e.sourceBufferExt.getBufferLength(d, p).then(function (d) {
            e.debug.log("Current " + b + " buffer length: " + d),
              e.metricsModel.addBufferLevel(b, new Date(), d),
              Y.call(e, d),
              l === k && g > d
                ? x ||
                  (e.debug.log("Stalling " + b + " Buffer: " + b),
                  J(
                    new Date(),
                    MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON
                  ),
                  (x = !0),
                  (o = !0),
                  e.videoModel.stallStream(b, x))
                : l === i &&
                  (I.call(e, j),
                  e.bufferExt.shouldBufferMore(d, f / 1e3).then(function (d) {
                    d
                      ? e.abrController
                          .getPlaybackQuality(b, c)
                          .then(function (c) {
                            if (
                              (e.debug.log(b + " Playback quality: " + c),
                              e.debug.log("Populate " + b + " buffers."),
                              void 0 !== c && (a = c),
                              (s = c !== u),
                              s === !0)
                            ) {
                              if (
                                ((h = P(a, e.getData())),
                                null === h || void 0 === h)
                              )
                                throw "Unexpected error!";
                              J(
                                new Date(),
                                MediaPlayer.vo.metrics.PlayList.Trace
                                  .REPRESENTATION_SWITCH_STOP_REASON
                              ),
                                e.metricsModel.addRepresentationSwitch(
                                  b,
                                  m,
                                  n,
                                  h.id
                                );
                            }
                            return (
                              e.debug.log(
                                s
                                  ? b + " Quality changed to: " + c
                                  : "Quality didn't change."
                              ),
                              V.call(e, s, c)
                            );
                          })
                          .then(function (c) {
                            null !== c
                              ? (e.debug.log(
                                  "Loading " + b + " initialization: " + c.url
                                ),
                                e.debug.log(c),
                                I.call(e, k),
                                e.fragmentLoader
                                  .load(c)
                                  .then(S.bind(e, c), T.bind(e, c)),
                                (u = a))
                              : W.call(e, a).then(X.bind(e));
                          })
                      : ((q = !1), l === j && I.call(e, i));
                  }));
          });
      };
    return (
      (w = function () {
        $.call(this);
      }),
      {
        videoModel: void 0,
        metricsModel: void 0,
        manifestExt: void 0,
        manifestModel: void 0,
        bufferExt: void 0,
        sourceBufferExt: void 0,
        fragmentController: void 0,
        abrController: void 0,
        fragmentExt: void 0,
        fragmentLoader: void 0,
        indexHandler: void 0,
        debug: void 0,
        system: void 0,
        errHandler: void 0,
        initialize: function (a, b, c, d, e, f) {
          var g = this,
            h = g.manifestModel.getValue(),
            i = g.manifestExt.getIsLive(h);
          g.setVideoModel(f),
            g.setType(a),
            g.setPeriodIndex(b),
            g.setData(c),
            g.setBuffer(d),
            g.setMinBufferTime(e),
            g.indexHandler.setIsLive(i),
            g.manifestExt
              .getTimestampOffsetForPeriod(b, g.manifestModel.getValue(), i)
              .then(function (a) {
                (g.getBuffer().timestampOffset = a), (E = a);
              }),
            g.manifestExt
              .getStartOffsetForPeriod(g.manifestModel.getValue(), b)
              .then(function (a) {
                (y = a),
                  g.manifestExt
                    .getDurationForPeriod(b, g.manifestModel.getValue(), i)
                    .then(function (a) {
                      g.indexHandler.setDuration(a + y);
                    });
              }),
            (m = !0),
            L.call(this);
        },
        getType: function () {
          return b;
        },
        setType: function (a) {
          (b = a), void 0 !== this.indexHandler && this.indexHandler.setType(a);
        },
        getPeriodIndex: function () {
          return D;
        },
        setPeriodIndex: function (a) {
          D = a;
        },
        getVideoModel: function () {
          return this.videoModel;
        },
        setVideoModel: function (a) {
          this.videoModel = a;
        },
        getTimestampOffset: function () {
          return E;
        },
        setTimestampOffset: function (a) {
          (this.getBuffer().timestampOffset = E), (E = a);
        },
        getLiveOffset: function () {
          return y;
        },
        setLiveStart: function (a) {
          y = a;
        },
        getAutoSwitchBitrate: function () {
          var a = this;
          return a.abrController.getAutoSwitchBitrate();
        },
        setAutoSwitchBitrate: function (a) {
          var b = this;
          b.abrController.setAutoSwitchBitrate(a);
        },
        getData: function () {
          return c;
        },
        setData: function (d) {
          var e = this;
          null !== c && void 0 !== c
            ? e.abrController.getPlaybackQuality(b, c).then(function (b) {
                e.indexHandler.getCurrentTime(b, c).then(function (b) {
                  (t = !0), (a = b), (c = d);
                });
              })
            : (c = d);
        },
        getBuffer: function () {
          return d;
        },
        setBuffer: function (a) {
          d = a;
        },
        getMinBufferTime: function () {
          return e;
        },
        setMinBufferTime: function (a) {
          var c = this;
          (e = a),
            (f = (1e3 * e) / 4),
            (f = Math.max(f, 1e3)),
            null !== v &&
              (c.debug.log("Changing " + b + " validate interval: " + f),
              clearInterval(v),
              (v = setInterval(w.bind(this), f, this)));
        },
        clearMetrics: function () {
          var a = this;
          null !== b &&
            "" !== b &&
            a.metricsModel.clearCurrentMetricsForType(b);
        },
        start: M,
        seek: N,
        stop: O,
      }
    );
  }),
  (MediaPlayer.dependencies.BufferController.prototype = {
    constructor: MediaPlayer.dependencies.BufferController,
  }),
  (MediaPlayer.dependencies.BufferExtensions = function () {
    "use strict";
    var a;
    return {
      decideBufferLength: function (b) {
        return (a = 4), (a = isNaN(b) || 0 >= b ? 4 : b), Q.when(a);
      },
      shouldBufferMore: function (b, c) {
        var d = 1.5 * a > b - c;
        return Q.when(d);
      },
    };
  }),
  (MediaPlayer.dependencies.BufferExtensions.prototype = {
    constructor: MediaPlayer.dependencies.BufferExtensions,
  }),
  (MediaPlayer.utils.Capabilities = function () {
    "use strict";
  }),
  (MediaPlayer.utils.Capabilities.prototype = {
    constructor: MediaPlayer.utils.Capabilities,
    supportsMediaSource: function () {
      "use strict";
      var a = "WebKitMediaSource" in window,
        b = "MediaSource" in window;
      return a || b;
    },
    supportsMediaKeys: function () {
      "use strict";
      var a = "WebKitMediaKeys" in window,
        b = "MSMediaKeys" in window,
        c = "MediaKeys" in window;
      return a || b || c;
    },
    supportsCodec: function (a, b) {
      "use strict";
      if (!(a instanceof HTMLVideoElement))
        throw "element must be of type HTMLVideoElement.";
      var c = a.canPlayType(b);
      return "probably" === c;
    },
  }),
  (MediaPlayer.utils.Debug = function () {
    "use strict";
    var a = !0;
    return {
      eventBus: void 0,
      setLogToBrowserConsole: function (b) {
        a = b;
      },
      getLogToBrowserConsole: function () {
        return a;
      },
      log: function (b) {
        a && console.log(b),
          this.eventBus.dispatchEvent({ type: "log", message: b });
      },
    };
  }),
  (MediaPlayer.dependencies.ErrorHandler = function () {
    "use strict";
    return {
      eventBus: void 0,
      downloadError: function (a) {
        this.eventBus.dispatchEvent({
          type: "error",
          error: "download",
          event: a,
        });
      },
      mediaSourceError: function (a) {
        this.eventBus.dispatchEvent({
          type: "error",
          error: "mediasource",
          event: a,
        });
      },
      mediaKeySessionError: function (a) {
        this.eventBus.dispatchEvent({
          type: "error",
          error: "key_session",
          event: a,
        });
      },
      mediaKeyMessageError: function (a) {
        this.eventBus.dispatchEvent({
          type: "error",
          error: "key_message",
          event: a,
        });
      },
      mediaKeySystemSelectionError: function (a) {
        this.eventBus.dispatchEvent({
          type: "error",
          error: "key_system_selection",
          event: a,
        });
      },
    };
  }),
  (MediaPlayer.dependencies.ErrorHandler.prototype = {
    constructor: MediaPlayer.dependencies.ErrorHandler,
  }),
  (MediaPlayer.utils.EventBus = function () {
    "use strict";
    var a,
      b = function (b, c) {
        var d = (c ? "1" : "0") + b;
        return d in a || (a[d] = []), a[d];
      },
      c = function () {
        a = {};
      };
    return (
      c(),
      {
        addEventListener: function (a, c, d) {
          var e = b(a, d),
            f = e.indexOf(c);
          -1 === f && e.push(c);
        },
        removeEventListener: function (a, c, d) {
          var e = b(a, d),
            f = e.indexOf(c);
          -1 !== f && e.splice(f, 1);
        },
        dispatchEvent: function (a) {
          for (var c = b(a.type, !1).slice(), d = 0; d < c.length; d++)
            c[d].call(this, a);
          return !a.defaultPrevented;
        },
      }
    );
  }),
  (MediaPlayer.dependencies.FragmentController = function () {
    "use strict";
  }),
  (MediaPlayer.dependencies.FragmentController.prototype = {
    constructor: MediaPlayer.dependencies.FragmentController,
    process: function (a) {
      "use strict";
      var b = null;
      return (
        null !== a &&
          void 0 !== a &&
          a.byteLength > 0 &&
          (b = new Uint8Array(a)),
        Q.when(b)
      );
    },
  }),
  (MediaPlayer.dependencies.FragmentLoader = function () {
    "use strict";
    var a = [],
      b = null,
      c = !1,
      d = function () {
        var e = new XMLHttpRequest(),
          f = null,
          g = !0,
          h = !1,
          i = this;
        a.length > 0
          ? ((b = a.shift()),
            (b.requestStartDate = new Date()),
            (b.firstByteDate = b.requestStartDate),
            (c = !0),
            e.open("GET", b.url, !0),
            (e.responseType = "arraybuffer"),
            b.range && e.setRequestHeader("Range", "bytes=" + b.range),
            (e.onprogress = function (a) {
              g &&
                ((g = !1),
                (!a.lengthComputable ||
                  (a.lengthComputable && a.total != a.loaded)) &&
                  (b.firstByteDate = new Date()));
            }),
            (e.onload = function () {
              if (!(e.status < 200 || e.status > 299)) {
                (h = !0), (b.requestEndDate = new Date());
                var a = b.requestEndDate,
                  c = e.response,
                  g = b.firstByteDate.getTime() - b.requestStartDate.getTime(),
                  j = b.requestEndDate.getTime() - b.firstByteDate.getTime(),
                  k = b.requestEndDate.getTime() - b.requestStartDate.getTime();
                i.debug.log(
                  "segment loaded: (" +
                    e.status +
                    ", " +
                    g +
                    "ms, " +
                    j +
                    "ms, " +
                    k +
                    "ms) " +
                    b.url
                ),
                  (f = i.metricsModel.addHttpRequest(
                    b.streamType,
                    null,
                    b.type,
                    b.url,
                    null,
                    b.range,
                    b.requestStartDate,
                    b.firstByteDate,
                    b.requestEndDate,
                    e.status,
                    null,
                    b.duration
                  )),
                  i.metricsModel.appendHttpTrace(
                    f,
                    a,
                    new Date().getTime() - a.getTime(),
                    [c.byteLength]
                  ),
                  b.deferred.resolve({ data: c, request: b }),
                  (b.deferred = null),
                  (b = null),
                  (e = null),
                  d.call(i);
              }
            }),
            (e.onloadend = e.onerror =
              function () {
                if (!h) {
                  b.requestEndDate = new Date();
                  var a =
                      b.firstByteDate.getTime() - b.requestStartDate.getTime(),
                    c = b.requestEndDate.getTime() - b.firstByteDate.getTime(),
                    g =
                      b.requestEndDate.getTime() - b.requestStartDate.getTime();
                  i.debug.log(
                    "segment loaded: (" +
                      e.status +
                      ", " +
                      a +
                      "ms, " +
                      c +
                      "ms, " +
                      g +
                      "ms) " +
                      b.url
                  ),
                    (f = i.metricsModel.addHttpRequest(
                      b.streamType,
                      null,
                      b.type,
                      b.url,
                      null,
                      b.range,
                      b.requestStartDate,
                      b.firstByteDate,
                      b.requestEndDate,
                      e.status,
                      null,
                      b.duration
                    )),
                    b.deferred.reject("Error loading fragment."),
                    d.call(i);
                }
              }),
            e.send())
          : (c = !1);
      },
      e = function (b) {
        var e = Q.defer();
        return (b.deferred = e), a.push(b), c || d.call(this), e.promise;
      };
    return {
      metricsModel: void 0,
      debug: void 0,
      getLoading: function () {
        return c;
      },
      load: function (a) {
        var b = null;
        if (a) return (b = e.call(this, a));
      },
    };
  }),
  (MediaPlayer.dependencies.FragmentLoader.prototype = {
    constructor: MediaPlayer.dependencies.FragmentLoader,
  }),
  (MediaPlayer.dependencies.ManifestLoader = function () {
    "use strict";
    var a = function (a) {
        var b = null;
        return (
          -1 !== a.indexOf("/") && (b = a.substring(0, a.lastIndexOf("/") + 1)),
          b
        );
      },
      b = function (b) {
        var c = a(b),
          d = Q.defer(),
          e = new XMLHttpRequest(),
          f = new Date(),
          g = !1,
          h = this;
        return (
          this.debug.log("Start loading manifest: " + b),
          e.open("GET", b, !0),
          (e.onloadend = function () {
            g || d.reject("Error loading manifest.");
          }),
          (e.onload = function () {
            (g = !0),
              h.metricsModel.addHttpRequest(
                "stream",
                null,
                "MPD",
                b,
                null,
                null,
                f,
                new Date(),
                e.status,
                null,
                null
              ),
              h.parser.parse(e.responseText, c).then(function (a) {
                (a.mpdUrl = b), d.resolve(a);
              });
          }),
          (e.onerror = function () {
            h.metricsModel.addHttpRequest(
              "stream",
              null,
              "MPD",
              b,
              null,
              null,
              f,
              new Date(),
              e.status,
              null,
              null
            ),
              d.reject("Error loading manifest.");
          }),
          e.send(),
          d.promise
        );
      };
    return { debug: void 0, parser: void 0, metricsModel: void 0, load: b };
  }),
  (MediaPlayer.dependencies.ManifestLoader.prototype = {
    constructor: MediaPlayer.dependencies.ManifestLoader,
  }),
  (MediaPlayer.models.ManifestModel = function () {
    "use strict";
    var a;
    return {
      getValue: function () {
        return a;
      },
      setValue: function (b) {
        a = b;
      },
    };
  }),
  (MediaPlayer.models.ManifestModel.prototype = {
    constructor: MediaPlayer.models.ManifestModel,
  }),
  (MediaPlayer.dependencies.ManifestUpdater = function () {
    "use strict";
    var a = 0 / 0,
      b = null,
      c = null,
      d = function () {
        null !== b && (clearInterval(b), (b = null));
      },
      e = function () {
        d.call(this),
          isNaN(a) ||
            (this.debug.log("Refresh manifest in " + a + " seconds."),
            (b = setInterval(c.bind(this), 1e3 * a, this)));
      },
      f = function () {
        var b = this,
          c = b.manifestModel.getValue();
        void 0 !== c &&
          null !== c &&
          b.manifestExt.getRefreshDelay(c).then(function (c) {
            (a = c), e.call(b);
          });
      };
    return (
      (c = function () {
        var a = this,
          b = a.manifestModel.getValue(),
          c = b.mpdUrl;
        b.hasOwnProperty("Location") && (c = b.Location),
          a.debug.log("Refresh manifest @ " + c),
          a.manifestLoader.load(c).then(function (b) {
            a.manifestModel.setValue(b),
              a.debug.log("Manifest has been refreshed."),
              a.debug.log(b),
              f.call(a),
              a.system.notify("manifestUpdated");
          });
      }),
      {
        debug: void 0,
        system: void 0,
        manifestModel: void 0,
        manifestExt: void 0,
        manifestLoader: void 0,
        setup: function () {
          f.call(this);
        },
        init: function () {
          f.call(this);
        },
      }
    );
  }),
  (MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater,
  }),
  (MediaPlayer.dependencies.MediaSourceExtensions = function () {
    "use strict";
  }),
  (MediaPlayer.dependencies.MediaSourceExtensions.prototype = {
    constructor: MediaPlayer.dependencies.MediaSourceExtensions,
    createMediaSource: function () {
      "use strict";
      var a = "WebKitMediaSource" in window,
        b = "MediaSource" in window;
      return b
        ? Q.when(new MediaSource())
        : a
        ? Q.when(new WebKitMediaSource())
        : null;
    },
    attachMediaSource: function (a, b) {
      "use strict";
      return b.setSource(window.URL.createObjectURL(a)), Q.when(!0);
    },
    setDuration: function (a, b) {
      "use strict";
      return (a.duration = b), Q.when(a.duration);
    },
  }),
  (MediaPlayer.models.MetricsModel = function () {
    "use strict";
    return {
      system: void 0,
      streamMetrics: {},
      clearCurrentMetricsForType: function (a) {
        delete this.streamMetrics[a];
      },
      clearAllCurrentMetrics: function () {
        this.streamMetrics = {};
      },
      getReadOnlyMetricsFor: function (a) {
        return this.streamMetrics.hasOwnProperty(a)
          ? this.streamMetrics[a]
          : null;
      },
      getMetricsFor: function (a) {
        var b;
        return (
          this.streamMetrics.hasOwnProperty(a)
            ? (b = this.streamMetrics[a])
            : ((b = this.system.getObject("metrics")),
              (this.streamMetrics[a] = b)),
          b
        );
      },
      addTcpConnection: function (a, b, c, d, e, f) {
        var g = new MediaPlayer.vo.metrics.TCPConnection();
        return (
          (g.tcpid = b),
          (g.dest = c),
          (g.topen = d),
          (g.tclose = e),
          (g.tconnect = f),
          this.getMetricsFor(a).TcpList.push(g),
          g
        );
      },
      addHttpRequest: function (a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = new MediaPlayer.vo.metrics.HTTPRequest();
        return (
          (m.tcpid = b),
          (m.type = c),
          (m.url = d),
          (m.actualurl = e),
          (m.range = f),
          (m.trequest = g),
          (m.tresponse = h),
          (m.tfinish = i),
          (m.responsecode = j),
          (m.interval = k),
          (m.mediaduration = l),
          this.getMetricsFor(a).HttpList.push(m),
          m
        );
      },
      appendHttpTrace: function (a, b, c, d) {
        var e = new MediaPlayer.vo.metrics.HTTPRequest.Trace();
        return (e.s = b), (e.d = c), (e.b = d), a.trace.push(e), e;
      },
      addRepresentationSwitch: function (a, b, c, d, e) {
        var f = new MediaPlayer.vo.metrics.RepresentationSwitch();
        return (
          (f.t = b),
          (f.mt = c),
          (f.to = d),
          (f.lto = e),
          this.getMetricsFor(a).RepSwitchList.push(f),
          f
        );
      },
      addBufferLevel: function (a, b, c) {
        var d = new MediaPlayer.vo.metrics.BufferLevel();
        return (
          (d.t = b), (d.level = c), this.getMetricsFor(a).BufferLevel.push(d), d
        );
      },
      addPlayList: function (a, b, c, d) {
        var e = new MediaPlayer.vo.metrics.PlayList();
        return (
          (e.start = b),
          (e.mstart = c),
          (e.starttype = d),
          this.getMetricsFor(a).PlayList.push(e),
          e
        );
      },
      appendPlayListTrace: function (a, b, c, d, e, f, g, h) {
        var i = new MediaPlayer.vo.metrics.PlayList.Trace();
        return (
          (i.representationid = b),
          (i.subreplevel = c),
          (i.start = d),
          (i.mstart = e),
          (i.duration = f),
          (i.playbackspeed = g),
          (i.stopreason = h),
          a.trace.push(i),
          i
        );
      },
    };
  }),
  (MediaPlayer.models.MetricsModel.prototype = {
    constructor: MediaPlayer.models.MetricsModel,
  }),
  (MediaPlayer.dependencies.ProtectionController = function () {
    "use strict";
    var a = null,
      b = null,
      c = function (a) {
        var b = this;
        b.protectionModel.removeKeySystem(a);
      },
      d = function (a, c) {
        for (var d = this, e = 0; e < b.length; ++e)
          for (var f = 0; f < c.length; ++f)
            if (
              b[e].isSupported(c[f]) &&
              d.protectionExt.supportsCodec(b[e].keysTypeString, a)
            ) {
              var g = d.manifestExt.getKID(c[f]);
              return (
                g || (g = "unknown"),
                d.protectionModel.addKeySystem(g, c[f], b[e]),
                d.debug.log(
                  "DRM: Selected Key System: " +
                    b[e].keysTypeString +
                    " For KID: " +
                    g
                ),
                g
              );
            }
        throw new Error(
          "DRM: The protection system for this content is not supported."
        );
      },
      e = function (a, b, c) {
        var d = this,
          e = null,
          f = null;
        d.protectionModel.needToAddKeySession(a) &&
          ((f = d.protectionModel.getInitData(a)),
          !f && c
            ? ((f = c),
              d.debug.log(
                "DRM: Using initdata from needskey event. length: " + f.length
              ))
            : f &&
              d.debug.log(
                "DRM: Using initdata from prheader in mpd. length: " + f.length
              ),
          f
            ? ((e = d.protectionModel.addKeySession(a, b, f)),
              d.debug.log(
                "DRM: Added Key Session [" +
                  e.sessionId +
                  "] for KID: " +
                  a +
                  " type: " +
                  b +
                  " initData length: " +
                  f.length
              ))
            : d.debug.log("DRM: initdata is null."));
      },
      f = function (a, b, c, d) {
        var e,
          f = this;
        return (
          (e = f.protectionModel.updateFromMessage(a, c, d)),
          e.then(function (a) {
            b.update(a);
          }),
          e
        );
      };
    return {
      system: void 0,
      debug: void 0,
      manifestExt: void 0,
      capabilities: void 0,
      videoModel: void 0,
      protectionModel: void 0,
      protectionExt: void 0,
      setup: function () {
        b = this.protectionExt.getKeySystems();
      },
      init: function (b, c) {
        (this.videoModel = b),
          (this.protectionModel = c),
          (a = this.videoModel.getElement());
      },
      selectKeySystem: d,
      ensureKeySession: e,
      updateFromMessage: f,
      teardownKeySystem: c,
    };
  }),
  (MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController,
  }),
  (MediaPlayer.dependencies.ProtectionExtensions = function () {
    "use strict";
  }),
  (MediaPlayer.dependencies.ProtectionExtensions.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionExtensions,
    supportsCodec: function (a, b) {
      "use strict";
      var c = "WebKitMediaKeys" in window,
        d = "MSMediaKeys" in window,
        e = "MediaKeys" in window;
      return e
        ? MediaKeys.isTypeSupported(a, b)
        : c
        ? WebKitMediaKeys.isTypeSupported(a, b)
        : d
        ? MSMediaKeys.isTypeSupported(a, b)
        : !1;
    },
    createMediaKeys: function (a) {
      "use strict";
      var b = "WebKitMediaKeys" in window,
        c = "MSMediaKeys" in window,
        d = "MediaKeys" in window;
      return d
        ? new MediaKeys(a)
        : b
        ? new WebKitMediaKeys(a)
        : c
        ? new MSMediaKeys(a)
        : null;
    },
    setMediaKey: function (a, b) {
      var c = "WebKitSetMediaKeys" in a,
        d = "msSetMediaKeys" in a,
        e = "SetMediaKeys" in a;
      return e
        ? a.SetMediaKeys(b)
        : c
        ? a.WebKitSetMediaKeys(b)
        : d
        ? a.msSetMediaKeys(b)
        : (this.debug.log("no setmediakeys function in element"), void 0);
    },
    createSession: function (a, b, c) {
      return a.createSession(b, c);
    },
    getKeySystems: function () {
      var a = function (a, b) {
          var c = Q.defer(),
            d = null,
            e = [],
            f = new DOMParser(),
            g = f.parseFromString(a, "application/xml");
          if (!g.getElementsByTagName("Challenge")[0])
            return (
              c.reject(
                "DRM: playready update, can not find Challenge in keyMessage"
              ),
              c.promise
            );
          var h =
            g.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
          h && (d = BASE64.decode(h));
          var i = g.getElementsByTagName("name"),
            j = g.getElementsByTagName("value");
          if (i.length != j.length)
            return (
              c.reject(
                "DRM: playready update, invalid header name/value pair in keyMessage"
              ),
              c.promise
            );
          for (var k = 0; k < i.length; k++)
            e[k] = {
              name: i[k].childNodes[0].nodeValue,
              value: j[k].childNodes[0].nodeValue,
            };
          var l = new XMLHttpRequest();
          return (
            (l.onload = function () {
              200 == l.status
                ? c.resolve(new Uint8Array(l.response))
                : c.reject(
                    'DRM: playready update, XHR status is "' +
                      l.statusText +
                      '" (' +
                      l.status +
                      "), expected to be 200. readyState is " +
                      l.readyState
                  );
            }),
            (l.onabort = function () {
              c.reject(
                'DRM: playready update, XHR aborted. status is "' +
                  l.statusText +
                  '" (' +
                  l.status +
                  "), readyState is " +
                  l.readyState
              );
            }),
            (l.onerror = function () {
              c.reject(
                'DRM: playready update, XHR error. status is "' +
                  l.statusText +
                  '" (' +
                  l.status +
                  "), readyState is " +
                  l.readyState
              );
            }),
            l.open("POST", b),
            (l.responseType = "arraybuffer"),
            e &&
              e.forEach(function (a) {
                l.setRequestHeader(a.name, a.value);
              }),
            l.send(d),
            c.promise
          );
        },
        b = function (a, b) {
          return null === a && 0 === b.length;
        },
        c = function (a) {
          var b = 0,
            c = 0,
            d = 0,
            e = new Uint8Array([112, 115, 115, 104, 0, 0, 0, 0]),
            f = new Uint8Array([
              154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136,
              95, 149,
            ]),
            g = null,
            h = null,
            i = null,
            j = null;
          if ("pro" in a) g = BASE64.decodeArray(a.pro.__text);
          else {
            if (!("prheader" in a)) return null;
            g = BASE64.decodeArray(a.prheader.__text);
          }
          return (
            (c = g.length),
            (d = 4 + e.length + f.length + 4 + c),
            (h = new ArrayBuffer(d)),
            (i = new Uint8Array(h)),
            (j = new DataView(h)),
            j.setUint32(b, d),
            (b += 4),
            i.set(e, b),
            (b += e.length),
            i.set(f, b),
            (b += f.length),
            j.setUint32(b, c),
            (b += 4),
            i.set(g, b),
            (b += c),
            i
          );
        };
      return [
        {
          schemeIdUri: "urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95",
          keysTypeString: "com.microsoft.playready",
          isSupported: function (a) {
            return this.schemeIdUri === a.schemeIdUri.toLowerCase();
          },
          needToAddKeySession: b,
          getInitData: c,
          getUpdate: a,
        },
        {
          schemeIdUri: "urn:mpeg:dash:mp4protection:2011",
          keysTypeString: "com.microsoft.playready",
          isSupported: function (a) {
            return (
              this.schemeIdUri === a.schemeIdUri.toLowerCase() &&
              "cenc" === a.value.toLowerCase()
            );
          },
          needToAddKeySession: b,
          getInitData: function () {
            return null;
          },
          getUpdate: a,
        },
        {
          schemeIdUri: "urn:uuid:00000000-0000-0000-0000-000000000000",
          keysTypeString: "webkit-org.w3.clearkey",
          isSupported: function (a) {
            return this.schemeIdUri === a.schemeIdUri.toLowerCase();
          },
          needToAddKeySession: function () {
            return !0;
          },
          getInitData: function () {
            return null;
          },
          getUpdate: function (a) {
            return Q.when(a);
          },
        },
      ];
    },
    addKey: function (a, b, c, d, e) {
      a.webkitAddKey(b, c, d, e);
    },
    generateKeyRequest: function (a, b, c) {
      a.webkitGenerateKeyRequest(b, c);
    },
    listenToNeedKey: function (a, b) {
      a.listen("webkitneedkey", b),
        a.listen("msneedkey", b),
        a.listen("needKey", b);
    },
    listenToKeyError: function (a, b) {
      a.addEventListener("webkitkeyerror", b, !1),
        a.addEventListener("mskeyerror", b, !1),
        a.addEventListener("keyerror", b, !1);
    },
    listenToKeyMessage: function (a, b) {
      a.addEventListener("webkitkeymessage", b, !1),
        a.addEventListener("mskeymessage", b, !1),
        a.addEventListener("keymessage", b, !1);
    },
    listenToKeyAdded: function (a, b) {
      a.addEventListener("webkitkeyadded", b, !1),
        a.addEventListener("mskeyadded", b, !1),
        a.addEventListener("keyadded", b, !1);
    },
    unlistenToKeyError: function (a, b) {
      a.removeEventListener("webkitkeyerror", b),
        a.removeEventListener("mskeyerror", b),
        a.removeEventListener("keyerror", b);
    },
    unlistenToKeyMessage: function (a, b) {
      a.removeEventListener("webkitkeymessage", b),
        a.removeEventListener("mskeymessage", b),
        a.removeEventListener("keymessage", b);
    },
    unlistenToKeyAdded: function (a, b) {
      a.removeEventListener("webkitkeyadded", b),
        a.removeEventListener("mskeyadded", b),
        a.removeEventListener("keyadded", b);
    },
  }),
  (MediaPlayer.models.ProtectionModel = function () {
    "use strict";
    var a = null,
      b = null,
      c = null,
      d = null,
      e = [];
    return {
      system: void 0,
      videoModel: void 0,
      protectionExt: void 0,
      setup: function () {
        a = this.videoModel.getElement();
      },
      init: function (b) {
        (this.videoModel = b), (a = this.videoModel.getElement());
      },
      addKeySession: function (a, f, g) {
        var h = null;
        return (
          (h = this.protectionExt.createSession(e[a].keys, f, g)),
          this.protectionExt.listenToKeyAdded(h, b),
          this.protectionExt.listenToKeyError(h, c),
          this.protectionExt.listenToKeyMessage(h, d),
          (e[a].initData = g),
          e[a].keySessions.push(h),
          h
        );
      },
      addKeySystem: function (b, c, d) {
        var f = null;
        (f = this.protectionExt.createMediaKeys(d.keysTypeString)),
          this.protectionExt.setMediaKey(a, f),
          (e[b] = {
            kID: b,
            contentProtection: c,
            keySystem: d,
            keys: f,
            initData: null,
            keySessions: [],
          });
      },
      removeKeySystem: function (a) {
        if (null !== a && void 0 !== e[a] && 0 !== e[a].keySessions.length) {
          for (var f = e[a].keySessions, g = 0; g < f.length; ++g)
            this.protectionExt.unlistenToKeyError(f[g], c),
              this.protectionExt.unlistenToKeyAdded(f[g], b),
              this.protectionExt.unlistenToKeyMessage(f[g], d),
              f[g].close();
          e[a] = void 0;
        }
      },
      needToAddKeySession: function (a) {
        var b = null;
        return (
          (b = e[a]), b.keySystem.needToAddKeySession(b.initData, b.keySessions)
        );
      },
      getInitData: function (a) {
        var b = null;
        return (b = e[a]), b.keySystem.getInitData(b.contentProtection);
      },
      updateFromMessage: function (a, b, c) {
        return e[a].keySystem.getUpdate(b, c);
      },
      listenToNeedKey: function (a) {
        this.protectionExt.listenToNeedKey(this.videoModel, a);
      },
      listenToKeyError: function (a) {
        c = a;
        for (var b = 0; b < e.length; ++b)
          for (var d = e[b].keySessions, f = 0; f < d.length; ++f)
            this.protectionExt.listenToKeyError(d[f], a);
      },
      listenToKeyMessage: function (a) {
        d = a;
        for (var b = 0; b < e.length; ++b)
          for (var c = e[b].keySessions, f = 0; f < c.length; ++f)
            this.protectionExt.listenToKeyMessage(c[f], a);
      },
      listenToKeyAdded: function (a) {
        b = a;
        for (var c = 0; c < e.length; ++c)
          for (var d = e[c].keySessions, f = 0; f < d.length; ++f)
            this.protectionExt.listenToKeyAdded(d[f], a);
      },
    };
  }),
  (MediaPlayer.models.ProtectionModel.prototype = {
    constructor: MediaPlayer.models.ProtectionModel,
  }),
  (MediaPlayer.dependencies.SourceBufferExtensions = function () {
    "use strict";
    (this.system = void 0), (this.manifestExt = void 0);
  }),
  (MediaPlayer.dependencies.SourceBufferExtensions.prototype = {
    constructor: MediaPlayer.dependencies.SourceBufferExtensions,
    createSourceBuffer: function (a, b) {
      "use strict";
      var c = Q.defer(),
        d = this;
      try {
        c.resolve(a.addSourceBuffer(b));
      } catch (e) {
        d.manifestExt.getIsTextTrack(b)
          ? c.resolve(d.system.getObject("textVTTSourceBuffer"))
          : c.reject(e.description);
      }
      return c.promise;
    },
    removeSourceBuffer: function (a, b) {
      "use strict";
      var c = Q.defer();
      try {
        c.resolve(a.removeSourceBuffer(b));
      } catch (d) {
        c.reject(d.description);
      }
      return c.promise;
    },
    getBufferRange: function (a, b, c) {
      "use strict";
      var d,
        e,
        f = null,
        g = 0,
        h = 0,
        i = null,
        j = null,
        k = 0,
        l = c || 0.15;
      if (((f = a.buffered), null !== f)) {
        for (e = 0, d = f.length; d > e; e += 1)
          if (((g = f.start(e)), (h = f.end(e)), null === i)) {
            if (((k = Math.abs(g - b)), b >= g && h > b)) {
              (i = g), (j = h);
              continue;
            }
            if (l >= k) {
              (i = g), (j = h);
              continue;
            }
          } else {
            if (((k = g - j), !(l >= k))) break;
            j = h;
          }
        if (null !== i) return Q.when({ start: i, end: j });
      }
      return Q.when(null);
    },
    getBufferLength: function (a, b, c) {
      "use strict";
      var d = this,
        e = Q.defer();
      return (
        d.getBufferRange(a, b, c).then(function (a) {
          null === a ? e.resolve(0) : e.resolve(a.end - b);
        }),
        e.promise
      );
    },
    append: function (a, b) {
      "use strict";
      var c = Q.defer(),
        d = function () {
          a.removeEventListener("updateend", d, !1), c.resolve(!0);
        };
      try {
        a.addEventListener("updateend", d, !1);
      } catch (e) {
        c.resolve(!0);
      }
      try {
        "append" in a ? a.append(b) : "appendBuffer" in a && a.appendBuffer(b);
      } catch (e) {
        return Q.when(!1);
      }
      return c.promise;
    },
    abort: function (a) {
      "use strict";
      var b = Q.defer();
      try {
        b.resolve(a.abort());
      } catch (c) {
        b.reject(c.description);
      }
      return b.promise;
    },
  }),
  (MediaPlayer.dependencies.Stream = function () {
    "use strict";
    var a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p = null,
      q = null,
      r = null,
      s = null,
      t = -1,
      u = null,
      v = -1,
      w = null,
      x = -1,
      y = !0,
      z = !1,
      A = !1,
      B = null,
      C = [],
      D = -1,
      E = function () {
        this.debug.log("Attempting play..."),
          z && (this.debug.log("Do play."), this.videoModel.play());
      },
      F = function () {
        this.debug.log("Do pause."), this.videoModel.pause();
      },
      G = function (a) {
        this.debug.log("Attempting seek..."),
          z &&
            (this.debug.log("Do seek: " + a),
            this.system.notify("setCurrentTime"),
            this.videoModel.setCurrentTime(a),
            s && s.seek(a),
            u && u.seek(a));
      },
      H = function (a) {
        var b,
          c = this;
        if (
          ((b = "msneedkey" !== a.type ? a.type : p),
          C.push({ type: b, initData: a.initData }),
          this.debug.log("DRM: Key required for - " + b),
          r && p && !B)
        )
          try {
            B = c.protectionController.selectKeySystem(p, r);
          } catch (d) {
            F.call(c),
              c.debug.log(d),
              c.errHandler.mediaKeySystemSelectionError(d);
          }
        B && c.protectionController.ensureKeySession(B, b, a.initData);
      },
      I = function (a) {
        var b = this,
          c = null,
          d = null,
          e = null,
          f = null;
        this.debug.log("DRM: Got a key message..."),
          (c = a.target),
          (d = new Uint16Array(a.message.buffer)),
          (e = String.fromCharCode.apply(null, d)),
          (f = a.destinationURL),
          b.protectionController
            .updateFromMessage(B, c, e, f)
            .fail(function (a) {
              F.call(b), b.debug.log(a), b.errHandler.mediaKeyMessageError(a);
            });
      },
      J = function () {
        this.debug.log("DRM: Key added.");
      },
      K = function () {
        var a,
          b = event.target;
        switch (
          ((a =
            "DRM: MediaKeyError - sessionId: " +
            b.sessionId +
            " errorCode: " +
            b.error.code +
            " systemErrorCode: " +
            b.error.systemCode +
            " ["),
          b.error.code)
        ) {
          case 1:
            a +=
              "MEDIA_KEYERR_UNKNOWN - An unspecified error occurred. This value is used for errors that don't match any of the other codes.";
            break;
          case 2:
            a +=
              "MEDIA_KEYERR_CLIENT - The Key System could not be installed or updated.";
            break;
          case 3:
            a +=
              "MEDIA_KEYERR_SERVICE - The message passed into update indicated an error from the license service.";
            break;
          case 4:
            a +=
              "MEDIA_KEYERR_OUTPUT - There is no available output device with the required characteristics for the content protection system.";
            break;
          case 5:
            a +=
              "MEDIA_KEYERR_HARDWARECHANGE - A hardware configuration change caused a content protection error.";
            break;
          case 6:
            a +=
              "MEDIA_KEYERR_DOMAIN - An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain.";
        }
        (a += "]"), this.debug.log(a), this.errHandler.mediaKeySessionError(a);
      },
      L = function () {
        var a = Q.defer(),
          c = this,
          d = function (a) {
            V.call(c, a);
          },
          e = function (d) {
            c.debug.log("MediaSource is open!"),
              c.debug.log(d),
              b.removeEventListener("sourceopen", e),
              b.removeEventListener("webkitsourceopen", e),
              a.resolve(b);
          };
        return (
          c.debug.log("MediaSource should be closed. (" + b.readyState + ")"),
          b.addEventListener("sourceclose", d, !1),
          b.addEventListener("webkitsourceclose", d, !1),
          b.addEventListener("sourceopen", e, !1),
          b.addEventListener("webkitsourceopen", e, !1),
          c.mediaSourceExt.attachMediaSource(b, c.videoModel),
          c.debug.log("MediaSource attached to video.  Waiting on open..."),
          a.promise
        );
      },
      M = function () {
        s && s.clearMetrics(), u && u.clearMetrics();
      },
      N = function () {
        var a,
          c,
          d,
          e = this;
        s && s.stop(),
          u && u.stop(),
          M.call(this),
          A ||
            (s &&
              ((a = s.getBuffer()),
              e.sourceBufferExt.abort(a),
              e.sourceBufferExt.removeSourceBuffer(b, a)),
            u &&
              ((c = u.getBuffer()),
              e.sourceBufferExt.abort(c),
              e.sourceBufferExt.removeSourceBuffer(b, c)),
            w &&
              ((d = w.getBuffer()),
              e.sourceBufferExt.abort(d),
              e.sourceBufferExt.removeSourceBuffer(b, d))),
          (s = null),
          (u = null),
          (w = null),
          (p = null),
          (q = null),
          e.protectionController.teardownKeySystem(B),
          (B = null),
          (C = []),
          (r = null),
          e.videoModel.setSource(null);
      },
      O = function (a, b, c, d) {
        if (a && b && c)
          if (null === s && null === u && null === w) {
            var e = "No streams to play.";
            alert(e), this.debug.log(e), d.reject(e);
          } else this.debug.log("MediaSource initialized!"), d.resolve(!0);
      },
      P = function () {
        this.debug.log("Getting MediaSource ready...");
        var a,
          c = Q.defer(),
          d = !1,
          e = !1,
          f = !1,
          g = this,
          h = g.manifestModel.getValue(),
          i = g.manifestExt.getIsLive(h);
        return (
          g.debug.log("Gathering information for buffers. (1)"),
          g.manifestExt.getDuration(h, i).then(function () {
            g.debug.log("Gathering information for buffers. (2)"),
              g.bufferExt
                .decideBufferLength(h.minBufferTime)
                .then(function (b) {
                  return (
                    g.debug.log("Gathering information for buffers. (3)"),
                    g.debug.log("Buffer time: " + b),
                    (a = b),
                    g.manifestExt.getVideoData(h, D)
                  );
                })
                .then(function (i) {
                  return (
                    null !== i
                      ? (g.debug.log("Create video buffer."),
                        g.manifestExt.getDataIndex(i, h, D).then(function (a) {
                          (t = a), g.debug.log("Save video track: " + t);
                        }),
                        g.manifestExt
                          .getCodec(i)
                          .then(function (a) {
                            return (
                              g.debug.log("Video codec: " + a),
                              (p = a),
                              g.manifestExt
                                .getContentProtectionData(i)
                                .then(function (c) {
                                  var d = Q.defer();
                                  return (
                                    g.debug.log("Video contentProtection"),
                                    (r = c),
                                    g.capabilities.supportsCodec(
                                      g.videoModel.getElement(),
                                      a
                                    )
                                      ? (d =
                                          g.sourceBufferExt.createSourceBuffer(
                                            b,
                                            a
                                          ))
                                      : (g.debug.log(
                                          "Codec (" + a + ") is not supported."
                                        ),
                                        alert(
                                          "Codec (" + a + ") is not supported."
                                        ),
                                        (d = Q.when(null))),
                                    d
                                  );
                                })
                            );
                          })
                          .then(
                            function (b) {
                              null === b
                                ? g.debug.log(
                                    "No buffer was created, skipping video stream."
                                  )
                                : ((s = g.system.getObject("bufferController")),
                                  s.initialize(
                                    "video",
                                    D,
                                    i,
                                    b,
                                    a,
                                    g.videoModel
                                  ),
                                  g.debug.log("Video is ready!")),
                                (d = !0),
                                O.call(g, d, e, f, c);
                            },
                            function () {
                              alert("Error creating source buffer."),
                                (d = !0),
                                O.call(g, d, e, f, c);
                            }
                          ))
                      : (g.debug.log("No video data."),
                        (d = !0),
                        O.call(g, d, e, f, c)),
                    g.manifestExt.getAudioDatas(h, D)
                  );
                })
                .then(function (i) {
                  return (
                    null !== i && i.length > 0
                      ? (g.debug.log("Have audio streams: " + i.length),
                        g.manifestExt
                          .getPrimaryAudioData(h, D)
                          .then(function (i) {
                            g.manifestExt
                              .getDataIndex(i, h, D)
                              .then(function (a) {
                                (v = a), g.debug.log("Save audio track: " + v);
                              }),
                              g.manifestExt
                                .getCodec(i)
                                .then(function (a) {
                                  var c;
                                  return (
                                    g.debug.log("Audio codec: " + a),
                                    (q = a),
                                    g.capabilities.supportsCodec(
                                      g.videoModel.getElement(),
                                      a
                                    )
                                      ? (c =
                                          g.sourceBufferExt.createSourceBuffer(
                                            b,
                                            a
                                          ))
                                      : (g.debug.log(
                                          "Codec (" + a + ") is not supported."
                                        ),
                                        alert(
                                          "Codec (" + a + ") is not supported."
                                        ),
                                        (c = Q.when(null))),
                                    c
                                  );
                                })
                                .then(
                                  function (b) {
                                    null === b
                                      ? g.debug.log(
                                          "No buffer was created, skipping audio stream."
                                        )
                                      : ((u =
                                          g.system.getObject(
                                            "bufferController"
                                          )),
                                        u.initialize(
                                          "audio",
                                          D,
                                          i,
                                          b,
                                          a,
                                          g.videoModel
                                        ),
                                        g.debug.log("Audio is ready!")),
                                      (e = !0),
                                      O.call(g, d, e, f, c);
                                  },
                                  function () {
                                    alert("Error creating source buffer."),
                                      (e = !0),
                                      O.call(g, d, e, f, c);
                                  }
                                );
                          }))
                      : (g.debug.log("No audio streams."),
                        (e = !0),
                        O.call(g, d, e, f, c)),
                    g.manifestExt.getTextData(h, D)
                  );
                })
                .then(function (a) {
                  var i;
                  null !== a
                    ? (g.manifestExt.getDataIndex(a, h, D).then(function (a) {
                        (x = a), g.debug.log("Save text track: " + x);
                      }),
                      g.manifestExt
                        .getMimeType(a)
                        .then(function (a) {
                          return (
                            (i = a), g.sourceBufferExt.createSourceBuffer(b, i)
                          );
                        })
                        .then(
                          function (b) {
                            null === b
                              ? g.debug.log(
                                  "Source buffer was not created for text track"
                                )
                              : ((w = g.system.getObject("textController")),
                                w.initialize(D, a, b, g.videoModel),
                                b.hasOwnProperty("initialize") &&
                                  b.initialize(i, w),
                                g.debug.log("Text is ready!"),
                                (f = !0),
                                O.call(g, d, e, f, c));
                          },
                          function (a) {
                            g.debug.log("Error creating text buffer:"),
                              g.debug.log(a),
                              alert("Error creating source buffer."),
                              (f = !0),
                              O.call(g, d, e, f, c);
                          }
                        ))
                    : (g.debug.log("No text tracks."),
                      (f = !0),
                      O.call(g, d, e, f, c));
                });
          }),
          c.promise
        );
      },
      R = function () {
        var a = this,
          c = Q.defer(),
          d = a.manifestModel.getValue(),
          e = a.manifestExt.getIsLive(d);
        return (
          a.debug.log("Getting ready for playback..."),
          a.manifestExt
            .getDurationForPeriod(D, a.manifestModel.getValue(), e)
            .then(function (a) {
              k = a;
            }),
          a.manifestExt
            .getDuration(a.manifestModel.getValue(), e)
            .then(function (c) {
              return (
                a.debug.log("Setting duration: " + c),
                a.mediaSourceExt.setDuration(b, c)
              );
            })
            .then(function () {
              a.debug.log("Duration successfully set."),
                (z = !0),
                c.resolve(!0);
            }),
          c.promise
        );
      },
      S = function () {
        this.debug.log("Got loadmetadata event."), c.resolve(null);
      },
      T = function () {
        this.debug.log("Got play event."),
          z &&
            (this.debug.log("Starting playback."),
            s && s.start(),
            u && u.start(),
            w && w.start());
      },
      U = function () {
        this.debug.log("Got pause event."), s && s.stop(), u && u.stop();
      },
      V = function () {
        var a = this.videoModel.getElement().error,
          b = null !== a && void 0 !== a ? a.code : -1,
          c = "";
        if (-1 !== b) {
          switch (b) {
            case 1:
              c = "MEDIA_ERR_ABORTED";
              break;
            case 2:
              c = "MEDIA_ERR_NETWORK";
              break;
            case 3:
              c = "MEDIA_ERR_DECODE";
              break;
            case 4:
              c = "MEDIA_ERR_SRC_NOT_SUPPORTED";
              break;
            case 5:
              c = "MEDIA_ERR_ENCRYPTED";
          }
          (A = !0),
            this.debug.log("Video Element Error: " + c),
            this.debug.log(this.videoModel.getElement().error),
            this.errHandler.mediaSourceError(c),
            F.call(this);
        }
      },
      W = function () {
        this.debug.log("Got seeking event.");
        var a = this.videoModel.getCurrentTime();
        s && s.seek(a), u && u.seek(a);
      },
      X = function () {
        this.debug.log("Seek complete."),
          this.videoModel.listen("seeking", h),
          this.videoModel.unlisten("seeked", i);
      },
      Y = function () {},
      Z = function (c) {
        var d = this;
        return (
          d.debug.log("Stream start loading."),
          (a = c),
          d.manifestModel.setValue(a),
          d.debug.log("Manifest has loaded."),
          d.debug.log(d.manifestModel.getValue()),
          d.manifestUpdater.init(),
          d.mediaSourceExt
            .createMediaSource()
            .then(function (a) {
              return (b = a), d.debug.log("MediaSource created."), L.call(d);
            })
            .then(function () {
              return d.debug.log("MediaSource set up."), P.call(d);
            })
            .then(function () {
              return d.debug.log("Start initializing playback."), R.call(d);
            })
            .then(function () {
              return (
                d.debug.log("element loaded!"),
                D > 0
                  ? (F.call(d), void 0)
                  : ($.call(d),
                    y && (d.debug.log("Playback initialized!"), E.call(d)),
                    void 0)
              );
            })
        );
      },
      $ = function () {
        var a = this,
          b = a.manifestModel.getValue(),
          c = a.manifestExt.getIsLive(b);
        c
          ? a.manifestExt
              .getLiveEdge(a.manifestModel.getValue(), D)
              .then(function (b) {
                a.debug.log(
                  "Got live content.  Starting playback at offset: " + b
                ),
                  G.call(a, b + a.getTimestampOffset() + a.getLiveOffset());
              })
          : a.manifestExt
              .getPresentationOffset(a.manifestModel.getValue(), D)
              .then(function (b) {
                a.debug.log(
                  "Got VOD content.  Starting playback at offset: " + b
                ),
                  G.call(a, b + a.getTimestampOffset() + a.getLiveOffset());
              });
      },
      _ = function () {
        this.debug.log("Current time has changed, block programmatic seek."),
          this.videoModel.unlisten("seeking", h),
          this.videoModel.listen("seeked", i);
      },
      ab = function () {
        var a,
          b,
          c = this,
          d = c.manifestModel.getValue();
        c.debug.log("Manifest updated... set new data on buffers."),
          s &&
            ((a = s.getData()),
            a.hasOwnProperty("id")
              ? c.manifestExt.getDataForId(a.id, d, D).then(function (a) {
                  s.setData(a);
                })
              : c.manifestExt.getDataForIndex(t, d, D).then(function (a) {
                  s.setData(a);
                })),
          u &&
            ((b = u.getData()),
            b.hasOwnProperty("id")
              ? c.manifestExt.getDataForId(b.id, d, D).then(function (a) {
                  u.setData(a);
                })
              : c.manifestExt.getDataForIndex(v, d, D).then(function (a) {
                  u.setData(a);
                }));
      };
    return {
      system: void 0,
      videoModel: void 0,
      manifestLoader: void 0,
      manifestUpdater: void 0,
      manifestModel: void 0,
      mediaSourceExt: void 0,
      sourceBufferExt: void 0,
      bufferExt: void 0,
      manifestExt: void 0,
      fragmentController: void 0,
      abrController: void 0,
      fragmentExt: void 0,
      protectionModel: void 0,
      protectionController: void 0,
      protectionExt: void 0,
      capabilities: void 0,
      debug: void 0,
      metricsExt: void 0,
      errHandler: void 0,
      setup: function () {
        this.system.mapHandler("manifestUpdated", void 0, ab.bind(this)),
          this.system.mapHandler("setCurrentTime", void 0, _.bind(this)),
          (c = Q.defer()),
          (e = T.bind(this)),
          (f = U.bind(this)),
          (g = V.bind(this)),
          (h = W.bind(this)),
          (i = X.bind(this)),
          (j = Y.bind(this)),
          (d = S.bind(this));
      },
      load: function (a, b) {
        (D = b), Z.call(this, a);
      },
      setVideoModel: function (a) {
        (this.videoModel = a),
          this.videoModel.listen("play", e),
          this.videoModel.listen("pause", f),
          this.videoModel.listen("error", g),
          this.videoModel.listen("seeking", h),
          this.videoModel.listen("timeupdate", j),
          this.videoModel.listen("loadedmetadata", d);
      },
      initProtection: function () {
        (l = H.bind(this)),
          (m = I.bind(this)),
          (n = J.bind(this)),
          (o = K.bind(this)),
          (this.protectionModel = this.system.getObject("protectionModel")),
          this.protectionModel.init(this.getVideoModel()),
          (this.protectionController = this.system.getObject(
            "protectionController"
          )),
          this.protectionController.init(this.videoModel, this.protectionModel),
          this.protectionModel.listenToNeedKey(l),
          this.protectionModel.listenToKeyMessage(m),
          this.protectionModel.listenToKeyError(o),
          this.protectionModel.listenToKeyAdded(n);
      },
      getVideoModel: function () {
        return this.videoModel;
      },
      getManifestExt: function () {
        var a = this;
        return a.manifestExt;
      },
      setAutoPlay: function (a) {
        y = a;
      },
      getAutoPlay: function () {
        return y;
      },
      reset: function () {
        F.call(this), N.call(this);
      },
      attacheToVideoElement: function () {
        var a = this;
        a.mediaSourceExt.attachMediaSource(b, a.videoModel);
      },
      getDuration: function () {
        return k;
      },
      setPeriodIndex: function (a) {
        D = a;
      },
      getPeriodIndex: function () {
        return D;
      },
      getTimestampOffset: function () {
        return s ? s.getTimestampOffset() : u ? u.getTimestampOffset() : 0;
      },
      getLiveOffset: function () {
        return s ? s.getLiveOffset() : u ? u.getLiveOffset() : 0;
      },
      initPlayback: $,
      play: E,
      seek: G,
      pause: F,
    };
  }),
  (MediaPlayer.dependencies.Stream.prototype = {
    constructor: MediaPlayer.dependencies.Stream,
  }),
  (MediaPlayer.dependencies.StreamController = function () {
    "use strict";
    var a,
      b = [],
      c = 4,
      d = 3,
      e = !0,
      f = null,
      g = function () {
        a.play();
      },
      h = function () {
        a.pause();
      },
      i = function (b) {
        a.seek(b);
      },
      j = function (a, b) {
        var c = a.getElement(),
          d = b.getElement();
        return (
          d.parentNode || c.parentNode.insertBefore(d, c),
          (c.style.width = "0px"),
          (d.style.width = "100%"),
          m(c, d),
          l(a),
          k(b),
          Q.when(!0)
        );
      },
      k = function (a) {
        a.listen("seeking", p),
          a.listen("progress", n),
          r() && a.listen("timeupdate", o);
      },
      l = function (a) {
        a.unlisten("seeking", p),
          a.unlisten("progress", n),
          a.unlisten("timeupdate", o);
      },
      m = function (a, b) {
        ["controls", "loop", "muted", "playbackRate", "volume"].forEach(
          function (c) {
            b[c] = a[c];
          }
        );
      },
      n = function () {
        var b = a.getVideoModel().getElement().buffered;
        if (b.length) {
          a.getVideoModel().getCurrentTime() < b.start(0) &&
            a.getVideoModel().setCurrentTime(b.start(0));
          var d = b.length - 1,
            e = b.end(d) - a.getTimestampOffset(),
            f = a.getDuration() - e;
          c > f && (a.getVideoModel().unlisten("progress", n), q());
        }
      },
      o = function () {
        if (!a.getVideoModel().getElement().seeking) {
          var b = a.getDuration() + a.getTimestampOffset() + a.getLiveOffset(),
            c = a.getVideoModel().getCurrentTime();
          d > b - c && u(a, r());
        }
      },
      p = function () {
        var b = a.getVideoModel().getCurrentTime(),
          c = s(b);
        c && c !== a && u(a, c, b);
      },
      q = function () {
        var a = r();
        a && a.initPlayback();
      },
      r = function () {
        var c = a.getPeriodIndex() + 1;
        return c < b.length ? b[c] : null;
      },
      s = function (a) {
        for (var c = 0, d = null, e = 0, f = b.length; f > e; e++)
          if (((d = b[e]), (c += d.getDuration()), c > a)) return d;
      },
      t = function () {
        var a = this.system.getObject("videoModel"),
          b = document.createElement("video");
        return a.setElement(b), a;
      },
      u = function (b, c, d) {
        b &&
          c &&
          b !== c &&
          Q.when(f || !0).then(function () {
            b.pause(),
              (a = c),
              (f = j(b.getVideoModel(), c.getVideoModel())),
              d ? i(b.getVideoModel().getCurrentTime()) : a.initPlayback(),
              g();
          });
      };
    return {
      system: void 0,
      videoModel: void 0,
      manifestLoader: void 0,
      manifestUpdater: void 0,
      manifestModel: void 0,
      mediaSourceExt: void 0,
      sourceBufferExt: void 0,
      bufferExt: void 0,
      manifestExt: void 0,
      fragmentController: void 0,
      abrController: void 0,
      fragmentExt: void 0,
      capabilities: void 0,
      debug: void 0,
      metricsExt: void 0,
      errHandler: void 0,
      getManifestExt: function () {
        return a.getManifestExt();
      },
      setAutoPlay: function (a) {
        e = a;
      },
      getAutoPlay: function () {
        return e;
      },
      getVideoModel: function () {
        return this.videoModel;
      },
      setVideoModel: function (a) {
        this.videoModel = a;
      },
      load: function (c) {
        var d,
          f = this;
        f.manifestLoader.load(c).then(function (c) {
          f.manifestExt.getPeriodCount(c).then(function (g) {
            for (var h = 0; g > h; h++)
              (d = f.system.getObject("stream")),
                d.setVideoModel(0 === h ? f.videoModel : t.call(f)),
                d.initProtection(),
                d.setAutoPlay(e),
                d.load(c, h),
                b.push(d);
            (a = b[0]), k(a.getVideoModel());
          });
        });
      },
      reset: function () {
        a && l(a.getVideoModel());
        for (var c = 0, d = b.length; d > c; c++) {
          var e = b[c];
          e.reset();
        }
        b = [];
      },
      play: g,
      seek: i,
      pause: h,
    };
  }),
  (MediaPlayer.dependencies.StreamController.prototype = {
    constructor: MediaPlayer.dependencies.StreamController,
  }),
  (MediaPlayer.models.VideoModel = function () {
    "use strict";
    var a,
      b = [],
      c = function () {
        return b.length > 0;
      },
      d = function (c) {
        null !== c &&
          b[c] !== !0 &&
          (b.push(c), (b[c] = !0), (a.playbackRate = 0));
      },
      e = function (d) {
        if (null !== d) {
          b[d] = !1;
          var e = b.indexOf(d);
          -1 !== e && b.splice(e, 1), c() === !1 && (a.playbackRate = 1);
        }
      },
      f = function (a, b) {
        b ? d(a) : e(a);
      };
    return {
      system: void 0,
      setup: function () {},
      play: function () {
        a.play();
      },
      pause: function () {
        a.pause();
      },
      isPaused: function () {
        return a.paused;
      },
      getPlaybackRate: function () {
        return a.playbackRate;
      },
      setPlaybackRate: function (b) {
        a.playbackRate = b;
      },
      getCurrentTime: function () {
        return a.currentTime;
      },
      setCurrentTime: function (b) {
        a.currentTime != b && (a.currentTime = b);
      },
      listen: function (b, c) {
        a.addEventListener(b, c, !1);
      },
      unlisten: function (b, c) {
        a.removeEventListener(b, c, !1);
      },
      getElement: function () {
        return a;
      },
      setElement: function (b) {
        a = b;
      },
      setSource: function (b) {
        a.src = b;
      },
      stallStream: f,
      isStalled: c,
    };
  }),
  (MediaPlayer.models.VideoModel.prototype = {
    constructor: MediaPlayer.models.VideoModel,
  }),
  (MediaPlayer.dependencies.VideoModelExtensions = function () {
    "use strict";
    return {
      getDroppedFrames: function (a) {
        var b = null !== a.webkitDroppedFrameCount,
          c = -1;
        return b && (c = a.webkitDroppedFrameCount), c;
      },
    };
  }),
  (MediaPlayer.dependencies.VideoModelExtensions.prototype = {
    constructor: MediaPlayer.dependencies.VideoModelExtensions,
  }),
  (MediaPlayer.dependencies.TextController = function () {
    var a,
      b,
      c = "LOADING",
      d = "READY",
      e = !1,
      f = -1,
      g = d,
      h = function (a) {
        this.debug.log("TextController setState to:" + a), (g = a);
      },
      i = function () {
        if (e && g === d) {
          var b = this;
          h.call(b, c),
            b.indexHandler.getInitRequest(0, a).then(function (a) {
              b.debug.log("Loading text track initialization: " + a.url),
                b.debug.log(a),
                b.fragmentLoader.load(a).then(k.bind(b, a), l.bind(b, a)),
                h.call(b, c);
            });
        }
      },
      j = function () {
        i.call(this);
      },
      k = function (a, c) {
        var d = this;
        d.debug.log(" Text track Bytes finished loading: " + a.url),
          d.fragmentController.process(c.data).then(function (a) {
            null !== a &&
              (d.debug.log("Push text track bytes: " + a.byteLength),
              d.sourceBufferExt.append(b, a, d.videoModel));
          });
      },
      l = function (a) {
        this.errHandler.downloadError("Error loading text track" + a.url);
      };
    return {
      videoModel: void 0,
      fragmentLoader: void 0,
      fragmentController: void 0,
      indexHandler: void 0,
      sourceBufferExt: void 0,
      debug: void 0,
      initialize: function (a, b, c, d) {
        var f = this;
        f.setVideoModel(d),
          f.setPeriodIndex(a),
          f.setData(b),
          f.setBuffer(c),
          (e = !0);
      },
      getPeriodIndex: function () {
        return f;
      },
      setPeriodIndex: function (a) {
        f = a;
      },
      getVideoModel: function () {
        return this.videoModel;
      },
      setVideoModel: function (a) {
        this.videoModel = a;
      },
      getData: function () {
        return a;
      },
      setData: function (b) {
        a = b;
      },
      getBuffer: function () {
        return b;
      },
      setBuffer: function (a) {
        b = a;
      },
      start: j,
    };
  }),
  (MediaPlayer.dependencies.TextController.prototype = {
    constructor: MediaPlayer.dependencies.TextController,
  }),
  (MediaPlayer.utils.TextTrackExtensions = function () {
    "use strict";
    return {
      addTextTrack: function (a, b, c, d, e) {
        var f = a.addTextTrack("captions", c, d);
        (f.default = e), (f.mode = "showing");
        for (var g in b) {
          var h = b[g];
          f.addCue(new TextTrackCue(h.start, h.end, h.data));
        }
        return Q.when(f);
      },
      deleteCues: function (a) {
        for (var b = a.textTracks[0], c = b.cues, d = c.length; d >= 0; d--)
          b.removeCue(c[d]);
        b.mode = "disabled";
      },
    };
  }),
  (MediaPlayer.dependencies.TextVTTSourceBuffer = function () {
    var a, b, c;
    return {
      system: void 0,
      eventBus: void 0,
      initialize: function (d, e) {
        (c = d), (a = e.getVideoModel().getElement()), (b = e.getData());
      },
      append: function (c) {
        var d = this;
        d.getParser()
          .parse(String.fromCharCode.apply(null, new Uint16Array(c)))
          .then(function (c) {
            var e = b.Representation_asArray[0].id,
              f = b.lang;
            d.getTextTrackExtensions()
              .addTextTrack(a, c, e, f, !0)
              .then(function () {
                d.eventBus.dispatchEvent({ type: "updateend" });
              });
          });
      },
      abort: function () {
        this.getTextTrackExtensions().deleteCues(a);
      },
      getParser: function () {
        var a;
        return "text/vtt" === c && (a = this.system.getObject("vttParser")), a;
      },
      getTextTrackExtensions: function () {
        return this.system.getObject("textTrackExtensions");
      },
      addEventListener: function (a, b, c) {
        this.eventBus.addEventListener(a, b, c);
      },
      removeEventListener: function (a, b, c) {
        this.eventBus.removeEventListener(a, b, c);
      },
    };
  }),
  (MediaPlayer.dependencies.TextVTTSourceBuffer.prototype = {
    constructor: MediaPlayer.dependencies.TextVTTSourceBuffer,
  }),
  (MediaPlayer.utils.VTTParser = function () {
    "use strict";
    var a = function (a) {
      var b = a.split(":"),
        c = b.length - 1;
      return (
        (a = 60 * parseInt(b[c - 1], 10) + parseFloat(b[c], 10)),
        2 === c && (a += 3600 * parseInt(b[0], 10)),
        a
      );
    };
    return {
      parse: function (b) {
        var c,
          d = /(?:\r\n|\r|\n)/gm,
          e = /-->/,
          f = /(^[\s]+|[\s]+$)/g,
          g = [];
        (b = b.split(d)), (c = b.length);
        for (var h = 0; c > h; h++) {
          var i = b[h];
          if (i.length > 0 && "WEBVTT" !== i && i.match(e)) {
            var j = i.split(e),
              k = b[h + 1];
            g.push({
              start: a(j[0].replace(f, "")),
              end: a(j[1].replace(f, "")),
              data: k,
            });
          }
        }
        return Q.when(g);
      },
    };
  }),
  (MediaPlayer.rules.BaseRulesCollection = function () {
    "use strict";
    var a = [];
    return {
      downloadRatioRule: void 0,
      insufficientBufferRule: void 0,
      getRules: function () {
        return Q.when(a);
      },
      setup: function () {
        var a = this;
        a.getRules().then(function (b) {
          b.push(a.downloadRatioRule), b.push(a.insufficientBufferRule);
        });
      },
    };
  }),
  (MediaPlayer.rules.BaseRulesCollection.prototype = {
    constructor: MediaPlayer.rules.BaseRulesCollection,
  }),
  (MediaPlayer.rules.DownloadRatioRule = function () {
    "use strict";
    var a = function (a, b, c) {
      var d = this,
        e = Q.defer();
      return (
        d.manifestExt.getRepresentationFor(a, c).then(function (a) {
          d.manifestExt.getBandwidth(a).then(function (a) {
            e.resolve(a / b);
          });
        }),
        e.promise
      );
    };
    return {
      debug: void 0,
      manifestExt: void 0,
      checkIndex: function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = this,
          p = c.HttpList,
          q = 0.75;
        return (
          o.debug.log("Checking download ratio rule..."),
          c
            ? null === p || void 0 === p || 0 === p.length
              ? (o.debug.log("No requests made for this stream yet, bailing."),
                Q.when(new MediaPlayer.rules.SwitchRequest()))
              : ((e = p[p.length - 1]),
                (g = (e.tfinish.getTime() - e.trequest.getTime()) / 1e3),
                (f = (e.tfinish.getTime() - e.tresponse.getTime()) / 1e3),
                0 >= g
                  ? (o.debug.log(
                      "Don't know how long the download of the last fragment took, bailing."
                    ),
                    Q.when(new MediaPlayer.rules.SwitchRequest()))
                  : null === e.mediaduration ||
                    void 0 === e.mediaduration ||
                    e.mediaduration <= 0
                  ? (o.debug.log(
                      "Don't know the duration of the last media fragment, bailing."
                    ),
                    Q.when(new MediaPlayer.rules.SwitchRequest()))
                  : ((k = Q.defer()),
                    (i = e.mediaduration / g),
                    (h = (e.mediaduration / f) * q),
                    isNaN(h) || isNaN(i)
                      ? (o.debug.log("Total time: " + g + "s"),
                        o.debug.log("Download time: " + f + "s"),
                        o.debug.log("The ratios are NaN, bailing."),
                        Q.when(new MediaPlayer.rules.SwitchRequest()))
                      : (o.debug.log("Total ratio: " + i),
                        o.debug.log("Download ratio: " + h),
                        o.debug.log("Download ratio: " + h),
                        isNaN(h)
                          ? (o.debug.log("Invalid ratio, bailing."),
                            k.resolve(new MediaPlayer.rules.SwitchRequest()))
                          : 1 > h
                          ? (o.debug.log("Download ratio is poor."),
                            b > 0
                              ? (o.debug.log(
                                  "We are not at the lowest bitrate, so switch down."
                                ),
                                o.manifestExt
                                  .getRepresentationFor(b - 1, d)
                                  .then(function (a) {
                                    o.manifestExt
                                      .getBandwidth(a)
                                      .then(function (a) {
                                        o.manifestExt
                                          .getRepresentationFor(b, d)
                                          .then(function (c) {
                                            o.manifestExt
                                              .getBandwidth(c)
                                              .then(function (c) {
                                                (j = a / c),
                                                  o.debug.log(
                                                    "Switch ratio: " + j
                                                  ),
                                                  j > h
                                                    ? (o.debug.log(
                                                        "Things must be going pretty bad, switch all the way down."
                                                      ),
                                                      k.resolve(
                                                        new MediaPlayer.rules.SwitchRequest(
                                                          0
                                                        )
                                                      ))
                                                    : (o.debug.log(
                                                        "Things could be better, so just switch down one index."
                                                      ),
                                                      k.resolve(
                                                        new MediaPlayer.rules.SwitchRequest(
                                                          b - 1
                                                        )
                                                      ));
                                              });
                                          });
                                      });
                                  }))
                              : (o.debug.log(
                                  "We are at the lowest bitrate and cannot switch down, use current."
                                ),
                                k.resolve(
                                  new MediaPlayer.rules.SwitchRequest(b)
                                )))
                          : (o.debug.log("Download ratio is good."),
                            o.manifestExt
                              .getRepresentationCount(d)
                              .then(function (c) {
                                (c -= 1),
                                  c > b
                                    ? (o.debug.log(
                                        "We are not at the highest bitrate, so switch up."
                                      ),
                                      o.manifestExt
                                        .getRepresentationFor(b + 1, d)
                                        .then(function (e) {
                                          o.manifestExt
                                            .getBandwidth(e)
                                            .then(function (e) {
                                              o.manifestExt
                                                .getRepresentationFor(b, d)
                                                .then(function (f) {
                                                  o.manifestExt
                                                    .getBandwidth(f)
                                                    .then(function (f) {
                                                      if (
                                                        ((j = e / f),
                                                        o.debug.log(
                                                          "Switch ratio: " + j
                                                        ),
                                                        h >= j)
                                                      )
                                                        if (h > 1e3)
                                                          o.debug.log(
                                                            "Tons of bandwidth available, go all the way up."
                                                          ),
                                                            k.resolve(
                                                              new MediaPlayer.rules.SwitchRequest(
                                                                c - 1
                                                              )
                                                            );
                                                        else if (h > 100)
                                                          o.debug.log(
                                                            "Just enough bandwidth available, switch up one."
                                                          ),
                                                            k.resolve(
                                                              new MediaPlayer.rules.SwitchRequest(
                                                                b + 1
                                                              )
                                                            );
                                                        else {
                                                          for (
                                                            o.debug.log(
                                                              "Not exactly sure where to go, so do some math."
                                                            ),
                                                              m = -1,
                                                              l = [];
                                                            (m += 1) < c;

                                                          )
                                                            l.push(
                                                              a.call(o, m, f, d)
                                                            );
                                                          Q.all(l).then(
                                                            function (a) {
                                                              for (
                                                                m = 0,
                                                                  n = a.length;
                                                                n > m &&
                                                                !(h < a[m]);
                                                                m += 1
                                                              );
                                                              o.debug.log(
                                                                "Calculated ideal new quality index is: " +
                                                                  m
                                                              ),
                                                                k.resolve(
                                                                  new MediaPlayer.rules.SwitchRequest(
                                                                    m
                                                                  )
                                                                );
                                                            }
                                                          );
                                                        }
                                                      else
                                                        o.debug.log(
                                                          "Not enough bandwidth to switch up."
                                                        ),
                                                          k.resolve(
                                                            new MediaPlayer.rules.SwitchRequest()
                                                          );
                                                    });
                                                });
                                            });
                                        }))
                                    : (o.debug.log(
                                        "We are at the highest bitrate and cannot switch up, use current."
                                      ),
                                      k.resolve(
                                        new MediaPlayer.rules.SwitchRequest(c)
                                      ));
                              })),
                        k.promise)))
            : (o.debug.log("No metrics, bailing."),
              Q.when(new MediaPlayer.rules.SwitchRequest()))
        );
      },
    };
  }),
  (MediaPlayer.rules.DownloadRatioRule.prototype = {
    constructor: MediaPlayer.rules.DownloadRatioRule,
  }),
  (MediaPlayer.rules.InsufficientBufferRule = function () {
    "use strict";
    var a = 0,
      b = 3;
    return {
      debug: void 0,
      checkIndex: function (c, d) {
        var e,
          f,
          g = this,
          h = !1,
          i = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
        return (
          g.debug.log("Checking insufficient buffer rule..."),
          null === d.PlayList ||
          void 0 === d.PlayList ||
          0 === d.PlayList.length
            ? (g.debug.log("Not enough information for rule."),
              Q.when(new MediaPlayer.rules.SwitchRequest()))
            : ((e = d.PlayList[d.PlayList.length - 1]),
              null === e || void 0 === e || 0 === e.trace.length
                ? (g.debug.log("Not enough information for rule."),
                  Q.when(new MediaPlayer.rules.SwitchRequest()))
                : ((f = e.trace[e.trace.length - 2]),
                  null === f ||
                  void 0 === f ||
                  null === f.stopreason ||
                  void 0 === f.stopreason
                    ? (g.debug.log("Not enough information for rule."),
                      Q.when(new MediaPlayer.rules.SwitchRequest()))
                    : (f.stopreason ===
                        MediaPlayer.vo.metrics.PlayList.Trace
                          .REBUFFERING_REASON &&
                        ((h = !0),
                        (a += 1),
                        g.debug.log(
                          "Number of times the buffer has run dry: " + a
                        )),
                      a > b &&
                        ((i = MediaPlayer.rules.SwitchRequest.prototype.STRONG),
                        g.debug.log("Apply STRONG to buffer rule.")),
                      h
                        ? (g.debug.log(
                            "The buffer ran dry recently, switch down."
                          ),
                          Q.when(new MediaPlayer.rules.SwitchRequest(c - 1, i)))
                        : a > b
                        ? (g.debug.log(
                            "Too many dry buffer hits, quit switching bitrates."
                          ),
                          Q.when(new MediaPlayer.rules.SwitchRequest(c, i)))
                        : Q.when(
                            new MediaPlayer.rules.SwitchRequest(
                              MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                              i
                            )
                          ))))
        );
      },
    };
  }),
  (MediaPlayer.rules.InsufficientBufferRule.prototype = {
    constructor: MediaPlayer.rules.InsufficientBufferRule,
  }),
  (MediaPlayer.rules.LimitSwitchesRule = function () {
    "use strict";
    var a = 10,
      b = 2e4,
      c = 5,
      d = 0;
    return {
      debug: void 0,
      checkIndex: function (e, f) {
        if (d > 0)
          return (
            (d -= 1),
            Q.when(
              new MediaPlayer.rules.SwitchRequest(
                e,
                MediaPlayer.rules.SwitchRequest.prototype.STRONG
              )
            )
          );
        var g,
          h,
          i,
          j = this,
          k = !1,
          l = new Date().getTime(),
          m = f.RepSwitchList.length;
        for (
          j.debug.log("Checking limit switches rule..."), i = m - 1;
          i >= 0;
          i -= 1
        ) {
          if (((g = f.RepSwitchList[i]), (h = l - g.t.getTime()), h >= b)) {
            j.debug.log("Reached time limit, bailing.");
            break;
          }
          if (i >= a) {
            j.debug.log(
              "Found too many switches within validation time, force the stream to not change."
            ),
              (k = !0);
            break;
          }
        }
        return k
          ? (j.debug.log("Wait some time before allowing another switch."),
            (d = c),
            Q.when(
              new MediaPlayer.rules.SwitchRequest(
                e,
                MediaPlayer.rules.SwitchRequest.prototype.STRONG
              )
            ))
          : Q.when(
              new MediaPlayer.rules.SwitchRequest(
                MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE,
                MediaPlayer.rules.SwitchRequest.prototype.STRONG
              )
            );
      },
    };
  }),
  (MediaPlayer.rules.LimitSwitchesRule.prototype = {
    constructor: MediaPlayer.rules.LimitSwitchesRule,
  }),
  (MediaPlayer.rules.SwitchRequest = function (a, b) {
    "use strict";
    (this.quality = a),
      (this.priority = b),
      void 0 === this.quality && (this.quality = 999),
      void 0 === this.priority && (this.priority = 0.5);
  }),
  (MediaPlayer.rules.SwitchRequest.prototype = {
    constructor: MediaPlayer.rules.SwitchRequest,
    NO_CHANGE: 999,
    DEFAULT: 0.5,
    STRONG: 1,
    WEAK: 0,
  }),
  (MediaPlayer.models.MetricsList = function () {
    "use strict";
    return {
      TcpList: [],
      HttpList: [],
      RepSwitchList: [],
      BufferLevel: [],
      PlayList: [],
      DroppedFrames: [],
    };
  }),
  (MediaPlayer.models.MetricsList.prototype = {
    constructor: MediaPlayer.models.MetricsList,
  }),
  (MediaPlayer.vo.SegmentRequest = function () {
    "use strict";
    (this.action = "download"),
      (this.startTime = 0 / 0),
      (this.streamType = null),
      (this.type = null),
      (this.duration = 0 / 0),
      (this.timescale = 0 / 0),
      (this.range = null),
      (this.url = null),
      (this.requestStartDate = null),
      (this.firstByteDate = null),
      (this.requestEndDate = null),
      (this.deferred = null);
  }),
  (MediaPlayer.vo.SegmentRequest.prototype = {
    constructor: MediaPlayer.vo.SegmentRequest,
    ACTION_DOWNLOAD: "download",
    ACTION_COMPLETE: "complete",
  }),
  (MediaPlayer.vo.metrics.BufferLevel = function () {
    "use strict";
    (this.t = null), (this.level = null);
  }),
  (MediaPlayer.vo.metrics.BufferLevel.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferLevel,
  }),
  (MediaPlayer.vo.metrics.DroppedFrames = function () {
    "use strict";
    (this.time = null), (this.droppedFrames = null);
  }),
  (MediaPlayer.vo.metrics.DroppedFrames.prototype = {
    constructor: MediaPlayer.vo.metrics.DroppedFrames,
  }),
  (MediaPlayer.vo.metrics.HTTPRequest = function () {
    "use strict";
    (this.tcpid = null),
      (this.type = null),
      (this.url = null),
      (this.actualurl = null),
      (this.range = null),
      (this.trequest = null),
      (this.tresponse = null),
      (this.tfinish = null),
      (this.responsecode = null),
      (this.interval = null),
      (this.mediaduration = null),
      (this.trace = []);
  }),
  (MediaPlayer.vo.metrics.HTTPRequest.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest,
  }),
  (MediaPlayer.vo.metrics.HTTPRequest.Trace = function () {
    "use strict";
    (this.s = null), (this.d = null), (this.b = []);
  }),
  (MediaPlayer.vo.metrics.HTTPRequest.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest.Trace,
  }),
  (MediaPlayer.vo.metrics.PlayList = function () {
    "use strict";
    (this.start = null),
      (this.mstart = null),
      (this.starttype = null),
      (this.trace = []);
  }),
  (MediaPlayer.vo.metrics.PlayList.Trace = function () {
    "use strict";
    (this.representationid = null),
      (this.subreplevel = null),
      (this.start = null),
      (this.mstart = null),
      (this.duration = null),
      (this.playbackspeed = null),
      (this.stopreason = null);
  }),
  (MediaPlayer.vo.metrics.PlayList.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList,
  }),
  (MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON = "initial_start"),
  (MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON = "seek"),
  (MediaPlayer.vo.metrics.PlayList.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList.Trace(),
  }),
  (MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON =
    "user_request"),
  (MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON =
    "representation_switch"),
  (MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON =
    "end_of_content"),
  (MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON = "rebuffering"),
  (MediaPlayer.vo.metrics.RepresentationSwitch = function () {
    "use strict";
    (this.t = null), (this.mt = null), (this.to = null), (this.lto = null);
  }),
  (MediaPlayer.vo.metrics.RepresentationSwitch.prototype = {
    constructor: MediaPlayer.vo.metrics.RepresentationSwitch,
  }),
  (MediaPlayer.vo.metrics.TCPConnection = function () {
    "use strict";
    (this.tcpid = null),
      (this.dest = null),
      (this.topen = null),
      (this.tclose = null),
      (this.tconnect = null);
  }),
  (MediaPlayer.vo.metrics.TCPConnection.prototype = {
    constructor: MediaPlayer.vo.metrics.TCPConnection,
  });
