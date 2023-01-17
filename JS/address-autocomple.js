var AddressAutoComple = function (option) {


    console.log(option);
    var areaid = option.areaid;
    var address = document.createElement('input')

    address.setAttribute("id", areaid + "-address");
    address.setAttribute("class", "auto-address")
    address.setAttribute("type", "text")
    address.setAttribute("autocomplete", "off")
    $("#" + option.areaid).append(address)

    $(address).autocomplete({
        source: function (request, response) {
            $.ajax({
                type: 'get',
                url: "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + $(address).val() + "&confmKey=" + option.jusoapikey + "&resultType=json&",
                dataType: "json",
                success: function (data) {
                    response($.map(data.results.juso, function (item) {
                        return {
                            label: item,
                            value: item.roadAddr + " ",	//선택시 들어갈 데이터
                        }
                    })
                    );
                }
            });
        },
        select: function (event, ui) {	//아이템 선택시
            // dofocus();
            selectauto(ui.item.label);

        },
        focus: function (event, ui) {
            return false
        },
        minLength: 2,// 최소 글자
        autoFocus: false,
        matchContains: true,
        delay: 300,	//검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
        // disabled: true, //자동완성 기능 끄기
        position: { my: "left top", at: "left bottom" },
        close: function (event) {	//자동완성창 닫아질때 호출
            // console.log(event);
        }
    }).autocomplete("instance")._renderItem = function (ul, item) {    //요 부분이 UI를 마음대로 변경하는 부분
        html = "";
        html += "<div>"
        html += "    <div class='auto_loadarr'>도로명주소 : " + item.label.roadAddr + "</div>"
        html += "    <div class='auto_jibunarr' >지번주소 : " + item.label.jibunAddr + "</div>"
        html += "    <div class='auto_engarr' >영문주소 : " + item.label.engAddr + "</div>"
        html += "    <div class='auto_postnum' >우편번호 : " + item.label.zipNo + "</div>"
        html += "<div>"
        return $("<li>")	//기본 tag가 li로 되어 있음 
            .append(html)	//여기에다가 원하는 모양의 HTML을 만들면 UI가 원하는 모양으로 변함.
            .appendTo(ul);
    };

    function selectauto(data) {
        $("#" + areaid).addClass("comple");
        $(address).addClass("comple");
        console.log(data);
        completext = data.roadAddr;
        $(address).autocomplete({
            disabled: true
        });

        setTimeout(() => {
            $(address).focus();
        }, 50);
        data.detail = "";
        jusdata = data;

        return true
    }
    var completext = "";
    var detail = "";
    $(address).on("input", function () {

        if ($(this).hasClass("comple")) {
            console.log(($(this).val()).startsWith(completext))
            console.log($(this).val())
            console.log(completext)
            if (($(this).val()).startsWith(completext)) {

                detail = ($(this).val()).replace(completext, "");
                jusdata.detail = detail;


            } else {
                $("#" + areaid).removeClass("comple")
                $(this).removeClass("comple")
                jusdata = {};
                $(address).autocomplete({
                    disabled: false
                });
                completext = ""

            }
        }
    })

    $(address).on("focus", function (e) {
        var length = ($(this).val()).length
        const el = e.target;
        setTimeout(() => {
            el.scrollLeft = 50 * 300;
            el.setSelectionRange(length, length);
        }, 100);
    })
    var jusdata = {}
    this.jusodata = function () {
        return jusdata;
    }
}


