# Info Proyecto
    Creacion de login con autenticación por Jason Web Token (JWT) utilizando js, mongodb, express
    Aplicación que utilizó bcrypt para encriptar y comparar contraseñas y además proteger ruta admin si es que no tienes un token

    El token es generado al momento de hacer un login y con ese token al entrar al admin se debe pasar por el header para que te permita pasar.

# Dependencias

* @hapi/joi -> Permite validar campos, por ej que el correo tenga un min y largo, sea escrito como un correo valido, etc