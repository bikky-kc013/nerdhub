import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Admin {
    @PrimaryColumn({
      length: 100,
      type: "varchar",
    })
    _id: string;
  
    @Column({
      length: 100,
      type: "varchar",
    })
    username: string;
  
    @Column({
      type: "text",
      select: false,
    })
    password: string;
  
    @CreateDateColumn()
    inserted: Date;
  
    @UpdateDateColumn()
    updated: Date;
  }
  


