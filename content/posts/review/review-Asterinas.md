+++
title = "논문 리뷰: Asterinas: A Linux ABI-Compatible, Rust-Based Framekernel OS with a Small and Sound TCB"
date = 2025-07-15
+++

# TL;DR
이 글은 ATC 25에서 발표된 [논문](https://www.usenix.org/conference/atc25/presentation/peng-yuke)에 대한 리뷰입니다.

# 요약
## Framekernel
Framekernel은 Microkernel의 장점인 작은 TCB와 모듈성, 그리고 Monolithic Kernel의 장점인 단일 주소공간에 의한 성능을 결합한 OS 아키텍처입니다.
모놀리식 커널의 단일 주소 공간을 유지하면서도, 모듈화된 커널을 통해 작은 TCB를 유지합니다. 이는 Rust의 안전성과 모듈 시스템을 활용하여 구현됩니다.
## Asterinas
Asterinas는 Framekernel을 기반으로 한 OS로, Linux ABI 호환성을 유지하면서도 작은 TCB를 제공합니다. Rust로 작성되어 메모리 안전성을 보장하며, 모듈화된 커널 구조를 통해 각 모듈이 isolate 되었다고 볼수 있습니다.

# 고찰
## Rust For Linux와의 차별점?
Asterinas의 모듈성은 Rust For Linux와 유사합니다.
차이점은 Asterinas TCB는 unsafe rust, Linux는 C와 abstraction layer(unsafe rust로 작성)로 이루어져 있다는 점입니다.
개인적으로 그렇게 큰 차이는 아니라고 생각하는데, 무엇이 주요한 기여점으로 꼽혔는지 궁금합니다.
코어 로직이 safe rust로 작성되었다는 점은 시사할 만한 차이인 것 같습니다.
## Rust는 느리다?
Rust는 C에 비해 느리다는 주장이 있습니다. 이는 Rust의 안전성 보장을 위한 추가적인 오버헤드 때문입니다.
Safe Rust로는 불가능한 포인터를 이용한 마법같은 로직을 작성하기 어렵기 때문입니다. 또한, RAII의 불규칙적인 자원 해제 시점이 성능에 영향을 줄 수 있습니다.
하지만, Asterinas의 벤치마크 결과는 Linux에 비해 그렇게 느리지 않아 보입니다. Ngnix, Redis, and SQLite와 같은 앱 벤치마크에선 linux를 상회하고,
System call-intensive LMbench에서도 평균적으로 8% 정도의 저하를 보입니다.
그래서 이 논문은 framekernel이라는 디자인의 novelty가 중요한 것이 아닌, 리눅스 호환이라는 엄청난 양의 코드를 작성했고, 이를 통해
Rust가 그렇게 느리지 않다는 것을 보여준 것이 주요한 기여점이라고 생각합니다.
// TODO: 이전에 나온 Rust OS들도 비슷한 속도를 냈는지 확인해보기!

# References
- Moonlight 요약: https://www.themoonlight.io/ko/review/asterinas-a-linux-abi-compatible-rust-based-framekernel-os-with-a-small-and-sound-tcb
- lwn 토론: https://lwn.net/Articles/1022920/
