# NC Project NL 면접 질문 & 답안
- 실제 면접에서 받은 질문 27개와 정리한 답안
- 경험 질문(Q17, Q18, Q22~Q26)은 답변 틀이므로 본인 사례로 채워서 준비

---

## 기출 정보
|항목|내용|
|---|---|
|회사|NCSOFT|
|프로젝트|Project NL|
|직무|게임 서버 프로그래머|
|정리일|2026.10|
|질문 수|27개 (기술 18 · 실무 4 · 인성/마무리 5)|

## 질문 목록
|No|분류|질문|CS 정리 문서|
|---|---|---|---|
|Q1|C++ / 메모리|메모리 얼라인먼트란?|[메모리_얼라인먼트](../Operating%20System/%EB%A9%94%EB%AA%A8%EB%A6%AC_%EC%96%BC%EB%9D%BC%EC%9D%B8%EB%A8%BC%ED%8A%B8.md)|
|Q2|C++ / 메모리|shared_ptr의 Control Block이란?|[[C++] Smart_Pointer](../Language/C%2B%2B/%5BC%2B%2B%5D%20Smart_Pointer.md)|
|Q3|OS|Context Switching은 언제 발생하는가?|[Context_Switching](../Operating%20System/Context_Switching.md)|
|Q4|OS|Virtual Memory란?|[가상_메모리](../Operating%20System/%EA%B0%80%EC%83%81_%EB%A9%94%EB%AA%A8%EB%A6%AC.md)|
|Q5|멀티스레드|atomic에 32개 스레드가 fetch_add하면?|[Atomic과_캐시_일관성](../Operating%20System/Atomic%EA%B3%BC_%EC%BA%90%EC%8B%9C_%EC%9D%BC%EA%B4%80%EC%84%B1.md)|
|Q6|STL|vector의 메모리 관리|[vector](../Data%20Structure/vector.md)|
|Q7|STL|list의 메모리 관리|[list](../Data%20Structure/list.md)|
|Q8|STL|vector vs list 순회 속도|[vector_vs_list](../Data%20Structure/vector_vs_list.md)|
|Q9|STL|unordered_map의 내부 구조|[unordered_map](../Data%20Structure/unordered_map.md)|
|Q10|STL|map vs unordered_map|[map_vs_unordered_map](../Data%20Structure/map_vs_unordered_map.md)|
|Q11|STL|vector에 계속 insert하면?|[vector](../Data%20Structure/vector.md)|
|Q12|STL|list / unordered_map의 문제점|[list](../Data%20Structure/list.md), [unordered_map](../Data%20Structure/unordered_map.md)|
|Q13|멀티스레드|new/delete 반복 시 문제|[멀티스레드_메모리_할당](../Operating%20System/%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C_%EB%A9%94%EB%AA%A8%EB%A6%AC_%ED%95%A0%EB%8B%B9.md)|
|Q14|멀티스레드|할당 병목 해결 방법|[멀티스레드_메모리_할당](../Operating%20System/%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C_%EB%A9%94%EB%AA%A8%EB%A6%AC_%ED%95%A0%EB%8B%B9.md)|
|Q15|STL|unordered_map 검색 과정|[unordered_map](../Data%20Structure/unordered_map.md)|
|Q16|STL|vector의 메모리 적재 방식|[vector](../Data%20Structure/vector.md)|
|Q17|Database|SP에 여러 Row 넘기기 (TVP)|[Table_Valued_Parameter](../Database/Table_Valued_Parameter.md)|
|Q18|C++ / 메모리|STL Allocator 교체 경험|[[C++] STL_Allocator](../Language/C%2B%2B/%5BC%2B%2B%5D%20STL_Allocator.md)|
|Q19|실무|거래소 매물 공유 구조|[분산_트랜잭션과_Saga](../Database/%EB%B6%84%EC%82%B0_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EA%B3%BC_Saga.md)|
|Q20|실무|서버 간 DB 트랜잭션 처리|[분산_트랜잭션과_Saga](../Database/%EB%B6%84%EC%82%B0_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EA%B3%BC_Saga.md)|
|Q21|실무|재화 차감 후 Crash 처리|[분산_트랜잭션과_Saga](../Database/%EB%B6%84%EC%82%B0_%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EA%B3%BC_Saga.md)|
|Q22|실무|가장 성취감이 컸던 작업||
|Q23|AI 활용|AI 활용 경험||
|Q24|인성|장점과 단점||
|Q25|인성|동료 평가||
|Q26|자기평가|서버 개발 능력 점수||
|Q27|마무리|궁금한 점||

---

