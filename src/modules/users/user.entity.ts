import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @Column({
        type: DataType.ENUM,
        allowNull: false,
        values: ['male', 'female']
    })
    gender: string
}