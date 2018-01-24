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