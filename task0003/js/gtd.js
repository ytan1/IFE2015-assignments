var cate1, cate2, taskFile;
localStorage.cate1json = '';        //just for debug
var cate1Text = 					//array of main category
	'['								//should contain JSON objects
	+	'{'
	+		'"name":"Default",'
	+		'"id":-1,'
	+		'"child":[]'	
	+	'},'						
	+	'{'
	+		'"name":"IFE projects",'
	+		'"id":0,'
	+		'"child":[0,1,2,3]'
	+	'},'
	+	'{'
	+		'"name":"Presidential",'
	+		'"id":1,'
	+		'"child":[4,5]'
	+	'}'
	+']';
var cate2Text =
	'['
	+	'{'
	+		'"name":"task0001",'
	+		'"id":0,'	
	+		'"parent":0,'
	+		'"child":[0,1]'
	+	'},'
	+	'{'
	+		'"name":"task0002",'
	+		'"id":1,'	
	+		'"parent":0,'
	+		'"child":[0]'
	+	'},'
	+	'{'
	+		'"name":"task0003",'
	+		'"id":2,'	
	+		'"parent":0,'
	+		'"child":[0]'
	+	'},'
	+	'{'
	+		'"name":"task0004",'
	+		'"id":3,'	
	+		'"parent":0,'
	+		'"child":[0]'
	+	'},'
	+	'{'
	+		'"name":"Meet Trump",'
	+		'"id":4,'	
	+		'"parent":1,'
	+		'"child":[0]'
	+	'},'	
	+	'{'
	+		'"name":"Meet Martians",'
	+		'"id":5,'	
	+		'"parent":1,'
	+		'"child":[0]'
	+	'}'
	+']';
var taskFileText = 
	'['
	+	'{'
	+		'"name":"task0001:1-6",'	
	+		'"id":0,'
	+		'"father":0,'
	+		'"date":"2017-09-30",'
	+		'"content":"task0001:1-6 completed!",'
	+		'"finish":1'
	+	'},'
	+	'{'
	+		'"name":"task0001:7",'	
	+		'"id":1,'
	+		'"father":0,'
	+		'"date":"2017-10-01",'
	+		'"content":"task0001:7 completed!",'
	+		'"finish":1'
	+	'},'
	+	'{'
	+		'"name":"task0002",'	
	+		'"id":0,'
	+		'"father":1,'
	+		'"date":"2017-09-30",'
	+		'"content":"task0002:1-5 completed!",'
	+		'"finish":1'
	+	'},'
	+	'{'
	+		'"name":"task0003",'	
	+		'"id":0,'
	+		'"father":2,'
	+		'"date":"2017-11-26",'
	+		'"content":"task0003 edited.",'
	+		'"finish":0'
	+	'},'
	+	'{'
	+		'"name":"task0004",'	
	+		'"id":0,'
	+		'"father":3,'
	+		'"date":"2017-11-26",'
	+		'"content":"task0004 edited.",'
	+		'"finish":0'
	+	'},'
	+	'{'
	+		'"name":"networking stuff",'	
	+		'"id":0,'
	+		'"father":4,'
	+		'"date":"2020-02-02",'
	+		'"content":"going to meet Trump",'
	+		'"finish":0'
	+	'},'	
	+	'{'
	+		'"name":"another networking stuff",'	
	+		'"id":0,'
	+		'"father":5,'
	+		'"date":"2020-02-02",'
	+		'"content":"meet some guests from Mar",'
	+		'"finish":0'
	+	'}'
	+']';
