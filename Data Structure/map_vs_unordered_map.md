# map vs unordered_map
> 📌 기출: [NC Project NL Q10](../Interview/NC_Project_NL_%EB%A9%B4%EC%A0%91_%EC%A7%88%EB%AC%B8.md) - map은 무엇인가? unordered_map과 어떻게 다른가?

- `std::map`은 **Red-Black Tree** (자가 균형 이진 탐색 트리)로 구현된 **정렬된** key-value 컨테이너
- `std::unordered_map`은 **해시 테이블** 기반의 정렬되지 않은 컨테이너 ([unordered_map](./unordered_map.md))

---

## Red-Black Tree
- 각 노드가 Red/Black 색을 가지며, 아래 규칙으로 트리 높이를 O(log n)으로 유지합니다.
    - 루트와 리프(NIL)는 Black
    - Red 노드의 자식은 모두 Black (Red가 연속될 수 없음)
    - 임의 노드에서 리프까지 가는 모든 경로의 Black 노드 수가 같음
- 삽입/삭제 시 회전(rotation)과 색 변경으로 균형을 맞춥니다.
- AVL보다 균형이 느슨해 조회는 약간 느리지만, 삽입/삭제 시 회전이 적습니다.

---

## 비교
|항목|map|unordered_map|
|---|---|---|
|구조|Red-Black Tree|해시 테이블 (체이닝)|
|검색/삽입/삭제|항상 O(log n)|평균 O(1), 최악 O(n)|
|순서|key 정렬 유지|없음|
|key 요구사항|`operator<`|`hash` + `operator==`|
|범위 검색|`lower_bound` / `upper_bound` 가능|불가|
|반복자 무효화|삭제된 원소만|rehash 시 전체|
|성능 예측성|일정함|rehash/충돌 시 스파이크|
|메모리|노드당 포인터 3개 + 색|노드 + 버킷 배열|

---

## 선택 기준
- **map**
    - 정렬/범위 조회가 필요할 때 (랭킹, 시간순 처리, 구간 검색)
    - 최악의 경우에도 예측 가능한 성능이 필요할 때
- **unordered_map**
    - 단순 키 조회가 대부분일 때 (유저 ID로 세션 찾기)
- **정렬된 vector + 이진 탐색**
    - 데이터가 적거나, 한 번 만들고 조회 위주라면 캐시 효율 때문에 둘보다 빠를 때가 많습니다. (`boost::flat_map`, C++23 `std::flat_map`)
