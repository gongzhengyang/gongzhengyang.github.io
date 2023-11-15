## 常用命令

```shell
# 代码格式优化
$ cargo fmt 

# 检查语法上的小优化
$ cargo clippy
```

## `Cargo.toml`配置优化

配置开启`lto`优化，减少编译中二进制文件无用代码，删除无用`debug`

优化符号信息`symbols`

```toml
[profile.release]
lto = true
strip = true
```

##  找到`Cargo.toml`中未使用的依赖项

依赖项目

```
https://github.com/est31/cargo-udeps
```

安装

```shell
$ cargo install cargo-udeps --locked
```

检测未使用的依赖

```shell
$ cargo +nightly udeps
```

或者

```shell
$ cargo udeps
```

有些依赖如果只出现在`rust macros/cfg attr`中时，会产生误报，需要注意

## `Cargo.toml`文件`fmt`

主要是优化`toml`文件中的格式，无其他影响

依赖项目

```
https://github.com/segeljakt/toml-fmt
```

安装

```shell
$ cargo install toml-fmt
```

`fmt`优化`Cargo.toml`

```shell
$ cargo tomlfmt
```

## 使用`nextest`加快单元测试速度

当项目越来越大的时候，跑一次单元测试耗时比较久，使用`nextest`可以显著加快单元测试速度

依赖项目

```
https://github.com/nextest-rs/nextest
```

安装

```shell
$ cargo install cargo-nextest --locked
```

进行单元测试

```shell
$ cargo nextest run
```

## `std::collections::*`优化

第三方库`parking_lot`提供了一些类`Mutex`, `RwLock`, `Condvar` ,  `Once`

更小，更快，更灵活

```
https://github.com/Amanieu/parking_lot
```

项目作者描述`发现parking lot::Mutex在无数据竞争时比std::sync::Mutex快1.5倍，在多线程时比std::sync::Mutex快5倍，其他类的测试速度更明显`

原文

```
When tested on x86_64 Linux, parking_lot::Mutex was found to be 1.5x faster than std::sync::Mutex when uncontended, and up to 5x faster when contended from multiple threads. The numbers for RwLock vary depending on the number of reader and writer threads, but are almost always faster than the standard library RwLock, and even up to 50x faster in some cases.
```

使用

修改`Cargo.toml`

```
[dependencies]
parking_lot = "0.12" # 注意后期版本变更
```

```rust
use parking_lot::Mutex;

fn main() {
    let mut m = Mutex::new(10);
    *m.get_mut() = 11;
    assert_eq!(*m.lock(), 11);
}
```

## `std::collections::{HashMap, HashSet}`优化

依赖项目

```
https://github.com/xacrimon/dashmap
```

`rust`中速度超快的并发`HashMap`，针对高并发读，写优化，同时也提供了`DashSet`用于替换`std::collections::HashSet`，基准测试比较查看地址

```
https://github.com/xacrimon/conc-map-bench
```

使用

`Cargo.toml`

```
dashmap = "5.5"
```

`main.rs`

```rust
use dashmap::{DashMap, DashSet};

fn main() {
    let dm = DashMap::new();
    dm.insert(0, 0);
    assert_eq!(dm.get(&0).unwrap().value(), &0);

    let set = DashSet::new();
    set.insert(0);
    assert_eq!(set.get(&0).as_deref(), Some(&0));
}
```

## `benchmark`

写了一段代码，发现速度好像不够快，或者感觉好像换一个数据类型可以更快，最靠谱实在的就是使用基准测试了

基准测试针对代码，可以用来测试某一段代码的运行速度，例如一个排序算法

依赖项目

```
https://github.com/bheisler/criterion.rs
```

图表生成

```
http://www.gnuplot.info/
```

为了生成可视化基准测试图表，需要安装`gnuplot`工具，如果是在`Ubuntu`系统上，可以直接通过命令安装`sudo apt install gnuplot`，基准测试结束之后可以使用浏览器打开`target/criterion/report/index.html`文件查看图表可以看到更详细直观的性能测试报告

以下代码`copy from criterion`的文档

修改`Cargo.toml`

`harness = false`表示禁用 `libtest` 基准测试工具，这样就需要提供自己的`main`函数来处理基准测试，`**benchmark.rs`中会使用`criterion::criterion_main!`作为`main`函数`benchmark harness`

```toml
[dev-dependencies]
criterion = { version = "0.5", features = ["html_reports"] }

[[bench]]
name = "my_benchmark"
harness = false
```

新建测试文件`$PROJECT/benches/my_benchmark.rs`

由于测试时候使用的是一个固定的值，`LLVM`认为`fibonacci`函数调用的结果没有使用，同时也认为该函数没有任何副作用(造成其它的影响，例如修改外部变量、访问网络等)，因此有理由把这个函数调用优化掉，导致基准测试异常，所以需要使用一个`black_box`函数包裹参数防止编译器优化这个参数输入或者函数

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion};

fn fibonacci(n: u64) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        n => fibonacci(n-1) + fibonacci(n-2),
    }
}

