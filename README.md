# Devcamp - second week project

# 목적

- 예시코드를 보며 결제 관련 비즈니스 로직을 습득합니다.
- 직접 PG사 연결까지 구현합니다.
- 정액제, 정률제 쿠폰 적용합니다.
- 토큰 블랙리스트 방식을 구현합니다.

# 구현 기능

- 로그인
- 회원가입
- 로그아웃
- JWT 토큰 인증, 인가
- JWT 토큰 블랙리스트 추가
- PG사 결제 연동
- 쿠폰 적용가 결제

# 구상 로직

- 회원가입시 30% 할인 쿠폰과 5000원 할인 쿠폰을 지급받습니다.
- 특정 물건 구입시 원하는 쿠폰을 선택합니다.
- 해당 쿠폰에 따라 가격을 조정 후 결제합니다.
- Admin은 물건을 사고 팔 수 있습니다.

# 구상 DB

- 회원

```
id, userName, password, phone, role(Admin | user)
```

- 토큰

```
id, accessToken, refreshToken, expiredAt, isRevoked
```

- 리프레시 토큰

```
id, accessToken, refreshToken, expiredAt, isRevoked
```

- 토큰 블랙리스트

```
id, accessToken_id(FK)
```

- 상품

```
id, productName, price, isSoldOut, userId(FK)
```

- 결제

```
id, total_price, userId(FK), productId(FK), createdAt, isAccept
```

# 기술 스택

- Typescript, Nest.js, PostgreSQL, TypeORM
