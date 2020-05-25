# web安全及处理

### SQL注入

攻击原理：后端有时候需要从前端发送的请求中获取数据(get请求url的querystring、post请求的databody)并拼接到原SQL语句中来做数据库操作，攻击者将SQL代码添加到前端请求中传递给后端，并通过特殊的写法改写了原SQL的执行逻辑或执行了注入的恶意SQL代码，从而达到增删改查数据库的目的。

**如何预防？**

1. 对用户的输入进行校验、转义
 - 解释：通过正则表达式匹配一些关键字符，如单引号、双减号、分号(分隔符)、井号(注释符)等，匹配成功后对其进行修改(拦截或转义)，从而让攻击者的SQL代码无效化。
 - 解决：前端、后端

2. 不使用SQL语句拼接的方式来嵌入用户输入，使用预编译(参数化)语句替代
 - 解释：因为注入的SQL代码需要执行才能发挥作用，不使用SQL语句拼接就不会在SQL语句执行时使用用户输入了，所以用户输入中被注入的SQL代码就没用了。
 - 解决：后端

3. 降低访问权限
 - 解释：该方式无法阻止SQL代码注入，但能最大限度的减少SQL代码注入对数据库带来的危害。
 - 解决：后端、DBA

4. 对敏感数据加密
 - 解释：该方式无法阻止SQL代码注入，但能防止敏感数据的泄漏。
 - 解决：后端

5. 避免直接向用户显示数据库错误信息
 - 解释：防止攻击者通过这些错误信息来获取有关数据库的信息，从而找出安全漏洞。
 - 解决：前端、后端

6. 启用Web应用防火墙(WAF)
 - 解释：Web应用防护墙(Web Application Firewall，简称WAF)是通过执行一系列针对HTTP/HTTPS的安全策略来专门为Web应用提供保护的一款产品，主要用于防御针对网络应用层的攻击，像SQL注入、跨站脚本攻击(XSS)、参数篡改、应用平台漏洞攻击、拒绝服务攻击等。WAF部署在web应用程序前面，在用户请求到达web服务器前对用户请求进行扫描和过滤，分析并校验每个用户请求的网络包，确保每个用户请求有效且安全，对无效或有攻击行为的请求进行阻断或隔离。
 - 解决：后端、运维

### XSS

攻击原理：攻击者将一段JS脚本代码通过某种方式添加到浏览器端解释执行，从而获取用户信息或控制用户浏览器行为。XSS是针对浏览器端的攻击。攻击方式有3种：反射型XSS、存储型XSS、DOM-based XSS。

> **反射型XSS**：攻击者先修改正常的链接，嵌入一段XSS代码，然后诱导用户去访问这个修改后的链接，就会将XSS代码通过请求发送到服务端，服务端解析请求，提取XSS代码，拼接到HTML代码中发送给浏览器，浏览器执行DOM解析，其中的XSS代码也会被执行。
>
> **存储型XSS**：和反射型的区别在于发送给服务端的XSS代码会被服务器存储下来，以后不需要再发送。例如留言板XSS，攻击者将XSS代码作为留言数据发送给服务器后被存储下来，其他用户查看留言时，也加载了攻击者的留言数据，其中的XSS代码就会被浏览器解析执行。
>
> **DOM-based XSS**：和反射型的区别在于XSS代码不需要服务端处理，前端自己通过JS提取链接或用户输入中的XSS代码并执行。危险的DOM操作有：document.write、innerHTML、url跳转/请求等。

**如何预防？**

1. 对Html保留字符进行转义编码
 - 方案：将 <、>、'、"、/、&、space 转义为实体字符
 - 解释：Html保留字符转义成实体字符后，XSS代码就失去了执行能力。
 - 解决：前端、后端

2. 对Html Attribute值进行html编码
 - 方案：除数字、字母以外，其它Unicode值小于256的字符编码成 `&#x+16进制;` 形式
 - 解释：比如 `<input value="$value" />` 这种，假如我们使用字符串拼接的方式给 $value 传入 `" onclick="alert('xss')` 这样的值，那么结果就会变成 `<input value="" onclick="alert('xss')" />` 这样，onclick事件就被插入到input元素上，从而XSS代码生效。
 - 解决：前端、后端

3. 对Javascript代码进行js编码
 - 方案：除数字、字母以外，其它Unicode值小于256的字符编码成 `\x+16进制` 形式
 - 解释：html中存在很多支持协议解析的属性，如onclick、onerror、href、src等，这些属性我们无法通过html编码来防范XSS攻击。比如 `<a href="javascript:alert('xss')">xss</a>` 这种链接是可以点击的，即使对其进行html编码成 `&#x+16进制;` 形式，还是可以执行，需要对其进行js编码成 `\x+16进制` 形式。
 - 解决：前端、后端

4. 对URL参数进行url编码
 - 方案：encodeURIComponent
 - 解释：攻击者通常会把XSS代码添加到URL查询参数部分，对其进行url编码就能使XSS代码丧失执行能力。
 - 解决：前端

5. 使用setAttribute、textContent、innerText设置值
 - 解释：这三种赋值方式的赋值结果都是字符串，没有执行能力。
 - 解决：前端

