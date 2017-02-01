 var noteApp = angular.module("noteApp", ['ngStorage']);
 
 noteApp.controller("NoteController", function($scope, $localStorage, $window){
	 
	$scope.saveData = function() {
		$localStorage.notes=$scope.notes;
	};
	
	$scope.loadData = function() {
		$scope.notes= $localStorage.notes;
	};
	
	$scope.startPosition = {
		x:30,
		y:95
	};
	
	$scope.getFreePosition= function(){
		var freeX=30;
		var freeY=95;
		if($scope.getNoteCount!=0){
			var flag=false;
			while(!flag){
				flag=true;
				
				$scope.notes.forEach( function(note){
					while(!((316+30+note.x)<freeX||(324+30+note.y)<freeY||(316+30+freeX)<note.x||(324+30+freeY)<note.y)){	
						flag=false;						
						if((freeX+316+30)<$scope.getScreenWidth()){
							freeX+=10;
						} else {
							freeX=30;
							freeY+=10;
						}
					}		
				});
			}
		}
		
		$scope.startPosition['x']=freeX;
		$scope.startPosition['y']=freeY;
		
	};
	
	$scope.getScreenWidth = function() {
		return $window.innerWidth;
	}
	
	$scope.addNote = function() {
		$scope.getFreePosition();
		$scope.notes.push({title:'', message:'', color:$scope.activeColor,x:$scope.startPosition['x'],y:$scope.startPosition['y']});
		$scope.saveData();
	};
	
	$scope.sampleNotes = [
		{title:'Do this!', message:'-Finish this app\n-Celebrate\n-Relax', color:'yellow'},
		{title:'Do something', message:'Eat a whole pizza', color:'orange'},
		{title:'Remember something', message:'Long text is looooooooooooooooooooooooooooooooooooooooooong', color:'cyan'},
		{title:'Brainstorm!', message:'*Think of something new\n*Try it', color:'blue'},
		{title:'Groceries', message:'+Carrots \n+Tomatos \n+Potatoes', color:'black'}
	];
	
	$scope.loadSampleNotes = function () {
		$scope.sampleNotes.forEach( function (note) {
			$scope.getFreePosition();
			$scope.notes.push({title:note.title, message:note.message, color:note.color,x:$scope.startPosition['x'],y:$scope.startPosition['y']});
		})
		$scope.saveData();
	};
 
	$scope.deleteAll = function() {
		$scope.notes= [];
		$scope.saveData();
	};
	 
	$scope.getNoteCount = function() {
		return $scope.notes.length;
	};
	
	$scope.deleteNote = function(idx) {
		$scope.notes.splice(idx, 1);
		$scope.saveData();
	};
	 
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
	 
	 if($localStorage.notes !== undefined && $localStorage.notes !== null) { 
		$scope.notes = $localStorage.notes;
	} else {
		$scope.notes = [];
		$scope.loadSampleNotes();
	}
	
 });
noteApp.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);
noteApp.directive('draggable', function($document) {
  return {
	scope: {note: '='},
    link: function(scope, element, attr) {
		var startX = 0,
		startY = 0,
		x = 0,
		y = 0; 
		var container = null;
		
		element.on('mousedown', function(event) {
		  
		  container = attr.$$element.parent().parent();
		  startX = event.screenX - container[0].offsetLeft;
		  startY = event.screenY - container[0].offsetTop;
		  $document.on('mousemove', mousemove);
		  $document.on('mouseup', mouseup); 
		});

		function mousemove(event) {
		  y = event.screenY - startY;
		  x = event.screenX - startX;
		  container.css({
			top: y + 'px',
			left: x + 'px'
		  });
		}

		function mouseup() {
		  $document.unbind('mousemove', mousemove);
		  $document.unbind('mouseup', mouseup);
		  scope.note.x=x;
		  scope.note.y=y;
		}
	}
  }
}); 