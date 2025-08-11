+++
title = "4. DB"
date = 2025-08-10

weight = 4
+++

# TL;DR
이 글은 2025년도 봄학기 KAIST 전산학부 대학원 면접을 준비하며, 면접 참고자료(DB)에 대한 대답을 정리한 글입니다.

문제에 대한 정답이 아니며, 제가 공부하며 생각한 바들을 정리한 것입니다.

후에 같은 목표로 면접을 준비하는 학우분들께 도움이 되기를 바랍니다.

이 풀이노트는 질문만 본 상태에서 답변한 내용에 대한 채점, 그리고 이 면접을 준비하며 이전에 한번 LLM과 함께 작성해본 답안이 이어져 있습니다.

# 문제

## Preliminaries

### DBMS와 file management system의 차이점은?

> DBMS는 데이터를 구조화하여 효율적으로 저장하고 가져오는 프로그램입니다.
> 파일 시스템이 단순이 파일을 저장하고 가져오는 것에서 나아가 데이터의 정합성 등을 제한할 수 있습니다.

BMS는 데이터베이스 관리 시스템으로, 데이터를 다양한 자료구조를 이용하여 저장하고, 이를 효율적으로 조회하는 시스템입니다.
File management system은 파일 시스템으로, 데이터를 파일 단위로 저장하고, 이를 조회하는 시스템입니다.
일반적으로 DBMS는 데이터의 무결성, 일관성, 보안 등을 보장하는 기능이 포함되어 있습니다.
File management system은 이러한 기능 없이 기본적인 파일 입출력 기능만을 제공합니다.

큰 차이는 ACID(Atomicity, Consistency, Isolation, Durability)와 같은 트랜잭션 관리 기능이 DBMS에 포함되어 있다는 점입니다.

---

### Logical database design과 physical database design의 차이점은?

> Logical database design은 물리적인 저장장치를 고려하지 않고, 데이터 간의 관게등을 정의하는데 집중합니다.
> 그에반해 physical database design에선 저장장치의 특성을 고려하여 각 레코드를 어디에 어떻게 저장, 검색할지 고려합니다.

Logical database design은 데이터간의 관계, 속성, 구조를 정하는 단계입니다.
아직 특정 데이터베이스 시스템에 종속되지 않은 추상적인 설계입니다.
엔티티와 속성 정의, 관계 정의, 정규화, ERD(Entity-Relationship Diagram) 작성 등이 포함됩니다.

physical database design은 논리적 설계를 기반으로 실제 데이터베이스 시스템에 맞게 구현하는 단계입니다.
SQL 데이터베이스를 사용한다면, 테이블, 인덱스, 뷰 등을 정의하고, 데이터베이스 시스템의 성능을 고려하여 최적화하는 작업이 포함됩니다.

---

### DBMS의 세 단계 data abstraction은 (physical, logical, view level)?

> physical, logical, veiw 세 단계가 있습니다.
> 피지컬 추상화엔 블록 io, 레코드, 인덱스 등이 포함됩니다.
> 로지컬 abstraciton엔 ERD 등이 포함됩니다. + 정규화, 스키마
> 뷰 레벨인 테이블, 뷰 등이 포함됩니다.

가장 저수준의 abstraction은 physical level로, 데이터가 실제로 어떻게 저장되는지를 정의합니다.
파일 구조, 인덱스 구조, 저장소 관리 등이 포함됩니다.
중간 수준의 abstraction은 logical level로, 데이터의 구조와 관계를 정의합니다.
ERD, 정규화, 스키마 등이 포함됩니다.
가장 높은 수준의 abstraction은 view level로, 사용자가 데이터를 어떻게 볼 수 있는지를 정의합니다.
뷰, 쿼리, 사용자 인터페이스 등이 포함됩니다.

---

### Physical data independence란?

> physical data abstraction이 logical, view data abstraction에 영향을 미치지 않는것을 의미합니다.
> Physical data independence를 구현하면 플랫폼에 관계없이 DB의 논리적 구조와 고수준 쿼리를 유지할 수 이씃빈다.

