const Board = (sequelize:any, datatypes:any)=>{
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
                key:"userId",
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        date:{
            field:'date',
            type:datatypes.DATE,
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

export default Board;