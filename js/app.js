var technomart = angular.module('technomart', ['angularUtils.directives.dirPagination', 'rzModule']);

technomart.config(function (paginationTemplateProvider) {
    paginationTemplateProvider.setPath('dirPagination.tpl.html');
});

/*
// настройка путей
    technomart.config(function($routeProvider) {
        $routeProvider

            // путь для journal (home)
            .when('/', {
                templateUrl : '../home.html',
                controller  : 'homeController'
            })

            // путь для about
            .when('/catalog', {
                templateUrl : '../catalog.html',
                controller  : 'catalogController'
            })
        
    });

technomart.controller('homeController', function mainController($scope)  {
    
}); 
*/

technomart.controller('catalogController', function catalogController($scope) {

    $scope.drills = [

        {
            img: 'img/card_perforator.png',
            name: 'Перфоратор Bosch BFG 3000',
            type: 'провод',
            salePrice: 22500,
            price: 15500,
            company: 'Bosch',
            new: 'new-ribbon',
    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор Bosch BFG 6000',
            type: 'провод',
            salePrice: 30500,
            price: 25500,
            company: 'Bosch',
            new: 'new-ribbon',
    }, {
            img: 'img/card_perforator_3.png',
            name: 'Перфоратор Bosch BFG 2000',
            type: 'аккумулятор',
            salePrice: '',
            price: 12500,
            company: 'Bosch'
    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор Makita Thunderstrike',
            type: 'провод',
            salePrice: '',
            price: 25000,
            company: 'Makita'
    }, {
            img: 'img/card_perforator.png',
            name: 'Перфоратор Makita Mjolnir',
            type: 'провод',
            salePrice: '',
            price: 14000,
            company: 'Makita'
    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор ИНТЕРСКОЛ Человек-сосед',
            type: 'аккумулятор',
            salePrice: '',
            price: 5000,
            company: 'ИНТЕРСКОЛ'
                // 6
    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор Bosch BFG 6000',
            type: 'провод',
            salePrice: 30500,
            price: 25500,
            company: 'Bosch'
    }, {
            img: 'img/card_perforator.png',
            name: 'Перфоратор Bosch BFG 3000',
            type: 'провод',
            salePrice: 22500,
            price: 15500,
            company: 'Bosch'
    }, {
            img: 'img/card_perforator.png',
            name: 'Перфоратор Makita Mjolnir',
            type: 'провод',
            salePrice: '',
            price: 14000,
            company: 'Makita'

    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор Makita Thunderstrike',
            type: 'провод',
            salePrice: '',
            price: 25000,
            company: 'Makita'
    }, {
            img: 'img/card_perforator_3.png',
            name: 'Перфоратор Bosch BFG 2000',
            type: 'аккумулятор',
            salePrice: '',
            price: 12500,
            company: 'Bosch'
    }, {
            img: 'img/card_perforator_2.png',
            name: 'Перфоратор ИНТЕРСКОЛ Человек-сосед2',
            type: 'аккумулятор',
            salePrice: '',
            price: 6000,
            company: 'ИНТЕРСКОЛ'
    },
  ];

    $scope.slider = {
        min: 0,
        max: 200000,
        options: {
            floor: 0,
            ceil: 200000
        }
    };

    //Фильтр по имени (другому параметру)

    $scope.sortVar = undefined;
    $scope.reverseSort = false;
    $scope.sortType = undefined;
    $scope.sortOrder = 'desc';

    $scope.sortData = function (selection, order) {
        $scope.sortOrder = order;
        if ($scope.sortOrder === 'desc') {
            $scope.sortVar = selection;
        } else {
            $scope.sortVar = '-' + selection;
        }
    }

    //Фильтр по цене filter:byRange('price', minPrice, maxPrice)

    $scope.byRange = function (fieldName, min, max) {
        minValue = min
        maxValue = max;

        return function priceFilter(item) {
            return minValue <= item[fieldName] && item[fieldName] <= maxValue;
        };
    }

    // Фильтр по производителю

    $scope.companyArray = [
        {
            name: "Bosch",
            on: false,
            id: 'ch-box-1',
        }, {
            name: "Интерскол",
            on: false,
            id: 'ch-box-2',
        }, {
            name: "Makita",
            on: false,
            id: 'ch-box-3',
        }, {
            name: "Dewalt",
            on: false,
            id: 'ch-box-4',
        }, {
            name: "Hitachi",
            on: false,
            id: 'ch-box-5',
        }
    ];

    $scope.typeArray = [
        {
            name: "Аккумуляторные",
            type: "аккумулятор",
            on: false,
            id: 'radio-1',
            checekd: true,
        }, {
            name: 'Сетевые',
            type: 'провод',
            on: false,
            id: 'radio-2',
            checked: false,
        }
    ];
    
    $scope.filterFlag = 0;
    
    $scope.changeFlag = function () {

            for (c in $scope.companyArray){
                if ($scope.companyArray[c].on==true) {
                    $scope.filterFlag = 1;
                    break;
                } else {
                    $scope.filterFlag = 0;
                }
            }
            console.log($scope.filterFlag);

            
        
            /*
        if ($scope.filterFlag == 0) {
            $scope.filterFlag =1;
            console.log($scope.filterFlag);
        } else {
            $scope.filterFlag = 0;
            console.log($scope.filterFlag);
        }
        */
    }

    // Фильтр по компании
    $scope.companyFilter = function (a) {
        for (comp in $scope.companyArray) {
            var t = $scope.companyArray[comp];
            if (t.on && a.company.toLowerCase().indexOf(t.name.toLowerCase()) > -1) {
                return true;
            }
        }//for        
    }

    // Фильтр по проводу
    $scope.typeFilter = function (b) {
        for (etype in $scope.typeArray) {
            var et = $scope.typeArray[etype];
            if (et.on && b.type.toLowerCase().indexOf(et.type.toLowerCase()) > -1) {
                return true;
            }
        }
    }

    // Проверка кнопок выбора
    $scope.setChoice = function (q, c) {
        angular.forEach(q, function (c) {
            c.on = false;
        });

        c.on = true;
    }

});