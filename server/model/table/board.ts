const Board = (sequelize:any, datatypes:any)=>{
    const board = sequelize.define('board',{
        boardId:{
            field:'boardId',
            type:datatypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        date:{
            field:'date',
            type:datatypes.DATE,
            allowNull:false,
        },
        contents:{
            field:'contents',
            type:datatypes.STRING(250),
        },

    },{
        tableName:'board',
        timestamps:false,
    })
    return board;
}

export default Board;