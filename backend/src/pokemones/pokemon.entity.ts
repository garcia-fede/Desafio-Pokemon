import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Pokemon {
    @PrimaryColumn( {type: "string"} )
    id: string
    @Column( {type: "string"} )
    name: string
    @Column( {type: "int"} )
    attack: number
    @Column( {type: "int"} )
    defense: number
    @Column( {type: "int"} )
    hp: number
    @Column( {type: "int"} )
    speed: number
    @Column( {type: "string"} )
    type: string
    @Column( {type: "string"} )
    imageUrl: string
}