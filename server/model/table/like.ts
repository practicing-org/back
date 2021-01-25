const Like = (sequelize:any, datatypes:any)=>{
    const like = sequelize.define('like',{
        likeId:{
            field:'likeId',
            type:datatypes.BIGINT,
            autoIncrement:true,
            primaryKey:true
        },
    },{
        tableName:'like',
        timestamps: false
    })
    return like;
}
export default Like;