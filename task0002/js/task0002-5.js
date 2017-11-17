var bigContainer = document.getElementsByClassName('bigContainer');
var smallEle = document.getElementsByClassName('small');
var mouseInitX, mouseInitY, boxInitX, boxInitY, mouseEndX, mouseEndY;
var isMouseUp = 0;

document.onmousedown = function(ev){
	console.log('foo');
	isMouseUp = 0;
	var event = ev || window.event;
	var t = event.target || event.srcElement;
	if (/small/.test(t.className) === true){
		drag(t);
		mouseInitX = event.pageX;
		mouseInitY = event.pageY;
		boxInitY = 0;
		boxInitX = 0;
	}
};
function drag(t){
    t.addEventListener('mousemove', move);//or document??
    t.addEventListener('mouseup', function(ev){
    	isMouseUp = 1;
    	this.style.zIndex = '1';
		t.removeEventListener('mousemove', move);
		t.className = t.className.replace(/\sopacity/i, '');
		var event = ev || window.event;
		mouseEndX = event.pageX;
		mouseEndY = event.pageY;
		positionSet(mouseEndX, mouseEndY, t);



	});
}
function move(ev){
	if (isMouseUp === 1){
		return false;
	}
	var event = ev || window.event;
	var t = event.target || event.srcElement;
	if (!(/opacity/.test(t.className))){
		t.className += ' ' + 'opacity';
	}
	this.style.zIndex = '2';
	var movementX = event.pageX - mouseInitX;
	var movementY = event.pageY - mouseInitY;
	this.style.left = boxInitX + movementX + 'px';
	this.style.top = boxInitY + movementY + 'px';
	console.log(movementX);



}
function positionSet(x, y, ele){
	var parent = ele.parentElement, newParent, newParentTop, newParentBottom, newParentLeft, newParentRight, childTop, childBottom, childLeft, childRight;
	for (var i = 0; i < bigContainer.length; i++){
		newParentTop =  bigContainer[i].getBoundingClientRect().top + window.scrollY;
		newParentBottom = bigContainer[i].getBoundingClientRect().bottom + window.scrollY;
		newParentLeft = bigContainer[i].getBoundingClientRect().left + window.scrollX;
		newParentRight = bigContainer[i].getBoundingClientRect().right + window.scrollX;
		if (x > newParentLeft && x < newParentRight)
			if (y > newParentTop && y < newParentBottom)
				{newParent = bigContainer[i];break;}
	}
	if (!newParent) {
		ele.style.top = '0px';
		ele.style.left = '0px';
		console.log('da');
		return true;
	}
	parent.removeChild(ele);
	console.log(ele);
	for (var i = 0; i < newParent.children.length; i++){
		childTop = newParent.children[i].getBoundingClientRect().top + window.scrollY;
		childBottom = newParent.children[i].getBoundingClientRect().bottom + window.scrollY;
		childLeft = newParent.children[i].getBoundingClientRect().left + window.scrollX;
		childRight = newParent.children[i].getBoundingClientRect().right + window.scrollX;
		if (x < childRight && x > childLeft){
			if (y < childBottom && y > childTop){
				newParent.insertBefore(ele, newParent.children[i]);
				ele.style.top = '0px';
				ele.style.left = '0px';
				console.log('hehe');
				break;
			}
		}
	}
	if (i === newParent.children.length){
		newParent.appendChild(ele); 
		ele.style.top = '0px';
		ele.style.left = '0px';
		}     
}


