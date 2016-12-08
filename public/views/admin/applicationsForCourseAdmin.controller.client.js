/**
 * Created by anvitasurapaneni on 12/7/16.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("ShowApplicationController", ShowApplicationController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function ShowApplicationController($routeParams, $location, UserService, $rootScope,PositionService, applicationsService) {
        var vm = this;

        vm.giveDecision = giveDecision;

        vm.getApplicationsByPosId = getApplicationsByPosId;

        //vm.getApplications = getApplications;

        vm.orderByField = 'application';
        vm.reverseOrder = false;

        
        vm.userId = $rootScope.currentUser._id;
        vm.logout = logout;
        var userId = $rootScope.currentUser._id;

        vm.posId1 = $routeParams.posId;
        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            vm.posId1 = $routeParams.posId;
            console.log(vm.posId1);

            PositionService
                .findPositionById(vm.posId1)
                .then(function (response) {
                    vm.Position = response.data;

                    getApplicationsByPosId(vm.Position);
                });


            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    admin = response.data;
                    // console.log(faculty);
                });




        }
        init();



        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Anvita                                                  //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        function giveDecision(Appid, decision) {

            console.log(Appid);
            console.log(decision);

            applicationsService
                .GiveDecisionforApp(Appid, decision)
                .then(
                    function (response1) {
console.log(response1.data);
                        init();
                    });

        }






        function getApplicationsByPosId(position) {

            //$rootScope.pos = position;
            //vm.possss = position;
            //var position = vm.Position;
            applicationsService
                .getApplicationsForPosition(position._id)
                .then(function(response){
                    console.log(response);

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
                                        "ratingvalue": rateval, username: response1.data.username, status: apps1[j].status

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
        //function deleteUser() {
        //    UserService
        //        .deleteUser(userId)
        //        .then(function (response) {
        //            var result= response.data;
        //            if(result){
        //                $location.url("/login");
        //            }else{
        //                vm.error = "can't delete you."
        //            }
        //        });
        //}

        // Author: Sesha Sai Srivatsav
        //function updateUser(user){
        //    UserService
        //        .updateUser(userId, user)
        //        .then(function (res) {
        //            var updatedUser = res.data;
        //            if (updatedUser){
        //                vm.success="successfully updated!";
        //            }else{
        //                vm.error = "Some thing doesn't seem right here";
        //            }
        //        });
        //}



    }


})();
