import{_ as e,o as s,c as a,Q as n}from"./chunks/framework.ec8f7e8e.js";const b=JSON.parse('{"title":"Apache Arrow出现的背景","description":"","frontmatter":{},"headers":[],"relativePath":"published/database/ApacheArrow-入门介绍.md","filePath":"published/database/ApacheArrow-入门介绍.md"}'),l={name:"published/database/ApacheArrow-入门介绍.md"},p=n(`<h1 id="apache-arrow出现的背景" tabindex="-1"><code>Apache Arrow</code>出现的背景 <a class="header-anchor" href="#apache-arrow出现的背景" aria-label="Permalink to &quot;\`Apache Arrow\`出现的背景&quot;">​</a></h1><p><code>Apache Arrow</code>出现以前的大数据分析系统基本都有各自不同的内存数据结构，带来一系列的重复工作</p><ul><li>从计算引擎上看，算法必须基于项目特有的数据结构、<code>API </code>与算法之间出现不必要的耦合</li><li>从数据获取上看，数据加载时必须反序列化，而每一种数据源都需要单独实现相应的加载器</li><li>从生态系统上看，跨项目、跨语言的合作无形之中被阻隔</li></ul><p>数据库与数据分析的发展</p><ul><li>企业对分析和使用数据的要求越来越复杂，对查询性能的标准也越来越高</li><li>内存变得便宜，支持基于内存分析的一套新的性能策略</li><li><code>CPU</code> 和 <code>GPU</code> 的性能有所提高，但也已经发展到可以优化并行处理数据（单指令多数据指令/<code>SIMD/Single Instruction Multiple Data</code>）</li><li>针对不同的用例出现了新型数据库，每种都有自己的存储和索引数据的方式，<code>mongo</code>等文档数据库变得流行</li><li>新学科出现，包括数据工程和数据科学，都具有数十种新工具来实现特定的分析目标</li><li>列式数据表示成为分析工作负载的主流，在速度和效率方面具有显着优势</li></ul><h2 id="愿景与目标" tabindex="-1">愿景与目标 <a class="header-anchor" href="#愿景与目标" aria-label="Permalink to &quot;愿景与目标&quot;">​</a></h2><p>愿景是提供内存数据分析 (<code>in-memory analytics</code>) 的开发平台，让数据在异构大数据系统间移动、处理地更快</p><ul><li>减少或消除数据在不同系统间序列化、反序列化的成本</li><li>跨项目复用算法及<code>IO</code>工具</li><li>推动更广义的合作，让数据分析系统的开发者联合起来</li></ul><h2 id="项目构成部分" tabindex="-1">项目构成部分 <a class="header-anchor" href="#项目构成部分" aria-label="Permalink to &quot;项目构成部分&quot;">​</a></h2><ul><li>为分析查询引擎 (<code>analytical query engines</code>)、数据帧 (<code>data frames</code>) 设计的内存列存数据格式</li><li>用于 <code>IPC/RPC</code>的二进制协议</li><li>用于构建数据处理应用的开发平台</li></ul><h2 id="项目的基石" tabindex="-1">项目的基石 <a class="header-anchor" href="#项目的基石" aria-label="Permalink to &quot;项目的基石&quot;">​</a></h2><p>基于内存的列存数据格式(<code>Arrow</code>是面向数据分析开发的，所以采用列存)</p><p>特点包括</p><ul><li>标准化 (<code>standardized</code>)，与语言无关 (<code>language-independent</code>)</li><li>同时支持平铺 (<code>flat</code>) 和层级 (<code>hierarchical</code>) 数据结构</li><li>硬件感知 (<code>hardware-aware</code>)</li></ul><h2 id="apache-arrow-核心技术" tabindex="-1">Apache Arrow 核心技术 <a class="header-anchor" href="#apache-arrow-核心技术" aria-label="Permalink to &quot;Apache Arrow 核心技术&quot;">​</a></h2><h4 id="arrow-本身不是存储或执行引擎-旨在作为以下类型系统的共享基础" tabindex="-1"><code>Arrow</code> 本身不是存储或执行引擎，旨在作为以下类型系统的共享基础 <a class="header-anchor" href="#arrow-本身不是存储或执行引擎-旨在作为以下类型系统的共享基础" aria-label="Permalink to &quot;\`Arrow\` 本身不是存储或执行引擎，旨在作为以下类型系统的共享基础&quot;">​</a></h4><ul><li><code>SQL</code> 执行引擎，例如<code>Drill/Impala</code></li><li>数据分析系统，例如 <code>Pandas/Spark</code></li><li>流和队列系统，例如<code>Kafka/Storm</code></li><li>存储系统，例如<code> Parquet/Kudu/Cassandra/HBase</code></li></ul><h4 id="arrow-包含许多旨在集成到存储和执行引擎中的连接技术-关键组件包括" tabindex="-1"><code>Arrow</code> 包含许多旨在集成到存储和执行引擎中的连接技术，关键组件包括 <a class="header-anchor" href="#arrow-包含许多旨在集成到存储和执行引擎中的连接技术-关键组件包括" aria-label="Permalink to &quot;\`Arrow\` 包含许多旨在集成到存储和执行引擎中的连接技术，关键组件包括&quot;">​</a></h4><ul><li>定义的数据类型集包括 <code>SQL</code> 和 <code>JSON</code> 类型，例如<code> int、BigInt、decimal、varchar、map、struct 和 array</code></li><li><code>DataSet</code> 是数据的列式内存表示，以支持构建在已定义数据类型之上的任意复杂记录结构</li><li>常见数据结构 <code>Arrow</code>感知伴随数据结构，包括选择列表、哈希表和队列</li><li>在共享内存、<code>TCP/IP</code> 和 <code>RDMA</code>(<code>Remote Direct Memory Access</code>/远程直接数据存取) 中实现的进程间通信</li><li>用于以多种语言读写列式数据的数据库，包括 <code>Java、C++、Python、Ruby、Rust、Go 和 JavaScript </code></li><li>用于各种操作的流水线和 <code>SIMD</code> 算法，包括位图选择、散列、过滤、分桶、排序和匹配</li><li>列内存压缩包括一系列提高内存效率的技术</li><li>内存持久性工具，用于通过非易失性内存、<code>SSD</code> 或 <code>HDD</code> 进行短期持久化</li></ul><h4 id="确保处理技术有效地使用-cpu-专门设计用于最大化" tabindex="-1">确保处理技术有效地使用 <code>CPU</code>，专门设计用于最大化 <a class="header-anchor" href="#确保处理技术有效地使用-cpu-专门设计用于最大化" aria-label="Permalink to &quot;确保处理技术有效地使用 \`CPU\`，专门设计用于最大化&quot;">​</a></h4><ul><li>缓存局部性：内存缓冲区是为现代 <code>CPU</code> 设计的数据的紧凑表示，这些结构是线性定义的，与典型的读取模式相匹配，这意味着相似类型的数据在内存中位于同一位置，这使得缓存预取更有效，最大限度地减少了缓存未命中和主内存访问导致的 <code>CPU</code> 停顿，这些 <code>CPU</code> 高效的数据结构和访问模式扩展到传统的平面关系结构和现代复杂数据结构</li><li>流水线：执行模式旨在利用现代处理器的超标量和流水线特性，通过最小化循环内指令数和循环复杂性来实现，这些紧密的循环导致更好的性能和更少的分支预测失败</li><li>向量化处理/<code>SIMD</code> 指令：单指令多数据 (<code>SIMD Single Instruction Multiple Data</code>) 指令允许执行算法通过在单个时钟周期内执行多个操作来更有效地运行，<code>Arrow</code> 组织数据以使其非常适合 <code>SIMD</code> 操作</li></ul><h4 id="内存效率" tabindex="-1">内存效率 <a class="header-anchor" href="#内存效率" aria-label="Permalink to &quot;内存效率&quot;">​</a></h4><p><code>Arrow</code> 设计为即使数据不能完全放入内存也能正常工作，核心数据结构包括数据向量和这些向量的集合（也称为记录批次）</p><p>记录批次通常为 <code>64KB-1MB</code>，具体取决于工作负载，并且通常限制为 <code>2^16 </code>条记录，不仅提高了缓存的局部性，而且即使在低内存情况下也可以进行内存计算</p><p>对于从数百到数千台服务器不等的许多大数据集群，系统必须能够利用集群的聚合内存</p><p><code>Arrow</code> 旨在最大限度地降低在网络上移动数据的成本，利用分散/聚集读取和写入，并具有零序列化/反序列化设计，允许节点之间的低成本数据移动</p><p>直接与支持 <code>RDMA</code> 的互连一起工作，为更大的内存工作负载提供单一内存网格</p><h2 id="arrow与apache-parquet-apache-orc的关系" tabindex="-1"><code>Arrow</code>与<code>Apache Parquet/Apache ORC</code>的关系 <a class="header-anchor" href="#arrow与apache-parquet-apache-orc的关系" aria-label="Permalink to &quot;\`Arrow\`与\`Apache Parquet/Apache ORC\`的关系&quot;">​</a></h2><p>数据存储的两个角度</p><ul><li>存储格式：行存 (<code>row-wise/row-based</code>)、列存 (<code>column-wise/column-based/columnar</code>)</li><li>主要存储器：面向磁盘 (<code>disk-oriented</code>)、面向内存 (<code>memory-oriented</code>)</li></ul><p><code>Parquet/ORC</code>同样是采用列存，但是都是面向磁盘设计的，<code>Arrow</code>面向内存设计</p><p><strong>数据存储格式的设计决定在不同瓶颈下的目的不同</strong></p><p>最典型的就是压缩</p><ul><li><p><code>Parquet/ORC</code>: 对于 <code>disk-oriented</code> 场景，更高的压缩率几乎总是个好主意，利用计算资源换取空间可以利用更多的 <code>CPU</code> 资源，减轻磁盘 <code>IO</code> 的压力，支持高压缩率的压缩算法，如 <code>snappy, gzip, zlib</code> 等压缩技术就十分必要</p></li><li><p><code>Arrow</code>: 对于 <code>memory-oriented</code> 场景，压缩只会让 <code>CPU</code> 更加不堪重负，所以更倾向于直接存储原生的二进制数据</p></li></ul><p>尽管磁盘和内存的顺序访问效率都要高于随机访问，但在磁盘中，这个差异在 2-3 个数量级，而在内存中通常在 1 个数量级内。因此要均摊一次随机访问的成本，需要在磁盘中连续读取上千条数据，而在内存中仅需要连续读取十条左右的数据</p><h2 id="数据列内存设计" tabindex="-1">数据列内存设计 <a class="header-anchor" href="#数据列内存设计" aria-label="Permalink to &quot;数据列内存设计&quot;">​</a></h2><p><code>Arrow</code>列存格式的所有实现都需要考虑数据内存地址的对齐 (<code>alignment</code>) 以及填充 (<code>padding</code>)，通常推荐将地址按 8 或 64 字节对齐，若不足 8 或 64 字节的整数倍则按需补全（主要是为了利用现代 <code>CPU</code> 的 <code>SIMD</code> 指令，将计算向量化）</p><p>更详细的内存布局请参考<code>Apache Arrow</code>文档<code>Arrow Columnar Format</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">https://arrow.apache.org/docs/format/Columnar.html</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">https://arrow.apache.org/docs/format/Columnar.html</span></span></code></pre></div><h4 id="fixed-width-data-types-定长数据列格式" tabindex="-1"><code>Fixed-width data types</code>/定长数据列格式 <a class="header-anchor" href="#fixed-width-data-types-定长数据列格式" aria-label="Permalink to &quot;\`Fixed-width data types\`/定长数据列格式&quot;">​</a></h4><p>比如对于<code>int32</code>数据，有一段数据<code>[1, null, 2, 4, 8]</code>，采用数据列格式定义如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">* Length: 5, Null count: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  |Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |-------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 00011101                | 0 (padding)           |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* Value Buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | Bytes 12-15 | Bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 1          | unspecified | 2           | 4           | 8           | unspecified |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">* Length: 5, Null count: 1</span></span>
<span class="line"><span style="color:#24292e;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  |Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#24292e;">  |-------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 00011101                | 0 (padding)           |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* Value Buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | Bytes 12-15 | Bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#24292e;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 1          | unspecified | 2           | 4           | 8           | unspecified |</span></span></code></pre></div><p>可以看到共包含四个字段</p><ul><li><code>Length</code>：数组长度</li><li><code>Null count</code>: <code>null</code>值统计</li><li><code>Validity bitmap buffer</code>：有效位<code>bitmap</code>，0表示<code>null</code>，采用64字节，采用 <code>little-endian</code> 存储字节数据，由于只有第二个数据是空，所以按照从右往左定义，定长为8，所以<code>bitmap</code>的值就变为了<code>00011101</code></li><li><code>Value Buffer</code><ul><li>由于采用<code>int32</code>类型，所以每个值占据4个字节</li><li>无论数组中的某个元素 是否是 null，在定长数据格式中 <code>Arrow</code> 都会让该元素占据规定长度的空间，在随机访问时需要先利用 <code>nullBitmap</code> 计算出位移，这样需要的内存带宽更小，性能更优，主要体现的是存储空间与随机访问性能的权衡</li></ul></li></ul><p>如果是采用非<code>null int32 array</code>，则内存布局会有两种可能</p><p>比如对于<code>int32 array: [1, 2, 3, 4, 8]</code></p><p>仍然带有<code>bitmap</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">* Length: 5, Null count: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 00011111                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* Value Buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | bytes 12-15 | bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 1          | 2           | 3           | 4           | 8           | unspecified |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">* Length: 5, Null count: 0</span></span>
<span class="line"><span style="color:#24292e;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#24292e;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 00011111                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* Value Buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | bytes 12-15 | bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#24292e;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 1          | 2           | 3           | 4           | 8           | unspecified |</span></span></code></pre></div><p><code>bitmap</code>被省略优化</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">* Length 5, Null count: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">* Validity bitmap buffer: Not required</span></span>
<span class="line"><span style="color:#e1e4e8;">* Value Buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | bytes 12-15 | bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 1          | 2           | 3           | 4           | 8           | unspecified |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">* Length 5, Null count: 0</span></span>
<span class="line"><span style="color:#24292e;">* Validity bitmap buffer: Not required</span></span>
<span class="line"><span style="color:#24292e;">* Value Buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  |Bytes 0-3   | Bytes 4-7   | Bytes 8-11  | bytes 12-15 | bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#24292e;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 1          | 2           | 3           | 4           | 8           | unspecified |</span></span></code></pre></div><h4 id="variable-size-binary-layout-变长数据内存布局" tabindex="-1"><code>Variable-size Binary Layout</code>/变长数据内存布局 <a class="header-anchor" href="#variable-size-binary-layout-变长数据内存布局" aria-label="Permalink to &quot;\`Variable-size Binary Layout\`/变长数据内存布局&quot;">​</a></h4><p>在该类型下，每个元素都会占据0到多个字节，所以就需要多一个<code>offset buffer</code>区域来存储偏移信息</p><p>比如对于数据<code>[&#39;joe&#39;, null, null, &#39;mark&#39;]</code>，内存布局表示为如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">* Length: 4, Null count: 2</span></span>
<span class="line"><span style="color:#e1e4e8;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 00001001                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* Offsets buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Bytes 0-19     | Bytes 20-63           |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |----------------|-----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 0, 3, 3, 3, 7  | unspecified           |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;"> * Value buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Bytes 0-6      | Bytes 7-63           |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |----------------|----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | joemark        | unspecified          |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">* Length: 4, Null count: 2</span></span>
<span class="line"><span style="color:#24292e;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#24292e;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 00001001                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* Offsets buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Bytes 0-19     | Bytes 20-63           |</span></span>
<span class="line"><span style="color:#24292e;">  |----------------|-----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 0, 3, 3, 3, 7  | unspecified           |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;"> * Value buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Bytes 0-6      | Bytes 7-63           |</span></span>
<span class="line"><span style="color:#24292e;">  |----------------|----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | joemark        | unspecified          |</span></span></code></pre></div><p>字段解释</p><ul><li><code>Length</code>: 数据长度为4</li><li><code>Null count</code>: <code>null</code>统计数是2</li><li><code>Validity bitmap buffer</code>: 采用<code>little-endian</code> 存储字节数据，数组中间两个是<code>null</code>，所以该值是<code>00001001</code>，从右往左看</li><li><code>Offsets buffer</code>：由于每个字符都占据一个字节的长度，<code>null</code>不会增加偏移，值从0开始，所以遇到<code>joe</code>，会<code>+3</code>,遇到<code>null</code>会<code>+0</code>,遇到<code>mark</code>会<code>+4</code>,最后值变成<code>[0, 3, 3, 3, 7]</code></li><li><code>Value buffer</code>： 不给<code>null</code>分配内存，把所有占用内存的值合并，变为<code>joemark</code></li></ul><h4 id="variable-size-list-layout-可变长度列表布局" tabindex="-1"><code>Variable-size List Layout</code>/可变长度列表布局 <a class="header-anchor" href="#variable-size-list-layout-可变长度列表布局" aria-label="Permalink to &quot;\`Variable-size List Layout\`/可变长度列表布局&quot;">​</a></h4><p>列表是一种嵌套类型，其语义类似于可变大小的类型， 它由两个缓冲区、一个<code>validity bitmap</code>和一个<code> offsets buffer</code>以及一个子数组定义。 偏移量与可变大小类型的偏移量相同，并且 32 位和 64 位有符号整数偏移量都是支持的偏移量选项。 这些偏移量不是引用额外的数据缓冲区，而是引用子数组</p><p>比如对于数据<code>List&lt;List&lt;Int8&gt;&gt;: [[12, -7, 25], null, [0, -127, 127, 50], []]</code></p><p>表示的内存布局如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">* Length: 4, Null count: 1</span></span>
<span class="line"><span style="color:#e1e4e8;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 00001101                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* Offsets buffer (int32)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">  | Bytes 0-3  | Bytes 4-7   | Bytes 8-11  | Bytes 12-15 | Bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#e1e4e8;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">  | 0          | 3           | 3           | 7           | 7           | unspecified |</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">* Values array (Int8array):</span></span>
<span class="line"><span style="color:#e1e4e8;">  * Length: 7,  Null count: 0</span></span>
<span class="line"><span style="color:#e1e4e8;">  * Validity bitmap buffer: Not required</span></span>
<span class="line"><span style="color:#e1e4e8;">  * Values buffer (int8)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">    | Bytes 0-6                    | Bytes 7-63  |</span></span>
<span class="line"><span style="color:#e1e4e8;">    |------------------------------|-------------|</span></span>
<span class="line"><span style="color:#e1e4e8;">    | 12, -7, 25, 0, -127, 127, 50 | unspecified |</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">* Length: 4, Null count: 1</span></span>
<span class="line"><span style="color:#24292e;">* Validity bitmap buffer:</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Byte 0 (validity bitmap) | Bytes 1-63            |</span></span>
<span class="line"><span style="color:#24292e;">  |--------------------------|-----------------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 00001101                 | 0 (padding)           |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* Offsets buffer (int32)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">  | Bytes 0-3  | Bytes 4-7   | Bytes 8-11  | Bytes 12-15 | Bytes 16-19 | Bytes 20-63 |</span></span>
<span class="line"><span style="color:#24292e;">  |------------|-------------|-------------|-------------|-------------|-------------|</span></span>
<span class="line"><span style="color:#24292e;">  | 0          | 3           | 3           | 7           | 7           | unspecified |</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">* Values array (Int8array):</span></span>
<span class="line"><span style="color:#24292e;">  * Length: 7,  Null count: 0</span></span>
<span class="line"><span style="color:#24292e;">  * Validity bitmap buffer: Not required</span></span>
<span class="line"><span style="color:#24292e;">  * Values buffer (int8)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">    | Bytes 0-6                    | Bytes 7-63  |</span></span>
<span class="line"><span style="color:#24292e;">    |------------------------------|-------------|</span></span>
<span class="line"><span style="color:#24292e;">    | 12, -7, 25, 0, -127, 127, 50 | unspecified |</span></span></code></pre></div><p>字段解释</p><ul><li><code>Validity bitmap buffer</code>: 由于第二个参数是<code>null</code>，所以该参数的值是<code>00001101</code>，从右往左看</li><li><code>Offsets buffer</code>: 每个<code>List&lt;Int8&gt;</code>中的<code>Int8</code>占据一个偏移值，<code>null</code>和<code>[]</code>不增加偏移量，偏移量从0开始计算</li><li><code>Values array</code>: 把二维数组展平，排除了<code>null</code>值到影响，所以值展平开就变为<code>[12, -7, 25, 0, -127, 127, 50]</code></li></ul><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://arrow.apache.org/docs/format/Columnar.html" target="_blank" rel="noreferrer"><code>Arrow Columnar Format</code></a></p><p><a href="https://zhuanlan.zhihu.com/p/588400772?spm=a2c6h.12873639.article-detail.11.6d033e09pcPFBK" target="_blank" rel="noreferrer"><code>Apache Arrow-知乎</code></a></p><p><a href="https://www.modb.pro/db/608239" target="_blank" rel="noreferrer"><code>Databend</code> 内幕大揭秘第二弹 - <code>Data Source</code></a></p><p><a href="https://tech.ipalfish.com/blog/2020/12/08/apache_arrow_summary/" target="_blank" rel="noreferrer"><code>Apache Arrow</code>：一种适合异构大数据系统的内存列存数据格式标准</a></p><p><a href="https://zhuanlan.zhihu.com/p/337756824" target="_blank" rel="noreferrer">循环优化之向量化并行（<code>vectorization</code>）</a></p>`,69),o=[p];function c(t,i,r,d,y,u){return s(),a("div",null,o)}const f=e(l,[["render",c]]);export{b as __pageData,f as default};
