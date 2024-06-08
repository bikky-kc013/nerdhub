import { Entity, PrimaryColumn, Column, OneToMany,  CreateDateColumn, UpdateDateColumn  } from "typeorm";
import { SubCategory } from "./SubCategory"; 

@Entity()
export class Category {
    @PrimaryColumn({
        length: 100,
        type: "varchar",
      })
    _id: string;


    @Column({
        type: "varchar",
        length: 255,
    })
    slug:string

    @Column({
        type: "varchar",
        length: 255,
    })
    name: string;

    @Column({
        type: "text",
        nullable:true
    })
    image: string;


    @OneToMany(() => SubCategory, subCategory => subCategory.category) 
    subCategories: SubCategory[];


    @CreateDateColumn()
    inserted: Date;

    @UpdateDateColumn()
    updated: Date;
}
