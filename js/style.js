
window.onload = function(){
	var wrap = document.querySelector(".wrap");
	var box = document.querySelector(".box");
	box.innerHTML+=box.innerHTML;
	var aLi = document.querySelectorAll(".box li");
	var aNav = document.querySelectorAll("nav span");
	var aHeight = aLi[0].offsetHeight;
	var aWidth = wrap.offsetWidth;
	wrap.style.height = aHeight + 'px';
	box.style.width = aLi.length * 100 + "%";
	for(var i=0;i<aLi.length;i++){
	    aLi[i].style.width = 1/aLi.length * 100 + "%";
	}
	var startPoint = 0;
	var startEle = 0;
	var now = 0;
	var timer = 0;
	cssTransform(box,"translateX",0);
	auto();
	wrap.addEventListener("touchstart",function(e){
	    clearInterval(timer);
	    box.style.transition = "none";
	    var moveX = cssTransform(box,"translateX");
	    now = Math.round(-moveX/aWidth);
	    if(now==0){
	        now = aNav.length;
	    }else if(now==aLi.length-1){
	        now = aNav.length-1;
	    }
	    cssTransform(box,"translateX",-now*aWidth);
	    startPoint = e.changedTouches[0].pageX;
	    startEle = cssTransform(box,"translateX");
	});
	wrap.addEventListener("touchmove",function(e){
	    var endPoint = e.changedTouches[0].pageX;
	    var disX = endPoint - startPoint;
	    cssTransform(box,"translateX",disX+startEle);
	});
	wrap.addEventListener("touchend",function(e){
	    var moveX = cssTransform(box,"translateX");
	    now = Math.round(-moveX/aWidth);
	    tab();auto();

	});
	function auto(){
	    clearInterval(timer);
	    timer = setInterval(function(){
	        if(now == aLi.length-1){
	            now = aNav.length - 1;
	        }
	        box.style.transition = "none";
	        cssTransform(box,"translateX",-now*aWidth);
	        setTimeout(function(){
	            now++;
	            tab();
	        },30);
	    },2000);
	};
	function tab(){
	    box.style.transition = ".5s";
	    cssTransform(box,"translateX",-now*aWidth);
	    for(var i=0;i<aNav.length;i++){
	        aNav[i].className = "";
	    };
	    aNav[now%aNav.length].className = "active";
	}	
}
    function cssTransform(ele,attr,val){
        if(!ele.transform){
            ele.transform = {};
        };

//当传入值时对属性进行设置。
        if(arguments.length>2){
            ele.transform[attr] = val;
            var sval = "";
            for(var s in ele.transform){
                if(s == "translateX"){
                    sval += s + "("+ele.transform[s] +"px)";
                }
                ele.style.WebkitTransform = ele.style.transform = sval;
            }

        }else{
            val = ele.transform[attr];
            if(typeof val=="undefined"){
                if(attr=="translateX"){
                    val = 0;
                }
            };
            console.log(val);
            return val;
        }
    }