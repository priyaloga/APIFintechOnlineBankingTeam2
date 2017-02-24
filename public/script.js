    var app= angular.module("mittens",['ngRoute','ngCookies','ngMessages', 'ui.grid', 'ui.grid.grouping', 'ui.grid.exporter', 'ui.grid.selection', 'ui.grid.edit', 'ui.grid.cellNav', 'ui.grid.pagination', 'ui.grid.resizeColumns','ui.grid', 'ui.grid.selection', 'ui.grid.autoResize', 'ui.grid.pagination']);
    var username=[];

app.config(function($routeProvider,$locationProvider){
$routeProvider
.when('/login',{
templateUrl:'home.html',
controller:'HomeController',
})
.when('/',{
templateUrl:'welcome.html',
controller:'HomeController',
})
.when('/admin',{
templateUrl:'customer.html',
controller:'adminController',
})

.when('/accountsummary',{
templateUrl:'accountsummary.html',
controller:'accountsummaryController',
})
.when('/adddeposit',{
templateUrl:'depositmoney.html',
controller:'depositController',
})
.when('/addpayee',{
templateUrl:'addpayee.html',
controller:'addpayeeController',
})
.when('/transfer',{
templateUrl:'transaction.html',
controller:'submittransferController',
})

.when('/signup',{
templateUrl:'signup.html',
controller:'SignupController',
})

.when('/reset',{
templateUrl:'reset.html',
controller:'HomeController',
})


.otherwise({
         redirectTo: '/',
         templateUrl: 'welcome.html',
         controller: "HomeController"

     });

$locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

app.run(function($cookies,$rootScope){
if($cookies.get('token')&&$cookies.get('currentUser')){
$rootScope.token=$cookies.get('token');
$rootScope.currentUser=$cookies.get('currentUser');
$rootScope.accountnum=$cookies.get('accountnum');
$rootScope.fullname=$cookies.get('fullname');
$rootScope.email=$cookies.get('email');
$rootScope.mobile=$cookies.get('mobile');
$rootScope.balance=$cookies.get('balance');
$rootScope.IFSC=$cookies.get('IFSC');



}
});
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
app.controller('adminController',function($scope, $http){

$scope.AddVisible = true;
$scope.UpdateVisible = false;
console.log('inside admin controller');
$http.get("/users").then(function(response) {
{
$scope.names = response.data;
}
});


$scope.AddCustomerContactDetailsForm = function () {
//    $scope.id = id;
$scope.AddVisible = true;
$scope.UpdateVisible = false;
$scope.updateshow=false;
$scope.editshow=true;
$scope.phoneNumber = /^\+?\d{2}[- ]?\d{10}$/;

$http.get('/users').then(function(response)
  {

  //$scope.names = response.data;
    $scope.CustomerDetails = response.data;
  //  $scope.CustomerDepartments = $scope.CustomerDetails.Departments;
});

$scope.popupSubmit = function (value) {
    if (value == "Ok") {
        $('#confirmedPopup').modal('hide');
        $window.location.reload();
    }
    if (value == "AlertOk") {
        $('#Regconformation').modal('hide');
    }
}

// $('#confirmedPopup').modal('hide');
$scope.CreateCustomerContact = function (CustomerContacts) {
  $scope.submitted = true;
    $scope.AddVisible=true;
    $scope.updateshow=false;
    $scope.editshow=true;
    if ($scope.CustomerContactInfo.$valid) {
        //CustomerContacts.CustomerId = $scope.id;
        $scope.CustomerContacts = CustomerContacts;
console.log($scope.CustomerContacts.Phone1);
        var param = {
            username: $scope.CustomerContacts.ContactName,
            email: $scope.CustomerContacts.Email,
            mobile: $scope.CustomerContacts.mobile,
            password: $scope.CustomerContacts.password,
            initial_amt:$scope.CustomerContacts.initial_amt,
            balance:$scope.CustomerContacts.initial_amt
        };
        $http.post('/users',param).then(function(res){

          alert('success');
          $scope.submitted=false;
           $scope.CustomerContacts.ContactName='',
       $scope.CustomerContacts.Email='',
         $scope.CustomerContacts.mobile='',
        $scope.CustomerContacts.password='',
        $scope.CustomerContacts.initial_amt='',
          $scope.CustomerContacts.initial_amt=''
          $scope.popupSubmit = function (value) {
    if (value == "Ok") {
        $('#confirmedPopup').modal('hide');
        $window.location.reload();
    }
    if (value == "AlertOk") {
        $('#Regconformation').modal('hide');
    }
}


            if (res.Success == false) {
                $('#Regconformation').modal('show');
                alert("cannot add");
            }
            else {
                $scope.confirmationMessage = res.Message;
          alert("New user added successfully");
$scope.submitted=false;


          //  $('#confirmedPopup').modal('show');

                //$window.location.href = '#/AddCustomerContactDetails';
               //$window.location.href = '#/AddCustomerContactDetails?Id=' + $scope.id;
               $scope.AddCustomerContactDetailsForm();

            }

            //$window.location.reload();


        });

    }

}
$scope.lnkCusContactDetails = function (data) {
    $scope.AddVisible = false;
    $scope.UpdateVisible = true;
    $scope.updateshow=true;
    $scope.editshow=false;
    console.log("***************8");
    console.log(data);
    $scope.ID='';
    $scope.accountnum='';
    $http.get("/users").then(function(response) {
    {
      $scope.names = response.data;
      $scope.namesCount=$scope.names.length;
$scope.CustomerContacts=[];

      for(var i=0;i<$scope.namesCount;i++){

      if($scope.names[i].accountnum==data)
      {
        console.log("insideif"+$scope.names[i].accountnum+data);

      $scope.CustomerContacts.push($scope.names[i]);
console.log($scope.names[i]);
console.log("######@@@@@@@@@");

console.log(  $scope.CustomerContacts);
$scope.ID=$scope.names[i]._id;
$scope.accountnum=$scope.names[i].accountnum;
      //$scope.initialbalance=$scope.names[i].initial_amt;
      //break;
      }

console.log("@@@@@@@"+$scope.ID);

console.log("@@@@@@@"+$scope.accountnum);
      }

      $scope.UpdateCustomerContact = function (CustomerContacts) {
          $scope.submitted = true;
          $scope.AddVisible = true;
          $scope.UpdateVisible = false;
          $scope.updateshow=false;
          $scope.editshow=true;

          console.log("###########");
          console.log(CustomerContacts);
              $scope.CustomerContacts = CustomerContacts;
              console.log($scope.CustomerContacts);

              var param = {
                  username: $scope.CustomerContacts.username,
                  _id:$scope.ID,
                  accountnum:$scope.accountnum,
                  email: $scope.CustomerContacts.email,
                  mobile: $scope.CustomerContacts.mobile,
                  password: $scope.CustomerContacts.password,
                  initial_amt:$scope.CustomerContacts.initial_amt,
                  balance:$scope.CustomerContacts.initial_amt
              };
              $http.put('/edit',param).then(function(res){
                alert('success');

                $scope.CustomerContacts.email='';
                $scope.CustomerContacts.mobile='',
                $scope.CustomerContacts.password='';
                $scope.CustomerContacts.initial_amt='';
                $scope.CustomerContacts.password='';



                $scope.AddVisible = true;
                  $scope.submitted = false;
                $scope.UpdateVisible = false;
                $scope.updateshow=false;
                $scope.editshow=true;




                if (res.Success == false) {
                    $('#Regconformation').modal('show');
                    alert("cannot add");
                }
                else {
                    $scope.confirmationMessage = res.Message;
              alert("user details updated successfully");
              //  $('#confirmedPopup').modal('show');

                    //$window.location.href = '#/AddCustomerContactDetails';
                   //$window.location.href = '#/AddCustomerContactDetails?Id=' + $scope.id;
                   $scope.AddCustomerContactDetailsForm();

                }


      },

      function(err){
      alert('server error');
      });

      };

    }
  });
}

$scope.lnkCustomerContactDetails = function (data) {
  //  $scope.submitted = true;
  console.log(data);
  console.log("########@@@@@@@@@@@@");
    $scope.AddVisible = true;
    $scope.UpdateVisible = false;
    $scope.updateshow=false;
    $scope.editshow=true;
$scope.CustomerContacts=[];
    //console.log("###########");
    console.log(data);
        $scope.ID = '';
        $http.get("/users").then(function(response) {
        {
          $scope.names = response.data;
          $scope.namesCount=$scope.names.length;

          for(var i=0;i<$scope.namesCount;i++){

          if($scope.names[i].accountnum==data)
          {
            console.log("insideif"+$scope.names[i].accountnum+data);

          $scope.CustomerContacts.push($scope.names[i]);
console.log($scope.names[i]);
console.log("######@@@@@@@@@");

console.log(  $scope.CustomerContacts);
$scope.ID=$scope.names[i]._id;
$scope.accountnum=$scope.names[i].accountnum;
          //$scope.initialbalance=$scope.names[i].initial_amt;
          //break;
          }

console.log("@@@@@@@"+$scope.ID);

console.log("@@@@@@@"+$scope.accountnum);
          }
var param = {

            _id:$scope.ID

        };
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

$http.put('/remove',param).then(function(res){
alert('User deleted successfully');
$scope.submitted = false;
$scope.CustomerContacts.email='';
$scope.CustomerContacts.mobile='',
$scope.CustomerContacts.password='';
$scope.CustomerContacts.initial_amt='';
$scope.CustomerContacts.password='';



$scope.AddVisible = true;
$scope.UpdateVisible = false;
$scope.updateshow=false;
$scope.editshow=true;
$scope.submitted=false;




if (res.Success == false) {
  $('#Regconformation').modal('show');
  alert("cannot add");
}
else {
  $scope.confirmationMessage = res.Message;
alert("User deleted successfully");
//  $('#confirmedPopup').modal('show');

  //$window.location.href = '#/AddCustomerContactDetails';
 //$window.location.href = '#/AddCustomerContactDetails?Id=' + $scope.id;
 $scope.AddCustomerContactDetailsForm();

}


});

    }
      });


};

$scope.CustomerContactGrid = {

    enablePaginationControls: true,
    paginationPageSizes: [25, 50, 75],
    paginationPageSize: 25,
    data: 'names',
    showGridFooter: false,
    enableSorting: true,
    enableFiltering: true,
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    multiSelect: false,
    columnDefs: [
{ displayName: 'User Name', field: 'username' },
{ displayName: 'Account NO', field: 'accountnum' },
{ displayName: 'Contact No', field: 'mobile' },
{ displayName: 'Email', field: 'email' },
{ displayName: 'IFSC', field: 'IFSC' },
{ displayName: 'Initial Amount', field: 'initial_amt' },
{ displayName: 'Balance', field: 'balance' },

{

    displayName: '', field: 'Action', enableFiltering: false, width: 150, enableSorting: false, enableCellEdit: false, cellTemplate: '<center> <a class="btn btn-success actionbtn" tooltip-html-unsafe="Edit" tooltip-placement="bottom" ng-disabled="row.entity.FileDownloadDate!=null" ng-click="grid.appScope.lnkCusContactDetails(row.entity.accountnum)"><i class="glyphicon glyphicon-pencil"></i></a> <a class="btn btn-danger actionbtn" tooltip-html-unsafe="Delete" tooltip-placement="bottom" ng-disabled="row.entity.FileDownloadDate!=null" ng-click="grid.appScope.lnkCustomerContactDetails(row.entity.accountnum)"><i class="glyphicon glyphicon-trash"></i></a></center>'
},
    ],
    onRegisterApi: function (gridApi) {
        $scope.gridApi = gridApi;
    },
};


//$('#DeleteGialog').modal('hide');
//$scope.DeleteCustomerContact = function (Id) {
    //$('#DeleteGialog').modal('show');
    //$scope.RemoveId = Id;
//};



//CustomerFactory.GetAllCustomerContacts('GetCustomerContacts', id).$promise.then(function (data) {
//    $scope.CustomerContactsDetails = data;
//    if (data.length > 0) {
//        $scope.ShowCustomerContacts = true;
//    }
//});
//CustomerFactory.GetCustomerContactsAllDetails('GetCustomerContactsAll', id).$promise.then(function (data) {
//    $scope.CustomerContactsDetails = data;
//    if (data.length > 0) {
//        $scope.ShowCustomerContacts = true;
//    }
//});

$http.get('/users').then(function(response)
  {

  $scope.names = response.data;
  //alert(JSON.stringify($scope.names));
  console.log(response.data);
console.log($scope.names);
  if (response.data.length > 0) {
      $scope.ShowCustomerContacts = true;
  }

});


$scope.Cancel = function () {
  $scope.submitted=false;
    $scope.CustomerContactInfo.$setPristine();
    $scope.CustomerContacts.ContactName = "";
    $scope.CustomerContacts.Email = "";
    $scope.CustomerContacts.Phone1 = "";
    $scope.CustomerContacts.CustomerDeptDescription = "";
    $scope.CustomerContacts.IsAdmin= false;

    $scope.AddCustomerContactDetailsForm();
}
//$scope.contactId = id;
//CustomerFactory.GetCustomerContact('GetCustomerContactByContactIdDetails', $scope.contactId).$promise.then(function (data) {
//    $scope.CustomerContacts = data;
//})
}
});
app.controller('HomeController',function($rootScope,$scope, $http, $cookies,$location){
$scope.viewprofile=false;
$scope.signin=function()
{
if($scope.username != "admin")
{

$http.put('/users/signin', {username:$scope.username, password:$scope.password})
.then(function(res){
alert('login successful');
$scope.email=res.data.user.email;
$scope.mobile=res.data.user.mobile;
$scope.accountnum=res.data.user.accountnum;
$scope.balance=res.data.user.balance;
$scope.IFSC=res.data.user.IFSC;


$cookies.put('token',res.data.token);
$cookies.put('currentUser',$scope.username);
$cookies.put('accountnum',$scope.accountnum);
$cookies.put('fullname',$scope.username);
$cookies.put('email',$scope.email);
$cookies.put('mobile',$scope.mobile);
$cookies.put('balance',$scope.balance);
$cookies.put('IFSC',$scope.IFSC);


$rootScope.token=res.data.token;
$rootScope.currentUser=$scope.username;
$rootScope.accountnum=$scope.accountnum;
$rootScope.fullname=$scope.username;
$rootScope.email=$scope.email;
$rootScope.mobile=$scope.mobile;
$rootScope.balance=$scope.balance;
$rootScope.IFSC=$scope.IFSC;


},
function(err){
alert('bad login credentials');
});
}

else{
$http.put('/users/signin/admin', {adminname:$scope.adminname})
.then(function(res){
alert('login successful');
$location.path('/admin');





},
function(err){
alert('bad login credentials');
});

}
}

$scope.reset=function()
{
  if ($scope.password != $scope.confirmpassword) {
    $scope.confirmpassword='';

    $scope.IsMatch=true;
    return false;
  }
  $scope.IsMatch=false;
  console.log($scope.newemail);
$http.put('/users/reset', {newemail:$scope.newemail, password:$scope.password})
.then(function(res){

console.log(res.data._id);
var mydetails={
  id:res.data._id,
  password:$scope.password
};
$http.put('/mydetails',mydetails).then(function(){
//console.log('success');
$scope.newemail='';
$scope.password='';
$scope.confirmpassword='';
alert('password has been updated successfully');
$location.path("/login");

});

},
function(err){
alert('invalid email');
});
}








$scope.check=function(){
$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.BALANCE='';
$scope.initialbalance='';

for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].username==$rootScope.currentUser)
{
$scope.BALANCE=$scope.names[i].balance;
if($scope.BALANCE)
{
$scope.showbalance=true;
}
//$scope.initialbalance=$scope.names[i].initial_amt;
break;
}
}
}
});
};

