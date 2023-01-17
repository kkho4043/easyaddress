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
    // 현재 scroll 위치를 저장해놓는다.
    var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    new daum.Postcode({
        oncomplete: function (data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("modal-juso").value = extraAddr;

            } else {
                document.getElementById("modal-juso").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('old-zipNo-input').value = data.zonecode;
            document.getElementById("old-address-input").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            // document.getElementById("old-detail-input").focus();

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_wrap.style.display = 'none';

            // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
            document.body.scrollTop = currentScroll;
            modal.classList.toggle("view")
        },
        // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
        onresize: function (size) {
            element_wrap.style.height = size.height + 'px';
        },
        width: '100%',
        height: '100%'
    }).embed(element_wrap);

    // iframe을 넣은 element를 보이게 한다.

}