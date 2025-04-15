const range = (n = 1, start = 0, step = 1) => {
  // 타입 검사
  if (typeof n !== "number" || typeof start !== "number" || typeof step !== "number") {
    throw new TypeError("Arguments 'n', 'start', and 'step' must be numbers.");
  }

  // 범위 확인
  if (n < 0) throw new RangeError("'n' must be greater than or equal to 0.");
  step = Math.round(step);
  if (step < 1) throw new RangeError("'step' must be 1 or greater.");

  let arr = [];
  // 값을 생성하여 배열에 저장
  for (let i = 0; i < n; i++) {
    arr.push(start + i * step);
  }
  return arr;
}

const rand = (min = 0, max = 10) => {
  // 타입 검사
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError("'min' and 'max' must be numbers.");
  }

  // min이 max보다 클 경우 오류 처리
  if (min >= max) throw new RangeError("'min' cannot be greater than or equal to 'max'.");

  // 랜덤 값 생성
  return Math.floor(Math.random() * (max - min)) + min;
}

Function.prototype.repeat = function (n) {
  // 첫 번째 인자가 함수가 아닌 경우 오류 처리
  if (typeof this !== "function") throw new TypeError("First argument must be a function.");
  
  // 두 번째 인자가 숫자가 아니거나 음수일 경우 오류 처리
  if (typeof n !== "number" || n < 0) throw new RangeError("Second argument must be a non-negative number.");

  // 함수 n번 반복 실행
  for (let i = 0; i < n; i++) {
    this(i);
  }
}

Array.prototype.sum = function () {
  // 빈 배열에서 sum을 계산하려는 경우 오류 처리
  if (this.length === 0) throw new Error("Cannot calculate sum of an empty array.");

  // 배열의 합을 계산
  return this.reduce((x, y) => typeof y === "number" ? x + y : x, 0);
}

Array.prototype.average = function () {
  // 빈 배열에서 average를 계산하려는 경우 오류 처리
  if (this.length === 0) throw new Error("Cannot calculate average of an empty array.");

  // 배열의 평균을 계산
  return this.sum() / this.length;
}

HTMLElement.prototype.css = function (type, value) {
  // type이 문자열이 아닌 경우 오류 처리
  if (typeof type !== "string") throw new TypeError("CSS property must be a string.");
  
  // value가 주어졌을 때 value가 문자열이 아닌 경우 오류 처리
  if (value && typeof value !== "string") throw new TypeError("CSS value must be a string.");
  
  // 스타일을 설정하거나 반환
  return type ? (value ? this.style[type] = value : this.style[type]) : this.style;
}

HTMLElement.prototype.html = function (html) {
  // html 값이 주어졌을 때만 innerHTML을 변경
  return html ? this.innerHTML = html : this.innerHTML;
}

HTMLElement.prototype.texts = function () {
  // innerText 값을 반환
  return this.innerText;
}

HTMLElement.prototype.add = function (html) {
  // html 값이 있을 때만 innerHTML을 추가
  return html ? this.innerHTML += html : undefined;
}

HTMLElement.prototype.eachAdd = function (arr = [], callback = () => {}) {
  // 배열을 순회하면서 각각에 대해 innerHTML을 추가
  if (!Array.isArray(arr)) throw new TypeError("The first argument must be an array.");
  return arr.forEach((...args) => this.innerHTML += callback(...args));
}

HTMLElement.addE = function (type, func) {
  // 이벤트 리스너 추가
  if (typeof func !== 'function') throw new TypeError("Second argument must be a function.");
  this.addEventListener(type, func);
}

const findText = function (txt) {
  // 특정 텍스트가 포함된 모든 요소 찾기
  if(typeof txt !== 'string') throw new TypeError("The type of argument must be String.");
  const allEle = document.querySelectorAll("*");
  const selects = Array.from(allEle).reduce((pre,cur)=>{
    let ifYes = (cur.innerText).includes(txt);
    if(cur.tagName==="SCRIPT") ifYes = false; // script태그는 제외.
    return ifYes?[...pre,cur]:pre;
  },[]);
  return selects;
}

NodeList.prototype.css = function (type, value) {
  // NodeList의 각 요소에 대해 스타일을 설정
  if (typeof type === 'string' && typeof value === 'string') {
    this.forEach(v => v.style[type] = value);
  }
}

NodeList.prototype.html = function (html = undefined) {
  // html 값이 주어졌을 때만 innerHTML을 변경
  if (typeof html === 'string') {
    this.forEach(v => v.innerHTML = html);
  } else if (typeof html === 'function') {
    this.forEach((v, i, arr) => v.innerHTML = html(v, i, arr));
  } else if (html === undefined) {
    // innerHTML을 배열로 반환
    return this.reduce((pre, cur) => [...pre, cur.innerHTML], []);
  }
}

NodeList.prototype.texts = function () {
  // 모든 Node의 innerText를 배열로 반환
  return this.reduce((pre, cur) => [...pre, cur.innerText], []);
}

const testArr = [];
for (const i in range(1000)) { 
  testArr.push(Math.floor(Math.random() * 100)); 
}

Object.prototype.json = function (tab = 2) {
  // JSON 객체로 변환
  if (typeof tab === 'number') return JSON.stringify(this, null, tab);
}

String.prototype.parse = function () {
  // 문자열을 JSON으로 변환
  return JSON.parse(this);
}

const get = async (url) => {
  // URL에서 데이터를 fetch하여 JSON으로 반환
  if (typeof url !== 'string') throw new TypeError("URL must be a string.");
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  return await response.json();
}

const findSames = (...arr) => {
  // 배열 내 중복된 값을 찾아 개수를 반환
  return arr.reduce((pre, cur) => {
    !pre[cur] ? pre[cur] = 1 : ++pre[cur];
    return pre;
  }, {});
}

const toArr = (x) => {
  // 배열로 변환
  if (!x) throw new Error("Input cannot be undefined or null.");
  return Array.from(x);
}

String.prototype.encode = function () {
  // 문자열을 URI로 인코딩
  return encodeURI(this);
}

String.prototype.decode = function () {
  // URI를 디코딩
  return decodeURI(this);
}

Array.prototype.howMany = function (val) {
  // 배열 내 특정 값의 개수 반환
  return this.reduce((pre, cur) => cur === val ? ++pre : pre, 0);
}

Array.prototype.findPercent = function (txt) {
  // 배열에서 특정 값의 비율 계산
  return this.howMany(txt) / this.length * 100;
}

const cLog = (...v) => console.log(...v);
const cDir = (...v) => console.dir(...v);
const cTable = (...v) => console.table(...v);
const cError = (...v) => console.error(...v);
const cTime = (...v) => console.time();
const cTimeEnd = (...v) => console.timeEnd();

const r_timer = (f, t) => setInterval(f, t);
const timer = (f, t) => setTimeout(f, t);
