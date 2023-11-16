import{_ as s,o as e,c as a,Q as o}from"./chunks/framework.ec8f7e8e.js";const g=JSON.parse('{"title":"临时修改为utf-8","description":"","frontmatter":{},"headers":[],"relativePath":"published/powershell配置utf-8编码.md","filePath":"published/powershell配置utf-8编码.md"}'),l={name:"published/powershell配置utf-8编码.md"},p=o(`<h1 id="临时修改为utf-8" tabindex="-1">临时修改为<code>utf-8</code> <a class="header-anchor" href="#临时修改为utf-8" aria-label="Permalink to &quot;临时修改为\`utf-8\`&quot;">​</a></h1><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> chcp </span><span style="color:#79B8FF;">65001</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> chcp </span><span style="color:#005CC5;">65001</span></span></code></pre></div><h2 id="通过配置文件永久修改" tabindex="-1">通过配置文件永久修改 <a class="header-anchor" href="#通过配置文件永久修改" aria-label="Permalink to &quot;通过配置文件永久修改&quot;">​</a></h2><p>查看<code>powershell</code>配置文件位置，如果不存在则去创建</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">$PROFILE</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">$PROFILE</span></span></code></pre></div><p>在配置文件中写入</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">$OutputEncoding = [console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding</span></span></code></pre></div><p>重新打开<code>Powershell</code></p><p>如果出现报错如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">. : 无法加载文件 C:\\Users\\***\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1，因为在此系统上禁止运行脚本</span></span>
<span class="line"><span style="color:#e1e4e8;">。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。</span></span>
<span class="line"><span style="color:#e1e4e8;">所在位置 行:1 字符: 3</span></span>
<span class="line"><span style="color:#e1e4e8;">+ . &#39;C:\\Users\\gong\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_pro ...</span></span>
<span class="line"><span style="color:#e1e4e8;">+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#e1e4e8;">    + CategoryInfo          : SecurityError: (:) []，PSSecurityException</span></span>
<span class="line"><span style="color:#e1e4e8;">    + FullyQualifiedErrorId : UnauthorizedAccess</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">. : 无法加载文件 C:\\Users\\***\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_profile.ps1，因为在此系统上禁止运行脚本</span></span>
<span class="line"><span style="color:#24292e;">。有关详细信息，请参阅 https:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。</span></span>
<span class="line"><span style="color:#24292e;">所在位置 行:1 字符: 3</span></span>
<span class="line"><span style="color:#24292e;">+ . &#39;C:\\Users\\gong\\Documents\\WindowsPowerShell\\Microsoft.PowerShell_pro ...</span></span>
<span class="line"><span style="color:#24292e;">+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></span>
<span class="line"><span style="color:#24292e;">    + CategoryInfo          : SecurityError: (:) []，PSSecurityException</span></span>
<span class="line"><span style="color:#24292e;">    + FullyQualifiedErrorId : UnauthorizedAccess</span></span></code></pre></div><p>则使用管理员权限打开<code>Powershell</code></p><p>执行命令如下，配置允许系统运行脚本，该配置默认是<code>Restricted</code>，默认禁止的</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Set-ExecutionPolicy</span><span style="color:#E1E4E8;"> RemoteSigned</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Set-ExecutionPolicy</span><span style="color:#24292E;"> RemoteSigned</span></span></code></pre></div><p>执行命令如下确认修改生效</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">Get-ExecutionPolicy</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">Get-ExecutionPolicy</span></span></code></pre></div><p>重新打开<code>powershell</code>输入命令<code>chcp</code>，如果输出如下表示修改成功</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">Active code page: 65001</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">Active code page: 65001</span></span></code></pre></div><h2 id="输出重定向到文件时配置编码" tabindex="-1">输出重定向到文件时配置编码 <a class="header-anchor" href="#输出重定向到文件时配置编码" aria-label="Permalink to &quot;输出重定向到文件时配置编码&quot;">​</a></h2><p>在<code>Powershell</code>可以使用输出重定向，如下把<code>ls</code>命令重定向到文件<code>aa.txt</code></p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> ls </span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> aa.txt</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> ls </span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> aa.txt</span></span></code></pre></div><p>之后使用记事本打开<code>aa.txt</code>，可以在右下角看到编码显示为<code>UTF-16 LE</code></p><p>使用<code>utf8</code>重定向如下</p><div class="language-powershell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">PS</span><span style="color:#F97583;">&gt;</span><span style="color:#E1E4E8;"> ls </span><span style="color:#F97583;">|</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">out-file</span><span style="color:#E1E4E8;"> bb.txt </span><span style="color:#F97583;">-</span><span style="color:#E1E4E8;">encoding utf8</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">PS</span><span style="color:#D73A49;">&gt;</span><span style="color:#24292E;"> ls </span><span style="color:#D73A49;">|</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">out-file</span><span style="color:#24292E;"> bb.txt </span><span style="color:#D73A49;">-</span><span style="color:#24292E;">encoding utf8</span></span></code></pre></div><p>用记事本打开<code>bb.txt</code>，看到编码显示<code>带BOM的UTF-8</code></p><h2 id="参考阅读" tabindex="-1">参考阅读 <a class="header-anchor" href="#参考阅读" aria-label="Permalink to &quot;参考阅读&quot;">​</a></h2><p><a href="https://ganzhixiong.com/p/f1b9f4fc/" target="_blank" rel="noreferrer">解决<code>PowerShell</code>中文乱码</a></p><p><a href="https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_character_encoding?view=powershell-7.2" target="_blank" rel="noreferrer"><code>microsoft 编码</code></a></p><p><a href="https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_redirection?view=powershell-7.2" target="_blank" rel="noreferrer"><code>microsoft</code>输出重定向</a></p>`,28),n=[p];function c(t,r,i,d,h,u){return e(),a("div",null,n)}const E=s(l,[["render",c]]);export{g as __pageData,E as default};
