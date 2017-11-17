var userInput = document.querySelector('.userInput');
var ul = document.querySelector('.prompt-wrap ul');
var data = ['Aaron', 'Alax','Ace','Alan','Aplus','Beta', 'Cimmon', 'Dota'];
var index =0;
var originString = '';

function check(value, e){
	if(window.event) {                          // 获取键盘按下的字符
        var keynum = e.keyCode;
    }
    else if(e.which) {
        var keynum = e.which;
    }
	if (keynum !== 38 &&keynum !== 40 && keynum !== 13){
		console.log(value);
		originString = value;
		var len1 = data.length;
		var len2 = value.length;
		var hints = [];
		var li = [];
		clear();
		for ( var i = 0; i < len1; i ++){
			for (var j = 0; j < len2; j ++){
				if ( value[j].toLowerCase() !== data[i][j].toLowerCase()){
					break;
				}

			}
			if (j === len2 && len2!== 0){
				hints.push(data[i]);
			}
		}

		hintNum = hints.length;

		ul.style.display = 'block';
		
		for (var k =0; k < hintNum; k++){
			
			li[k] = document.createElement('li');
			li[k].className ='hintList';
			li[k].innerHTML = hints[k];
			(function(){ var j = k;
				li[j].onmouseover = function(){

					for (var p = 0; p < ul.childElementCount; p ++){

						if ( ul.children[p] !== this && ul.children[p].className === 'onhover'){

							ul.children[p].className = 'hintList';
							
						}
					}
					this.className ='onhover';
					index = j + 1;
				}
				li[j].onclick = function(){
					userInput.value = li[j].innerHTML;
					clear();
				}
				})();   //closure for storing k!
			

		//	li[i].onmouseout = function(){  
		//		this.className('hintList');
		//	}

			ul.appendChild(li[k]);
		}
	}
	else{
		if (  ul.childElementCount === 0){ return false; }
		if (index === 0 ) { originString = value; }
		for( var i = 0; i < ul.childElementCount; i++){
			if (ul.children[i].className === 'onhover'){
				index = i + 1;
				ul.children[i].className = 'hintList';
			}
		

		}
		switch (keynum){
			case 38 :
				if ( index !== 0){
				ul.children[index-1].className = 'hintList';
				console.log('foo');
				index --;
				}
				else{
					console.log('foo2');
					index = ul.childElementCount;
				}
				break;
			case 40:
				if ( index !== ul.childElementCount){
					if(index !== 0){
					ul.children[index-1].className = 'hintList';}
					index ++;

				}
				else{
					ul.children[index-1].className = 'hintList';
					index =0;
				}
				break;
			case 13:
				console.log('keyenter');
				if (index !== 0){
					userInput.value = ul.children[index-1].innerHTML;
					clear();
					return true;
				}
				else{
					clear();
					return true;
				}
		}
		console.log(index);
		if ( index !== 0){
			userInput.value= ul.children[index-1].innerHTML;
			ul.children[index-1].className = 'onhover';
		}
		else{
			userInput.value = originString;
			
		}


		
	}
}
function clear(){
	var lis = ul.getElementsByTagName('li');

	var len = lis.length;
	if(!len) {return false;}
	for (var i=len-1; i >=0; i--){

		lis[i].remove();
	}
	//ul.style.display = 'none';
	index = 0;
	originString = '';
	console.log('clear');
}

//userInput.addEventListener('keyup', check(this.value, event));