## C++ / 메모리 / OS (Q1~Q5)

### Q1. 메모리 얼라인먼트란?
데이터를 자기 크기(혹은 요구 정렬값)의 배수 주소에 배치하는 규칙입니다. CPU는 메모리를 워드/캐시라인(보통 64B) 단위로 읽기 때문에, 정렬이 어긋나면 한 번에 읽을 것을 두 번 읽거나 캐시라인 경계를 걸치게 됩니다.

- 구조체는 멤버 사이에 패딩이 들어가고, 구조체 전체 크기는 가장 큰 멤버 정렬값의 배수가 됩니다. 멤버를 큰 타입 순으로 배치하면 패딩을 줄일 수 있습니다.
- `alignas`, `alignof`, `#pragma pack`으로 제어합니다. 패킷 구조체는 `pack(1)`을 쓰지만 접근 비용과 비정렬 접근 위험이 있습니다.
- 실무 포인트: atomic 변수는 정렬되어야 원자성이 보장되고, 스레드별 카운터는 `alignas(64)`로 False Sharing을 막습니다. SIMD는 16/32B 정렬이 필요합니다.

### Q2. shared_ptr의 Control Block이란?
shared_ptr가 가리키는 객체와 별도로 할당되는 관리 정보 블록입니다. shared_ptr 자체는 객체 포인터 + Control Block 포인터, 두 개를 들고 있습니다(16B).

- 내용: strong count(use_count), weak count, deleter, allocator. 카운트는 atomic으로 증감합니다.
- strong count가 0이 되면 객체를 소멸하고, weak count까지 0이 되면 Control Block을 해제합니다. `weak_ptr::lock()`이 안전한 이유가 이것입니다.
- `make_shared`는 객체와 Control Block을 한 번에 할당해 할당 횟수와 캐시 미스가 줄지만, weak_ptr가 남아 있으면 객체 메모리까지 해제가 늦어집니다.
- 주의: 같은 raw 포인터로 shared_ptr를 두 번 만들면 Control Block이 두 개 생겨 이중 해제가 됩니다. 그래서 `enable_shared_from_this`를 씁니다. 또 카운트 자체는 thread-safe하지만 객체 접근이나 같은 shared_ptr 변수의 동시 대입은 thread-safe하지 않습니다.

### Q3. Context Switching은 언제 발생하는가?
CPU가 실행 중인 스레드의 레지스터 상태를 저장하고 다른 스레드의 상태를 불러오는 것입니다. 발생 시점은 크게 두 가지입니다.

- 자발적(voluntary): 블로킹 I/O, 락 대기(mutex/condition variable), `Sleep`, `WaitForSingleObject`, `yield` 등으로 스레드가 스스로 CPU를 내놓을 때.
- 비자발적(involuntary): 타임 슬라이스(퀀텀) 소진, 더 높은 우선순위 스레드가 깨어남(선점), 인터럽트 처리 후 스케줄러 재호출.
- 비용: 레지스터 저장/복원, 커널 모드 전환, 캐시와 분기예측 오염. 프로세스 간 전환이면 페이지 테이블(CR3)이 바뀌어 TLB 플러시까지 일어나 더 비쌉니다. 같은 프로세스 내 스레드 전환은 주소 공간이 같아 상대적으로 쌉니다.
- 서버 관점: 스레드를 코어 수보다 많이 두거나 락 경합이 심하면 전환이 많아집니다. 그래서 IOCP 워커를 코어 수에 맞추고, 짧은 임계영역은 SpinLock/SRWLock을 씁니다.

### Q4. Virtual Memory란?
각 프로세스에게 독립된 연속 주소 공간을 주고, OS와 MMU가 이를 물리 메모리에 페이지(보통 4KB) 단위로 매핑하는 기법입니다.

- 가상 주소 → 페이지 테이블(x64는 4단계) → 물리 주소. 변환 결과는 TLB에 캐싱됩니다.
- 접근한 페이지가 물리 메모리에 없으면 Page Fault가 나고, OS가 디스크(페이지 파일)에서 올립니다. 메모리가 부족하면 LRU 계열로 페이지를 내보냅니다(스와핑).
- 장점: 프로세스 간 격리/보호, 물리 메모리보다 큰 공간, Demand Paging, 공유 라이브러리와 Copy-on-Write, 메모리 매핑 파일.
- Windows 관점: `VirtualAlloc`의 Reserve(주소만 예약)와 Commit(실제 백킹 할당)을 나눠 쓸 수 있고, 메모리 풀이나 거대한 버퍼를 만들 때 활용합니다. TLB 미스를 줄이려면 Large Page(2MB)를 쓸 수 있습니다.

