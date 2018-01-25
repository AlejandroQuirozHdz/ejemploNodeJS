/**
 * 
 */
var moduloUsuarios = angular.module("pvAdmin", []);
moduloUsuarios.controller('Administrar',['$scope','$http','$location', function($scope,$http,$location) {
	 
	console.log("Archivo.js");
	$scope.numero=0;
	$scope.tabla=[];
	$scope.descarga=false;
	$scope.success = false;
	$scope.failed = false;
	$scope.csv=false;
	$scope.sql=true;
	$scope.numeroColumnas=0;
	 $('#espera').hide();
	 $('#descarga').hide();
	$scope.nameMethod = ['/consultaNombre','/consultaTipoDato','/newArchivo'];
	$scope.urlController = "/Proyecto/inicio/proyec";
	$scope.urlControlle = "/Datos/Generar";
	$scope.listado = [];
    $scope.listaTiposDatos=[];
    $scope.nombreArchivo="";
    //$ bower install sweetalert2
    //$npm install sweetalert2
	var urlGetTipoDato = $scope.urlController + $scope.nameMethod[1];
	var urlnewArchivo = $scope.urlControlle;
	
	
	
	
	
	$scope.removePerson = function(index){
		
		
			
		
		sweetAlert(
			    'Deleted!',
			    'Columna Borrada',
			    'success'
			  );
			 $scope.listado.splice(index, 1);
			 $scope.tabla.splice(index, 1);
		    	   
	   };  
	   
	   $scope.limpiar = function(){
		   $scope.csv=false;
			$scope.sql=true;
		   $scope.numero=0;
		   $scope.tabla=[];
		   $scope.numeroColumnas=0;	  
		   $scope.listado = [];
		   $scope.creacion.nombreTabla="";     
		   $scope.creacion.isSQL=1;
			$scope.creacion.caracterDelimitador=",";
			$scope.creacion.numeroRegistros=1000000;
	       	
		   };   
		   $scope.descargar = function(isSQL,nombre){
			   
	       		  
	       		  if(isSQL==0){
			     
	       			$scope.nombreArchivo=nombre+".csv";
	       		  }else{
	       			$scope.nombreArchivo=nombre+".sql";
	       		  }
	       		
	       	 
		   }; 
                   
            
	   
	   $scope.getArtCodigo = function(index){
			
		
                $scope.numeroColumnas=$scope.numeroColumnas+index;
                var config ={idLista: $scope.numeroColumnas,tipoDato:$scope.listaTiposDatos};
                    $scope.listado.push(config);
                   
		};
		
		
		$scope.getTipoDato = function(numeroColumnas){
			
			
			$http.get(urlGetTipoDato).then (function(response) {
				
				$scope.listaTiposDatos = response.data;
				$scope.creacion.isSQL=1;
				$scope.creacion.caracterDelimitador=",";
				$scope.creacion.numeroRegistros=1000000;
			}, function(response) {
				
			});
			
		};
		
		$scope.ocultar = function() {
			 
			$scope.sql=true;
			$scope.csv=false;
			$scope.creacion.caracterDelimitador=",";
			$scope.creacion.isSQL=1;
		};
		$scope.mostrar = function() {
			 
			$scope.sql=false;
			$scope.csv=true;
			$scope.creacion.isSQL=0;
		};

		 $scope.validateForm = function (miFormulario) {
			// $scope.creacion.tabla=$scope.tabla;
		        $scope.submitted=true;
		        

		       if(!miFormulario.$valid){
		       
		          
		         return;
		        
		       }else{
		    	  
		    	   $scope.crearArchivo(miFormulario);
		      
		       }
			};
		
		$scope.crearArchivo = function(creacion) {		
            
			var json= angular.toJson($scope.tabla);		
			var esSQL= $scope.creacion.isSQL;
			var nombreTabla=$scope.creacion.nombreTabla;
			var delimitador=$scope.creacion.caracterDelimitador;
			var num_registros=$scope.creacion.numeroRegistros;
			var objVenta={opciones: json, esSQL : esSQL, delimitador : delimitador, nombreTabla : nombreTabla, num_registros: num_registros};
			 $scope.descargar(esSQL,nombreTabla);
			
			$.ajax({
		        url : urlnewArchivo ,
		        type : 'GET',
		        data : {opciones: json, esSQL : esSQL, delimitador : delimitador, nombreTabla : nombreTabla, num_registros: num_registros},
		        error: function(err){
		        	
		        	sweetAlert("Exito", "Archivo Guardado!", "success");
		        	 $('#espera').hide();
		        	
		        	 $('#descarga').show();
		        	
		        },  
		        timeout: 2000, // sets timeout to 600 seconds
		        success : function(responseText){
		        	
		        	sweetAlert("Exito", "Archivo Guardado!", "success");
		        	 $('#espera').hide();
		        	 $scope.descargar();
		        },
		        beforeSend: function() {
		        	 $('#espera').show();
		        },
		        complete: function(){
		        	 $('#espera').hide();
		      	
		        }
		    });
			
		};
		
		
         
		
		 $scope.getTipoDato();
}]);