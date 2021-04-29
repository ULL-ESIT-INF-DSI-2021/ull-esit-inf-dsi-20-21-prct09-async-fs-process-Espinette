import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

export class App4 {
  constructor() {}

  comando1() {

  }

  comando2() {

  }

  comandoLs(directorio: string) {
    fs.access(directorio, (err) => {
      if (err) {
        console.log(chalk.red(`La ruta introducida ${directorio} no existe o esta incorrecta`));
      } else {
        const ls = spawn(`ls`, [directorio]);
        ls.stdout.pipe(process.stdout);
      }
    });
  }

  comando4() {

  }

  comando5() {

  }

  comando6() {

  }
}

const prueba: App4 = new App4();


yargs.command({
  command: 'ls',
  describe: 'Listar los ficheros dentro de un directorio',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' ) {
      prueba.comandoLs(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.argv;
