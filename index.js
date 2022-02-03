const prompt = require('prompt')

// lista de tareas por hacer
const arrayTasks = []

const arrayPriority = ['LOW', 'MEDIUM', 'HIGH']


//Iniciamos prompt

prompt.start()


function start() {
  const schema = {
    description: `Selecciona lo que deseas hacer:
    [1]. Crear Tarea
    [2]. Ver mis Tareas
    [3]. Finalizar una Tarea` 
  }

  prompt.get(schema, function (err, result) {
    const operation = parseInt(result.question)

    switch (operation) {
      case 1:
        createTask()
        break

      case 2:
        listTask()
        break
    
      case 3:
        modifyTask()
       break
    }
  })
}

// lista de tareas que ya hice
// listar tareas
// crear tareas
async function createTask () {
  const newTask = { active: true }
  const schemaCreate = {
    description: `Describa la tarea` 
  }

  const { question } = await prompt.get(schemaCreate)

  newTask.description = question

  const schemaPriority = {
    description: `Que prioridad tiene esta tarea:
    [1]. LOW
    [2]. MEDIUM
    [3]. HIGH
    ` 
  }

  const priorityPromt = await prompt.get(schemaPriority)
  const priority = parseInt(priorityPromt.question)
  newTask.priority = arrayPriority[priority -1]

  // added al array
  arrayTasks.push(newTask)

  console.log('Tarea creada Correctamente!!')
  
  start()
}

async function listTask () {
  console.log('... LISTA DE TAREAS ...') 
  
  await getTask()

  start()
}

function getTask() {
  for (const [i, task] of arrayTasks.entries()) {
    const active = task.active ? 'ACTIVA' : 'INACTIVA'
    console.log(`[${i + 1}] - ${task.description} - ${task.priority} - ${ active } `) 
  }
}

async function modifyTask () {
  await getTask()

  const finallyPromt = await prompt.get({ description: 'Que Tarea deseas finalizar?' })

  const taskId = parseInt(finallyPromt.question) 

  // encontrar la tarea y modificarla

  const taskFound = arrayTasks[taskId - 1]

  taskFound.active = false

  console.log('Tarea finalizada Correctamente!!')

  start()
}


start()