$scope.profile=function(){
  $scope.viewprofile=true;

}
$scope.logout=function(){
$cookies.remove('token');
$cookies.remove('currentUser');
$scope.username='';
$scope.password='';
$rootScope.token=null;
$rootScope.currentUser=null;
$location.path('/login');
};


});




app.controller('SignupController',function($scope, $http){
$scope.submitSignup=function()
{
if ($scope.initial_amt<500){
alert('initial amount should be greater than or equal to 500');
$scope.initial_amt='';
}
else{
var newUser={
username:$scope.username,
password:$scope.password,
email:$scope.email,
mobile:$scope.mobile,
ranNum:$scope.ranNum,
initial_amt:$scope.initial_amt,
balance:$scope.initial_amt
};
$http.post('/users',newUser).then(function(){
$scope.username='';
$scope.password='';
$scope.email='';
$scope.mobile='';
$scope.initial_amt='';
alert('success');

});
}
}
});
app.controller('submittransferController',function($rootScope,$scope, $location,$http, $cookies){

$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.ID='';
$scope.username='';

$scope.initialbalance='';

for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].username==$rootScope.currentUser)
{
$scope.ID=$scope.names[i].accountnum;
$scope.username=$scope.names[i].username;
$scope.initialbalance=$scope.names[i].initial_amt;
break;
}

}
$http.get("/addpayee").then(function(response) {
{
  console.log(response.data);

$scope.payeetable = response.data;
$scope.payeetableCount=$scope.payeetable.length;
$scope.ACCOUNTNO=[];

for(var i=0;i<$scope.payeetableCount;i++){

if($scope.payeetable[i].accountholder==$scope.ID)
{
$scope.ACCOUNTNO.push($scope.payeetable[i].accountno);
console.log($scope.ACCOUNTNO);
//break;

}

}



console.log(response.data);


        }
});

