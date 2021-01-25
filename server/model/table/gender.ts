import { Sequelize } from "sequelize/types";

const Gender = (sequelize:any, datatypes:any)=>{
    const gender = sequelize.define('gender',{
        genderId:{
            field:'genderId',
            type:datatypes.INTEGER,
            primaryKey:true
        },
        gender:{
          field:'gender',
          type:datatypes.STRING,
        }
    },{
        tableName:'gender',
        timestamps:false
    })

    return gender
}

export default Gender