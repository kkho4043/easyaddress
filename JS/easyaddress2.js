


EasyAddress = function (option) {
    this.option = option;

    this.get_input = function () {


        let area = document.getElementById(option.areaid);
        let juso = document.getElementById(option.areaid + "-jusoarea-area");
        let detail = document.getElementById(option.areaid + "-detailarea-area");
        return ({
            jusodata: juso.dataset.jusodata,
            coordata: juso.dataset.coorddata,
            search_text: juso.dataset.donetext,
            detail_text: $(detail).text(),

        })

    }

    let insetjuso_type = ""

    if (typeof option.searchoption != "undefined") {
        if (typeof option.searchoption.selectjuso != "undefined") {
            if (option.searchoption.selectjuso == "roadAddr") {
                insetjuso_type = "roadAddr"

            } else if (option.searchoption.selectjuso == "engAddr") {
                insetjuso_type = "engAddr"
            } else if (option.searchoption.selectjuso == "zipNo") {
                insetjuso_type = "zipNo"
            } else {
                insetjuso_type = "jibunAddr"
            }
        } else {
            insetjuso_type = "jibunAddr"
        }
    } else {
        insetjuso_type = "jibunAddr"
    }

    if (typeof option.areaid != "undefined") {
        let areaid = option.areaid
        let searchamount = 5
        if (typeof option.searchoption != "undefined") {
            if (typeof option.searchoption.searchamount != "undefined") {
                if ((option.searchoption.searchamount) > 20) {
                    searchamount = 20
                } else if ((option.searchoption.searchamount) < 5) {
                    searchamount = 5
                } else {
                    searchamount = option.searchoption.searchamount
                }
            }
        } else {
            searchamount = 10
        }
        let area = document.getElementById(areaid);
        let addressarea = document.createElement("div");

        addressarea.setAttribute("id", areaid + "-address-area");
        addressarea.setAttribute("class", "easyaddress-address-area");
        addressarea.setAttribute("autocomplete", "off");
        addressarea.setAttribute("spellcheck", "false");



        let jusoarea = document.createElement("div");
        jusoarea.setAttribute("id", areaid + "-jusoarea-area");
        jusoarea.setAttribute("class", "easyaddress-jusoarea-area");
        jusoarea.setAttribute("autocomplete", "off");
        jusoarea.setAttribute("contenteditable", "");



        let detailarea = document.createElement("div");
        detailarea.setAttribute("id", areaid + "-detailarea-area");
        detailarea.setAttribute("class", "easyaddress-detailarea-area");
        detailarea.setAttribute("autocomplete", "off");
        detailarea.setAttribute("contenteditable", "");


        let labeldiv = document.createElement("div");
        labeldiv.setAttribute("id", areaid + "-label");
        labeldiv.setAttribute("class", "easyaddress-label");

        if (typeof option.labeltext != "undefined") {
            $(labeldiv).text(option.labeltext);
        } else {
            $(labeldiv).text("주소입력");
        }

        document.getElementById(areaid).append(addressarea);
        document.getElementById(areaid).append(labeldiv);

        (addressarea).append(jusoarea);
        (addressarea).append(detailarea);


        let tooltip_direction = "bottom"
        window.onresize = function (event) {
            get_offset_size()
        }

        function get_offset_size() {
            let area = $("#" + areaid)
            let dom_offset = {
                top: area.offset().top,
                bottom: $(window).height() - (area.offset().top + area.height()),
                left: area.offset().left,
                right: $(window).width() - (area.offset().left + area.width())
            }

            let max = 0;
            let maxkey = "bottom";

            for (let key in dom_offset) {
                if (max < dom_offset[key]) {
                    max = dom_offset[key]
                    maxkey = key

                }
            }
            tooltip_direction = maxkey;
            return maxkey;
        }
        let regExp = /[A-Za-z]/;
        jusoarea.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            let input_text = $(jusoarea).text()
            if (regExp.test(input_text)) {
                let intx = Hangul.assemble(inko.en2ko($(jusoarea).text()))
                $(jusoarea).text(intx);
                jusoarea.focus()
                window.getSelection().selectAllChildren(jusoarea)
                window.getSelection().collapseToEnd()
                jusoarea.scrollLeft = 99999 * 30;
            }
            if (($(jusoarea).text()).length > 0) {
                $(addressarea).addClass("entered")
            } else {
                $(addressarea).removeClass("entered")
            }

            getaddress()

        })
        detailarea.addEventListener("keydown", function (e) {
            if (e.key == "Backspace") {
                if ($(detailarea).text().length < 1) {
                    removedetail();
                }
            }
        });

        detailarea.addEventListener("input", function (e) {

            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()

            let input_text = $(detailarea).text()
            if (regExp.test(input_text)) {
                let intx = Hangul.assemble(inko.en2ko($(detailarea).text()))
                $(detailarea).text(intx);
                detailarea.focus()
                window.getSelection().selectAllChildren(detailarea)
                window.getSelection().collapseToEnd()
                detailarea.scrollLeft = 99999 * 30;
            }

            if ($(detailarea).text().length > 0) {
                removetooltip();
            } else {
                addtooltooltip();
            }
        });

        detailarea.addEventListener("blur", function (e) {
            removetooltip();
        });

        detailarea.addEventListener("focus", function (e) {

            if ($(detailarea).text().length < 1) {
                addtooltooltip();
            }
        });
        jusoarea.addEventListener("keydown", function (e) {

            if (e.key == "ArrowDown" || e.key == "Tab") { //아래로
                // e.preventDefault()
                // e.stopPropagation()
                // e.stopImmediatePropagation()

                curser_count++
                if ((curser_count >= max_curser_count) && (max_curser_count != 0)) {
                    curser_count = 0;
                    focuse_address_data(0);
                } else {
                    focuse_address_data(curser_count);
                }

                return false
            } else if (e.key == "ArrowUp") {
                e.preventDefault()
                e.stopPropagation()
                e.stopImmediatePropagation()

                curser_count--
                if ((curser_count < 0) && (max_curser_count != 0)) {
                    curser_count = max_curser_count - 1;
                    focuse_address_data(max_curser_count - 1);
                } else {
                    focuse_address_data(curser_count);
                }
                return false


            } else if (e.key == "Enter") {
                e.preventDefault()
                // e.stopPropagatiddron()
                // e.stopImmediatePropagation()

                if (dataarr[curser_count]) {
                    selectjuso(dataarr[curser_count].dataset);
                    closeddropdown();
                    jusoarea.scrollLeft = 99999 * 30;
                }
                return false;

            } else if (e.key == "Escape") {

                jusoarea.blur();

            }
            return false;
        })

        let address_mouseout = true;
        document.getElementById(areaid).addEventListener("mouseover", function () {
            address_mouseout = false;
        })

        document.getElementById(areaid).addEventListener("mouseout", function () {
            address_mouseout = true;
        })

        addressarea.addEventListener("focusout", function (e) {
            // input.addEventListener("focusout", function (e) {
            closeddropdown();
            return true;
        })

        jusoarea.addEventListener("click", function () {
            if ($(addressarea).hasClass("detail")) {
                setTimeout(() => {
                    removedetail();
                }, 0);
            }
            return false;
        })

        let dropdownarea = document.createElement("div");
        dropdownarea.setAttribute("class", areaid + "-input-dropdown closed address-dropdown");
        document.getElementById(areaid).append(dropdownarea);

        let curDown = false;
        let curYPos = 0;

        dropdownarea.addEventListener("mousemove", function (m) {
            if (curDown) {
                if ((curYPos - m.pageY) > 6 || (curYPos - m.pageY) < -6) {
                    dropdownarea.scrollBy(0, (curYPos - m.pageY))
                    curYPos = m.pageY;
                }

                dropdownarea.classList.add("scroll");
                selectmousedown = false
            }

        });

        dropdownarea.addEventListener("mousedown", function (m) {
            curYPos = m.pageY;
            curDown = true;
        });

        window.addEventListener("mouseup", function () {
            curDown = false;
            dropdownarea.classList.remove("scroll");
        });

        let curser_count = 0;
        let max_curser_count = 0;

        function getaddress() {

            if ($(jusoarea).text().length >= 2) {


                if ($(addressarea).hasClass("detail")) {

                } else {
                    url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + $(jusoarea).text() + "&confmKey=" + option.jusoapikey + "&resultType=json&countPerPage=" + searchamount

                    fetch(encodeURI(url), {
                        method: "get"
                    }).then(resp => {
                        const respJson = resp.json()
                        return respJson
                    }).then(data => {
                        curser_count = -1

                        closeddropdown();
                        deletechileall(dropdownarea);
                        if (data.results.juso) {

                            innerdata(data.results.juso);
                        }


                    }).catch(excResp => {

                    })
                }
            }
        }

        function get_coord(data) {
            url = "https://business.juso.go.kr/addrlink/addrCoordApi.do?confmKey=" + option.coordkey
            url += "&admCd=" + data.admCd
            url += "&rnMgtSn=" + data.rnMgtSn
            url += "&udrtYn=" + data.udrtYn
            url += "&buldMnnm=" + data.buldMnnm
            url += "&buldSlno=" + data.buldSlno
            url += "&resultType=json"

            fetch(encodeURI(url), {
                method: "get"
            }).then(resp => {
                const respJson = resp.json()
                return respJson
            }).then(coorddata => {
                console.log(coorddata);
                if (typeof option.selectevent == "function") {
                    data.inputext = $(jusoarea).text();
                    recoorddata = coorddata
                    option.selectevent({
                        jusodata: data,
                        coorddata: coorddata.results.juso[0]
                    });
                }
                jusoarea.dataset.coorddata = coorddata
            }).catch(excResp => {
                console.log(excResp);
            })

        }

        removedetail = function () {

        }

        function removetooltip() {
            $(".tooltiptext").remove()
        }


        function addtooltooltip() {
            tootip = document.createElement("span")
            tootip.setAttribute("class", "tooltip-" + tooltip_direction + " tooltiptext");
            if (typeof option.tooltiptext != "undefined") {
                $(tootip).text(option.tooltiptext);
            } else {
                $(tootip).text("상세 주소 입력")
            }
            document.getElementById(areaid).prepend(tootip);
        }

        function selectjuso(data) {

            get_coord(data)

            jusoarea.dataset.donetext = $(jusoarea).text();

            area.dataset.redata = data;

            let donetext = $(jusoarea).text();
            $(addressarea).addClass("detail")

            if (insetjuso_type == "jibunAddr") {
                jusoarea.dataset.jusodata = data;
                setTimeout(() => {
                    $(jusoarea).text(data.jibunAddr);
                    setTimeout(() => {
                        detailarea.focus();
                        jusowidth_comple(data.jibunAddr)
                    }, 0);

                }, 0);



            } else if (insetjuso_type == "roadAddr") {
                jusoarea.dataset.jusodata = data;
                setTimeout(() => {
                    $(jusoarea).text(data.roadAddr);
                    setTimeout(() => {
                        detailarea.focus();
                        jusowidth_comple(data.roadAddr)
                    }, 0);
                }, 0);
            } else if (insetjuso_type == "engAddr") {
                jusoarea.dataset.jusodata = data;
                setTimeout(() => {
                    setTimeout(() => {
                        $(jusoarea).text(data.engAddr);
                        detailarea.focus();
                        jusowidth_comple(data.engAddr)
                    }, 0);
                }, 0);

            } else {
                jusoarea.dataset.jusodata = data;
                setTimeout(() => {
                    $(jusoarea).text(data.zipNo);
                    setTimeout(() => {
                        detailarea.focus();
                        jusowidth_comple(data.zipNo)
                    }, 0);
                }, 0);

            }
            removedetail = function () {
                console.timeLog(addressarea)
                if (($(addressarea).hasClass("detail"))) {
                    setTimeout(() => {
                        $(addressarea).removeClass("detail");

                        $(detailarea).text("");
                        jusoarea.dataset.donetext = ""
                        jusoarea.dataset.jusodata = "";
                        jusoarea.dataset.coorddata = "";
                        $(jusoarea).text(donetext);

                        jusoarea.focus()
                        window.getSelection().selectAllChildren(jusoarea)
                        window.getSelection().collapseToEnd()
                        jusoarea.scrollLeft = 99999 * 30;
                        area.style.overflow = ""
                        removetooltip();

                    }, 0);
                }
            }
        }



        if (typeof option.beforjuso != "undefined") {
            $(addressarea).addClass("entered detail");

            setTimeout(() => {
                detailarea.focus();
                jusowidth_comple(option.beforjuso)
            }, 0);

            $(jusoarea).text(option.beforjuso);
            jusoarea.dataset.juso = option.beforjuso;
            if (typeof option.beforedetial != "undefined") {
                $(detailarea).text(option.beforedetial);
            }

            if (typeof option.beforeword != "undefined") {
                jusoarea.dataset.donetext = option.beforeword
            } else {
                jusoarea.dataset.donetext = "";
            }

            function removedetail() {
                console.log(addressarea)
                if (($(addressarea).hasClass("detail"))) {
                    setTimeout(() => {
                        $(addressarea).removeClass("detail");

                        $(detailarea).text("");
                        if (typeof option.beforeword != "undefined") {
                            $(jusoarea).text(option.beforeword);
                            jusoarea.dataset.donetext = ""
                            jusoarea.dataset.juso = "";
                        } else {
                            $(jusoarea).text("");
                        }

                        jusoarea.focus()
                        window.getSelection().selectAllChildren(jusoarea)
                        window.getSelection().collapseToEnd()
                        jusoarea.scrollLeft = 99999 * 30;
                        area.style.overflow = ""
                        removetooltip();


                    }, 0);
                }
            }
        }


        function jusowidth_comple(text) {

            let allwidth = document.getElementById(areaid).clientWidth;
            let jusowidth = jusoarea.clientWidth;
            let detailwidth = detailarea.clientWidth;
            let clone = jusoarea.cloneNode(true);
            if (allwidth < (jusowidth + detailwidth)) {


                $(clone).text(text);
                clone.style.position = "fixed"
                clone.style.top = "-200px"
                clone.style.left = "-200px"
                addressarea.append(clone)
                $(jusoarea).text(textwidth(text, 2, text.length))
            }
            function textwidth(text, leftlength, rightlength) {

                if (leftlength == rightlength) {
                    leftlength = leftlength - 1;
                } else {
                    rightlength = rightlength - 1;
                }
                let clonetext = text.slice(0, leftlength) + "..." + text.slice((-1 * rightlength))

                $(clone).text(clonetext);
                let clonewidth = clone.offsetWidth
                if (allwidth < (clonewidth + detailwidth)) {
                    return textwidth(text, leftlength, rightlength)
                } else {
                    $(clone).remove();
                    return clonetext
                }
            }
        }
        let dataarr = [];

        function focuse_address_data(num) {

            for (let i = 0; i < dataarr.length; i++) {
                dataarr[i].classList.remove("focuse");
            }
            if (dataarr.length > 0) {


                let totop = dataarr[num].getBoundingClientRect().top - dropdownarea.getBoundingClientRect().top
                let tobottom = dataarr[num].getBoundingClientRect().bottom - dropdownarea.getBoundingClientRect().bottom
                if (totop < 0) {

                    dropdownarea.scrollBy(0, totop)

                } else if (0 < tobottom) {

                    dropdownarea.scrollBy(0, tobottom + 2);
                }

                dataarr[num].classList.add("focuse");
            }
        }


        function innerdata(data) {

            dataarr = [];
            if (data.length == 0) {

                closeddropdown();
                return false
            } else {

                dropdownarea.classList.remove("closed");

                max_curser_count = data.length;

                let renderjuso = function () {

                }

                if (typeof option.renderjuso != "undefined") {
                    renderjuso = option.renderjuso;


                } else {
                    renderjuso = function (jusodata) {
                        let str = ""
                        str += "<div class='easy_jusoarea'>"
                        str += "    <div class='easy_loadarr jusoarea'>" + jusodata.roadAddr + "</div>"
                        str += "    <div class='easy_jibunarr jusoarea'><div class='jusotext'>지번</div><div class='jusoadd'>" + jusodata.emdNm + " " + jusodata.lnbrMnnm
                        if (jusodata.lnbrSlno != "0") {
                            str += "-" + jusodata.lnbrSlno
                        }
                        str += "<span class = 'zip-no'> ㉾" + jusodata.zipNo + "</span></div></div>"
                        str += "</div>"

                        return str
                    }
                }

                for (let i = 0; i < data.length; i++) {

                    var rowhtml = renderjuso(data[i]);
                    let inner = document.createElement("div")
                    $(inner).append(rowhtml)


                    inner.setAttribute("class", areaid + "-input-dropdown-data address-dropdown-data");

                    inner.dataset.admCd = data[i].admCd;
                    inner.dataset.bdKdcd = data[i].bdKdcd;
                    inner.dataset.bdMgtSn = data[i].bdMgtSn;
                    inner.dataset.bdNm = data[i].bdNm
                    inner.dataset.buldMnnm = data[i].buldMnnm
                    inner.dataset.buldSlno = data[i].buldSlno
                    inner.dataset.detBdNmList = data[i].detBdNmList
                    inner.dataset.emdNm = data[i].emdNm
                    inner.dataset.emdNo = data[i].emdNo
                    inner.dataset.engAddr = data[i].engAddr
                    inner.dataset.jibunAddr = data[i].jibunAddr
                    inner.dataset.liNm = data[i].liNm
                    inner.dataset.lnbrMnnm = data[i].lnbrMnnm

                    inner.dataset.lnbrSlno = data[i].lnbrSlno
                    inner.dataset.mtYn = data[i].mtYn
                    inner.dataset.rn = data[i].rn
                    inner.dataset.rnMgtSn = data[i].rnMgtSn
                    inner.dataset.roadAddr = data[i].roadAddr
                    inner.dataset.roadAddrPart1 = data[i].roadAddrPart1
                    inner.dataset.roadAddrPart2 = data[i].roadAddrPart2
                    inner.dataset.sggNm = data[i].sggNm
                    inner.dataset.siNm = data[i].siNm
                    inner.dataset.sggNm = data[i].sggNm
                    inner.dataset.udrtYn = data[i].udrtYn
                    inner.dataset.zipNo = data[i].zipNo

                    dataarr.push(inner);
                    dropdownarea.append(inner);

                    inner.addEventListener("mousedown", function () {
                        selectjuso(data[i]);
                        closeddropdown();
                        return false
                    });
                }

            }

        }

        function closeddropdown() {


            if ($("#" + areaid).hasClass("none")) {

            } else {
                while (dropdownarea.hasChildNodes()) {
                    dropdownarea.removeChild(dropdownarea.firstChild);
                }
                dropdownarea.classList.add("closed");
            }

        }

    }

    function deletechileall(parents) {
        while (parents.hasChildNodes()) {
            parents.removeChild(parents.firstChild);
        }
    }






}

