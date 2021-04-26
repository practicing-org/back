import { Sequelize } from 'sequelize';
import config from './config.json';



const sequelize = new Sequelize(config.path,{
    pool:{
        max:10,
        min: 0,
        idle: 10000
    }}
)

let db:{[k:string]:any} = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.queryInterface = sequelize.getQueryInterface();
//table
import User from './table/user';

import Like from './table/like';
import Image from './table/image';
import Comments from './table/comments';
import Board from './table/board';
import Show from './table/show';
import Gender from './table/gender'

db.user = User(db.sequelize,db.Sequelize);
db.board = Board(db.sequelize, db.Sequelize);
db.comments = Comments(db.sequelize, db.Sequelize);
db.show = Show(db.sequelize, db.Sequelize);
db.like = Like(db.sequelize, db.Sequelize);
db.image = Image(db.sequelize, db.Sequelize);
db.gender = Gender(db.sequelize, db.Sequelize);


//relationship

db.user.hasMany(db.board,{
    foreignKey:'user_Id'})
db.board.belongsTo(db.user,{
    foreignKey:'user_Id',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false,
})
db.show.hasMany(db.board,{
    foreignKey:'showId'})
db.board.belongsTo(db.show,{
    foreignKey:'showId',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false,
})

db.user.hasMany(db.image,{
    foreignKey:'user_Id'})
db.image.belongsTo(db.user,{
    foreignKey:'user_Id',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false,
})
db.board.hasMany(db.image,{
    foreignKey:'boardId'})
db.image.belongsTo(db.board,{
    foreignKey:'boardId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})
db.comments.hasOne(db.image,{
    foreignKey:'commentsId'
})
db.image.belongsTo(db.comments,{
    foreignKey:'commentsId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})

db.user.hasMany(db.comments,{
    foreignKey:'user_Id'})
db.comments.belongsTo(db.user,{
    foreignKey:'user_Id',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false,
})
db.board.hasMany(db.comments,{
    foreignKey:'boardId'})
db.comments.belongsTo(db.board,{
    foreignKey:'boardId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})
db.comments.hasMany(db.comments,{
    foreignKey:'FcommentsId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})

db.user.hasMany(db.like,{
    foreignKey:'user_Id'})
db.like.belongsTo(db.user,{
    foreignKey:'user_Id',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false
})
db.board.hasMany(db.like,{
    foreignKey:'boardId'})
db.like.belongsTo(db.board,{
    foreignKey:'boardId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})
db.comments.hasMany(db.like,{
    foreignKey:'commentsId'
})
db.like.belongsTo(db.comments,{
    foreignKey:'commentsId',
    onDeleted:'cascade',
    onUpdate:'cascade',
})

db.gender.hasMany(db.user,{
    foreignKey:'genderId'
})
db.user.belongsTo(db.gender,{
    foreignKey:'genderId',
    onDeleted:'cascade',
    onUpdate:'cascade',
    allowNull:false,
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