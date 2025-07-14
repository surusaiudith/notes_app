const express=require('express');//to use express
const fs=require('fs');//builtin file system module
const path=require('path');
const NOTES_FILE =path.join(__dirname,'notes.json');//makes sure that file path works on all systems
const app=express();//to get on instance of express
const PORT=3000;//the port in which the app is launched
app.use(express.json());//to use built in middleware in express

let notes=[];//to store notes resets after restarting
if(fs.existsSync(NOTES_FILE)){//if notes.json exists the notes are synced
    const data=fs.readFileSync(NOTES_FILE,'utf-8');
    notes=JSON.parse(data);//converts json string to js array and store it in notes
}
function saveNotesToFile(){
    fs.writeFileSync(NOTES_FILE,JSON.stringify(notes,null,2));//to save notes to notes.json
}

app.get('/',(req,res)=>{//home route
    res.send('welcome to notes app');//sends a respose to whoever visits port 3000
});

app.post('/notes',(req,res)=>{//to post a new note
    const{text}=req.body;//makes sure that client sends is json
    if(!text){
        return res.status(400).json({error:'note text is required'});
    }

    const newnote={
        id:Date.now(),//creates unique id of the note based on date
        text:text
    }
    
    notes.push(newnote);//to add new note into array
    saveNotesToFile();
    res.status(201).json(newnote);//alerts by sending created status
});

app.get('/notes',(req,res)=>{//sets up a get route
    res.json(notes)//sends the full list of notes stored
});

app.delete('/notes/:id',(req,res)=>{
    const noteId=Number(req.params.id);//gets note id from url
    const index =notes.findIndex(note=>note.id===noteId);//finds the note in array

    if(index===-1){
        return res.status(404).json({error:'note not found'});
    }

    const deletedNote=notes.splice(index,1)[0];//deletes the note from array and returns the deleted note
    saveNotesToFile();
    res.json(deletedNote);
});

app.listen(PORT, ()=>{//server listens on port 3000
    console.log('server is running on 3000');
});
