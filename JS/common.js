var mobile_detect = null;
var debug = 1; // 0: disable, 1: console, 2: remote
var url = location.pathname.split('/');
var js_url = null;
url.shift();

if (Number(url[0])) {
    js_url = "/product/view.js";
} else {
    // js_url = '/' + url[0] + '/' + url[1] + '.js';
    js_url = '/JS/' + url[0] + '.js';
}

var script = document.createElement('script');
script.src = '//cdnjs.cloudflare.com/ajax/libs/loadjs/4.2.0/loadjs.min.js';
script.onload = function () {
    loadjs([
        "https://code.jquery.com/jquery-3.6.0.js",
        "//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css",
        "https://code.jquery.com/ui/1.13.2/jquery-ui.js",

        js_url
    ], {
        success: function () {
            if (debug == 1 || debug == 2) {
                // Logger.useDefaults();
                // if (debug == 2) {
                //     Logger.setHandler(function (messages, context) {
                //         $.post("/logs", { message: messages[0], level: context.level });
                //     });
                // }
            }
        },
        async: false,
        numRetries: 3
    });
}

document.head.appendChild(script);