function taskNum(){

}
function makeType(){
	var taskNum = taskFile.length;
	var choose = document.getElementsByClassName("type-list")[0].getElementsByClassName("choose")[0];
	
	var html = '<h3 class="choose" onclick="clickType(this)">'
			 + 		'<i class="icon-menu"></i><span>All categories(' + taskNum + ')</span>'
			 + '</h3>';
	for (var i = 0; i < cate1.length; i++){
		var grandchildNum = 0;
		var html2 = '';
			for (var j = 0; j < cate2.length; j++){
			 	if (cate2[j].parent === cate1[i].id){
			 		html2 += '<h4 fatherid="' + cate2[j].parent + '" onclick="clickType(this)">'
			 			 +		'<i class="icon-folder"></i><span>' + cate2[j].name + '(' + cate2[j].child.length + ')</span>'
			 			 +		'<i class="icon-trash delete"></i>'
			 			 +	'</h4>';
			 		grandchildNum += cate2[j].child.length;
			 	}	
			 }
		 html += '<h3 onclick="clickType(this)">'
		 	 +		'<i class="icon-menu"></i><span>' + cate1[i].name + '(' + grandchildNum + ')</span><i class="icon-trash delete"></i>'
		 	 +	'</h3>'
		 	 +	html2;
	}
	document.getElementsByClassName("type-list")[0].innerHTML = html;
	var def = document.getElementsByTagName('h3')[1];
	var defaultDel =  def.getElementsByTagName('i')[1];
	def.removeChild(defaultDel);								//remove delete button from default category
	makeTask();
}
function makeTask(){
	var typeChoose = document.getElementsByClassName("type-list")[0].getElementsByClassName("choose")[0];
	var typeTag = typeChoose.tagName.toLowerCase();
	var typeName = typeChoose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'');
	var html = '', childArr = [], dateSeq = [], taskArr = [];
	switch (typeTag){
		case 'h3':
			if (typeName === 'All categories'){
				for (var i = 0; i < taskFile.length; i++){
					if (dateSeq.length === 0){
						dateSeq.push(taskFile[0].date);
					}
					else{
						for(var j = dateSeq.length - 1; j >= 0; j--){
							if ( taskFile[i].date > dateSeq[j]){
								dateSeq.splice(j+1, 0, taskFile[i].date);
								break;
							}
							else if(taskFile[i].date === dateSeq[j]){
								break;
							}
						}
						if (j < 0){
							dateSeq.shift(taskFile[i].date);
						}
					}
				}
				console.log(dateSeq);
				for (var i = 0; i < dateSeq.length; i++){
					html += '<div class="taskDate">' + dateSeq[i] + '</div>';
					for (var j = 0; j < taskFile.length; j++){
						if (taskFile[j].date === dateSeq[i]){
							html += '<h5 onclick="clickTask(this)" fatherid="' + taskFile[j].father + '">'
								 + 		'<span>' + taskFile[j].name + '</span><i class="icon-trash delete"></i>'
								 +	'</h5>';
						}
					}
				}
			}
			else{
				for (var i = 0; i < cate1.length; i++){
					if (cate1[i].name === typeName){
						var childIdArr = cate1[i].child;
						break;
					}
				}
				for (var i = 0; i < childIdArr.length; i++){       //search for childTypes in cate2 according to cate1[i].child = [...]
					var childId = childIdArr[i];
					for ( var j = 0; j < cate2.length; j++){
						if (cate2[j].id === childId){
							childArr.push(cate2[j]);
							break;
						}
					}
					if (j === cate2.length){
						console.log('missing childCate ' + i);
					}													
					for (var k = 0; k < taskFile.length; k++){	// search for tasks belonging to cate1[i]
						if (taskFile[k].father === cate2[j].id){
							taskArr.push(taskFile[k]);
						}
					}   
				}  
				for (var i = 0; i < taskArr.length; i++){
					if (dateSeq.length === 0){
						dateSeq.push(taskArr[0].date);
					}
					else{
						for(var j = dateSeq.length - 1; j >= 0; j--){
							if ( taskArr[i].date > dateSeq[j]){
								dateSeq.splice(j+1, 0, taskArr[i].date);
								break;
							}
							else if(taskArr[i].date === dateSeq[j]){
								break;
							}
						}
						if (j < 0){
							dateSeq.shift(taskArr[i].date);
						}
					}
				}
				for (var i = 0; i < dateSeq.length; i++){
					html += '<div class="taskDate">' + dateSeq[i] + '</div>';
					for (var j = 0; j < taskArr.length; j++){
						if (taskArr[j].date === dateSeq[i]){
							html += '<h5 onclick="clickTask(this)" fatherid="' + taskArr[j].father + '"><span>' + taskArr[j].name + '</span><i class="icon-trash delete"></i></h5>';
						}
					}
				}
			}
			break;
		case 'h4':
			for (var i = 0; i < cate2.length; i++){
				if (cate2[i].name === typeName && typeChoose.getAttribute('fatherid') === cate2[i].parent.toString()){
					break;
				}
			}
			for (var j = 0; j < taskFile.length; j++){
				if (taskFile[j].father === cate2[i].id){
					taskArr.push(taskFile[j]);
				}
			}
			for (var i = 0; i < taskArr.length; i++){
				if (dateSeq.length === 0){
					dateSeq.push(taskArr[0].date);
				}
				else{
					for(var j = dateSeq.length - 1; j >= 0; j--){
						if ( taskArr[i].date > dateSeq[j]){
							dateSeq.splice(j+1, 0, taskArr[i].date);
							break;
						}
						else if(taskArr[i].date === dateSeq[j]){
							break;
						}
					}
					if (j < 0){
						dateSeq.shift(taskArr[i].date);
					}
				}
			}
			for (var i = 0; i < dateSeq.length; i++){
				html += '<div class="taskDate">' + dateSeq[i] + '</div>';
				for (var j = 0; j < taskArr.length; j++){
					if (taskArr[j].date === dateSeq[i]){
						html += '<h5 onclick="clickTask(this)" fatherid="' + taskArr[j].father + '"><span>' + taskArr[j].name + '</span><i class="icon-trash delete"></i></h5>';
					}
				}
			}

			break;
	}
	document.getElementsByClassName("task-list")[0].innerHTML = html;
	makeContent();
}
function makeContent(){
	var taskChoose = document.getElementsByClassName("task-list")[0].getElementsByClassName("choose")[0];
	if (!taskChoose){
		console.log('no task chosen.');
		return;
	}
	var fatherId = taskChoose.getAttribute('fatherid');
	var taskName = taskChoose.getElementsByTagName('span')[0].innerHTML;
	for (var i = 0; i < taskFile.length; i++){
		if (taskFile[i].name === taskName){
			if(taskFile[i].father.toString() === fatherId){
				var task = taskFile[i];
				break;
			}
		}
	}
	if (i === taskFile.length){console.log('task not found in JSON')};
	document.getElementsByClassName('title-output')[0].getElementsByTagName('span')[0].innerHTML = task.name;
	document.getElementsByClassName('date-output')[0].getElementsByTagName('span')[0].innerHTML = task.date;
	document.getElementsByClassName('content-output')[0].innerHTML = task.content;
}
function clickType(ele){
	var oldChoose = document.getElementsByClassName('type-list')[0].getElementsByClassName('choose')[0];
	var newTagName = ele.tagName;
	var newName = ele.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'');
	if(newTagName === 'H3') {var newFatherId = ele.getAttribute('fatherid');}
	var oldName = oldChoose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'');
	var oldTagName = oldChoose.tagName;
	if(oldTagName === 'H3'){var oldFatherId = oldChoose.getAttribute('fatherid');}
	if(newTagName === oldTagName && newName === oldName && newFatherId === oldFatherId){
		return;
	}
	oldChoose.className = oldChoose.className.replace(/\s?choose/,'');
	ele.className += ' choose';
	makeTask();
}
function clickTask(ele){
	var newName = ele.getElementsByTagName('span')[0].innerHTML;
	var newFatherId = ele.getAttribute('fatherid');
	var tasks = document.getElementsByClassName('task-list')[0].getElementsByTagName('h5');
	for (var i = 0; i < tasks.length; i++){
		if (tasks[i].className.indexOf('choose') >= 0){
			if (tasks[i].getElementsByTagName('span')[0].innerHTML === newName && tasks[i].getAttribute('fatherid') === newFatherId){
				return;
			}
			else {
				tasks[i].className = tasks[i].className.replace(/\s?choose/,'');
				break;
			}
		}
	}
	ele.className += ' choose';
	makeContent();
}
function save(){
	localStorage.cate1json = JSON.stringify(cate1);
	localStorage.cate2json = JSON.stringify(cate2);
	localStorage.taskFilejson = JSON.stringify(taskFile);
}
window.onload = function(){
	if (!(localStorage.cate1json)){
		console.log('ha');
		localStorage.cate1json = cate1Text;
		localStorage.cate2json = cate2Text;
		localStorage.taskFilejson = taskFileText;
	}
	cate1 = JSON.parse(localStorage.cate1json);
	cate2 = JSON.parse(localStorage.cate2json);
	taskFile = JSON.parse(localStorage.taskFilejson);
	makeType();
}