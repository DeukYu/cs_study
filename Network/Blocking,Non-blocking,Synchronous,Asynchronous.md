### Blocking,Non-blocking,Synchronous,Asynchronous
![image](https://github.com/user-attachments/assets/4ab78202-45ef-4c4b-a3cc-4fa82152ccb9)
- 이 4가지 개념은 프로그램의 실행 흐름(특히 I/O 처리, 함수 호출, 작업 처리 등)에 영향을 미치는 방식에 대한 개념

## Blocking (블로킹)
### 정의
- 호출된 함수가 작업을 완료할 때까지 호출한 쪽(예: 메인 스레드)이 멈추고 기다리는 방식입니다.
- 작업이 끝날 때까지 다른 작업은 진행되지 않습니다.
### 특징
- **제어권** 이 호출된 함수에 넘어가며, 결과를 기다립니다.
- 작업이 완료되기 전까지 호출한 쪽의 실행은 중단됩니다.

### 예시
- C++ 예시   
```cpp
#include <iostream>
#include <thread>
#include <chrono>

void blockingFunction() {
    std::cout << "Start blocking operation...\n";
    std::this_thread::sleep_for(std::chrono::seconds(3)); // 3초 동안 대기
    std::cout << "Blocking operation finished.\n";
}

int main() {
    std::cout << "Before blocking function.\n";
    blockingFunction(); // 작업 완료까지 대기
    std::cout << "After blocking function.\n";
    return 0;
}
```
- 출력
```bash
Before blocking function.
Start blocking operation...
(3초 대기)
Blocking operation finished.
After blocking function.
```

## Non-blocking (논블로킹)
### 정의
- 호출된 함수가 작업을 요청한 후 바로 **제어권을 호출한 쪽으로 반환** 하는 방식입니다.
- 작업이 완료되지 않아도 호출자는 다른 작업을 계속 진행할 수 있습니다.
### 특징
- 호출자는 작업의 완료 여부를 확인하거나, 나중에 처리 결과를 받을 수 있습니다.
- 즉가적으로 응답이 반환되며, 결과는 나중에 확인합니다.
### 예시
- C++ 예시
```cpp
#include <iostream>
#include <thread>
#include <chrono>

void nonBlockingFunction() {
    std::cout << "Start non-blocking operation...\n";
    std::this_thread::sleep_for(std::chrono::seconds(3)); // 3초 동안 대기
    std::cout << "Non-blocking operation finished.\n";
}

int main() {
    std::cout << "Before non-blocking function.\n";
    std::thread t(nonBlockingFunction); // 별도 스레드로 작업 실행
    std::cout << "Doing other work while non-blocking operation is running.\n";
    t.join(); // 스레드가 끝날 때까지 대기
    std::cout << "After non-blocking function.\n";
    return 0;
}
```
- 출력
```bash
Before non-blocking function.
Doing other work while non-blocking operation is running.
Start non-blocking operation...
(3초 대기)
Non-blocking operation finished.
After non-blocking function.
```

## Synchronous (동기적)
### 정의
- 작업이 순차적으로 실행되며, **각 작업이 끝난 후 다음 작업을 실행** 합니다.
- 호출된 함수가 결과를 반환할 때까지 호출자는 기다립니다.
### 특징
- 함수 호출과 결과가 반환되는 시점이 항상 **동기**되어 있음
- 작업이 순서대로 실행되기 때문에 간단하지만, 느릴 수 있습니다.
### 예시
- C++ 예시
```cpp
#include <iostream>
#include <thread>
#include <chrono>

void task1() {
    std::cout << "Task 1: Start\n";
    std::this_thread::sleep_for(std::chrono::seconds(2)); // 2초 대기
    std::cout << "Task 1: End\n";
}

void task2() {
    std::cout << "Task 2: Start\n";
    std::this_thread::sleep_for(std::chrono::seconds(1)); // 1초 대기
    std::cout << "Task 2: End\n";
}

int main() {
    std::cout << "Start\n";
    task1(); // 동기적으로 실행
    task2(); // task1이 끝난 후 실행
    std::cout << "End\n";
    return 0;
}
```

## Asynchronous (비동기적)
### 정의
- 작업 요청을 보내고, 요청이 완료되기를 기다리지 않고 **다른 작업을 수행** 하는 방식입니다.
- 비동기 함수는 호출과 작업 완료가 독립적이며, 작업이 완료되면 **콜백 함수** 나 **Future/Promise** 를 통해 결과를 처리합니다.
### 특징
- 작업 완료를 기다리지 않고 다른 작업을 수행할 수 있어 효율적
- 멀티태스킹과 유사하지만, 일반적으로 단일 스레드에서 구현 가능
### 예시
- C++ 예시
```cpp
#include <iostream>
#include <future>
#include <thread>
#include <chrono>

void asyncTask1() {
    std::cout << "Task 1: Start\n";
    std::this_thread::sleep_for(std::chrono::seconds(2)); // 2초 대기
    std::cout << "Task 1: End\n";
}

void asyncTask2() {
    std::cout << "Task 2: Start\n";
    std::this_thread::sleep_for(std::chrono::seconds(1)); // 1초 대기
    std::cout << "Task 2: End\n";
}

int main() {
    std::cout << "Start\n";
    auto future1 = std::async(std::launch::async, asyncTask1); // 비동기로 실행
    auto future2 = std::async(std::launch::async, asyncTask2); // 비동기로 실행
    future1.get(); // Task1의 결과 대기
    future2.get(); // Task2의 결과 대기
    std::cout << "End\n";
    return 0;
}

```
## 차이점 정리
|구분|Blocking|Non-blocking|Synchronous|Asynchronous|
|---|---------|-----------|------------|------------|
|설명|호출된 함수가 완료될 때까지 멈춤|작업 요청 후 제어권 반환|작업이 순서대로 실행됨|작업 완료를 기다리지 않고 다른 작업 수행|
|작업 흐름|대기 시간 발생|작업 대기 없이 바로 실행|순차적 진행|비순차적 진행|
|예시|파일 읽기 완료까지 대기|파일 읽기 요청 후 다른 작업 진행|A가 끝나야 B 실행|A와 B를 동시에 실행|
|효율성|낮음|상대적으로 높음|간단하지만 비효율적일 수 있음|높은 효율성|

## 참고
- https://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/