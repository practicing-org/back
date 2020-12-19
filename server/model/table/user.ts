const User = (sequelize:any, DataTypes:any)=>{
    const user = sequelize.define('user',{
        userId:{
            field:"userId",
            type:DataTypes.STRING(30),
            primaryKey:true
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
        }
    },{
        tableName:'user',
        timestamps:false,
    })
    return user;
}

export default User;