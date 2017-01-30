 var noteApp = angular.module("noteApp", ['ngStorage']);
 
 noteApp.controller("NoteController", function($scope, $localStorage){
	 
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
	
	$scope.increaseOffset= function () {
	if ($scope.startPosition['x']>500||$scope.startPosition['y']>500) {
		$scope.startPosition['x']=30;
		$scope.startPosition['y']=95;
	} else {
		$scope.startPosition['x']+=40;
		$scope.startPosition['y']+=40;
	}
	};
	
	$scope.addNote = function() {
	  $scope.notes.push({title:'', message:'', color:$scope.activeColor,x:$scope.startPosition['x']+'px',y:$scope.startPosition['y']+'px'});
	  $scope.increaseOffset();
	  $scope.saveData();
	};
	
	$scope.sampleNotes = [
	  {title:'Do this!', message:'-Finish this app\n-Celebrate\n-Relax', color:'yellow', x:'100px', y:'100px'},
	  {title:'Do something', message:'Eat a whole pizza', color:'orange', x:'200px', y:'200px'},
	  {title:'Remember something', message:'Long text is looooooooooooooooooooooooooooooooooooooooooong', color:'cyan', x:'300px', y:'300px'},
	  {title:'Brainstorm!', message:'*Think of something new\n*Try it', color:'blue', x:'400px', y:'400px'},
	  {title:'GGroceries', message:'+Carrots \n+Tomatos \n+Potatoes', color:'black', x:'500px', y:'500px'}
	];
	
	$scope.loadSampleNotes = function () {
		$scope.notes=$scope.notes.concat($scope.sampleNotes);
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
noteApp.directive('ngDraggable', function($document) {
  return {
    restrict: 'A',
    scope: {
      dragOptions: '=ngDraggable'
    },
    link: function(scope, elem, attr) {
      var startX, startY, x = 0, y = 0,
          start, stop, drag, container;

      var width  = elem[0].offsetWidth,
          height = elem[0].offsetHeight;

      // Obtain drag options
      if (scope.dragOptions) {
        start  = scope.dragOptions.start;
        drag   = scope.dragOptions.drag;
        stop   = scope.dragOptions.stop;
        var id = scope.dragOptions.container;
        if (id) {
            container = document.getElementById(id).getBoundingClientRect();
        }
      }

      // Bind mousedown event
      elem.on('mousedown', function(e) {
        startX = e.clientX - elem[0].offsetLeft;
        startY = e.clientY - elem[0].offsetTop;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        if (start) start(e);
      });

      // Handle drag event
      function mousemove(e) {
        y = e.clientY - startY;
        x = e.clientX - startX;
        setPosition();
        if (drag) drag(e);
      }

      // Unbind drag events
      function mouseup(e) {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        if (stop) stop(e);
      }

      // Move element, within container if provided
      function setPosition() {
        if (container) {
          if (x < container.left) {
            x = container.left;
          } else if (x > container.right - width) {
            x = container.right - width;
          }
          if (y < container.top) {
            y = container.top;
          } else if (y > container.bottom - height) {
            y = container.bottom - height;
          }
        }

        elem.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
    }
  }

});