### Q5. atomic<int32_t>에 32개 스레드가 무한히 fetch_add(1)하면?
결론: 결과는 정확하지만, 하나의 캐시라인을 두고 코어들이 쟁탈전을 벌여 사실상 직렬화되고, 스레드를 늘릴수록 전체 처리량이 오히려 떨어집니다.

1. x86에서 fetch_add는 `lock xadd` 명령 하나로 컴파일됩니다. 현대 CPU는 버스 전체를 잠그지 않고 해당 캐시라인만 잠급니다(cache lock).
2. 쓰기를 하려면 그 코어가 캐시라인을 MESI의 Modified/Exclusive 상태로 독점해야 합니다. 다른 코어들의 사본은 Invalidate됩니다.
3. 32개 코어가 동시에 요청하므로 캐시라인 소유권이 코어 사이를 계속 이동합니다(Cache Line Ping-Pong). 한 번 연산이 L1 지연(수 ns)이 아니라 코어 간/소켓 간 전송 지연(수십~수백 ns)이 됩니다.
4. lock 명령은 풀 메모리 배리어라 스토어 버퍼를 비우고 파이프라인을 세웁니다. 코어들은 대부분의 시간을 대기(stall)로 보내고, CPU 사용률은 100%인데 실제 일은 거의 안 합니다. 인터커넥트(링/메시) 트래픽도 폭증하고, 멀티소켓이면 더 심합니다.
5. 락이 아니라 컨텍스트 스위칭은 없고 wait-free지만, 코어별 공정성은 보장되지 않습니다. int32라서 언젠가 오버플로우로 wrap-around합니다(atomic은 UB 없이 2의 보수로 감김).

해결책: 스레드별 로컬 카운터(`alignas(64)`로 분리)를 두고 읽을 때만 합산하거나, 로컬에서 모았다가 주기적으로 묶어서 더합니다. 단순 통계용이면 `memory_order_relaxed`로 순서 제약을 없애도 됩니다(x86에서는 lock 명령 자체는 그대로지만 ARM 등에서는 이득).

## STL 자료구조 (Q6~Q16)

### Q6. vector는 메모리를 어떻게 관리하는가?
힙에 하나의 연속된 배열을 잡고, 내부에 포인터 3개(begin, end, capacity end)만 들고 있습니다.

- size가 capacity를 넘으면 더 큰 블록(MSVC 1.5배, GCC 2배)을 새로 할당하고, 기존 원소를 move(예외 없는 move 생성자일 때, 아니면 copy)한 뒤 이전 블록을 해제합니다. 그래서 push_back은 분할 상환 O(1)입니다.
- 재할당되면 모든 반복자/포인터/참조가 무효화됩니다.
- `clear()`는 소멸자만 부르고 capacity는 유지합니다. 메모리를 반납하려면 `shrink_to_fit`이나 swap trick을 씁니다.
- 크기를 알면 `reserve()`로 재할당을 막습니다. move 생성자에 `noexcept`를 붙여야 재할당 때 복사 대신 이동합니다.

### Q7. list는 메모리를 어떻게 관리하는가?
이중 연결 리스트로, 원소마다 노드(prev, next, value)를 하나씩 개별 할당합니다. 구현에 따라 sentinel 노드를 두고 원형으로 연결합니다.

- 삽입/삭제는 위치를 알면 O(1)이고, 다른 원소의 반복자가 무효화되지 않습니다. `splice`로 할당 없이 노드를 옮길 수 있습니다.
- 대신 원소당 포인터 2개(64비트 16B) + 할당자 헤더만큼 메모리가 더 들고, 노드가 힙 여기저기 흩어집니다. 임의 접근은 O(n)입니다.

### Q8. vector와 list를 처음부터 끝까지 순회하면 어느 쪽이 빠른가?
vector가 훨씬(보통 수 배~수십 배) 빠릅니다. 둘 다 O(n)이지만 상수가 다릅니다.

- 공간 지역성: vector는 연속 메모리라 캐시라인 하나(64B)에 int 16개가 함께 올라옵니다. list는 노드마다 다른 주소라 매번 캐시 미스가 날 수 있습니다.
- 하드웨어 프리페처: 순차 접근 패턴을 예측해 미리 가져오는데, list는 다음 주소를 next를 읽어야만 알 수 있어(pointer chasing) 프리패치가 불가능하고 메모리 로드가 직렬화됩니다.
- 그 외: vector는 TLB 미스도 적고 컴파일러가 SIMD로 벡터화할 수도 있습니다.

