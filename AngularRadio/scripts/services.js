app.factory('MediaService', function ($resource) {
    return $resource('http://itunes.apple.com/:action',
        { callback: 'JSON_CALLBACK', action: "search" },
        {
            get: { method: 'JSONP' }
        });
});

app.factory('ServiceArtist', function ($resource) {
    return $resource('http://itunes.apple.com/:action',
        { callback: 'JSON_CALLBACK', action: "lookup" },
        {
            get: { method: 'JSONP' }
        });
});

app.factory("favoritesService", function () {

    return {
        getAll: function () {
            if (localStorage.favorites)
                return JSON.parse(localStorage.favorites);
            else
                return [];
        },
        add: function (item) {
            var favsList = this.getAll();
            favsList.push(item);
            localStorage.favorites = JSON.stringify(favsList);
        },
        remove: function (item) {
            var favsList = this.getAll();
            favsList = favsList.filter(function (f) {
                return f.trackId !== item.trackId;
            });
            localStorage.favorites = JSON.stringify(favsList);
        }
    };

});

app.factory("recentService", function () {

    return {
        getAll: function () {
            if (localStorage.recent)
                return JSON.parse(localStorage.recent);
            else
                return [];
        },
        add: function (item) {
            var favsList = this.getAll();
            favsList.push(item);
            localStorage.recent = JSON.stringify(favsList);
        },
        remove: function (item) {
            var favsList = this.getAll();
            favsList = favsList.filter(function (f) {
                return f.trackId !== item.trackId;
            });
            localStorage.recent = JSON.stringify(favsList);
        }
    };

});


app.factory("audioPlayerService", function ($rootScope) {
    
    return {
        playSong: function(song) {
            $rootScope.playerVisible = true;
            $rootScope.song = song;

            $("#jquery_jplayer_1").jPlayer("destroy");

            $("#jquery_jplayer_1").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", { m4a: song.previewUrl });
                    $(this).jPlayer("play", 0);
                    $rootScope.playerVisible = true;
                },
                swfPath: "/jplayer",
                supplied: "m4a",
                smoothPlayBar: true,
                keyEnabled: true
            });

        }
    };

});