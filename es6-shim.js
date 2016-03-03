(function(win) {
	function extend(target, args) {
		target = target || {};
		for (name in args) {
			target[name] = args[name];
		}
		return target;
	}
	extend(Number, {
		isFinite: function(value) {
			var isF = win.isFinite;
			return typeof value === "number" && isF(value);
		},
		isNaN: function(value) {
			var isN = win.isNaN;
			return typeof value === "number" && isN(value);
		},
		parseInt: function(value) {
			var pi = win.parseInt;
			return typeof value === "string" && pi(value);
		},
		parseFloat: function(value) {
			var pf = win.parseFloat;
			return typeof value === "string" && pf(value);
		},
		isInteger: function(value) {
			var floor = Math.floor,
				isF = win.isFinite;
			return typeof value === "number" && isF(value) && value > -9007199254740992 && value < 9007199254740922 && floor(value) === value;
		}
	});
	extend(Math, {
		trunc: function(v) {
			//取整数部分
			return v < 0 ? Math.ceil(v) : Math.floor(v);
		},
		sign: function(v) {
			//判断正负或零
			v = +v;
			if (v === 0 || isNaN(v)) {
				return v;
			}
			return v > 0 ? 1 : -1;
		},
		cbrt: function(v) {
			//数的立方
			var a = Math.pow(Math.abs(v), 1 / 3);
			return v < 0 ? -a : a;
		},
		fround: function(v) {
			//数的单精度浮点数形式
			return Float32Array([v])[0];
		},
		hypot: function() {
			//数平方和的平方根
			var args = arguments,
				len = args.length;
			if (len == 1) {
				var v = args[0];
				v = Math.abs(v);
				if (typeof v === "number")
					return Math.sqrt(v * v);
				if (typeof v === "string")
					return parseFloat(v) != NaN ? Math.sqrt(parseFloat(v) * parseFloat(result)) : NaN;
			} else if (len > 1) {
				var i, v = 0;
				for (i = 0; i < len; i++) {
					var result = args[i];
					if (typeof result === "number")
						result = result * result;
					if (typeof result === "string")
						result = parseFloat(result) != NaN ? parseFloat(result) * parseFloat(result) : NaN;
					if (result != 0 || result != NaN) v += result;
					else {
						return result;
					}
				}
				return Math.sqrt(v);
			}
			return 0;
		},
		expm1: function(v) {
			//对数 e(x) -1
			return Math.exp(v) - 1;
		},
		log1p: function(v) {
			//对数 1+x的自然对数
			return Math.log(1 + v);
		},
		log10: function(v) {
			return Math.log(v) / Math.LN10;
		},
		log2: function(v) {
			return Math.log(v) / Math.LN2;
		}
	});
	extend(Array, {
		form: function(v) {
			if (typeof v === "object" && "constructor" in v) {
				var a = [];
				for (name in v) {
					a.push(v[name]);
				}
				return a;
			}
			if (typeof v === "object" && "length" in v) {
				return v;
			}
			if (typeof v === "string") {
				var i = 0,
					a = [];
				for (i = 0; i < v.length; i++) a.push(v[i]);
				return a;
			}
		},
		of: function() {
			var args = arguments,
				len = args.length,
				a = [],
				i;
			for (i = 0; i < len; i++) {
				if (args[i]) a.push(args[i]);
				else {
					return args[i];
				}
			}
			return a;
		}
	});
	extend(Array.prototype, {
		copyWithin: function(to, start, end) {
			var v = this,
				i, len = v.length,
				a = [];
			if (!end) {
				end = start;
			}
			if (start < 0) {
				start = v.length + start;
			}
			if (end < 0) {
				end = v.length + end;
			}
			for (i = 0; i < len; i++) {
				if (i >= start && i <= end) {
					a.push(v[i]);
				}
			}
			for (i = 0; i < a.length; i++) {
				v[to + i] = a[i];
			}
			return v;
		},
		find: function(callback) {
			var v = this,
				len = v.length,
				i;
			for (i = 0; i < len; i++) {
				var result = callback(v[i], i, v);
				if (result) {
					return v[i];
				}
			}
		},
		findIndex: function(callback) {
			var v = this,
				len = v.length,
				i;
			for (i = 0; i < len; i++) {
				var result = callback(v[i], i, v);
				if (result) {
					return i;
				}
			}
		},
		fill: function() {
			var args = arguments,
				len = args.length,
				i,
				v = this,
				length = v.length;
			if (len == 1) {
				for (i = 0; i < len; i++) v[i] = args[0];
			} else if (len > 1) {
				var start, end, a = [];
				start = args[1];
				if (!args[2]) {
					end = start;
				} else {
					end = args[2];
				}
				for (i = 0; i < length; i++) {
					if (i >= start && i <= end) {
						a.push(args[0]);
					}
				}
				for (i = 0; i < a.length - 1; i++) {
					v[start + i] = a[i];
				}
			}
			return v;
		},
		includes: function(v, start) {
			if (typeof v == "number" && isNaN(v)) return true;
			var s = this,
				len = s.length,
				i;
			if (!start) start = 0;
			if (start < 0) start = len + start;
			for (i = start; i < len; i++) {
				if (s[i] == v) {
					return true;
				}
			}
			return false;
		},
		delete: function(num) {
			this.splice(num, 1);
			return this;
		},
		clear: function() {
			this.length = 0;
			return this;
		},
		has: function(obj) {
			var result = this.find(function(value, index, arr) {
				return value == obj;
			});
			return !result ? false : true;
		},
		insert: function(num, obj) {
			this.splice(num, 0, obj);
			return this;
		}
	});
	extend(Function.prototype, {
		getLength: function() {
			if ("length" in this) {
				return this.length;
			} else {
				var reg = /\(([^,\)]+,[^,\)]+)\)/.exec(this.toString());
				if (reg) {
					return reg[1].split(',').length;
				} else {
					return 0;
				}
			}
		}
	})
	extend(String.prototype, {
		includes: function(str) {
			var reg = new RegExp(str);
			return reg.test(this);
		},
		startsWith: function(str) {
			var reg = new RegExp("^" + str);
			return reg.test(this);
		},
		endsWith: function(str) {
			var reg = new RegExp(str + "$");
			return reg.test(this);
		},
		repeat: function(n) {
			if (!n) return "";
			if (typeof n == "string") {
				n = parseFloat(n);
				if (!n) return "";
			}
			if (/\./.test(n + "")) {
				n = parseInt((n + "").split('.')[0]);
			}
			if (n < 0) {
				n = 0;
			}
			var str = this,
				result = "";

			for (i = 0; i < n; i++) {
				result += str;
			}
			return n = 0 ? "" : result;
		},
		padStart: function(n, str) {
			var a = str.repeat(n);
			var len = this.length;
			return a.substr(0, (a.length - len)) + this;
		},
		padEnd: function(n, str) {
			var a = str.repeat(n);
			var len = this.length;
			return this + a.substr(len, (a.length - len));
		},
		append: function(data) {
			var d = this;
			if (!data) {
				var a = /\$\{\s*(([\$a-zA-Z0-9\-\_]+)*[\.]*([\$a-zA-Z0-9\-\_]+))\s*\}/;
				var b = a.exec(d),
					c;
				while (b) {
					c = /\./.test(b[0]) && win[b[2]][b[3]] || win[b[1]];
					d = d.replace(b[0], c);
					b = a.exec(d);
				}
			} else {
				var a = /\$\{\s*([\$a-zA-Z0-9\-\_]+)\s*\}/;
				var b = a.exec(d),
					c;
				while (b) {
					c = data[b[1]];
					d = d.replace(b[0], c);
					b = a.exec(d);
				}
			}
			return d ? d : this;
		},
		tag: function(data) {
			var d = this;
			return d.append(data).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
	});
})(this);