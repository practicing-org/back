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
        user_Id:{
            field:"user_Id",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'user',
                key:'user_Id',
                onDeleted:'cascade',
                onUpdate:"cascade",
            }
        },
        friend:{
            field:"friend",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'user',
                key:'user_Id',
                onDeleted:'cascade',
                onUpdate:"cascade",
            }
        }
    },{
        tableName: 'friend',
        timestamps:false
    })
    return friend;
}

export default Friend;