### Q9. unordered_map이란? 내부 데이터 관리는?
해시 테이블 기반의 key-value 컨테이너로, 평균 O(1) 검색/삽입/삭제를 제공하고 순서는 보장하지 않습니다.

- 버킷 배열 + 체이닝(Separate Chaining) 방식입니다. 표준이 노드 포인터/참조 안정성을 요구하기 때문에 원소는 개별 할당 노드로 저장됩니다.
- MSVC는 모든 원소를 하나의 list로 연결하고 버킷은 그 list 내 구간의 시작/끝 반복자를 들고 있고, GCC는 단일 연결 리스트 + 버킷이 이전 노드를 가리키는 구조입니다.
- load_factor(원소 수/버킷 수)가 max_load_factor(기본 1.0)를 넘으면 버킷 수를 늘리고 전체 rehash합니다. 이때 반복자는 무효화되지만 원소 참조는 유지됩니다.
- 최악은 해시 충돌로 O(n)입니다.

### Q10. map이란? unordered_map과 다른 점은?
map은 Red-Black Tree(균형 이진 탐색 트리)로 구현된 정렬된 key-value 컨테이너입니다.

| 항목 | map | unordered_map |
| --- | --- | --- |
| 구조 | Red-Black Tree | 해시 테이블 |
| 검색/삽입 | 항상 O(log n) | 평균 O(1), 최악 O(n) |
| 순서 | key 정렬 유지 | 없음 |
| key 요구사항 | operator< | hash + operator== |
| 범위 검색 | lower_bound/upper_bound 가능 | 불가 |
| 반복자 무효화 | 삭제된 원소만 | rehash 시 전체 |

선택 기준: 정렬/범위 조회(랭킹, 시간순 처리)나 예측 가능한 성능이 필요하면 map, 단순 키 조회(유저 ID로 세션 찾기)면 unordered_map입니다. 데이터가 적고 조회가 주로면 정렬된 vector + 이진 탐색이 둘보다 빠를 때도 많습니다.

### Q11. vector에 계속 insert하면 생기는 문제는?
- 중간/앞 insert는 뒤의 원소를 전부 한 칸씩 밀어야 해서 O(n)입니다. 반복하면 O(n²)입니다.
- capacity를 넘을 때마다 재할당 + 전체 복사/이동이 일어나고, 그 순간 구/신 블록이 동시에 존재해 메모리가 일시적으로 약 2.5배 필요합니다. 재할당 시점에 스파이크가 튀어 프레임/틱이 흔들릴 수 있습니다.
- 반복자/포인터 무효화: 재할당되면 전부, 아니어도 insert 지점 이후는 무효화됩니다. 다른 객체가 vector 원소의 포인터를 들고 있으면 Dangling이 됩니다.
- 큰 연속 블록을 반복 할당/해제하면 힙 단편화가 생길 수 있고, 아주 크면 연속 공간을 못 찾아 할당 실패할 수 있습니다.
- 대응: `reserve()`, 끝에만 추가하기, 순서가 상관없는 삭제는 swap-and-pop, 앞뒤 삽입이 많으면 deque, 원소 주소가 고정되어야 하면 인덱스/핸들로 참조.

### Q12. list와 unordered_map은 vector와 달리 어떤 문제가 있나?
둘 다 노드 기반이라, 원소를 넣을 때마다 작은 new/delete가 일어난다는 것이 핵심입니다.

- 할당 횟수 자체가 많아 할당자 비용이 누적되고, 멀티스레드면 힙 락 경합이 생깁니다(Q13과 연결).
- 작은 블록이 흩어져 힙 단편화가 생기고, 포인터/헤더 오버헤드로 실제 데이터보다 메모리를 훨씬 많이 씁니다.
- 캐시 지역성이 나빠 순회/조회가 느립니다.
- unordered_map 고유: rehash 시 일시에 전체를 재배치해 스파이크가 생기고 반복자가 무효화됩니다. 해시 함수가 나쁘면 충돌이 쏠려 O(n)으로 떨어지고, 외부 입력을 키로 쓰면 해시 DoS 공격 대상이 됩니다.
- 반대로 장점은 삽입/삭제 시 다른 원소의 주소가 안 바뀐다는 것입니다.
- 대응: 노드 풀/전용 Allocator, `reserve()`로 버킷 미리 확보, 필요하면 open addressing 해시맵(abseil flat_hash_map, robin hood 등)으로 교체.