//console.log($rootScope.currentUser);
//console.log(response.data);
}
});



$scope.submittransfer=function()
{
var amount=$scope.amount;
var balance_check=$scope.balance-500;
if(balance_check<$scope.amount)
{
alert("500 is your initial amount it should not be transfered");
$scope.amount='';
}
else
{
//-------------------------------------------------
$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.ID='';


for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].username==$rootScope.currentUser)
{
$scope.ID=$scope.names[i].accountnum;
$scope.Objectid=$scope.names[i]._id;
console.log($scope.Objectid);
$scope.balance=$scope.names[i].balance;
break;
}
}
var total_balance= parseInt($scope.balance) - parseInt(amount);
console.log($scope.balance+'balance');
console.log(amount+'balance to be minused');
console.log(total_balance);
var newTransfer={
accountno:$scope.accountno,
balance:total_balance,
_id:$scope.Objectid,
};
$http.put('/addtransfer',newTransfer).then(function(){
$scope.accountno='';
$scope.code='',
$scope.currency='';
$scope.acctype='';
$scope.branch='';
$scope.amount='';
//alert('success');
});

/**$http.put('/updateaccount',newTransfer).then(function(){
console.log('/updateaccount');
});**/
}
});
//----------------------------------------------------------------

$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.ID='';


