+++
title = "논문 리뷰: Building Bridges: Safe Interactions with Foreign Languages through Omniglot"
date = 2025-07-19

+++

# TL;DR
이 글은 OSDI 25에서 발표된 [논문](https://www.usenix.org/conference/osdi25/presentation/schuermann)에 대한 리뷰입니다.

# 요약
최근 Safe Language의 중요성이 커지고 있고, 많은 시스템이 Safe Language로 작성되고 있다.
하지만, 이전에 다른 언어로 작성된 라이브러리와의 상호작용시 Safe Language가 제공하는 안전성은 보장되지 않는다.
이 논문은 Rust의 Safety와 Soundness를 보장하며 기존에 다른 언어(C)로 작성된 라이브러리를 실행할 수 있는 Omniglot이라는 프레임워크를 구현했다.

1. 기존의 Foreign Function Interface(FFI)는 Safe Language의 안전성을 보장하지 못한다.
Omniglot은 Foriegn Function의 결과물을 신뢰하지 않고, 이를 검증하는 단계를 거친다.
2. 기존의 FFI는 Rust의 Borrow rules를 위반할 수 있다.
Omniglot은 memory isolation primitives(RISC-V PMP, intel MPK)를 사용하여 객체의 mutual exclusion을 보장한다.


# 고찰
## library의 호출만을 상정하는가?
Rust에서 Foreign Code를 호출하는 경우만큼, Foriegn Code가 Rust Code를 호출하는 경우도 있을 것이다.
예를 들어, Rust For Linux는 커널 코드가 rust로 작성된 callback을 호출해야 한다. 이때 넘겨주는 Arguments를 지금은 상황에 맍추어 safety를 개발자가 보장하는 것으로 보인다. 이를 Omniglot에서 해결할 수 있을까?
즉, foreign langeuage가 Rust extern function을 호출하는 경우, 이 Arguments를 library 호출처럼 mutually exclusive하게 보호할 수 있을까?
## single core evaluation
Omniglot은 process를 single core에 pinning하여 실행한다. 이것이 성능 차이를 가져오지 않았을까?
