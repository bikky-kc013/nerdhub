import { CreateDateColumn,UpdateDateColumn, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Blog{
    @PrimaryColumn({
        length:255,
        type:"varchar"
    })
    _id:string

    @Column({
        type:"text"
    })
    description:string

    @Column({
        type:"varchar",
        length:255
    })
    title:string

    @Column({
        type:"text",
        nullable:true
    })
    image:string

    @CreateDateColumn()
    inserted: Date;

    @UpdateDateColumn()
    updated: Date;
}