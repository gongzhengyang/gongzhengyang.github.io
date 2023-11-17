import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.36bc40e2.js";const g=JSON.parse('{"title":"安装服务","description":"","frontmatter":{},"headers":[],"relativePath":"published/身份认证/Ubuntu系统下的Radius认证服务安装与配置.md","filePath":"published/身份认证/Ubuntu系统下的Radius认证服务安装与配置.md","lastUpdated":1700106669000}'),p={name:"published/身份认证/Ubuntu系统下的Radius认证服务安装与配置.md"},l=n(`<h1 id="安装服务" tabindex="-1">安装服务 <a class="header-anchor" href="#安装服务" aria-label="Permalink to &quot;安装服务&quot;">​</a></h1><p>安装服务依赖 <code>freeradius</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo apt install freeradius</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo apt install freeradius</span></span></code></pre></div><p>查看版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ freeradius -v</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">radiusd: FreeRADIUS Version 3.0.16, for host x86_64-pc-linux-gnu, built on Apr 17 2019 at 12:59:55</span></span>
<span class="line"><span style="color:#e1e4e8;">FreeRADIUS Version 3.0.16</span></span>
<span class="line"><span style="color:#e1e4e8;">Copyright (C) 1999-2017 The FreeRADIUS server project and contributors</span></span>
<span class="line"><span style="color:#e1e4e8;">There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A</span></span>
<span class="line"><span style="color:#e1e4e8;">PARTICULAR PURPOSE</span></span>
<span class="line"><span style="color:#e1e4e8;">You may redistribute copies of FreeRADIUS under the terms of the</span></span>
<span class="line"><span style="color:#e1e4e8;">GNU General Public License</span></span>
<span class="line"><span style="color:#e1e4e8;">For more information about these matters, see the file named COPYRIGHT</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ freeradius -v</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">radiusd: FreeRADIUS Version 3.0.16, for host x86_64-pc-linux-gnu, built on Apr 17 2019 at 12:59:55</span></span>
<span class="line"><span style="color:#24292e;">FreeRADIUS Version 3.0.16</span></span>
<span class="line"><span style="color:#24292e;">Copyright (C) 1999-2017 The FreeRADIUS server project and contributors</span></span>
<span class="line"><span style="color:#24292e;">There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A</span></span>
<span class="line"><span style="color:#24292e;">PARTICULAR PURPOSE</span></span>
<span class="line"><span style="color:#24292e;">You may redistribute copies of FreeRADIUS under the terms of the</span></span>
<span class="line"><span style="color:#24292e;">GNU General Public License</span></span>
<span class="line"><span style="color:#24292e;">For more information about these matters, see the file named COPYRIGHT</span></span></code></pre></div><p>配置文件位置和版本相关 如果显示<code>3.0.*</code>，则配置文件位置具体目录是<code>/etc/freeradius/3.0</code> 如果版本显示<code>3.2.*</code>，那么配置文件的目录位置是<code>/etc/freeradius/3.2</code></p><p><strong>下面所有涉及到的文件配置目录都要看版本情况具体配置修改，不要照抄文档</strong></p><p><code>radius</code>服务所在机器的<code>IP</code>是<code>192.168.100.150</code></p><p>启动测试服务器，正常情况下最后几行会显示如下数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo freeradius -X</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on auth address * port 1812 bound to server default</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on acct address * port 1813 bound to server default</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on auth address :: port 1812 bound to server default</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on acct address :: port 1813 bound to server default</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on auth address 127.0.0.1 port 18120 bound to server inner-tunnel</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on proxy address * port 56061</span></span>
<span class="line"><span style="color:#e1e4e8;">Listening on proxy address :: port 59459</span></span>
<span class="line"><span style="color:#e1e4e8;">Ready to process requests</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 有时候如果显示如下数据，则表示报错</span></span>
<span class="line"><span style="color:#e1e4e8;">xxxxxxxxxx Failed binding to auth address * port 1812 bound to server default: Address already in use /etc/freeradius/3.0/sites-enabled/default[59]: Error binding to port for 0.0.0.0 port 1812</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 则表示已经有另外一个\`radius\`服务已经启动，并且已经占用了端口</span></span>
<span class="line"><span style="color:#e1e4e8;"># 需要执行如下步骤把服务关闭</span></span>
<span class="line"><span style="color:#e1e4e8;"># $ sudo systemctl stop freeradius.service</span></span>
<span class="line"><span style="color:#e1e4e8;"># 或者是另外一个终端执行了freeradius命令但是忘记关闭了</span></span>
<span class="line"><span style="color:#e1e4e8;"># 可以执行pkill freeradius</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo freeradius -X</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">.....</span></span>
<span class="line"><span style="color:#24292e;">Listening on auth address * port 1812 bound to server default</span></span>
<span class="line"><span style="color:#24292e;">Listening on acct address * port 1813 bound to server default</span></span>
<span class="line"><span style="color:#24292e;">Listening on auth address :: port 1812 bound to server default</span></span>
<span class="line"><span style="color:#24292e;">Listening on acct address :: port 1813 bound to server default</span></span>
<span class="line"><span style="color:#24292e;">Listening on auth address 127.0.0.1 port 18120 bound to server inner-tunnel</span></span>
<span class="line"><span style="color:#24292e;">Listening on proxy address * port 56061</span></span>
<span class="line"><span style="color:#24292e;">Listening on proxy address :: port 59459</span></span>
<span class="line"><span style="color:#24292e;">Ready to process requests</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 有时候如果显示如下数据，则表示报错</span></span>
<span class="line"><span style="color:#24292e;">xxxxxxxxxx Failed binding to auth address * port 1812 bound to server default: Address already in use /etc/freeradius/3.0/sites-enabled/default[59]: Error binding to port for 0.0.0.0 port 1812</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 则表示已经有另外一个\`radius\`服务已经启动，并且已经占用了端口</span></span>
<span class="line"><span style="color:#24292e;"># 需要执行如下步骤把服务关闭</span></span>
<span class="line"><span style="color:#24292e;"># $ sudo systemctl stop freeradius.service</span></span>
<span class="line"><span style="color:#24292e;"># 或者是另外一个终端执行了freeradius命令但是忘记关闭了</span></span>
<span class="line"><span style="color:#24292e;"># 可以执行pkill freeradius</span></span></code></pre></div><h2 id="添加radius用户数据" tabindex="-1">添加<code>radius</code>用户数据 <a class="header-anchor" href="#添加radius用户数据" aria-label="Permalink to &quot;添加\`radius\`用户数据&quot;">​</a></h2><p>编辑文件，添加用户名为<code>operator</code> 密码为 <code>testpass</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo vim /etc/freeradius/3.0/users</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo vim /etc/freeradius/3.0/users</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">operator  Cleartext-Password := &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">           Reply-Message := &quot;Hello, %{User-Name}&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">operator  Cleartext-Password := &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#24292e;">           Reply-Message := &quot;Hello, %{User-Name}&quot;</span></span></code></pre></div><p>重启 <code>freeradius</code>服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo freeradius -X</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo freeradius -X</span></span></code></pre></div><h2 id="测试radius服务" tabindex="-1">测试<code>radius</code>服务 <a class="header-anchor" href="#测试radius服务" aria-label="Permalink to &quot;测试\`radius\`服务&quot;">​</a></h2><p>从另外一台机器，开一个终端检测启动<code>radius</code>服务的机器是否开放<code>1812</code>端口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo nmap -sU 192.168.100.150 -p 1812</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 如下输出表示开放</span></span>
<span class="line"><span style="color:#e1e4e8;">Starting Nmap 7.80 ( https://nmap.org ) at 2021-08-27 11:12 CST</span></span>
<span class="line"><span style="color:#e1e4e8;">Nmap scan report for 192.168.100.150</span></span>
<span class="line"><span style="color:#e1e4e8;">Host is up (0.00017s latency).</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PORT     STATE         SERVICE</span></span>
<span class="line"><span style="color:#e1e4e8;">1812/udp open|filtered radius</span></span>
<span class="line"><span style="color:#e1e4e8;">MAC Address: CC:D3:9D:9F:D5:1D (Ieee Registration Authority)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Nmap done: 1 IP address (1 host up) scanned in 0.55 seconds</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo nmap -sU 192.168.100.150 -p 1812</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 如下输出表示开放</span></span>
<span class="line"><span style="color:#24292e;">Starting Nmap 7.80 ( https://nmap.org ) at 2021-08-27 11:12 CST</span></span>
<span class="line"><span style="color:#24292e;">Nmap scan report for 192.168.100.150</span></span>
<span class="line"><span style="color:#24292e;">Host is up (0.00017s latency).</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PORT     STATE         SERVICE</span></span>
<span class="line"><span style="color:#24292e;">1812/udp open|filtered radius</span></span>
<span class="line"><span style="color:#24292e;">MAC Address: CC:D3:9D:9F:D5:1D (Ieee Registration Authority)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Nmap done: 1 IP address (1 host up) scanned in 0.55 seconds</span></span></code></pre></div><p>新开一个终端，执行以下命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ radtest operator testpass 192.168.100.150 0 testing123</span></span>
<span class="line"><span style="color:#e1e4e8;"># 如下输出表示验证成功</span></span>
<span class="line"><span style="color:#e1e4e8;">Sent Access-Request Id 202 from 0.0.0.0:35778 to 127.0.0.1:1812 length 79</span></span>
<span class="line"><span style="color:#e1e4e8;">        User-Name = &quot;operator&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        User-Password = &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">        NAS-IP-Address = 192.168.100.150</span></span>
<span class="line"><span style="color:#e1e4e8;">        NAS-Port = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">        Message-Authenticator = 0x00</span></span>
<span class="line"><span style="color:#e1e4e8;">        Cleartext-Password = &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Received Access-Accept Id 202 from 127.0.0.1:1812 to 0.0.0.0:0 length 38</span></span>
<span class="line"><span style="color:#e1e4e8;">        Reply-Message = &quot;Hello, operator&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ radtest operator testpass 192.168.100.150 0 testing123</span></span>
<span class="line"><span style="color:#24292e;"># 如下输出表示验证成功</span></span>
<span class="line"><span style="color:#24292e;">Sent Access-Request Id 202 from 0.0.0.0:35778 to 127.0.0.1:1812 length 79</span></span>
<span class="line"><span style="color:#24292e;">        User-Name = &quot;operator&quot;</span></span>
<span class="line"><span style="color:#24292e;">        User-Password = &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#24292e;">        NAS-IP-Address = 192.168.100.150</span></span>
<span class="line"><span style="color:#24292e;">        NAS-Port = 0</span></span>
<span class="line"><span style="color:#24292e;">        Message-Authenticator = 0x00</span></span>
<span class="line"><span style="color:#24292e;">        Cleartext-Password = &quot;testpass&quot;</span></span>
<span class="line"><span style="color:#24292e;">Received Access-Accept Id 202 from 127.0.0.1:1812 to 0.0.0.0:0 length 38</span></span>
<span class="line"><span style="color:#24292e;">        Reply-Message = &quot;Hello, operator&quot;</span></span></code></pre></div><h2 id="配置允许远程验证用户" tabindex="-1">配置允许远程验证用户 <a class="header-anchor" href="#配置允许远程验证用户" aria-label="Permalink to &quot;配置允许远程验证用户&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ vim /etc/freeradius/3.0/clients.conf</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 输入如下,表示新建一个客户端，ipaddr允许所有网络访问，如果设置为192.168.100.150则表示只允许192.168.100.150的ip进行验证，填写0.0.0.0表示不限制IP，共享密钥是testing123</span></span>
<span class="line"><span style="color:#e1e4e8;">client private-network-1 {</span></span>
<span class="line"><span style="color:#e1e4e8;">        ipaddr          = 0.0.0.0</span></span>
<span class="line"><span style="color:#e1e4e8;">        secret          = testing123</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ vim /etc/freeradius/3.0/clients.conf</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 输入如下,表示新建一个客户端，ipaddr允许所有网络访问，如果设置为192.168.100.150则表示只允许192.168.100.150的ip进行验证，填写0.0.0.0表示不限制IP，共享密钥是testing123</span></span>
<span class="line"><span style="color:#24292e;">client private-network-1 {</span></span>
<span class="line"><span style="color:#24292e;">        ipaddr          = 0.0.0.0</span></span>
<span class="line"><span style="color:#24292e;">        secret          = testing123</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h2 id="修改radius监听端口" tabindex="-1">修改radius监听端口 <a class="header-anchor" href="#修改radius监听端口" aria-label="Permalink to &quot;修改radius监听端口&quot;">​</a></h2><p>以下两种方式各选一种</p><h4 id="方式一" tabindex="-1">方式一 <a class="header-anchor" href="#方式一" aria-label="Permalink to &quot;方式一&quot;">​</a></h4><p>直接修改配置，举例修改端口为8888</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo vim /etc/freeradius/3.0/sites-enabled/default</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改</span></span>
<span class="line"><span style="color:#e1e4e8;">listent {</span></span>
<span class="line"><span style="color:#e1e4e8;">	...</span></span>
<span class="line"><span style="color:#e1e4e8;">	type = auth</span></span>
<span class="line"><span style="color:#e1e4e8;">	ipaddr = *</span></span>
<span class="line"><span style="color:#e1e4e8;">	port = 0</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改port端口</span></span>
<span class="line"><span style="color:#e1e4e8;">listent {</span></span>
<span class="line"><span style="color:#e1e4e8;">	...</span></span>
<span class="line"><span style="color:#e1e4e8;">	type = auth</span></span>
<span class="line"><span style="color:#e1e4e8;">	ipaddr = *</span></span>
<span class="line"><span style="color:#e1e4e8;">	port = 8888</span></span>
<span class="line"><span style="color:#e1e4e8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo vim /etc/freeradius/3.0/sites-enabled/default</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 修改</span></span>
<span class="line"><span style="color:#24292e;">listent {</span></span>
<span class="line"><span style="color:#24292e;">	...</span></span>
<span class="line"><span style="color:#24292e;">	type = auth</span></span>
<span class="line"><span style="color:#24292e;">	ipaddr = *</span></span>
<span class="line"><span style="color:#24292e;">	port = 0</span></span>
<span class="line"><span style="color:#24292e;">}</span></span>
<span class="line"><span style="color:#24292e;"># 修改port端口</span></span>
<span class="line"><span style="color:#24292e;">listent {</span></span>
<span class="line"><span style="color:#24292e;">	...</span></span>
<span class="line"><span style="color:#24292e;">	type = auth</span></span>
<span class="line"><span style="color:#24292e;">	ipaddr = *</span></span>
<span class="line"><span style="color:#24292e;">	port = 8888</span></span>
<span class="line"><span style="color:#24292e;">}</span></span></code></pre></div><h4 id="方式二" tabindex="-1">方式二 <a class="header-anchor" href="#方式二" aria-label="Permalink to &quot;方式二&quot;">​</a></h4><p>修改<code>/etc/services</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo vim /etc/services</span></span>
<span class="line"><span style="color:#e1e4e8;"># 找到</span></span>
<span class="line"><span style="color:#e1e4e8;">radius          1812/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">radius          1812/udp</span></span>
<span class="line"><span style="color:#e1e4e8;"># 修改为自定义端口</span></span>
<span class="line"><span style="color:#e1e4e8;">radius          8888/tcp</span></span>
<span class="line"><span style="color:#e1e4e8;">radius          8888/udp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo vim /etc/services</span></span>
<span class="line"><span style="color:#24292e;"># 找到</span></span>
<span class="line"><span style="color:#24292e;">radius          1812/tcp</span></span>
<span class="line"><span style="color:#24292e;">radius          1812/udp</span></span>
<span class="line"><span style="color:#24292e;"># 修改为自定义端口</span></span>
<span class="line"><span style="color:#24292e;">radius          8888/tcp</span></span>
<span class="line"><span style="color:#24292e;">radius          8888/udp</span></span></code></pre></div><h2 id="请求认证" tabindex="-1">请求认证 <a class="header-anchor" href="#请求认证" aria-label="Permalink to &quot;请求认证&quot;">​</a></h2><p>推荐使用<code>radclient</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ radclient -h</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Usage: radclient [options] server[:port] &lt;command&gt; [&lt;secret&gt;]</span></span>
<span class="line"><span style="color:#e1e4e8;">  &lt;command&gt;              One of auth, acct, status, coa, disconnect or auto.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -4                     Use IPv4 address of server</span></span>
<span class="line"><span style="color:#e1e4e8;">  -6                     Use IPv6 address of server.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -c &lt;count&gt;             Send each packet &#39;count&#39; times.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -d &lt;raddb&gt;             Set user dictionary directory (defaults to /etc/freeradius/3.0).</span></span>
<span class="line"><span style="color:#e1e4e8;">  -D &lt;dictdir&gt;           Set main dictionary directory (defaults to /usr/share/freeradius).</span></span>
<span class="line"><span style="color:#e1e4e8;">  -f &lt;file&gt;[:&lt;file&gt;]     Read packets from file, not stdin.</span></span>
<span class="line"><span style="color:#e1e4e8;">                         If a second file is provided, it will be used to verify responses</span></span>
<span class="line"><span style="color:#e1e4e8;">  -F                     Print the file name, packet number and reply code.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -h                     Print usage help information.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -n &lt;num&gt;               Send N requests/s</span></span>
<span class="line"><span style="color:#e1e4e8;">  -p &lt;num&gt;               Send &#39;num&#39; packets from a file in parallel.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -q                     Do not print anything out.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -r &lt;retries&gt;           If timeout, retry sending the packet &#39;retries&#39; times.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -s                     Print out summary information of auth results.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -S &lt;file&gt;              read secret from file, not command line.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -t &lt;timeout&gt;           Wait &#39;timeout&#39; seconds before retrying (may be a floating point number).</span></span>
<span class="line"><span style="color:#e1e4e8;">  -v                     Show program version information.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -x                     Debugging mode.</span></span>
<span class="line"><span style="color:#e1e4e8;">  -P &lt;proto&gt;             Use proto (tcp or udp) for transport.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ radclient -h</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Usage: radclient [options] server[:port] &lt;command&gt; [&lt;secret&gt;]</span></span>
<span class="line"><span style="color:#24292e;">  &lt;command&gt;              One of auth, acct, status, coa, disconnect or auto.</span></span>
<span class="line"><span style="color:#24292e;">  -4                     Use IPv4 address of server</span></span>
<span class="line"><span style="color:#24292e;">  -6                     Use IPv6 address of server.</span></span>
<span class="line"><span style="color:#24292e;">  -c &lt;count&gt;             Send each packet &#39;count&#39; times.</span></span>
<span class="line"><span style="color:#24292e;">  -d &lt;raddb&gt;             Set user dictionary directory (defaults to /etc/freeradius/3.0).</span></span>
<span class="line"><span style="color:#24292e;">  -D &lt;dictdir&gt;           Set main dictionary directory (defaults to /usr/share/freeradius).</span></span>
<span class="line"><span style="color:#24292e;">  -f &lt;file&gt;[:&lt;file&gt;]     Read packets from file, not stdin.</span></span>
<span class="line"><span style="color:#24292e;">                         If a second file is provided, it will be used to verify responses</span></span>
<span class="line"><span style="color:#24292e;">  -F                     Print the file name, packet number and reply code.</span></span>
<span class="line"><span style="color:#24292e;">  -h                     Print usage help information.</span></span>
<span class="line"><span style="color:#24292e;">  -n &lt;num&gt;               Send N requests/s</span></span>
<span class="line"><span style="color:#24292e;">  -p &lt;num&gt;               Send &#39;num&#39; packets from a file in parallel.</span></span>
<span class="line"><span style="color:#24292e;">  -q                     Do not print anything out.</span></span>
<span class="line"><span style="color:#24292e;">  -r &lt;retries&gt;           If timeout, retry sending the packet &#39;retries&#39; times.</span></span>
<span class="line"><span style="color:#24292e;">  -s                     Print out summary information of auth results.</span></span>
<span class="line"><span style="color:#24292e;">  -S &lt;file&gt;              read secret from file, not command line.</span></span>
<span class="line"><span style="color:#24292e;">  -t &lt;timeout&gt;           Wait &#39;timeout&#39; seconds before retrying (may be a floating point number).</span></span>
<span class="line"><span style="color:#24292e;">  -v                     Show program version information.</span></span>
<span class="line"><span style="color:#24292e;">  -x                     Debugging mode.</span></span>
<span class="line"><span style="color:#24292e;">  -P &lt;proto&gt;             Use proto (tcp or udp) for transport.</span></span></code></pre></div><p>举例操作</p><p>验证 用户账号<code>operator</code>，密码<code>testpass</code>，使用<code>ipv4</code>地址<code>192.168.100.150</code>，端口<code>1812</code>，共享密钥<code>testing1234</code>，超时时间为<code>1s</code>，重复尝试认证次数<code>4</code>次</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ echo &quot;User-Name=operator,User-Password=testpass&quot; | radclient -4 192.168.100.150:1812 auth testing1234 -t 1 -r 4</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 成功后会有如下输出</span></span>
<span class="line"><span style="color:#e1e4e8;">Sent Access-Request Id 61 from 0.0.0.0:54293 to 192.168.100.150:1812 length 49</span></span>
<span class="line"><span style="color:#e1e4e8;">Received Access-Accept Id 61 from 192.168.100.150:1812 to 192.168.0.121:54293 length 38</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ echo &quot;User-Name=operator,User-Password=testpass&quot; | radclient -4 192.168.100.150:1812 auth testing1234 -t 1 -r 4</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 成功后会有如下输出</span></span>
<span class="line"><span style="color:#24292e;">Sent Access-Request Id 61 from 0.0.0.0:54293 to 192.168.100.150:1812 length 49</span></span>
<span class="line"><span style="color:#24292e;">Received Access-Accept Id 61 from 192.168.100.150:1812 to 192.168.0.121:54293 length 38</span></span></code></pre></div><h2 id="参考文档与引用" tabindex="-1">参考文档与引用 <a class="header-anchor" href="#参考文档与引用" aria-label="Permalink to &quot;参考文档与引用&quot;">​</a></h2><p><a href="https://freeradius.org/" target="_blank" rel="noreferrer">freeradius官方文档</a><a href="https://cshihong.github.io/2019/05/30/RADIUS%E5%8D%8F%E8%AE%AE%E5%9F%BA%E7%A1%80%E5%8E%9F%E7%90%86/" target="_blank" rel="noreferrer">radius协议基础原理</a><a href="https://www.cnblogs.com/daiss314/p/13210077.html" target="_blank" rel="noreferrer">linux搭建radius服务器</a></p>`,39),o=[l];function t(r,c,i,d,u,y){return e(),a("div",null,o)}const f=s(p,[["render",t]]);export{g as __pageData,f as default};
