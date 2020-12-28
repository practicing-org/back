const Board = (sequelize:any, datatypes:any)=>{
    const board = sequelize.define('board',{
        boardId:{
            field:'boardId',
            type:datatypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        user_Id:{
            field:"user_Id",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'user',
                key:"user_Id",
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        title:{
            field:'title',
            type:datatypes.STRING(60),
            allowNull:false,
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
        show:{
            field:'show',
            type:datatypes.STRING(30),
            allowNull:false,
            references:{
                model:'show',
                key:"show",
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        }
    },{
        tableName:'board',
        timestamps:false,
    })
    return board;
}

export default Board;