Physcial data independence는 External, Conceputal schema를 제외한 채 internal 부분만을 수정하는 것을 의미한다.
한마디로 database의 performance를 높이기 위해서 일부 데이터 값의 구조를 변경할 수는 있지만 전반적인 데이터베이스의 구조를 변경하지는 않는다.
따라서 Database에서 달라지는 건 내부 데이터의 저장 방식이나 데이터값의 구조적 변경이지, Database 자체가 변경되지는 않는다.
이 점에서 많은 Database들이 Physical data independence가 이루어지고 있다.
출처: https://whoishoo.tistory.com/246 [HOOAI:티스토리]

## Relational Model

### Database schema의 주요 구성 요소는?

> DB 스키마는 엔티티, attribute, relation으로 이루어져 있습니다.

Schema는 엔티티, 속성, 관계로 구성되어 있습니다.
엔티티는 데이터베이스에서 관리되는 객체를 의미하며, 속성은 엔티티의 특성을 나타냅니다.
관계는 엔티티 간의 연관성을 나타냅니다.
예를 들어, 학생(Student) 엔티티는 이름(Name), 학번(Student ID), 전공(Major) 등의 속성을 가질 수 있습니다.
학생과 수업(Course) 엔티티 간의 관계는 학생이 수업을 듣는다는 의미로, 학생과 수업 간의 관계를 나타낼 수 있습니다.

RDBMS에서 스키마는 테이블, 열(레코드), 행(필드), 키로 구성됩니다.

---

### Primary key와 foreign key의 차이점은?

> 중복 가능성이 차이입니다.
> primary key는 스키마당 하나만 존재하고 각 튜플을 구분할 수 있는 유니크 키이기도 합니다.
> 외래키는 이러한 튜플을 참조하는 attribute로, 한 테이블에 중복된 값이 존재할 수 있습니다.

유일 키(Primary Key)는 후보키 중에서 하나를 선택하여 테이블의 각 행을 고유하게 식별하는 키입니다.
후보키는 슈퍼키 중에서 최소성을 만족하는 키입니다.
슈퍼키는 테이블의 각 행을 고유하게 식별할 수 있는 키입니다.
즉 유일키는 테이블의 각 행을 고유하게 식별하는 키 중 최소성을 만족하는 키 중 하나입니다.
따라서 null 값을 가질 수 없으며, 중복된 값을 가질 수 없습니다.

외래 키(Foreign Key)는 다른 테이블의 유일 키를 참조하는 키입니다.
이는 무결성을 유지하기 위해 사용됩니다.
관계를 정의하는 데 사용되며, 외래 키가 참조하는 테이블의 유일 키와 일치해야 합니다.
외래키는 유일키와 달리 중복된 값을 가질 수 있습니다.
null 값을 가질 수도 있습니다.

---

### Referential integrity는 무엇인가? 이를 violate하지 않도록 제공되는 기능은?

> 참조 무결성이란 외래키가 참조하는 primary key가 바뀌거나 삭제되었을 때,
> Integrity가 손상되지 않도록 보장하는 것입니다.
> 이를 위해 on delete, on change cascade 등의 기능을 제공합니다.

참조 무결성(Referential Integrity)은 외래 키가 참조하는 테이블의 유일 키와 일치해야 한다는 규칙입니다.
즉, 외래 키가 참조하는 테이블의 유일 키가 존재해야 하며, 외래 키가 참조하는 테이블의 유일 키가 삭제되거나 변경되면, 외래 키가 참조하는 테이블의 값도 함께 변경되거나 삭제되어야 합니다.
이를 위반하지 않도록 DB에선 유일키가 변경되거나 삭제될 때, 외래키가 참조하는 테이블의 값도 함께 변경되거나 삭제되는 기능을 제공합니다(CASCADE DELEATE, UPDATE).

---