### Q13. 멀티스레드에서 new/delete가 반복되면?
- 힙 락 경합: 기본 힙은 프로세스 공유 자원이라 동기화가 필요합니다. 스레드들이 동시에 할당하면 락을 두고 대기하며 컨텍스트 스위칭까지 발생해 스케일이 안 됩니다. (Windows는 LFH가 있어 많이 개선됐지만 완전하지 않습니다.)
- 단편화: 크기가 다양한 블록이 섞여 장기 구동 서버의 메모리 사용량이 점점 부풀고 큰 할당이 실패할 수 있습니다.
- False Sharing: 서로 다른 스레드가 쓰는 작은 객체가 같은 캐시라인에 배치될 수 있습니다.
- 시스템 콜: 힙이 커지/줄어들 때 OS 호출(VirtualAlloc 등)과 Page Fault가 동반됩니다.
- 다른 스레드에서 할당한 것을 해제하는 패턴(네트워크 스레드가 만든 패킷을 로직 스레드가 해제)은 스레드 로컬 처리를 무력화해 더 비쌉니다.

### Q14. 병목이 생기면 어떻게 해결하는가?
먼저 프로파일러(VTune, Superluminal, ETW/WPA)로 락 대기가 정말 할당자에서 나오는지 확인한 뒤 단계적으로 접근합니다.

1. 할당 자체를 줄이기: reserve, 객체 재사용, 스택/임시 버퍼 활용, 값 타입 사용.
2. 메모리 풀: 자주 쓰는 고정 크기 객체(패킷 버퍼, 세션, 아이템)는 미리 덩어리로 잡아 free-list로 관리합니다. 크기 클래스별 풀도 동일.
3. 스레드 로컬 캐시(TLS): 풀을 스레드별로 두어 락 없이 할당하고, 남거나 부족할 때만 묶음 단위로 전역 풀과 교환합니다. 전역 풀은 lock-free 스택(SLIST)이나 짧은 SpinLock으로.
4. 검증된 할당자로 교체: tcmalloc, jemalloc, mimalloc은 이미 스레드 캐시 구조라 전역 operator new만 바꿔도 큰 효과가 있습니다.
5. 구조 변경: 틱/요청 단위 임시 데이터는 Arena(Linear) 할당자로 포인터만 올리다가 한 번에 리셋합니다. 스레드 간 할당/해제가 엇갈리지 않도록 소유권을 정리합니다.

### Q15. unordered_map에서 데이터를 찾아가는 과정
1. key를 hash 함수에 넣어 size_t 해시값을 구합니다.
2. 버킷 인덱스로 변환합니다. GCC는 소수 크기 버킷에 `hash % bucket_count`, MSVC는 2의 거듭제곱 크기에 `hash & (n-1)`.
3. 해당 버킷의 노드 체인을 따라가며 각 노드의 key와 operator==로 비교합니다(구현에 따라 저장된 해시값을 먼저 비교).
4. 일치하면 해당 노드의 반복자를, 버킷 끝까지 없으면 `end()`를 반환합니다.

설명 포인트: 해시 계산 + 버킷 접근 + 노드 포인터 추적 때문에 캐시 미스가 최소 1~2번 생기므로, O(1)이어도 작은 데이터에서는 vector 선형 탐색보다 느릴 수 있습니다. 문자열 키는 해시 계산 비용도 큽니다.

### Q16. vector는 메모리에 데이터를 어떻게 적재하는가?
- vector 객체 자체(포인터 3개, 24B)는 선언된 곳(스택/멤버)에 있고, 원소들은 Allocator가 힙에 할당한 하나의 연속 블록에 타입 크기 간격으로 빈틈없이 나열됩니다. `&v[i] == v.data() + i`가 표준으로 보장되어 C API에 그대로 넘길 수 있습니다.
- [begin, end)는 생성된 객체, [end, capacity)는 할당만 되고 객체는 없는 raw 메모리입니다. push_back/emplace_back은 그 자리에 placement new로 객체를 생성합니다.
- 그래서 `reserve`는 생성자를 호출하지 않고, `resize`는 기본 생성자를 호출합니다.
- `vector<bool>`은 예외로 비트 단위로 패킹되어 실제 bool 객체가 아닙니다.
- 포인터를 담으면(`vector<T*>`) 포인터만 연속이고 실제 객체는 흩어져 있어서, 캐시 이점을 얻으려면 값으로 담는 것이 좋습니다.

## MSSQL / Allocator (Q17~Q18)

### Q17. SP에 여러 Row를 한 번에 넘기려면?
Table-Valued Parameter(TVP)를 씁니다. 테이블 타입을 정의하고 SP가 그 타입을 READONLY 파라미터로 받습니다.

