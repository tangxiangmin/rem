 function getStyle(dom, key){
    var style
    if (window.getComputedStyle) {
        style = window.getComputedStyle(dom, null)    // 非IE
    } else { 
        style = dom.currentStyle  // IE
    }

    return style[key]
}

// 检测浏览器是否支持calc
function isSupportCalc(){
    var oDiv = document.createElement("div");
    oDiv.style.width = 'calc((100vw / 750) * 100)'
   
    document.body.appendChild(oDiv)
    var width = getStyle(oDiv, 'width')
    oDiv.remove()

    var diff = 0.5

 	width = parseFloat(width)
 	var calcWidth = window.screen.availWidth / 750 * 100

 	return width && Math.abs(calcWidth - width) < diff
}


if (isSupportCalc){
	var newRem = function() {
	    var html = document.documentElement
	    // 设计图标准750px
	    var baseWidth = 750
	    // 屏幕最大宽度800px
	    var maxScreenWitdh = 800
	    var screenWidth = Math.min(maxScreenWitdh, html.getBoundingClientRect().width)
	    html.style.fontSize = screenWidth / 750 * 100 + 'px'
	}

	window.addEventListener('resize', newRem, false)
	window.addEventListener('load', newRem)
}
