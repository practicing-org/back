const Comments = (sequelize:any, datatypes:any)=>{
    const comments = sequelize.define('comments',{
        commentsId:{
            field:'commentsId',
            type:datatypes.BIGINT,
            autoIncrement: true,
            primaryKey:true
        },
        boardId:{
            field:"boardId",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'board',
                key:'boardId',
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        userId:{
            field:'userId',
            type:datatypes.STRING(30),
            references:{
                model:'user',
                key:'userId',
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        comment:{
            field:'comment',
            type:datatypes.STRING,
            allowNull:false,
        }
    },{
        tableName:'comments',
        timestamps:false
    })
    return comments
}

export default Comments;