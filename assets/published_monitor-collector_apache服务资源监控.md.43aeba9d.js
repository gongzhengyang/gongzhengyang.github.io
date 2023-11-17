import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.36bc40e2.js";const u=JSON.parse('{"title":"配置","description":"","frontmatter":{},"headers":[],"relativePath":"published/monitor-collector/apache服务资源监控.md","filePath":"published/monitor-collector/apache服务资源监控.md","lastUpdated":1700106669000}'),l={name:"published/monitor-collector/apache服务资源监控.md"},o=e(`<h1 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h1><p>需要修改<code>apache httpd</code>加载配置文件<code>httpd-info.conf</code></p><p>需要开放访问<code>server-info</code>和<code>server-status</code>的权限</p><h2 id="docker实现" tabindex="-1"><code>docker</code>实现 <a class="header-anchor" href="#docker实现" aria-label="Permalink to &quot;\`docker\`实现&quot;">​</a></h2><p>创建<code>Dockerfile</code>如下</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> httpd:2.4-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用httpd info 模块</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&quot;s|#Include conf/extra/httpd-info.conf|Include conf/extra/httpd-info.conf|g&quot;</span><span style="color:#E1E4E8;"> /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#6A737D;"># 加载mod info 开放访问server info 信息</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&quot;s|#LoadModule info_module modules/mod_info.so|LoadModule info_module modules/mod_info.so|g&quot;</span><span style="color:#E1E4E8;"> /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#6A737D;"># 配置允许远程访问，避免403错误</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&quot;s/Require host .example.com/Order deny,allow/g&quot;</span><span style="color:#E1E4E8;"> /usr/local/apache2/conf/extra/httpd-info.conf</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&quot;s/Require ip 127/Allow from all/g&quot;</span><span style="color:#E1E4E8;"> /usr/local/apache2/conf/extra/httpd-info.conf</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> httpd:2.4-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 启用httpd info 模块</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&quot;s|#Include conf/extra/httpd-info.conf|Include conf/extra/httpd-info.conf|g&quot;</span><span style="color:#24292E;"> /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#6A737D;"># 加载mod info 开放访问server info 信息</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&quot;s|#LoadModule info_module modules/mod_info.so|LoadModule info_module modules/mod_info.so|g&quot;</span><span style="color:#24292E;"> /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#6A737D;"># 配置允许远程访问，避免403错误</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&quot;s/Require host .example.com/Order deny,allow/g&quot;</span><span style="color:#24292E;"> /usr/local/apache2/conf/extra/httpd-info.conf</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&quot;s/Require ip 127/Allow from all/g&quot;</span><span style="color:#24292E;"> /usr/local/apache2/conf/extra/httpd-info.conf</span></span></code></pre></div><p>创建<code>compose.yaml</code></p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">apache</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-apache</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-apache</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">build</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;80:80&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">apache</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-apache</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-apache</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">build</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;80:80&quot;</span></span></code></pre></div><p>构建镜像</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span></code></pre></div><p>服务启动</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span></span></code></pre></div><p>查看访问配置信息</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">exec</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">demo-apache</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">cat</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">/usr/local/apache2/conf/extra/httpd-info.conf</span></span>
<span class="line"><span style="color:#79B8FF;">....</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Location /server-status</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">SetHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server-status</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Order</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deny,allow</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Allow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">/Location</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#79B8FF;">....</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">Location /server-info</span><span style="color:#F97583;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">SetHandler</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">server-info</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Order</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">deny,allow</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">Allow</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">all</span></span>
<span class="line"><span style="color:#F97583;">&lt;</span><span style="color:#E1E4E8;">/Location</span><span style="color:#F97583;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">exec</span><span style="color:#24292E;"> </span><span style="color:#032F62;">demo-apache</span><span style="color:#24292E;"> </span><span style="color:#032F62;">cat</span><span style="color:#24292E;"> </span><span style="color:#032F62;">/usr/local/apache2/conf/extra/httpd-info.conf</span></span>
<span class="line"><span style="color:#005CC5;">....</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Location /server-status</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">SetHandler</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server-status</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Order</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deny,allow</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Allow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">/Location</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#005CC5;">....</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">Location /server-info</span><span style="color:#D73A49;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">SetHandler</span><span style="color:#24292E;"> </span><span style="color:#032F62;">server-info</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Order</span><span style="color:#24292E;"> </span><span style="color:#032F62;">deny,allow</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">Allow</span><span style="color:#24292E;"> </span><span style="color:#032F62;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">all</span></span>
<span class="line"><span style="color:#D73A49;">&lt;</span><span style="color:#24292E;">/Location</span><span style="color:#D73A49;">&gt;</span></span></code></pre></div><h2 id="验证结果" tabindex="-1">验证结果 <a class="header-anchor" href="#验证结果" aria-label="Permalink to &quot;验证结果&quot;">​</a></h2><p>浏览器访问地址<code>http://127.0.0.1/server-status</code>获取服务状态信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Apache Server Status for 127.0.0.1 (via 172.29.0.2)</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Version: Apache/2.4.55 (Unix)</span></span>
<span class="line"><span style="color:#e1e4e8;">Server MPM: event</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Built: Feb 11 2023 09:43:46</span></span>
<span class="line"><span style="color:#e1e4e8;">Current Time: Monday, 20-Mar-2023 07:01:24</span></span>
<span class="line"><span style="color:#e1e4e8;">Restart Time: Monday, 20-Mar-2023 07:00:29</span></span>
<span class="line"><span style="color:#e1e4e8;">Parent Server Config. Generation: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">Parent Server MPM Generation: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">Server uptime: 54 seconds</span></span>
<span class="line"><span style="color:#e1e4e8;">Server load: 0.75 0.88 0.92</span></span>
<span class="line"><span style="color:#e1e4e8;">Total accesses: 2 - Total Traffic: 52 kB - Total Duration: 4</span></span>
<span class="line"><span style="color:#e1e4e8;">CPU Usage: u.02 s.02 cu0 cs0 - .0741% CPU load</span></span>
<span class="line"><span style="color:#e1e4e8;">.037 requests/sec - 986 B/second - 26.0 kB/request - 2 ms/request</span></span>
<span class="line"><span style="color:#e1e4e8;">1 requests currently being processed, 99 idle workers</span></span>
<span class="line"><span style="color:#e1e4e8;">Slot	PID	Stopping	Connections	Threads	Async connections</span></span>
<span class="line"><span style="color:#e1e4e8;">total	accepting	busy	idle	writing	keep-alive	closing</span></span>
<span class="line"><span style="color:#e1e4e8;">0	8	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#e1e4e8;">1	9	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#e1e4e8;">2	10	no	0	yes	1	24	0	0	0</span></span>
<span class="line"><span style="color:#e1e4e8;">3	92	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#e1e4e8;">Sum	4	0	0	 	1	99	0	0	0</span></span>
<span class="line"><span style="color:#e1e4e8;">___________________________________________________W____________</span></span>
<span class="line"><span style="color:#e1e4e8;">____________________________________............................</span></span>
<span class="line"><span style="color:#e1e4e8;">................................................................</span></span>
<span class="line"><span style="color:#e1e4e8;">................................................................</span></span>
<span class="line"><span style="color:#e1e4e8;">................................................................</span></span>
<span class="line"><span style="color:#e1e4e8;">................................................................</span></span>
<span class="line"><span style="color:#e1e4e8;">................</span></span>
<span class="line"><span style="color:#e1e4e8;">Scoreboard Key:</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;_&quot; Waiting for Connection, &quot;S&quot; Starting up, &quot;R&quot; Reading Request,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;W&quot; Sending Reply, &quot;K&quot; Keepalive (read), &quot;D&quot; DNS Lookup,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;C&quot; Closing connection, &quot;L&quot; Logging, &quot;G&quot; Gracefully finishing,</span></span>
<span class="line"><span style="color:#e1e4e8;">&quot;I&quot; Idle cleanup of worker, &quot;.&quot; Open slot with no current process</span></span>
<span class="line"><span style="color:#e1e4e8;">Srv	PID	Acc	M	CPU	SS	Req	Dur	Conn	Child	Slot	Client	Protocol	VHost	Request</span></span>
<span class="line"><span style="color:#e1e4e8;">1-0	9	0/1/1	_	0.00	50	3	3	0.0	0.05	0.05	172.29.0.1	http/1.1	172.29.0.2:80	GET /server-info HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2-0	10	0/1/1	_	0.00	4	0	0	0.0	0.00	0.00	172.29.0.1	http/1.1	172.29.0.2:80	GET /serve-status HTTP/1.1</span></span>
<span class="line"><span style="color:#e1e4e8;">2-0	10	2/0/0	W	0.00	0	0	0	0.0	0.00	0.00	172.29.0.1	http/1.1	172.29.0.2:80	GET /server-status HTTP/1.1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Apache Server Status for 127.0.0.1 (via 172.29.0.2)</span></span>
<span class="line"><span style="color:#24292e;">Server Version: Apache/2.4.55 (Unix)</span></span>
<span class="line"><span style="color:#24292e;">Server MPM: event</span></span>
<span class="line"><span style="color:#24292e;">Server Built: Feb 11 2023 09:43:46</span></span>
<span class="line"><span style="color:#24292e;">Current Time: Monday, 20-Mar-2023 07:01:24</span></span>
<span class="line"><span style="color:#24292e;">Restart Time: Monday, 20-Mar-2023 07:00:29</span></span>
<span class="line"><span style="color:#24292e;">Parent Server Config. Generation: 1</span></span>
<span class="line"><span style="color:#24292e;">Parent Server MPM Generation: 0</span></span>
<span class="line"><span style="color:#24292e;">Server uptime: 54 seconds</span></span>
<span class="line"><span style="color:#24292e;">Server load: 0.75 0.88 0.92</span></span>
<span class="line"><span style="color:#24292e;">Total accesses: 2 - Total Traffic: 52 kB - Total Duration: 4</span></span>
<span class="line"><span style="color:#24292e;">CPU Usage: u.02 s.02 cu0 cs0 - .0741% CPU load</span></span>
<span class="line"><span style="color:#24292e;">.037 requests/sec - 986 B/second - 26.0 kB/request - 2 ms/request</span></span>
<span class="line"><span style="color:#24292e;">1 requests currently being processed, 99 idle workers</span></span>
<span class="line"><span style="color:#24292e;">Slot	PID	Stopping	Connections	Threads	Async connections</span></span>
<span class="line"><span style="color:#24292e;">total	accepting	busy	idle	writing	keep-alive	closing</span></span>
<span class="line"><span style="color:#24292e;">0	8	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#24292e;">1	9	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#24292e;">2	10	no	0	yes	1	24	0	0	0</span></span>
<span class="line"><span style="color:#24292e;">3	92	no	0	yes	0	25	0	0	0</span></span>
<span class="line"><span style="color:#24292e;">Sum	4	0	0	 	1	99	0	0	0</span></span>
<span class="line"><span style="color:#24292e;">___________________________________________________W____________</span></span>
<span class="line"><span style="color:#24292e;">____________________________________............................</span></span>
<span class="line"><span style="color:#24292e;">................................................................</span></span>
<span class="line"><span style="color:#24292e;">................................................................</span></span>
<span class="line"><span style="color:#24292e;">................................................................</span></span>
<span class="line"><span style="color:#24292e;">................................................................</span></span>
<span class="line"><span style="color:#24292e;">................</span></span>
<span class="line"><span style="color:#24292e;">Scoreboard Key:</span></span>
<span class="line"><span style="color:#24292e;">&quot;_&quot; Waiting for Connection, &quot;S&quot; Starting up, &quot;R&quot; Reading Request,</span></span>
<span class="line"><span style="color:#24292e;">&quot;W&quot; Sending Reply, &quot;K&quot; Keepalive (read), &quot;D&quot; DNS Lookup,</span></span>
<span class="line"><span style="color:#24292e;">&quot;C&quot; Closing connection, &quot;L&quot; Logging, &quot;G&quot; Gracefully finishing,</span></span>
<span class="line"><span style="color:#24292e;">&quot;I&quot; Idle cleanup of worker, &quot;.&quot; Open slot with no current process</span></span>
<span class="line"><span style="color:#24292e;">Srv	PID	Acc	M	CPU	SS	Req	Dur	Conn	Child	Slot	Client	Protocol	VHost	Request</span></span>
<span class="line"><span style="color:#24292e;">1-0	9	0/1/1	_	0.00	50	3	3	0.0	0.05	0.05	172.29.0.1	http/1.1	172.29.0.2:80	GET /server-info HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">2-0	10	0/1/1	_	0.00	4	0	0	0.0	0.00	0.00	172.29.0.1	http/1.1	172.29.0.2:80	GET /serve-status HTTP/1.1</span></span>
<span class="line"><span style="color:#24292e;">2-0	10	2/0/0	W	0.00	0	0	0	0.0	0.00	0.00	172.29.0.1	http/1.1	172.29.0.2:80	GET /server-status HTTP/1.1</span></span></code></pre></div><p>访问<code>http://127.0.0.1/server-info</code>获取服务基础配置信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Apache Server Information</span></span>
<span class="line"><span style="color:#e1e4e8;">Subpages:</span></span>
<span class="line"><span style="color:#e1e4e8;">Configuration Files, Server Settings, Module List, Active Hooks, Available Providers</span></span>
<span class="line"><span style="color:#e1e4e8;">Sections:</span></span>
<span class="line"><span style="color:#e1e4e8;">Loaded Modules, Server Settings, Startup Hooks, Request Hooks, Other Hooks, Providers</span></span>
<span class="line"><span style="color:#e1e4e8;">Loaded Modules</span></span>
<span class="line"><span style="color:#e1e4e8;">core.c, event.c, http_core.c, mod_access_compat.c, mod_alias.c, mod_auth_basic.c, mod_authn_core.c, mod_authn_file.c, mod_authz_core.c, mod_authz_groupfile.c, mod_authz_host.c, mod_authz_user.c, mod_autoindex.c, mod_dir.c, mod_env.c, mod_filter.c, mod_headers.c, mod_info.c, mod_log_config.c, mod_mime.c, mod_reqtimeout.c, mod_setenvif.c, mod_so.c, mod_status.c, mod_unixd.c, mod_version.c,</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Settings</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Version: Apache/2.4.55 (Unix)</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Built: Feb 11 2023 09:43:46</span></span>
<span class="line"><span style="color:#e1e4e8;">Server loaded APR Version: 1.7.2</span></span>
<span class="line"><span style="color:#e1e4e8;">Compiled with APR Version: 1.7.2</span></span>
<span class="line"><span style="color:#e1e4e8;">Server loaded APU Version: 1.6.3</span></span>
<span class="line"><span style="color:#e1e4e8;">Compiled with APU Version: 1.6.3</span></span>
<span class="line"><span style="color:#e1e4e8;">Server loaded PCRE Version: 8.45 2021-06-15</span></span>
<span class="line"><span style="color:#e1e4e8;">Compiled with PCRE Version: 8.45 2021-06-15</span></span>
<span class="line"><span style="color:#e1e4e8;">Module Magic Number: 20120211:126</span></span>
<span class="line"><span style="color:#e1e4e8;">Hostname/port: 127.0.0.1:80</span></span>
<span class="line"><span style="color:#e1e4e8;">Timeouts: connection: 60    keep-alive: 5</span></span>
<span class="line"><span style="color:#e1e4e8;">MPM Name: event</span></span>
<span class="line"><span style="color:#e1e4e8;">MPM Information: Max Daemons: 4 Threaded: yes Forked: yes</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Architecture: 64-bit</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Root: /usr/local/apache2</span></span>
<span class="line"><span style="color:#e1e4e8;">Config File: /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#e1e4e8;">Server Built With: </span></span>
<span class="line"><span style="color:#e1e4e8;"> -D APR_HAS_SENDFILE</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D APR_HAS_MMAP</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D APR_HAVE_IPV6 (IPv4-mapped addresses enabled)</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D APR_USE_PROC_PTHREAD_SERIALIZE</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D SINGLE_LISTEN_UNSERIALIZED_ACCEPT</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D APR_HAS_OTHER_CHILD</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D AP_HAVE_RELIABLE_PIPED_LOGS</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D HTTPD_ROOT=&quot;/usr/local/apache2&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D SUEXEC_BIN=&quot;/usr/local/apache2/bin/suexec&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D DEFAULT_PIDLOG=&quot;logs/httpd.pid&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D DEFAULT_SCOREBOARD=&quot;logs/apache_runtime_status&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D DEFAULT_ERRORLOG=&quot;logs/error_log&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D AP_TYPES_CONFIG_FILE=&quot;conf/mime.types&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"> -D SERVER_CONFIG_FILE=&quot;conf/httpd.conf&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">Startup Hooks</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Apache Server Information</span></span>
<span class="line"><span style="color:#24292e;">Subpages:</span></span>
<span class="line"><span style="color:#24292e;">Configuration Files, Server Settings, Module List, Active Hooks, Available Providers</span></span>
<span class="line"><span style="color:#24292e;">Sections:</span></span>
<span class="line"><span style="color:#24292e;">Loaded Modules, Server Settings, Startup Hooks, Request Hooks, Other Hooks, Providers</span></span>
<span class="line"><span style="color:#24292e;">Loaded Modules</span></span>
<span class="line"><span style="color:#24292e;">core.c, event.c, http_core.c, mod_access_compat.c, mod_alias.c, mod_auth_basic.c, mod_authn_core.c, mod_authn_file.c, mod_authz_core.c, mod_authz_groupfile.c, mod_authz_host.c, mod_authz_user.c, mod_autoindex.c, mod_dir.c, mod_env.c, mod_filter.c, mod_headers.c, mod_info.c, mod_log_config.c, mod_mime.c, mod_reqtimeout.c, mod_setenvif.c, mod_so.c, mod_status.c, mod_unixd.c, mod_version.c,</span></span>
<span class="line"><span style="color:#24292e;">Server Settings</span></span>
<span class="line"><span style="color:#24292e;">Server Version: Apache/2.4.55 (Unix)</span></span>
<span class="line"><span style="color:#24292e;">Server Built: Feb 11 2023 09:43:46</span></span>
<span class="line"><span style="color:#24292e;">Server loaded APR Version: 1.7.2</span></span>
<span class="line"><span style="color:#24292e;">Compiled with APR Version: 1.7.2</span></span>
<span class="line"><span style="color:#24292e;">Server loaded APU Version: 1.6.3</span></span>
<span class="line"><span style="color:#24292e;">Compiled with APU Version: 1.6.3</span></span>
<span class="line"><span style="color:#24292e;">Server loaded PCRE Version: 8.45 2021-06-15</span></span>
<span class="line"><span style="color:#24292e;">Compiled with PCRE Version: 8.45 2021-06-15</span></span>
<span class="line"><span style="color:#24292e;">Module Magic Number: 20120211:126</span></span>
<span class="line"><span style="color:#24292e;">Hostname/port: 127.0.0.1:80</span></span>
<span class="line"><span style="color:#24292e;">Timeouts: connection: 60    keep-alive: 5</span></span>
<span class="line"><span style="color:#24292e;">MPM Name: event</span></span>
<span class="line"><span style="color:#24292e;">MPM Information: Max Daemons: 4 Threaded: yes Forked: yes</span></span>
<span class="line"><span style="color:#24292e;">Server Architecture: 64-bit</span></span>
<span class="line"><span style="color:#24292e;">Server Root: /usr/local/apache2</span></span>
<span class="line"><span style="color:#24292e;">Config File: /usr/local/apache2/conf/httpd.conf</span></span>
<span class="line"><span style="color:#24292e;">Server Built With: </span></span>
<span class="line"><span style="color:#24292e;"> -D APR_HAS_SENDFILE</span></span>
<span class="line"><span style="color:#24292e;"> -D APR_HAS_MMAP</span></span>
<span class="line"><span style="color:#24292e;"> -D APR_HAVE_IPV6 (IPv4-mapped addresses enabled)</span></span>
<span class="line"><span style="color:#24292e;"> -D APR_USE_PROC_PTHREAD_SERIALIZE</span></span>
<span class="line"><span style="color:#24292e;"> -D SINGLE_LISTEN_UNSERIALIZED_ACCEPT</span></span>
<span class="line"><span style="color:#24292e;"> -D APR_HAS_OTHER_CHILD</span></span>
<span class="line"><span style="color:#24292e;"> -D AP_HAVE_RELIABLE_PIPED_LOGS</span></span>
<span class="line"><span style="color:#24292e;"> -D HTTPD_ROOT=&quot;/usr/local/apache2&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D SUEXEC_BIN=&quot;/usr/local/apache2/bin/suexec&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D DEFAULT_PIDLOG=&quot;logs/httpd.pid&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D DEFAULT_SCOREBOARD=&quot;logs/apache_runtime_status&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D DEFAULT_ERRORLOG=&quot;logs/error_log&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D AP_TYPES_CONFIG_FILE=&quot;conf/mime.types&quot;</span></span>
<span class="line"><span style="color:#24292e;"> -D SERVER_CONFIG_FILE=&quot;conf/httpd.conf&quot;</span></span>
<span class="line"><span style="color:#24292e;">Startup Hooks</span></span></code></pre></div>`,19),p=[o];function t(c,r,i,y,_,d){return n(),a("div",null,p)}const h=s(l,[["render",t]]);export{u as __pageData,h as default};