```sql
CREATE TYPE dbo.ItemTableType AS TABLE (
    ItemUID BIGINT PRIMARY KEY,
    ItemID  INT,
    Count   INT
);

CREATE PROCEDURE dbo.usp_InsertItems
    @CharID BIGINT,
    @Items  dbo.ItemTableType READONLY
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.Inventory (CharID, ItemUID, ItemID, Count)
    SELECT @CharID, ItemUID, ItemID, Count FROM @Items;
END
```

- 서버 쪽에서는 ODBC의 SQL_SS_TABLE 바인딩이나 OLE DB, ADO.NET의 DataTable/SqlDataRecord로 넘깁니다.
- 장점: 호출 1회로 네트워크 왕복과 SP 호출 비용이 줄고, 여러 Row를 하나의 트랜잭션으로 원자적으로 처리하며, 타입이 강제되고 집합 연산(INSERT…SELECT, MERGE, JOIN)을 쓸 수 있습니다.
- 대안: 문자열을 구분자로 이어 STRING_SPLIT, XML/JSON(OPENJSON) 파싱, 대량 적재는 BULK INSERT/bcp. 다만 파싱 비용과 타입 안정성 때문에 TVP를 선호합니다.
- 주의: 테이블 변수처럼 통계가 없어 대량 Row면 실행 계획이 나빠질 수 있고(2019부터 지연 컴파일로 개선), 타입을 쓰는 SP가 있으면 타입을 ALTER할 수 없어 배포 절차가 번거롭습니다.

경험 답변 틀: "인벤토리 일괄 저장 / 우편 다중 수령 / 거래 아이템 묶음 처리에 TVP를 써서, Row별로 SP를 N번 호출하던 것을 1번으로 줄였고 트랜잭션도 하나로 묶었습니다." → 실제 사례와 수치(호출 수, 응답 시간)로 채워두기. 없다면 솔직히 "직접 써본 건 OO이고, TVP는 이런 이유로 쓸 것"이라고 답하는 게 낫습니다.

### Q18. STL Allocator를 직접 바꿔본 경험이 있는가?
Allocator는 컨테이너가 메모리를 어디서 어떻게 얻을지를 정하는 템플릿 인자입니다. C++11 이후에는 `value_type`, `allocate`, `deallocate`, 동등 비교, rebind 생성자만 있으면 나머지는 `allocator_traits`가 채워줍니다.

```cpp
template <typename T>
struct PoolAllocator {
    using value_type = T;
    PoolAllocator() noexcept = default;
    template <typename U> PoolAllocator(const PoolAllocator<U>&) noexcept {}
    T* allocate(size_t n) { return static_cast<T*>(MemoryPool::Alloc(n * sizeof(T))); }
    void deallocate(T* p, size_t n) noexcept { MemoryPool::Free(p, n * sizeof(T)); }
};
template <typename T, typename U>
bool operator==(const PoolAllocator<T>&, const PoolAllocator<U>&) { return true; }

template <typename T> using xvector = std::vector<T, PoolAllocator<T>>;
```

- 포인트: list/map/unordered_map은 T가 아니라 내부 노드 타입으로 rebind해서 할당하므로, 크기 클래스 기반 풀이 노드 크기를 처리할 수 있어야 합니다.
- C++17 `std::pmr`(polymorphic_allocator + monotonic_buffer_resource, unsynchronized/synchronized_pool_resource)을 쓰면 타입을 바꾸지 않고 런타임에 메모리 소스를 교체할 수 있습니다. 틱 단위 임시 컨테이너에 적합합니다.
- 주의: 상태 있는 Allocator는 컨테이너 간 swap/move 시 동등성과 propagate 설정을 신경 써야 하고, Allocator가 다르면 타입이 달라져 함수 인자로 주고받기 불편합니다.

경험 답변 틀: "회사 서버 코어에 메모리 풀 기반 Allocator가 있어 xvector/xmap 같은 별칭으로 썼고, 누수 추적/통계를 위해 쓰였습니다" 또는 "직접 구현한 적은 없고 tcmalloc으로 전역 할당자를 교체해봤다" 등 실제 경험에 맞게.

## 실제 업무 / 프로젝트 (Q19~Q22)
이 파트는 본인 경험이 답이라, 업계에서 통용되는 설계를 기준으로 틀을 잡아두었습니다. 실제 구조에 맞게 고쳐 쓸 것.

### Q19. 거래소는 여러 서버가 같은 매물을 보는 형태였는가?
답변 틀: "네, 여러 게임 서버(월드)가 하나의 거래소를 공유했고, 매물은 거래소 전용 서버와 거래소 DB가 단일 소유했습니다."

