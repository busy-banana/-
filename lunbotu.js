window.onload = function (){
	var container = document.getElementById('container');
	var imgList = document.getElementById('img-list');
	var btns = document.getElementsByTagName('span');
	var goLeft = document.getElementById('go-left');
	var goRight = document.getElementById('go-right');
	var number = 1;		//每张图片对应的数字，用来控制底部按键(1-6)
	var autoPlay = '';

//点击左侧箭头向前翻页
	goLeft.onclick = function (){
		fadeOutIn(0.8);    //淡出
		setTimeout(function(){
		//如果是第一张图片，点击向左跳到最后一张图片
		if(imgList.style.left == '0px'){
			imgList.style.left = -3400 +'px';   
			number = 6;
		}
		else{
		//跳向上一张图片
			imgList.style.left = parseInt(imgList.style.left) + 680 +'px';
			number -= 1;
		}
		showBtns();
		fadeOutIn(1);	//淡入
		}, 400);
	}

//点击右侧箭头向后翻页
	goRight.onclick = function (){
		fadeOutIn(0.8);
		setTimeout(function(){
		//如果是最后张图片，点击向右跳到第一张图片
		if(imgList.style.left == '-3400px'){
			imgList.style.left = 0;
			number = 1;
		}
		else{
		//跳向下一张图片
			imgList.style.left = parseInt(imgList.style.left) - 680 +'px';
			number += 1;
		}
		showBtns();
		fadeOutIn(1);
		}, 400);
	}

//橙色按钮跟随页面变化
	function showBtns(){
		for(var i = 0;i < 6;i++){
			btns[i].className = '';
		}
		btns[number - 1].className = 'selected';
	}

//点击底部按钮快捷跳转图片
	for(var i = 0;i < 6;i++){
		btns[i].onclick = function (){
			if(this.className == 'selected'){
				return;
			}
//			console.log(this.getAttribute('number'));
			number = this.getAttribute('number');    //从html标签中获取number值
			fadeOutIn(0.8);
			setTimeout(function(){
			imgList.style.left = (number-1) * -680 +'px';
			showBtns();
			fadeOutIn(1);
			},400);
		}
	}

//图片自动播放,间隔5秒
	function play(){
		autoPlay = setInterval(function(){
			goRight.onclick();
		},5000);
	}

//图片停止自动播放
	function stop(){
		clearInterval(autoPlay);
	}	

//设置图片透明度
/*	function setOpacity(value){
		imgList.style.opacity = value;
	}

//图片淡入淡出效果
	function fadeIn(){
		var i = 0.8;
		var timer = setInterval(function(){
			if(i <= 1){
			setOpacity(i);
			i += 0.05;
			}else{clearInterval(timer);}
		}, 50);
	}

	function fadeOut(){
		var i = 1;
		var timer = setInterval(function(){
			if(i >= 0.8){
			setOpacity(i);
			i -= 0.05;
		}else{clearInterval(timer);}
		}, 50);
	}
*/
	function fadeOutIn(value){
		imgList.style.opacity = value;
		imgList.style.transition = 'opacity 0.4s linear 0s';	
	}

//鼠标移到container中停止自动播放
	container.onmouseover = stop;
//鼠标移出container开始自动播放
	container.onmouseout = play; 

	play();
}