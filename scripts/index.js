import Curso from "./classes/Curso.js"
import Profesor from "./classes/Profesor.js"
import Alumno from "./classes/Alumno.js"

//Instanciando objetos de la clase Curso
const Html = new Curso("HTML desde cero", "https://edteam-media.s3.amazonaws.com/courses/medium/26557907-0555-427e-a40c-6ff207f98d72.png", 10)

const CSS = new Curso("CSS desde cero", "https://edteam-media.s3.amazonaws.com/courses/medium/daa72e4e-c5d0-406e-9f6d-01e646bf719b.png", 8)

const JavaScript = new Curso('JavaScript desde cero', 'https://edteam-media.s3.amazonaws.com/courses/medium/61e5a210-8dab-412e-a6dc-802c070cc18c.jpg', 10)

// console.log(html)
// console.log(css)

const element = document.getElementById("cursos")

//Imprime un curso en el DOM
//Recibe un objeto de tipo Curso

function mostrarCursos(curso) {
    const hijo = document.createElement("div")
    hijo.classList.add("card")
    hijo.innerHTML = `
        <div class="img-container s-ratio-16-9 s-radius-tr s-radius-tl">
         <img src="${curso.getPoster()}" alt="${curso.getNombre()}"/>
        </div>
        <div class="card__data s-border s-radius-br s-radius-bl s-pxy-2">
         <h3 class="t5 s-mb-2 s-center">${curso.getNombre()}</h3>
         <div class="s-center">
         <span class="small"># de clases: ${curso.getClases()}</span>
         </div>
        </div>      
        `
    element.appendChild(hijo)
}

//Llamadas a la función mostrar curso
// mostrarCursos(html)
// mostrarCursos(css)
const formulario = document.getElementById("formCursos")
formulario.addEventListener("submit", e => {
    e.preventDefault()
    const target = e.target
    // console.log(target.nombreCurso.value)
    // console.log(target.posterCurso.value)
    // console.log(target.clasesCurso.value)
    const curso = new Curso (target.nombreCurso.value, target.posterCurso.value, target.clasesCurso.value)
    mostrarCursos(curso)
    insertarListadoCursos(obtenerNombresCursos())
    formulario.reset()
})

const profe = new Profesor("Beto", "Quiroga", "beto@gmail.com", true, ["React", "Drupal"], 20)
// console.log(profe)

const alumno1 = new Alumno("Juanito", "Perez", "juanito@gmail.com", false, ["HTML", "CSS"])
// console.log(alumno1)

const alumno2 = new Alumno("Maria", "Paz", "maria@gmail.com", true, ["Drupal", "JS"])
// console.log(alumno2)

const html = new Curso("HTML desde cero", "mi-poster.png", 7)

html.setInscritos([...html.getInscritos(), alumno1])
console.log(html)

html.setInscritos([...html.getInscritos(), alumno2])
console.log(html)

/**
 * Obtiene un listado de los nombres
 * de los cursos que estan en el DOM
 */
const obtenerNombresCursos = () => {
    const tableroCursos = document.getElementById('cursos');
    const listaCursos = [...tableroCursos.querySelectorAll('.card')];

    let listadoNombresCursos = ['Ninguno']
    for (const curso of listaCursos) {
        const nombreCurso = curso.querySelector('h3').textContent
        listadoNombresCursos.push(nombreCurso)
    }

    return listadoNombresCursos
}

/**
 * Insertar las opciones al input
 * del listado de cursos. Estas opciones deben ser
 * los cursos que estan en el DOM
 */
const insertarListadoCursos = (nombresCursos) => {
    const formListadoCursos = document.getElementById('cursosList');
    //Para evitar que se dupliquen valores, primero elimino el contenido de select

    formListadoCursos.innerHTML = ``

    for (const nombre of nombresCursos) {
        const newOption = document.createElement('option');
        newOption.value = nombre
        newOption.textContent = nombre

        formListadoCursos.append(newOption)
    }
}

/**
 * Agregar el evento de agregar cursos
 * al textArea
 */
const btn_agregar = document.getElementById('addCursoButton');
btn_agregar.addEventListener('click', function (event) {
    event.preventDefault()
    const formListadoCursos = document.getElementById('cursosList');

    const cursosAsignados = document.getElementById('CursosAsignados');

    if (cursosAsignados.textContent.includes(formListadoCursos.value)) {
        alert('Este curso ya ha sido asignado')
        return
    }

    if (formListadoCursos.value === 'Ninguno') {
        cursosAsignados.textContent = ``
    } else if (cursosAsignados.value === ``) {
        cursosAsignados.textContent = `${formListadoCursos.value}`
    } else {
        cursosAsignados.textContent = `${cursosAsignados.value}, ${formListadoCursos.value}`
    }
})

