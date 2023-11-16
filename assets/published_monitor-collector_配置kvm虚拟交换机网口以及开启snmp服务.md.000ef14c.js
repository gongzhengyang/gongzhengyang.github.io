import{_ as s,o as e,c as a,Q as n}from"./chunks/framework.ec8f7e8e.js";const u=JSON.parse('{"title":"安装镜像与virt-manager的网口配置","description":"","frontmatter":{},"headers":[],"relativePath":"published/monitor-collector/配置kvm虚拟交换机网口以及开启snmp服务.md","filePath":"published/monitor-collector/配置kvm虚拟交换机网口以及开启snmp服务.md"}'),p={name:"published/monitor-collector/配置kvm虚拟交换机网口以及开启snmp服务.md"},l=n(`<h1 id="安装镜像与virt-manager的网口配置" tabindex="-1">安装镜像与<code>virt-manager</code>的网口配置 <a class="header-anchor" href="#安装镜像与virt-manager的网口配置" aria-label="Permalink to &quot;安装镜像与\`virt-manager\`的网口配置&quot;">​</a></h1><p>使用<code>virt-manager</code>安装完成交换机之后，在显示虚拟硬件详情的菜单项下面配置虚拟网口配置为虚拟网络<code>*</code>路由到某个网口(默认的是虚拟网络<code>default</code>: <code>NAT</code>, 需要自行去创建一个网口，配置网口的取值范围)，设备型号选择<code>e1000</code></p><p>具体操作参考<a href="https://blog.csdn.net/Jamesbond_/article/details/111938555" target="_blank" rel="noreferrer">在<code>KVM中</code>通过导入<code>qcow2</code>镜像方式安装虚拟机（图形界面）</a></p><p><strong>所有操作<code>Cisco</code>设备的命令在不同系列和版本下可能完全不同，绝对不要照抄命令，需要经常输入<code>?</code>和<code>help</code>字符去获取可用命令以及命令解释，在具体设备上使用具体命令，配置的大体流程逻辑是相同的，本次示例使用版本为<code>Cisco IOS Software, vios_l2 Software (vios_l2-ADVENTERPRISEK9-M), Version 15.2(CML_NIGHTLY_20190423) Switch</code></strong></p><h2 id="配置交换机网口" tabindex="-1">配置交换机网口 <a class="header-anchor" href="#配置交换机网口" aria-label="Permalink to &quot;配置交换机网口&quot;">​</a></h2><p>进入特权模式，<strong>这边配置的网口为<code>GigabitEthernet 0/0</code>，<code>ip</code>地址与掩码为<code>192.168.1.222/24</code></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch&gt; enable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch&gt; enable</span></span></code></pre></div><p>查看当前网口配置, 一般会出现一个<code>Gi...0/0</code>的网口，选择配置这个，如果没有看到这个网口，需要去重新配置<code>virt-manager</code>的对应虚拟机网口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch# show ip interface </span></span>
<span class="line"><span style="color:#e1e4e8;">GigabitEthernet0/0 is up, line protocol is up</span></span>
<span class="line"><span style="color:#e1e4e8;">....</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch# show ip interface </span></span>
<span class="line"><span style="color:#24292e;">GigabitEthernet0/0 is up, line protocol is up</span></span>
<span class="line"><span style="color:#24292e;">....</span></span></code></pre></div><p>进入全局配置模式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch# configure terminal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch# configure terminal</span></span></code></pre></div><p>开始配置<code>Gi0/0</code>网口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config)#interface GigabitEthernet 0/0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config)#interface GigabitEthernet 0/0</span></span></code></pre></div><p>如果已经有配置，想修改配置，需要重置一下该网口配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config-if)# no ip address</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config-if)# no ip address</span></span></code></pre></div><p>在三层交换机上面，可以把二层接口改为三层接口，把该网口配置为等于一个路由器上的接口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config-if)#no switchport</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config-if)#no switchport</span></span></code></pre></div><p>配置网口<code>IP</code>和掩码</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config-if)#ip address 192.168.1.222 255.255.255.0</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config-if)#ip address 192.168.1.222 255.255.255.0</span></span></code></pre></div><p>确保网卡状态是<code>up</code>， 如果要<code>down</code>网卡，直接<code>shutdown</code>即可</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config-if)#no shutdown</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config-if)#no shutdown</span></span></code></pre></div><p>退出网口配置模式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch(config-if)#end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch(config-if)#end</span></span></code></pre></div><p>查看网口配置信息，网口状态是<code>up</code>并且<code>ip</code>，掩码等信息都有</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch#show ip interface </span></span>
<span class="line"><span style="color:#e1e4e8;">GigabitEthernet0/0 is up, line protocol is up</span></span>
<span class="line"><span style="color:#e1e4e8;">  Internet address is 192.168.1.222/24</span></span>
<span class="line"><span style="color:#e1e4e8;">  Broadcast address is 255.255.255.255</span></span>
<span class="line"><span style="color:#e1e4e8;">  .......</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch#show ip interface </span></span>
<span class="line"><span style="color:#24292e;">GigabitEthernet0/0 is up, line protocol is up</span></span>
<span class="line"><span style="color:#24292e;">  Internet address is 192.168.1.222/24</span></span>
<span class="line"><span style="color:#24292e;">  Broadcast address is 255.255.255.255</span></span>
<span class="line"><span style="color:#24292e;">  .......</span></span></code></pre></div><p>要将配置的设置保存到启动配置文件，保证下次重启的时候网口配置还在,在弹出对话问题行输入<code>startup-config</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch#copy running-config startup-config</span></span>
<span class="line"><span style="color:#e1e4e8;">Destination filename [startup-config]? startup-config</span></span>
<span class="line"><span style="color:#e1e4e8;">Building configuration...</span></span>
<span class="line"><span style="color:#e1e4e8;">Compressed configuration from 2758 bytes to 1360 bytes[OK]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch#copy running-config startup-config</span></span>
<span class="line"><span style="color:#24292e;">Destination filename [startup-config]? startup-config</span></span>
<span class="line"><span style="color:#24292e;">Building configuration...</span></span>
<span class="line"><span style="color:#24292e;">Compressed configuration from 2758 bytes to 1360 bytes[OK]</span></span></code></pre></div><p>配置完成之后可以在自己的<code>pc</code>机器上面去<code>ping</code>交换机网口的<code>IP</code>，如果网络不通的话需要重启一下交换机，直接在<code>virt-manager</code>控制台那边点击按钮强制关机重启就行</p><h2 id="配置开启snmp" tabindex="-1">配置开启<code>snmp</code> <a class="header-anchor" href="#配置开启snmp" aria-label="Permalink to &quot;配置开启\`snmp\`&quot;">​</a></h2><p>进入特权模式，<strong>配置开启<code>snmp v2</code>，<code>community</code>认证参数是<code>public</code></strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch&gt; enable</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch&gt; enable</span></span></code></pre></div><p>查看<code>snmp</code>协议是否开启</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch# show snmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch# show snmp</span></span></code></pre></div><p>进入全局配置模式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch# configure terminal</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch# configure terminal</span></span></code></pre></div><p>设置只读字符串，<code>public</code>为<code>community</code>认证参数,<code>ro</code>为只读,<code>rw</code>为读写</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch&lt;config&gt;# snmp-server community public ro</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch&lt;config&gt;# snmp-server community public ro</span></span></code></pre></div><p>退出配置模式</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch&lt;config&gt;# end</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch&lt;config&gt;# end</span></span></code></pre></div><p>查看<code>snmp</code>状态</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch#show snmp </span></span>
<span class="line"><span style="color:#e1e4e8;">Chassis: 9NA6LLEED7N</span></span>
<span class="line"><span style="color:#e1e4e8;">1758 SNMP packets input</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Bad SNMP version errors</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Unknown community name</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Illegal operation for community name supplied</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Encoding errors</span></span>
<span class="line"><span style="color:#e1e4e8;">    1757 Number of requested variables</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Number of altered variables</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Get-request PDUs</span></span>
<span class="line"><span style="color:#e1e4e8;">    1757 Get-next PDUs</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Set-request PDUs</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Input queue packet drops (Maximum queue size 1000)</span></span>
<span class="line"><span style="color:#e1e4e8;">1758 SNMP packets output</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Too big errors (Maximum packet size 1500)</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 No such name errors</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Bad values errors</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 General errors</span></span>
<span class="line"><span style="color:#e1e4e8;">    1757 Response PDUs</span></span>
<span class="line"><span style="color:#e1e4e8;">    0 Trap PDUs</span></span>
<span class="line"><span style="color:#e1e4e8;">SNMP global trap: disabled</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">SNMP logging: disabled</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch#show snmp </span></span>
<span class="line"><span style="color:#24292e;">Chassis: 9NA6LLEED7N</span></span>
<span class="line"><span style="color:#24292e;">1758 SNMP packets input</span></span>
<span class="line"><span style="color:#24292e;">    0 Bad SNMP version errors</span></span>
<span class="line"><span style="color:#24292e;">    0 Unknown community name</span></span>
<span class="line"><span style="color:#24292e;">    0 Illegal operation for community name supplied</span></span>
<span class="line"><span style="color:#24292e;">    0 Encoding errors</span></span>
<span class="line"><span style="color:#24292e;">    1757 Number of requested variables</span></span>
<span class="line"><span style="color:#24292e;">    0 Number of altered variables</span></span>
<span class="line"><span style="color:#24292e;">    0 Get-request PDUs</span></span>
<span class="line"><span style="color:#24292e;">    1757 Get-next PDUs</span></span>
<span class="line"><span style="color:#24292e;">    0 Set-request PDUs</span></span>
<span class="line"><span style="color:#24292e;">    0 Input queue packet drops (Maximum queue size 1000)</span></span>
<span class="line"><span style="color:#24292e;">1758 SNMP packets output</span></span>
<span class="line"><span style="color:#24292e;">    0 Too big errors (Maximum packet size 1500)</span></span>
<span class="line"><span style="color:#24292e;">    0 No such name errors</span></span>
<span class="line"><span style="color:#24292e;">    0 Bad values errors</span></span>
<span class="line"><span style="color:#24292e;">    0 General errors</span></span>
<span class="line"><span style="color:#24292e;">    1757 Response PDUs</span></span>
<span class="line"><span style="color:#24292e;">    0 Trap PDUs</span></span>
<span class="line"><span style="color:#24292e;">SNMP global trap: disabled</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">SNMP logging: disabled</span></span></code></pre></div><p>要将配置的设置保存到启动配置文件，保证下次重启的时候网口配置还在,在弹出对话问题行输入<code>startup-config</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch#copy running-config startup-config</span></span>
<span class="line"><span style="color:#e1e4e8;">Destination filename [startup-config]? startup-config</span></span>
<span class="line"><span style="color:#e1e4e8;">Building configuration...</span></span>
<span class="line"><span style="color:#e1e4e8;">Compressed configuration from 2758 bytes to 1360 bytes[OK]</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch#copy running-config startup-config</span></span>
<span class="line"><span style="color:#24292e;">Destination filename [startup-config]? startup-config</span></span>
<span class="line"><span style="color:#24292e;">Building configuration...</span></span>
<span class="line"><span style="color:#24292e;">Compressed configuration from 2758 bytes to 1360 bytes[OK]</span></span></code></pre></div><p>重启机器之后验证网口配置和<code>snmp</code>配置是否还在</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch&gt;enable</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch#show ip interface</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch#show snmp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch&gt;enable</span></span>
<span class="line"><span style="color:#24292e;">Switch#show ip interface</span></span>
<span class="line"><span style="color:#24292e;">Switch#show snmp</span></span></code></pre></div><h2 id="结果验证" tabindex="-1">结果验证 <a class="header-anchor" href="#结果验证" aria-label="Permalink to &quot;结果验证&quot;">​</a></h2><p>在自己的<code>pc</code>机器上面进行配置结果验证</p><p><code>ping</code>验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ ping 192.168.1.222</span></span>
<span class="line"><span style="color:#e1e4e8;">PING 192.168.1.222 (192.168.1.222) 56(84) bytes of data.</span></span>
<span class="line"><span style="color:#e1e4e8;">64 bytes from 192.168.1.222: icmp_seq=1 ttl=255 time=0.999 ms</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ ping 192.168.1.222</span></span>
<span class="line"><span style="color:#24292e;">PING 192.168.1.222 (192.168.1.222) 56(84) bytes of data.</span></span>
<span class="line"><span style="color:#24292e;">64 bytes from 192.168.1.222: icmp_seq=1 ttl=255 time=0.999 ms</span></span></code></pre></div><p><code>udp</code>端口扫描验证</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ sudo nmap -sU 192.168.1.222 -p 161</span></span>
<span class="line"><span style="color:#e1e4e8;">Starting Nmap 7.80 ( https://nmap.org ) at 2023-02-12 18:45 CST</span></span>
<span class="line"><span style="color:#e1e4e8;">Nmap scan report for 192.168.1.222</span></span>
<span class="line"><span style="color:#e1e4e8;">Host is up (0.0014s latency).</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">PORT    STATE SERVICE</span></span>
<span class="line"><span style="color:#e1e4e8;">161/udp open  snmp</span></span>
<span class="line"><span style="color:#e1e4e8;">MAC Address: 52:54:00:0E:67:57 (QEMU virtual NIC)</span></span>
<span class="line"><span style="color:#e1e4e8;"></span></span>
<span class="line"><span style="color:#e1e4e8;">Nmap done: 1 IP address (1 host up) scanned in 2.36 seconds</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ sudo nmap -sU 192.168.1.222 -p 161</span></span>
<span class="line"><span style="color:#24292e;">Starting Nmap 7.80 ( https://nmap.org ) at 2023-02-12 18:45 CST</span></span>
<span class="line"><span style="color:#24292e;">Nmap scan report for 192.168.1.222</span></span>
<span class="line"><span style="color:#24292e;">Host is up (0.0014s latency).</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">PORT    STATE SERVICE</span></span>
<span class="line"><span style="color:#24292e;">161/udp open  snmp</span></span>
<span class="line"><span style="color:#24292e;">MAC Address: 52:54:00:0E:67:57 (QEMU virtual NIC)</span></span>
<span class="line"><span style="color:#24292e;"></span></span>
<span class="line"><span style="color:#24292e;">Nmap done: 1 IP address (1 host up) scanned in 2.36 seconds</span></span></code></pre></div><p><code>snmp</code>请求验证（注意，该查询会产生大量输出）</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$ snmpwalk -v 2c -c public 192.168.1.222 .1</span></span>
<span class="line"><span style="color:#e1e4e8;"># 输出中会包含cisco和switch等关键字</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysDescr.0 = STRING: Cisco IOS Software, vios_l2 Software (vios_l2-ADVENTERPRISEK9-M), Version 15.2(CML_NIGHTLY_20190423)FLO_DSGS7, EARLY DEPLOYMENT DEVELOPMENT BUILD, synced to  V152_6_0_81_E</span></span>
<span class="line"><span style="color:#e1e4e8;">Technical Support: http://www.cisco.com/techsupport</span></span>
<span class="line"><span style="color:#e1e4e8;">Copyright (c) 1986-2019 by Ci</span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysObjectID.0 = OID: SNMPv2-SMI::enterprises.9.1.1227</span></span>
<span class="line"><span style="color:#e1e4e8;">DISMAN-EVENT-MIB::sysUpTimeInstance = Timeticks: (120690) 0:20:06.90</span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysContact.0 = STRING: </span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysName.0 = STRING: Switch</span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysLocation.0 = STRING: </span></span>
<span class="line"><span style="color:#e1e4e8;">SNMPv2-MIB::sysServices.0 = INTEGER: 78</span></span>
<span class="line"><span style="color:#e1e4e8;">...</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$ snmpwalk -v 2c -c public 192.168.1.222 .1</span></span>
<span class="line"><span style="color:#24292e;"># 输出中会包含cisco和switch等关键字</span></span>
<span class="line"><span style="color:#24292e;">...</span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysDescr.0 = STRING: Cisco IOS Software, vios_l2 Software (vios_l2-ADVENTERPRISEK9-M), Version 15.2(CML_NIGHTLY_20190423)FLO_DSGS7, EARLY DEPLOYMENT DEVELOPMENT BUILD, synced to  V152_6_0_81_E</span></span>
<span class="line"><span style="color:#24292e;">Technical Support: http://www.cisco.com/techsupport</span></span>
<span class="line"><span style="color:#24292e;">Copyright (c) 1986-2019 by Ci</span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysObjectID.0 = OID: SNMPv2-SMI::enterprises.9.1.1227</span></span>
<span class="line"><span style="color:#24292e;">DISMAN-EVENT-MIB::sysUpTimeInstance = Timeticks: (120690) 0:20:06.90</span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysContact.0 = STRING: </span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysName.0 = STRING: Switch</span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysLocation.0 = STRING: </span></span>
<span class="line"><span style="color:#24292e;">SNMPv2-MIB::sysServices.0 = INTEGER: 78</span></span>
<span class="line"><span style="color:#24292e;">...</span></span></code></pre></div><h2 id="ssh拓展" tabindex="-1"><code>ssh</code>拓展 <a class="header-anchor" href="#ssh拓展" aria-label="Permalink to &quot;\`ssh\`拓展&quot;">​</a></h2><p><code>cisco</code>开启<code>ssh</code>服务</p><p>配置域名，生成<code>rsa</code>密钥对</p><p>最后检查<code>ssh</code>，当出现<code>SSH Enabled</code>表示开启成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Switch# configure terminal</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch(config)#ip domain name cisco.com</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch(config)#crypto key generate rsa general-keys modulus 1024</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch(config)#exit</span></span>
<span class="line"><span style="color:#e1e4e8;">Switch#show ip ssh</span></span>
<span class="line"><span style="color:#e1e4e8;">SSH Enabled - version 1.99</span></span>
<span class="line"><span style="color:#e1e4e8;">Authentication methods:publickey,keyboard-interactive,password</span></span>
<span class="line"><span style="color:#e1e4e8;">Authentication Publickey Algorithms:x509v3-ssh-rsa,ssh-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">Hostkey Algorithms:x509v3-ssh-rsa,ssh-rsa</span></span>
<span class="line"><span style="color:#e1e4e8;">Encryption Algorithms:aes128-ctr,aes192-ctr,aes256-ctr</span></span>
<span class="line"><span style="color:#e1e4e8;">MAC Algorithms:hmac-sha1,hmac-sha1-96</span></span>
<span class="line"><span style="color:#e1e4e8;">Authentication timeout: 120 secs; Authentication retries: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">Minimum expected Diffie Hellman key size : 1024 bits</span></span>
<span class="line"><span style="color:#e1e4e8;">IOS Keys in SECSH format(ssh-rsa, base64 encoded): Switch.cisco.com</span></span>
<span class="line"><span style="color:#e1e4e8;">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQC891aSHX4Sz1jU4DTKDPl08iwIJSt30vbh2wiTHaSl</span></span>
<span class="line"><span style="color:#e1e4e8;">aphjxU6rFtZOH8Hw3Rdrw3v6ia6J+RF7x+Xa3gPCfZjiI7ysPgVpvUmTNnQ8vlMsEVi+v8EtwfPKlABj</span></span>
<span class="line"><span style="color:#e1e4e8;">X/jWGFfmqFD0unFJwSReFEkA2yFRkD0NqO1koIrvA1nTjPGZpQ==</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Switch# configure terminal</span></span>
<span class="line"><span style="color:#24292e;">Switch(config)#ip domain name cisco.com</span></span>
<span class="line"><span style="color:#24292e;">Switch(config)#crypto key generate rsa general-keys modulus 1024</span></span>
<span class="line"><span style="color:#24292e;">Switch(config)#exit</span></span>
<span class="line"><span style="color:#24292e;">Switch#show ip ssh</span></span>
<span class="line"><span style="color:#24292e;">SSH Enabled - version 1.99</span></span>
<span class="line"><span style="color:#24292e;">Authentication methods:publickey,keyboard-interactive,password</span></span>
<span class="line"><span style="color:#24292e;">Authentication Publickey Algorithms:x509v3-ssh-rsa,ssh-rsa</span></span>
<span class="line"><span style="color:#24292e;">Hostkey Algorithms:x509v3-ssh-rsa,ssh-rsa</span></span>
<span class="line"><span style="color:#24292e;">Encryption Algorithms:aes128-ctr,aes192-ctr,aes256-ctr</span></span>
<span class="line"><span style="color:#24292e;">MAC Algorithms:hmac-sha1,hmac-sha1-96</span></span>
<span class="line"><span style="color:#24292e;">Authentication timeout: 120 secs; Authentication retries: 3</span></span>
<span class="line"><span style="color:#24292e;">Minimum expected Diffie Hellman key size : 1024 bits</span></span>
<span class="line"><span style="color:#24292e;">IOS Keys in SECSH format(ssh-rsa, base64 encoded): Switch.cisco.com</span></span>
<span class="line"><span style="color:#24292e;">ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQC891aSHX4Sz1jU4DTKDPl08iwIJSt30vbh2wiTHaSl</span></span>
<span class="line"><span style="color:#24292e;">aphjxU6rFtZOH8Hw3Rdrw3v6ia6J+RF7x+Xa3gPCfZjiI7ysPgVpvUmTNnQ8vlMsEVi+v8EtwfPKlABj</span></span>
<span class="line"><span style="color:#24292e;">X/jWGFfmqFD0unFJwSReFEkA2yFRkD0NqO1koIrvA1nTjPGZpQ==</span></span></code></pre></div><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://blog.csdn.net/Jamesbond_/article/details/111938555" target="_blank" rel="noreferrer">在<code>KVM中</code>通过导入<code>qcow2</code>镜像方式安装虚拟机（图形界面）</a></p><p><a href="https://blog.csdn.net/qq_36393978/article/details/118292678" target="_blank" rel="noreferrer"><code>Linux</code>使用<code>virt-manager</code>生成<code>qcow2</code>系统镜像并启动虚拟机</a></p><p><a href="https://www.cisco.com/c/zh_cn/support/docs/ip/simple-network-management-protocol-snmp/7282-12.html" target="_blank" rel="noreferrer"><code>cli</code>模式下面的<code>cisco</code>的<code>snmp</code> 配置</a></p><p><a href="https://www.cisco.com/c/zh_cn/support/docs/lan-switching/inter-vlan-routing/41860-howto-L3-intervlanrouting.html" target="_blank" rel="noreferrer"><code>cisco</code>在<code>cli</code>模式下面配置第 3 层交换机上的 <code>InterVLAN</code> 路由</a></p><p><a href="https://www.cisco.com/c/zh_cn/support/docs/smb/switches/cisco-350-series-managed-switches/smb5557-configure-the-internet-protocol-ip-address-settings-on-a-swi.html" target="_blank" rel="noreferrer"><code>cisco</code>在<code>cli</code>模式下面配置交换机<code>IP</code>地址</a></p>`,64),o=[l];function c(t,i,r,d,h,g){return e(),a("div",null,o)}const v=s(p,[["render",c]]);export{u as __pageData,v as default};
