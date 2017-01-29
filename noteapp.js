 var noteApp = angular.module("noteApp", ['ngStorage']);
 
 noteApp.controller("NoteController", function($scope, $localStorage){
	 
	$scope.saveData = function() {
		$localStorage.notes=$scope.notes;
	}
	
	$scope.loadData = function() {
		$scope.notes= $localStorage.notes;
		
	}
	
	$scope.addNote = function() {
	  $scope.notes.push({title:'', message:'', color:$scope.activeColor});
	  $scope.saveData();
	};
	
	$scope.sampleNotes = [
	  {title:'Do this!', message:'-Finish this app\n-Celebrate\n-Relax', color:'yellow'},
	  {title:'Do something', message:'Eat a whole pizza', color:'orange'},
	  {title:'Remember something', message:'Long text is looooooooooooooooooooooooooooooooooooooooooong', color:'cyan'},
	  {title:'Brainstorm!', message:'*Think of something new\n*Try it', color:'blue'},
	  {title:'Groceries', message:'+Carrots \n+Tomatos \n+Potatos', color:'black'}
	];
	
	$scope.loadSampleNotes = function () {
		$scope.notes.push.apply($scope.notes, $scope.sampleNotes);
		$scope.saveData();
	};
	
	if($localStorage.notes !== undefined && $localStorage.notes !== null) { 
		$scope.notes = $localStorage.notes;
	} else {
		$scope.notes = [];
		$scope.loadSampleNotes();
	}
 
	$scope.deleteAll = function() {
		$scope.notes= [];
		$scope.saveData();
	};
	 
	$scope.getNoteCount = function() {
		return $scope.notes.length;
	}
	
	$scope.deleteNote = function(idx) {
		$scope.notes.splice(idx, 1);
		$scope.saveData();
	}
	 
	 $scope.noteColors = [
		'yellow',
		'orange',
		'cyan',
		'blue',
		'black'
	 ];
	 
	 $scope.activeColor='yellow';
	 
	 $scope.setSelected = function (idx) {
		 $scope.selected=idx;
	 };
	 
	 $scope.changeColor = function(color) {
		 $scope.activeColor=color;
		 if($scope.selected !== undefined && $scope.selected !== null) {
			$scope.notes[$scope.selected].color=color;
		 }
	 };
 });