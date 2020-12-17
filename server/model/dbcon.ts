import { Sequelize } from "sequelize";
import config from './config.json';//db, user, password, port, host

const sequelize = new Sequelize(
    config.db_server.database,
    config.db_server.user,
    config.db_server.password,
    {
        host:'localhost',
        dialect:'mysql'
    }
)

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//table


//

//relationship

//

module.exports = db;

sequelize.sync()
    .then(()=>{
        console.log('database sync');
    })
    .catch((err)=>{
        console.log(err);
    })