### Relational algebra의 5개 기본 연산자는?

> selection, projection, cartesian product, difference, union 5가지입니다.

select(σ), project(π), union(∪), set difference(-), Cartesian product(×)입니다.
이 외에도 join(⨝), intersection(∩), rename(ρ) 등의 연산자가 있습니다.
select(σ)는 조건에 맞는 행을 선택하는 연산자입니다.
project(π)는 특정 열을 선택하는 연산자입니다.
union(∪)은 두 테이블의 합집합을 구하는 연산자입니다.
set difference(-)는 두 테이블의 차집합을 구하는 연산자입니다
Cartesian product(×)는 두 테이블의 데카르트 곱을 구하는 연산자입니다.

---

### DDL과 DML의 차이점과 예제 명령어는?

> Data Definition Language는 데이터의 구조를 선언할 때 이용합니다.
> create table, alter table, constraint 등이 포함됩니다.
> Data Manipulation Language 는 이렇게 선언된 DB에서 데이터를 CRUD할때 이용합니다.
> select, update, delete, insert 등이 있습니다.

DDL(Data Definition Language)은 데이터베이스의 구조를 정의하는 명령어입니다.
예를 들어, 테이블 생성(create table), 테이블 수정(alter table), 테이블 삭제(drop table) 등이 있습니다.
DML(Data Manipulation Language)은 데이터베이스의 데이터를 조작하는 명령어입니다.
예를 들어, 데이터 삽입(insert), 데이터 수정(update), 데이터 삭제(delete), 데이터 조회(select) 등이 있습니다.

---

### Inner join과 outer join의 차이점은? Outer join은 왜 필요한가?

> 이너 조인은 두 테이블에 전부 존재하는 값에 대해서만 조인을 수행하고,
> 아우터 조인은 한쪽이 존재하지 않을 때 null로 채워 조인합니다.
> 한쪽 테이블을 기준으로 반대쪽 값이 존재하지 않는지 체크할 때 유용합니다.

Inner join은 두 테이블에서 공통된 값을 가진 행만을 반환하는 조인입니다.
즉, 두 테이블에서 일치하는 행만을 반환합니다.
Outer join은 두 테이블에서 일치하지 않는 행도 반환하는 조인입니다.
즉, 두 테이블에서 일치하지 않는 행도 반환합니다. Outer join은 left outer join, right outer join, full outer join으로 나눌 수 있습니다.
Outer join은 두 테이블 간의 관계를 명확하게 표현하기 위해 필요합니다.
예를 들어, 고객 테이블과 주문 테이블이 있을 때, 고객이 주문하지 않은 경우에도 고객 정보를 조회하고 싶을 때 outer join을 사용합니다.

---

### 인덱싱 알고리즘을 하나 설명하시오.

> 해시 테이블이 있습니다.
> 데이터 레코드을 해시함수를 이용하여 해시값으로 변환하고,
> 레코드에 대한 포인터를 해시 테이블에 키-값 쌍으로 저장합니다.
> 해시 키 중복을 해결하기 위해 연결 리스트를 활용하거나, 여러 계층을 이용하기도 합니다.
>
> B+ 트리가 가장 대표적입니다.
> B+ 트리는 부모 노드가 자식 노드를 여러개 가질수있고, 모든 값이 리프 노드에 있어야 합니다.
> insertion과 deletion 모두 복잡도가 O(logn) 입니다.
> 리프 노드는 연결 리스트로 구현되어 있어 빠른 검색이 가능합니다.

