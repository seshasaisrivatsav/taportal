/**
 * Created by anvitasurapaneni on 12/7/16.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("selectedApplicationController", selectedApplicationController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function selectedApplicationController($routeParams, $location, UserService, $rootScope,PositionService, applicationsService) {
        var vm = this;


        // Author: Srivatsav | for sorting
        vm.orderByField = 'application';
        vm.reverseOrder = false;

        vm.rateStudent = rateStudent;
        //  vm.findAverage = findAverage;
        var faculty;
        vm.possss;
        vm.avg1;
        vm.apps;
        vm.getApplications = getApplications;


        vm.userId = $rootScope.currentUser._id;
        vm.logout = logout;
        var userId = $rootScope.currentUser._id;

        vm.posId1 = $routeParams.posId;
        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            //console.log(vm.posId1);
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    faculty = response.data;
                   // console.log(faculty);
                });

            PositionService
                .findPositionById(vm.posId1)
                .then(function (response) {
                    vm.Position = response.data;
                    
                    getApplications(vm.Position);
                });



        }
        init();



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                  //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        function rateStudent(StudentID, rating) {

            UserService
                .findUserById(StudentID)
                .then(
                    function (response) {

                    var  rating1 = response.data.rating;
                        //if(response.data.rating == undefined){
                        //    rating1 = [];
                        //}
                        var ratingAll = [];


                        var ratingNew =   {
                            _user : faculty._id, //in model
                            //ratedBy: String,
                            rating: rating
                        };


                        for (var i = 0; i < rating1.length; i++) {
                           if(rating1[i]._user != ratingNew._user){
                               ratingAll.push(rating1[i]);
                           }

                        }
                        ratingAll.push(ratingNew);





                        var ii = {
                            array12: ratingAll
                        };



                        UserService
                            .rateStudent(StudentID, ii)
                            .then(
                                function (response1) {

                                 init();
                                });

                    });




        }






        function getApplications(position) {
            //$rootScope.pos = position;
            //vm.possss = position;
            //var position = vm.Position;
            applicationsService
                .getApplicationsForPosition(position._id)
                .then(function(response){
                        var apps1 = response.data;

                        //    console.log(apps1.length);
                        var apps2 = [] ;
                        var j = -1;
                        var ratingGiven = 1;
                        for(var i =0; i<apps1.length; i++){
                            // console.log(i);
                            var sid = apps1[i]._user;
                           // console.log(sid);
                            UserService
                                .findUserById(sid).then(
                                function(response1){
                                //    console.log(response1);

                                   // console.log(response1);

                                    j++;
                                    var   ratingavg = response1.data.avgRating;

                                    var rateval = 1;
                                    if(ratingavg > 1){
                                        rateval = ratingavg;
                                    }
                                 //   console.log(rateval);
                                    //var app1 = {};
                                    var   app1 = {

                                        "_id":apps1[j]._id,"priority":apps1[j].priority,"_position":apps1[j]._position,
                                        "previouslyTaken":apps1[j].previouslyTaken,"gradeObtained":apps1[j].gradeObtained,
                                        "beenTASemester":apps1[j].beenTASemester,"availability": apps1[j].availability,
                                        "_user":apps1[j]._user,"__v":apps1[j].__v,"rating":apps1[j].rating,
                                        "ratingvalue": rateval, username: response1.data.username

                                    };

                                    apps2.push(app1);

                                    $rootScope.apps = apps2;
                               //     console.log( $rootScope.apps);
                               //      init();

                                });

                        }

                        //  console.log($rootScope.apps);
                        //$location.url("/applicationsForCource");
                    }

                );

        }


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        // Author: Sesha Sai Srivatsav

        function findAllPositions() {
            PositionService
                .findAllPositions()
                .then(function (response) {
                    var pos = response.data;

                    for(i=0; i<pos.length; i++){
                        var temp = pos[i].deadline;
                        pos[i].deadline = new Date(temp);
                    }


                    vm.positions = pos;
                    possss = pos[-1];
                    //console.log(  vm.positions);
                    vm.positionCount = vm.positions.length;

                });
        }


        // Author: Sesha Sai Srivatsav
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }
        // Author: Sesha Sai Srivatsav
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/login");
                    }else{
                        vm.error = "can't delete you."
                    }
                });
        }

        // Author: Sesha Sai Srivatsav
        function updateUser(user){
            UserService
                .updateUser(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if (updatedUser){
                        vm.success="successfully updated!";
                    }else{
                        vm.error = "Some thing doesn't seem right here";
                    }
                });
        }



    }


})();
