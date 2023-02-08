import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  iduser: number;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  contra: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatesAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.contra = await bcrypt.hash(this.contra, 10);
  }

}