fn criterion_benchmark(c: &mut Criterion) {
    c.bench_function("fib 20", |b| b.iter(|| fibonacci(black_box(20))));
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
```

执行命令如下

```shell
$ cargo bench

# 如下输出也是copy官方文档的，下面逐行说明输出数据
     Running target/release/deps/example-423eedc43b2b3a93
Benchmarking fib 20
# 预热，默认3秒，为了预热处理器缓存和文件系统缓存，模拟真实生产环境
Benchmarking fib 20: Warming up for 3.0000 s
# 收集样本数据，使用不同次数的迭代来迭代要进行基准测试的函数，以生成每次迭代所花费时间的估计
Benchmarking alloc: Collecting 100 samples in estimated 13.354 s (5050 iterations)
Benchmarking alloc: Analyzing
# time 显示了该基准测试测量的每次迭代时间的置信区间
# 左值和右值分别表示置信区间的下界和上界，中间值表示对基准测试每次迭代所花费时间的最佳估计
alloc                   time:   [2.5094 ms 2.5306 ms 2.5553 ms]
# 基准代码的吞吐量
                        thrpt:  [391.34 MiB/s 395.17 MiB/s 398.51 MiB/s]
# 当运行基准测试时，criterion 统计信息保存在 target/criterion 目录
# 基准测试的后续执行将加载此数据并将其与当前示例进行比较，以显示代码更改的影响
# p 表示本次基准运行与上一次基准运行之间差异的置信区间测量到的差异可能偶然发生的概率
                        change: [-38.292% -37.342% -36.524%] (p = 0.00 < 0.05)
# 针对change的数据进行简单摘要说明，(Performance has regressed[性能下降]，Performance has improved.[性能上升])
                        Performance has improved.
# 异常高或低的样本报告为异常值，大量异常值表明基准测试结果存在噪音
# 这可能是由于运行基准测试的计算机上不可预测的负载、线程或进程调度、或者被基准测试的代码所用时间的不规则性造成的，可能有其他高负载程序干扰
Found 8 outliers among 100 measurements (8.00%)
  4 (4.00%) high mild
  4 (4.00%) high severe
# slope显示线性回归斜率的置信区间，R^2 区域显示该置信区间下限和上限的拟合优度值
# 如果 R^2 值较低，这可能表明基准测试在每次迭代中没有执行相同的工作量。
slope  [2.5094 ms 2.5553 ms] R^2            [0.8660614 0.8640630]
# 显示每次迭代时间的平均值和标准差的置信区间
mean   [2.5142 ms 2.5557 ms] std. dev.      [62.868 us 149.50 us]
# 中位数和中位数绝对偏差绝对值的置信区间
median [2.5023 ms 2.5262 ms] med. abs. dev. [40.034 us 73.259 us]
```

命令行输出数据参考阅读

```
https://bheisler.github.io/criterion.rs/book/user_guide/command_line_output.html
```

详细阅读参考

```
https://bheisler.github.io/criterion.rs/book/getting_started.html
```

## 异步递归调用

```rust
async fn fib(n : u32) -> u32 {
   match n {
       0 | 1 => 1,
       _ => fib(n-1).await + fib(n-2).await
   }
}
```

当出现一段递归代码如上，由于`fib`函数是异步的，所以编译的时候会报错如下

```
error[E0733]: recursion in an `async fn` requires boxing
 --> src/main.rs:1:26
  |
1 | async fn fib(n : u32) -> u32 {
  |                          ^^^ recursive `async fn`
  |
  = note: a recursive `async fn` must be rewritten to return a boxed `dyn Future`
  = note: consider using the `async_recursion` crate: https://crates.io/crates/async_recursion
```

可以使用依赖库

```
https://github.com/dcchut/async-recursion
```

`Cargo.toml`

```toml
[dependencies]
tokio = {version = "1", features = ["full"]}
async-recursion = "1"
```

`main.rs`

```rust
use async_recursion::async_recursion;

#[tokio::main]
async fn main() {
    println!("{}", fib(3).await);
}

#[async_recursion]
async fn fib(n : u32) -> u32 {
    match n {
        0 | 1 => 1,
        _ => fib(n-1).await + fib(n-2).await
    }
}
```

## 高性能线程安全的多读少写库

需求：

- 能够从多个线程快速、频繁且并发地读取数据结构的当前值
- 在较长时间内使用相同版本的数据结构 - 查询应由一致版本的数据来回答，数据包应通过旧版本或新版本的路由表进行路由，而不是通过组合进行路由
-  执行更新而不中断处理

在有些场景下面，我们会使用一个静态变量，可以被多个线程读取，同时会有少量情况会进行数据修改

实现方式

- 采用` RwLock<T>/ RwLock<Arc<T>>`这样的数据结构来实现，通过读写锁来保证安全，但是该数据类型会有一个问题，当进行写操作时，所有的读程序都会被阻塞，同时在不同的场景下，写操作可能会被稳定持续不断的读操作一直阻塞较长时间

- 采用`ArcSwap`实现，该库对读操作进行了优化，数据结构类似于`Atomic<Arc<T>>`，没有了锁，具有稳定的性能，仓库地址

  ```
  https://github.com/vorner/arc-swap
  ```

使用

`Cargo.toml`

```toml
[dependencies]
tokio = {version = "1", features = ["full"]}
arc-swap = "1.6"
once_cell = "1"
```

`main.rs`

```rust
use std::sync::Arc;
use std::time::Duration;

use arc_swap::ArcSwap;
use once_cell::sync::Lazy;

static VALUE: Lazy<ArcSwap<String>> = Lazy::new(|| ArcSwap::from(Arc::new("test".to_owned())));

#[tokio::main]
async fn main() {
    tokio::spawn(async {
        tokio::time::sleep(Duration::from_secs(2)).await;
        VALUE.swap(Arc::new("changed".to_owned()));
    });
    loop {
        println!("now value is {}", VALUE.load());
        tokio::time::sleep(Duration::from_secs(1)).await;
    }
}
```

以上代码输出是

```
now value is test
now value is test
now value is changed
now value is changed
now value is changed
....
```

## 参考阅读

[`Criterion.rs Documentation Getting Started` ](https://bheisler.github.io/criterion.rs/book/getting_started.html )
