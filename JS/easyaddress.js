



var EasyAddress = function (option) {

    this.option = option;
    var inputarr = []
    for (var i = 0; i < (option.inputarea).length; i++) {

        insertinput(option.inputarea[i])

    }

    function insertinput(inputarea) {

        if (typeof inputarea.areaid != "undefined") {
            var areaid = inputarea.areaid
            var searchamount = 5
            if (typeof inputarea.searchoption.searchamount != "undefined") {
                if ((inputarea.searchoption.searchamount) > 20) {
                    searchamount = 20
                } else if ((inputarea.searchoption.searchamount) < 5) {
                    searchamount = 5
                } else {
                    searchamount = inputarea.searchoption.searchamount
                }
            }

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", areaid + "-input");
            input.setAttribute("autocomplete", "off");
            input.style.padding = 0;
            // input.dataset.
            document.getElementById(areaid).prepend(input);
            inputarr.push(input)
            console.log(input.style.fontSize)
            input.addEventListener('input', function (event) {
                if (typeof inputarea.addressevent.inputevent != "undefined") {
                    if (inputarea.addressevent.inputevent) {
                        setTimeout(function () {
                            inputarea.addressevent.inputevent(input)
                        }, 0);
                    }
                }
                getaddress(option.jusoapikey, input.value, searchamount)

            })


            input.addEventListener("keydown", function (e) {

            })

            var address_mouseout = true;
            document.getElementById(areaid).addEventListener("mouseover", function () {
                address_mouseout = false;
            })

            document.getElementById(areaid).addEventListener("mouseout", function () {
                address_mouseout = true;
            })

            input.addEventListener("focusout", function (e) {
                // input.addEventListener("focusout", function (e) {
                if (typeof inputarea.addressevent.focusout != "undefined") {
                    if (inputarea.addressevent.focusout) {
                        inputarea.addressevent.focusout();
                    }
                }

                presskeyword = "";
                closeddropdown();
                return true;

            })

            input.addEventListener("focusin", function () {
                getaddress(option.jusoapikey, input.value, searchamount)

                setTimeout(() => {
                    input.setSelectionRange(99999, 99999);
                    input.scrollLeft = 99999 * 30;
                }, 0);

                return true;
            })

            var curser_count = 0;
            var max_curser_count = 0;

            input.addEventListener("keydown", function (e) {

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
                    // e.preventDefault()
                    // e.stopPropagatiddron()
                    // e.stopImmediatePropagation()

                    if (dataarr[curser_count]) {


                        selectjuso(dataarr[curser_count].dataset, selectenter_location_data(curser_count));

                        input.dataset.detail = "";
                        closeddropdown();

                        // insertcoordinate(dataarr[curser_count].dataset.searchaddr);

                        // input.focus();
                        input.setSelectionRange(99999, 99999);
                        input.scrollLeft = 99999 * 30;
                    }

                } else if (e.key == "Escape") {


                    input.blur();

                } else if (e.key == "Backspace") {
                    if ($(input).val().length < 1) {
                        removedetail();

                    }
                }
                return false;
            })


            let dropdownarea = document.createElement("div");
            dropdownarea.setAttribute("class", areaid + "-input-dropdown closed address-dropdown");
            document.getElementById(areaid).append(dropdownarea);

            var curDown = false;
            var curYPos = 0;

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


            var presskeyword = ""
            function getaddress(jusoapikey, keyword, countPerPage) {


                if ($(input).hasClass("detail")) {

                } else {
                    url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + keyword + "&confmKey=" + jusoapikey + "&resultType=json&"

                    if (countPerPage > 5) {
                        url += "countPerPage=" + countPerPage
                    } else {
                        url += "countPerPage=5"
                    }

                    fetch(encodeURI(url), {
                        method: "get"
                    }).then(resp => {
                        const respJson = resp.json()
                        return respJson
                    }).then(data => {
                        curser_count = -1

                        deletechileall(dropdownarea);

                        innerdata(data.results.juso)

                    }).catch(excResp => {

                    })
                }




            }

            var removedetail = function () {

            };
            function selectjuso(data, locatedata) {
                if (!($(input).hasClass("detail"))) {


                    $(input).addClass("detail")
                    console.log("select juso : ", data)

                    console.log(locatedata)
                    $(input).val("")


                    var jusoani = document.createElement("div");
                    jusoani.style.position = "absolute";
                    jusoani.style.width = locatedata.domWidth + "px";
                    jusoani.style.height = locatedata.domHeight + "px";
                    jusoani.style.top = (parseInt(locatedata.distanceY) + parseInt(locatedata.inputHeight) + 5) + "px"
                    jusoani.className += ' jusoani';

                    var detaillabel = document.createElement("label");

                    detaillabel.setAttribute("for", areaid + "-input");
                    detaillabel.setAttribute("class", "input-label");
                    $(detaillabel).text("상세주소 : ")
                    document.getElementById(areaid).prepend(detaillabel);
                    document.getElementById(areaid).prepend(jusoani);

                    removedetail = function () {
                        if (($(input).hasClass("detail"))) {
                            setTimeout(() => {
                                $(input).removeClass("detail");
                                $(input).val($(jusoani).text());

                                input.style.paddingLeft = "0px"
                                input.style.width = (locatedata.inputWidth) + "px"


                                $(jusoani).remove();
                                $(detaillabel).remove();
                                $(input).blur();
                                setTimeout(() => {
                                    $(input).focus();
                                }, 0);
                            }, 0);
                        }
                    }
                    setTimeout(() => {

                        jusoani.style.height = locatedata.inputHeight + "px";
                        jusoani.style.top = (-1 * (parseInt(locatedata.inputHeight) + 2)) + "px"
                        $(jusoani).text(data.roadAddr)

                        jusoani.style.width = (locatedata.inputWidth) + "px";
                        input.style.width = (locatedata.inputWidth - 65) + "px";
                        input.style.paddingLeft = 65 + "px"



                    }, 0);

                }



                // // inputarea.append(jusoani);
                // if (typeof inputarea.searchoption.selectjuso != undefined) {
                //     var selectjuso = inputarea.searchoption.selectjuso;

                //     if (selectjuso == "jibunAddr") {
                //         input.dataset.donetext = data.jibunAddr;

                //         input.value = data.jibunAddr + " ";
                //     } else if (selectjuso == "engAddr") {
                //         input.dataset.donetext = data.engAddr + " ";
                //         input.value = data.engAddr + "";
                //     } else if (selectjuso == "zipNo") {
                //         input.dataset.donetext = data.zipNo + " ";
                //         input.value = data.zipNo + " ";
                //     } else {
                //         input.dataset.donetext = data.roadAddr + " ";
                //         input.value = data.roadAddr + " ";
                //     }
                // } else {
                //     input.dataset.donetext = data.roadAddr + " ";
                //     input.value = data.roadAddr + " ";
                // }

                // input.dataset.detail = ""



            }
            var dataarr = [];

            function focuse_address_data(num) {

                for (var i = 0; i < dataarr.length; i++) {
                    dataarr[i].classList.remove("focuse");
                }
                if (dataarr.length > 0) {


                    var totop = dataarr[num].getBoundingClientRect().top - dropdownarea.getBoundingClientRect().top
                    var tobottom = dataarr[num].getBoundingClientRect().bottom - dropdownarea.getBoundingClientRect().bottom
                    if (totop < 0) {

                        dropdownarea.scrollBy(0, totop)

                    } else if (0 < tobottom) {

                        dropdownarea.scrollBy(0, tobottom + 2);
                    }

                    dataarr[num].classList.add("focuse");
                }
            }

            function selectenter_location_data(num) {

                var data = {
                    inputWidth: input.clientWidth,
                    inputHeight: input.clientHeight,
                    domWidth: dataarr[num].clientWidth,
                    domHeight: dataarr[num].clientHeight,
                    distanceY: dataarr[num].getBoundingClientRect().top - dropdownarea.getBoundingClientRect().top

                }
                return data
            }

            function selectclick_location_data(dom) {



                var data = {
                    inputWidth: input.clientWidth,
                    inputHeight: input.clientHeight,
                    domWidth: dom.clientWidth,
                    domHeight: dom.clientHeight,
                    distanceY: dom.getBoundingClientRect().top - dropdownarea.getBoundingClientRect().top

                }
                return data
            }

            // function insertcoordinate(searchaddr) {

            //     window["scriptcallbackdata"] = function (data) {
            //         console.log(data);
            //         input.dataset.coordinatex = data.response.result.point.x
            //         input.dataset.coordinatey = data.response.result.point.y
            //         input.focus();
            //         if (typeof inputarea.addressevent.selectevent != "undefined") {
            //             if (inputarea.addressevent.selectevent) {
            //                 setTimeout(function () {
            //                     inputarea.addressevent.selectevent(data);
            //                 }, 0);
            //             }
            //         }


            //     }
            //     script = window.document.createElement('script');
            //     script.src = encodeURI('https://api.vworld.kr/req/address?&service=address&request=getcoord&version=2.0&crs=epsg:4326&refine=true&simple=false&format=json&type=road&key=' + option.vworldapikey + '&address=' + searchaddr + '&callback=scriptcallbackdata')

            //     script.async = true;
            //     head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
            //     head.insertBefore(script, head.firstChild);
            // }
            function innerdata(data) {

                dataarr = [];
                if (data == null) {
                    closeddropdown();
                    return false
                } else {

                    dropdownarea.classList.remove("closed");

                    max_curser_count = data.length;
                    for (let i = 0; i < data.length; i++) {
                        let inner = document.createElement("div");
                        inner.setAttribute("class", areaid + "-input-dropdown-data address-dropdown-data");

                        inner.dataset.roadAddr = data[i].roadAddr;
                        inner.dataset.jibunAddr = data[i].jibunAddr;
                        inner.dataset.engAddr = data[i].engAddr;
                        inner.dataset.zipno = data[i].zipNo;
                        inner.dataset.searchaddr = data[i].roadAddrPart1;

                        //jibun text
                        if (typeof inputarea.viewtextoption.jibun.view != "undefined") {

                            if (inputarea.viewtextoption.jibun.view == true) {

                                if (typeof inputarea.viewtextoption.jibun.text != "undefined") {

                                    innerjibun(inputarea.viewtextoption.jibun.text, data[i].jibunAddr)
                                } else {

                                    innerjibun("지번명 : ", data[i].jibunAddr)
                                }


                            }
                        } else {

                            if (typeof inputarea.viewtextoption.jibun.text != "undefined") {
                                innerjibun(inputarea.viewtextoption.jibun.text, data[i].jibunAddr)
                            } else {
                                innerjibun("지번명 : ", data[i].jibunAddr)
                            }
                        }

                        function innerjibun(text, addresstext) {

                            let jibunarea = document.createElement("div");
                            jibunarea.setAttribute("class", "jusoarea jibunarea");

                            let jibuntextarea = document.createElement("div");
                            jibuntextarea.setAttribute("class", "jusotext jibuntext")


                            let jibuntext = document.createTextNode(text)
                            jibuntextarea.appendChild(jibuntext);



                            let jibunaddrarea = document.createElement("div");
                            jibunaddrarea.setAttribute("class", "jusoaddr jibunaddr")
                            let jibunaddr = document.createTextNode(addresstext)

                            jibunaddrarea.appendChild(jibunaddr);


                            jibunarea.appendChild(jibuntextarea)
                            jibunarea.appendChild(jibunaddrarea)

                            inner.appendChild(jibunarea);
                        }

                        //road text
                        if (typeof inputarea.viewtextoption.road.view != "undefined") {
                            if (inputarea.viewtextoption.road.view == true) {
                                if (typeof inputarea.viewtextoption.road.text != "undefined") {
                                    innerroad(inputarea.viewtextoption.road.text, data[i].roadAddr)
                                } else {
                                    innerroad("도로명 : ", data[i].roadAddr)
                                }
                            }
                        } else {
                            if (typeof inputarea.viewtextoption.road.text != "undefined") {
                                innerroad(inputarea.viewtextoption.road.text, data[i].roadAddr)
                            } else {
                                innerroad("도로명 : ", data[i].roadAddr)
                            }
                        }
                        function innerroad(text, addresstext) {

                            let roadarea = document.createElement("div");
                            roadarea.setAttribute("class", "jusoarea roadarea");

                            let roadtextarea = document.createElement("div");
                            roadtextarea.setAttribute("class", "jusotext roadtext")


                            let roadtext = document.createTextNode(text)
                            roadtextarea.appendChild(roadtext);



                            let roadaddrarea = document.createElement("div");
                            roadaddrarea.setAttribute("class", "jusoaddr roadaddr")
                            let roadaddr = document.createTextNode(addresstext)

                            roadaddrarea.appendChild(roadaddr);


                            roadarea.appendChild(roadtextarea)
                            roadarea.appendChild(roadaddrarea)
                            inner.appendChild(roadarea);
                        }


                        //eng text
                        if (typeof inputarea.viewtextoption.eng.view != "undefined") {
                            if (inputarea.viewtextoption.eng.view == true) {
                                if (typeof inputarea.viewtextoption.eng.text != "undefined") {
                                    innereng(inputarea.viewtextoption.eng.text, data[i].engAddr)
                                } else {
                                    innereng("도로명 : ", data[i].engAddr)
                                }
                            }
                        } else {
                            if (typeof inputarea.viewtextoption.eng.text != "undefined") {
                                innereng(inputarea.viewtextoption.eng.text, data[i].engAddr)
                            } else {
                                innereng("도로명 : ", data[i].engAddr)
                            }
                        }
                        function innereng(text, addresstext) {

                            let engarea = document.createElement("div");
                            engarea.setAttribute("class", "jusoarea engarea");

                            let engtextarea = document.createElement("div");
                            engtextarea.setAttribute("class", "jusotext engtext")


                            let engtext = document.createTextNode(text)
                            engtextarea.appendChild(engtext);



                            let engaddrarea = document.createElement("div");
                            engaddrarea.setAttribute("class", "jusoaddr engaddr")
                            let engaddr = document.createTextNode(addresstext)

                            engaddrarea.appendChild(engaddr);


                            engarea.appendChild(engtextarea)
                            engarea.appendChild(engaddrarea)
                            inner.appendChild(engarea);
                        }

                        //zipno text
                        if (typeof inputarea.viewtextoption.zipNo.view != "undefined") {
                            if (inputarea.viewtextoption.zipNo.view == true) {
                                if (typeof inputarea.viewtextoption.zipNo.text != "undefined") {
                                    innerzipNo(inputarea.viewtextoption.zipNo.text, data[i].zipNo)
                                } else {
                                    innerzipNo("도로명 : ", data[i].zipNo)
                                }
                            }
                        } else {
                            if (typeof inputarea.viewtextoption.zipNo.text != "undefined") {
                                innerzipNo(inputarea.viewtextoption.zipNo.text, data[i].zipNo)
                            } else {
                                innerzipNo("도로명 : ", data[i].zipNo)
                            }
                        }
                        function innerzipNo(text, addresstext) {

                            let zipNoarea = document.createElement("div");
                            zipNoarea.setAttribute("class", "jusoarea zipNoarea");

                            let zipNotextarea = document.createElement("div");
                            zipNotextarea.setAttribute("class", "jusotext zipNotext")


                            let zipNotext = document.createTextNode(text)
                            zipNotextarea.appendChild(zipNotext);



                            let zipNoaddrarea = document.createElement("div");
                            zipNoaddrarea.setAttribute("class", "jusoaddr zipNoaddr")
                            let zipNoaddr = document.createTextNode(addresstext)

                            zipNoaddrarea.appendChild(zipNoaddr);


                            zipNoarea.appendChild(zipNotextarea)
                            zipNoarea.appendChild(zipNoaddrarea)
                            inner.appendChild(zipNoarea);
                        }
                        //console.log(inner)
                        dataarr.push(inner);
                        dropdownarea.append(inner)

                        inner.addEventListener("mousedown", function () {

                            selectjuso(data[i], selectclick_location_data(this));



                            closeddropdown();


                            // insertcoordinate(data[i].roadAddrPart1);

                            return false
                        });



                    }


                }

            }
            function closeddropdown() {
                while (dropdownarea.hasChildNodes()) {
                    dropdownarea.removeChild(dropdownarea.firstChild);
                }

                if ($("#" + areaid).hasClass("none")) {

                } else {
                    console.log("ddd")
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




}
