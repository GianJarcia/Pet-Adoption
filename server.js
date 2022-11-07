const express = require('express');
require('dotenv').config();
const app = express();

const AccountRoutes = require('./routes/api/Account')
const userRoutes = require('./routes/api/user')
const postRoutes = require('./routes/api/post')
const CommentRoutes = require('./routes/api/Comment')
const likeRoutes = require('./routes/api/like')
const databaseRoutes = require('./routes/api/database')
const chatRoutes = require('./routes/api/chat')

app.use(express.json({ extended: false }));

app.use('/api/user',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/Comment',CommentRoutes);
app.use('/api/like',likeRoutes);
app.use('/api/Account',AccountRoutes);
app.use('/api/database',databaseRoutes);
app.use('/api/chat',chatRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));