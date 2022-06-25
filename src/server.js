const express = require('express');
const app = express();


const postController = require('./controllers/post.controller');
const { register, login } = require('./controllers/user.controller');
const mongnodbConnect = require('./configs/db')


app.use(express.json());
const port = 7000 || process.env.PORT

app.use('/', postController )
// app.use('/temp/', userController )
app.use('/signin', login)
app.use('/signup', register)

app.listen(port, async ()=>{
    try {
        await mongnodbConnect()
        console.log(`server is running at port ${port}`);
    } catch (error) {
        return console.log({ message : "something has happened"});
    }
})


