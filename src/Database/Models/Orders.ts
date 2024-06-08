import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";


@Entity()
export class Orders{
    @PrimaryColumn({
        type:"varchar",
        length:255
    })
    _id:string

   
    @Column({
        type:"varchar",
        length:255
    })
    orderId:string

    @Column({
        type:"varchar",
        length:255
    })
    orderMethod:string

    @Column({
        type:"varchar",
        length:255
    })
    status:string

    @Column({
        type:"varchar",
        length:255
    })
    userId:string


    @CreateDateColumn()
    inserted: Date;
  
    @UpdateDateColumn()
    updated: Date;

}