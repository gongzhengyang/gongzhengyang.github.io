import{_ as s,o as a,c as l,Q as n}from"./chunks/framework.36bc40e2.js";const F=JSON.parse('{"title":"launchd和launchctl","description":"","frontmatter":{},"headers":[],"relativePath":"published/system/macos使用launchd管理后台服务.md","filePath":"published/system/macos使用launchd管理后台服务.md","lastUpdated":1700106669000}'),p={name:"published/system/macos使用launchd管理后台服务.md"},o=n(`<h1 id="launchd和launchctl" tabindex="-1"><code>launchd</code>和<code>launchctl</code> <a class="header-anchor" href="#launchd和launchctl" aria-label="Permalink to &quot;\`launchd\`和\`launchctl\`&quot;">​</a></h1><p><code>launchd</code>是<code>macos</code>系统下的服务管理框架，用于启动，停止，管理守护进程和服务，是第一个进程，<code>PID</code>为1，创建了所有其他进程</p><p><code>launchctl</code>是<code>launchd</code>的管理工具，二者之间的关系类似于<code>linux</code>系统的<code>systemd</code>和<code>systemctl</code></p><h2 id="基本逻辑" tabindex="-1">基本逻辑 <a class="header-anchor" href="#基本逻辑" aria-label="Permalink to &quot;基本逻辑&quot;">​</a></h2><ol><li><p>当<code>launchd</code>启动后，扫描<code>/System/Library/LaunchDaemons</code>和<code>/Library/LaunchDaemons</code>中的<code>plist</code>文件并加载，以<code>root</code>或者指定用户权限运行，在开机未输入密码的时候就开始运行，如果要配置开机自启动服务，推荐把<code>plist</code>文件放到<code>/Library/LaunchDaemons</code>中</p></li><li><p>输入密码登入系统后，扫描<code>/System/Library/LaunchAgents</code>、<code>/Library/LaunchAgents</code>（<code>plist</code>文件所有用户可见）、<code>~/Library/LaunchAgents</code>（<code>plist</code>当前用户可见）这三个目录中的<code>plist</code>文件并加载，以当前用户权限运行，在开机并且输入账号密码之后开始运行</p></li><li><p>每一个<code>plist</code>文件，都叫一个<code>Job</code>(即一个任务)，只有<code>plist</code>里设置了<code>RunAtLoad</code>为<code>true</code>或<code>keepAlive</code>为<code>true</code>时，才会在加载这些<code>plist</code>文件的同时启动<code>plist</code>所描述的服务</p></li></ol><p>下面开始编写<code>plist</code>文件并加载运行，重启验证</p><h2 id="plist文件" tabindex="-1"><code>plist</code>文件 <a class="header-anchor" href="#plist文件" aria-label="Permalink to &quot;\`plist\`文件&quot;">​</a></h2><p>通过<code>.plist</code>后缀结尾的<code>xml</code>文件来定义一个服务</p><p>创建一个配置文件<code>/Library/LaunchDaemons/com.example.plist</code></p><div class="language-xml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;?</span><span style="color:#85E89D;">xml</span><span style="color:#B392F0;"> version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#B392F0;"> encoding</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;UTF-8&quot;</span><span style="color:#E1E4E8;">?&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;!</span><span style="color:#F97583;">DOCTYPE</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">plist</span><span style="color:#E1E4E8;"> PUBLIC &quot;-//Apple Computer//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">plist</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">version</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;1.0&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">dict</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;Label&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;com.example&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;KeepAlive&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">true</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;ProcessType&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;Background&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;ProgramArguments&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">array</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;sh&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;-c&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">      &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;while true; do pwd </span><span style="color:#FDAEB7;font-style:italic;">&amp;&amp;</span><span style="color:#E1E4E8;"> date </span><span style="color:#FDAEB7;font-style:italic;">&amp;&amp;</span><span style="color:#E1E4E8;"> sleep 1; done&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;/</span><span style="color:#85E89D;">array</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;UserName&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;root&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;GroupName&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;wheel&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;StandardErrorPath&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	&lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;/var/log/com.example.log&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	&lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;StandardOutPath&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">	&lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;/var/log/com.example.log&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;WorkingDirectory&lt;/</span><span style="color:#85E89D;">key</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;/Applications/example&lt;/</span><span style="color:#85E89D;">string</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">dict</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">plist</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;?</span><span style="color:#22863A;">xml</span><span style="color:#6F42C1;"> version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#6F42C1;"> encoding</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;UTF-8&quot;</span><span style="color:#24292E;">?&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;!</span><span style="color:#D73A49;">DOCTYPE</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">plist</span><span style="color:#24292E;"> PUBLIC &quot;-//Apple Computer//DTD PLIST 1.0//EN&quot; &quot;http://www.apple.com/DTDs/PropertyList-1.0.dtd&quot;&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">plist</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">version</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;1.0&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">dict</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;Label&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;com.example&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;KeepAlive&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">true</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;ProcessType&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;Background&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;ProgramArguments&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">array</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;sh&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;-c&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">      &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;while true; do pwd </span><span style="color:#B31D28;font-style:italic;">&amp;&amp;</span><span style="color:#24292E;"> date </span><span style="color:#B31D28;font-style:italic;">&amp;&amp;</span><span style="color:#24292E;"> sleep 1; done&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;/</span><span style="color:#22863A;">array</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;UserName&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;root&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;GroupName&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;wheel&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;StandardErrorPath&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	&lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;/var/log/com.example.log&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	&lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;StandardOutPath&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">	&lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;/var/log/com.example.log&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;WorkingDirectory&lt;/</span><span style="color:#22863A;">key</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;/Applications/example&lt;/</span><span style="color:#22863A;">string</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">dict</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">plist</span><span style="color:#24292E;">&gt;</span></span></code></pre></div><p>标签说明</p><ul><li><p><code>Label</code>：<strong>服务的名称，值是全局唯一的，<code>Label</code>值推荐与<code>.plist</code>的文件名称部分保持一致</strong></p></li><li><p><code>Keepalive</code>: 决定程序是否需要一直运行，如果是<code>false</code> 则需要时才启动，默认<code>false</code></p></li><li><p><code>ProcessType</code>: 程序类型，系统会依据不同的程序类型应用不同的资源限制策略，主要是限制<code>CPU</code>和磁盘<code>I/O</code>带宽，可选项如下</p><ul><li><code>Backgroud</code>: 通常是执行用户没有直接请求的进程，应用的资源限制旨在防止破坏用户体验，资源限制最严格</li><li><code>Standard</code>: 默认值，标准限制</li><li><code>Adaptive</code>: 基于<code>XPC</code>连接上的活动限制资源</li><li><code>Interactive</code>: 交互式级别的限制，相当于<code>app</code>程序的资源限制，可以拥有最高的性能，所以基本是无限制资源</li></ul></li><li><p><code>ProgramArguments</code>：程序的参数信息，包含程序调用的命令，命令的参数等信息</p></li><li><p><code>UserName</code>: 程序运行用户权限</p></li><li><p><code>GroupName</code>: 程序运行用户组</p></li><li><p><code>StandardErrorPath</code>: 标准错误输出日志的路径，如果不配置则无输出</p></li><li><p><code>StandardOutPath</code>: 标准输出日志的路径，如果不配置则无输出</p></li><li><p><code>WorkingDirectory</code>: 指定程序的工作目录位置，如果是放在<code>/Library/LaunchDaemons/</code>的文件，默认工作目录是<code>/</code>，<strong>配置完成该参数之后需要保证该路径存在，否则服务不能正常启动</strong></p></li></ul><h2 id="服务加载运行" tabindex="-1">服务加载运行 <a class="header-anchor" href="#服务加载运行" aria-label="Permalink to &quot;服务加载运行&quot;">​</a></h2><p>加载服务配置</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">launchctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">load</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/Library/LaunchDaemons/com.example.plist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">launchctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">load</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/Library/LaunchDaemons/com.example.plist</span></span></code></pre></div><p>卸载服务配置，如果配置修改之后，需要先卸载配置，然后再次执行加载</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">launchctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">unload</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/Library/LaunchDaemons/com.example.plist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">launchctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">unload</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/Library/LaunchDaemons/com.example.plist</span></span></code></pre></div><p>启动停止服务，由于服务配置<code>Keepalive=true</code>服务执行<code>load</code>之后就直接开始运行了，启动停止命令不生效</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">launchctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">start</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">com.example.plist</span></span>
<span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">launchctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">stop</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">com.example.plist</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">launchctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">start</span><span style="color:#24292E;"> </span><span style="color:#032F62;">com.example.plist</span></span>
<span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">launchctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">stop</span><span style="color:#24292E;"> </span><span style="color:#032F62;">com.example.plist</span></span></code></pre></div><p>查看服务运行状态，共三列数据</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">launchctl</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">list</span><span style="color:#F97583;">|</span><span style="color:#B392F0;">grep</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">com.example</span></span>
<span class="line"><span style="color:#B392F0;">9919</span><span style="color:#E1E4E8;">	</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">	</span><span style="color:#9ECBFF;">com.example</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">launchctl</span><span style="color:#24292E;"> </span><span style="color:#032F62;">list</span><span style="color:#D73A49;">|</span><span style="color:#6F42C1;">grep</span><span style="color:#24292E;"> </span><span style="color:#032F62;">com.example</span></span>
<span class="line"><span style="color:#6F42C1;">9919</span><span style="color:#24292E;">	</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">	</span><span style="color:#032F62;">com.example</span></span></code></pre></div><ul><li><p>第一列表示进程<code>PID</code>，有值表示进程正在运行中</p></li><li><p>第二列表示执行之后的返回码，如果是0表示执行无报错</p></li><li><p>第三列表示服务的<code>Label</code></p></li></ul><p>依据配置<code>StandardErrorPath/StandardOutPath</code>检查日志输出</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">tail</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-f</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/var/log/com.example.log</span><span style="color:#E1E4E8;"> </span></span>
<span class="line"><span style="color:#B392F0;">/Applications/example</span></span>
<span class="line"><span style="color:#B392F0;">Mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jun</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;">:31:01</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2023</span></span>
<span class="line"><span style="color:#B392F0;">/Applications/example</span></span>
<span class="line"><span style="color:#B392F0;">Mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jun</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;">:31:02</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2023</span></span>
<span class="line"><span style="color:#B392F0;">/Applications/example</span></span>
<span class="line"><span style="color:#B392F0;">Mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jun</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;">:31:03</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2023</span></span>
<span class="line"><span style="color:#B392F0;">/Applications/example</span></span>
<span class="line"><span style="color:#B392F0;">Mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jun</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;">:31:04</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2023</span></span>
<span class="line"><span style="color:#B392F0;">/Applications/example</span></span>
<span class="line"><span style="color:#B392F0;">Mon</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">Jun</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">19</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">16</span><span style="color:#9ECBFF;">:31:05</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">CST</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">2023</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">tail</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-f</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/var/log/com.example.log</span><span style="color:#24292E;"> </span></span>
<span class="line"><span style="color:#6F42C1;">/Applications/example</span></span>
<span class="line"><span style="color:#6F42C1;">Mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jun</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">:31:01</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2023</span></span>
<span class="line"><span style="color:#6F42C1;">/Applications/example</span></span>
<span class="line"><span style="color:#6F42C1;">Mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jun</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">:31:02</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2023</span></span>
<span class="line"><span style="color:#6F42C1;">/Applications/example</span></span>
<span class="line"><span style="color:#6F42C1;">Mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jun</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">:31:03</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2023</span></span>
<span class="line"><span style="color:#6F42C1;">/Applications/example</span></span>
<span class="line"><span style="color:#6F42C1;">Mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jun</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">:31:04</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2023</span></span>
<span class="line"><span style="color:#6F42C1;">/Applications/example</span></span>
<span class="line"><span style="color:#6F42C1;">Mon</span><span style="color:#24292E;"> </span><span style="color:#032F62;">Jun</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">19</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">16</span><span style="color:#032F62;">:31:05</span><span style="color:#24292E;"> </span><span style="color:#032F62;">CST</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">2023</span></span></code></pre></div><p>可以重启设备之后继续校验服务是否开机自启动</p><h2 id="其他注意事项" tabindex="-1">其他注意事项 <a class="header-anchor" href="#其他注意事项" aria-label="Permalink to &quot;其他注意事项&quot;">​</a></h2><p>如果服务的<code>ProgramArguments</code>参数中，如果执行的命令如果会修改到当前<code>.plist</code>文件，在执行加载<code>plist</code>文件，比如<code>launchctl load com.example.plist</code>，程序无报错，也无输出，使用<code>launchctl list</code>命令也找不到对应的服务注册信息，这个是正常的，<code>macos</code>可能有某种机制控制服务不能修改自己的服务配置文件</p><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://www.xiebruce.top/983.html" target="_blank" rel="noreferrer"><code>macOS服务管理 – launchd、launchctl、brew services详解</code></a></p><p><a href="https://www.manpagez.com/man/5/launchd.plist/" target="_blank" rel="noreferrer"><code>launchd.plist man page</code></a></p>`,30),e=[o];function t(c,r,E,y,i,d){return a(),l("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
