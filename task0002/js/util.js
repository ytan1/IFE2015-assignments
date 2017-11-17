function ajax(url, options){
	var xm = new XMLHttpRequest();
	xm.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			myFunc(this,options);

		}

		else {
			options.onfail1();
			console.log(url);
			console.log(this.readyState + '+' + this.status);
		}
	}
	if(!options.type) options.type = 'GET';
	xm.open(options.type, url, true);
	xm.send();
}
function myFunc(request, options){
	var	doc = request.responseXML;
	var name = options.data.name;
	var password = options.data.password;
	var x = doc.getElementsByTagName('USER');
	for (var i = x.length - 1; i >= 0; i--) {
		console.log(x[i].getElementsByTagName('PASSWORD')[0].childNodes[0].nodeValue,password,name);
		if (x[i].getElementsByTagName('NAME')[0].childNodes[0].nodeValue === name &&
			x[i].getElementsByTagName('PASSWORD')[0].childNodes[0].nodeValue === password ){
			options.onsuccess(x[i].getElementsByTagName('INFO')[0].childNodes[0].nodeValue);
			break;
		}
			

		else options.onfail2();
	}
}
var option1 = {
	data:{
		name:'',
		password:''
	},
	onsuccess:function(info){
		document.getElementsByTagName('p')[0].innerHTML = info;

	},
	onfail1:function(){
		document.getElementsByTagName('p')[0].innerHTML = 'url file not found';
	},
	onfail2:function(){
		document.getElementsByTagName('p')[0].innerHTML = 'name or password incorrect';
	}
};
var button = document.getElementById('button');
button.addEventListener('click',function(){
	option1.data.name = document.getElementById('input1').value;
	option1.data.password = document.getElementById('input2').value;
	var fileloc = 'http://localhost:8080/task0002/task0002-0.xml';
	ajax(fileloc, option1);
})


