import { Entity, PrimaryColumn, Column, CreateDateColumn,UpdateDateColumn  } from 'typeorm';

@Entity()
export class Form {
    @PrimaryColumn({
        length: 100,
        type: "varchar"
      })
    _id: string;

   @Column({ 
    length: 100
   })
   name: string;
 
  @Column({ 
    type:"varchar",
     length: 100,
     nullable:true
    })
  email: string;

  @Column({
    type:"text"
  })
  message:string

  @CreateDateColumn()
  inserted: Date;

  @UpdateDateColumn()
  updated: Date;
}
