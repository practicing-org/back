const Like = (sequelize:any, datatypes:any)=>{
    const like = sequelize.define('like',{
        likeId:{
            field:'likeId',
            type:datatypes.BIGINT,
            autoIncrement:true,
            primaryKey:true
        },
        boardId:{
            field:'boardId',
            type:datatypes.BIGINT,
            references:{
                model:'board',
                key:'boardId',
                onDeleted:'cascade',
                onUpdate:'cascade'
            }
        },
        user_Id:{
            field:"user_Id",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'user',
                key:'user_Id',
                onDeleted:'cascade',
                onUpdate:'cascade'
            }
        },
        commentsId:{
            field:'commentsId',
            type:datatypes.BIGINT,
            references:{
                model:'comments',
                key:'commentsId',
                onDeleted:'cascade',
                onUpdate:'cascade'
            }
        }
    },{
        tableName:'like',
        timestamps: false
    })
    return like;
}
export default Like;