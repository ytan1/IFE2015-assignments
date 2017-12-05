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
	+		'"name":"task0002:1-5",'	
	+		'"id":0,'
	+		'"father":1,'
	+		'"date":"2017-09-30",'
	+		'"content":"task0002:1-5 completed!",'
	+		'"finish":0'
	+	'},'
	+	'{'
	+		'"name":"task0003:1",'	
	+		'"id":0,'
	+		'"father":2,'
	+		'"date":"2017-11-26",'
	+		'"content":"task0003 edited.",'
	+		'"finish":0'
	+	'},'
	+	'{'
	+		'"name":"task0004:1",'	
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
function makeType(){
	var taskNum = taskFile.length;
	var choose = document.getElementsByClassName("type-list")[0].getElementsByClassName("choose")[0];
	var addChoose = 0; //for the case where the chosen type is deleted or page first time loaded
	var html = '<h2 id="all-cate" onclick="clickType(this)">'
			 + 		'<i class="icon-menu"></i><span>All categories(' + taskNum + ')</span>'
			 + '</h2>';
	for (var i = 0; i < cate1.length; i++){
		var grandchildNum = 0;
		var html2 = '';
			for (var j = 0; j < cate2.length; j++){
			 	if (cate2[j].parent === cate1[i].id){
			 		html2 += '<h4 fatherid="' + cate2[j].parent + '" onclick="clickType(this)">'
			 			 +		'<i class="icon-folder"></i><span>' + cate2[j].name + '(' + cate2[j].child.length + ')</span>'
			 			 +		'<i class="icon-trash delete" onclick="del(this, event)"></i>'
			 			 +	'</h4>';
			 		grandchildNum += cate2[j].child.length;
			 	}	
			 }
		 html += '<h3 onclick="clickType(this)">'
		 	 +		'<i class="icon-menu"></i><span>' + cate1[i].name + '(' + grandchildNum + ')</span><i class="icon-trash delete"  onclick="del(this, event)"></i>'
		 	 +	'</h3>'
		 	 +	html2;
	}
	document.getElementsByClassName("type-list")[0].innerHTML = html;
	var def = document.getElementsByTagName('h3')[0];
	var defaultDel =  def.getElementsByTagName('i')[1];
	def.removeChild(defaultDel);							//remove delete button from default category
	if(choose){
		if (choose.tagName === 'H2'){
			document.getElementsByTagName('h2')[0].classList.add('choose');
			addChoose = 1;
		}
		else if (choose.tagName === 'H3'){
			var h3 = document.getElementsByTagName('h3');
			for (var i = 0; i < h3.length; i++){
				if(h3[i].getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'') === choose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'')){
					h3[i].classList.add('choose');
					addChoose = 1;
				}
			}
		}
		else if (choose.tagName === 'H4'){
			var h4 = document.getElementsByTagName('h4');
			for (var i = 0; i < h4.length; i++){
				if(h4[i].getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'') === choose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'') && choose.fatherid === h4[i].fatherid){
					h4[i].classList.add('choose');
					addChoose = 1;
				}				
			}
		}
	}
	if(!addChoose){
		document.getElementsByTagName('h2')[0].classList.add('choose');
	}
	makeTask();
}
function makeTask(){
	var typeChoose = document.getElementsByClassName("type-list")[0].getElementsByClassName("choose")[0];
	var typeTag = typeChoose.tagName.toLowerCase();
	var typeName = typeChoose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'');
	var oldTaskChoose = document.getElementsByClassName("task-list")[0].getElementsByClassName("choose")[0];
	var html = '', childArr = [], dateSeq = [], taskArr = [];
	switch (typeTag){
		case 'h2':
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
					html += '<div class="dateWrap"><div class="taskDate">' + dateSeq[i] + '</div>';
					for (var j = 0; j < taskFile.length; j++){
						if (taskFile[j].date === dateSeq[i]){
							html += '<h5 onclick="clickTask(this)" class="finish' + taskFile[j].finish + '" fatherid="' + taskFile[j].father + '">'
								 + 		'<i class="icon-doc"></i><span>' + taskFile[j].name + '</span><i class="icon-trash delete" onclick="del(this, event)"></i>'
								 +	'</h5>';
						}
					}
					html += '</div>';
				}
			}
			break;
		case 'h3':
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
				html += '<div class="dateWrap"><div class="taskDate">' + dateSeq[i] + '</div>';
				for (var j = 0; j < taskArr.length; j++){
					if (taskArr[j].date === dateSeq[i]){
						html += '<h5 onclick="clickTask(this)" class="finish' + taskArr[j].finish + '" fatherid="' + taskArr[j].father + '"><i class="icon-doc"></i><span>' + taskArr[j].name + '</span><i class="icon-trash delete" onclick="del(this, event)"></i></h5>';
					}
				}
				html += '</div>';
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
				html += '<div class="dateWrap"><div class="taskDate">' + dateSeq[i] + '</div>';
				for (var j = 0; j < taskArr.length; j++){
					if (taskArr[j].date === dateSeq[i]){
						html += '<h5 onclick="clickTask(this)" class="finish' + taskArr[j].finish + '" fatherid="' + taskArr[j].father + '"><i class="icon-doc"></i><span>' + taskArr[j].name + '</span><i class="icon-trash delete" onclick="del(this, event)"></i></h5>';
					}
				}
				html += '</div>';
			}
			break;
	}
	document.getElementsByClassName("task-list")[0].innerHTML = html;
	if(oldTaskChoose){                                        //rechoose the task previously chosen
		var tasks = document.getElementsByTagName('h5');
		for (var i = 0; i < tasks.length; i++){
			if (tasks[i].getAttribute('fatherid') === oldTaskChoose.getAttribute('fatherid') && tasks[i].getElementsByTagName('span')[0].innerHTML === oldTaskChoose.getElementsByTagName('span')[0].innerHTML)
				tasks[i].className += ' choose';
		}
	}
	makeContent();
	var statusEle = document.getElementsByClassName('statusul')[0].getElementsByClassName('choose')[0];
	statusEle.click();
}
function makeContent(){
	var taskChoose = document.getElementsByClassName("task-list")[0].getElementsByClassName("choose")[0];
	if (!taskChoose){
		console.log('no task chosen.');
		document.getElementsByClassName('title-output')[0].getElementsByTagName('span')[0].innerHTML = '';
		document.getElementsByClassName('date-output')[0].getElementsByTagName('span')[0].innerHTML = '';
		document.getElementsByClassName('content-output')[0].innerHTML = '';
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
	if (document.getElementsByClassName('title-output')[0].style.display === 'none'){  			// case when another task is in editing
		var r = confirm('Cancle editing the current task: ' + document.getElementsByClassName('title-output')[0].getElementsByTagName('span')[0].innerHTML + '?');
		if (!r){
			return;
		}
		else {
			if(!taskCancel()){
				return;
			}    //need additional code to hit OK for taskCancle()
		}
	}
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
function clickStatus(ele){
	var oldChoose = document.getElementsByClassName('statusul')[0].getElementsByClassName('choose')[0];
	var status = ele.innerHTML;
	var tasks = document.getElementsByTagName('h5');
	ele.className += ' choose';
	oldChoose.className = oldChoose.className.replace(/\s?choose/,'');
	for ( var i = 0; i < tasks.length; i++){
		tasks[i].style.display = 'none';
		tasks[i].parentNode.style.display = 'none';
	}
	switch (status){
		case 'All':
			for ( var i = 0; i < tasks.length; i++){
				tasks[i].style.display = 'block';
				tasks[i].parentNode.style.display = 'block';
			}
			break;
		case 'Done':
			for ( var i = 0; i < tasks.length; i++){
				if(tasks[i].className === 'finish1'){
					tasks[i].style.display = 'block';
					tasks[i].parentNode.style.display = 'block';
				}
			}
			break;
		case 'Undone':
			for ( var i = 0; i < tasks.length; i++){
				if(tasks[i].className === 'finish0'){
					tasks[i].style.display = 'block';
					tasks[i].parentNode.style.display = 'block';
				}
			}
			break;
	}
}
function complete(){
	var taskH5 = document.getElementsByClassName('task-list')[0].getElementsByClassName('choose')[0];
	if(!taskH5){
		alert('Please choose a task ( ͡° ͜ʖ ͡°) ');
		return;
	}
	var taskName = taskH5.getElementsByTagName('span')[0].innerHTML;
	for (var i = 0; i < taskFile.length; i++){
		if(taskFile[i].father.toString() === taskH5.getAttribute('fatherid') && taskFile[i].name === taskName){
			var task = taskFile[i];
			break;
		}
	}
	console.log(i);
	if (task.finish === 1){
		alert("It's already completed (ΦωΦ)");
		return;
	}
	else{
		var r = confirm('Please confirm to complete ' + taskName);
		if(r){
			task.finish = 1;
			taskH5.className = taskH5.className.replace(/(?<=finish)0/, '1');
		}
	}
}
function edit(){
	var taskH5 = document.getElementsByClassName('task-list')[0].getElementsByClassName('choose')[0];
	if(!taskH5){
		alert('Please choose a task ( ͡° ͜ʖ ͡°) ');
		return;
	}
	var taskName = taskH5.getElementsByTagName('span')[0].innerHTML;
	for (var i = 0; i < taskFile.length; i++){
		if(taskFile[i].father.toString() === taskH5.getAttribute('fatherid') && taskFile[i].name === taskName){
			var task = taskFile[i];
			break;
		}
	}
	if (task.finish === 1){ 											// if the task is already done
		var r = confirm('The task is completed. Do you want to re-edit?');
		if (r){
			task.finish = 0;
			taskH5.classList.replace('finish1', 'finish0');				//undo the completing
		}
		else {
			return;														//cancle editing
		}
	}
	var titleInput = document.getElementsByClassName('title-input')[0];
	var titleOutput = document.getElementsByClassName('title-output')[0];
	var dateInput = document.getElementsByClassName('date-input')[0];
	var dateOutput = document.getElementsByClassName('date-output')[0];
	var contentInput = document.getElementsByClassName('content-input')[0];
	var contentOutput = document.getElementsByClassName('content-output')[0];
	titleInput.style.display = 'block';
	titleOutput.style.display = 'none';
	dateInput.style.display = 'block';
	dateOutput.style.display = 'none';
	contentInput.style.display = 'block';
	contentOutput.style.display = 'none';
	titleInput.getElementsByTagName('input')[0].value = task.name;
	dateInput.getElementsByTagName('input')[0].value = task.date;
	contentInput.getElementsByTagName('textarea')[0].value = task.content;
}
function taskCancel(){
	var r = confirm('Are you sure NOT to save?');
	if(!r){
		return false;
	}
	var titleInput = document.getElementsByClassName('title-input')[0];
	var titleOutput = document.getElementsByClassName('title-output')[0];
	var dateInput = document.getElementsByClassName('date-input')[0];
	var dateOutput = document.getElementsByClassName('date-output')[0];
	var contentInput = document.getElementsByClassName('content-input')[0];
	var contentOutput = document.getElementsByClassName('content-output')[0];
	titleInput.style.display = 'none';
	titleOutput.style.display = 'block';
	dateInput.style.display = 'none';
	dateOutput.style.display = 'block';
	contentInput.style.display = 'none';
	contentOutput.style.display = 'block';
	titleInput.getElementsByTagName('input')[0].value = '';
	dateInput.getElementsByTagName('input')[0].value = '';
	contentInput.getElementsByTagName('textarea')[0].value = '';
	document.getElementsByClassName('error')[0].value = '';
	return true;
}
function taskSave(){
	var titleInput = document.getElementsByClassName('title-input')[0];
	var titleOutput = document.getElementsByClassName('title-output')[0];
	var dateInput = document.getElementsByClassName('date-input')[0];
	var dateOutput = document.getElementsByClassName('date-output')[0];
	var contentInput = document.getElementsByClassName('content-input')[0];
	var contentOutput = document.getElementsByClassName('content-output')[0];

	var taskH5 = document.getElementsByClassName('task-list')[0].getElementsByClassName('choose')[0];
	var taskName = taskH5.getElementsByTagName('span')[0].innerHTML;

	for (var i = 0; i < taskFile.length; i++){
		if(taskFile[i].father.toString() === taskH5.getAttribute('fatherid') && taskFile[i].name !== taskName && taskFile[i].name === titleInput.getElementsByTagName('input')[0].value){
			document.getElementsByClassName('error')[0].innerHTML = 'This name already exists in current folder! ...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄....';
			return;
		}
		if(taskFile[i].father.toString() === taskH5.getAttribute('fatherid') && taskFile[i].name === taskName){
			var task = taskFile[i];
		}
	}
	if(titleInput.getElementsByTagName('input')[0].value === ''){
		document.getElementsByClassName('error')[0].innerHTML = 'Invalid title';
		return;
	}
	var dateTestify = new Date(dateInput.getElementsByTagName('input')[0].value);
	if(dateTestify.toString() === 'Invalid Date'){
		document.getElementsByClassName('error')[0].innerHTML = 'This date is not valid enough! ...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄....';
		return;
	}	
	document.getElementsByClassName('error')[0].innerHTML = '';
	var r = confirm('Are you sure to save it?');
	if(!r) {
		return;
	}
	task.name = titleInput.getElementsByTagName('input')[0].value;
	task.date = dateInput.getElementsByTagName('input')[0].value;
	task.content = contentInput.getElementsByTagName('textarea')[0].value;
	makeTask();
	makeContent();
	titleInput.style.display = 'none';
	titleOutput.style.display = 'block';
	dateInput.style.display = 'none';
	dateOutput.style.display = 'block';
	contentInput.style.display = 'none';
	contentOutput.style.display = 'block';
}
function addType(){
	var cover = document.getElementsByClassName('cover')[0];
	cover.classList.toggle('hidden');
	var popup = document.getElementsByClassName('popup')[0];
	popup.classList.toggle('hidden');
	var typeSelect = document.getElementById('type-select');
	var build = document.getElementById('build1');
	var cancel = document.getElementById('cancel1');
	var input = document.getElementById('select1-input');
	var error = document.getElementById('select1-error');
	var cateSelectDiv = document.getElementById('category-select-div');
	var html = '';
	typeSelect.onchange = function(){
		if (typeSelect.value === '1'){
			cateSelectDiv.innerHTML = '';
			return;
		}
		if (typeSelect.value === '2'){
			for (var i = 0; i < cate1.length; i++){
				html += '<option value="' + i + '">' + cate1[i].name + '</option>'
			}
			cateSelectDiv.innerHTML = '<select id="category-select">' + html + '</select>';
		}
	}
	cancel.onclick = cancelPop;
	document.getElementsByClassName('close')[0].onclick = cancelPop;
	function cancelPop(){
		console.log('ha');
		cover.classList.toggle('hidden');
		popup.classList.toggle('hidden');
		cateSelectDiv.innerHTML = '';
		error.innerHTML = '';
		input.value = '';
		typeSelect.value = '';
	}
	build.onclick = typeBuild;
	function typeBuild(){
		if(typeSelect.value === '1'){
			for(var i = 0; i < cate1.length; i++){
				if(cate1[i].name === input.value){
					error.innerHTML = 'This name already exists.';
					return;
				}
			}
			var newEle = {};
			newEle.name = input.value;
			newEle.id = cate1[i-1].id + 1;
			newEle.child = [];
			cate1.push(newEle);
			makeType();
			cancelPop();
		}
		if(typeSelect.value === '2'){
			for(var i = 0; i < cate1.length; i++){
				if(i === parseInt(document.getElementById('category-select').value)){
					break;
				}
			}
			for(var j = 0; j < cate2.length; j++){
				if(cate2[j].parent === cate1[i].id && cate2[j].name === input.value){
					error.innerHTML = 'This name already exists in the same category.'
					return;
				}
			}
			var newEle = {};
			newEle.name = input.value;
			newEle.id = cate2.length;
			newEle.parent = cate1[i].id;
			newEle.child = [];
			cate2.push(newEle);
			cate1[i].child.push(newEle.id);
			makeType();
			cancelPop();
		}
	}
}
function addTask(){
	var choose = document.getElementsByClassName('type-list')[0].getElementsByClassName('choose')[0];
	if (choose.tagName !== 'H4'){
		alert('Please choose a category first.');
		return;
	}
	for (var i = 0; i < cate2.length; i++){
		if (cate2[i].name === choose.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/, '') && cate2[i].parent.toString() === choose.getAttribute('fatherid')){
			break;
		}
	}
	var newTask = {};
	var today = new Date();
	newTask.name = '';
	newTask.date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
	newTask.father = cate2[i].id;
	newTask.finish = 0;
	newTask.content = '';
	newTask.id = cate2[i].child.length;
	cate2[i].child.push(newTask.id);
	taskFile.push(newTask);
	makeType();
	var h5 = document.getElementsByTagName('h5');
	for(var j = 0; j < h5.length; j++){
		if(h5[j].getElementsByTagName('span')[0].innerHTML === ''){
			h5[j].getElementsByTagName('span')[0].click();
		}
	}
	document.getElementsByClassName('i2')[1].click();
}
function save(){
	localStorage.cate1json = JSON.stringify(cate1);
	localStorage.cate2json = JSON.stringify(cate2);
	localStorage.taskFilejson = JSON.stringify(taskFile);
}
function del(ele,e){
	var r = confirm('Are you sure to delete? This is irreversible.')
	if(!r){
		return;
	}
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	var parent = ele.parentNode;
	var tag = parent.tagName;
	if(tag === 'H3'){
		var childCateIndex = [];
		var typeName = parent.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'');
		for(var i = 1; i < cate1.length; i++){
			if(cate1[i].name === typeName){
				break;
			}
		}
		for(var j = cate2.length - 1; j >= 0; j--){
			if(cate2[j].parent === cate1[i].id){
				childCateIndex.push(cate2[j].id);
			}
		}
		for(var k = taskFile.length - 1; k >= 0; k--){
			if(childCateIndex.includes(taskFile[k].father)){
				taskFile.splice(k, 1);
			}
		}
		for(var j = cate2.length - 1; j >= 0; j--){
			if(cate2[j].parent === cate1[i].id){
				cate2.splice(j,1);
			}
		}
		cate1.splice(i, 1);
	}
	else if(tag === 'H4'){
		for(var i = 0; i < cate2.length; i++){
			if(cate2[i].name === parent.getElementsByTagName('span')[0].innerHTML.replace(/\(\d+\)$/,'')){
				if(cate2[i].parent.toString() === parent.getAttribute('fatherid')){
					break;
				}
			}
		}
		for(var j = taskFile.length - 1; j >= 0; j--){
			if(cate2[i].id === taskFile[j].father){
				taskFile.splice(j, 1);
			}
		}
		for(var k = 0; k < cate1.length; k++){
			if(cate1[k].id === cate2[i].parent){
				var deleteChild = cate1[k].child.indexOf(cate2[i].id);
				console.log(deleteChild);
				cate1[k].child.splice(deleteChild, 1);
			}
		}
		cate2.splice(i, 1);
	}
	else{
		for(var i = 0; i < taskFile.length; i++){
			if(taskFile[i].name === parent.getElementsByTagName('span')[0].innerHTML && taskFile[i].father + '' === parent.getAttribute('fatherid')){
				break;
			}
		}
		for(var j = 0; j < cate2.length; j++){
			if(taskFile[i].father === cate2[j].id){
				cate2[j].child.splice(cate2[j].child.indexOf(taskFile[i].id), 1);
				break;
			}
		}
		taskFile.splice(i, 1);
	}
	makeType();
}
window.onload = function(){
	if (!(localStorage.cate1json)){
		localStorage.cate1json = cate1Text;
		localStorage.cate2json = cate2Text;
		localStorage.taskFilejson = taskFileText;
	}
	cate1 = JSON.parse(localStorage.cate1json);
	cate2 = JSON.parse(localStorage.cate2json);
	taskFile = JSON.parse(localStorage.taskFilejson);
	makeType();
}