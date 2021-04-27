import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {App} from './app';
const prueba: App = new App();

yargs.command({
  command: 'infoLines',
  describe: 'Add a new note',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string') {
      prueba.infoLines(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.argv;
