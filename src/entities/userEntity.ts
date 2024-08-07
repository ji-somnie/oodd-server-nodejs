import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // 이 클래스는 데이터베이스 테이블과 매핑되는 엔티티
export class User {
  @PrimaryGeneratedColumn()
  id!: string; 

  @Column({ unique: true })
  kakaoId!: string; // 카카오 고유 ID를 저장하는 필드

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  profilePicture!: string;

  @Column()
  bio!: string;

  @Column()
  status!: string;

  @Column()
  joinedAt!: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: string;

  @Column()
  deletedAt!: string

}
