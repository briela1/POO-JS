export default class Usuario {
    constructor(nombres, apellidos, correo, activo) {
        this.nombres = nombres,
        this.apellidos = apellidos,
        this.correo = correo,
        this.activo = activo
    }

    presentarse () {
        return `Hola, soy ${this.nombre} y mi correo es: ${this.correo}`
    }

    getNombres () {
        return this.nombres
    }

    getApellidos () {
        return this.apellidos
    }

    getCorreo = () => this.correo
    getActivo = () => this.activo

    setApellido (newNombres){
        this.nombres = newNombres
    }
    setApellido (newApellidos){
        this.apellidos = newApellidos
    }
    setCorreo (newCorreo){
        this.correo = newCorreo
    }
    setActivo (newActivo){
        this.activo = newActivo
    }
}