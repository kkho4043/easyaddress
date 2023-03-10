loadjs([
    '../JS/easyaddress4.js'

], {
    success: function () {
        scriptReady();
    },
    async: true,
    numRetries: 3

});
function scriptReady() {

    window.onresize = function (event) {
        get_window_size();
    }
    easy_address();
    add_event();
}

function easy_address() {

    input = new esayaddress.searcfomat({
        areaid: "#new-juso-input",
        selectevent: function (data) {
            console.log(data);
            mapaddtag(data);
        },


    })

    function mapaddtag(data) {
        console.log("xxxxxxxx")
        $("#map-first-desc").addClass("hide");
        var pointarr = []




        var coorddata = data.coorddata;
        console.log(data)
        var addressdata = data.addressdata;
        pointarr.push({

            // addressdata: data,
            address: data.jibunAddr,
            jusopop: data.jibunAddr,
            // y: coorddata.y,
            // bindcontent: "",
            polyline: true
        })


        map.drawingmap(pointarr);

    }
    map = new esayaddress.easymap({
        areaid: "map-area",
        jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
        coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
    })
}



var title_area = document.getElementById("container")
var modal = document.getElementById("modal-back")
var address_area = document.getElementsByClassName("address-area")
var compare_area = document.getElementById("compare-area")
var order_area = document.getElementsByClassName("order-area")
var scroll_btn = document.getElementById("compare-scroll-btn")
compare_area.setAttribute("style", "height :" + (document.getElementById("cart-item-after").clientHeight) + "px;min-height :" + (document.getElementById("cart-item-after").clientHeight) + "px;")
if (window.innerHeight > window.innerWidth - 100 || window.innerWidth < 940) {
    if (title_area.classList.contains("horizontal")) {
        title_area.classList.remove("horizontal")
        modal.classList.remove("horizontal")
    }

    if (!title_area.classList.contains("vertical")) {
        title_area.classList.add("vertical")
        modal.classList.add("vertical")
    }
} else {
    if (title_area.classList.contains("vertical")) {
        title_area.classList.remove("vertical")
        modal.classList.remove("vertical")
    }

    if (!title_area.classList.contains("horizontal")) {
        title_area.classList.add("horizontal")
        modal.classList.add("horizontal")
    }
}
address_areaWidth = compare_area.clientWidth
scroll_btn.setAttribute("style", "left :" + (address_areaWidth / 2) + "px;")
for (var i = 0; i < address_area.length; i++) {
    address_area[i].setAttribute("style", "width :" + address_areaWidth + "px;")
    order_area[i].setAttribute("style", "width :" + (address_areaWidth / 2) + "px;")
}

function get_window_size() {
    var title_area = document.getElementById("container")
    var modal = document.getElementById("modal-back")
    var address_area = document.getElementsByClassName("address-area")
    var compare_area = document.getElementById("compare-area")

    compare_area.setAttribute("style", "height :" + (document.getElementById("cart-item-after").clientHeight) + "px;min-height :" + (document.getElementById("cart-item-after").clientHeight) + "px;")
    if (window.innerHeight > window.innerWidth - 100 || window.innerWidth < 940) {
        if (title_area.classList.contains("horizontal")) {
            title_area.classList.remove("horizontal")
            modal.classList.remove("horizontal")
        }

        if (!title_area.classList.contains("vertical")) {
            title_area.classList.add("vertical")
            modal.classList.add("vertical")
        }
    } else {
        if (title_area.classList.contains("vertical")) {
            title_area.classList.remove("vertical")
            modal.classList.remove("vertical")
        }

        if (!title_area.classList.contains("horizontal")) {
            title_area.classList.add("horizontal")
            modal.classList.add("horizontal")
        }
    }
    address_areaWidth = compare_area.clientWidth

    for (var i = 0; i < address_area.length; i++) {
        address_area[i].setAttribute("style", "width :" + address_areaWidth + "px;")
    }

}

var address_areaWidth;

