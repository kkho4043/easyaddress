! function () {
    function searcfomat(option) {

        let inputid = option.areaid;
        let inputval;
        let completext = "";
        let detail = ""
        let tooltip_direction = "top"
        $(inputid).autocomplete({


            source: function (request, response) {
                $.ajax({
                    type: 'get',
                    url: "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + $(inputid).val() + "&confmKey=devU01TX0FVVEgyMDIyMTExODEzNDgxOTExMzIzNzQ=&resultType=json&",
                    dataType: "json",
                    success: function (data) {
                        response($.map(data.results.juso, function (item) {
                            item.completext = jusowidth_comple(item.roadAddr)
                            return {
                                label: item,
                                value: item.completext,	//선택시 들어갈 데이터
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
            open: function () {
                $(this).autocomplete("widget").css({
                    "width": $(inputid).width(),
                    "height": 150,
                    "overflow-y": "auto",
                    "overflow-x": "hidden",
                });
            },
            minLength: 2,// 최소 글자
            autoFocus: false,
            matchContains: true,
            delay: 100,	//검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
            // disabled: true, //자동완성 기능 끄기
            position: { my: "left top", at: "left bottom" },
            close: function (event) {	//자동완성창 닫아질때 호출
                // console.log(event);
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {    //요 부분이 UI를 마음대로 변경하는 부분
            console.log(item)
            let str = ""
            str += "<div class='easy_jusoarea'>"
            str += "    <div class='easy_loadarr jusoarea'>" + item.label.roadAddr + "</div>"
            str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + item.label.emdNm + " " + item.label.lnbrMnnm
            if (item.label.lnbrSlno != "0") {
                str += "-" + item.label.lnbrSlno
            }
            str += "<span class = 'zip-no'> ㉾" + item.label.zipNo + "</span></div></div>"
            str += "</div>"


            return $("<li>")	//기본 tag가 li로 되어 있음 
                .append(str)	//여기에다가 원하는 모양의 HTML을 만들면 UI가 원하는 모양으로 변함.
                .appendTo(ul);
        };

        function jusowidth_comple(text) {

            var inputwidth = ($(inputid).width() * 0.7)
            console.log(inputwidth)
            let clone = document.createElement("span")
            $(inputid).parent().append(clone)

            $(clone).text(text);

            clone.style.position = "fixed"
            clone.style.top = "-200px"
            clone.style.left = "-200px"
            clone.style.width = "fit-content"
            $(clone).css("fontSize", $(inputid).css("fontSize"));
            var inputval = textwidth(text, 2, text.length);

            return inputval;
            // return (textwidth(text, 2, text.length))


            function textwidth(text, leftlength, rightlength) {

                if (leftlength == rightlength) {
                    leftlength = leftlength - 1;
                } else {
                    rightlength = rightlength - 1;
                }
                let clonetext = text.slice(0, leftlength) + "..." + text.slice((-1 * rightlength)) + " "

                clone.innerText = clonetext;
                let clonewidth = clone.offsetWidth
                if (inputwidth < (clonewidth)) {
                    return textwidth(text, leftlength, rightlength)
                } else {
                    clone.remove();

                    return clonetext
                }
            }
        }
        function selectauto(data, ee) {
            if (typeof option.selectevent != "undefined") {
                option.selectevent(data)
            }

            inputval = $(inputid).val();
            detial = "";
            $(inputid).addClass("comple");


            completext = data.completext;
            $(inputid).autocomplete({
                disabled: true
            });

            setTimeout(() => {
                $(inputid).focus();
            }, 50);

            addtooltooltip();
            return true
        }

        $(inputid).on("input", function () {

            if ($(this).hasClass("comple")) {

                if (($(this).val()).startsWith(completext)) {

                    detail = ($(this).val()).replace(completext, "");

                    if (detail.length <= 0) {
                        addtooltooltip();
                    } else {
                        removetooltip();
                    }
                } else {
                    $(this).removeClass("comple")
                    jusodata = {};
                    $(inputid).autocomplete({
                        disabled: false
                    });
                    $(inputid).val(inputval)
                    completext = ""
                    removetooltip();

                }
            }
        })
        $(inputid).on("focusout", function (e) {
            removetooltip()
        })
        $(inputid).on("click", function (e) {

            var posi = this.selectionStart;
            var endpo = this.selectionEnd;
            if (completext != "") {
                if (endpo < completext.length) {
                    $(this).removeClass("comple")
                    jusodata = {};
                    $(inputid).autocomplete({
                        disabled: false
                    });
                    $(inputid).val(inputval)
                    completext = ""
                } else {

                    if ($(this).hasClass("comple")) {
                        if (detail.length <= 0) {
                            addtooltooltip()
                        }
                    }

                }
            }
        })

        function addtooltooltip() {
            console.log("////////////////")
            var tootip = document.createElement("span")
            tootip.setAttribute("class", "tooltip-" + tooltip_direction + " tooltiptext");
            if (typeof option.tooltiptext != "undefined") {
                tootip.innerText = option.tooltiptext;
            } else {
                tootip.innerText = "상세 주소 입력"
            }

            $(inputid).parent().append(tootip)
        }
        function removetooltip() {
            var tooptips = document.getElementsByClassName("tooltiptext")
            for (var i = 0; i < tooptips.length; i++) {
                tooptips[i].remove();
            }

        }


    }


    function getaddressdata(addresstext, callback, jusoapikey, coordkey, pagenum = 1,) {

        url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=" + pagenum + "&keyword=" + addresstext + "&confmKey=" + jusoapikey + "&resultType=json&countPerPage=" + 2000

        fetch(encodeURI(url), {
            method: "get"
        }).then(resp => {
            const respJson = resp.json()
            return respJson
        }).then(data => {

            done_getaddressdata(data.results.juso);
            function done_getaddressdata(data) {
                var findflag = true;
                if (data.length == 1) {

                    getcoorddata(data[0], callback, coordkey);

                } else {
                    for (var i = 0; i < data.length; i++) {
                        if ((data[i].roadAddr == addresstext) || (data[i].jibunAddr == addresstext) || (data[i].engAddr == addresstext)) {
                            findflag = false

                            getcoorddata(data[i], callback, coordkey);

                        }
                    }
                    if (findflag) {
                        getaddressdata(addresstext, callback, jusoapikey, coordkey, (pagenum + 1))
                    }
                }
            }
        }).catch(excResp => {

        })


    }
    var callbackcount = 1;
    function getcoorddata(jusodata, callbackfuntion, coordkey) {

        // let callbackname = jusodata.roadAddrPart1 + "callbakc"
        console.log(jusodata)


        var callbackstr = "jusocallback" + callbackcount;
        callbackcount++;
        window[callbackstr] = function (data) {

            console.log(data);
            callbackfuntion(jusodata, data)
        }
        script = window.document.createElement('script');
        script.src = encodeURI('https://api.vworld.kr/req/address?&service=address&request=getcoord&version=2.0&crs=epsg:4326&refine=true&simple=false&format=json&type=parcel&key=' + coordkey + '&address=' + jusodata.jibunAddr + '&callback=' + callbackstr)

        script.async = true;
        head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
        head.insertBefore(script, head.firstChild);

    }


    function easymap(option) {
        let areaid = option.areaid
        let area = document.getElementById(areaid);

        let map = document.createElement("div");

        map.setAttribute("id", areaid + "-map");
        map.setAttribute("class", "easy-map");
        area.append(map);

        vmap = L.map(map, {
            "center": [37.497929, 127.027669],
            "zoom": 15,
            "zoomControl": true,
            "scrollWheelZoom": false,
            "doubleClickZoom": false,
            "minZoom": 6,
            "maxZoom": 19,
            zoomSnap: 0.1,
            gestureHandling: true,
            gestureHandlingOptions: {
                text: {
                    touch: "Hey bro, use two fingers to move the map",
                    scroll: "Hey bro, use ctrl + scroll to zoom the map",
                    scrollMac: "Hey bro, use \u2318 + scroll to zoom the map"
                }
            }
        });


        var vworldLayer = L.tileLayer('https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png', {
            "minZoom": 6,
            "maxZoom": 19,
            "maxNativeZoom": 19,
            "attribution": '&copy; <a href="http://www.vworld.kr/">vworld</a> contributors'
        });
        vworldLayer.addTo(vmap);
        // vmap.locate({ setView: true, maxZoom: 16 });

        // function onLocationFound(e) {
        //     var radius = e.accuracy;
        //     console.log(e);
        //     L.marker(e.latlng).addTo(map)
        //         .bindPopup("You are within " + radius + " meters from this point").openPopup();

        //     L.circle(e.latlng, radius).addTo(map);
        // }
        // vmap.on('locationfound', onLocationFound);

        // function onLocationError(e) {
        //     alert(e.message);
        // }

        // vmap.on('locationerror', onLocationError);
        function getLocation() {
            if (navigator.geolocation) { // GPS를 지원하면
                navigator.geolocation.getCurrentPosition(function (position) {
                    alert(position.coords.latitude + ' ' + position.coords.longitude);
                }, function (error) {
                    console.error(error);
                }, {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: Infinity
                });
            } else {
                alert('GPS를 지원하지 않습니다');
            }
        }
        getLocation();

        var markerarr = [];
        var popuparr = [];
        var polylinearr = [];
        var focusarr = [];
        var polyline;

        var pop_options = {
            offset: new L.Point(1, -22),
            closeButton: false,
            autoClose: false,
            closeOnClick: false,
        };

        var juso_pop = {
            offset: new L.Point(1, 37),
            closeButton: false,
            autoClose: false,
            closeOnClick: false,
            className: 'juso-pop'
        };

        function clearmap() {
            console.log(markerarr)
            count = 0;

            for (var k = 0; k < markerarr.length; k++) {
                console.log(markerarr[k])


                markerarr[k].remove(vmap);

            }


            if (popuparr) {

                for (var i = 0; i < popuparr.length; i++) {

                    popuparr[i].remove(vmap);

                }
            }

            setTimeout(() => {
                focusarr = [];
                popuparr = [];
                markerarr = [];
                polylinearr = [];

            }, 000);



            console.log("clear stop")
        }

        this.drawingmap = function (markedataarr) {

            clearmap();
            setTimeout(() => {


                for (let i = 0; i < markedataarr.length; i++) {
                    let markerdata = markedataarr[i]


                    if (markerdata.addressdata) {

                        let addressdata = markerdata.addressdata
                        markerdata.x = addressdata.coorddata.x
                        markerdata.y = addressdata.coorddata.y
                        insertcoord(markerdata);
                    }
                    else if (typeof markerdata.x != "undefined", typeof markerdata.y != "undefined") {
                        insertcoord(markerdata)
                    }
                    else if (typeof markerdata.address != "undefined") {

                        getaddressdata(markerdata.address, callbackfn, option.jusoapikey, option.coordkey)


                        function callbackfn(jusodata, callback_coorddata) {

                            let callback_coord = callback_coorddata.response.result.point
                            markerdata.x = callback_coord.x
                            markerdata.y = callback_coord.y

                            insertcoord(markerdata)
                        }

                    }


                    function insertcoord(markerdata) {

                        let coord = [markerdata.y, markerdata.x]
                        focusarr.push(coord)

                        let marker = (L.marker(coord)).addTo(vmap);
                        markerarr.push(marker);

                        if (typeof markerdata.bindcontent != "undefined") {
                            let popup = L.popup(pop_options).setLatLng(coord).setContent(markerdata.bindcontent).addTo(vmap);
                            popuparr.push(popup);
                        }

                        if (typeof markerdata.jusopop != "undefined") {
                            console.log()
                            let juso_popup = L.popup(juso_pop,).setLatLng(coord).setContent(markerdata.jusopop).addTo(vmap);
                            console.log(juso_popup)
                            popuparr.push(juso_popup);
                        }

                        if (typeof markerdata.polyline != "undefined") {
                            if (markerdata.polyline) {
                                polylinearr.push(coord);
                            }
                        }

                        setTimeout(() => {
                            drawpolyline();
                            vmap.fitBounds(fitarea(focusarr));
                        }, 0);
                    }
                }
            }, 0);


            function drawpolyline() {

                if (polyline) {
                    polyline.remove(vmap)
                }

                if (polylinearr.length >= 2) {



                    polyline = new L.Polyline(polylinearr, {
                        noClip: true,
                        color: "red",
                        weight: 2,
                        opacity: 0.5,
                        interactive: false
                    })
                    polyline.addTo(vmap);
                }
            }


            function fitarea(arr) {
                console.log(arr)
                var maxpx = 0;
                var minpx = 999
                var maxpy = 0
                var minpy = 999;

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][0] > maxpy) {
                        maxpy = arr[i][0];
                    }

                    if (arr[i][0] < minpy) {
                        minpy = arr[i][0];
                    }

                    if (arr[i][1] > maxpx) {
                        maxpx = arr[i][1];
                    }

                    if (arr[i][1] < minpx) {
                        minpx = arr[i][1];
                    }



                }

                var fitx = ((maxpx - minpx) / 2);
                var fity = ((maxpy - minpy) / 2);




                return [
                    [parseFloat(maxpy) + parseFloat(fity), parseFloat(minpx) - parseFloat(fitx)],
                    [parseFloat(maxpy) + parseFloat(fity), parseFloat(maxpx) + parseFloat(fitx)],
                    [parseFloat(minpy) - parseFloat(fity), parseFloat(maxpx) + parseFloat(fitx)],
                    [parseFloat(minpy) - parseFloat(fity), parseFloat(minpx) - parseFloat(fitx)],
                ]
            }



        }

    }

    var a = {
        searcfomat: searcfomat,
        easymap: easymap,
    }

    "function" == typeof define && define.amd ? define(function () {
        return a
    }) : "undefined" != typeof module ? module.exports = a : window.esayaddress = a
}();

!function () { var n = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM", e = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ", i = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", f = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", o = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ", d = 44032, t = function (n) { for (var e = {}, i = 0; i < n.length; ++i)e[n[i]] = i; return e }(n), r = function (n) { for (var e = {}, i = 0; i < n.length; ++i)e[n[i]] = i; return e }(e), x = { "ㄱㅅ": "ㄳ", "ㄴㅈ": "ㄵ", "ㄴㅎ": "ㄶ", "ㄹㄱ": "ㄺ", "ㄹㅁ": "ㄻ", "ㄹㅂ": "ㄼ", "ㄹㅅ": "ㄽ", "ㄹㅌ": "ㄾ", "ㄹㅍ": "ㄿ", "ㄹㅎ": "ㅀ", "ㅂㅅ": "ㅄ" }, O = { "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ", "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ", "ㅡㅣ": "ㅢ" }, u = function (n) { return r[n] >= 28 }; function a(n) { var e = n || {}; return this._allowDoubleConsonant = void 0 !== e.allowDoubleConsonant && e.allowDoubleConsonant, this } a.prototype.config = function (n) { var e = n || {}; this._allowDoubleConsonant = void 0 !== e.allowDoubleConsonant && e.allowDoubleConsonant }, a.prototype.VERSION = "1.1.1", a.prototype.en2ko = function (n, d) { var r = d || {}, a = void 0 !== r.allowDoubleConsonant ? r.allowDoubleConsonant : this._allowDoubleConsonant, l = this, p = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5], s = [[1, 1, 2, 2], [3, 1, 4, 4], [1, 1, 5, 2], [3, 1, 4, -1], [6, 1, 7, 2], [1, 1, 2, 2], [9, 1, 4, 4], [9, 1, 2, 2], [1, 1, 4, 4], [10, 1, 4, 4], [1, 1, 4, 4]], h = function (n) { return n[n.length - 1] }, c = function (n) { var d = []; if (n.forEach(function (n, i) { var f = e[n]; 0 !== i && u(h(d)[0]) === u(f) || d.push([]), h(d).push(f) }), 1 === (d = d.map(function (n) { var e = n.join(""); return x[e] || O[e] || e })).length) return d[0]; var t = [i, f, o], r = d.map(function (n, e) { return t[e].indexOf(n) }); return r.length < 3 && r.push(-1), l.한글생성.apply(l, r) }; return function () { for (var i, f, o = n.length, d = -1, r = [], l = 0, h = [], v = function () { h.length > 0 && r.push(c(h)), h = [] }, w = 0; w < o; ++w) { var y = n[w], g = t[y]; if (void 0 === g) l = 0, v(), r.push(y); else { var C = (void 0, void 0, i = (e[d] || "") + e[g], f = u(e[d]), u(e[g]) ? f ? O[i] ? 2 : 3 : 2 : f ? -1 === "ㄸㅃㅉ".indexOf(e[g]) ? 0 : 1 : (1 !== l || a) && x[i] ? 0 : 1), b = s[l][C]; h.push(g); var m = h.length - p[b]; m && r.push(c(h.splice(0, m))), l = b, d = g } } return v(), r.join("") }() }, a.prototype.ko2en = function (e) { var i = ""; if ("" === e || void 0 === e) return i; for (var f = [-1, -1, -1, -1, -1], o = 0; o < e.length; o++) { var t = e[o], r = t.charCodeAt(); r >= d && r <= 55203 || r >= 12593 && r <= 12643 ? f = this.한글분리(t) : (i += t, f = [-1, -1, -1, -1, -1]); for (var x = 0; x < f.length; x++)-1 !== f[x] && (i += n[f[x]]) } return i }, a.prototype.한글생성 = function (n, e, i) { return String.fromCharCode(44032 + 588 * n + 28 * e + i + 1) }, a.prototype.한글분리 = function (n) { var t = n.charCodeAt(); if (t >= d && t <= 55203) { var r = Math.floor((t - d) / 588), x = Math.floor((t - d - 588 * r) / 28), O = t - d - 588 * r - 28 * x - 1, u = x, a = -1, l = O, p = -1; return x == f.indexOf("ㅘ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅏ")) : x == f.indexOf("ㅙ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅐ")) : x == f.indexOf("ㅚ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅝ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅓ")) : x == f.indexOf("ㅞ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅔ")) : x == f.indexOf("ㅟ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅢ") && (u = e.indexOf("ㅡ"), a = e.indexOf("ㅣ")), O == o.indexOf("ㄳ") ? (l = e.indexOf("ㄱ"), p = e.indexOf("ㅅ")) : O == o.indexOf("ㄵ") ? (l = e.indexOf("ㄴ"), p = e.indexOf("ㅈ")) : O == o.indexOf("ㄶ") ? (l = e.indexOf("ㄴ"), p = e.indexOf("ㅎ")) : O == o.indexOf("ㄺ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㄱ")) : O == o.indexOf("ㄻ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅁ")) : O == o.indexOf("ㄼ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅂ")) : O == o.indexOf("ㄽ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅅ")) : O == o.indexOf("ㄾ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅌ")) : O == o.indexOf("ㄿ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅍ")) : O == o.indexOf("ㅀ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅎ")) : O == o.indexOf("ㅄ") && (l = e.indexOf("ㅂ"), p = e.indexOf("ㅅ")), -1 === a && (u = e.indexOf(f[x])), -1 === p && (l = e.indexOf(o[O])), [r, u, a, l, p] } if (t >= 12593 && t <= 12643) { if (i.indexOf(n) > -1) return [r = e.indexOf(n), -1, -1, -1, -1]; if (f.indexOf(n) > -1) { u = x = f.indexOf(n), a = -1; return x == f.indexOf("ㅘ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅏ")) : x == f.indexOf("ㅙ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅐ")) : x == f.indexOf("ㅚ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅝ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅓ")) : x == f.indexOf("ㅞ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅔ")) : x == f.indexOf("ㅟ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅢ") && (u = e.indexOf("ㅡ"), a = e.indexOf("ㅣ")), -1 === a && (u = e.indexOf(f[x])), [-1, u, a, -1, -1] } } return [-1, -1, -1, -1, -1] }, a.prototype.is한글 = function (n) { if (n.length > 1) throw new Error("한 글자가 아닙니다."); return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(n) }, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = a), exports.Inko = a), "function" == typeof define && define.amd && define([], function () { return a }), "undefined" != typeof importScripts && (inko = new a, self.Inko = a), "object" == typeof window && "object" == typeof window.document && (window.Inko = a, window.inko = new a) }();
!function () { "use strict"; var r, d, g, l, t, e, h = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"], p = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", ["ㅗ", "ㅏ"], ["ㅗ", "ㅐ"], ["ㅗ", "ㅣ"], "ㅛ", "ㅜ", ["ㅜ", "ㅓ"], ["ㅜ", "ㅔ"], ["ㅜ", "ㅣ"], "ㅠ", "ㅡ", ["ㅡ", "ㅣ"], "ㅣ"], C = ["", "ㄱ", "ㄲ", ["ㄱ", "ㅅ"], "ㄴ", ["ㄴ", "ㅈ"], ["ㄴ", "ㅎ"], "ㄷ", "ㄹ", ["ㄹ", "ㄱ"], ["ㄹ", "ㅁ"], ["ㄹ", "ㅂ"], ["ㄹ", "ㅅ"], ["ㄹ", "ㅌ"], ["ㄹ", "ㅍ"], ["ㄹ", "ㅎ"], "ㅁ", "ㅂ", ["ㅂ", "ㅅ"], "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"], A = 44032; function n(n) { for (var r = n.length, t = { 0: 0 }, e = 0; e < r; e++)n[e] && (t[n[e].charCodeAt(0)] = e); return t } function o(n) { for (var r, t, e = n.length, o = {}, i = 0; i < e; i++)r = n[i][0].charCodeAt(0), t = n[i][1].charCodeAt(0), void 0 === o[r] && (o[r] = {}), o[r][t] = n[i][2].charCodeAt(0); return o } function v(n) { return void 0 !== r[n] } function y(n) { return void 0 !== d[n] } function m(n) { return void 0 !== g[n] } function u(n) { return void 0 !== l[n] } function j(n) { return 44032 <= n && n <= 55203 } function b(n, r) { return !(!e[n] || !e[n][r]) && e[n][r] } function S(n, r) { return !(!t[n] || !t[n][r]) && t[n][r] } function w(n, r) { if (null === n) throw new Error("Arguments cannot be null"); "object" == typeof n && (n = n.join("")); for (var t, e, o, i, u = [], f = n.length, c = 0; c < f; c++) { var a, s = []; j(a = n.charCodeAt(c)) ? (e = ((a -= A) - (o = a % 28)) / 28 % 21, t = parseInt((a - o) / 28 / 21), s.push(h[t]), "object" == typeof p[e] ? s = s.concat(p[e]) : s.push(p[e]), 0 < o && ("object" == typeof C[o] ? s = s.concat(C[o]) : s.push(C[o]))) : v(a) ? "string" == typeof (i = y(a) ? h[d[a]] : C[l[a]]) ? s.push(i) : s = s.concat(i) : m(a) ? "string" == typeof (i = p[g[a]]) ? s.push(i) : s = s.concat(i) : s.push(n.charAt(c)), r ? u.push(s) : u = u.concat(s) } return u } function i(n) { return "string" != typeof n ? "" : (n = w(n)).join("") } function f(c) { "string" == typeof c && (c = w(c)); var n, r, a = [], t = c.length, e = 0, s = -1, h = !1; function o(n) { var r, t, e, o, i = 0, u = ""; if (h = !1, !(n < s + 1)) for (var f = 1; ; f++) { if (1 === f) { if (m(r = c[s + f].charCodeAt(0))) return s + f + 1 <= n && m(t = c[s + f + 1].charCodeAt(0)) ? a.push(String.fromCharCode(b(r, t))) : a.push(c[s + f]), void (s = n); if (!y(r)) return a.push(c[s + f]), void (s = n); u = c[s + f] } else if (2 === f) { if (y(t = c[s + f].charCodeAt(0))) return r = S(r, t), u = String.fromCharCode(r), a.push(u), void (s = n); u = String.fromCharCode(28 * (21 * d[r] + g[t]) + A) } else 3 === f ? (b(t, e = c[s + f].charCodeAt(0)) ? t = b(t, e) : i = e, u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)) : 4 === f ? (i = S(i, o = c[s + f].charCodeAt(0)) ? S(i, o) : o, u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)) : 5 === f && (i = S(i, o = c[s + f].charCodeAt(0)), u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)); if (n <= s + f) return a.push(u), void (s = n) } } for (var i = 0; i < t; i++)y(n = c[i].charCodeAt(0)) || m(n) || u(n) ? (0 === e ? y(n) ? e = 1 : m(n) && (e = 4) : 1 == e ? m(n) ? e = 2 : S(r, n) ? e = 5 : o(i - 1) : 2 == e ? u(n) ? e = 3 : m(n) ? b(r, n) || (o(i - 1), e = 4) : (o(i - 1), e = 1) : 3 == e ? u(n) ? !h && S(r, n) ? h = !0 : (o(i - 1), e = 1) : y(n) ? (o(i - 1), e = 1) : m(n) && (o(i - 2), e = 2) : 4 == e ? m(n) ? b(r, n) ? (o(i), e = 0) : o(i - 1) : (o(i - 1), e = 1) : 5 == e && (e = m(n) ? (o(i - 2), 2) : (o(i - 1), 1)), r = n) : (o(i - 1), o(i), e = 0); return o(i - 1), a.join("") } function c(n) { this.string = n, this.disassembled = w(n).join("") } r = n(["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), d = n(["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), g = n(["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"]), l = n(["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), t = o([["ㄱ", "ㅅ", "ㄳ"], ["ㄴ", "ㅈ", "ㄵ"], ["ㄴ", "ㅎ", "ㄶ"], ["ㄹ", "ㄱ", "ㄺ"], ["ㄹ", "ㅁ", "ㄻ"], ["ㄹ", "ㅂ", "ㄼ"], ["ㄹ", "ㅅ", "ㄽ"], ["ㄹ", "ㅌ", "ㄾ"], ["ㄹ", "ㅍ", "ㄿ"], ["ㄹ", "ㅎ", "ㅀ"], ["ㅂ", "ㅅ", "ㅄ"]]), e = o([["ㅗ", "ㅏ", "ㅘ"], ["ㅗ", "ㅐ", "ㅙ"], ["ㅗ", "ㅣ", "ㅚ"], ["ㅜ", "ㅓ", "ㅝ"], ["ㅜ", "ㅔ", "ㅞ"], ["ㅜ", "ㅣ", "ㅟ"], ["ㅡ", "ㅣ", "ㅢ"]]), c.prototype.search = function (n) { return w(n).join("").indexOf(this.disassembled) }; var a = { disassemble: w, d: w, disassembleToString: i, ds: i, assemble: f, a: f, search: function (n, r) { n = w(n).join(""), r = w(r).join(""); return n.indexOf(r) }, rangeSearch: function (n, r) { var t, e = w(n).join(""), o = w(r).join(""), i = w(n, !0), u = new RegExp(o, "gi"), f = []; if (!r.length) return []; for (; t = u.exec(e);)f.push(t.index); return f.map(function (n) { return [function (n) { for (var r = 0, t = 0; r < i.length; ++r)if (n < (t += i[r].length)) return r }(n), function (n) { for (var r = 0, t = 0; r < i.length; ++r)if (t += i[r].length, n + o.length <= t) return r }(n)] }) }, Searcher: c, endsWithConsonant: function (n) { "object" == typeof n && (n = n.join("")); n = n.charCodeAt(n.length - 1); if (j(n)) { if (0 < (n -= A) % 28) return !0 } else if (v(n)) return !0; return !1 }, endsWith: function (n, r) { return w(n).pop() === r }, isHangul: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), j(n) }, isComplete: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), j(n) }, isConsonant: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), v(n) }, isVowel: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), m(n) }, isCho: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), y(n) }, isJong: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), u(n) }, isHangulAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!j(n.charCodeAt(r))) return !1; return !0 }, isCompleteAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!j(n.charCodeAt(r))) return !1; return !0 }, isConsonantAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!v(n.charCodeAt(r))) return !1; return !0 }, isVowelAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!m(n.charCodeAt(r))) return !1; return !0 }, isChoAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!y(n.charCodeAt(r))) return !1; return !0 }, isJongAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!u(n.charCodeAt(r))) return !1; return !0 } }; "function" == typeof define && define.amd ? define(function () { return a }) : "undefined" != typeof module ? module.exports = a : window.Hangul = a }();