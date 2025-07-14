const express=require('express');//to use express
const app=express();//to get on instance of express
const PORT=3000;//the port in which the app is launched

const notesRouter=require('./routes/notes');

app.use(express.json());//to use built in middleware in express

app.get('/',(req,res)=>{//home route
    res.send('welcome to notes app');//sends a respose to whoever visits port 3000
});

app.use('/notes',notesRouter);//mount the notes routes

app.use((err, req, res, next) => {
  console.error('Internal Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.use((req,res)=>{
    res.status(404).json({error:'route not found'});
})

app.listen(PORT, ()=>{//to start server
    console.log('server is running on 3000');
});