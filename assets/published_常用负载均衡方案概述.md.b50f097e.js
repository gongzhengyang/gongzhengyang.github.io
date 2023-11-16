import{_ as e,o,c as d,Q as c}from"./chunks/framework.ec8f7e8e.js";const b=JSON.parse('{"title":"需求背景","description":"","frontmatter":{},"headers":[],"relativePath":"published/常用负载均衡方案概述.md","filePath":"published/常用负载均衡方案概述.md"}'),l={name:"published/常用负载均衡方案概述.md"},i=c('<h1 id="需求背景" tabindex="-1">需求背景 <a class="header-anchor" href="#需求背景" aria-label="Permalink to &quot;需求背景&quot;">​</a></h1><p>面对大量用户访问，多任务执行，系统负载会持续升高，目前共有三类解决方案</p><ul><li><p>硬件升级：<code>CPU</code>升级，多核心，内存扩充，这一类纯粹靠资本，升级成本极高</p></li><li><p>软件层面：采用高效率开发语言，比如<code>C/Go/Rust</code>等底层开发语言，可以编译为操作系统直接执行的二进制文件，不像<code>Java/Python</code>等解释型语言需要安装一个语言解释器，导致内存占用较大（尤其是<code>Java</code>吃内存很严重），同时速度也不快</p></li><li><p>业务拆分与分布式：负载均衡，解决高并发访问与多任务执行问题，技术难度与硬件成本角度权衡较为均衡</p></li></ul><h2 id="负载均衡概述" tabindex="-1">负载均衡概述 <a class="header-anchor" href="#负载均衡概述" aria-label="Permalink to &quot;负载均衡概述&quot;">​</a></h2><p>将负载（前端的访问请求，后台执行的任务）进行平衡，通过负载均衡算法分摊到多个服务器上进行执行，是解决高性能，单点故障高可用，水平伸缩的终极解决方案</p><p>效果</p><ul><li>增加吞吐量，解决高并发压力（高性能）</li><li>提供故障转移，解决单节点故障问题（高可用）</li><li>通过添加或减少服务器数量，提供网站水平伸缩性（扩展性）</li><li>网络入口安全防护，在负载均衡设备上做一些过滤，黑白名单等处理，最大程度上保证集群系统的安全性</li></ul><h2 id="负载均衡实现技术" tabindex="-1">负载均衡实现技术 <a class="header-anchor" href="#负载均衡实现技术" aria-label="Permalink to &quot;负载均衡实现技术&quot;">​</a></h2><p>负载均衡在<code>OSI</code>网络层次中，层级越低，性能越好，但是技术复杂度也越高</p><h4 id="dns负载均衡-七层负载均衡" tabindex="-1"><code>DNS</code>负载均衡(七层负载均衡) <a class="header-anchor" href="#dns负载均衡-七层负载均衡" aria-label="Permalink to &quot;`DNS`负载均衡(七层负载均衡)&quot;">​</a></h4><p>最早的负载均衡技术，利用域名解析实现负载均衡，在<code>DNS</code>服务器，配置多个<code>DNS</code>记录，这些记录对应的服务器构成集群，大型网站总是部分使用<code>DNS</code>解析，作为第一级负载均衡</p><p>比如在不同网络环境下，<code>ping baidu.com</code>命令执行获取到目标设备的<code>IP</code>是不一样的</p><p>优点</p><ul><li><p>简单：负载均衡工作交给<code>DNS</code>服务器处理，不需要专门的服务器维护</p></li><li><p>性能高：可以支持基于地址的域名解析，解析成距离用户最近的服务器地址，避免长链路网络传输，加快访问速度</p></li></ul><p>缺点</p><ul><li><p>可用性差：新增/修改<code>DNS</code>后，解析时间较长，域名<code>DNS</code>服务器发生变更后，需要等待本地<code>DNS</code>中域名<code>DNS</code>服务器的<code>TTL</code>缓存失效，本地<code>DNS</code>才会重新发起递归查询，然后全国各地<code>DNS</code>才能同步到最新的域名<code>DNS</code>服务器名称，该过程需要一到两天的时间</p></li><li><p>扩展性低：<code>DNS</code>负载均衡的控制权在域名商，扩展性有限</p></li></ul><h4 id="nginx-http负载均衡-七层负载均衡" tabindex="-1"><code>Nginx HTTP</code>负载均衡（七层负载均衡） <a class="header-anchor" href="#nginx-http负载均衡-七层负载均衡" aria-label="Permalink to &quot;`Nginx HTTP`负载均衡（七层负载均衡）&quot;">​</a></h4><p>可以使用配置实现</p><p>根据<code>URL</code>、浏览器类别、语言来决定是否要进行负载均衡</p><p>优点</p><ul><li>对网络稳定性的依赖非常小</li><li>承担高负载压力且稳定，在硬件不差的情况下一般能支撑几万次的并发量</li></ul><p>缺点</p><ul><li>仅能支持<code>http</code>、<code>https</code>和<code>Email</code>协议，在适用范围上面较小</li></ul><h4 id="lvs负载均衡-四层负载均衡" tabindex="-1"><code>LVS</code>负载均衡(四层负载均衡) <a class="header-anchor" href="#lvs负载均衡-四层负载均衡" aria-label="Permalink to &quot;`LVS`负载均衡(四层负载均衡)&quot;">​</a></h4><p>用<code>Linux</code>内核集群实现的一个高性能、高可用的负载均衡服务器，具有很好的可伸缩性，可靠性和可管理性</p><p>四层负载均衡服务器在接受到客户端请求后，通过修改数据包的地址信息（<code>IP</code>+端口号）将流量转发到应用服务器</p><p>优点</p><ul><li>抗负载能力强，在负载均衡软件里的性能最强的，对内存和<code>cpu</code>资源消耗比较低</li><li>工作稳定，自身有完整的双机热备方案，如<code>LVS+Keepalived</code>，但是项目实施中用得最多的还是<code>LVS/DR+Keepalived</code></li><li>无流量，<code>LVS</code>只分发请求，而流量并不从它本身出去，这点保证了均衡器<code>IO</code>的性能不会收到大流量的影响</li><li>应用范围比较广，工作在<code>OSI</code>4层，所以它几乎可以对所有应用做负载均衡，包括<code>http</code>、数据库、在线聊天室等等</li></ul><p>缺点</p><ul><li>软件本身不支持正则表达式处理，不能做动静分离</li><li>实施操作复杂，技术难度高</li></ul><h4 id="haproxy负载均衡-七层-四层负载均衡" tabindex="-1"><code>HAProxy</code>负载均衡(七层/四层负载均衡) <a class="header-anchor" href="#haproxy负载均衡-七层-四层负载均衡" aria-label="Permalink to &quot;`HAProxy`负载均衡(七层/四层负载均衡)&quot;">​</a></h4><p>免费的负载均衡软件，可以运行于大部分主流的<code>Linux</code>操作系统上，<code>HAProxy</code>提供了<code>四层(TCP)</code>和<code>七层(HTTP)</code>负载均衡能力，具备丰富的功能</p><p>优点</p><ul><li>支持<code>TCP</code>协议的负载均衡转发</li><li>支持<code>Session</code>的保持，<code>Cookie</code>的引导，同时支持通过获取指定的<code>url</code>来检测后端服务器的状态</li><li>支持虚拟主机的</li><li>支持负载均衡策略非常多</li></ul><p>缺点</p><ul><li>不支持<code>HTTP cache</code>功能</li><li>重载配置的功能需要重启进程</li><li>多进程模式支持不够好</li></ul><h4 id="ip负载均衡-三层负载均衡" tabindex="-1"><code>IP</code>负载均衡(三层负载均衡) <a class="header-anchor" href="#ip负载均衡-三层负载均衡" aria-label="Permalink to &quot;`IP`负载均衡(三层负载均衡)&quot;">​</a></h4><p>负载均衡服务器对外依然提供一个浮动<code>IP</code>，但集群中不同的机器采用不同的<code>IP</code>地址，当负载均衡服务器接受到请求之后，根据不同的负载均衡算法，通过<code>IP</code>将请求转发至不同的真实服务器，在网络层通过修改请求目标<code>IP</code>地址进行负载</p><p>优点</p><ul><li>在内核进程完成数据分发，比在应用层分发性能更好</li></ul><p>缺点</p><ul><li>所有请求响应都需要经过负载均衡服务器，集群最大吞吐量受限于负载均衡服务器网卡带宽</li></ul><h4 id="链路层负载均衡-二层负载均衡" tabindex="-1"><strong>链路层负载均衡</strong>(二层负载均衡) <a class="header-anchor" href="#链路层负载均衡-二层负载均衡" aria-label="Permalink to &quot;**链路层负载均衡**(二层负载均衡)&quot;">​</a></h4><p>负载均衡服务器对外依然提供一个浮动<code>IP</code>，配置真实物理服务器集群所有机器虚拟<code>IP</code>和负载均衡服务器<code>IP</code>地址一致，集群中不同的机器采用相同<code>IP</code>地址，但机器的<code>MAC</code>地址不一样，当负载均衡服务器接受到请求之后，通过改写报文的目标<code>MAC</code>地址的方式将请求转发到目标机器实现负载均衡，达到不修改数据包的源地址和目标地址，进行数据分发的目的</p><p>优点</p><ul><li>性能好</li></ul><p>缺点</p><ul><li>配置复杂</li></ul><h2 id="负载均衡算法" tabindex="-1">负载均衡算法 <a class="header-anchor" href="#负载均衡算法" aria-label="Permalink to &quot;负载均衡算法&quot;">​</a></h2><p>负载均衡器通过负载均衡算法决定请求转发到哪台设备</p><ul><li><p>轮询<code>Round Robin</code></p><p>顺序循环将请求一次顺序循环地连接每个服务器，以轮询的方式依次请求调度不同的服务器；实现时，一般为服务器带上权重</p></li></ul><p>​ 优点：服务器请求数目相同；实现简单、高效；易水平扩展</p><p>​ 缺点：服务器压力不一样，不适合服务器配置不同的情况；请求到目的结点的不确定，造成其无法适用于有写操作的场景</p><p>​ 应用场景：数据库或应用服务层中只有读的场景</p><ul><li>比率<code>Ratio</code></li></ul><p>​ 给每个服务器分配一个加权值为比例，根椐这个比例，把用户的请求分配到每个服务器</p><ul><li>优先权<code>Priority</code></li></ul><p>​ 给所有服务器分组，给每个组定义优先权，当最高优先级中所有服务器出现故障，将请求送给次优先级的服务器组，这种方式，实际为用户提供一种热备份的方式</p><ul><li>最少连接</li></ul><p>​ 将请求分配到连接数最少的服务器</p><p>​ 优点：根据服务器当前的请求处理情况，动态分配</p><p>​ 缺点：算法实现相对复杂，需要监控服务器请求连接数</p><ul><li>最快模式<code>Fastest</code></li></ul><p>​ 传递连接给那些响应最快的服务器</p><ul><li><p>观察模式<code>Observed</code></p><p>连接数目和响应时间这两项的最佳平衡为依据为新的请求选择服务器</p></li><li><p>预测模式<code>Predictive</code></p></li></ul><p>​ 利用收集到的服务器当前的性能指标，进行预测分析，选择一台服务器在下一个时间片内，其性能将达到最佳的服务器相应用户的请求</p><ul><li>动态性能分配<code>Dynamic Ratio-APM</code></li></ul><p>​ 根据收集到的应用程序和应用服务器的各项性能参数，动态调整流量分配</p><ul><li>动态服务器补充<code>Dynamic Server Act</code></li></ul><p>​ 当主服务器群中因故障导致数量减少时，动态地将备份服务器补充至主服务器群</p><ul><li>服务质量<code>QoS</code></li></ul><p>​ 按不同的优先级对数据流进行分配</p><ul><li>服务类型<code>ToS</code></li></ul><p>​ 按不同的服务类型（在 <code>Type of Field</code> 中标识）负载均衡对数据流进行分配</p><h2 id="基于主机资源的系统负载均衡" tabindex="-1">基于主机资源的系统负载均衡 <a class="header-anchor" href="#基于主机资源的系统负载均衡" aria-label="Permalink to &quot;基于主机资源的系统负载均衡&quot;">​</a></h2><p>前述所有负载均衡和算法策略，都是针对负载均衡器的，应用于短期执行任务（普遍是10秒或者1分钟这样短期内做出应答的服务），对于长期执行的任务，同时会消耗大量资源的负载均衡不是很适用于上面的负载均衡技术，最佳的解决方案是参考<code>k8s pod</code>调度策略的基于主机资源的系统负载均衡（全球最强的超大规模集群编排解决方案，有着谷歌数十年的超大规模集群运维系统经验与验证，是集群编排技术的大一统）</p><h2 id="k8s调度器" tabindex="-1"><code>k8s</code>调度器 <a class="header-anchor" href="#k8s调度器" aria-label="Permalink to &quot;`k8s`调度器&quot;">​</a></h2><p>在 <code>Kubernetes</code> 中，调度是指将<code>Pod</code>放置到合适的节点上，以便对应节点上的 <code>Kubelet</code>能够运行这些<code>Pod</code></p><p>调度器通过 <code>Kubernetes</code> 的监测<code>Watch</code>机制来发现集群中新创建且尚未被调度到节点上的<code>Pod</code>， 调度器会将所发现的每一个未调度的<code>Pod</code> 调度到一个合适的节点上来运行</p><h2 id="pod调度步骤" tabindex="-1"><code>pod</code>调度步骤 <a class="header-anchor" href="#pod调度步骤" aria-label="Permalink to &quot;`pod`调度步骤&quot;">​</a></h2><ol><li><p>过滤阶段：过滤阶段会将所有满足 <code>Pod</code> 调度需求的<code>Node</code> 选出来，例如，<code>PodFitsResources</code> 过滤函数会检查候选<code>Node</code>的可用资源能否满足<code>Pod</code> 的资源请求，在过滤之后，得出一个<code>Node</code> 列表，里面包含了所有可调度节点；通常情况下，这个<code>Node</code> 列表包含不止一个<code>Node</code>，如果这个列表是空的，代表这个<code>Pod</code>不可调度</p><p>执行的过滤规则</p><ul><li><code>PodFitsHostPorts</code>：检查<code>Node</code>上是否不存在当前被调度<code>Pod</code>的端口，如果被调度<code>Pod</code>用的端口已被占用，则此<code>Node</code>被<code>Pass</code></li><li><code>PodFitsResources</code>：检查<code>Node</code>是否有空闲资源(如<code>CPU</code>和内存)以满足<code>Pod</code>的需求</li><li><code>CheckNodeMemoryPressure</code>：对于内存有压力的<code>Node</code>，则不会被调度<code>Pod</code></li><li><code>CheckNodePIDPressure</code>：对于进程<code>ID</code>不足的<code>Node</code>，则不会调度<code>Pod</code></li><li><code>CheckNodeDiskPressure</code>：对于磁盘存储已满或者接近满的<code>Node</code>，则不会调度<code>Pod</code></li></ul></li><li><p>打分阶段：在过滤阶段后调度器会为<code>Pod</code> 从所有可调度节点中选取一个最合适的<code>Node</code>，根据当前启用的打分规则，调度器会给每一个可调度节点进行打分，最后，<code>kube-scheduler</code> 会将<code>Pod</code> 调度到得分最高的<code>Node</code> 上，如果存在多个得分最高的<code>Node</code>，<code>kube-scheduler</code> 会从中随机选取一个</p><p>打分规则</p><ul><li><code>SelectorSpreadPriority</code>：优先减少节点上属于同一个 <code>Service</code> 或 <code>Replication Controller</code> 的 <code>Pod</code> 数量</li><li><code>InterPodAffinityPriority</code>：优先将 <code>Pod</code> 调度到相同的拓扑上（如同一个节点、<code>Rack</code>、<code>Zone</code> 等）</li><li><code>LeastRequestedPriority</code>：节点上放置的<code>Pod</code>越多，这些<code>Pod</code>使用的资源越多，这个<code>Node</code>给出的打分就越低，所以优先调度到<code>Pod</code>少及资源使用少的节点上</li><li><code>MostRequestedPriority</code>：尽量调度到已经使用过的 <code>Node</code> 上，将把计划的<code>Pods</code>放到运行整个工作负载所需的最小节点数量上</li><li><code>BalancedResourceAllocation</code>：优先平衡各节点的资源使用</li></ul></li></ol><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://zhuanlan.zhihu.com/p/280133347" target="_blank" rel="noreferrer">负载均衡算法及方案-知乎</a></p><p><a href="https://www.cnblogs.com/fengdejiyixx/p/11698028.html" target="_blank" rel="noreferrer"><code>Nginx、HAProxy、LVS</code>三者的优缺点-博客园</a></p><p><a href="https://developer.volcengine.com/articles/7110972767125635102" target="_blank" rel="noreferrer">解决<code>k8s</code>调度不均衡问题</a></p><p><a href="https://cloud.tencent.com/developer/article/1644857" target="_blank" rel="noreferrer">这应该是最全的<code>K8s-Pod</code>调度策略了-腾讯云</a></p><p><a href="https://kubernetes.io/zh-cn/docs/concepts/scheduling-eviction/kube-scheduler/" target="_blank" rel="noreferrer"><code>Kubernetes</code> 调度器-<code>k8s</code>官方文档</a></p>',87),a=[i];function r(p,t,u,s,n,h){return o(),d("div",null,a)}const _=e(l,[["render",r]]);export{b as __pageData,_ as default};
