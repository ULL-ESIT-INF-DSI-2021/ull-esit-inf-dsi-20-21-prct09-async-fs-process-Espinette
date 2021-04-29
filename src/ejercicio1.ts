import {access, constants, watch} from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';

/**
 * Funcion que nos proporciona el profe para realizar una traza de ejecución de este programa
 */
function ejercicio1(filename: string) {
  if (process.argv.length !== 3) {
    console.log('Please, specify a file');
  } else {
    const filename = process.argv[2];

    access(filename, constants.F_OK, (err) => {
      if (err) {
        console.log(`File ${filename} does not exist`);
      } else {
        console.log(`Starting to watch file ${filename}`);

        const watcher = watch(process.argv[2]);

        watcher.on('change', () => {
          console.log(`File ${filename} has been modified somehow`);
        });

        console.log(`File ${filename} is no longer watched`);
      }
    });
  }
}

yargs.command({
  command: 'ejercicio1',
  describe: 'Information of lines, word and characteres',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string') {
      ejercicio1(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.argv;
