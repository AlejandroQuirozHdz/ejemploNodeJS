 
var moduloUsuarios = angular.module("pvAdmin", []);
moduloUsuarios.controller('Administrar',['$scope','$http','$location', function($scope,$http,$location) {
	 
	console.log("Archivo administrarArticulos.js");
	
	$scope.newPersona = {};
 	$scope.personas = [];
	$scope.selected = false;

$scope.getDatos = function() {
	// Obtenemos todos los datos de la base de datos
	$http.get('/api/persona').then(function(response) {
		$scope.personas = response.data;
	}, function(response) {
		console.log('Error: ' + response);
	});

	
};


	// Función para registrar a una persona

	$scope.registrarPersona = function(marcaForm) {
		
		var parameter = $scope.newPersona;
		$http.post('/api/persona', parameter)
		.then(function(response) {
			console.log("DATA: " + response.data);
			console.log("SUCCESS addUSer");
		
		}, function(response) {
			console.log("DATA: " + response.data);
			console.log("ERROR USer");
			
		});
	 };

	
	// Función para editar los datos de una persona
	$scope.modificarPersona = function(newPersona) {
		
		var parameter = $scope.newPersona;
		$http.post('/api/personaUpdat', parameter)
		.then(function(response) {
			//$scope.newPersona = {}; // Borramos los datos del formulario
				//$scope.personas = response.data;
				$scope.selected = false;
				$scope.getDatos();
		}, function(response) {
			console.log('Error: ' + data);
		});

		
	};

	// Función que borra un objeto persona conocido su id
	$scope.borrarPersona = function(newPersona) {
		var parameter = $scope.newPersona;
		$http.post('/api/borrar', parameter)
		.then(function(response) {
		
			$scope.personas = response;
			$scope.selected = false;
			$scope.getDatos();
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	// Función para coger el objeto seleccionado en la tabla
	$scope.selectPerson = function(persona) {
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	};

	$scope.getDatos();
}]);