loadjs([

    '/CSS/' + url[0] + '.css',
    '../JS/easyaddress4.js'

], {
    success: function () {
        scriptReady();
    },
    async: true,
    numRetries: 3
});


function scriptReady() {
    easy_address()
}

function easy_address() {

    input = new esayaddress.searcfomat({
        areaid: "#new-address-area",
    })
}
