var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when("/search/:mediaType/:searchTerm", { templateUrl: "/views/search.htm", controller: "searchCtrl" });
    $routeProvider.when("/artist/:artistId", { templateUrl: "/views/artist.htm", controller: "artistCtrl" });
    $routeProvider.when("/album/:albumId", { templateUrl: "/views/album.htm", controller: "albumCtrl" });
    $routeProvider.when("/favorites", { templateUrl: "/views/favorites.htm", controller: "favoritesCtrl" });
    $routeProvider.when("/recent", { templateUrl: "/views/recent.htm", controller: "recentCtrl" });

    $locationProvider.html5Mode(true);

});




app.controller("appCtrl", function ($scope, $location) {
    $scope.searchTerm = "Alicia Keys";
    $scope.mediaType = "all";

    $scope.doSearch = function () {
        $location.path("/search/" + $scope.mediaType + "/" + $scope.searchTerm);
    }
});

app.controller("artistCtrl", function ($scope, $routeParams, ServiceArtist) {

    ServiceArtist.get({ entity: "album", id: $routeParams.artistId }, function (response) {
        $scope.artist = response.results[0];
        $scope.albums = response.results.slice(1);
    });
});

app.controller("songCtrl", function ($scope, favoritesService, audioPlayerService, recentService) {
    $scope.makeFavorite = function (item) {
        item.isFavorite = !item.isFavorite;

        if (item.isFavorite)
            favoritesService.add(item);
        else
            favoritesService.remove(item);
    };

    $scope.playSong = function (song) {
        audioPlayerService.playSong(song);
        recentService.add(song);
    }

});

app.controller("favoritesCtrl", function ($scope, favoritesService) {
    $scope.favorites = favoritesService.getAll();
});

app.controller("recentCtrl", function ($scope, recentService) {
    $scope.recent = recentService.getAll();
});

app.controller("albumCtrl", function ($scope, $routeParams, ServiceArtist) {
    ServiceArtist.get({ entity: "song", id: $routeParams.albumId, limit: 100 }, function (response) {
        $scope.album = response.results[0];
        $scope.songs = response.results.slice(1);
    });
});

app.controller("audioPlayerCtrl", function ($scope, $rootScope) {
});

app.controller('searchCtrl', function ($scope, MediaService, $routeParams, favoritesService) {

    $scope.filterTerm = "";
    $scope.sortProp = "artistName";
    $scope.showFlag = false;
    $scope.searchTerm = $routeParams.searchTerm;

    var type = $routeParams.mediaType;
    if ($routeParams.mediaType == "all") type = "";

    MediaService.get({ term: $routeParams.searchTerm, entity: type }, function (response) {

        var favsList = favoritesService.getAll();

        angular.forEach(response.results, function (item, key) {
            item.isFavorite = favsList.filter(function (f) {
                return f.trackId === item.trackId;
            }).length;
        });

        $scope.mediaResults = response.results;
    });    
    
});