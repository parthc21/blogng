const Sequelize=require('sequelize')
const{ article, comment , user, tag}=require('./models')
const db=new Sequelize({
    dialect:'sqlite',
    storage:__dirname+'/store.db'
})

const Article=db.define('article',article)
const Comment=db.define('comment',comment)
const User=db.define('user',user)
const Tag=db.define('tag',tag)

Comment.belongsTo(Article)
Article.hasMany(Comment)

Article.belongsTo(User)
User.hasMany(Article)

Comment.belongsTo(User)
User.hasMany(Comment)

Tag.belongsTo(Article)
Article.hasMany(Tag)

module.exports={
    db,
    Article,
    Comment,
    User,
    Tag
}
