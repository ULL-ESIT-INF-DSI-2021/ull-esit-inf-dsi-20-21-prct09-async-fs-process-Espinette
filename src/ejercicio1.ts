import {access, constants, watch} from 'fs';

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

/*
* TRAZA DE EJECUCIÓN DEL CODIGO, SEGUN SE NOS PIDE EN EL ENUNCIADO
*
* Iteración inicial, Todo vacio :

    Pila de llamadas:
    -

    Registro de eventos:
    -

    Cola de manejadores:
    -

    Consola:
    -

* Primera iteración, el script main se coloca en la pila de llamadas, el resto siguen vacios:

    Pila de llamadas:
    -main

* Segunda iteración, se comprueba si el fichero existe con la constante F_OK, introduciendo la función acces en la pila de llamadas:

    Pila de llamadas:
    -access
    -main

* Tercer iteración, access al no ser un elemento de JavaScript pasa directamente al registros de eventos:

    Pila de llamadas:
    -main

    Registro de eventos:
    -access

* Cuarta iteración, el manejador de access se introduce en la cola de manejadores, además access sale del registro de eventos:

    Cola de manejadores:
    -manejador access

* Quinta iteración, al ser el primero de la cola de manejadores se inserta en la pila de llamadas:

    Pila de llamadas:
    -manejador access

* Sexta iteración, comienza la ejecución del manejador entrando en la pila de llamadas el primer console.log:

    Pila de llamadas:
    -console.log(`Starting to watch file ${filename}`)
    -manejador access

* Septima iteracion, se ejecuta el console log mostrandolo por consola:

    Pila de llamadas:
    -manejador access

    Consola:
    - Starting to watch file helloworld.txt

* Octava iteración, entra watch(process.argv[2]) a la pila de llamadas:

    Pila de llamadas:
    -watch(process.argv[2])
    -manejador access

    Consola:
    - Starting to watch file helloworld.txt

* Novena iteración, watch(process.argv[2]) al no ser un elemento de JavaScript pasa directamente al registros de eventos:

    Pila de llamadas:
    -manejador access

    Registro de eventos:
    -watch(process.argv[2])

    Consola:
    - Starting to watch file helloworld.txt

* Decima iteración, watch(process.argv[2]) sale del registro de eventos:

    Pila de llamadas:
    -manejador access

    Consola:
    - Starting to watch file helloworld.txt

* Undecima iteracion, watcher.on entra en la pila de llamadas:

    Pila de llamadas:
    -watcher.on('change')
    -manejador access

    Consola:
    - Starting to watch file helloworld.txt

* Duodecima iteracion, watcher.on al no ser un elemento de JavaScript pasa directamente al registros de eventos:

    Pila de llamadas:
    -manejador access

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt

* Decimotercera iteracion, watcher.on se mantiene en ejecución y sigue el flujo introduciendo en la pila de llamadas console.log(`File ${filename} is no longer watched`);

    Pila de llamadas:
    console.log(`File ${filename} is no longer watched`);
    -manejador access

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt

* Decimocuarta iteracion, se ejecuta el console.log de la pila de llamadas mostrandose por consola:

    Pila de llamadas:
    -manejador access

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched

* Decimoquinta iteracion, el manejador access, sale de la pila de llamadas y como esta se encuentra vacía, el programa el programa se que esperando a que se active el evento watcher.on, por lo que editaremos el fichero helloworld.txt:

    Registro de eventos:
    -watcher.on('change')

    Cola de manejadores:
    -console.log(`File ${filename} has been modified somehow`);

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched

* Decimosexta iteracion,el manejador pasa a la pila de llamadas empezandose a ejecutar:

    Pila de llamadas:
    -console.log(`File ${filename} has been modified somehow`);

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched

* Decimo septima iteracion, se ejecuta el console.log de la pila y se muestra por consola:

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched
    - File helloworld.txt has been modified somehow

* Decimo octava iteracion, ahora volvemos a editar el fichero helloworld.txt como se nos pide y se repetirá lo mismo que desde el paso decimo quinto hasta el actual:

    Registro de eventos:
    -watcher.on('change')

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched
    - File helloworld.txt has been modified somehow
    - File helloworld.txt has been modified somehow

* Decimo novena teracion, cerramos el rograma saliendo asií del registro de eventos watcher.on:

    Consola:
    - Starting to watch file helloworld.txt
    - File helloworld.txt is no longer watched
    - File helloworld.txt has been modified somehow
    - File helloworld.txt has been modified somehow
*/