B+-트리(B+-Tree)는 데이터베이스에서 가장 많이 사용되는 인덱싱 알고리즘 중 하나입니다.
B+-트리는 균형 잡힌 트리 구조로, 데이터를 정렬된 순서로 저장하고, 검색, 삽입, 삭제 등의 연산을 효율적으로 수행할 수 있습니다.
B+-트리는 다음과 같은 특징을 가지고 있습니다:
1. **균형 잡힌 트리 구조**: 모든 리프 노드가 동일한 깊이를 가지며, 트리의 높이가 최소화되어 검색 속도가 빠릅니다
2. **다중 자식 노드**: 각 노드는 여러 개의 자식을 가질 수 있어, 데이터의 양이 많아져도 트리의 높이가 증가하지 않습니다
3. **리프 노드의 연결**: 리프 노드는 서로 연결되어 있어, 범위 검색(range query)이 효율적으로 수행될 수 있습니다
4. **정렬된 데이터**: 데이터를 정렬된 순서로 저장하므로, 검색 속도가 빠릅니다
B+-트리는 데이터베이스에서 인덱스를 구현할 때 많이 사용됩니다. 인덱스를 사용하면 데이터 검색 속도를 크게 향상시킬 수 있습니다.
복잡도는 O(log n)입니다.


다른 예시로 해시 인덱스가 있습니다.
해시 인덱스는 해시 함수를 사용하여 데이터를 인덱싱하는 방법입니다.
해시 인덱스는 특정 키 값을 해시 함수에 입력하여 해시 값을 계산하고, 이 해시 값을 인덱스로 사용하여 데이터를 저장합니다.
해시 인덱스는 특정 키 값을 빠르게 검색할 수 있지만, 범위 검색에는 적합하지 않습니다.
해시 인덱스는 데이터가 균등하게 분포되어 있을 때 성능이 좋습니다.
해시 인덱스는 충돌이 발생할 수 있으므로, 충돌 해결 방법(체이닝, 오픈 어드레싱 등)을 사용해야 합니다

---

### SQL 질의 처리시 index(예: B+-tree)를 통해 처리 속도가 빨라지는 원리는?

> 인덱스가 없이 검색을 수행하면
> 최악의 경우 모든 레코드를 검사해야 합니다.
> 이는 최악의 block io 수를 가져옵니다.
> 인덱스를 이용하면 이 blockio의 수를 줄일 수 있습니다.
> B+ 트리 기준 logn의 블록 io로 레코드를 찾을 수 있습니다.

SQL 질의 처리 시 인덱스를 사용하면 데이터 검색 속도가 빨라지는 이유는 io 작업을 줄일 수 있기 때문입니다.
인덱스 없이 특정 레코드를 검색하려면 전체 테이블을 스캔해야 합니다. 이 경우, 디스크에서 많은 양의 데이터를 읽어야 하므로 시간이 많이 소요됩니다.
하지만 인덱스를 사용하면, 인덱스 구조(B+-트리 등)를 통해 필요한 레코드의 위치를 빠르게 찾을 수 있습니다.

그리고 인덱스 파일은 레코드에 대한 포인터만 보관하면 되기 때문에 단일 블록 내에 더 많은 튜플이 들어가서 io 수가 주렉 됩니다.

---

### Nested (sub) query는 무엇이며 언제 사용하는게 좋은가?

> 서브쿼리는 쿼리 내부에 다른 쿼리의 실행 결과를 이용하는 것입니다.
> 서브쿼리는 복잡한 쿼리를 작성해야 할 때 유용하고,
> 느리기 때문에 반복적인 작업보다 가끔 일어나는 쿼리에 이용하는 것이 좋습니다.

Nested query는 다른 쿼리의 결과를 사용하여 실행되는 쿼리입니다. 서브쿼리라고도 불립니다.
서브쿼리는 주로 다음과 같은 경우에 사용됩니다:
1. **복잡한 조건**: 메인 쿼리에서 조건을 만족하는 데이터를 찾기 위해 서브쿼리를 사용하여 조건을 계산할 수 있습니다.
2. **집계 함수**: 서브쿼리를 사용하여 집계 함수를 적용한 결과를 메인 쿼리에서 사용할 수 있습니다.
3. **다중 테이블 조인**: 서브쿼리를 사용하여 여러 테이블에서 데이터를 조인할 수 있습니다.
4. **동적 조건**: 서브쿼리를 사용하여 동적으로 조건을 생성할 수 있습니다.
서브쿼리는 메인 쿼리의 결과를 필터링하거나, 집계 함수를 적용하는 등의 작업을 수행할 때 유용합니다.

