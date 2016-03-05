# es6-shim

模拟ES6的部分方法：

Number.[isFinite,isNaN,parseInt,parseFloat,isInteger,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isSafeInteger]

Math.[trunc,sign,cbrt,fround,hypot,expm1,log1p,log10,log2]

Array.[form,of]

Array.prototype.[copyWithin,find,findIndex,fill,includes,key,values,key.next,values.next,entries,entries.next]

Function.prototype.[getLength]

String.prototype.[includes,startsWith,endsWith,repeat,padStart,padEnd,append,tag]

另外增加非ES6方法

Array.prototype.[delete,clear,has,insert,each,before,next]

Array.[each]

Object.[each]

Object.prototype.[each]

String.prototype.[format,trim,byteLen]

...

详细使用方法，请查看demo.html。
