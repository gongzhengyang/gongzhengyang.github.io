import{_ as s,o as e,c as n,Q as a}from"./chunks/framework.ec8f7e8e.js";const g=JSON.parse('{"title":"需求","description":"","frontmatter":{},"headers":[],"relativePath":"published/system/docker容器操作宿主机执行命令.md","filePath":"published/system/docker容器操作宿主机执行命令.md"}'),l={name:"published/system/docker容器操作宿主机执行命令.md"},p=a(`<ul><li><h1 id="需求" tabindex="-1"><strong>需求</strong> <a class="header-anchor" href="#需求" aria-label="Permalink to &quot;**需求**&quot;">​</a></h1><p>正常情况下这种操作比较反设计，需要谨慎使用 有些时候我们使用<code>docker</code>的时候会需要用到宿主机命令操作，比如</p><ul><li>执行 <code>netplan apply</code>生效机器网络配置</li><li>查看宿主机网络信息使用<code>ifconfig</code>或者 <code>ip addr</code></li><li>从容器发出命令重启宿主机</li></ul><h2 id="具体实现" tabindex="-1"><strong>具体实现</strong> <a class="header-anchor" href="#具体实现" aria-label="Permalink to &quot;**具体实现**&quot;">​</a></h2><h4 id="docker-run实现" tabindex="-1"><code>docker run</code>实现 <a class="header-anchor" href="#docker-run实现" aria-label="Permalink to &quot;\`docker run\`实现&quot;">​</a></h4><p>最简单的实现 使用<code>docker</code>运行一个<code>ubuntu</code>容器 进入容器之后执行<code>nsenter</code>命令查看宿主机网络配置信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo docker run -it --pid=host --privileged=true ubuntu /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;"># 进入容器内部之后执行</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">/# nsenter -a -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo docker run -it --pid=host --privileged=true ubuntu /bin/bash</span></span>
<span class="line"><span style="color:#24292e;"># 进入容器内部之后执行</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">/# nsenter -a -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre></div><h4 id="docker-compose实现" tabindex="-1"><code>docker compose</code>实现 <a class="header-anchor" href="#docker-compose实现" aria-label="Permalink to &quot;\`docker compose\`实现&quot;">​</a></h4><p>新建一个<code>compose.yaml</code>文件，写入如下内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">    demo:</span></span>
<span class="line"><span style="color:#e1e4e8;">        image: python:3-bullseye</span></span>
<span class="line"><span style="color:#e1e4e8;">        pid: host</span></span>
<span class="line"><span style="color:#e1e4e8;">        privileged: true</span></span>
<span class="line"><span style="color:#e1e4e8;">        container_name: demo-exec</span></span>
<span class="line"><span style="color:#e1e4e8;">        command: /bin/sh -c &quot;while true; do echo hello; sleep 3600;done&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">    demo:</span></span>
<span class="line"><span style="color:#24292e;">        image: python:3-bullseye</span></span>
<span class="line"><span style="color:#24292e;">        pid: host</span></span>
<span class="line"><span style="color:#24292e;">        privileged: true</span></span>
<span class="line"><span style="color:#24292e;">        container_name: demo-exec</span></span>
<span class="line"><span style="color:#24292e;">        command: /bin/sh -c &quot;while true; do echo hello; sleep 3600;done&quot;</span></span></code></pre></div><p>执行命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker compose up -d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker compose up -d</span></span></code></pre></div><p>进入容器，并且创建写入<code>demo.py</code>文件代码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker exec -it demo-exec /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">/# cat &gt; demo.py &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#e1e4e8;">import subprocess</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span style="color:#e1e4e8;">    command = &#39;ls /var/lib/docker&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">    resp = subprocess.run(</span></span>
<span class="line"><span style="color:#e1e4e8;">        f&#39;nsenter -m -u -i -n -p -t 1 sh -c &quot;{command}&quot;&#39;,</span></span>
<span class="line"><span style="color:#e1e4e8;">        capture_output=True, check=True, text=True, shell=True)</span></span>
<span class="line"><span style="color:#e1e4e8;">    print(f&#39;stdout: {resp.stdout}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">    print(f&#39;stderr: {resp.stderr}&#39;)</span></span>
<span class="line"><span style="color:#e1e4e8;">EOF</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker exec -it demo-exec /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">/# cat &gt; demo.py &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#24292e;">import subprocess</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">if __name__ == &#39;__main__&#39;:</span></span>
<span class="line"><span style="color:#24292e;">    command = &#39;ls /var/lib/docker&#39;</span></span>
<span class="line"><span style="color:#24292e;">    resp = subprocess.run(</span></span>
<span class="line"><span style="color:#24292e;">        f&#39;nsenter -m -u -i -n -p -t 1 sh -c &quot;{command}&quot;&#39;,</span></span>
<span class="line"><span style="color:#24292e;">        capture_output=True, check=True, text=True, shell=True)</span></span>
<span class="line"><span style="color:#24292e;">    print(f&#39;stdout: {resp.stdout}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">    print(f&#39;stderr: {resp.stderr}&#39;)</span></span>
<span class="line"><span style="color:#24292e;">EOF</span></span></code></pre></div><p>在容器内部检查文件是否写入成功并且执行程序</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">/# cat demo.py</span></span>
<span class="line"><span style="color:#e1e4e8;">/# python demo.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">/# cat demo.py</span></span>
<span class="line"><span style="color:#24292e;">/# python demo.py</span></span></code></pre></div><h2 id="实现原理" tabindex="-1"><strong>实现原理</strong> <a class="header-anchor" href="#实现原理" aria-label="Permalink to &quot;**实现原理**&quot;">​</a></h2><h3 id="docker-参数" tabindex="-1"><code>docker </code>参数 <a class="header-anchor" href="#docker-参数" aria-label="Permalink to &quot;\`docker \`参数&quot;">​</a></h3><p><strong><code>--pid=host</code></strong></p><ul><li>使用宿主机命名空间，方便容器获取到宿主机所有进程信息</li><li>把宿主机的<code>/proc</code>文件夹挂载进入容器的<code>/proc</code>路径，其中<code>/proc/1</code>作为<code>nsenter</code>的<code>target</code>，作为容器向宿主机发送命令的关键部分</li></ul><p><strong><code>--privileged=true</code></strong></p><ul><li>使得<code>docker</code>容器有<code>root</code>权限执行宿主机命令，确保从容器执行命令的时候不会产生权限不足错误</li></ul><h3 id="nsenter命令" tabindex="-1"><code>nsenter</code>命令 <a class="header-anchor" href="#nsenter命令" aria-label="Permalink to &quot;\`nsenter\`命令&quot;">​</a></h3><p><code>nsenter</code>命令是一个可以在指定进程的命令空间下运行指定程序的命令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ nsenter --help</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">用法：</span></span>
<span class="line"><span style="color:#e1e4e8;"> nsenter [选项] [&lt;程序&gt; [&lt;参数&gt;...]]</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">以其他程序的名字空间运行某个程序。</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">选项：</span></span>
<span class="line"><span style="color:#e1e4e8;"> -a, --all              enter all namespaces</span></span>
<span class="line"><span style="color:#e1e4e8;"> -t, --target &lt;pid&gt;     要获取名字空间的目标进程</span></span>
<span class="line"><span style="color:#e1e4e8;"> -m, --mount[=&lt;文件&gt;]   进入 mount 名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -u, --uts[=&lt;文件&gt;]     进入 UTS 名字空间(主机名等)</span></span>
<span class="line"><span style="color:#e1e4e8;"> -i, --ipc[=&lt;文件&gt;]     进入 System V IPC 名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -n, --net[=&lt;文件&gt;]     进入网络名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -p, --pid[=&lt;文件&gt;]     进入 pid 名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -C, --cgroup[=&lt;文件&gt;]  进入 cgroup 名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -U, --user[=&lt;文件&gt;]    进入用户名字空间</span></span>
<span class="line"><span style="color:#e1e4e8;"> -S, --setuid &lt;uid&gt;     设置进入空间中的 uid</span></span>
<span class="line"><span style="color:#e1e4e8;"> -G, --setgid &lt;gid&gt;     设置进入名字空间中的 gid</span></span>
<span class="line"><span style="color:#e1e4e8;">     --preserve-credentials 不干涉 uid 或 gid</span></span>
<span class="line"><span style="color:#e1e4e8;"> -r, --root[=&lt;目录&gt;]     设置根目录</span></span>
<span class="line"><span style="color:#e1e4e8;"> -w, --wd[=&lt;dir&gt;]       设置工作目录</span></span>
<span class="line"><span style="color:#e1e4e8;"> -F, --no-fork          执行 &lt;程序&gt; 前不 fork</span></span>
<span class="line"><span style="color:#e1e4e8;"> -Z, --follow-context  根据 --target PID 设置 SELinux 环境</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> -h, --help             display this help</span></span>
<span class="line"><span style="color:#e1e4e8;"> -V, --version          display version</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">更多信息请参阅 nsenter(1)。</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ nsenter --help</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">用法：</span></span>
<span class="line"><span style="color:#24292e;"> nsenter [选项] [&lt;程序&gt; [&lt;参数&gt;...]]</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">以其他程序的名字空间运行某个程序。</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">选项：</span></span>
<span class="line"><span style="color:#24292e;"> -a, --all              enter all namespaces</span></span>
<span class="line"><span style="color:#24292e;"> -t, --target &lt;pid&gt;     要获取名字空间的目标进程</span></span>
<span class="line"><span style="color:#24292e;"> -m, --mount[=&lt;文件&gt;]   进入 mount 名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -u, --uts[=&lt;文件&gt;]     进入 UTS 名字空间(主机名等)</span></span>
<span class="line"><span style="color:#24292e;"> -i, --ipc[=&lt;文件&gt;]     进入 System V IPC 名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -n, --net[=&lt;文件&gt;]     进入网络名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -p, --pid[=&lt;文件&gt;]     进入 pid 名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -C, --cgroup[=&lt;文件&gt;]  进入 cgroup 名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -U, --user[=&lt;文件&gt;]    进入用户名字空间</span></span>
<span class="line"><span style="color:#24292e;"> -S, --setuid &lt;uid&gt;     设置进入空间中的 uid</span></span>
<span class="line"><span style="color:#24292e;"> -G, --setgid &lt;gid&gt;     设置进入名字空间中的 gid</span></span>
<span class="line"><span style="color:#24292e;">     --preserve-credentials 不干涉 uid 或 gid</span></span>
<span class="line"><span style="color:#24292e;"> -r, --root[=&lt;目录&gt;]     设置根目录</span></span>
<span class="line"><span style="color:#24292e;"> -w, --wd[=&lt;dir&gt;]       设置工作目录</span></span>
<span class="line"><span style="color:#24292e;"> -F, --no-fork          执行 &lt;程序&gt; 前不 fork</span></span>
<span class="line"><span style="color:#24292e;"> -Z, --follow-context  根据 --target PID 设置 SELinux 环境</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> -h, --help             display this help</span></span>
<span class="line"><span style="color:#24292e;"> -V, --version          display version</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">更多信息请参阅 nsenter(1)。</span></span></code></pre></div><p>具体执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ nsenter -a -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ nsenter -a -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre></div><ul><li><code>-a</code>表示进入宿主机的所有命名空间</li><li><code>-t 1</code>表示获取<code>/proc/1</code>进程，就是<code>pid=1</code>的进程，这个进程是<code>docker</code>使用<code>--pid=host</code>参数挂载进入容器内部的宿主机进程</li><li><code> sh -c &quot;ip addr&quot;</code>就表示发送给宿主机的命令是<code>ip addr</code></li></ul><p>实际使用过程中如果出现宿主机和容器命名空间不一致问题，主要产生原因是宿主机内核版本和容器 所默认的加载内核版本不一致</p><p>比如<code>cgroup</code>是在<code>Linux4.6</code>版本加入的，如果使用<code>Ubuntu20</code>或者其他<code>python3.10</code>等比较新的镜像启动容器的时候，当<code>nsenter</code>使用参数<code>-a</code>，容器会加载所有命名空间，但是<code>cgroup</code>命名空间在旧版本的系统里面由于内核版本比较旧，所以该命名空间是没有的，最终<code>nsenter</code>命令就会报错</p><p>需要按照宿主机有的命名空间来调整<code>nsenter</code>参数，可以调整如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ nsenter -m -u -i -n -p  -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ nsenter -m -u -i -n -p  -t 1 sh -c &quot;ip addr&quot;</span></span></code></pre></div><p>比如可以把<code>-a</code>参数替换成<code>-m -u -i -n -p</code>，明确指定进入<code>mount</code>, <code>UTS</code>,<code>System V IPC</code>,<code>网络</code>,<code>pid</code>命名空间 这几个命名空间包含了绝大多数的空间环境，<code>linux</code>的大部分命令都可以正常执行</p><h3 id="命名空间说明" tabindex="-1">命名空间说明 <a class="header-anchor" href="#命名空间说明" aria-label="Permalink to &quot;命名空间说明&quot;">​</a></h3><p><code>namespace</code>是<code>Linux</code>中一些进程的属性的作用域，使用命名空间，可以隔离不同的进程</p><p><code>Linux</code>在不断的添加命名空间，目前有</p><ul><li><code>mount</code>：挂载命名空间，使进程有一个独立的挂载文件系统，始于<code>Linux 2.4.19</code></li><li><code>ipc</code>：<code>ipc</code>命名空间，使进程有一个独立的<code>ipc</code>，包括消息队列，共享内存和信号量，始于<code>Linux 2.6.19</code></li><li><code>uts</code>：<code>uts</code>命名空间，使进程有一个独立的<code>hostname</code>和<code>domainname</code>，始于<code>Linux 2.6.19</code></li><li><code>net</code>：<code>network</code>命令空间，使进程有一个独立的网络栈，始于<code>Linux 2.6.24</code></li><li><code>pid</code>：<code>pid</code>命名空间，使进程有一个独立的<code>pid</code>空间，始于<code>Linux 2.6.24</code></li><li><code>user</code>：<code>user</code>命名空间，是进程有一个独立的<code>user</code>空间，始于<code>Linux 2.6.23</code>，结束于<code>Linux 3.8</code></li><li><code>cgroup</code>：<code>cgroup</code>命名空间，使进程有一个独立的<code>cgroup</code>控制组，始于<code>Linux 4.6</code></li></ul><h2 id="参考阅读" tabindex="-1"><strong>参考阅读</strong> <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;**参考阅读**&quot;">​</a></h2><ul><li><a href="https://staight.github.io/2019/09/23/nsenter%E5%91%BD%E4%BB%A4%E7%AE%80%E4%BB%8B/" target="_blank" rel="noreferrer">nsenter命令简介</a></li><li><a href="https://man7.org/linux/man-pages/man1/nsenter.1.html" target="_blank" rel="noreferrer">Linux manual page</a></li><li><a href="https://docs.docker.com/get-started/overview/" target="_blank" rel="noreferrer">docker官方文档</a></li></ul></li></ul>`,1),o=[p];function c(t,r,i,d,u,h){return e(),n("div",null,o)}const m=s(l,[["render",c]]);export{g as __pageData,m as default};
