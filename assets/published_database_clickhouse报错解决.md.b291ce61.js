import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.ec8f7e8e.js";const m=JSON.parse('{"title":"解决clickhouse服务器启动异常DB::Exception: Suspiciously many broken parts to remove.","description":"","frontmatter":{},"headers":[],"relativePath":"published/database/clickhouse报错解决.md","filePath":"published/database/clickhouse报错解决.md"}'),l={name:"published/database/clickhouse报错解决.md"},p=n(`<h1 id="解决clickhouse服务器启动异常db-exception-suspiciously-many-broken-parts-to-remove" tabindex="-1">解决clickhouse服务器启动异常DB::Exception: Suspiciously many broken parts to remove. <a class="header-anchor" href="#解决clickhouse服务器启动异常db-exception-suspiciously-many-broken-parts-to-remove" aria-label="Permalink to &quot;解决clickhouse服务器启动异常DB::Exception: Suspiciously many broken parts to remove.&quot;">​</a></h1><h2 id="产生原因" tabindex="-1">产生原因 <a class="header-anchor" href="#产生原因" aria-label="Permalink to &quot;产生原因&quot;">​</a></h2><ul><li><h4 id="服务重启与断电原因" tabindex="-1">服务重启与断电原因 <a class="header-anchor" href="#服务重启与断电原因" aria-label="Permalink to &quot;服务重启与断电原因&quot;">​</a></h4></li></ul><p>最近遇到一个关于<code>clickhouse</code>服务启动失败问题，报错输出如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Application: DB::Exception: Suspiciously many (32) broken parts to remove.****</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Application: DB::Exception: Suspiciously many (32) broken parts to remove.****</span></span></code></pre></div><p>这个是发生在机器断电场景下的报错，查找原因是说因为写入数据造成的元数据和数据不一致问题</p><p><code>clickhouse</code>在重启服务的时候会重新加载<code>MergeTree</code>表引擎数据，数据可能存在损坏情况</p><ul><li><h4 id="clickhouse配置原因" tabindex="-1"><code>clickhouse</code>配置原因 <a class="header-anchor" href="#clickhouse配置原因" aria-label="Permalink to &quot;\`clickhouse\`配置原因&quot;">​</a></h4></li></ul><p>配置参数当中包含一个参数<code>max_suspicious_broken_parts</code>，默认值是<code>10</code>，可选值范围是任意正整数，如果单个分区中的损坏部分数量超过<code>max_suspicious_broken_parts </code>配置的值，则拒绝自动修复或者拒绝删除损坏部分的数据，并且服务启动时候直接报错退出</p><p>目前需要尽量避免该错误以免服务启动失败，推荐把该参数配置为<code>1000</code>或者更大的值</p><h2 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h2><h4 id="单表配置方式" tabindex="-1">单表配置方式 <a class="header-anchor" href="#单表配置方式" aria-label="Permalink to &quot;单表配置方式&quot;">​</a></h4><p>在创建<code>MergeTree</code>表的时候特别配置一下<code>max_suspicious_broken_parts</code>参数</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">CREATE TABLE foo</span></span>
<span class="line"><span style="color:#e1e4e8;">(</span></span>
<span class="line"><span style="color:#e1e4e8;">    \`A\` Int64</span></span>
<span class="line"><span style="color:#e1e4e8;">)</span></span>
<span class="line"><span style="color:#e1e4e8;">ENGINE = MergeTree</span></span>
<span class="line"><span style="color:#e1e4e8;">ORDER BY tuple()</span></span>
<span class="line"><span style="color:#e1e4e8;">SETTINGS max_suspicious_broken_parts = 1000;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">CREATE TABLE foo</span></span>
<span class="line"><span style="color:#24292e;">(</span></span>
<span class="line"><span style="color:#24292e;">    \`A\` Int64</span></span>
<span class="line"><span style="color:#24292e;">)</span></span>
<span class="line"><span style="color:#24292e;">ENGINE = MergeTree</span></span>
<span class="line"><span style="color:#24292e;">ORDER BY tuple()</span></span>
<span class="line"><span style="color:#24292e;">SETTINGS max_suspicious_broken_parts = 1000;</span></span></code></pre></div><h4 id="命令行方式" tabindex="-1">命令行方式 <a class="header-anchor" href="#命令行方式" aria-label="Permalink to &quot;命令行方式&quot;">​</a></h4><p>使用<code>ALTER TABLE ... MODIFY SETTING</code>命令修改</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">ALTER TABLE foo</span></span>
<span class="line"><span style="color:#e1e4e8;">    MODIFY SETTING max_suspicious_broken_parts = 1000;</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">-- 恢复默认值</span></span>
<span class="line"><span style="color:#e1e4e8;">-- reset to default (use value from system.merge_tree_settings)</span></span>
<span class="line"><span style="color:#e1e4e8;">ALTER TABLE foo</span></span>
<span class="line"><span style="color:#e1e4e8;">    RESET SETTING max_suspicious_broken_parts;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">ALTER TABLE foo</span></span>
<span class="line"><span style="color:#24292e;">    MODIFY SETTING max_suspicious_broken_parts = 1000;</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">-- 恢复默认值</span></span>
<span class="line"><span style="color:#24292e;">-- reset to default (use value from system.merge_tree_settings)</span></span>
<span class="line"><span style="color:#24292e;">ALTER TABLE foo</span></span>
<span class="line"><span style="color:#24292e;">    RESET SETTING max_suspicious_broken_parts;</span></span></code></pre></div><h4 id="配置文件方式" tabindex="-1">配置文件方式 <a class="header-anchor" href="#配置文件方式" aria-label="Permalink to &quot;配置文件方式&quot;">​</a></h4><p>如果服务起不来了，就只能使用这个方式解决</p><p>新建文件<code>max_suspicious_broken_parts.xml</code>写入如下内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">&lt;?xml version=&quot;1.0&quot;?&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;yandex&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">     &lt;merge_tree&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">         &lt;max_suspicious_broken_parts&gt;1000&lt;/max_suspicious_broken_parts&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">     &lt;/merge_tree&gt;</span></span>
<span class="line"><span style="color:#e1e4e8;">&lt;/yandex&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">&lt;?xml version=&quot;1.0&quot;?&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;yandex&gt;</span></span>
<span class="line"><span style="color:#24292e;">     &lt;merge_tree&gt;</span></span>
<span class="line"><span style="color:#24292e;">         &lt;max_suspicious_broken_parts&gt;1000&lt;/max_suspicious_broken_parts&gt;</span></span>
<span class="line"><span style="color:#24292e;">     &lt;/merge_tree&gt;</span></span>
<span class="line"><span style="color:#24292e;">&lt;/yandex&gt;</span></span></code></pre></div><p><code>clickhouse</code>的配置文件推荐放置在<code>/etc/clickhouse-server/config.d/</code>文件夹下生效</p><p>如果是在<code>Ubuntu</code>或者<code>Centos</code>上面以<code>DEB</code>或<code>RPM</code>安装包的形式启动的，需要把该文件放到<code>/etc/clickhouse-server/config.d/</code>，最后重启<code>clickhouse</code>就可以了</p><p>如果是<code>docker compose</code>方式启动</p><p>修改<code>compose.yaml</code>配置如下，主要也是把对应文件挂载进入容器内部相应位置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">services:</span></span>
<span class="line"><span style="color:#e1e4e8;">  clickhouse:</span></span>
<span class="line"><span style="color:#e1e4e8;">    image: clickhouse/clickhouse-server</span></span>
<span class="line"><span style="color:#e1e4e8;">    ulimits:</span></span>
<span class="line"><span style="color:#e1e4e8;">      nofile:</span></span>
<span class="line"><span style="color:#e1e4e8;">        soft: 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">        hard: 262144</span></span>
<span class="line"><span style="color:#e1e4e8;">    restart: always</span></span>
<span class="line"><span style="color:#e1e4e8;">    container_name: demo-clickhouse</span></span>
<span class="line"><span style="color:#e1e4e8;">    environment:</span></span>
<span class="line"><span style="color:#e1e4e8;">    - CLICKHOUSE_USER=demo</span></span>
<span class="line"><span style="color:#e1e4e8;">    - CLICKHOUSE_PASSWORD=demo-pass</span></span>
<span class="line"><span style="color:#e1e4e8;">    - CLICKHOUSE_DB=demo</span></span>
<span class="line"><span style="color:#e1e4e8;">    ports:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;8123:8123&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">      - &quot;9000:9000&quot;</span></span>
<span class="line"><span style="color:#e1e4e8;">    volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">      - ./max_suspicious_broken_parts.xml:/etc/clickhouse-server/config.d/max_suspicious_broken_parts.xml</span></span>
<span class="line"><span style="color:#e1e4e8;">      - demo-clickhouse:/var/lib/clickhouse</span></span>
<span class="line"><span style="color:#e1e4e8;">    healthcheck:</span></span>
<span class="line"><span style="color:#e1e4e8;">      test: &#39;wget -O - http://127.0.0.1:8123 || exit 1&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">     </span></span>
<span class="line"><span style="color:#e1e4e8;">volumes:</span></span>
<span class="line"><span style="color:#e1e4e8;">  demo-clickhouse: {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">services:</span></span>
<span class="line"><span style="color:#24292e;">  clickhouse:</span></span>
<span class="line"><span style="color:#24292e;">    image: clickhouse/clickhouse-server</span></span>
<span class="line"><span style="color:#24292e;">    ulimits:</span></span>
<span class="line"><span style="color:#24292e;">      nofile:</span></span>
<span class="line"><span style="color:#24292e;">        soft: 262144</span></span>
<span class="line"><span style="color:#24292e;">        hard: 262144</span></span>
<span class="line"><span style="color:#24292e;">    restart: always</span></span>
<span class="line"><span style="color:#24292e;">    container_name: demo-clickhouse</span></span>
<span class="line"><span style="color:#24292e;">    environment:</span></span>
<span class="line"><span style="color:#24292e;">    - CLICKHOUSE_USER=demo</span></span>
<span class="line"><span style="color:#24292e;">    - CLICKHOUSE_PASSWORD=demo-pass</span></span>
<span class="line"><span style="color:#24292e;">    - CLICKHOUSE_DB=demo</span></span>
<span class="line"><span style="color:#24292e;">    ports:</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;8123:8123&quot;</span></span>
<span class="line"><span style="color:#24292e;">      - &quot;9000:9000&quot;</span></span>
<span class="line"><span style="color:#24292e;">    volumes:</span></span>
<span class="line"><span style="color:#24292e;">      - ./max_suspicious_broken_parts.xml:/etc/clickhouse-server/config.d/max_suspicious_broken_parts.xml</span></span>
<span class="line"><span style="color:#24292e;">      - demo-clickhouse:/var/lib/clickhouse</span></span>
<span class="line"><span style="color:#24292e;">    healthcheck:</span></span>
<span class="line"><span style="color:#24292e;">      test: &#39;wget -O - http://127.0.0.1:8123 || exit 1&#39;</span></span>
<span class="line"><span style="color:#24292e;">     </span></span>
<span class="line"><span style="color:#24292e;">volumes:</span></span>
<span class="line"><span style="color:#24292e;">  demo-clickhouse: {}</span></span></code></pre></div><p>最后运行如下命令，容器就可以正常启动了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ docker compose down</span></span>
<span class="line"><span style="color:#e1e4e8;">$ docker compose up -d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ docker compose down</span></span>
<span class="line"><span style="color:#24292e;">$ docker compose up -d</span></span></code></pre></div><h2 id="验证配置是否生效" tabindex="-1">验证配置是否生效 <a class="header-anchor" href="#验证配置是否生效" aria-label="Permalink to &quot;验证配置是否生效&quot;">​</a></h2><p>连接到<code>clickhouse</code>之后执行查询</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">SELECT *</span></span>
<span class="line"><span style="color:#e1e4e8;">FROM system.merge_tree_settings</span></span>
<span class="line"><span style="color:#e1e4e8;">WHERE name LIKE &#39;%max_suspicious_broken_parts%&#39;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">SELECT *</span></span>
<span class="line"><span style="color:#24292e;">FROM system.merge_tree_settings</span></span>
<span class="line"><span style="color:#24292e;">WHERE name LIKE &#39;%max_suspicious_broken_parts%&#39;</span></span></code></pre></div><table><thead><tr><th>name</th><th>value</th><th>changed</th><th>description</th><th>type</th></tr></thead><tbody><tr><td>max_suspicious_broken_parts</td><td>1000</td><td>1</td><td>Max broken parts, if more - deny automatic deletion.</td><td>UInt64</td></tr><tr><td>max_suspicious_broken_parts_bytes</td><td>1073741824</td><td>0</td><td>Max size of all broken parts, if more - deny automatic deletion.</td><td>UInt64</td></tr></tbody></table><h2 id="阅读参考" tabindex="-1">阅读参考 <a class="header-anchor" href="#阅读参考" aria-label="Permalink to &quot;阅读参考&quot;">​</a></h2><p><a href="https://clickhouse.com/docs/zh/operations/settings/merge-tree-settings/" target="_blank" rel="noreferrer"><code>Clickhouse</code> <code>MergeTree</code>官方配置文档</a></p><p><a href="https://kb.altinity.com/altinity-kb-setup-and-maintenance/suspiciously-many-broken-parts/" target="_blank" rel="noreferrer"><code>Altinity Knowledge Base</code>关于<code>Suspiciously many broken parts</code>报错解决方案</a></p>`,35),o=[p];function c(t,i,r,d,u,h){return e(),a("div",null,o)}const k=s(l,[["render",c]]);export{m as __pageData,k as default};
