import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.ec8f7e8e.js";const _=JSON.parse('{"title":"背景","description":"","frontmatter":{},"headers":[],"relativePath":"published/drf-yasg打开文档速度很慢的解决方案.md","filePath":"published/drf-yasg打开文档速度很慢的解决方案.md"}'),l={name:"published/drf-yasg打开文档速度很慢的解决方案.md"},o=p(`<h1 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h1><p>在使用<code>drf-yasg</code>的时候，有时候一不小心写了一些代码，比如写<code>serializers</code>的时候写了一些<code>default</code>参数，该参数是会查询数据库的，打开<code>swagger</code>文档的时候就会触发数据库查询，从而慢慢的增加了打开<code>swagger</code>文档的时间</p><h2 id="找到耗时的接口" tabindex="-1">找到耗时的接口 <a class="header-anchor" href="#找到耗时的接口" aria-label="Permalink to &quot;找到耗时的接口&quot;">​</a></h2><p>需要安装依赖<code>pip install prettytable</code>方便打印耗时接口</p><p>在项目根目录下新增一个<code>drf-yasg</code>的<code>generator</code></p><p><code>generators.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> prettytable</span></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> drf_yasg.generators </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> OpenAPISchemaGenerator</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">class</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TimeCostSchemaGenerator</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">OpenAPISchemaGenerator</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(self, </span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">args, </span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">kwargs):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().</span><span style="color:#79B8FF;">__init__</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">*</span><span style="color:#E1E4E8;">args, </span><span style="color:#F97583;">**</span><span style="color:#E1E4E8;">kwargs)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.path_method_cost_map </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.table </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> prettytable.PrettyTable(</span><span style="color:#FFAB70;">field_names</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;cost&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;method&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;url&#39;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_operation</span><span style="color:#E1E4E8;">(self, view, path, prefix, method, components, request):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;计算获取每个接口的schema的时间</span></span>
<span class="line"></span>
<span class="line"><span style="color:#9ECBFF;">        如果接口操作的耗时小于0.01秒，则不记录该接口</span></span>
<span class="line"><span style="color:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        now </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> time.perf_counter()</span></span>
<span class="line"><span style="color:#E1E4E8;">        operation </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().get_operation(view, path, prefix, method, components, request)</span></span>
<span class="line"><span style="color:#E1E4E8;">        cost </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">round</span><span style="color:#E1E4E8;">(time.perf_counter() </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;"> now, </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> cost:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.path_method_cost_map[(path, method)] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> cost</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> operation</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">def</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get_schema</span><span style="color:#E1E4E8;">(self, request</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">None</span><span style="color:#E1E4E8;">, public</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">False</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#9ECBFF;">&quot;&quot;&quot;在获取schema的时候打印记录下来的接口和耗时表格&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">        schema </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">super</span><span style="color:#E1E4E8;">().get_schema(request, public)</span></span>
<span class="line"><span style="color:#E1E4E8;">        path_method_cost_items </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">sorted</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.path_method_cost_map.items(), </span><span style="color:#FFAB70;">key</span><span style="color:#F97583;">=lambda</span><span style="color:#E1E4E8;"> i: i[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">], </span><span style="color:#FFAB70;">reverse</span><span style="color:#F97583;">=</span><span style="color:#79B8FF;">True</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> ((path, method), cost) </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> path_method_cost_items:</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.table.add_row([cost, method, path])</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">self</span><span style="color:#E1E4E8;">.table)</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> schema</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> time</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> prettytable</span></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> drf_yasg.generators </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> OpenAPISchemaGenerator</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">class</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TimeCostSchemaGenerator</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">OpenAPISchemaGenerator</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(self, </span><span style="color:#D73A49;">*</span><span style="color:#24292E;">args, </span><span style="color:#D73A49;">**</span><span style="color:#24292E;">kwargs):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().</span><span style="color:#005CC5;">__init__</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">*</span><span style="color:#24292E;">args, </span><span style="color:#D73A49;">**</span><span style="color:#24292E;">kwargs)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.path_method_cost_map </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.table </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> prettytable.PrettyTable(</span><span style="color:#E36209;">field_names</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;cost&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;method&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;url&#39;</span><span style="color:#24292E;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_operation</span><span style="color:#24292E;">(self, view, path, prefix, method, components, request):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;计算获取每个接口的schema的时间</span></span>
<span class="line"></span>
<span class="line"><span style="color:#032F62;">        如果接口操作的耗时小于0.01秒，则不记录该接口</span></span>
<span class="line"><span style="color:#032F62;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        now </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> time.perf_counter()</span></span>
<span class="line"><span style="color:#24292E;">        operation </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().get_operation(view, path, prefix, method, components, request)</span></span>
<span class="line"><span style="color:#24292E;">        cost </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">round</span><span style="color:#24292E;">(time.perf_counter() </span><span style="color:#D73A49;">-</span><span style="color:#24292E;"> now, </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> cost:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.path_method_cost_map[(path, method)] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> cost</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> operation</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">def</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get_schema</span><span style="color:#24292E;">(self, request</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">None</span><span style="color:#24292E;">, public</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">False</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#032F62;">&quot;&quot;&quot;在获取schema的时候打印记录下来的接口和耗时表格&quot;&quot;&quot;</span></span>
<span class="line"><span style="color:#24292E;">        schema </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">super</span><span style="color:#24292E;">().get_schema(request, public)</span></span>
<span class="line"><span style="color:#24292E;">        path_method_cost_items </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">sorted</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.path_method_cost_map.items(), </span><span style="color:#E36209;">key</span><span style="color:#D73A49;">=lambda</span><span style="color:#24292E;"> i: i[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">], </span><span style="color:#E36209;">reverse</span><span style="color:#D73A49;">=</span><span style="color:#005CC5;">True</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">for</span><span style="color:#24292E;"> ((path, method), cost) </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> path_method_cost_items:</span></span>
<span class="line"><span style="color:#24292E;">            </span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.table.add_row([cost, method, path])</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">self</span><span style="color:#24292E;">.table)</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> schema</span></span></code></pre></div><h2 id="执行命令验证" tabindex="-1">执行命令验证 <a class="header-anchor" href="#执行命令验证" aria-label="Permalink to &quot;执行命令验证&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python manage.py generate_swagger test.json -g generators.TimeCostSchemaGenerator -o</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python manage.py generate_swagger test.json -g generators.TimeCostSchemaGenerator -o</span></span></code></pre></div><p>上述命令会打印出如下格式的输出，表格三列表示接口耗时，请求方法，请求<code>url</code>，按照耗时倒序排列</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">+-------+--------+---------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">|  cost | method |                              url                              |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-------+--------+---------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#e1e4e8;">| 15.36 |  GET   |                /api/v2/**/                                    |</span></span>
<span class="line"><span style="color:#e1e4e8;">|  3.57 |  GET   |               /api/***                                        |</span></span>
<span class="line"><span style="color:#e1e4e8;">+-------+--------+---------------------------------------------------------------+</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">+-------+--------+---------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">|  cost | method |                              url                              |</span></span>
<span class="line"><span style="color:#24292e;">+-------+--------+---------------------------------------------------------------+</span></span>
<span class="line"><span style="color:#24292e;">| 15.36 |  GET   |                /api/v2/**/                                    |</span></span>
<span class="line"><span style="color:#24292e;">|  3.57 |  GET   |               /api/***                                        |</span></span>
<span class="line"><span style="color:#24292e;">+-------+--------+---------------------------------------------------------------+</span></span></code></pre></div><p>参数解释</p><ul><li><code>generate_swagger</code>是<code>drf-yasg</code>自定义的命令，安装完<code>drf-yasg</code>之后可以直接使用</li><li><code>test.json</code>是生成<code>schema</code>文件的路径</li><li><code>-g generators.TimeCostSchemaGenerator</code>表示指定自定义<code>generator</code>的路径位置，程序执行的时候会按照指定参数导入</li><li><code>-o</code>表示会覆盖旧的<code>schema</code>文件</li></ul>`,13),e=[o];function t(c,r,y,E,i,d){return a(),n("div",null,e)}const F=s(l,[["render",t]]);export{_ as __pageData,F as default};