- 핵심은 매물 상태의 단일 소유자(Single Source of Truth)를 두는 것입니다. 게임 서버는 조회 요청만 하고, 등록/구매/취소는 거래소 서버를 거쳐서만 상태가 바뀝니다.
- 동일 매물 동시 구매는 DB에서 조건부 UPDATE(`UPDATE ... SET State='Reserved' WHERE ListingID=@id AND State='OnSale'`, 영향 행 수로 성공 판단)나 버전 컬럼(낙관적 락)으로 한 명만 성공하게 만듭니다.
- 목록 조회는 부하가 크므로 캐시(Redis 등)나 읽기 전용 복제본에서 처리하고, 구매 시점에만 원본으로 재검증합니다. "목록에는 보였는데 이미 팔린 매물"은 허용하는 최종 일관성 구조입니다.

### Q20. 서버마다 DB가 다르면 하나의 Transaction을 걸 수 없는데, 어떻게 해결했는가?
분산 트랜잭션(2PC/MSDTC)은 코디네이터 장애 시 락이 묶이고 성능이 나빠 쓰지 않고, 거래 단계를 로컬 트랜잭션 여러 개로 나누는 Saga + 거래 로그(상태 머신) 방식으로 해결합니다.

1. 거래마다 고유 TransactionID를 발급하고, 거래 로그 테이블에 상태를 기록합니다: `Started → Reserved(매물 예약) → Paid(재화 차감) → Delivered(아이템 지급) → Completed`.
2. 각 단계는 그 DB의 로컬 트랜잭션 하나에서 "데이터 변경 + 해당 TransactionID 처리 기록"을 함께 커밋합니다(Outbox/처리 내역 테이블).
3. 모든 단계는 멱등하게 만듭니다. TransactionID에 UNIQUE 제약을 걸어 같은 요청이 재시도되어도 두 번 차감/지급되지 않습니다.
4. 중간 단계가 실패하면 보상 트랜잭션(재화 환불, 매물 예약 해제)을 실행하거나, 앞으로 진행(재시도)합니다. 재화가 나간 뒤에는 되돌리기보다 지급을 완수하는 쪽(roll-forward)을 우선합니다.
5. 미완료 거래는 주기적 스캐너(배치)가 찾아 재처리하고, 일정 횟수 실패하면 운영 알림 + 수동 처리로 넘깁니다. 주기적으로 양쪽 DB를 대조하는 Reconciliation도 둡니다.

### Q21. 재화 차감 후 아이템 지급 전에 서버가 Crash되면?
로그 상태가 `Paid`에서 멈춘 거래가 되므로, 복구 시 이를 찾아 지급을 끝까지 완료합니다.

1. 재화 차감과 "Paid" 기록을 같은 DB 트랜잭션으로 커밋했기 때문에, 차감됐는데 기록이 없는 상태는 존재하지 않습니다.
2. 서버 재시작 시(또는 주기적 배치가) `Paid`에 머물러 있는 거래를 조회해 지급을 재시도합니다.
3. 지급 단계는 TransactionID로 멱등해서, 사실 지급은 됐는데 상태 갱신 전에 죽은 경우에도 중복 지급이 없습니다.
4. 인벤토리가 가득 찼거나 캐릭터가 오프라인이면 우편함(지급 대기함)으로 보내 지급을 확정합니다. 실무적으로 거래소 지급을 처음부터 우편으로 하는 것도 이 문제를 단순하게 만드는 방법입니다.
5. 재시도 후에도 실패하면 재화를 환불하는 보상 트랜잭션을 수행하고, 전 과정을 로그로 남겨 CS 대응이 가능하게 합니다.

핵심 문장: "재화와 아이템을 한 트랜잭션으로 묶을 수 없다면, 각 단계를 기록과 함께 커밋하고 멱등하게 만들어, 어느 지점에서 죽어도 로그를 보고 이어서 진행할 수 있게 했습니다."

### Q22. 가장 성취감이 컸던 작업은?
STAR 구조로 1분 안에 말할 수 있게 준비합니다.

- 상황(Situation): 어떤 문제가 있었는가 (예: 장애, 성능 한계, 복사 버그, 신규 시스템).
- 과제(Task): 내 역할과 제약 (일정, 라이브 서비스 중).
- 행동(Action): 내가 한 기술적 판단 — 왜 그 방법을 택했고 무엇을 버렸는가.
- 결과(Result): 수치 (동접 n배, CPU n% 감소, 장애 0건, CS n건 감소).

