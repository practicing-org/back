const Comments = (sequelize:any, datatypes:any)=>{
    const comments = sequelize.define('comments',{
        commentsId:{
            field:'commentsId',
            type:datatypes.BIGINT,
            autoIncrement: true,
            primaryKey:true
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