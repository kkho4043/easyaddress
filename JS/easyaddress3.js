// var leafletjs = window.document.createElement('script');
// leafletjs.src = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"

// leafletjs.async = false;
// leafletjs.setAttribute("integrity", "sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==")

// leafletjs.setAttribute("rel", "preload")
// leafletjs.setAttribute("crossorigin", "")
// leafletjs.setAttribute("defer", true)

// head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
// window.document.head.appendChild(leafletjs)
// leafletjs.onreadystatechange = function () {
//     if (this.readyState == 'complete' || this.readyState == 'loaded') {
//         console.log("dadasddas")


//     };
// }
// leafletjs.onload = function () {
//     var leaflethandjs = window.document.createElement('script');
//     leaflethandjs.src = "//unpkg.com/leaflet-gesture-handling@1.2.2/dist/leaflet-gesture-handling.min.js"
//     leaflethandjs.async = false;
//     leaflethandjs.setAttribute("async", false)
//     leaflethandjs.setAttribute("rel", "preload")
//     leaflethandjs.setAttribute("defer", true)
//     head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
//     window.document.head.appendChild(leaflethandjs)
// }

// var leafletcss = window.document.createElement('link');
// leafletcss.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"

// leafletcss.async = false;
// leafletcss.setAttribute("integrity", "sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==")

// leafletcss.setAttribute("rel", "stylesheet")
// leafletcss.setAttribute("crossorigin", "")
// leafletcss.setAttribute("defer", true)

// window.document.head.appendChild(leafletcss)


// var leaflethandcss = window.document.createElement('link');
// leaflethandcss.href = "//unpkg.com/leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css"

// leaflethandcss.async = false;
// leaflethandcss.setAttribute("rel", "stylesheet")
// leaflethandcss.setAttribute("async", false)

// window.document.head.appendChild(leaflethandcss)


