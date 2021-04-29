import * as fs from 'fs';
import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {spawn} from 'child_process';

/**
 * Clase App4 cuyo objetivo es una aplicación que permita hacer de wrapper de los distintos comandos empleados en Linux para el manejo de ficheros y directorios
 */
export class App4 {
  /**
   * COnstructor vacío de la clase
   */
  constructor() {}

  /**
   * Funcion que dada una ruta concreta, mostrar si es un directorio o un fichero.
   * @param fichero ruta a comprobar
   */
  comandoShow(fichero: string) {
    fs.access(fichero, (err) => {
      if (err) {
        console.log(chalk.red.inverse(`La ruta introducida ${fichero} no existe o es incorrecta`));
      } else {
        fs.readFile(fichero, (err) => {
          if (err) {
            console.log(`La ruta introducida ${fichero} es un directorio`);
          } else {
            console.log(`La ruta introducida ${fichero} es un fichero`);
          }
        });
      }
    });
  }

  /**
   * Funcion que crea un nuevo directorio a partir de una nueva ruta que recibe como parámetro.
   * @param directorio Directorio a crear
   */
  comandoMkdir(directorio: string) {
    fs.access(directorio, (err) => {
      if (!err) {
        console.log(chalk.red.inverse(`La ruta introducida ${directorio} ya existe`));
      } else {
        const mkdir = spawn(`mkdir`, [directorio]);
        mkdir.stdout.pipe(process.stdout);
        console.log(`${directorio} ha sido creado correctamente`);
      }
    });
  }

  /**
   * Funcion que listar los ficheros dentro de un directorio
   * @param directorio Directorio a listar
   */
  comandoLs(directorio: string) {
    fs.access(directorio, (err) => {
      if (err) {
        console.log(chalk.red.inverse(`La ruta introducida ${directorio} no existe o es incorrecta`));
      } else {
        const ls = spawn(`ls`, [directorio]);
        ls.stdout.pipe(process.stdout);
      }
    });
  }

  /**
   * Funcion que muestra el contenido de un fichero
   * @param fichero Fichero a mostrar
   */
  comandoCat(fichero: string) {
    fs.access(fichero, (err) => {
      if (err) {
        console.log(chalk.red.inverse(`La ruta introducida ${fichero} no existe o es incorrecta`));
      } else {
        fs.readFile(fichero, (err) => {
          if (err) {
            console.log(chalk.red.inverse(`La ruta introducida ${fichero} no es un fichero`));
          } else {
            const cat = spawn(`cat`, [fichero]);
            cat.stdout.pipe(process.stdout);
          }
        });
      }
    });
  }

  /**
   * Funcion para borrar ficheros y directorios.
   * @param directorio Directorio o fichero a borrar
   */
  comandoRm(directorio: string) {
    fs.access(directorio, (err) => {
      if (err) {
        console.log(chalk.red.inverse(`La ruta introducida ${directorio} no existe o es incorrecta`));
      } else {
        const rm = spawn(`rm`, [`-r`, directorio]);
        rm.stdout.pipe(process.stdout);
        console.log(`${directorio} ha sido eliminado correctamente`);
      }
    });
  }

  /**
   * Funcion para mover y copiar ficheros y/o directorios de una ruta a otra.
   * @param origen Fichero o directorio a copiar
   * @param destino Destino del fichero o directorio copiado
   */
  comandoCp(origen: string, destino: string) {
    fs.access(origen, (err) => {
      if (err) {
        console.log(chalk.red.inverse(`La ruta introducida ${origen} no existe o es incorrecta`));
      } else {
        const cp = spawn(`cp`, [`-r`, origen, destino]);
        cp.stdout.pipe(process.stdout);
        console.log(`${origen} ha sido copiado correctamente`);
      }
    });
  }
}

const prueba: App4 = new App4();

yargs.command({
  command: 'show',
  describe: 'Dada una ruta concreta, mostrar si es un directorio o un fichero.',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' ) {
      prueba.comandoShow(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.command({
  command: 'mkdir',
  describe: 'Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' ) {
      prueba.comandoMkdir(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});


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

yargs.command({
  command: 'cat',
  describe: 'Mostrar el contenido de un fichero',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' ) {
      prueba.comandoCat(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.command({
  command: 'rm',
  describe: 'Borrar ficheros y directorios',
  builder: {
    name: {
      describe: 'Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.name === 'string' ) {
      prueba.comandoRm(argv.name);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});

yargs.command({
  command: 'cp',
  describe: 'Mover y copiar ficheros y/o directorios de una ruta a otra.',
  builder: {
    origen: {
      describe: 'Origen del fichero/directorio a copiar',
      demandOption: true,
      type: 'string',
    },
    destino: {
      describe: 'Destino del fichero/directorio a copiar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.origen === 'string' && typeof argv.destino === 'string') {
      prueba.comandoCp(argv.origen, argv.destino);
    } else {
      console.log(chalk.red("Hubo un error al introducir los comandos para añadir una nota"));
    }
  },
});


yargs.argv;
