module.exports = (sequelize, datatypes)=>{
    const file = sequelize.define('file',{
        filename:{
            field:'filename',
            type:datatypes.STRING,
            primaryKey: true
        },
        userId:{
            field:'userId',
            type:datatypes.STRING(30),
            allowNull:false,
            references:{
                model:'user',
                key:'userId',
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
        contentsId:{
            field:'contentsId',
            type:datatypes.BIGINT,
            references:{
                model:'contentsId',
                key:'contentsId',
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