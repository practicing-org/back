const Friend = (sequelize:any, datatypes:any)=>{
    const friend = sequelize.define('friend',{
        friendId:{
            field:"friendId",
            type:datatypes.BIGINT,
            autoIncrement:true,
            primaryKey:true
        },
        date:{
            field:"date",
            type:datatypes.DATE,
            allowNull: false
        },
    },{
        tableName: 'friend',
        timestamps:false
    })
    return friend;
}

export default Friend;