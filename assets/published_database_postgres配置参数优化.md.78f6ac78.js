import{_ as e,o,c as a,Q as c}from"./chunks/framework.36bc40e2.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"published/database/postgres配置参数优化.md","filePath":"published/database/postgres配置参数优化.md","lastUpdated":1693296118000}'),l={name:"published/database/postgres配置参数优化.md"},s=c('<p>在使用<code>postgresql</code>过程当中如果并发比较高，并且数据量也比较大的时候需要对配置项做一些优化</p><p>实际的<code>postgresql</code>默认配置比较保守，所以如果机器硬件配置还可以的话可以大幅度改动</p><h2 id="优化配置项" tabindex="-1">优化配置项 <a class="header-anchor" href="#优化配置项" aria-label="Permalink to &quot;优化配置项&quot;">​</a></h2><p>不同版本下的配置默认值是不一样的，具体以官方文档为准 以下配置是<code>pg14版本</code></p><h4 id="max-connections" tabindex="-1"><code>max_connections</code> <a class="header-anchor" href="#max-connections" aria-label="Permalink to &quot;`max_connections`&quot;">​</a></h4><ul><li>默认值100</li><li>允许的最大客户端连接数，通常可以配置上百上千个连接，并发不是太高的话100够用了</li></ul><h4 id="shared-buffers" tabindex="-1"><code>shared_buffers</code> <a class="header-anchor" href="#shared-buffers" aria-label="Permalink to &quot;`shared_buffers`&quot;">​</a></h4><ul><li>增大数据库内存使用效率</li><li>设置数据库服务器将使用的共享内存缓冲区量，默认<code>128MB</code></li><li>决定有多少内存可以被<code>PostgreSQL</code>用于缓存数据</li><li>推荐内存的1/4</li><li>在磁盘<code>IO</code>压力很大的情况下，提高该值可以减少磁盘<code>IO</code></li></ul><h4 id="work-mem" tabindex="-1"><code>work_mem</code> <a class="header-anchor" href="#work-mem" aria-label="Permalink to &quot;`work_mem`&quot;">​</a></h4><ul><li><p>加快查询排序</p></li><li><p>默认<code>4M</code></p></li><li><p>设置在写入临时磁盘文件之前查询操作(例如排序或哈希表)可使用的基础最大内存容量</p></li><li><p><code>ORDER BY</code>、<code>DISTINCT</code>和归并连接都要用到排序操作，哈希连接、基于哈希的聚集以及基于哈希的<code>IN</code>子查询处理中都要用到哈希表，</p><p>使内部排序和一些复杂的查询都在这个<code>buffer</code>中完成，有助提高排序等操作的速度，并且降低<code>IO</code></p></li><li><p>这个参数和<code>max_connections</code>有关，如果100个查询并发，最坏情况下就很快就达到<code>400M</code>的内存使用，</p><p><code>work_mem</code> * <code>max_connections</code>需要小于内存，推荐乘积可以保持在内存的<code>1/2</code>和<code>3/4</code>之间</p></li></ul><h4 id="effective-cache-size" tabindex="-1"><code>effective_cache_size</code> <a class="header-anchor" href="#effective-cache-size" aria-label="Permalink to &quot;`effective_cache_size`&quot;">​</a></h4><ul><li>加快查询</li><li>默认<code>4G</code>，该配置不实际占用内存，优化器假设一个查询可以用的最大内存，保守推荐配置为物理内存的<code>1/2</code>，更加推荐配置为内存的<code>3/4</code></li><li>设置变大，优化器更倾向使用索引扫描而不是顺序扫描</li></ul><h4 id="max-wal-size" tabindex="-1"><code>max_wal_size</code> <a class="header-anchor" href="#max-wal-size" aria-label="Permalink to &quot;`max_wal_size`&quot;">​</a></h4><ul><li>避免频繁的进行检查点，减少磁盘<code>IO</code></li><li>默认<code>1G</code></li><li><code>wal</code>全称是<code>write ahead log</code>，是<code>postgresql</code>中的<code>online redo log</code>，保证数据的一致性和事务的完整性</li><li>在自动 <code>WAL</code> 检查点之间允许 <code>WAL</code> 增长到的最大尺寸</li><li>中心思想是先写日志后写数据，即要保证对数据库文件的修改应发生在这些修改已经写入到日志之后</li><li>使用<code>wal</code>可以显著减少磁盘写操作的数量，因为只需要将日志文件刷新到磁盘以确保提交事务，而不是事务更改的每个数据文件，日志文件是按顺序写入的，因此同步日志的成本要比刷新数据页的成本低得多</li><li>如果在数据库的日志当中看到告警如<code>consider increasing the configuration parameter &quot;max_wal_size&quot;</code>，则确实需要增大该参数，在高负载情况下，日志很快就会达到<code>1G</code>,推荐把该参数配置为<code>32G</code>或者以上</li></ul><h4 id="wal-buffers" tabindex="-1"><code>wal_buffers</code> <a class="header-anchor" href="#wal-buffers" aria-label="Permalink to &quot;`wal_buffers`&quot;">​</a></h4><ul><li>加快数据更新操作</li><li>默认<code>4M</code></li><li>配置<code>wal</code>使用的共享内存大小，可以改成<code>1G</code></li></ul><h2 id="配置方式" tabindex="-1">配置方式 <a class="header-anchor" href="#配置方式" aria-label="Permalink to &quot;配置方式&quot;">​</a></h2><p>修改数据库配置可以通过修改<code>postgresql.conf</code>文件或者修改启动命令等方式</p><h4 id="修改文件方式" tabindex="-1">修改文件方式 <a class="header-anchor" href="#修改文件方式" aria-label="Permalink to &quot;修改文件方式&quot;">​</a></h4><p>在<code>postgresql</code>的<code>docker</code>容器当中</p><p><code>postgresql.conf</code>的文件位置是<code>/var/lib/postgresql/data/postgresql.conf</code>，如果找不到可以执行如下命令搜索一下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ find / -name &quot;postgresql.conf&quot; 2&gt;/dev/null</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ find / -name &quot;postgresql.conf&quot; 2&gt;/dev/null</span></span></code></pre></div><p>在修改完成该配置文件之后直接挂载进去启动容器就行</p><h4 id="修改启动命令方式" tabindex="-1">修改启动命令方式 <a class="header-anchor" href="#修改启动命令方式" aria-label="Permalink to &quot;修改启动命令方式&quot;">​</a></h4><p>该方式简单直接</p><p>比如修改最大连接数量，配置启动命令为<code>postgres -c max_connections=500</code>即可</p><h2 id="检查配置是否生效" tabindex="-1">检查配置是否生效 <a class="header-anchor" href="#检查配置是否生效" aria-label="Permalink to &quot;检查配置是否生效&quot;">​</a></h2><p>最终经过优化，修改<code>pg</code>的启动命令改为</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ postgres -c max_connections=500 -c shared_buffers=1GB -c work_mem=128MB -c max_wal_size=64GB -c wal_buffers=1GB</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ postgres -c max_connections=500 -c shared_buffers=1GB -c work_mem=128MB -c max_wal_size=64GB -c wal_buffers=1GB</span></span></code></pre></div><p>进入到<code>psql</code>环境下面执行<code>show</code>命令验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;"># show max_connections ;</span></span>\n<span class="line"><span style="color:#e1e4e8;"> max_connections </span></span>\n<span class="line"><span style="color:#e1e4e8;">-----------------</span></span>\n<span class="line"><span style="color:#e1e4e8;"> 500</span></span>\n<span class="line"><span style="color:#e1e4e8;">(1 row)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;"># show max_connections ;</span></span>\n<span class="line"><span style="color:#24292e;"> max_connections </span></span>\n<span class="line"><span style="color:#24292e;">-----------------</span></span>\n<span class="line"><span style="color:#24292e;"> 500</span></span>\n<span class="line"><span style="color:#24292e;">(1 row)</span></span></code></pre></div><p>或者使用<code>show all </code>查看所有配置</p><h2 id="postgresql检查点checkpoint" tabindex="-1"><code>postgresql</code>检查点<code>checkpoint</code> <a class="header-anchor" href="#postgresql检查点checkpoint" aria-label="Permalink to &quot;`postgresql`检查点`checkpoint`&quot;">​</a></h2><p>产生原因</p><ul><li>在事务提交的时候，如果直接写入数据文件，必须要先在数据文件中定位到该数据块，然后才能进行数据的更新，写入是随机的，磁盘的随机读写速度比较慢，所以事务提交的时候以追加日志方式顺序写入<code>wal</code>日志文件，保证足够的速度</li><li><code>wal</code>会占用大量磁盘，并且故障恢复的时候<code>redo</code>的<code>wal</code>日志太多导致故障恢复速度变慢</li></ul><p><code>checkpoint</code>概述</p><ul><li>用来保证数据一致性和完整性的一个数据库事务，执行的时候会把检查点之前的脏数据刷新到磁盘，实现数据缩短数据库崩溃恢复时间的目的</li><li>当数据更新的时候，包含更新数据的数据块在共享缓冲区更新，纪录被保存在<code>wal</code>缓冲区，提交后，更改被追加到磁盘上面的<code>wal</code>日志，永久生效</li><li>数据库崩溃的时候，共享缓冲区被清空，<code>wal</code>日志中的更改被应用于数据文件</li><li><code>checkpoint</code>执行的时候会识别共享缓冲区的脏页，把数据写入数据文件当中（脏页刷入），然后删除这个检查点位置之前的<code>wal</code>文件</li></ul><p>触发条件</p><ul><li>手动执行<code>checkpoint</code>命令</li><li><code>wal</code>文件的总大小超过了<code>max_wal_size</code>配置的大小</li><li>距离上一次检查点执行超过了<code>checkpoint_timeout</code>配置的超时时间</li><li>数据库停止或者恢复启动完成</li><li>执行<code>pg_start_backup</code>备份的时候</li></ul><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="http://www.postgres.cn/docs/14/runtime-config.html" target="_blank" rel="noreferrer"><code>postgres</code>中文文档</a></p><p><a href="http://www.postgres.cn/docs/14/config-setting.html#id-1.6.7.4.5" target="_blank" rel="noreferrer"><code>postgresql</code>服务器配置</a></p><p><a href="https://blog.csdn.net/weixin_45027467/article/details/123279437" target="_blank" rel="noreferrer"><code>PostgreSQL</code>配置优化参数详解</a></p><p><a href="https://www.modb.pro/db/48129" target="_blank" rel="noreferrer"><code>PostgreSQL</code>参数优化</a></p>',44),d=[s];function i(n,t,r,p,h,u){return o(),a("div",null,d)}const m=e(l,[["render",i]]);export{f as __pageData,m as default};
