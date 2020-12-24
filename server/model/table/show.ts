import { Sequelize } from "sequelize/types";

const Show = (sequelize:any, datatypes:any)=>{
    const show = sequelize.define('show',{
        show:{
            field:'show',
            type:datatypes.STRING(30),
            primaryKey:true
        }
    },{
        tableName:'show',
        timestamps:false
    })

    return show
}

export default Show;