import { Column, Entity, PrimaryColumn,CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Slider{
    @PrimaryColumn({
        length: 100,
        type: "varchar",
    })
    _id:string


    @Column({
        type:"varchar",
        length:255
    })
    title:string


    @Column({
        type:"text"
    })
    image:string

    @CreateDateColumn()
    inserted: Date;

    @UpdateDateColumn()
    updated: Date;
}