/**
 * Evento que elimina el ultimo curso del textArea de cursos
 */
const btn_eliminar = document.getElementById('deleteCursoButton');
btn_eliminar.addEventListener('click', function (event) {
    event.preventDefault()

    const cursosAsignados = document.getElementById('CursosAsignados');
    let listadoCursosPropios = cursosAsignados.textContent.split(',')

    let listaCursos = []

    listadoCursosPropios.forEach(element => {
        listaCursos.push(element.trim())
    });

    listaCursos.pop()

    cursosAsignados.textContent = ``
    for (const curso of listaCursos) {
        if (cursosAsignados.value === ``) {
            cursosAsignados.textContent = `${curso}`
        } else {
            cursosAsignados.textContent = `${cursosAsignados.value}, ${curso}`
        }
    }
})

/**
 * Obtiene un array de los nombres de los cursos que se encuentran
 * en el textArea 
 */
const getCursosForm = () => {
    const formCursoAsignados = document.getElementById('CursosAsignados'),
        stringCursos = formCursoAsignados.textContent,
        arrayCursos = stringCursos.split(',');

    let listaCursos = []

    arrayCursos.forEach(element => {
        listaCursos.push(element.trim())
    });

    return listaCursos
}


/**
 * Evento que evalua y agrega un usuario a la tabla de usuarios
 */
const formUsers = document.getElementById('formUsers');
formUsers.addEventListener('submit', function (event) {
    event.preventDefault()

    // console.log(event.target.userName.value);
    // Otra forma acceder a los valores de manera mas rapida
    /** 
     * console.log(this.userType); // Devuelve el listado de radioButtons
     * console.log(this.userType[0].checked); //Comprueba si el primer elmento esta selecionado
     * console.log(this.userName.value);
     * console.log(this.userLastName.value);
     * console.log(this.userActive.checked);
     * console.log(this.userRanking.value);
     * console.log(this.CursosAsignados.value);
     */

    const cursosAsignados = getCursosForm()
    const newFila = document.createElement('tr');

    let usuario;
    let tipo;
    if (this.userType[0].checked === true) {
        tipo = 'Alumno'
        usuario = new Alumno(
            this.userName.value,
            this.userLastName.value,
            this.userEmail.value,
            this.userActive.checked,
            cursosAsignados
        )

        newFila.innerHTML = `
        <td>${usuario.getNombres()}</td>
        <td>${usuario.getCorreo()}</td>
        <td>${usuario.getActivo() ? 'Es activo' : 'No es Activo'}</td>
        <td>${tipo}</td>
        <td>${usuario.getCursosTomados()}</td>
        <td>Nada</td>
        `
    } else {
        tipo = 'Profesor'
        usuario = new Profesor(
            this.userName.value,
            this.userLastName.value,
            this.userEmail.value,
            this.userActive.checked,
            cursosAsignados,
            this.userRanking.value
        )

        newFila.innerHTML = `
        <td>${usuario.getNombres()}</td>
        <td>${usuario.getCorreo()}</td>
        <td>${usuario.getActivo() ? 'Es activo' : 'No es Activo'}</td>
        <td>${tipo}</td>
        <td>${usuario.getCursosDictados()}</td>
        <td>${usuario.getCalificacion()}</td>
        `
    }

    const tableBody = document.getElementById('tablebody');
    tableBody.append(newFila)
})

/**
 * Deshabilita el input calificación cuando
 * se seleciona que es un alumno
 */
const radioStudent = document.getElementById('radioStudent');
radioStudent.addEventListener('click', ()=>{
    const calification = document.getElementById('userRanking');
    calification.setAttribute('disabled','true')
})

/**
 * Habilita la opcion de califiacion cuando se seleciona
 * la opcion de profesor
 */
const radioTeacher = document.getElementById('radioTeacher');
radioTeacher.addEventListener('click', ()=>{
    const calification = document.getElementById('userRanking');
    calification.removeAttribute('disabled')
})

mostrarCursos(Html)
mostrarCursos(CSS)
mostrarCursos(JavaScript)
insertarListadoCursos(obtenerNombresCursos())