for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].accountnum==$scope.toaccount)
{
$scope.ID=$scope.names[i].accountnum;
$scope.Objectid=$scope.names[i]._id;
//--------------------------------------------//--------------------------------------------
console.log($scope.Objectid);
$scope.balance=$scope.names[i].balance;
break;
}
}
var total_balance= parseInt($scope.balance) + parseInt(amount);
console.log($scope.balance+'balance');
console.log(amount+'balance to be added');
console.log(total_balance);
var newTransfer={
accountno:$scope.accountno,
balance:total_balance,
_id:$scope.Objectid,
};
$http.put('/addtransfer',newTransfer).then(function(){
$scope.accountno='';
$scope.toaccount='';

$scope.code='';
$scope.currency='';
$scope.acctype='';
$scope.branch='';
$scope.amount='';
alert('success');
});

/**$http.put('/updateaccount',newTransfer).then(function(){
console.log('/update account credited');
});**/
}
});


//------------------------------------------------------------------
console.log($scope.amount);
var newTransfer={
accountno:$scope.ID,
Toaccountno:$scope.toaccount,
acctype:$scope.acctype,
currency:$scope.currency,
branch:$scope.branch,
amount:$scope.amount,
description:$scope.description,
status:'debited'
};
$http.post('/transfer',newTransfer).then(function(){
$scope.accountno='';
$scope.Toaccountno='',
$scope.currency='';
$scope.acctype='';
$scope.branch='';
$scope.amount='';
$scope.description='';

//alert('success');


});

