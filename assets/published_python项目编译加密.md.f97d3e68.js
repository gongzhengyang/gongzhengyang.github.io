import{_ as s,o as n,c as a,Q as e}from"./chunks/framework.36bc40e2.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"published/python项目编译加密.md","filePath":"published/python项目编译加密.md","lastUpdated":1700106669000}'),p={name:"published/python项目编译加密.md"},l=e(`<p>有些时候处于代码保密的要求，会需要把<code>python</code>代码进行加密或者编译加密等来实现保密</p><h2 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h2><ul><li><p><code>Python</code>是一种面向对象的解释型计算机程序设计语言，解释特性是将<code>py</code>编译为独有的二进制编码<code>*.pyc</code>文件，对<code>pyc</code>中的指令进行解释执行，但是<code>pyc</code>的反编译非常简单，可直接反编译为源码</p></li><li><p>由于基于虚拟机的编程语言（解释型语言）比如<code>java</code>或者<code>python</code>很容易被人反编译，因此越来越多的应用将其中的核心代码以<code>C/C++</code>为编程语言，并且以<code>*.so</code>文件的形式提供</p></li><li><p>在<code>windows</code>环境下面经常会看到<code>*.dll</code>文件，在<code>Linux</code>环境下经常会看到<code>*.so</code>文件，这两种都是动态库，<code>*.so</code>文件可以称为动态链接库或者共享库，是<code>ELF</code>文件格式，也是一种二进制文件，一般是<code>C</code>或者<code>C++</code>编译出来的</p></li></ul><p>虽然目前有一些反编译手段可以去反编译<code>so</code>文件，但是好像效果都不怎么样，反编译出来的都是一堆比较混乱的<code>C</code>语言代码，我们是用<code>python</code>编写的程序，所以把<code>Python</code>代码打包成<code>so</code>文件是可以达到加密的要求的</p><h2 id="技术依赖" tabindex="-1">技术依赖 <a class="header-anchor" href="#技术依赖" aria-label="Permalink to &quot;技术依赖&quot;">​</a></h2><p>开源项目<a href="https://github.com/Nuitka/Nuitka" target="_blank" rel="noreferrer"><code>Nuitka</code></a>，采用<a href="https://github.com/Nuitka/Nuitka/blob/develop/LICENSE.txt" target="_blank" rel="noreferrer"><code>Apache-2.0 license</code></a>协议</p><h2 id="安装nuitka" tabindex="-1">安装<code>nuitka</code> <a class="header-anchor" href="#安装nuitka" aria-label="Permalink to &quot;安装\`nuitka\`&quot;">​</a></h2><p><code>pip</code>方式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">python -m pip install -U nuitka</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">python -m pip install -U nuitka</span></span></code></pre></div><p>在<code>Ubuntu22</code>下面使用<code>python3.10</code>是可以成功安装的，其他操作系统或者<code>python</code>版本如果安装失败</p><p>请详细阅读<a href="https://nuitka.net/zh_CN/doc/download.html" target="_blank" rel="noreferrer">官方<code>nuitka</code>安装文档</a>，里面包含了<code>apt</code>，<code>yum</code>形式的安装</p><h2 id="单文件编译" tabindex="-1">单文件编译 <a class="header-anchor" href="#单文件编译" aria-label="Permalink to &quot;单文件编译&quot;">​</a></h2><p>以下部分来源于<a href="https://nuitka.net/zh_CN/doc/user-manual.html" target="_blank" rel="noreferrer"><code>nuitka</code>官方文档</a></p><p>创建一个<code>hello.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">talk</span><span style="color:#E1E4E8;">(message):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;Talk &quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">+</span><span style="color:#E1E4E8;"> message</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">():</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(talk(</span><span style="color:#9ECBFF;">&quot;Hello World&quot;</span><span style="color:#E1E4E8;">))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__name__</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">==</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;__main__&quot;</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    main()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">talk</span><span style="color:#24292E;">(message):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;Talk &quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">+</span><span style="color:#24292E;"> message</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">():</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(talk(</span><span style="color:#032F62;">&quot;Hello World&quot;</span><span style="color:#24292E;">))</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">if</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__name__</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">==</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;__main__&quot;</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    main()</span></span></code></pre></div><p>当前目录文件为</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">ll</span></span>
<span class="line"><span style="color:#B392F0;">总用量</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">4.0</span><span style="color:#9ECBFF;">K</span></span>
<span class="line"><span style="color:#B392F0;">-rw-rw-r--</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gong</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">gong</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">133</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">九月</span><span style="color:#E1E4E8;">   </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">12</span><span style="color:#9ECBFF;">:52</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">hello.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">ll</span></span>
<span class="line"><span style="color:#6F42C1;">总用量</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">4.0</span><span style="color:#032F62;">K</span></span>
<span class="line"><span style="color:#6F42C1;">-rw-rw-r--</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">1</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gong</span><span style="color:#24292E;"> </span><span style="color:#032F62;">gong</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">133</span><span style="color:#24292E;"> </span><span style="color:#032F62;">九月</span><span style="color:#24292E;">   </span><span style="color:#005CC5;">22</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">12</span><span style="color:#032F62;">:52</span><span style="color:#24292E;"> </span><span style="color:#032F62;">hello.py</span></span></code></pre></div><h4 id="开始编译" tabindex="-1">开始编译 <a class="header-anchor" href="#开始编译" aria-label="Permalink to &quot;开始编译&quot;">​</a></h4><p>由于之前是采用<code>pip</code>方式安装的<code>nuitka</code>，所以使用的时候需要带上<code>python -m</code>的前缀</p><p>如果是使用<code>apt</code>或者<code>yum</code>等安装的，直接运行<code>nuitka</code>或者<code>nuitka3</code>即可</p><p>运行如下命令可以在当前目录下面创建一个<code>hello.bin</code>的文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python -m nuitka hello.py --remove-output</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python -m nuitka hello.py --remove-output</span></span>
<span class="line"><span style="color:#24292e;">....</span></span></code></pre></div><h4 id="参数解释" tabindex="-1">参数解释 <a class="header-anchor" href="#参数解释" aria-label="Permalink to &quot;参数解释&quot;">​</a></h4><p><code>--remove-output</code>参数表示在生成二进制编译文件之后移除编译构建目录，该目录是编译过程中会使用到，编译结束之后即可删除</p><h4 id="运行二进制文件" tabindex="-1">运行二进制文件 <a class="header-anchor" href="#运行二进制文件" aria-label="Permalink to &quot;运行二进制文件&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ./hello.bin</span></span>
<span class="line"><span style="color:#e1e4e8;">Talk Hello World</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ./hello.bin</span></span>
<span class="line"><span style="color:#24292e;">Talk Hello World</span></span></code></pre></div><h2 id="项目级别编译" tabindex="-1">项目级别编译 <a class="header-anchor" href="#项目级别编译" aria-label="Permalink to &quot;项目级别编译&quot;">​</a></h2><p>下面采用<code>django</code>项目进行演示，出于方便采用<code>sqlite</code>数据库，生产环境请使用其他数据库</p><h4 id="创建示范项目" tabindex="-1">创建示范项目 <a class="header-anchor" href="#创建示范项目" aria-label="Permalink to &quot;创建示范项目&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ pip install django -i https://pypi.doubanio.com/simple/</span></span>
<span class="line"><span style="color:#e1e4e8;">$ django-admin startproject hellonuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">$ cd hellonuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">$ python manage.py migrate</span></span>
<span class="line"><span style="color:#e1e4e8;">$ python manage.py runserver</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ pip install django -i https://pypi.doubanio.com/simple/</span></span>
<span class="line"><span style="color:#24292e;">$ django-admin startproject hellonuitka</span></span>
<span class="line"><span style="color:#24292e;">$ cd hellonuitka</span></span>
<span class="line"><span style="color:#24292e;">$ python manage.py migrate</span></span>
<span class="line"><span style="color:#24292e;">$ python manage.py runserver</span></span></code></pre></div><h4 id="查看初始路径树" tabindex="-1">查看初始路径树 <a class="header-anchor" href="#查看初始路径树" aria-label="Permalink to &quot;查看初始路径树&quot;">​</a></h4><p>（<code>tree</code>可以通过<code>sudo apt/yum install tree</code>安装）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ tree</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├── db.sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">├── hellonuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __pycache__</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── __init__.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── settings.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── urls.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── wsgi.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">└── manage.py</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">2 directories, 11 files</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ tree</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├── db.sqlite3</span></span>
<span class="line"><span style="color:#24292e;">├── hellonuitka</span></span>
<span class="line"><span style="color:#24292e;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __pycache__</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── __init__.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── settings.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── urls.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── wsgi.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#24292e;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#24292e;">└── manage.py</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">2 directories, 11 files</span></span></code></pre></div><h4 id="开始编译-1" tabindex="-1">开始编译 <a class="header-anchor" href="#开始编译-1" aria-label="Permalink to &quot;开始编译&quot;">​</a></h4><p>在项目根目录下(<code>manage.py</code>同级目录)开始进行编译，编译的过程当中需要指定编译的文件夹名称</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python -m nuitka --module hellonuitka --include-package=hellonuitka --remove-output</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python -m nuitka --module hellonuitka --include-package=hellonuitka --remove-output</span></span></code></pre></div><p>命令执行完成之后查看目录树，发现多了一个<code>hellonuitka.cpython-310-x86_64-linux-gnu.so</code>文件以及<code>hellonuitka.pyi</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ tree</span></span>
<span class="line"><span style="color:#e1e4e8;">.</span></span>
<span class="line"><span style="color:#e1e4e8;">├── db.sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">├── hellonuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __pycache__</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── __init__.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── settings.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   ├── urls.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── wsgi.cpython-310.pyc</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">├── hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#e1e4e8;">├── hellonuitka.pyi</span></span>
<span class="line"><span style="color:#e1e4e8;">└── manage.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ tree</span></span>
<span class="line"><span style="color:#24292e;">.</span></span>
<span class="line"><span style="color:#24292e;">├── db.sqlite3</span></span>
<span class="line"><span style="color:#24292e;">├── hellonuitka</span></span>
<span class="line"><span style="color:#24292e;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __pycache__</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── __init__.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── settings.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   ├── urls.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── wsgi.cpython-310.pyc</span></span>
<span class="line"><span style="color:#24292e;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#24292e;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#24292e;">├── hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#24292e;">├── hellonuitka.pyi</span></span>
<span class="line"><span style="color:#24292e;">└── manage.py</span></span></code></pre></div><h4 id="生成文件解释" tabindex="-1">生成文件解释 <a class="header-anchor" href="#生成文件解释" aria-label="Permalink to &quot;生成文件解释&quot;">​</a></h4><p><code>hellonuitka.pyi</code></p><p>文件内容如下，这个文件包含了包里面的导入信息（官方文档的描述是说是用于检测隐式导入的）</p><p>在<code>standalone</code>模式创建的库会需要使用到这个文件，目前使用的模式不需要这个文件，可以直接删除，或者在执行命令的时候添加参数<code>--no-pyi-file</code>不生成这个文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">import django.core.asgi</span></span>
<span class="line"><span style="color:#e1e4e8;">import pathlib</span></span>
<span class="line"><span style="color:#e1e4e8;">import django.contrib</span></span>
<span class="line"><span style="color:#e1e4e8;">import django.urls</span></span>
<span class="line"><span style="color:#e1e4e8;">import django.core.wsgi</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">import django.core.asgi</span></span>
<span class="line"><span style="color:#24292e;">import pathlib</span></span>
<span class="line"><span style="color:#24292e;">import django.contrib</span></span>
<span class="line"><span style="color:#24292e;">import django.urls</span></span>
<span class="line"><span style="color:#24292e;">import django.core.wsgi</span></span>
<span class="line"><span style="color:#24292e;">....</span></span>
<span class="line"><span style="color:#24292e;">....</span></span></code></pre></div><p><code>hellonuitka.cpython-310-x86_64-linux-gnu.so</code></p><p>由打包之前的文件夹<code>hellonuitka</code>组成，后面拼接的是<code>cpython-{python版本号}-{cpu架构}-{操作系统信息}</code>，这个是一个二进制文件，可以用于等效替换<code>hellonuitka</code></p><h4 id="验证编译结果" tabindex="-1">验证编译结果 <a class="header-anchor" href="#验证编译结果" aria-label="Permalink to &quot;验证编译结果&quot;">​</a></h4><p>移动旧的源码文件夹</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ mv hellonuitka /tmp/hellonuitka</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ mv hellonuitka /tmp/hellonuitka</span></span></code></pre></div><p>删除不必要的<code>*.pyi</code>文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ rm hellonuitka.pyi</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ rm hellonuitka.pyi</span></span></code></pre></div><p>删除生成的<code>sqlite</code>数据库，方便测试后面的<code>migrate</code>命令是否正常</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ rm db.sqlite3</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ rm db.sqlite3</span></span></code></pre></div><p>最后在编译项目根目录下的<code>python</code>源码</p><p>开始进行验证，查看项目路径树</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ll</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 224K</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 gong gong 218K 九月   22 15:09 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxrwxr-x 1 gong gong  667 九月   22 12:00 manage.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ll</span></span>
<span class="line"><span style="color:#24292e;">总用量 224K</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 gong gong 218K 九月   22 15:09 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#24292e;">-rwxrwxr-x 1 gong gong  667 九月   22 12:00 manage.py</span></span></code></pre></div><p>开始执行命令，发现都正常运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python manage.py migrate</span></span>
<span class="line"><span style="color:#e1e4e8;">$ python manage.py startapp app1</span></span>
<span class="line"><span style="color:#e1e4e8;">$ python manage.py runserver</span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python manage.py migrate</span></span>
<span class="line"><span style="color:#24292e;">$ python manage.py startapp app1</span></span>
<span class="line"><span style="color:#24292e;">$ python manage.py runserver</span></span>
<span class="line"><span style="color:#24292e;">.....</span></span></code></pre></div><h4 id="可能遇到的错误" tabindex="-1">可能遇到的错误 <a class="header-anchor" href="#可能遇到的错误" aria-label="Permalink to &quot;可能遇到的错误&quot;">​</a></h4><ul><li><code>manage.py</code>转成<code>manage.bin</code>之后的报错</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python -m nuitka manage.py --remove-output</span></span>
<span class="line"><span style="color:#e1e4e8;">$ mv manage.py /tmp/manage.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python -m nuitka manage.py --remove-output</span></span>
<span class="line"><span style="color:#24292e;">$ mv manage.py /tmp/manage.py</span></span></code></pre></div><p>查看文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ll</span></span>
<span class="line"><span style="color:#e1e4e8;">总用量 6.2M</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 gong gong 128K 九月   22 16:24 db.sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-rw-r-- 1 gong gong 218K 九月   22 17:16 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxrwxr-x 1 gong gong 5.8M 九月   22 17:20 manage.bin</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ll</span></span>
<span class="line"><span style="color:#24292e;">总用量 6.2M</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 gong gong 128K 九月   22 16:24 db.sqlite3</span></span>
<span class="line"><span style="color:#24292e;">-rw-rw-r-- 1 gong gong 218K 九月   22 17:16 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#24292e;">-rwxrwxr-x 1 gong gong 5.8M 九月   22 17:20 manage.bin</span></span></code></pre></div><p>运行下列命令都是可以正常的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ./manage.bin migrate</span></span>
<span class="line"><span style="color:#e1e4e8;">$ ./manage.bin startapp app2</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ./manage.bin migrate</span></span>
<span class="line"><span style="color:#24292e;">$ ./manage.bin startapp app2</span></span></code></pre></div><p>但是<code>./manage.bin runserver</code>就不行了，错误如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ./manage.bin runserver </span></span>
<span class="line"><span style="color:#e1e4e8;">SyntaxError: Non-UTF-8 code starting with &#39;\\x80&#39; in file /home/gong/work/hellonuitka/./manage.bin on line 2, but no encoding declared; see https://python.org/dev/peps/pep-0263/ for details</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ./manage.bin runserver </span></span>
<span class="line"><span style="color:#24292e;">SyntaxError: Non-UTF-8 code starting with &#39;\\x80&#39; in file /home/gong/work/hellonuitka/./manage.bin on line 2, but no encoding declared; see https://python.org/dev/peps/pep-0263/ for details</span></span></code></pre></div><p>会报错不支持 <code>UTF-8</code>编码</p><p>主要是因为<code>manage.py</code>启动服务是通过命令掉包反射机制完成包导入进行服务启动的，导致不支持<code>runserver</code>命令，其他命令还是可以正常运行的</p><p>如果对于<code>manage.py</code>没有什么重要信息的话就可以不用编译这个文件了，以免不必要的麻烦</p><ul><li><p>运行<code>gunicorn hellonuitka.wsgi</code>错误</p><p>在<code>python3.10</code>和<code>django4.*</code>版本会遇到这个问题，看网络上其他人的教程中没有出现这个问题，后期可能会有修复吧</p><p>如下错误可以通过<code>mv hellonuitka.cpython-310-x86_64-linux-gnu.so hellonuitka.so</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ModuleNotFoundError: No module named &#39;hellonuitka&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ModuleNotFoundError: No module named &#39;hellonuitka&#39;</span></span></code></pre></div><p>但是还是会遇到错误，去搜索了一圈没找到有什么解决方案，如果也遇到了相同的问题，并且找不到解决方案的话，建议采用<code>uwsgi</code>，该方式是可以正常启动的</p><p>(<code>Tips</code>: 如果是采用<code>docker</code>环境部署服务，如采用<code>python:3.10.7-slim-bullseye</code>镜像进行编译之后（其他版本的<code>python docker</code>镜像可能也是一样的），<code>gunicorn</code>服务是可以正常启动的，也不会遇到上面的 <code>No module named &#39;hellonuitka&#39;</code>错误，所以大千世界神秘莫测)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">undefined symbol: PyDescr_IsData</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">undefined symbol: PyDescr_IsData</span></span></code></pre></div></li></ul><h2 id="非docker环境编译加密" tabindex="-1">非<code>docker</code>环境编译加密 <a class="header-anchor" href="#非docker环境编译加密" aria-label="Permalink to &quot;非\`docker\`环境编译加密&quot;">​</a></h2><p>在项目根目录下面执行此命令，之后再删除<code>python</code>源代码文件即可，只保留<code>so</code>文件</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> dir </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">ls</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">/)</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">python</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nuitka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--module</span><span style="color:#E1E4E8;"> \${dir</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">?} </span><span style="color:#79B8FF;">--include-package=\${</span><span style="color:#E1E4E8;">dir</span><span style="color:#F97583;">%</span><span style="color:#79B8FF;">?}</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--remove-output</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-pyi-file</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> dir </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">ls</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-d</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">/)</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">python</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nuitka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--module</span><span style="color:#24292E;"> \${dir</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">?} </span><span style="color:#005CC5;">--include-package=\${</span><span style="color:#24292E;">dir</span><span style="color:#D73A49;">%</span><span style="color:#005CC5;">?}</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--remove-output</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-pyi-file</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre></div><h2 id="docker容器镜像编译加密" tabindex="-1"><code>docker</code>容器镜像编译加密 <a class="header-anchor" href="#docker容器镜像编译加密" aria-label="Permalink to &quot;\`docker\`容器镜像编译加密&quot;">​</a></h2><p>创建一个<code>requirements.txt</code>，写入如下依赖</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">gunicorn</span></span>
<span class="line"><span style="color:#e1e4e8;">django</span></span>
<span class="line"><span style="color:#e1e4e8;">nuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">gevent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">gunicorn</span></span>
<span class="line"><span style="color:#24292e;">django</span></span>
<span class="line"><span style="color:#24292e;">nuitka</span></span>
<span class="line"><span style="color:#24292e;">gevent</span></span></code></pre></div><p>新建一个<code>compile.sh</code>，由于该脚本是在容器构建过程中使用，所以可以执行<code>rm</code>操作</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> dir </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">$(</span><span style="color:#B392F0;">ls</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">-d</span><span style="color:#9ECBFF;"> </span><span style="color:#79B8FF;">*</span><span style="color:#9ECBFF;">/)</span></span>
<span class="line"><span style="color:#F97583;">do</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">python</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-m</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">nuitka</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--module</span><span style="color:#E1E4E8;"> \${dir</span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;">?} </span><span style="color:#79B8FF;">--include-package=\${</span><span style="color:#E1E4E8;">dir</span><span style="color:#F97583;">%</span><span style="color:#79B8FF;">?}</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--remove-output</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--no-pyi-file</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">rm</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-rf</span><span style="color:#E1E4E8;"> \${dir}</span></span>
<span class="line"><span style="color:#F97583;">done</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> dir </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#032F62;">$(</span><span style="color:#6F42C1;">ls</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">-d</span><span style="color:#032F62;"> </span><span style="color:#005CC5;">*</span><span style="color:#032F62;">/)</span></span>
<span class="line"><span style="color:#D73A49;">do</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">python</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-m</span><span style="color:#24292E;"> </span><span style="color:#032F62;">nuitka</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--module</span><span style="color:#24292E;"> \${dir</span><span style="color:#D73A49;">%</span><span style="color:#24292E;">?} </span><span style="color:#005CC5;">--include-package=\${</span><span style="color:#24292E;">dir</span><span style="color:#D73A49;">%</span><span style="color:#005CC5;">?}</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--remove-output</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--no-pyi-file</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">rm</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-rf</span><span style="color:#24292E;"> \${dir}</span></span>
<span class="line"><span style="color:#D73A49;">done</span></span></code></pre></div><p>创建一个<code>Dockerfile</code>文件</p><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">FROM</span><span style="color:#E1E4E8;"> python:3.10.7-slim-bullseye</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">WORKDIR</span><span style="color:#E1E4E8;"> /work</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 由于需要编译python，所以需要安装gcc</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> sed -i </span><span style="color:#9ECBFF;">&quot;s#http://deb.debian.org#https://mirrors.ustc.edu.cn#g&quot;</span><span style="color:#E1E4E8;"> /etc/apt/sources.list \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apt update \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; apt install -y gcc \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; rm -rf /var/lib/apt/lists/ \\</span></span>
<span class="line"><span style="color:#E1E4E8;">    &amp;&amp; rm -rf /var/cache/apt/archives</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">ADD</span><span style="color:#E1E4E8;"> requirements.txt requirements.txt</span></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> pip install --no-cache-dir -r requirements.txt -i https://pypi.doubanio.com/simple/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">COPY</span><span style="color:#E1E4E8;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">RUN</span><span style="color:#E1E4E8;"> bash compile.sh &amp;&amp; rm compile.sh requirements.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">FROM</span><span style="color:#24292E;"> python:3.10.7-slim-bullseye</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">WORKDIR</span><span style="color:#24292E;"> /work</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 由于需要编译python，所以需要安装gcc</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> sed -i </span><span style="color:#032F62;">&quot;s#http://deb.debian.org#https://mirrors.ustc.edu.cn#g&quot;</span><span style="color:#24292E;"> /etc/apt/sources.list \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apt update \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; apt install -y gcc \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; rm -rf /var/lib/apt/lists/ \\</span></span>
<span class="line"><span style="color:#24292E;">    &amp;&amp; rm -rf /var/cache/apt/archives</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">ADD</span><span style="color:#24292E;"> requirements.txt requirements.txt</span></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> pip install --no-cache-dir -r requirements.txt -i https://pypi.doubanio.com/simple/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">COPY</span><span style="color:#24292E;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">RUN</span><span style="color:#24292E;"> bash compile.sh &amp;&amp; rm compile.sh requirements.txt</span></span></code></pre></div><p>采用<code>docker compose</code>方式部署</p><p>项目根目录下面新建<code>.dockerignore</code>排除不必要的文件以及一些重要信息文件</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Dockerfile</span></span>
<span class="line"><span style="color:#e1e4e8;">compose.yaml</span></span>
<span class="line"><span style="color:#e1e4e8;">.git/</span></span>
<span class="line"><span style="color:#e1e4e8;">.idea/</span></span>
<span class="line"><span style="color:#e1e4e8;">.dockerignore</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Dockerfile</span></span>
<span class="line"><span style="color:#24292e;">compose.yaml</span></span>
<span class="line"><span style="color:#24292e;">.git/</span></span>
<span class="line"><span style="color:#24292e;">.idea/</span></span>
<span class="line"><span style="color:#24292e;">.dockerignore</span></span></code></pre></div><p>新建<code>compose.yaml</code>文件</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">hellonuitka</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">build</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">.</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">hello</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">hello</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">8000:8000</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#9ECBFF;">/bin/sh</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#9ECBFF;">-c</span></span>
<span class="line"><span style="color:#E1E4E8;">     - </span><span style="color:#F97583;">|</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">        python manage.py migrate &amp;&amp;</span></span>
<span class="line"><span style="color:#9ECBFF;">        gunicorn hellonuitka.wsgi --bind=0.0.0.0:8000 --workers=4 --worker-connections=1000 --worker-class=gevent</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">hellonuitka</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">build</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">.</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">hello</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">hello</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">8000:8000</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">command</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#032F62;">/bin/sh</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#032F62;">-c</span></span>
<span class="line"><span style="color:#24292E;">     - </span><span style="color:#D73A49;">|</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">        python manage.py migrate &amp;&amp;</span></span>
<span class="line"><span style="color:#032F62;">        gunicorn hellonuitka.wsgi --bind=0.0.0.0:8000 --workers=4 --worker-connections=1000 --worker-class=gevent</span></span></code></pre></div><p>此时项目的路径树如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">├── app2</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── admin.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── apps.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── migrations</span></span>
<span class="line"><span style="color:#e1e4e8;">│   │   └── __init__.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── models.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── tests.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── views.py</span></span>
<span class="line"><span style="color:#e1e4e8;">├── compile.sh</span></span>
<span class="line"><span style="color:#e1e4e8;">├── compose.yaml</span></span>
<span class="line"><span style="color:#e1e4e8;">├── Dockerfile</span></span>
<span class="line"><span style="color:#e1e4e8;">├── hellonuitka</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#e1e4e8;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#e1e4e8;">├── manage.py</span></span>
<span class="line"><span style="color:#e1e4e8;">└── requirements.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">├── app2</span></span>
<span class="line"><span style="color:#24292e;">│   ├── admin.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── apps.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── migrations</span></span>
<span class="line"><span style="color:#24292e;">│   │   └── __init__.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── models.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── tests.py</span></span>
<span class="line"><span style="color:#24292e;">│   └── views.py</span></span>
<span class="line"><span style="color:#24292e;">├── compile.sh</span></span>
<span class="line"><span style="color:#24292e;">├── compose.yaml</span></span>
<span class="line"><span style="color:#24292e;">├── Dockerfile</span></span>
<span class="line"><span style="color:#24292e;">├── hellonuitka</span></span>
<span class="line"><span style="color:#24292e;">│   ├── asgi.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── __init__.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── settings.py</span></span>
<span class="line"><span style="color:#24292e;">│   ├── urls.py</span></span>
<span class="line"><span style="color:#24292e;">│   └── wsgi.py</span></span>
<span class="line"><span style="color:#24292e;">├── manage.py</span></span>
<span class="line"><span style="color:#24292e;">└── requirements.txt</span></span></code></pre></div><p>开始进行构建，由于是第一次构建镜像所以需要携带<code>--build</code>参数，命令执行结束之后可以去访问<code>http://127.0.0.1:8000</code>进行验证服务是否启动成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker compose up --build</span></span>
<span class="line"><span style="color:#e1e4e8;"># 可以看到输出中最后几行如下</span></span>
<span class="line"><span style="color:#e1e4e8;">.....</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Starting gunicorn 20.1.0</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Listening at: http://0.0.0.0:8000 (8)</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Using worker: gevent</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [9] [INFO] Booting worker with pid: 9</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [10] [INFO] Booting worker with pid: 10</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [11] [INFO] Booting worker with pid: 11</span></span>
<span class="line"><span style="color:#e1e4e8;">hello  | [2022-09-23 01:35:43 +0000] [12] [INFO] Booting worker with pid: 12</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker compose up --build</span></span>
<span class="line"><span style="color:#24292e;"># 可以看到输出中最后几行如下</span></span>
<span class="line"><span style="color:#24292e;">.....</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Starting gunicorn 20.1.0</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Listening at: http://0.0.0.0:8000 (8)</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [8] [INFO] Using worker: gevent</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [9] [INFO] Booting worker with pid: 9</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [10] [INFO] Booting worker with pid: 10</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [11] [INFO] Booting worker with pid: 11</span></span>
<span class="line"><span style="color:#24292e;">hello  | [2022-09-23 01:35:43 +0000] [12] [INFO] Booting worker with pid: 12</span></span></code></pre></div><p>现在进入容器进行编译验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker exec -it hello /bin/bash</span></span>
<span class="line"><span style="color:#e1e4e8;">root@f18baf3ec559:/work# ls -al</span></span>
<span class="line"><span style="color:#e1e4e8;">total 1632</span></span>
<span class="line"><span style="color:#e1e4e8;">drwxr-xr-x 1 root root   4096 Sep 23 01:39 .</span></span>
<span class="line"><span style="color:#e1e4e8;">drwxr-xr-x 1 root root   4096 Sep 23 01:39 ..</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 764584 Sep 23 01:39 app2.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 131072 Sep 22 08:24 db.sqlite3</span></span>
<span class="line"><span style="color:#e1e4e8;">-rw-r--r-- 1 root root 756264 Sep 23 01:39 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#e1e4e8;">-rwxrwxr-x 1 root root    667 Sep 22 09:34 manage.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker exec -it hello /bin/bash</span></span>
<span class="line"><span style="color:#24292e;">root@f18baf3ec559:/work# ls -al</span></span>
<span class="line"><span style="color:#24292e;">total 1632</span></span>
<span class="line"><span style="color:#24292e;">drwxr-xr-x 1 root root   4096 Sep 23 01:39 .</span></span>
<span class="line"><span style="color:#24292e;">drwxr-xr-x 1 root root   4096 Sep 23 01:39 ..</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 764584 Sep 23 01:39 app2.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 131072 Sep 22 08:24 db.sqlite3</span></span>
<span class="line"><span style="color:#24292e;">-rw-r--r-- 1 root root 756264 Sep 23 01:39 hellonuitka.cpython-310-x86_64-linux-gnu.so</span></span>
<span class="line"><span style="color:#24292e;">-rwxrwxr-x 1 root root    667 Sep 22 09:34 manage.py</span></span></code></pre></div><h2 id="拓展了解" tabindex="-1">拓展了解 <a class="header-anchor" href="#拓展了解" aria-label="Permalink to &quot;拓展了解&quot;">​</a></h2><p><code>Nuitka</code>是将<code>python</code>编译成<code>C</code>代码 ,再编译成可执行文件，不存在反向解析的问题，非常安全，由于可执行文件由<code>C</code>编译而来，运行速度也会获得提升，但是在使用<code>nuitka</code>过程当中还是会有一些问题的，生产环境使用的话尽量做到全量测试，如果遇到一些复杂的编译之后很难解决的问题，也可以考虑一下<a href="https://github.com/pyinstaller/pyinstaller" target="_blank" rel="noreferrer"><code>pyinstaller</code></a>，这个开源项目编译操作更简单，相对来说坑也更少一些，但是编译之后的运行速度上不如<code>nuitka</code>编译之后的软件，并且编译之后的软件的反编译难度比<code>nuitka</code>更低一些(编译成<code>pyc</code>，也可以使用一些加密参数在打包时候进行代码加密)</p><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://github.com/Nuitka/Nuitka" target="_blank" rel="noreferrer"><code>Nuitka</code>官方项目</a></p><p><a href="https://nuitka.net/zh_CN/doc/index.html" target="_blank" rel="noreferrer"><code>Nuitka</code>官方文档</a></p>`,96),o=[l];function c(t,r,i,y,d,h){return n(),a("div",null,o)}const E=s(p,[["render",c]]);export{g as __pageData,E as default};
