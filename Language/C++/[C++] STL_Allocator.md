### [C++] STL Allocator
> 📌 기출: [NC Project NL Q18](../../Interview/NC_Project_NL_%EB%A9%B4%EC%A0%91_%EC%A7%88%EB%AC%B8.md) - STL Container의 Allocator를 직접 바꿔본 경험이 있는가?

- 컨테이너가 메모리를 **어디서, 어떻게** 얻을지를 정하는 템플릿 인자
- `std::vector<T, Allocator = std::allocator<T>>`처럼 모든 STL 컨테이너가 받습니다.
- 기본값 `std::allocator`는 내부적으로 `operator new` / `operator delete`를 호출합니다.

## 최소 구현 (C++11 이후)
- `value_type`, `allocate`, `deallocate`, 동등 비교, rebind 생성자만 있으면 나머지는 `std::allocator_traits`가 채워줍니다.

```cpp
template <typename T>
struct PoolAllocator {
    using value_type = T;

    PoolAllocator() noexcept = default;
    template <typename U> PoolAllocator(const PoolAllocator<U>&) noexcept {}

    T* allocate(size_t n) {
        return static_cast<T*>(MemoryPool::Alloc(n * sizeof(T)));
    }
    void deallocate(T* p, size_t n) noexcept {
        MemoryPool::Free(p, n * sizeof(T));
    }
};

template <typename T, typename U>
bool operator==(const PoolAllocator<T>&, const PoolAllocator<U>&) { return true; }

template <typename T>
using xvector = std::vector<T, PoolAllocator<T>>;
```

## 주의점
- **rebind**
    - `list` / `map` / `unordered_map`은 `T`가 아니라 **내부 노드 타입** 으로 rebind해서 할당합니다.
    - 그래서 크기 클래스 기반 풀이 노드 크기를 처리할 수 있어야 합니다.
- **상태 있는 Allocator**
    - 컨테이너 간 swap/move 시 동등성과 `propagate_on_container_*` 설정을 신경 써야 합니다.
- **타입 분리**
    - Allocator가 다르면 컨테이너 타입이 달라져(`vector<int>` ≠ `xvector<int>`) 함수 인자로 주고받기 불편합니다.

## std::pmr (C++17)
- `polymorphic_allocator`를 쓰면 **타입을 바꾸지 않고** 런타임에 메모리 소스를 교체할 수 있습니다.

```cpp
#include <memory_resource>

char buffer[4096];
std::pmr::monotonic_buffer_resource pool(buffer, sizeof(buffer));
std::pmr::vector<int> v(&pool);   // buffer에서 할당, 해제는 pool 소멸 시 일괄
```

|memory_resource|특징|
|---|---|
|`monotonic_buffer_resource`|포인터만 올리는 Arena. 개별 해제 없음, 가장 빠름|
|`unsynchronized_pool_resource`|크기 클래스별 풀, 단일 스레드용|
|`synchronized_pool_resource`|크기 클래스별 풀, 멀티스레드용|

- 틱/요청 단위 임시 컨테이너에 특히 적합합니다.
- 관련 문서: [멀티스레드_메모리_할당](../../Operating%20System/%EB%A9%80%ED%8B%B0%EC%8A%A4%EB%A0%88%EB%93%9C_%EB%A9%94%EB%AA%A8%EB%A6%AC_%ED%95%A0%EB%8B%B9.md)