! function () {
    function searcfomat(option) {
        let areaid;
        let selectjuso;
        let searchamount;


        let jusodata
        let coorddata;

        this.getaddressdata = function () {



            return {
                addressdata: jusodata,
                coorddata: coorddata
            }
        }

        if (typeof option.areaid != "undefined") {
            areaid = option.areaid;

            if (typeof option.searchoption != "undefined") {
                if (typeof option.searchoption.selectjuso != "undefined" && typeof option.areaid == "String") {
                    if ((option.searchoption.selectjuso == "jibun") || (option.searchoption.selectjuso == "road") || (option.searchoption.selectjuso == "eng") || (option.searchoption.selectjuso == "zipno")) {
                        selectjuso = option.searchoption.selectjuso;
                    } else {
                        selectjuso = "jibun"
                    }
                } else {
                    selectjuso = "jibun"
                }
                if (typeof option.searchoption.searchamount != "undefined" && typeof option.areaid == "number") {
                    if ((option.searchoption.searchamount) > 20) {
                        searchamount = 20
                    } else if ((option.searchoption.searchamount) < 5) {
                        searchamount = 5
                    } else {
                        searchamount = option.searchoption.searchamount
                    }
                } else {
                    searchamount = 10;
                }
            } else {
                selectjuso = "jibun"
                searchamount = 10;
            }

        } else {
            throw new Error("areaid가 잘 못입력되었습니다");
        }
        let area = document.getElementById(areaid);
        area.classList.add("easyaddress-input")
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

        // let labeldiv = document.createElement("div");
        // labeldiv.setAttribute("id", areaid + "-label");
        // labeldiv.setAttribute("class", "easyaddress-label");

        // if (typeof option.labeltext != "undefined") {
        //     console.log(option.labeltext)
        //     labeldiv.innerText = option.labeltext;
        // } else {
        //     labeldiv.innerText = "주소입력"
        // }


        document.getElementById(areaid).append(addressarea);
        // document.getElementById(areaid).append(labeldiv);

        (addressarea).append(jusoarea);
        (addressarea).append(detailarea);

        area.addEventListener("mouseover", function () {
        })

        area.addEventListener("mouseout", function () {
        })

        area.addEventListener("focusout", function (e) {
            // input.addEventListener("focusout", function (e) {
            closeddropdown();
            return true;
        })

        let regExp = /[A-Za-z]/;
        jusoarea.addEventListener('input', function (e) {
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            let input_text = jusoarea.innerText
            if (regExp.test(input_text)) {
                let intx = Hangul.assemble(inko.en2ko(jusoarea.innerText))
                jusoarea.innerText = intx
                jusoarea.focus()
                window.getSelection().selectAllChildren(jusoarea)
                window.getSelection().collapseToEnd()
                jusoarea.scrollLeft = 99999 * 30;
            }
            if ((jusoarea.innerText).length > 0) {
                addressarea.classList.add("entered")
            } else {
                addressarea.classList.remove("entered")
            }


            getaddress()
        })

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

                    selectinner(dataarr[curser_count]);
                    closeddropdown();
                    jusoarea.scrollLeft = 99999 * 30;
                }
                return false;

            } else if (e.key == "Escape") {

                jusoarea.blur();

            }
            return false;
        })

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


        jusoarea.addEventListener("click", function () {
            if (addressarea.classList.contains("detail")) {
                setTimeout(() => {
                    removedetail();
                }, 0);
            }
            return false;
        })

        detailarea.addEventListener("keydown", function (e) {
            if (e.key == "Backspace") {
                if (detailarea.innerText.length < 1) {
                    removedetail();

                }
            }
        });

        detailarea.addEventListener("input", function (e) {

            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()

            // let input_text = $(detailarea).text()
            // if (regExp.test(input_text)) {
            //     let intx = Hangul.assemble(inko.en2ko($(detailarea).text()))
            //     detailarea.innerText(intx);
            //     detailarea.focus()
            //     window.getSelection().selectAllChildren(detailarea)
            //     window.getSelection().collapseToEnd()
            //     detailarea.scrollLeft = 99999 * 30;
            // }

            if (detailarea.innerText.length > 0) {
                removetooltip();
            } else {
                addtooltooltip();
            }
        });

        detailarea.addEventListener("blur", function (e) {
            removetooltip();
        });

        detailarea.addEventListener("focus", function (e) {

            if (detailarea.innerText.length < 1) {
                addtooltooltip();
            }
        });

        let dropdownarea = document.createElement("div");
        dropdownarea.setAttribute("class", areaid + "-input-dropdown closed address-dropdown");
        document.getElementById(areaid).append(dropdownarea);

        let curDown = false;
        let curYPos = 0;

        let curser_count = 0;
        let max_curser_count = 0;

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
        removedetail = function () {

        }
        function getaddress() {

            if (jusoarea.innerText.length >= 2) {


                if (addressarea.classList.contains("detail")) {

                } else {
                    url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + jusoarea.innerText + "&confmKey=" + option.jusoapikey + "&resultType=json&countPerPage=" + searchamount

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
                    inner.innerHTML = rowhtml
                    inner.dataset.addressdata = JSON.stringify(data[i]);
                    inner.setAttribute("class", areaid + "-input-dropdown-data address-dropdown-data");

                    dataarr.push(inner);
                    dropdownarea.append(inner);

                    inner.addEventListener("mousedown", function () {

                        selectinner(inner);
                        closeddropdown();
                        return false
                    });
                }

            }

        }

        function selectinner(dom) {
            let donetext = jusoarea.innerText;
            addressarea.classList.add("detail")
            jusodata = JSON.parse(dom.dataset.addressdata);

            function callbackdd(jdata, cdata) {
                console.log(jdata, cdata)
                jusodata = jdata
                coorddata = cdata.response.result.point
                setTimeout(() => {
                    option.selectevent({
                        addressdata: jusodata,
                        coorddata: coorddata
                    })
                }, 100);

            }

            getcoorddata(jusodata, callbackdd, option.coordkey)



            var jusoarea_text
            if (selectjuso == "jibun") {
                jusoarea_text = jusodata.jibunAddr
            } else if (selectjuso == "road") {
                jusoarea_text = jusodata.roadAddr
            } else if (selectjuso == "eng") {
                jusoarea_text = jusodata.engAddr
            } else {
                jusoarea_text = jusodata.zipNo
            }
            setTimeout(() => {
                jusoarea.innerText = jusoarea_text
                setTimeout(() => {
                    detailarea.focus();
                    jusowidth_comple(jusoarea_text)

                }, 0);
            }, 0);

            removedetail = function () {
                // console.timeLog(addressarea)
                if ((addressarea.classList.contains("detail"))) {
                    setTimeout(() => {
                        addressarea.classList.remove("detail");

                        detailarea.innerText = "";
                        jusoarea.innerText = donetext;
                        jusodata = ""
                        coorddata = ""


                        jusoarea.focus()
                        window.getSelection().selectAllChildren(jusoarea)
                        window.getSelection().collapseToEnd()
                        jusoarea.scrollLeft = 99999 * 30;
                        area.style.overflow = ""
                        removetooltip();
                        setTimeout(() => {
                            option.deleteaddressevent({
                                addressdata: jusodata,
                                coorddata: coorddata
                            })
                        }, 100);
                    }, 0);
                }
            }
        }
        if (typeof option.beforjuso != "undefined") {

            function callbackdd(jdata, cdata) {

                console.log(jdata, cdata)
                jusodata = jdata
                coorddata = cdata.response.result.point
                setTimeout(() => {
                    option.selectevent({
                        addressdata: jusodata,
                        coorddata: coorddata
                    })
                }, 100);



            }
            getaddressdata(option.beforjuso, callbackdd, option.jusoapikey, option.coordkey)


            addressarea.classList.add("detail")
            addressarea.classList.add("entered")



            setTimeout(() => {
                detailarea.focus();
                jusowidth_comple(option.beforjuso)
            }, 0);

            jusoarea.innerText = option.beforjuso;
            jusoarea.dataset.juso = option.beforjuso;
            if (typeof option.beforedetial != "undefined") {
                detailarea.innerText = option.beforedetial;

            }

            if (typeof option.beforeword != "undefined") {
                jusoarea.dataset.donetext = option.beforeword
            } else {
                jusoarea.dataset.donetext = "";
            }

            function removedetail() {

                if ((addressarea.classList.contains("detail"))) {
                    setTimeout(() => {

                        jusodata = ""
                        coorddata = ""
                        addressarea.classList.remove("detail");

                        detailarea.innerText = "";
                        if (typeof option.beforeword != "undefined") {
                            jusoarea.innerText = option.beforeword;
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
                        setTimeout(() => {
                            option.deleteaddressevent({
                                addressdata: jusodata,
                                coorddata: coorddata
                            })
                        }, 100);

                    }, 0);
                }
            }
        }




        function jusowidth_comple(text) {

            let allwidth = area.clientWidth;
            let jusowidth = jusoarea.clientWidth;
            let detailwidth = detailarea.clientWidth;


            console.log(allwidth + " / " + jusowidth + " / " + detailwidth)
            let clone = jusoarea.cloneNode(true);
            if (allwidth < (jusowidth + detailwidth)) {


                clone.innerText = text;
                clone.style.position = "fixed"
                clone.style.top = "-200px"
                clone.style.left = "-200px"
                addressarea.append(clone)

                jusoarea.innerText = (textwidth(text, 2, text.length))
            }
            function textwidth(text, leftlength, rightlength) {

                if (leftlength == rightlength) {
                    leftlength = leftlength - 1;
                } else {
                    rightlength = rightlength - 1;
                }
                let clonetext = text.slice(0, leftlength) + "..." + text.slice((-1 * rightlength))

                clone.innerText = clonetext;
                let clonewidth = clone.offsetWidth
                if (allwidth < (clonewidth + detailwidth)) {
                    console.log("allwidth : " + allwidth)
                    console.log("clonewidth : " + clonewidth + " /detailwidth : " + detailwidth)

                    return textwidth(text, leftlength, rightlength)
                } else {
                    clone.remove();

                    return clonetext
                }
            }
        }
        let tooltip_direction = "bottom"
        window.addEventListener("resize", function () {
            get_offset_size()
        })
        function get_offset_size() {

            let dom_offset = {
                top: area.getBoundingClientRect().top,
                bottom: window.innerHeight - (area.getBoundingClientRect().top + area.clientHeight),
                left: area.getBoundingClientRect().left,
                right: window.innerWidth - (area.getBoundingClientRect().left + area.clientWidth)
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
        function addtooltooltip() {
            tootip = document.createElement("span")
            tootip.setAttribute("class", "tooltip-" + tooltip_direction + " tooltiptext");
            if (typeof option.tooltiptext != "undefined") {
                tootip.innerText = option.tooltiptext;
            } else {
                tootip.innerText = "상세 주소 입력"
            }
            area.prepend(tootip);
        }
        function removetooltip() {
            var tooptips = document.getElementsByClassName("tooltiptext")
            for (var i = 0; i < tooptips.length; i++) {
                tooptips[i].remove();
            }

        }
        function closeddropdown() {
            if (area.classList.contains("none")) {

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