//**
 //* // run "node app getHelp"
 //*//

const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//Customizes yargs version
yargs.version('1.1.0');

//Creates a help command
yargs.command({
    command: 'getHelp',
    describe: 'Browse the different commands',
    handler(){
        notes.help();
    }
});

//Creates an add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body);
    }
});

//Creates a remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

//Creates a list command
yargs.command({
    command:'list',
    describe:'Listing all the notes',
    handler(){
        notes.listNotes();
    }
});

//Creates a read command
yargs.command({
   command:'read',
   describe:'Reading a note',
   builder:{
       title: {
           describe: 'Note title',
           demandOption: true,
           type: 'string'
       }
   },
   handler(argv){
       notes.readNote(argv.title);
   }
});

yargs.parse()