---

### SQL의 having 절과 where 절의 역할과 차이점은?

> having 절은 group by 연산과 같이 이용하고, where절은 select 연산과 같이 이용합니다.
> having 절은 그래서 aggregate 연산을 포함하고,
> where 절은 그렇지 않습니다.

WHERE 절은 SELECT, UPDATE, DELETE 문에서 조건을 지정하는 데 사용됩니다. 주로 행 단위의 필터링에 사용됩니다.
HAVING 절은 GROUP BY 절과 함께 사용되어 집계된 결과에 대한 조건을 지정하는 데 사용됩니다. 주로 집계 함수의 결과에 대한 필터링에 사용됩니다.

---

## Database Design

### Data inconsistency란 무엇인가?

> 데이터가 일관적이지 않은 경우는 중복된 데이터가 존재하고 이중 일부만 변경되었을 때 발생합니다.
> 이러한 anormally를 줄이지 위해 정규화를 수행합니다.

데이터 불일치(Data inconsistency)는 데이터베이스 내의 데이터가 서로 일치하지 않는 상태를 의미합니다.
예를 들어, 동일한 고객의 이름이 여러 테이블에서 다르게 저장되어 있는 경우, 데이터 불일치가 발생합니다.

---

### ER model은 무엇이며 왜 필요한가?

> ER model은 엔티티를 정의하고, 이들간의 관계를 정의할 때 이용합니다.
> 스키마를 명확히 하고, 이를 바탕으로 정규화흫 하기 위해 필요하빈다.
> logical data abstraction을 명확히 해야 phydical data independance가 유지될 것 같습니다.

Entity-Relationship(ER) 모델은 데이터베이스의 구조를 시각적으로 표현하는 방법입니다.
ER 모델은 엔티티(객체), 속성(특성), 관계(연관성)를 사용하여 데이터베이스의 구조를 정의합니다.
ER 모델은 데이터베이스 설계의 초기 단계에서 데이터의 구조와 관계를 명확하게 정의하는 데 필요합니다.

---

### Many-to-many relationship으로 연결된 두 entity set을 relational schema로 표현하기 위해 몇 개의 relation이 필요한가?

> 3개가 필요합니다.
> 우리가 배운 relation schema에는 n:m 을 표기하는 방법이 없어서, 1:n 관계 두개가 있는
> join table을 추가로 정의해야 합니다.

Many-to-many 관계를 표현하기 위해서는 두 개의 엔티티 세트와 이들을 연결하는 중간 테이블(조인 테이블)이 필요합니다.
따라서 총 세 개의 관계가 필요합니다.

---

### Data normalization은 무엇이며 왜 필요한가?

> 데이터 정규화는 조건에 맞추어 anomally를 줄이는 과정을 말합니다.
> 데이터 inconsistency를 막기 위해, anomally를 줄이기 위해 필요합니다.
> 정보와 functional dependecy를 보존하면서 anomally를 최대한 줄이는 것이 관건입니다.

anomaly 제거, 정보 복구, 종속성 보존을 고려하여 데이터베이스를 정규화하는 과정입니다.
anomaly에는 insertion anomaly, deletion anomaly, update anomaly가 있습니다.

DB에서 정규화란 데이터베이스의 구조를 최적화하여 중복을 최소화하고, 데이터 무결성을 유지하는 과정을 의미합니다.
1 ~ 5 정규형과 BCNF(Boyce-Codd Normal Form) 등이 있습니다.
이는 데이터의 무결성을 유지하고, 데이터 중복을 최소화하여 데이터베이스의 성능을 향상시키기 위해 필요합니다.

---

### Functional dependency는 무엇인가? 간단한 예시는?

