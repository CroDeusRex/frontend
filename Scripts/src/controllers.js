warehouseModule.controller('homeController', function($scope, $http) {
    
})
.controller('warehouseListController', function($scope, $http) {

    $http.get('http://127.0.0.1:8000/warehouse')
        .then(function (result) {
            $scope.warehouse = result.data.warehouse;
        });
})

.controller('warehouseEntryEditController', function($scope,$http,$routeParams){
    $http.get('http://127.0.0.1:8000/warehouses/' + $routeParams.id+ '/item')
        .then(function(result){
        $scope.entry = result.data.warehouse[0];
    });
    
    $scope.submit_updatedentry = function()
    {
        console.log("uslo");
        $http.put('http://127.0.0.1:8000/warehouses/' + $routeParams.id + '/item', {entry : angular.toJson($scope.entry) });
    };
})

.controller('listAddNewController', function ($scope, $http) {
    
    $http.get('http://127.0.0.1:8000/warehouse').then(function (result) {
        $scope.warehouse =  procces_warehouse(result.data.warehouse);
    });
    
    $http.get('http://127.0.0.1:8000/cafe').then(function(result){
        $scope.cafe = result.data.cafe;
    });
    
    function procces_warehouse ($obj)
    {
        $new_entry = {product:"", max_quantity:"", quantity:""};
        $arr = [];
        l = $obj.length;
        for(i=0; i<l; i++)
        {
            $new_entry.product = $obj[i].product;
            $new_entry.max_quantity = $obj[i].quantity;
            $arr.push($new_entry);
            $new_entry = {product:"", max_quantity:"", quantity:""};
        }
        return $arr;
    };
    
    $scope.orders = [];
    $scope.chosen_cafe ="";
    
    $scope.postToServer = function()
    {
        $data = [];
        angular.copy($scope.orders,$data);
        l = $data.length;
        w = $scope.warehouse.length;
        
        //pretvaranje iz stringa u object i uredivanje brojeva da narudba odgovara
        for(i=0; i<l; i++)
        {
            $data[i].product = JSON.parse($data[i].product);
            for(j=0; j<w; j++)
            {
                if($data[i].product.name == $scope.warehouse[j].product.name)
                    {
                        if($data[i].quantity > $scope.warehouse[j].max_quantity)
                        {
                            $data[i].quantity = $scope.warehouse[j].max_quantity;
                            $scope.orders[i].quantity = $data[i].quantity;
                        }
                    }
            }
        }
        
        //napravi zahtjev na server
        
       
        $send_data = {cafe : $scope.chosen_cafe, data : $data}; 
         $http.post("http://127.0.0.1:8000/lists",$send_data)
            .then( /*obavijest o uspjesnosti*/);
    }
    
    $scope.addNewOrder = function()
    {
        $scope.orders.push({});
    }
})

.controller('unfinishedOrdersController', function($scope, $http){
    $http.get('http://127.0.0.1:8000/list/unfinished')
        .then(function (result) {
            $scope.lists = result.data.lists;
        });
})

.controller('detailedListController', function($scope, $http,$routeParams, $location){
    $http.get('http://127.0.0.1:8000/lists/' + $routeParams.id +'/item')
        .then(function (result) {
            $scope.list = result.data.list;
        });
    
    $scope.finished = function($id){
       $http.put('http://127.0.0.1:8000/lists/' + $id)
       .then( function(){
           $location.path("/");
       });
    };
});
/*
.controller('commentAddNewController', function ($scope, $http, $routeParams) {
    
    $scope.user_names = "";

    $scope.new_comment = {
        Text: "",
        UserId: "",
        Author:
            {
                CreatedOn: "",
                FullName: "",
                Id: "",
                IsPremiumUser: ""
            },
        NoteId: $routeParams.id
    };

    $http.get('api/UserApi/List').then(function (result) {
        $scope.users = result.data;
        $scope.user_names = angular.copy($scope.users);
    });

    $scope.submit = function ()
    {
        $scope.userId = angular.copy($scope.new_comment.user_Id);
        
        if($scope.new_comment.Text != "" && $scope.new_comment.UserId != "")
            $http.post('api/CommentsApi/Add', $scope.new_comment)
            .success(function () {

                user_id = angular.copy($scope.new_comment.UserId);
                $scope.new_comment.Author = angular.copy($scope.user_names[user_id-1]); 
                $scope.note.Comments.push(angular.copy($scope.new_comment));

            })
            .error(function () {
                //jos nista...
            });
        else
        {
            //error treba bacit
        }
    }
})

.controller('noteEditController', function ($scope, $http, $routeParams){
    $scope.noteId = $routeParams.id;

    $http.get('/api/NotesApi/Details/' + $routeParams.id)
        .then(function (result) {
            $scope.note = result.data;
        });
    
    $scope.submit_updatednote = function ()
    {
        if ($scope.note.Text != "" && $scope.note.Title != "")
            $http.post('api/NotesApi/Update', $scope.note).
                success(function ()
                {
                    window.location = "/#" + "/note/" + $scope.noteId; //ako ostavim samo /#/note popizdi???
                });
    }
})

.controller('noteDeleteController', function ($scope,$http, $routeParams){
    $scope.delete_req = function()
    {
        $http.get('api/NotesApi/Delete/' + $routeParams.id)
        .success(function () {
            window.location = "/#" + "/";
        });
    }
    
});*/