function add_event() {

    var scroll_btn = document.getElementById("compare-scroll-btn");
    var after_area = document.getElementById("after-area");
    var before_area = document.getElementById("before-area");


    var compare_area = document.getElementById("compare-area")

    // scroll_btn.addEventListener('pointerdown', sliderdown, true);
    // scroll_btn.addEventListener('pointermove', slidermove, true);
    // scroll_btn.addEventListener('pointerup', sliderup, true);

    compare_area.addEventListener('pointerdown', com_sliderdown, true);
    window.addEventListener('pointermove', com_slidermove, true);
    window.addEventListener('pointerup', com_sliderup, true);
    scroll_btn.addEventListener('click', toggle_compare, true);

    var downpos;
    var downleft;

    var movepos;

    var movingpos;
    var pointerdown_flag = false;


    var newpos;


    function com_sliderdown(e) {
        console.log(e.target);
        pointerdown_flag = true;
        $(".spotlight").fadeOut(300)

        if (($(e.target).attr("id")) == "compare-scroll-area") {
            console.log("compare-scroll-area")
            var scroll_left = e.clientX - compare_area.getBoundingClientRect().left
            scroll_btn.setAttribute("style", "left :" + scroll_left + "px")
            before_area.setAttribute("style", "width :" + scroll_left + "px;")
            after_area.setAttribute("style", "width :" + (compare_area.clientWidth - scroll_left) + "px;")

            downpos = $(scroll_btn).offset().left - compare_area.getBoundingClientRect().left;
            downleft = $(scroll_btn).offset().left - compare_area.getBoundingClientRect().left;

        } else {
            downpos = (e.clientX - compare_area.getBoundingClientRect().left);
            downleft = $(scroll_btn).offset().left - compare_area.getBoundingClientRect().left;

        }

        console.log(downleft);
    }

    function com_slidermove(e) {
        if (pointerdown_flag == true) {
            movepos = e.clientX - compare_area.getBoundingClientRect().left
            // console.log(movepos - downpos)
            movingpos = (movepos - downpos)
            newpos = downleft + movingpos;
            if (newpos < 0) {
                newpos = 0;
            } else if (newpos > (compare_area.clientWidth)) {
                newpos = compare_area.clientWidth
            }

            scroll_btn.setAttribute("style", "left :" + newpos + "px")
            before_area.setAttribute("style", "width :" + newpos + "px;")
            after_area.setAttribute("style", "width :" + (compare_area.clientWidth - newpos) + "px;")

            if (newpos < (address_areaWidth / 2)) {
                if (!($("#compare-juso-after").hasClass("blob-orange"))) {
                    $("#compare-juso-before").removeClass("blob-black")
                    $("#compare-juso-after").addClass("blob-orange")

                }
            }
            if (newpos >= (address_areaWidth / 2)) {
                if (!($("#compare-juso-before").hasClass("blob-black"))) {
                    $("#compare-juso-before").addClass("blob-black")
                    $("#compare-juso-after").removeClass("blob-orange")
                }
            }
        }

    }
    var uppos;

    var gizon = "rightopen"

    function com_sliderup(e) {
        if (pointerdown_flag == true) {
            pointerdown_flag = false;
            console.log("po up")

            uppos = e.clientX - compare_area.getBoundingClientRect().left;
            console.log(Math.abs(downpos - uppos));
            if ((Math.abs(downpos - uppos)) <= 10) {

            } else {
                if (gizon == "rightopen") {
                    if (newpos >= (address_areaWidth / 5)) {
                        moveright();
                    } else {
                        moveleft();
                    }
                } else if (gizon == "leftopen") {
                    if (newpos <= (address_areaWidth - (address_areaWidth / 5))) {
                        moveleft();
                    } else {
                        moveright();
                    }

                } else {

                    if (newpos >= (address_areaWidth / 2)) {
                        moveright();
                    } else {
                        moveleft();
                    }
                }
            }
        }



    }
    function toggle_compare(e) {
        uppos = e.clientX - compare_area.getBoundingClientRect().left;
        console.log(Math.abs(downpos - uppos));
        if ((Math.abs(downpos - uppos)) <= 10) {
            if (gizon == "rightopen") {
                moveright();

            }
            else {
                moveleft();

            }
        }

    }





    $(".spotlight").on("click", function () {
        $(".spotlight").fadeOut(300)
        setTimeout(() => {
            if ($(this).hasClass("before")) {
                moveright();
            } else {
                moveleft();
            }
        }, 0);

    })




    function moveright() {
        gizon = "leftopen"
        $(scroll_btn).addClass("moving")
        $(before_area).addClass("moving")
        $(after_area).addClass("moving")

        scroll_btn.setAttribute("style", "left :" + (address_areaWidth) + "px")
        before_area.setAttribute("style", "width :" + address_areaWidth + "px;")
        after_area.setAttribute("style", "width :" + 0 + "px;")


        setTimeout(() => {
            $(scroll_btn).removeClass("moving")
            $(before_area).removeClass("moving")
            $(after_area).removeClass("moving")
        }, 500);

        $("#compare-juso-before").addClass("blob-black")
        $("#compare-juso-after").removeClass("blob-orange")
    }

    function moveleft() {
        gizon = "rightopen"
        $(scroll_btn).addClass("moving")
        $(before_area).addClass("moving")
        $(after_area).addClass("moving")

        scroll_btn.setAttribute("style", "left :0px")
        before_area.setAttribute("style", "width :" + 0 + "px;")
        after_area.setAttribute("style", "width :" + address_areaWidth + "px;")


        setTimeout(() => {
            $(scroll_btn).removeClass("moving")
            $(before_area).removeClass("moving")
            $(after_area).removeClass("moving")
        }, 500);

        $("#compare-juso-before").removeClass("blob-black")
        $("#compare-juso-after").addClass("blob-orange")
    }


    modal = document.getElementById("modal-back")
    element_wrap = document.getElementById('modal-juso');

    document.getElementById("search-address").addEventListener("click", function (event) {
        modal.classList.add("view")
        sample3_execDaumPostcode()
    });

    document.getElementById("modal-close-btn").addEventListener("click", function (event) {

        modal.classList.remove("view")

    });

    $('input[type="radio"]').change(function () {
        console.log("result")

        var demowrap = $(this).parents(".demo-area").find(".demo-wrap");
        console.log(demowrap)
        $(demowrap).removeClass();
        $(demowrap).addClass("demo-wrap demo-type-" + $(this).val());
    });
}

