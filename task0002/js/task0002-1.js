function addEvent(element, event, listener) {
    // your implement
    element.addEventListener(event, listener);
}
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g,'');
    
}
function uniqArray(arr) {
    // your implement
    var b = arr.length;
    
    for (var i = b-1; i > 0; i--){
    	
    	for (var j = i-1; j>=0; j--){
    		if (arr[j] === arr[i]){
    			arr.splice(i,1);
    			break;
    		}
    	}
    }
    
    return arr;
}

var isChanged = 0;
var input = document.getElementsByTagName('textarea')[0];
var submit = document.getElementsByTagName('input')[0];
addEvent(input,'focus',function(){
	if (input.value === 'please input your hobby' && isChanged === 0){
	input.value = '';
	input.style.color = '#222';
	isChanged = 1;
	}
});

function checkInputFocus(){
	if (input !== document.activeElement){
		if (!trim(input.value)){
			input.value = 'please input your hobby';
			input.style.color = '#f0eded';
			isChanged = 0;
		}
		
	}
		console.log('foo');
}
document.body.addEventListener('click',checkInputFocus);



submit.addEventListener('click', function(){
	var hobbies = input.value;
	var output = document.getElementById('output');
	if (!isChanged || !trim(input.value) ) {hobbies =  '';
		output.style.color = '#00f';
		output.innerHTML = 'Please input at least 1 hobby!';
		return 0;
	}
	hobbies = trim(hobbies).split(/[\u3000\s]+/);
	console.log(hobbies);
	hobbies = uniqArray(hobbies);
	console.log(hobbies);
	var len = hobbies.length;

	console.log(len);
	
	if (len > 10){
		output.style.color = '#00f';
		output.innerHTML = 'Please input hobbies fewer than 10!';
	}
	
	else {
		output.innerHTML = '';

		
		for(var i = 0; i < len; i++){
			var single = document.createElement('div');
			single.id = 'hobby_' + i;
			output.appendChild(single);
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			single.appendChild(checkbox);

			var text = document.createTextNode(hobbies[i] );
			single.appendChild(text);
		}
		
	}
})



