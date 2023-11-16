import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.ec8f7e8e.js";const m=JSON.parse('{"title":"问题发生原因","description":"","frontmatter":{},"headers":[],"relativePath":"published/database/解决Redis连接报错\\"ERR max number of clients reached\\".md","filePath":"published/database/解决Redis连接报错\\"ERR max number of clients reached\\".md"}'),l={name:'published/database/解决Redis连接报错"ERR max number of clients reached".md'},p=n(`<h1 id="问题发生原因" tabindex="-1">问题发生原因 <a class="header-anchor" href="#问题发生原因" aria-label="Permalink to &quot;问题发生原因&quot;">​</a></h1><ul><li><p><code>redis</code>使用过程当中一般会由客户端进行连接资源管理，例如分配连接、监控连接状态、回收连接池资源</p></li><li><p>默认设置下，<code>redis</code>不会主动断开连接</p></li><li><p><code>redis</code>的<code>timeout</code>参数配置项，默认单位是秒，当<code>timeout</code>是0的时候，<code>redis</code>不会主动关闭连接</p></li><li><p>由于<code>redis</code>默认的最大连接数是10000，但是一直不关闭连接的话随着时间推移，连接越积越多，最终导致没有连接可用</p></li></ul><p>最终导致<code>redis</code>客户端连接的时候报错，显示<code>&quot;ERR max number of clients reached&quot;</code></p><h2 id="获取当前redis配置" tabindex="-1">获取当前<code>redis</code>配置 <a class="header-anchor" href="#获取当前redis配置" aria-label="Permalink to &quot;获取当前\`redis\`配置&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ redis-cli</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; CONFIG get * </span></span>
<span class="line"><span style="color:#e1e4e8;"># 获取timeout可以执行</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; CONFIG get timeout</span></span>
<span class="line"><span style="color:#e1e4e8;">1) &quot;timeout&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2) &quot;0&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ redis-cli</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; CONFIG get * </span></span>
<span class="line"><span style="color:#24292e;"># 获取timeout可以执行</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; CONFIG get timeout</span></span>
<span class="line"><span style="color:#24292e;">1) &quot;timeout&quot;</span></span>
<span class="line"><span style="color:#24292e;">2) &quot;0&quot;</span></span></code></pre></div><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><p>配置<code>timout</code>参数值</p><p><code>compose.yaml</code>配置如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">redis:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: redis</span></span>
<span class="line"><span style="color:#e1e4e8;">    command: redis-server --requirepass testpasswd --timeout 10</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: demo-redis</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: always</span></span>
<span class="line"><span style="color:#e1e4e8;">    oom_kill_disable: true</span></span>
<span class="line"><span style="color:#e1e4e8;">    mem_limit: 2g</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - 127.0.0.1:6379:6379</span></span>
<span class="line"><span style="color:#e1e4e8;">    healthcheck:</span></span>
<span class="line"><span style="color:#e1e4e8;">      test: &#39;redis-cli ping || exit 1&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">redis:</span></span>
<span class="line"><span style="color:#24292e;">    image: redis</span></span>
<span class="line"><span style="color:#24292e;">    command: redis-server --requirepass testpasswd --timeout 10</span></span>
<span class="line"><span style="color:#24292e;">    container_name: demo-redis</span></span>
<span class="line"><span style="color:#24292e;">    restart: always</span></span>
<span class="line"><span style="color:#24292e;">    oom_kill_disable: true</span></span>
<span class="line"><span style="color:#24292e;">    mem_limit: 2g</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - 127.0.0.1:6379:6379</span></span>
<span class="line"><span style="color:#24292e;">    healthcheck:</span></span>
<span class="line"><span style="color:#24292e;">      test: &#39;redis-cli ping || exit 1&#39;</span></span></code></pre></div><h3 id="启动命令" tabindex="-1">启动命令 <a class="header-anchor" href="#启动命令" aria-label="Permalink to &quot;启动命令&quot;">​</a></h3><p><code>redis-server --requirepass testpasswd --timeout 10</code></p><ul><li><code>--requirepass testpasswd</code>: 配置<code>redis</code>启动命令，设置启用密码连接，密码设置为<code>testpasswd</code></li><li><code>--timeout 10</code>: 配置当连接无操作<code>10s</code>之后连接会断开</li></ul><h3 id="其他参数解释" tabindex="-1">其他参数解释 <a class="header-anchor" href="#其他参数解释" aria-label="Permalink to &quot;其他参数解释&quot;">​</a></h3><p><code>oom_kill_disable: true</code></p><ul><li>禁止当内存占用太多时候关闭容器</li></ul><p><code>mem_limit: 2g</code></p><ul><li>限制最大使用<code>2G</code>内存</li></ul><p><code>healthcheck</code></p><ul><li>使用健康检查容器是否服务正常</li></ul><p><code>ports</code></p><ul><li>端口开放配置<code>127.0.0.1:6379:6379</code>表示不对外部机器开放6379端口</li></ul><h2 id="验证" tabindex="-1">验证 <a class="header-anchor" href="#验证" aria-label="Permalink to &quot;验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker exec -it demo-redis /bin/sh</span></span>
<span class="line"><span style="color:#e1e4e8;"># redis-cli</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; auth testpasswd</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; config get timeout</span></span>
<span class="line"><span style="color:#e1e4e8;">1) &quot;timeout&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">2) &quot;10&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"># 此处等待10秒之后再次输入命令,发现Broken pipe,这个是正常的，因为当前连接10s内没有操作，所以redis服务器关闭了该连接</span></span>
<span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; CONFIG get timeout</span></span>
<span class="line"><span style="color:#e1e4e8;">Error: Broken pipe</span></span>
<span class="line"><span style="color:#e1e4e8;">not connected&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker exec -it demo-redis /bin/sh</span></span>
<span class="line"><span style="color:#24292e;"># redis-cli</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; auth testpasswd</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; config get timeout</span></span>
<span class="line"><span style="color:#24292e;">1) &quot;timeout&quot;</span></span>
<span class="line"><span style="color:#24292e;">2) &quot;10&quot;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"># 此处等待10秒之后再次输入命令,发现Broken pipe,这个是正常的，因为当前连接10s内没有操作，所以redis服务器关闭了该连接</span></span>
<span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; CONFIG get timeout</span></span>
<span class="line"><span style="color:#24292e;">Error: Broken pipe</span></span>
<span class="line"><span style="color:#24292e;">not connected&gt;</span></span></code></pre></div><p>查看clients连接</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">127.0.0.1:6379&gt; INFO clients</span></span>
<span class="line"><span style="color:#e1e4e8;"># Clients</span></span>
<span class="line"><span style="color:#e1e4e8;">connected_clients:168</span></span>
<span class="line"><span style="color:#e1e4e8;">cluster_connections:0</span></span>
<span class="line"><span style="color:#e1e4e8;">maxclients:10000</span></span>
<span class="line"><span style="color:#e1e4e8;">client_recent_max_input_buffer:20567</span></span>
<span class="line"><span style="color:#e1e4e8;">client_recent_max_output_buffer:0</span></span>
<span class="line"><span style="color:#e1e4e8;">blocked_clients:1</span></span>
<span class="line"><span style="color:#e1e4e8;">tracking_clients:0</span></span>
<span class="line"><span style="color:#e1e4e8;">clients_in_timeout_table:1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">127.0.0.1:6379&gt; INFO clients</span></span>
<span class="line"><span style="color:#24292e;"># Clients</span></span>
<span class="line"><span style="color:#24292e;">connected_clients:168</span></span>
<span class="line"><span style="color:#24292e;">cluster_connections:0</span></span>
<span class="line"><span style="color:#24292e;">maxclients:10000</span></span>
<span class="line"><span style="color:#24292e;">client_recent_max_input_buffer:20567</span></span>
<span class="line"><span style="color:#24292e;">client_recent_max_output_buffer:0</span></span>
<span class="line"><span style="color:#24292e;">blocked_clients:1</span></span>
<span class="line"><span style="color:#24292e;">tracking_clients:0</span></span>
<span class="line"><span style="color:#24292e;">clients_in_timeout_table:1</span></span></code></pre></div><h2 id="阅读参考" tabindex="-1">阅读参考 <a class="header-anchor" href="#阅读参考" aria-label="Permalink to &quot;阅读参考&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844904032268451853" target="_blank" rel="noreferrer">redis文件配置详解</a><a href="https://redis.io/docs/" target="_blank" rel="noreferrer">redis官方文档</a></p>`,27),o=[p];function t(c,i,r,d,u,h){return e(),a("div",null,o)}const _=s(l,[["render",t]]);export{m as __pageData,_ as default};
