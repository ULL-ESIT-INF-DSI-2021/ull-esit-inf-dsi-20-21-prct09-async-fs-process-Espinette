import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {Usuario} from './usuario';

const nota: Usuario = new Usuario();

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      nota.addNote(argv.user, argv.title, argv.body, argv.color);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      nota.removeNote(argv.user, argv.title);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para borrar una nota"));
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List note of an user',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      nota.listNote(argv.user);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para listar las notas de un usuario"));
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      nota.readNote(argv.user, argv.title);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para leer una nota"));
    }
  },
});

yargs.command({
  command: 'modify',
  describe: 'Modify a note',
  builder: {
    user: {
      describe: 'Username',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newtitle: {
      describe: 'Note new title',
      demandOption: true,
      type: 'string',
    },
    newbody: {
      describe: 'New Body',
      demandOption: true,
      type: 'string',
    },
    newcolor: {
      describe: 'New Color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.newtitle === 'string' && typeof argv.newbody === 'string' && typeof argv.newcolor === 'string') {
      nota.modifyNote(argv.user, argv.title, argv.newtitle, argv.newbody, argv.newcolor);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para modificar una nota"));
    }
  },
});

yargs.argv;
