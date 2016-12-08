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
                        init();
                    });

        }






        function getApplicationsByPosId(position) {
            applicationsService
                .getApplicationsForPosition(position._id)
                .then(function(response){
                    console.log(response);

                        var apps1 = response.data;

                        var apps2 = [] ;
                        var j = -1;
                        var ratingGiven = 1;
                        for(var i =0; i<apps1.length; i++){

                            var sid = apps1[i]._user;

                            UserService
                                .findUserById(sid).then(
                                function(response1){
                                    j++;
                                    var   ratingavg = response1.data.avgRating;
                                    var rateval = 1;
                                    if(ratingavg > 1){
                                        rateval = ratingavg;
                                    }

                                    var   app1 = {
                                        "avgRating" :     apps1[j].avgRating       ,
                                        "gpa"  :          apps1[j].gpa             ,
                                        "coursesTaken" :  apps1[j].coursesTaken    ,
                                        "currentCourses": apps1[j].currentCourses  ,
                                        "email" :         apps1[j].email           ,
                                        "phone"  :        apps1[j].phone           ,
                                        "resumeURL" :     apps1[j].resumeURL       ,
                                        "resumeName" :    apps1[j].resumeName      ,
                                        "_id":            apps1[j]._id,
                                        "priority":       apps1[j].priority,
                                        "_position":apps1[j]._position,
                                        "previouslyTaken":apps1[j].previouslyTaken,"gradeObtained":apps1[j].gradeObtained,
                                        "beenTASemester":apps1[j].beenTASemester,"availability": apps1[j].availability,
                                        "_user":apps1[j]._user,"__v":apps1[j].__v,"rating":apps1[j].rating,
                                        "ratingvalue": rateval, username: response1.data.username, status: apps1[j].status,


                                    };

                                    apps2.push(app1);
                                    $rootScope.apps = apps2;
                                });

                        }
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


    }


})();