팁: 앞의 기술 질문(메모리 풀, 락 경합, 거래 정합성)과 연결되는 사례를 고르면 꼬리 질문에 자신 있게 답할 수 있습니다. 혼자 한 것과 팀이 한 것을 구분해서 말하세요.

## AI 활용 / 인성 / 자기평가 / 마무리 (Q23~Q27)

### Q23. AI를 업무나 개발에 활용해본 경험이 많은가?
"많이 씁니다"에서 끝내지 말고, 어디에 쓰고 어디에는 안 쓰는지와 검증 방식을 함께 말하는 것이 포인트입니다.

- 활용처 예: 반복 코드(패킷 정의, SP/DB 바인딩, 테스트) 생성, 생소한 코드베이스 파악, 크래시 덤프/로그 분석 보조, 쿼리 튜닝 아이디어, 코드 리뷰 보조, 문서화.
- 주의하는 곳: 동시성·메모리 수명·거래 정합성 같은 핵심 로직은 AI 결과를 그대로 쓰지 않고 직접 검증합니다. 사내 코드/유저 데이터 유출 정책도 지킵니다.
- 답변 예: "코드 생산보다는 탐색과 반복 작업 자동화에 쓰고, 서버 핵심 로직은 제가 설계하고 AI는 리뷰어로 씁니다. 예를 들어 OO 작업에서 작업 시간을 절반 정도 줄였습니다." → 실제 사례 1개를 수치와 함께 넣을 것.

### Q24. 본인의 장점과 단점은?
장점은 사례로 증명하고, 단점은 직무에 치명적이지 않은 것 + 개선 중인 행동을 함께 말합니다.

- 장점 예: "장애가 나면 추측보다 재현과 데이터로 원인을 끝까지 파고듭니다. OO 이슈 때 덤프와 로그를 추적해 근본 원인을 찾아 재발을 막았습니다."
- 단점 예: "한 문제에 너무 깊이 파고들어 시간을 더 쓸 때가 있어, 지금은 작업 전에 타임박스를 정하고 일정 시간이 지나면 동료와 공유합니다."
- 피할 것: 완벽주의 같은 위장 장점형 단점, 협업/책임감 자체에 대한 단점.

### Q25. 동료들은 본인을 어떻게 평가한다고 생각하는가?
실제 피드백(동료 평가, 리뷰 코멘트, 팀장 면담)을 근거로 드는 것이 가장 설득력 있습니다.

- 예: "물어보면 확실하게 답을 주는 사람, 맡기면 끝까지 책임지는 사람이라는 말을 들었습니다. 실제로 장애 대응이나 다른 파트 문의가 자주 저에게 왔습니다."
- 균형을 위해 개선점 하나도 덧붙이면 자기 객관화가 된 사람으로 보입니다(예: "리뷰가 꼼꼼해서 처음에는 부담스럽다는 말도 들어, 지금은 필수/제안을 구분해서 남깁니다").

### Q26. 서버 개발 능력을 1~10점으로 매긴다면?
점수 자체보다 기준과 근거를 보는 질문입니다. 보통 6~7점이 가장 무난하고, 9~10점은 꼬리 질문을 부르고 4점 이하는 지원 동기와 충돌합니다.

- 답변 예: "7점입니다. 라이브 서비스에서 콘텐츠 서버와 DB 연동, 거래 같은 정합성이 중요한 시스템을 혼자 설계하고 운영할 수 있는 수준이라고 생각합니다. 다만 엔진/네트워크 코어를 처음부터 설계하거나 대규모 분산 구조를 총괄한 경험은 아직 부족해서, 그 부분을 채우면 8~9점이라고 봅니다."
- 구조: 점수 → 할 수 있는 것(근거) → 부족한 것 → 어떻게 채울지. 부족한 부분을 NC에서 얻고 싶은 것과 연결하면 자연스럽습니다.

### Q27. 마지막으로 궁금한 점이 있는가?
"없습니다"는 피하고, 팀과 업무에 대한 관심을 보여주는 질문 1~2개를 골라두세요. 연봉·복지는 처우 협상 단계에서 묻는 것이 좋습니다.

- "프로젝트 NL 서버는 어떤 구조(엔진, 서버 아키텍처, DB)로 되어 있고, 제가 합류하면 어떤 영역을 맡게 될까요?"
- "오늘 면접에서 메모리/거래 정합성 질문이 많았는데, 현재 팀이 가장 중요하게 보는 기술적 과제가 무엇인가요?"
- "팀에서 AI 도구를 개발에 어떻게 활용하고 있나요?"
- "입사하면 초반 3개월에 기대하시는 성과는 무엇인가요?"
