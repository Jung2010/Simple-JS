
const range = (n = 1, start = 0, step = 1) => {
  const typeErr = () => { throw new TypeError("All of Arguments must be Number") };

  if (typeof n !== "number" || typeof start !== "number" || typeof step !== "number") typeErr();
  step = Math.round(step);
  if (step < 1) throw new Error("Step (3rd parameter) must be 1 or more.");

  let arr = [];
  for (let i = 0; i < n; i++) {
    let val = step * i + start;
    arr.push(val);
  }
  return arr;
}

const rand = function(min = 0, max = 10) {
  const typeErr = () => { throw new TypeError("All of Arguments must be Number") };
  if (typeof min !== "number" || typeof max !== "number") typeErr();
  return Math.floor(Math.random() * (max - min)) + min;
}

Function.prototype.repeat = function(n) {
  if (typeof this !== "function") throw new TypeError("First Argument must be Function");
  if (typeof n !== "number") throw new TypeError("Second Argument must be Number");
  for (const i in range(n)) this(i);
}

Array.prototype.sum = function(){return [...this].reduce((x,y)=>typeof y === "number"?x+y:x,0);}
Array.prototype.average = (...arr)=>sum(...arr)/arr.length;

const domQ = (query) => document.querySelector(query);
const domQAll = (query) => document.querySelectorAll(query);
const domId = (id) => document.getElementById(id);
const domClass = (cls) => document.getElementsByClassName(cls);
const domTag = (tag) => document.getElementsByTagName(tag);
const domName = (name) => document.getElementsByName(name);

HTMLElement.prototype.css = function(type,value) { return type?(value?this.style[type]=value:this.style?.[type]):this.style };
HTMLElement.prototype.html = function(html) { return html?this.innerHTML=html:this.innerHTML; }
HTMLElement.prototype.texts = function() { return this.innerText; }
HTMLElement.prototype.add = function(html) { return html?this.innerHTML+=html:undefined; }
HTMLElement.prototype.eachAdd = function(arr=[],callback=()=>{}) { return arr.forEach((...args)=>this.innerHTML+=callback(...args)); }

NodeList.prototype.css = function(type,value) {
  if(typeof type==='string'&&typeof value==='string'){ this.forEach(v=>v.style[type]=value) }
};
NodeList.prototype.html = function(html=undefined) {
  if(typeof html === 'string'){ this.forEach(v=>v.innerHTML=value) }
  else if(typeof html === 'function'){ this.forEach((v,i,arr)=>v.innerHTML=html(v,i,arr)); }
  else if(typeof html === 'undefined'){ this.reduce((pre,cur)=>[...pre,cur.innerHTML],[]) }
}
NodeList.prototype.texts = function() {
  return this.reduce((pre,cur)=>[...pre,cur.innerText],[]);
}

const testArr = [];
for (const i in range(1000)) { testArr.push(Math.floor(Math.random() * 100)); }

Object.prototype.json = function(tab=2) { if(typeof tab === 'number') return JSON.stringify(this,null,tab); }
String.prototype.parse = function() { return JSON.parse(this); }

const getFetch = async(url)=>await fetch(url).then(resp=>resp.json());

const findSames = (...arr)=>arr.reduce((pre,cur)=>{!pre[cur]?pre[cur]=1:++pre[cur];return pre},{});
const toArr = (x)=>Array.from(x);
String.prototype.encode = function(){ return encodeURI(this); }
String.prototype.decode = function(){ return decodeURI(this); }
Array.prototype.howMany = function(val){return this.reduce((pre,cur)=>cur===val?++pre:pre,0)}