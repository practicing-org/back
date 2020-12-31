const File = (sequelize:any, datatypes:any)=>{
    const file = sequelize.define('file',{
        filename:{
            field:'filename',
            type:datatypes.STRING,
            primaryKey: true
        },
        profile:{
            field:'profile',
            type:datatypes.INTEGER,
            allowNull:false,
            defaultValue: 0,
        },
    },{
        tableName:'file',
        timestamps: false
    })
    return file;
}

export default File;