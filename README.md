rem布局
===

在移动端项目中使用rem布局已经由很长一段时间了，现在整理一下。

## CSS实现

```scss
// rem.scss
html {
    font-size: -webkit-calc((100vw / 750) * 100);
    font-size: calc((100vw / 750) * 100);
}

@media screen and (min-width:800px) {
    html {
        font-size: 100px;
    }
    body {
        width: 800px;
        margin: 0 auto;
    }
}

@function rem($px) {
    @if (unitless($px)) {
        @return 1rem * ($px/100);
    } @else {
        @return 1rem * ($px/100px);
    }
}
```

### 实现方式

通过`calc`函数计算根字体大小，然后所有布局尺寸均使用rem单位即可

为了方便编写，定义了一个SCSS函数，用于将设计图尺寸转换为rem。在小程序中，可以通过将`rem`单位修改为`rpx`，实现样式表的无缝迁移~

样式表中只需要编写`width:rem(200)`即可，其中，`200`为750标准设计图的标注尺寸。这样基本可以完美还原设计图

### PC上浏览移动站 

为了避免在PC站打开浏览器导致字体过大，处理方式是进行媒介查询，限定最大的rem值，这样做的缺点是`fixed`的元素可能会溢出容器。

之前张鑫旭大神在博客中提出了一个更合理的[实践方案](http://www.zhangxinxu.com/wordpress/2016/08/vw-viewport-responsive-layout-typography/)。

```css
html {
    font-size: 16px;
}

@media screen and (min-width: 375px) {
    html {
        /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
        font-size: calc(100% + 2 * (100vw - 375px) / 39);
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
        font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
        font-size: calc(125% + 4 * (100vw - 600px) / 400);
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px往后是每100像素0.5px增加 */
        font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
        font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
    }
}
```

这里的缺点在于：尺寸并不是完全按照设计图的比例还原，如果设计师那边没问题，这种处理方式更优。

## JavaScript实现

上面的实现完全由CSS控制，不需要根据JavaScript来动态计算根字体的大小。但是仍旧需要考虑calc兼容性的问题。这里是关于calc的[兼容列表](https://caniuse.com/#search=calc)，可以看见基本满足生产条件了。

在需要适配某些不支持calc特性的版本下（比如在Android `V4.4.4`以下版本不支持乘法和除法计算），可以使用JavaScript向下兼容（虽然很不情愿这么干~）

```
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
```

