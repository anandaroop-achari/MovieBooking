var app = angular.module('bookingApp',[]);
app.controller('ctrlBooking', function($scope){
	$scope.seatList = []
	$scope.users = [];
	$scope.rows=[];
	$scope.columns = [];
	$scope.init = function(){
		for(var i=0;i<10;i++){
			$scope.seatList.push({label:String.fromCharCode(i+65), row:i, cols:[]});
			for(var j=0;j<12;j++){
				$scope.seatList[i].cols.push({
					col: j,
					booked: 'E'
				})
				if($scope.columns.length<12){
					$scope.columns.push(j);
				}
			}
			$scope.rows.push(i);
		}
		$scope.tempUser = {
			name:'',
			noOfSeats:0,
			selectedSeats:[]
		};
		$scope.availableSeats = $scope.rows.length*$scope.columns.length;
		$scope.errorMessage = "";
		console.log($scope.seatList);
	};
	$scope.checkAvailability = function(){
		if($scope.tempUser.noOfSeats>$scope.availableSeats){
			$scope.errorMessage = "Sorry. " + $scope.tempUser.noOfSeats+" seats are not available";
		} else{
			$scope.errorMessage = "";
		}
	}
	$scope.selectSeat=function(m,n){
		if($scope.tempUser.name !== '' && $scope.tempUser.noOfSeats !== 0 && $scope.errorMessage === ""){
				if($scope.tempUser.selectedSeats.length < $scope.tempUser.noOfSeats && m.booked === 'E'){
					m.booked = "S";
					$scope.tempUser.selectedSeats.push({row: n, col: m.col});
				}
			else if(m.booked==='S'){
				m.booked = "E";
				for(var x in $scope.tempUser.selectedSeats){
					if($scope.tempUser.selectedSeats[x].row === n && $scope.tempUser.selectedSeats[x].col === m.col){
						$scope.tempUser.selectedSeats.splice(x,1);
					}
				}
			}
		}
	};
	$scope.confirmBooking = function(){
		for(var k in $scope.tempUser.selectedSeats){
			var x = $scope.tempUser.selectedSeats[k].row;
			var y = $scope.tempUser.selectedSeats[k].col;
			$scope.seatList[x].cols[y].booked = "B";
			$scope.tempUser.selectedSeats[k].row = String.fromCharCode($scope.tempUser.selectedSeats[k].row+65)
		}
		console.log($scope.tempUser);
		$scope.users.push({name: $scope.tempUser.name, noOfSeats: $scope.tempUser.noOfSeats,selectedSeats : $scope.tempUser.selectedSeats});
		$scope.tempUser.name = "";
		$scope.tempUser.noOfSeats=0;
		$scope.availableSeats-=$scope.tempUser.selectedSeats.length;
		$scope.tempUser.selectedSeats = [];
		console.log($scope.availableSeats);

	};
	
});
