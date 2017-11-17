function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g,'');
    
}


var input = document.getElementsByTagName('input')[0];
var button = document.getElementsByTagName('input')[1];
var output = document.getElementById('output2');

function showTiming(){
	var time = input.value;
	time = trim(time);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(time)){
		output.style.color = 'f00';
		output.innerHTML = 'Please input a correct format!'
	}
	var t = Date.parse(time);
	setInterval(function(){
		
	    var now = new Date();
	    var currentMilli = Date.parse(now);
	    var temp = t - currentMilli + 6*60*60*1000;
	    var Day = Math.floor(temp/1000/60/60/24);
	    temp = temp%(1000*60*60*24);
	    var Hour = Math.floor(temp/1000/60/60);
	    temp =temp%(1000*60*60);
	    var Min = Math.floor(temp/1000/60);
	    temp = temp%(1000*60);
	    var Second = temp/1000;
	    output.innerHTML = 'There are still ' + Day + ' days ' + Hour + ' hours ' + Min + ' mins ' + Second + ' seconds.'

	},1000)


}
button.addEventListener('click',showTiming);