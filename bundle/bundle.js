// js/createjs.min.js
/*!
* @license createjs
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs = this.createjs || {}, createjs.extend = function (a, b) { "use strict"; function c() { this.constructor = a } return c.prototype = b.prototype, a.prototype = new c }, this.createjs = this.createjs || {}, createjs.promote = function (a, b) { "use strict"; var c = a.prototype, d = Object.getPrototypeOf && Object.getPrototypeOf(c) || c.__proto__; if (d) { c[(b += "_") + "constructor"] = d.constructor; for (var e in d) c.hasOwnProperty(e) && "function" == typeof d[e] && (c[b + e] = d[e]) } return a }, this.createjs = this.createjs || {}, createjs.indexOf = function (a, b) { "use strict"; for (var c = 0, d = a.length; d > c; c++)if (b === a[c]) return c; return -1 }, this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "UID cannot be instantiated" } a._nextID = 0, a.get = function () { return a._nextID++ }, createjs.UID = a }(), this.createjs = this.createjs || {}, createjs.deprecate = function (a, b) { "use strict"; return function () { var c = "Deprecated property or method '" + b + "'. See docs for info."; return console && (console.warn ? console.warn(c) : console.log(c)), a && a.apply(this, arguments) } }, this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.type = a, this.target = null, this.currentTarget = null, this.eventPhase = 0, this.bubbles = !!b, this.cancelable = !!c, this.timeStamp = (new Date).getTime(), this.defaultPrevented = !1, this.propagationStopped = !1, this.immediatePropagationStopped = !1, this.removed = !1 } var b = a.prototype; b.preventDefault = function () { this.defaultPrevented = this.cancelable && !0 }, b.stopPropagation = function () { this.propagationStopped = !0 }, b.stopImmediatePropagation = function () { this.immediatePropagationStopped = this.propagationStopped = !0 }, b.remove = function () { this.removed = !0 }, b.clone = function () { return new a(this.type, this.bubbles, this.cancelable) }, b.set = function (a) { for (var b in a) this[b] = a[b]; return this }, b.toString = function () { return "[Event (type=" + this.type + ")]" }, createjs.Event = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this._listeners = null, this._captureListeners = null } var b = a.prototype; a.initialize = function (a) { a.addEventListener = b.addEventListener, a.on = b.on, a.removeEventListener = a.off = b.removeEventListener, a.removeAllEventListeners = b.removeAllEventListeners, a.hasEventListener = b.hasEventListener, a.dispatchEvent = b.dispatchEvent, a._dispatchEvent = b._dispatchEvent, a.willTrigger = b.willTrigger }, b.addEventListener = function (a, b, c) { var d; d = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {}; var e = d[a]; return e && this.removeEventListener(a, b, c), e = d[a], e ? e.push(b) : d[a] = [b], b }, b.on = function (a, b, c, d, e, f) { return b.handleEvent && (c = c || b, b = b.handleEvent), c = c || this, this.addEventListener(a, function (a) { b.call(c, a, e), d && a.remove() }, f) }, b.removeEventListener = function (a, b, c) { var d = c ? this._captureListeners : this._listeners; if (d) { var e = d[a]; if (e) for (var f = 0, g = e.length; g > f; f++)if (e[f] == b) { 1 == g ? delete d[a] : e.splice(f, 1); break } } }, b.off = b.removeEventListener, b.removeAllEventListeners = function (a) { a ? (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null }, b.dispatchEvent = function (a, b, c) { if ("string" == typeof a) { var d = this._listeners; if (!(b || d && d[a])) return !0; a = new createjs.Event(a, b, c) } else a.target && a.clone && (a = a.clone()); try { a.target = this } catch (e) { } if (a.bubbles && this.parent) { for (var f = this, g = [f]; f.parent;)g.push(f = f.parent); var h, i = g.length; for (h = i - 1; h >= 0 && !a.propagationStopped; h--)g[h]._dispatchEvent(a, 1 + (0 == h)); for (h = 1; i > h && !a.propagationStopped; h++)g[h]._dispatchEvent(a, 3) } else this._dispatchEvent(a, 2); return !a.defaultPrevented }, b.hasEventListener = function (a) { var b = this._listeners, c = this._captureListeners; return !!(b && b[a] || c && c[a]) }, b.willTrigger = function (a) { for (var b = this; b;) { if (b.hasEventListener(a)) return !0; b = b.parent } return !1 }, b.toString = function () { return "[EventDispatcher]" }, b._dispatchEvent = function (a, b) { var c, d, e = 2 >= b ? this._captureListeners : this._listeners; if (a && e && (d = e[a.type]) && (c = d.length)) { try { a.currentTarget = this } catch (f) { } try { a.eventPhase = 0 | b } catch (f) { } a.removed = !1, d = d.slice(); for (var g = 0; c > g && !a.immediatePropagationStopped; g++) { var h = d[g]; h.handleEvent ? h.handleEvent(a) : h(a), a.removed && (this.off(a.type, h, 1 == b), a.removed = !1) } } 2 === b && this._dispatchEvent(a, 2.1) }, createjs.EventDispatcher = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "Ticker cannot be instantiated." } a.RAF_SYNCHED = "synched", a.RAF = "raf", a.TIMEOUT = "timeout", a.timingMode = null, a.maxDelta = 0, a.paused = !1, a.removeEventListener = null, a.removeAllEventListeners = null, a.dispatchEvent = null, a.hasEventListener = null, a._listeners = null, createjs.EventDispatcher.initialize(a), a._addEventListener = a.addEventListener, a.addEventListener = function () { return !a._inited && a.init(), a._addEventListener.apply(a, arguments) }, a._inited = !1, a._startTime = 0, a._pausedTime = 0, a._ticks = 0, a._pausedTicks = 0, a._interval = 50, a._lastTime = 0, a._times = null, a._tickTimes = null, a._timerId = null, a._raf = !0, a._setInterval = function (b) { a._interval = b, a._inited && a._setupTick() }, a.setInterval = createjs.deprecate(a._setInterval, "Ticker.setInterval"), a._getInterval = function () { return a._interval }, a.getInterval = createjs.deprecate(a._getInterval, "Ticker.getInterval"), a._setFPS = function (b) { a._setInterval(1e3 / b) }, a.setFPS = createjs.deprecate(a._setFPS, "Ticker.setFPS"), a._getFPS = function () { return 1e3 / a._interval }, a.getFPS = createjs.deprecate(a._getFPS, "Ticker.getFPS"); try { Object.defineProperties(a, { interval: { get: a._getInterval, set: a._setInterval }, framerate: { get: a._getFPS, set: a._setFPS } }) } catch (b) { console.log(b) } a.init = function () { a._inited || (a._inited = !0, a._times = [], a._tickTimes = [], a._startTime = a._getTime(), a._times.push(a._lastTime = 0), a.interval = a._interval) }, a.reset = function () { if (a._raf) { var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame; b && b(a._timerId) } else clearTimeout(a._timerId); a.removeAllEventListeners("tick"), a._timerId = a._times = a._tickTimes = null, a._startTime = a._lastTime = a._ticks = a._pausedTime = 0, a._inited = !1 }, a.getMeasuredTickTime = function (b) { var c = 0, d = a._tickTimes; if (!d || d.length < 1) return -1; b = Math.min(d.length, b || 0 | a._getFPS()); for (var e = 0; b > e; e++)c += d[e]; return c / b }, a.getMeasuredFPS = function (b) { var c = a._times; return !c || c.length < 2 ? -1 : (b = Math.min(c.length - 1, b || 0 | a._getFPS()), 1e3 / ((c[0] - c[b]) / b)) }, a.getTime = function (b) { return a._startTime ? a._getTime() - (b ? a._pausedTime : 0) : -1 }, a.getEventTime = function (b) { return a._startTime ? (a._lastTime || a._startTime) - (b ? a._pausedTime : 0) : -1 }, a.getTicks = function (b) { return a._ticks - (b ? a._pausedTicks : 0) }, a._handleSynch = function () { a._timerId = null, a._setupTick(), a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick() }, a._handleRAF = function () { a._timerId = null, a._setupTick(), a._tick() }, a._handleTimeout = function () { a._timerId = null, a._setupTick(), a._tick() }, a._setupTick = function () { if (null == a._timerId) { var b = a.timingMode; if (b == a.RAF_SYNCHED || b == a.RAF) { var c = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame; if (c) return a._timerId = c(b == a.RAF ? a._handleRAF : a._handleSynch), void (a._raf = !0) } a._raf = !1, a._timerId = setTimeout(a._handleTimeout, a._interval) } }, a._tick = function () { var b = a.paused, c = a._getTime(), d = c - a._lastTime; if (a._lastTime = c, a._ticks++, b && (a._pausedTicks++, a._pausedTime += d), a.hasEventListener("tick")) { var e = new createjs.Event("tick"), f = a.maxDelta; e.delta = f && d > f ? f : d, e.paused = b, e.time = c, e.runTime = c - a._pausedTime, a.dispatchEvent(e) } for (a._tickTimes.unshift(a._getTime() - c); a._tickTimes.length > 100;)a._tickTimes.pop(); for (a._times.unshift(c); a._times.length > 100;)a._times.pop() }; var c = window, d = c.performance.now || c.performance.mozNow || c.performance.msNow || c.performance.oNow || c.performance.webkitNow; a._getTime = function () { return (d && d.call(c.performance) || (new Date).getTime()) - a._startTime }, createjs.Ticker = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.readyState = a.readyState, this._video = a, this._canvas = null, this._lastTime = -1, this.readyState < 2 && a.addEventListener("canplaythrough", this._videoReady.bind(this)) } var b = a.prototype; b.getImage = function () { if (!(this.readyState < 2)) { var a = this._canvas, b = this._video; if (a || (a = this._canvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), a.width = b.videoWidth, a.height = b.videoHeight), b.readyState >= 2 && b.currentTime !== this._lastTime) { var c = a.getContext("2d"); c.clearRect(0, 0, a.width, a.height), c.drawImage(b, 0, 0, a.width, a.height), this._lastTime = b.currentTime } return a } }, b._videoReady = function () { this.readyState = 2 }, createjs.VideoBuffer = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d, e, f, g, h, i, j, k) { this.Event_constructor(a, b, c), this.stageX = d, this.stageY = e, this.rawX = null == i ? d : i, this.rawY = null == j ? e : j, this.nativeEvent = f, this.pointerID = g, this.primary = !!h, this.relatedTarget = k } var b = createjs.extend(a, createjs.Event); b._get_localX = function () { return this.currentTarget.globalToLocal(this.rawX, this.rawY).x }, b._get_localY = function () { return this.currentTarget.globalToLocal(this.rawX, this.rawY).y }, b._get_isTouch = function () { return -1 !== this.pointerID }; try { Object.defineProperties(b, { localX: { get: b._get_localX }, localY: { get: b._get_localY }, isTouch: { get: b._get_isTouch } }) } catch (c) { } b.clone = function () { return new a(this.type, this.bubbles, this.cancelable, this.stageX, this.stageY, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY) }, b.toString = function () { return "[MouseEvent (type=" + this.type + " stageX=" + this.stageX + " stageY=" + this.stageY + ")]" }, createjs.MouseEvent = createjs.promote(a, "Event") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d, e, f) { this.setValues(a, b, c, d, e, f) } var b = a.prototype; a.DEG_TO_RAD = Math.PI / 180, a.identity = null, b.setValues = function (a, b, c, d, e, f) { return this.a = null == a ? 1 : a, this.b = b || 0, this.c = c || 0, this.d = null == d ? 1 : d, this.tx = e || 0, this.ty = f || 0, this }, b.append = function (a, b, c, d, e, f) { var g = this.a, h = this.b, i = this.c, j = this.d; return (1 != a || 0 != b || 0 != c || 1 != d) && (this.a = g * a + i * b, this.b = h * a + j * b, this.c = g * c + i * d, this.d = h * c + j * d), this.tx = g * e + i * f + this.tx, this.ty = h * e + j * f + this.ty, this }, b.prepend = function (a, b, c, d, e, f) { var g = this.a, h = this.c, i = this.tx; return this.a = a * g + c * this.b, this.b = b * g + d * this.b, this.c = a * h + c * this.d, this.d = b * h + d * this.d, this.tx = a * i + c * this.ty + e, this.ty = b * i + d * this.ty + f, this }, b.appendMatrix = function (a) { return this.append(a.a, a.b, a.c, a.d, a.tx, a.ty) }, b.prependMatrix = function (a) { return this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty) }, b.appendTransform = function (b, c, d, e, f, g, h, i, j) { if (f % 360) var k = f * a.DEG_TO_RAD, l = Math.cos(k), m = Math.sin(k); else l = 1, m = 0; return g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.append(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c), this.append(l * d, m * d, -m * e, l * e, 0, 0)) : this.append(l * d, m * d, -m * e, l * e, b, c), (i || j) && (this.tx -= i * this.a + j * this.c, this.ty -= i * this.b + j * this.d), this }, b.prependTransform = function (b, c, d, e, f, g, h, i, j) { if (f % 360) var k = f * a.DEG_TO_RAD, l = Math.cos(k), m = Math.sin(k); else l = 1, m = 0; return (i || j) && (this.tx -= i, this.ty -= j), g || h ? (g *= a.DEG_TO_RAD, h *= a.DEG_TO_RAD, this.prepend(l * d, m * d, -m * e, l * e, 0, 0), this.prepend(Math.cos(h), Math.sin(h), -Math.sin(g), Math.cos(g), b, c)) : this.prepend(l * d, m * d, -m * e, l * e, b, c), this }, b.rotate = function (b) { b *= a.DEG_TO_RAD; var c = Math.cos(b), d = Math.sin(b), e = this.a, f = this.b; return this.a = e * c + this.c * d, this.b = f * c + this.d * d, this.c = -e * d + this.c * c, this.d = -f * d + this.d * c, this }, b.skew = function (b, c) { return b *= a.DEG_TO_RAD, c *= a.DEG_TO_RAD, this.append(Math.cos(c), Math.sin(c), -Math.sin(b), Math.cos(b), 0, 0), this }, b.scale = function (a, b) { return this.a *= a, this.b *= a, this.c *= b, this.d *= b, this }, b.translate = function (a, b) { return this.tx += this.a * a + this.c * b, this.ty += this.b * a + this.d * b, this }, b.identity = function () { return this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0, this }, b.invert = function () { var a = this.a, b = this.b, c = this.c, d = this.d, e = this.tx, f = a * d - b * c; return this.a = d / f, this.b = -b / f, this.c = -c / f, this.d = a / f, this.tx = (c * this.ty - d * e) / f, this.ty = -(a * this.ty - b * e) / f, this }, b.isIdentity = function () { return 0 === this.tx && 0 === this.ty && 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d }, b.equals = function (a) { return this.tx === a.tx && this.ty === a.ty && this.a === a.a && this.b === a.b && this.c === a.c && this.d === a.d }, b.transformPoint = function (a, b, c) { return c = c || {}, c.x = a * this.a + b * this.c + this.tx, c.y = a * this.b + b * this.d + this.ty, c }, b.decompose = function (b) { null == b && (b = {}), b.x = this.tx, b.y = this.ty, b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b), b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d); var c = Math.atan2(-this.c, this.d), d = Math.atan2(this.b, this.a), e = Math.abs(1 - c / d); return 1e-5 > e ? (b.rotation = d / a.DEG_TO_RAD, this.a < 0 && this.d >= 0 && (b.rotation += b.rotation <= 0 ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = c / a.DEG_TO_RAD, b.skewY = d / a.DEG_TO_RAD), b }, b.copy = function (a) { return this.setValues(a.a, a.b, a.c, a.d, a.tx, a.ty) }, b.clone = function () { return new a(this.a, this.b, this.c, this.d, this.tx, this.ty) }, b.toString = function () { return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]" }, a.identity = new a, createjs.Matrix2D = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d, e) { this.setValues(a, b, c, d, e) } var b = a.prototype; b.setValues = function (a, b, c, d, e) { return this.visible = null == a ? !0 : !!a, this.alpha = null == b ? 1 : b, this.shadow = c, this.compositeOperation = d, this.matrix = e || this.matrix && this.matrix.identity() || new createjs.Matrix2D, this }, b.append = function (a, b, c, d, e) { return this.alpha *= b, this.shadow = c || this.shadow, this.compositeOperation = d || this.compositeOperation, this.visible = this.visible && a, e && this.matrix.appendMatrix(e), this }, b.prepend = function (a, b, c, d, e) { return this.alpha *= b, this.shadow = this.shadow || c, this.compositeOperation = this.compositeOperation || d, this.visible = this.visible && a, e && this.matrix.prependMatrix(e), this }, b.identity = function () { return this.visible = !0, this.alpha = 1, this.shadow = this.compositeOperation = null, this.matrix.identity(), this }, b.clone = function () { return new a(this.alpha, this.shadow, this.compositeOperation, this.visible, this.matrix.clone()) }, createjs.DisplayProps = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.setValues(a, b) } var b = a.prototype; b.setValues = function (a, b) { return this.x = a || 0, this.y = b || 0, this }, b.copy = function (a) { return this.x = a.x, this.y = a.y, this }, b.clone = function () { return new a(this.x, this.y) }, b.toString = function () { return "[Point (x=" + this.x + " y=" + this.y + ")]" }, createjs.Point = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d) { this.setValues(a, b, c, d) } var b = a.prototype; b.setValues = function (a, b, c, d) { return this.x = a || 0, this.y = b || 0, this.width = c || 0, this.height = d || 0, this }, b.extend = function (a, b, c, d) { return c = c || 0, d = d || 0, a + c > this.x + this.width && (this.width = a + c - this.x), b + d > this.y + this.height && (this.height = b + d - this.y), a < this.x && (this.width += this.x - a, this.x = a), b < this.y && (this.height += this.y - b, this.y = b), this }, b.pad = function (a, b, c, d) { return this.x -= b, this.y -= a, this.width += b + d, this.height += a + c, this }, b.copy = function (a) { return this.setValues(a.x, a.y, a.width, a.height) }, b.contains = function (a, b, c, d) { return c = c || 0, d = d || 0, a >= this.x && a + c <= this.x + this.width && b >= this.y && b + d <= this.y + this.height }, b.union = function (a) { return this.clone().extend(a.x, a.y, a.width, a.height) }, b.intersection = function (b) { var c = b.x, d = b.y, e = c + b.width, f = d + b.height; return this.x > c && (c = this.x), this.y > d && (d = this.y), this.x + this.width < e && (e = this.x + this.width), this.y + this.height < f && (f = this.y + this.height), c >= e || d >= f ? null : new a(c, d, e - c, f - d) }, b.intersects = function (a) { return a.x <= this.x + this.width && this.x <= a.x + a.width && a.y <= this.y + this.height && this.y <= a.y + a.height }, b.isEmpty = function () { return this.width <= 0 || this.height <= 0 }, b.clone = function () { return new a(this.x, this.y, this.width, this.height) }, b.toString = function () { return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]" }, createjs.Rectangle = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d, e, f, g) { a.addEventListener && (this.target = a, this.overLabel = null == c ? "over" : c, this.outLabel = null == b ? "out" : b, this.downLabel = null == d ? "down" : d, this.play = e, this._isPressed = !1, this._isOver = !1, this._enabled = !1, a.mouseChildren = !1, this.enabled = !0, this.handleEvent({}), f && (g && (f.actionsEnabled = !1, f.gotoAndStop && f.gotoAndStop(g)), a.hitArea = f)) } var b = a.prototype; b._setEnabled = function (a) { if (a != this._enabled) { var b = this.target; this._enabled = a, a ? (b.cursor = "pointer", b.addEventListener("rollover", this), b.addEventListener("rollout", this), b.addEventListener("mousedown", this), b.addEventListener("pressup", this), b._reset && (b.__reset = b._reset, b._reset = this._reset)) : (b.cursor = null, b.removeEventListener("rollover", this), b.removeEventListener("rollout", this), b.removeEventListener("mousedown", this), b.removeEventListener("pressup", this), b.__reset && (b._reset = b.__reset, delete b.__reset)) } }, b.setEnabled = createjs.deprecate(b._setEnabled, "ButtonHelper.setEnabled"), b._getEnabled = function () { return this._enabled }, b.getEnabled = createjs.deprecate(b._getEnabled, "ButtonHelper.getEnabled"); try { Object.defineProperties(b, { enabled: { get: b._getEnabled, set: b._setEnabled } }) } catch (c) { } b.toString = function () { return "[ButtonHelper]" }, b.handleEvent = function (a) { var b, c = this.target, d = a.type; "mousedown" == d ? (this._isPressed = !0, b = this.downLabel) : "pressup" == d ? (this._isPressed = !1, b = this._isOver ? this.overLabel : this.outLabel) : "rollover" == d ? (this._isOver = !0, b = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, b = this._isPressed ? this.overLabel : this.outLabel), this.play ? c.gotoAndPlay && c.gotoAndPlay(b) : c.gotoAndStop && c.gotoAndStop(b) }, b._reset = function () { var a = this.paused; this.__reset(), this.paused = a }, createjs.ButtonHelper = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d) { this.color = a || "black", this.offsetX = b || 0, this.offsetY = c || 0, this.blur = d || 0 } var b = a.prototype; a.identity = new a("transparent", 0, 0, 0), b.toString = function () { return "[Shadow]" }, b.clone = function () { return new a(this.color, this.offsetX, this.offsetY, this.blur) }, createjs.Shadow = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.EventDispatcher_constructor(), this.complete = !0, this.framerate = 0, this._animations = null, this._frames = null, this._images = null, this._data = null, this._loadCount = 0, this._frameHeight = 0, this._frameWidth = 0, this._numFrames = 0, this._regX = 0, this._regY = 0, this._spacing = 0, this._margin = 0, this._parseData(a) } var b = createjs.extend(a, createjs.EventDispatcher); b._getAnimations = function () { return this._animations.slice() }, b.getAnimations = createjs.deprecate(b._getAnimations, "SpriteSheet.getAnimations"); try { Object.defineProperties(b, { animations: { get: b._getAnimations } }) } catch (c) { } b.getNumFrames = function (a) { if (null == a) return this._frames ? this._frames.length : this._numFrames || 0; var b = this._data[a]; return null == b ? 0 : b.frames.length }, b.getAnimation = function (a) { return this._data[a] }, b.getFrame = function (a) { var b; return this._frames && (b = this._frames[a]) ? b : null }, b.getFrameBounds = function (a, b) { var c = this.getFrame(a); return c ? (b || new createjs.Rectangle).setValues(-c.regX, -c.regY, c.rect.width, c.rect.height) : null }, b.toString = function () { return "[SpriteSheet]" }, b.clone = function () { throw "SpriteSheet cannot be cloned." }, b._parseData = function (a) { var b, c, d, e; if (null != a) { if (this.framerate = a.framerate || 0, a.images && (c = a.images.length) > 0) for (e = this._images = [], b = 0; c > b; b++) { var f = a.images[b]; if ("string" == typeof f) { var g = f; f = document.createElement("img"), f.src = g } e.push(f), f.getContext || f.naturalWidth || (this._loadCount++, this.complete = !1, function (a, b) { f.onload = function () { a._handleImageLoad(b) } }(this, g), function (a, b) { f.onerror = function () { a._handleImageError(b) } }(this, g)) } if (null == a.frames); else if (Array.isArray(a.frames)) for (this._frames = [], e = a.frames, b = 0, c = e.length; c > b; b++) { var h = e[b]; this._frames.push({ image: this._images[h[4] ? h[4] : 0], rect: new createjs.Rectangle(h[0], h[1], h[2], h[3]), regX: h[5] || 0, regY: h[6] || 0 }) } else d = a.frames, this._frameWidth = d.width, this._frameHeight = d.height, this._regX = d.regX || 0, this._regY = d.regY || 0, this._spacing = d.spacing || 0, this._margin = d.margin || 0, this._numFrames = d.count, 0 == this._loadCount && this._calculateFrames(); if (this._animations = [], null != (d = a.animations)) { this._data = {}; var i; for (i in d) { var j = { name: i }, k = d[i]; if ("number" == typeof k) e = j.frames = [k]; else if (Array.isArray(k)) if (1 == k.length) j.frames = [k[0]]; else for (j.speed = k[3], j.next = k[2], e = j.frames = [], b = k[0]; b <= k[1]; b++)e.push(b); else { j.speed = k.speed, j.next = k.next; var l = k.frames; e = j.frames = "number" == typeof l ? [l] : l.slice(0) } (j.next === !0 || void 0 === j.next) && (j.next = i), (j.next === !1 || e.length < 2 && j.next == i) && (j.next = null), j.speed || (j.speed = 1), this._animations.push(i), this._data[i] = j } } } }, b._handleImageLoad = function (a) { 0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete")) }, b._handleImageError = function (a) { var b = new createjs.Event("error"); b.src = a, this.dispatchEvent(b), 0 == --this._loadCount && this.dispatchEvent("complete") }, b._calculateFrames = function () { if (!this._frames && 0 != this._frameWidth) { this._frames = []; var a = this._numFrames || 1e5, b = 0, c = this._frameWidth, d = this._frameHeight, e = this._spacing, f = this._margin; a: for (var g = 0, h = this._images; g < h.length; g++)for (var i = h[g], j = i.width || i.naturalWidth, k = i.height || i.naturalHeight, l = f; k - f - d >= l;) { for (var m = f; j - f - c >= m;) { if (b >= a) break a; b++, this._frames.push({ image: i, rect: new createjs.Rectangle(m, l, c, d), regX: this._regX, regY: this._regY }), m += c + e } l += d + e } this._numFrames = b } }, createjs.SpriteSheet = createjs.promote(a, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a() { this.command = null, this._stroke = null, this._strokeStyle = null, this._oldStrokeStyle = null, this._strokeDash = null, this._oldStrokeDash = null, this._strokeIgnoreScale = !1, this._fill = null, this._instructions = [], this._commitIndex = 0, this._activeInstructions = [], this._dirty = !1, this._storeIndex = 0, this.clear() } var b = a.prototype, c = a; a.getRGB = function (a, b, c, d) { return null != a && null == c && (d = b, c = 255 & a, b = a >> 8 & 255, a = a >> 16 & 255), null == d ? "rgb(" + a + "," + b + "," + c + ")" : "rgba(" + a + "," + b + "," + c + "," + d + ")" }, a.getHSL = function (a, b, c, d) { return null == d ? "hsl(" + a % 360 + "," + b + "%," + c + "%)" : "hsla(" + a % 360 + "," + b + "%," + c + "%," + d + ")" }, a.BASE_64 = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25, a: 26, b: 27, c: 28, d: 29, e: 30, f: 31, g: 32, h: 33, i: 34, j: 35, k: 36, l: 37, m: 38, n: 39, o: 40, p: 41, q: 42, r: 43, s: 44, t: 45, u: 46, v: 47, w: 48, x: 49, y: 50, z: 51, 0: 52, 1: 53, 2: 54, 3: 55, 4: 56, 5: 57, 6: 58, 7: 59, 8: 60, 9: 61, "+": 62, "/": 63 }, a.STROKE_CAPS_MAP = ["butt", "round", "square"], a.STROKE_JOINTS_MAP = ["miter", "round", "bevel"]; var d = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); d.getContext && (a._ctx = d.getContext("2d"), d.width = d.height = 1), b._getInstructions = function () { return this._updateInstructions(), this._instructions }, b.getInstructions = createjs.deprecate(b._getInstructions, "Graphics.getInstructions"); try { Object.defineProperties(b, { instructions: { get: b._getInstructions } }) } catch (e) { } b.isEmpty = function () { return !(this._instructions.length || this._activeInstructions.length) }, b.draw = function (a, b) { this._updateInstructions(); for (var c = this._instructions, d = this._storeIndex, e = c.length; e > d; d++)c[d].exec(a, b) }, b.drawAsPath = function (a) { this._updateInstructions(); for (var b, c = this._instructions, d = this._storeIndex, e = c.length; e > d; d++)(b = c[d]).path !== !1 && b.exec(a) }, b.moveTo = function (a, b) { return this.append(new c.MoveTo(a, b), !0) }, b.lineTo = function (a, b) { return this.append(new c.LineTo(a, b)) }, b.arcTo = function (a, b, d, e, f) { return this.append(new c.ArcTo(a, b, d, e, f)) }, b.arc = function (a, b, d, e, f, g) { return this.append(new c.Arc(a, b, d, e, f, g)) }, b.quadraticCurveTo = function (a, b, d, e) { return this.append(new c.QuadraticCurveTo(a, b, d, e)) }, b.bezierCurveTo = function (a, b, d, e, f, g) { return this.append(new c.BezierCurveTo(a, b, d, e, f, g)) }, b.rect = function (a, b, d, e) { return this.append(new c.Rect(a, b, d, e)) }, b.closePath = function () { return this._activeInstructions.length ? this.append(new c.ClosePath) : this }, b.clear = function () { return this._instructions.length = this._activeInstructions.length = this._commitIndex = 0, this._strokeStyle = this._oldStrokeStyle = this._stroke = this._fill = this._strokeDash = this._oldStrokeDash = null, this._dirty = this._strokeIgnoreScale = !1, this }, b.beginFill = function (a) { return this._setFill(a ? new c.Fill(a) : null) }, b.beginLinearGradientFill = function (a, b, d, e, f, g) { return this._setFill((new c.Fill).linearGradient(a, b, d, e, f, g)) }, b.beginRadialGradientFill = function (a, b, d, e, f, g, h, i) { return this._setFill((new c.Fill).radialGradient(a, b, d, e, f, g, h, i)) }, b.beginBitmapFill = function (a, b, d) { return this._setFill(new c.Fill(null, d).bitmap(a, b)) }, b.endFill = function () { return this.beginFill() }, b.setStrokeStyle = function (a, b, d, e, f) { return this._updateInstructions(!0), this._strokeStyle = this.command = new c.StrokeStyle(a, b, d, e, f), this._stroke && (this._stroke.ignoreScale = f), this._strokeIgnoreScale = f, this }, b.setStrokeDash = function (a, b) { return this._updateInstructions(!0), this._strokeDash = this.command = new c.StrokeDash(a, b), this }, b.beginStroke = function (a) { return this._setStroke(a ? new c.Stroke(a) : null) }, b.beginLinearGradientStroke = function (a, b, d, e, f, g) { return this._setStroke((new c.Stroke).linearGradient(a, b, d, e, f, g)) }, b.beginRadialGradientStroke = function (a, b, d, e, f, g, h, i) { return this._setStroke((new c.Stroke).radialGradient(a, b, d, e, f, g, h, i)) }, b.beginBitmapStroke = function (a, b) { return this._setStroke((new c.Stroke).bitmap(a, b)) }, b.endStroke = function () { return this.beginStroke() }, b.curveTo = b.quadraticCurveTo, b.drawRect = b.rect, b.drawRoundRect = function (a, b, c, d, e) { return this.drawRoundRectComplex(a, b, c, d, e, e, e, e) }, b.drawRoundRectComplex = function (a, b, d, e, f, g, h, i) { return this.append(new c.RoundRect(a, b, d, e, f, g, h, i)) }, b.drawCircle = function (a, b, d) { return this.append(new c.Circle(a, b, d)) }, b.drawEllipse = function (a, b, d, e) { return this.append(new c.Ellipse(a, b, d, e)) }, b.drawPolyStar = function (a, b, d, e, f, g) { return this.append(new c.PolyStar(a, b, d, e, f, g)) }, b.append = function (a, b) { return this._activeInstructions.push(a), this.command = a, b || (this._dirty = !0), this }, b.decodePath = function (b) { for (var c = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], d = [2, 2, 4, 6, 0], e = 0, f = b.length, g = [], h = 0, i = 0, j = a.BASE_64; f > e;) { var k = b.charAt(e), l = j[k], m = l >> 3, n = c[m]; if (!n || 3 & l) throw "bad path data (@" + e + "): " + k; var o = d[m]; m || (h = i = 0), g.length = 0, e++; for (var p = (l >> 2 & 1) + 2, q = 0; o > q; q++) { var r = j[b.charAt(e)], s = r >> 5 ? -1 : 1; r = (31 & r) << 6 | j[b.charAt(e + 1)], 3 == p && (r = r << 6 | j[b.charAt(e + 2)]), r = s * r / 10, q % 2 ? h = r += h : i = r += i, g[q] = r, e += p } n.apply(this, g) } return this }, b.store = function () { return this._updateInstructions(!0), this._storeIndex = this._instructions.length, this }, b.unstore = function () { return this._storeIndex = 0, this }, b.clone = function () { var b = new a; return b.command = this.command, b._stroke = this._stroke, b._strokeStyle = this._strokeStyle, b._strokeDash = this._strokeDash, b._strokeIgnoreScale = this._strokeIgnoreScale, b._fill = this._fill, b._instructions = this._instructions.slice(), b._commitIndex = this._commitIndex, b._activeInstructions = this._activeInstructions.slice(), b._dirty = this._dirty, b._storeIndex = this._storeIndex, b }, b.toString = function () { return "[Graphics]" }, b.mt = b.moveTo, b.lt = b.lineTo, b.at = b.arcTo, b.bt = b.bezierCurveTo, b.qt = b.quadraticCurveTo, b.a = b.arc, b.r = b.rect, b.cp = b.closePath, b.c = b.clear, b.f = b.beginFill, b.lf = b.beginLinearGradientFill, b.rf = b.beginRadialGradientFill, b.bf = b.beginBitmapFill, b.ef = b.endFill, b.ss = b.setStrokeStyle, b.sd = b.setStrokeDash, b.s = b.beginStroke, b.ls = b.beginLinearGradientStroke, b.rs = b.beginRadialGradientStroke, b.bs = b.beginBitmapStroke, b.es = b.endStroke, b.dr = b.drawRect, b.rr = b.drawRoundRect, b.rc = b.drawRoundRectComplex, b.dc = b.drawCircle, b.de = b.drawEllipse, b.dp = b.drawPolyStar, b.p = b.decodePath, b._updateInstructions = function (b) { var c = this._instructions, d = this._activeInstructions, e = this._commitIndex; if (this._dirty && d.length) { c.length = e, c.push(a.beginCmd); var f = d.length, g = c.length; c.length = g + f; for (var h = 0; f > h; h++)c[h + g] = d[h]; this._fill && c.push(this._fill), this._stroke && (this._strokeDash !== this._oldStrokeDash && c.push(this._strokeDash), this._strokeStyle !== this._oldStrokeStyle && c.push(this._strokeStyle), b && (this._oldStrokeStyle = this._strokeStyle, this._oldStrokeDash = this._strokeDash), c.push(this._stroke)), this._dirty = !1 } b && (d.length = 0, this._commitIndex = c.length) }, b._setFill = function (a) { return this._updateInstructions(!0), this.command = this._fill = a, this }, b._setStroke = function (a) { return this._updateInstructions(!0), (this.command = this._stroke = a) && (a.ignoreScale = this._strokeIgnoreScale), this }, (c.LineTo = function (a, b) { this.x = a, this.y = b }).prototype.exec = function (a) { a.lineTo(this.x, this.y) }, (c.MoveTo = function (a, b) { this.x = a, this.y = b }).prototype.exec = function (a) { a.moveTo(this.x, this.y) }, (c.ArcTo = function (a, b, c, d, e) { this.x1 = a, this.y1 = b, this.x2 = c, this.y2 = d, this.radius = e }).prototype.exec = function (a) { a.arcTo(this.x1, this.y1, this.x2, this.y2, this.radius) }, (c.Arc = function (a, b, c, d, e, f) { this.x = a, this.y = b, this.radius = c, this.startAngle = d, this.endAngle = e, this.anticlockwise = !!f }).prototype.exec = function (a) { a.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise) }, (c.QuadraticCurveTo = function (a, b, c, d) { this.cpx = a, this.cpy = b, this.x = c, this.y = d }).prototype.exec = function (a) { a.quadraticCurveTo(this.cpx, this.cpy, this.x, this.y) }, (c.BezierCurveTo = function (a, b, c, d, e, f) { this.cp1x = a, this.cp1y = b, this.cp2x = c, this.cp2y = d, this.x = e, this.y = f }).prototype.exec = function (a) { a.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.x, this.y) }, (c.Rect = function (a, b, c, d) { this.x = a, this.y = b, this.w = c, this.h = d }).prototype.exec = function (a) { a.rect(this.x, this.y, this.w, this.h) }, (c.ClosePath = function () { }).prototype.exec = function (a) { a.closePath() }, (c.BeginPath = function () { }).prototype.exec = function (a) { a.beginPath() }, b = (c.Fill = function (a, b) { this.style = a, this.matrix = b }).prototype, b.exec = function (a) { if (this.style) { a.fillStyle = this.style; var b = this.matrix; b && (a.save(), a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty)), a.fill(), b && a.restore() } }, b.linearGradient = function (b, c, d, e, f, g) { for (var h = this.style = a._ctx.createLinearGradient(d, e, f, g), i = 0, j = b.length; j > i; i++)h.addColorStop(c[i], b[i]); return h.props = { colors: b, ratios: c, x0: d, y0: e, x1: f, y1: g, type: "linear" }, this }, b.radialGradient = function (b, c, d, e, f, g, h, i) { for (var j = this.style = a._ctx.createRadialGradient(d, e, f, g, h, i), k = 0, l = b.length; l > k; k++)j.addColorStop(c[k], b[k]); return j.props = { colors: b, ratios: c, x0: d, y0: e, r0: f, x1: g, y1: h, r1: i, type: "radial" }, this }, b.bitmap = function (b, c) { if (b.naturalWidth || b.getContext || b.readyState >= 2) { var d = this.style = a._ctx.createPattern(b, c || ""); d.props = { image: b, repetition: c, type: "bitmap" } } return this }, b.path = !1, b = (c.Stroke = function (a, b) { this.style = a, this.ignoreScale = b }).prototype, b.exec = function (a) { this.style && (a.strokeStyle = this.style, this.ignoreScale && (a.save(), a.setTransform(1, 0, 0, 1, 0, 0)), a.stroke(), this.ignoreScale && a.restore()) }, b.linearGradient = c.Fill.prototype.linearGradient, b.radialGradient = c.Fill.prototype.radialGradient, b.bitmap = c.Fill.prototype.bitmap, b.path = !1, b = (c.StrokeStyle = function (a, b, c, d, e) { this.width = a, this.caps = b, this.joints = c, this.miterLimit = d, this.ignoreScale = e }).prototype, b.exec = function (b) { b.lineWidth = null == this.width ? "1" : this.width, b.lineCap = null == this.caps ? "butt" : isNaN(this.caps) ? this.caps : a.STROKE_CAPS_MAP[this.caps], b.lineJoin = null == this.joints ? "miter" : isNaN(this.joints) ? this.joints : a.STROKE_JOINTS_MAP[this.joints], b.miterLimit = null == this.miterLimit ? "10" : this.miterLimit, b.ignoreScale = null == this.ignoreScale ? !1 : this.ignoreScale }, b.path = !1, (c.StrokeDash = function (a, b) { this.segments = a, this.offset = b || 0 }).prototype.exec = function (a) { a.setLineDash && (a.setLineDash(this.segments || c.StrokeDash.EMPTY_SEGMENTS), a.lineDashOffset = this.offset || 0) }, c.StrokeDash.EMPTY_SEGMENTS = [], (c.RoundRect = function (a, b, c, d, e, f, g, h) { this.x = a, this.y = b, this.w = c, this.h = d, this.radiusTL = e, this.radiusTR = f, this.radiusBR = g, this.radiusBL = h }).prototype.exec = function (a) {
        var b = (j > i ? i : j) / 2, c = 0, d = 0, e = 0, f = 0, g = this.x, h = this.y, i = this.w, j = this.h, k = this.radiusTL, l = this.radiusTR, m = this.radiusBR, n = this.radiusBL; 0 > k && (k *= c = -1), k > b && (k = b), 0 > l && (l *= d = -1), l > b && (l = b), 0 > m && (m *= e = -1), m > b && (m = b), 0 > n && (n *= f = -1), n > b && (n = b), a.moveTo(g + i - l, h), a.arcTo(g + i + l * d, h - l * d, g + i, h + l, l), a.lineTo(g + i, h + j - m), a.arcTo(g + i + m * e, h + j + m * e, g + i - m, h + j, m), a.lineTo(g + n, h + j), a.arcTo(g - n * f, h + j + n * f, g, h + j - n, n),
            a.lineTo(g, h + k), a.arcTo(g - k * c, h - k * c, g + k, h, k), a.closePath()
    }, (c.Circle = function (a, b, c) { this.x = a, this.y = b, this.radius = c }).prototype.exec = function (a) { a.arc(this.x, this.y, this.radius, 0, 2 * Math.PI) }, (c.Ellipse = function (a, b, c, d) { this.x = a, this.y = b, this.w = c, this.h = d }).prototype.exec = function (a) { var b = this.x, c = this.y, d = this.w, e = this.h, f = .5522848, g = d / 2 * f, h = e / 2 * f, i = b + d, j = c + e, k = b + d / 2, l = c + e / 2; a.moveTo(b, l), a.bezierCurveTo(b, l - h, k - g, c, k, c), a.bezierCurveTo(k + g, c, i, l - h, i, l), a.bezierCurveTo(i, l + h, k + g, j, k, j), a.bezierCurveTo(k - g, j, b, l + h, b, l) }, (c.PolyStar = function (a, b, c, d, e, f) { this.x = a, this.y = b, this.radius = c, this.sides = d, this.pointSize = e, this.angle = f }).prototype.exec = function (a) { var b = this.x, c = this.y, d = this.radius, e = (this.angle || 0) / 180 * Math.PI, f = this.sides, g = 1 - (this.pointSize || 0), h = Math.PI / f; a.moveTo(b + Math.cos(e) * d, c + Math.sin(e) * d); for (var i = 0; f > i; i++)e += h, 1 != g && a.lineTo(b + Math.cos(e) * d * g, c + Math.sin(e) * d * g), e += h, a.lineTo(b + Math.cos(e) * d, c + Math.sin(e) * d); a.closePath() }, a.beginCmd = new c.BeginPath, createjs.Graphics = a
}(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.EventDispatcher_constructor(), this.alpha = 1, this.cacheCanvas = null, this.bitmapCache = null, this.id = createjs.UID.get(), this.mouseEnabled = !0, this.tickEnabled = !0, this.name = null, this.parent = null, this.regX = 0, this.regY = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.skewX = 0, this.skewY = 0, this.shadow = null, this.visible = !0, this.x = 0, this.y = 0, this.transformMatrix = null, this.compositeOperation = null, this.snapToPixel = !0, this.filters = null, this.mask = null, this.hitArea = null, this.cursor = null, this._props = new createjs.DisplayProps, this._rectangle = new createjs.Rectangle, this._bounds = null, this._webGLRenderStyle = a._StageGL_NONE } var b = createjs.extend(a, createjs.EventDispatcher); a._MOUSE_EVENTS = ["click", "dblclick", "mousedown", "mouseout", "mouseover", "pressmove", "pressup", "rollout", "rollover"], a.suppressCrossDomainErrors = !1, a._snapToPixelEnabled = !1, a._StageGL_NONE = 0, a._StageGL_SPRITE = 1, a._StageGL_BITMAP = 2; var c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); c.getContext && (a._hitTestCanvas = c, a._hitTestContext = c.getContext("2d"), c.width = c.height = 1), b._getStage = function () { for (var a = this, b = createjs.Stage; a.parent;)a = a.parent; return a instanceof b ? a : null }, b.getStage = createjs.deprecate(b._getStage, "DisplayObject.getStage"); try { Object.defineProperties(b, { stage: { get: b._getStage }, cacheID: { get: function () { return this.bitmapCache && this.bitmapCache.cacheID }, set: function (a) { this.bitmapCache && (this.bitmapCache.cacheID = a) } }, scale: { get: function () { return this.scaleX }, set: function (a) { this.scaleX = this.scaleY = a } } }) } catch (d) { } b.isVisible = function () { return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY) }, b.draw = function (a, b) { var c = this.bitmapCache; return c && !b ? c.draw(a) : !1 }, b.updateContext = function (b) { var c = this, d = c.mask, e = c._props.matrix; d && d.graphics && !d.graphics.isEmpty() && (d.getMatrix(e), b.transform(e.a, e.b, e.c, e.d, e.tx, e.ty), d.graphics.drawAsPath(b), b.clip(), e.invert(), b.transform(e.a, e.b, e.c, e.d, e.tx, e.ty)), this.getMatrix(e); var f = e.tx, g = e.ty; a._snapToPixelEnabled && c.snapToPixel && (f = f + (0 > f ? -.5 : .5) | 0, g = g + (0 > g ? -.5 : .5) | 0), b.transform(e.a, e.b, e.c, e.d, f, g), b.globalAlpha *= c.alpha, c.compositeOperation && (b.globalCompositeOperation = c.compositeOperation), c.shadow && this._applyShadow(b, c.shadow) }, b.cache = function (a, b, c, d, e, f) { this.bitmapCache || (this.bitmapCache = new createjs.BitmapCache), this.bitmapCache.define(this, a, b, c, d, e, f) }, b.updateCache = function (a) { if (!this.bitmapCache) throw "cache() must be called before updateCache()"; this.bitmapCache.update(a) }, b.uncache = function () { this.bitmapCache && (this.bitmapCache.release(), this.bitmapCache = void 0) }, b.getCacheDataURL = function () { return this.bitmapCache ? this.bitmapCache.getDataURL() : null }, b.localToGlobal = function (a, b, c) { return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a, b, c || new createjs.Point) }, b.globalToLocal = function (a, b, c) { return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a, b, c || new createjs.Point) }, b.localToLocal = function (a, b, c, d) { return d = this.localToGlobal(a, b, d), c.globalToLocal(d.x, d.y, d) }, b.setTransform = function (a, b, c, d, e, f, g, h, i) { return this.x = a || 0, this.y = b || 0, this.scaleX = null == c ? 1 : c, this.scaleY = null == d ? 1 : d, this.rotation = e || 0, this.skewX = f || 0, this.skewY = g || 0, this.regX = h || 0, this.regY = i || 0, this }, b.getMatrix = function (a) { var b = this, c = a && a.identity() || new createjs.Matrix2D; return b.transformMatrix ? c.copy(b.transformMatrix) : c.appendTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY) }, b.getConcatenatedMatrix = function (a) { for (var b = this, c = this.getMatrix(a); b = b.parent;)c.prependMatrix(b.getMatrix(b._props.matrix)); return c }, b.getConcatenatedDisplayProps = function (a) { a = a ? a.identity() : new createjs.DisplayProps; var b = this, c = b.getMatrix(a.matrix); do a.prepend(b.visible, b.alpha, b.shadow, b.compositeOperation), b != this && c.prependMatrix(b.getMatrix(b._props.matrix)); while (b = b.parent); return a }, b.hitTest = function (b, c) { var d = a._hitTestContext; d.setTransform(1, 0, 0, 1, -b, -c), this.draw(d); var e = this._testHit(d); return d.setTransform(1, 0, 0, 1, 0, 0), d.clearRect(0, 0, 2, 2), e }, b.set = function (a) { for (var b in a) this[b] = a[b]; return this }, b.getBounds = function () { if (this._bounds) return this._rectangle.copy(this._bounds); var a = this.cacheCanvas; if (a) { var b = this._cacheScale; return this._rectangle.setValues(this._cacheOffsetX, this._cacheOffsetY, a.width / b, a.height / b) } return null }, b.getTransformedBounds = function () { return this._getBounds() }, b.setBounds = function (a, b, c, d) { return null == a ? void (this._bounds = a) : void (this._bounds = (this._bounds || new createjs.Rectangle).setValues(a, b, c, d)) }, b.clone = function () { return this._cloneProps(new a) }, b.toString = function () { return "[DisplayObject (name=" + this.name + ")]" }, b._updateState = null, b._cloneProps = function (a) { return a.alpha = this.alpha, a.mouseEnabled = this.mouseEnabled, a.tickEnabled = this.tickEnabled, a.name = this.name, a.regX = this.regX, a.regY = this.regY, a.rotation = this.rotation, a.scaleX = this.scaleX, a.scaleY = this.scaleY, a.shadow = this.shadow, a.skewX = this.skewX, a.skewY = this.skewY, a.visible = this.visible, a.x = this.x, a.y = this.y, a.compositeOperation = this.compositeOperation, a.snapToPixel = this.snapToPixel, a.filters = null == this.filters ? null : this.filters.slice(0), a.mask = this.mask, a.hitArea = this.hitArea, a.cursor = this.cursor, a._bounds = this._bounds, a }, b._applyShadow = function (a, b) { b = b || Shadow.identity, a.shadowColor = b.color, a.shadowOffsetX = b.offsetX, a.shadowOffsetY = b.offsetY, a.shadowBlur = b.blur }, b._tick = function (a) { var b = this._listeners; b && b.tick && (a.target = null, a.propagationStopped = a.immediatePropagationStopped = !1, this.dispatchEvent(a)) }, b._testHit = function (b) { try { var c = b.getImageData(0, 0, 1, 1).data[3] > 1 } catch (d) { if (!a.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images." } return c }, b._getBounds = function (a, b) { return this._transformBounds(this.getBounds(), a, b) }, b._transformBounds = function (a, b, c) { if (!a) return a; var d = a.x, e = a.y, f = a.width, g = a.height, h = this._props.matrix; h = c ? h.identity() : this.getMatrix(h), (d || e) && h.appendTransform(0, 0, 1, 1, 0, 0, 0, -d, -e), b && h.prependMatrix(b); var i = f * h.a, j = f * h.b, k = g * h.c, l = g * h.d, m = h.tx, n = h.ty, o = m, p = m, q = n, r = n; return (d = i + m) < o ? o = d : d > p && (p = d), (d = i + k + m) < o ? o = d : d > p && (p = d), (d = k + m) < o ? o = d : d > p && (p = d), (e = j + n) < q ? q = e : e > r && (r = e), (e = j + l + n) < q ? q = e : e > r && (r = e), (e = l + n) < q ? q = e : e > r && (r = e), a.setValues(o, q, p - o, r - q) }, b._hasMouseEventListener = function () { for (var b = a._MOUSE_EVENTS, c = 0, d = b.length; d > c; c++)if (this.hasEventListener(b[c])) return !0; return !!this.cursor }, createjs.DisplayObject = createjs.promote(a, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.DisplayObject_constructor(), this.children = [], this.mouseChildren = !0, this.tickChildren = !0 } var b = createjs.extend(a, createjs.DisplayObject); b._getNumChildren = function () { return this.children.length }, b.getNumChildren = createjs.deprecate(b._getNumChildren, "Container.getNumChildren"); try { Object.defineProperties(b, { numChildren: { get: b._getNumChildren } }) } catch (c) { } b.initialize = a, b.isVisible = function () { var a = this.cacheCanvas || this.children.length; return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a) }, b.draw = function (a, b) { if (this.DisplayObject_draw(a, b)) return !0; for (var c = this.children.slice(), d = 0, e = c.length; e > d; d++) { var f = c[d]; f.isVisible() && (a.save(), f.updateContext(a), f.draw(a), a.restore()) } return !0 }, b.addChild = function (a) { if (null == a) return a; var b = arguments.length; if (b > 1) { for (var c = 0; b > c; c++)this.addChild(arguments[c]); return arguments[b - 1] } var d = a.parent, e = d === this; return d && d._removeChildAt(createjs.indexOf(d.children, a), e), a.parent = this, this.children.push(a), e || a.dispatchEvent("added"), a }, b.addChildAt = function (a, b) { var c = arguments.length, d = arguments[c - 1]; if (0 > d || d > this.children.length) return arguments[c - 2]; if (c > 2) { for (var e = 0; c - 1 > e; e++)this.addChildAt(arguments[e], d + e); return arguments[c - 2] } var f = a.parent, g = f === this; return f && f._removeChildAt(createjs.indexOf(f.children, a), g), a.parent = this, this.children.splice(b, 0, a), g || a.dispatchEvent("added"), a }, b.removeChild = function (a) { var b = arguments.length; if (b > 1) { for (var c = !0, d = 0; b > d; d++)c = c && this.removeChild(arguments[d]); return c } return this._removeChildAt(createjs.indexOf(this.children, a)) }, b.removeChildAt = function (a) { var b = arguments.length; if (b > 1) { for (var c = [], d = 0; b > d; d++)c[d] = arguments[d]; c.sort(function (a, b) { return b - a }); for (var e = !0, d = 0; b > d; d++)e = e && this._removeChildAt(c[d]); return e } return this._removeChildAt(a) }, b.removeAllChildren = function () { for (var a = this.children; a.length;)this._removeChildAt(0) }, b.getChildAt = function (a) { return this.children[a] }, b.getChildByName = function (a) { for (var b = this.children, c = 0, d = b.length; d > c; c++)if (b[c].name == a) return b[c]; return null }, b.sortChildren = function (a) { this.children.sort(a) }, b.getChildIndex = function (a) { return createjs.indexOf(this.children, a) }, b.swapChildrenAt = function (a, b) { var c = this.children, d = c[a], e = c[b]; d && e && (c[a] = e, c[b] = d) }, b.swapChildren = function (a, b) { for (var c, d, e = this.children, f = 0, g = e.length; g > f && (e[f] == a && (c = f), e[f] == b && (d = f), null == c || null == d); f++); f != g && (e[c] = b, e[d] = a) }, b.setChildIndex = function (a, b) { var c = this.children, d = c.length; if (!(a.parent != this || 0 > b || b >= d)) { for (var e = 0; d > e && c[e] != a; e++); e != d && e != b && (c.splice(e, 1), c.splice(b, 0, a)) } }, b.contains = function (a) { for (; a;) { if (a == this) return !0; a = a.parent } return !1 }, b.hitTest = function (a, b) { return null != this.getObjectUnderPoint(a, b) }, b.getObjectsUnderPoint = function (a, b, c) { var d = [], e = this.localToGlobal(a, b); return this._getObjectsUnderPoint(e.x, e.y, d, c > 0, 1 == c), d }, b.getObjectUnderPoint = function (a, b, c) { var d = this.localToGlobal(a, b); return this._getObjectsUnderPoint(d.x, d.y, null, c > 0, 1 == c) }, b.getBounds = function () { return this._getBounds(null, !0) }, b.getTransformedBounds = function () { return this._getBounds() }, b.clone = function (b) { var c = this._cloneProps(new a); return b && this._cloneChildren(c), c }, b.toString = function () { return "[Container (name=" + this.name + ")]" }, b._tick = function (a) { if (this.tickChildren) for (var b = this.children.length - 1; b >= 0; b--) { var c = this.children[b]; c.tickEnabled && c._tick && c._tick(a) } this.DisplayObject__tick(a) }, b._cloneChildren = function (a) { a.children.length && a.removeAllChildren(); for (var b = a.children, c = 0, d = this.children.length; d > c; c++) { var e = this.children[c].clone(!0); e.parent = a, b.push(e) } }, b._removeChildAt = function (a, b) { if (0 > a || a > this.children.length - 1) return !1; var c = this.children[a]; return c && (c.parent = null), this.children.splice(a, 1), b || c.dispatchEvent("removed"), !0 }, b._getObjectsUnderPoint = function (b, c, d, e, f, g) { if (g = g || 0, !g && !this._testMask(this, b, c)) return null; var h, i = createjs.DisplayObject._hitTestContext; f = f || e && this._hasMouseEventListener(); for (var j = this.children, k = j.length, l = k - 1; l >= 0; l--) { var m = j[l], n = m.hitArea; if (m.visible && (n || m.isVisible()) && (!e || m.mouseEnabled) && (n || this._testMask(m, b, c))) if (!n && m instanceof a) { var o = m._getObjectsUnderPoint(b, c, d, e, f, g + 1); if (!d && o) return e && !this.mouseChildren ? this : o } else { if (e && !f && !m._hasMouseEventListener()) continue; var p = m.getConcatenatedDisplayProps(m._props); if (h = p.matrix, n && (h.appendMatrix(n.getMatrix(n._props.matrix)), p.alpha = n.alpha), i.globalAlpha = p.alpha, i.setTransform(h.a, h.b, h.c, h.d, h.tx - b, h.ty - c), (n || m).draw(i), !this._testHit(i)) continue; if (i.setTransform(1, 0, 0, 1, 0, 0), i.clearRect(0, 0, 2, 2), !d) return e && !this.mouseChildren ? this : m; d.push(m) } } return null }, b._testMask = function (a, b, c) { var d = a.mask; if (!d || !d.graphics || d.graphics.isEmpty()) return !0; var e = this._props.matrix, f = a.parent; e = f ? f.getConcatenatedMatrix(e) : e.identity(), e = d.getMatrix(d._props.matrix).prependMatrix(e); var g = createjs.DisplayObject._hitTestContext; return g.setTransform(e.a, e.b, e.c, e.d, e.tx - b, e.ty - c), d.graphics.drawAsPath(g), g.fillStyle = "#000", g.fill(), this._testHit(g) ? (g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, 2, 2), !0) : !1 }, b._getBounds = function (a, b) { var c = this.DisplayObject_getBounds(); if (c) return this._transformBounds(c, a, b); var d = this._props.matrix; d = b ? d.identity() : this.getMatrix(d), a && d.prependMatrix(a); for (var e = this.children.length, f = null, g = 0; e > g; g++) { var h = this.children[g]; h.visible && (c = h._getBounds(d)) && (f ? f.extend(c.x, c.y, c.width, c.height) : f = c.clone()) } return f }, createjs.Container = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.Container_constructor(), this.autoClear = !0, this.canvas = "string" == typeof a ? document.getElementById(a) : a, this.mouseX = 0, this.mouseY = 0, this.drawRect = null, this.snapToPixelEnabled = !1, this.mouseInBounds = !1, this.tickOnUpdate = !0, this.mouseMoveOutside = !1, this.preventSelection = !0, this._pointerData = {}, this._pointerCount = 0, this._primaryPointerID = null, this._mouseOverIntervalID = null, this._nextStage = null, this._prevStage = null, this.enableDOMEvents(!0) } var b = createjs.extend(a, createjs.Container); b._get_nextStage = function () { return this._nextStage }, b._set_nextStage = function (a) { this._nextStage && (this._nextStage._prevStage = null), a && (a._prevStage = this), this._nextStage = a }; try { Object.defineProperties(b, { nextStage: { get: b._get_nextStage, set: b._set_nextStage } }) } catch (c) { } b.update = function (a) { if (this.canvas && (this.tickOnUpdate && this.tick(a), this.dispatchEvent("drawstart", !1, !0) !== !1)) { createjs.DisplayObject._snapToPixelEnabled = this.snapToPixelEnabled; var b = this.drawRect, c = this.canvas.getContext("2d"); c.setTransform(1, 0, 0, 1, 0, 0), this.autoClear && (b ? c.clearRect(b.x, b.y, b.width, b.height) : c.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)), c.save(), this.drawRect && (c.beginPath(), c.rect(b.x, b.y, b.width, b.height), c.clip()), this.updateContext(c), this.draw(c, !1), c.restore(), this.dispatchEvent("drawend") } }, b.tick = function (a) { if (this.tickEnabled && this.dispatchEvent("tickstart", !1, !0) !== !1) { var b = new createjs.Event("tick"); if (a) for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]); this._tick(b), this.dispatchEvent("tickend") } }, b.handleEvent = function (a) { "tick" == a.type && this.update(a) }, b.clear = function () { if (this.canvas) { var a = this.canvas.getContext("2d"); a.setTransform(1, 0, 0, 1, 0, 0), a.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1) } }, b.toDataURL = function (a, b) { var c, d = this.canvas.getContext("2d"), e = this.canvas.width, f = this.canvas.height; if (a) { c = d.getImageData(0, 0, e, f); var g = d.globalCompositeOperation; d.globalCompositeOperation = "destination-over", d.fillStyle = a, d.fillRect(0, 0, e, f) } var h = this.canvas.toDataURL(b || "image/png"); return a && (d.putImageData(c, 0, 0), d.globalCompositeOperation = g), h }, b.enableMouseOver = function (a) { if (this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == a && this._testMouseOver(!0)), null == a) a = 20; else if (0 >= a) return; var b = this; this._mouseOverIntervalID = setInterval(function () { b._testMouseOver() }, 1e3 / Math.min(50, a)) }, b.enableDOMEvents = function (a) { null == a && (a = !0); var b, c, d = this._eventListeners; if (!a && d) { for (b in d) c = d[b], c.t.removeEventListener(b, c.f, !1); this._eventListeners = null } else if (a && !d && this.canvas) { var e = window.addEventListener ? window : document, f = this; d = this._eventListeners = {}, d.mouseup = { t: e, f: function (a) { f._handleMouseUp(a) } }, d.mousemove = { t: e, f: function (a) { f._handleMouseMove(a) } }, d.dblclick = { t: this.canvas, f: function (a) { f._handleDoubleClick(a) } }, d.mousedown = { t: this.canvas, f: function (a) { f._handleMouseDown(a) } }; for (b in d) c = d[b], c.t.addEventListener(b, c.f, !1) } }, b.clone = function () { throw "Stage cannot be cloned." }, b.toString = function () { return "[Stage (name=" + this.name + ")]" }, b._getElementRect = function (a) { var b; try { b = a.getBoundingClientRect() } catch (c) { b = { top: a.offsetTop, left: a.offsetLeft, width: a.offsetWidth, height: a.offsetHeight } } var d = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0), e = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0), f = window.getComputedStyle ? getComputedStyle(a, null) : a.currentStyle, g = parseInt(f.paddingLeft) + parseInt(f.borderLeftWidth), h = parseInt(f.paddingTop) + parseInt(f.borderTopWidth), i = parseInt(f.paddingRight) + parseInt(f.borderRightWidth), j = parseInt(f.paddingBottom) + parseInt(f.borderBottomWidth); return { left: b.left + d + g, right: b.right + d - i, top: b.top + e + h, bottom: b.bottom + e - j } }, b._getPointerData = function (a) { var b = this._pointerData[a]; return b || (b = this._pointerData[a] = { x: 0, y: 0 }), b }, b._handleMouseMove = function (a) { a || (a = window.event), this._handlePointerMove(-1, a, a.pageX, a.pageY) }, b._handlePointerMove = function (a, b, c, d, e) { if ((!this._prevStage || void 0 !== e) && this.canvas) { var f = this._nextStage, g = this._getPointerData(a), h = g.inBounds; this._updatePointerPosition(a, b, c, d), (h || g.inBounds || this.mouseMoveOutside) && (-1 === a && g.inBounds == !h && this._dispatchMouseEvent(this, h ? "mouseleave" : "mouseenter", !1, a, g, b), this._dispatchMouseEvent(this, "stagemousemove", !1, a, g, b), this._dispatchMouseEvent(g.target, "pressmove", !0, a, g, b)), f && f._handlePointerMove(a, b, c, d, null) } }, b._updatePointerPosition = function (a, b, c, d) { var e = this._getElementRect(this.canvas); c -= e.left, d -= e.top; var f = this.canvas.width, g = this.canvas.height; c /= (e.right - e.left) / f, d /= (e.bottom - e.top) / g; var h = this._getPointerData(a); (h.inBounds = c >= 0 && d >= 0 && f - 1 >= c && g - 1 >= d) ? (h.x = c, h.y = d) : this.mouseMoveOutside && (h.x = 0 > c ? 0 : c > f - 1 ? f - 1 : c, h.y = 0 > d ? 0 : d > g - 1 ? g - 1 : d), h.posEvtObj = b, h.rawX = c, h.rawY = d, (a === this._primaryPointerID || -1 === a) && (this.mouseX = h.x, this.mouseY = h.y, this.mouseInBounds = h.inBounds) }, b._handleMouseUp = function (a) { this._handlePointerUp(-1, a, !1) }, b._handlePointerUp = function (a, b, c, d) { var e = this._nextStage, f = this._getPointerData(a); if (!this._prevStage || void 0 !== d) { var g = null, h = f.target; d || !h && !e || (g = this._getObjectsUnderPoint(f.x, f.y, null, !0)), f.down && (this._dispatchMouseEvent(this, "stagemouseup", !1, a, f, b, g), f.down = !1), g == h && this._dispatchMouseEvent(h, "click", !0, a, f, b), this._dispatchMouseEvent(h, "pressup", !0, a, f, b), c ? (a == this._primaryPointerID && (this._primaryPointerID = null), delete this._pointerData[a]) : f.target = null, e && e._handlePointerUp(a, b, c, d || g && this) } }, b._handleMouseDown = function (a) { this._handlePointerDown(-1, a, a.pageX, a.pageY) }, b._handlePointerDown = function (a, b, c, d, e) { this.preventSelection && b.preventDefault(), (null == this._primaryPointerID || -1 === a) && (this._primaryPointerID = a), null != d && this._updatePointerPosition(a, b, c, d); var f = null, g = this._nextStage, h = this._getPointerData(a); e || (f = h.target = this._getObjectsUnderPoint(h.x, h.y, null, !0)), h.inBounds && (this._dispatchMouseEvent(this, "stagemousedown", !1, a, h, b, f), h.down = !0), this._dispatchMouseEvent(f, "mousedown", !0, a, h, b), g && g._handlePointerDown(a, b, c, d, e || f && this) }, b._testMouseOver = function (a, b, c) { if (!this._prevStage || void 0 !== b) { var d = this._nextStage; if (!this._mouseOverIntervalID) return void (d && d._testMouseOver(a, b, c)); var e = this._getPointerData(-1); if (e && (a || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) { var f, g, h, i = e.posEvtObj, j = c || i && i.target == this.canvas, k = null, l = -1, m = ""; !b && (a || this.mouseInBounds && j) && (k = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY); var n = this._mouseOverTarget || [], o = n[n.length - 1], p = this._mouseOverTarget = []; for (f = k; f;)p.unshift(f), m || (m = f.cursor), f = f.parent; for (this.canvas.style.cursor = m, !b && c && (c.canvas.style.cursor = m), g = 0, h = p.length; h > g && p[g] == n[g]; g++)l = g; for (o != k && this._dispatchMouseEvent(o, "mouseout", !0, -1, e, i, k), g = n.length - 1; g > l; g--)this._dispatchMouseEvent(n[g], "rollout", !1, -1, e, i, k); for (g = p.length - 1; g > l; g--)this._dispatchMouseEvent(p[g], "rollover", !1, -1, e, i, o); o != k && this._dispatchMouseEvent(k, "mouseover", !0, -1, e, i, o), d && d._testMouseOver(a, b || k && this, c || j && this) } } }, b._handleDoubleClick = function (a, b) { var c = null, d = this._nextStage, e = this._getPointerData(-1); b || (c = this._getObjectsUnderPoint(e.x, e.y, null, !0), this._dispatchMouseEvent(c, "dblclick", !0, -1, e, a)), d && d._handleDoubleClick(a, b || c && this) }, b._dispatchMouseEvent = function (a, b, c, d, e, f, g) { if (a && (c || a.hasEventListener(b))) { var h = new createjs.MouseEvent(b, c, !1, e.x, e.y, f, d, d === this._primaryPointerID || -1 === d, e.rawX, e.rawY, g); a.dispatchEvent(h) } }, createjs.Stage = createjs.promote(a, "Container") }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a(b, c) { if (this.Stage_constructor(b), void 0 !== c) { if ("object" != typeof c) throw "Invalid options object"; var d = c.premultiply, e = c.transparent, f = c.antialias, g = c.preserveBuffer, h = c.autoPurge } this.vocalDebug = !1, this._preserveBuffer = g || !1, this._antialias = f || !1, this._transparent = e || !1, this._premultiply = d || !1, this._autoPurge = void 0, this.autoPurge = h, this._viewportWidth = 0, this._viewportHeight = 0, this._projectionMatrix = null, this._webGLContext = null, this._clearColor = { r: .5, g: .5, b: .5, a: 0 }, this._maxCardsPerBatch = a.DEFAULT_MAX_BATCH_SIZE, this._activeShader = null, this._vertices = null, this._vertexPositionBuffer = null, this._uvs = null, this._uvPositionBuffer = null, this._indices = null, this._textureIndexBuffer = null, this._alphas = null, this._alphaBuffer = null, this._textureDictionary = [], this._textureIDs = {}, this._batchTextures = [], this._baseTextures = [], this._batchTextureCount = 8, this._lastTextureInsert = -1, this._batchID = 0, this._drawID = 0, this._slotBlacklist = [], this._isDrawing = 0, this._lastTrackedCanvas = 0, this.isCacheControlled = !1, this._cacheContainer = new createjs.Container, this._initializeWebGL() } var b = createjs.extend(a, createjs.Stage); a.buildUVRects = function (a, b, c) { if (!a || !a._frames) return null; void 0 === b && (b = -1), void 0 === c && (c = !1); for (var d = -1 != b && c ? b : 0, e = -1 != b && c ? b + 1 : a._frames.length, f = d; e > f; f++) { var g = a._frames[f]; if (!(g.uvRect || g.image.width <= 0 || g.image.height <= 0)) { var h = g.rect; g.uvRect = { t: h.y / g.image.height, l: h.x / g.image.width, b: (h.y + h.height) / g.image.height, r: (h.x + h.width) / g.image.width } } } return a._frames[-1 != b ? b : 0].uvRect || { t: 0, l: 0, b: 1, r: 1 } }, a.isWebGLActive = function (a) { return a && a instanceof WebGLRenderingContext && "undefined" != typeof WebGLRenderingContext }, a.VERTEX_PROPERTY_COUNT = 6, a.INDICIES_PER_CARD = 6, a.DEFAULT_MAX_BATCH_SIZE = 1e4, a.WEBGL_MAX_INDEX_NUM = Math.pow(2, 16), a.UV_RECT = { t: 0, l: 0, b: 1, r: 1 }; try { a.COVER_VERT = new Float32Array([-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1]), a.COVER_UV = new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1]), a.COVER_UV_FLIP = new Float32Array([0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0]) } catch (c) { } a.REGULAR_VARYING_HEADER = "precision mediump float;varying vec2 vTextureCoord;varying lowp float indexPicker;varying lowp float alphaValue;", a.REGULAR_VERTEX_HEADER = a.REGULAR_VARYING_HEADER + "attribute vec2 vertexPosition;attribute vec2 uvPosition;attribute lowp float textureIndex;attribute lowp float objectAlpha;uniform mat4 pMatrix;", a.REGULAR_FRAGMENT_HEADER = a.REGULAR_VARYING_HEADER + "uniform sampler2D uSampler[{{count}}];", a.REGULAR_VERTEX_BODY = "void main(void) {gl_Position = vec4((vertexPosition.x * pMatrix[0][0]) + pMatrix[3][0],(vertexPosition.y * pMatrix[1][1]) + pMatrix[3][1],pMatrix[3][2],1.0);alphaValue = objectAlpha;indexPicker = textureIndex;vTextureCoord = uvPosition;}", a.REGULAR_FRAGMENT_BODY = "void main(void) {vec4 color = vec4(1.0, 0.0, 0.0, 1.0);if (indexPicker <= 0.5) {color = texture2D(uSampler[0], vTextureCoord);{{alternates}}}{{fragColor}}}", a.REGULAR_FRAG_COLOR_NORMAL = "gl_FragColor = vec4(color.rgb, color.a * alphaValue);", a.REGULAR_FRAG_COLOR_PREMULTIPLY = "if(color.a > 0.0035) {gl_FragColor = vec4(color.rgb/color.a, color.a * alphaValue);} else {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}", a.PARTICLE_VERTEX_BODY = a.REGULAR_VERTEX_BODY, a.PARTICLE_FRAGMENT_BODY = a.REGULAR_FRAGMENT_BODY, a.COVER_VARYING_HEADER = "precision mediump float;varying highp vec2 vRenderCoord;varying highp vec2 vTextureCoord;", a.COVER_VERTEX_HEADER = a.COVER_VARYING_HEADER + "attribute vec2 vertexPosition;attribute vec2 uvPosition;uniform float uUpright;", a.COVER_FRAGMENT_HEADER = a.COVER_VARYING_HEADER + "uniform sampler2D uSampler;", a.COVER_VERTEX_BODY = "void main(void) {gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);vRenderCoord = uvPosition;vTextureCoord = vec2(uvPosition.x, abs(uUpright - uvPosition.y));}", a.COVER_FRAGMENT_BODY = "void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = color;}", b._get_isWebGL = function () { return !!this._webGLContext }, b._set_autoPurge = function (a) { a = isNaN(a) ? 1200 : a, -1 != a && (a = 10 > a ? 10 : a), this._autoPurge = a }, b._get_autoPurge = function () { return Number(this._autoPurge) }; try { Object.defineProperties(b, { isWebGL: { get: b._get_isWebGL }, autoPurge: { get: b._get_autoPurge, set: b._set_autoPurge } }) } catch (c) { } b._initializeWebGL = function () { if (this.canvas) { if (!this._webGLContext || this._webGLContext.canvas !== this.canvas) { var a = { depth: !1, alpha: this._transparent, stencil: !0, antialias: this._antialias, premultipliedAlpha: this._premultiply, preserveDrawingBuffer: this._preserveBuffer }, b = this._webGLContext = this._fetchWebGLContext(this.canvas, a); if (!b) return null; this.updateSimultaneousTextureCount(b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS)), this._maxTextureSlots = b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS), this._createBuffers(b), this._initTextures(b), b.disable(b.DEPTH_TEST), b.enable(b.BLEND), b.blendFuncSeparate(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA, b.ONE, b.ONE_MINUS_SRC_ALPHA), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this._premultiply), this._webGLContext.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a), this.updateViewport(this._viewportWidth || this.canvas.width, this._viewportHeight || this.canvas.height) } } else this._webGLContext = null; return this._webGLContext }, b.update = function (a) { if (this.canvas) { if (this.tickOnUpdate && this.tick(a), this.dispatchEvent("drawstart"), this.autoClear && this.clear(), this._webGLContext) this._batchDraw(this, this._webGLContext), -1 == this._autoPurge || this._drawID % (this._autoPurge / 2 | 0) || this.purgeTextures(this._autoPurge); else { var b = this.canvas.getContext("2d"); b.save(), this.updateContext(b), this.draw(b, !1), b.restore() } this.dispatchEvent("drawend") } }, b.clear = function () { if (this.canvas) if (a.isWebGLActive(this._webGLContext)) { var b = this._webGLContext, c = this._clearColor, d = this._transparent ? c.a : 1; this._webGLContext.clearColor(c.r * d, c.g * d, c.b * d, d), b.clear(b.COLOR_BUFFER_BIT), this._webGLContext.clearColor(c.r, c.g, c.b, c.a) } else this.Stage_clear() }, b.draw = function (b, c) { if (b === this._webGLContext && a.isWebGLActive(this._webGLContext)) { var d = this._webGLContext; return this._batchDraw(this, d, c), !0 } return this.Stage_draw(b, c) }, b.cacheDraw = function (b, c, d) { if (a.isWebGLActive(this._webGLContext)) { var e = this._webGLContext; return this._cacheDraw(e, b, c, d), !0 } return !1 }, b.protectTextureSlot = function (a, b) { if (a > this._maxTextureSlots || 0 > a) throw "Slot outside of acceptable range"; this._slotBlacklist[a] = !!b }, b.getTargetRenderTexture = function (a, b, c) { var d, e = !1, f = this._webGLContext; if (void 0 !== a.__lastRT && a.__lastRT === a.__rtA && (e = !0), e ? (void 0 === a.__rtB ? a.__rtB = this.getRenderBufferTexture(b, c) : ((b != a.__rtB._width || c != a.__rtB._height) && this.resizeTexture(a.__rtB, b, c), this.setTextureParams(f)), d = a.__rtB) : (void 0 === a.__rtA ? a.__rtA = this.getRenderBufferTexture(b, c) : ((b != a.__rtA._width || c != a.__rtA._height) && this.resizeTexture(a.__rtA, b, c), this.setTextureParams(f)), d = a.__rtA), !d) throw "Problems creating render textures, known causes include using too much VRAM by not releasing WebGL texture instances"; return a.__lastRT = d, d }, b.releaseTexture = function (a) { var b, c; if (a) { if (a.children) for (b = 0, c = a.children.length; c > b; b++)this.releaseTexture(a.children[b]); a.cacheCanvas && a.uncache(); var d = void 0; if (void 0 !== a._storeID) { if (a === this._textureDictionary[a._storeID]) return this._killTextureObject(a), void (a._storeID = void 0); d = a } else if (2 === a._webGLRenderStyle) d = a.image; else if (1 === a._webGLRenderStyle) { for (b = 0, c = a.spriteSheet._images.length; c > b; b++)this.releaseTexture(a.spriteSheet._images[b]); return } if (void 0 === d) return void (this.vocalDebug && console.log("No associated texture found on release")); this._killTextureObject(this._textureDictionary[d._storeID]), d._storeID = void 0 } }, b.purgeTextures = function (a) { void 0 == a && (a = 100); for (var b = this._textureDictionary, c = b.length, d = 0; c > d; d++) { var e = b[d]; e && e._drawID + a <= this._drawID && this._killTextureObject(e) } }, b.updateSimultaneousTextureCount = function (a) { var b = this._webGLContext, c = !1; for ((1 > a || isNaN(a)) && (a = 1), this._batchTextureCount = a; !c;)try { this._activeShader = this._fetchShaderProgram(b), c = !0 } catch (d) { if (1 == this._batchTextureCount) throw "Cannot compile shader " + d; this._batchTextureCount -= 4, this._batchTextureCount < 1 && (this._batchTextureCount = 1), this.vocalDebug && console.log("Reducing desired texture count due to errors: " + this._batchTextureCount) } }, b.updateViewport = function (a, b) { this._viewportWidth = 0 | a, this._viewportHeight = 0 | b; var c = this._webGLContext; c && (c.viewport(0, 0, this._viewportWidth, this._viewportHeight), this._projectionMatrix = new Float32Array([2 / this._viewportWidth, 0, 0, 0, 0, -2 / this._viewportHeight, 1, 0, 0, 0, 1, 0, -1, 1, .1, 0]), this._projectionMatrixFlip = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), this._projectionMatrixFlip.set(this._projectionMatrix), this._projectionMatrixFlip[5] *= -1, this._projectionMatrixFlip[13] *= -1) }, b.getFilterShader = function (a) { a || (a = this); var b = this._webGLContext, c = this._activeShader; if (a._builtShader) c = a._builtShader, a.shaderParamSetup && (b.useProgram(c), a.shaderParamSetup(b, this, c)); else try { c = this._fetchShaderProgram(b, "filter", a.VTX_SHADER_BODY, a.FRAG_SHADER_BODY, a.shaderParamSetup && a.shaderParamSetup.bind(a)), a._builtShader = c, c._name = a.toString() } catch (d) { console && console.log("SHADER SWITCH FAILURE", d) } return c }, b.getBaseTexture = function (a, b) { var c = Math.ceil(a > 0 ? a : 1) || 1, d = Math.ceil(b > 0 ? b : 1) || 1, e = this._webGLContext, f = e.createTexture(); return this.resizeTexture(f, c, d), this.setTextureParams(e, !1), f }, b.resizeTexture = function (a, b, c) { var d = this._webGLContext; d.bindTexture(d.TEXTURE_2D, a), d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, b, c, 0, d.RGBA, d.UNSIGNED_BYTE, null), a.width = b, a.height = c }, b.getRenderBufferTexture = function (a, b) { var c = this._webGLContext, d = this.getBaseTexture(a, b); if (!d) return null; var e = c.createFramebuffer(); return e ? (d.width = a, d.height = b, c.bindFramebuffer(c.FRAMEBUFFER, e), c.framebufferTexture2D(c.FRAMEBUFFER, c.COLOR_ATTACHMENT0, c.TEXTURE_2D, d, 0), e._renderTexture = d, d._frameBuffer = e, d._storeID = this._textureDictionary.length, this._textureDictionary[d._storeID] = d, c.bindFramebuffer(c.FRAMEBUFFER, null), d) : null }, b.setTextureParams = function (a, b) { b && this._antialias ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR)) : (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.NEAREST), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.NEAREST)), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE) }, b.setClearColor = function (a) {
        var b, c, d, e, f; "string" == typeof a ? 0 == a.indexOf("#") ? (4 == a.length && (a = "#" + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2) + a.charAt(3) + a.charAt(3)), b = Number("0x" + a.slice(1, 3)) / 255, c = Number("0x" + a.slice(3, 5)) / 255, d = Number("0x" + a.slice(5, 7)) / 255, e = Number("0x" + a.slice(7, 9)) / 255) : 0 == a.indexOf("rgba(") && (f = a.slice(5, -1).split(","), b = Number(f[0]) / 255, c = Number(f[1]) / 255, d = Number(f[2]) / 255, e = Number(f[3])) : (b = ((4278190080 & a) >>> 24) / 255, c = ((16711680 & a) >>> 16) / 255, d = ((65280 & a) >>> 8) / 255, e = (255 & a) / 255), this._clearColor.r = b || 0, this._clearColor.g = c || 0, this._clearColor.b = d || 0, this._clearColor.a = e || 0, this._webGLContext && this._webGLContext.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a);
    }, b.toString = function () { return "[StageGL (name=" + this.name + ")]" }, b._fetchWebGLContext = function (a, b) { var c; try { c = a.getContext("webgl", b) || a.getContext("experimental-webgl", b) } catch (d) { } if (c) c.viewportWidth = a.width, c.viewportHeight = a.height; else { var e = "Could not initialize WebGL"; console.error ? console.error(e) : console.log(e) } return c }, b._fetchShaderProgram = function (b, c, d, e, f) { b.useProgram(null); var g, h; switch (c) { case "filter": h = a.COVER_VERTEX_HEADER + (d || a.COVER_VERTEX_BODY), g = a.COVER_FRAGMENT_HEADER + (e || a.COVER_FRAGMENT_BODY); break; case "particle": h = a.REGULAR_VERTEX_HEADER + a.PARTICLE_VERTEX_BODY, g = a.REGULAR_FRAGMENT_HEADER + a.PARTICLE_FRAGMENT_BODY; break; case "override": h = a.REGULAR_VERTEX_HEADER + (d || a.REGULAR_VERTEX_BODY), g = a.REGULAR_FRAGMENT_HEADER + (e || a.REGULAR_FRAGMENT_BODY); break; case "regular": default: h = a.REGULAR_VERTEX_HEADER + a.REGULAR_VERTEX_BODY, g = a.REGULAR_FRAGMENT_HEADER + a.REGULAR_FRAGMENT_BODY }var i = this._createShader(b, b.VERTEX_SHADER, h), j = this._createShader(b, b.FRAGMENT_SHADER, g), k = b.createProgram(); if (b.attachShader(k, i), b.attachShader(k, j), b.linkProgram(k), k._type = c, !b.getProgramParameter(k, b.LINK_STATUS)) throw b.useProgram(this._activeShader), b.getProgramInfoLog(k); switch (b.useProgram(k), c) { case "filter": k.vertexPositionAttribute = b.getAttribLocation(k, "vertexPosition"), b.enableVertexAttribArray(k.vertexPositionAttribute), k.uvPositionAttribute = b.getAttribLocation(k, "uvPosition"), b.enableVertexAttribArray(k.uvPositionAttribute), k.samplerUniform = b.getUniformLocation(k, "uSampler"), b.uniform1i(k.samplerUniform, 0), k.uprightUniform = b.getUniformLocation(k, "uUpright"), b.uniform1f(k.uprightUniform, 0), f && f(b, this, k); break; case "override": case "particle": case "regular": default: k.vertexPositionAttribute = b.getAttribLocation(k, "vertexPosition"), b.enableVertexAttribArray(k.vertexPositionAttribute), k.uvPositionAttribute = b.getAttribLocation(k, "uvPosition"), b.enableVertexAttribArray(k.uvPositionAttribute), k.textureIndexAttribute = b.getAttribLocation(k, "textureIndex"), b.enableVertexAttribArray(k.textureIndexAttribute), k.alphaAttribute = b.getAttribLocation(k, "objectAlpha"), b.enableVertexAttribArray(k.alphaAttribute); for (var l = [], m = 0; m < this._batchTextureCount; m++)l[m] = m; k.samplerData = l, k.samplerUniform = b.getUniformLocation(k, "uSampler"), b.uniform1iv(k.samplerUniform, l), k.pMatrixUniform = b.getUniformLocation(k, "pMatrix") }return b.useProgram(this._activeShader), k }, b._createShader = function (b, c, d) { d = d.replace(/{{count}}/g, this._batchTextureCount); for (var e = "", f = 1; f < this._batchTextureCount; f++)e += "} else if (indexPicker <= " + f + ".5) { color = texture2D(uSampler[" + f + "], vTextureCoord);"; d = d.replace(/{{alternates}}/g, e), d = d.replace(/{{fragColor}}/g, this._premultiply ? a.REGULAR_FRAG_COLOR_PREMULTIPLY : a.REGULAR_FRAG_COLOR_NORMAL); var g = b.createShader(c); if (b.shaderSource(g, d), b.compileShader(g), !b.getShaderParameter(g, b.COMPILE_STATUS)) throw b.getShaderInfoLog(g); return g }, b._createBuffers = function (b) { var c, d, e, f = this._maxCardsPerBatch * a.INDICIES_PER_CARD, g = this._vertexPositionBuffer = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, g), c = 2; var h = this._vertices = new Float32Array(f * c); for (d = 0, e = h.length; e > d; d += c)h[d] = h[d + 1] = 0; b.bufferData(b.ARRAY_BUFFER, h, b.DYNAMIC_DRAW), g.itemSize = c, g.numItems = f; var i = this._uvPositionBuffer = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, i), c = 2; var j = this._uvs = new Float32Array(f * c); for (d = 0, e = j.length; e > d; d += c)j[d] = j[d + 1] = 0; b.bufferData(b.ARRAY_BUFFER, j, b.DYNAMIC_DRAW), i.itemSize = c, i.numItems = f; var k = this._textureIndexBuffer = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, k), c = 1; var l = this._indices = new Float32Array(f * c); for (d = 0, e = l.length; e > d; d++)l[d] = 0; b.bufferData(b.ARRAY_BUFFER, l, b.DYNAMIC_DRAW), k.itemSize = c, k.numItems = f; var m = this._alphaBuffer = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, m), c = 1; var n = this._alphas = new Float32Array(f * c); for (d = 0, e = n.length; e > d; d++)n[d] = 1; b.bufferData(b.ARRAY_BUFFER, n, b.DYNAMIC_DRAW), m.itemSize = c, m.numItems = f }, b._initTextures = function () { this._lastTextureInsert = -1, this._textureDictionary = [], this._textureIDs = {}, this._baseTextures = [], this._batchTextures = []; for (var a = 0; a < this._batchTextureCount; a++) { var b = this.getBaseTexture(); if (this._baseTextures[a] = this._batchTextures[a] = b, !b) throw "Problems creating basic textures, known causes include using too much VRAM by not releasing WebGL texture instances" } }, b._loadTextureImage = function (a, b) { var c = b.src; c || (b._isCanvas = !0, c = b.src = "canvas_" + this._lastTrackedCanvas++); var d = this._textureIDs[c]; void 0 === d && (d = this._textureIDs[c] = this._textureDictionary.length), void 0 === this._textureDictionary[d] && (this._textureDictionary[d] = this.getBaseTexture()); var e = this._textureDictionary[d]; if (e) e._batchID = this._batchID, e._storeID = d, e._imageData = b, this._insertTextureInBatch(a, e), b._storeID = d, b.complete || b.naturalWidth || b._isCanvas ? this._updateTextureImageData(a, b) : b.addEventListener("load", this._updateTextureImageData.bind(this, a, b)); else { var f = "Problem creating desired texture, known causes include using too much VRAM by not releasing WebGL texture instances"; console.error && console.error(f) || console.log(f), e = this._baseTextures[0], e._batchID = this._batchID, e._storeID = -1, e._imageData = e, this._insertTextureInBatch(a, e) } return e }, b._updateTextureImageData = function (a, b) { var c = b.width & b.width - 1 || b.height & b.height - 1, d = this._textureDictionary[b._storeID]; a.activeTexture(a.TEXTURE0 + d._activeIndex), a.bindTexture(a.TEXTURE_2D, d), d.isPOT = !c, this.setTextureParams(a, d.isPOT); try { a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b) } catch (e) { var f = "\nAn error has occurred. This is most likely due to security restrictions on WebGL images with local or cross-domain origins"; console.error ? (console.error(f), console.error(e)) : console && (console.log(f), console.log(e)) } b._invalid = !1, d._w = b.width, d._h = b.height, this.vocalDebug && (c && console.warn("NPOT(Non Power of Two) Texture: " + b.src), (b.width > a.MAX_TEXTURE_SIZE || b.height > a.MAX_TEXTURE_SIZE) && console && console.error("Oversized Texture: " + b.width + "x" + b.height + " vs " + a.MAX_TEXTURE_SIZE + "max")) }, b._insertTextureInBatch = function (a, b) { if (this._batchTextures[b._activeIndex] !== b) { var c = -1, d = (this._lastTextureInsert + 1) % this._batchTextureCount, e = d; do { if (this._batchTextures[e]._batchID != this._batchID && !this._slotBlacklist[e]) { c = e; break } e = (e + 1) % this._batchTextureCount } while (e !== d); -1 === c && (this.batchReason = "textureOverflow", this._drawBuffers(a), this.batchCardCount = 0, c = d), this._batchTextures[c] = b, b._activeIndex = c; var f = b._imageData; f && f._invalid && void 0 !== b._drawID ? this._updateTextureImageData(a, f) : (a.activeTexture(a.TEXTURE0 + c), a.bindTexture(a.TEXTURE_2D, b), this.setTextureParams(a)), this._lastTextureInsert = c } else { var f = b._imageData; void 0 != b._storeID && f && f._invalid && this._updateTextureImageData(a, f) } b._drawID = this._drawID, b._batchID = this._batchID }, b._killTextureObject = function (a) { if (a) { var b = this._webGLContext; if (void 0 !== a._storeID && a._storeID >= 0) { this._textureDictionary[a._storeID] = void 0; for (var c in this._textureIDs) this._textureIDs[c] == a._storeID && delete this._textureIDs[c]; a._imageData && (a._imageData._storeID = void 0), a._imageData = a._storeID = void 0 } void 0 !== a._activeIndex && this._batchTextures[a._activeIndex] === a && (this._batchTextures[a._activeIndex] = this._baseTextures[a._activeIndex]); try { a._frameBuffer && b.deleteFramebuffer(a._frameBuffer), a._frameBuffer = void 0 } catch (d) { this.vocalDebug && console.log(d) } try { b.deleteTexture(a) } catch (d) { this.vocalDebug && console.log(d) } } }, b._backupBatchTextures = function (a, b) { var c = this._webGLContext; this._backupTextures || (this._backupTextures = []), void 0 === b && (b = this._backupTextures); for (var d = 0; d < this._batchTextureCount; d++)c.activeTexture(c.TEXTURE0 + d), a ? this._batchTextures[d] = b[d] : (b[d] = this._batchTextures[d], this._batchTextures[d] = this._baseTextures[d]), c.bindTexture(c.TEXTURE_2D, this._batchTextures[d]), this.setTextureParams(c, this._batchTextures[d].isPOT); a && b === this._backupTextures && (this._backupTextures = []) }, b._batchDraw = function (a, b, c) { this._isDrawing > 0 && this._drawBuffers(b), this._isDrawing++, this._drawID++, this.batchCardCount = 0, this.depth = 0, this._appendToBatchGroup(a, b, new createjs.Matrix2D, this.alpha, c), this.batchReason = "drawFinish", this._drawBuffers(b), this._isDrawing-- }, b._cacheDraw = function (a, b, c, d) { var e, f = this._activeShader, g = this._slotBlacklist, h = this._maxTextureSlots - 1, i = this._viewportWidth, j = this._viewportHeight; this.protectTextureSlot(h, !0); var k = b.getMatrix(); k = k.clone(), k.scale(1 / d.scale, 1 / d.scale), k = k.invert(), k.translate(-d.offX / d.scale * b.scaleX, -d.offY / d.scale * b.scaleY); var l = this._cacheContainer; l.children = [b], l.transformMatrix = k, this._backupBatchTextures(!1), c && c.length ? this._drawFilters(b, c, d) : this.isCacheControlled ? (a.clear(a.COLOR_BUFFER_BIT), this._batchDraw(l, a, !0)) : (a.activeTexture(a.TEXTURE0 + h), b.cacheCanvas = this.getTargetRenderTexture(b, d._drawWidth, d._drawHeight), e = b.cacheCanvas, a.bindFramebuffer(a.FRAMEBUFFER, e._frameBuffer), this.updateViewport(d._drawWidth, d._drawHeight), this._projectionMatrix = this._projectionMatrixFlip, a.clear(a.COLOR_BUFFER_BIT), this._batchDraw(l, a, !0), a.bindFramebuffer(a.FRAMEBUFFER, null), this.updateViewport(i, j)), this._backupBatchTextures(!0), this.protectTextureSlot(h, !1), this._activeShader = f, this._slotBlacklist = g }, b._drawFilters = function (a, b, c) { var d, e = this._webGLContext, f = this._maxTextureSlots - 1, g = this._viewportWidth, h = this._viewportHeight, i = this._cacheContainer, j = b.length; e.activeTexture(e.TEXTURE0 + f), d = this.getTargetRenderTexture(a, c._drawWidth, c._drawHeight), e.bindFramebuffer(e.FRAMEBUFFER, d._frameBuffer), this.updateViewport(c._drawWidth, c._drawHeight), e.clear(e.COLOR_BUFFER_BIT), this._batchDraw(i, e, !0), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, d), this.setTextureParams(e); var k = !1, l = 0, m = b[l]; do this._activeShader = this.getFilterShader(m), this._activeShader && (e.activeTexture(e.TEXTURE0 + f), d = this.getTargetRenderTexture(a, c._drawWidth, c._drawHeight), e.bindFramebuffer(e.FRAMEBUFFER, d._frameBuffer), e.viewport(0, 0, c._drawWidth, c._drawHeight), e.clear(e.COLOR_BUFFER_BIT), this._drawCover(e, k), e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, d), this.setTextureParams(e), (j > 1 || b[0]._multiPass) && (k = !k), m = null !== m._multiPass ? m._multiPass : b[++l]); while (m); this.isCacheControlled ? (e.bindFramebuffer(e.FRAMEBUFFER, null), this.updateViewport(g, h), this._activeShader = this.getFilterShader(this), e.clear(e.COLOR_BUFFER_BIT), this._drawCover(e, k)) : (k && (e.activeTexture(e.TEXTURE0 + f), d = this.getTargetRenderTexture(a, c._drawWidth, c._drawHeight), e.bindFramebuffer(e.FRAMEBUFFER, d._frameBuffer), this._activeShader = this.getFilterShader(this), e.viewport(0, 0, c._drawWidth, c._drawHeight), e.clear(e.COLOR_BUFFER_BIT), this._drawCover(e, !k)), e.bindFramebuffer(e.FRAMEBUFFER, null), this.updateViewport(g, h), a.cacheCanvas = d) }, b._appendToBatchGroup = function (b, c, d, e, f) { b._glMtx || (b._glMtx = new createjs.Matrix2D); var g = b._glMtx; g.copy(d), b.transformMatrix ? g.appendMatrix(b.transformMatrix) : g.appendTransform(b.x, b.y, b.scaleX, b.scaleY, b.rotation, b.skewX, b.skewY, b.regX, b.regY); for (var h, i, j, k, l = b.children.length, m = 0; l > m; m++) { var n = b.children[m]; if (n.visible && e) if (n.cacheCanvas && !f || (n._updateState && n._updateState(), !n.children)) { this.batchCardCount + 1 > this._maxCardsPerBatch && (this.batchReason = "vertexOverflow", this._drawBuffers(c), this.batchCardCount = 0), n._glMtx || (n._glMtx = new createjs.Matrix2D); var o = n._glMtx; o.copy(g), n.transformMatrix ? o.appendMatrix(n.transformMatrix) : o.appendTransform(n.x, n.y, n.scaleX, n.scaleY, n.rotation, n.skewX, n.skewY, n.regX, n.regY); var p, q, r, s, t, u, v = n.cacheCanvas && !f; if (2 === n._webGLRenderStyle || v) r = (f ? !1 : n.cacheCanvas) || n.image; else { if (1 !== n._webGLRenderStyle) continue; if (s = n.spriteSheet.getFrame(n.currentFrame), null === s) continue; r = s.image } var w = this._uvs, x = this._vertices, y = this._indices, z = this._alphas; if (r) { if (void 0 === r._storeID) t = this._loadTextureImage(c, r), this._insertTextureInBatch(c, t); else { if (t = this._textureDictionary[r._storeID], !t) { this.vocalDebug && console.log("Texture should not be looked up while not being stored."); continue } t._batchID !== this._batchID && this._insertTextureInBatch(c, t) } if (q = t._activeIndex, 2 === n._webGLRenderStyle || v) !v && n.sourceRect ? (n._uvRect || (n._uvRect = {}), u = n.sourceRect, p = n._uvRect, p.t = u.y / r.height, p.l = u.x / r.width, p.b = (u.y + u.height) / r.height, p.r = (u.x + u.width) / r.width, h = 0, i = 0, j = u.width + h, k = u.height + i) : (p = a.UV_RECT, v ? (u = n.bitmapCache, h = u.x + u._filterOffX / u.scale, i = u.y + u._filterOffY / u.scale, j = u._drawWidth / u.scale + h, k = u._drawHeight / u.scale + i) : (h = 0, i = 0, j = r.width + h, k = r.height + i)); else if (1 === n._webGLRenderStyle) { var A = s.rect; p = s.uvRect, p || (p = a.buildUVRects(n.spriteSheet, n.currentFrame, !1)), h = -s.regX, i = -s.regY, j = A.width - s.regX, k = A.height - s.regY } var B = this.batchCardCount * a.INDICIES_PER_CARD, C = 2 * B; x[C] = h * o.a + i * o.c + o.tx, x[C + 1] = h * o.b + i * o.d + o.ty, x[C + 2] = h * o.a + k * o.c + o.tx, x[C + 3] = h * o.b + k * o.d + o.ty, x[C + 4] = j * o.a + i * o.c + o.tx, x[C + 5] = j * o.b + i * o.d + o.ty, x[C + 6] = x[C + 2], x[C + 7] = x[C + 3], x[C + 8] = x[C + 4], x[C + 9] = x[C + 5], x[C + 10] = j * o.a + k * o.c + o.tx, x[C + 11] = j * o.b + k * o.d + o.ty, w[C] = p.l, w[C + 1] = p.t, w[C + 2] = p.l, w[C + 3] = p.b, w[C + 4] = p.r, w[C + 5] = p.t, w[C + 6] = p.l, w[C + 7] = p.b, w[C + 8] = p.r, w[C + 9] = p.t, w[C + 10] = p.r, w[C + 11] = p.b, y[B] = y[B + 1] = y[B + 2] = y[B + 3] = y[B + 4] = y[B + 5] = q, z[B] = z[B + 1] = z[B + 2] = z[B + 3] = z[B + 4] = z[B + 5] = n.alpha * e, this.batchCardCount++ } } else this._appendToBatchGroup(n, c, g, n.alpha * e) } }, b._drawBuffers = function (b) { if (!(this.batchCardCount <= 0)) { this.vocalDebug && console.log("Draw[" + this._drawID + ":" + this._batchID + "] : " + this.batchReason); var c = this._activeShader, d = this._vertexPositionBuffer, e = this._textureIndexBuffer, f = this._uvPositionBuffer, g = this._alphaBuffer; b.useProgram(c), b.bindBuffer(b.ARRAY_BUFFER, d), b.vertexAttribPointer(c.vertexPositionAttribute, d.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, this._vertices), b.bindBuffer(b.ARRAY_BUFFER, e), b.vertexAttribPointer(c.textureIndexAttribute, e.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, this._indices), b.bindBuffer(b.ARRAY_BUFFER, f), b.vertexAttribPointer(c.uvPositionAttribute, f.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, this._uvs), b.bindBuffer(b.ARRAY_BUFFER, g), b.vertexAttribPointer(c.alphaAttribute, g.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, this._alphas), b.uniformMatrix4fv(c.pMatrixUniform, b.FALSE, this._projectionMatrix); for (var h = 0; h < this._batchTextureCount; h++) { var i = this._batchTextures[h]; b.activeTexture(b.TEXTURE0 + h), b.bindTexture(b.TEXTURE_2D, i), this.setTextureParams(b, i.isPOT) } b.drawArrays(b.TRIANGLES, 0, this.batchCardCount * a.INDICIES_PER_CARD), this._batchID++ } }, b._drawCover = function (b, c) { this._isDrawing > 0 && this._drawBuffers(b), this.vocalDebug && console.log("Draw[" + this._drawID + ":" + this._batchID + "] : Cover"); var d = this._activeShader, e = this._vertexPositionBuffer, f = this._uvPositionBuffer; b.clear(b.COLOR_BUFFER_BIT), b.useProgram(d), b.bindBuffer(b.ARRAY_BUFFER, e), b.vertexAttribPointer(d.vertexPositionAttribute, e.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, a.COVER_VERT), b.bindBuffer(b.ARRAY_BUFFER, f), b.vertexAttribPointer(d.uvPositionAttribute, f.itemSize, b.FLOAT, !1, 0, 0), b.bufferSubData(b.ARRAY_BUFFER, 0, c ? a.COVER_UV_FLIP : a.COVER_UV), b.uniform1i(d.samplerUniform, 0), b.uniform1f(d.uprightUniform, c ? 0 : 1), b.drawArrays(b.TRIANGLES, 0, a.INDICIES_PER_CARD) }, createjs.StageGL = createjs.promote(a, "Stage")
}(), this.createjs = this.createjs || {}, function () { function a(a) { this.DisplayObject_constructor(), "string" == typeof a ? (this.image = document.createElement("img"), this.image.src = a) : this.image = a, this.sourceRect = null, this._webGLRenderStyle = createjs.DisplayObject._StageGL_BITMAP } var b = createjs.extend(a, createjs.DisplayObject); b.initialize = a, b.isVisible = function () { var a = this.image, b = this.cacheCanvas || a && (a.naturalWidth || a.getContext || a.readyState >= 2); return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && b) }, b.draw = function (a, b) { if (this.DisplayObject_draw(a, b)) return !0; var c = this.image, d = this.sourceRect; if (c.getImage && (c = c.getImage()), !c) return !0; if (d) { var e = d.x, f = d.y, g = e + d.width, h = f + d.height, i = 0, j = 0, k = c.width, l = c.height; 0 > e && (i -= e, e = 0), g > k && (g = k), 0 > f && (j -= f, f = 0), h > l && (h = l), a.drawImage(c, e, f, g - e, h - f, i, j, g - e, h - f) } else a.drawImage(c, 0, 0); return !0 }, b.getBounds = function () { var a = this.DisplayObject_getBounds(); if (a) return a; var b = this.image, c = this.sourceRect || b, d = b && (b.naturalWidth || b.getContext || b.readyState >= 2); return d ? this._rectangle.setValues(0, 0, c.width, c.height) : null }, b.clone = function (b) { var c = this.image; c && b && (c = c.cloneNode()); var d = new a(c); return this.sourceRect && (d.sourceRect = this.sourceRect.clone()), this._cloneProps(d), d }, b.toString = function () { return "[Bitmap (name=" + this.name + ")]" }, createjs.Bitmap = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.DisplayObject_constructor(), this.currentFrame = 0, this.currentAnimation = null, this.paused = !0, this.spriteSheet = a, this.currentAnimationFrame = 0, this.framerate = 0, this._animation = null, this._currentFrame = null, this._skipAdvance = !1, this._webGLRenderStyle = createjs.DisplayObject._StageGL_SPRITE, null != b && this.gotoAndPlay(b) } var b = createjs.extend(a, createjs.DisplayObject); b.initialize = a, b.isVisible = function () { var a = this.cacheCanvas || this.spriteSheet.complete; return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a) }, b.draw = function (a, b) { if (this.DisplayObject_draw(a, b)) return !0; this._normalizeFrame(); var c = this.spriteSheet.getFrame(0 | this._currentFrame); if (!c) return !1; var d = c.rect; return d.width && d.height && a.drawImage(c.image, d.x, d.y, d.width, d.height, -c.regX, -c.regY, d.width, d.height), !0 }, b.play = function () { this.paused = !1 }, b.stop = function () { this.paused = !0 }, b.gotoAndPlay = function (a) { this.paused = !1, this._skipAdvance = !0, this._goto(a) }, b.gotoAndStop = function (a) { this.paused = !0, this._goto(a) }, b.advance = function (a) { var b = this.framerate || this.spriteSheet.framerate, c = b && null != a ? a / (1e3 / b) : 1; this._normalizeFrame(c) }, b.getBounds = function () { return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle) }, b.clone = function () { return this._cloneProps(new a(this.spriteSheet)) }, b.toString = function () { return "[Sprite (name=" + this.name + ")]" }, b._cloneProps = function (a) { return this.DisplayObject__cloneProps(a), a.currentFrame = this.currentFrame, a.currentAnimation = this.currentAnimation, a.paused = this.paused, a.currentAnimationFrame = this.currentAnimationFrame, a.framerate = this.framerate, a._animation = this._animation, a._currentFrame = this._currentFrame, a._skipAdvance = this._skipAdvance, a }, b._tick = function (a) { this.paused || (this._skipAdvance || this.advance(a && a.delta), this._skipAdvance = !1), this.DisplayObject__tick(a) }, b._normalizeFrame = function (a) { a = a || 0; var b, c = this._animation, d = this.paused, e = this._currentFrame; if (c) { var f = c.speed || 1, g = this.currentAnimationFrame; if (b = c.frames.length, g + a * f >= b) { var h = c.next; if (this._dispatchAnimationEnd(c, e, d, h, b - 1)) return; if (h) return this._goto(h, a - (b - g) / f); this.paused = !0, g = c.frames.length - 1 } else g += a * f; this.currentAnimationFrame = g, this._currentFrame = c.frames[0 | g] } else if (e = this._currentFrame += a, b = this.spriteSheet.getNumFrames(), e >= b && b > 0 && !this._dispatchAnimationEnd(c, e, d, b - 1) && (this._currentFrame -= b) >= b) return this._normalizeFrame(); e = 0 | this._currentFrame, this.currentFrame != e && (this.currentFrame = e, this.dispatchEvent("change")) }, b._dispatchAnimationEnd = function (a, b, c, d, e) { var f = a ? a.name : null; if (this.hasEventListener("animationend")) { var g = new createjs.Event("animationend"); g.name = f, g.next = d, this.dispatchEvent(g) } var h = this._animation != a || this._currentFrame != b; return h || c || !this.paused || (this.currentAnimationFrame = e, h = !0), h }, b._goto = function (a, b) { if (this.currentAnimationFrame = 0, isNaN(a)) { var c = this.spriteSheet.getAnimation(a); c && (this._animation = c, this.currentAnimation = a, this._normalizeFrame(b)) } else this.currentAnimation = this._animation = null, this._currentFrame = a, this._normalizeFrame() }, createjs.Sprite = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.DisplayObject_constructor(), this.graphics = a ? a : new createjs.Graphics } var b = createjs.extend(a, createjs.DisplayObject); b.isVisible = function () { var a = this.cacheCanvas || this.graphics && !this.graphics.isEmpty(); return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a) }, b.draw = function (a, b) { return this.DisplayObject_draw(a, b) ? !0 : (this.graphics.draw(a, this), !0) }, b.clone = function (b) { var c = b && this.graphics ? this.graphics.clone() : this.graphics; return this._cloneProps(new a(c)) }, b.toString = function () { return "[Shape (name=" + this.name + ")]" }, createjs.Shape = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.DisplayObject_constructor(), this.text = a, this.font = b, this.color = c, this.textAlign = "left", this.textBaseline = "top", this.maxWidth = null, this.outline = 0, this.lineHeight = 0, this.lineWidth = null } var b = createjs.extend(a, createjs.DisplayObject), c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); c.getContext && (a._workingContext = c.getContext("2d"), c.width = c.height = 1), a.H_OFFSETS = { start: 0, left: 0, center: -.5, end: -1, right: -1 }, a.V_OFFSETS = { top: 0, hanging: -.01, middle: -.4, alphabetic: -.8, ideographic: -.85, bottom: -1 }, b.isVisible = function () { var a = this.cacheCanvas || null != this.text && "" !== this.text; return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY && a) }, b.draw = function (a, b) { if (this.DisplayObject_draw(a, b)) return !0; var c = this.color || "#000"; return this.outline ? (a.strokeStyle = c, a.lineWidth = 1 * this.outline) : a.fillStyle = c, this._drawText(this._prepContext(a)), !0 }, b.getMeasuredWidth = function () { return this._getMeasuredWidth(this.text) }, b.getMeasuredLineHeight = function () { return 1.2 * this._getMeasuredWidth("M") }, b.getMeasuredHeight = function () { return this._drawText(null, {}).height }, b.getBounds = function () { var b = this.DisplayObject_getBounds(); if (b) return b; if (null == this.text || "" === this.text) return null; var c = this._drawText(null, {}), d = this.maxWidth && this.maxWidth < c.width ? this.maxWidth : c.width, e = d * a.H_OFFSETS[this.textAlign || "left"], f = this.lineHeight || this.getMeasuredLineHeight(), g = f * a.V_OFFSETS[this.textBaseline || "top"]; return this._rectangle.setValues(e, g, d, c.height) }, b.getMetrics = function () { var b = { lines: [] }; return b.lineHeight = this.lineHeight || this.getMeasuredLineHeight(), b.vOffset = b.lineHeight * a.V_OFFSETS[this.textBaseline || "top"], this._drawText(null, b, b.lines) }, b.clone = function () { return this._cloneProps(new a(this.text, this.font, this.color)) }, b.toString = function () { return "[Text (text=" + (this.text.length > 20 ? this.text.substr(0, 17) + "..." : this.text) + ")]" }, b._cloneProps = function (a) { return this.DisplayObject__cloneProps(a), a.textAlign = this.textAlign, a.textBaseline = this.textBaseline, a.maxWidth = this.maxWidth, a.outline = this.outline, a.lineHeight = this.lineHeight, a.lineWidth = this.lineWidth, a }, b._prepContext = function (a) { return a.font = this.font || "10px sans-serif", a.textAlign = this.textAlign || "left", a.textBaseline = this.textBaseline || "top", a.lineJoin = "miter", a.miterLimit = 2.5, a }, b._drawText = function (b, c, d) { var e = !!b; e || (b = a._workingContext, b.save(), this._prepContext(b)); for (var f = this.lineHeight || this.getMeasuredLineHeight(), g = 0, h = 0, i = String(this.text).split(/(?:\r\n|\r|\n)/), j = 0, k = i.length; k > j; j++) { var l = i[j], m = null; if (null != this.lineWidth && (m = b.measureText(l).width) > this.lineWidth) { var n = l.split(/(\s)/); l = n[0], m = b.measureText(l).width; for (var o = 1, p = n.length; p > o; o += 2) { var q = b.measureText(n[o] + n[o + 1]).width; m + q > this.lineWidth ? (e && this._drawTextLine(b, l, h * f), d && d.push(l), m > g && (g = m), l = n[o + 1], m = b.measureText(l).width, h++) : (l += n[o] + n[o + 1], m += q) } } e && this._drawTextLine(b, l, h * f), d && d.push(l), c && null == m && (m = b.measureText(l).width), m > g && (g = m), h++ } return c && (c.width = g, c.height = h * f), e || b.restore(), c }, b._drawTextLine = function (a, b, c) { this.outline ? a.strokeText(b, 0, c, this.maxWidth || 65535) : a.fillText(b, 0, c, this.maxWidth || 65535) }, b._getMeasuredWidth = function (b) { var c = a._workingContext; c.save(); var d = this._prepContext(c).measureText(b).width; return c.restore(), d }, createjs.Text = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.Container_constructor(), this.text = a || "", this.spriteSheet = b, this.lineHeight = 0, this.letterSpacing = 0, this.spaceWidth = 0, this._oldProps = { text: 0, spriteSheet: 0, lineHeight: 0, letterSpacing: 0, spaceWidth: 0 }, this._oldStage = null, this._drawAction = null } var b = createjs.extend(a, createjs.Container); a.maxPoolSize = 100, a._spritePool = [], b.draw = function (a, b) { this.DisplayObject_draw(a, b) || (this._updateState(), this.Container_draw(a, b)) }, b.getBounds = function () { return this._updateText(), this.Container_getBounds() }, b.isVisible = function () { var a = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete && this.text; return !!(this.visible && this.alpha > 0 && 0 !== this.scaleX && 0 !== this.scaleY && a) }, b.clone = function () { return this._cloneProps(new a(this.text, this.spriteSheet)) }, b.addChild = b.addChildAt = b.removeChild = b.removeChildAt = b.removeAllChildren = function () { }, b._updateState = function () { this._updateText() }, b._cloneProps = function (a) { return this.Container__cloneProps(a), a.lineHeight = this.lineHeight, a.letterSpacing = this.letterSpacing, a.spaceWidth = this.spaceWidth, a }, b._getFrameIndex = function (a, b) { var c, d = b.getAnimation(a); return d || (a != (c = a.toUpperCase()) || a != (c = a.toLowerCase()) || (c = null), c && (d = b.getAnimation(c))), d && d.frames[0] }, b._getFrame = function (a, b) { var c = this._getFrameIndex(a, b); return null == c ? c : b.getFrame(c) }, b._getLineHeight = function (a) { var b = this._getFrame("1", a) || this._getFrame("T", a) || this._getFrame("L", a) || a.getFrame(0); return b ? b.rect.height : 1 }, b._getSpaceWidth = function (a) { var b = this._getFrame("1", a) || this._getFrame("l", a) || this._getFrame("e", a) || this._getFrame("a", a) || a.getFrame(0); return b ? b.rect.width : 1 }, b._updateText = function () { var b, c = 0, d = 0, e = this._oldProps, f = !1, g = this.spaceWidth, h = this.lineHeight, i = this.spriteSheet, j = a._spritePool, k = this.children, l = 0, m = k.length; for (var n in e) e[n] != this[n] && (e[n] = this[n], f = !0); if (f) { var o = !!this._getFrame(" ", i); o || g || (g = this._getSpaceWidth(i)), h || (h = this._getLineHeight(i)); for (var p = 0, q = this.text.length; q > p; p++) { var r = this.text.charAt(p); if (" " != r || o) if ("\n" != r && "\r" != r) { var s = this._getFrameIndex(r, i); null != s && (m > l ? b = k[l] : (k.push(b = j.length ? j.pop() : new createjs.Sprite), b.parent = this, m++), b.spriteSheet = i, b.gotoAndStop(s), b.x = c, b.y = d, l++, c += b.getBounds().width + this.letterSpacing) } else "\r" == r && "\n" == this.text.charAt(p + 1) && p++, c = 0, d += h; else c += g } for (; m > l;)j.push(b = k.pop()), b.parent = null, m--; j.length > a.maxPoolSize && (j.length = a.maxPoolSize) } }, createjs.BitmapText = createjs.promote(a, "Container") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(b) { this.Container_constructor(), !a.inited && a.init(); var c, d, e, f; b instanceof String || arguments.length > 1 ? (c = b, d = arguments[1], e = arguments[2], f = arguments[3], null == e && (e = -1), b = null) : b && (c = b.mode, d = b.startPosition, e = b.loop, f = b.labels), b || (b = { labels: f }), this.mode = c || a.INDEPENDENT, this.startPosition = d || 0, this.loop = e === !0 ? -1 : e || 0, this.currentFrame = 0, this.paused = b.paused || !1, this.actionsEnabled = !0, this.autoReset = !0, this.frameBounds = this.frameBounds || b.frameBounds, this.framerate = null, b.useTicks = b.paused = !0, this.timeline = new createjs.Timeline(b), this._synchOffset = 0, this._rawPosition = -1, this._bound_resolveState = this._resolveState.bind(this), this._t = 0, this._managed = {} } function b() { throw "MovieClipPlugin cannot be instantiated." } var c = createjs.extend(a, createjs.Container); a.INDEPENDENT = "independent", a.SINGLE_FRAME = "single", a.SYNCHED = "synched", a.inited = !1, a.init = function () { a.inited || (b.install(), a.inited = !0) }, c._getLabels = function () { return this.timeline.getLabels() }, c.getLabels = createjs.deprecate(c._getLabels, "MovieClip.getLabels"), c._getCurrentLabel = function () { return this.timeline.currentLabel }, c.getCurrentLabel = createjs.deprecate(c._getCurrentLabel, "MovieClip.getCurrentLabel"), c._getDuration = function () { return this.timeline.duration }, c.getDuration = createjs.deprecate(c._getDuration, "MovieClip.getDuration"); try { Object.defineProperties(c, { labels: { get: c._getLabels }, currentLabel: { get: c._getCurrentLabel }, totalFrames: { get: c._getDuration }, duration: { get: c._getDuration } }) } catch (d) { } c.initialize = a, c.isVisible = function () { return !!(this.visible && this.alpha > 0 && 0 != this.scaleX && 0 != this.scaleY) }, c.draw = function (a, b) { return this.DisplayObject_draw(a, b) ? !0 : (this._updateState(), this.Container_draw(a, b), !0) }, c.play = function () { this.paused = !1 }, c.stop = function () { this.paused = !0 }, c.gotoAndPlay = function (a) { this.paused = !1, this._goto(a) }, c.gotoAndStop = function (a) { this.paused = !0, this._goto(a) }, c.advance = function (b) { var c = a.INDEPENDENT; if (this.mode === c) { for (var d = this, e = d.framerate; (d = d.parent) && null === e;)d.mode === c && (e = d._framerate); if (this._framerate = e, !this.paused) { var f = null !== e && -1 !== e && null !== b ? b / (1e3 / e) + this._t : 1, g = 0 | f; for (this._t = f - g; g--;)this._updateTimeline(this._rawPosition + 1, !1) } } }, c.clone = function () { throw "MovieClip cannot be cloned." }, c.toString = function () { return "[MovieClip (name=" + this.name + ")]" }, c._updateState = function () { (-1 === this._rawPosition || this.mode !== a.INDEPENDENT) && this._updateTimeline(-1) }, c._tick = function (a) { this.advance(a && a.delta), this.Container__tick(a) }, c._goto = function (a) { var b = this.timeline.resolve(a); null != b && (this._t = 0, this._updateTimeline(b, !0)) }, c._reset = function () { this._rawPosition = -1, this._t = this.currentFrame = 0, this.paused = !1 }, c._updateTimeline = function (b, c) { var d = this.mode !== a.INDEPENDENT, e = this.timeline; d && (b = this.startPosition + (this.mode === a.SINGLE_FRAME ? 0 : this._synchOffset)), 0 > b && (b = 0), (this._rawPosition !== b || d) && (this._rawPosition = b, e.loop = this.loop, e.setPosition(b, d || !this.actionsEnabled, c, this._bound_resolveState)) }, c._renderFirstFrame = function () { var a = this.timeline, b = a.rawPosition; a.setPosition(0, !0, !0, this._bound_resolveState), a.rawPosition = b }, c._resolveState = function () { var a = this.timeline; this.currentFrame = a.position; for (var b in this._managed) this._managed[b] = 1; for (var c = a.tweens, d = 0, e = c.length; e > d; d++) { var f = c[d], g = f.target; if (g !== this && !f.passive) { var h = f._stepPosition; g instanceof createjs.DisplayObject ? this._addManagedChild(g, h) : this._setState(g.state, h) } } var i = this.children; for (d = i.length - 1; d >= 0; d--) { var j = i[d].id; 1 === this._managed[j] && (this.removeChildAt(d), delete this._managed[j]) } }, c._setState = function (a, b) { if (a) for (var c = a.length - 1; c >= 0; c--) { var d = a[c], e = d.t, f = d.p; for (var g in f) e[g] = f[g]; this._addManagedChild(e, b) } }, c._addManagedChild = function (b, c) { b._off || (this.addChildAt(b, 0), b instanceof a && (b._synchOffset = c, b.mode === a.INDEPENDENT && b.autoReset && !this._managed[b.id] && b._reset()), this._managed[b.id] = 2) }, c._getBounds = function (a, b) { var c = this.DisplayObject_getBounds(); return c || this.frameBounds && (c = this._rectangle.copy(this.frameBounds[this.currentFrame])), c ? this._transformBounds(c, a, b) : this.Container__getBounds(a, b) }, createjs.MovieClip = createjs.promote(a, "Container"), b.priority = 100, b.ID = "MovieClip", b.install = function () { createjs.Tween._installPlugin(b) }, b.init = function (c, d, e) { "startPosition" === d && c.target instanceof a && c._addPlugin(b) }, b.step = function (a, b, c) { }, b.change = function (a, b, c, d, e, f) { return "startPosition" === c ? 1 === e ? b.props[c] : b.prev.props[c] : void 0 } }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a() { throw "SpriteSheetUtils cannot be instantiated" } var b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); b.getContext && (a._workingCanvas = b, a._workingContext = b.getContext("2d"), b.width = b.height = 1), a.extractFrame = function (b, c) { isNaN(c) && (c = b.getAnimation(c).frames[0]); var d = b.getFrame(c); if (!d) return null; var e = d.rect, f = a._workingCanvas; f.width = e.width, f.height = e.height, a._workingContext.drawImage(d.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height); var g = document.createElement("img"); return g.src = f.toDataURL("image/png"), g }, a.addFlippedFrames = createjs.deprecate(null, "SpriteSheetUtils.addFlippedFrames"), a.mergeAlpha = createjs.deprecate(null, "SpriteSheetUtils.mergeAlpha"), a._flip = function (b, c, d, e) {
        for (var f = b._images, g = a._workingCanvas, h = a._workingContext, i = f.length / c, j = 0; i > j; j++) {
            var k = f[j]; k.__tmp = j, h.setTransform(1, 0, 0, 1, 0, 0), h.clearRect(0, 0, g.width + 1, g.height + 1), g.width = k.width, g.height = k.height, h.setTransform(d ? -1 : 1, 0, 0, e ? -1 : 1, d ? k.width : 0, e ? k.height : 0), h.drawImage(k, 0, 0); var l = document.createElement("img"); l.src = g.toDataURL("image/png"), l.width = k.width || k.naturalWidth, l.height = k.height || k.naturalHeight,
                f.push(l)
        } var m = b._frames, n = m.length / c; for (j = 0; n > j; j++) { k = m[j]; var o = k.rect.clone(); l = f[k.image.__tmp + i * c]; var p = { image: l, rect: o, regX: k.regX, regY: k.regY }; d && (o.x = (l.width || l.naturalWidth) - o.x - o.width, p.regX = o.width - k.regX), e && (o.y = (l.height || l.naturalHeight) - o.y - o.height, p.regY = o.height - k.regY), m.push(p) } var q = "_" + (d ? "h" : "") + (e ? "v" : ""), r = b._animations, s = b._data, t = r.length / c; for (j = 0; t > j; j++) { var u = r[j]; k = s[u]; var v = { name: u + q, speed: k.speed, next: k.next, frames: [] }; k.next && (v.next += q), m = k.frames; for (var w = 0, x = m.length; x > w; w++)v.frames.push(m[w] + n * c); s[v.name] = v, r.push(v.name) }
    }, createjs.SpriteSheetUtils = a
}(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.EventDispatcher_constructor(), this.maxWidth = 2048, this.maxHeight = 2048, this.spriteSheet = null, this.scale = 1, this.padding = 1, this.timeSlice = .3, this.progress = -1, this.framerate = a || 0, this._frames = [], this._animations = {}, this._data = null, this._nextFrameIndex = 0, this._index = 0, this._timerID = null, this._scale = 1 } var b = createjs.extend(a, createjs.EventDispatcher); a.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions", a.ERR_RUNNING = "a build is already running", b.addFrame = function (b, c, d, e, f) { if (this._data) throw a.ERR_RUNNING; var g = c || b.bounds || b.nominalBounds; return !g && b.getBounds && (g = b.getBounds()), g ? (d = d || 1, this._frames.push({ source: b, sourceRect: g, scale: d, funct: e, data: f, index: this._frames.length, height: g.height * d }) - 1) : null }, b.addAnimation = function (b, c, d, e) { if (this._data) throw a.ERR_RUNNING; this._animations[b] = { frames: c, next: d, speed: e } }, b.addMovieClip = function (b, c, d, e, f, g) { if (this._data) throw a.ERR_RUNNING; var h = b.frameBounds, i = c || b.bounds || b.nominalBounds; if (!i && b.getBounds && (i = b.getBounds()), i || h) { var j, k, l = this._frames.length, m = b.timeline.duration; for (j = 0; m > j; j++) { var n = h && h[j] ? h[j] : i; this.addFrame(b, n, d, this._setupMovieClipFrame, { i: j, f: e, d: f }) } var o = b.timeline._labels, p = []; for (var q in o) p.push({ index: o[q], label: q }); if (p.length) for (p.sort(function (a, b) { return a.index - b.index }), j = 0, k = p.length; k > j; j++) { for (var r = p[j].label, s = l + p[j].index, t = l + (j == k - 1 ? m : p[j + 1].index), u = [], v = s; t > v; v++)u.push(v); (!g || (r = g(r, b, s, t))) && this.addAnimation(r, u, !0) } } }, b.build = function () { if (this._data) throw a.ERR_RUNNING; for (this._startBuild(); this._drawNext();); return this._endBuild(), this.spriteSheet }, b.buildAsync = function (b) { if (this._data) throw a.ERR_RUNNING; this.timeSlice = b, this._startBuild(); var c = this; this._timerID = setTimeout(function () { c._run() }, 50 - 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3))) }, b.stopAsync = function () { clearTimeout(this._timerID), this._data = null }, b.clone = function () { throw "SpriteSheetBuilder cannot be cloned." }, b.toString = function () { return "[SpriteSheetBuilder]" }, b._startBuild = function () { var b = this.padding || 0; this.progress = 0, this.spriteSheet = null, this._index = 0, this._scale = this.scale; var c = []; this._data = { images: [], frames: c, framerate: this.framerate, animations: this._animations }; var d = this._frames.slice(); if (d.sort(function (a, b) { return a.height <= b.height ? -1 : 1 }), d[d.length - 1].height + 2 * b > this.maxHeight) throw a.ERR_DIMENSIONS; for (var e = 0, f = 0, g = 0; d.length;) { var h = this._fillRow(d, e, g, c, b); if (h.w > f && (f = h.w), e += h.h, !h.h || !d.length) { var i = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); i.width = this._getSize(f, this.maxWidth), i.height = this._getSize(e, this.maxHeight), this._data.images[g] = i, h.h || (f = e = 0, g++) } } }, b._setupMovieClipFrame = function (a, b) { var c = a.actionsEnabled; a.actionsEnabled = !1, a.gotoAndStop(b.i), a.actionsEnabled = c, b.f && b.f(a, b.d, b.i) }, b._getSize = function (a, b) { for (var c = 4; Math.pow(2, ++c) < a;); return Math.min(b, Math.pow(2, c)) }, b._fillRow = function (b, c, d, e, f) { var g = this.maxWidth, h = this.maxHeight; c += f; for (var i = h - c, j = f, k = 0, l = b.length - 1; l >= 0; l--) { var m = b[l], n = this._scale * m.scale, o = m.sourceRect, p = m.source, q = Math.floor(n * o.x - f), r = Math.floor(n * o.y - f), s = Math.ceil(n * o.height + 2 * f), t = Math.ceil(n * o.width + 2 * f); if (t > g) throw a.ERR_DIMENSIONS; s > i || j + t > g || (m.img = d, m.rect = new createjs.Rectangle(j, c, t, s), k = k || s, b.splice(l, 1), e[m.index] = [j, c, t, s, d, Math.round(-q + n * p.regX - f), Math.round(-r + n * p.regY - f)], j += t) } return { w: j, h: k } }, b._endBuild = function () { this.spriteSheet = new createjs.SpriteSheet(this._data), this._data = null, this.progress = 1, this.dispatchEvent("complete") }, b._run = function () { for (var a = 50 * Math.max(.01, Math.min(.99, this.timeSlice || .3)), b = (new Date).getTime() + a, c = !1; b > (new Date).getTime();)if (!this._drawNext()) { c = !0; break } if (c) this._endBuild(); else { var d = this; this._timerID = setTimeout(function () { d._run() }, 50 - a) } var e = this.progress = this._index / this._frames.length; if (this.hasEventListener("progress")) { var f = new createjs.Event("progress"); f.progress = e, this.dispatchEvent(f) } }, b._drawNext = function () { var a = this._frames[this._index], b = a.scale * this._scale, c = a.rect, d = a.sourceRect, e = this._data.images[a.img], f = e.getContext("2d"); return a.funct && a.funct(a.source, a.data), f.save(), f.beginPath(), f.rect(c.x, c.y, c.width, c.height), f.clip(), f.translate(Math.ceil(c.x - d.x * b), Math.ceil(c.y - d.y * b)), f.scale(b, b), a.source.draw(f), f.restore(), ++this._index < this._frames.length }, createjs.SpriteSheetBuilder = createjs.promote(a, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.DisplayObject_constructor(), "string" == typeof a && (a = document.getElementById(a)), this.mouseEnabled = !1; var b = a.style; b.position = "absolute", b.transformOrigin = b.WebkitTransformOrigin = b.msTransformOrigin = b.MozTransformOrigin = b.OTransformOrigin = "0% 0%", this.htmlElement = a, this._oldProps = null, this._oldStage = null, this._drawAction = null } var b = createjs.extend(a, createjs.DisplayObject); b.isVisible = function () { return null != this.htmlElement }, b.draw = function (a, b) { return !0 }, b.cache = function () { }, b.uncache = function () { }, b.updateCache = function () { }, b.hitTest = function () { }, b.localToGlobal = function () { }, b.globalToLocal = function () { }, b.localToLocal = function () { }, b.clone = function () { throw "DOMElement cannot be cloned." }, b.toString = function () { return "[DOMElement (name=" + this.name + ")]" }, b._tick = function (a) { var b = this.stage; b && b !== this._oldStage && (this._drawAction && b.off("drawend", this._drawAction), this._drawAction = b.on("drawend", this._handleDrawEnd, this), this._oldStage = b), this.DisplayObject__tick(a) }, b._handleDrawEnd = function (a) { var b = this.htmlElement; if (b) { var c = b.style, d = this.getConcatenatedDisplayProps(this._props), e = d.matrix, f = d.visible ? "visible" : "hidden"; if (f != c.visibility && (c.visibility = f), d.visible) { var g = this._oldProps, h = g && g.matrix, i = 1e4; if (!h || !h.equals(e)) { var j = "matrix(" + (e.a * i | 0) / i + "," + (e.b * i | 0) / i + "," + (e.c * i | 0) / i + "," + (e.d * i | 0) / i + "," + (e.tx + .5 | 0); c.transform = c.WebkitTransform = c.OTransform = c.msTransform = j + "," + (e.ty + .5 | 0) + ")", c.MozTransform = j + "px," + (e.ty + .5 | 0) + "px)", g || (g = this._oldProps = new createjs.DisplayProps(!0, null)), g.matrix.copy(e) } g.alpha != d.alpha && (c.opacity = "" + (d.alpha * i | 0) / i, g.alpha = d.alpha) } } }, createjs.DOMElement = createjs.promote(a, "DisplayObject") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.usesContext = !1, this._multiPass = null, this.VTX_SHADER_BODY = null, this.FRAG_SHADER_BODY = null } var b = a.prototype; b.getBounds = function (a) { return a }, b.shaderParamSetup = function (a, b, c) { }, b.applyFilter = function (a, b, c, d, e, f, g, h) { f = f || a, null == g && (g = b), null == h && (h = c); try { var i = a.getImageData(b, c, d, e) } catch (j) { return !1 } return this._applyFilter(i) ? (f.putImageData(i, g, h), !0) : !1 }, b.toString = function () { return "[Filter]" }, b.clone = function () { return new a }, b._applyFilter = function (a) { return !0 }, createjs.Filter = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.width = void 0, this.height = void 0, this.x = void 0, this.y = void 0, this.scale = 1, this.offX = 0, this.offY = 0, this.cacheID = 0, this._filterOffX = 0, this._filterOffY = 0, this._cacheDataURLID = 0, this._cacheDataURL = null, this._drawWidth = 0, this._drawHeight = 0 } var b = a.prototype; a.getFilterBounds = function (a, b) { b || (b = new createjs.Rectangle); var c = a.filters, d = c && c.length; if (0 >= !!d) return b; for (var e = 0; d > e; e++) { var f = c[e]; if (f && f.getBounds) { var g = f.getBounds(); g && (0 == e ? b.setValues(g.x, g.y, g.width, g.height) : b.extend(g.x, g.y, g.width, g.height)) } } return b }, b.toString = function () { return "[BitmapCache]" }, b.define = function (a, b, c, d, e, f, g) { if (!a) throw "No symbol to cache"; this._options = g, this.target = a, this.width = d >= 1 ? d : 1, this.height = e >= 1 ? e : 1, this.x = b || 0, this.y = c || 0, this.scale = f || 1, this.update() }, b.update = function (b) { if (!this.target) throw "define() must be called before update()"; var c = a.getFilterBounds(this.target), d = this.target.cacheCanvas; this._drawWidth = Math.ceil(this.width * this.scale) + c.width, this._drawHeight = Math.ceil(this.height * this.scale) + c.height, d && this._drawWidth == d.width && this._drawHeight == d.height || this._updateSurface(), this._filterOffX = c.x, this._filterOffY = c.y, this.offX = this.x * this.scale + this._filterOffX, this.offY = this.y * this.scale + this._filterOffY, this._drawToCache(b), this.cacheID = this.cacheID ? this.cacheID + 1 : 1 }, b.release = function () { if (this._webGLCache) this._webGLCache.isCacheControlled || (this.__lastRT && (this.__lastRT = void 0), this.__rtA && this._webGLCache._killTextureObject(this.__rtA), this.__rtB && this._webGLCache._killTextureObject(this.__rtB), this.target && this.target.cacheCanvas && this._webGLCache._killTextureObject(this.target.cacheCanvas)), this._webGLCache = !1; else { var a = this.target.stage; a instanceof createjs.StageGL && a.releaseTexture(this.target.cacheCanvas) } this.target = this.target.cacheCanvas = null, this.cacheID = this._cacheDataURLID = this._cacheDataURL = void 0, this.width = this.height = this.x = this.y = this.offX = this.offY = 0, this.scale = 1 }, b.getCacheDataURL = function () { var a = this.target && this.target.cacheCanvas; return a ? (this.cacheID != this._cacheDataURLID && (this._cacheDataURLID = this.cacheID, this._cacheDataURL = a.toDataURL ? a.toDataURL() : null), this._cacheDataURL) : null }, b.draw = function (a) { return this.target ? (a.drawImage(this.target.cacheCanvas, this.x + this._filterOffX / this.scale, this.y + this._filterOffY / this.scale, this._drawWidth / this.scale, this._drawHeight / this.scale), !0) : !1 }, b._updateSurface = function () { if (!this._options || !this._options.useGL) { var a = this.target.cacheCanvas; return a || (a = this.target.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas")), a.width = this._drawWidth, void (a.height = this._drawHeight) } if (!this._webGLCache) if ("stage" === this._options.useGL) { if (!this.target.stage || !this.target.stage.isWebGL) { var b = "Cannot use 'stage' for cache because the object's parent stage is "; throw b += this.target.stage ? "non WebGL." : "not set, please addChild to the correct stage." } this.target.cacheCanvas = !0, this._webGLCache = this.target.stage } else if ("new" === this._options.useGL) this.target.cacheCanvas = document.createElement("canvas"), this._webGLCache = new createjs.StageGL(this.target.cacheCanvas, { antialias: !0, transparent: !0, autoPurge: -1 }), this._webGLCache.isCacheControlled = !0; else { if (!(this._options.useGL instanceof createjs.StageGL)) throw "Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got " + this._options.useGL; this.target.cacheCanvas = !0, this._webGLCache = this._options.useGL, this._webGLCache.isCacheControlled = !0 } var a = this.target.cacheCanvas, c = this._webGLCache; c.isCacheControlled && (a.width = this._drawWidth, a.height = this._drawHeight, c.updateViewport(this._drawWidth, this._drawHeight)), this.target.filters ? (c.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight), c.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight)) : c.isCacheControlled || c.getTargetRenderTexture(this.target, this._drawWidth, this._drawHeight) }, b._drawToCache = function (a) { var b = this.target.cacheCanvas, c = this.target, d = this._webGLCache; if (d) d.cacheDraw(c, c.filters, this), b = this.target.cacheCanvas, b.width = this._drawWidth, b.height = this._drawHeight; else { var e = b.getContext("2d"); a || e.clearRect(0, 0, this._drawWidth + 1, this._drawHeight + 1), e.save(), e.globalCompositeOperation = a, e.setTransform(this.scale, 0, 0, this.scale, -this._filterOffX, -this._filterOffY), e.translate(-this.x, -this.y), c.draw(e, !0), e.restore(), c.filters && c.filters.length && this._applyFilters(e) } b._invalid = !0 }, b._applyFilters = function (a) { var b, c = this.target.filters, d = this._drawWidth, e = this._drawHeight, f = 0, g = c[f]; do g.usesContext ? (b && (a.putImageData(b, 0, 0), b = null), g.applyFilter(a, 0, 0, d, e)) : (b || (b = a.getImageData(0, 0, d, e)), g._applyFilter(b)), g = null !== g._multiPass ? g._multiPass : c[++f]; while (g); b && a.putImageData(b, 0, 0) }, createjs.BitmapCache = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.Filter_constructor(), this._blurX = a, this._blurXTable = [], this._lastBlurX = null, this._blurY = b, this._blurYTable = [], this._lastBlurY = null, this._quality, this._lastQuality = null, this.FRAG_SHADER_TEMPLATE = "uniform float xWeight[{{blurX}}];uniform float yWeight[{{blurY}}];uniform vec2 textureOffset;void main(void) {vec4 color = vec4(0.0);float xAdj = ({{blurX}}.0-1.0)/2.0;float yAdj = ({{blurY}}.0-1.0)/2.0;vec2 sampleOffset;for(int i=0; i<{{blurX}}; i++) {for(int j=0; j<{{blurY}}; j++) {sampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));color += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);}}gl_FragColor = color.rgba;}", (isNaN(c) || 1 > c) && (c = 1), this.setQuality(0 | c) } var b = createjs.extend(a, createjs.Filter); b.getBlurX = function () { return this._blurX }, b.getBlurY = function () { return this._blurY }, b.setBlurX = function (a) { (isNaN(a) || 0 > a) && (a = 0), this._blurX = a }, b.setBlurY = function (a) { (isNaN(a) || 0 > a) && (a = 0), this._blurY = a }, b.getQuality = function () { return this._quality }, b.setQuality = function (a) { (isNaN(a) || 0 > a) && (a = 0), this._quality = 0 | a }, b._getShader = function () { var a = this._lastBlurX !== this._blurX, b = this._lastBlurY !== this._blurY, c = this._lastQuality !== this._quality; return a || b || c ? ((a || c) && (this._blurXTable = this._getTable(this._blurX * this._quality)), (b || c) && (this._blurYTable = this._getTable(this._blurY * this._quality)), this._updateShader(), this._lastBlurX = this._blurX, this._lastBlurY = this._blurY, void (this._lastQuality = this._quality)) : this._compiledShader }, b._setShader = function () { this._compiledShader }; try { Object.defineProperties(b, { blurX: { get: b.getBlurX, set: b.setBlurX }, blurY: { get: b.getBlurY, set: b.setBlurY }, quality: { get: b.getQuality, set: b.setQuality }, _builtShader: { get: b._getShader, set: b._setShader } }) } catch (c) { console.log(c) } b._getTable = function (a) { var b = 4.2; if (1 >= a) return [1]; var c = [], d = Math.ceil(2 * a); d += d % 2 ? 0 : 1; for (var e = d / 2 | 0, f = -e; e >= f; f++) { var g = f / e * b; c.push(1 / Math.sqrt(2 * Math.PI) * Math.pow(Math.E, -(Math.pow(g, 2) / 4))) } var h = c.reduce(function (a, b) { return a + b }); return c.map(function (a, b, c) { return a / h }) }, b._updateShader = function () { if (void 0 !== this._blurX && void 0 !== this._blurY) { var a = this.FRAG_SHADER_TEMPLATE; a = a.replace(/\{\{blurX\}\}/g, this._blurXTable.length.toFixed(0)), a = a.replace(/\{\{blurY\}\}/g, this._blurYTable.length.toFixed(0)), this.FRAG_SHADER_BODY = a } }, b.shaderParamSetup = function (a, b, c) { a.uniform1fv(a.getUniformLocation(c, "xWeight"), this._blurXTable), a.uniform1fv(a.getUniformLocation(c, "yWeight"), this._blurYTable), a.uniform2f(a.getUniformLocation(c, "textureOffset"), 2 / (b._viewportWidth * this._quality), 2 / (b._viewportHeight * this._quality)) }, a.MUL_TABLE = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281, 69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343, 341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1], a.SHG_TABLE = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15, 16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16, 17, 16, 17, 16, 17, 9], b.getBounds = function (a) { var b = 0 | this.blurX, c = 0 | this.blurY; if (0 >= b && 0 >= c) return a; var d = Math.pow(this.quality, .2); return (a || new createjs.Rectangle).pad(c * d + 1, b * d + 1, c * d + 1, b * d + 1) }, b.clone = function () { return new a(this.blurX, this.blurY, this.quality) }, b.toString = function () { return "[BlurFilter]" }, b._applyFilter = function (b) { var c = this._blurX >> 1; if (isNaN(c) || 0 > c) return !1; var d = this._blurY >> 1; if (isNaN(d) || 0 > d) return !1; if (0 == c && 0 == d) return !1; var e = this.quality; (isNaN(e) || 1 > e) && (e = 1), e |= 0, e > 3 && (e = 3), 1 > e && (e = 1); var f = b.data, g = 0, h = 0, i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = c + c + 1 | 0, w = d + d + 1 | 0, x = 0 | b.width, y = 0 | b.height, z = x - 1 | 0, A = y - 1 | 0, B = c + 1 | 0, C = d + 1 | 0, D = { r: 0, b: 0, g: 0, a: 0 }, E = D; for (i = 1; v > i; i++)E = E.n = { r: 0, b: 0, g: 0, a: 0 }; E.n = D; var F = { r: 0, b: 0, g: 0, a: 0 }, G = F; for (i = 1; w > i; i++)G = G.n = { r: 0, b: 0, g: 0, a: 0 }; G.n = F; for (var H = null, I = 0 | a.MUL_TABLE[c], J = 0 | a.SHG_TABLE[c], K = 0 | a.MUL_TABLE[d], L = 0 | a.SHG_TABLE[d]; e-- > 0;) { m = l = 0; var M = I, N = J; for (h = y; --h > -1;) { for (n = B * (r = f[0 | l]), o = B * (s = f[l + 1 | 0]), p = B * (t = f[l + 2 | 0]), q = B * (u = f[l + 3 | 0]), E = D, i = B; --i > -1;)E.r = r, E.g = s, E.b = t, E.a = u, E = E.n; for (i = 1; B > i; i++)j = l + ((i > z ? z : i) << 2) | 0, n += E.r = f[j], o += E.g = f[j + 1], p += E.b = f[j + 2], q += E.a = f[j + 3], E = E.n; for (H = D, g = 0; x > g; g++)f[l++] = n * M >>> N, f[l++] = o * M >>> N, f[l++] = p * M >>> N, f[l++] = q * M >>> N, j = m + ((j = g + c + 1) < z ? j : z) << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n; m += x } for (M = K, N = L, g = 0; x > g; g++) { for (l = g << 2 | 0, n = C * (r = f[l]) | 0, o = C * (s = f[l + 1 | 0]) | 0, p = C * (t = f[l + 2 | 0]) | 0, q = C * (u = f[l + 3 | 0]) | 0, G = F, i = 0; C > i; i++)G.r = r, G.g = s, G.b = t, G.a = u, G = G.n; for (k = x, i = 1; d >= i; i++)l = k + g << 2, n += G.r = f[l], o += G.g = f[l + 1], p += G.b = f[l + 2], q += G.a = f[l + 3], G = G.n, A > i && (k += x); if (l = g, H = F, e > 0) for (h = 0; y > h; h++)j = l << 2, f[j + 3] = u = q * M >>> N, u > 0 ? (f[j] = n * M >>> N, f[j + 1] = o * M >>> N, f[j + 2] = p * M >>> N) : f[j] = f[j + 1] = f[j + 2] = 0, j = g + ((j = h + C) < A ? j : A) * x << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n, l += x; else for (h = 0; y > h; h++)j = l << 2, f[j + 3] = u = q * M >>> N, u > 0 ? (u = 255 / u, f[j] = (n * M >>> N) * u, f[j + 1] = (o * M >>> N) * u, f[j + 2] = (p * M >>> N) * u) : f[j] = f[j + 1] = f[j + 2] = 0, j = g + ((j = h + C) < A ? j : A) * x << 2, n -= H.r - (H.r = f[j]), o -= H.g - (H.g = f[j + 1]), p -= H.b - (H.b = f[j + 2]), q -= H.a - (H.a = f[j + 3]), H = H.n, l += x } } return !0 }, createjs.BlurFilter = createjs.promote(a, "Filter") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.Filter_constructor(), this.alphaMap = a, this._alphaMap = null, this._mapData = null, this._mapTexture = null, this.FRAG_SHADER_BODY = "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * (alphaMap.r * ceil(alphaMap.a)));}" } var b = createjs.extend(a, createjs.Filter); b.shaderParamSetup = function (a, b, c) { this._mapTexture || (this._mapTexture = a.createTexture()), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this._mapTexture), b.setTextureParams(a), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, this.alphaMap), a.uniform1i(a.getUniformLocation(c, "uAlphaSampler"), 1) }, b.clone = function () { var b = new a(this.alphaMap); return b._alphaMap = this._alphaMap, b._mapData = this._mapData, b }, b.toString = function () { return "[AlphaMapFilter]" }, b._applyFilter = function (a) { if (!this.alphaMap) return !0; if (!this._prepAlphaMap()) return !1; for (var b = a.data, c = this._mapData, d = 0, e = b.length; e > d; d += 4)b[d + 3] = c[d] || 0; return !0 }, b._prepAlphaMap = function () { if (!this.alphaMap) return !1; if (this.alphaMap == this._alphaMap && this._mapData) return !0; this._mapData = null; var a, b = this._alphaMap = this.alphaMap, c = b; b instanceof HTMLCanvasElement ? a = c.getContext("2d") : (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), c.width = b.width, c.height = b.height, a = c.getContext("2d"), a.drawImage(b, 0, 0)); try { var d = a.getImageData(0, 0, b.width, b.height) } catch (e) { return !1 } return this._mapData = d.data, !0 }, createjs.AlphaMapFilter = createjs.promote(a, "Filter") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.Filter_constructor(), this.mask = a, this.usesContext = !0, this.FRAG_SHADER_BODY = "uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * alphaMap.a);}" } var b = createjs.extend(a, createjs.Filter); b.shaderParamSetup = function (a, b, c) { this._mapTexture || (this._mapTexture = a.createTexture()), a.activeTexture(a.TEXTURE1), a.bindTexture(a.TEXTURE_2D, this._mapTexture), b.setTextureParams(a), a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, this.mask), a.uniform1i(a.getUniformLocation(c, "uAlphaSampler"), 1) }, b.applyFilter = function (a, b, c, d, e, f, g, h) { return this.mask ? (f = f || a, null == g && (g = b), null == h && (h = c), f.save(), a != f ? !1 : (f.globalCompositeOperation = "destination-in", f.drawImage(this.mask, g, h), f.restore(), !0)) : !0 }, b.clone = function () { return new a(this.mask) }, b.toString = function () { return "[AlphaMaskFilter]" }, createjs.AlphaMaskFilter = createjs.promote(a, "Filter") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d, e, f, g, h) { this.Filter_constructor(), this.redMultiplier = null != a ? a : 1, this.greenMultiplier = null != b ? b : 1, this.blueMultiplier = null != c ? c : 1, this.alphaMultiplier = null != d ? d : 1, this.redOffset = e || 0, this.greenOffset = f || 0, this.blueOffset = g || 0, this.alphaOffset = h || 0, this.FRAG_SHADER_BODY = "uniform vec4 uColorMultiplier;uniform vec4 uColorOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = (color * uColorMultiplier) + uColorOffset;}" } var b = createjs.extend(a, createjs.Filter); b.shaderParamSetup = function (a, b, c) { a.uniform4f(a.getUniformLocation(c, "uColorMultiplier"), this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier), a.uniform4f(a.getUniformLocation(c, "uColorOffset"), this.redOffset / 255, this.greenOffset / 255, this.blueOffset / 255, this.alphaOffset / 255) }, b.toString = function () { return "[ColorFilter]" }, b.clone = function () { return new a(this.redMultiplier, this.greenMultiplier, this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset) }, b._applyFilter = function (a) { for (var b = a.data, c = b.length, d = 0; c > d; d += 4)b[d] = b[d] * this.redMultiplier + this.redOffset, b[d + 1] = b[d + 1] * this.greenMultiplier + this.greenOffset, b[d + 2] = b[d + 2] * this.blueMultiplier + this.blueOffset, b[d + 3] = b[d + 3] * this.alphaMultiplier + this.alphaOffset; return !0 }, createjs.ColorFilter = createjs.promote(a, "Filter") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d) { this.setColor(a, b, c, d) } var b = a.prototype; a.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10], a.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], a.LENGTH = a.IDENTITY_MATRIX.length, b.setColor = function (a, b, c, d) { return this.reset().adjustColor(a, b, c, d) }, b.reset = function () { return this.copy(a.IDENTITY_MATRIX) }, b.adjustColor = function (a, b, c, d) { return this.adjustHue(d), this.adjustContrast(b), this.adjustBrightness(a), this.adjustSaturation(c) }, b.adjustBrightness = function (a) { return 0 == a || isNaN(a) ? this : (a = this._cleanValue(a, 255), this._multiplyMatrix([1, 0, 0, 0, a, 0, 1, 0, 0, a, 0, 0, 1, 0, a, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this) }, b.adjustContrast = function (b) { if (0 == b || isNaN(b)) return this; b = this._cleanValue(b, 100); var c; return 0 > b ? c = 127 + b / 100 * 127 : (c = b % 1, c = 0 == c ? a.DELTA_INDEX[b] : a.DELTA_INDEX[b << 0] * (1 - c) + a.DELTA_INDEX[(b << 0) + 1] * c, c = 127 * c + 127), this._multiplyMatrix([c / 127, 0, 0, 0, .5 * (127 - c), 0, c / 127, 0, 0, .5 * (127 - c), 0, 0, c / 127, 0, .5 * (127 - c), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this }, b.adjustSaturation = function (a) { if (0 == a || isNaN(a)) return this; a = this._cleanValue(a, 100); var b = 1 + (a > 0 ? 3 * a / 100 : a / 100), c = .3086, d = .6094, e = .082; return this._multiplyMatrix([c * (1 - b) + b, d * (1 - b), e * (1 - b), 0, 0, c * (1 - b), d * (1 - b) + b, e * (1 - b), 0, 0, c * (1 - b), d * (1 - b), e * (1 - b) + b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this }, b.adjustHue = function (a) { if (0 == a || isNaN(a)) return this; a = this._cleanValue(a, 180) / 180 * Math.PI; var b = Math.cos(a), c = Math.sin(a), d = .213, e = .715, f = .072; return this._multiplyMatrix([d + b * (1 - d) + c * -d, e + b * -e + c * -e, f + b * -f + c * (1 - f), 0, 0, d + b * -d + .143 * c, e + b * (1 - e) + .14 * c, f + b * -f + c * -.283, 0, 0, d + b * -d + c * -(1 - d), e + b * -e + c * e, f + b * (1 - f) + c * f, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]), this }, b.concat = function (b) { return b = this._fixMatrix(b), b.length != a.LENGTH ? this : (this._multiplyMatrix(b), this) }, b.clone = function () { return (new a).copy(this) }, b.toArray = function () { for (var b = [], c = 0, d = a.LENGTH; d > c; c++)b[c] = this[c]; return b }, b.copy = function (b) { for (var c = a.LENGTH, d = 0; c > d; d++)this[d] = b[d]; return this }, b.toString = function () { return "[ColorMatrix]" }, b._multiplyMatrix = function (a) { var b, c, d, e = []; for (b = 0; 5 > b; b++) { for (c = 0; 5 > c; c++)e[c] = this[c + 5 * b]; for (c = 0; 5 > c; c++) { var f = 0; for (d = 0; 5 > d; d++)f += a[c + 5 * d] * e[d]; this[c + 5 * b] = f } } }, b._cleanValue = function (a, b) { return Math.min(b, Math.max(-b, a)) }, b._fixMatrix = function (b) { return b instanceof a && (b = b.toArray()), b.length < a.LENGTH ? b = b.slice(0, b.length).concat(a.IDENTITY_MATRIX.slice(b.length, a.LENGTH)) : b.length > a.LENGTH && (b = b.slice(0, a.LENGTH)), b }, createjs.ColorMatrix = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.Filter_constructor(), this.matrix = a, this.FRAG_SHADER_BODY = "uniform mat4 uColorMatrix;uniform vec4 uColorMatrixOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);mat4 m = uColorMatrix;vec4 newColor = vec4(0,0,0,0);newColor.r = color.r*m[0][0] + color.g*m[0][1] + color.b*m[0][2] + color.a*m[0][3];newColor.g = color.r*m[1][0] + color.g*m[1][1] + color.b*m[1][2] + color.a*m[1][3];newColor.b = color.r*m[2][0] + color.g*m[2][1] + color.b*m[2][2] + color.a*m[2][3];newColor.a = color.r*m[3][0] + color.g*m[3][1] + color.b*m[3][2] + color.a*m[3][3];gl_FragColor = newColor + uColorMatrixOffset;}" } var b = createjs.extend(a, createjs.Filter); b.shaderParamSetup = function (a, b, c) { var d = this.matrix, e = new Float32Array([d[0], d[1], d[2], d[3], d[5], d[6], d[7], d[8], d[10], d[11], d[12], d[13], d[15], d[16], d[17], d[18]]); a.uniformMatrix4fv(a.getUniformLocation(c, "uColorMatrix"), !1, e), a.uniform4f(a.getUniformLocation(c, "uColorMatrixOffset"), d[4] / 255, d[9] / 255, d[14] / 255, d[19] / 255) }, b.toString = function () { return "[ColorMatrixFilter]" }, b.clone = function () { return new a(this.matrix) }, b._applyFilter = function (a) { for (var b, c, d, e, f = a.data, g = f.length, h = this.matrix, i = h[0], j = h[1], k = h[2], l = h[3], m = h[4], n = h[5], o = h[6], p = h[7], q = h[8], r = h[9], s = h[10], t = h[11], u = h[12], v = h[13], w = h[14], x = h[15], y = h[16], z = h[17], A = h[18], B = h[19], C = 0; g > C; C += 4)b = f[C], c = f[C + 1], d = f[C + 2], e = f[C + 3], f[C] = b * i + c * j + d * k + e * l + m, f[C + 1] = b * n + c * o + d * p + e * q + r, f[C + 2] = b * s + c * t + d * u + e * v + w, f[C + 3] = b * x + c * y + d * z + e * A + B; return !0 }, createjs.ColorMatrixFilter = createjs.promote(a, "Filter") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "Touch cannot be instantiated" } a.isSupported = function () { return !!("ontouchstart" in window || window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 0 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 0) }, a.enable = function (b, c, d) { return b && b.canvas && a.isSupported() ? b.__touch ? !0 : (b.__touch = { pointers: {}, multitouch: !c, preventDefault: !d, count: 0 }, "ontouchstart" in window ? a._IOS_enable(b) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && a._IE_enable(b), !0) : !1 }, a.disable = function (b) { b && ("ontouchstart" in window ? a._IOS_disable(b) : (window.navigator.msPointerEnabled || window.navigator.pointerEnabled) && a._IE_disable(b), delete b.__touch) }, a._IOS_enable = function (b) { var c = b.canvas, d = b.__touch.f = function (c) { a._IOS_handleEvent(b, c) }; c.addEventListener("touchstart", d, !1), c.addEventListener("touchmove", d, !1), c.addEventListener("touchend", d, !1), c.addEventListener("touchcancel", d, !1) }, a._IOS_disable = function (a) { var b = a.canvas; if (b) { var c = a.__touch.f; b.removeEventListener("touchstart", c, !1), b.removeEventListener("touchmove", c, !1), b.removeEventListener("touchend", c, !1), b.removeEventListener("touchcancel", c, !1) } }, a._IOS_handleEvent = function (a, b) { if (a) { a.__touch.preventDefault && b.preventDefault && b.preventDefault(); for (var c = b.changedTouches, d = b.type, e = 0, f = c.length; f > e; e++) { var g = c[e], h = g.identifier; g.target == a.canvas && ("touchstart" == d ? this._handleStart(a, h, b, g.pageX, g.pageY) : "touchmove" == d ? this._handleMove(a, h, b, g.pageX, g.pageY) : ("touchend" == d || "touchcancel" == d) && this._handleEnd(a, h, b)) } } }, a._IE_enable = function (b) { var c = b.canvas, d = b.__touch.f = function (c) { a._IE_handleEvent(b, c) }; void 0 === window.navigator.pointerEnabled ? (c.addEventListener("MSPointerDown", d, !1), window.addEventListener("MSPointerMove", d, !1), window.addEventListener("MSPointerUp", d, !1), window.addEventListener("MSPointerCancel", d, !1), b.__touch.preventDefault && (c.style.msTouchAction = "none")) : (c.addEventListener("pointerdown", d, !1), window.addEventListener("pointermove", d, !1), window.addEventListener("pointerup", d, !1), window.addEventListener("pointercancel", d, !1), b.__touch.preventDefault && (c.style.touchAction = "none")), b.__touch.activeIDs = {} }, a._IE_disable = function (a) { var b = a.__touch.f; void 0 === window.navigator.pointerEnabled ? (window.removeEventListener("MSPointerMove", b, !1), window.removeEventListener("MSPointerUp", b, !1), window.removeEventListener("MSPointerCancel", b, !1), a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1)) : (window.removeEventListener("pointermove", b, !1), window.removeEventListener("pointerup", b, !1), window.removeEventListener("pointercancel", b, !1), a.canvas && a.canvas.removeEventListener("pointerdown", b, !1)) }, a._IE_handleEvent = function (a, b) { if (a) { a.__touch.preventDefault && b.preventDefault && b.preventDefault(); var c = b.type, d = b.pointerId, e = a.__touch.activeIDs; if ("MSPointerDown" == c || "pointerdown" == c) { if (b.srcElement != a.canvas) return; e[d] = !0, this._handleStart(a, d, b, b.pageX, b.pageY) } else e[d] && ("MSPointerMove" == c || "pointermove" == c ? this._handleMove(a, d, b, b.pageX, b.pageY) : ("MSPointerUp" == c || "MSPointerCancel" == c || "pointerup" == c || "pointercancel" == c) && (delete e[d], this._handleEnd(a, d, b))) } }, a._handleStart = function (a, b, c, d, e) { var f = a.__touch; if (f.multitouch || !f.count) { var g = f.pointers; g[b] || (g[b] = !0, f.count++, a._handlePointerDown(b, c, d, e)) } }, a._handleMove = function (a, b, c, d, e) { a.__touch.pointers[b] && a._handlePointerMove(b, c, d, e) }, a._handleEnd = function (a, b, c) { var d = a.__touch, e = d.pointers; e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b]) }, createjs.Touch = a }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = createjs.EaselJS = createjs.EaselJS || {}; a.version = "1.0.0", a.buildDate = "Thu, 12 Oct 2017 16:34:10 GMT" }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = createjs.PreloadJS = createjs.PreloadJS || {}; a.version = "1.0.0", a.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT" }(), this.createjs = this.createjs || {}, function () { "use strict"; createjs.proxy = function (a, b) { var c = Array.prototype.slice.call(arguments, 2); return function () { return a.apply(b, Array.prototype.slice.call(arguments, 0).concat(c)) } } }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.Event_constructor("error"), this.title = a, this.message = b, this.data = c } var b = createjs.extend(a, createjs.Event); b.clone = function () { return new createjs.ErrorEvent(this.title, this.message, this.data) }, createjs.ErrorEvent = createjs.promote(a, "Event") }(), this.createjs = this.createjs || {}, function (a) {
    "use strict"; function b(a, b) {
        this.Event_constructor("progress"), this.loaded = a, this.total = null == b ? 1 : b, this.progress = 0 == b ? 0 : this.loaded / this.total;
    } var c = createjs.extend(b, createjs.Event); c.clone = function () { return new createjs.ProgressEvent(this.loaded, this.total) }, createjs.ProgressEvent = createjs.promote(b, "Event")
}(window), function () { function a(b, d) { function f(a) { if (f[a] !== q) return f[a]; var b; if ("bug-string-char-index" == a) b = "a" != "a"[0]; else if ("json" == a) b = f("json-stringify") && f("json-parse"); else { var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'; if ("json-stringify" == a) { var i = d.stringify, k = "function" == typeof i && t; if (k) { (c = function () { return 1 }).toJSON = c; try { k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null) && "[null,null,null]" == i([q, s, null]) && i({ a: [c, !0, !1, null, "\x00\b\n\f\r	"] }) == e && "1" === i(null, c) && "[\n 1,\n 2\n]" == i([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1)) } catch (l) { k = !1 } } b = k } if ("json-parse" == a) { var m = d.parse; if ("function" == typeof m) try { if (0 === m("0") && !m(!1)) { c = m(e); var n = 5 == c.a.length && 1 === c.a[0]; if (n) { try { n = !m('"	"') } catch (l) { } if (n) try { n = 1 !== m("01") } catch (l) { } if (n) try { n = 1 !== m("1.") } catch (l) { } } } } catch (l) { n = !1 } b = n } } return f[a] = !!b } b || (b = e.Object()), d || (d = e.Object()); var g = b.Number || e.Number, h = b.String || e.String, i = b.Object || e.Object, j = b.Date || e.Date, k = b.SyntaxError || e.SyntaxError, l = b.TypeError || e.TypeError, m = b.Math || e.Math, n = b.JSON || e.JSON; "object" == typeof n && n && (d.stringify = n.stringify, d.parse = n.parse); var o, p, q, r = i.prototype, s = r.toString, t = new j(-0xc782b5b800cec); try { t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds() } catch (u) { } if (!f("json")) { var v = "[object Function]", w = "[object Date]", x = "[object Number]", y = "[object String]", z = "[object Array]", A = "[object Boolean]", B = f("bug-string-char-index"); if (!t) var C = m.floor, D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], E = function (a, b) { return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400) }; if ((o = r.hasOwnProperty) || (o = function (a) { var b, c = {}; return (c.__proto__ = null, c.__proto__ = { toString: 1 }, c).toString != s ? o = function (a) { var b = this.__proto__, c = a in (this.__proto__ = null, this); return this.__proto__ = b, c } : (b = c.constructor, o = function (a) { var c = (this.constructor || b).prototype; return a in this && !(a in c && this[a] === c[a]) }), c = null, o.call(this, a) }), p = function (a, b) { var d, e, f, g = 0; (d = function () { this.valueOf = 0 }).prototype.valueOf = 0, e = new d; for (f in e) o.call(e, f) && g++; return d = e = null, g ? p = 2 == g ? function (a, b) { var c, d = {}, e = s.call(a) == v; for (c in a) e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c) } : function (a, b) { var c, d, e = s.call(a) == v; for (c in a) e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c); (d || o.call(a, c = "constructor")) && b(c) } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], p = function (a, b) { var d, f, g = s.call(a) == v, h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o; for (d in a) g && "prototype" == d || !h.call(a, d) || b(d); for (f = e.length; d = e[--f]; h.call(a, d) && b(d)); }), p(a, b) }, !f("json-stringify")) { var F = { 92: "\\\\", 34: '\\"', 8: "\\b", 12: "\\f", 10: "\\n", 13: "\\r", 9: "\\t" }, G = "000000", H = function (a, b) { return (G + (b || 0)).slice(-a) }, I = "\\u00", J = function (a) { for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) { var g = a.charCodeAt(c); switch (g) { case 8: case 9: case 10: case 12: case 13: case 34: case 92: b += F[g]; break; default: if (32 > g) { b += I + H(2, g.toString(16)); break } b += e ? f[c] : a.charAt(c) } } return b + '"' }, K = function (a, b, c, d, e, f, g) { var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L; try { h = b[a] } catch (M) { } if ("object" == typeof h && h) if (i = s.call(h), i != w || o.call(h, "toJSON")) "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a)); else if (h > -1 / 0 && 1 / 0 > h) { if (E) { for (m = C(h / 864e5), j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++); for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++); m = 1 + m - E(j, k), n = (h % 864e5 + 864e5) % 864e5, r = C(n / 36e5) % 24, t = C(n / 6e4) % 60, u = C(n / 1e3) % 60, v = n % 1e3 } else j = h.getUTCFullYear(), k = h.getUTCMonth(), m = h.getUTCDate(), r = h.getUTCHours(), t = h.getUTCMinutes(), u = h.getUTCSeconds(), v = h.getUTCMilliseconds(); h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z" } else h = null; if (c && (h = c.call(b, a, h)), null === h) return "null"; if (i = s.call(h), i == A) return "" + h; if (i == x) return h > -1 / 0 && 1 / 0 > h ? "" + h : "null"; if (i == y) return J("" + h); if ("object" == typeof h) { for (G = g.length; G--;)if (g[G] === h) throw l(); if (g.push(h), B = [], I = f, f += e, i == z) { for (F = 0, G = h.length; G > F; F++)D = K(F, h, c, d, e, f, g), B.push(D === q ? "null" : D); L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]" } else p(d || h, function (a) { var b = K(a, h, c, d, e, f, g); b !== q && B.push(J(a) + ":" + (e ? " " : "") + b) }), L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}"; return g.pop(), L } }; d.stringify = function (a, b, d) { var e, f, g, h; if (c[typeof b] && b) if ((h = s.call(b)) == v) f = b; else if (h == z) { g = {}; for (var i, j = 0, k = b.length; k > j; i = b[j++], h = s.call(i), (h == y || h == x) && (g[i] = 1)); } if (d) if ((h = s.call(d)) == x) { if ((d -= d % 1) > 0) for (e = "", d > 10 && (d = 10); e.length < d; e += " "); } else h == y && (e = d.length <= 10 ? d : d.slice(0, 10)); return K("", (i = {}, i[""] = a, i), f, g, e, "", []) } } if (!f("json-parse")) { var L, M, N = h.fromCharCode, O = { 92: "\\", 34: '"', 47: "/", 98: "\b", 116: "	", 110: "\n", 102: "\f", 114: "\r" }, P = function () { throw L = M = null, k() }, Q = function () { for (var a, b, c, d, e, f = M, g = f.length; g > L;)switch (e = f.charCodeAt(L)) { case 9: case 10: case 13: case 32: L++; break; case 123: case 125: case 91: case 93: case 58: case 44: return a = B ? f.charAt(L) : f[L], L++, a; case 34: for (a = "@", L++; g > L;)if (e = f.charCodeAt(L), 32 > e) P(); else if (92 == e) switch (e = f.charCodeAt(++L)) { case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114: a += O[e], L++; break; case 117: for (b = ++L, c = L + 4; c > L; L++)e = f.charCodeAt(L), e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P(); a += N("0x" + f.slice(b, L)); break; default: P() } else { if (34 == e) break; for (e = f.charCodeAt(L), b = L; e >= 32 && 92 != e && 34 != e;)e = f.charCodeAt(++L); a += f.slice(b, L) } if (34 == f.charCodeAt(L)) return L++, a; P(); default: if (b = L, 45 == e && (d = !0, e = f.charCodeAt(++L)), e >= 48 && 57 >= e) { for (48 == e && (e = f.charCodeAt(L + 1), e >= 48 && 57 >= e) && P(), d = !1; g > L && (e = f.charCodeAt(L), e >= 48 && 57 >= e); L++); if (46 == f.charCodeAt(L)) { for (c = ++L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++); c == L && P(), L = c } if (e = f.charCodeAt(L), 101 == e || 69 == e) { for (e = f.charCodeAt(++L), (43 == e || 45 == e) && L++, c = L; g > c && (e = f.charCodeAt(c), e >= 48 && 57 >= e); c++); c == L && P(), L = c } return +f.slice(b, L) } if (d && P(), "true" == f.slice(L, L + 4)) return L += 4, !0; if ("false" == f.slice(L, L + 5)) return L += 5, !1; if ("null" == f.slice(L, L + 4)) return L += 4, null; P() }return "$" }, R = function (a) { var b, c; if ("$" == a && P(), "string" == typeof a) { if ("@" == (B ? a.charAt(0) : a[0])) return a.slice(1); if ("[" == a) { for (b = []; a = Q(), "]" != a; c || (c = !0))c && ("," == a ? (a = Q(), "]" == a && P()) : P()), "," == a && P(), b.push(R(a)); return b } if ("{" == a) { for (b = {}; a = Q(), "}" != a; c || (c = !0))c && ("," == a ? (a = Q(), "}" == a && P()) : P()), ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(), b[a.slice(1)] = R(Q()); return b } P() } return a }, S = function (a, b, c) { var d = T(a, b, c); d === q ? delete a[b] : a[b] = d }, T = function (a, b, c) { var d, e = a[b]; if ("object" == typeof e && e) if (s.call(e) == z) for (d = e.length; d--;)S(e, d, c); else p(e, function (a) { S(e, a, c) }); return c.call(a, b, e) }; d.parse = function (a, b) { var c, d; return L = 0, M = "" + a, c = R(Q()), "$" != Q() && P(), L = M = null, b && s.call(b) == v ? T((d = {}, d[""] = c, d), "", b) : c } } } return d.runInContext = a, d } var b = "function" == typeof define && define.amd, c = { "function": !0, object: !0 }, d = c[typeof exports] && exports && !exports.nodeType && exports, e = c[typeof window] && window || this, f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global; if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f), d && !b) a(e, d); else { var g = e.JSON, h = e.JSON3, i = !1, j = a(e, e.JSON3 = { noConflict: function () { return i || (i = !0, e.JSON = g, e.JSON3 = h, g = h = null), j } }); e.JSON = { parse: j.parse, stringify: j.stringify } } b && define(function () { return j }) }.call(this), function () { var a = {}; a.a = function () { return a.el("a") }, a.svg = function () { return a.el("svg") }, a.object = function () { return a.el("object") }, a.image = function () { return a.el("image") }, a.img = function () { return a.el("img") }, a.style = function () { return a.el("style") }, a.link = function () { return a.el("link") }, a.script = function () { return a.el("script") }, a.audio = function () { return a.el("audio") }, a.video = function () { return a.el("video") }, a.text = function (a) { return document.createTextNode(a) }, a.el = function (a) { return document.createElement(a) }, createjs.Elements = a }(), function () { var a = {}; a.ABSOLUTE_PATT = /^(?:\w+:)?\/{2}/i, a.RELATIVE_PATT = /^[.\/]*?\//i, a.EXTENSION_PATT = /\/?[^\/]+\.(\w{1,5})$/i, a.parseURI = function (b) { var c = { absolute: !1, relative: !1, protocol: null, hostname: null, port: null, pathname: null, search: null, hash: null, host: null }; if (null == b) return c; var d = createjs.Elements.a(); d.href = b; for (var e in c) e in d && (c[e] = d[e]); var f = b.indexOf("?"); f > -1 && (b = b.substr(0, f)); var g; return a.ABSOLUTE_PATT.test(b) ? c.absolute = !0 : a.RELATIVE_PATT.test(b) && (c.relative = !0), (g = b.match(a.EXTENSION_PATT)) && (c.extension = g[1].toLowerCase()), c }, a.formatQueryString = function (a, b) { if (null == a) throw new Error("You must specify data."); var c = []; for (var d in a) c.push(d + "=" + escape(a[d])); return b && (c = c.concat(b)), c.join("&") }, a.buildURI = function (a, b) { if (null == b) return a; var c = [], d = a.indexOf("?"); if (-1 != d) { var e = a.slice(d + 1); c = c.concat(e.split("&")) } return -1 != d ? a.slice(0, d) + "?" + this.formatQueryString(b, c) : a + "?" + this.formatQueryString(b, c) }, a.isCrossDomain = function (a) { var b = createjs.Elements.a(); b.href = a.src; var c = createjs.Elements.a(); c.href = location.href; var d = "" != b.hostname && (b.port != c.port || b.protocol != c.protocol || b.hostname != c.hostname); return d }, a.isLocal = function (a) { var b = createjs.Elements.a(); return b.href = a.src, "" == b.hostname && "file:" == b.protocol }, createjs.URLUtils = a }(), function () { var a = { container: null }; a.appendToHead = function (b) { a.getHead().appendChild(b) }, a.appendToBody = function (b) { if (null == a.container) { a.container = document.createElement("div"), a.container.id = "preloadjs-container"; var c = a.container.style; c.visibility = "hidden", c.position = "absolute", c.width = a.container.style.height = "10px", c.overflow = "hidden", c.transform = c.msTransform = c.webkitTransform = c.oTransform = "translate(-10px, -10px)", a.getBody().appendChild(a.container) } a.container.appendChild(b) }, a.getHead = function () { return document.head || document.getElementsByTagName("head")[0] }, a.getBody = function () { return document.body || document.getElementsByTagName("body")[0] }, a.removeChild = function (a) { a.parent && a.parent.removeChild(a) }, a.isImageTag = function (a) { return a instanceof HTMLImageElement }, a.isAudioTag = function (a) { return window.HTMLAudioElement ? a instanceof HTMLAudioElement : !1 }, a.isVideoTag = function (a) { return window.HTMLVideoElement ? a instanceof HTMLVideoElement : !1 }, createjs.DomUtils = a }(), function () { var a = {}; a.parseXML = function (a) { var b = null; try { if (window.DOMParser) { var c = new DOMParser; b = c.parseFromString(a, "text/xml") } } catch (d) { } if (!b) try { b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.loadXML(a) } catch (d) { b = null } return b }, a.parseJSON = function (a) { if (null == a) return null; try { return JSON.parse(a) } catch (b) { throw b } }, createjs.DataUtils = a }(), this.createjs = this.createjs || {}, function () { var a = {}; a.BINARY = "binary", a.CSS = "css", a.FONT = "font", a.FONTCSS = "fontcss", a.IMAGE = "image", a.JAVASCRIPT = "javascript", a.JSON = "json", a.JSONP = "jsonp", a.MANIFEST = "manifest", a.SOUND = "sound", a.VIDEO = "video", a.SPRITESHEET = "spritesheet", a.SVG = "svg", a.TEXT = "text", a.XML = "xml", createjs.Types = a }(), this.createjs = this.createjs || {}, function () { var a = {}; a.POST = "POST", a.GET = "GET", createjs.Methods = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.src = null, this.type = null, this.id = null, this.maintainOrder = !1, this.callback = null, this.data = null, this.method = createjs.Methods.GET, this.values = null, this.headers = null, this.withCredentials = !1, this.mimeType = null, this.crossOrigin = null, this.loadTimeout = c.LOAD_TIMEOUT_DEFAULT } var b = a.prototype = {}, c = a; c.LOAD_TIMEOUT_DEFAULT = 8e3, c.create = function (b) { if ("string" == typeof b) { var d = new a; return d.src = b, d } if (b instanceof c) return b; if (b instanceof Object && b.src) return null == b.loadTimeout && (b.loadTimeout = c.LOAD_TIMEOUT_DEFAULT), b; throw new Error("Type not recognized.") }, b.set = function (a) { for (var b in a) this[b] = a[b]; return this }, createjs.LoadItem = c }(), function () { var a = {}; a.isBinary = function (a) { switch (a) { case createjs.Types.IMAGE: case createjs.Types.BINARY: return !0; default: return !1 } }, a.isText = function (a) { switch (a) { case createjs.Types.TEXT: case createjs.Types.JSON: case createjs.Types.MANIFEST: case createjs.Types.XML: case createjs.Types.CSS: case createjs.Types.SVG: case createjs.Types.JAVASCRIPT: case createjs.Types.SPRITESHEET: return !0; default: return !1 } }, a.getTypeByExtension = function (a) { if (null == a) return createjs.Types.TEXT; switch (a.toLowerCase()) { case "jpeg": case "jpg": case "gif": case "png": case "webp": case "bmp": return createjs.Types.IMAGE; case "ogg": case "mp3": case "webm": return createjs.Types.SOUND; case "mp4": case "webm": case "ts": return createjs.Types.VIDEO; case "json": return createjs.Types.JSON; case "xml": return createjs.Types.XML; case "css": return createjs.Types.CSS; case "js": return createjs.Types.JAVASCRIPT; case "svg": return createjs.Types.SVG; default: return createjs.Types.TEXT } }, createjs.RequestUtils = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.EventDispatcher_constructor(), this.loaded = !1, this.canceled = !1, this.progress = 0, this.type = c, this.resultFormatter = null, a ? this._item = createjs.LoadItem.create(a) : this._item = null, this._preferXHR = b, this._result = null, this._rawResult = null, this._loadedItems = null, this._tagSrcAttribute = null, this._tag = null } var b = createjs.extend(a, createjs.EventDispatcher), c = a; try { Object.defineProperties(c, { POST: { get: createjs.deprecate(function () { return createjs.Methods.POST }, "AbstractLoader.POST") }, GET: { get: createjs.deprecate(function () { return createjs.Methods.GET }, "AbstractLoader.GET") }, BINARY: { get: createjs.deprecate(function () { return createjs.Types.BINARY }, "AbstractLoader.BINARY") }, CSS: { get: createjs.deprecate(function () { return createjs.Types.CSS }, "AbstractLoader.CSS") }, FONT: { get: createjs.deprecate(function () { return createjs.Types.FONT }, "AbstractLoader.FONT") }, FONTCSS: { get: createjs.deprecate(function () { return createjs.Types.FONTCSS }, "AbstractLoader.FONTCSS") }, IMAGE: { get: createjs.deprecate(function () { return createjs.Types.IMAGE }, "AbstractLoader.IMAGE") }, JAVASCRIPT: { get: createjs.deprecate(function () { return createjs.Types.JAVASCRIPT }, "AbstractLoader.JAVASCRIPT") }, JSON: { get: createjs.deprecate(function () { return createjs.Types.JSON }, "AbstractLoader.JSON") }, JSONP: { get: createjs.deprecate(function () { return createjs.Types.JSONP }, "AbstractLoader.JSONP") }, MANIFEST: { get: createjs.deprecate(function () { return createjs.Types.MANIFEST }, "AbstractLoader.MANIFEST") }, SOUND: { get: createjs.deprecate(function () { return createjs.Types.SOUND }, "AbstractLoader.SOUND") }, VIDEO: { get: createjs.deprecate(function () { return createjs.Types.VIDEO }, "AbstractLoader.VIDEO") }, SPRITESHEET: { get: createjs.deprecate(function () { return createjs.Types.SPRITESHEET }, "AbstractLoader.SPRITESHEET") }, SVG: { get: createjs.deprecate(function () { return createjs.Types.SVG }, "AbstractLoader.SVG") }, TEXT: { get: createjs.deprecate(function () { return createjs.Types.TEXT }, "AbstractLoader.TEXT") }, XML: { get: createjs.deprecate(function () { return createjs.Types.XML }, "AbstractLoader.XML") } }) } catch (d) { } b.getItem = function () { return this._item }, b.getResult = function (a) { return a ? this._rawResult : this._result }, b.getTag = function () { return this._tag }, b.setTag = function (a) { this._tag = a }, b.load = function () { this._createRequest(), this._request.on("complete", this, this), this._request.on("progress", this, this), this._request.on("loadStart", this, this), this._request.on("abort", this, this), this._request.on("timeout", this, this), this._request.on("error", this, this); var a = new createjs.Event("initialize"); a.loader = this._request, this.dispatchEvent(a), this._request.load() }, b.cancel = function () { this.canceled = !0, this.destroy() }, b.destroy = function () { this._request && (this._request.removeAllEventListeners(), this._request.destroy()), this._request = null, this._item = null, this._rawResult = null, this._result = null, this._loadItems = null, this.removeAllEventListeners() }, b.getLoadedItems = function () { return this._loadedItems }, b._createRequest = function () { this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.TagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute) }, b._createTag = function (a) { return null }, b._sendLoadStart = function () { this._isCanceled() || this.dispatchEvent("loadstart") }, b._sendProgress = function (a) { if (!this._isCanceled()) { var b = null; "number" == typeof a ? (this.progress = a, b = new createjs.ProgressEvent(this.progress)) : (b = a, this.progress = a.loaded / a.total, b.progress = this.progress, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0)), this.hasEventListener("progress") && this.dispatchEvent(b) } }, b._sendComplete = function () { if (!this._isCanceled()) { this.loaded = !0; var a = new createjs.Event("complete"); a.rawResult = this._rawResult, null != this._result && (a.result = this._result), this.dispatchEvent(a) } }, b._sendError = function (a) { !this._isCanceled() && this.hasEventListener("error") && (null == a && (a = new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")), this.dispatchEvent(a)) }, b._isCanceled = function () { return null == window.createjs || this.canceled ? !0 : !1 }, b.resultFormatter = null, b.handleEvent = function (a) { switch (a.type) { case "complete": this._rawResult = a.target._response; var b = this.resultFormatter && this.resultFormatter(this); b instanceof Function ? b.call(this, createjs.proxy(this._resultFormatSuccess, this), createjs.proxy(this._resultFormatFailed, this)) : (this._result = b || this._rawResult, this._sendComplete()); break; case "progress": this._sendProgress(a); break; case "error": this._sendError(a); break; case "loadstart": this._sendLoadStart(); break; case "abort": case "timeout": this._isCanceled() || this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_" + a.type.toUpperCase() + "_ERROR")) } }, b._resultFormatSuccess = function (a) { this._result = a, this._sendComplete() }, b._resultFormatFailed = function (a) { this._sendError(a) }, b.toString = function () { return "[PreloadJS AbstractLoader]" }, createjs.AbstractLoader = createjs.promote(a, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.AbstractLoader_constructor(a, b, c), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.on("initialize", this._updateXHR, this) } var b = createjs.extend(a, createjs.AbstractLoader); b.load = function () { this._tag || (this._tag = this._createTag(this._item.src)), this._tag.preload = "auto", this._tag.load(), this.AbstractLoader_load() }, b._createTag = function () { }, b._createRequest = function () { this._preferXHR ? this._request = new createjs.XHRRequest(this._item) : this._request = new createjs.MediaTagRequest(this._item, this._tag || this._createTag(), this._tagSrcAttribute) }, b._updateXHR = function (a) { a.loader.setResponseType && a.loader.setResponseType("blob") }, b._formatResult = function (a) { if (this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.onstalled = null, this._preferXHR) { var b = window.URL || window.webkitURL, c = a.getResult(!0); a.getTag().src = b.createObjectURL(c) } return a.getTag() }, createjs.AbstractMediaLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = function (a) { this._item = a }, b = createjs.extend(a, createjs.EventDispatcher); b.load = function () { }, b.destroy = function () { }, b.cancel = function () { }, createjs.AbstractRequest = createjs.promote(a, "EventDispatcher") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this), this._addedToDOM = !1 } var b = createjs.extend(a, createjs.AbstractRequest); b.load = function () { this._tag.onload = createjs.proxy(this._handleTagComplete, this), this._tag.onreadystatechange = createjs.proxy(this._handleReadyStateChange, this), this._tag.onerror = createjs.proxy(this._handleError, this); var a = new createjs.Event("initialize"); a.loader = this._tag, this.dispatchEvent(a), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag[this._tagSrcAttribute] = this._item.src, null == this._tag.parentNode && (createjs.DomUtils.appendToBody(this._tag), this._addedToDOM = !0) }, b.destroy = function () { this._clean(), this._tag = null, this.AbstractRequest_destroy() }, b._handleReadyStateChange = function () { clearTimeout(this._loadTimeout); var a = this._tag; ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete() }, b._handleError = function () { this._clean(), this.dispatchEvent("error") }, b._handleTagComplete = function () { this._rawResult = this._tag, this._result = this.resultFormatter && this.resultFormatter(this) || this._rawResult, this._clean(), this.dispatchEvent("complete") }, b._handleTimeout = function () { this._clean(), this.dispatchEvent(new createjs.Event("timeout")) }, b._clean = function () { this._tag.onload = null, this._tag.onreadystatechange = null, this._tag.onerror = null, this._addedToDOM && null != this._tag.parentNode && this._tag.parentNode.removeChild(this._tag), clearTimeout(this._loadTimeout) }, b._handleStalled = function () { }, createjs.TagRequest = createjs.promote(a, "AbstractRequest") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c) { this.AbstractRequest_constructor(a), this._tag = b, this._tagSrcAttribute = c, this._loadedHandler = createjs.proxy(this._handleTagComplete, this) } var b = createjs.extend(a, createjs.TagRequest); b.load = function () { var a = createjs.proxy(this._handleStalled, this); this._stalledCallback = a; var b = createjs.proxy(this._handleProgress, this); this._handleProgress = b, this._tag.addEventListener("stalled", a), this._tag.addEventListener("progress", b), this._tag.addEventListener && this._tag.addEventListener("canplaythrough", this._loadedHandler, !1), this.TagRequest_load() }, b._handleReadyStateChange = function () { clearTimeout(this._loadTimeout); var a = this._tag; ("loaded" == a.readyState || "complete" == a.readyState) && this._handleTagComplete() }, b._handleStalled = function () { }, b._handleProgress = function (a) { if (a && !(a.loaded > 0 && 0 == a.total)) { var b = new createjs.ProgressEvent(a.loaded, a.total); this.dispatchEvent(b) } }, b._clean = function () { this._tag.removeEventListener && this._tag.removeEventListener("canplaythrough", this._loadedHandler), this._tag.removeEventListener("stalled", this._stalledCallback), this._tag.removeEventListener("progress", this._progressCallback), this.TagRequest__clean() }, createjs.MediaTagRequest = createjs.promote(a, "TagRequest") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractRequest_constructor(a), this._request = null, this._loadTimeout = null, this._xhrLevel = 1, this._response = null, this._rawResponse = null, this._canceled = !1, this._handleLoadStartProxy = createjs.proxy(this._handleLoadStart, this), this._handleProgressProxy = createjs.proxy(this._handleProgress, this), this._handleAbortProxy = createjs.proxy(this._handleAbort, this), this._handleErrorProxy = createjs.proxy(this._handleError, this), this._handleTimeoutProxy = createjs.proxy(this._handleTimeout, this), this._handleLoadProxy = createjs.proxy(this._handleLoad, this), this._handleReadyStateChangeProxy = createjs.proxy(this._handleReadyStateChange, this), !this._createXHR(a) } var b = createjs.extend(a, createjs.AbstractRequest); a.ACTIVEX_VERSIONS = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], b.getResult = function (a) { return a && this._rawResponse ? this._rawResponse : this._response }, b.cancel = function () { this.canceled = !0, this._clean(), this._request.abort() }, b.load = function () { if (null == this._request) return void this._handleError(); null != this._request.addEventListener ? (this._request.addEventListener("loadstart", this._handleLoadStartProxy, !1), this._request.addEventListener("progress", this._handleProgressProxy, !1), this._request.addEventListener("abort", this._handleAbortProxy, !1), this._request.addEventListener("error", this._handleErrorProxy, !1), this._request.addEventListener("timeout", this._handleTimeoutProxy, !1), this._request.addEventListener("load", this._handleLoadProxy, !1), this._request.addEventListener("readystatechange", this._handleReadyStateChangeProxy, !1)) : (this._request.onloadstart = this._handleLoadStartProxy, this._request.onprogress = this._handleProgressProxy, this._request.onabort = this._handleAbortProxy, this._request.onerror = this._handleErrorProxy, this._request.ontimeout = this._handleTimeoutProxy, this._request.onload = this._handleLoadProxy, this._request.onreadystatechange = this._handleReadyStateChangeProxy), 1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout)); try { this._item.values ? this._request.send(createjs.URLUtils.formatQueryString(this._item.values)) : this._request.send() } catch (a) { this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND", null, a)) } }, b.setResponseType = function (a) { "blob" === a && (a = window.URL ? "blob" : "arraybuffer", this._responseType = a), this._request.responseType = a }, b.getAllResponseHeaders = function () { return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null }, b.getResponseHeader = function (a) { return this._request.getResponseHeader instanceof Function ? this._request.getResponseHeader(a) : null }, b._handleProgress = function (a) { if (a && !(a.loaded > 0 && 0 == a.total)) { var b = new createjs.ProgressEvent(a.loaded, a.total); this.dispatchEvent(b) } }, b._handleLoadStart = function (a) { clearTimeout(this._loadTimeout), this.dispatchEvent("loadstart") }, b._handleAbort = function (a) { this._clean(), this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED", null, a)) }, b._handleError = function (a) { this._clean(), this.dispatchEvent(new createjs.ErrorEvent(a.message)) }, b._handleReadyStateChange = function (a) { 4 == this._request.readyState && this._handleLoad() }, b._handleLoad = function (a) { if (!this.loaded) { this.loaded = !0; var b = this._checkError(); if (b) return void this._handleError(b); if (this._response = this._getResponse(), "arraybuffer" === this._responseType) try { this._response = new Blob([this._response]) } catch (c) { if (window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, "TypeError" === c.name && window.BlobBuilder) { var d = new BlobBuilder; d.append(this._response), this._response = d.getBlob() } } this._clean(), this.dispatchEvent(new createjs.Event("complete")) } }, b._handleTimeout = function (a) { this._clean(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT", null, a)) }, b._checkError = function () { var a = parseInt(this._request.status); return a >= 400 && 599 >= a ? new Error(a) : 0 == a && /^https?:/.test(location.protocol) ? new Error(0) : null }, b._getResponse = function () { if (null != this._response) return this._response; if (null != this._request.response) return this._request.response; try { if (null != this._request.responseText) return this._request.responseText } catch (a) { } try { if (null != this._request.responseXML) return this._request.responseXML } catch (a) { } return null }, b._createXHR = function (a) { var b = createjs.URLUtils.isCrossDomain(a), c = {}, d = null; if (window.XMLHttpRequest) d = new XMLHttpRequest, b && void 0 === d.withCredentials && window.XDomainRequest && (d = new XDomainRequest); else { for (var e = 0, f = s.ACTIVEX_VERSIONS.length; f > e; e++) { var g = s.ACTIVEX_VERSIONS[e]; try { d = new ActiveXObject(g); break } catch (h) { } } if (null == d) return !1 } null == a.mimeType && createjs.RequestUtils.isText(a.type) && (a.mimeType = "text/plain; charset=utf-8"), a.mimeType && d.overrideMimeType && d.overrideMimeType(a.mimeType), this._xhrLevel = "string" == typeof d.responseType ? 2 : 1; var i = null; if (i = a.method == createjs.Methods.GET ? createjs.URLUtils.buildURI(a.src, a.values) : a.src, d.open(a.method || createjs.Methods.GET, i, !0), b && d instanceof XMLHttpRequest && 1 == this._xhrLevel && (c.Origin = location.origin), a.values && a.method == createjs.Methods.POST && (c["Content-Type"] = "application/x-www-form-urlencoded"), b || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest"), a.headers) for (var j in a.headers) c[j] = a.headers[j]; for (j in c) d.setRequestHeader(j, c[j]); return d instanceof XMLHttpRequest && void 0 !== a.withCredentials && (d.withCredentials = a.withCredentials), this._request = d, !0 }, b._clean = function () { clearTimeout(this._loadTimeout), null != this._request.removeEventListener ? (this._request.removeEventListener("loadstart", this._handleLoadStartProxy), this._request.removeEventListener("progress", this._handleProgressProxy), this._request.removeEventListener("abort", this._handleAbortProxy), this._request.removeEventListener("error", this._handleErrorProxy), this._request.removeEventListener("timeout", this._handleTimeoutProxy), this._request.removeEventListener("load", this._handleLoadProxy), this._request.removeEventListener("readystatechange", this._handleReadyStateChangeProxy)) : (this._request.onloadstart = null, this._request.onprogress = null, this._request.onabort = null, this._request.onerror = null, this._request.ontimeout = null, this._request.onload = null, this._request.onreadystatechange = null) }, b.toString = function () { return "[PreloadJS XHRRequest]" }, createjs.XHRRequest = createjs.promote(a, "AbstractRequest") }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a(a, b, c) { this.AbstractLoader_constructor(), this._plugins = [], this._typeCallbacks = {}, this._extensionCallbacks = {}, this.next = null, this.maintainScriptOrder = !0, this.stopOnError = !1, this._maxConnections = 1, this._availableLoaders = [createjs.FontLoader, createjs.ImageLoader, createjs.JavaScriptLoader, createjs.CSSLoader, createjs.JSONLoader, createjs.JSONPLoader, createjs.SoundLoader, createjs.ManifestLoader, createjs.SpriteSheetLoader, createjs.XMLLoader, createjs.SVGLoader, createjs.BinaryLoader, createjs.VideoLoader, createjs.TextLoader], this._defaultLoaderLength = this._availableLoaders.length, this.init(a, b, c) } var b = createjs.extend(a, createjs.AbstractLoader), c = a; try { Object.defineProperties(c, { POST: { get: createjs.deprecate(function () { return createjs.Methods.POST }, "AbstractLoader.POST") }, GET: { get: createjs.deprecate(function () { return createjs.Methods.GET }, "AbstractLoader.GET") }, BINARY: { get: createjs.deprecate(function () { return createjs.Types.BINARY }, "AbstractLoader.BINARY") }, CSS: { get: createjs.deprecate(function () { return createjs.Types.CSS }, "AbstractLoader.CSS") }, FONT: { get: createjs.deprecate(function () { return createjs.Types.FONT }, "AbstractLoader.FONT") }, FONTCSS: { get: createjs.deprecate(function () { return createjs.Types.FONTCSS }, "AbstractLoader.FONTCSS") }, IMAGE: { get: createjs.deprecate(function () { return createjs.Types.IMAGE }, "AbstractLoader.IMAGE") }, JAVASCRIPT: { get: createjs.deprecate(function () { return createjs.Types.JAVASCRIPT }, "AbstractLoader.JAVASCRIPT") }, JSON: { get: createjs.deprecate(function () { return createjs.Types.JSON }, "AbstractLoader.JSON") }, JSONP: { get: createjs.deprecate(function () { return createjs.Types.JSONP }, "AbstractLoader.JSONP") }, MANIFEST: { get: createjs.deprecate(function () { return createjs.Types.MANIFEST }, "AbstractLoader.MANIFEST") }, SOUND: { get: createjs.deprecate(function () { return createjs.Types.SOUND }, "AbstractLoader.SOUND") }, VIDEO: { get: createjs.deprecate(function () { return createjs.Types.VIDEO }, "AbstractLoader.VIDEO") }, SPRITESHEET: { get: createjs.deprecate(function () { return createjs.Types.SPRITESHEET }, "AbstractLoader.SPRITESHEET") }, SVG: { get: createjs.deprecate(function () { return createjs.Types.SVG }, "AbstractLoader.SVG") }, TEXT: { get: createjs.deprecate(function () { return createjs.Types.TEXT }, "AbstractLoader.TEXT") }, XML: { get: createjs.deprecate(function () { return createjs.Types.XML }, "AbstractLoader.XML") } }) } catch (d) { } b.init = function (a, b, c) { this.preferXHR = !0, this._preferXHR = !0, this.setPreferXHR(a), this._paused = !1, this._basePath = b, this._crossOrigin = c, this._loadStartWasDispatched = !1, this._currentlyLoadingScript = null, this._currentLoads = [], this._loadQueue = [], this._loadQueueBackup = [], this._loadItemsById = {}, this._loadItemsBySrc = {}, this._loadedResults = {}, this._loadedRawResults = {}, this._numItems = 0, this._numItemsLoaded = 0, this._scriptOrder = [], this._loadedScripts = [], this._lastProgress = NaN }, b.registerLoader = function (a) {
        if (!a || !a.canLoadItem) throw new Error("loader is of an incorrect type."); if (-1 != this._availableLoaders.indexOf(a)) throw new Error("loader already exists.");
        this._availableLoaders.unshift(a)
    }, b.unregisterLoader = function (a) { var b = this._availableLoaders.indexOf(a); -1 != b && b < this._defaultLoaderLength - 1 && this._availableLoaders.splice(b, 1) }, b.setPreferXHR = function (a) { return this.preferXHR = 0 != a && null != window.XMLHttpRequest, this.preferXHR }, b.removeAll = function () { this.remove() }, b.remove = function (a) { var b = null; if (a && !Array.isArray(a)) b = [a]; else if (a) b = a; else if (arguments.length > 0) return; var c = !1; if (b) { for (; b.length;) { var d = b.pop(), e = this.getResult(d); for (f = this._loadQueue.length - 1; f >= 0; f--)if (g = this._loadQueue[f].getItem(), g.id == d || g.src == d) { this._loadQueue.splice(f, 1)[0].cancel(); break } for (f = this._loadQueueBackup.length - 1; f >= 0; f--)if (g = this._loadQueueBackup[f].getItem(), g.id == d || g.src == d) { this._loadQueueBackup.splice(f, 1)[0].cancel(); break } if (e) this._disposeItem(this.getItem(d)); else for (var f = this._currentLoads.length - 1; f >= 0; f--) { var g = this._currentLoads[f].getItem(); if (g.id == d || g.src == d) { this._currentLoads.splice(f, 1)[0].cancel(), c = !0; break } } } c && this._loadNext() } else { this.close(); for (var h in this._loadItemsById) this._disposeItem(this._loadItemsById[h]); this.init(this.preferXHR, this._basePath) } }, b.reset = function () { this.close(); for (var a in this._loadItemsById) this._disposeItem(this._loadItemsById[a]); for (var b = [], c = 0, d = this._loadQueueBackup.length; d > c; c++)b.push(this._loadQueueBackup[c].getItem()); this.loadManifest(b, !1) }, b.installPlugin = function (a) { if (null != a && null != a.getPreloadHandlers) { this._plugins.push(a); var b = a.getPreloadHandlers(); if (b.scope = a, null != b.types) for (var c = 0, d = b.types.length; d > c; c++)this._typeCallbacks[b.types[c]] = b; if (null != b.extensions) for (c = 0, d = b.extensions.length; d > c; c++)this._extensionCallbacks[b.extensions[c]] = b } }, b.setMaxConnections = function (a) { this._maxConnections = a, !this._paused && this._loadQueue.length > 0 && this._loadNext() }, b.loadFile = function (a, b, c) { if (null == a) { var d = new createjs.ErrorEvent("PRELOAD_NO_FILE"); return void this._sendError(d) } this._addItem(a, null, c), b !== !1 ? this.setPaused(!1) : this.setPaused(!0) }, b.loadManifest = function (a, b, d) { var e = null, f = null; if (Array.isArray(a)) { if (0 == a.length) { var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY"); return void this._sendError(g) } e = a } else if ("string" == typeof a) e = [{ src: a, type: c.MANIFEST }]; else { if ("object" != typeof a) { var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL"); return void this._sendError(g) } if (void 0 !== a.src) { if (null == a.type) a.type = c.MANIFEST; else if (a.type != c.MANIFEST) { var g = new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE"); this._sendError(g) } e = [a] } else void 0 !== a.manifest && (e = a.manifest, f = a.path) } for (var h = 0, i = e.length; i > h; h++)this._addItem(e[h], f, d); b !== !1 ? this.setPaused(!1) : this.setPaused(!0) }, b.load = function () { this.setPaused(!1) }, b.getItem = function (a) { return this._loadItemsById[a] || this._loadItemsBySrc[a] }, b.getResult = function (a, b) { var c = this._loadItemsById[a] || this._loadItemsBySrc[a]; if (null == c) return null; var d = c.id; return b && this._loadedRawResults[d] ? this._loadedRawResults[d] : this._loadedResults[d] }, b.getItems = function (a) { var b = []; for (var c in this._loadItemsById) { var d = this._loadItemsById[c], e = this.getResult(c); (a !== !0 || null != e) && b.push({ item: d, result: e, rawResult: this.getResult(c, !0) }) } return b }, b.setPaused = function (a) { this._paused = a, this._paused || this._loadNext() }, b.close = function () { for (; this._currentLoads.length;)this._currentLoads.pop().cancel(); this._scriptOrder.length = 0, this._loadedScripts.length = 0, this.loadStartWasDispatched = !1, this._itemCount = 0, this._lastProgress = NaN }, b._addItem = function (a, b, c) { var d = this._createLoadItem(a, b, c); if (null != d) { var e = this._createLoader(d); null != e && ("plugins" in e && (e.plugins = this._plugins), d._loader = e, this._loadQueue.push(e), this._loadQueueBackup.push(e), this._numItems++, this._updateProgress(), (this.maintainScriptOrder && d.type == createjs.Types.JAVASCRIPT || d.maintainOrder === !0) && (this._scriptOrder.push(d), this._loadedScripts.push(null))) } }, b._createLoadItem = function (a, b, c) { var d = createjs.LoadItem.create(a); if (null == d) return null; var e = "", f = c || this._basePath; if (d.src instanceof Object) { if (!d.type) return null; if (b) { e = b; var g = createjs.URLUtils.parseURI(b); null == f || g.absolute || g.relative || (e = f + e) } else null != f && (e = f) } else { var h = createjs.URLUtils.parseURI(d.src); h.extension && (d.ext = h.extension), null == d.type && (d.type = createjs.RequestUtils.getTypeByExtension(d.ext)); var i = d.src; if (!h.absolute && !h.relative) if (b) { e = b; var g = createjs.URLUtils.parseURI(b); i = b + i, null == f || g.absolute || g.relative || (e = f + e) } else null != f && (e = f); d.src = e + d.src } d.path = e, (void 0 === d.id || null === d.id || "" === d.id) && (d.id = i); var j = this._typeCallbacks[d.type] || this._extensionCallbacks[d.ext]; if (j) { var k = j.callback.call(j.scope, d, this); if (k === !1) return null; k === !0 || null != k && (d._loader = k), h = createjs.URLUtils.parseURI(d.src), null != h.extension && (d.ext = h.extension) } return this._loadItemsById[d.id] = d, this._loadItemsBySrc[d.src] = d, null == d.crossOrigin && (d.crossOrigin = this._crossOrigin), d }, b._createLoader = function (a) { if (null != a._loader) return a._loader; for (var b = this.preferXHR, c = 0; c < this._availableLoaders.length; c++) { var d = this._availableLoaders[c]; if (d && d.canLoadItem(a)) return new d(a, b) } return null }, b._loadNext = function () { if (!this._paused) { this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0), this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1; for (var a = 0; a < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); a++) { var b = this._loadQueue[a]; this._canStartLoad(b) && (this._loadQueue.splice(a, 1), a--, this._loadItem(b)) } } }, b._loadItem = function (a) { a.on("fileload", this._handleFileLoad, this), a.on("progress", this._handleProgress, this), a.on("complete", this._handleFileComplete, this), a.on("error", this._handleError, this), a.on("fileerror", this._handleFileError, this), this._currentLoads.push(a), this._sendFileStart(a.getItem()), a.load() }, b._handleFileLoad = function (a) { a.target = null, this.dispatchEvent(a) }, b._handleFileError = function (a) { var b = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, a.item); this._sendError(b) }, b._handleError = function (a) { var b = a.target; this._numItemsLoaded++, this._finishOrderedItem(b, !0), this._updateProgress(); var c = new createjs.ErrorEvent("FILE_LOAD_ERROR", null, b.getItem()); this._sendError(c), this.stopOnError ? this.setPaused(!0) : (this._removeLoadItem(b), this._cleanLoadItem(b), this._loadNext()) }, b._handleFileComplete = function (a) { var b = a.target, c = b.getItem(), d = b.getResult(); this._loadedResults[c.id] = d; var e = b.getResult(!0); null != e && e !== d && (this._loadedRawResults[c.id] = e), this._saveLoadedItems(b), this._removeLoadItem(b), this._finishOrderedItem(b) || this._processFinishedLoad(c, b), this._cleanLoadItem(b) }, b._saveLoadedItems = function (a) { var b = a.getLoadedItems(); if (null !== b) for (var c = 0; c < b.length; c++) { var d = b[c].item; this._loadItemsBySrc[d.src] = d, this._loadItemsById[d.id] = d, this._loadedResults[d.id] = b[c].result, this._loadedRawResults[d.id] = b[c].rawResult } }, b._finishOrderedItem = function (a, b) { var c = a.getItem(); if (this.maintainScriptOrder && c.type == createjs.Types.JAVASCRIPT || c.maintainOrder) { a instanceof createjs.JavaScriptLoader && (this._currentlyLoadingScript = !1); var d = createjs.indexOf(this._scriptOrder, c); return -1 == d ? !1 : (this._loadedScripts[d] = b === !0 ? !0 : c, this._checkScriptLoadOrder(), !0) } return !1 }, b._checkScriptLoadOrder = function () { for (var a = this._loadedScripts.length, b = 0; a > b; b++) { var c = this._loadedScripts[b]; if (null === c) break; if (c !== !0) { var d = this._loadedResults[c.id]; c.type == createjs.Types.JAVASCRIPT && createjs.DomUtils.appendToHead(d); var e = c._loader; this._processFinishedLoad(c, e), this._loadedScripts[b] = !0 } } }, b._processFinishedLoad = function (a, b) { if (this._numItemsLoaded++, !this.maintainScriptOrder && a.type == createjs.Types.JAVASCRIPT) { var c = b.getTag(); createjs.DomUtils.appendToHead(c) } this._updateProgress(), this._sendFileComplete(a, b), this._loadNext() }, b._canStartLoad = function (a) { if (!this.maintainScriptOrder || a.preferXHR) return !0; var b = a.getItem(); if (b.type != createjs.Types.JAVASCRIPT) return !0; if (this._currentlyLoadingScript) return !1; for (var c = this._scriptOrder.indexOf(b), d = 0; c > d;) { var e = this._loadedScripts[d]; if (null == e) return !1; d++ } return this._currentlyLoadingScript = !0, !0 }, b._removeLoadItem = function (a) { for (var b = this._currentLoads.length, c = 0; b > c; c++)if (this._currentLoads[c] == a) { this._currentLoads.splice(c, 1); break } }, b._cleanLoadItem = function (a) { var b = a.getItem(); b && delete b._loader }, b._handleProgress = function (a) { var b = a.target; this._sendFileProgress(b.getItem(), b.progress), this._updateProgress() }, b._updateProgress = function () { var a = this._numItemsLoaded / this._numItems, b = this._numItems - this._numItemsLoaded; if (b > 0) { for (var c = 0, d = 0, e = this._currentLoads.length; e > d; d++)c += this._currentLoads[d].progress; a += c / b * (b / this._numItems) } this._lastProgress != a && (this._sendProgress(a), this._lastProgress = a) }, b._disposeItem = function (a) { delete this._loadedResults[a.id], delete this._loadedRawResults[a.id], delete this._loadItemsById[a.id], delete this._loadItemsBySrc[a.src] }, b._sendFileProgress = function (a, b) { if (!this._isCanceled() && !this._paused && this.hasEventListener("fileprogress")) { var c = new createjs.Event("fileprogress"); c.progress = b, c.loaded = b, c.total = 1, c.item = a, this.dispatchEvent(c) } }, b._sendFileComplete = function (a, b) { if (!this._isCanceled() && !this._paused) { var c = new createjs.Event("fileload"); c.loader = b, c.item = a, c.result = this._loadedResults[a.id], c.rawResult = this._loadedRawResults[a.id], a.completeHandler && a.completeHandler(c), this.hasEventListener("fileload") && this.dispatchEvent(c) } }, b._sendFileStart = function (a) { var b = new createjs.Event("filestart"); b.item = a, this.hasEventListener("filestart") && this.dispatchEvent(b) }, b.toString = function () { return "[PreloadJS LoadQueue]" }, createjs.LoadQueue = createjs.promote(a, "AbstractLoader")
}(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !0, createjs.Types.TEXT) } var b = (createjs.extend(a, createjs.AbstractLoader), a); b.canLoadItem = function (a) { return a.type == createjs.Types.TEXT }, createjs.TextLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !0, createjs.Types.BINARY), this.on("initialize", this._updateXHR, this) } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.BINARY }, b._updateXHR = function (a) { a.loader.setResponseType("arraybuffer") }, createjs.BinaryLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.CSS), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "href", b ? this._tag = createjs.Elements.style() : this._tag = createjs.Elements.link(), this._tag.rel = "stylesheet", this._tag.type = "text/css" } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.CSS }, b._formatResult = function (a) { if (this._preferXHR) { var b = a.getTag(); if (b.styleSheet) b.styleSheet.cssText = a.getResult(!0); else { var c = createjs.Elements.text(a.getResult(!0)); b.appendChild(c) } } else b = this._tag; return createjs.DomUtils.appendToHead(b), b }, createjs.CSSLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, a.type), this._faces = {}, this._watched = [], this._count = 0, this._watchInterval = null, this._loadTimeout = null, this._injectCSS = void 0 === a.injectCSS ? !0 : a.injectCSS, this.dispatchEvent("initialize") } var b = createjs.extend(a, createjs.AbstractLoader); a.canLoadItem = function (a) { return a.type == createjs.Types.FONT || a.type == createjs.Types.FONTCSS }, a.sampleText = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ", a._ctx = document.createElement("canvas").getContext("2d"), a._referenceFonts = ["serif", "monospace"], a.WEIGHT_REGEX = /[- ._]*(thin|normal|book|regular|medium|black|heavy|[1-9]00|(?:extra|ultra|semi|demi)?[- ._]*(?:light|bold))[- ._]*/gi, a.STYLE_REGEX = /[- ._]*(italic|oblique)[- ._]*/gi, a.FONT_FORMAT = { woff2: "woff2", woff: "woff", ttf: "truetype", otf: "truetype" }, a.FONT_WEIGHT = { thin: 100, extralight: 200, ultralight: 200, light: 300, semilight: 300, demilight: 300, book: "normal", regular: "normal", semibold: 600, demibold: 600, extrabold: 800, ultrabold: 800, black: 900, heavy: 900 }, a.WATCH_DURATION = 10, b.load = function () { if (this.type == createjs.Types.FONTCSS) { var a = this._watchCSS(); if (!a) return void this.AbstractLoader_load() } else if (this._item.src instanceof Array) this._watchFontArray(); else { var b = this._defFromSrc(this._item.src); this._watchFont(b), this._injectStyleTag(this._cssFromDef(b)) } this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this.dispatchEvent("loadstart") }, b._handleTimeout = function () { this._stopWatching(), this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT")) }, b._createRequest = function () { return this._request }, b.handleEvent = function (a) { switch (a.type) { case "complete": this._rawResult = a.target._response, this._result = !0, this._parseCSS(this._rawResult); break; case "error": this._stopWatching(), this.AbstractLoader_handleEvent(a) } }, b._watchCSS = function () { var a = this._item.src; return a instanceof HTMLStyleElement && (this._injectCSS && !a.parentNode && (document.head || document.getElementsByTagName("head")[0]).appendChild(a), this._injectCSS = !1, a = "\n" + a.textContent), -1 !== a.search(/\n|\r|@font-face/i) ? (this._parseCSS(a), !0) : (this._request = new createjs.XHRRequest(this._item), !1) }, b._parseCSS = function (a) { for (var b = /@font-face\s*\{([^}]+)}/g; ;) { var c = b.exec(a); if (!c) break; this._watchFont(this._parseFontFace(c[1])) } this._injectStyleTag(a) }, b._watchFontArray = function () { for (var a, b = this._item.src, c = "", d = b.length - 1; d >= 0; d--) { var e = b[d]; a = "string" == typeof e ? this._defFromSrc(e) : this._defFromObj(e), this._watchFont(a), c += this._cssFromDef(a) + "\n" } this._injectStyleTag(c) }, b._injectStyleTag = function (a) { if (this._injectCSS) { var b = document.head || document.getElementsByTagName("head")[0], c = document.createElement("style"); c.type = "text/css", c.styleSheet ? c.styleSheet.cssText = a : c.appendChild(document.createTextNode(a)), b.appendChild(c) } }, b._parseFontFace = function (a) { var b = this._getCSSValue(a, "font-family"), c = this._getCSSValue(a, "src"); return b && c ? this._defFromObj({ family: b, src: c, style: this._getCSSValue(a, "font-style"), weight: this._getCSSValue(a, "font-weight") }) : null }, b._watchFont = function (a) { a && !this._faces[a.id] && (this._faces[a.id] = a, this._watched.push(a), this._count++, this._calculateReferenceSizes(a), this._startWatching()) }, b._startWatching = function () { null == this._watchInterval && (this._watchInterval = setInterval(createjs.proxy(this._watch, this), a.WATCH_DURATION)) }, b._stopWatching = function () { clearInterval(this._watchInterval), clearTimeout(this._loadTimeout), this._watchInterval = null }, b._watch = function () { for (var b = this._watched, c = a._referenceFonts, d = b.length, e = d - 1; e >= 0; e--)for (var f = b[e], g = f.refs, h = g.length - 1; h >= 0; h--) { var i = this._getTextWidth(f.family + "," + c[h], f.weight, f.style); if (i != g[h]) { var j = new createjs.Event("fileload"); f.type = "font-family", j.item = f, this.dispatchEvent(j), b.splice(e, 1); break } } if (d !== b.length) { var j = new createjs.ProgressEvent(this._count - b.length, this._count); this.dispatchEvent(j) } 0 === d && (this._stopWatching(), this._sendComplete()) }, b._calculateReferenceSizes = function (b) { for (var c = a._referenceFonts, d = b.refs = [], e = 0; e < c.length; e++)d[e] = this._getTextWidth(c[e], b.weight, b.style) }, b._defFromSrc = function (b) { var c, d = /[- ._]+/g, e = b, f = null; c = e.search(/[?#]/), -1 !== c && (e = e.substr(0, c)), c = e.lastIndexOf("."), -1 !== c && (f = e.substr(c + 1), e = e.substr(0, c)), c = e.lastIndexOf("/"), -1 !== c && (e = e.substr(c + 1)); var g = e, h = g.match(a.WEIGHT_REGEX); h && (h = h[0], g = g.replace(h, ""), h = h.replace(d, "").toLowerCase()); var i = e.match(a.STYLE_REGEX); i && (g = g.replace(i[0], ""), i = "italic"), g = g.replace(d, ""); var j = "local('" + e.replace(d, " ") + "'), url('" + b + "')", k = a.FONT_FORMAT[f]; return k && (j += " format('" + k + "')"), this._defFromObj({ family: g, weight: a.FONT_WEIGHT[h] || h, style: i, src: j }) }, b._defFromObj = function (a) { var b = { family: a.family, src: a.src, style: a.style || "normal", weight: a.weight || "normal" }; return b.id = b.family + ";" + b.style + ";" + b.weight, b }, b._cssFromDef = function (a) { return "@font-face {\n	font-family: '" + a.family + "';\n	font-style: " + a.style + ";\n	font-weight: " + a.weight + ";\n	src: " + a.src + ";\n}" }, b._getTextWidth = function (b, c, d) { var e = a._ctx; return e.font = d + " " + c + " 72px " + b, e.measureText(a.sampleText).width }, b._getCSSValue = function (a, b) { var c = new RegExp(b + ":s*([^;}]+?)s*[;}]"), d = c.exec(a); return d && d[1] ? d[1] : null }, createjs.FontLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.IMAGE), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", createjs.DomUtils.isImageTag(a) ? this._tag = a : createjs.DomUtils.isImageTag(a.src) ? this._tag = a.src : createjs.DomUtils.isImageTag(a.tag) && (this._tag = a.tag), null != this._tag ? this._preferXHR = !1 : this._tag = createjs.Elements.img(), this.on("initialize", this._updateXHR, this) } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.IMAGE }, b.load = function () { if ("" != this._tag.src && this._tag.complete) return void this._sendComplete(); var a = this._item.crossOrigin; 1 == a && (a = "Anonymous"), null == a || createjs.URLUtils.isLocal(this._item) || (this._tag.crossOrigin = a), this.AbstractLoader_load() }, b._updateXHR = function (a) { a.loader.mimeType = "text/plain; charset=x-user-defined-binary", a.loader.setResponseType && a.loader.setResponseType("blob") }, b._formatResult = function (a) { return this._formatImage }, b._formatImage = function (a, b) { var c = this._tag, d = window.URL || window.webkitURL; if (this._preferXHR) if (d) { var e = d.createObjectURL(this.getResult(!0)); c.src = e, c.addEventListener("load", this._cleanUpURL, !1), c.addEventListener("error", this._cleanUpURL, !1) } else c.src = this._item.src; else; c.complete ? a(c) : (c.onload = createjs.proxy(function () { a(this._tag), c.onload = c.onerror = null }, this), c.onerror = createjs.proxy(function (a) { b(new createjs.ErrorEvent("IMAGE_FORMAT", null, a)), c.onload = c.onerror = null }, this)) }, b._cleanUpURL = function (a) { var b = window.URL || window.webkitURL; b.revokeObjectURL(a.target.src) }, createjs.ImageLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.JAVASCRIPT), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "src", this.setTag(createjs.Elements.script()) } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.JAVASCRIPT }, b._formatResult = function (a) { var b = a.getTag(); return this._preferXHR && (b.text = a.getResult(!0)), b }, createjs.JavaScriptLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !0, createjs.Types.JSON), this.resultFormatter = this._formatResult } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.JSON }, b._formatResult = function (a) { var b = null; try { b = createjs.DataUtils.parseJSON(a.getResult(!0)) } catch (c) { var d = new createjs.ErrorEvent("JSON_FORMAT", null, c); return this._sendError(d), c } return b }, createjs.JSONLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !1, createjs.Types.JSONP), this.setTag(createjs.Elements.script()), this.getTag().type = "text/javascript" } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.JSONP }, b.cancel = function () { this.AbstractLoader_cancel(), this._dispose() }, b.load = function () { if (null == this._item.callback) throw new Error("callback is required for loading JSONP requests."); if (null != window[this._item.callback]) throw new Error("JSONP callback '" + this._item.callback + "' already exists on window. You need to specify a different callback or re-name the current one."); window[this._item.callback] = createjs.proxy(this._handleLoad, this), createjs.DomUtils.appendToBody(this._tag), this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), this._item.loadTimeout), this._tag.src = this._item.src }, b._handleLoad = function (a) { this._result = this._rawResult = a, this._sendComplete(), this._dispose() }, b._handleTimeout = function () { this._dispose(), this.dispatchEvent(new createjs.ErrorEvent("timeout")) }, b._dispose = function () { createjs.DomUtils.removeChild(this._tag), delete window[this._item.callback], clearTimeout(this._loadTimeout) }, createjs.JSONPLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.MANIFEST), this.plugins = null, this._manifestQueue = null } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.MANIFEST_PROGRESS = .25, c.canLoadItem = function (a) { return a.type == createjs.Types.MANIFEST }, b.load = function () { this.AbstractLoader_load() }, b._createRequest = function () { var a = this._item.callback; null != a ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item) }, b.handleEvent = function (a) { switch (a.type) { case "complete": return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.MANIFEST_PROGRESS), void this._loadManifest(this._result); case "progress": return a.loaded *= c.MANIFEST_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(a) }this.AbstractLoader_handleEvent(a) }, b.destroy = function () { this.AbstractLoader_destroy(), this._manifestQueue.close() }, b._loadManifest = function (a) { if (a && a.manifest) { var b = this._manifestQueue = new createjs.LoadQueue(this._preferXHR); b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("complete", this._handleManifestComplete, this, !0), b.on("error", this._handleManifestError, this, !0); for (var c = 0, d = this.plugins.length; d > c; c++)b.installPlugin(this.plugins[c]); b.loadManifest(a) } else this._sendComplete() }, b._handleManifestFileLoad = function (a) { a.target = null, this.dispatchEvent(a) }, b._handleManifestComplete = function (a) { this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete() }, b._handleManifestProgress = function (a) { this.progress = a.progress * (1 - c.MANIFEST_PROGRESS) + c.MANIFEST_PROGRESS, this._sendProgress(this.progress) }, b._handleManifestError = function (a) { var b = new createjs.Event("fileerror"); b.item = a.data, this.dispatchEvent(b) }, createjs.ManifestLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractMediaLoader_constructor(a, b, createjs.Types.SOUND), createjs.DomUtils.isAudioTag(a) ? this._tag = a : createjs.DomUtils.isAudioTag(a.src) ? this._tag = a : createjs.DomUtils.isAudioTag(a.tag) && (this._tag = createjs.DomUtils.isAudioTag(a) ? a : a.src), null != this._tag && (this._preferXHR = !1) } var b = createjs.extend(a, createjs.AbstractMediaLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.SOUND }, b._createTag = function (a) { var b = createjs.Elements.audio(); return b.autoplay = !1, b.preload = "none", b.src = a, b }, createjs.SoundLoader = createjs.promote(a, "AbstractMediaLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractMediaLoader_constructor(a, b, createjs.Types.VIDEO), createjs.DomUtils.isVideoTag(a) || createjs.DomUtils.isVideoTag(a.src) ? (this.setTag(createjs.DomUtils.isVideoTag(a) ? a : a.src), this._preferXHR = !1) : this.setTag(this._createTag()) } var b = createjs.extend(a, createjs.AbstractMediaLoader), c = a; b._createTag = function () { return createjs.Elements.video() }, c.canLoadItem = function (a) { return a.type == createjs.Types.VIDEO }, createjs.VideoLoader = createjs.promote(a, "AbstractMediaLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.SPRITESHEET), this._manifestQueue = null } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.SPRITESHEET_PROGRESS = .25, c.canLoadItem = function (a) { return a.type == createjs.Types.SPRITESHEET }, b.destroy = function () { this.AbstractLoader_destroy(), this._manifestQueue.close() }, b._createRequest = function () { var a = this._item.callback; null != a ? this._request = new createjs.JSONPLoader(this._item) : this._request = new createjs.JSONLoader(this._item) }, b.handleEvent = function (a) { switch (a.type) { case "complete": return this._rawResult = a.target.getResult(!0), this._result = a.target.getResult(), this._sendProgress(c.SPRITESHEET_PROGRESS), void this._loadManifest(this._result); case "progress": return a.loaded *= c.SPRITESHEET_PROGRESS, this.progress = a.loaded / a.total, (isNaN(this.progress) || this.progress == 1 / 0) && (this.progress = 0), void this._sendProgress(a) }this.AbstractLoader_handleEvent(a) }, b._loadManifest = function (a) { if (a && a.images) { var b = this._manifestQueue = new createjs.LoadQueue(this._preferXHR, this._item.path, this._item.crossOrigin); b.on("complete", this._handleManifestComplete, this, !0), b.on("fileload", this._handleManifestFileLoad, this), b.on("progress", this._handleManifestProgress, this), b.on("error", this._handleManifestError, this, !0), b.loadManifest(a.images) } }, b._handleManifestFileLoad = function (a) { var b = a.result; if (null != b) { var c = this.getResult().images, d = c.indexOf(a.item.src); c[d] = b } }, b._handleManifestComplete = function (a) { this._result = new createjs.SpriteSheet(this._result), this._loadedItems = this._manifestQueue.getItems(!0), this._sendComplete() }, b._handleManifestProgress = function (a) { this.progress = a.progress * (1 - c.SPRITESHEET_PROGRESS) + c.SPRITESHEET_PROGRESS, this._sendProgress(this.progress) }, b._handleManifestError = function (a) { var b = new createjs.Event("fileerror"); b.item = a.data, this.dispatchEvent(b) }, createjs.SpriteSheetLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b) { this.AbstractLoader_constructor(a, b, createjs.Types.SVG), this.resultFormatter = this._formatResult, this._tagSrcAttribute = "data", b ? this.setTag(createjs.Elements.svg()) : (this.setTag(createjs.Elements.object()), this.getTag().type = "image/svg+xml") } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.SVG }, b._formatResult = function (a) { var b = createjs.DataUtils.parseXML(a.getResult(!0)), c = a.getTag(); if (!this._preferXHR && document.body.contains(c) && document.body.removeChild(c), null != b.documentElement) { var d = b.documentElement; return document.importNode && (d = document.importNode(d, !0)), c.appendChild(d), c } return b }, createjs.SVGLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !0, createjs.Types.XML), this.resultFormatter = this._formatResult } var b = createjs.extend(a, createjs.AbstractLoader), c = a; c.canLoadItem = function (a) { return a.type == createjs.Types.XML }, b._formatResult = function (a) { return createjs.DataUtils.parseXML(a.getResult(!0)) }, createjs.XMLLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { var a = createjs.SoundJS = createjs.SoundJS || {}; a.version = "1.0.0", a.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT" }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "BrowserDetect cannot be instantiated" } var b = a.agent = window.navigator.userAgent; a.isWindowPhone = b.indexOf("IEMobile") > -1 || b.indexOf("Windows Phone") > -1, a.isFirefox = b.indexOf("Firefox") > -1, a.isOpera = null != window.opera, a.isChrome = b.indexOf("Chrome") > -1, a.isIOS = (b.indexOf("iPod") > -1 || b.indexOf("iPhone") > -1 || b.indexOf("iPad") > -1) && !a.isWindowPhone, a.isAndroid = b.indexOf("Android") > -1 && !a.isWindowPhone, a.isBlackberry = b.indexOf("Blackberry") > -1, createjs.BrowserDetect = a }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = function () { this.interrupt = null, this.delay = null, this.offset = null, this.loop = null, this.volume = null, this.pan = null, this.startTime = null, this.duration = null }, b = a.prototype = {}, c = a; c.create = function (a) { if ("string" == typeof a) return console && (console.warn || console.log)("Deprecated behaviour. Sound.play takes a configuration object instead of individual arguments. See docs for info."), (new createjs.PlayPropsConfig).set({ interrupt: a }); if (null == a || a instanceof c || a instanceof Object) return (new createjs.PlayPropsConfig).set(a); if (null == a) throw new Error("PlayProps configuration not recognized.") }, b.set = function (a) { if (null != a) for (var b in a) this[b] = a[b]; return this }, b.toString = function () { return "[PlayPropsConfig]" }, createjs.PlayPropsConfig = c }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a() { throw "Sound cannot be instantiated" } function b(a, b) { this.init(a, b) } var c = a; c.INTERRUPT_ANY = "any", c.INTERRUPT_EARLY = "early", c.INTERRUPT_LATE = "late", c.INTERRUPT_NONE = "none", c.PLAY_INITED = "playInited", c.PLAY_SUCCEEDED = "playSucceeded", c.PLAY_INTERRUPTED = "playInterrupted", c.PLAY_FINISHED = "playFinished", c.PLAY_FAILED = "playFailed", c.SUPPORTED_EXTENSIONS = ["mp3", "ogg", "opus", "mpeg", "wav", "m4a", "mp4", "aiff", "wma", "mid"], c.EXTENSION_MAP = { m4a: "mp4" }, c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/, c.defaultInterruptBehavior = c.INTERRUPT_NONE, c.alternateExtensions = [], c.activePlugin = null, c._masterVolume = 1, c._getMasterVolume = function () { return this._masterVolume }, c.getVolume = createjs.deprecate(c._getMasterVolume, "Sound.getVolume"), c._setMasterVolume = function (a) { if (null != Number(a) && (a = Math.max(0, Math.min(1, a)), c._masterVolume = a, !this.activePlugin || !this.activePlugin.setVolume || !this.activePlugin.setVolume(a))) for (var b = this._instances, d = 0, e = b.length; e > d; d++)b[d].setMasterVolume(a) }, c.setVolume = createjs.deprecate(c._setMasterVolume, "Sound.setVolume"), c._masterMute = !1, c._getMute = function () { return this._masterMute }, c.getMute = createjs.deprecate(c._getMute, "Sound.getMute"), c._setMute = function (a) { if (null != a && (this._masterMute = a, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a))) for (var b = this._instances, c = 0, d = b.length; d > c; c++)b[c].setMasterMute(a) }, c.setMute = createjs.deprecate(c._setMute, "Sound.setMute"), c._getCapabilities = function () { return null == c.activePlugin ? null : c.activePlugin._capabilities }, c.getCapabilities = createjs.deprecate(c._getCapabilities, "Sound.getCapabilities"), Object.defineProperties(c, { volume: { get: c._getMasterVolume, set: c._setMasterVolume }, muted: { get: c._getMute, set: c._setMute }, capabilities: { get: c._getCapabilities } }), c._pluginsRegistered = !1, c._lastID = 0, c._instances = [], c._idHash = {}, c._preloadHash = {}, c._defaultPlayPropsHash = {}, c.addEventListener = null, c.removeEventListener = null, c.removeAllEventListeners = null, c.dispatchEvent = null, c.hasEventListener = null, c._listeners = null, createjs.EventDispatcher.initialize(c), c.getPreloadHandlers = function () { return { callback: createjs.proxy(c.initLoad, c), types: ["sound"], extensions: c.SUPPORTED_EXTENSIONS } }, c._handleLoadComplete = function (a) { var b = a.target.getItem().src; if (c._preloadHash[b]) for (var d = 0, e = c._preloadHash[b].length; e > d; d++) { var f = c._preloadHash[b][d]; if (c._preloadHash[b][d] = !0, c.hasEventListener("fileload")) { var a = new createjs.Event("fileload"); a.src = f.src, a.id = f.id, a.data = f.data, a.sprite = f.sprite, c.dispatchEvent(a) } } }, c._handleLoadError = function (a) { var b = a.target.getItem().src; if (c._preloadHash[b]) for (var d = 0, e = c._preloadHash[b].length; e > d; d++) { var f = c._preloadHash[b][d]; if (c._preloadHash[b][d] = !1, c.hasEventListener("fileerror")) { var a = new createjs.Event("fileerror"); a.src = f.src, a.id = f.id, a.data = f.data, a.sprite = f.sprite, c.dispatchEvent(a) } } }, c._registerPlugin = function (a) { return a.isSupported() ? (c.activePlugin = new a, !0) : !1 }, c.registerPlugins = function (a) { c._pluginsRegistered = !0; for (var b = 0, d = a.length; d > b; b++)if (c._registerPlugin(a[b])) return !0; return !1 }, c.initializeDefaultPlugins = function () { return null != c.activePlugin ? !0 : c._pluginsRegistered ? !1 : c.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1 }, c.isReady = function () { return null != c.activePlugin }, c.initLoad = function (a) { return "video" == a.type ? !0 : c._registerSound(a) }, c._registerSound = function (a) {
        if (!c.initializeDefaultPlugins()) return !1; var d; if (a.src instanceof Object ? (d = c._parseSrc(a.src),
            d.src = a.path + d.src) : d = c._parsePath(a.src), null == d) return !1; a.src = d.src, a.type = "sound"; var e = a.data, f = null; if (null != e && (isNaN(e.channels) ? isNaN(e) || (f = parseInt(e)) : f = parseInt(e.channels), e.audioSprite)) for (var g, h = e.audioSprite.length; h--;)g = e.audioSprite[h], c._idHash[g.id] = { src: a.src, startTime: parseInt(g.startTime), duration: parseInt(g.duration) }, g.defaultPlayProps && (c._defaultPlayPropsHash[g.id] = createjs.PlayPropsConfig.create(g.defaultPlayProps)); null != a.id && (c._idHash[a.id] = { src: a.src }); var i = c.activePlugin.register(a); return b.create(a.src, f), null != e && isNaN(e) ? a.data.channels = f || b.maxPerChannel() : a.data = f || b.maxPerChannel(), i.type && (a.type = i.type), a.defaultPlayProps && (c._defaultPlayPropsHash[a.src] = createjs.PlayPropsConfig.create(a.defaultPlayProps)), i
    }, c.registerSound = function (a, b, d, e, f) { var g = { src: a, id: b, data: d, defaultPlayProps: f }; a instanceof Object && a.src && (e = b, g = a), g = createjs.LoadItem.create(g), g.path = e, null == e || g.src instanceof Object || (g.src = e + g.src); var h = c._registerSound(g); if (!h) return !1; if (c._preloadHash[g.src] || (c._preloadHash[g.src] = []), c._preloadHash[g.src].push(g), 1 == c._preloadHash[g.src].length) h.on("complete", this._handleLoadComplete, this), h.on("error", this._handleLoadError, this), c.activePlugin.preload(h); else if (1 == c._preloadHash[g.src][0]) return !0; return g }, c.registerSounds = function (a, b) { var c = []; a.path && (b ? b += a.path : b = a.path, a = a.manifest); for (var d = 0, e = a.length; e > d; d++)c[d] = createjs.Sound.registerSound(a[d].src, a[d].id, a[d].data, b, a[d].defaultPlayProps); return c }, c.removeSound = function (a, d) { if (null == c.activePlugin) return !1; a instanceof Object && a.src && (a = a.src); var e; if (a instanceof Object ? e = c._parseSrc(a) : (a = c._getSrcById(a).src, e = c._parsePath(a)), null == e) return !1; a = e.src, null != d && (a = d + a); for (var f in c._idHash) c._idHash[f].src == a && delete c._idHash[f]; return b.removeSrc(a), delete c._preloadHash[a], c.activePlugin.removeSound(a), !0 }, c.removeSounds = function (a, b) { var c = []; a.path && (b ? b += a.path : b = a.path, a = a.manifest); for (var d = 0, e = a.length; e > d; d++)c[d] = createjs.Sound.removeSound(a[d].src, b); return c }, c.removeAllSounds = function () { c._idHash = {}, c._preloadHash = {}, b.removeAll(), c.activePlugin && c.activePlugin.removeAllSounds() }, c.loadComplete = function (a) { if (!c.isReady()) return !1; var b = c._parsePath(a); return a = b ? c._getSrcById(b.src).src : c._getSrcById(a).src, void 0 == c._preloadHash[a] ? !1 : 1 == c._preloadHash[a][0] }, c._parsePath = function (a) { "string" != typeof a && (a = a.toString()); var b = a.match(c.FILE_PATTERN); if (null == b) return !1; for (var d = b[4], e = b[5], f = c.capabilities, g = 0; !f[e];)if (e = c.alternateExtensions[g++], g > c.alternateExtensions.length) return null; a = a.replace("." + b[5], "." + e); var h = { name: d, src: a, extension: e }; return h }, c._parseSrc = function (a) { var b = { name: void 0, src: void 0, extension: void 0 }, d = c.capabilities; for (var e in a) if (a.hasOwnProperty(e) && d[e]) { b.src = a[e], b.extension = e; break } if (!b.src) return !1; var f = b.src.lastIndexOf("/"); return -1 != f ? b.name = b.src.slice(f + 1) : b.name = b.src, b }, c.play = function (a, b) { var d = createjs.PlayPropsConfig.create(b), e = c.createInstance(a, d.startTime, d.duration), f = c._playInstance(e, d); return f || e._playFailed(), e }, c.createInstance = function (a, d, e) { if (!c.initializeDefaultPlugins()) return new createjs.DefaultSoundInstance(a, d, e); var f = c._defaultPlayPropsHash[a]; a = c._getSrcById(a); var g = c._parsePath(a.src), h = null; return null != g && null != g.src ? (b.create(g.src), null == d && (d = a.startTime), h = c.activePlugin.create(g.src, d, e || a.duration), f = f || c._defaultPlayPropsHash[g.src], f && h.applyPlayProps(f)) : h = new createjs.DefaultSoundInstance(a, d, e), h.uniqueId = c._lastID++, h }, c.stop = function () { for (var a = this._instances, b = a.length; b--;)a[b].stop() }, c.setDefaultPlayProps = function (a, b) { a = c._getSrcById(a), c._defaultPlayPropsHash[c._parsePath(a.src).src] = createjs.PlayPropsConfig.create(b) }, c.getDefaultPlayProps = function (a) { return a = c._getSrcById(a), c._defaultPlayPropsHash[c._parsePath(a.src).src] }, c._playInstance = function (a, b) { var d = c._defaultPlayPropsHash[a.src] || {}; if (null == b.interrupt && (b.interrupt = d.interrupt || c.defaultInterruptBehavior), null == b.delay && (b.delay = d.delay || 0), null == b.offset && (b.offset = a.position), null == b.loop && (b.loop = a.loop), null == b.volume && (b.volume = a.volume), null == b.pan && (b.pan = a.pan), 0 == b.delay) { var e = c._beginPlaying(a, b); if (!e) return !1 } else { var f = setTimeout(function () { c._beginPlaying(a, b) }, b.delay); a.delayTimeoutId = f } return this._instances.push(a), !0 }, c._beginPlaying = function (a, c) { if (!b.add(a, c.interrupt)) return !1; var d = a._beginPlaying(c); if (!d) { var e = createjs.indexOf(this._instances, a); return e > -1 && this._instances.splice(e, 1), !1 } return !0 }, c._getSrcById = function (a) { return c._idHash[a] || { src: a } }, c._playFinished = function (a) { b.remove(a); var c = createjs.indexOf(this._instances, a); c > -1 && this._instances.splice(c, 1) }, createjs.Sound = a, b.channels = {}, b.create = function (a, c) { var d = b.get(a); return null == d ? (b.channels[a] = new b(a, c), !0) : !1 }, b.removeSrc = function (a) { var c = b.get(a); return null == c ? !1 : (c._removeAll(), delete b.channels[a], !0) }, b.removeAll = function () { for (var a in b.channels) b.channels[a]._removeAll(); b.channels = {} }, b.add = function (a, c) { var d = b.get(a.src); return null == d ? !1 : d._add(a, c) }, b.remove = function (a) { var c = b.get(a.src); return null == c ? !1 : (c._remove(a), !0) }, b.maxPerChannel = function () { return d.maxDefault }, b.get = function (a) { return b.channels[a] }; var d = b.prototype; d.constructor = b, d.src = null, d.max = null, d.maxDefault = 100, d.length = 0, d.init = function (a, b) { this.src = a, this.max = b || this.maxDefault, -1 == this.max && (this.max = this.maxDefault), this._instances = [] }, d._get = function (a) { return this._instances[a] }, d._add = function (a, b) { return this._getSlot(b, a) ? (this._instances.push(a), this.length++, !0) : !1 }, d._remove = function (a) { var b = createjs.indexOf(this._instances, a); return -1 == b ? !1 : (this._instances.splice(b, 1), this.length--, !0) }, d._removeAll = function () { for (var a = this.length - 1; a >= 0; a--)this._instances[a].stop() }, d._getSlot = function (b, c) { var d, e; if (b != a.INTERRUPT_NONE && (e = this._get(0), null == e)) return !0; for (var f = 0, g = this.max; g > f; f++) { if (d = this._get(f), null == d) return !0; if (d.playState == a.PLAY_FINISHED || d.playState == a.PLAY_INTERRUPTED || d.playState == a.PLAY_FAILED) { e = d; break } b != a.INTERRUPT_NONE && (b == a.INTERRUPT_EARLY && d.position < e.position || b == a.INTERRUPT_LATE && d.position > e.position) && (e = d) } return null != e ? (e._interrupt(), this._remove(e), !0) : !1 }, d.toString = function () { return "[Sound SoundChannel]" }
}(), this.createjs = this.createjs || {}, function () { "use strict"; var a = function (a, b, c, d) { this.EventDispatcher_constructor(), this.src = a, this.uniqueId = -1, this.playState = null, this.delayTimeoutId = null, this._volume = 1, Object.defineProperty(this, "volume", { get: this._getVolume, set: this._setVolume }), this.getVolume = createjs.deprecate(this._getVolume, "AbstractSoundInstance.getVolume"), this.setVolume = createjs.deprecate(this._setVolume, "AbstractSoundInstance.setVolume"), this._pan = 0, Object.defineProperty(this, "pan", { get: this._getPan, set: this._setPan }), this.getPan = createjs.deprecate(this._getPan, "AbstractSoundInstance.getPan"), this.setPan = createjs.deprecate(this._setPan, "AbstractSoundInstance.setPan"), this._startTime = Math.max(0, b || 0), Object.defineProperty(this, "startTime", { get: this._getStartTime, set: this._setStartTime }), this.getStartTime = createjs.deprecate(this._getStartTime, "AbstractSoundInstance.getStartTime"), this.setStartTime = createjs.deprecate(this._setStartTime, "AbstractSoundInstance.setStartTime"), this._duration = Math.max(0, c || 0), Object.defineProperty(this, "duration", { get: this._getDuration, set: this._setDuration }), this.getDuration = createjs.deprecate(this._getDuration, "AbstractSoundInstance.getDuration"), this.setDuration = createjs.deprecate(this._setDuration, "AbstractSoundInstance.setDuration"), this._playbackResource = null, Object.defineProperty(this, "playbackResource", { get: this._getPlaybackResource, set: this._setPlaybackResource }), d !== !1 && d !== !0 && this._setPlaybackResource(d), this.getPlaybackResource = createjs.deprecate(this._getPlaybackResource, "AbstractSoundInstance.getPlaybackResource"), this.setPlaybackResource = createjs.deprecate(this._setPlaybackResource, "AbstractSoundInstance.setPlaybackResource"), this._position = 0, Object.defineProperty(this, "position", { get: this._getPosition, set: this._setPosition }), this.getPosition = createjs.deprecate(this._getPosition, "AbstractSoundInstance.getPosition"), this.setPosition = createjs.deprecate(this._setPosition, "AbstractSoundInstance.setPosition"), this._loop = 0, Object.defineProperty(this, "loop", { get: this._getLoop, set: this._setLoop }), this.getLoop = createjs.deprecate(this._getLoop, "AbstractSoundInstance.getLoop"), this.setLoop = createjs.deprecate(this._setLoop, "AbstractSoundInstance.setLoop"), this._muted = !1, Object.defineProperty(this, "muted", { get: this._getMuted, set: this._setMuted }), this.getMuted = createjs.deprecate(this._getMuted, "AbstractSoundInstance.getMuted"), this.setMuted = createjs.deprecate(this._setMuted, "AbstractSoundInstance.setMuted"), this._paused = !1, Object.defineProperty(this, "paused", { get: this._getPaused, set: this._setPaused }), this.getPaused = createjs.deprecate(this._getPaused, "AbstractSoundInstance.getPaused"), this.setPaused = createjs.deprecate(this._setPaused, "AbstractSoundInstance.setPaused") }, b = createjs.extend(a, createjs.EventDispatcher); b.play = function (a) { var b = createjs.PlayPropsConfig.create(a); return this.playState == createjs.Sound.PLAY_SUCCEEDED ? (this.applyPlayProps(b), void (this._paused && this._setPaused(!1))) : (this._cleanUp(), createjs.Sound._playInstance(this, b), this) }, b.stop = function () { return this._position = 0, this._paused = !1, this._handleStop(), this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, this }, b.destroy = function () { this._cleanUp(), this.src = null, this.playbackResource = null, this.removeAllEventListeners() }, b.applyPlayProps = function (a) { return null != a.offset && this._setPosition(a.offset), null != a.loop && this._setLoop(a.loop), null != a.volume && this._setVolume(a.volume), null != a.pan && this._setPan(a.pan), null != a.startTime && (this._setStartTime(a.startTime), this._setDuration(a.duration)), this }, b.toString = function () { return "[AbstractSoundInstance]" }, b._getPaused = function () { return this._paused }, b._setPaused = function (a) { return a !== !0 && a !== !1 || this._paused == a || 1 == a && this.playState != createjs.Sound.PLAY_SUCCEEDED ? void 0 : (this._paused = a, a ? this._pause() : this._resume(), clearTimeout(this.delayTimeoutId), this) }, b._setVolume = function (a) { return a == this._volume ? this : (this._volume = Math.max(0, Math.min(1, a)), this._muted || this._updateVolume(), this) }, b._getVolume = function () { return this._volume }, b._setMuted = function (a) { return a === !0 || a === !1 ? (this._muted = a, this._updateVolume(), this) : void 0 }, b._getMuted = function () { return this._muted }, b._setPan = function (a) { return a == this._pan ? this : (this._pan = Math.max(-1, Math.min(1, a)), this._updatePan(), this) }, b._getPan = function () { return this._pan }, b._getPosition = function () { return this._paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || (this._position = this._calculateCurrentPosition()), this._position }, b._setPosition = function (a) { return this._position = Math.max(0, a), this.playState == createjs.Sound.PLAY_SUCCEEDED && this._updatePosition(), this }, b._getStartTime = function () { return this._startTime }, b._setStartTime = function (a) { return a == this._startTime ? this : (this._startTime = Math.max(0, a || 0), this._updateStartTime(), this) }, b._getDuration = function () { return this._duration }, b._setDuration = function (a) { return a == this._duration ? this : (this._duration = Math.max(0, a || 0), this._updateDuration(), this) }, b._setPlaybackResource = function (a) { return this._playbackResource = a, 0 == this._duration && this._playbackResource && this._setDurationFromSource(), this }, b._getPlaybackResource = function () { return this._playbackResource }, b._getLoop = function () { return this._loop }, b._setLoop = function (a) { null != this._playbackResource && (0 != this._loop && 0 == a ? this._removeLooping(a) : 0 == this._loop && 0 != a && this._addLooping(a)), this._loop = a }, b._sendEvent = function (a) { var b = new createjs.Event(a); this.dispatchEvent(b) }, b._cleanUp = function () { clearTimeout(this.delayTimeoutId), this._handleCleanUp(), this._paused = !1, createjs.Sound._playFinished(this) }, b._interrupt = function () { this._cleanUp(), this.playState = createjs.Sound.PLAY_INTERRUPTED, this._sendEvent("interrupted") }, b._beginPlaying = function (a) { return this._setPosition(a.offset), this._setLoop(a.loop), this._setVolume(a.volume), this._setPan(a.pan), null != a.startTime && (this._setStartTime(a.startTime), this._setDuration(a.duration)), null != this._playbackResource && this._position < this._duration ? (this._paused = !1, this._handleSoundReady(), this.playState = createjs.Sound.PLAY_SUCCEEDED, this._sendEvent("succeeded"), !0) : (this._playFailed(), !1) }, b._playFailed = function () { this._cleanUp(), this.playState = createjs.Sound.PLAY_FAILED, this._sendEvent("failed") }, b._handleSoundComplete = function (a) { return this._position = 0, 0 != this._loop ? (this._loop--, this._handleLoop(), void this._sendEvent("loop")) : (this._cleanUp(), this.playState = createjs.Sound.PLAY_FINISHED, void this._sendEvent("complete")) }, b._handleSoundReady = function () { }, b._updateVolume = function () { }, b._updatePan = function () { }, b._updateStartTime = function () { }, b._updateDuration = function () { }, b._setDurationFromSource = function () { }, b._calculateCurrentPosition = function () { }, b._updatePosition = function () { }, b._removeLooping = function (a) { }, b._addLooping = function (a) { }, b._pause = function () { }, b._resume = function () { }, b._handleStop = function () { }, b._handleCleanUp = function () { }, b._handleLoop = function () { }, createjs.AbstractSoundInstance = createjs.promote(a, "EventDispatcher"), createjs.DefaultSoundInstance = createjs.AbstractSoundInstance }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = function () { this._capabilities = null, this._loaders = {}, this._audioSources = {}, this._soundInstances = {}, this._volume = 1, this._loaderClass, this._soundInstanceClass }, b = a.prototype; a._capabilities = null, a.isSupported = function () { return !0 }, b.register = function (a) { var b = this._loaders[a.src]; return b && !b.canceled ? this._loaders[a.src] : (this._audioSources[a.src] = !0, this._soundInstances[a.src] = [], b = new this._loaderClass(a), b.on("complete", this._handlePreloadComplete, this), this._loaders[a.src] = b, b) }, b.preload = function (a) { a.on("error", this._handlePreloadError, this), a.load() }, b.isPreloadStarted = function (a) { return null != this._audioSources[a] }, b.isPreloadComplete = function (a) { return !(null == this._audioSources[a] || 1 == this._audioSources[a]) }, b.removeSound = function (a) { if (this._soundInstances[a]) { for (var b = this._soundInstances[a].length; b--;) { var c = this._soundInstances[a][b]; c.destroy() } delete this._soundInstances[a], delete this._audioSources[a], this._loaders[a] && this._loaders[a].destroy(), delete this._loaders[a] } }, b.removeAllSounds = function () { for (var a in this._audioSources) this.removeSound(a) }, b.create = function (a, b, c) { this.isPreloadStarted(a) || this.preload(this.register(a)); var d = new this._soundInstanceClass(a, b, c, this._audioSources[a]); return this._soundInstances[a] && this._soundInstances[a].push(d), d.setMasterVolume && d.setMasterVolume(createjs.Sound.volume), d.setMasterMute && d.setMasterMute(createjs.Sound.muted), d }, b.setVolume = function (a) { return this._volume = a, this._updateVolume(), !0 }, b.getVolume = function () { return this._volume }, b.setMute = function (a) { return this._updateVolume(), !0 }, b.toString = function () { return "[AbstractPlugin]" }, b._handlePreloadComplete = function (a) { var b = a.target.getItem().src; this._audioSources[b] = a.result; for (var c = 0, d = this._soundInstances[b].length; d > c; c++) { var e = this._soundInstances[b][c]; e.playbackResource = this._audioSources[b], this._soundInstances[b] = null } }, b._handlePreloadError = function (a) { }, b._updateVolume = function () { }, createjs.AbstractPlugin = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { this.AbstractLoader_constructor(a, !0, createjs.Types.SOUND) } var b = createjs.extend(a, createjs.AbstractLoader); a.context = null, b.toString = function () { return "[WebAudioLoader]" }, b._createRequest = function () { this._request = new createjs.XHRRequest(this._item, !1), this._request.setResponseType("arraybuffer") }, b._sendComplete = function (b) { a.context.decodeAudioData(this._rawResult, createjs.proxy(this._handleAudioDecoded, this), createjs.proxy(this._sendError, this)) }, b._handleAudioDecoded = function (a) { this._result = a, this.AbstractLoader__sendComplete() }, createjs.WebAudioLoader = createjs.promote(a, "AbstractLoader") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, d, e) { this.AbstractSoundInstance_constructor(a, b, d, e), this.gainNode = c.context.createGain(), this.panNode = c.context.createPanner(), this.panNode.panningModel = c._panningModel, this.panNode.connect(this.gainNode), this._updatePan(), this.sourceNode = null, this._soundCompleteTimeout = null, this._sourceNodeNext = null, this._playbackStartTime = 0, this._endedHandler = createjs.proxy(this._handleSoundComplete, this) } var b = createjs.extend(a, createjs.AbstractSoundInstance), c = a; c.context = null, c._scratchBuffer = null, c.destinationNode = null, c._panningModel = "equalpower", b.destroy = function () { this.AbstractSoundInstance_destroy(), this.panNode.disconnect(0), this.panNode = null, this.gainNode.disconnect(0), this.gainNode = null }, b.toString = function () { return "[WebAudioSoundInstance]" }, b._updatePan = function () { this.panNode.setPosition(this._pan, 0, -.5) }, b._removeLooping = function (a) { this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext) }, b._addLooping = function (a) { this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0)) }, b._setDurationFromSource = function () { this._duration = 1e3 * this.playbackResource.duration }, b._handleCleanUp = function () { this.sourceNode && this.playState == createjs.Sound.PLAY_SUCCEEDED && (this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext)), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout), this._playbackStartTime = 0 }, b._cleanUpAudioNode = function (a) { if (a) { if (a.stop(0), a.disconnect(0), createjs.BrowserDetect.isIOS) try { a.buffer = c._scratchBuffer } catch (b) { } a = null } return a }, b._handleSoundReady = function (a) { this.gainNode.connect(c.destinationNode); var b = .001 * this._duration, d = Math.min(.001 * Math.max(0, this._position), b); this.sourceNode = this._createAndPlayAudioNode(c.context.currentTime - b, d), this._playbackStartTime = this.sourceNode.startTime - d, this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (b - d)), 0 != this._loop && (this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0)) }, b._createAndPlayAudioNode = function (a, b) { var d = c.context.createBufferSource(); d.buffer = this.playbackResource, d.connect(this.panNode); var e = .001 * this._duration; return d.startTime = a + e, d.start(d.startTime, b + .001 * this._startTime, e - b), d }, b._pause = function () { this._position = 1e3 * (c.context.currentTime - this._playbackStartTime), this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), 0 != this.gainNode.numberOfOutputs && this.gainNode.disconnect(0), clearTimeout(this._soundCompleteTimeout) }, b._resume = function () { this._handleSoundReady() }, b._updateVolume = function () { var a = this._muted ? 0 : this._volume; a != this.gainNode.gain.value && (this.gainNode.gain.value = a) }, b._calculateCurrentPosition = function () { return 1e3 * (c.context.currentTime - this._playbackStartTime) }, b._updatePosition = function () { this.sourceNode = this._cleanUpAudioNode(this.sourceNode), this._sourceNodeNext = this._cleanUpAudioNode(this._sourceNodeNext), clearTimeout(this._soundCompleteTimeout), this._paused || this._handleSoundReady() }, b._handleLoop = function () { this._cleanUpAudioNode(this.sourceNode), this.sourceNode = this._sourceNodeNext, this._playbackStartTime = this.sourceNode.startTime, this._sourceNodeNext = this._createAndPlayAudioNode(this._playbackStartTime, 0), this._soundCompleteTimeout = setTimeout(this._endedHandler, this._duration) }, b._updateDuration = function () { this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._pause(), this._resume()) }, createjs.WebAudioSoundInstance = createjs.promote(a, "AbstractSoundInstance") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.AbstractPlugin_constructor(), this._panningModel = c._panningModel, this.context = c.context, this.dynamicsCompressorNode = this.context.createDynamicsCompressor(), this.dynamicsCompressorNode.connect(this.context.destination), this.gainNode = this.context.createGain(), this.gainNode.connect(this.dynamicsCompressorNode), createjs.WebAudioSoundInstance.destinationNode = this.gainNode, this._capabilities = c._capabilities, this._loaderClass = createjs.WebAudioLoader, this._soundInstanceClass = createjs.WebAudioSoundInstance, this._addPropsToClasses() } var b = createjs.extend(a, createjs.AbstractPlugin), c = a; c._capabilities = null, c._panningModel = "equalpower", c.context = null, c._scratchBuffer = null, c._unlocked = !1, c.DEFAULT_SAMPLE_RATE = 44100, c.isSupported = function () { var a = createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry; return "file:" != location.protocol || a || this._isFileXHRSupported() ? (c._generateCapabilities(), null == c.context ? !1 : !0) : !1 }, c.playEmptySound = function () { if (null != c.context) { var a = c.context.createBufferSource(); a.buffer = c._scratchBuffer, a.connect(c.context.destination), a.start(0, 0, 0) } }, c._isFileXHRSupported = function () { var a = !0, b = new XMLHttpRequest; try { b.open("GET", "WebAudioPluginTest.fail", !1) } catch (c) { return a = !1 } b.onerror = function () { a = !1 }, b.onload = function () { a = 404 == this.status || 200 == this.status || 0 == this.status && "" != this.response }; try { b.send() } catch (c) { a = !1 } return a }, c._generateCapabilities = function () { if (null == c._capabilities) { var a = document.createElement("audio"); if (null == a.canPlayType) return null; if (null == c.context && (c.context = c._createAudioContext(), null == c.context)) return null; null == c._scratchBuffer && (c._scratchBuffer = c.context.createBuffer(1, 1, 22050)), c._compatibilitySetUp(), "ontouchstart" in window && "running" != c.context.state && (c._unlock(), document.addEventListener("mousedown", c._unlock, !0), document.addEventListener("touchstart", c._unlock, !0), document.addEventListener("touchend", c._unlock, !0)), c._capabilities = { panning: !0, volume: !0, tracks: -1 }; for (var b = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = b.length; f > e; e++) { var g = b[e], h = d[g] || g; c._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h) } c.context.destination.numberOfChannels < 2 && (c._capabilities.panning = !1) } }, c._createAudioContext = function () { var a = window.AudioContext || window.webkitAudioContext; if (null == a) return null; var b = new a; if (/(iPhone|iPad)/i.test(navigator.userAgent) && b.sampleRate !== c.DEFAULT_SAMPLE_RATE) { var d = b.createBuffer(1, 1, c.DEFAULT_SAMPLE_RATE), e = b.createBufferSource(); e.buffer = d, e.connect(b.destination), e.start(0), e.disconnect(), b.close(), b = new a } return b }, c._compatibilitySetUp = function () { if (c._panningModel = "equalpower", !c.context.createGain) { c.context.createGain = c.context.createGainNode; var a = c.context.createBufferSource(); a.__proto__.start = a.__proto__.noteGrainOn, a.__proto__.stop = a.__proto__.noteOff, c._panningModel = 0 } }, c._unlock = function () { c._unlocked || (c.playEmptySound(), "running" == c.context.state && (document.removeEventListener("mousedown", c._unlock, !0), document.removeEventListener("touchend", c._unlock, !0), document.removeEventListener("touchstart", c._unlock, !0), c._unlocked = !0)) }, b.toString = function () { return "[WebAudioPlugin]" }, b._addPropsToClasses = function () { var a = this._soundInstanceClass; a.context = this.context, a._scratchBuffer = c._scratchBuffer, a.destinationNode = this.gainNode, a._panningModel = this._panningModel, this._loaderClass.context = this.context }, b._updateVolume = function () { var a = createjs.Sound._masterMute ? 0 : this._volume; a != this.gainNode.gain.value && (this.gainNode.gain.value = a) }, createjs.WebAudioPlugin = createjs.promote(a, "AbstractPlugin") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "HTMLAudioTagPool cannot be instantiated" } function b(a) { this._tags = [] } var c = a; c._tags = {}, c._tagPool = new b, c._tagUsed = {}, c.get = function (a) { var b = c._tags[a]; return null == b ? (b = c._tags[a] = c._tagPool.get(), b.src = a) : c._tagUsed[a] ? (b = c._tagPool.get(), b.src = a) : c._tagUsed[a] = !0, b }, c.set = function (a, b) { b == c._tags[a] ? c._tagUsed[a] = !1 : c._tagPool.set(b) }, c.remove = function (a) { var b = c._tags[a]; return null == b ? !1 : (c._tagPool.set(b), delete c._tags[a], delete c._tagUsed[a], !0) }, c.getDuration = function (a) { var b = c._tags[a]; return null != b && b.duration ? 1e3 * b.duration : 0 }, createjs.HTMLAudioTagPool = a; var d = b.prototype; d.constructor = b, d.get = function () { var a; return a = 0 == this._tags.length ? this._createTag() : this._tags.pop(), null == a.parentNode && document.body.appendChild(a), a }, d.set = function (a) { var b = createjs.indexOf(this._tags, a); -1 == b && (this._tags.src = null, this._tags.push(a)) }, d.toString = function () { return "[TagPool]" }, d._createTag = function () { var a = document.createElement("audio"); return a.autoplay = !1, a.preload = "none", a } }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a, b, c, d) { this.AbstractSoundInstance_constructor(a, b, c, d), this._audioSpriteStopTime = null, this._delayTimeoutId = null, this._endedHandler = createjs.proxy(this._handleSoundComplete, this), this._readyHandler = createjs.proxy(this._handleTagReady, this), this._stalledHandler = createjs.proxy(this._playFailed, this), this._audioSpriteEndHandler = createjs.proxy(this._handleAudioSpriteLoop, this), this._loopHandler = createjs.proxy(this._handleSoundComplete, this), c ? this._audioSpriteStopTime = .001 * (b + c) : this._duration = createjs.HTMLAudioTagPool.getDuration(this.src) } var b = createjs.extend(a, createjs.AbstractSoundInstance); b.setMasterVolume = function (a) { this._updateVolume() }, b.setMasterMute = function (a) { this._updateVolume() }, b.toString = function () { return "[HTMLAudioSoundInstance]" }, b._removeLooping = function () { null != this._playbackResource && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1)) }, b._addLooping = function () { null == this._playbackResource || this._audioSpriteStopTime || (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0) }, b._handleCleanUp = function () { var a = this._playbackResource; if (null != a) { a.pause(), a.loop = !1, a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1); try { a.currentTime = this._startTime } catch (b) { } createjs.HTMLAudioTagPool.set(this.src, a), this._playbackResource = null } }, b._beginPlaying = function (a) { return this._playbackResource = createjs.HTMLAudioTagPool.get(this.src), this.AbstractSoundInstance__beginPlaying(a) }, b._handleSoundReady = function (a) { if (4 !== this._playbackResource.readyState) { var b = this._playbackResource; return b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), b.preload = "auto", void b.load() } this._updateVolume(), this._playbackResource.currentTime = .001 * (this._startTime + this._position), this._audioSpriteStopTime ? this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1) : (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), 0 != this._loop && (this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.loop = !0)), this._playbackResource.play() }, b._handleTagReady = function (a) { this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED, this._stalledHandler, !1), this._handleSoundReady() }, b._pause = function () { this._playbackResource.pause() }, b._resume = function () { this._playbackResource.play() }, b._updateVolume = function () { if (null != this._playbackResource) { var a = this._muted || createjs.Sound._masterMute ? 0 : this._volume * createjs.Sound._masterVolume; a != this._playbackResource.volume && (this._playbackResource.volume = a) } }, b._calculateCurrentPosition = function () { return 1e3 * this._playbackResource.currentTime - this._startTime }, b._updatePosition = function () { this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1); try { this._playbackResource.currentTime = .001 * (this._position + this._startTime) } catch (a) { this._handleSetPositionSeek(null) } }, b._handleSetPositionSeek = function (a) { null != this._playbackResource && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._handleSetPositionSeek, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1)) }, b._handleAudioSpriteLoop = function (a) { this._playbackResource.currentTime <= this._audioSpriteStopTime || (this._playbackResource.pause(), 0 == this._loop ? this._handleSoundComplete(null) : (this._position = 0, this._loop--, this._playbackResource.currentTime = .001 * this._startTime, this._paused || this._playbackResource.play(), this._sendEvent("loop"))) }, b._handleLoop = function (a) { 0 == this._loop && (this._playbackResource.loop = !1, this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED, this._loopHandler, !1)) }, b._updateStartTime = function () { this._audioSpriteStopTime = .001 * (this._startTime + this._duration), this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1)) }, b._updateDuration = function () { this._audioSpriteStopTime = .001 * (this._startTime + this._duration), this.playState == createjs.Sound.PLAY_SUCCEEDED && (this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED, this._endedHandler, !1), this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE, this._audioSpriteEndHandler, !1)) }, b._setDurationFromSource = function () { this._duration = createjs.HTMLAudioTagPool.getDuration(this.src), this._playbackResource = null }, createjs.HTMLAudioSoundInstance = createjs.promote(a, "AbstractSoundInstance") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { this.AbstractPlugin_constructor(), this._capabilities = c._capabilities, this._loaderClass = createjs.SoundLoader, this._soundInstanceClass = createjs.HTMLAudioSoundInstance } var b = createjs.extend(a, createjs.AbstractPlugin), c = a; c.MAX_INSTANCES = 30, c._AUDIO_READY = "canplaythrough", c._AUDIO_ENDED = "ended", c._AUDIO_SEEKED = "seeked", c._AUDIO_STALLED = "stalled", c._TIME_UPDATE = "timeupdate", c._capabilities = null, c.isSupported = function () { return c._generateCapabilities(), null != c._capabilities }, c._generateCapabilities = function () { if (null == c._capabilities) { var a = document.createElement("audio"); if (null == a.canPlayType) return null; c._capabilities = { panning: !1, volume: !0, tracks: -1 }; for (var b = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = b.length; f > e; e++) { var g = b[e], h = d[g] || g; c._capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + h) && "" != a.canPlayType("audio/" + h) } } }, b.register = function (a) { var b = createjs.HTMLAudioTagPool.get(a.src), c = this.AbstractPlugin_register(a); return c.setTag(b), c }, b.removeSound = function (a) { this.AbstractPlugin_removeSound(a), createjs.HTMLAudioTagPool.remove(a) }, b.create = function (a, b, c) { var d = this.AbstractPlugin_create(a, b, c); return d.playbackResource = null, d }, b.toString = function () { return "[HTMLAudioPlugin]" }, b.setVolume = b.getVolume = b.setMute = null, createjs.HTMLAudioPlugin = createjs.promote(a, "AbstractPlugin") }(), this.createjs = this.createjs || {}, function () {
    "use strict"; function a(a) {
        this.EventDispatcher_constructor(), this.ignoreGlobalPause = !1, this.loop = 0, this.useTicks = !1, this.reversed = !1, this.bounce = !1, this.timeScale = 1, this.duration = 0, this.position = 0, this.rawPosition = -1, this._paused = !0, this._next = null,
            this._prev = null, this._parent = null, this._labels = null, this._labelList = null, a && (this.useTicks = !!a.useTicks, this.ignoreGlobalPause = !!a.ignoreGlobalPause, this.loop = a.loop === !0 ? -1 : a.loop || 0, this.reversed = !!a.reversed, this.bounce = !!a.bounce, this.timeScale = a.timeScale || 1, a.onChange && this.addEventListener("change", a.onChange), a.onComplete && this.addEventListener("complete", a.onComplete))
    } var b = createjs.extend(a, createjs.EventDispatcher); b._setPaused = function (a) { return createjs.Tween._register(this, a), this }, b.setPaused = createjs.deprecate(b._setPaused, "AbstractTween.setPaused"), b._getPaused = function () { return this._paused }, b.getPaused = createjs.deprecate(b._getPaused, "AbstactTween.getPaused"), b._getCurrentLabel = function (a) { var b = this.getLabels(); null == a && (a = this.position); for (var c = 0, d = b.length; d > c && !(a < b[c].position); c++); return 0 === c ? null : b[c - 1].label }, b.getCurrentLabel = createjs.deprecate(b._getCurrentLabel, "AbstractTween.getCurrentLabel"); try { Object.defineProperties(b, { paused: { set: b._setPaused, get: b._getPaused }, currentLabel: { get: b._getCurrentLabel } }) } catch (c) { } b.advance = function (a, b) { this.setPosition(this.rawPosition + a * this.timeScale, b) }, b.setPosition = function (a, b, c, d) { var e = this.duration, f = this.loop, g = this.rawPosition, h = 0, i = 0, j = !1; if (0 > a && (a = 0), 0 === e) { if (j = !0, -1 !== g) return j } else { if (h = a / e | 0, i = a - h * e, j = -1 !== f && a >= f * e + e, j && (a = (i = e) * (h = f) + e), a === g) return j; var k = !this.reversed != !(this.bounce && h % 2); k && (i = e - i) } this.position = i, this.rawPosition = a, this._updatePosition(c, j), j && (this.paused = !0), d && d(this), b || this._runActions(g, a, c, !c && -1 === g), this.dispatchEvent("change"), j && this.dispatchEvent("complete") }, b.calculatePosition = function (a) { var b = this.duration, c = this.loop, d = 0, e = 0; if (0 === b) return 0; -1 !== c && a >= c * b + b ? (e = b, d = c) : 0 > a ? e = 0 : (d = a / b | 0, e = a - d * b); var f = !this.reversed != !(this.bounce && d % 2); return f ? b - e : e }, b.getLabels = function () { var a = this._labelList; if (!a) { a = this._labelList = []; var b = this._labels; for (var c in b) a.push({ label: c, position: b[c] }); a.sort(function (a, b) { return a.position - b.position }) } return a }, b.setLabels = function (a) { this._labels = a, this._labelList = null }, b.addLabel = function (a, b) { this._labels || (this._labels = {}), this._labels[a] = b; var c = this._labelList; if (c) { for (var d = 0, e = c.length; e > d && !(b < c[d].position); d++); c.splice(d, 0, { label: a, position: b }) } }, b.gotoAndPlay = function (a) { this.paused = !1, this._goto(a) }, b.gotoAndStop = function (a) { this.paused = !0, this._goto(a) }, b.resolve = function (a) { var b = Number(a); return isNaN(b) && (b = this._labels && this._labels[a]), b }, b.toString = function () { return "[AbstractTween]" }, b.clone = function () { throw "AbstractTween can not be cloned." }, b._init = function (a) { a && a.paused || (this.paused = !1), a && null != a.position && this.setPosition(a.position) }, b._updatePosition = function (a, b) { }, b._goto = function (a) { var b = this.resolve(a); null != b && this.setPosition(b, !1, !0) }, b._runActions = function (a, b, c, d) { if (this._actionHead || this.tweens) { var e, f, g, h, i = this.duration, j = this.reversed, k = this.bounce, l = this.loop; if (0 === i ? (e = f = g = h = 0, j = k = !1) : (e = a / i | 0, f = b / i | 0, g = a - e * i, h = b - f * i), -1 !== l && (f > l && (h = i, f = l), e > l && (g = i, e = l)), c) return this._runActionsRange(h, h, c, d); if (e !== f || g !== h || c || d) { -1 === e && (e = g = 0); var m = b >= a, n = e; do { var o = !j != !(k && n % 2), p = n === e ? g : m ? 0 : i, q = n === f ? h : m ? i : 0; if (o && (p = i - p, q = i - q), k && n !== e && p === q); else if (this._runActionsRange(p, q, c, d || n !== e && !k)) return !0; d = !1 } while (m && ++n <= f || !m && --n >= f) } } }, b._runActionsRange = function (a, b, c, d) { }, createjs.AbstractTween = createjs.promote(a, "EventDispatcher")
}(), this.createjs = this.createjs || {}, function () { "use strict"; function a(c, d) { this.AbstractTween_constructor(d), this.pluginData = null, this.target = c, this.passive = !1, this._stepHead = new b(null, 0, 0, {}, null, !0), this._stepTail = this._stepHead, this._stepPosition = 0, this._actionHead = null, this._actionTail = null, this._plugins = null, this._pluginIds = null, this._injected = null, d && (this.pluginData = d.pluginData, d.override && a.removeTweens(c)), this.pluginData || (this.pluginData = {}), this._init(d) } function b(a, b, c, d, e, f) { this.next = null, this.prev = a, this.t = b, this.d = c, this.props = d, this.ease = e, this.passive = f, this.index = a ? a.index + 1 : 0 } function c(a, b, c, d, e) { this.next = null, this.prev = a, this.t = b, this.d = 0, this.scope = c, this.funct = d, this.params = e } var d = createjs.extend(a, createjs.AbstractTween); a.IGNORE = {}, a._tweens = [], a._plugins = null, a._tweenHead = null, a._tweenTail = null, a.get = function (b, c) { return new a(b, c) }, a.tick = function (b, c) { for (var d = a._tweenHead; d;) { var e = d._next; c && !d.ignoreGlobalPause || d._paused || d.advance(d.useTicks ? 1 : b), d = e } }, a.handleEvent = function (a) { "tick" === a.type && this.tick(a.delta, a.paused) }, a.removeTweens = function (b) { if (b.tweenjs_count) { for (var c = a._tweenHead; c;) { var d = c._next; c.target === b && a._register(c, !0), c = d } b.tweenjs_count = 0 } }, a.removeAllTweens = function () { for (var b = a._tweenHead; b;) { var c = b._next; b._paused = !0, b.target && (b.target.tweenjs_count = 0), b._next = b._prev = null, b = c } a._tweenHead = a._tweenTail = null }, a.hasActiveTweens = function (b) { return b ? !!b.tweenjs_count : !!a._tweenHead }, a._installPlugin = function (b) { for (var c = b.priority = b.priority || 0, d = a._plugins = a._plugins || [], e = 0, f = d.length; f > e && !(c < d[e].priority); e++); d.splice(e, 0, b) }, a._register = function (b, c) { var d = b.target; if (!c && b._paused) { d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1); var e = a._tweenTail; e ? (a._tweenTail = e._next = b, b._prev = e) : a._tweenHead = a._tweenTail = b, !a._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", a), a._inited = !0) } else if (c && !b._paused) { d && d.tweenjs_count--; var f = b._next, g = b._prev; f ? f._prev = g : a._tweenTail = g, g ? g._next = f : a._tweenHead = f, b._next = b._prev = null } b._paused = c }, d.wait = function (a, b) { return a > 0 && this._addStep(+a, this._stepTail.props, null, b), this }, d.to = function (a, b, c) { (null == b || 0 > b) && (b = 0); var d = this._addStep(+b, null, c); return this._appendProps(a, d), this }, d.label = function (a) { return this.addLabel(a, this.duration), this }, d.call = function (a, b, c) { return this._addAction(c || this.target, a, b || [this]) }, d.set = function (a, b) { return this._addAction(b || this.target, this._set, [a]) }, d.play = function (a) { return this._addAction(a || this, this._set, [{ paused: !1 }]) }, d.pause = function (a) { return this._addAction(a || this, this._set, [{ paused: !0 }]) }, d.w = d.wait, d.t = d.to, d.c = d.call, d.s = d.set, d.toString = function () { return "[Tween]" }, d.clone = function () { throw "Tween can not be cloned." }, d._addPlugin = function (a) { var b = this._pluginIds || (this._pluginIds = {}), c = a.ID; if (c && !b[c]) { b[c] = !0; for (var d = this._plugins || (this._plugins = []), e = a.priority || 0, f = 0, g = d.length; g > f; f++)if (e < d[f].priority) return void d.splice(f, 0, a); d.push(a) } }, d._updatePosition = function (a, b) { var c = this._stepHead.next, d = this.position, e = this.duration; if (this.target && c) { for (var f = c.next; f && f.t <= d;)c = c.next, f = c.next; var g = b ? 0 === e ? 1 : d / e : (d - c.t) / c.d; this._updateTargetProps(c, g, b) } this._stepPosition = c ? d - c.t : 0 }, d._updateTargetProps = function (b, c, d) { if (!(this.passive = !!b.passive)) { var e, f, g, h, i = b.prev.props, j = b.props; (h = b.ease) && (c = h(c, 0, 1, 1)); var k = this._plugins; a: for (var l in i) { if (f = i[l], g = j[l], e = f !== g && "number" == typeof f ? f + (g - f) * c : c >= 1 ? g : f, k) for (var m = 0, n = k.length; n > m; m++) { var o = k[m].change(this, b, l, e, c, d); if (o === a.IGNORE) continue a; void 0 !== o && (e = o) } this.target[l] = e } } }, d._runActionsRange = function (a, b, c, d) { var e = a > b, f = e ? this._actionTail : this._actionHead, g = b, h = a; e && (g = a, h = b); for (var i = this.position; f;) { var j = f.t; if ((j === b || j > h && g > j || d && j === a) && (f.funct.apply(f.scope, f.params), i !== this.position)) return !0; f = e ? f.prev : f.next } }, d._appendProps = function (b, c, d) { var e, f, g, h, i, j = this._stepHead.props, k = this.target, l = a._plugins, m = c.prev, n = m.props, o = c.props || (c.props = this._cloneProps(n)), p = {}; for (e in b) if (b.hasOwnProperty(e) && (p[e] = o[e] = b[e], void 0 === j[e])) { if (h = void 0, l) for (f = l.length - 1; f >= 0; f--)if (g = l[f].init(this, e, h), void 0 !== g && (h = g), h === a.IGNORE) { delete o[e], delete p[e]; break } h !== a.IGNORE && (void 0 === h && (h = k[e]), n[e] = void 0 === h ? null : h) } for (e in p) { g = b[e]; for (var q, r = m; (q = r) && (r = q.prev);)if (r.props !== q.props) { if (void 0 !== r.props[e]) break; r.props[e] = n[e] } } if (d !== !1 && (l = this._plugins)) for (f = l.length - 1; f >= 0; f--)l[f].step(this, c, p); (i = this._injected) && (this._injected = null, this._appendProps(i, c, !1)) }, d._injectProp = function (a, b) { var c = this._injected || (this._injected = {}); c[a] = b }, d._addStep = function (a, c, d, e) { var f = new b(this._stepTail, this.duration, a, c, d, e || !1); return this.duration += a, this._stepTail = this._stepTail.next = f }, d._addAction = function (a, b, d) { var e = new c(this._actionTail, this.duration, a, b, d); return this._actionTail ? this._actionTail.next = e : this._actionHead = e, this._actionTail = e, this }, d._set = function (a) { for (var b in a) this[b] = a[b] }, d._cloneProps = function (a) { var b = {}; for (var c in a) b[c] = a[c]; return b }, createjs.Tween = createjs.promote(a, "AbstractTween") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a(a) { var b, c; a instanceof Array || null == a && arguments.length > 1 ? (b = a, c = arguments[1], a = arguments[2]) : a && (b = a.tweens, c = a.labels), this.AbstractTween_constructor(a), this.tweens = [], b && this.addTween.apply(this, b), this.setLabels(c), this._init(a) } var b = createjs.extend(a, createjs.AbstractTween); b.addTween = function (a) { a._parent && a._parent.removeTween(a); var b = arguments.length; if (b > 1) { for (var c = 0; b > c; c++)this.addTween(arguments[c]); return arguments[b - 1] } if (0 === b) return null; this.tweens.push(a), a._parent = this, a.paused = !0; var d = a.duration; return a.loop > 0 && (d *= a.loop + 1), d > this.duration && (this.duration = d), this.rawPosition >= 0 && a.setPosition(this.rawPosition), a }, b.removeTween = function (a) { var b = arguments.length; if (b > 1) { for (var c = !0, d = 0; b > d; d++)c = c && this.removeTween(arguments[d]); return c } if (0 === b) return !0; for (var e = this.tweens, d = e.length; d--;)if (e[d] === a) return e.splice(d, 1), a._parent = null, a.duration >= this.duration && this.updateDuration(), !0; return !1 }, b.updateDuration = function () { this.duration = 0; for (var a = 0, b = this.tweens.length; b > a; a++) { var c = this.tweens[a], d = c.duration; c.loop > 0 && (d *= c.loop + 1), d > this.duration && (this.duration = d) } }, b.toString = function () { return "[Timeline]" }, b.clone = function () { throw "Timeline can not be cloned." }, b._updatePosition = function (a, b) { for (var c = this.position, d = 0, e = this.tweens.length; e > d; d++)this.tweens[d].setPosition(c, !0, a) }, b._runActionsRange = function (a, b, c, d) { for (var e = this.position, f = 0, g = this.tweens.length; g > f; f++)if (this.tweens[f]._runActions(a, b, c, d), e !== this.position) return !0 }, createjs.Timeline = createjs.promote(a, "AbstractTween") }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "Ease cannot be instantiated." } a.linear = function (a) { return a }, a.none = a.linear, a.get = function (a) { return -1 > a ? a = -1 : a > 1 && (a = 1), function (b) { return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a)) } }, a.getPowIn = function (a) { return function (b) { return Math.pow(b, a) } }, a.getPowOut = function (a) { return function (b) { return 1 - Math.pow(1 - b, a) } }, a.getPowInOut = function (a) { return function (b) { return (b *= 2) < 1 ? .5 * Math.pow(b, a) : 1 - .5 * Math.abs(Math.pow(2 - b, a)) } }, a.quadIn = a.getPowIn(2), a.quadOut = a.getPowOut(2), a.quadInOut = a.getPowInOut(2), a.cubicIn = a.getPowIn(3), a.cubicOut = a.getPowOut(3), a.cubicInOut = a.getPowInOut(3), a.quartIn = a.getPowIn(4), a.quartOut = a.getPowOut(4), a.quartInOut = a.getPowInOut(4), a.quintIn = a.getPowIn(5), a.quintOut = a.getPowOut(5), a.quintInOut = a.getPowInOut(5), a.sineIn = function (a) { return 1 - Math.cos(a * Math.PI / 2) }, a.sineOut = function (a) { return Math.sin(a * Math.PI / 2) }, a.sineInOut = function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) }, a.getBackIn = function (a) { return function (b) { return b * b * ((a + 1) * b - a) } }, a.backIn = a.getBackIn(1.7), a.getBackOut = function (a) { return function (b) { return --b * b * ((a + 1) * b + a) + 1 } }, a.backOut = a.getBackOut(1.7), a.getBackInOut = function (a) { return a *= 1.525, function (b) { return (b *= 2) < 1 ? .5 * (b * b * ((a + 1) * b - a)) : .5 * ((b -= 2) * b * ((a + 1) * b + a) + 2) } }, a.backInOut = a.getBackInOut(1.7), a.circIn = function (a) { return -(Math.sqrt(1 - a * a) - 1) }, a.circOut = function (a) { return Math.sqrt(1 - --a * a) }, a.circInOut = function (a) { return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1) }, a.bounceIn = function (b) { return 1 - a.bounceOut(1 - b) }, a.bounceOut = function (a) { return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375 }, a.bounceInOut = function (b) { return .5 > b ? .5 * a.bounceIn(2 * b) : .5 * a.bounceOut(2 * b - 1) + .5 }, a.getElasticIn = function (a, b) { var c = 2 * Math.PI; return function (d) { if (0 == d || 1 == d) return d; var e = b / c * Math.asin(1 / a); return -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b)) } }, a.elasticIn = a.getElasticIn(1, .3), a.getElasticOut = function (a, b) { var c = 2 * Math.PI; return function (d) { if (0 == d || 1 == d) return d; var e = b / c * Math.asin(1 / a); return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1 } }, a.elasticOut = a.getElasticOut(1, .3), a.getElasticInOut = function (a, b) { var c = 2 * Math.PI; return function (d) { var e = b / c * Math.asin(1 / a); return (d *= 2) < 1 ? -.5 * (a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b)) : a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) * .5 + 1 } }, a.elasticInOut = a.getElasticInOut(1, .3 * 1.5), createjs.Ease = a }(), this.createjs = this.createjs || {}, function () { "use strict"; function a() { throw "MotionGuidePlugin cannot be instantiated." } var b = a; b.priority = 0, b.ID = "MotionGuide", b.install = function () { return createjs.Tween._installPlugin(a), createjs.Tween.IGNORE }, b.init = function (a, c, d) { "guide" == c && a._addPlugin(b) }, b.step = function (a, c, d) { for (var e in d) if ("guide" === e) { var f = c.props.guide, g = b._solveGuideData(d.guide, f); f.valid = !g; var h = f.endData; if (a._injectProp("x", h.x), a._injectProp("y", h.y), g || !f.orient) break; var i = void 0 === c.prev.props.rotation ? a.target.rotation || 0 : c.prev.props.rotation; if (f.startOffsetRot = i - f.startData.rotation, "fixed" == f.orient) f.endAbsRot = h.rotation + f.startOffsetRot, f.deltaRotation = 0; else { var j = void 0 === d.rotation ? a.target.rotation || 0 : d.rotation, k = j - f.endData.rotation - f.startOffsetRot, l = k % 360; switch (f.endAbsRot = j, f.orient) { case "auto": f.deltaRotation = k; break; case "cw": f.deltaRotation = (l + 360) % 360 + 360 * Math.abs(k / 360 | 0); break; case "ccw": f.deltaRotation = (l - 360) % 360 + -360 * Math.abs(k / 360 | 0) } } a._injectProp("rotation", f.endAbsRot) } }, b.change = function (a, c, d, e, f, g) { var h = c.props.guide; if (h && c.props !== c.prev.props && h !== c.prev.props.guide) return "guide" === d && !h.valid || "x" == d || "y" == d || "rotation" === d && h.orient ? createjs.Tween.IGNORE : void b._ratioToPositionData(f, h, a.target) }, b.debug = function (a, c, d) { a = a.guide || a; var e = b._findPathProblems(a); if (e && console.error("MotionGuidePlugin Error found: \n" + e), !c) return e; var f, g = a.path, h = g.length, i = 3, j = 9; for (c.save(), c.lineCap = "round", c.lineJoin = "miter", c.beginPath(), c.moveTo(g[0], g[1]), f = 2; h > f; f += 4)c.quadraticCurveTo(g[f], g[f + 1], g[f + 2], g[f + 3]); c.strokeStyle = "black", c.lineWidth = 1.5 * i, c.stroke(), c.strokeStyle = "white", c.lineWidth = i, c.stroke(), c.closePath(); var k = d.length; if (d && k) { var l = {}, m = {}; b._solveGuideData(a, l); for (var f = 0; k > f; f++)l.orient = "fixed", b._ratioToPositionData(d[f], l, m), c.beginPath(), c.moveTo(m.x, m.y), c.lineTo(m.x + Math.cos(.0174533 * m.rotation) * j, m.y + Math.sin(.0174533 * m.rotation) * j), c.strokeStyle = "black", c.lineWidth = 1.5 * i, c.stroke(), c.strokeStyle = "red", c.lineWidth = i, c.stroke(), c.closePath() } return c.restore(), e }, b._solveGuideData = function (a, c) { var d = void 0; if (d = b.debug(a)) return d; var e = c.path = a.path; c.orient = a.orient; c.subLines = [], c.totalLength = 0, c.startOffsetRot = 0, c.deltaRotation = 0, c.startData = { ratio: 0 }, c.endData = { ratio: 1 }, c.animSpan = 1; var f, g, h, i, j, k, l, m, n, o = e.length, p = 10, q = {}; for (f = e[0], g = e[1], l = 2; o > l; l += 4) { h = e[l], i = e[l + 1], j = e[l + 2], k = e[l + 3]; var r = { weightings: [], estLength: 0, portion: 0 }, s = f, t = g; for (m = 1; p >= m; m++) { b._getParamsForCurve(f, g, h, i, j, k, m / p, !1, q); var u = q.x - s, v = q.y - t; n = Math.sqrt(u * u + v * v), r.weightings.push(n), r.estLength += n, s = q.x, t = q.y } for (c.totalLength += r.estLength, m = 0; p > m; m++)n = r.estLength, r.weightings[m] = r.weightings[m] / n; c.subLines.push(r), f = j, g = k } n = c.totalLength; var w = c.subLines.length; for (l = 0; w > l; l++)c.subLines[l].portion = c.subLines[l].estLength / n; var x = isNaN(a.start) ? 0 : a.start, y = isNaN(a.end) ? 1 : a.end; b._ratioToPositionData(x, c, c.startData), b._ratioToPositionData(y, c, c.endData), c.startData.ratio = x, c.endData.ratio = y, c.animSpan = c.endData.ratio - c.startData.ratio }, b._ratioToPositionData = function (a, c, d) { var e, f, g, h, i, j = c.subLines, k = 0, l = 10, m = a * c.animSpan + c.startData.ratio; for (f = j.length, e = 0; f > e; e++) { if (h = j[e].portion, k + h >= m) { i = e; break } k += h } void 0 === i && (i = f - 1, k -= h); var n = j[i].weightings, o = h; for (f = n.length, e = 0; f > e && (h = n[e] * o, !(k + h >= m)); e++)k += h; i = 4 * i + 2, g = e / l + (m - k) / h * (1 / l); var p = c.path; return b._getParamsForCurve(p[i - 2], p[i - 1], p[i], p[i + 1], p[i + 2], p[i + 3], g, c.orient, d), c.orient && (a >= .99999 && 1.00001 >= a && void 0 !== c.endAbsRot ? d.rotation = c.endAbsRot : d.rotation += c.startOffsetRot + a * c.deltaRotation), d }, b._getParamsForCurve = function (a, b, c, d, e, f, g, h, i) { var j = 1 - g; i.x = j * j * a + 2 * j * g * c + g * g * e, i.y = j * j * b + 2 * j * g * d + g * g * f, h && (i.rotation = 57.2957795 * Math.atan2((d - b) * j + (f - d) * g, (c - a) * j + (e - c) * g)) }, b._findPathProblems = function (a) { var b = a.path, c = b && b.length || 0; if (6 > c || (c - 2) % 4) { var d = "	Cannot parse 'path' array due to invalid number of entries in path. "; return d += "There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). ", d += "See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n", d += "Only [ " + c + " ] values found. Expected: " + Math.max(4 * Math.ceil((c - 2) / 4) + 2, 6) } for (var e = 0; c > e; e++)if (isNaN(b[e])) return "All data in path array must be numeric"; var f = a.start; if (isNaN(f) && void 0 !== f) return "'start' out of bounds. Expected 0 to 1, got: " + f; var g = a.end; if (isNaN(g) && void 0 !== g) return "'end' out of bounds. Expected 0 to 1, got: " + g; var h = a.orient; return h && "fixed" != h && "auto" != h && "cw" != h && "ccw" != h ? 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + h : void 0 }, createjs.MotionGuidePlugin = a }(), this.createjs = this.createjs || {}, function () { "use strict"; var a = createjs.TweenJS = createjs.TweenJS || {}; a.version = "1.0.0", a.buildDate = "Thu, 12 Oct 2017 16:34:05 GMT" }();

// js/howler.min.js
/*! howler.js v2.1.2 | (c) 2013-2019, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function () { "use strict"; var e = function () { this.init() }; e.prototype = { init: function () { var e = this || n; return e._counter = 1e3, e._html5AudioPool = [], e.html5PoolSize = 10, e._codecs = {}, e._howls = [], e._muted = !1, e._volume = 1, e._canPlayEvent = "canplaythrough", e._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, e.masterGain = null, e.noAudio = !1, e.usingWebAudio = !0, e.autoSuspend = !0, e.ctx = null, e.autoUnlock = !0, e._setup(), e }, volume: function (e) { var o = this || n; if (e = parseFloat(e), o.ctx || _(), void 0 !== e && e >= 0 && e <= 1) { if (o._volume = e, o._muted) return o; o.usingWebAudio && o.masterGain.gain.setValueAtTime(e, n.ctx.currentTime); for (var t = 0; t < o._howls.length; t++)if (!o._howls[t]._webAudio) for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) { var u = o._howls[t]._soundById(r[a]); u && u._node && (u._node.volume = u._volume * e) } return o } return o._volume }, mute: function (e) { var o = this || n; o.ctx || _(), o._muted = e, o.usingWebAudio && o.masterGain.gain.setValueAtTime(e ? 0 : o._volume, n.ctx.currentTime); for (var t = 0; t < o._howls.length; t++)if (!o._howls[t]._webAudio) for (var r = o._howls[t]._getSoundIds(), a = 0; a < r.length; a++) { var u = o._howls[t]._soundById(r[a]); u && u._node && (u._node.muted = !!e || u._muted) } return o }, unload: function () { for (var e = this || n, o = e._howls.length - 1; o >= 0; o--)e._howls[o].unload(); return e.usingWebAudio && e.ctx && void 0 !== e.ctx.close && (e.ctx.close(), e.ctx = null, _()), e }, codecs: function (e) { return (this || n)._codecs[e.replace(/^x-/, "")] }, _setup: function () { var e = this || n; if (e.state = e.ctx ? e.ctx.state || "suspended" : "suspended", e._autoSuspend(), !e.usingWebAudio) if ("undefined" != typeof Audio) try { var o = new Audio; void 0 === o.oncanplaythrough && (e._canPlayEvent = "canplay") } catch (n) { e.noAudio = !0 } else e.noAudio = !0; try { var o = new Audio; o.muted && (e.noAudio = !0) } catch (e) { } return e.noAudio || e._setupCodecs(), e }, _setupCodecs: function () { var e = this || n, o = null; try { o = "undefined" != typeof Audio ? new Audio : null } catch (n) { return e } if (!o || "function" != typeof o.canPlayType) return e; var t = o.canPlayType("audio/mpeg;").replace(/^no$/, ""), r = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g), a = r && parseInt(r[0].split("/")[1], 10) < 33; return e._codecs = { mp3: !(a || !t && !o.canPlayType("audio/mp3;").replace(/^no$/, "")), mpeg: !!t, opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), oga: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), aac: !!o.canPlayType("audio/aac;").replace(/^no$/, ""), caf: !!o.canPlayType("audio/x-caf;").replace(/^no$/, ""), m4a: !!(o.canPlayType("audio/x-m4a;") || o.canPlayType("audio/m4a;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(o.canPlayType("audio/x-mp4;") || o.canPlayType("audio/mp4;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), webm: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""), dolby: !!o.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""), flac: !!(o.canPlayType("audio/x-flac;") || o.canPlayType("audio/flac;")).replace(/^no$/, "") }, e }, _unlockAudio: function () { var e = this || n; if (!e._audioUnlocked && e.ctx) { e._audioUnlocked = !1, e.autoUnlock = !1, e._mobileUnloaded || 44100 === e.ctx.sampleRate || (e._mobileUnloaded = !0, e.unload()), e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050); var o = function (n) { for (var t = 0; t < e.html5PoolSize; t++)try { var r = new Audio; r._unlocked = !0, e._releaseHtml5Audio(r) } catch (n) { e.noAudio = !0 } for (var t = 0; t < e._howls.length; t++)if (!e._howls[t]._webAudio) for (var a = e._howls[t]._getSoundIds(), u = 0; u < a.length; u++) { var i = e._howls[t]._soundById(a[u]); i && i._node && !i._node._unlocked && (i._node._unlocked = !0, i._node.load()) } e._autoResume(); var d = e.ctx.createBufferSource(); d.buffer = e._scratchBuffer, d.connect(e.ctx.destination), void 0 === d.start ? d.noteOn(0) : d.start(0), "function" == typeof e.ctx.resume && e.ctx.resume(), d.onended = function () { d.disconnect(0), e._audioUnlocked = !0, document.removeEventListener("touchstart", o, !0), document.removeEventListener("touchend", o, !0), document.removeEventListener("click", o, !0); for (var n = 0; n < e._howls.length; n++)e._howls[n]._emit("unlock") } }; return document.addEventListener("touchstart", o, !0), document.addEventListener("touchend", o, !0), document.addEventListener("click", o, !0), e } }, _obtainHtml5Audio: function () { var e = this || n; if (e._html5AudioPool.length) return e._html5AudioPool.pop(); var o = (new Audio).play(); return o && "undefined" != typeof Promise && (o instanceof Promise || "function" == typeof o.then) && o.catch(function () { console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.") }), new Audio }, _releaseHtml5Audio: function (e) { var o = this || n; return e._unlocked && o._html5AudioPool.push(e), o }, _autoSuspend: function () { var e = this; if (e.autoSuspend && e.ctx && void 0 !== e.ctx.suspend && n.usingWebAudio) { for (var o = 0; o < e._howls.length; o++)if (e._howls[o]._webAudio) for (var t = 0; t < e._howls[o]._sounds.length; t++)if (!e._howls[o]._sounds[t]._paused) return e; return e._suspendTimer && clearTimeout(e._suspendTimer), e._suspendTimer = setTimeout(function () { e.autoSuspend && (e._suspendTimer = null, e.state = "suspending", e.ctx.suspend().then(function () { e.state = "suspended", e._resumeAfterSuspend && (delete e._resumeAfterSuspend, e._autoResume()) })) }, 3e4), e } }, _autoResume: function () { var e = this; if (e.ctx && void 0 !== e.ctx.resume && n.usingWebAudio) return "running" === e.state && e._suspendTimer ? (clearTimeout(e._suspendTimer), e._suspendTimer = null) : "suspended" === e.state ? (e.ctx.resume().then(function () { e.state = "running"; for (var n = 0; n < e._howls.length; n++)e._howls[n]._emit("resume") }), e._suspendTimer && (clearTimeout(e._suspendTimer), e._suspendTimer = null)) : "suspending" === e.state && (e._resumeAfterSuspend = !0), e } }; var n = new e, o = function (e) { var n = this; if (!e.src || 0 === e.src.length) return void console.error("An array of source files must be passed with any new Howl."); n.init(e) }; o.prototype = { init: function (e) { var o = this; return n.ctx || _(), o._autoplay = e.autoplay || !1, o._format = "string" != typeof e.format ? e.format : [e.format], o._html5 = e.html5 || !1, o._muted = e.mute || !1, o._loop = e.loop || !1, o._pool = e.pool || 5, o._preload = "boolean" != typeof e.preload || e.preload, o._rate = e.rate || 1, o._sprite = e.sprite || {}, o._src = "string" != typeof e.src ? e.src : [e.src], o._volume = void 0 !== e.volume ? e.volume : 1, o._xhrWithCredentials = e.xhrWithCredentials || !1, o._duration = 0, o._state = "unloaded", o._sounds = [], o._endTimers = {}, o._queue = [], o._playLock = !1, o._onend = e.onend ? [{ fn: e.onend }] : [], o._onfade = e.onfade ? [{ fn: e.onfade }] : [], o._onload = e.onload ? [{ fn: e.onload }] : [], o._onloaderror = e.onloaderror ? [{ fn: e.onloaderror }] : [], o._onplayerror = e.onplayerror ? [{ fn: e.onplayerror }] : [], o._onpause = e.onpause ? [{ fn: e.onpause }] : [], o._onplay = e.onplay ? [{ fn: e.onplay }] : [], o._onstop = e.onstop ? [{ fn: e.onstop }] : [], o._onmute = e.onmute ? [{ fn: e.onmute }] : [], o._onvolume = e.onvolume ? [{ fn: e.onvolume }] : [], o._onrate = e.onrate ? [{ fn: e.onrate }] : [], o._onseek = e.onseek ? [{ fn: e.onseek }] : [], o._onunlock = e.onunlock ? [{ fn: e.onunlock }] : [], o._onresume = [], o._webAudio = n.usingWebAudio && !o._html5, void 0 !== n.ctx && n.ctx && n.autoUnlock && n._unlockAudio(), n._howls.push(o), o._autoplay && o._queue.push({ event: "play", action: function () { o.play() } }), o._preload && o.load(), o }, load: function () { var e = this, o = null; if (n.noAudio) return void e._emit("loaderror", null, "No audio support."); "string" == typeof e._src && (e._src = [e._src]); for (var r = 0; r < e._src.length; r++) { var u, i; if (e._format && e._format[r]) u = e._format[r]; else { if ("string" != typeof (i = e._src[r])) { e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring."); continue } u = /^data:audio\/([^;,]+);/i.exec(i), u || (u = /\.([^.]+)$/.exec(i.split("?", 1)[0])), u && (u = u[1].toLowerCase()) } if (u || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), u && n.codecs(u)) { o = e._src[r]; break } } return o ? (e._src = o, e._state = "loading", "https:" === window.location.protocol && "http:" === o.slice(0, 5) && (e._html5 = !0, e._webAudio = !1), new t(e), e._webAudio && a(e), e) : void e._emit("loaderror", null, "No codec support for selected audio sources.") }, play: function (e, o) { var t = this, r = null; if ("number" == typeof e) r = e, e = null; else { if ("string" == typeof e && "loaded" === t._state && !t._sprite[e]) return null; if (void 0 === e && (e = "__default", !t._playLock)) { for (var a = 0, u = 0; u < t._sounds.length; u++)t._sounds[u]._paused && !t._sounds[u]._ended && (a++, r = t._sounds[u]._id); 1 === a ? e = null : r = null } } var i = r ? t._soundById(r) : t._inactiveSound(); if (!i) return null; if (r && !e && (e = i._sprite || "__default"), "loaded" !== t._state) { i._sprite = e, i._ended = !1; var d = i._id; return t._queue.push({ event: "play", action: function () { t.play(d) } }), d } if (r && !i._paused) return o || t._loadQueue("play"), i._id; t._webAudio && n._autoResume(); var _ = Math.max(0, i._seek > 0 ? i._seek : t._sprite[e][0] / 1e3), s = Math.max(0, (t._sprite[e][0] + t._sprite[e][1]) / 1e3 - _), l = 1e3 * s / Math.abs(i._rate), c = t._sprite[e][0] / 1e3, f = (t._sprite[e][0] + t._sprite[e][1]) / 1e3, p = !(!i._loop && !t._sprite[e][2]); i._sprite = e, i._ended = !1; var m = function () { i._paused = !1, i._seek = _, i._start = c, i._stop = f, i._loop = p }; if (_ >= f) return void t._ended(i); var v = i._node; if (t._webAudio) { var h = function () { t._playLock = !1, m(), t._refreshBuffer(i); var e = i._muted || t._muted ? 0 : i._volume; v.gain.setValueAtTime(e, n.ctx.currentTime), i._playStart = n.ctx.currentTime, void 0 === v.bufferSource.start ? i._loop ? v.bufferSource.noteGrainOn(0, _, 86400) : v.bufferSource.noteGrainOn(0, _, s) : i._loop ? v.bufferSource.start(0, _, 86400) : v.bufferSource.start(0, _, s), l !== 1 / 0 && (t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l)), o || setTimeout(function () { t._emit("play", i._id), t._loadQueue() }, 0) }; "running" === n.state ? h() : (t._playLock = !0, t.once("resume", h), t._clearTimer(i._id)) } else { var y = function () { v.currentTime = _, v.muted = i._muted || t._muted || n._muted || v.muted, v.volume = i._volume * n.volume(), v.playbackRate = i._rate; try { var r = v.play(); if (r && "undefined" != typeof Promise && (r instanceof Promise || "function" == typeof r.then) ? (t._playLock = !0, m(), r.then(function () { t._playLock = !1, v._unlocked = !0, o || (t._emit("play", i._id), t._loadQueue()) }).catch(function () { t._playLock = !1, t._emit("playerror", i._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."), i._ended = !0, i._paused = !0 })) : o || (t._playLock = !1, m(), t._emit("play", i._id), t._loadQueue()), v.playbackRate = i._rate, v.paused) return void t._emit("playerror", i._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."); "__default" !== e || i._loop ? t._endTimers[i._id] = setTimeout(t._ended.bind(t, i), l) : (t._endTimers[i._id] = function () { t._ended(i), v.removeEventListener("ended", t._endTimers[i._id], !1) }, v.addEventListener("ended", t._endTimers[i._id], !1)) } catch (e) { t._emit("playerror", i._id, e) } }; "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === v.src && (v.src = t._src, v.load()); var g = window && window.ejecta || !v.readyState && n._navigator.isCocoonJS; if (v.readyState >= 3 || g) y(); else { t._playLock = !0; var A = function () { y(), v.removeEventListener(n._canPlayEvent, A, !1) }; v.addEventListener(n._canPlayEvent, A, !1), t._clearTimer(i._id) } } return i._id }, pause: function (e) { var n = this; if ("loaded" !== n._state || n._playLock) return n._queue.push({ event: "pause", action: function () { n.pause(e) } }), n; for (var o = n._getSoundIds(e), t = 0; t < o.length; t++) { n._clearTimer(o[t]); var r = n._soundById(o[t]); if (r && !r._paused && (r._seek = n.seek(o[t]), r._rateSeek = 0, r._paused = !0, n._stopFade(o[t]), r._node)) if (n._webAudio) { if (!r._node.bufferSource) continue; void 0 === r._node.bufferSource.stop ? r._node.bufferSource.noteOff(0) : r._node.bufferSource.stop(0), n._cleanBuffer(r._node) } else isNaN(r._node.duration) && r._node.duration !== 1 / 0 || r._node.pause(); arguments[1] || n._emit("pause", r ? r._id : null) } return n }, stop: function (e, n) { var o = this; if ("loaded" !== o._state || o._playLock) return o._queue.push({ event: "stop", action: function () { o.stop(e) } }), o; for (var t = o._getSoundIds(e), r = 0; r < t.length; r++) { o._clearTimer(t[r]); var a = o._soundById(t[r]); a && (a._seek = a._start || 0, a._rateSeek = 0, a._paused = !0, a._ended = !0, o._stopFade(t[r]), a._node && (o._webAudio ? a._node.bufferSource && (void 0 === a._node.bufferSource.stop ? a._node.bufferSource.noteOff(0) : a._node.bufferSource.stop(0), o._cleanBuffer(a._node)) : isNaN(a._node.duration) && a._node.duration !== 1 / 0 || (a._node.currentTime = a._start || 0, a._node.pause(), a._node.duration === 1 / 0 && o._clearSound(a._node))), n || o._emit("stop", a._id)) } return o }, mute: function (e, o) { var t = this; if ("loaded" !== t._state || t._playLock) return t._queue.push({ event: "mute", action: function () { t.mute(e, o) } }), t; if (void 0 === o) { if ("boolean" != typeof e) return t._muted; t._muted = e } for (var r = t._getSoundIds(o), a = 0; a < r.length; a++) { var u = t._soundById(r[a]); u && (u._muted = e, u._interval && t._stopFade(u._id), t._webAudio && u._node ? u._node.gain.setValueAtTime(e ? 0 : u._volume, n.ctx.currentTime) : u._node && (u._node.muted = !!n._muted || e), t._emit("mute", u._id)) } return t }, volume: function () { var e, o, t = this, r = arguments; if (0 === r.length) return t._volume; if (1 === r.length || 2 === r.length && void 0 === r[1]) { t._getSoundIds().indexOf(r[0]) >= 0 ? o = parseInt(r[0], 10) : e = parseFloat(r[0]) } else r.length >= 2 && (e = parseFloat(r[0]), o = parseInt(r[1], 10)); var a; if (!(void 0 !== e && e >= 0 && e <= 1)) return a = o ? t._soundById(o) : t._sounds[0], a ? a._volume : 0; if ("loaded" !== t._state || t._playLock) return t._queue.push({ event: "volume", action: function () { t.volume.apply(t, r) } }), t; void 0 === o && (t._volume = e), o = t._getSoundIds(o); for (var u = 0; u < o.length; u++)(a = t._soundById(o[u])) && (a._volume = e, r[2] || t._stopFade(o[u]), t._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(e, n.ctx.currentTime) : a._node && !a._muted && (a._node.volume = e * n.volume()), t._emit("volume", a._id)); return t }, fade: function (e, o, t, r) { var a = this; if ("loaded" !== a._state || a._playLock) return a._queue.push({ event: "fade", action: function () { a.fade(e, o, t, r) } }), a; e = parseFloat(e), o = parseFloat(o), t = parseFloat(t), a.volume(e, r); for (var u = a._getSoundIds(r), i = 0; i < u.length; i++) { var d = a._soundById(u[i]); if (d) { if (r || a._stopFade(u[i]), a._webAudio && !d._muted) { var _ = n.ctx.currentTime, s = _ + t / 1e3; d._volume = e, d._node.gain.setValueAtTime(e, _), d._node.gain.linearRampToValueAtTime(o, s) } a._startFadeInterval(d, e, o, t, u[i], void 0 === r) } } return a }, _startFadeInterval: function (e, n, o, t, r, a) { var u = this, i = n, d = o - n, _ = Math.abs(d / .01), s = Math.max(4, _ > 0 ? t / _ : t), l = Date.now(); e._fadeTo = o, e._interval = setInterval(function () { var r = (Date.now() - l) / t; l = Date.now(), i += d * r, i = Math.max(0, i), i = Math.min(1, i), i = Math.round(100 * i) / 100, u._webAudio ? e._volume = i : u.volume(i, e._id, !0), a && (u._volume = i), (o < n && i <= o || o > n && i >= o) && (clearInterval(e._interval), e._interval = null, e._fadeTo = null, u.volume(o, e._id), u._emit("fade", e._id)) }, s) }, _stopFade: function (e) { var o = this, t = o._soundById(e); return t && t._interval && (o._webAudio && t._node.gain.cancelScheduledValues(n.ctx.currentTime), clearInterval(t._interval), t._interval = null, o.volume(t._fadeTo, e), t._fadeTo = null, o._emit("fade", e)), o }, loop: function () { var e, n, o, t = this, r = arguments; if (0 === r.length) return t._loop; if (1 === r.length) { if ("boolean" != typeof r[0]) return !!(o = t._soundById(parseInt(r[0], 10))) && o._loop; e = r[0], t._loop = e } else 2 === r.length && (e = r[0], n = parseInt(r[1], 10)); for (var a = t._getSoundIds(n), u = 0; u < a.length; u++)(o = t._soundById(a[u])) && (o._loop = e, t._webAudio && o._node && o._node.bufferSource && (o._node.bufferSource.loop = e, e && (o._node.bufferSource.loopStart = o._start || 0, o._node.bufferSource.loopEnd = o._stop))); return t }, rate: function () { var e, o, t = this, r = arguments; if (0 === r.length) o = t._sounds[0]._id; else if (1 === r.length) { var a = t._getSoundIds(), u = a.indexOf(r[0]); u >= 0 ? o = parseInt(r[0], 10) : e = parseFloat(r[0]) } else 2 === r.length && (e = parseFloat(r[0]), o = parseInt(r[1], 10)); var i; if ("number" != typeof e) return i = t._soundById(o), i ? i._rate : t._rate; if ("loaded" !== t._state || t._playLock) return t._queue.push({ event: "rate", action: function () { t.rate.apply(t, r) } }), t; void 0 === o && (t._rate = e), o = t._getSoundIds(o); for (var d = 0; d < o.length; d++)if (i = t._soundById(o[d])) { t.playing(o[d]) && (i._rateSeek = t.seek(o[d]), i._playStart = t._webAudio ? n.ctx.currentTime : i._playStart), i._rate = e, t._webAudio && i._node && i._node.bufferSource ? i._node.bufferSource.playbackRate.setValueAtTime(e, n.ctx.currentTime) : i._node && (i._node.playbackRate = e); var _ = t.seek(o[d]), s = (t._sprite[i._sprite][0] + t._sprite[i._sprite][1]) / 1e3 - _, l = 1e3 * s / Math.abs(i._rate); !t._endTimers[o[d]] && i._paused || (t._clearTimer(o[d]), t._endTimers[o[d]] = setTimeout(t._ended.bind(t, i), l)), t._emit("rate", i._id) } return t }, seek: function () { var e, o, t = this, r = arguments; if (0 === r.length) o = t._sounds[0]._id; else if (1 === r.length) { var a = t._getSoundIds(), u = a.indexOf(r[0]); u >= 0 ? o = parseInt(r[0], 10) : t._sounds.length && (o = t._sounds[0]._id, e = parseFloat(r[0])) } else 2 === r.length && (e = parseFloat(r[0]), o = parseInt(r[1], 10)); if (void 0 === o) return t; if ("loaded" !== t._state || t._playLock) return t._queue.push({ event: "seek", action: function () { t.seek.apply(t, r) } }), t; var i = t._soundById(o); if (i) { if (!("number" == typeof e && e >= 0)) { if (t._webAudio) { var d = t.playing(o) ? n.ctx.currentTime - i._playStart : 0, _ = i._rateSeek ? i._rateSeek - i._seek : 0; return i._seek + (_ + d * Math.abs(i._rate)) } return i._node.currentTime } var s = t.playing(o); s && t.pause(o, !0), i._seek = e, i._ended = !1, t._clearTimer(o), t._webAudio || !i._node || isNaN(i._node.duration) || (i._node.currentTime = e); var l = function () { t._emit("seek", o), s && t.play(o, !0) }; if (s && !t._webAudio) { var c = function () { t._playLock ? setTimeout(c, 0) : l() }; setTimeout(c, 0) } else l() } return t }, playing: function (e) { var n = this; if ("number" == typeof e) { var o = n._soundById(e); return !!o && !o._paused } for (var t = 0; t < n._sounds.length; t++)if (!n._sounds[t]._paused) return !0; return !1 }, duration: function (e) { var n = this, o = n._duration, t = n._soundById(e); return t && (o = n._sprite[t._sprite][1] / 1e3), o }, state: function () { return this._state }, unload: function () { for (var e = this, o = e._sounds, t = 0; t < o.length; t++)o[t]._paused || e.stop(o[t]._id), e._webAudio || (e._clearSound(o[t]._node), o[t]._node.removeEventListener("error", o[t]._errorFn, !1), o[t]._node.removeEventListener(n._canPlayEvent, o[t]._loadFn, !1), n._releaseHtml5Audio(o[t]._node)), delete o[t]._node, e._clearTimer(o[t]._id); var a = n._howls.indexOf(e); a >= 0 && n._howls.splice(a, 1); var u = !0; for (t = 0; t < n._howls.length; t++)if (n._howls[t]._src === e._src || e._src.indexOf(n._howls[t]._src) >= 0) { u = !1; break } return r && u && delete r[e._src], n.noAudio = !1, e._state = "unloaded", e._sounds = [], e = null, null }, on: function (e, n, o, t) { var r = this, a = r["_on" + e]; return "function" == typeof n && a.push(t ? { id: o, fn: n, once: t } : { id: o, fn: n }), r }, off: function (e, n, o) { var t = this, r = t["_on" + e], a = 0; if ("number" == typeof n && (o = n, n = null), n || o) for (a = 0; a < r.length; a++) { var u = o === r[a].id; if (n === r[a].fn && u || !n && u) { r.splice(a, 1); break } } else if (e) t["_on" + e] = []; else { var i = Object.keys(t); for (a = 0; a < i.length; a++)0 === i[a].indexOf("_on") && Array.isArray(t[i[a]]) && (t[i[a]] = []) } return t }, once: function (e, n, o) { var t = this; return t.on(e, n, o, 1), t }, _emit: function (e, n, o) { for (var t = this, r = t["_on" + e], a = r.length - 1; a >= 0; a--)r[a].id && r[a].id !== n && "load" !== e || (setTimeout(function (e) { e.call(this, n, o) }.bind(t, r[a].fn), 0), r[a].once && t.off(e, r[a].fn, r[a].id)); return t._loadQueue(e), t }, _loadQueue: function (e) { var n = this; if (n._queue.length > 0) { var o = n._queue[0]; o.event === e && (n._queue.shift(), n._loadQueue()), e || o.action() } return n }, _ended: function (e) { var o = this, t = e._sprite; if (!o._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) return setTimeout(o._ended.bind(o, e), 100), o; var r = !(!e._loop && !o._sprite[t][2]); if (o._emit("end", e._id), !o._webAudio && r && o.stop(e._id, !0).play(e._id), o._webAudio && r) { o._emit("play", e._id), e._seek = e._start || 0, e._rateSeek = 0, e._playStart = n.ctx.currentTime; var a = 1e3 * (e._stop - e._start) / Math.abs(e._rate); o._endTimers[e._id] = setTimeout(o._ended.bind(o, e), a) } return o._webAudio && !r && (e._paused = !0, e._ended = !0, e._seek = e._start || 0, e._rateSeek = 0, o._clearTimer(e._id), o._cleanBuffer(e._node), n._autoSuspend()), o._webAudio || r || o.stop(e._id, !0), o }, _clearTimer: function (e) { var n = this; if (n._endTimers[e]) { if ("function" != typeof n._endTimers[e]) clearTimeout(n._endTimers[e]); else { var o = n._soundById(e); o && o._node && o._node.removeEventListener("ended", n._endTimers[e], !1) } delete n._endTimers[e] } return n }, _soundById: function (e) { for (var n = this, o = 0; o < n._sounds.length; o++)if (e === n._sounds[o]._id) return n._sounds[o]; return null }, _inactiveSound: function () { var e = this; e._drain(); for (var n = 0; n < e._sounds.length; n++)if (e._sounds[n]._ended) return e._sounds[n].reset(); return new t(e) }, _drain: function () { var e = this, n = e._pool, o = 0, t = 0; if (!(e._sounds.length < n)) { for (t = 0; t < e._sounds.length; t++)e._sounds[t]._ended && o++; for (t = e._sounds.length - 1; t >= 0; t--) { if (o <= n) return; e._sounds[t]._ended && (e._webAudio && e._sounds[t]._node && e._sounds[t]._node.disconnect(0), e._sounds.splice(t, 1), o--) } } }, _getSoundIds: function (e) { var n = this; if (void 0 === e) { for (var o = [], t = 0; t < n._sounds.length; t++)o.push(n._sounds[t]._id); return o } return [e] }, _refreshBuffer: function (e) { var o = this; return e._node.bufferSource = n.ctx.createBufferSource(), e._node.bufferSource.buffer = r[o._src], e._panner ? e._node.bufferSource.connect(e._panner) : e._node.bufferSource.connect(e._node), e._node.bufferSource.loop = e._loop, e._loop && (e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop || 0), e._node.bufferSource.playbackRate.setValueAtTime(e._rate, n.ctx.currentTime), o }, _cleanBuffer: function (e) { var o = this, t = n._navigator && n._navigator.vendor.indexOf("Apple") >= 0; if (n._scratchBuffer && e.bufferSource && (e.bufferSource.onended = null, e.bufferSource.disconnect(0), t)) try { e.bufferSource.buffer = n._scratchBuffer } catch (e) { } return e.bufferSource = null, o }, _clearSound: function (e) { /MSIE |Trident\//.test(n._navigator && n._navigator.userAgent) || (e.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") } }; var t = function (e) { this._parent = e, this.init() }; t.prototype = { init: function () { var e = this, o = e._parent; return e._muted = o._muted, e._loop = o._loop, e._volume = o._volume, e._rate = o._rate, e._seek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++n._counter, o._sounds.push(e), e.create(), e }, create: function () { var e = this, o = e._parent, t = n._muted || e._muted || e._parent._muted ? 0 : e._volume; return o._webAudio ? (e._node = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), e._node.gain.setValueAtTime(t, n.ctx.currentTime), e._node.paused = !0, e._node.connect(n.masterGain)) : (e._node = n._obtainHtml5Audio(), e._errorFn = e._errorListener.bind(e), e._node.addEventListener("error", e._errorFn, !1), e._loadFn = e._loadListener.bind(e), e._node.addEventListener(n._canPlayEvent, e._loadFn, !1), e._node.src = o._src, e._node.preload = "auto", e._node.volume = t * n.volume(), e._node.load()), e }, reset: function () { var e = this, o = e._parent; return e._muted = o._muted, e._loop = o._loop, e._volume = o._volume, e._rate = o._rate, e._seek = 0, e._rateSeek = 0, e._paused = !0, e._ended = !0, e._sprite = "__default", e._id = ++n._counter, e }, _errorListener: function () { var e = this; e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0), e._node.removeEventListener("error", e._errorFn, !1) }, _loadListener: function () { var e = this, o = e._parent; o._duration = Math.ceil(10 * e._node.duration) / 10, 0 === Object.keys(o._sprite).length && (o._sprite = { __default: [0, 1e3 * o._duration] }), "loaded" !== o._state && (o._state = "loaded", o._emit("load"), o._loadQueue()), e._node.removeEventListener(n._canPlayEvent, e._loadFn, !1) } }; var r = {}, a = function (e) { var n = e._src; if (r[n]) return e._duration = r[n].duration, void d(e); if (/^data:[^;]+;base64,/.test(n)) { for (var o = atob(n.split(",")[1]), t = new Uint8Array(o.length), a = 0; a < o.length; ++a)t[a] = o.charCodeAt(a); i(t.buffer, e) } else { var _ = new XMLHttpRequest; _.open("GET", n, !0), _.withCredentials = e._xhrWithCredentials, _.responseType = "arraybuffer", _.onload = function () { var n = (_.status + "")[0]; if ("0" !== n && "2" !== n && "3" !== n) return void e._emit("loaderror", null, "Failed loading audio file with status: " + _.status + "."); i(_.response, e) }, _.onerror = function () { e._webAudio && (e._html5 = !0, e._webAudio = !1, e._sounds = [], delete r[n], e.load()) }, u(_) } }, u = function (e) { try { e.send() } catch (n) { e.onerror() } }, i = function (e, o) { var t = function () { o._emit("loaderror", null, "Decoding audio data failed.") }, a = function (e) { e && o._sounds.length > 0 ? (r[o._src] = e, d(o, e)) : t() }; "undefined" != typeof Promise && 1 === n.ctx.decodeAudioData.length ? n.ctx.decodeAudioData(e).then(a).catch(t) : n.ctx.decodeAudioData(e, a, t) }, d = function (e, n) { n && !e._duration && (e._duration = n.duration), 0 === Object.keys(e._sprite).length && (e._sprite = { __default: [0, 1e3 * e._duration] }), "loaded" !== e._state && (e._state = "loaded", e._emit("load"), e._loadQueue()) }, _ = function () { if (n.usingWebAudio) { try { "undefined" != typeof AudioContext ? n.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? n.ctx = new webkitAudioContext : n.usingWebAudio = !1 } catch (e) { n.usingWebAudio = !1 } n.ctx || (n.usingWebAudio = !1); var e = /iP(hone|od|ad)/.test(n._navigator && n._navigator.platform), o = n._navigator && n._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), t = o ? parseInt(o[1], 10) : null; if (e && t && t < 9) { var r = /safari/.test(n._navigator && n._navigator.userAgent.toLowerCase()); (n._navigator && n._navigator.standalone && !r || n._navigator && !n._navigator.standalone && !r) && (n.usingWebAudio = !1) } n.usingWebAudio && (n.masterGain = void 0 === n.ctx.createGain ? n.ctx.createGainNode() : n.ctx.createGain(), n.masterGain.gain.setValueAtTime(n._muted ? 0 : 1, n.ctx.currentTime), n.masterGain.connect(n.ctx.destination)), n._setup() } }; "function" == typeof define && define.amd && define([], function () { return { Howler: n, Howl: o } }), "undefined" != typeof exports && (exports.Howler = n, exports.Howl = o), "undefined" != typeof window ? (window.HowlerGlobal = e, window.Howler = n, window.Howl = o, window.Sound = t) : "undefined" != typeof global && (global.HowlerGlobal = e, global.Howler = n, global.Howl = o, global.Sound = t) }();
/*! Spatial Plugin */
!function () { "use strict"; HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (e) { var n = this; if (!n.ctx || !n.ctx.listener) return n; for (var t = n._howls.length - 1; t >= 0; t--)n._howls[t].stereo(e); return n }, HowlerGlobal.prototype.pos = function (e, n, t) { var r = this; return r.ctx && r.ctx.listener ? (n = "number" != typeof n ? r._pos[1] : n, t = "number" != typeof t ? r._pos[2] : t, "number" != typeof e ? r._pos : (r._pos = [e, n, t], void 0 !== r.ctx.listener.positionX ? (r.ctx.listener.positionX.setTargetAtTime(r._pos[0], Howler.ctx.currentTime, .1), r.ctx.listener.positionY.setTargetAtTime(r._pos[1], Howler.ctx.currentTime, .1), r.ctx.listener.positionZ.setTargetAtTime(r._pos[2], Howler.ctx.currentTime, .1)) : r.ctx.listener.setPosition(r._pos[0], r._pos[1], r._pos[2]), r)) : r }, HowlerGlobal.prototype.orientation = function (e, n, t, r, o, i) { var a = this; if (!a.ctx || !a.ctx.listener) return a; var s = a._orientation; return n = "number" != typeof n ? s[1] : n, t = "number" != typeof t ? s[2] : t, r = "number" != typeof r ? s[3] : r, o = "number" != typeof o ? s[4] : o, i = "number" != typeof i ? s[5] : i, "number" != typeof e ? s : (a._orientation = [e, n, t, r, o, i], void 0 !== a.ctx.listener.forwardX ? (a.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1), a.ctx.listener.forwardY.setTargetAtTime(n, Howler.ctx.currentTime, .1), a.ctx.listener.forwardZ.setTargetAtTime(t, Howler.ctx.currentTime, .1), a.ctx.listener.upX.setTargetAtTime(e, Howler.ctx.currentTime, .1), a.ctx.listener.upY.setTargetAtTime(n, Howler.ctx.currentTime, .1), a.ctx.listener.upZ.setTargetAtTime(t, Howler.ctx.currentTime, .1)) : a.ctx.listener.setOrientation(e, n, t, r, o, i), a) }, Howl.prototype.init = function (e) { return function (n) { var t = this; return t._orientation = n.orientation || [1, 0, 0], t._stereo = n.stereo || null, t._pos = n.pos || null, t._pannerAttr = { coneInnerAngle: void 0 !== n.coneInnerAngle ? n.coneInnerAngle : 360, coneOuterAngle: void 0 !== n.coneOuterAngle ? n.coneOuterAngle : 360, coneOuterGain: void 0 !== n.coneOuterGain ? n.coneOuterGain : 0, distanceModel: void 0 !== n.distanceModel ? n.distanceModel : "inverse", maxDistance: void 0 !== n.maxDistance ? n.maxDistance : 1e4, panningModel: void 0 !== n.panningModel ? n.panningModel : "HRTF", refDistance: void 0 !== n.refDistance ? n.refDistance : 1, rolloffFactor: void 0 !== n.rolloffFactor ? n.rolloffFactor : 1 }, t._onstereo = n.onstereo ? [{ fn: n.onstereo }] : [], t._onpos = n.onpos ? [{ fn: n.onpos }] : [], t._onorientation = n.onorientation ? [{ fn: n.onorientation }] : [], e.call(this, n) } }(Howl.prototype.init), Howl.prototype.stereo = function (n, t) { var r = this; if (!r._webAudio) return r; if ("loaded" !== r._state) return r._queue.push({ event: "stereo", action: function () { r.stereo(n, t) } }), r; var o = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo"; if (void 0 === t) { if ("number" != typeof n) return r._stereo; r._stereo = n, r._pos = [n, 0, 0] } for (var i = r._getSoundIds(t), a = 0; a < i.length; a++) { var s = r._soundById(i[a]); if (s) { if ("number" != typeof n) return s._stereo; s._stereo = n, s._pos = [n, 0, 0], s._node && (s._pannerAttr.panningModel = "equalpower", s._panner && s._panner.pan || e(s, o), "spatial" === o ? void 0 !== s._panner.positionX ? (s._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), s._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), s._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : s._panner.setPosition(n, 0, 0) : s._panner.pan.setValueAtTime(n, Howler.ctx.currentTime)), r._emit("stereo", s._id) } } return r }, Howl.prototype.pos = function (n, t, r, o) { var i = this; if (!i._webAudio) return i; if ("loaded" !== i._state) return i._queue.push({ event: "pos", action: function () { i.pos(n, t, r, o) } }), i; if (t = "number" != typeof t ? 0 : t, r = "number" != typeof r ? -.5 : r, void 0 === o) { if ("number" != typeof n) return i._pos; i._pos = [n, t, r] } for (var a = i._getSoundIds(o), s = 0; s < a.length; s++) { var p = i._soundById(a[s]); if (p) { if ("number" != typeof n) return p._pos; p._pos = [n, t, r], p._node && (p._panner && !p._panner.pan || e(p, "spatial"), void 0 !== p._panner.positionX ? (p._panner.positionX.setValueAtTime(n, Howler.ctx.currentTime), p._panner.positionY.setValueAtTime(t, Howler.ctx.currentTime), p._panner.positionZ.setValueAtTime(r, Howler.ctx.currentTime)) : p._panner.setPosition(n, t, r)), i._emit("pos", p._id) } } return i }, Howl.prototype.orientation = function (n, t, r, o) { var i = this; if (!i._webAudio) return i; if ("loaded" !== i._state) return i._queue.push({ event: "orientation", action: function () { i.orientation(n, t, r, o) } }), i; if (t = "number" != typeof t ? i._orientation[1] : t, r = "number" != typeof r ? i._orientation[2] : r, void 0 === o) { if ("number" != typeof n) return i._orientation; i._orientation = [n, t, r] } for (var a = i._getSoundIds(o), s = 0; s < a.length; s++) { var p = i._soundById(a[s]); if (p) { if ("number" != typeof n) return p._orientation; p._orientation = [n, t, r], p._node && (p._panner || (p._pos || (p._pos = i._pos || [0, 0, -.5]), e(p, "spatial")), void 0 !== p._panner.orientationX ? (p._panner.orientationX.setValueAtTime(n, Howler.ctx.currentTime), p._panner.orientationY.setValueAtTime(t, Howler.ctx.currentTime), p._panner.orientationZ.setValueAtTime(r, Howler.ctx.currentTime)) : p._panner.setOrientation(n, t, r)), i._emit("orientation", p._id) } } return i }, Howl.prototype.pannerAttr = function () { var n, t, r, o = this, i = arguments; if (!o._webAudio) return o; if (0 === i.length) return o._pannerAttr; if (1 === i.length) { if ("object" != typeof i[0]) return r = o._soundById(parseInt(i[0], 10)), r ? r._pannerAttr : o._pannerAttr; n = i[0], void 0 === t && (n.pannerAttr || (n.pannerAttr = { coneInnerAngle: n.coneInnerAngle, coneOuterAngle: n.coneOuterAngle, coneOuterGain: n.coneOuterGain, distanceModel: n.distanceModel, maxDistance: n.maxDistance, refDistance: n.refDistance, rolloffFactor: n.rolloffFactor, panningModel: n.panningModel }), o._pannerAttr = { coneInnerAngle: void 0 !== n.pannerAttr.coneInnerAngle ? n.pannerAttr.coneInnerAngle : o._coneInnerAngle, coneOuterAngle: void 0 !== n.pannerAttr.coneOuterAngle ? n.pannerAttr.coneOuterAngle : o._coneOuterAngle, coneOuterGain: void 0 !== n.pannerAttr.coneOuterGain ? n.pannerAttr.coneOuterGain : o._coneOuterGain, distanceModel: void 0 !== n.pannerAttr.distanceModel ? n.pannerAttr.distanceModel : o._distanceModel, maxDistance: void 0 !== n.pannerAttr.maxDistance ? n.pannerAttr.maxDistance : o._maxDistance, refDistance: void 0 !== n.pannerAttr.refDistance ? n.pannerAttr.refDistance : o._refDistance, rolloffFactor: void 0 !== n.pannerAttr.rolloffFactor ? n.pannerAttr.rolloffFactor : o._rolloffFactor, panningModel: void 0 !== n.pannerAttr.panningModel ? n.pannerAttr.panningModel : o._panningModel }) } else 2 === i.length && (n = i[0], t = parseInt(i[1], 10)); for (var a = o._getSoundIds(t), s = 0; s < a.length; s++)if (r = o._soundById(a[s])) { var p = r._pannerAttr; p = { coneInnerAngle: void 0 !== n.coneInnerAngle ? n.coneInnerAngle : p.coneInnerAngle, coneOuterAngle: void 0 !== n.coneOuterAngle ? n.coneOuterAngle : p.coneOuterAngle, coneOuterGain: void 0 !== n.coneOuterGain ? n.coneOuterGain : p.coneOuterGain, distanceModel: void 0 !== n.distanceModel ? n.distanceModel : p.distanceModel, maxDistance: void 0 !== n.maxDistance ? n.maxDistance : p.maxDistance, refDistance: void 0 !== n.refDistance ? n.refDistance : p.refDistance, rolloffFactor: void 0 !== n.rolloffFactor ? n.rolloffFactor : p.rolloffFactor, panningModel: void 0 !== n.panningModel ? n.panningModel : p.panningModel }; var c = r._panner; c ? (c.coneInnerAngle = p.coneInnerAngle, c.coneOuterAngle = p.coneOuterAngle, c.coneOuterGain = p.coneOuterGain, c.distanceModel = p.distanceModel, c.maxDistance = p.maxDistance, c.refDistance = p.refDistance, c.rolloffFactor = p.rolloffFactor, c.panningModel = p.panningModel) : (r._pos || (r._pos = o._pos || [0, 0, -.5]), e(r, "spatial")) } return o }, Sound.prototype.init = function (e) { return function () { var n = this, t = n._parent; n._orientation = t._orientation, n._stereo = t._stereo, n._pos = t._pos, n._pannerAttr = t._pannerAttr, e.call(this), n._stereo ? t.stereo(n._stereo) : n._pos && t.pos(n._pos[0], n._pos[1], n._pos[2], n._id) } }(Sound.prototype.init), Sound.prototype.reset = function (e) { return function () { var n = this, t = n._parent; return n._orientation = t._orientation, n._stereo = t._stereo, n._pos = t._pos, n._pannerAttr = t._pannerAttr, n._stereo ? t.stereo(n._stereo) : n._pos ? t.pos(n._pos[0], n._pos[1], n._pos[2], n._id) : n._panner && (n._panner.disconnect(0), n._panner = void 0, t._refreshBuffer(n)), e.call(this) } }(Sound.prototype.reset); var e = function (e, n) { n = n || "spatial", "spatial" === n ? (e._panner = Howler.ctx.createPanner(), e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle, e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle, e._panner.coneOuterGain = e._pannerAttr.coneOuterGain, e._panner.distanceModel = e._pannerAttr.distanceModel, e._panner.maxDistance = e._pannerAttr.maxDistance, e._panner.refDistance = e._pannerAttr.refDistance, e._panner.rolloffFactor = e._pannerAttr.rolloffFactor, e._panner.panningModel = e._pannerAttr.panningModel, void 0 !== e._panner.positionX ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime), e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime), e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)) : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]), void 0 !== e._panner.orientationX ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime), e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime), e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime)) : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(), e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)), e._panner.connect(e._node), e._paused || e._parent.pause(e._id, !0).play(e._id, !0) } }();

// js/screenfull.js
(function () {
    'use strict';

    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var isCommonjs = typeof module !== 'undefined' && module.exports;

    var fn = (function () {
        var val;

        var fnMap = [
            [
                'requestFullscreen',
                'exitFullscreen',
                'fullscreenElement',
                'fullscreenEnabled',
                'fullscreenchange',
                'fullscreenerror'
            ],
            // New WebKit
            [
                'webkitRequestFullscreen',
                'webkitExitFullscreen',
                'webkitFullscreenElement',
                'webkitFullscreenEnabled',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            // Old WebKit
            [
                'webkitRequestFullScreen',
                'webkitCancelFullScreen',
                'webkitCurrentFullScreenElement',
                'webkitCancelFullScreen',
                'webkitfullscreenchange',
                'webkitfullscreenerror'

            ],
            [
                'mozRequestFullScreen',
                'mozCancelFullScreen',
                'mozFullScreenElement',
                'mozFullScreenEnabled',
                'mozfullscreenchange',
                'mozfullscreenerror'
            ],
            [
                'msRequestFullscreen',
                'msExitFullscreen',
                'msFullscreenElement',
                'msFullscreenEnabled',
                'MSFullscreenChange',
                'MSFullscreenError'
            ]
        ];

        var i = 0;
        var l = fnMap.length;
        var ret = {};

        for (; i < l; i++) {
            val = fnMap[i];
            if (val && val[1] in document) {
                for (i = 0; i < val.length; i++) {
                    ret[fnMap[0][i]] = val[i];
                }
                return ret;
            }
        }

        return false;
    })();

    var eventNameMap = {
        change: fn.fullscreenchange,
        error: fn.fullscreenerror
    };

    var screenfull = {
        request: function (element) {
            return new Promise(function (resolve, reject) {
                var onFullScreenEntered = function () {
                    this.off('change', onFullScreenEntered);
                    resolve();
                }.bind(this);

                this.on('change', onFullScreenEntered);

                element = element || document.documentElement;

                Promise.resolve(element[fn.requestFullscreen]()).catch(reject);
            }.bind(this));
        },
        exit: function () {
            return new Promise(function (resolve, reject) {
                if (!this.isFullscreen) {
                    resolve();
                    return;
                }

                var onFullScreenExit = function () {
                    this.off('change', onFullScreenExit);
                    resolve();
                }.bind(this);

                this.on('change', onFullScreenExit);

                Promise.resolve(document[fn.exitFullscreen]()).catch(reject);
            }.bind(this));
        },
        toggle: function (element) {
            return this.isFullscreen ? this.exit() : this.request(element);
        },
        onchange: function (callback) {
            this.on('change', callback);
        },
        onerror: function (callback) {
            this.on('error', callback);
        },
        on: function (event, callback) {
            var eventName = eventNameMap[event];
            if (eventName) {
                document.addEventListener(eventName, callback, false);
            }
        },
        off: function (event, callback) {
            var eventName = eventNameMap[event];
            if (eventName) {
                document.removeEventListener(eventName, callback, false);
            }
        },
        raw: fn
    };

    if (!fn) {
        if (isCommonjs) {
            module.exports = { isEnabled: false };
        } else {
            window.screenfull = { isEnabled: false };
        }

        return;
    }

    Object.defineProperties(screenfull, {
        isFullscreen: {
            get: function () {
                return Boolean(document[fn.fullscreenElement]);
            }
        },
        element: {
            enumerable: true,
            get: function () {
                return document[fn.fullscreenElement];
            }
        },
        isEnabled: {
            enumerable: true,
            get: function () {
                // Coerce to boolean in case of old WebKit
                return Boolean(document[fn.fullscreenEnabled]);
            }
        }
    });

    if (isCommonjs) {
        module.exports = screenfull;
    } else {
        window.screenfull = screenfull;
    }
})();


// js/hammer.min.js
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function (a, b, c, d) { "use strict"; function e(a, b, c) { return setTimeout(j(a, c), b) } function f(a, b, c) { return Array.isArray(a) ? (g(a, c[b], c), !0) : !1 } function g(a, b, c) { var e; if (a) if (a.forEach) a.forEach(b, c); else if (a.length !== d) for (e = 0; e < a.length;)b.call(c, a[e], e, a), e++; else for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a) } function h(b, c, d) { var e = "DEPRECATED METHOD: " + c + "\n" + d + " AT \n"; return function () { var c = new Error("get-stack-trace"), d = c && c.stack ? c.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace", f = a.console && (a.console.warn || a.console.log); return f && f.call(a.console, e, d), b.apply(this, arguments) } } function i(a, b, c) { var d, e = b.prototype; d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && la(d, c) } function j(a, b) { return function () { return a.apply(b, arguments) } } function k(a, b) { return typeof a == oa ? a.apply(b ? b[0] || d : d, b) : a } function l(a, b) { return a === d ? b : a } function m(a, b, c) { g(q(b), function (b) { a.addEventListener(b, c, !1) }) } function n(a, b, c) { g(q(b), function (b) { a.removeEventListener(b, c, !1) }) } function o(a, b) { for (; a;) { if (a == b) return !0; a = a.parentNode } return !1 } function p(a, b) { return a.indexOf(b) > -1 } function q(a) { return a.trim().split(/\s+/g) } function r(a, b, c) { if (a.indexOf && !c) return a.indexOf(b); for (var d = 0; d < a.length;) { if (c && a[d][c] == b || !c && a[d] === b) return d; d++ } return -1 } function s(a) { return Array.prototype.slice.call(a, 0) } function t(a, b, c) { for (var d = [], e = [], f = 0; f < a.length;) { var g = b ? a[f][b] : a[f]; r(e, g) < 0 && d.push(a[f]), e[f] = g, f++ } return c && (d = b ? d.sort(function (a, c) { return a[b] > c[b] }) : d.sort()), d } function u(a, b) { for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ma.length;) { if (c = ma[g], e = c ? c + f : b, e in a) return e; g++ } return d } function v() { return ua++ } function w(b) { var c = b.ownerDocument || b; return c.defaultView || c.parentWindow || a } function x(a, b) { var c = this; this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) { k(a.options.enable, [a]) && c.handler(b) }, this.init() } function y(a) { var b, c = a.options.inputClass; return new (b = c ? c : xa ? M : ya ? P : wa ? R : L)(a, z) } function z(a, b, c) { var d = c.pointers.length, e = c.changedPointers.length, f = b & Ea && d - e === 0, g = b & (Ga | Ha) && d - e === 0; c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, A(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c } function A(a, b) { var c = a.session, d = b.pointers, e = d.length; c.firstInput || (c.firstInput = D(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = D(b) : 1 === e && (c.firstMultiple = !1); var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = E(d); b.timeStamp = ra(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = I(h, i), b.distance = H(h, i), B(c, b), b.offsetDirection = G(b.deltaX, b.deltaY); var j = F(b.deltaTime, b.deltaX, b.deltaY); b.overallVelocityX = j.x, b.overallVelocityY = j.y, b.overallVelocity = qa(j.x) > qa(j.y) ? j.x : j.y, b.scale = g ? K(g.pointers, d) : 1, b.rotation = g ? J(g.pointers, d) : 0, b.maxPointers = c.prevInput ? b.pointers.length > c.prevInput.maxPointers ? b.pointers.length : c.prevInput.maxPointers : b.pointers.length, C(c, b); var k = a.element; o(b.srcEvent.target, k) && (k = b.srcEvent.target), b.target = k } function B(a, b) { var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {}; b.eventType !== Ea && f.eventType !== Ga || (e = a.prevDelta = { x: f.deltaX || 0, y: f.deltaY || 0 }, d = a.offsetDelta = { x: c.x, y: c.y }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y) } function C(a, b) { var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp; if (b.eventType != Ha && (i > Da || h.velocity === d)) { var j = b.deltaX - h.deltaX, k = b.deltaY - h.deltaY, l = F(i, j, k); e = l.x, f = l.y, c = qa(l.x) > qa(l.y) ? l.x : l.y, g = G(j, k), a.lastInterval = b } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction; b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g } function D(a) { for (var b = [], c = 0; c < a.pointers.length;)b[c] = { clientX: pa(a.pointers[c].clientX), clientY: pa(a.pointers[c].clientY) }, c++; return { timeStamp: ra(), pointers: b, center: E(b), deltaX: a.deltaX, deltaY: a.deltaY } } function E(a) { var b = a.length; if (1 === b) return { x: pa(a[0].clientX), y: pa(a[0].clientY) }; for (var c = 0, d = 0, e = 0; b > e;)c += a[e].clientX, d += a[e].clientY, e++; return { x: pa(c / b), y: pa(d / b) } } function F(a, b, c) { return { x: b / a || 0, y: c / a || 0 } } function G(a, b) { return a === b ? Ia : qa(a) >= qa(b) ? 0 > a ? Ja : Ka : 0 > b ? La : Ma } function H(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return Math.sqrt(d * d + e * e) } function I(a, b, c) { c || (c = Qa); var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]]; return 180 * Math.atan2(e, d) / Math.PI } function J(a, b) { return I(b[1], b[0], Ra) + I(a[1], a[0], Ra) } function K(a, b) { return H(b[0], b[1], Ra) / H(a[0], a[1], Ra) } function L() { this.evEl = Ta, this.evWin = Ua, this.pressed = !1, x.apply(this, arguments) } function M() { this.evEl = Xa, this.evWin = Ya, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = [] } function N() { this.evTarget = $a, this.evWin = _a, this.started = !1, x.apply(this, arguments) } function O(a, b) { var c = s(a.touches), d = s(a.changedTouches); return b & (Ga | Ha) && (c = t(c.concat(d), "identifier", !0)), [c, d] } function P() { this.evTarget = bb, this.targetIds = {}, x.apply(this, arguments) } function Q(a, b) { var c = s(a.touches), d = this.targetIds; if (b & (Ea | Fa) && 1 === c.length) return d[c[0].identifier] = !0, [c, c]; var e, f, g = s(a.changedTouches), h = [], i = this.target; if (f = c.filter(function (a) { return o(a.target, i) }), b === Ea) for (e = 0; e < f.length;)d[f[e].identifier] = !0, e++; for (e = 0; e < g.length;)d[g[e].identifier] && h.push(g[e]), b & (Ga | Ha) && delete d[g[e].identifier], e++; return h.length ? [t(f.concat(h), "identifier", !0), h] : void 0 } function R() { x.apply(this, arguments); var a = j(this.handler, this); this.touch = new P(this.manager, a), this.mouse = new L(this.manager, a), this.primaryTouch = null, this.lastTouches = [] } function S(a, b) { a & Ea ? (this.primaryTouch = b.changedPointers[0].identifier, T.call(this, b)) : a & (Ga | Ha) && T.call(this, b) } function T(a) { var b = a.changedPointers[0]; if (b.identifier === this.primaryTouch) { var c = { x: b.clientX, y: b.clientY }; this.lastTouches.push(c); var d = this.lastTouches, e = function () { var a = d.indexOf(c); a > -1 && d.splice(a, 1) }; setTimeout(e, cb) } } function U(a) { for (var b = a.srcEvent.clientX, c = a.srcEvent.clientY, d = 0; d < this.lastTouches.length; d++) { var e = this.lastTouches[d], f = Math.abs(b - e.x), g = Math.abs(c - e.y); if (db >= f && db >= g) return !0 } return !1 } function V(a, b) { this.manager = a, this.set(b) } function W(a) { if (p(a, jb)) return jb; var b = p(a, kb), c = p(a, lb); return b && c ? jb : b || c ? b ? kb : lb : p(a, ib) ? ib : hb } function X() { if (!fb) return !1; var b = {}, c = a.CSS && a.CSS.supports; return ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (d) { b[d] = c ? a.CSS.supports("touch-action", d) : !0 }), b } function Y(a) { this.options = la({}, this.defaults, a || {}), this.id = v(), this.manager = null, this.options.enable = l(this.options.enable, !0), this.state = nb, this.simultaneous = {}, this.requireFail = [] } function Z(a) { return a & sb ? "cancel" : a & qb ? "end" : a & pb ? "move" : a & ob ? "start" : "" } function $(a) { return a == Ma ? "down" : a == La ? "up" : a == Ja ? "left" : a == Ka ? "right" : "" } function _(a, b) { var c = b.manager; return c ? c.get(a) : a } function aa() { Y.apply(this, arguments) } function ba() { aa.apply(this, arguments), this.pX = null, this.pY = null } function ca() { aa.apply(this, arguments) } function da() { Y.apply(this, arguments), this._timer = null, this._input = null } function ea() { aa.apply(this, arguments) } function fa() { aa.apply(this, arguments) } function ga() { Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0 } function ha(a, b) { return b = b || {}, b.recognizers = l(b.recognizers, ha.defaults.preset), new ia(a, b) } function ia(a, b) { this.options = la({}, ha.defaults, b || {}), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.oldCssProps = {}, this.element = a, this.input = y(this), this.touchAction = new V(this, this.options.touchAction), ja(this, !0), g(this.options.recognizers, function (a) { var b = this.add(new a[0](a[1])); a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3]) }, this) } function ja(a, b) { var c = a.element; if (c.style) { var d; g(a.options.cssProps, function (e, f) { d = u(c.style, f), b ? (a.oldCssProps[d] = c.style[d], c.style[d] = e) : c.style[d] = a.oldCssProps[d] || "" }), b || (a.oldCssProps = {}) } } function ka(a, c) { var d = b.createEvent("Event"); d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d) } var la, ma = ["", "webkit", "Moz", "MS", "ms", "o"], na = b.createElement("div"), oa = "function", pa = Math.round, qa = Math.abs, ra = Date.now; la = "function" != typeof Object.assign ? function (a) { if (a === d || null === a) throw new TypeError("Cannot convert undefined or null to object"); for (var b = Object(a), c = 1; c < arguments.length; c++) { var e = arguments[c]; if (e !== d && null !== e) for (var f in e) e.hasOwnProperty(f) && (b[f] = e[f]) } return b } : Object.assign; var sa = h(function (a, b, c) { for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++; return a }, "extend", "Use `assign`."), ta = h(function (a, b) { return sa(a, b, !0) }, "merge", "Use `assign`."), ua = 1, va = /mobile|tablet|ip(ad|hone|od)|android/i, wa = "ontouchstart" in a, xa = u(a, "PointerEvent") !== d, ya = wa && va.test(navigator.userAgent), za = "touch", Aa = "pen", Ba = "mouse", Ca = "kinect", Da = 25, Ea = 1, Fa = 2, Ga = 4, Ha = 8, Ia = 1, Ja = 2, Ka = 4, La = 8, Ma = 16, Na = Ja | Ka, Oa = La | Ma, Pa = Na | Oa, Qa = ["x", "y"], Ra = ["clientX", "clientY"]; x.prototype = { handler: function () { }, init: function () { this.evEl && m(this.element, this.evEl, this.domHandler), this.evTarget && m(this.target, this.evTarget, this.domHandler), this.evWin && m(w(this.element), this.evWin, this.domHandler) }, destroy: function () { this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(w(this.element), this.evWin, this.domHandler) } }; var Sa = { mousedown: Ea, mousemove: Fa, mouseup: Ga }, Ta = "mousedown", Ua = "mousemove mouseup"; i(L, x, { handler: function (a) { var b = Sa[a.type]; b & Ea && 0 === a.button && (this.pressed = !0), b & Fa && 1 !== a.which && (b = Ga), this.pressed && (b & Ga && (this.pressed = !1), this.callback(this.manager, b, { pointers: [a], changedPointers: [a], pointerType: Ba, srcEvent: a })) } }); var Va = { pointerdown: Ea, pointermove: Fa, pointerup: Ga, pointercancel: Ha, pointerout: Ha }, Wa = { 2: za, 3: Aa, 4: Ba, 5: Ca }, Xa = "pointerdown", Ya = "pointermove pointerup pointercancel"; a.MSPointerEvent && !a.PointerEvent && (Xa = "MSPointerDown", Ya = "MSPointerMove MSPointerUp MSPointerCancel"), i(M, x, { handler: function (a) { var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Va[d], f = Wa[a.pointerType] || a.pointerType, g = f == za, h = r(b, a.pointerId, "pointerId"); e & Ea && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ga | Ha) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, { pointers: b, changedPointers: [a], pointerType: f, srcEvent: a }), c && b.splice(h, 1)) } }); var Za = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, $a = "touchstart", _a = "touchstart touchmove touchend touchcancel"; i(N, x, { handler: function (a) { var b = Za[a.type]; if (b === Ea && (this.started = !0), this.started) { var c = O.call(this, a, b); b & (Ga | Ha) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } } }); var ab = { touchstart: Ea, touchmove: Fa, touchend: Ga, touchcancel: Ha }, bb = "touchstart touchmove touchend touchcancel"; i(P, x, { handler: function (a) { var b = ab[a.type], c = Q.call(this, a, b); c && this.callback(this.manager, b, { pointers: c[0], changedPointers: c[1], pointerType: za, srcEvent: a }) } }); var cb = 2500, db = 25; i(R, x, { handler: function (a, b, c) { var d = c.pointerType == za, e = c.pointerType == Ba; if (!(e && c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents)) { if (d) S.call(this, b, c); else if (e && U.call(this, c)) return; this.callback(a, b, c) } }, destroy: function () { this.touch.destroy(), this.mouse.destroy() } }); var eb = u(na.style, "touchAction"), fb = eb !== d, gb = "compute", hb = "auto", ib = "manipulation", jb = "none", kb = "pan-x", lb = "pan-y", mb = X(); V.prototype = { set: function (a) { a == gb && (a = this.compute()), fb && this.manager.element.style && mb[a] && (this.manager.element.style[eb] = a), this.actions = a.toLowerCase().trim() }, update: function () { this.set(this.manager.options.touchAction) }, compute: function () { var a = []; return g(this.manager.recognizers, function (b) { k(b.options.enable, [b]) && (a = a.concat(b.getTouchAction())) }), W(a.join(" ")) }, preventDefaults: function (a) { var b = a.srcEvent, c = a.offsetDirection; if (this.manager.session.prevented) return void b.preventDefault(); var d = this.actions, e = p(d, jb) && !mb[jb], f = p(d, lb) && !mb[lb], g = p(d, kb) && !mb[kb]; if (e) { var h = 1 === a.pointers.length, i = a.distance < 2, j = a.deltaTime < 250; if (h && i && j) return } return g && f ? void 0 : e || f && c & Na || g && c & Oa ? this.preventSrc(b) : void 0 }, preventSrc: function (a) { this.manager.session.prevented = !0, a.preventDefault() } }; var nb = 1, ob = 2, pb = 4, qb = 8, rb = qb, sb = 16, tb = 32; Y.prototype = { defaults: {}, set: function (a) { return la(this.options, a), this.manager && this.manager.touchAction.update(), this }, recognizeWith: function (a) { if (f(a, "recognizeWith", this)) return this; var b = this.simultaneous; return a = _(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this }, dropRecognizeWith: function (a) { return f(a, "dropRecognizeWith", this) ? this : (a = _(a, this), delete this.simultaneous[a.id], this) }, requireFailure: function (a) { if (f(a, "requireFailure", this)) return this; var b = this.requireFail; return a = _(a, this), -1 === r(b, a) && (b.push(a), a.requireFailure(this)), this }, dropRequireFailure: function (a) { if (f(a, "dropRequireFailure", this)) return this; a = _(a, this); var b = r(this.requireFail, a); return b > -1 && this.requireFail.splice(b, 1), this }, hasRequireFailures: function () { return this.requireFail.length > 0 }, canRecognizeWith: function (a) { return !!this.simultaneous[a.id] }, emit: function (a) { function b(b) { c.manager.emit(b, a) } var c = this, d = this.state; qb > d && b(c.options.event + Z(d)), b(c.options.event), a.additionalEvent && b(a.additionalEvent), d >= qb && b(c.options.event + Z(d)) }, tryEmit: function (a) { return this.canEmit() ? this.emit(a) : void (this.state = tb) }, canEmit: function () { for (var a = 0; a < this.requireFail.length;) { if (!(this.requireFail[a].state & (tb | nb))) return !1; a++ } return !0 }, recognize: function (a) { var b = la({}, a); return k(this.options.enable, [this, b]) ? (this.state & (rb | sb | tb) && (this.state = nb), this.state = this.process(b), void (this.state & (ob | pb | qb | sb) && this.tryEmit(b))) : (this.reset(), void (this.state = tb)) }, process: function (a) { }, getTouchAction: function () { }, reset: function () { } }, i(aa, Y, { defaults: { pointers: 1 }, attrTest: function (a) { var b = this.options.pointers; return 0 === b || a.pointers.length === b }, process: function (a) { var b = this.state, c = a.eventType, d = b & (ob | pb), e = this.attrTest(a); return d && (c & Ha || !e) ? b | sb : d || e ? c & Ga ? b | qb : b & ob ? b | pb : ob : tb } }), i(ba, aa, { defaults: { event: "pan", threshold: 10, pointers: 1, direction: Pa }, getTouchAction: function () { var a = this.options.direction, b = []; return a & Na && b.push(lb), a & Oa && b.push(kb), b }, directionTest: function (a) { var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY; return e & b.direction || (b.direction & Na ? (e = 0 === f ? Ia : 0 > f ? Ja : Ka, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ia : 0 > g ? La : Ma, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction }, attrTest: function (a) { return aa.prototype.attrTest.call(this, a) && (this.state & ob || !(this.state & ob) && this.directionTest(a)) }, emit: function (a) { this.pX = a.deltaX, this.pY = a.deltaY; var b = $(a.direction); b && (a.additionalEvent = this.options.event + b), this._super.emit.call(this, a) } }), i(ca, aa, { defaults: { event: "pinch", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & ob) }, emit: function (a) { if (1 !== a.scale) { var b = a.scale < 1 ? "in" : "out"; a.additionalEvent = this.options.event + b } this._super.emit.call(this, a) } }), i(da, Y, { defaults: { event: "press", pointers: 1, time: 251, threshold: 9 }, getTouchAction: function () { return [hb] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time; if (this._input = a, !d || !c || a.eventType & (Ga | Ha) && !f) this.reset(); else if (a.eventType & Ea) this.reset(), this._timer = e(function () { this.state = rb, this.tryEmit() }, b.time, this); else if (a.eventType & Ga) return rb; return tb }, reset: function () { clearTimeout(this._timer) }, emit: function (a) { this.state === rb && (a && a.eventType & Ga ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = ra(), this.manager.emit(this.options.event, this._input))) } }), i(ea, aa, { defaults: { event: "rotate", threshold: 0, pointers: 2 }, getTouchAction: function () { return [jb] }, attrTest: function (a) { return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & ob) } }), i(fa, aa, { defaults: { event: "swipe", threshold: 10, velocity: .3, direction: Na | Oa, pointers: 1 }, getTouchAction: function () { return ba.prototype.getTouchAction.call(this) }, attrTest: function (a) { var b, c = this.options.direction; return c & (Na | Oa) ? b = a.overallVelocity : c & Na ? b = a.overallVelocityX : c & Oa && (b = a.overallVelocityY), this._super.attrTest.call(this, a) && c & a.offsetDirection && a.distance > this.options.threshold && a.maxPointers == this.options.pointers && qa(b) > this.options.velocity && a.eventType & Ga }, emit: function (a) { var b = $(a.offsetDirection); b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a) } }), i(ga, Y, { defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 }, getTouchAction: function () { return [ib] }, process: function (a) { var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time; if (this.reset(), a.eventType & Ea && 0 === this.count) return this.failTimeout(); if (d && f && c) { if (a.eventType != Ga) return this.failTimeout(); var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || H(this.pCenter, a.center) < b.posThreshold; this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a; var i = this.count % b.taps; if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function () { this.state = rb, this.tryEmit() }, b.interval, this), ob) : rb } return tb }, failTimeout: function () { return this._timer = e(function () { this.state = tb }, this.options.interval, this), tb }, reset: function () { clearTimeout(this._timer) }, emit: function () { this.state == rb && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input)) } }), ha.VERSION = "2.0.8", ha.defaults = { domEvents: !1, touchAction: gb, enable: !0, inputTarget: null, inputClass: null, preset: [[ea, { enable: !1 }], [ca, { enable: !1 }, ["rotate"]], [fa, { direction: Na }], [ba, { direction: Na }, ["swipe"]], [ga], [ga, { event: "doubletap", taps: 2 }, ["tap"]], [da]], cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" } }; var ub = 1, vb = 2; ia.prototype = { set: function (a) { return la(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this }, stop: function (a) { this.session.stopped = a ? vb : ub }, recognize: function (a) { var b = this.session; if (!b.stopped) { this.touchAction.preventDefaults(a); var c, d = this.recognizers, e = b.curRecognizer; (!e || e && e.state & rb) && (e = b.curRecognizer = null); for (var f = 0; f < d.length;)c = d[f], b.stopped === vb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (ob | pb | qb) && (e = b.curRecognizer = c), f++ } }, get: function (a) { if (a instanceof Y) return a; for (var b = this.recognizers, c = 0; c < b.length; c++)if (b[c].options.event == a) return b[c]; return null }, add: function (a) { if (f(a, "add", this)) return this; var b = this.get(a.options.event); return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a }, remove: function (a) { if (f(a, "remove", this)) return this; if (a = this.get(a)) { var b = this.recognizers, c = r(b, a); -1 !== c && (b.splice(c, 1), this.touchAction.update()) } return this }, on: function (a, b) { if (a !== d && b !== d) { var c = this.handlers; return g(q(a), function (a) { c[a] = c[a] || [], c[a].push(b) }), this } }, off: function (a, b) { if (a !== d) { var c = this.handlers; return g(q(a), function (a) { b ? c[a] && c[a].splice(r(c[a], b), 1) : delete c[a] }), this } }, emit: function (a, b) { this.options.domEvents && ka(a, b); var c = this.handlers[a] && this.handlers[a].slice(); if (c && c.length) { b.type = a, b.preventDefault = function () { b.srcEvent.preventDefault() }; for (var d = 0; d < c.length;)c[d](b), d++ } }, destroy: function () { this.element && ja(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null } }, la(ha, { INPUT_START: Ea, INPUT_MOVE: Fa, INPUT_END: Ga, INPUT_CANCEL: Ha, STATE_POSSIBLE: nb, STATE_BEGAN: ob, STATE_CHANGED: pb, STATE_ENDED: qb, STATE_RECOGNIZED: rb, STATE_CANCELLED: sb, STATE_FAILED: tb, DIRECTION_NONE: Ia, DIRECTION_LEFT: Ja, DIRECTION_RIGHT: Ka, DIRECTION_UP: La, DIRECTION_DOWN: Ma, DIRECTION_HORIZONTAL: Na, DIRECTION_VERTICAL: Oa, DIRECTION_ALL: Pa, Manager: ia, Input: x, TouchAction: V, TouchInput: P, MouseInput: L, PointerEventInput: M, TouchMouseInput: R, SingleTouchInput: N, Recognizer: Y, AttrRecognizer: aa, Tap: ga, Pan: ba, Swipe: fa, Pinch: ca, Rotate: ea, Press: da, on: m, off: n, each: g, merge: ta, extend: sa, assign: la, inherit: i, bindFn: j, prefixed: u }); var wb = "undefined" != typeof a ? a : "undefined" != typeof self ? self : {}; wb.Hammer = ha, "function" == typeof define && define.amd ? define(function () { return ha }) : "undefined" != typeof module && module.exports ? module.exports = ha : a[c] = ha }(window, document, "Hammer");
//# sourceMappingURL=hammer.min.js.map

// js/platform.js
/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license <https://mths.be/mit>
 */
; (function () {
    'use strict';

    /** Used to determine if values are of the language type `Object`. */
    var objectTypes = {
        'function': true,
        'object': true
    };

    /** Used as a reference to the global object. */
    var root = (objectTypes[typeof window] && window) || this;

    /** Backup possible global object. */
    var oldRoot = root;

    /** Detect free variable `exports`. */
    var freeExports = objectTypes[typeof exports] && exports;

    /** Detect free variable `module`. */
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

    /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
    var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
        root = freeGlobal;
    }

    /**
     * Used as the maximum length of an array-like object.
     * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
     * for more details.
     */
    var maxSafeInteger = Math.pow(2, 53) - 1;

    /** Regular expression to detect Opera. */
    var reOpera = /\bOpera/;

    /** Possible global object. */
    var thisBinding = this;

    /** Used for native method references. */
    var objectProto = Object.prototype;

    /** Used to check for own properties of an object. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to resolve the internal `[[Class]]` of values. */
    var toString = objectProto.toString;

    /*--------------------------------------------------------------------------*/

    /**
     * Capitalizes a string value.
     *
     * @private
     * @param {string} string The string to capitalize.
     * @returns {string} The capitalized string.
     */
    function capitalize(string) {
        string = String(string);
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * A utility function to clean up the OS name.
     *
     * @private
     * @param {string} os The OS name to clean up.
     * @param {string} [pattern] A `RegExp` pattern matching the OS name.
     * @param {string} [label] A label for the OS.
     */
    function cleanupOS(os, pattern, label) {
        // Platform tokens are defined at:
        // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
        // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
        var data = {
            '10.0': '10',
            '6.4': '10 Technical Preview',
            '6.3': '8.1',
            '6.2': '8',
            '6.1': 'Server 2008 R2 / 7',
            '6.0': 'Server 2008 / Vista',
            '5.2': 'Server 2003 / XP 64-bit',
            '5.1': 'XP',
            '5.01': '2000 SP1',
            '5.0': '2000',
            '4.0': 'NT',
            '4.90': 'ME'
        };
        // Detect Windows version from platform tokens.
        if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
            (data = data[/[\d.]+$/.exec(os)])) {
            os = 'Windows ' + data;
        }
        // Correct character case and cleanup string.
        os = String(os);

        if (pattern && label) {
            os = os.replace(RegExp(pattern, 'i'), label);
        }

        os = format(
            os.replace(/ ce$/i, ' CE')
                .replace(/\bhpw/i, 'web')
                .replace(/\bMacintosh\b/, 'Mac OS')
                .replace(/_PowerPC\b/i, ' OS')
                .replace(/\b(OS X) [^ \d]+/i, '$1')
                .replace(/\bMac (OS X)\b/, '$1')
                .replace(/\/(\d)/, ' $1')
                .replace(/_/g, '.')
                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                .replace(/\bx86\.64\b/gi, 'x86_64')
                .replace(/\b(Windows Phone) OS\b/, '$1')
                .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                .split(' on ')[0]
        );

        return os;
    }

    /**
     * An iteration utility for arrays and objects.
     *
     * @private
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} callback The function called per iteration.
     */
    function each(object, callback) {
        var index = -1,
            length = object ? object.length : 0;

        if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
            while (++index < length) {
                callback(object[index], index, object);
            }
        } else {
            forOwn(object, callback);
        }
    }

    /**
     * Trim and conditionally capitalize string values.
     *
     * @private
     * @param {string} string The string to format.
     * @returns {string} The formatted string.
     */
    function format(string) {
        string = trim(string);
        return /^(?:webOS|i(?:OS|P))/.test(string)
            ? string
            : capitalize(string);
    }

    /**
     * Iterates over an object's own properties, executing the `callback` for each.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} callback The function executed per own property.
     */
    function forOwn(object, callback) {
        for (var key in object) {
            if (hasOwnProperty.call(object, key)) {
                callback(object[key], key, object);
            }
        }
    }

    /**
     * Gets the internal `[[Class]]` of a value.
     *
     * @private
     * @param {*} value The value.
     * @returns {string} The `[[Class]]`.
     */
    function getClassOf(value) {
        return value == null
            ? capitalize(value)
            : toString.call(value).slice(8, -1);
    }

    /**
     * Host objects can return type values that are different from their actual
     * data type. The objects we are concerned with usually return non-primitive
     * types of "object", "function", or "unknown".
     *
     * @private
     * @param {*} object The owner of the property.
     * @param {string} property The property to check.
     * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
     */
    function isHostType(object, property) {
        var type = object != null ? typeof object[property] : 'number';
        return !/^(?:boolean|number|string|undefined)$/.test(type) &&
            (type == 'object' ? !!object[property] : true);
    }

    /**
     * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
     *
     * @private
     * @param {string} string The string to qualify.
     * @returns {string} The qualified string.
     */
    function qualify(string) {
        return String(string).replace(/([ -])(?!$)/g, '$1?');
    }

    /**
     * A bare-bones `Array#reduce` like utility function.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} callback The function called per iteration.
     * @returns {*} The accumulated result.
     */
    function reduce(array, callback) {
        var accumulator = null;
        each(array, function (value, index) {
            accumulator = callback(accumulator, value, index, array);
        });
        return accumulator;
    }

    /**
     * Removes leading and trailing whitespace from a string.
     *
     * @private
     * @param {string} string The string to trim.
     * @returns {string} The trimmed string.
     */
    function trim(string) {
        return String(string).replace(/^ +| +$/g, '');
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Creates a new platform object.
     *
     * @memberOf platform
     * @param {Object|string} [ua=navigator.userAgent] The user agent string or
     *  context object.
     * @returns {Object} A platform object.
     */
    function parse(ua) {

        /** The environment context object. */
        var context = root;

        /** Used to flag when a custom context is provided. */
        var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

        // Juggle arguments.
        if (isCustomContext) {
            context = ua;
            ua = null;
        }

        /** Browser navigator object. */
        var nav = context.navigator || {};

        /** Browser user agent string. */
        var userAgent = nav.userAgent || '';

        ua || (ua = userAgent);

        /** Used to flag when `thisBinding` is the [ModuleScope]. */
        var isModuleScope = isCustomContext || thisBinding == oldRoot;

        /** Used to detect if browser is like Chrome. */
        var likeChrome = isCustomContext
            ? !!nav.likeChrome
            : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

        /** Internal `[[Class]]` value shortcuts. */
        var objectClass = 'Object',
            airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
            enviroClass = isCustomContext ? objectClass : 'Environment',
            javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
            phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

        /** Detect Java environments. */
        var java = /\bJava/.test(javaClass) && context.java;

        /** Detect Rhino. */
        var rhino = java && getClassOf(context.environment) == enviroClass;

        /** A character to represent alpha. */
        var alpha = java ? 'a' : '\u03b1';

        /** A character to represent beta. */
        var beta = java ? 'b' : '\u03b2';

        /** Browser document object. */
        var doc = context.document || {};

        /**
         * Detect Opera browser (Presto-based).
         * http://www.howtocreate.co.uk/operaStuff/operaObject.html
         * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
         */
        var opera = context.operamini || context.opera;

        /** Opera `[[Class]]`. */
        var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
            ? operaClass
            : (opera = null);

        /*------------------------------------------------------------------------*/

        /** Temporary variable used over the script's lifetime. */
        var data;

        /** The CPU architecture. */
        var arch = ua;

        /** Platform description array. */
        var description = [];

        /** Platform alpha/beta indicator. */
        var prerelease = null;

        /** A flag to indicate that environment features should be used to resolve the platform. */
        var useFeatures = ua == userAgent;

        /** The browser/environment version. */
        var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

        /** A flag to indicate if the OS ends with "/ Version" */
        var isSpecialCasedOS;

        /* Detectable layout engines (order is important). */
        var layout = getLayout([
            { 'label': 'EdgeHTML', 'pattern': 'Edge' },
            'Trident',
            { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
            'iCab',
            'Presto',
            'NetFront',
            'Tasman',
            'KHTML',
            'Gecko'
        ]);

        /* Detectable browser names (order is important). */
        var name = getName([
            'Adobe AIR',
            'Arora',
            'Avant Browser',
            'Breach',
            'Camino',
            'Electron',
            'Epiphany',
            'Fennec',
            'Flock',
            'Galeon',
            'GreenBrowser',
            'iCab',
            'Iceweasel',
            'K-Meleon',
            'Konqueror',
            'Lunascape',
            'Maxthon',
            { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
            'Midori',
            'Nook Browser',
            'PaleMoon',
            'PhantomJS',
            'Raven',
            'Rekonq',
            'RockMelt',
            { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
            'SeaMonkey',
            { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
            'Sleipnir',
            'SlimBrowser',
            { 'label': 'SRWare Iron', 'pattern': 'Iron' },
            'Sunrise',
            'Swiftfox',
            'Waterfox',
            'WebPositive',
            'Opera Mini',
            { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
            'Opera',
            { 'label': 'Opera', 'pattern': 'OPR' },
            'Chrome',
            { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
            { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
            { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
            { 'label': 'IE', 'pattern': 'IEMobile' },
            { 'label': 'IE', 'pattern': 'MSIE' },
            'Safari'
        ]);

        /* Detectable products (order is important). */
        var product = getProduct([
            { 'label': 'BlackBerry', 'pattern': 'BB10' },
            'BlackBerry',
            { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
            { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
            { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
            { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
            { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
            { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
            { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
            { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
            { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
            'Google TV',
            'Lumia',
            'iPad',
            'iPod',
            'iPhone',
            'Kindle',
            { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
            'Nexus',
            'Nook',
            'PlayBook',
            'PlayStation Vita',
            'PlayStation',
            'TouchPad',
            'Transformer',
            { 'label': 'Wii U', 'pattern': 'WiiU' },
            'Wii',
            'Xbox One',
            { 'label': 'Xbox 360', 'pattern': 'Xbox' },
            'Xoom'
        ]);

        /* Detectable manufacturers. */
        var manufacturer = getManufacturer({
            'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
            'Archos': {},
            'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
            'Asus': { 'Transformer': 1 },
            'Barnes & Noble': { 'Nook': 1 },
            'BlackBerry': { 'PlayBook': 1 },
            'Google': { 'Google TV': 1, 'Nexus': 1 },
            'HP': { 'TouchPad': 1 },
            'HTC': {},
            'LG': {},
            'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
            'Motorola': { 'Xoom': 1 },
            'Nintendo': { 'Wii U': 1, 'Wii': 1 },
            'Nokia': { 'Lumia': 1 },
            'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
            'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
        });

        /* Detectable operating systems (order is important). */
        var os = getOS([
            'Windows Phone',
            'Android',
            'CentOS',
            { 'label': 'Chrome OS', 'pattern': 'CrOS' },
            'Debian',
            'Fedora',
            'FreeBSD',
            'Gentoo',
            'Haiku',
            'Kubuntu',
            'Linux Mint',
            'OpenBSD',
            'Red Hat',
            'SuSE',
            'Ubuntu',
            'Xubuntu',
            'Cygwin',
            'Symbian OS',
            'hpwOS',
            'webOS ',
            'webOS',
            'Tablet OS',
            'Tizen',
            'Linux',
            'Mac OS X',
            'Macintosh',
            'Mac',
            'Windows 98;',
            'Windows '
        ]);

        /*------------------------------------------------------------------------*/

        /**
         * Picks the layout engine from an array of guesses.
         *
         * @private
         * @param {Array} guesses An array of guesses.
         * @returns {null|string} The detected layout engine.
         */
        function getLayout(guesses) {
            return reduce(guesses, function (result, guess) {
                return result || RegExp('\\b' + (
                    guess.pattern || qualify(guess)
                ) + '\\b', 'i').exec(ua) && (guess.label || guess);
            });
        }

        /**
         * Picks the manufacturer from an array of guesses.
         *
         * @private
         * @param {Array} guesses An object of guesses.
         * @returns {null|string} The detected manufacturer.
         */
        function getManufacturer(guesses) {
            return reduce(guesses, function (result, value, key) {
                // Lookup the manufacturer by product or scan the UA for the manufacturer.
                return result || (
                    value[product] ||
                    value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
                    RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
                ) && key;
            });
        }

        /**
         * Picks the browser name from an array of guesses.
         *
         * @private
         * @param {Array} guesses An array of guesses.
         * @returns {null|string} The detected browser name.
         */
        function getName(guesses) {
            return reduce(guesses, function (result, guess) {
                return result || RegExp('\\b' + (
                    guess.pattern || qualify(guess)
                ) + '\\b', 'i').exec(ua) && (guess.label || guess);
            });
        }

        /**
         * Picks the OS name from an array of guesses.
         *
         * @private
         * @param {Array} guesses An array of guesses.
         * @returns {null|string} The detected OS name.
         */
        function getOS(guesses) {
            return reduce(guesses, function (result, guess) {
                var pattern = guess.pattern || qualify(guess);
                if (!result && (result =
                    RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
                )) {
                    result = cleanupOS(result, pattern, guess.label || guess);
                }
                return result;
            });
        }

        /**
         * Picks the product name from an array of guesses.
         *
         * @private
         * @param {Array} guesses An array of guesses.
         * @returns {null|string} The detected product name.
         */
        function getProduct(guesses) {
            return reduce(guesses, function (result, guess) {
                var pattern = guess.pattern || qualify(guess);
                if (!result && (result =
                    RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
                    RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
                    RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
                )) {
                    // Split by forward slash and append product version if needed.
                    if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
                        result[0] += ' ' + result[1];
                    }
                    // Correct character case and cleanup string.
                    guess = guess.label || guess;
                    result = format(result[0]
                        .replace(RegExp(pattern, 'i'), guess)
                        .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
                        .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
                }
                return result;
            });
        }

        /**
         * Resolves the version using an array of UA patterns.
         *
         * @private
         * @param {Array} patterns An array of UA patterns.
         * @returns {null|string} The detected version.
         */
        function getVersion(patterns) {
            return reduce(patterns, function (result, pattern) {
                return result || (RegExp(pattern +
                    '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
            });
        }

        /**
         * Returns `platform.description` when the platform object is coerced to a string.
         *
         * @name toString
         * @memberOf platform
         * @returns {string} Returns `platform.description` if available, else an empty string.
         */
        function toStringPlatform() {
            return this.description || '';
        }

        /*------------------------------------------------------------------------*/

        // Convert layout to an array so we can add extra details.
        layout && (layout = [layout]);

        // Detect product names that contain their manufacturer's name.
        if (manufacturer && !product) {
            product = getProduct([manufacturer]);
        }
        // Clean up Google TV.
        if ((data = /\bGoogle TV\b/.exec(product))) {
            product = data[0];
        }
        // Detect simulators.
        if (/\bSimulator\b/i.test(ua)) {
            product = (product ? product + ' ' : '') + 'Simulator';
        }
        // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
        if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
            description.push('running in Turbo/Uncompressed mode');
        }
        // Detect IE Mobile 11.
        if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
            data = parse(ua.replace(/like iPhone OS/, ''));
            manufacturer = data.manufacturer;
            product = data.product;
        }
        // Detect iOS.
        else if (/^iP/.test(product)) {
            name || (name = 'Safari');
            os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
                ? ' ' + data[1].replace(/_/g, '.')
                : '');
        }
        // Detect Kubuntu.
        else if (name == 'Konqueror' && !/buntu/i.test(os)) {
            os = 'Kubuntu';
        }
        // Detect Android browsers.
        else if ((manufacturer && manufacturer != 'Google' &&
            ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
            (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
            name = 'Android Browser';
            os = /\bAndroid\b/.test(os) ? os : 'Android';
        }
        // Detect Silk desktop/accelerated modes.
        else if (name == 'Silk') {
            if (!/\bMobi/i.test(ua)) {
                os = 'Android';
                description.unshift('desktop mode');
            }
            if (/Accelerated *= *true/i.test(ua)) {
                description.unshift('accelerated');
            }
        }
        // Detect PaleMoon identifying as Firefox.
        else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
            description.push('identifying as Firefox ' + data[1]);
        }
        // Detect Firefox OS and products running Firefox.
        else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
            os || (os = 'Firefox OS');
            product || (product = data[1]);
        }
        // Detect false positives for Firefox/Safari.
        else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
            // Escape the `/` for Firefox 1.
            if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
                // Clear name of false positives.
                name = null;
            }
            // Reassign a generic name.
            if ((data = product || manufacturer || os) &&
                (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
                name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
            }
        }
        // Add Chrome version to description for Electron.
        else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
            description.push('Chromium ' + data);
        }
        // Detect non-Opera (Presto-based) versions (order is important).
        if (!version) {
            version = getVersion([
                '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
                'Version',
                qualify(name),
                '(?:Firefox|Minefield|NetFront)'
            ]);
        }
        // Detect stubborn layout engines.
        if ((data =
            layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
            /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
            /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
            !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
            layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
            layout = [data];
        }
        // Detect Windows Phone 7 desktop mode.
        if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
            name += ' Mobile';
            os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
            description.unshift('desktop mode');
        }
        // Detect Windows Phone 8.x desktop mode.
        else if (/\bWPDesktop\b/i.test(ua)) {
            name = 'IE Mobile';
            os = 'Windows Phone 8.x';
            description.unshift('desktop mode');
            version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
        }
        // Detect IE 11 identifying as other browsers.
        else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
            if (name) {
                description.push('identifying as ' + name + (version ? ' ' + version : ''));
            }
            name = 'IE';
            version = data[1];
        }
        // Leverage environment features.
        if (useFeatures) {
            // Detect server-side environments.
            // Rhino has a global function while others have a global object.
            if (isHostType(context, 'global')) {
                if (java) {
                    data = java.lang.System;
                    arch = data.getProperty('os.arch');
                    os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
                }
                if (rhino) {
                    try {
                        version = context.require('ringo/engine').version.join('.');
                        name = 'RingoJS';
                    } catch (e) {
                        if ((data = context.system) && data.global.system == context.system) {
                            name = 'Narwhal';
                            os || (os = data[0].os || null);
                        }
                    }
                    if (!name) {
                        name = 'Rhino';
                    }
                }
                else if (
                    typeof context.process == 'object' && !context.process.browser &&
                    (data = context.process)
                ) {
                    if (typeof data.versions == 'object') {
                        if (typeof data.versions.electron == 'string') {
                            description.push('Node ' + data.versions.node);
                            name = 'Electron';
                            version = data.versions.electron;
                        } else if (typeof data.versions.nw == 'string') {
                            description.push('Chromium ' + version, 'Node ' + data.versions.node);
                            name = 'NW.js';
                            version = data.versions.nw;
                        }
                    }
                    if (!name) {
                        name = 'Node.js';
                        arch = data.arch;
                        os = data.platform;
                        version = /[\d.]+/.exec(data.version);
                        version = version ? version[0] : null;
                    }
                }
            }
            // Detect Adobe AIR.
            else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
                name = 'Adobe AIR';
                os = data.flash.system.Capabilities.os;
            }
            // Detect PhantomJS.
            else if (getClassOf((data = context.phantom)) == phantomClass) {
                name = 'PhantomJS';
                version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
            }
            // Detect IE compatibility modes.
            else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
                // We're in compatibility mode when the Trident version + 4 doesn't
                // equal the document mode.
                version = [version, doc.documentMode];
                if ((data = +data[1] + 4) != version[1]) {
                    description.push('IE ' + version[1] + ' mode');
                    layout && (layout[1] = '');
                    version[1] = data;
                }
                version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
            }
            // Detect IE 11 masking as other browsers.
            else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
                description.push('masking as ' + name + ' ' + version);
                name = 'IE';
                version = '11.0';
                layout = ['Trident'];
                os = 'Windows';
            }
            os = os && format(os);
        }
        // Detect prerelease phases.
        if (version && (data =
            /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
            /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
            /\bMinefield\b/i.test(ua) && 'a'
        )) {
            prerelease = /b/i.test(data) ? 'beta' : 'alpha';
            version = version.replace(RegExp(data + '\\+?$'), '') +
                (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
        }
        // Detect Firefox Mobile.
        if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
            name = 'Firefox Mobile';
        }
        // Obscure Maxthon's unreliable version.
        else if (name == 'Maxthon' && version) {
            version = version.replace(/\.[\d.]+/, '.x');
        }
        // Detect Xbox 360 and Xbox One.
        else if (/\bXbox\b/i.test(product)) {
            if (product == 'Xbox 360') {
                os = null;
            }
            if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
                description.unshift('mobile mode');
            }
        }
        // Add mobile postfix.
        else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
            (os == 'Windows CE' || /Mobi/i.test(ua))) {
            name += ' Mobile';
        }
        // Detect IE platform preview.
        else if (name == 'IE' && useFeatures) {
            try {
                if (context.external === null) {
                    description.unshift('platform preview');
                }
            } catch (e) {
                description.unshift('embedded');
            }
        }
        // Detect BlackBerry OS version.
        // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
        else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
            (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
            version
        )) {
            data = [data, /BB10/.test(ua)];
            os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
            version = null;
        }
        // Detect Opera identifying/masking itself as another browser.
        // http://www.opera.com/support/kb/view/843/
        else if (this != forOwn && product != 'Wii' && (
            (useFeatures && opera) ||
            (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
            (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
            (name == 'IE' && (
                (os && !/^Win/.test(os) && version > 5.5) ||
                /\bWindows XP\b/.test(os) && version > 8 ||
                version == 8 && !/\bTrident\b/.test(ua)
            ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
            // When "identifying", the UA contains both Opera and the other browser's name.
            data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
            if (reOpera.test(name)) {
                if (/\bIE\b/.test(data) && os == 'Mac OS') {
                    os = null;
                }
                data = 'identify' + data;
            }
            // When "masking", the UA contains only the other browser's name.
            else {
                data = 'mask' + data;
                if (operaClass) {
                    name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
                } else {
                    name = 'Opera';
                }
                if (/\bIE\b/.test(data)) {
                    os = null;
                }
                if (!useFeatures) {
                    version = null;
                }
            }
            layout = ['Presto'];
            description.push(data);
        }
        // Detect WebKit Nightly and approximate Chrome/Safari versions.
        if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
            // Correct build number for numeric comparison.
            // (e.g. "532.5" becomes "532.05")
            data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
            // Nightly builds are postfixed with a "+".
            if (name == 'Safari' && data[1].slice(-1) == '+') {
                name = 'WebKit Nightly';
                prerelease = 'alpha';
                version = data[1].slice(0, -1);
            }
            // Clear incorrect browser versions.
            else if (version == data[1] ||
                version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
                version = null;
            }
            // Use the full Chrome version when available.
            data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
            // Detect Blink layout engine.
            if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
                layout = ['Blink'];
            }
            // Detect JavaScriptCore.
            // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
            if (!useFeatures || (!likeChrome && !data[1])) {
                layout && (layout[1] = 'like Safari');
                data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
            } else {
                layout && (layout[1] = 'like Chrome');
                data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
            }
            // Add the postfix of ".x" or "+" for approximate versions.
            layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
            // Obscure version for some Safari 1-2 releases.
            if (name == 'Safari' && (!version || parseInt(version) > 45)) {
                version = data;
            }
        }
        // Detect Opera desktop modes.
        if (name == 'Opera' && (data = /\bzbov|zvav$/.exec(os))) {
            name += ' ';
            description.unshift('desktop mode');
            if (data == 'zvav') {
                name += 'Mini';
                version = null;
            } else {
                name += 'Mobile';
            }
            os = os.replace(RegExp(' *' + data + '$'), '');
        }
        // Detect Chrome desktop mode.
        else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
            description.unshift('desktop mode');
            name = 'Chrome Mobile';
            version = null;

            if (/\bOS X\b/.test(os)) {
                manufacturer = 'Apple';
                os = 'iOS 4.3+';
            } else {
                os = null;
            }
        }
        // Strip incorrect OS versions.
        if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
            ua.indexOf('/' + data + '-') > -1) {
            os = trim(os.replace(data, ''));
        }
        // Add layout engine.
        if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
            /Browser|Lunascape|Maxthon/.test(name) ||
            name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
            /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
            // Don't add layout details to description if they are falsey.
            (data = layout[layout.length - 1]) && description.push(data);
        }
        // Combine contextual information.
        if (description.length) {
            description = ['(' + description.join('; ') + ')'];
        }
        // Append manufacturer to description.
        if (manufacturer && product && product.indexOf(manufacturer) < 0) {
            description.push('on ' + manufacturer);
        }
        // Append product to description.
        if (product) {
            description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
        }
        // Parse the OS into an object.
        if (os) {
            data = / ([\d.+]+)$/.exec(os);
            isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
            os = {
                'architecture': 32,
                'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
                'version': data ? data[1] : null,
                'toString': function () {
                    var version = this.version;
                    return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
                }
            };
        }
        // Add browser/OS architecture.
        if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
            if (os) {
                os.architecture = 64;
                os.family = os.family.replace(RegExp(' *' + data), '');
            }
            if (
                name && (/\bWOW64\b/i.test(ua) ||
                    (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
            ) {
                description.unshift('32-bit');
            }
        }
        // Chrome 39 and above on OS X is always 64-bit.
        else if (
            os && /^OS X/.test(os.family) &&
            name == 'Chrome' && parseFloat(version) >= 39
        ) {
            os.architecture = 64;
        }

        ua || (ua = null);

        /*------------------------------------------------------------------------*/

        /**
         * The platform object.
         *
         * @name platform
         * @type Object
         */
        var platform = {};

        /**
         * The platform description.
         *
         * @memberOf platform
         * @type string|null
         */
        platform.description = ua;

        /**
         * The name of the browser's layout engine.
         *
         * The list of common layout engines include:
         * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
         *
         * @memberOf platform
         * @type string|null
         */
        platform.layout = layout && layout[0];

        /**
         * The name of the product's manufacturer.
         *
         * The list of manufacturers include:
         * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
         * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
         * "Nokia", "Samsung" and "Sony"
         *
         * @memberOf platform
         * @type string|null
         */
        platform.manufacturer = manufacturer;

        /**
         * The name of the browser/environment.
         *
         * The list of common browser names include:
         * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
         * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
         * "Opera Mini" and "Opera"
         *
         * Mobile versions of some browsers have "Mobile" appended to their name:
         * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
         *
         * @memberOf platform
         * @type string|null
         */
        platform.name = name;

        /**
         * The alpha/beta release indicator.
         *
         * @memberOf platform
         * @type string|null
         */
        platform.prerelease = prerelease;

        /**
         * The name of the product hosting the browser.
         *
         * The list of common products include:
         *
         * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
         * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
         *
         * @memberOf platform
         * @type string|null
         */
        platform.product = product;

        /**
         * The browser's user agent string.
         *
         * @memberOf platform
         * @type string|null
         */
        platform.ua = ua;

        /**
         * The browser/environment version.
         *
         * @memberOf platform
         * @type string|null
         */
        platform.version = name && version;

        /**
         * The name of the operating system.
         *
         * @memberOf platform
         * @type Object
         */
        platform.os = os || {

            /**
             * The CPU architecture the OS is built for.
             *
             * @memberOf platform.os
             * @type number|null
             */
            'architecture': null,

            /**
             * The family of the OS.
             *
             * Common values include:
             * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
             * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
             * "Android", "iOS" and "Windows Phone"
             *
             * @memberOf platform.os
             * @type string|null
             */
            'family': null,

            /**
             * The version of the OS.
             *
             * @memberOf platform.os
             * @type string|null
             */
            'version': null,

            /**
             * Returns the OS string.
             *
             * @memberOf platform.os
             * @returns {string} The OS string.
             */
            'toString': function () { return 'null'; }
        };

        platform.parse = parse;
        platform.toString = toStringPlatform;

        if (platform.version) {
            description.unshift(version);
        }
        if (platform.name) {
            description.unshift(name);
        }
        if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
            description.push(product ? '(' + os + ')' : 'on ' + os);
        }
        if (description.length) {
            platform.description = description.join(' ');
        }
        return platform;
    }

    /*--------------------------------------------------------------------------*/

    // Export platform.
    var platform = parse();

    // Some AMD build optimizers, like r.js, check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Expose platform on the global object to prevent errors when platform is
        // loaded by a script tag in the presence of an AMD loader.
        // See http://requirejs.org/docs/errors.html#mismatch for more details.
        root.platform = platform;

        // Define as an anonymous module so platform can be aliased through path mapping.
        define(function () {
            return platform;
        });
    }
    // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
    else if (freeExports && freeModule) {
        // Export for CommonJS support.
        forOwn(platform, function (value, key) {
            freeExports[key] = value;
        });
    }
    else {
        // Export to the global object.
        root.platform = platform;
    }
}.call(this));

// js/ios_fullscreen.js

function buildIOSMeta() {

    var aMetaTags = [
        {
            name: "viewport",
            content: 'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }
    ];

    for (var i = 0; i < aMetaTags.length; i++) {
        var oNewMeta = document.createElement('meta');
        oNewMeta.name = aMetaTags[i].name;
        oNewMeta.content = aMetaTags[i].content;

        var oOldMeta = window.document.head.querySelector('meta[name="' + oNewMeta.name + '"]');
        if (oOldMeta) {
            oOldMeta.parentNode.removeChild(oOldMeta);
        }
        window.document.head.appendChild(oNewMeta);
    }

};

function hideIOSFullscreenPanel() {

    document.querySelector(".xxx-ios-fullscreen-message").style.display = "none";
    document.querySelector(".xxx-ios-fullscreen-scroll").style.display = "none";
    document.querySelector(".xxx-game-iframe-full").classList.remove('xxx-game-iframe-iphone-se');
};

function buildIOSFullscreenPanel() {
    var html = '';

    html += '<div class="xxx-ios-fullscreen-message">';
    html += '<div class="xxx-ios-fullscreen-swipe">';
    html += '</div>';
    html += '</div>';

    html += '<div class="xxx-ios-fullscreen-scroll">';
    html += '</div>';

    document.body.insertAdjacentHTML('beforeend', html);
};

function showIOSFullscreenPanel() {
    document.querySelector(".xxx-ios-fullscreen-message").style.display = "none";
    document.querySelector(".xxx-ios-fullscreen-scroll").style.display = "none";
};

function __iosResize() {

    window.scrollTo(0, 0);

    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    if (platform.product === "iPhone") {
        switch (window.devicePixelRatio) {
            case 2: {
                switch (window.innerWidth) {
                    case 568: {
                        //console.log("iPhone 5/5s/5c/se"); 
                        if (window.innerHeight === 320) {
                            //console.log("fullscreen");   
                            //this.hideIOSFullscreenPanel();
                        } else {
                            document.querySelector(".xxx-game-iframe-full").classList.add('xxx-game-iframe-iphone-se');
                        }
                    } break;
                    case 667: {
                        //console.log("iPhone 6/6s/7/8"); 
                        if (window.innerHeight === 375) {
                            //  console.log("fullscreen");   
                            hideIOSFullscreenPanel();
                        } else {
                            //console.log("windowed"); 
                            showIOSFullscreenPanel();
                        }
                    } break;
                    case 808: {
                        //console.log("iPhone Xr"); 
                        if (window.innerHeight === 414) {
                            hideIOSFullscreenPanel();
                        } else {
                            showIOSFullscreenPanel();
                        }
                    } break;
                    default: {
                        hideIOSFullscreenPanel();
                    }
                }
            } break;
            case 3: {
                switch (window.innerWidth) {
                    case 736: {
                        //console.log("iPhone 6/6s/7/8 plus");    
                        if (window.innerHeight === 414) {
                            //  console.log("fullscreen");   
                            hideIOSFullscreenPanel();
                        } else {
                            showIOSFullscreenPanel();
                        }
                    } break;
                    // iphone X
                    case 724: {
                        //  console.log("iPhone X/Xs"); 
                        if (window.innerHeight === 375) {
                            hideIOSFullscreenPanel();
                        } else {
                            showIOSFullscreenPanel();
                        }
                    } break;
                    case 808: {
                        //console.log("iPhone Xs Max"); 
                        if (window.innerHeight === 414) {
                            hideIOSFullscreenPanel();
                        } else {
                            showIOSFullscreenPanel();
                        }
                    } break;
                    default: {
                        hideIOSFullscreenPanel();
                    }
                }
            } break;
            default: {
                hideIOSFullscreenPanel();
            }
        }
    }
};

function iosResize() {
    __iosResize();

    setTimeout(function () {
        __iosResize();
    }, 500);
};

function iosInIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function isIOSLessThen13() {
    var oOs = platform.os;
    var szFamily = oOs.family.toLowerCase();
    var iVersion = parseFloat(oOs.version);

    if (szFamily === "ios") {
        if (iVersion < 13) {
            return true;
        }
    }
    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    if (platform &&
        platform.product === "iPhone" &&
        platform.name.toLowerCase() === "safari" &&
        ////AND < ver 13
        isIOSLessThen13() &&

        !iosInIframe()) {
        buildIOSFullscreenPanel();
        buildIOSMeta();
    }
});

window.addEventListener('resize', function (event) {

    if (platform &&
        platform.product === "iPhone" &&
        platform.name.toLowerCase() === "safari" &&
        ////AND < ver 13
        isIOSLessThen13() &&

        !iosInIframe()) {
        iosResize();
    }
});

// js/ctl_utils.js
var s_bLandscape = true;
var s_iScaleFactor = 1;
var s_bIsIphone = false;
var s_iOffsetX;
var s_iOffsetY;

var browserName = (function (agent) {
    switch (true) {
        case agent.indexOf("edge") > -1: return "MS Edge";
        case agent.indexOf("edg/") > -1: return "Edge ( chromium based)";
        case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome: return "Chrome";
        case agent.indexOf("trident") > -1: return "MS IE";
        case agent.indexOf("firefox") > -1: return "Mozilla Firefox";
        case agent.indexOf("safari") > -1: return "Safari";
        default: return "other";
    }
})(window.navigator.userAgent.toLowerCase());


window.addEventListener('resize', function (event) {
    sizeHandler();
}, true);



function trace(szMsg) {
    console.log(szMsg);
}


function isChrome() {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    return isChrome;
}

function isIOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];

    if (navigator.userAgent.toLowerCase().indexOf("iphone") !== -1) {
        s_bIsIphone = true;
        return true;
    }

    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()) {
            return true;
        }
    }
    s_bIsIphone = false;

    return false;
}

function isIpad() {
    var isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

    if (!isIpad && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
        return true;
    }

    return isIpad;
}

function isMobile() {
    if (isIpad()) {
        return true;
    }

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        //MOBILE
        return true;
    } else {
        //DESKTOP
        return false;
    }
};



function getSize(Name) {
    var size;
    var name = Name.toLowerCase();
    var document = window.document;
    var documentElement = document.documentElement;
    if (window["inner" + Name] === undefined) {
        // IE6 & IE7 don't have window.innerWidth or innerHeight
        size = documentElement["client" + Name];
    }
    else if (window["inner" + Name] != documentElement["client" + Name]) {
        // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

        // Insert markup to test if a media query will match document.doumentElement["client" + Name]
        var bodyElement = document.createElement("body");
        bodyElement.id = "vpw-test-b";
        bodyElement.style.cssText = "overflow:scroll";
        var divElement = document.createElement("div");
        divElement.id = "vpw-test-d";
        divElement.style.cssText = "position:absolute;top:-1000px";
        // Getting specific on the CSS selector so it won't get overridden easily
        divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
        bodyElement.appendChild(divElement);
        documentElement.insertBefore(bodyElement, document.head);

        if (divElement["offset" + Name] == 7) {
            // Media query matches document.documentElement["client" + Name]
            size = documentElement["client" + Name];
        }
        else {
            // Media query didn't match, use window["inner" + Name]
            size = window["inner" + Name];
        }
        // Cleanup
        documentElement.removeChild(bodyElement);
    }
    else {
        // Default to use window["inner" + Name]
        size = window["inner" + Name];
    }
    return size;
};


window.addEventListener("orientationchange", onOrientationChange);


function onOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode	 

        sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        // you're in LANDSCAPE mode   
        sizeHandler();
    }

}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) - getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION

function sizeHandler() {
    window.scrollTo(0, 1);

    if (!document.querySelector("#canvas")) {
        return;
    }


    var h;
    var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    if (iOS) {
        h = getIOSWindowHeight();
    } else {
        h = getSize("Height");
    }

    var w = getSize("Width");

    var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

    if (w > h) {
        //LANDSCAPE
        EDGEBOARD_X = 0;
        EDGEBOARD_Y = 570;
        s_bLandscape = true;
    } else {
        EDGEBOARD_X = 470;
        EDGEBOARD_Y = 0;
        s_bLandscape = false;
    }

    var destW = Math.round(CANVAS_WIDTH * multiplier);
    var destH = Math.round(CANVAS_HEIGHT * multiplier);

    var iAdd = 0;
    if (destH < h) {
        iAdd = h - destH;
        destH += iAdd;
        destW += iAdd * (CANVAS_WIDTH / CANVAS_HEIGHT);
    } else if (destW < w) {
        iAdd = w - destW;
        destW += iAdd;
        destH += iAdd * (CANVAS_HEIGHT / CANVAS_WIDTH);
    }

    var fOffsetY = ((h / 2) - (destH / 2));
    var fOffsetX = ((w / 2) - (destW / 2));
    var fGameInverseScaling = (CANVAS_WIDTH / destW);

    if (fOffsetX * fGameInverseScaling < -EDGEBOARD_X ||
        fOffsetY * fGameInverseScaling < -EDGEBOARD_Y) {
        multiplier = Math.min(h / (CANVAS_HEIGHT - (EDGEBOARD_Y * 2)), w / (CANVAS_WIDTH - (EDGEBOARD_X * 2)));
        destW = Math.round(CANVAS_WIDTH * multiplier);
        destH = Math.round(CANVAS_HEIGHT * multiplier);
        fOffsetY = (h - destH) / 2;
        fOffsetX = (w - destW) / 2;

        fGameInverseScaling = (CANVAS_WIDTH / destW);
    }

    s_iOffsetX = (-1 * fOffsetX * fGameInverseScaling);
    s_iOffsetY = (-1 * fOffsetY * fGameInverseScaling);

    if (fOffsetY >= 0) {
        s_iOffsetY = 0;
    }

    if (fOffsetX >= 0) {
        s_iOffsetX = 0;
    }

    if (s_oGame !== null) {
        s_oGame.refreshButtonPos();
    }
    if (s_oMenu !== null) {
        s_oMenu.refreshButtonPos();
    }
    if (s_oModeMenu !== null) {
        s_oModeMenu.refreshButtonPos();
    }

    s_iScaleFactor = Math.min(destW / CANVAS_WIDTH, destH / CANVAS_HEIGHT);
    if (s_bIsIphone && s_oStage) {

        canvas = document.getElementById('canvas');
        s_oStage.canvas.width = destW * 2;
        s_oStage.canvas.height = destH * 2;
        canvas.style.width = destW + "px";
        canvas.style.height = destH + "px";
        var iScale = Math.min(destW / CANVAS_WIDTH, destH / CANVAS_HEIGHT);
        s_iScaleFactor = iScale * 2;
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor;
    } else if (s_bMobile || isChrome()) {
        document.querySelector("#canvas").style.width = destW + "px";
        document.querySelector("#canvas").style.height = destH + "px";
    } else if (s_oStage) {
        s_oStage.canvas.width = destW;
        s_oStage.canvas.height = destH;


        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor;
    }

    if (fOffsetY >= 0) {
        fOffsetY = (h - destH) / 2;
    }

    document.querySelector("#canvas").style.top = fOffsetY + "px";
    document.querySelector("#canvas").style.left = fOffsetX + "px";

    fullscreenHandler();
};

function createBitmap(oSprite, iWidth, iHeight) {
    var oBmp = new createjs.Bitmap(oSprite);
    var hitObject = new createjs.Shape();

    if (iWidth && iHeight) {
        hitObject.graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
    } else {
        hitObject.graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
    }

    oBmp.hitArea = hitObject;

    return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX, iRegY, iWidth, iHeight) {
    if (szState !== null) {
        var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
    } else {
        var oRetSprite = new createjs.Sprite(oSpriteSheet);
    }

    var hitObject = new createjs.Shape();
    hitObject.graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

    oRetSprite.hitArea = hitObject;

    return oRetSprite;
}


function randomFloatBetween(minValue, maxValue, precision) {
    if (typeof (precision) === 'undefined') {
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
}

function rotateVector2D(iAngle, v) {
    var iX = v.getX() * Math.cos(iAngle) + v.getY() * Math.sin(iAngle);
    var iY = v.getX() * (-Math.sin(iAngle)) + v.getY() * Math.cos(iAngle);
    v.set(iX, iY);
}

function tweenVectorsOnX(vStart, vEnd, iLerp) {
    var iNewX = vStart + iLerp * (vEnd - vStart);
    return iNewX;
}

this.tweenVectors = function (vStart, vEnd, iLerp) {
    var vOut = new CVector2();
    vOut.set(vStart.getX() + iLerp * (vEnd.getX() - vStart.getX()), vStart.getY() + iLerp * (vEnd.getY() - vStart.getY()));
    return vOut;
};

function distanceV2(v1, v2) {
    var iDx = v1.x - v2.x;
    var iDy = v1.y - v2.y;

    return Math.sqrt((iDx * iDx) + (iDy * iDy));
}

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function compare(a, b) {
    if (a.index > b.index)
        return -1;
    if (a.index < b.index)
        return 1;
    return 0;
}

//----------------------
// Linear	
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

//----------------------
// Quad		
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}
//----------------------
// Sine	
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}



function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
};


function getTrajectoryPoint(t, p) {
    var result = new createjs.Point();
    var oneMinusTSq = (1 - t) * (1 - t);
    var TSq = t * t;
    result.x = oneMinusTSq * p.start.x + 2 * (1 - t) * t * p.traj.x + TSq * p.end.x;
    result.y = oneMinusTSq * p.start.y + 2 * (1 - t) * t * p.traj.y + TSq * p.end.y;
    return result;
}

function formatTime(iTime) {
    iTime /= 1000;
    var iMins = Math.floor(iTime / 60);
    var iSecs = Math.floor(iTime - (iMins * 60));
    //iSecs = parseFloat(iSecs).toFixed(1)

    var szRet = "";

    if (iMins < 10) {
        szRet += "0" + iMins + ":";
    } else {
        szRet += iMins + ":";
    }

    if (iSecs < 10) {
        szRet += "0" + iSecs;
    } else {
        szRet += iSecs;
    }

    return szRet;
}

function degreesToRadians(iAngle) {
    return iAngle * Math.PI / 180;
}

function checkRectCollision(bitmap1, bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1, 0.9);
    b2 = getBounds(bitmap2, 0.98);
    return calculateIntersection(b1, b2);
}

function collisionWithCircle(oObj1, oObj2, fFactor) {
    var iDx = oObj1.getX() - oObj2.getX();
    var iDy = oObj1.getY() - oObj2.getY();
    var fdistance = Math.sqrt((iDx * iDx) + (iDy * iDy));
    if (fdistance < (PLAYER_RADIUS * fFactor) + (CELL_SIZE * fFactor)) {
        return true;
    } else {
        return false;
    }
}

function calculateIntersection(rect1, rect2) {
    // first we have to calculate the
    // center of each rectangle and half of
    // width and height
    var dx, dy, r1 = {}, r2 = {};
    r1.cx = rect1.x + (r1.hw = (rect1.width / 2));
    r1.cy = rect1.y + (r1.hh = (rect1.height / 2));
    r2.cx = rect2.x + (r2.hw = (rect2.width / 2));
    r2.cy = rect2.y + (r2.hh = (rect2.height / 2));

    dx = Math.abs(r1.cx - r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy - r2.cy) - (r1.hh + r2.hh);

    if (dx < 0 && dy < 0) {
        dx = Math.min(Math.min(rect1.width, rect2.width), -dx);
        dy = Math.min(Math.min(rect1.height, rect2.height), -dy);
        return {
            x: Math.max(rect1.x, rect2.x),
            y: Math.max(rect1.y, rect2.y),
            width: dx,
            height: dy,
            rect1: rect1,
            rect2: rect2
        };
    } else {
        return null;
    }
}

function getBounds(obj, iTolerance) {
    var bounds = { x: Infinity, y: Infinity, width: 0, height: 0 };
    if (obj instanceof createjs.Container) {
        bounds.x2 = -Infinity;
        bounds.y2 = -Infinity;
        var children = obj.children, l = children.length, cbounds, c;
        for (c = 0; c < l; c++) {
            cbounds = getBounds(children[c], 1);
            if (cbounds.x < bounds.x) bounds.x = cbounds.x;
            if (cbounds.y < bounds.y) bounds.y = cbounds.y;
            if (cbounds.x + cbounds.width > bounds.x2) bounds.x2 = cbounds.x + cbounds.width;
            if (cbounds.y + cbounds.height > bounds.y2) bounds.y2 = cbounds.y + cbounds.height;
            //if ( cbounds.x - bounds.x + cbounds.width  > bounds.width  ) bounds.width  = cbounds.x - bounds.x + cbounds.width;
            //if ( cbounds.y - bounds.y + cbounds.height > bounds.height ) bounds.height = cbounds.y - bounds.y + cbounds.height;
        }
        if (bounds.x == Infinity) bounds.x = 0;
        if (bounds.y == Infinity) bounds.y = 0;
        if (bounds.x2 == Infinity) bounds.x2 = 0;
        if (bounds.y2 == Infinity) bounds.y2 = 0;

        bounds.width = bounds.x2 - bounds.x;
        bounds.height = bounds.y2 - bounds.y;
        delete bounds.x2;
        delete bounds.y2;
    } else {
        var gp, gp2, gp3, gp4, imgr = {}, sr;
        if (obj instanceof createjs.Bitmap) {
            sr = obj.sourceRect || obj.image;

            imgr.width = sr.width * iTolerance;
            imgr.height = sr.height * iTolerance;
        } else if (obj instanceof createjs.Sprite) {
            if (obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image) {
                var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
                imgr.width = cframe.rect.width;
                imgr.height = cframe.rect.height;
                imgr.regX = cframe.regX;
                imgr.regY = cframe.regY;
            } else {
                bounds.x = obj.x || 0;
                bounds.y = obj.y || 0;
            }
        } else {
            bounds.x = obj.x || 0;
            bounds.y = obj.y || 0;
        }

        imgr.regX = imgr.regX || 0; imgr.width = imgr.width || 0;
        imgr.regY = imgr.regY || 0; imgr.height = imgr.height || 0;
        bounds.regX = imgr.regX;
        bounds.regY = imgr.regY;

        gp = obj.localToGlobal(0 - imgr.regX, 0 - imgr.regY);
        gp2 = obj.localToGlobal(imgr.width - imgr.regX, imgr.height - imgr.regY);
        gp3 = obj.localToGlobal(imgr.width - imgr.regX, 0 - imgr.regY);
        gp4 = obj.localToGlobal(0 - imgr.regX, imgr.height - imgr.regY);

        bounds.x = Math.min(Math.min(Math.min(gp.x, gp2.x), gp3.x), gp4.x);
        bounds.y = Math.min(Math.min(Math.min(gp.y, gp2.y), gp3.y), gp4.y);
        bounds.width = Math.max(Math.max(Math.max(gp.x, gp2.x), gp3.x), gp4.x) - bounds.x;
        bounds.height = Math.max(Math.max(Math.max(gp.y, gp2.y), gp3.y), gp4.y) - bounds.y;
    }
    return bounds;
}

function NoClickDelay(el) {
    this.element = el;
    if (window.Touch) this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

NoClickDelay.prototype = {
    handleEvent: function (e) {
        switch (e.type) {
            case 'touchstart': this.onTouchStart(e); break;
            case 'touchmove': this.onTouchMove(e); break;
            case 'touchend': this.onTouchEnd(e); break;
        }
    },

    onTouchStart: function (e) {
        e.preventDefault();
        this.moved = false;

        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);
    },

    onTouchMove: function (e) {
        this.moved = true;
    },

    onTouchEnd: function (e) {
        this.element.removeEventListener('touchmove', this, false);
        this.element.removeEventListener('touchend', this, false);

        if (!this.moved) {
            var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            if (theTarget.nodeType == 3) theTarget = theTarget.parentNode;

            var theEvent = document.createEvent('MouseEvents');
            theEvent.initEvent('click', true, true);
            theTarget.dispatchEvent(theEvent);
        }
    }

};

(function () {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide
            = window.onfocus = window.onblur = onchange;

    function onchange(evt) {
        var v = 'visible', h = 'hidden',
            evtMap = {
                focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
            };

        evt = evt || window.event;

        if (evt.type in evtMap) {
            document.body.className = evtMap[evt.type];
        } else {
            document.body.className = this[hidden] ? "hidden" : "visible";

            if (document.body.className === "hidden") {
                s_oMain.stopUpdate();
            } else {
                s_oMain.startUpdate();
            }
        }
    }
})();

function ctlArcadeResume() {
    if (s_oMain !== null) {
        s_oMain.startUpdate();
    }
}

function ctlArcadePause() {
    if (s_oMain !== null) {
        s_oMain.stopUpdate();
    }

}

function getParamValue(paramName) {
    var url = window.location.search.substring(1);
    var qArray = url.split('&');
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('=');
        if (pArr[0] == paramName)
            return pArr[1];
    }
}


function playSound(szSound, iVolume, bLoop) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {

        s_aSounds[szSound].play();
        s_aSounds[szSound].volume(iVolume);

        s_aSounds[szSound].loop(bLoop);

        return s_aSounds[szSound];
    }
    return null;
}

function stopSound(szSound) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        s_aSounds[szSound].stop();
    }
}

function setVolume(szSound, iVolume) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        s_aSounds[szSound].volume(iVolume);
    }
}

function setMute(szSound, bMute) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        s_aSounds[szSound].mute(bMute);
    }
}

function saveItem(szItem, oValue) {
    if (s_bStorageAvailable) {
        localStorage.setItem(szItem, oValue);
    }
}

function getItem(szItem) {
    if (s_bStorageAvailable) {
        return localStorage.getItem(szItem);
    }
    return null;
}


function fullscreenHandler() {
    if (!ENABLE_FULLSCREEN || !screenfull.isEnabled) {
        return;
    }

    s_bFullscreen = screenfull.isFullscreen;


    if (s_oInterface !== null) {
        s_oInterface.resetFullscreenBut();
    }

    if (s_oMenu !== null) {
        s_oMenu.resetFullscreenBut();
    }
    if (s_oModeMenu !== null) {
        s_oModeMenu.resetFullscreenBut();
    }
}


if (screenfull.isEnabled) {
    screenfull.on('change', function () {
        s_bFullscreen = screenfull.isFullscreen;

        if (s_oInterface !== null) {
            s_oInterface.resetFullscreenBut();
        }

        if (s_oMenu !== null) {
            s_oMenu.resetFullscreenBut();
        }
        if (s_oModeMenu !== null) {
            s_oModeMenu.resetFullscreenBut();
        }

    });
}



// js/sprite_lib.js
function CSpriteLibrary() {

    var _oLibSprites = {};
    var _oSpritesToLoad;
    var _iNumSprites;
    var _iCntSprites;
    var _cbCompleted;
    var _cbTotalCompleted;
    var _cbOwner;

    this.init = function (cbCompleted, cbTotalCompleted, cbOwner) {
        _oSpritesToLoad = {};
        _iNumSprites = 0;
        _iCntSprites = 0;
        _cbCompleted = cbCompleted;
        _cbTotalCompleted = cbTotalCompleted;
        _cbOwner = cbOwner;
    };

    this.addSprite = function (szKey, szPath) {
        if (_oLibSprites.hasOwnProperty(szKey)) {
            return;
        }

        var oImage = new Image();
        _oLibSprites[szKey] = _oSpritesToLoad[szKey] = { szPath: szPath, oSprite: oImage, bLoaded: false };
        _iNumSprites++;
    };

    this.getSprite = function (szKey) {
        if (!_oLibSprites.hasOwnProperty(szKey)) {
            return null;
        } else {
            return _oLibSprites[szKey].oSprite;
        }
    };

    this._onSpritesLoaded = function () {
        _iNumSprites = 0;
        _cbTotalCompleted.call(_cbOwner);
    };

    this._onSpriteLoaded = function () {
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites === _iNumSprites) {
            this._onSpritesLoaded();
        }

    };

    this.loadSprites = function () {

        for (var szKey in _oSpritesToLoad) {

            _oSpritesToLoad[szKey].oSprite["oSpriteLibrary"] = this;
            _oSpritesToLoad[szKey].oSprite["szKey"] = szKey;
            _oSpritesToLoad[szKey].oSprite.onload = function () {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey);
            };
            _oSpritesToLoad[szKey].oSprite.onerror = function (evt) {
                var oSpriteToRestore = evt.currentTarget;

                setTimeout(function () {
                    _oSpritesToLoad[oSpriteToRestore.szKey].oSprite.src = _oSpritesToLoad[oSpriteToRestore.szKey].szPath;
                }, 500);
            };
            _oSpritesToLoad[szKey].oSprite.src = _oSpritesToLoad[szKey].szPath;
        }
    };

    this.setLoaded = function (szKey) {
        _oLibSprites[szKey].bLoaded = true;
    };

    this.isLoaded = function (szKey) {
        return _oLibSprites[szKey].bLoaded;
    };

    this.getNumSprites = function () {
        return _iNumSprites;
    };
}

// js/settings.js
var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 0;
var EDGEBOARD_Y = 0;

var FONT = "impact";
var ENABLE_FULLSCREEN;

var FPS = 30;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_MODE = 2;
var STATE_LEVEL = 3;
var STATE_GAME = 4;
var STATE_PROMOTION = 5; // New state for promotion mode

var MODE_SINGLE = 0;
var MODE_VS_CPU = 1;
var MODE_VS_HUMAN = 2;
var MODE_PROMOTION_WIN = 3; // New mode for promotion win
var MODE_PROMOTION_LOSE = 4; // New mode for promotion lose

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_BUT_YES_DOWN = 4;
var ON_BACK_MENU = 5;
var ON_RESTART = 6;
var ON_NEXT = 7;
var ON_DART_GUI_END_MOVE_DOWN = 8;
var ON_DART_GUI_END_MOVE_UP = 9;

var CUR_GRID_SCALE = 1;

var NUM_SPRITE_DART = 26;
var DART_WIDTH = 332;
var DART_HEIGHT = 1320;

var MAX_SWIPE_TIME = 250;
var MIN_DIST_SWIPE = 100;
var FORCE_MULTIPLIER = 7.2;
var MAX_FORCE = 258 * FORCE_MULTIPLIER;
var MAX_DART_ANGLE_ROT = 45;
var RADIUS_SPHERE_BOARD = 160;
var SLICE_ANGLE = 18;
var SLICE_VALUES_RIGHT = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3];
var SLICE_VALUES_LEFT = [20, 5, 12, 9, 14, 11, 8, 16, 7, 19, 3];
var TIME_DART_MOVE_X = 2000;
var STARTING_SCORE = 501;
var MAX_NUM_THROW = 99;

var NUM_THROW_PER_TURN = 3;
var POINTS_DARTBOARD_CENTER = [50, 25];

var DIST_SLICES = [17, 44, 241, 265, 402, 430];
var STROKE_COLORS = ["#0187b0", "#089e01", "#c16400", "#cd0224"];

var SOUNDTRACK_VOLUME_IN_GAME = 0.1;
var NUM_COLS_PAGE_LEVEL = 4;
var NUM_ROWS_PAGE_LEVEL = 2;
var NUM_LEVELS = 8;
var AI_ACCURACY = [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2];

// Promotion settings
var PROMOTION_MODE = false; // Set to true for promotion mode
var PROMOTION_RESULT = MODE_PROMOTION_WIN; // MODE_PROMOTION_WIN or MODE_PROMOTION_LOSE
var PROMOTION_BULLSEYE_RADIUS = 17; // Radius for bullseye hit detection
var PROMOTION_ANIMATION_DURATION = 2000; // Duration of dart animation in ms
var PROMOTION_MODAL_DELAY = 1000; // Delay before showing result modal

// js/CMain.js
function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;

    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oLevelMenu;
    var _oGame;
    var _oPromotionGame;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);

        s_oStage.preventSelection = false;

        s_bMobile = isMobile();

        if (s_bMobile === false) {
            s_oStage.enableMouseOver(20);
        } else {
            createjs.Touch.enable(s_oStage, true);
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();

    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        this._loadImages();
        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };

    this._initSounds = function () {
        Howler.mute(!s_bAudioActive);


        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({ path: './sounds/', filename: 'win', loop: false, volume: 1, ingamename: 'win' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'game_over', loop: false, volume: 1, ingamename: 'game_over' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'click', loop: false, volume: 1, ingamename: 'click' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'hit', loop: false, volume: 1, ingamename: 'hit' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'launch', loop: false, volume: 1, ingamename: 'launch' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'miss', loop: false, volume: 1, ingamename: 'miss' });
        s_aSoundsInfo.push({ path: './sounds/', filename: 'soundtrack', loop: true, volume: 1, ingamename: 'soundtrack' });

        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for (var i = 0; i < s_aSoundsInfo.length; i++) {
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }

    };

    this.tryToLoadSound = function (oSoundInfo, bDelay) {

        setTimeout(function () {
            s_aSounds[oSoundInfo.ingamename] = new Howl({
                src: [oSoundInfo.path + oSoundInfo.filename + '.mp3'],
                autoplay: false,
                preload: true,
                loop: oSoundInfo.loop,
                volume: oSoundInfo.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function (szId, szMsg) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                            break;
                        }
                    }
                },
                onplayerror: function (szId) {
                    for (var i = 0; i < s_aSoundsInfo.length; i++) {
                        if (szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function () {
                                s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                if (s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null) {
                                    setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
                                }

                            });
                            break;
                        }
                    }

                }
            });


        }, (bDelay ? 200 : 0));


    };


    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_level_selection", "./sprites/bg_level_selection.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("dartboard", "./sprites/dartboard.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_next", "./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("dart_icon", "./sprites/dart_icon.png");
        s_oSpriteLibrary.addSprite("hand_swipe", "./sprites/hand_swipe.png");
        s_oSpriteLibrary.addSprite("contact_effect", "./sprites/contact_effect.png");
        s_oSpriteLibrary.addSprite("dart_shadow", "./sprites/dart_shadow.png");
        s_oSpriteLibrary.addSprite("arrow", "./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("arrow_fill", "./sprites/arrow_fill.png");
        s_oSpriteLibrary.addSprite("bg_score", "./sprites/bg_score.png");
        s_oSpriteLibrary.addSprite("bg_dart_score", "./sprites/bg_dart_score.png");
        s_oSpriteLibrary.addSprite("but_single", "./sprites/but_single.png");
        s_oSpriteLibrary.addSprite("but_vs_cpu", "./sprites/but_vs_cpu.png");
        s_oSpriteLibrary.addSprite("but_vs_human", "./sprites/but_vs_human.png");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("bg_select_mode", "./sprites/bg_select_mode.jpg");
        s_oSpriteLibrary.addSprite("but_help", "./sprites/but_help.png");
        s_oSpriteLibrary.addSprite("dartboard_help", "./sprites/dartboard_help.png");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("help_box", "./sprites/help_box.png");
        s_oSpriteLibrary.addSprite("bg_score_info", "./sprites/bg_score_info.png");

        for (var k = 0; k < 2; k++) {
            for (var i = 0; i < NUM_SPRITE_DART; i++) {
                s_oSpriteLibrary.addSprite("dart_" + k + "_" + i, "./sprites/dart/dart_" + k + "_" + i + ".png");
            }
        }


        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
    };

    this._onRemovePreloader = function () {
        try {
            saveItem("ls_available", "ok");
        } catch (evt) {
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack", 1, true);

        // Check if we're in promotion mode - if so, start promotion game immediately
        console.log("Checking promotion mode:", PROMOTION_MODE, "Result:", PROMOTION_RESULT);
        if (PROMOTION_MODE) {
            // Start promotion game immediately without delay
            console.log("Starting promotion game immediately...");
            s_oMain.gotoPromotionGame(PROMOTION_RESULT);
        } else {
            console.log("Starting game directly...");
            s_iCurMode = MODE_SINGLE; // Set default mode to single player
            this.gotoGame();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.modeSelected = function (iMode) {
        s_iCurMode = iMode;

        if (s_iCurMode === MODE_VS_CPU) {
            this.gotoLevelMenu();
        } else {
            this.gotoGame();
        }
    };

    this.levelSelected = function (iLevel) {
        s_iCurLevel = iLevel;
        this.gotoGame();
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoModePanel = function () {
        _oModeMenu = new CMenuMode();
        _iState = STATE_MODE;
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu();
        _iState = STATE_LEVEL;
    };

    this.gotoGame = function () {
        _oGame = new CGame();
        _iState = STATE_GAME;
    };

    this.gotoPromotionGame = function (iResult) {
        console.log("Creating promotion game with result:", iResult);
        _oPromotionGame = new CPromotionGame(iResult);
        _iState = STATE_PROMOTION;
        console.log("Promotion game created, state set to:", _iState);
    };

    this.stopUpdateNoBlock = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        document.querySelector("#block_game").style.display = "block";

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            Howler.mute(true);
        }

    };

    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        document.querySelector("#block_game").style.display = "none";

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            if (s_bAudioActive) {
                Howler.mute(false);
            }
        }

    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }


        if (_iState === STATE_GAME) {
            _oGame.update();
        } else if (_iState === STATE_PROMOTION) {
            _oPromotionGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;

    ENABLE_FULLSCREEN = oData.fullscreen;
    s_bAudioActive = oData.audio_enable_on_startup;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_aSounds;
var s_bStorageAvailable = true;
var s_bFirstPlay = true;

var s_iCurMode = 0;
var s_iLastLevel = 1;
var s_iCurLevel = 1;

// js/CLang.min.js
var TEXT_PRELOADER_CONTINUE = "START";
var TEXT_ARE_YOU_SURE = "ARE YOU SURE?";
var TEXT_DEVELOPED = "DEVELOPED BY";
var TEXT_SCORE = "SCORE";
var TEXT_BEST = "BEST";
var TEXT_DART = "DART";
var TEXT_THROWS = "THROWS";
var TEXT_TOTAL = "TOTAL";
var TEXT_BEST_SCORE = "BEST SCORE";
var TEXT_LEVEL_SCORE = "LEVEL SCORE";
var TEXT_TOT_SCORE = "TOTAL SCORE";
var TEXT_GAME_OVER = "GAME OVER";
var TEXT_TOO_SLOW = "TOO SLOOOOW!";
var TEXT_SELECT_MODE = "SELECT MODE";
var TEXT_PLAYER_NAME = ["PLAYER 1", "PLAYER 2"];
var TEXT_CPU = "CPU";
var TEXT_YOU_WIN = "YOU WIN";
var TEXT_YOU_LOSE = "YOU LOSE";
var TEXT_CONGRATS = "CONGRATS!!";
var TEXT_WINS = "WINS!!";
var TEXT_SELECT_LEVEL = "SELECT A LEVEL";
var TEXT_PT = "PT";
var TEXT_DOUBLE = "DOUBLE RING";
var TEXT_TRIPLE = "TRIPLE RING";
var TEXT_CENTER = "CENTER";
var TEXT_BULLSEYE = "BULL'S EYE";
var TEXT_HINT1 = "YOU MUST HIT DOUBLE";
var TEXT_HINT2 = "TO WIN THE MATCH!";
var TEXT_HELP_CONTROLS_1 = "TAP THE SCREEN TO STOP THE DART WHERE YOU WANT";
var TEXT_HELP_CONTROLS_2 = "PRESS AND DRAG TO SET THE POWER AND DIRECTION. RELEASE TO THROW THE DART.";
var TEXT_HELP = "YOUR GOAL IS TO DECREASE YOUR STARTING SCORE 501. THE FINAL DART MUST LAND IN EITHER THE BULLSEYE OR A DOUBLE SEGMENT IN ORDER TO WIN";
var TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT LOCAL STORAGE. IF YOU'RE USING SAFARI, IT MAY BE RELATED TO PRIVATE BROWSING. AS A RESULT, SOME INFO MAY NOT BE SAVED OR SOME FEATURES MAY NOT BE AVAILABLE.";

var TEXT_SHARE_IMAGE = "200x200.jpg";
var TEXT_SHARE_TITLE = "Congratulations!";
var TEXT_SHARE_MSG1 = "You collected <strong>";
var TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
var TEXT_SHARE_SHARE1 = "My score is ";
var TEXT_SHARE_SHARE2 = "points! Can you do better";

// js/CLocalStorage.js
var PREFIX_STORAGE = "darts_pro_";

function setLocalStorageLevel(iLevel) {
    if (s_iLastLevel < iLevel) {
        s_iLastLevel = iLevel;
        saveItem(PREFIX_STORAGE + "level", s_iLastLevel);
    }
};

function setLocalStorageScore(iCurScore, iLevel) {
    saveItem(PREFIX_STORAGE + "score_level_" + iLevel, iCurScore);
};

function setScoreSingleMode(iScore) {
    saveItem(PREFIX_STORAGE + "score", iScore);
}

function setBestScoreSingleMode(iBest) {
    saveItem(PREFIX_STORAGE + "best_score", iBest);
}

function clearLocalStorage() {
    s_iLastLevel = 1;
    if (s_bStorageAvailable) {
        localStorage.clear();
    }
};

function getBestScoreSingleMode() {
    if (!s_bStorageAvailable) {
        return 0;
    }

    var iBest = getItem(PREFIX_STORAGE + "best_score");
    if (iBest === null) {
        return 0;
    } else {
        return iBest;
    }
};

function getLastLevel() {
    if (!s_bStorageAvailable) {
        return 1;
    }

    var iLevel = getItem(PREFIX_STORAGE + "level");

    if (iLevel === null) {
        return 1;
    } else {
        return iLevel;
    }
};

function getScoreTillLevel(iLevel) {
    if (!s_bStorageAvailable) {
        return 0;
    }

    var iScore = 0;
    for (var i = 0; i < iLevel - 1; i++) {
        iScore += parseInt(getItem(PREFIX_STORAGE + "score_level_" + (i + 1)));
    }

    return iScore;
};

// js/CPreloader.js
function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    var _oIcon;
    var _oIconMask;

    var _oContainer;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");

        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

    };

    this.unload = function () {
        _oContainer.removeAllChildren();

    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {

        this.attachSprites();

        s_oMain.preloaderReady();

    };

    this.attachSprites = function () {

        var oBg = new createjs.Shape();
        oBg.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('200x200');
        _oIcon = createBitmap(oSprite);
        _oIcon.regX = oSprite.width * 0.5;
        _oIcon.regY = oSprite.height * 0.5;
        _oIcon.x = CANVAS_WIDTH / 2;
        _oIcon.y = CANVAS_HEIGHT / 2 - 180;
        _oContainer.addChild(_oIcon);

        _oIconMask = new createjs.Shape();
        _oIconMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(_oIcon.x - 100, _oIcon.y - 100, 200, 200, 10);
        _oContainer.addChild(_oIconMask);

        _oIcon.mask = _oIconMask;

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        _oProgressBar = createBitmap(oSprite);
        _oProgressBar.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        _oProgressBar.y = CANVAS_HEIGHT / 2 + 50;
        _oContainer.addChild(_oProgressBar);

        _iMaskWidth = oSprite.width;
        _iMaskHeight = oSprite.height;
        _oMaskPreloader = new createjs.Shape();
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

        _oContainer.addChild(_oMaskPreloader);

        _oProgressBar.mask = _oMaskPreloader;

        _oLoadingText = new createjs.Text("", "30px " + FONT, "#fff");
        _oLoadingText.x = CANVAS_WIDTH / 2;
        _oLoadingText.y = CANVAS_HEIGHT / 2 + 100;
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);


        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0 }, 500).call(function () {
            createjs.Tween.removeTweens(_oFade);
            _oContainer.removeChild(_oFade);
        });


    };


    this.refreshLoader = function (iPerc) {
        _oLoadingText.text = iPerc + "%";

        if (iPerc === 100) {
            s_oMain._onRemovePreloader();
            _oLoadingText.visible = false;
            _oProgressBar.visible = false;

            // Dispatch event for promotion mode
            document.dispatchEvent(new CustomEvent("preloader_complete"));
        };

        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, _iMaskHeight);
    };

    this._init();
}

// js/CToggle.js
function CToggle(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _oParentContainer = oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, bActive) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: { width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2 },
            animations: { state_true: [0], state_false: [1] }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;
        _oButton = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);
        _oButton.mouseEnabled = true;
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.stop();
        _oButton.cursor = "pointer";
        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", this.buttonDown);
        _oButton.off("pressup", this.buttonRelease);
        _oButton.mouseEnabled = false;
        _oParentContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };

    this.setActive = function (bActive) {
        _bActive = bActive;
        _oButton.gotoAndStop("state_" + _bActive);
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        playSound("click", 1, false);

        _bActive = !_bActive;
        _oButton.gotoAndStop("state_" + _bActive);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this._init(iXPos, iYPos, oSprite, bActive);
}

// js/CGfxButton.js
function CGfxButton(iXPos, iYPos, oSprite, oParentContainer) {

    var _iScale;
    var _oListenerDown;
    var _oListenerUp;

    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    var _oParentContainer;

    var _oParent = this;

    this._init = function (iXPos, iYPos, oSprite) {

        _iScale = 1;

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oButton = createBitmap(oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos;

        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.cursor = "pointer";
        _oParentContainer.addChild(_oButton);


        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerDown);
        _oButton.off("pressup", _oListenerUp);

        _oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.setScale = function (iScale) {
        _iScale = iScale;
        _oButton.scaleX = _oButton.scaleY = _iScale;
    };

    this._initListener = function () {
        _oListenerDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };

    this.buttonRelease = function () {
        _oButton.scaleX = _iScale;
        _oButton.scaleY = _iScale;

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = _iScale * 0.9;
        _oButton.scaleY = _iScale * 0.9;

        playSound("click", 1, false);

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.setScale = function (iValue) {
        _iScale = iValue;
        _oButton.scaleX = iValue;
        _oButton.scaleY = iValue;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };


    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite);

    return this;
}

// js/CMenu.js
function CMenu() {

    var _oButPlay;
    var _oCreditsBut;

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oAudioToggle;
    var _oButFullscreen;

    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;


    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);




        _oButPlay = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 300, s_oSpriteLibrary.getSprite('but_play'), s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onStart, this, 0);


        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10 };

            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = { x: (oSprite.width / 2) + 10, y: (oSprite.height / 2) + 10 };
        _oCreditsBut = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = { x: _pStartPosCredits.x + oSprite.width / 2 + 10, y: (oSprite.height / 2) + 10 };
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }


        if (!s_bStorageAvailable) {
            new CMsgBox();
        } else {
            s_iLastLevel = getLastLevel();
        }



        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(oFade);

        createjs.Tween.get(oFade).to({ alpha: 0 }, 1000).call(function () { oFade.visible = false; });

        setVolume("soundtrack", 1);

        this.refreshButtonPos();
    };

    this.unload = function () {
        _oButPlay.unload();
        _oCreditsBut.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        s_oMenu = null;
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, s_iOffsetY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        }

        _oCreditsBut.setPosition(_pStartPosCredits.x + s_iOffsetX, s_iOffsetY + _pStartPosCredits.y);



    };

    this._onStart = function () {
        document.dispatchEvent(new CustomEvent("start_session"));

        s_oMenu.unload();
        s_oMain.gotoModePanel();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onCreditsBut = function () {
        new CCreditsPanel();
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };


    s_oMenu = this;
    this._init();


};

var s_oMenu = null;

// js/CGame.js
function CGame() {
    var _bCPUTurn;
    var _bUpdateAI;
    var _bDouble;
    var _iScore;
    var _iLastThrowScore;
    var _iTotDartScore;
    var _iTotThrows;
    var _iStartXDartBoard;
    var _iNumThrow;
    var _iHeightDartBoard;
    var _iAngleArrow;
    var _iThrowState;
    var _iNumPlayer;
    var _iCurTurn;
    var _iAccuracyAI;
    var _fForceDart;

    var _aPlayerScore;
    var _aPlayerNames;
    var _aDartThrown = new Array();
    var _pStartDartPos;
    var _pEndDartPos;
    var _oPressPoint;
    var _oReleasePoint;
    var _oListenerDown;
    var _oListenerUp;
    var _oListenerMove;
    var _oInfoCPUGoal;
    var _oCurDart;

    var _oHitArea;
    var _oAlertText;
    var _oInterface;
    var _oArrowThrow;
    var _oAreYouSurePanel;
    var _oBoardDart;
    var _oContainerDartBoard;
    var _oContainerDart;
    var _oContainerGame;
    var _oContainerBg;
    var _oGameOver;
    var _oHelpControls = null;


    this._init = function () {
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);

        if (s_iCurMode !== MODE_VS_HUMAN) {
            _iScore = getScoreTillLevel(s_iCurLevel);
            _iTotThrows = 0;
        }

        this.reset();

        if (s_iCurMode === MODE_VS_CPU) {
            _iAccuracyAI = AI_ACCURACY[s_iCurLevel - 1];
        }


        _oContainerGame = new createjs.Container();
        _oContainerGame.x = CANVAS_WIDTH / 2;
        _oContainerGame.regX = CANVAS_WIDTH / 2;
        s_oStage.addChild(_oContainerGame);


        this._initMode();
        this._initDartBoard();

        var pPos = _oCurDart.getDartTip();
        _oArrowThrow = new CArrowThrow(pPos.x, pPos.y, _oContainerDartBoard);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainerGame.addChild(_oHitArea);


        if (s_bFirstPlay) {
            _oHelpControls = new CHelpControls();
        }


        _oInterface = new CInterface(_iNumPlayer, _aPlayerNames);


        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN, this.onConfirmExit, this);

        this._initGameOverPanel();


        _oAlertText = new CAlertText();

        this.refreshButtonPos();

        this._resetHitArea();
    };


    this.unload = function () {
        _oInterface.unload();

        _oGameOver.unload();

        _oHitArea.off('mousedown', _oListenerDown);
        _oHitArea.off('click', _oListenerUp);

        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function () {
        _oContainerDartBoard.y = s_iOffsetY + 20;
        this.refreshGridScale();

        _oInterface.refreshButtonPos();

        if (_oHelpControls !== null) {
            _oHelpControls.refreshButtonPos();
        }
    };


    this.refreshGridScale = function () {
        var iGUIHeight = 100;
        var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY * 2)) - iGUIHeight;

        CUR_GRID_SCALE = iMaxGridSizeHeight / _iHeightDartBoard;
        CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        _oContainerDartBoard.scaleX = _oContainerDartBoard.scaleY = CUR_GRID_SCALE;

        _oContainerBg.regX = (CANVAS_WIDTH / 2);
        _oContainerBg.x = (CANVAS_WIDTH / 2);
        _oContainerBg.regY = CANVAS_HEIGHT / 2;
        _oContainerBg.y = CANVAS_HEIGHT / 2;


        _oContainerBg.scaleX = _oContainerBg.scaleY = 1 / CUR_GRID_SCALE;

        _oContainerBg.scaleX = _oContainerBg.scaleY *= 1.5;
    };

    this.reset = function () {
        _bCPUTurn = false;
        _bUpdateAI = false;
        _iTotDartScore = 0;
        _iThrowState = 0;

        _iNumThrow = NUM_THROW_PER_TURN;

        for (var i = 0; i < _aDartThrown.length; i++) {
            _aDartThrown[i].unload();
        }

        _aDartThrown = new Array();
    };

    this._initMode = function () {
        _iCurTurn = 0;
        _aPlayerNames = new Array();
        _aPlayerNames.push(TEXT_PLAYER_NAME[0]);

        if (s_iCurMode === MODE_SINGLE) {
            _iNumPlayer = 1;
        } else {
            _iNumPlayer = 2;
            if (s_iCurMode === MODE_VS_CPU) {
                _aPlayerNames.push(TEXT_CPU);
            } else {
                _aPlayerNames.push(TEXT_PLAYER_NAME[1]);
            }
        }

        _aPlayerScore = new Array();
        for (var i = 0; i < _iNumPlayer; i++) {
            _aPlayerScore[i] = STARTING_SCORE;
        }
    };

    this._initBg = function () {
        _oContainerBg = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerBg);


        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        _oContainerBg.addChild(oBg);
    };

    this._initDartBoard = function () {
        _oContainerDartBoard = new createjs.Container();
        _oContainerGame.addChild(_oContainerDartBoard);

        this._initBg();

        var oSpriteBoard = s_oSpriteLibrary.getSprite("dartboard");
        _oBoardDart = new CDartBoard(_oContainerBg.getBounds().width / 2, oSpriteBoard.height / 2, oSpriteBoard, _oContainerDartBoard)


        _oContainerDart = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerDart);

        _pStartDartPos = { x: _oContainerBg.getBounds().width / 2 - 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };
        _pEndDartPos = { x: _oContainerBg.getBounds().width / 2 + 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };

        this._createDart();
        /*
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(255,0,255,1)").drawCircle(AI_INFO_HIT["center"].x,AI_INFO_HIT["center"].y,20);
        _oContainerDartBoard.addChild(oFade);
        */
        _iHeightDartBoard = _pStartDartPos.y;

        _oContainerDartBoard.regX = _oContainerDartBoard.getBounds().width / 2;

        _oContainerDartBoard.x = _iStartXDartBoard = CANVAS_WIDTH / 2;
    };

    this._initGameOverPanel = function () {
        switch (s_iCurMode) {
            case MODE_SINGLE: {
                _oGameOver = new CEndPanelSingleMode();
                _oGameOver.addEventListener(ON_BACK_MENU, this.onConfirmExit, this);
                _oGameOver.addEventListener(ON_RESTART, this._restartGame, this);


                break;
            }
            case MODE_VS_CPU: {
                _oGameOver = new CEndPanelVsCpu();
                _oGameOver.addEventListener(ON_BACK_MENU, this.onConfirmExit, this);
                _oGameOver.addEventListener(ON_RESTART, this._restartGame, this);
                _oGameOver.addEventListener(ON_NEXT, this._nextLevel, this);
                break;
            }
            case MODE_VS_HUMAN: {
                _oGameOver = new CEndPanelVsHuman();
                _oGameOver.addEventListener(ON_BACK_MENU, this.onConfirmExit, this);
                _oGameOver.addEventListener(ON_RESTART, this._restartGame, this);
                break;
            }
        }
    };

    this._restartGame = function () {
        this.reset();

        //REMOVE ALL DARTS
        _oContainerDart.removeAllChildren();

        //RESET SCORES
        _aPlayerScore = new Array();
        for (var i = 0; i < _iNumPlayer; i++) {
            _aPlayerScore[i] = STARTING_SCORE;
            _oInterface.resetPlayerScore(i);
        }

        _iCurTurn = 0;

        this._createDart();

        _oInterface.reset();


        this._resetHitArea();
    };

    this._nextLevel = function () {
        s_iCurLevel++;
        _iAccuracyAI = AI_ACCURACY[s_iCurLevel - 1];


        this._restartGame();
    };

    this._createDart = function () {
        _fForceDart = 0;

        var iType = _iCurTurn;

        var oDart = new CDart(_pStartDartPos.x, _pStartDartPos.y, iType, _pEndDartPos, _oContainerDart);

        _oCurDart = oDart;
        _aDartThrown.push(oDart);

        if (s_iCurMode !== MODE_VS_CPU || (s_iCurMode === MODE_VS_CPU && _iCurTurn === 0)) {
            if (this._oAlertText && _aPlayerScore[_iCurTurn] < 41 && _aPlayerScore[_iCurTurn] % 2 === 0) {
                var iNumToHit = _aPlayerScore[_iCurTurn] / 2;
                _oAlertText.show(TEXT_HINT1 + " " + iNumToHit + " " + TEXT_HINT2);
            }
        }

    };

    this._resetHitArea = function () {
        _oListenerDown = _oHitArea.on('mousedown', this.onMouseDown);
    };

    this.onMouseDown = function (e) {
        if (!_bCPUTurn) {
            _oHitArea.off('mousedown', _oListenerDown);
        }

        if (_iThrowState === 0) {
            _oCurDart.stopTween();

            if (!_bCPUTurn) {
                s_oGame._resetHitArea();
            } else {
                _bUpdateAI = true;

            }

            _iThrowState++;

            if (s_bFirstPlay) {
                _oHelpControls.nextHelp();
            }
        } else {
            _oListenerUp = _oHitArea.on('click', s_oGame.onPressUp);
            _oListenerMove = _oHitArea.on('pressmove', s_oGame.onPressMove);

            _oPressPoint = { x: e.localX, y: e.localY };
            _oReleasePoint = { x: e.localX, y: e.localY };

            var pPos = _oCurDart.getDartTip();
            _oArrowThrow.setPosition(pPos.x, pPos.y);
            _oArrowThrow.setVisible(true);
        }

    };


    this.onPressUp = function () {
        if (!_bCPUTurn) {
            if (s_bFirstPlay) {
                s_bFirstPlay = false;
                _oHelpControls.hide();
                _oHelpControls = null;
            }

            _oHitArea.off('click', _oListenerUp);
            _oHitArea.off('pressmove', _oListenerMove);

            _oReleasePoint.x = 0;
            _oReleasePoint.y = 0;
            _oArrowThrow.setVisible(false);

            if (_fForceDart === 0) {
                s_oGame._resetHitArea();
                return;
            }
        }

        var iOffsetX = (_iAngleArrow - 360) / 50;
        _oCurDart.startAnim((CANVAS_WIDTH / 2 * iOffsetX), _fForceDart, iOffsetX);

        s_oGame._prepareLaunchDart();
    };

    this._prepareLaunchDart = function () {
        _oAlertText.hide();

        var iNewX = CANVAS_WIDTH / 2 + (CANVAS_WIDTH / 2 - _oCurDart.getNewX());
        var iNewY = -(_oCurDart.getNewY() - _oContainerDartBoard.y);

        if (!s_bLandscape) {
            iNewY += CANVAS_HEIGHT / 3;
        } else {
            iNewY += CANVAS_HEIGHT / 5
        }

        createjs.Tween.get(_oContainerDartBoard).to({ y: iNewY + 200 }, 500, createjs.Ease.cubicOut).to({ y: iNewY }, 500, createjs.Ease.sineIn);
        createjs.Tween.get(_oContainerDartBoard).to({ x: iNewX }, 1500, createjs.Ease.cubicOut);

        createjs.Tween.get(_oContainerDartBoard).to({ scaleX: 1.5, scaleY: 1.5 }, 1500, createjs.Ease.cubicOut);

        s_oGame.decreaseNumThrow();

        playSound("launch", 1, false);
    };

    this._aiShot = function (iOffsetX) {
        _oCurDart.startAnim(iOffsetX, _fForceDart, iOffsetX / 700);

        this._prepareLaunchDart();
    };

    this.onPressMove = function (evt) {
        _oReleasePoint = { x: evt.localX, y: evt.localY };

        s_oGame.arrowUpdate();
    };

    this.arrowUpdate = function () {
        this.angleArrow();
        this.arrowMask();
    };

    this.angleArrow = function () {
        var oDif = { x: _oReleasePoint.x - _oPressPoint.x, y: _oReleasePoint.y - _oPressPoint.y };
        var iAngle = Math.atan2(_oPressPoint.y, oDif.x);


        _iAngleArrow = iAngle * (180 / Math.PI) + 270;
        _oArrowThrow.setAngle(_iAngleArrow);
    };

    this.arrowMask = function () {
        var fDistance = Math.abs(_oPressPoint.y - _oReleasePoint.y)

        if (_oReleasePoint.y < _oPressPoint.y) {
            return;
        }


        if (fDistance > _oArrowThrow.getHeight()) {
            fDistance = _oArrowThrow.getHeight();
        }

        _fForceDart = fDistance * FORCE_MULTIPLIER;
        _oArrowThrow.mask(fDistance);
    };


    var sortFunction = function (obj1, obj2, options) {
        if (obj1.y > obj2.y) { return -1; }
        if (obj1.y < obj2.y) { return 1; }
        return 0;
    };


    this._endThrow = function () {
        if (_iCurTurn === 0 && s_iCurMode !== MODE_VS_HUMAN) {
            _iTotThrows++;
        }

        _oContainerDart.sortChildren(sortFunction);

        this._checkThrowPoint();

        createjs.Tween.get(_oContainerDartBoard).wait(1000).to({ scaleX: CUR_GRID_SCALE, scaleY: CUR_GRID_SCALE, x: _iStartXDartBoard, y: s_iOffsetY + 20 }, 1000, createjs.Ease.cubicInOut).call(function () {
            s_oGame._resetShot();
        });
    };

    this._checkThrowPoint = function () {
        _bDouble = false;

        var iAngle = angleBetweenVectors(new CVector2(_oCurDart.getX() - _oBoardDart.getX(), _oCurDart.getY() - _oBoardDart.getY()), new CVector2(0, -1));

        iAngle = toDegree(iAngle);

        //CHECK THE POINT INSIDE THE SLICE
        var iDist = distanceV2(_oCurDart.getPos(), { x: _oBoardDart.getX(), y: _oBoardDart.getY() });

        var iId = -1;
        for (var k = 0; k < DIST_SLICES.length; k++) {
            if (iDist < DIST_SLICES[k]) {
                iId = k;
                break;
            }
        }

        //FIND THE TARGET SLICE
        _iLastThrowScore = 0;
        if (iId > 1) {
            var iRet = Math.floor(iAngle / SLICE_ANGLE + 0.5);

            if (_oCurDart.getX() > _oBoardDart.getX()) {
                _iLastThrowScore = SLICE_VALUES_RIGHT[iRet];

            } else {
                _iLastThrowScore = SLICE_VALUES_LEFT[iRet];
            }

            if (iId === 3) {
                //TRIPLE YOUR SCORE
                _iLastThrowScore *= 3;
            } else if (iId === 5) {
                //DOUBLE YOUR SCORE
                _iLastThrowScore *= 2;
                _bDouble = true;
            }
        } else if (iId !== -1) {
            _iLastThrowScore = POINTS_DARTBOARD_CENTER[iId];
            if (iId === 0) {
                _bDouble = true;
            }
        }


        if (_iLastThrowScore > 0) {
            playSound("hit", 1, false);

            new CScoreText(_iLastThrowScore, _oCurDart.getPos().x, _oCurDart.getPos().y, "#fff", _oContainerDartBoard);


        } else {
            playSound("miss", 1, false);
        }

        _iTotDartScore += _iLastThrowScore;

        _oInterface.showDartScore(_iCurTurn, NUM_THROW_PER_TURN - _iNumThrow - 1, _iLastThrowScore, _iTotDartScore);
    };


    this._resetShot = function () {
        //DECREASE SCORE FOR THE CURRENT PLAYER
        _aPlayerScore[_iCurTurn] -= _iLastThrowScore;

        //CHECK IF CURRENT PLAYER FINALIZED THE MATCH WITH A DOUBLE
        var bForceChangeTurn = false;
        if (_aPlayerScore[_iCurTurn] === 0) {
            if (_bDouble) {
                //PLAYER WINS
                _oInterface.refreshPlayerScore(_iCurTurn, 0);
                this.gameOver();
                return;
            } else {
                bForceChangeTurn = true;
            }
        } else if (_aPlayerScore[_iCurTurn] < 0 || _aPlayerScore[_iCurTurn] === 1) {
            bForceChangeTurn = true;
        } else {
            _oInterface.refreshPlayerScore(_iCurTurn, _aPlayerScore[_iCurTurn]);
        }

        if (_iNumThrow === 0 || bForceChangeTurn) {
            _iNumThrow = 0;
            if (_aPlayerScore[_iCurTurn] <= 1) {
                _aPlayerScore[_iCurTurn] += _iTotDartScore;
            }

            _oInterface.refreshPlayerScore(_iCurTurn, _aPlayerScore[_iCurTurn]);
            setTimeout(function () { s_oGame._changeTurn(); }, 2000);

        } else {
            _iThrowState = 0;
            this._createDart();

            if (_bCPUTurn) {
                this._calculateCPUGoal();
                _bUpdateAI = true;
            } else {
                this._resetHitArea();
            }
        }
    };

    this.decreaseNumThrow = function () {
        _iNumThrow--;

        _oInterface.refreshNumThrow(_iNumThrow);
    };

    this._manageAIThrow = function () {
        switch (_iThrowState) {
            case 0: {
                //AI WILL TRY TO CENTER THE DART 

                if (_oCurDart.getX() > _oInfoCPUGoal.x - (300 * _iAccuracyAI)) {
                    _bUpdateAI = false;
                    var iTime = 400 * _iAccuracyAI;
                    var iRandTime = Math.floor(Math.random() * iTime);
                    setTimeout(function () { s_oGame.onMouseDown(); }, iRandTime);
                }
                break;
            }
            case 1: {
                _bUpdateAI = false;

                //DIRTY FORCE VALUE 
                var iRandNoise = Math.floor(Math.random() * 201) - 100;

                _fForceDart = _oInfoCPUGoal.force + (iRandNoise * _iAccuracyAI);

                //CALCULATE DIR VECTOR

                var pPos = _oCurDart.getDartTip();
                _oArrowThrow.setPosition(pPos.x, pPos.y);

                var iDiff = _oInfoCPUGoal.x - _oArrowThrow.getX();

                //DIRTY DART X
                var iRandNoise = Math.floor(Math.random() * 101) - 50;

                iDiff += iRandNoise * _iAccuracyAI;


                setTimeout(function () { s_oGame._aiShot(iDiff); }, 1000);
                break;
            }

        }
    };



    this._calculateAiGoal = function () {
        var iGoal = _aPlayerScore[1];

        switch (iGoal) {
            case 24: {
                return "double_12";
            }
            case 36: {
                return "double_18";
            }
            case 50: {
                return "bulls_eye";
            }
            case 81: {
                return "triple_19";

            }
            case 84: {
                return "triple_16";
            }

            default: {
                if (iGoal > 61) {
                    //TRY TO HIT TRIPLE 20
                    return "triple_20";
                } else if (iGoal > 40) {
                    var iDiff = iGoal - 40;
                    if (iDiff % 2 > 0) {
                        iDiff++;
                    }
                    return "" + iDiff;
                } else if (iGoal % 2 === 0) {
                    return "double_" + (iGoal / 2);
                } else {
                    return "1";
                }
            }
        }
    };

    this.onExit = function () {
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE, 90);
    };

    this.onConfirmExit = function () {
        this.unload();

        document.dispatchEvent(new CustomEvent("show_interlevel_ad"));
        document.dispatchEvent(new CustomEvent("end_session"));

        s_oMain.gotoMenu();
    };

    this._changeTurn = function () {
        if (s_iCurMode !== MODE_SINGLE) {
            var iPrev = _iCurTurn;
            _iCurTurn++;
            if (_iCurTurn === _aPlayerScore.length) {
                _iCurTurn = 0;
                _oInterface.resetScoreGUI();
            }

            _oInterface.changeTurn(_iCurTurn, iPrev);
        } else {
            _oInterface.resetScoreGUI();
        }

        this.reset();

        _oInterface.resetNumThrow();

        this._createDart();

        _bCPUTurn = false;
        _bUpdateAI = false;
        if (_iCurTurn === 1 && s_iCurMode === MODE_VS_CPU) {
            this._calculateCPUGoal();

            _bCPUTurn = true;
            _bUpdateAI = true;
        } else {
            this._resetHitArea();
        }

    };

    this._calculateCPUGoal = function () {
        //CPU TURN
        var szGoal = this._calculateAiGoal();
        _oInfoCPUGoal = AI_INFO_HIT[szGoal];
    };

    this.gameOver = function () {
        if (s_iCurMode === MODE_SINGLE) {
            this.refreshScore(true);

            if (getBestScoreSingleMode() < _iScore) {
                setBestScoreSingleMode(_iScore);
            }

            _oGameOver.show(_iScore, _iTotThrows);
        } else {
            if (s_iCurMode === MODE_VS_CPU) {
                var iLevelScore = this.refreshScore(false);

                var bGameOver = false;

                if (s_iCurLevel === NUM_LEVELS) {
                    bGameOver = true;
                }

                _oGameOver.show(_iCurTurn, iLevelScore, _iScore, bGameOver);
            } else {
                _oGameOver.show(_iCurTurn, _aPlayerNames[_iCurTurn], _aPlayerNames, _aPlayerScore);
            }


        }
    };

    this.refreshScore = function (bSingleMode) {
        var iLevelScore = MAX_NUM_THROW - _iTotThrows;
        if (iLevelScore < 0) {
            iLevelScore = 0;
        }

        _iScore += iLevelScore;

        if (bSingleMode) {
            setScoreSingleMode(_iScore);
        } else {
            setLocalStorageScore(iLevelScore, s_iCurLevel);
        }

        document.dispatchEvent(new CustomEvent("save_score", { detail: { score: _iScore } }));
        document.dispatchEvent(new CustomEvent("share_event", { detail: { score: _iScore } }));

        return iLevelScore;
    };

    this.update = function () {
        if (_bUpdateAI) {
            this._manageAIThrow();
        }
    };

    s_oGame = this;

    this._init();
}

var s_oGame = null;


// js/CInterface.js
function CInterface(iNumPlayer, aPlayerNames) {
    var _aDartSprite;
    var _aScoreGUI;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oAudioToggle;
    var _oButFullscreen;
    var _oButExit;
    var _oButHelp;
    var _oGUIExpandible;
    var _oDartContainer;
    var _oRollingScore;
    var _oBestScoreNum;
    var _oHelpPanel;
    var _oContainerScore;

    var _pStartPosScore;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosDart;
    var _pStartPosBest;

    this._init = function (iNumPlayer, aPlayerNames) {
        var oSpriteBg = s_oSpriteLibrary.getSprite("bg_score");
        _pStartPosScore = { x: CANVAS_WIDTH - oSpriteBg.width - 10, y: CANVAS_HEIGHT - 190 };
        _oContainerScore = new createjs.Container();
        _oContainerScore.x = _pStartPosScore.x;
        _oContainerScore.y = _pStartPosScore.y;
        s_oStage.addChild(_oContainerScore);

        var oSpriteInfo = s_oSpriteLibrary.getSprite("bg_score_info");
        var oScoreInfoBg = createBitmap(oSpriteInfo);
        oScoreInfoBg.x = 310;
        _oContainerScore.addChild(oScoreInfoBg);

        var oText1 = new createjs.Text("1", "40px " + FONT, "#fff");
        oText1.x = 340;
        oText1.y = 44;
        oText1.textAlign = "center";
        oText1.textBaseline = "alphabetic";
        _oContainerScore.addChild(oText1);


        var oText2 = new createjs.Text("2", "40px " + FONT, "#fff");
        oText2.x = 400;
        oText2.y = 44;
        oText2.textAlign = "center";
        oText2.textBaseline = "alphabetic";
        _oContainerScore.addChild(oText2);


        var oText3 = new createjs.Text("3", "40px " + FONT, "#fff");
        oText3.x = 460;
        oText3.y = 44;
        oText3.textAlign = "center";
        oText3.textBaseline = "alphabetic";
        _oContainerScore.addChild(oText3);

        var oTextPt = new createjs.Text(TEXT_PT, "40px " + FONT, "#fff");
        oTextPt.x = 540;
        oTextPt.y = 44;
        oTextPt.textAlign = "center";
        oTextPt.textBaseline = "alphabetic";
        _oContainerScore.addChild(oTextPt);

        _aScoreGUI = new Array();

        var iXPos = 0;
        var iYPos = oSpriteInfo.height;
        for (var i = 0; i < iNumPlayer; i++) {
            _aScoreGUI[i] = new CScoreGUI(iXPos, iYPos, oSpriteBg, aPlayerNames[i], _oContainerScore);

            iYPos += oSpriteBg.height / 2;
        }

        _aScoreGUI[0].showTurn();


        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = { x: _pStartPosExit.x - oSprite.width, y: _pStartPosExit.y }
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);

            _pStartPosFullscreen = { x: _pStartPosAudio.x - oSprite.width / 2, y: _pStartPosAudio.y };
        } else {
            _pStartPosFullscreen = { x: _pStartPosExit.x - oSprite.width, y: _pStartPosExit.y }
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');


            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        _oButHelp = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, s_oSpriteLibrary.getSprite("but_help"), s_oStage);
        _oButHelp.addEventListener(ON_MOUSE_UP, this._onHelp, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oGUIExpandible.addButton(_oButExit);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oGUIExpandible.addButton(_oAudioToggle);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oGUIExpandible.addButton(_oButFullscreen);
        }

        _oGUIExpandible.addButton(_oButHelp);

        if (s_iCurMode === MODE_SINGLE) {
            _pStartPosBest = { x: 20, y: 50 };
            _oBestScoreNum = new CTLText(s_oStage,
                _pStartPosBest.x, _pStartPosBest.y, 400, 70,
                70, "left", "#fff", FONT, 1,
                0, 0,
                TEXT_BEST + " " + getBestScoreSingleMode(),
                true, true, false,
                false);

        }

        var oSpriteDart = s_oSpriteLibrary.getSprite("dart_icon");
        _pStartPosDart = { x: 20, y: CANVAS_HEIGHT - oSpriteDart.height - 20 };
        _oDartContainer = new createjs.Container();
        _oDartContainer.x = _pStartPosDart.x;
        _oDartContainer.y = _pStartPosDart.Y;
        s_oStage.addChild(_oDartContainer);

        _aDartSprite = new Array();
        var iX = 0;
        for (var i = 0; i < NUM_THROW_PER_TURN; i++) {
            var oDart = createBitmap(oSpriteDart);
            oDart.x = iX;
            _oDartContainer.addChild(oDart);

            iX += oSpriteDart.width + 10;

            _aDartSprite.push(oDart);

            if (i >= NUM_THROW_PER_TURN) {
                oDart.visible = false;
            }
        }

        _oRollingScore = new CRollingScore();

        _oHelpPanel = new CHelpPanel();
    };

    this.unload = function () {
        _oGUIExpandible.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        _oButExit.unload();
        _oButHelp.unload();
        _oHelpPanel.unload();

        s_oInterface = null;
    };

    this.refreshButtonPos = function () {
        _oGUIExpandible.refreshPos();

        _oDartContainer.x = _pStartPosDart.x + s_iOffsetX;
        _oDartContainer.y = _pStartPosDart.y - s_iOffsetY;

        if (s_iCurMode === MODE_SINGLE) {
            _oBestScoreNum.setX(_pStartPosBest.x + s_iOffsetX);
            _oBestScoreNum.setY(_pStartPosBest.y + s_iOffsetY);
        }

        _oContainerScore.x = _pStartPosScore.x - s_iOffsetX;
        _oContainerScore.y = _pStartPosScore.y - s_iOffsetY;
    };

    this.reset = function () {
        if (s_iCurMode === MODE_SINGLE) {
            _oBestScoreNum.refreshText(TEXT_BEST + " " + getBestScoreSingleMode());
        }

        this.resetNumThrow();

        this.resetScoreGUI();
    };

    this.changeTurn = function (iTurn, iPrevTurn) {
        //this.resetScoreGUI();

        _aScoreGUI[iTurn].showTurn();
        _aScoreGUI[iPrevTurn].hideTurn();
    };

    this.resetPlayerScore = function (iPlayer) {
        _aScoreGUI[iPlayer].resetPlayerScore();
    };

    this.addThrows = function (iNum) {
        for (var i = 0; i < iNum; i++) {
            _aDartSprite[i].visible = true;
        }
    };

    this.resetScoreGUI = function () {
        for (var k = 0; k < _aScoreGUI.length; k++) {
            _aScoreGUI[k].reset();
        }
    };

    this.resetNumThrow = function () {
        for (var i = 0; i < _aDartSprite.length; i++) {
            _aDartSprite[i].visible = true;
        }
    };

    this.refreshNumThrow = function (iNum) {
        _aDartSprite[iNum].visible = false;
    };

    this.refreshScore = function (iScore) {
        _oRollingScore.rolling(_oPointText, null, iScore);
    };


    this.showDartScore = function (iTurn, iThrow, iScore, iTotScore) {
        _aScoreGUI[iTurn].showNextScore(iThrow, iScore, iTotScore);
    };

    this.refreshPlayerScore = function (iTurn, iPlayerScore) {
        _aScoreGUI[iTurn].refreshPlayerScore(iPlayerScore);
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        s_oGame.onExit();
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    this._onHelp = function () {
        _oHelpPanel.show();
    };

    s_oInterface = this;

    this._init(iNumPlayer, aPlayerNames);

    return this;
}

var s_oInterface = null;

// js/CEndPanelSingleMode.js
function CEndPanelSingleMode() {
    var _iStartY;
    var _iEventToLaunch;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;

    var _oFade;
    var _oLevelClearedText;
    var _oTotScoreText;
    var _oBestScoreText;
    var _oNumThrowText;
    var _oButHome;
    var _oButRestart;
    var _oContainer;
    var _oContainerPanel;

    var _oThis = this;


    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("click", function () { });
        _oContainer.addChild(_oFade);


        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH / 2;
        _oContainer.addChild(_oContainerPanel);

        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);

        _oLevelClearedText = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 - 220, oSpriteBg.width - 40, 70,
            70, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oNumThrowText = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 - 110, oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);



        _oTotScoreText = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 - 40, oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);



        _oBestScoreText = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 + 30, oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oButHome = new CGfxButton(oSpriteBg.width / 2 - 190, oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_home"), _oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP, this._onHome, this);

        _oButRestart = new CGfxButton(oSpriteBg.width / 2 + 190, oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_restart"), _oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);

        _iStartY = -oSpriteBg.height / 2;

        _oContainerPanel.regX = oSpriteBg.width / 2;
        _oContainerPanel.regY = oSpriteBg.height / 2;
    };

    this.unload = function () {
        _oButHome.unload();
        _oButRestart.unload();

        _oFade.off("click", _oListener);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.show = function (iTotScore, iThrows) {
        playSound("win", 1, false);

        _oLevelClearedText.refreshText(TEXT_GAME_OVER);
        _oTotScoreText.refreshText(TEXT_SCORE + ": " + iTotScore);
        _oBestScoreText.refreshText(TEXT_BEST_SCORE + ": " + getBestScoreSingleMode());
        _oNumThrowText.refreshText(TEXT_THROWS + ": " + iThrows);

        _oFade.alpha = 0;
        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;


        createjs.Tween.get(_oFade).to({ alpha: 0.7 }, 500);
        createjs.Tween.get(_oContainerPanel).wait(400).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };

    this.hide = function () {
        createjs.Tween.get(_oContainerPanel).to({ y: _iStartY }, 1000, createjs.Ease.backIn).call(function () {
            _oContainer.visible = false;

            if (_aCbCompleted[_iEventToLaunch]) {
                _aCbCompleted[_iEventToLaunch].call(_aCbOwner[_iEventToLaunch]);
            }
        });
    };

    this._onHome = function () {
        _iEventToLaunch = ON_BACK_MENU;

        _oThis.hide();
    };

    this._onRestart = function () {
        document.dispatchEvent(new CustomEvent("show_interlevel_ad"));


        _iEventToLaunch = ON_RESTART;

        _oThis.hide();
    };

    this._init();
}


// js/CEndPanelVsHuman.js
function CEndPanelVsHuman() {
    var _iStartY;
    var _iEventToLaunch;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;

    var _oFade;
    var _oTitleText;
    var _oScorePlayer1Text;
    var _oScorePlayer2Text;
    var _oButHome;
    var _oButRestart;
    var _oContainer;
    var _oContainerPanel;

    var _oThis = this;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("click", function () { });
        _oContainer.addChild(_oFade);


        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH / 2;
        _oContainer.addChild(_oContainerPanel);

        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);

        _oTitleText = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 - 220, oSpriteBg.width - 40, 70,
            70, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);



        _oScorePlayer1Text = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 - 40, oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);



        _oScorePlayer2Text = new CTLText(_oContainerPanel,
            20, oSpriteBg.height / 2 + 30, oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oButHome = new CGfxButton(oSpriteBg.width / 2 - 190, oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_home"), _oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP, this._onHome, this);

        _oButRestart = new CGfxButton(oSpriteBg.width / 2 + 190, oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_restart"), _oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);


        _iStartY = -oSpriteBg.height / 2;

        _oContainerPanel.regX = oSpriteBg.width / 2;
        _oContainerPanel.regY = oSpriteBg.height / 2;
    };

    this.unload = function () {
        _oButHome.unload();
        _oButRestart.unload();

        _oFade.off("click", _oListener);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.show = function (iWinner, szWinner, aPlayerNames, aScores) {
        playSound("game_over", 1, false);

        _oTitleText.refreshText(szWinner + " " + TEXT_WINS);


        _oScorePlayer1Text.refreshText(aPlayerNames[0] + " " + TEXT_SCORE + " : " + aScores[0]);
        _oScorePlayer2Text.refreshText(aPlayerNames[1] + " " + TEXT_SCORE + " : " + aScores[1]);


        _oFade.alpha = 0;
        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;


        createjs.Tween.get(_oFade).to({ alpha: 0.7 }, 500);
        createjs.Tween.get(_oContainerPanel).wait(400).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };

    this.hide = function () {
        createjs.Tween.get(_oContainerPanel).to({ y: _iStartY }, 1000, createjs.Ease.backIn).call(function () {
            _oContainer.visible = false;

            if (_aCbCompleted[_iEventToLaunch]) {
                _aCbCompleted[_iEventToLaunch].call(_aCbOwner[_iEventToLaunch]);
            }
        });
    };

    this._onHome = function () {
        _iEventToLaunch = ON_BACK_MENU;

        _oThis.hide();
    };

    this._onRestart = function () {
        document.dispatchEvent(new CustomEvent("show_interlevel_ad"));


        _iEventToLaunch = ON_RESTART;

        _oThis.hide();
    };

    this._init();
}

// js/CEndPanelVsCpu.js
function CEndPanelVsCpu() {
    var _iStartY;
    var _iEventToLaunch;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;

    var _oSpriteBg;
    var _oFade;
    var _oTitleText;
    var _oTotScoreText;
    var _oLevelScoreText;
    var _oButHome;
    var _oButRestart;
    var _oButNext;
    var _oContainer;
    var _oContainerPanel;

    var _oThis = this;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("click", function () { });
        _oContainer.addChild(_oFade);


        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH / 2;
        _oContainer.addChild(_oContainerPanel);

        _oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oBg = createBitmap(_oSpriteBg);
        _oContainerPanel.addChild(oBg);

        _oTitleText = new CTLText(_oContainerPanel,
            20, _oSpriteBg.height / 2 - 220, _oSpriteBg.width - 40, 70,
            70, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oLevelScoreText = new CTLText(_oContainerPanel,
            20, _oSpriteBg.height / 2 - 110, _oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);



        _oTotScoreText = new CTLText(_oContainerPanel,
            20, _oSpriteBg.height / 2 - 40, _oSpriteBg.width - 40, 70,
            50, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, false,
            false);


        _oButHome = new CGfxButton(_oSpriteBg.width / 2 - 190, _oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_home"), _oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP, this._onHome, this);

        _oButRestart = new CGfxButton(_oSpriteBg.width / 2, _oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_restart"), _oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);

        _oButNext = new CGfxButton(_oSpriteBg.width / 2 + 190, _oSpriteBg.height / 2 + 180, s_oSpriteLibrary.getSprite("but_next"), _oContainerPanel);
        _oButNext.addEventListener(ON_MOUSE_UP, this._onNext, this);

        _iStartY = -_oSpriteBg.height / 2;

        _oContainerPanel.regX = _oSpriteBg.width / 2;
        _oContainerPanel.regY = _oSpriteBg.height / 2;
    };

    this.unload = function () {
        _oButHome.unload();
        _oButRestart.unload();
        _oButNext.unload();

        _oFade.off("click", _oListener);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.show = function (iWinner, iLevelScore, iTotScore, bGameOver) {

        if (iWinner === 0) {
            playSound("win", 1, false);
            if (!bGameOver) {
                _oTitleText.refreshText(TEXT_YOU_WIN);
                _oButNext.setVisible(true);
                _oButRestart.setX(_oSpriteBg.width / 2);

                setLocalStorageLevel(s_iCurLevel + 1);
            } else {
                _oTitleText.refreshText(TEXT_CONGRATS);
                _oButNext.setVisible(false);
                _oButRestart.setX(_oSpriteBg.width / 2 + 190);
            }
        } else {
            playSound("game_over", 1, false);
            _oTitleText.refreshText(TEXT_YOU_LOSE);
            _oButNext.setVisible(false);
            _oButRestart.setX(_oSpriteBg.width / 2 + 190);
        }


        _oLevelScoreText.refreshText(TEXT_LEVEL_SCORE + " : " + iLevelScore);
        _oTotScoreText.refreshText(TEXT_TOT_SCORE + " : " + iTotScore);

        _oFade.alpha = 0;
        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;


        createjs.Tween.get(_oFade).to({ alpha: 0.7 }, 500);
        createjs.Tween.get(_oContainerPanel).wait(400).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };

    this.hide = function () {
        createjs.Tween.get(_oContainerPanel).to({ y: _iStartY }, 1000, createjs.Ease.backIn).call(function () {
            _oContainer.visible = false;

            if (_aCbCompleted[_iEventToLaunch]) {
                _aCbCompleted[_iEventToLaunch].call(_aCbOwner[_iEventToLaunch]);
            }
        });
    };

    this._onHome = function () {
        _iEventToLaunch = ON_BACK_MENU;

        _oThis.hide();
    };

    this._onRestart = function () {
        document.dispatchEvent(new CustomEvent("show_interlevel_ad"));


        _iEventToLaunch = ON_RESTART;

        _oThis.hide();
    };

    this._onNext = function () {
        document.dispatchEvent(new CustomEvent("show_interlevel_ad"));


        _iEventToLaunch = ON_NEXT;

        _oThis.hide();
    };

    this._init();
}

// js/CCreditsPanel.js
function CCreditsPanel() {
    var _oListener;
    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    var _oPanel;

    var _pStartPanelPos;

    this._init = function () {

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown", function () { });
        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({ alpha: 0.7 }, 500);

        _oPanelContainer = new createjs.Container();
        s_oStage.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oPanel = createBitmap(oSprite);
        _oPanel.regX = oSprite.width / 2;
        _oPanel.regY = oSprite.height / 2;
        _oPanelContainer.addChild(_oPanel);
        _oListener = _oPanel.on("click", this._onLogoButRelease);

        _oPanelContainer.x = CANVAS_WIDTH / 2;
        _oPanelContainer.y = - oSprite.height / 2;
        _pStartPanelPos = { x: _oPanelContainer.x, y: _oPanelContainer.y };
        createjs.Tween.get(_oPanelContainer).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);

        var oTitle = new createjs.Text(TEXT_DEVELOPED, " 40px " + FONT, "#fff");
        oTitle.y = -80;
        oTitle.textAlign = "center";
        oTitle.textBaseline = "alphabetic";
        _oPanelContainer.addChild(oTitle);

        var oLink = new createjs.Text("www.codethislab.com", " 36px " + FONT, "#fff");
        oLink.y = 220;
        oLink.textAlign = "center";
        oLink.textBaseline = "middle";
        oLink.lineWidth = 300;
        _oPanelContainer.addChild(oLink);

        var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
        _oLogo = createBitmap(oSprite);

        _oLogo.regX = oSprite.width / 2;
        _oLogo.regY = oSprite.height / 2;
        _oLogo.y = 0;
        _oPanelContainer.addChild(_oLogo);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(280, -270, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
    };

    this.unload = function () {
        createjs.Tween.get(_oFade).to({ alpha: 0 }, 500);
        createjs.Tween.get(_oPanelContainer).to({ y: _pStartPanelPos.y }, 400, createjs.Ease.backIn).call(function () {
            s_oStage.removeChild(_oFade);
            s_oStage.removeChild(_oPanelContainer);

            _oButExit.unload();
        });

        _oFade.off("mousedown", function () { });
        _oPanel.off("mousedown", _oListener);
    };

    this._onLogoButRelease = function () {
        window.open("https://www.codethislab.com/", "_blank");
    };

    this._init();


};




// js/CAreYouSurePanel.js
function CAreYouSurePanel(oParentContainer) {
    var _iStartY;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;

    var _oBg;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;
    var _oPanelContainer;

    var _oThis = this;

    this._init = function () {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function () { });
        _oContainer.addChild(_oFade);

        _oPanelContainer = new createjs.Container();
        _oContainer.addChild(_oPanelContainer);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(_oBg);

        _oPanelContainer.x = CANVAS_WIDTH / 2;
        _oPanelContainer.y = _iStartY = - oSpriteBg.height / 2;

        _oMsg = new CTLText(_oPanelContainer,
            -oSpriteBg.width / 2 + 10, -200, oSpriteBg.width - 20, 200,
            100, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, true,
            false);




        _oButYes = new CGfxButton(190, 180, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-170, 180, s_oSpriteLibrary.getSprite('but_exit'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.show = function (szText, iSize) {
        _oMsg.refreshText(szText);

        _oPanelContainer.y = _iStartY;
        _oContainer.visible = true;
        createjs.Tween.get(_oPanelContainer).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut).call(function () { s_oMain.stopUpdateNoBlock(); });
    };

    this.hide = function () {
        s_oMain.startUpdateNoBlock();
        _oContainer.visible = false;
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();
        _oFade.off("click", _oListener);
    };

    this._onButYes = function () {
        _oThis.hide();

        if (_aCbCompleted[ON_BUT_YES_DOWN]) {
            _aCbCompleted[ON_BUT_YES_DOWN].call(_aCbOwner[ON_BUT_YES_DOWN]);
        }
    };

    this._onButNo = function () {

        _oThis.hide();
    };

    _oParentContainer = oParentContainer;

    this._init();
}

// js/CMsgBox.js
function CMsgBox() {
    var _iStartY;
    var _oListener;
    var _oButYes;
    var _oFade;
    var _oPanelContainer;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function () { });
        _oContainer.addChild(_oFade);

        _oPanelContainer = new createjs.Container();
        _oContainer.addChild(_oPanelContainer);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);
        oBg.regX = oSpriteBg.width * 0.5;
        oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(oBg);

        _oPanelContainer.x = CANVAS_WIDTH / 2;
        _oPanelContainer.y = _iStartY = - oSpriteBg.height / 2;

        var oMsg = new CTLText(_oPanelContainer,
            -oSpriteBg.width / 2, -220, oSpriteBg.width, 300,
            30, "center", "#fff", FONT, 1,
            40, 0,
            TEXT_ERR_LS,
            true, true, true,
            false);



        _oButYes = new CGfxButton(0, 160, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        createjs.Tween.get(_oPanelContainer).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };


    this._onButYes = function () {
        _oButYes.unload();
        _oFade.off("click", _oListener);

        s_oStage.removeChild(_oContainer);
    };

    this._init();
}

// js/CDart.js
function CDart(iX, iY, iType, pEndDartPos, oParentContainer) {
    var _iNewX;
    var _iNewY;
    var _iStartX = iX;
    var _pEndDartPos = pEndDartPos;
    var _oDart;
    var _oContactAnim;
    var _oSwipeAnim;
    var _oShadow;
    var _oContainer;
    var _oParentContainer = oParentContainer;

    var _oThis = this;

    this._init = function (iX, iY, iType) {
        _oContainer = new createjs.Container();

        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);

        var oPressSprite = s_oSpriteLibrary.getSprite("contact_effect");
        _oContactAnim = createBitmap(oPressSprite);
        _oContactAnim.regX = oPressSprite.width * 0.5;
        _oContactAnim.regY = oPressSprite.height * 0.5;
        _oContactAnim.visible = false;
        _oContactAnim.scaleX = 0;
        _oContactAnim.scaleY = 0;
        _oContainer.addChild(_oContactAnim);
        /*
        var oCircle = new createjs.Shape();
        oCircle.graphics.beginFill("red").drawCircle(0,0,50);
        _oContainer.addChild(oCircle);
        */

        _oShadow = createBitmap(s_oSpriteLibrary.getSprite("dart_shadow"));
        _oShadow.visible = false;
        _oShadow.x = -50;
        _oContainer.addChild(_oShadow);

        var aSprites = new Array();
        for (var i = 0; i < NUM_SPRITE_DART; i++) {
            aSprites.push(s_oSpriteLibrary.getSprite("dart_" + iType + "_" + i));
        }

        var oData = {
            images: aSprites,
            // width, height & registration point of each sprite
            frames: { width: DART_WIDTH, height: DART_HEIGHT, regX: DART_WIDTH / 2, regY: DART_HEIGHT - 170 },
            animations: { start: 0, anim: [0, NUM_SPRITE_DART - 1, "stop_anim"], stop_anim: NUM_SPRITE_DART - 1 }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oDart = createSprite(oSpriteSheet, "start", DART_WIDTH / 2, DART_HEIGHT - 170, DART_WIDTH, DART_HEIGHT);
        _oContainer.addChild(_oDart);

        _oSwipeAnim = createBitmap(s_oSpriteLibrary.getSprite("hand_swipe"));
        _oSwipeAnim.x = DART_WIDTH / 2;
        _oSwipeAnim.alpha = 0;
        _oSwipeAnim.y = 0;
        _oContainer.addChild(_oSwipeAnim);

        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut).call(function () { _oThis._playTweenX() });
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.startAnim = function (iOffsetX, iOffsetY, iRotOffset) {
        createjs.Tween.removeTweens(_oSwipeAnim);

        _oContainer.removeChild(_oSwipeAnim);
        _oContainer.alpha = 1;

        _oDart.gotoAndPlay("anim");
        _iNewX = _oContainer.x + iOffsetX;
        _iNewY = MAX_FORCE - iOffsetY;

        createjs.Tween.get(_oContainer).to({ x: _iNewX, rotation: MAX_DART_ANGLE_ROT * iRotOffset }, 500);

        createjs.Tween.get(_oContainer).to({ y: _iNewY }, 600, createjs.Ease.backOut).call(function () {
            _oShadow.visible = true;
            _oShadow.rotation = -_oContainer.rotation;
            s_oGame._endThrow();
            _oThis.drawCollisionPoint();
        });
        createjs.Tween.get(_oContainer).to({ scaleX: 0.5, scaleY: 0.5 }, 800, createjs.Ease.cubicOut);
    };

    this._playTweenX = function () {
        createjs.Tween.get(_oContainer, { loop: true }).to({ x: _pEndDartPos.x }, TIME_DART_MOVE_X, createjs.Ease.quadInOut).
            to({ x: _iStartX }, TIME_DART_MOVE_X, createjs.Ease.quadInOut);
    };

    this.stopTween = function () {
        createjs.Tween.removeTweens(_oContainer);
    };

    this.drawCollisionPoint = function () {
        _oContactAnim.visible = true;
        new createjs.Tween.get(_oContactAnim).to({ scaleX: 1, scaleY: 1 }, 1500, createjs.Ease.cubicOut).call(function () {

        });

        new createjs.Tween.get(_oContactAnim).to({ alpha: 0 }, 1500, createjs.Ease.cubicOut)
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.getPos = function () {
        return { x: _oContainer.x, y: _oContainer.y };
    };

    this.getDartTip = function () {
        return { x: _oContainer.x, y: _oContainer.y - DART_HEIGHT + 170 };
    };

    this.getNewX = function () {
        return _iNewX;
    };

    this.getNewY = function () {
        return _iNewY;
    };

    this.setX = function (iNewX) {
        _oContainer.x = iNewX;
    };

    this._init(iX, iY, iType);
}

// js/CVector2.js
function CVector2(iX, iY) {

    var x;
    var y;

    this._init = function (iX, iY) {
        x = iX;
        y = iY;
    };
    this.add = function (vx, vy) {
        x += vx;
        y += vy;
    };
    this.addV = function (v) {
        x += v.getX();
        y += v.getY();
    };
    this.scalarDivision = function (n) {
        x /= n;
        y /= n;
    };
    this.subtract = function (v) {
        x -= v.getX();
        y -= v.getY();
    };
    this.scalarProduct = function (n) {
        x *= n;
        y *= n;
    };
    this.invert = function () {
        x *= -1;
        y *= -1;
    };
    this.dotProduct = function (v) {
        return (x * v.getX() + y * v.getY());
    };
    this.set = function (fx, fy) {
        x = fx;
        y = fy;
    };
    this.setV = function (v) {
        x = v.getX();
        y = v.getY();
    };
    this.length = function () {
        return Math.sqrt(x * x + y * y);
    };
    this.length2 = function () {
        return x * x + y * y;
    };
    this.normalize = function () {
        var len = this.length();
        if (len > 0) {
            x /= len;
            y /= len;
        }
    };

    this.angleBetweenVectors = function (v2) {
        var iAngle = Math.acos(this.dotProduct(v2) / (this.length() * v2.length()));
        if (isNaN(iAngle) === true) {
            return 0;
        } else {
            return iAngle;
        }
    };

    this.getNormalize = function (outV) {
        var len = this.length();
        outV.set(x, y);
        outV.normalize();
    };
    this.rot90CCW = function () {
        var a = x;
        x = -y;
        y = a;
    };
    this.rot90CW = function () {
        var a = x;
        x = y;
        y = -a;
    };
    this.getRotCCW = function (outV) {
        outV.set(x, y);
        outV.rot90CCW();
    };
    this.getRotCW = function (outV) {
        outV.set(x, y);
        outV.rot90CW();
    };
    this.ceil = function () {
        x = Math.ceil(x);
        y = Math.ceil(y);
    };
    this.round = function () {
        x = Math.round(x);
        y = Math.round(y);
    };
    this.toString = function () {
        return "Vector2: " + x + ", " + y;
    };
    this.print = function () {
        trace("Vector2: " + x + ", " + y + "");
    };
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };

    this.rotate = function (iAngle) {
        var fNewX = x;
        var fNewY = y;

        x = fNewX * Math.cos(iAngle) - fNewY * Math.sin(iAngle);
        y = fNewX * Math.sin(iAngle) + fNewY * Math.cos(iAngle);
    };

    this._init(iX, iY);
}

// js/CMath.js
function toRadian(iValue) {
    return ((iValue) * (Math.PI / 180));
}

function toDegree(n) {
    return ((n) * (180 / Math.PI));
}

function randRange(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function angleBetweenVectors(v1, v2) {
    var iAngle = Math.acos(dotProductV2(v1, v2) / (v1.length() * v2.length()));

    if (isNaN(iAngle) === true) {
        return 0;
    } else {
        return iAngle;
    }
}

function rotateVector2D(iAngle, v) {
    var iX = v.getX() * Math.cos(iAngle) + v.getY() * Math.sin(iAngle);
    var iY = v.getX() * (-Math.sin(iAngle)) + v.getY() * Math.cos(iAngle);
    v.set(iX, iY);

    return { x: iX, y: iY };
}

function reflectVectorV2(v, n) {
    var vRet = new CVector2();
    var dotP = dotProductV2(v, n);
    vRet.set((v.getX() - (2 * dotP * n.getX())), (v.getY() - (2 * dotP * n.getY())));
    return vRet;
}

function dotProductV2(v1, v2) {
    return (v1.getX() * v2.getX() + v1.getY() * v2.getY());
}

function pointInRect(p, r) {
    return p.getX() > r.x && p.getX() < (r.x + r.width) && p.getY() > r.y && p.getY() < (r.y + r.height);
}


function distance2(v1, v2) {
    return ((v2.getX() - v1.getX()) * (v2.getX() - v1.getX())) + ((v2.getY() - v1.getY()) * (v2.getY() - v1.getY()));
}

function distance(v1, v2) {
    return Math.sqrt((v2.getX() - v1.getX()) * (v2.getX() - v1.getX())) + ((v2.getY() - v1.getY()) * (v2.getY() - v1.getY()));
}

function getAngle(x1, y1, x2, y2) {
    var w = x2 - x1;
    var h = y2 - y1;

    var atan = Math.atan(h / w) / Math.PI * 180;
    if (w < 0 || h < 0)
        atan += 180;
    if (w > 0 && h < 0)
        atan -= 180;
    if (atan < 0)
        atan += 360;

    return atan % 360;
}

// js/CDartBoard.js
function CDartBoard(iX, iY, oSprite, oParentContainer) {
    var iStartX = iX;
    var _oBoard;
    var _oContainer;
    var _oParentcontainer = oParentContainer;

    this._init = function (iX, iY, oSprite) {
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.regX = oSprite.width / 2;
        _oContainer.regY = oSprite.height / 2;
        _oParentcontainer.addChild(_oContainer);

        _oBoard = createBitmap(oSprite);
        _oContainer.addChild(_oBoard);

    };

    this.moveX = function () {
        createjs.Tween.get(_oContainer, { loop: true }).to({ x: iStartX + 400 }, 3000, createjs.Ease.cubicOut).
            to({ x: iStartX }, 3000, createjs.Ease.cubicIn).to({ x: iStartX - 400 }, 3000, createjs.Ease.cubicOut);
    };

    this.resetX = function () {
        createjs.Tween.get(_oContainer).to({ x: iStartX }, 1000, createjs.Ease.cubicOut)
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this._init(iX, iY, oSprite);
}

// js/CRollingScore.js
var MS_ROLLING_SCORE = 750;
function CRollingScore() {

    var _oTweenText = null;
    var _oTweenTextStroke = null;

    this.rolling = function (oScoreText, oScoreTextStruct, iScore) {

        if (iScore > parseInt(oScoreText.text)) {
            oScoreText.color = "#3dd700"
        } else if (iScore < parseInt(oScoreText.text)) {
            oScoreText.color = "#d50000"
        }

        _oTweenText = createjs.Tween.get(oScoreText).to({ text: iScore }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.removeTweens(_oTweenText);
            oScoreText.color = "#fff";
        }).addEventListener("change", function () {
            oScoreText.text = Math.floor(oScoreText.text);
        })

        if (oScoreTextStruct !== null) {
            _oTweenTextStroke = createjs.Tween.get(oScoreTextStruct).to({ text: iScore }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function () {
                createjs.Tween.removeTweens(_oTweenTextStroke);
            }).addEventListener("change", function () {
                oScoreTextStruct.text = Math.floor(oScoreTextStruct.text);
            })

        }
    };

    return this;
}



// js/CAlertText.js
function CAlertText() {
    var _oText;
    var _oContainer;

    this._init = function () {

        _oContainer = new createjs.Container();
        _oContainer.x = CANVAS_WIDTH / 2;
        _oContainer.y = CANVAS_HEIGHT / 2 + 350;
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRoundRect(-200, 0, 400, 100, 10);
        _oContainer.addChild(oFade);


        _oText = new CTLText(_oContainer,
            -190, 10, 380, 80,
            40, "center", "#fff", FONT, 1,
            0, 0,
            " ",
            true, true, true,
            false);


    };

    this.hide = function () {
        _oContainer.visible = false;
    };

    this.show = function (szText) {
        if (createjs.Tween.hasActiveTweens(_oContainer)) {
            return;
        }

        _oText.refreshText(szText);

        _oContainer.visible = true;

        _oContainer.scaleX = _oContainer.scaleY = 0.1;
        new createjs.Tween.get(_oContainer).to({ scaleX: 1, scaleY: 1 }, 600, createjs.Ease.cubicOut);

    };

    this._init();
}

// js/CScoreText.js
function CScoreText(iScore, x, y, szColor, oParentContainer) {

    var _oScoreHit;
    var _oParentContainer = oParentContainer;

    this._init = function (iScore, x, y, szColor) {

        _oScoreHit = new createjs.Text("00000", " 80px " + FONT, szColor);
        _oScoreHit.textAlign = "center";
        _oScoreHit.text = "+" + iScore;
        _oScoreHit.x = x;
        _oScoreHit.y = y;
        _oScoreHit.alpha = 0;
        _oScoreHit.shadow = new createjs.Shadow("#000", 4, 4, 2);
        _oParentContainer.addChild(_oScoreHit);

        var oParent = this;
        createjs.Tween.get(_oScoreHit).to({ alpha: 1 }, 200, createjs.Ease.quadIn).call(function () { oParent.moveUp(); });
    };

    this.moveUp = function () {
        var iNewY = _oScoreHit.y - 400;
        var oParent = this;
        createjs.Tween.get(_oScoreHit).to({ y: iNewY }, 1500, createjs.Ease.sineIn).call(function () { oParent.unload(); });
        createjs.Tween.get(_oScoreHit).wait(800).to({ alpha: 0 }, 500);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oScoreHit);
    };

    this._init(iScore, x, y, szColor);

}

// js/CArrowThrow.js
function CArrowThrow(iX, iY, oParentContainer) {
    var _oContainer;

    var _oArrowMask;
    var _oArrow;
    var _oArrowFill;
    var _iMaskWidth;
    var _iMaskHeight;
    var _oThis;
    var _oParentContainer;

    this._init = function (iX, iY) {
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);

        var oSpriteArrow = s_oSpriteLibrary.getSprite("arrow");
        _oArrow = createBitmap(oSpriteArrow);
        _oArrow.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrow);

        _oArrowFill = createBitmap(s_oSpriteLibrary.getSprite("arrow_fill"));
        _oArrowFill.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrowFill);

        _iMaskWidth = oSpriteArrow.width;
        _iMaskHeight = oSpriteArrow.height;

        _oArrowMask = new createjs.Shape();
        _oArrowMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, _iMaskHeight);
        _oArrowMask.regY = _iMaskHeight;
        _oContainer.addChild(_oArrowMask);



        _oArrowFill.mask = _oArrowMask;

        _oContainer.regX = oSpriteArrow.width / 2;
    };

    this.unload = function () {
        createjs.Tween.removeTweens(_oArrowMask);
        _oParentContainer.removeChild(_oContainer);
    };

    this.setVisible = function (bVisible) {
        _oContainer.rotation = 0;
        this.mask(0);
        _oContainer.visible = bVisible;

    };

    this.setAngle = function (iRotation) {
        _oContainer.rotation = iRotation;
    };

    this.animHelp = function (iTime) {
        _oArrowMask.scaleX = 0;
        createjs.Tween.get(_oArrowMask).to({ scaleX: 1 }, iTime, createjs.Ease.cubicInOut).call(function () {
            createjs.Tween.get(_oArrowMask).to({ scaleX: 0 }, iTime, createjs.Ease.cubicInOut).call(function () {
                _oThis.animHelp(iTime);
            });
        });
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.mask = function (iVal) {
        _oArrowMask.graphics.clear();
        var iNewMaskHeight = Math.floor((iVal * _iMaskHeight) / _iMaskHeight);
        _oArrowMask.regY = iNewMaskHeight;
        _oArrowMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, iNewMaskHeight);
    };

    this.setX = function (iXPos) {
        _oContainer.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oContainer.y = iYPos;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.getHeight = function () {
        return _iMaskHeight;
    };

    _oParentContainer = oParentContainer;

    _oThis = this;
    this._init(iX, iY);
}

// js/CScoreGUI.js
function CScoreGUI(iX, iY, oSpriteBg, szNickname, oParentContainer) {
    var _iCurGUI;
    var _aDartScoreText;
    var _pStartPos;

    var _oTextNickName;
    var _oTextTotScore;
    var _oBgNickname;
    var _oContainer;
    var _oParentContainer = oParentContainer;

    this._init = function (iX, iY, oSpriteBg, szNickname) {
        _iCurGUI = 0;

        _pStartPos = { x: iX, y: iY };
        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPos.x;
        _oContainer.y = _pStartPos.y;
        _oParentContainer.addChild(_oContainer);


        var oData = {
            images: [oSpriteBg],
            // width, height & registration point of each sprite
            frames: { width: oSpriteBg.width, height: oSpriteBg.height / 2 },
            animations: { on: 0, off: 1 }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oBgNickname = createSprite(oSpriteSheet, "off", 0, 0, oSpriteBg.width, oSpriteBg.height / 2);
        _oContainer.addChild(_oBgNickname);


        _oTextNickName = new CTLText(_oContainer,
            0, 8, 800, 48,
            48, "left", "#fff", FONT, 1,
            20, 0,
            szNickname,
            true, true, false,
            false);



        _aDartScoreText = new Array();
        var iXPos = 340;
        for (var i = 0; i < NUM_THROW_PER_TURN; i++) {
            var oText = new createjs.Text("0", "38px " + FONT, "#fff");
            oText.x = iXPos;
            oText.y = 46;
            oText.textAlign = "center";
            oText.textBaseline = "alphabetic";
            _oContainer.addChild(oText);

            _aDartScoreText.push(oText);

            iXPos += 58;
        }

        _oTextTotScore = new createjs.Text(STARTING_SCORE, "44px " + FONT, "#f6ed00");
        _oTextTotScore.x = 510;
        _oTextTotScore.y = 46;
        _oTextTotScore.textAlign = "left";
        _oTextTotScore.textBaseline = "alphabetic";
        _oContainer.addChild(_oTextTotScore);
    };

    this.refreshButtonPos = function () {
        _oContainer.x = _pStartPos.x - s_iOffsetX;
        _oContainer.y = _pStartPos.y - s_iOffsetY;
    };

    this.reset = function () {
        for (var i = 0; i < _aDartScoreText.length; i++) {
            _aDartScoreText[i].text = "0";
        }
    };

    this.resetPlayerScore = function () {
        _oTextTotScore.text = STARTING_SCORE;
    };

    this.showTurn = function () {
        _oBgNickname.gotoAndStop("on");
    };

    this.hideTurn = function () {
        _oBgNickname.gotoAndStop("off");
    };

    this.showNextScore = function (iThrow, iScore) {
        _aDartScoreText[iThrow].text = iScore;
    };

    this.refreshPlayerScore = function (iScore) {
        _oTextTotScore.text = iScore;
    };

    this._init(iX, iY, oSpriteBg, szNickname);
}

// js/CMenuMode.js
function CMenuMode() {
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosExit;

    var _oTextSelect;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButExit;
    var _oButSingle;
    var _oButVsCpu;
    var _oButVsHuman;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_select_mode"));
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite("but_exit");
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: _pStartPosExit.x - oSprite.width / 2 - 10, y: _pStartPosExit.y };

            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = { x: oSprite.width / 4 + 10, y: (oSprite.height / 2) + 10 };
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }


        //ATTACH MODE BUTTONS
        _oButSingle = new CGfxButton(0, 0, s_oSpriteLibrary.getSprite("but_single"), _oContainer);
        _oButSingle.addEventListener(ON_MOUSE_DOWN, this._onSingle, this);

        _oButVsCpu = new CGfxButton(0, 0, s_oSpriteLibrary.getSprite("but_vs_cpu"), _oContainer);
        _oButVsCpu.addEventListener(ON_MOUSE_DOWN, this._onVsCpu, this);

        _oButVsHuman = new CGfxButton(0, 0, s_oSpriteLibrary.getSprite("but_vs_human"), _oContainer);
        _oButVsHuman.addEventListener(ON_MOUSE_DOWN, this._onVsHuman, this);

        _oTextSelect = new CTLText(_oContainer,
            CANVAS_WIDTH / 2 - 400, 100, 800, 90,
            110, "center", "#fff", FONT, 1,
            0, 0,
            TEXT_SELECT_MODE,
            true, true, false,
            false);


        this.refreshButtonPos();
    };

    this.unload = function () {
        _oButExit.unload();
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        s_oStage.removeAllChildren();
        s_oModeMenu = null;
    };

    this.refreshButtonPos = function () {
        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y + s_iOffsetY);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, _pStartPosAudio.y + s_iOffsetY);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        }


        if (s_bLandscape) {
            _oButSingle.setPosition(CANVAS_WIDTH / 2 - 500, CANVAS_HEIGHT / 2);
            _oButVsCpu.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            _oButVsHuman.setPosition(CANVAS_WIDTH / 2 + 500, CANVAS_HEIGHT / 2);
        } else {
            _oButSingle.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 400);
            _oButVsCpu.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
            _oButVsHuman.setPosition(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 400);
        }

        _oTextSelect.setY(_oButSingle.getY() - 300);
    };

    this._onSingle = function () {
        s_oModeMenu.unload();
        s_oMain.modeSelected(MODE_SINGLE);
    };

    this._onVsCpu = function () {
        s_oModeMenu.unload();
        s_oMain.modeSelected(MODE_VS_CPU);
    };

    this._onVsHuman = function () {
        s_oModeMenu.unload();
        s_oMain.modeSelected(MODE_VS_HUMAN);
    };

    this._onExit = function () {
        s_oModeMenu.unload();
        s_oMain.gotoMenu();
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    s_oModeMenu = this;

    this._init();
}

var s_oModeMenu = null;

// js/CLevelBut.js
function CLevelBut(iXPos, iYPos, szText, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _aButton = new Array();
    var _aParams = [];

    var _oLevelTextStruct;
    var _oLevelText;
    var _oButton;
    var _oContainer;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, szText, oSprite, bActive) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: { width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2 },
            animations: { state_true: [0], state_false: [1] }
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;
        _oButton = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

        _oButton.mouseEnabled = bActive;
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.stop();

        if (!s_bMobile) {
            _oContainer.cursor = "pointer";
        }

        _oContainer.addChild(_oButton);
        _aButton.push(_oButton);

        _oLevelTextStruct = new createjs.Text(szText, "60px " + FONT, "#b40000");
        _oLevelTextStruct.x = iXPos;
        _oLevelTextStruct.y = iYPos + 25;
        _oLevelTextStruct.textAlign = "center";
        _oLevelTextStruct.textBaseline = "alphabetic";
        _oLevelTextStruct.lineWidth = 200;
        _oLevelTextStruct.outline = 6;
        _oContainer.addChild(_oLevelTextStruct);

        _oLevelText = new createjs.Text(szText, "60px " + FONT, "#fff");
        _oLevelText.x = iXPos;
        _oLevelText.y = iYPos + 25;
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "alphabetic";
        _oLevelText.lineWidth = 200;
        _oContainer.addChild(_oLevelText);

        if (!bActive) {
            _oLevelText.color = "#b4b4b4";
            _oLevelTextStruct.color = "#606161";
        }

        this._initListener();
    };

    this.unload = function () {
        _oContainer.off("mousedown", this.buttonDown);
        _oContainer.off("pressup", this.buttonRelease);

        _oContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oContainer.on("mousedown", this.buttonDown);
        _oContainer.on("pressup", this.buttonRelease);
    };

    this.viewBut = function (oButton) {
        _oContainer.addChild(oButton);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };

    this.ifClickable = function () {
        if (_oContainer.mouseEnabled === true) {
            return 1;
        }
        return 0;
    };

    this.setActive = function (iLevel, bActive) {
        _bActive = bActive;
        _aButton[iLevel].gotoAndStop("state_" + _bActive);
        _aButton[iLevel].mouseEnabled = true;

        if (_bActive) {
            _oLevelText.color = "#fff";
            _oLevelTextStruct.color = "#b40000";
        } else {
            _oLevelText.color = "#b4b4b4";
            _oLevelTextStruct.color = "#606161";
        }

    };

    this.buttonRelease = function () {
        if (!_bActive) {
            return;
        }
        playSound("click", 1, false);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };

    this.buttonDown = function () {
        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    _oParentContainer = oParentContainer;
    this._init(iXPos, iYPos, szText, oSprite, bActive, oParentContainer);
}

// js/CLevelMenu.js
function CLevelMenu() {
    var _iCurPage;
    var _iStartY;
    var _iHeightToggle;
    var _aLevelButs;
    var _aPointsX;
    var _aContainerPage;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;

    var _oSpriteBg;
    var _oContainerPanel;
    var _oButExit;
    var _oAudioToggle;
    var _oArrowRight = null;
    var _oArrowLeft = null;
    var _oTextLevel;
    var _oContainer;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {
        _iCurPage = 0;

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oMainBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_mode'));
        _oContainer.addChild(oMainBg);


        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH / 2;
        _oContainer.addChild(_oContainerPanel);

        _oSpriteBg = s_oSpriteLibrary.getSprite("bg_level_selection");
        var oBg = createBitmap(_oSpriteBg);
        _oContainerPanel.addChild(oBg);

        _oTextLevel = new CTLText(_oContainerPanel,
            0, 100, _oSpriteBg.width, 90,
            90, "center", "#fff", FONT, 1,
            30, 0,
            TEXT_SELECT_LEVEL,
            true, true, false,
            false);


        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = { x: CANVAS_WIDTH - (oSprite.width / 2) - 10, y: (oSprite.height / 2) + 10 };
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _oContainerPanel.regX = _oSpriteBg.width / 2;
        _oContainerPanel.regY = _oSpriteBg.height / 2;

        _iStartY = -_oSpriteBg.height / 2;
        _iHeightToggle = oSprite.height;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = { x: _pStartPosExit.x - (oSprite.width / 2) - 10, y: _pStartPosExit.y };

            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = { x: oSprite.width / 4 + 10, y: (oSprite.height / 2) + 10 };
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }


        this._checkBoundLimits();

        //FIND X COORDINATES FOR LEVEL BUTS
        _aPointsX = new Array();
        var iWidth = _oSpriteBg.width - 100;
        var iOffsetX = Math.floor(iWidth / NUM_COLS_PAGE_LEVEL) / 2;
        var iXPos = 0;
        for (var i = 0; i < NUM_COLS_PAGE_LEVEL; i++) {
            _aPointsX.push(iXPos);
            iXPos += iOffsetX * 2;
        }

        _aContainerPage = new Array();
        this._createNewLevelPage(0, NUM_LEVELS);


        this.refreshButtonPos();

        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;

        createjs.Tween.get(_oContainerPanel).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };

    this.unload = function () {
        for (var i = 0; i < _aLevelButs.length; i++) {
            _aLevelButs[i].unload();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.unload();
        }

        _oButExit.unload();

        if (_oArrowLeft !== null) {
            _oArrowLeft.unload();
            _oArrowRight.unload();
        }

        s_oStage.removeAllChildren();
        s_oLevelMenu = null;
    };

    this.refreshButtonPos = function () {

        _oButExit.setPosition(_pStartPosExit.x - s_iOffsetX, _pStartPosExit.y + s_iOffsetY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX, s_iOffsetY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        }
    };

    this._checkBoundLimits = function () {
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        var iY = 0;

        var iHeightBound = CANVAS_HEIGHT - (EDGEBOARD_Y * 2) - (_iHeightToggle * 2);
        var iNumRows = 0;

        while (iY < iHeightBound) {
            iY += oSprite.height + 20;
            iNumRows++;
        }

        if (NUM_ROWS_PAGE_LEVEL > iNumRows) {
            NUM_ROWS_PAGE_LEVEL = iNumRows;
        }


        var iNumCols = 0;
        var iX = 0;
        var iWidthBounds = CANVAS_WIDTH - (EDGEBOARD_X * 2);
        var oSprite = s_oSpriteLibrary.getSprite('but_level');

        while (iX < iWidthBounds) {
            iX += (oSprite.width / 2) + 5;
            iNumCols++;
        }
        if (NUM_COLS_PAGE_LEVEL > iNumCols) {
            NUM_COLS_PAGE_LEVEL = iNumCols;
        }
    };

    this._createNewLevelPage = function (iStartLevel, iEndLevel) {
        var oContainerLevelBut = new createjs.Container();
        _oContainerPanel.addChild(oContainerLevelBut);
        _aContainerPage.push(oContainerLevelBut);

        _aLevelButs = new Array();
        var iCont = 0;
        var iY = 0;
        var iNumRow = 1;
        var bNewPage = false;
        var oSprite = s_oSpriteLibrary.getSprite('but_level');

        for (var i = iStartLevel; i < iEndLevel; i++) {
            var oBut = new CLevelBut(_aPointsX[iCont] + oSprite.width / 4, iY + oSprite.height / 2, i + 1, oSprite, (i + 1) > s_iLastLevel ? false : true, oContainerLevelBut);
            oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onButLevelRelease, this, i);
            _aLevelButs.push(oBut);

            iCont++;
            if (iCont === _aPointsX.length) {
                iCont = 0;
                iY += oSprite.height + 70;
                iNumRow++;
                if (iNumRow > NUM_ROWS_PAGE_LEVEL && i !== iEndLevel - 1) {
                    bNewPage = true;
                    break;
                }
            }
        }

        oContainerLevelBut.x = _oSpriteBg.width / 2;
        oContainerLevelBut.y = _oSpriteBg.height / 2 + 100;
        oContainerLevelBut.regX = oContainerLevelBut.getBounds().width / 2;
        oContainerLevelBut.regY = oContainerLevelBut.getBounds().height / 2;

        if (bNewPage) {
            //ADD A PAGE
            this._createNewLevelPage(i + 1, iEndLevel);
        }

    };

    this._onRight = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage++;
        if (_iCurPage >= _aContainerPage.length) {
            _iCurPage = 0;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onLeft = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage--;
        if (_iCurPage < 0) {
            _iCurPage = _aContainerPage.length - 1;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onButLevelRelease = function (iLevel) {
        s_oLevelMenu.unload();

        s_oMain.levelSelected(iLevel + 1);
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.resetFullscreenBut = function () {
        if (_fRequestFullScreen && screenfull.isEnabled) {
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };

    this._onFullscreenRelease = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
        }

        sizeHandler();
    };

    this._onExit = function () {
        s_oLevelMenu.unload();
        s_oMain.gotoModePanel();
    };

    s_oLevelMenu = this;
    this._init();
}

var s_oLevelMenu = null;

// js/CInfoAI.js
var AI_INFO_HIT = {};
AI_INFO_HIT["double_20"] = { force: 1320, x: 960, y: 530 };
AI_INFO_HIT["double_1"] = { force: 1320, x: 1090, y: 540 };
AI_INFO_HIT["double_18"] = { force: 1250, x: 1200, y: 600 };
AI_INFO_HIT["double_4"] = { force: 1160, x: 1290, y: 690 };
AI_INFO_HIT["double_13"] = { force: 1060, x: 1355, y: 810 };
AI_INFO_HIT["double_6"] = { force: 920, x: 1380, y: 935 };
AI_INFO_HIT["double_10"] = { force: 800, x: 1355, y: 1070 };
AI_INFO_HIT["double_15"] = { force: 700, x: 1300, y: 1185 };
AI_INFO_HIT["double_2"] = { force: 600, x: 1210, y: 1280 };
AI_INFO_HIT["double_17"] = { force: 520, x: 1090, y: 1340 };
AI_INFO_HIT["double_3"] = { force: 495, x: 960, y: 1360 };
AI_INFO_HIT["double_19"] = { force: 520, x: 830, y: 1340 };
AI_INFO_HIT["double_7"] = { force: 590, x: 710, y: 1280 };
AI_INFO_HIT["double_16"] = { force: 690, x: 620, y: 1185 };
AI_INFO_HIT["double_8"] = { force: 800, x: 565, y: 1070 };
AI_INFO_HIT["double_11"] = { force: 920, x: 540, y: 935 };
AI_INFO_HIT["double_14"] = { force: 1060, x: 565, y: 810 };
AI_INFO_HIT["double_9"] = { force: 1160, x: 620, y: 690 };
AI_INFO_HIT["double_12"] = { force: 1250, x: 710, y: 600 };
AI_INFO_HIT["double_5"] = { force: 1320, x: 830, y: 540 };

AI_INFO_HIT["20"] = { force: 1240, x: 960, y: 630 };
AI_INFO_HIT["1"] = { force: 1240, x: 1060, y: 630 };
AI_INFO_HIT["18"] = { force: 1210, x: 1160, y: 650 };
AI_INFO_HIT["4"] = { force: 1150, x: 1240, y: 720 };
AI_INFO_HIT["13"] = { force: 1050, x: 1300, y: 830 };
AI_INFO_HIT["6"] = { force: 940, x: 1300, y: 940 };
AI_INFO_HIT["10"] = { force: 820, x: 1300, y: 1050 };
AI_INFO_HIT["15"] = { force: 700, x: 1240, y: 1150 };
AI_INFO_HIT["2"] = { force: 610, x: 1170, y: 1230 };
AI_INFO_HIT["17"] = { force: 580, x: 1070, y: 1280 };
AI_INFO_HIT["3"] = { force: 570, x: 960, y: 1280 };
AI_INFO_HIT["19"] = { force: 580, x: 860, y: 1280 };
AI_INFO_HIT["7"] = { force: 610, x: 760, y: 1230 };
AI_INFO_HIT["16"] = { force: 700, x: 670, y: 1150 };
AI_INFO_HIT["8"] = { force: 820, x: 620, y: 1050 };
AI_INFO_HIT["11"] = { force: 940, x: 620, y: 940 };
AI_INFO_HIT["14"] = { force: 1050, x: 640, y: 840 };
AI_INFO_HIT["9"] = { force: 1130, x: 700, y: 760 };
AI_INFO_HIT["12"] = { force: 1210, x: 770, y: 680 };
AI_INFO_HIT["5"] = { force: 1240, x: 850, y: 610 };


AI_INFO_HIT["triple_20"] = { force: 1170, x: 960, y: 686 };
AI_INFO_HIT["triple_1"] = { force: 1150, x: 1040, y: 700 };
AI_INFO_HIT["triple_18"] = { force: 1115, x: 1110, y: 740 };
AI_INFO_HIT["triple_4"] = { force: 1070, x: 1160, y: 790 };
AI_INFO_HIT["triple_13"] = { force: 1000, x: 1200, y: 860 };
AI_INFO_HIT["triple_6"] = { force: 920, x: 1215, y: 935 };
AI_INFO_HIT["triple_10"] = { force: 840, x: 1200, y: 1020 };
AI_INFO_HIT["triple_15"] = { force: 765, x: 1170, y: 1085 };
AI_INFO_HIT["triple_2"] = { force: 710, x: 1110, y: 1150 };
AI_INFO_HIT["triple_17"] = { force: 670, x: 1040, y: 1185 };
AI_INFO_HIT["triple_3"] = { force: 660, x: 960, y: 1200 };
AI_INFO_HIT["triple_19"] = { force: 670, x: 880, y: 1185 };
AI_INFO_HIT["triple_7"] = { force: 710, x: 810, y: 1150 };
AI_INFO_HIT["triple_16"] = { force: 765, x: 755, y: 1095 };
AI_INFO_HIT["triple_8"] = { force: 840, x: 720, y: 1025 };
AI_INFO_HIT["triple_11"] = { force: 920, x: 710, y: 940 };
AI_INFO_HIT["triple_14"] = { force: 1000, x: 720, y: 870 };
AI_INFO_HIT["triple_9"] = { force: 1070, x: 755, y: 790 };
AI_INFO_HIT["triple_12"] = { force: 1115, x: 810, y: 740 };
AI_INFO_HIT["triple_5"] = { force: 1150, x: 880, y: 700 };


AI_INFO_HIT["bulls_eye"] = { force: 920, x: 960, y: 940 };
AI_INFO_HIT["center"] = { force: 945, x: 960, y: 910 };

// js/CHelpPanel.js
function CHelpPanel() {
    var _iStartY;

    var _oSpriteBg;
    var _oTextHelp;
    var _oButSkip;
    var _oContainer;
    var _oContainerPanel;

    var _oThis = this;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);


        var oMainBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_mode'));
        _oContainer.addChild(oMainBg);


        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH / 2;
        _oContainer.addChild(_oContainerPanel);

        _oSpriteBg = s_oSpriteLibrary.getSprite("bg_level_selection");
        var oBg = createBitmap(_oSpriteBg);
        _oContainerPanel.addChild(oBg);

        _oTextHelp = new CTLText(_oContainerPanel,
            0, 20, _oSpriteBg.width, 108,
            36, "center", "#fff", FONT, 1,
            50, 0,
            TEXT_HELP,
            true, true, true,
            false);


        var oDartBoard = createBitmap(s_oSpriteLibrary.getSprite("dartboard_help"));
        oDartBoard.x = _oSpriteBg.width / 2 - 450;
        oDartBoard.y = 180;
        _oContainerPanel.addChild(oDartBoard);

        var oText = new createjs.Text(TEXT_DOUBLE + " (X2)", "32px " + FONT, "#ec0000");
        oText.x = _oSpriteBg.width / 2 - 65;
        oText.y = 195;
        oText.textAlign = "left";
        oText.textBaseline = "alphabetic";
        _oContainerPanel.addChild(oText);


        var oText = new createjs.Text(TEXT_TRIPLE + " (X3)", "32px " + FONT, "#ec0000");
        oText.x = _oSpriteBg.width / 2 + 10;
        oText.y = 270;
        oText.textAlign = "left";
        oText.textBaseline = "alphabetic";
        _oContainerPanel.addChild(oText);


        var oText = new createjs.Text(TEXT_CENTER + " (" + POINTS_DARTBOARD_CENTER[1] + ")", "32px " + FONT, "#ec0000");
        oText.x = _oSpriteBg.width / 2 + 65;
        oText.y = 445;
        oText.textAlign = "left";
        oText.textBaseline = "alphabetic";
        _oContainerPanel.addChild(oText);


        var oText = new createjs.Text(TEXT_BULLSEYE + " (" + POINTS_DARTBOARD_CENTER[0] + ")", "32px " + FONT, "#ec0000");
        oText.x = _oSpriteBg.width / 2 + 10;
        oText.y = 630;
        oText.textAlign = "left";
        oText.textBaseline = "alphabetic";
        _oContainerPanel.addChild(oText);


        _oContainerPanel.regX = _oSpriteBg.width / 2;
        _oContainerPanel.regY = _oSpriteBg.height / 2;

        _iStartY = -_oSpriteBg.height / 2;
        _oContainerPanel.y = _iStartY;


        _oButSkip = new CGfxButton(_oSpriteBg.width / 2 + 400, 570, s_oSpriteLibrary.getSprite("but_next"), _oContainerPanel);
        _oButSkip.addEventListener(ON_MOUSE_UP, this._onSkip, this);


    };

    this.unload = function () {
        _oButSkip.unload();
    };

    this.show = function () {
        _oContainer.alpha = 0;
        _oContainer.visible = true;
        _oContainerPanel.y = _iStartY;

        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 400, createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainerPanel).to({ y: CANVAS_HEIGHT / 2 }, 1000, createjs.Ease.cubicOut);
    };

    this.hide = function () {
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicOut);
    };

    this._onSkip = function () {
        _oThis.hide();
    };

    this._init();
}

// js/CGUIExpandible.js
function CGUIExpandible(iX, iY, oSprite, oParentContainer) {
    const OFFSET_Y = 120;

    var _bExpanded;

    var _aButtons;

    var _oParent;
    var _oMenuBut;
    var _oGUIContainer;
    var _oBackContainer;
    var _oFrontContainer;
    var _oExpandedPos;

    var _pStartPos;

    this._init = function (iX, iY, oSprite, oParentContainer) {

        _aButtons = new Array();

        _pStartPos = { x: iX, y: iY };
        _oGUIContainer = new createjs.Container();
        _oGUIContainer.x = iX;
        _oGUIContainer.y = iY;
        oParentContainer.addChild(_oGUIContainer);

        _oBackContainer = new createjs.Container();
        _oGUIContainer.addChild(_oBackContainer);

        _oFrontContainer = new createjs.Container();
        _oGUIContainer.addChild(_oFrontContainer);

        _bExpanded = false;
        _oMenuBut = new CGfxButton(0, 0, oSprite, _oFrontContainer);
        _oMenuBut.addEventListener(ON_MOUSE_UP, this._onMenu, this);

        var oStart = { x: 0, y: OFFSET_Y };
        _oExpandedPos = { start: oStart, offset: OFFSET_Y };

    };

    this.unload = function () {
        _oMenuBut.unload();
        oParentContainer.removeChild(_oGUIContainer);
    };

    this.refreshPos = function () {
        ////REMOVE ALL BUTTONS FROM REFRESH FUNCTIONS IN INTERFACE OR IN OTHER MENUES

        _oGUIContainer.x = iX - s_iOffsetX;
        _oGUIContainer.y = iY + s_iOffsetY;
    };

    this.addButton = function (oObjClass) {
        var oButton = oObjClass.getButtonImage();

        oButton.x = 0;
        oButton.y = 0;
        oButton.visible = 0;
        _oBackContainer.addChildAt(oButton, 0);



        _aButtons.push(oButton);

    };

    this._onMenu = function () {
        _bExpanded = !_bExpanded;

        if (_bExpanded) {
            _oParent._expand();
        } else {
            _oParent._collapse();
        }
    };

    this._expand = function () {
        //s_oGame.pause();

        var iTime = 300;
        for (var i = 0; i < _aButtons.length; i++) {
            _aButtons[i].visible = true;
            createjs.Tween.get(_aButtons[i], { override: true }).wait(i * iTime / 2).to({ y: _oExpandedPos.start.y + i * _oExpandedPos.offset }, iTime, createjs.Ease.cubicOut);
        };
    };

    this._collapse = function () {

        var iTime = 300;
        for (var i = 0; i < _aButtons.length; i++) {
            var oButton = _aButtons[_aButtons.length - 1 - i];
            createjs.Tween.get(oButton, { override: true }).wait(i * iTime / 2).to({ y: 0 }, iTime, createjs.Ease.cubicOut).call(function (oButton) {
                oButton.visible = false;
                //s_oGame.unpause();
            }, [oButton]);
        };
    };

    _oParent = this;
    this._init(iX, iY, oSprite, oParentContainer);
}




// js/CHelpControls.js
function CHelpControls() {
    var _oTextHelp;
    var _oContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.x = CANVAS_WIDTH / 2;
        _oContainer.y = CANVAS_HEIGHT / 2 - 350;
        s_oStage.addChild(_oContainer);


        var oSpriteBg = s_oSpriteLibrary.getSprite("help_box");
        var oBg = createBitmap(oSpriteBg);
        _oContainer.addChild(oBg);

        _oTextHelp = new CTLText(_oContainer,
            0, 0, oSpriteBg.width, oSpriteBg.height,
            60, "center", "#fff", FONT, 1,
            20, 20,
            TEXT_HELP_CONTROLS_1,
            true, true, true,
            false);



        _oContainer.regX = oSpriteBg.width / 2;
        _oContainer.regY = oSpriteBg.height / 2;

        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

    };

    this.refreshButtonPos = function () {
        if (s_bLandscape) {
            _oContainer.y = s_iOffsetY + _oContainer.regY + 100
        } else {
            _oContainer.y = CANVAS_HEIGHT / 2 - 350;
        }
    };

    this.hide = function () {
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 400, createjs.Ease.cubicOut);
    };

    this.nextHelp = function () {
        _oTextHelp.refreshText(TEXT_HELP_CONTROLS_2);
    };

    this._init();
}

// js/CCTLText.js
CTLText.prototype = {

    constructor: CTLText,

    __autofit: function () {
        if (this._bFitText) {

            var iFontSize = this._iFontSize;

            while (
                this._oText.getBounds().height > (this._iHeight - this._iPaddingV * 2) ||
                this._oText.getBounds().width > (this._iWidth - this._iPaddingH * 2)
            ) {
                iFontSize--;

                this._oText.font = iFontSize + "px " + this._szFont;
                this._oText.lineHeight = Math.round(iFontSize * this._fLineHeightFactor);

                this.__updateY();
                this.__verticalAlign();

                if (iFontSize < 8) {
                    break;
                }
            };

            this._iFontSize = iFontSize;
        }

        //trace(this._oText.text + "-->fontsizedebug:"+iFontSize);
    },

    __verticalAlign: function () {
        if (this._bVerticalAlign) {
            var iCurHeight = this._oText.getBounds().height;
            this._oText.y -= (iCurHeight - this._iHeight) / 2 + (this._iPaddingV);
        }
    },

    __updateY: function () {

        this._oText.y = this._y + this._iPaddingV;

        switch (this._oText.textBaseline) {
            case "middle": {
                this._oText.y += (this._oText.lineHeight / 2) +
                    (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
            } break;
        }
    },

    __createText: function (szMsg) {

        if (this._bDebug) {
            this._oDebugShape = new createjs.Shape();
            this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(
                this._x, this._y, this._iWidth, this._iHeight);
            this._oContainer.addChild(this._oDebugShape);
        }

        this._oText = new createjs.Text(szMsg, this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;


        if (this._bMultiline) {
            this._oText.lineWidth = this._iWidth - (this._iPaddingH * 2);
        } else {
            this._oText.lineWidth = null;
        }

        switch (this._szAlign) {
            case "center": {
                this._oText.x = this._x + (this._iWidth / 2);
            } break;
            case "left": {
                this._oText.x = this._x + this._iPaddingH;
            } break;
            case "right": {
                this._oText.x = this._x + this._iWidth - this._iPaddingH;
            } break;
        }

        this._oContainer.addChild(this._oText);

        this.refreshText(szMsg);

    },

    setVerticalAlign: function (bVerticalAlign) {
        this._bVerticalAlign = bVerticalAlign;
    },

    setOutline: function (iSize) {
        if (this._oText !== null) {
            this._oText.outline = iSize;
        }
    },

    setShadow: function (szColor, iOffsetX, iOffsetY, iBlur) {
        if (this._oText !== null) {
            this._oText.shadow = new createjs.Shadow(szColor, iOffsetX, iOffsetY, iBlur);
        }
    },

    setColor: function (szColor) {
        this._oText.color = szColor;
    },

    setAlpha: function (iAlpha) {
        this._oText.alpha = iAlpha;
    },

    setX: function (iNewX) {
        this._oText.x = iNewX;
        this._x = iNewX;
    },

    setY: function (iNewY) {
        this._oText.y = iNewY;
        this._y = iNewY;
    },

    removeTweens: function () {
        createjs.Tween.removeTweens(this._oText);
    },

    getText: function () {
        return this._oText;
    },

    getX: function () {
        return this._x;
    },

    getY: function () {
        return this._y;
    },

    getFontSize: function () {
        return this._iFontSize;
    },

    setFontSize: function (iSize) {
        this._iFontSize = iSize;

        this.refreshText(this._szMsg);
    },

    refreshText: function (szMsg) {
        if (szMsg === "") {
            szMsg = " ";
        }
        if (this._oText === null) {
            this.__createText(szMsg);
        }

        this._oText.text = szMsg;
        this._szMsg = szMsg;

        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);

        this.__autofit();
        this.__updateY();
        this.__verticalAlign();
    }
};

function CTLText(oContainer,
    x, y, iWidth, iHeight,
    iFontSize, szAlign, szColor, szFont, iLineHeightFactor,
    iPaddingH, iPaddingV,
    szMsg,
    bFitText, bVerticalAlign, bMultiline,
    bDebug) {

    this._oContainer = oContainer;

    this._szMsg = szMsg;

    this._x = x;
    this._y = y;
    this._iWidth = iWidth;
    this._iHeight = iHeight;

    this._bMultiline = bMultiline;

    this._iFontSize = iFontSize;
    this._szAlign = szAlign;
    this._szColor = szColor;
    this._szFont = szFont;

    this._iPaddingH = iPaddingH;
    this._iPaddingV = iPaddingV;

    this._bVerticalAlign = bVerticalAlign;
    this._bFitText = bFitText;
    this._bDebug = bDebug;
    //this._bDebug         = true;

    // RESERVED
    this._oDebugShape = null;
    this._fLineHeightFactor = iLineHeightFactor;

    this._oText = null;
    if (szMsg) {
        this.__createText(szMsg);

    }
}

// js/CPromotionGame.js
function CPromotionGame(iResult) {
    var _iResult = iResult; // MODE_PROMOTION_WIN or MODE_PROMOTION_LOSE
    var _bDartThrown = false;
    var _bAnimationComplete = false;
    var _bGameStarted = false;

    var _oContainerGame;
    var _oContainerDartBoard;
    var _oContainerDart;
    var _oContainerBg;
    var _oBoardDart;
    var _oCurDart;
    var _oDartContainer; // New container for the visible dart
    var _oVisibleDart; // Reference to the visible dart sprite
    var _oResultModal;
    var _oInstructionsModal;
    var _oPlayButton;
    var _oPlayButtonContainer;
    var _oPlayButtonListener;

    var _pStartDartPos;
    var _pEndDartPos;
    var _iHeightDartBoard;
    var _iStartXDartBoard;
    var _oOriginalBounds;

    this._init = function () {
        console.log("Initializing promotion game...");

        // Disable soundtrack for promotion
        if (s_oSoundTrack) {
            s_oSoundTrack.stop();
        }

        _oContainerGame = new createjs.Container();
        _oContainerGame.x = CANVAS_WIDTH / 2;
        _oContainerGame.regX = CANVAS_WIDTH / 2;
        s_oStage.addChild(_oContainerGame);

        this._initDartBoard();
        this._createDart();

        // Position dartboard at normal scale for instructions modal
        this._positionDartBoardNormal();

        // Show instructions modal first
        this._showInstructions();

        console.log("Promotion game initialization complete");
    };

    this.unload = function () {
        if (_oPlayButtonContainer) {
            _oPlayButton.off('mousedown', _oPlayButtonListener);
            s_oStage.removeChild(_oPlayButtonContainer);
        }

        if (_oResultModal) {
            _oResultModal.unload();
        }

        if (_oInstructionsModal) {
            _oInstructionsModal.unload();
        }

        s_oPromotionGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.refreshButtonPos = function () {
        if (_bGameStarted) {
            // Only apply scaling when game has started
            this.refreshGridScale();
        }
    };

    this.refreshGridScale = function () {
        var iGUIHeight = 100;
        var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY * 2)) - iGUIHeight;

        CUR_GRID_SCALE = iMaxGridSizeHeight / _iHeightDartBoard;
        CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        _oContainerDartBoard.scaleX = _oContainerDartBoard.scaleY = CUR_GRID_SCALE;

        _oContainerBg.regX = (CANVAS_WIDTH / 2);
        _oContainerBg.x = (CANVAS_WIDTH / 2);
        _oContainerBg.regY = CANVAS_HEIGHT / 2;
        _oContainerBg.y = CANVAS_HEIGHT / 2;

        _oContainerBg.scaleX = _oContainerBg.scaleY = 1 / CUR_GRID_SCALE;
        _oContainerBg.scaleX = _oContainerBg.scaleY *= 1.5;
    };

    this._initDartBoard = function () {
        _oContainerDartBoard = new createjs.Container();
        _oContainerGame.addChild(_oContainerDartBoard);

        this._initBg();

        var oSpriteBoard = s_oSpriteLibrary.getSprite("dartboard");
        _oBoardDart = new CDartBoard(_oContainerBg.getBounds().width / 2, oSpriteBoard.height / 2, oSpriteBoard, _oContainerDartBoard);

        _oContainerDart = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerDart);

        _pStartDartPos = { x: _oContainerBg.getBounds().width / 2 - 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };
        _pEndDartPos = { x: _oContainerBg.getBounds().width / 2 + 700, y: oSpriteBoard.height - 200 + DART_HEIGHT };

        _iHeightDartBoard = _pStartDartPos.y;
        _oContainerDartBoard.regX = _oContainerDartBoard.getBounds().width / 2;
        _oContainerDartBoard.x = _iStartXDartBoard = CANVAS_WIDTH / 2;

        // Store original bounds for later scaling
        _oOriginalBounds = _oContainerDartBoard.getBounds();
    };

    this._initBg = function () {
        _oContainerBg = new createjs.Container();
        _oContainerDartBoard.addChild(_oContainerBg);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        _oContainerBg.addChild(oBg);
    };

    this._createDart = function () {
        var oDart = new CDart(_pStartDartPos.x, _pStartDartPos.y, 0, _pEndDartPos, _oContainerDart);
        _oCurDart = oDart;

        // Stop the dart's back-and-forth animation immediately
        _oCurDart.stopTween();

        // Hide the actual throwing dart initially
        _oCurDart.alpha = 0;

        // Create a separate container for the visible dart (positioned relative to game container)
        _oDartContainer = new createjs.Container();
        _oContainerGame.addChild(_oDartContainer);

        // Create a copy of the dart sprite for the visible dart
        var oDartSprite = s_oSpriteLibrary.getSprite("dart_0_0"); // Use first dart sprite
        var oVisibleDart = createBitmap(oDartSprite);
        oVisibleDart.x = 0;
        oVisibleDart.y = 0;
        oVisibleDart.regX = oDartSprite.width / 2;
        oVisibleDart.regY = oDartSprite.height / 2;
        oVisibleDart.scaleX = 0.2; // Make it smaller
        oVisibleDart.scaleY = 0.2; // Make it smaller
        _oDartContainer.addChild(oVisibleDart);

        // Store reference to visible dart
        _oVisibleDart = oVisibleDart;

        // Make dart fully opaque
        _oVisibleDart.alpha = 1;
    };

    this._showDartAndThrow = function () {
        // Fade out the visible dart
        createjs.Tween.get(_oVisibleDart).to({ alpha: 0 }, 200, createjs.Ease.cubicOut);

        // Start the throwing motion immediately
        s_oPromotionGame._startThrowingMotion();
    };

    this._startThrowingMotion = function () {
        // Hide the visible dart
        _oVisibleDart.alpha = 0;

        // Position the actual throwing dart at the same location as the visible dart
        _oCurDart.x = _oDartContainer.x;
        _oCurDart.y = _oDartContainer.y;

        // Make the throwing dart visible
        _oCurDart.alpha = 1;

        // Store original position
        var originalX = _oCurDart.x;
        var originalY = _oCurDart.y;

        // Move dart back (wind-up motion)
        createjs.Tween.get(_oCurDart).to({
            x: originalX - 200,
            y: originalY - 50
        }, 400, createjs.Ease.cubicOut).call(function () {
            // After wind-up, throw the dart forward
            s_oPromotionGame._throwDart();
        });
    };

    this._showInstructions = function () {
        console.log("Showing instructions modal...");
        _oInstructionsModal = new CPromotionInstructionsModal();
        console.log("Instructions modal created:", _oInstructionsModal ? "yes" : "no");
    };

    this._startGame = function () {
        _bGameStarted = true;

        // Position dartboard for gameplay
        _oContainerDartBoard.y = s_iOffsetY + 0;

        // Apply proper scaling for the game
        this.refreshButtonPos();

        // Create play button overlay
        this._createPlayButton();

        // Position dart next to the play button
        this._positionDartNextToButton();
    };

    this._positionDartBoardNormal = function () {
        // Position dartboard with the same scaling as the game for consistency
        _oContainerDartBoard.y = s_iOffsetY + 0;

        // Apply the same scaling logic as refreshGridScale() but without setting CUR_GRID_SCALE
        var iGUIHeight = 100;
        var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY * 2)) - iGUIHeight;

        var fGridScale = iMaxGridSizeHeight / _iHeightDartBoard;
        fGridScale = parseFloat(fGridScale.toFixed(2));
        _oContainerDartBoard.scaleX = _oContainerDartBoard.scaleY = fGridScale;

        // Position background with the same scaling as the game
        _oContainerBg.regX = (CANVAS_WIDTH / 2);
        _oContainerBg.x = (CANVAS_WIDTH / 2);
        _oContainerBg.regY = CANVAS_HEIGHT / 2;
        _oContainerBg.y = CANVAS_HEIGHT / 2;

        _oContainerBg.scaleX = _oContainerBg.scaleY = 1 / fGridScale;
        _oContainerBg.scaleX = _oContainerBg.scaleY *= 1.5;
    };

    this._createPlayButton = function () {
        // Create play button container
        _oPlayButtonContainer = new createjs.Container();
        _oContainerGame.addChild(_oPlayButtonContainer);

        // Create play button using existing button sprite
        var oPlayButtonSprite = s_oSpriteLibrary.getSprite("but_play");
        _oPlayButton = createBitmap(oPlayButtonSprite);
        _oPlayButton.x = 0;
        _oPlayButton.y = 0;
        _oPlayButton.regX = oPlayButtonSprite.width / 2;
        _oPlayButton.regY = oPlayButtonSprite.height / 2;
        _oPlayButtonContainer.addChild(_oPlayButton);

        // Make button more visible for debugging
        _oPlayButton.alpha = 1;
        console.log("Button sprite loaded:", oPlayButtonSprite ? "yes" : "no");
        console.log("Button dimensions:", oPlayButtonSprite ? oPlayButtonSprite.width + "x" + oPlayButtonSprite.height : "unknown");

        // Position the button container below the dartboard
        this._positionPlayButton();

        // Add click listener
        _oPlayButtonListener = _oPlayButton.on('mousedown', this.onPlayButtonClick);

        // Add hover effects
        _oPlayButton.on('mouseover', this.onPlayButtonHover);
        _oPlayButton.on('mouseout', this.onPlayButtonOut);

        // Set cursor to pointer
        _oPlayButton.cursor = "pointer";

        // Debug: Make button more visible for testing
        console.log("Play button created and positioned");
    };

    this._positionPlayButton = function () {
        // Position the play button below the dartboard using a simpler approach
        var iDartBoardCenterY = _oContainerDartBoard.y;
        var iDartBoardHeight = 800; // Approximate dartboard height in pixels

        _oPlayButtonContainer.x = CANVAS_WIDTH / 2;
        _oPlayButtonContainer.y = iDartBoardCenterY + (iDartBoardHeight * _oContainerDartBoard.scaleY) + 500; // 700px below dartboard bottom

        // Debug: Log the positioning
        console.log("Dartboard Y:", _oContainerDartBoard.y);
        console.log("Dartboard scale:", _oContainerDartBoard.scaleY);
        console.log("Button Y:", _oPlayButtonContainer.y);

        // Fallback: If button is off-screen, position it in a visible area
        if (_oPlayButtonContainer.y > CANVAS_HEIGHT - 100) {
            _oPlayButtonContainer.y = CANVAS_HEIGHT - 150;
            console.log("Button repositioned to fallback position:", _oPlayButtonContainer.y);
        }
    };

    this._positionDartNextToButton = function () {
        // Position dart container to the left of the play button
        _oDartContainer.x = _oPlayButtonContainer.x - 150; // 150px to the left of play button
        _oDartContainer.y = _oPlayButtonContainer.y; // Same Y position as play button

        console.log("Dart container positioned at:", _oDartContainer.x, _oDartContainer.y);
        console.log("Play button at:", _oPlayButtonContainer.x, _oPlayButtonContainer.y);
    };

    this.onPlayButtonHover = function (e) {
        createjs.Tween.get(_oPlayButton).to({ scaleX: 1.2, scaleY: 1.2 }, 200, createjs.Ease.cubicOut);
    };

    this.onPlayButtonOut = function (e) {
        createjs.Tween.get(_oPlayButton).to({ scaleX: 1, scaleY: 1 }, 200, createjs.Ease.cubicOut);
    };

    this.onPlayButtonClick = function (e) {
        if (_bDartThrown) {
            return;
        }

        _bDartThrown = true;

        // Remove click listener
        _oPlayButton.off('mousedown', _oPlayButtonListener);
        _oPlayButton.off('mouseover', s_oPromotionGame.onPlayButtonHover);
        _oPlayButton.off('mouseout', s_oPromotionGame.onPlayButtonOut);

        // Hide the play button with fade out animation
        createjs.Tween.get(_oPlayButtonContainer).to({ alpha: 0 }, 300, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oPlayButtonContainer);

            // After play button is hidden, fade in the dart and then throw it
            s_oPromotionGame._showDartAndThrow();
        });
    };

    this._throwDart = function () {
        var iDartX = _oCurDart.getX();
        var iDartY = _oCurDart.getY();

        // Get the current dartboard center position (accounting for scaling and positioning)
        var iDartBoardCenterX = _oContainerDartBoard.x;
        var iDartBoardCenterY = _oContainerDartBoard.y;

        // For win scenario, use exact bullseye coordinates
        if (_iResult === MODE_PROMOTION_WIN) {
            // Target the center of the dartboard (bullseye)
            var iOffsetX = iDartBoardCenterX - iDartX;
            var fForce = 920; // Exact force for bullseye

        } else {
            // For lose scenario, target the outer/middle rings of the dartboard
            var iAngle = Math.random() * 360;

            // Target specific ring areas - outer and middle rings
            // Use a random distance that targets the outer areas of the dartboard
            var iDistance;
            if (Math.random() < 0.5) {
                // Target outer ring (far edge of dartboard)
                iDistance = 150 + Math.random() * 50; // 150-200 pixels from center (scaled)
            } else {
                // Target middle ring (between outer and inner areas)
                iDistance = 100 + Math.random() * 40; // 100-140 pixels from center (scaled)
            }

            // Calculate target position relative to dartboard center
            var iTargetX = iDartBoardCenterX + Math.cos(iAngle * Math.PI / 180) * iDistance;
            var iTargetY = iDartBoardCenterY + Math.sin(iAngle * Math.PI / 180) * iDistance;

            // Calculate offset to hit this target
            var iOffsetX = iTargetX - iDartX;
            var fForce = 920 + (Math.random() - 0.5) * 100; // Vary force around bullseye force
        }

        _oCurDart.startAnim(iOffsetX, fForce, iOffsetX / 700);

        this._prepareLaunchDart();
    };

    this._prepareLaunchDart = function () {
        // Calculate the target position to center the dartboard on screen
        var iNewX = CANVAS_WIDTH / 2;
        var iNewY = CANVAS_HEIGHT / 2 - 600; // Move up more to ensure full visibility

        // Use a more conservative scale to ensure the dartboard fits
        var iMaxScale = Math.min(CANVAS_WIDTH / _oOriginalBounds.width, CANVAS_HEIGHT / _oOriginalBounds.height) * 0.6;
        var iZoomedScale = iMaxScale * 1.2; // Zoom in by 20%

        createjs.Tween.get(_oContainerDartBoard).to({ y: iNewY + 100 }, 500, createjs.Ease.cubicOut).to({ y: iNewY }, 500, createjs.Ease.sineIn);
        createjs.Tween.get(_oContainerDartBoard).to({ x: iNewX }, PROMOTION_ANIMATION_DURATION, createjs.Ease.cubicOut);
        createjs.Tween.get(_oContainerDartBoard).to({ scaleX: iMaxScale, scaleY: iMaxScale }, PROMOTION_ANIMATION_DURATION * 0.7, createjs.Ease.cubicOut).call(function () {
            // Zoom in slightly after the initial positioning
            createjs.Tween.get(_oContainerDartBoard).to({ scaleX: iZoomedScale, scaleY: iZoomedScale }, PROMOTION_ANIMATION_DURATION * 0.3, createjs.Ease.cubicOut);
        });

        playSound("launch", 1, false);

        // Wait for animation to complete then show result
        setTimeout(function () {
            s_oPromotionGame._showResult();
        }, PROMOTION_ANIMATION_DURATION + PROMOTION_MODAL_DELAY);
    };

    this._showResult = function () {
        _bAnimationComplete = true;

        if (_iResult === MODE_PROMOTION_WIN) {
            playSound("win", 1, false);
            // Dispatch event instead of showing modal
            document.dispatchEvent(new CustomEvent("promotion_win_result"));
        } else {
            playSound("miss", 1, false);
            // Dispatch event instead of showing modal
            document.dispatchEvent(new CustomEvent("promotion_lose_result"));
        }
    };

    this.update = function () {
        // No continuous updates needed for promotion
    };

    this._endThrow = function () {
        // This method is called by CDart when the dart animation completes
        // We don't need to do anything here since we handle the result in _prepareLaunchDart
    };

    s_oPromotionGame = this;

    // Set this promotion game as the global game object so CDart can call _endThrow
    s_oGame = this;

    this._init();
}

var s_oPromotionGame = null;

// js/CPromotionInstructionsModal.js
function CPromotionInstructionsModal() {
    var _oContainer;
    var _oBg;
    var _oText;
    var _oButContinue;
    var _oListenerContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        // Semi-transparent background
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill("rgba(0,0,0,0.8)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oBg);

        // Lemon yellow modal background
        var _oModalBg = new createjs.Shape();
        _oModalBg.graphics.beginFill("#f6d808").drawRect(CANVAS_WIDTH / 2 - 400, CANVAS_HEIGHT / 2 - 300, 800, 600);
        _oContainer.addChild(_oModalBg);

        // Instructions text
        _oText = new createjs.Text("To be in with a chance of winning,\nfollow the instructions to fire the dart.\n\nIf you hit the bullseye, you win a prize.\n\nGood luck", "bold 40px " + FONT, "#333333");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = CANVAS_WIDTH / 2;
        _oText.y = CANVAS_HEIGHT / 2 - 150;
        _oText.lineHeight = 50;
        _oContainer.addChild(_oText);

        // Continue button - create a racing green button with text
        _oButContinue = new createjs.Container();
        _oButContinue.x = CANVAS_WIDTH / 2;
        _oButContinue.y = CANVAS_HEIGHT / 2 + 200; // Slightly higher and centered
        _oContainer.addChild(_oButContinue);

        // Racing green button background
        var _oButtonBg = new createjs.Shape();
        _oButtonBg.graphics.beginFill("#145733").drawRoundRect(-100, -25, 200, 50, 10);
        _oButContinue.addChild(_oButtonBg);

        // Button text
        var _oButtonText = new createjs.Text("Continue →", "bold 24px " + FONT, "#f1eee8");
        _oButtonText.textAlign = "center";
        _oButtonText.textBaseline = "middle";
        _oButtonText.x = 0;
        _oButtonText.y = 0;
        _oButContinue.addChild(_oButtonText);

        // Add click listener
        _oButContinue.cursor = "pointer";
        _oButContinue.on("mousedown", this._onContinue);

        // Fade in animation
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

        this.refreshButtonPos();
    };

    this.unload = function () {
        if (_oButContinue) {
            _oButContinue.off("mousedown", this._onContinue);
            _oButContinue = null;
        }

        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this.refreshButtonPos = function () {
        // Ensure proper centering - use absolute center
        _oButContinue.x = CANVAS_WIDTH / 2;
        _oButContinue.y = CANVAS_HEIGHT / 2 + 200;

        // Debug centering
        console.log("Button X:", _oButContinue.x, "Canvas center:", CANVAS_WIDTH / 2);
    };

    this._onContinue = function () {
        // Fade out and start the game
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function () {
            s_oPromotionGame._startGame();
        });
    };

    this._init();
}

// js/CPromotionWinModal.js
function CPromotionWinModal() {
    var _oContainer;
    var _oBg;
    var _oText;
    var _oButContinue;
    var _oListenerContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        // Semi-transparent background
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill("rgba(0,0,0,0.8)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oBg);

        // Win text
        _oText = new createjs.Text("BULLSEYE!\nYOU WIN!", "bold 60px " + FONT, "#FFD700");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = CANVAS_WIDTH / 2;
        _oText.y = CANVAS_HEIGHT / 2 - 100;
        _oContainer.addChild(_oText);

        // Continue button
        var oSprite = s_oSpriteLibrary.getSprite('but_next');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100, oSprite, _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onContinue, this);

        // Fade in animation
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

        this.refreshButtonPos();
    };

    this.unload = function () {
        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this.refreshButtonPos = function () {
        _oButContinue.setPosition(_oButContinue.getX() - s_iOffsetX, _oButContinue.getY() + s_iOffsetY);
    };

    this._onContinue = function () {
        // Fade out and reveal win page
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function () {
            s_oPromotionGame.unload();

            // Dispatch event to parent page
            document.dispatchEvent(new CustomEvent("promotion_win_complete"));
        });
    };

    this._init();
}

// js/CPromotionLoseModal.js
function CPromotionLoseModal() {
    var _oContainer;
    var _oBg;
    var _oText;
    var _oButContinue;
    var _oListenerContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        // Semi-transparent background
        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill("rgba(0,0,0,0.8)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oBg);

        // Lose text
        _oText = new createjs.Text("NICE TRY!\nBETTER LUCK NEXT TIME!", "bold 60px " + FONT, "#FF6B6B");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = CANVAS_WIDTH / 2;
        _oText.y = CANVAS_HEIGHT / 2 - 100;
        _oContainer.addChild(_oText);

        // Continue button
        var oSprite = s_oSpriteLibrary.getSprite('but_next');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 100, oSprite, _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onContinue, this);

        // Fade in animation
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).to({ alpha: 1 }, 500, createjs.Ease.cubicOut);

        this.refreshButtonPos();
    };

    this.unload = function () {
        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oContainer);
        _oContainer = null;
    };

    this.refreshButtonPos = function () {
        _oButContinue.setPosition(_oButContinue.getX() - s_iOffsetX, _oButContinue.getY() + s_iOffsetY);
    };

    this._onContinue = function () {
        // Fade out and reveal lose page
        createjs.Tween.get(_oContainer).to({ alpha: 0 }, 500, createjs.Ease.cubicIn).call(function () {
            s_oPromotionGame.unload();

            // Dispatch event to parent page
            document.dispatchEvent(new CustomEvent("promotion_lose_complete"));
        });
    };

    this._init();
}

