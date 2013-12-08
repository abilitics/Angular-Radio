app.directive("song", function () {

    return {
        templateUrl: "/views/song.htm",
        controller: "songCtrl",
        scope: {
            song: "="
        }

    };

});

app.directive("leftMenu", function () {

    return {
        templateUrl: "/views/leftMenu.htm"
    };

});

app.directive("topMenu", function () {

    return {
        templateUrl: "/views/topMenu.htm",
        controller: "appCtrl"
    };

});

app.directive("audioPlayer", function () {

    return {
        templateUrl: "/views/audioPlayer.htm",
        controller: "audioPlayerCtrl"
    };

});