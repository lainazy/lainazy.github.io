---
title: 杂记
date: 2017-09-11 18:34:44
tags: 其他
---

### Mac 开发环境搭建

- `homebrew安装` -- 执行 `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- `node安装` -- 通过nvm安装，nvm使用homebrew安装
- `jdk安装` -- 执行java -version，若电脑本来没有安装jdk会自动提示进入官网下载jdk安装
- `android sdk安装` -- 可以使用brew install android-sdk安装（注意需要翻墙）
- `Xcode命令行工具安装` -- 执行xcode-select --install（网上说其中包含git，但我没找到）
- `git安装` -- 执行brew install git
- `svn安装` -- 在xclient.info网站下载cornerstone工具安装，显然任何来源选项并直接选择：sudo spctl --master-disable
- `cordova安装` -- 执行sudo npm install -g cordova（npm所有的安装最好都翻墙）
- `ionic安装` -- 执行sudo npm install -g ionic
- `gulp安装` -- 执行sudo npm install -g gulp
- `webpack安装` -- 执行sudo npm install -g webpack
- `vue-cli安装` -- 执行sudo npm install -g vue-cli

### Mac Cordova/Ionic 打 android --release 包

- `ionic build android --release` -- 生成android-armv7-release-unsigned.apk文件
- `keytool -genkey -v -keystore release-key.keystore(数字签名文件名) -alias alias_name(项目别名) -keyalg RSA -keysize 2048 -validity 10000` -- 生成数字签名文件
- `ln -s platforms/androidild/outputs/apk android-apk(软链接替身名)` -- 给android-armv7-release-unsigned.apk文件所在目录制作替身
- `ls android-apk` -- 查看android-apk软链接对应的目录
- `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -tsa https://timestamp.geotrust.com/tsa -keystore release-key.keystore android-apk/android-armv7-release-unsigned.apk alias_name` -- 给apk文件添加签名
- `jarsigner -verify -verbose -certs android-apk/android-armv7-release-unsigned.apk` -- 校验apk文件，可不执行
- `ln -s android-sdkild-tools/24.0.0(zipalign所在目录) build-tools-24(软链接替身名)` -- 给zipalign工具制作替身
- `build-tools-24/zipalign -v 4 android-apk/android-armv7-release-unsigned.apk android-apk/android-armv7-release.apk(优化压缩后的文件名)` -- 优化压缩apk文件并重命名

- `jarsigner -verbose -keystore release-key.keystore(数字签名文件名) -signedjar android-armv7-release.apk android-armv7-release-unsigned.apk alias_name(项目别名)` -- 简写CLI

### 用 JS 获取 url 中参数的方法（正则表达式）

```javascript
function getUrlValue(key) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    const result = window.location.search.substr(1).match(reg);
    return result && decodeURIComponent(result[2]);
}
```

### 用 JS 获取 url 中【协议://主机名:端口号】 的方法（正则表达式）

```javascript
url.replace(url.replace(/\w+:\/\/\w+(\.\w+)+(:\d+)*/, ''), '');
```

### 微信页面头标题更新 （iframe添加 onload监听事件的方式）

```javascript
function updateWxTitle(title) {
    var body = document.getElementsByTagName('body')[0];
    document.title = title;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "/favicon.ico");
    iframe.style.display = 'none';
    var onLoad = function () {
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 0);
    };
    iframe.onload = onLoad(); // iframe.addEventListener('load', onLoad, false)在有些android手机上无效
    document.body.appendChild(iframe);
}
```

### 生成随机字符串（可设置字符串长度范围或固定长度）

```javascript
function generateString(randomLengthFlag, minLength, maxLength) {
  const strArray = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let randomStrLength = minLength;
  let randomStr = '';
  if (randomLengthFlag) { //true表示长度不固定
    randomStrLength = Math.round(Math.random() * (maxLength - minLength)) + minLength;
  }
  for (let i = 0, index; i < randomStrLength; i++) {
    index = Math.round(Math.random() * (strArray.length - 1));
    randomStr += strArray[index];
  }
  return randomStr;
}
```

### JS 将数字转换成大写金额

```javascript
var digitUppercase =function(n){
    var fraction =['角','分'];
    var digit =[
        '零','壹','贰','叁','肆',
        '伍','陆','柒','捌','玖'
    ];
    var unit =[
        ['元','万','亿'],
        ['','拾','佰','仟']
    ];
    var head = n <0?'欠':'';
    n =Math.abs(n);
    var s ='';
    for(var i =0; i < fraction.length; i++){
        s +=(digit[Math.floor(n *10*Math.pow(10, i))%10]+ fraction[i]).replace(/零./,'');
    }
    s = s ||'整';
    n =Math.floor(n);
    for(var i =0; i < unit[0].length && n >0; i++){
        var p ='';
        for(var j =0; j < unit[1].length && n >0; j++){
            p = digit[n %10]+ unit[1][j]+ p;
            n =Math.floor(n /10);
        }
        s = p.replace(/(零.)*零$/,'').replace(/^$/,'零')+ unit[0][i]+ s;
    }
    return head + s.replace(/(零.)*零元/,'元')
        .replace(/(零.)+/g,'零')
        .replace(/^整$/,'零元整');
};
console.log(digitUppercase(7682.01)); //柒仟陆佰捌拾贰元壹分
console.log(digitUppercase(7682)); //柒仟陆佰捌拾贰元整
console.log(digitUppercase(951434677682.00)); //玖仟伍佰壹拾肆亿叁仟肆佰陆拾柒万柒仟陆佰捌拾贰元整
```

### 校验价格输入的正则表达式（vue）

```html
<input type="tel" placeholder="¥" :value="price" @input="input($event.target, price)">
```

```javascript
input(element, price) {
    element.value = element.value.replace(/\D/g, '');
    element.value = element.value == 0 ? element.value && 0 : element.value.replace(/^0+/g, '');
    price = element.value;
}
```

### 单行评级组件

```javascript
"★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
```

### 数字金额化

```javascript
var format = test.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
```

### 防抖函数

```javascript
function debounce(fn, delay, context) {
  let timeoutId = null;

  return () => {
    clearTimeout(timeoutId);

    let args = arguments;
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};
```
