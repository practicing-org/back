import { Sequelize } from 'sequelize';
import config from './config.json';



const sequelize = new Sequelize(
    config.db_server.database,
    config.db_server.user,
    config.db_server.password,
    {
        host:'localhost',
        dialect:'mysql'
    }
)

let db:{[k:string]:any} = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.queryInterface = sequelize.getQueryInterface();
//table
import User from './table/user';
import Friend from './table/friend';
import Like from './table/like';
import Image from './table/image';
import Comments from './table/comments';
import Board from './table/board';
import Show from './table/show';

db.user = User(db.sequelize,db.Sequelize);
db.friend = Friend(db.sequelize, db.Sequelize);
db.board = Board(db.sequelize, db.Sequelize);
db.comments = Comments(db.sequelize, db.Sequelize);
db.show = Show(db.sequelize, db.Sequelize);
db.like = Like(db.sequelize, db.Sequelize);
db.image = Image(db.sequelize, db.Sequelize);


//relationship
db.user.hasMany(db.friend,{
    foreignKey:'user_Id'
});
db.user.hasMany(db.friend,{
    foreignKey:'friend'
});

db.user.hasMany(db.board,{
    foreignKey:'user_Id'
})
db.show.hasMany(db.board,{
    foreignKey:'show'
})

db.user.hasMany(db.image,{
    foreignKey:'user_Id'
})
db.board.hasMany(db.image,{
    foreignKey:'boardId'
})

db.board.hasMany(db.comments,{
    foreignKey:'boardId'
})
db.user.hasMany(db.comments,{
    foreignKey:'user_Id'
})
db.comments.hasMany(db.comments,{
    foreignKey:'FcommentsId'
})

db.user.hasMany(db.like,{
    foreignKey:'user_Id'
})
db.board.hasMany(db.like,{
    foreignKey:'boardId'
})
db.comments.hasMany(db.like,{
    foreignKey:'commentsId'
})

//

export default db;

sequelize.sync()
    .then(()=>{
        console.log('database sync');
    })
    .catch((err:any)=>{
        console.log(err);
    })