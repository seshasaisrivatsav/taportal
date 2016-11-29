/**
 * Created by seshasai on 11/17/2016.
 */


/**
 * Created by seshasai on 11/16/2016.
 */
///ManageCoursesSemestersController

(function () {
    angular
        .module("TaPortal")
        .controller("ManageCreateApplicationsController",ManageCreateApplicationsController);

    function ManageCreateApplicationsController($rootScope, $location, $sce, UserService,CoursesandSemestersService) {
        var vm = this;


        vm.createCourse = createCourse;
        vm.createSemester = createSemester;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.deleteSemester = deleteSemester;
        vm.updateSemester = updateSemester;

        function init() {

        }
        init();


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        // Author: Sesha Sai Srivatsav

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }



    }
})();