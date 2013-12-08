app.filter("formatTrackLength", function () {
    return function (trackTimeInMilliseconds) {
        if (!trackTimeInMilliseconds)
            return "n/a";

        var seconds = Math.floor(trackTimeInMilliseconds / 1000);

        return Math.floor(seconds / 60) + ":" + (seconds % 60);
    };
});