var beneficiary={
  accountno:$scope.toaccount,
  Toaccountno:$scope.ID,
  acctype:$scope.acctype,
  currency:$scope.currency,
  branch:$scope.branch,
  amount:$scope.amount,
  description:$scope.description,
  status:'credited'
};
$http.post('/beneficiary',beneficiary).then(function(){
console.log('beneficiary success');
});

}
}

$scope.logout=function(){
  $cookies.remove('token');
  $cookies.remove('currentUser');
  $scope.username='';
  $scope.password='';
  $rootScope.token=null;
  $rootScope.currentUser=null;
  $location.path("/");
}
});



app.controller('depositController',function($rootScope,$scope, $http, $location,$cookies){
    //alert($rootScope.currentUser);
    $http.get("/users").then(function(response) {
    {
    console.log(response.data);
    $scope.names = response.data;
    $scope.namesCount=$scope.names.length;
    $scope.ID='';


    for(var i=0;i<$scope.namesCount;i++){

    if($scope.names[i].username==$rootScope.currentUser)
    {
    $scope.ID=$scope.names[i].accountnum;
    $scope.Objectid=$scope.names[i]._id;
    console.log($scope.Objectid);
    $scope.balance=$scope.names[i].balance;
    break;
    }

    }
  }

    });

$scope.submitdeposit=function()
{
<!-- //alert($scope.initialbalance);
//console.log($rootScope.currentUser);
  //console.log(response.data);-->
var selPage2 = parseInt($scope.balance) + parseInt($scope.amount);


//alert(selPage2);


var newDeposit={
  accountno:$scope.accountno,
  balance:selPage2,
  _id:$scope.Objectid
};

$http.put('/adddeposit',newDeposit).then(function(){
  $scope.accountno='';
  $scope.code='',
  $scope.currency='';
  $scope.acctype='';
  $scope.branch='';
  $scope.amount='';


  alert('success');


});

}
$scope.logout=function(){
  $cookies.remove('token');
  $cookies.remove('currentUser');
  $scope.username='';
  $scope.password='';
  $rootScope.token=null;
  $rootScope.currentUser=null;
  $location.path("/");
}
});

