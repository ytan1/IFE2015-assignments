Element.prototype.getElementById = function(req) {
    var elem = this, children = elem.childNodes, i, len, id;

    for (i = 0, len = children.length; i < len; i++) {
        elem = children[i];

        //we only want real elements
        if (elem.nodeType !== 1 )
            continue;

        id = elem.id || elem.getAttribute('id');

        if (id === req) {
            return elem;
        }
        //recursion ftw
        //find the correct element (or nothing) within the child node
        id = elem.getElementById(req);

        if (id)
            return id;
    }
    //no match found, return null
    return null;
}
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


var imgrow = $('.imgrow');
var buttons = $('#Issue3Button');
var prev = document.getElementsByTagName('input')[0];
var next = document.getElementsByTagName('input')[1];
var stop = document.getElementsByTagName('input')[2];
var startPage = 1;

var endPage;
var left = parseInt(imgrow.style.left); //0
var totalImg = imgrow.childElementCount;//6
var half = Math.floor(totalImg/2);
var isMoving = 0;
var activeButtonIndex = 1
buttons.firstElementChild.firstElementChild.style.backgroundColor = '#00f';

function buttonActive(dir){
	
	buttons.firstElementChild.children[activeButtonIndex - 1].style.backgroundColor = '#999';
	if (dir === 1){
		if (activeButtonIndex === buttons.firstElementChild.childElementCount){
			activeButtonIndex = 1;
		}
		else {
			activeButtonIndex++;
		}

	}
	if (dir === -1){
		if (activeButtonIndex === 1){
			activeButtonIndex = buttons.firstElementChild.childElementCount;
		}
		else {
			activeButtonIndex--;
		}

	}
	buttons.firstElementChild.children[activeButtonIndex - 1].style.backgroundColor = '#00f';
	console.log('buttonActive');
}

function singleMove(dir, time){
	buttonActive(dir);
	var left = parseInt(imgrow.style.left);
	console.log(left);
	
	var nextLeft = left - 400;
	var prevLeft = left + 400;
	var interval = time/50;
	if (dir === 1){
		if (left <= -(totalImg-1)*400){
			var firstImgEle = imgrow.firstElementChild;
			var copyImg = firstImgEle.cloneNode();
			imgrow.appendChild(copyImg);
			var d = setInterval(function(){
				left = left - 8;
				imgrow.style.left = left + 'px';
				if (left <= nextLeft){
					clearInterval(d);
				}
			},interval); //amination finished
			setTimeout(function(){
				imgrow.style.left = 0 + 'px';
				imgrow.removeChild(copyImg);
			},time + 150);                   //time added waiting for setInterval delay
			
		}
		else{
			var d = setInterval(function(){
				left = left - 8;
				imgrow.style.left = left + 'px';
				if (left <= nextLeft){
					clearInterval(d);
				}
			},interval);
		}
	}
	if (dir === -1){
		if(left >= 0){

			var lastImgEle = imgrow.lastElementChild;
			var copyImg = lastImgEle.cloneNode();
			imgrow.appendChild(copyImg);
			copyImg.style.marginLeft = '-100%';
			var d = setInterval(function(){
				left = left + 8;
				imgrow.style.left = left + 'px';
				if (left >= prevLeft){
					clearInterval(d);
				}
			},interval );
			setTimeout(function(){
				imgrow.style.left = -(totalImg-1)*400 + 'px';
				imgrow.removeChild(copyImg);
			}, time +150 );                                    //time added waiting for setInterval delay
			
		}
		else{
			var d = setInterval(function(){
				left = left + 8;
				imgrow.style.left = left + 'px';
				if (left >= prevLeft){
					clearInterval(d);
				}
			},interval);
		}
	}
}
function move(start, end){

	isMoving = 1;
	var temp = end - start;
	console.log(temp);
	if (temp === 0 ) { isMoving = 0; return 0;}
	if (temp <= half && temp >0){
		var steps = temp;
		var time = 1200/temp;
		var delay = time +50;
		console.log('ha');
		for( var i =0; i < steps; i++){
			setTimeout(singleMove,i*delay,1,time);
		}
			
		
	}
	if (temp > half ){
		var steps = totalImg-temp;
		var time = 1200/steps;
		var delay = time +50;
		for( var i =0; i < steps; i++){
			setTimeout(singleMove,i*delay,-1,time);
		}

	}
	if (temp < 0 && temp >= -half){
		var steps = -temp;
		var time = 1200/steps;
		var delay = time +50;
		for( var i =0; i < steps; i++){
			setTimeout(singleMove,i*delay,-1,time);
		}
	}
	if (temp < -half){
		var steps = totalImg + temp;
		var time = 1200/steps;
		var delay = time +50;
		for( var i =0; i < steps; i++){
			setTimeout(singleMove,i*delay,1,time);
		}
	}
	startPage = end;
	setTimeout(function(){isMoving = 0;}, 1300);
}
buttons.addEventListener('click', function(a){
	console.log(window.event.target);
	var e = a || window.event;
	var t = e.target || e.srcElement;
	if (t.tagName === 'LI'){
		if( isMoving === 0){
		endPage = Array.prototype.slice.call(buttons.getElementsByTagName('ul')[0].getElementsByTagName('li')).indexOf(t) + 1;
		move (startPage, endPage);

		}
	}
});




prev.addEventListener('click', function(){
	if (isMoving === 1) { isMoving = 0; }
	setTimeout(function(){
		isMoving = 1;

		function go1(){
			if (isMoving  === 1){
				singleMove(-1, 400);
				setTimeout(go1, 2400);
				startPage = activeButtonIndex;
				
			}
		}
		go1();

	},2500);
	
});
next.addEventListener('click', function(){
	if (isMoving === 1) {  isMoving = 0; }
	setTimeout(function(){
		isMoving = 1;

		function go1(){
			if (isMoving  === 1){
				singleMove(1, 400);
				setTimeout(go1, 2400);
				startPage = activeButtonIndex;
				
			}
		}
		go1();
	},2500);
});

stop.addEventListener('click', function(){
	isMoving = 0;
});