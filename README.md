Virtual Restaurant
==================

Virtual Restaurant es una plataforma culinaria que permite visualizar
recetas de diferentes establecimientos.

A través de este administrador web se puede configurar todo lo relacionado
a la aplicación como por ejemplo las categorías, recetas, establecimientos,
patrocinadores.

# Requerimientos

Este proyecto hace uso de node 0.12. Adicionalmente se requiere lo siguiente:

* Gruntjs
* bower
* less

# Instanciación

Para instanciar el proyecto, primero se debe clonar el repositorio:

		$ git clone git@bitbucket.org:tek3-repo/restaurants-app-gestor-web.git

Una vez que se haya clonado el código, se deben instalar las dependencias:

		$ npm install
		$ bower install

# Preview y compilación

Correr servidor de desarrollo:

		$ grunt serve

Compilar versión desplegable:

		$ grunt build

*La plantilla administrativa base fue desarrollada por Soluciones Drag & Drop, C.A.*
