import{_ as s,o as a,c as n,Q as o}from"./chunks/framework.ec8f7e8e.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"published/python操作docker kafka.md","filePath":"published/python操作docker kafka.md"}'),p={name:"published/python操作docker kafka.md"},l=o(`<p>本机<code>IP</code>是<code>10.30.6.24</code>，后面配置过程当中需要依据自己<code>IP</code>信息配置修改</p><p><code>kafka</code>默认使用<code>127.0.0.1</code>访问</p><h3 id="配置compose-yaml文件如下" tabindex="-1">配置<code>compose.yaml</code>文件如下 <a class="header-anchor" href="#配置compose-yaml文件如下" aria-label="Permalink to &quot;配置\`compose.yaml\`文件如下&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#85E89D;">services</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">zookeeper</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">zookeeper</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-zookeeper</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;2181:2181&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">restart</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">always</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kafka</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">image</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">wurstmeister/kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">container_name</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">demo-kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ports</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">&quot;9092:9092&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">ulimits</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">nofile</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">soft</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">262144</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#85E89D;">hard</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">262144</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">environment</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">DOCKER_API_VERSION</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1.41</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_ADVERTISED_LISTENERS</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;PLAINTEXT://10.30.6.24:9092&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_LISTENERS</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;PLAINTEXT://0.0.0.0:9092&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_BROKER_ID</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_PORT</span><span style="color:#E1E4E8;">: </span><span style="color:#79B8FF;">9092</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_ZOOKEEPER_CONNECT</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">zookeeper:2181</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#85E89D;">KAFKA_LOG_DIRS</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/kafka/kafka-logs-backend</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">depends_on</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">zookeeper</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#E1E4E8;">      - </span><span style="color:#9ECBFF;">kafka-data:/kafka</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#85E89D;">command</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">/bin/sh -c &quot;rm -f /kafka/kafka-logs-backend/meta.properties &amp;&amp; start-kafka.sh&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#85E89D;">volumes</span><span style="color:#E1E4E8;">:</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#85E89D;">kafka-data</span><span style="color:#E1E4E8;">: {}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#22863A;">services</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">zookeeper</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">zookeeper</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-zookeeper</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;2181:2181&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">restart</span><span style="color:#24292E;">: </span><span style="color:#032F62;">always</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kafka</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">image</span><span style="color:#24292E;">: </span><span style="color:#032F62;">wurstmeister/kafka</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">container_name</span><span style="color:#24292E;">: </span><span style="color:#032F62;">demo-kafka</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ports</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">&quot;9092:9092&quot;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">ulimits</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">nofile</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">soft</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">262144</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#22863A;">hard</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">262144</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">environment</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">DOCKER_API_VERSION</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1.41</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_ADVERTISED_LISTENERS</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;PLAINTEXT://10.30.6.24:9092&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_LISTENERS</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;PLAINTEXT://0.0.0.0:9092&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_BROKER_ID</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_PORT</span><span style="color:#24292E;">: </span><span style="color:#005CC5;">9092</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_ZOOKEEPER_CONNECT</span><span style="color:#24292E;">: </span><span style="color:#032F62;">zookeeper:2181</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#22863A;">KAFKA_LOG_DIRS</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/kafka/kafka-logs-backend</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">depends_on</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">zookeeper</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span style="color:#24292E;">      - </span><span style="color:#032F62;">kafka-data:/kafka</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#22863A;">command</span><span style="color:#24292E;">: </span><span style="color:#032F62;">/bin/sh -c &quot;rm -f /kafka/kafka-logs-backend/meta.properties &amp;&amp; start-kafka.sh&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#22863A;">volumes</span><span style="color:#24292E;">:</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#22863A;">kafka-data</span><span style="color:#24292E;">: {}</span></span></code></pre></div><h3 id="启动命令" tabindex="-1">启动命令 <a class="header-anchor" href="#启动命令" aria-label="Permalink to &quot;启动命令&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">$</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">docker</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">compose</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">up</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">-d</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">$</span><span style="color:#24292E;"> </span><span style="color:#032F62;">docker</span><span style="color:#24292E;"> </span><span style="color:#032F62;">compose</span><span style="color:#24292E;"> </span><span style="color:#032F62;">up</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">-d</span></span></code></pre></div><h3 id="配置参数解释" tabindex="-1">配置参数解释 <a class="header-anchor" href="#配置参数解释" aria-label="Permalink to &quot;配置参数解释&quot;">​</a></h3><p><code>ulimits</code></p><ul><li>操作系统提供限制可使用资源量的方式</li><li><code>linux</code>系统默认是1024个，具体执行命令<code>ulimit -a</code>查看</li><li>由于消息队列文件读写频繁，需要调大该配置，修改<code>kafka</code>的默认最大打开文件数量</li><li>限制可以是硬限制或软限制，但软限制不能超过硬限制</li></ul><h3 id="环境变量解释" tabindex="-1">环境变量解释 <a class="header-anchor" href="#环境变量解释" aria-label="Permalink to &quot;环境变量解释&quot;">​</a></h3><ul><li><code>DOCKER_API_VERSION</code>: <code>docker version</code>命令的<code>API Version</code>输出信息</li><li><strong><code>KAFKA_ADVERTISED_LISTENERS</code>: 把<code>kafka</code>的地址端口注册给<code>zookeeper</code>,这个地方的数据目前是<code>PLAINTEXT://10.30.6.24:9092</code>，这个<code>IP</code>地址需要依据具体机器<code>IP</code>进行修改，指明客户端通过哪个 <code>IP</code> 可以访问到当前节点</strong>，如果网卡<code>IP</code>有修改的话也需要修改这个地方的配置</li><li><code>KAFKA_LISTENERS</code>： 配置<code>kafka</code>的监听端口，指明 <code>kafka</code> 当前节点监听本机的哪个网卡，这个地方的<code>IP</code>地址可以填写为<code>0.0.0.0</code>表示监听所有网卡的信息</li><li><code> KAFKA_BROKER_ID</code>: 一个 <code>kafka</code>节点 就是一个 <code>broker</code>，一个集群里面的<code>broker id</code>唯一</li><li><code>KAFKA_PORT</code>: 配置<code>kafka</code>开放端口</li><li><code>KAFKA_ZOOKEEPER_CONNECT</code>: 配置对应的<code>zookeeper</code>连接信息，因为是在同一个<code>docker compose</code>当中，所以可以使用服务名称作为<code>host</code>连接信息</li><li><code>KAFKA_LOG_DIRS</code>: 保存日志数据的目录，默认是<code>/tmp/kafka-logs</code></li></ul><h3 id="挂载卷解释" tabindex="-1">挂载卷解释 <a class="header-anchor" href="#挂载卷解释" aria-label="Permalink to &quot;挂载卷解释&quot;">​</a></h3><p><code>- /var/run/docker.sock:/var/run/docker.sock</code>: 把<code>docker</code>的<code>sock</code>挂在进去</p><p><code>- kafka-data:/kafka</code>: 把<code>kafka</code>日志信息挂载出来进行持久化，如果不需要进行数据持久化，可以去掉这一步挂载</p><h3 id="启动命令-1" tabindex="-1">启动命令 <a class="header-anchor" href="#启动命令-1" aria-label="Permalink to &quot;启动命令&quot;">​</a></h3><p><code>/bin/sh -c &quot;rm -f /kafka/kafka-logs-backend/meta.properties &amp;&amp; start-kafka.sh&quot;</code></p><p>由于挂载数据的时候会把<code>kafka</code>的配置信息也挂载出来，并且保存在<code>meta.properties</code>文件当中</p><p>文件内容如下，会保存一个<code>cluster.id</code>，当容器销毁重建时候，<code>kafka</code>会重新创建一个<code>cluster.id</code>，同时也会去检查<code>meta.properties</code>的信息</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">#</span></span>
<span class="line"><span style="color:#e1e4e8;">#Mon Jun 27 06:38:03 GMT 2022</span></span>
<span class="line"><span style="color:#e1e4e8;">cluster.id=XMHTDGRvQ5yJnEfXKhuabg</span></span>
<span class="line"><span style="color:#e1e4e8;">version=0</span></span>
<span class="line"><span style="color:#e1e4e8;">broker.id=1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">#</span></span>
<span class="line"><span style="color:#24292e;">#Mon Jun 27 06:38:03 GMT 2022</span></span>
<span class="line"><span style="color:#24292e;">cluster.id=XMHTDGRvQ5yJnEfXKhuabg</span></span>
<span class="line"><span style="color:#24292e;">version=0</span></span>
<span class="line"><span style="color:#24292e;">broker.id=1</span></span></code></pre></div><p>当容器启动中会产生报错如下，主要是<code>kafka</code>检查<code>cluster.id</code>不一致导致</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">kafka.common.InconsistentClusterIdException: The Cluster ID 2Z7pfznDRmWeLJNp3nZm8A doesn&#39;t match stored clusterId Some(XMHTDGRvQ5yJnEfXKhuabg) in meta.properties. The broker is trying to join the wrong cluster. Configured zookeeper.connect may be wrong.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">kafka.common.InconsistentClusterIdException: The Cluster ID 2Z7pfznDRmWeLJNp3nZm8A doesn&#39;t match stored clusterId Some(XMHTDGRvQ5yJnEfXKhuabg) in meta.properties. The broker is trying to join the wrong cluster. Configured zookeeper.connect may be wrong.</span></span></code></pre></div><p>所以需要配置在<code>kafka</code>启动之前删除持久化保存的<code>meta.properties</code>配置信息，这一步不影响持久化数据，主要是避免冲突报错</p><h2 id="python客户端操作" tabindex="-1"><code>python</code>客户端操作 <a class="header-anchor" href="#python客户端操作" aria-label="Permalink to &quot;\`python\`客户端操作&quot;">​</a></h2><p>安装依赖库</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ pip install kafka-python</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ pip install kafka-python</span></span></code></pre></div><h3 id="生产者" tabindex="-1">生产者 <a class="header-anchor" href="#生产者" aria-label="Permalink to &quot;生产者&quot;">​</a></h3><p><code>producer.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> kafka </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> KafkaProducer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置value序列化方法，选择kafka节点信息</span></span>
<span class="line"><span style="color:#6A737D;"># 如果是远程broker需要把127.0.0.1修改为对应IP地址</span></span>
<span class="line"><span style="color:#E1E4E8;">producer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> KafkaProducer(</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">value_serializer</span><span style="color:#F97583;">=lambda</span><span style="color:#E1E4E8;"> m: json.dumps(m).encode(</span><span style="color:#9ECBFF;">&#39;ascii&#39;</span><span style="color:#E1E4E8;">),</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">bootstrap_servers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;10.30.6.24:9092&#39;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 发送操作默认是异步的</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> _ </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">range</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">):</span></span>
<span class="line"><span style="color:#E1E4E8;">    producer.send(</span><span style="color:#9ECBFF;">&#39;my-topic&#39;</span><span style="color:#E1E4E8;">, {</span><span style="color:#9ECBFF;">&#39;key&#39;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&#39;value&#39;</span><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 阻塞直到操作实际send</span></span>
<span class="line"><span style="color:#E1E4E8;">producer.flush()</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> kafka </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> KafkaProducer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 配置value序列化方法，选择kafka节点信息</span></span>
<span class="line"><span style="color:#6A737D;"># 如果是远程broker需要把127.0.0.1修改为对应IP地址</span></span>
<span class="line"><span style="color:#24292E;">producer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> KafkaProducer(</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">value_serializer</span><span style="color:#D73A49;">=lambda</span><span style="color:#24292E;"> m: json.dumps(m).encode(</span><span style="color:#032F62;">&#39;ascii&#39;</span><span style="color:#24292E;">),</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">bootstrap_servers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;10.30.6.24:9092&#39;</span><span style="color:#24292E;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 发送操作默认是异步的</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> _ </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">range</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">100</span><span style="color:#24292E;">):</span></span>
<span class="line"><span style="color:#24292E;">    producer.send(</span><span style="color:#032F62;">&#39;my-topic&#39;</span><span style="color:#24292E;">, {</span><span style="color:#032F62;">&#39;key&#39;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&#39;value&#39;</span><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># 阻塞直到操作实际send</span></span>
<span class="line"><span style="color:#24292E;">producer.flush()</span></span></code></pre></div><h3 id="消费者" tabindex="-1">消费者 <a class="header-anchor" href="#消费者" aria-label="Permalink to &quot;消费者&quot;">​</a></h3><p><code>consumer.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> kafka </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> KafkaConsumer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># consumer配置,topic信息和生产者相同</span></span>
<span class="line"><span style="color:#E1E4E8;">consumer </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> KafkaConsumer(</span><span style="color:#9ECBFF;">&#39;my-topic&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#FFAB70;">group_id</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;my-group&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#FFAB70;">auto_offset_reset</span><span style="color:#F97583;">=</span><span style="color:#9ECBFF;">&#39;earliest&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#FFAB70;">bootstrap_servers</span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;">[</span><span style="color:#9ECBFF;">&#39;10.30.6.24:9092&#39;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">                         </span><span style="color:#FFAB70;">value_deserializer</span><span style="color:#F97583;">=lambda</span><span style="color:#E1E4E8;"> m: json.loads(m.decode(</span><span style="color:#9ECBFF;">&#39;ascii&#39;</span><span style="color:#E1E4E8;">)))</span></span>
<span class="line"><span style="color:#F97583;">for</span><span style="color:#E1E4E8;"> message </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> consumer:</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># message value and key are raw bytes -- decode if necessary!</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;"># e.g., for unicode: \`message.value.decode(&#39;utf-8&#39;)\`</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">print</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">:</span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;">:</span><span style="color:#79B8FF;">%d</span><span style="color:#9ECBFF;">: key=</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;"> value=</span><span style="color:#79B8FF;">%s</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">%</span><span style="color:#E1E4E8;"> (message.topic, message.partition,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                          message.offset, message.key,</span></span>
<span class="line"><span style="color:#E1E4E8;">                                          message.value))</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> json</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">from</span><span style="color:#24292E;"> kafka </span><span style="color:#D73A49;">import</span><span style="color:#24292E;"> KafkaConsumer</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># consumer配置,topic信息和生产者相同</span></span>
<span class="line"><span style="color:#24292E;">consumer </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> KafkaConsumer(</span><span style="color:#032F62;">&#39;my-topic&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#E36209;">group_id</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;my-group&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#E36209;">auto_offset_reset</span><span style="color:#D73A49;">=</span><span style="color:#032F62;">&#39;earliest&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#E36209;">bootstrap_servers</span><span style="color:#D73A49;">=</span><span style="color:#24292E;">[</span><span style="color:#032F62;">&#39;10.30.6.24:9092&#39;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">                         </span><span style="color:#E36209;">value_deserializer</span><span style="color:#D73A49;">=lambda</span><span style="color:#24292E;"> m: json.loads(m.decode(</span><span style="color:#032F62;">&#39;ascii&#39;</span><span style="color:#24292E;">)))</span></span>
<span class="line"><span style="color:#D73A49;">for</span><span style="color:#24292E;"> message </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> consumer:</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># message value and key are raw bytes -- decode if necessary!</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;"># e.g., for unicode: \`message.value.decode(&#39;utf-8&#39;)\`</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">print</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">:</span><span style="color:#005CC5;">%d</span><span style="color:#032F62;">:</span><span style="color:#005CC5;">%d</span><span style="color:#032F62;">: key=</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;"> value=</span><span style="color:#005CC5;">%s</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">%</span><span style="color:#24292E;"> (message.topic, message.partition,</span></span>
<span class="line"><span style="color:#24292E;">                                          message.offset, message.key,</span></span>
<span class="line"><span style="color:#24292E;">                                          message.value))</span></span></code></pre></div><p><code>auto_offset_reset</code>可选参数如下</p><ul><li><code>earliest</code>: 当各分区下有已提交的<code>offset</code>时，从提交的<code>offset</code>开始消费，无提交的<code>offset</code>时，从头开始消费</li><li><code>latest</code>: 当各分区下有已提交的<code>offset</code>时，从提交的<code>offset</code>开始消费，无提交的<code>offset</code>时，消费新产生的该分区下的数据（默认选项是这个）</li><li><code>none</code>: <code>topic</code>各分区都存在已提交的<code>offset</code>时，从<code>offset</code>后开始消费，只要有一个分区不存在已提交的<code>offset</code>，则抛出异常（不要使用这个）</li></ul><p>开启两个终端分别执行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python producer.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python producer.py</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ python consumer.py</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ python consumer.py</span></span></code></pre></div><h2 id="拓展" tabindex="-1">拓展 <a class="header-anchor" href="#拓展" aria-label="Permalink to &quot;拓展&quot;">​</a></h2><p>如果<code>python</code>客户端也是在容器里面，可以修改<code>compose.yaml</code>的<code>kafka</code>容器的环境变量配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">KAFKA_ADVERTISED_LISTENERS: &quot;PLAINTEXT://kafka:9092&quot;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">KAFKA_ADVERTISED_LISTENERS: &quot;PLAINTEXT://kafka:9092&quot;</span></span></code></pre></div><p><code>python</code>消费者和生产者可以使用<code>kafka:9092</code>访问<code>broker</code></p><p>如果程序是在容器外面，也可以配置修改<code>/etc/hosts</code>新增一行数据</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">127.0.0.1 kafka</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">127.0.0.1 kafka</span></span></code></pre></div><p>最终实现依据<code>kafka</code>这个<code>host</code>参数进行访问</p><h2 id="阅读参考" tabindex="-1">阅读参考 <a class="header-anchor" href="#阅读参考" aria-label="Permalink to &quot;阅读参考&quot;">​</a></h2><p><a href="https://kafka.apache.org/" target="_blank" rel="noreferrer"><code>kafka</code>官方文档</a></p><p><a href="https://blog.csdn.net/he3more/article/details/104696081" target="_blank" rel="noreferrer"><code>kafka</code>配置远程访问</a></p><p><a href="https://kafka-python.readthedocs.io/en/master/index.html" target="_blank" rel="noreferrer"><code>kafka python</code>第三方库文档</a></p><p><a href="https://juejin.cn/post/6893410969611927566" target="_blank" rel="noreferrer"><code>kafka</code>理解<code>listeners</code>和<code>advertised.listeners</code></a></p>`,48),e=[l];function c(t,r,E,y,i,d){return a(),n("div",null,e)}const h=s(p,[["render",c]]);export{u as __pageData,h as default};