app.controller('addpayeeController',function($scope,$rootScope, $http,$location,$cookies){
console.log($rootScope.currentUser);



$scope.addpayee=function()
{
$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.accountholder='';

for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].username==$rootScope.currentUser)
{
$scope.accountholder=$scope.names[i].accountnum;
console.log($scope.accountholder);
break;
}

}

//console.log($rootScope.currentUser);
//console.log(response.data);



//alert($scope.accountholder);
var newPayee={
accountno:$scope.accountno,
code:$scope.code,
acctype:$scope.acctype,
currency:$scope.currency,
branch:$scope.branch,
accountholder:$scope.accountholder


};
$http.post('/addpayee',newPayee).then(function(){
$scope.accountno='';
$scope.code='',
$scope.currency='';
$scope.acctype='';
$scope.branch='';


alert('success');


});
}
});
}
$scope.logout=function(){
  $cookies.remove('token');
  $cookies.remove('currentUser');
  $scope.username='';
  $scope.password='';
  $rootScope.token=null;
  $rootScope.currentUser=null;
  $location.path("/");
}
});

app.controller('accountsummaryController', function($rootScope,$scope, $http, $cookies,$location) {
console.log($rootScope.currentUser);
$scope.show=false;
$scope.benshow=false;

$scope.showmsg=true;
$http.get("/users").then(function(response) {
{
$scope.names = response.data;
$scope.namesCount=$scope.names.length;
$scope.accountholder='';

for(var i=0;i<$scope.namesCount;i++){

if($scope.names[i].username==$rootScope.currentUser)
{
$scope.accountholder=$scope.names[i].accountnum;
console.log($scope.accountholder);
//break;
}

}

//console.log($rootScope.currentUser);
//console.log(response.data);
$http.get("/account").then(function(response) {
{
  console.log('inside /account get');
$scope.currentUserName = response.data;
//console.log($scope.currentUserName);
$scope.namesCount=$scope.currentUserName.length;
//$scope.accountholder='';
$scope.summaryDetails=[];
for(var i=0;i<$scope.namesCount;i++){
//  console.log($scope.currentUserName[i].Accountno);
//  console.log($scope.accountholder);

if($scope.currentUserName[i].Accountno==$scope.accountholder)
{
  console.log('test');


/**  console.log($scope.currentUserName[i].Toaccountno);
  var toacc=$scope.currentUserName[i].Toaccountno;

  $http.get('/getaccount', {params:{"Toaccountno":toacc}}).then(function(response) {
  {
    $scope.details=response.data;
    console.log(response.data);
}
});
}**/
//$scope.summaryDetails=$scope.currentUserName[i];
$scope.summaryDetails.push($scope.currentUserName[i]);
console.log($scope.summaryDetails);

if($scope.summaryDetails.length!=0){
console.log($scope.show);
$scope.show=true;
$scope.showmsg=false;

}
//  alert('else');




//$scope.currency=$scope.currentUserName[i].currency;
//  $scope.amount=$scope.currentUserName[i].amount;
//  $scope.description=$scope.currentUserName[i].description;
//$scope.name=$scope.currentUserName[i].name;
console.log($scope.summaryDetails);
//break;
}
else{
  console.log('inside else');

  $scope.beneficiaryacc=$scope.currentUserName[i].Toaccountno;
console.log($scope.beneficiaryacc);
  $http.get("/beneficiary").then(function(response) {
  {
  $scope.bname = response.data;
  console.log($scope.bname);
  $scope.bnamecount=$scope.bname.length;
  console.log($scope.bnamecount);

  //$scope.accountholder='';
  $scope.benDetails=[];
  for(var i=0;i<$scope.bnamecount;i++){
  //  console.log($scope.currentUserName[i].Accountno);
  //  console.log($scope.accountholder);
  console.log('inside for');
console.log($scope.bname[i].Accountno);
console.log($scope.beneficiaryacc);
  if($scope.bname[i].Accountno==$scope.beneficiaryacc && $scope.bname[i].Accountno==$scope.accountholder)
  {
    console.log('beneficiary test');


  /**  console.log($scope.currentUserName[i].Toaccountno);
    var toacc=$scope.currentUserName[i].Toaccountno;

    $http.get('/getaccount', {params:{"Toaccountno":toacc}}).then(function(response) {
    {
      $scope.details=response.data;
      console.log(response.data);
  }
  });
  }**/
  //$scope.summaryDetails=$scope.currentUserName[i];
  $scope.summaryDetails.push($scope.bname[i]);
  console.log($scope.summaryDetails);

  if($scope.summaryDetails.length!=0){
  console.log($scope.benshow);
  $scope.show=true;
  $scope.showmsg=false;

  }
  //  alert('else');




  //$scope.currency=$scope.currentUserName[i].currency;
  //  $scope.amount=$scope.currentUserName[i].amount;
  //  $scope.description=$scope.currentUserName[i].description;
  //$scope.name=$scope.currentUserName[i].name;
  console.log($scope.benDetails);
  //break;
  }

  }
  }
  });



}
}

/*******************************/

/***********************************/

}
});
////////////////////////////



/////////////////////////////
}
});

$scope.logout=function(){
  $cookies.remove('token');
  $cookies.remove('currentUser');
  $scope.username='';
  $scope.password='';
  $rootScope.token=null;
  $rootScope.currentUser=null;
  $location.path("/");
}


});
