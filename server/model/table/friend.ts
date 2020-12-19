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
        userId:{
            field:"userId",
            type:datatypes.STRING(30),
            allowNull:false,
            references:{
                model:'user',
                key:'userId',
                onDeleted:'cascade',
                onUpdate:"cascade",
            }
        },
        friend:{
            field:"friend",
            type:datatypes.STRING(30),
            allowNull:false,
            references:{
                model:'user',
                key:'userId',
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