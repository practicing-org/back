const User = (sequelize:any, DataTypes:any)=>{
    const user = sequelize.define('user',{
        user_Id:{
            field:"user_Id",
            type:DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true
        },
        userId:{
            field:"userId",
            type:DataTypes.STRING(30),
            allowNull:false
        },
        password:{
            field:'password',
            type:DataTypes.STRING(250),
            allowNull:false
        },
        name:{
            field:'name',
            type:DataTypes.STRING(50),
            allowNull:false
        },
        birthday:{
            field:'birthday',
            type:DataTypes.DATE,
            allowNull:false
        },
        message:{
            field:"message",
            type:DataTypes.STRING
        }
    },{
        tableName:'user',
        timestamps:false,
    })
    return user;
}

export default User;