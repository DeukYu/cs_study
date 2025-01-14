### [C++] smart pointer
- 메모리 관리를 자동화하여 **메모리 누수(memory leak)**와 같은 문제를 방지하는 도구
- 객체의 소유권을 관리하고, 더이상 사용하지 않는 객체의 메모리를 자동으로 해체

## 스마트 포인터의 기본 원리
- 스마트 포인터는 기본 포인터를 래핑하여 객체를 자동으로 관리
- 스마트 포인터가 소멸되면 소유하고 있는 객체의 메모리를 자동으로 해체
- RAII(Resource Acquisition Is Initialization) 원칙을 따름 (리소스의 소유권은 객체의 생애 주기에 따라 관리)

## `std::unique_ptr`
### 특징
- 단일 소유권을 가진 스마트 포인터입니다. 하나의 `std::unique_ptr`만 특정 객체를 소유할 수 있습니다.
- 복사 불가능하지만, **이동(transfer)**은 가능합니다.
- 가장 가벼운 스마트 포인터로 성능이 좋습니다.
### 예시
- 한 사람이 물건을 소유하며, 다른 사람에게 줄 때는 반드시 소유권을 넘겨야 합니다.
### 예제
```cpp
#include <iostream>
#include <memory>

int main() {
    std::unique_ptr<int> uptr1 = std::make_unique<int>(10); // 10을 가리키는 unique_ptr 생성
    std::cout << *uptr1 << std::endl; // 10 출력

    // std::unique_ptr<int> uptr2 = uptr1; // 복사 불가능 (컴파일 오류)
    std::unique_ptr<int> uptr2 = std::move(uptr1); // 소유권 이동
    std::cout << *uptr2 << std::endl; // 10 출력
    return 0;
}
```
## `std::shared_ptr`
### 특징
- 여러 스마트 포인터가 동일한 객체를 공유할 수 있습니다.
- 내부적으로 **참조 카운팅(reference counting)** 을 사용합니다.
- 참조 카운트가 0이 되면 객체가 삭제됩니다.
### 예시
- 여러 사람이 같은 물건을 공유하며, 마지막 사람이 물건을 반납하면 물건이 처리됩니다.
### 예제
```cpp
#include <iostream>
#include <memory>

int main() {
    std::shared_ptr<int> sptr1 = std::make_shared<int>(10); // 10을 가리키는 shared_ptr 생성
    std::shared_ptr<int> sptr2 = sptr1; // 동일한 객체를 공유

    std::cout << *sptr1 << std::endl; // 10 출력
    std::cout << sptr1.use_count() << std::endl; // 참조 카운트: 2

    sptr2.reset(); // sptr2가 객체를 더 이상 참조하지 않음
    std::cout << sptr1.use_count() << std::endl; // 참조 카운트: 1
    return 0;
}
```
## `std::weak_ptr`
- **shared_ptr** 로 관리되는 객체를 참조할 수 있지만, 참조 카운트에는 영향을 미치지 않습니다.
- **순환 참조(circular reference)** 문제를 해결하기 위해 사용됩니다.
### 예시
- 친구가 물건을 빌려주었는데, 물건을 직접 소유하지 않고 빌려만 쓰는 상태입니다.
### 예제
```cpp
#include <iostream>
#include <memory>

int main() {
    std::shared_ptr<int> sptr = std::make_shared<int>(10);
    std::weak_ptr<int> wptr = sptr; // sptr이 소유하는 객체를 weak_ptr로 참조

    if (auto locked = wptr.lock()) { // 객체가 유효하면 사용
        std::cout << *locked << std::endl; // 10 출력
    }

    sptr.reset(); // 객체가 삭제됨
    if (wptr.expired()) {
        std::cout << "Object has been deleted." << std::endl; // 출력됨
    }
    return 0;
}

```

## 스마트 포인터 사용 시 주의사항
- 순환 참조 방지
    - `std::shared_ptr`를 서로 참조하면 참조 카운트가 0이 되지 않는 문제가 발생할 수 있습니다.
    - 이를 해결하기 위해 `std::weak_ptr`을 사용합니다.
- 실시간 시스템
    - `std::shared_ptr`의 참조 카운트 증가/감소는 **원자적 연산**이므로 성능에 영향을 줄 수 있습니다.
    - 성능이 중요한 경우 `std::unique_ptr`을 선호합니다.
- 기본 포인터와 혼용 금지
    - 스마트 포인터와 기본 포인터를 혼용하면 메모리 관리 문제를 초래할 수 있습니다.

## 스마트 포인터의 선택 기준
- `std::unique_ptr`: 객체의 소유권이 단일하며, 이동만 허용될 때.
- `std::shared_ptr`: 객체를 여러 곳에서 공유해야 할 때.
- `std::weak_ptr`: std::shared_ptr의 순환 참조 문제를 방지할 때.

## 순환 참조 문제
### 순환 참조 문제 발생
```cpp
#include <iostream>
#include <memory>

class B; // 클래스 B의 전방 선언

class A {
public:
    std::shared_ptr<B> b_ptr; // A는 B를 shared_ptr로 참조
    ~A() { std::cout << "A destroyed\n"; }
};

class B {
public:
    std::shared_ptr<A> a_ptr; // B는 A를 shared_ptr로 참조
    ~B() { std::cout << "B destroyed\n"; }
};

int main() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();

    a->b_ptr = b; // A가 B를 참조
    b->a_ptr = a; // B가 A를 참조

    return 0;
}
```
- 결과 분석
    - `a`와 `b`는 서로를 `std::shared_ptr`로 참조하고 있어 참조 카운트가 증가합니다.
    - main 함수가 끝나도 `a`와 `b`의 참조 카운트가 0이 되지 않기 때문에 메모리가 해제되지 않습니다.
    - 출력 결과:
        ```bash
        (소멸자가 호출되지 않음)
        ```
    - 문제:
        - 순환 참조로 인해 `a`와 `b` 객체의 메모리가 누수됩니다.

## 순환 참조 해결 방법
- `std::weak_ptr` 사용 
    - `std::weak_ptr`는 `shared_ptr`의 객체를 참조하지만, 참조 카운트에는 영향을 주지 않습니다. 이를 사용해 순환 참조를 방지할 수 있습니다.
    ```cpp
    #include <iostream>
    #include <memory>

    class B;

    class A {
    public:
        std::shared_ptr<B> b_ptr; // A는 B를 shared_ptr로 참조
        ~A() { std::cout << "A destroyed\n"; }
    };

    class B {
    public:
        std::weak_ptr<A> a_ptr; // B는 A를 weak_ptr로 참조
        ~B() { std::cout << "B destroyed\n"; }
    };

    int main() {
        auto a = std::make_shared<A>();
        auto b = std::make_shared<B>();

        a->b_ptr = b; // A가 B를 참조
        b->a_ptr = a; // B가 A를 weak_ptr로 참조

        return 0;
    }
    ```
    - 이제 `b->a_ptr`은 `weak_ptr`이므로, `A`의 참조 카운트는 증가하지 않습니다.
    - `main` 함수가 종료되면 `a`와 `b`의 참조 카운트가 0이 되고, 메모리가 정상적으로 해제됩니다.
    ```bash
    B destroyed
    A destroyed
    ```