> relation의 attribute set A가 결정되면 B가 결정될때,
> A와 B 사이의 funtionaldependency가 생깁니다.
> 예를 들어, 학번을 알면 이름을 알 수 있다면,
> 학번 -> 이름의 functional dependecy가 생깁니다.

함수 종속성(Functional Dependency)은 한 속성(또는 속성 집합)이 다른 속성(또는 속성 집합)을 결정하는 관계를 의미합니다.
이는 데이터의 정규화 과정에서 중요한 개념입니다.
예를 들어 학생(Student) 테이블에서 학번(Student ID)이 학생의 이름(Name)을 결정한다면, 학번 → 이름이 함수 종속성입니다.
반대로 학생의 이름이 학번을 결정하지 않는다면, 이름 → 학번은 함수 종속성이 아닙니다.

---

### 3NF과 BCNF의 차이점과 각 장단점은?

> 3정규형과 BCNF의 차이는 functional dependecy의 보존 여부입니다.
> 3정규형은 이를 보존하나, BCNF는 anommaly를 제거하기 위해 일부 functional dependency loss가 있습니다.
> 대신 BCNF는 더 많은 anomally를 지울 수 있습니다.

3NF(Third Normal Form)은 함수 종속성을 기반으로 데이터베이스를 정규화하는 방법입니다.
3NF는 모든 비주요 속성이 기본 키에만 종속되어야 하며, 이로 인해 데이터 중복을 최소화합니다.
BCNF(Boyce-Codd Normal Form)는 3NF의 확장으로, 모든 함수 종속성이 후보 키에만 종속되어야 합니다.
즉, BCNF는 3NF보다 더 엄격한 조건을 가지고 있습니다.
3NF는 일부 함수 종속성이 후보 키가 아닌 다른 속성에 종속될 수 있지만, BCNF는 이를 허용하지 않습니다.
decomposition을 Elimination of anomalies, Recoverability of information, Preservation of dependencies
를 고려햐야 하는데, 3NF는 뒤 2개 조건을 만족하지만, 중복을 모두 제거하지는 못합니다.
BCNF는 모든 함수 종속성을 제거하지만, 일부 경우에는 정보 손실이 발생 할 수 있습니다.

---

## Database for Big Data

### NoSQL의 개념과 예제 시스템은?

> 기존의 관계형 모델에서 벗어나 다양한 자료구조로 데이터베이스를 만드는 것입니다.
> DocumentDB, key-value DB, column oriented DB 등이 유명합니다.

NoSQL은 전통적인 관계형 데이터베이스(RDBMS)와는 다른 방식으로 데이터를 저장하고 관리하는 데이터베이스 시스템입니다.
특정 데이터 모델에서 더 빠른 쿼리 성능과 확장성을 제공하기 위해 설계되었습니다.
예를 들어, DocumentDB, KV Store, Column Family Store, Graph DB 등이 있습니다.
예를 들어, MongoDB는 DocumentDB로, JSON 형식의 문서를 저장하고 관리할 수 있는 NoSQL 데이터베이스입니다.
Redis는 KV Store로, 키-값 쌍으로 데이터를 저장하고 관리할 수 있는 NoSQL 데이터베이스입니다.
Cassandra는 Column Family Store로, 대규모 데이터를 분산 저장하고 관리할 수 있는 NoSQL 데이터베이스입니다.
Neo4j는 Graph DB로, 그래프 구조로 데이터를 저장하고 관리할 수 있는 NoSQL 데이터베이스입니다.

---

### NOSQL database와 relational database의 주요 차이점은?

> 데이터의 정합성을 보장하지 않는 경우가 많습니다.
> 또한 일부 쿼리에 대해서 쿼리 속도가 차이나고, 가장 큰것은 데이터 모델입니다.

