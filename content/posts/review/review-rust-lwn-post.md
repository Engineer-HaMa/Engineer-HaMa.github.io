+++
title = "How to write Rust in the kernel: 한국어 요약본"
date = 2025-07-11

weight = 3
+++

# tl;dr
이 글은은 How to write Rust in the kernel [1편](https://lwn.net/Articles/1024202/),
[2편](https://lwn.net/Articles/1025232/) 의 한국어 요약본입니다.
Rust를 커널에서 사용하기 위한 방법과 관련된 내용을 다루고 있습니다.
Linux kernel(이하 커널)에 점차 Rust 코드가 추가되는 상황에서, C개발자가 Rust 코드를 리뷰하기 위해,
그리고 Rust 개발자가 커널 프로젝트에 합류하기 위해 알아야 할 내용들을 다룹니다.

# 빌드 시스템 이해하기
커널은 C언어 2가지 컴파일러, GCC와 LLVM을 지원합니다. 하지만 Rust는 rustc(LLVM)만 공식적으로 지원중입니다.
gccrs 프로젝트는 커널 코드를 잘 컴파일하지만 아직 공식 지원은 아닙니다.
따라서

1. C는 GCC + Rust는 LLVM
2. C와 Rust 모두 LLVM

이 두 가지 선택지로 빌드할 수 있습니다.
추가로 clippy, rustdoc, rust-analyzer를 설치하면 편리합니다.

> Rust 코드를 활성화하기 위한 커널 플래그에 관한 설명은 생략

> TODO: 테스팅 요약 추가하기

> TODO: 포맷팅 설명 추가하기

# 코드 살펴보기
Asix AX88796B embedded Ethernet controller의 드라이버를 Rust 버전을 작성한 코드를 통해
Rust 커널 코드의 구조를 살펴보겠습니다.
- [C 코드](https://github.com/torvalds/linux/blob/master/drivers/net/phy/ax88796b.c)
- [Rust코드](https://github.com/torvalds/linux/blob/master/drivers/net/phy/ax88796b_rust.rs)

## Rust의 모듈 시스템
Rust는 C의 헤더 파일 참조와 다르게 모듈 시스템을 통해 원하는 정확한 심볼만 참조 가능합니다.
```Rust
use kernel::{
    c_str,
    net::phy::{self, reg::C22, DeviceId, Driver},
    prelude::*,
    uapi,
};
```
커널에서 사용하는 모든 라이브러리는 kernel crate에 포함되어 있습니다.

> TODO: 매크로, 전역변수(상수)에 관한 설명 추가하기

## Rust의 함수 작성
이 글은 함수 처리 과정 중 에러 핸들링에 중점을 두고 있습니다. 동일한 기능을 하는 C 코드와 Rust 코드를 비교해보겠습니다.
```C
static int asix_soft_reset(struct phy_device *phydev)
{
    int ret;

    /* Asix PHY won't reset unless reset bit toggles */
    ret = phy_write(phydev, MII_BMCR, 0);
    if (ret < 0)
	    return ret;

    return genphy_soft_reset(phydev);
}
```
```Rust
// Performs a software PHY reset using the standard
// BMCR_RESET bit and poll for the reset bit to be cleared.
// Toggle BMCR_RESET bit off to accommodate broken AX8796B
// PHY implementation such as used on the Individual
// Computers' X-Surf 100 Zorro card.
fn asix_soft_reset(dev: &mut phy::Device) -> Result {
    dev.write(C22::BMCR, 0)?;
    dev.genphy_soft_reset()
}
```
두 구현이 failable한 library 함수를 호출하고 그 결과를 확인하여 이어서 진행화는 과정에서 자동화된 에러 처리를 보여줍니다.

## 드라이버 등록하기
> TODO: 드라이버 등록 코드 설명하긴

# 참고자료
- https://github.com/torvalds/linux/blob/master/drivers/net/phy/ax88796b.c
- https://github.com/torvalds/linux/blob/master/drivers/net/phy/ax88796b_rust.rs
- https://www.phoronix.com/news/Linux-6.8-Rust-PHY-Driver