!function () { var n = "rRseEfaqQtTdwWczxvgASDFGZXCVkoiOjpuPhynbmlYUIHJKLBNM", e = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅁㄴㅇㄹㅎㅋㅌㅊㅍㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣㅛㅕㅑㅗㅓㅏㅣㅠㅜㅡ", i = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ", f = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ", o = "ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ", d = 44032, t = function (n) { for (var e = {}, i = 0; i < n.length; ++i)e[n[i]] = i; return e }(n), r = function (n) { for (var e = {}, i = 0; i < n.length; ++i)e[n[i]] = i; return e }(e), x = { "ㄱㅅ": "ㄳ", "ㄴㅈ": "ㄵ", "ㄴㅎ": "ㄶ", "ㄹㄱ": "ㄺ", "ㄹㅁ": "ㄻ", "ㄹㅂ": "ㄼ", "ㄹㅅ": "ㄽ", "ㄹㅌ": "ㄾ", "ㄹㅍ": "ㄿ", "ㄹㅎ": "ㅀ", "ㅂㅅ": "ㅄ" }, O = { "ㅗㅏ": "ㅘ", "ㅗㅐ": "ㅙ", "ㅗㅣ": "ㅚ", "ㅜㅓ": "ㅝ", "ㅜㅔ": "ㅞ", "ㅜㅣ": "ㅟ", "ㅡㅣ": "ㅢ" }, u = function (n) { return r[n] >= 28 }; function a(n) { var e = n || {}; return this._allowDoubleConsonant = void 0 !== e.allowDoubleConsonant && e.allowDoubleConsonant, this } a.prototype.config = function (n) { var e = n || {}; this._allowDoubleConsonant = void 0 !== e.allowDoubleConsonant && e.allowDoubleConsonant }, a.prototype.VERSION = "1.1.1", a.prototype.en2ko = function (n, d) { var r = d || {}, a = void 0 !== r.allowDoubleConsonant ? r.allowDoubleConsonant : this._allowDoubleConsonant, l = this, p = [0, 1, 1, 2, 2, 2, 3, 3, 4, 4, 5], s = [[1, 1, 2, 2], [3, 1, 4, 4], [1, 1, 5, 2], [3, 1, 4, -1], [6, 1, 7, 2], [1, 1, 2, 2], [9, 1, 4, 4], [9, 1, 2, 2], [1, 1, 4, 4], [10, 1, 4, 4], [1, 1, 4, 4]], h = function (n) { return n[n.length - 1] }, c = function (n) { var d = []; if (n.forEach(function (n, i) { var f = e[n]; 0 !== i && u(h(d)[0]) === u(f) || d.push([]), h(d).push(f) }), 1 === (d = d.map(function (n) { var e = n.join(""); return x[e] || O[e] || e })).length) return d[0]; var t = [i, f, o], r = d.map(function (n, e) { return t[e].indexOf(n) }); return r.length < 3 && r.push(-1), l.한글생성.apply(l, r) }; return function () { for (var i, f, o = n.length, d = -1, r = [], l = 0, h = [], v = function () { h.length > 0 && r.push(c(h)), h = [] }, w = 0; w < o; ++w) { var y = n[w], g = t[y]; if (void 0 === g) l = 0, v(), r.push(y); else { var C = (void 0, void 0, i = (e[d] || "") + e[g], f = u(e[d]), u(e[g]) ? f ? O[i] ? 2 : 3 : 2 : f ? -1 === "ㄸㅃㅉ".indexOf(e[g]) ? 0 : 1 : (1 !== l || a) && x[i] ? 0 : 1), b = s[l][C]; h.push(g); var m = h.length - p[b]; m && r.push(c(h.splice(0, m))), l = b, d = g } } return v(), r.join("") }() }, a.prototype.ko2en = function (e) { var i = ""; if ("" === e || void 0 === e) return i; for (var f = [-1, -1, -1, -1, -1], o = 0; o < e.length; o++) { var t = e[o], r = t.charCodeAt(); r >= d && r <= 55203 || r >= 12593 && r <= 12643 ? f = this.한글분리(t) : (i += t, f = [-1, -1, -1, -1, -1]); for (var x = 0; x < f.length; x++)-1 !== f[x] && (i += n[f[x]]) } return i }, a.prototype.한글생성 = function (n, e, i) { return String.fromCharCode(44032 + 588 * n + 28 * e + i + 1) }, a.prototype.한글분리 = function (n) { var t = n.charCodeAt(); if (t >= d && t <= 55203) { var r = Math.floor((t - d) / 588), x = Math.floor((t - d - 588 * r) / 28), O = t - d - 588 * r - 28 * x - 1, u = x, a = -1, l = O, p = -1; return x == f.indexOf("ㅘ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅏ")) : x == f.indexOf("ㅙ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅐ")) : x == f.indexOf("ㅚ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅝ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅓ")) : x == f.indexOf("ㅞ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅔ")) : x == f.indexOf("ㅟ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅢ") && (u = e.indexOf("ㅡ"), a = e.indexOf("ㅣ")), O == o.indexOf("ㄳ") ? (l = e.indexOf("ㄱ"), p = e.indexOf("ㅅ")) : O == o.indexOf("ㄵ") ? (l = e.indexOf("ㄴ"), p = e.indexOf("ㅈ")) : O == o.indexOf("ㄶ") ? (l = e.indexOf("ㄴ"), p = e.indexOf("ㅎ")) : O == o.indexOf("ㄺ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㄱ")) : O == o.indexOf("ㄻ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅁ")) : O == o.indexOf("ㄼ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅂ")) : O == o.indexOf("ㄽ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅅ")) : O == o.indexOf("ㄾ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅌ")) : O == o.indexOf("ㄿ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅍ")) : O == o.indexOf("ㅀ") ? (l = e.indexOf("ㄹ"), p = e.indexOf("ㅎ")) : O == o.indexOf("ㅄ") && (l = e.indexOf("ㅂ"), p = e.indexOf("ㅅ")), -1 === a && (u = e.indexOf(f[x])), -1 === p && (l = e.indexOf(o[O])), [r, u, a, l, p] } if (t >= 12593 && t <= 12643) { if (i.indexOf(n) > -1) return [r = e.indexOf(n), -1, -1, -1, -1]; if (f.indexOf(n) > -1) { u = x = f.indexOf(n), a = -1; return x == f.indexOf("ㅘ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅏ")) : x == f.indexOf("ㅙ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅐ")) : x == f.indexOf("ㅚ") ? (u = e.indexOf("ㅗ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅝ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅓ")) : x == f.indexOf("ㅞ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅔ")) : x == f.indexOf("ㅟ") ? (u = e.indexOf("ㅜ"), a = e.indexOf("ㅣ")) : x == f.indexOf("ㅢ") && (u = e.indexOf("ㅡ"), a = e.indexOf("ㅣ")), -1 === a && (u = e.indexOf(f[x])), [-1, u, a, -1, -1] } } return [-1, -1, -1, -1, -1] }, a.prototype.is한글 = function (n) { if (n.length > 1) throw new Error("한 글자가 아닙니다."); return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(n) }, "undefined" != typeof exports && ("undefined" != typeof module && module.exports && (exports = module.exports = a), exports.Inko = a), "function" == typeof define && define.amd && define([], function () { return a }), "undefined" != typeof importScripts && (inko = new a, self.Inko = a), "object" == typeof window && "object" == typeof window.document && (window.Inko = a, window.inko = new a) }();
!function () { "use strict"; var r, d, g, l, t, e, h = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"], p = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", ["ㅗ", "ㅏ"], ["ㅗ", "ㅐ"], ["ㅗ", "ㅣ"], "ㅛ", "ㅜ", ["ㅜ", "ㅓ"], ["ㅜ", "ㅔ"], ["ㅜ", "ㅣ"], "ㅠ", "ㅡ", ["ㅡ", "ㅣ"], "ㅣ"], C = ["", "ㄱ", "ㄲ", ["ㄱ", "ㅅ"], "ㄴ", ["ㄴ", "ㅈ"], ["ㄴ", "ㅎ"], "ㄷ", "ㄹ", ["ㄹ", "ㄱ"], ["ㄹ", "ㅁ"], ["ㄹ", "ㅂ"], ["ㄹ", "ㅅ"], ["ㄹ", "ㅌ"], ["ㄹ", "ㅍ"], ["ㄹ", "ㅎ"], "ㅁ", "ㅂ", ["ㅂ", "ㅅ"], "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"], A = 44032; function n(n) { for (var r = n.length, t = { 0: 0 }, e = 0; e < r; e++)n[e] && (t[n[e].charCodeAt(0)] = e); return t } function o(n) { for (var r, t, e = n.length, o = {}, i = 0; i < e; i++)r = n[i][0].charCodeAt(0), t = n[i][1].charCodeAt(0), void 0 === o[r] && (o[r] = {}), o[r][t] = n[i][2].charCodeAt(0); return o } function v(n) { return void 0 !== r[n] } function y(n) { return void 0 !== d[n] } function m(n) { return void 0 !== g[n] } function u(n) { return void 0 !== l[n] } function j(n) { return 44032 <= n && n <= 55203 } function b(n, r) { return !(!e[n] || !e[n][r]) && e[n][r] } function S(n, r) { return !(!t[n] || !t[n][r]) && t[n][r] } function w(n, r) { if (null === n) throw new Error("Arguments cannot be null"); "object" == typeof n && (n = n.join("")); for (var t, e, o, i, u = [], f = n.length, c = 0; c < f; c++) { var a, s = []; j(a = n.charCodeAt(c)) ? (e = ((a -= A) - (o = a % 28)) / 28 % 21, t = parseInt((a - o) / 28 / 21), s.push(h[t]), "object" == typeof p[e] ? s = s.concat(p[e]) : s.push(p[e]), 0 < o && ("object" == typeof C[o] ? s = s.concat(C[o]) : s.push(C[o]))) : v(a) ? "string" == typeof (i = y(a) ? h[d[a]] : C[l[a]]) ? s.push(i) : s = s.concat(i) : m(a) ? "string" == typeof (i = p[g[a]]) ? s.push(i) : s = s.concat(i) : s.push(n.charAt(c)), r ? u.push(s) : u = u.concat(s) } return u } function i(n) { return "string" != typeof n ? "" : (n = w(n)).join("") } function f(c) { "string" == typeof c && (c = w(c)); var n, r, a = [], t = c.length, e = 0, s = -1, h = !1; function o(n) { var r, t, e, o, i = 0, u = ""; if (h = !1, !(n < s + 1)) for (var f = 1; ; f++) { if (1 === f) { if (m(r = c[s + f].charCodeAt(0))) return s + f + 1 <= n && m(t = c[s + f + 1].charCodeAt(0)) ? a.push(String.fromCharCode(b(r, t))) : a.push(c[s + f]), void (s = n); if (!y(r)) return a.push(c[s + f]), void (s = n); u = c[s + f] } else if (2 === f) { if (y(t = c[s + f].charCodeAt(0))) return r = S(r, t), u = String.fromCharCode(r), a.push(u), void (s = n); u = String.fromCharCode(28 * (21 * d[r] + g[t]) + A) } else 3 === f ? (b(t, e = c[s + f].charCodeAt(0)) ? t = b(t, e) : i = e, u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)) : 4 === f ? (i = S(i, o = c[s + f].charCodeAt(0)) ? S(i, o) : o, u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)) : 5 === f && (i = S(i, o = c[s + f].charCodeAt(0)), u = String.fromCharCode(28 * (21 * d[r] + g[t]) + l[i] + A)); if (n <= s + f) return a.push(u), void (s = n) } } for (var i = 0; i < t; i++)y(n = c[i].charCodeAt(0)) || m(n) || u(n) ? (0 === e ? y(n) ? e = 1 : m(n) && (e = 4) : 1 == e ? m(n) ? e = 2 : S(r, n) ? e = 5 : o(i - 1) : 2 == e ? u(n) ? e = 3 : m(n) ? b(r, n) || (o(i - 1), e = 4) : (o(i - 1), e = 1) : 3 == e ? u(n) ? !h && S(r, n) ? h = !0 : (o(i - 1), e = 1) : y(n) ? (o(i - 1), e = 1) : m(n) && (o(i - 2), e = 2) : 4 == e ? m(n) ? b(r, n) ? (o(i), e = 0) : o(i - 1) : (o(i - 1), e = 1) : 5 == e && (e = m(n) ? (o(i - 2), 2) : (o(i - 1), 1)), r = n) : (o(i - 1), o(i), e = 0); return o(i - 1), a.join("") } function c(n) { this.string = n, this.disassembled = w(n).join("") } r = n(["ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄸ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅃ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), d = n(["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), g = n(["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"]), l = n(["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]), t = o([["ㄱ", "ㅅ", "ㄳ"], ["ㄴ", "ㅈ", "ㄵ"], ["ㄴ", "ㅎ", "ㄶ"], ["ㄹ", "ㄱ", "ㄺ"], ["ㄹ", "ㅁ", "ㄻ"], ["ㄹ", "ㅂ", "ㄼ"], ["ㄹ", "ㅅ", "ㄽ"], ["ㄹ", "ㅌ", "ㄾ"], ["ㄹ", "ㅍ", "ㄿ"], ["ㄹ", "ㅎ", "ㅀ"], ["ㅂ", "ㅅ", "ㅄ"]]), e = o([["ㅗ", "ㅏ", "ㅘ"], ["ㅗ", "ㅐ", "ㅙ"], ["ㅗ", "ㅣ", "ㅚ"], ["ㅜ", "ㅓ", "ㅝ"], ["ㅜ", "ㅔ", "ㅞ"], ["ㅜ", "ㅣ", "ㅟ"], ["ㅡ", "ㅣ", "ㅢ"]]), c.prototype.search = function (n) { return w(n).join("").indexOf(this.disassembled) }; var a = { disassemble: w, d: w, disassembleToString: i, ds: i, assemble: f, a: f, search: function (n, r) { n = w(n).join(""), r = w(r).join(""); return n.indexOf(r) }, rangeSearch: function (n, r) { var t, e = w(n).join(""), o = w(r).join(""), i = w(n, !0), u = new RegExp(o, "gi"), f = []; if (!r.length) return []; for (; t = u.exec(e);)f.push(t.index); return f.map(function (n) { return [function (n) { for (var r = 0, t = 0; r < i.length; ++r)if (n < (t += i[r].length)) return r }(n), function (n) { for (var r = 0, t = 0; r < i.length; ++r)if (t += i[r].length, n + o.length <= t) return r }(n)] }) }, Searcher: c, endsWithConsonant: function (n) { "object" == typeof n && (n = n.join("")); n = n.charCodeAt(n.length - 1); if (j(n)) { if (0 < (n -= A) % 28) return !0 } else if (v(n)) return !0; return !1 }, endsWith: function (n, r) { return w(n).pop() === r }, isHangul: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), j(n) }, isComplete: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), j(n) }, isConsonant: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), v(n) }, isVowel: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), m(n) }, isCho: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), y(n) }, isJong: function (n) { return "string" == typeof n && (n = n.charCodeAt(0)), u(n) }, isHangulAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!j(n.charCodeAt(r))) return !1; return !0 }, isCompleteAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!j(n.charCodeAt(r))) return !1; return !0 }, isConsonantAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!v(n.charCodeAt(r))) return !1; return !0 }, isVowelAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!m(n.charCodeAt(r))) return !1; return !0 }, isChoAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!y(n.charCodeAt(r))) return !1; return !0 }, isJongAll: function (n) { if ("string" != typeof n) return !1; for (var r = 0; r < n.length; r++)if (!u(n.charCodeAt(r))) return !1; return !0 } }; "function" == typeof define && define.amd ? define(function () { return a }) : "undefined" != typeof module ? module.exports = a : window.Hangul = a }();