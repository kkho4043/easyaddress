window.onload = function () {
    auto_com();
}

function auto_com() {

    input = new esayaddress.searcfomat({

        jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
        coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
        areaid: "input-area",

        labeltext: "주소",
        tooltiptext: "상세주소입력",
        // searchoption: {
        //     // selectjuso: "jibunAddr",
        //     searchamount: 10,
        // },

        renderjuso: function (jusodata) {
            var str = ""
            str += "<div class='easy_jusoarea'>"
            str += "    <div class='easy_loadarr jusoarea'>" + jusodata.roadAddr + "</div>"
            str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + jusodata.emdNm + " " + jusodata.lnbrMnnm
            if (jusodata.lnbrSlno != "0") {
                str += "-" + jusodata.lnbrSlno
            }
            str += "<span class = 'zip-no'> ㉾" + jusodata.zipNo + "</span></div></div>"
            str += "</div>"
            return str
        },

        // beforeword: "",
        // beforjuso: "",
        // beforedetial: "",

        selectevent: function (data) {
            console.log(data);
            // mapaddtag();
        },
        deleteaddressevent: function (data) {
            console.log(data);
            // mapaddtag();
        }

    })

    // input2 = new esayaddress.searcfomat({

    //     jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
    //     coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
    //     areaid: "input-area1",

    //     labeltext: "주소를 입력하세요",
    //     tooltiptext: "상세 주소 입력",
    //     searchoption: {
    //         selectjuso: "jibunAddr",
    //         searchamount: 20,
    //     },

    //     renderjuso: function (jusodata) {
    //         var str = ""
    //         str += "<div class='easy_jusoarea'>"
    //         str += "    <div class='easy_loadarr jusoarea'>" + jusodata.roadAddr + "</div>"
    //         str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + jusodata.emdNm + " " + jusodata.lnbrMnnm
    //         if (jusodata.lnbrSlno != "0") {
    //             str += "-" + jusodata.lnbrSlno
    //         }
    //         str += "<span class = 'zip-no'> ㉾" + jusodata.zipNo + "</span></div></div>"
    //         str += "</div>"
    //         return str
    //     },

    //     beforeword: "역삼동",
    //     beforjuso: "서울특별시 강남구 역삼동 773-15",
    //     beforedetial: "",

    //     selectevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     },
    //     deleteaddressevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     }

    // })

    // input3 = new esayaddress.searcfomat({

    //     jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
    //     coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
    //     areaid: "input-area2",

    //     labeltext: "주소를 입력하세요",
    //     tooltiptext: "상세 주소 입력",
    //     searchoption: {
    //         selectjuso: "jibunAddr",
    //         searchamount: 20,
    //     },

    //     renderjuso: function (jusodata) {
    //         var str = ""
    //         str += "<div class='easy_jusoarea'>"
    //         str += "    <div class='easy_loadarr jusoarea'>" + jusodata.roadAddr + "</div>"
    //         str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + jusodata.emdNm + " " + jusodata.lnbrMnnm
    //         if (jusodata.lnbrSlno != "0") {
    //             str += "-" + jusodata.lnbrSlno
    //         }
    //         str += "<span class = 'zip-no'> ㉾" + jusodata.zipNo + "</span></div></div>"
    //         str += "</div>"
    //         return str
    //     },

    //     beforeword: "역삼동",
    //     beforjuso: "강원도 철원군 동송읍 이평리 429-2",
    //     beforedetial: "",

    //     selectevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     },
    //     deleteaddressevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     }

    // })


    // input4 = new esayaddress.searcfomat({

    //     jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
    //     coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
    //     areaid: "input-area3",

    //     labeltext: "주소를 입력하세요",
    //     tooltiptext: "상세 주소 입력",
    //     searchoption: {
    //         selectjuso: "jibunAddr",
    //         searchamount: 20,
    //     },

    //     renderjuso: function (jusodata) {
    //         var str = ""
    //         str += "<div class='easy_jusoarea'>"
    //         str += "    <div class='easy_loadarr jusoarea'>" + jusodata.roadAddr + "</div>"
    //         str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + jusodata.emdNm + " " + jusodata.lnbrMnnm
    //         if (jusodata.lnbrSlno != "0") {
    //             str += "-" + jusodata.lnbrSlno
    //         }
    //         str += "<span class = 'zip-no'> ㉾" + jusodata.zipNo + "</span></div></div>"
    //         str += "</div>"
    //         return str
    //     },

    //     beforeword: "역삼동",
    //     beforjuso: "경기도 양주시 옥정동 958 e편한세상 옥정어반센트럴",
    //     beforedetial: "",

    //     selectevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     },
    //     deleteaddressevent: function (data) {
    //         console.log(data);
    //         mapaddtag();
    //     }

    // })


    // map = new esayaddress.easymap({
    //     areaid: "maparea",
    //     jusoapikey: "devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=",
    //     coordkey: "7701568D-DAB6-3644-8B38-3552918B21F1",
    // })

}
var input;
// var input2;
// var input3;
// var input4;
var map;
function get_juso_data() {
    console.log(input);
    console.log(input2);
}

function mapaddtag() {
    var arr = [input]
    var addressarr = ["역삼동 825-22 미림타워", "역삼동 773-15"]
    var pointarr = []
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i].getaddressdata();
        if (data.coorddata) {


            var coorddata = data.coorddata;
            console.log(data)
            var addressdata = data.addressdata;
            pointarr.push({

                // addressdata: data,
                // address: addressarr[i],
                x: coorddata.x,
                y: coorddata.y,
                // bindcontent: "",
                polyline: true
            })
        }
    }
    map.drawingmap(pointarr);

}