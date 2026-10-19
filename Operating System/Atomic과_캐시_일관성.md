# Atomic 연산과 캐시 일관성
> 📌 기출: [NC Project NL Q5](../Interview/NC_Project_NL_%EB%A9%B4%EC%A0%91_%EC%A7%88%EB%AC%B8.md) - atomic<int32_t>에 32개 스레드가 무한히 fetch_add(1)하면 CPU에서는 어떤 일이 벌어지는가?

- **결론**: 결과값은 정확하지만, 하나의 캐시라인을 두고 코어들이 쟁탈전을 벌여 사실상 직렬화되고, 스레드를 늘릴수록 전체 처리량이 오히려 떨어집니다.

---

## CPU에서 일어나는 일
1. **lock 명령으로 컴파일**
    - x86에서 `fetch_add`는 `lock xadd` 명령 하나로 컴파일됩니다.
    - 현대 CPU는 버스 전체를 잠그지 않고 해당 **캐시라인만 잠급니다 (cache lock)**.

2. **MESI 프로토콜에 의한 독점**
    - 쓰기를 하려면 그 코어가 캐시라인을 **Modified / Exclusive** 상태로 독점해야 합니다.
    - 다른 코어들이 가진 사본은 **Invalidate** 됩니다.

3. **Cache Line Ping-Pong**
    - 32개 코어가 동시에 요청하므로 캐시라인 소유권이 코어 사이를 계속 이동합니다.
    - 연산 하나가 L1 지연(수 ns)이 아니라 코어 간/소켓 간 전송 지연(수십~수백 ns)이 됩니다.

4. **파이프라인 정지**
    - lock 명령은 풀 메모리 배리어라 스토어 버퍼를 비우고 파이프라인을 세웁니다.
    - CPU 사용률은 100%인데 대부분 대기(stall) 상태라 실제 일은 거의 하지 않습니다.
    - 인터커넥트(링/메시) 트래픽도 폭증하고, 멀티소켓이면 더 심해집니다.

5. **그 외**
    - 락이 아니므로 Context Switching은 없고 wait-free지만, 코어별 공정성은 보장되지 않습니다.
    - `int32`이므로 언젠가 오버플로우로 wrap-around합니다. (atomic은 UB 없이 2의 보수로 감김)

---

## MESI 상태 요약
|상태|의미|
|---|---|
|Modified|이 코어만 가진 수정된 데이터 (메모리와 다름)|
|Exclusive|이 코어만 가진 깨끗한 데이터|
|Shared|여러 코어가 읽기 전용으로 공유|
|Invalid|무효화된 사본|

---

## 해결책
- **스레드별 로컬 카운터**: `alignas(64)`로 캐시라인을 분리해 두고, 읽을 때만 합산합니다.
- **배칭**: 로컬에서 모았다가 주기적으로 한 번에 더합니다.
- **memory_order_relaxed**: 단순 통계용이면 순서 제약을 없앱니다. (x86에서는 lock 명령 자체는 그대로지만 ARM 등에서는 이득)

```cpp
struct alignas(64) PaddedCounter {
    std::atomic<int64_t> value{0};
};
PaddedCounter counters[32]; // 스레드별 카운터, 서로 다른 캐시라인

int64_t Total() {
    int64_t sum = 0;
    for (auto& c : counters) sum += c.value.load(std::memory_order_relaxed);
    return sum;
}
```

---

## False Sharing
- 서로 **다른 변수** 라도 같은 캐시라인에 있으면 위와 똑같은 Ping-Pong이 발생합니다.
- 스레드별 데이터는 캐시라인 단위로 분리합니다. ([메모리_얼라인먼트](./%EB%A9%94%EB%AA%A8%EB%A6%AC_%EC%96%BC%EB%9D%BC%EC%9D%B8%EB%A8%BC%ED%8A%B8.md))