var modal
var element_wrap;

function sample3_execDaumPostcode() {
    // ?????? scroll ????????? ??????????????????.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function (data) {
            // ???????????? ????????? ??????????????? ????????? ????????? ???????????? ??????.

            // ??? ????????? ?????? ????????? ?????? ????????? ????????????.
            // ???????????? ????????? ?????? ?????? ????????? ??????('')?????? ????????????, ?????? ???????????? ?????? ??????.
            var addr = ''; // ?????? ??????
            var extraAddr = ''; // ???????????? ??????

            //???????????? ????????? ?????? ????????? ?????? ?????? ?????? ?????? ????????????.
            if (data.userSelectedType === 'R') { // ???????????? ????????? ????????? ???????????? ??????
                addr = data.roadAddress;
            } else { // ???????????? ?????? ????????? ???????????? ??????(J)
                addr = data.jibunAddress;
            }

            // ???????????? ????????? ????????? ????????? ???????????? ??????????????? ????????????.
            if (data.userSelectedType === 'R') {
                // ??????????????? ?????? ?????? ????????????. (???????????? ??????)
                // ???????????? ?????? ????????? ????????? "???/???/???"??? ?????????.
                if (data.bname !== '' && /[???|???|???]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // ???????????? ??????, ??????????????? ?????? ????????????.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // ????????? ??????????????? ?????? ??????, ???????????? ????????? ?????? ???????????? ?????????.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // ????????? ??????????????? ?????? ????????? ?????????.
                document.getElementById("modal-juso").value = extraAddr;

            } else {
                document.getElementById("modal-juso").value = '';
            }

            // ??????????????? ?????? ????????? ?????? ????????? ?????????.
            document.getElementById('old-zipNo-input').value = data.zonecode;
            document.getElementById("old-address-input").value = addr;
            // ????????? ???????????? ????????? ????????????.
            // document.getElementById("old-detail-input").focus();

            // iframe??? ?????? element??? ???????????? ??????.
            // (autoClose:false ????????? ???????????????, ?????? ????????? ???????????? ???????????? ???????????? ?????????.)
            element_wrap.style.display = 'none';

            // ???????????? ?????? ????????? ????????? ???????????? scroll ????????? ????????????.
            document.body.scrollTop = currentScroll;
            modal.classList.toggle("view")
        },
        // ???????????? ?????? ?????? ????????? ?????????????????? ????????? ????????? ???????????? ??????. iframe??? ?????? element??? ???????????? ????????????.
        onresize: function (size) {
            element_wrap.style.height = size.height + 'px';
        },
        width: '100%',
        height: '100%'
    }).embed(element_wrap);

    // iframe??? ?????? element??? ????????? ??????.

}