6. 启用内容安全策略(CSP)
 - 解释：CSP用来控制网页中哪些资源可以加载和执行，本质上是一个白名单。可以通过禁止非同源script脚本的加载和unsafe-inline/unsafe-eval脚本的执行来防范XSS攻击。
 - 解决：前端(meta)、后端(header)

7. 设置cookie安全策略，如http-only
 - 解释：服务端设置cookie时，将http-only设置为true，这样前端就无法通过document.cookie来读取cookie值了，攻击者就无法获取用户cookie中的信息。
 - 解决：后端

```javascript
// html编码
function encodeForHTMLAttibute(str) {
  let encoded = '';
  for(let i = 0; i < str.length; i++) {
    let ch = hex = str[i];
    if (!/[A-Za-z0-9]/.test(str[i]) && str.charCodeAt(i) < 256) {
      hex = '&#x' + ch.charCodeAt(0).toString(16) + ';';
    }
    encoded += hex;
  }
  return encoded;
};

// js编码
function encodeForJavascript(str) {
  let encoded = '';
  for(let i = 0; i < str.length; i++) {
    let cc = hex = str[i];
    if (!/[A-Za-z0-9]/.test(str[i]) && str.charCodeAt(i) < 256) {
      hex = '\\x' + cc.charCodeAt().toString(16);
    }
    encoded += hex;
  }
  return encoded;
};
```

[web安全之XSS攻击原理及防范](https://www.cnblogs.com/tugenhua0707/p/10909284.html)
[从xss平台搭建到csp规则](https://www.cnblogs.com/sijidou/p/10695195.html)

### CSRF

攻击原理：用户X访问网站A并登录成功，此时服务端会将用户X的登录信息(sessionId)放在cookie中返回给浏览器，浏览器记录cookie以便下次访问网站A时直接登录。攻击者Y部署了一个恶意网站B，然后用户X又访问了网站B，攻击者通过各种手段(如广告、设置隐藏图片)诱导用户X发起了一个和网站A中相同的请求但是包含攻击代码，该请求会自动携带用户X的cookie信息，如果此时cookie还未失效，校验就会通过，攻击完成。

CSRF和XSS的区别：

- CSRF需要用户登录后操作，XSS不需要。
- CSRF通过对页面的API请求中注入攻击代码来实现对服务器端的操作，XSS通过植入js脚本到页面中来实现对浏览器端的操作。
- CSRF不需要知道用户cookie的具体内容，XSS针对cookie的攻击需要获取cookie的内容。

**如何预防？**

1. 对请求头中的referer/referrer字段进行校验
 - 解释：CSRF攻击的请求是从攻击者部署的网站发起的，请求头中的referer字段是攻击者的网站地址，通过对referer字段进行判断，拒绝所有非自己网站发起的请求，即可阻止CSRF攻击。
 - 解决：后端

2. 使用token代替cookie传递用户信息
 - 解释：CSRF攻击是利用了cookie传递用户信息来做校验的原理，那我们不使用cookie来校验就好了。
 - 解决：前端+后端

3. 对cookie设置SameSite属性
 - 解释：SameSite属性用来限制请求从第三方网站发起时cookie的发送行为，有3种可选值：Strict、Lax、None。
     - Strict：请求的url必须和发起请求页面的url属于同一个站点时才会发送cookie，即从第三方页面发起的请求不会发送cookie。比如有网站A和网站B，网站A采用了Strict策略，网站B中有个链接能跳转到网站A，我们登录了网站A，浏览器中存储了对应的cookie，我们下次直接地址栏访问网站A就会自动登录，而从网站B点击链接跳转到网站A时就不会自动登录。
     - Lax：允许部分从第三方页面发起的请求携带cookie。共三种情况：链接(a标签、location.href、window.open)、预加载请求(link标签rel="prerender")、form表单get方式提交。
     - None：不限制cookie发送。chrome80版本之前的默认设置，80版本开始默认值为Lax，想要设置成None，必须同时设置Secure属性(cookie只能通过https协议发送)，否则无效。
 - 解决：后端

4. 对安全性要求较高的操作使用验证码
 - 解释：没什么好说的，增加了一层手动验证机制。
 - 解决：前端+后端+用户

### 中间人攻击

攻击原理：在通讯的两端(C2S或S2S)之间建立一个拦截点，随后两端之间的所有通讯都会被拦截点拦截。

**如何预防？**

1. 使用https协议
 - 解释：https协议通过密文传输数据，即便被中间人拦截获取了数据，也都是加密后的数据，这样就不用担心数据泄露。另外，由于中间人没有通讯两端协商产生的加密密钥，也无法伪造数据。
 - 解决：后端

[HTTPS中间人攻击及其防范](https://segmentfault.com/a/1190000013075736)

### 账号安全策略

1. 增加密码长度与复杂度
2. 账号密码传输给服务端之前，先进行MD5加密，服务端存入数据库时，再进行SHA1加密
3. 新设备登录时，发送短信提醒
4. 登录后长时间不操作，自动退出登录，通常连接服务器操作时都有这个设置
5. 通过图形验证码/滑块来区分操作是人为还是机器行为，限制短时间内的重复频繁操作
6. 通过短信验证码/动态身份验证器进行登录/二次验证
7. 锁定连续多次密码输入错误的账号
8. 对长期未登录/未修改密码的账号发消息提醒，建议修改密码
9. 监测异常行为