주로 데이터의 구조와 저장 방식에서 차이가 있습니다.
1. **데이터 모델**: RDBMS는 테이블 기반의 관계형 데이터 모델을 사용하며, NoSQL은 다양한 데이터 모델(문서, 키-값, 열 패밀리, 그래프 등)을 지원합니다.
2. **스키마**: RDBMS는 고정된 스키마를 가지며, 데이터 구조가 변경되면 스키마를 수정해야 합니다. NoSQL은 스키마가 유연하여, 데이터 구조가 변경되어도 쉽게 대응할 수 있습니다.
3. **확장성**: RDBMS는 수직적 확장(서버 성능 향상)을 주로 사용하며, NoSQL은 수평적 확장(서버 추가)을 지원합니다. NoSQL은 대규모 데이터를 처리하는 데 더 적합합니다.
4. **트랜잭션**: RDBMS는 ACID(Atomicity, Consistency, Isolation, Durability) 트랜잭션을 지원하여 데이터의 일관성을 보장합니다. NoSQL은 BASE(Basically Available, Soft state, Eventually consistent) 모델을 사용하여, 일관성보다는 가용성과 확장성을 중시합니다.
5. **쿼리 언어**: RDBMS는 SQL(Structured Query Language)을 사용하여 데이터를 조회하고 조작합니다. NoSQL은 각 데이터베이스에 따라 다양한 쿼리 언어를 사용합니다. 예를 들어, MongoDB는 MQL (MongoDB Query Language)을 사용합니다.

---

### Vector database가 AI 응용에 많이 사용되는 이유는? (2023년 가을 이후 일부 교육)

> 벡터 데이터베이스를 쿼리의 벡터 임베딩을 통해 맥락에 맞는 데이터를 가져오기에 적합합니다.
> 특히 컨텍스트가 커지면서 RAG의 중요성이 대두되는데 이에 적합합니다.

벡터 데이터베이스는 AI 응용에서 주로 고차원 벡터 데이터를 저장하고 검색하는 데 사용됩니다.
AI 모델은 종종 고차원 벡터를 생성하여 데이터를 표현합니다. 예를 들어, 이미지, 텍스트, 오디오 등의 데이터의 인덱스를 벡터로 변환하여 저장합니다.
벡터 데이터베이스는 이러한 고차원 벡터 데이터를 효율적으로 저장하고, 유사성 검색(Nearest Neighbor Search)을 지원합니다.
유사성 검색은 벡터 간의 거리를 계산하여, 가장 유사한 벡터를 찾는 작업입니다.

---

### LLM의 RAG에서 사용되는 벡터DB의 개념과 예제 시스템은?

> LLM 프롬프트로부터 맥락을 벡터로 추출하고, 이를 바탕으로 벡터DB에서 적절한 문서를 검색하는 DB입니다.
> 예제 시스템으로 FIASS, pinecone, pgvector 등이 있습니다.

RAG(Retrieval-Augmented Generation)는 LLM(Large Language Model)의 응답 품질을 향상시키기 위해 외부 지식 데이터베이스를 활용하는 방법입니다.
RAG는 LLM이 질문에 대한 답변을 생성할 때, 벡터 데이터베이스에서 관련 정보를 검색하여 이를 기반으로 답변을 생성합니다.
벡터 데이터베이스는 LLM이 생성한 질문의 임베딩 벡터를 사용하여, 관련된 문서나 정보를 검색합니다.
예제 시스템으로는 Faiss, PostgreSQL의 pgvector, Milvus, Pinecone 등이 있습니다.

---

### Vector database가 LLM의 RAG(retrieval-augmented generation)에 사용되는 원리는?

> 동일해서 스킵

벡터 데이터베이스는 LLM이 생성한 질문의 임베딩 벡터를 사용하여, 관련된 문서나 정보를 검색합니다.
LLM은 질문을 임베딩 벡터로 변환하고, 벡터 데이터베이스에서 유사한 벡터를 검색합니다.
검색된 벡터는 LLM의 응답 생성에 사용됩니다.
이 과정에서 벡터 데이터베이스는 고차원 벡터 간의 유사성을 계산하여, 가장 관련성이 높은 정보를 빠르게 검색할 수 있도록 합니다.