/*practice 2.1*/
function isArray(arr){
	return arr.constructor.toString().indexOf('Array') > -1;
}
console.log(isArray([1,2]));
function isFunction(fn){
	return fn.constructor.toString().indexOf('Function') > -1;
}
var x = function(){};
console.log(isFunction(x));

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
    var clone;
    if (src instanceof Date)
    	clone = Date(src.getDate());
    else if (src instanceof Array){
    	clone = [];
    	for ( var i = 0; i < src.length; i++)
    		clone.push(cloneObject(src[i]));
    }
    else if (src instanceof Object){
    	clone = {};
    	for (var i in src){
    		if (src.hasOwnProperty(i))
    			clone[i] = cloneObject(src[i]);
    	}

    }
    else clone = src;
    return clone;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
    var b = arr.length;
    for (var i = b-1; i > 0; i--){
    	var a = arr[i];
    	for (var j = i-1; j>=0; j--){
    		if (arr[j] === arr[i]){
    			arr.pop();
    			break;
    		}
    	}
    }
    return arr;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
    var len = str.length, i, j;
    for (i = 0; i < len; i++){
    	if (str[i] !== '\u0020' && str[i] !== '\u0009')
    		break;
    }
    if (i === len){
    	return '';

    }
    else {
    	for (j = len-1; j > i; j--){
    		if (str[j] !== '\u0020' && str[j] !== '\u0009')
    			break;
    	}

    }
    console.log('\u0020');
    return str.slice(i,j+1);
    	
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g,'');
    
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
    var len = arr.length;
    var i;
    for (i = 0;i < len; i++){
    	fn(arr[i],i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

function getObjectLength(obj){
	var ele = 0;
	for (var key in obj){
		if (obj.hasOwnProperty(key))
			ele++;

	}
	return ele;
}
var obj = {
    toString: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
    return /^[a-z0-9]+([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+(\.[a-z0-9]+)+$/i.test(emailStr);
}
var email = 'ytan1@ualberta.ca';
console.log(isEmail(email));

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
    return /^1[38][0-9]{9}|15[0-36-9][0-9]{8}|14[57][0-9]{8}|17[678][0-9]{8}$/.test(phone);
}
var phonenumber = '13888888888';
console.log(isMobilePhone(phonenumber));
// 为element增加一个样式名为newClassName的新样式
function hasClass(element, newClassName){
	return element.className.match(new RegExp('\\s|^' + newClassName + '\\s|$'));
}
function addClass(element, newClassName) {
    // your implement
    if (hasClass(element,newClassName))
    	;
    else {
    	var j = element.className.length;
    	if (j === 0 && element.className[j-1] !== ' ')
    		element.className = newClassName;

    	else
    		element.className += ' ' + newClassname;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
    element.className.replace(new RegExp(oldClassName), '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
    var top, left;
    if (element !== document.getElementsByTagName('body')[0]){
    	top = element.offsetTop + getPosition(element.offsetParent).x;
    	left = element.offsetLeft + getPosition(element.offsetParent).y;
    }
    else {
    	top = -document.body.scrollTop - document.documentElement.scrollTop;
    	left = -document.body.scrollLeft - document.documentElement.scrollLeft;
    }
    
    return {x:top, y:left};
}
// your implement
//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
    var sels = selector.split(' ');
    var len = sels.length;
    var result = document.documentElement;
    

    	for(var i = 0; i< len; i++){
    		switch (sels[i][0]){
    			case '#':
    				if (i === 0)
    					result = result.getElementById(sels[0].substring(1));
    				else
    					console.log('Wrong syntax for query!');
    				break;
    			
    			case '.':
    				result = result.getElementsByClassName(sels[i].substring(1))[0];
    				break;
    			
    			case '[':
    				sels[i] = sels[i].replace(/[\[\]]/g,'');
    				var gr = sels[i].split('=');
    				if (gr.length>2)
    					console.log('Wrong syntax for query!');
    				else if (gr.length === 1){
    					var resultChilds = result.getElementsByTagName('*');
    					var childLen = resultChilds.length;
    					for (var j = 0; j < childLen; j++){
    						if (resultChilds[j].hasAttribute(gr[0])){
    							result = resultChilds[j];
    							break;
    						}
    					}
    					if (j === childLen){
    						return null;
    					}
    				}
    				else if (gr.length === 2){
    					var atrr = gr[0];
    					var val = gr[1];
    					var resultChilds = result.getElementsByTagName('*');
    					var childLen = resultChilds.length;
    					for (var j = 0; j < childLen; j++){
    						if (resultChilds[j].getAttribute(atrr) === val){
    							result = resultChilds[j];
    							break;
    						}
    					}

    					if (j === childLen)
    						return null;
    						
    				}


    				break;

    			default:
    				result = result.getElementsByTagName(sels[i])[0];
    				break;

    		}
    	}
    return result;
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
    element.addEventListener(event, listener);
}

// 例如：


// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
    element.removeEventListener(event,listener);
}
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
    element.addEventListener('click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
    element.addEventListener('keydown',function(e){
    	var e = e || window.event;
    	var key = e.which || e.keyCode;
    	if (key === 13){
    		listener.call(element);
    	}
    });
}

function delegate(element, tag, event, listener){
	element.addEventListner(event, function(){
		var e = argument[0] || window.event;
		var target = e.target || e.srcElement;
		if (target.tagName === tag.toUpperCase()){
			listener.call(target);
		}
	});
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    // your implement
    var num = window.navigator.userAgent.match(/\srv:(\d{1,2}\.\d)/)[1];
    if (!num){
    	return -1;
    }
    else return num;

}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    // your implement
    var d = new Date;
    d.setTime(d.getTime() + expiredays*1000*24*60*60);
    document.cookie += cookieName + ':' + cookieValue + ' expires on ' + d.toUTCString + '; ';
}

// 获取cookie值
function getCookie(cookieName) {
    // your implement
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for ( var i =0; i<ca.length; i++){
    	if(ca[i].search(cookieName + '=')!==-1)
    		return c[i];
    }
    return '';
}