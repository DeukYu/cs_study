# Table-Valued Parameter (TVP)
> 📌 기출: [NC Project NL Q17](../Interview/NC_Project_NL_%EB%A9%B4%EC%A0%91_%EC%A7%88%EB%AC%B8.md) - MSSQL에서 Stored Procedure로 여러 Row를 한 번에 넘기려면 어떻게 하겠는가?

- MSSQL에서 **테이블 형태의 데이터를 파라미터로** Stored Procedure에 넘기는 기능 (SQL Server 2008+)
- 테이블 타입을 정의하고, SP가 그 타입을 `READONLY` 파라미터로 받습니다.

---

## 사용법
```sql
-- 1. 테이블 타입 정의
CREATE TYPE dbo.ItemTableType AS TABLE (
    ItemUID BIGINT PRIMARY KEY,
    ItemID  INT,
    Count   INT
);

-- 2. SP에서 READONLY 파라미터로 받기
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

```sql
-- 3. 호출 (T-SQL 예시)
DECLARE @t dbo.ItemTableType;
INSERT INTO @t VALUES (1001, 50, 1), (1002, 51, 3);
EXEC dbo.usp_InsertItems @CharID = 7, @Items = @t;
```

- 서버 코드에서는 ODBC의 `SQL_SS_TABLE` 바인딩, OLE DB, ADO.NET의 `DataTable` / `SqlDataRecord`로 넘깁니다.

---

## 장점
- **호출 1회**: Row마다 SP를 N번 호출하던 것을 1번으로 줄여 네트워크 왕복과 호출 비용이 감소합니다.
- **원자성**: 여러 Row를 하나의 트랜잭션으로 처리합니다.
- **타입 안정성**: 컬럼 타입이 강제됩니다.
- **집합 연산**: `INSERT ... SELECT`, `MERGE`, `JOIN`을 그대로 쓸 수 있습니다.

## 주의점
- 테이블 변수처럼 **통계가 없어**, Row가 많으면 실행 계획이 나빠질 수 있습니다. (SQL Server 2019부터 지연 컴파일로 개선)
- 타입을 사용하는 SP가 있으면 **타입을 ALTER할 수 없어**, 변경 시 새 타입을 만들고 교체해야 합니다.
- 파라미터는 `READONLY`라 SP 안에서 수정할 수 없습니다.

---

## 대안 비교
|방법|장점|단점|
|---|---|---|
|TVP|타입 안전, 집합 연산, 빠름|타입 변경 번거로움|
|구분자 문자열 + `STRING_SPLIT`|간단|파싱 비용, 타입 변환, 이스케이프 문제|
|XML / JSON (`OPENJSON`)|구조가 유연|파싱 비용 큼|
|`BULK INSERT` / bcp|대량 적재에 최적|SP 로직과 함께 쓰기 어려움|
|SP를 N번 호출|구현 쉬움|왕복 N회, 트랜잭션 분리|

---

## 게임 서버 활용 예
- 인벤토리 일괄 저장
- 우편 다중 수령
- 거래/보상 아이템 묶음 지급
