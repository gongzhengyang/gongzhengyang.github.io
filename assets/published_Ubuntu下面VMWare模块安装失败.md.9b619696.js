import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.36bc40e2.js";const l="/assets/image-20220804101949856.ac1d1eb8.png",g=JSON.parse('{"title":"解决Ubuntu宿主机下面安装Vmware时候vmmon和vmnet模块缺失导致的报错","description":"","frontmatter":{},"headers":[],"relativePath":"published/Ubuntu下面VMWare模块安装失败.md","filePath":"published/Ubuntu下面VMWare模块安装失败.md","lastUpdated":1700106669000}'),o={name:"published/Ubuntu下面VMWare模块安装失败.md"},p=n(`<h1 id="解决ubuntu宿主机下面安装vmware时候vmmon和vmnet模块缺失导致的报错" tabindex="-1">解决<code>Ubuntu</code>宿主机下面安装<code>Vmware</code>时候<code>vmmon</code>和<code>vmnet</code>模块缺失导致的报错 <a class="header-anchor" href="#解决ubuntu宿主机下面安装vmware时候vmmon和vmnet模块缺失导致的报错" aria-label="Permalink to &quot;解决\`Ubuntu\`宿主机下面安装\`Vmware\`时候\`vmmon\`和\`vmnet\`模块缺失导致的报错&quot;">​</a></h1><h2 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h2><p>在<code>Ubuntu 20</code>操作系统下面安装<code>Vmware</code>执行开始运行，启动虚拟机发现报错</p><p>类似于下面这样的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Could not open /dev/vmmon: ?????????.</span></span>
<span class="line"><span style="color:#e1e4e8;">Please make sure that the kernel module \`vmmon&#39; is loaded.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Could not open /dev/vmmon: ?????????.</span></span>
<span class="line"><span style="color:#24292e;">Please make sure that the kernel module \`vmmon&#39; is loaded.</span></span></code></pre></div><p>手动启动<code>Vmware</code>模块，发现有两个模块启动失败</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo /etc/init.d/vmware start</span></span>
<span class="line"><span style="color:#e1e4e8;">Starting VMware services:</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual machine monitor                                            failed</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual machine communication interface                             done</span></span>
<span class="line"><span style="color:#e1e4e8;">   VM communication interface socket family                            done</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual ethernet                                                   failed</span></span>
<span class="line"><span style="color:#e1e4e8;">   VMware Authentication Daemon                                        done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo /etc/init.d/vmware start</span></span>
<span class="line"><span style="color:#24292e;">Starting VMware services:</span></span>
<span class="line"><span style="color:#24292e;">   Virtual machine monitor                                            failed</span></span>
<span class="line"><span style="color:#24292e;">   Virtual machine communication interface                             done</span></span>
<span class="line"><span style="color:#24292e;">   VM communication interface socket family                            done</span></span>
<span class="line"><span style="color:#24292e;">   Virtual ethernet                                                   failed</span></span>
<span class="line"><span style="color:#24292e;">   VMware Authentication Daemon                                        done</span></span></code></pre></div><p>执行命令安装缺失的模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo vmware-modconfig --console --install-all</span></span>
<span class="line"><span style="color:#e1e4e8;"># 发现输出当中包含错误信息如下</span></span>
<span class="line"><span style="color:#e1e4e8;">/tmp/modconfig-DPn7nL/vmmon-only/./include/vm_asm_x86.h:67:44: error: expression in static assertion is not constant</span></span>
<span class="line"><span style="color:#e1e4e8;">   67 |    ASSERT_ON_COMPILE(sizeof(Selector) == 2 &amp;&amp;                                \\</span></span>
<span class="line"><span style="color:#e1e4e8;">      |                      ~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#e1e4e8;">   68 |                      ((__builtin_constant_p(expr) &amp;&amp; ((expr) &gt;&gt; 16) == 0) || \\</span></span>
<span class="line"><span style="color:#e1e4e8;">      |                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#e1e4e8;">   69 |                       sizeof(expr) &lt;= 2))</span></span>
<span class="line"><span style="color:#e1e4e8;">      |                       ~~~~~~~~~~~~~~~~~~    </span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span>
<span class="line"><span style="color:#e1e4e8;">Unable to install all modules.  See log for details.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo vmware-modconfig --console --install-all</span></span>
<span class="line"><span style="color:#24292e;"># 发现输出当中包含错误信息如下</span></span>
<span class="line"><span style="color:#24292e;">/tmp/modconfig-DPn7nL/vmmon-only/./include/vm_asm_x86.h:67:44: error: expression in static assertion is not constant</span></span>
<span class="line"><span style="color:#24292e;">   67 |    ASSERT_ON_COMPILE(sizeof(Selector) == 2 &amp;&amp;                                \\</span></span>
<span class="line"><span style="color:#24292e;">      |                      ~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#24292e;">   68 |                      ((__builtin_constant_p(expr) &amp;&amp; ((expr) &gt;&gt; 16) == 0) || \\</span></span>
<span class="line"><span style="color:#24292e;">      |                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#24292e;">   69 |                       sizeof(expr) &lt;= 2))</span></span>
<span class="line"><span style="color:#24292e;">      |                       ~~~~~~~~~~~~~~~~~~    </span></span>
<span class="line"><span style="color:#24292e;">.....</span></span>
<span class="line"><span style="color:#24292e;">Unable to install all modules.  See log for details.</span></span></code></pre></div><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><h4 id="查看vmware版本" tabindex="-1">查看<code>VMware</code>版本 <a class="header-anchor" href="#查看vmware版本" aria-label="Permalink to &quot;查看\`VMware\`版本&quot;">​</a></h4><p>通过安装包信息查看</p><p>在<code>Ubuntu</code>系统下面获取安装包的时候会下载一个<code>*.bundle</code>文件，该文件的文件名称就包含了版本信息，比如<code>VMware-Workstation-Full-16.2.3-19376536.x86_64.bundle</code>的版本就是<code>16.2.3</code></p><p>如果<code>Vmware</code>还能正常打开，可以查看<code>Help</code>下面的<code>About</code>信息查看</p><p><img src="`+l+`" alt="image-20220804101949856"></p><h4 id="安装缺失模块" tabindex="-1">安装缺失模块 <a class="header-anchor" href="#安装缺失模块" aria-label="Permalink to &quot;安装缺失模块&quot;">​</a></h4><p>需要手动去编译缺失的<code>vmmon</code>和<code>vmnet</code>模块</p><p>依赖一个<code>git</code>开源仓库，获取仓库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ git clone https://github.com/mkubecek/vmware-host-modules</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ git clone https://github.com/mkubecek/vmware-host-modules</span></span></code></pre></div><p>查看分支信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cd vmware-host-modules</span></span>
<span class="line"><span style="color:#e1e4e8;">$ git branch -a</span></span>
<span class="line"><span style="color:#e1e4e8;"> remotes/origin/HEAD -&gt; origin/master</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/master</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/player</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/player-12.5.2</span></span>
<span class="line"><span style="color:#e1e4e8;">  ......</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/player-15.5.6</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/player-15.5.7</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/workstation-14.1.3</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/workstation-14.1.4</span></span>
<span class="line"><span style="color:#e1e4e8;">  ......</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/workstation-16.2.1</span></span>
<span class="line"><span style="color:#e1e4e8;">  remotes/origin/workstation-16.2.3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cd vmware-host-modules</span></span>
<span class="line"><span style="color:#24292e;">$ git branch -a</span></span>
<span class="line"><span style="color:#24292e;"> remotes/origin/HEAD -&gt; origin/master</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/master</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/player</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/player-12.5.2</span></span>
<span class="line"><span style="color:#24292e;">  ......</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/player-15.5.6</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/player-15.5.7</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/workstation-14.1.3</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/workstation-14.1.4</span></span>
<span class="line"><span style="color:#24292e;">  ......</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/workstation-16.2.1</span></span>
<span class="line"><span style="color:#24292e;">  remotes/origin/workstation-16.2.3</span></span></code></pre></div><p>依据之前获取的<code>Vmware</code>版本信息指定分支，以<code>workstation-*</code>和<code>player-*</code>指定<code>workstation</code>和<code>player版本</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ git checkout workstation-16.2.3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ git checkout workstation-16.2.3</span></span></code></pre></div><p>开始编译和安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo make</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo make</span></span>
<span class="line"><span style="color:#24292e;">$ sudo make install</span></span></code></pre></div><p>查看本机内核版本</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ cat /proc/version</span></span>
<span class="line"><span style="color:#e1e4e8;">Linux version 5.15.0-43-generic (buildd@lcy02-amd64-026) (gcc (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #46~20.04.1-Ubuntu SMP Thu Jul 14 15:20:17 UTC 2022</span></span>
<span class="line"><span style="color:#e1e4e8;"># 或者</span></span>
<span class="line"><span style="color:#e1e4e8;">$ uname -r</span></span>
<span class="line"><span style="color:#e1e4e8;">5.15.0-43-generic</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ cat /proc/version</span></span>
<span class="line"><span style="color:#24292e;">Linux version 5.15.0-43-generic (buildd@lcy02-amd64-026) (gcc (Ubuntu 9.4.0-1ubuntu1~20.04.1) 9.4.0, GNU ld (GNU Binutils for Ubuntu) 2.34) #46~20.04.1-Ubuntu SMP Thu Jul 14 15:20:17 UTC 2022</span></span>
<span class="line"><span style="color:#24292e;"># 或者</span></span>
<span class="line"><span style="color:#24292e;">$ uname -r</span></span>
<span class="line"><span style="color:#24292e;">5.15.0-43-generic</span></span></code></pre></div><p>可以知道目前内核版本是<code>5.15.0-43-generic</code></p><p>所以执行完成之后生成的模块会安装到<code>/lib/modules/5.15.0-43-generic/misc</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ll /lib/modules/5.15.0-43-generic/misc</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 252K</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root 157K 八月    4 10:05 vmmon.ko</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxr-xr-x 1 root root  92K 八月    4 10:05 vmnet.ko</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ll /lib/modules/5.15.0-43-generic/misc</span></span>
<span class="line"><span style="color:#24292e;">总用量 252K</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root 157K 八月    4 10:05 vmmon.ko</span></span>
<span class="line"><span style="color:#24292e;">-rwxr-xr-x 1 root root  92K 八月    4 10:05 vmnet.ko</span></span></code></pre></div><p>最后重新加载所有<code>vmware</code>模块服务</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo /etc/init.d/vmware start</span></span>
<span class="line"><span style="color:#e1e4e8;">Starting VMware services:</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual machine monitor                                             done</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual machine communication interface                             done</span></span>
<span class="line"><span style="color:#e1e4e8;">   VM communication interface socket family                            done</span></span>
<span class="line"><span style="color:#e1e4e8;">   Virtual ethernet                                                    done</span></span>
<span class="line"><span style="color:#e1e4e8;">   VMware Authentication Daemon                                        done</span></span>
<span class="line"><span style="color:#e1e4e8;">   Shared Memory Available                                             done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo /etc/init.d/vmware start</span></span>
<span class="line"><span style="color:#24292e;">Starting VMware services:</span></span>
<span class="line"><span style="color:#24292e;">   Virtual machine monitor                                             done</span></span>
<span class="line"><span style="color:#24292e;">   Virtual machine communication interface                             done</span></span>
<span class="line"><span style="color:#24292e;">   VM communication interface socket family                            done</span></span>
<span class="line"><span style="color:#24292e;">   Virtual ethernet                                                    done</span></span>
<span class="line"><span style="color:#24292e;">   VMware Authentication Daemon                                        done</span></span>
<span class="line"><span style="color:#24292e;">   Shared Memory Available                                             done</span></span></code></pre></div><h4 id="内核版本升级导致的问题" tabindex="-1">内核版本升级导致的问题 <a class="header-anchor" href="#内核版本升级导致的问题" aria-label="Permalink to &quot;内核版本升级导致的问题&quot;">​</a></h4><p>当编译<code>vmmon</code>和<code>vmnet</code>模块安装之后，后面如果有内核版本升级的话需要重新编译安装</p><p>之前的内核版本是<code>5.15.0-41-generic</code>，后来<code>apt upgrade</code>升级了一下发现<code>VMware</code>又不行了才发现有这个问题</p><p>执行重新安装发现报错</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo make install </span></span>
<span class="line"><span style="color:#e1e4e8;">Version mismatch: module vmmon-only/vmmon.ko 5.15.0-41-generic, kernel 5.15.0-43-generic</span></span>
<span class="line"><span style="color:#e1e4e8;">Version mismatch: module vmnet-only/vmnet.ko 5.15.0-41-generic, kernel 5.15.0-43-generic</span></span>
<span class="line"><span style="color:#e1e4e8;">make: *** [Makefile:35：install] 错误 1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo make install </span></span>
<span class="line"><span style="color:#24292e;">Version mismatch: module vmmon-only/vmmon.ko 5.15.0-41-generic, kernel 5.15.0-43-generic</span></span>
<span class="line"><span style="color:#24292e;">Version mismatch: module vmnet-only/vmnet.ko 5.15.0-41-generic, kernel 5.15.0-43-generic</span></span>
<span class="line"><span style="color:#24292e;">make: *** [Makefile:35：install] 错误 1</span></span></code></pre></div><p>所以需要删除之前编译好的文件，重新开始编译和安装</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo make clean</span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo make </span></span>
<span class="line"><span style="color:#e1e4e8;">$ sudo make install</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo make clean</span></span>
<span class="line"><span style="color:#24292e;">$ sudo make </span></span>
<span class="line"><span style="color:#24292e;">$ sudo make install</span></span></code></pre></div><p>最后重新加载所有<code>vmware</code>模块服务</p><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://communities.vmware.com/t5/VMware-Workstation-Pro/Virtual-ethernet-failed/td-p/2906720" target="_blank" rel="noreferrer"><code>vmware</code>模块报错讨论区</a></p>`,42),c=[p];function t(i,r,d,m,u,h){return e(),a("div",null,c)}const v=s(o,[["render",t]]);export{g as __pageData,v as default};
