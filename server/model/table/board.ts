module.exports = (sequelize, datatypes)=>{
    const board = sequelize.define('board',{
        boardId:{
            field:'boardId',
            type:datatypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        userId:{
            field:'userId',
            type:datatypes.STRING(30),
            allowNull:false,
            references:{
                model:'user',
                key:"useId",
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        date:{
            field:'date',
            type:datatypes.date,
            allowNull:false,
        },
        contents:{
            field:'contents',
            type:datatypes.STRING(250),
            allowNull:false
        }
    },{
        tableName:'board',
        timestamps:false,
    })
    return board;
}