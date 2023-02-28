import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    idusuarios: number;
  
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
  
    @Column({ default: true })
    active: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default:null})
    reset_token: string;

    @Column({default:null})
    reset_token_expiry: number;
    static idusuarios: any;
    static correo: any;
    
  }