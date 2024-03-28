# Devcamp - second week project

<br />

# 목적

- 예시코드를 보며 결제 관련 비즈니스 로직을 습득
- 직접 PG사 연결
- 정액제, 정률제 쿠폰 적용
- 토큰 블랙리스트 방식 적용

<br />

# 기술 스택

- Typescript, Nest.js, PostgreSQL, TypeORM, Redis

<br />

# 구현 기능

- 로그인
- 회원가입
- 로그아웃
- JWT 토큰 인증, 인가
- JWT 토큰 블랙리스트 추가
- PG사 결제 연동
- 쿠폰 적용가 결제

<br />

# 구상해보기

<details>
<summary>구상 내용</summary>
<div markdown="1">

## 전체 로직

- 회원가입시 30% 할인 쿠폰과 5000원 할인 쿠폰을 지급
- 특정 물건 구입시 원하는 쿠폰을 선택
- 해당 쿠폰에 따라 가격을 조정 후 결제
- Admin은 물건을 사고 팔 수 있다.

## 최초 로그인

- 로그인 요청
- access token, refresh token 생성 및 반환, refresh token redis에 저장
- access token 세션 스토리지, refresh token 쿠키에 저장

## 클라이언트 요청시

- access token 유효기간 확인
  - 유효 토큰: header에 담아 요청보냄
  - 유효하지 않은 토큰: refresh token header에 담아 access token 재발급 요청한다.(refresh 유효하면 access token 재발급, 재저장 후 요청 다시 보내기)

## 로그아웃

- 로그아웃 요청
- 세션에 있는 access token 삭제
- redis 저장된 refresh 삭제, 해당 access token을 redis black list에 추가(이때 access token의 남은 유효 기간만큼 설정하여 저장해준다.)
- 사용자가 서비스 사용을 끝냈지만, 아직 유효기간이 끝나지않은 토큰을 Redis의 블랙리스트에 저장하고, 모든 클라이언트 요청이 들어올 때 Redis의 블랙리스트를 조회한다.
- 블랙리스트에 존재하는 토큰으로 인증 시도시 거부

## Coupon 구상 로직

- 회원가입시 해당 유저에게 30% 할인 쿠폰과 5000원 할인 쿠폰 지급
- 쿠폰과 유저 관계설정 N:N
- 중간 테이블을 어떻게 관리할것인가

## Point

- 결제 금액에 10% 적립

## Payment

- 토스페이먼츠 PG사 연결

## 구상 DB

- 회원

```ts
export type UserRole = 'admin' | 'user';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole;

  @OneToOne(() => Point)
  @JoinColumn()
  point: Point;

  // 쿠폰 소유자
  @ManyToMany(() => Coupon)
  @JoinTable({
    name: 'user_coupons',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'coupon_id',
      referencedColumnName: 'id',
    },
  })
  coupons: Coupon[];
}
```

- 쿠폰

```ts
export type couponType = 'percentage' | 'price';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 50 })
  type: couponType;

  @ManyToMany(() => User, (user) => user.coupons)
  users: User[];
}
```

포인트

```ts
@Entity()
export class Point extends BaseEntity {
  @Column({ type: 'int', default: 0 })
  total: number;

  @Column({ type: 'int', default: 0 })
  deposit: number;

  @Column({ type: 'int', default: 0 })
  withdrawal: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
```

- 결제

</div>
</details>

<br />
<br />

# 토스페이먼츠 연결 흐름 파악하기

1. Redirect

- 결제 요청시 차례대로 인증과 승인 과정 진행
- 인증: 결제를 승인하기 전 결제 정보가 올바른지 검증
- 승인: 인증에 성공한 결제를 최종 승인
- 승인 요청 성공 -> 결제 요청 과정 끝

2. 인증 성공

- 요청 결과에 따라 리다이렉트 된다.

3. 인증 실패

- 실페 리다이렉트에 쿼리 파라미터로 담긴 에러 정보 나옴
