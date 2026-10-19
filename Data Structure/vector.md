# vector
> 📌 기출: [NC Project NL Q6, Q11, Q16](../Interview/NC_Project_NL_%EB%A9%B4%EC%A0%91_%EC%A7%88%EB%AC%B8.md) - vector의 메모리 관리 / 계속 insert할 때의 문제 / 메모리 적재 방식

- 힙에 **하나의 연속된 배열** 을 잡고 관리하는 동적 배열
- 임의 접근 O(1), 끝 삽입 분할 상환 O(1), 중간 삽입/삭제 O(n)

---

## 메모리 구조 (Q16)
- vector 객체 자체는 **포인터 3개(24B)** 만 들고 있고, 선언된 곳(스택/멤버)에 있습니다.
    - `begin`: 첫 원소
    - `end`: 마지막 원소 다음
    - `capacity end`: 할당된 블록의 끝
- 원소들은 Allocator가 힙에 할당한 연속 블록에 **타입 크기 간격으로 빈틈없이** 나열됩니다.
- `&v[i] == v.data() + i`가 표준으로 보장되어 C API에 그대로 넘길 수 있습니다.

```
힙 (연속 블록)
┌────┬────┬────┬────┬────┬────┐
│ e0 │ e1 │ e2 │ e3 │    │    │
└────┴────┴────┴────┴────┴────┘
↑                   ↑         ↑
begin               end       capacity end
|<-- 생성된 객체 -->|<- raw ->|
```

- `[begin, end)`는 생성된 객체, `[end, capacity)`는 할당만 되고 객체는 없는 raw 메모리입니다.
- `push_back` / `emplace_back`은 그 자리에 **placement new** 로 객체를 생성합니다.
- 그래서 `reserve`는 생성자를 호출하지 않고, `resize`는 기본 생성자를 호출합니다.
- `vector<bool>`은 예외로 비트 단위로 패킹되어 실제 bool 객체가 아닙니다.
- `vector<T*>`는 포인터만 연속이고 실제 객체는 흩어져 있어, 캐시 이점을 얻으려면 값으로 담는 것이 좋습니다.

---

## 재할당 (Q6)
- `size`가 `capacity`를 넘으면
    1. 더 큰 블록을 새로 할당 (MSVC 1.5배, GCC 2배)
    2. 기존 원소를 이동 (move 생성자가 `noexcept`면 move, 아니면 copy)
    3. 이전 블록 해제
- 그래서 `push_back`은 **분할 상환 O(1)** 입니다.
- 재할당되면 **모든 반복자/포인터/참조가 무효화** 됩니다.
- `clear()`는 소멸자만 부르고 capacity는 유지합니다. 메모리를 반납하려면 `shrink_to_fit`이나 swap trick을 씁니다.

```cpp
std::vector<int> v;
v.reserve(1000);                 // 재할당 방지
std::vector<int>().swap(v);      // 메모리까지 반납 (swap trick)
```

---

## 계속 insert할 때의 문제 (Q11)
|문제|설명|
|---|---|
|O(n) 이동|중간/앞 insert는 뒤의 원소를 전부 한 칸씩 밀어야 함. 반복하면 O(n²)|
|재할당 스파이크|capacity 초과 시 전체 복사/이동. 구/신 블록이 동시에 존재해 메모리가 일시적으로 약 2.5배 필요|
|반복자 무효화|재할당되면 전부, 아니어도 insert 지점 이후는 무효화. 외부에서 들고 있던 포인터가 Dangling이 됨|
|단편화|큰 연속 블록 반복 할당/해제로 힙 단편화, 아주 크면 연속 공간 부족으로 할당 실패|

### 대응
- `reserve()`로 미리 확보
- 끝에만 추가하기
- 순서가 상관없는 삭제는 **swap-and-pop**
- 앞뒤 삽입이 많으면 `deque`
- 원소 주소가 고정되어야 하면 인덱스/핸들로 참조

```cpp
// swap-and-pop: 순서 상관없는 O(1) 삭제
void RemoveAt(std::vector<T>& v, size_t i) {
    std::swap(v[i], v.back());
    v.pop_back();
}
```

- 관련 문서: [vector_vs_list](./vector_vs_list.md)
