const fs = require('fs');
const chalk = require('chalk');
const { totalmem } = require('os');

const getNotes = () => {
    return 'Your Notes...';
};

//Help command
const help = () => {
    console.log(chalk.blue('Run these commands in order to use the application:'));
    console.log(chalk.blue('node app getHelp  :  Displays the different commands of the application'));
    console.log(chalk.blue('node app add --title="The Title" --body="The content"  :  Add a new note'));
    console.log(chalk.blue('node app remove --title="The Title"  : Remove an existing note'));
    console.log(chalk.blue('node app list  : Lists all the notes stored'));
    console.log(chalk.blue('node app read --title="The Title"  : Displays the content of an existing note'));
};

//Adds a Note
const addNote = (title, body) => {
    const notes = loadNotes('notes.json');
    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);

        console.log(
            chalk.green.inverse(
                "New note added!"
            )
        );
    }else{
        console.log(
            chalk.red.inverse(
                "Note title is taken"
            )
        );
    }
};

//Removes a note
const removeNote = (title) => {
    const notes = loadNotes('notes.json');
    const newNotes = notes.filter(note => note.title != title);

    if(notes.length > newNotes.length){
        saveNotes(newNotes);
        console.log(
            chalk.red.inverse(
                "A note with the title of " + title + " has been removed"
            )
        );
    }else{
        console.log(
            chalk.red.inverse(
                "A note with the title of "+title+" was not found"
            )
        );
    }
}

//Lists Notes
const listNotes = () => {
    const notes = loadNotes('notes.json');
    console.log(chalk.blue.inverse('Your Notes:'));
    notes.forEach(note => {
        console.log(note.title);
    });
};

//Read a note
const readNote = title => {
    const notes = loadNotes('notes.json');
    const noteRead = notes.find(note => note.title === title);
    if(noteRead){
        console.log(chalk.inverse('Title:') + ' ' + noteRead.title);
        console.log(chalk.inverse('Body:') + ' ' + noteRead.body);
    }else{
        console.log(chalk.red('No note was found!'));
    }
};


//Saving the notes at the end of every function
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};
//Loads the notes from the json file
const loadNotes = (fileName) => {
    try{
        const dataBuffer = fs.readFileSync(fileName);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(err) {
        return []; 
    }
};

//Exporting the functions
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    help: help
};