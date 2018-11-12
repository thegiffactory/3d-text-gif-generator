!function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=7)}({7:function(t,e,i){var r;!function t(e,i,n){function o(a,h){if(!i[a]){if(!e[a]){if(!h&&("function"==typeof r&&r))return r(a,!0);if(s)return s(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(t){var i=e[a][1][t];return o(i||t)},u,u.exports,t,e,i,n)}return i[a].exports}for(var s="function"==typeof r&&r,a=0;a<n.length;a++)o(n[a]);return o}({1:[function(t,e,i){var r=t("./TypedNeuQuant.js"),n=t("./LZWEncoder.js");function o(){this.page=-1,this.pages=[],this.newPage()}o.pageSize=4096,o.charMap={};for(var s=0;s<256;s++)o.charMap[s]=String.fromCharCode(s);function a(t,e){this.width=~~t,this.height=~~e,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.neuQuant=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.dither=!1,this.globalPalette=!1,this.out=new o}o.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(o.pageSize),this.cursor=0},o.prototype.getData=function(){for(var t="",e=0;e<this.pages.length;e++)for(var i=0;i<o.pageSize;i++)t+=o.charMap[this.pages[e][i]];return t},o.prototype.writeByte=function(t){this.cursor>=o.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=t},o.prototype.writeUTFBytes=function(t){for(var e=t.length,i=0;i<e;i++)this.writeByte(t.charCodeAt(i))},o.prototype.writeBytes=function(t,e,i){for(var r=i||t.length,n=e||0;n<r;n++)this.writeByte(t[n])},a.prototype.setDelay=function(t){this.delay=Math.round(t/10)},a.prototype.setFrameRate=function(t){this.delay=Math.round(100/t)},a.prototype.setDispose=function(t){t>=0&&(this.dispose=t)},a.prototype.setRepeat=function(t){this.repeat=t},a.prototype.setTransparent=function(t){this.transparent=t},a.prototype.addFrame=function(t){this.image=t,this.colorTab=this.globalPalette&&this.globalPalette.slice?this.globalPalette:null,this.getImagePixels(),this.analyzePixels(),!0===this.globalPalette&&(this.globalPalette=this.colorTab),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.globalPalette||this.writePalette(),this.writePixels(),this.firstFrame=!1},a.prototype.finish=function(){this.out.writeByte(59)},a.prototype.setQuality=function(t){t<1&&(t=1),this.sample=t},a.prototype.setDither=function(t){!0===t&&(t="FloydSteinberg"),this.dither=t},a.prototype.setGlobalPalette=function(t){this.globalPalette=t},a.prototype.getGlobalPalette=function(){return this.globalPalette&&this.globalPalette.slice&&this.globalPalette.slice(0)||this.globalPalette},a.prototype.writeHeader=function(){this.out.writeUTFBytes("GIF89a")},a.prototype.analyzePixels=function(){this.colorTab||(this.neuQuant=new r(this.pixels,this.sample),this.neuQuant.buildColormap(),this.colorTab=this.neuQuant.getColormap()),this.dither?this.ditherPixels(this.dither.replace("-serpentine",""),null!==this.dither.match(/-serpentine/)):this.indexPixels(),this.pixels=null,this.colorDepth=8,this.palSize=7,null!==this.transparent&&(this.transIndex=this.findClosest(this.transparent,!0))},a.prototype.indexPixels=function(t){var e=this.pixels.length/3;this.indexedPixels=new Uint8Array(e);for(var i=0,r=0;r<e;r++){var n=this.findClosestRGB(255&this.pixels[i++],255&this.pixels[i++],255&this.pixels[i++]);this.usedEntry[n]=!0,this.indexedPixels[r]=n}},a.prototype.ditherPixels=function(t,e){var i={FalseFloydSteinberg:[[3/8,1,0],[3/8,0,1],[.25,1,1]],FloydSteinberg:[[7/16,1,0],[3/16,-1,1],[5/16,0,1],[1/16,1,1]],Stucki:[[8/42,1,0],[4/42,2,0],[2/42,-2,1],[4/42,-1,1],[8/42,0,1],[4/42,1,1],[2/42,2,1],[1/42,-2,2],[2/42,-1,2],[4/42,0,2],[2/42,1,2],[1/42,2,2]],Atkinson:[[1/8,1,0],[1/8,2,0],[1/8,-1,1],[1/8,0,1],[1/8,1,1],[1/8,0,2]]};if(!t||!i[t])throw"Unknown dithering kernel: "+t;var r=i[t],n=0,o=this.height,s=this.width,a=this.pixels,h=e?-1:1;this.indexedPixels=new Uint8Array(this.pixels.length/3);for(var l=0;l<o;l++){e&&(h*=-1);for(var u=1==h?0:s-1,p=1==h?s:0;u!==p;u+=h){var f=3*(n=l*s+u),c=a[f],y=a[f+1],d=a[f+2];f=this.findClosestRGB(c,y,d),this.usedEntry[f]=!0,this.indexedPixels[n]=f,f*=3;for(var w=c-this.colorTab[f],g=y-this.colorTab[f+1],b=d-this.colorTab[f+2],x=1==h?0:r.length-1,v=1==h?r.length:0;x!==v;x+=h){var P=r[x][1],m=r[x][2];if(P+u>=0&&P+u<s&&m+l>=0&&m+l<o){var B=r[x][0];f=n+P+m*s,a[f*=3]=Math.max(0,Math.min(255,a[f]+w*B)),a[f+1]=Math.max(0,Math.min(255,a[f+1]+g*B)),a[f+2]=Math.max(0,Math.min(255,a[f+2]+b*B))}}}}},a.prototype.findClosest=function(t,e){return this.findClosestRGB((16711680&t)>>16,(65280&t)>>8,255&t,e)},a.prototype.findClosestRGB=function(t,e,i,r){if(null===this.colorTab)return-1;if(this.neuQuant&&!r)return this.neuQuant.lookupRGB(t,e,i);for(var n=0,o=16777216,s=this.colorTab.length,a=0,h=0;a<s;h++){var l=t-(255&this.colorTab[a++]),u=e-(255&this.colorTab[a++]),p=i-(255&this.colorTab[a++]),f=l*l+u*u+p*p;(!r||this.usedEntry[h])&&f<o&&(o=f,n=h)}return n},a.prototype.getImagePixels=function(){var t=this.width,e=this.height;this.pixels=new Uint8Array(t*e*3);for(var i=this.image,r=0,n=0,o=0;o<e;o++)for(var s=0;s<t;s++)this.pixels[n++]=i[r++],this.pixels[n++]=i[r++],this.pixels[n++]=i[r++],r++},a.prototype.writeGraphicCtrlExt=function(){var t,e;this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4),null===this.transparent?(t=0,e=0):(t=1,e=2),this.dispose>=0&&(e=7&dispose),e<<=2,this.out.writeByte(0|e|t),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},a.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame||this.globalPalette?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},a.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},a.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes("NETSCAPE2.0"),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},a.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);for(var t=768-this.colorTab.length,e=0;e<t;e++)this.out.writeByte(0)},a.prototype.writeShort=function(t){this.out.writeByte(255&t),this.out.writeByte(t>>8&255)},a.prototype.writePixels=function(){new n(this.width,this.height,this.indexedPixels,this.colorDepth).encode(this.out)},a.prototype.stream=function(){return this.out},e.exports=a},{"./LZWEncoder.js":2,"./TypedNeuQuant.js":3}],2:[function(t,e,i){var r=-1,n=12,o=5003,s=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=function(t,e,i,a){var h,l,u,p,f,c,y=Math.max(2,a),d=new Uint8Array(256),w=new Int32Array(o),g=new Int32Array(o),b=0,x=0,v=!1;function P(t,e){d[l++]=t,l>=254&&S(e)}function m(t){B(o),x=f+2,v=!0,F(f,t)}function B(t){for(var e=0;e<t;++e)w[e]=-1}function S(t){l>0&&(t.writeByte(l),t.writeBytes(d,0,l),l=0)}function T(t){return(1<<t)-1}function M(){return 0===remaining?r:(--remaining,255&i[curPixel++])}function F(t,e){for(h&=s[b],b>0?h|=t<<b:h=t,b+=n_bits;b>=8;)P(255&h,e),h>>=8,b-=8;if((x>u||v)&&(v?(u=T(n_bits=p),v=!1):(++n_bits,u=n_bits==n?1<<n:T(n_bits))),t==c){for(;b>0;)P(255&h,e),h>>=8,b-=8;S(e)}}this.encode=function(i){i.writeByte(y),remaining=t*e,curPixel=0,function(t,e){var i,s,a,h,y,d,b;for(p=t,v=!1,n_bits=p,u=T(n_bits),c=1+(f=1<<t-1),x=f+2,l=0,h=M(),b=0,i=o;i<65536;i*=2)++b;b=8-b,B(d=o),F(f,e);t:for(;(s=M())!=r;)if(i=(s<<n)+h,w[a=s<<b^h]!==i){if(w[a]>=0){y=d-a,0===a&&(y=1);do{if((a-=y)<0&&(a+=d),w[a]===i){h=g[a];continue t}}while(w[a]>=0)}F(h,e),h=s,x<1<<n?(g[a]=x++,w[a]=i):m(e)}else h=g[a];F(h,e),F(c,e)}(y+1,i),i.writeByte(0)}}},{}],3:[function(t,e,i){var r=100,n=256,o=n-1,s=4,a=16,h=1<<a,l=10,u=10,p=h>>u,f=h<<l-u,c=6,y=(n>>3)*(1<<c),d=30,w=1024,g=256,b=1<<18,x=499,v=491,P=487,m=503,B=3*m;e.exports=function(t,e){var i,S,T,M,F;function C(t,e,r,n,o){i[e][0]-=t*(i[e][0]-r)/w,i[e][1]-=t*(i[e][1]-n)/w,i[e][2]-=t*(i[e][2]-o)/w}function A(t,e,r,o,s){for(var a,h,l=Math.abs(e-t),u=Math.min(e+t,n),p=e+1,f=e-1,c=1;p<u||f>l;)h=F[c++],p<u&&((a=i[p++])[0]-=h*(a[0]-r)/b,a[1]-=h*(a[1]-o)/b,a[2]-=h*(a[2]-s)/b),f>l&&((a=i[f--])[0]-=h*(a[0]-r)/b,a[1]-=h*(a[1]-o)/b,a[2]-=h*(a[2]-s)/b)}function E(t,e,r){var o,h,c,y,d,w=~(1<<31),g=w,b=-1,x=b;for(o=0;o<n;o++)h=i[o],(c=Math.abs(h[0]-t)+Math.abs(h[1]-e)+Math.abs(h[2]-r))<w&&(w=c,b=o),(y=c-(T[o]>>a-s))<g&&(g=y,x=o),d=M[o]>>u,M[o]-=d,T[o]+=d<<l;return M[b]+=p,T[b]-=f,x}this.buildColormap=function(){!function(){var t,e;for(i=[],S=new Int32Array(256),T=new Int32Array(n),M=new Int32Array(n),F=new Int32Array(n>>3),t=0;t<n;t++)e=(t<<s+8)/n,i[t]=new Float64Array([e,e,e,0]),M[t]=h/n,T[t]=0}(),function(){var i,n,o,a,h,l,u=t.length,p=30+(e-1)/3,f=u/(3*e),b=~~(f/r),S=w,T=y,M=T>>c;for(M<=1&&(M=0),i=0;i<M;i++)F[i]=S*((M*M-i*i)*g/(M*M));u<B?(e=1,n=3):n=u%x!=0?3*x:u%v!=0?3*v:u%P!=0?3*P:3*m;var I=0;for(i=0;i<f;)if(C(S,l=E(o=(255&t[I])<<s,a=(255&t[I+1])<<s,h=(255&t[I+2])<<s),o,a,h),0!==M&&A(M,l,o,a,h),(I+=n)>=u&&(I-=u),i++,0===b&&(b=1),i%b==0)for(S-=S/p,(M=(T-=T/d)>>c)<=1&&(M=0),l=0;l<M;l++)F[l]=S*((M*M-l*l)*g/(M*M))}(),function(){for(var t=0;t<n;t++)i[t][0]>>=s,i[t][1]>>=s,i[t][2]>>=s,i[t][3]=t}(),function(){var t,e,r,s,a,h,l=0,u=0;for(t=0;t<n;t++){for(a=t,h=(r=i[t])[1],e=t+1;e<n;e++)(s=i[e])[1]<h&&(a=e,h=s[1]);if(s=i[a],t!=a&&(e=s[0],s[0]=r[0],r[0]=e,e=s[1],s[1]=r[1],r[1]=e,e=s[2],s[2]=r[2],r[2]=e,e=s[3],s[3]=r[3],r[3]=e),h!=l){for(S[l]=u+t>>1,e=l+1;e<h;e++)S[e]=t;l=h,u=t}}for(S[l]=u+o>>1,e=l+1;e<256;e++)S[e]=o}()},this.getColormap=function(){for(var t=[],e=[],r=0;r<n;r++)e[i[r][3]]=r;for(var o=0,s=0;s<n;s++){var a=e[s];t[o++]=i[a][0],t[o++]=i[a][1],t[o++]=i[a][2]}return t},this.lookupRGB=function(t,e,r){for(var o,s,a,h=1e3,l=-1,u=S[e],p=u-1;u<n||p>=0;)u<n&&((a=(s=i[u])[1]-e)>=h?u=n:(u++,a<0&&(a=-a),(o=s[0]-t)<0&&(o=-o),(a+=o)<h&&((o=s[2]-r)<0&&(o=-o),(a+=o)<h&&(h=a,l=s[3])))),p>=0&&((a=e-(s=i[p])[1])>=h?p=-1:(p--,a<0&&(a=-a),(o=s[0]-t)<0&&(o=-o),(a+=o)<h&&((o=s[2]-r)<0&&(o=-o),(a+=o)<h&&(h=a,l=s[3]))));return l}}},{}],4:[function(t,e,i){var r,n;r=t("./GIFEncoder.js"),n=function(t){var e,i,n,o;return e=new r(t.width,t.height),0===t.index?e.writeHeader():e.firstFrame=!1,e.setTransparent(t.transparent),e.setRepeat(t.repeat),e.setDelay(t.delay),e.setQuality(t.quality),e.setDither(t.dither),e.setGlobalPalette(t.globalPalette),e.addFrame(t.data),t.last&&e.finish(),!0===t.globalPalette&&(t.globalPalette=e.getGlobalPalette()),n=e.stream(),t.data=n.pages,t.cursor=n.cursor,t.pageSize=n.constructor.pageSize,t.canTransfer?(o=function(){var e,r,n,o;for(o=[],e=0,r=(n=t.data).length;e<r;e++)i=n[e],o.push(i.buffer);return o}(),self.postMessage(t,o)):self.postMessage(t)},self.onmessage=function(t){return n(t.data)}},{"./GIFEncoder.js":1}]},{},[4])}});
//# sourceMappingURL=gif.worker.bundle.js.map