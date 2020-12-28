const File = (sequelize:any, datatypes:any)=>{
    const file = sequelize.define('file',{
        filename:{
            field:'filename',
            type:datatypes.STRING,
            primaryKey: true
        },
        user_Id:{
            field:"user_Id",
            type:datatypes.BIGINT,
            allowNull:false,
            references:{
                model:'user',
                key:'user_Id',
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        },
        profile:{
            field:'profile',
            type:datatypes.INTEGER,
            allowNull:false,
            defaultValue: 0,
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
        conmmentsId:{
            field:'commentsId',
            type:datatypes.BIGINT,
            references:{
                model:'comments',
                key:'commentsId',
                onDeleted:'cascade',
                onUpdate:'cascade',
            }
        }
    },{
        tableName:'file',
        timestamps: false
    })
    return file;
}

export default File;