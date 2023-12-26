
//----------------------
// 그래프 그리기
//----------------------
        let intervalId=null;        //setInterval id값
        let menu02clickInit=true;
        //실시간 풍향
        realtimeVECIdx =["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
        realtimeVECVal =[];

        //실시간 풍속
        realtimeWSDIdx = [];
        realtimeWSDVal = [];

//-----------------------
// 지도
//-----------------------
var map;
// --------------------------
// OPENCANVAS
// --------------------------
const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
offcanvas_btn_el.addEventListener('click', function () {

    console.log("btn..");
    if (offcanvas_btn_el.classList.contains('ToRight')) 
        offcanvas_btn_el
            .classList
            .remove("ToRight");
    else 
        offcanvas_btn_el
            .classList
            .add("ToRight");
    }
)
// --------------------------
// Nav li Click Event
// --------------------------
const nav_menu_img_items = document.querySelectorAll('nav li>a');
LChartBlock = document.querySelector('.section06 .left');
RChartBlock = document.querySelector('.section06 .right');
buildingDangerFixedBlock = document.querySelector('.buildingDangerFixedBlock');
menu02ImageZIdxEls = document.querySelectorAll('section.section02 div img');

nav_menu_img_items.forEach(item => {

    item.addEventListener('click', function () {
        const isOpened = item.getAttribute('data-toggle');



        const submenuUrl = item.getAttribute('data-submenu');
        const submenuIdx = item.getAttribute('data-idx');

        if (submenuUrl.includes("02")) {
        sectionNo =2;

           const SectionEls = document.querySelectorAll('main section')
                       SectionEls.forEach(sec => {
                           sec.style.display = 'none';
                           if (sec.classList.contains('section02')) {
                               sec.style.display = 'block';
                           }
            })
                //차트 비활 비홠성화
                LChartBlock.style.visibility = 'hidden';
                RChartBlock.style.visibility = 'hidden';
                //OFFCANVAS BTN 비활성화
                 const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
                 if (offcanvas_btn_el.classList.contains('ToRight')) {
                            //OFFCANVAS Move To RIGHT
                            offcanvas_btn_el
                                .classList
                                .remove("ToRight");

                }
                //OFFCANVAS 숨기기
                const myOffcanvas = document.querySelector('.offcanvas')
                    myOffcanvas
                            .classList
                            .remove('show');
                        const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                        bsOffcanvas.hide();
                    //
                    buildingDangerFixedBlock.style.zIndex="1";


                        menu02ImageZIdxEls.forEach(item => {
                            item.style.display='flex';
                        });
        }


        //01MENU 클릭시
        else if (submenuUrl.includes("01")) {
        sectionNo =1;
            const SectionEls = document.querySelectorAll('main section')
            SectionEls.forEach(sec => {
                sec.style.display = 'none';
                if (sec.classList.contains('section01')) {
                    sec.style.display = 'block';
                }
            })
            //차트 비활 비홠성화
                LChartBlock.style.visibility = 'hidden';
                RChartBlock.style.visibility = 'hidden';

            //OFFCANVAS BTN 비활성화
            const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
            if (offcanvas_btn_el.classList.contains('ToRight')) {
                //OFFCANVAS Move To RIGHT
                offcanvas_btn_el
                    .classList
                    .remove("ToRight");

            }
            //OFFCANVAS 숨기기
            const myOffcanvas = document.querySelector('.offcanvas')
            myOffcanvas
                .classList
                .remove('show');
            const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.hide();
            //



            const buildingDangerFixedBlockEl = document.querySelector(
                '.buildingDangerFixedBlock'
            );

            menu02ImageZIdxEls.forEach(item => {
                item.style.display='none';
            })

        }
        //-------------------------
        //빌딩풍 위험지도 메뉴
        //-------------------------
        else if (submenuUrl.includes("05")) {
            //-------------------------
            //OFFCANVAS 버튼 오른쪽이동
            //-------------------------
            const windowWidth = window.innerWidth;
            if (windowWidth > 500) {
                const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
                if (!offcanvas_btn_el.classList.contains('ToRight')) {
                    //OFFCANVAS BTN Move To RIGHT
                    offcanvas_btn_el
                        .classList
                        .add("ToRight");
                }

                //차트 비활성화
                LChartBlock.style.visibility = 'hidden';
                RChartBlock.style.visibility = 'hidden';
                //

                //OFFCANVAS SHOW
                const myOffcanvas = document.querySelector('.offcanvas')
                let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                bsOffcanvas.show();
                //05MENU 클릭시 오픈캔버스에 내용표시
                if (submenuUrl.includes("05")) {
                    const buildingWindEl = document.querySelector('.dangerzone');
                    buildingWindEl.style.display = 'block';
                }
            }
                //-------------------------
                // 빌딩풍위험지도 다시 띄우기
                //-------------------------
                const sectionEls = document.querySelectorAll('main section');
                sectionEls.forEach(sec => {
                    sec.style.display = 'none';

                    if (sec.classList.contains('section03'))
                    {

                        sec.style.display = "block";
                        document.querySelector('#map').remove();
                        const mapEl = document.createElement('div');
                        mapEl.setAttribute('id', 'map');
                        mapEl.setAttribute('style','position:relative ;z-index:10');
                        sec.appendChild(mapEl);
                        //-------------------------
                        // GreenPolygon 좌표 받아오기
                        //-------------------------
    //                     axios('/polygon/green')
    //                          .then(resp=>{
    //                             console.log("GREENPOLYGON",resp);
    //                              polygonDataGreen = [];
    //                              polygonDataBlue = [];
    //                              polygonDataRed = [];
    //
    //                             createMap(resp.data);      //폴리곤 받아 지도 만들기
    //
    //                            })
    //                           .catch(err=>{console.log(err);});
                            createMap(polygonGreen01);

                    }
                })

            console.log(map);


            buildingDangerFixedBlock.style.zIndex="11";
            menu02ImageZIdxEls.forEach(item => {
                             item.style.display='none';
            })



            //-------------------------
            //menu05에서 실시간 풍속정보 요청하기
            //-------------------------

            console.log('실시간 풍속정보 요청하기');
            RTForcastDate = getForcastDate();
            RTForcastTime = getForcastTime();
            console.log("RTNowDate : " + RTForcastDate);
            console.log("RTNowTime : " + RTForcastTime);
            axios.get('/windForcast/'+RTForcastDate+"/"+RTForcastTime)
                .then(resp=>{
                    console.log('/windForcast',resp);
                    var data = resp.data;
                    data.forEach(item=>{
                          console.log(item);
                        if(item.category==='T1H'){
                            //document.querySelector('.section06 .weather-info-body span.T1H').innerHTML=item.fcstValue;
                            document.querySelector('.buildingDangerFixedBlock .weather-info .temp').innerHTML=item.fcstValue+"℃";
                        }
                        else if(item.category==='RN1'){

                                document.querySelector('.buildingDangerFixedBlock .weather-info-body span.RN1').innerHTML=item.fcstValue;
                        }
                        else if(item.category==='REH'){
                            document.querySelector('.buildingDangerFixedBlock .weather-info-body span.REH').innerHTML=item.fcstValue;
                        }
                        else if(item.category==='VEC'){
                            directionIdx =  parseInt( (parseInt(item.fcstValue) + 22.5 * 0.5)/22.5); //풍향문자 구하기
                            console.log("realtimeVECIdx[directionIdx] : " +realtimeVECIdx[directionIdx]);
                            document.querySelector('.buildingDangerFixedBlock .weather-info-body span.VEC').innerHTML=realtimeVECIdx[directionIdx];
                        }
                        else if(item.category==='WSD'){
                            document.querySelector('.buildingDangerFixedBlock .weather-info-body span.WSD').innerHTML=item.fcstValue;
                        }
                    })

                    ;
                })
                .catch(err=>{
                    console.log("windNodErr",err);
             });
              //------------------------------
              //체감온도 가져오기
              //------------------------------
              axios.get("/OPTEST/35.170421/129.158254")     //LCT만
                     .then(
                         resp => {
                             console.log('openweatherAPI : ',resp);
                             document.querySelector('.buildingDangerFixedBlock .weather-info-body span.T1H').innerHTML=(resp.data.main.feels_like-273.15).toFixed(); //캘빈단위로 제공
                         }
                     )
                .catch(err=>{});





        //-------------------------------------
        //실시간 풍속 정보를 클릭했을때
        //-------------------------------------
        }
        else if (submenuUrl.includes("06")) {

            // 모든 section 을 display:none;
            console.log("menu06!!!");
            const sectionEls = document.querySelectorAll('main section');
            sectionEls.forEach(sec => {
                sec.style.display = 'none';
                if (sec.classList.contains('section06')) {
                    sec.style.display = "block";
                }             
            })

            //-------------------------
            //실시간 풍속정보 요청하기
            //-------------------------
            console.log('실시간 풍속정보 요청하기');
            RTForcastDate = getForcastDate();

            RTForcastTime = getForcastTime();
            if(RTForcastTime==="0000")
                RTForcastDate
            console.log("RTNowDate : " + RTForcastDate);
            console.log("RTNowTime : " + RTForcastTime);
            axios.get('/windForcast/'+RTForcastDate+"/"+RTForcastTime)
                .then(resp=>{
                    console.log('/windForcast',resp);
                    var data = resp.data;
                    data.forEach(item=>{
                          console.log(item);
                        if(item.category==='T1H'){
                            //document.querySelector('.section06 .weather-info-body span.T1H').innerHTML=item.fcstValue;
                            document.querySelector('.section06 .weather-info .temp').innerHTML=item.fcstValue+"℃";
                        }
                        else if(item.category==='RN1'){

                                document.querySelector('.section06 .weather-info-body span.RN1').innerHTML=item.fcstValue;
                        }
                        else if(item.category==='REH'){
                            document.querySelector('.section06 .weather-info-body span.REH').innerHTML=item.fcstValue;
                        }
                        else if(item.category==='VEC'){
                            directionIdx =  parseInt( (parseInt(item.fcstValue) + 22.5 * 0.5)/22.5); //풍향문자 구하기
                            console.log("realtimeVECIdx[directionIdx] : " +realtimeVECIdx[directionIdx]);
                            document.querySelector('.section06 .weather-info-body span.VEC').innerHTML=realtimeVECIdx[directionIdx];
                        }
                        else if(item.category==='WSD'){
                            document.querySelector('.section06 .weather-info-body span.WSD').innerHTML=item.fcstValue;
                        }
                    })

                    ;
                })
                .catch(err=>{
                    console.log("windNodErr",err)
             });

              //------------------------------
              //체감온도 가져오기
              //------------------------------
              axios.get("/OPTEST/35.170421/129.158254")
                     .then(
                         resp => {
                             console.log('openweatherAPI : ',resp);
                             document.querySelector('.section06 .weather-info-body span.T1H').innerHTML=(resp.data.main.feels_like-273.15).toFixed(); //캘빈단위로 제공
                         }
                     )
                .catch(err=>{});







            //---------------------------
            //차트도 활성화
            LChartBlock.style.visibility = 'visible';
            RChartBlock.style.visibility = 'visible';

           //빌딩풍 위험지도 FIx된거 지우기----------------
           buildingDangerFixedBlock.style.zIndex="1";
           buildingDangerFixedBlock.style.display = 'none';

            //---------------------------
            // 그래프 표시하기
            //---------------------------
            console.log("btn clicked intervalId : ",intervalId);
            //기존 동작하는 Interval 있으면 
            if(intervalId!=null || menu02clickInit==true){
                menu02clickInit=false;
                clearInterval(intervalId); //interval 제거
                console.log("interval removed...interval : ",intervalId);

             //-------------------------
             //left chart지우기(안지워짐..)
             //-------------------------
                const leftChartParentEl = document.querySelector('.chartBlock>.left');
                const oldChart = document.querySelector('.chartBlock>.left>#leftChart');
                oldChart.remove();
                const newLeftChart = document.createElement('canvas');
                 newLeftChart.setAttribute('id','leftChart');
                 newLeftChart.setAttribute('class','WWIWIIWIWW');
                 leftChartParentEl.appendChild(newLeftChart);

                 const ctx = newLeftChart.getContext('2d');

                 //기존 로그데이터 초기화
                 leftConfig = {
                    type: 'line',
                    data: {
                            labels: [''],
                            fill: false,
                            datasets: [{
                                label: '풍속 ',
                                data: [''],
                                fill: false,
                                pointStyle:'circle',
                                borderColor: '#2A76C7',
                                pointRadius:10,
                  
                  
                            }]
                        },
                  
                        options: {
                            responsive: true,
                            plugins: {
                            title: {
                                display: true,
                                text: ' 실시간 풍속변화(m/s)',
                                align: 'start',
                                color: '#2A76C7',
                                },
                                legend: {
                                 display: false, // 레전드 감추기
                                }
                  
                  
                             },
                                elements : {
                                    line : {
                                        tension : 0
                                    }
                                },
                  
                            }
                  } 
                leftChart = new Chart(ctx,leftConfig);


                //-------------------------
                //right chart지우기
                //-------------------------
                const ChartBlockRightEl =  document.querySelector('.chartBlock .right');
                ChartBlockRightEl.removeChild(ChartBlockRightEl.children[0]);
                const newrightChartEl = document.createElement('div');
                newrightChartEl.setAttribute('id','container');
                ChartBlockRightEl.appendChild(newrightChartEl);
                rightChart();
                //-------------------------
                //테이블 값 지우기
                //-------------------------
                const tblEl = document.querySelectorAll('.realtimeTbl tbody td');
                tblEl.forEach(item =>{item.remove();})


                //실시간 풍속/풍향 초기화
                realtimeVECVal =[];
                realtimeWSDIdx = [];
                realtimeWSDVal = [];
            }

            intervalId =  drawChart_ByRealTimeMenu();
            console.log("common's drawChart_ByRealTimeMenu() called! intervalId : " + intervalId);
            //---------------------------
            // 이전꺼 지우기
            //---------------------------

            //OFFCANVAS BTN 비활성화
            const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
            if (offcanvas_btn_el.classList.contains('ToRight')) {
                //OFFCANVAS Move To RIGHT
                offcanvas_btn_el
                    .classList
                    .remove("ToRight");

            }
            //OFFCANVAS 숨기기
            const myOffcanvas = document.querySelector('.offcanvas')
            myOffcanvas
                .classList
                .remove('show');
            const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
            bsOffcanvas.hide();

            //
            menu02ImageZIdxEls.forEach(item => {
                            item.style.display='none';
            })


        }



    })

})

// --------------------------
// POP Close Event Function ( X 버튼 눌렀을때 부모창 메뉴 스타일변경)
// --------------------------
// 부모 창에서 메시지를 받는 이벤트 리스너 등록
// window.addEventListener('message', function (event) {
//     // event.data에 자식 창에서 전달한 데이터가 들어 있음
//     const receivedMessage = event.data;
//     //console.log('자식 창으로부터 받은 메시지:', receivedMessage);

//     //
//     const nav_menu_img_items = document.querySelectorAll('nav li>a');
//     nav_menu_img_items.forEach(item => {
//         const submenuUrl = item.getAttribute('data-submenu');
//         if (submenuUrl.includes(receivedMessage)) {
//             item.setAttribute("data-toggle", "off");
//             const imgEl = item.firstElementChild;
//             let str = imgEl.getAttribute('src');
//             if (!str.includes('_off')) 
//                 str = str.substring(0, str.indexOf('.')) + "_off.png";
//             imgEl.setAttribute('src', str);
//         }

//     });

// });

// --------------------------
// MAP CODE  + SKYVIEW
// --------------------------




//-------------------------
//지도 생성 함수
//-------------------------

const createMap = (polygon) => {

    const LCTlatlng = [35.16073, 129.1688];
    const MARINElatlng = [35.15541, 129.1460];
    const CENTUMPARKlatlan = [35.17899, 129.1227];

    //-------------------------------------------------
    // MAP OPTION
    //-------------------------------------------------
    var mapOptions;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(windowWidth<400){
        mapOptions = {
            center: new naver.maps.LatLng(35.16073, 129.1688),
            zoom: 14,
            mapTypeId: naver.maps.MapTypeId.HYBRID,
            zoomControl: true,
            zoomControlOptions: {
                style: naver.maps.ZoomControlStyle.SMALL,
                position: naver.maps.Position.RIGHT_TOP
            }
        };
    }else{
          mapOptions = {
                center: new naver.maps.LatLng(35.16073, 129.1688),
                zoom: 15,
                mapTypeId: naver.maps.MapTypeId.HYBRID,
                zoomControl: true,
                zoomControlOptions: {
                    style: naver.maps.ZoomControlStyle.SMALL,
                    position: naver.maps.Position.RIGHT_TOP
                }
            };
    }
    map = new naver.maps.Map('map', mapOptions);


    //-----------------------------------------
    //LCT MARKER
    //-----------------------------------------
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.16073, 129.1688),
        map: map
    });

//-----------------------------------------
//TSET 테스트 범례 표시
//-----------------------------------------

    var polygonDataGreen = [];
    var polygonDataBlue = [];
    var polygonDataRed = [];
    polygon.forEach(item=>{
            if( Number(item.speed)<15)
                polygonDataGreen.push(new naver.maps.LatLng(item.lat,item.lon));
            else if(Number(item.speed)<21)
                polygonDataBlue.push(new naver.maps.LatLng(item.lat,item.lon));
            else
                polygonDataRed.push(new naver.maps.LatLng(item.lat,item.lon));
        }
    )

    console.log("PG",polygonDataGreen);
    console.log("PB",polygonDataBlue);
    console.log("PR",polygonDataRed);

    naver.maps.Event.once(map,'init',function(){

        //-----------------------------------------
        //점지도로 표현
        //-----------------------------------------
        var dotmap = new naver.maps.visualization.DotMap(
            {
                map: map,
                data: polygonDataGreen,
                radius : 3,
                fillColor : 'green',
                strokeColor : 'green',
            }
        );
       var dotmap2 = new naver.maps.visualization.DotMap({
                    map: map,
                    data: polygonDataBlue,
                    radius :3,
                    fillColor : 'blue',
                    strokeColor : 'blue',
       });
        var dotmap3 = new naver.maps.visualization.DotMap({
                   map: map,
                   data: polygonDataRed,
                   radius : 3,
                   fillColor : 'red',
                   strokeColor : 'red',
        });

    })



    //-----------------------------------------
     //도형 그리기
     //-----------------------------------------
//     var polygonGreen = new naver.maps.Polygon({
//         map: map,
//         paths: [[]],
//
////         fillColor: '',
////         fillOpacity: 0.6,
//         strokeColor: 'green',
//         strokeOpacity: 0.6,
//         strokeWeight: 3,
//         clickable: false,
//         zIndex:1,
//     });
//
//     // LCTPOLYGON XY
//     var path = polygonGreen.getPaths().getAt(0);
//     for(i=0;i<GREEN.length;i++){
//         path.push(GREEN[i]);
//     }


    //-----------------------------------------
    // 이미지형 마커
    //-----------------------------------------
    // var position = new naver.maps.LatLng(35.16073, 129.1688);

    // var markerOptions = {
    //     position: position,
    //     map: map,
    //     icon: {
    //         url: './images/icon1.png',
    //         size: new naver.maps.Size(22, 35),
    //         origin: new naver.maps.Point(0, 0),
    //         anchor: new naver.maps.Point(11, 35)
    //     }
    // };

    // var marker = new naver.maps.Marker(markerOptions);
    //-----------------------------------------
    // 기본마커
    //-----------------------------------------
//    var marker = new naver.maps.Marker({
//        position: new naver.maps.LatLng(35.16073, 129.1688),
//        map: map
//    });

    //-----------------------------------------
    // 마커 정보창
    //-----------------------------------------
//    var contentString = [
//        '<div class="iw_inner" style="position:relative;z-index:199999;">',
//        '   <h3>LCT</h3>',
//        '   <div>도로명주소 | 지번주소<br>',
//
//        '       <img src="/images/icon22.png" style="width:50px;height:50px;margin 0 auto" alt="서울시청" class="thumb" /><br>',
//        '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
//        '       <a href="http://" target="_blank">아직/</a>',
//        '   </div>',
//        '</div>'
//    ].join('');
//    var infowindow = new naver.maps.InfoWindow({
//            content: contentString,
//             maxWidth: 140,
//             backgroundColor: "#eee",
//                borderColor: "#2db400",
//                borderWidth: 5,
//                anchorSize: new naver.maps.Size(30, 30),
//            anchorSkew: true,
//            anchorColor: "#eee",
//
//            pixelOffset: new naver.maps.Point(20, -20)
//    });

    //-----------------------------------------
    // 마커 클릭 이벤트
    //-----------------------------------------
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    //-----------------------------------------
    //도형 그리기 클릭시 그려지기
    //-----------------------------------------
//    var polygon = new naver.maps.Polygon({
//        map: map,
//        paths: [[]],
//        fillColor: '#ff0000',
//        fillOpacity: 0.3,
//        strokeColor: 'orange',
//        strokeOpacity: 0.6,
//        strokeWeight: 3,
//        clickable: false
//    });
//    naver.maps.Event.addListener(map, 'click', function(e) {
//        var point = e.latlng;
//        var path = polygon.getPaths().getAt(0);
//        path.push(point);
//        // new naver.maps.Marker({
//        //     map: map,
//        //     position: point
//        // });
//    });



    //-----------------------------------------
    //클릭시 좌표 표시
    //-----------------------------------------

   var markerList = [];


    var menuLayer = $('<div style="position:absolute;z-index:10000;width:400px;height:120px;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');

    var windmenuLayer = $('<div style="position:absolute;z-index:10000;width:100px;height:100px;background-color:#fff;border:solid 1px #333;padding:10px;display:none;font-size:0.7rem;display:flex;justify-content:center;align-items:center;"></div>');

    map.getPanes().floatPane.appendChild(menuLayer[0]);
    map.getPanes().floatPane.appendChild(windmenuLayer[0]);

    //왼쪽 클릭 이벤트 처리
    naver.maps.Event.addListener(map, 'click', function(e) {
        //OPENWEATHER날씨요청
        console.log(e.coord);
//        axios.get("/OPTEST/"+e.coord._lat+"/"+e.coord._lng)
//        .then(
//            resp => {
//
//                console.log('openweatherAPI : ',resp);
//                console.log(resp.data.wind);
//                //지도에 표시
//                 var coordHtml ='풍향정보 : '+ resp.data.wind.deg + '<br />'+
//                    '돌풍정보 : ' + resp.data.wind.gust + '<br />'+
//                    '풍속정보 : ' + resp.data.wind.speed;
//
//                  windmenuLayer.show().css({
//                        left: e.offset.x,
//                        top: e.offset.y
//                   }).html(coordHtml);
//            }
//        )
//        .catch(error=>{console.log(error);})

    });


    naver.maps.Event.addListener(map, 'keydown', function(e) {
        var keyboardEvent = e.keyboardEvent,
            keyCode = keyboardEvent.keyCode || keyboardEvent.which;

        var ESC = 27;

        if (keyCode === ESC) {
            keyboardEvent.preventDefault();

            for (var i=0, ii=markerList.length; i<ii; i++) {
                markerList[i].setMap(null);
            }

            markerList = [];

            menuLayer.hide();
        }
    });

    naver.maps.Event.addListener(map, 'mousedown', function(e) {
        menuLayer.hide();
    });
    //우클릭 이벤트
    naver.maps.Event.addListener(map, 'rightclick', function(e) {

        var coordHtml =
            'Coord: '+ e.coord + '<br />' +
            'Point: ' + e.point + '<br />' +
            'Offset: ' + e.offset;

        menuLayer.show().css({
            left: e.offset.x,
            top: e.offset.y
        }).html(coordHtml);

        console.log('Coord: ' + e.coord.toString());
    });




}




//-------------------------------------------------
// 위험지도 바람별로 바꾸기
//-------------------------------------------------
const dangerZoneLctEls = document.querySelectorAll('.dangerzone .body .left .dangerchk');


dangerZoneLctEls.forEach(el=>{

    el.addEventListener('change',function(){

        console.log(el +" clicked..");
        const fixedblockSection02ImgEl = document.querySelector('.buildingDangerFixedBlock .section02');
        const n = document.querySelector('.buildingDangerFixedBlock .buildingwindGif');
        let afterStyleEl = document.createElement("style");
        const afterStyle = ``;
        if (el.checked==true)
        {
           if(el.classList.contains('lct-n')){
                fixedblockSection02ImgEl.src='gif/lct/n/1/n.gif';

                afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                    content: 'N';
                    position:absolute;
                    left:0px;
                    top:0px !important;
                    display:block;
                    width : 40px;
                    height :25px;
                    z-index:11;
                    color : white;
                    text-align:center;
                    border : 1px solid white;
                    margin : 10px;
                }`;
                n.appendChild(afterStyleEl);

            }
            else if(el.classList.contains('lct-ne')){
                fixedblockSection02ImgEl.src='gif/lct/ne/1/ne.gif';

                  afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                                    content: 'NE';
                                    position:absolute;
                                    left:0px;
                                    top:0px !important;
                                    display:block;
                                    width : 40px;
                                    height :25px;
                                    z-index:11;
                                    color : white;
                                    text-align:center;
                                    border : 1px solid white;
                                    margin : 10px;
                                }`;
                n.appendChild(afterStyleEl);
            }
            else if(el.classList.contains('lct-e')){
                 fixedblockSection02ImgEl.src='gif/lct/e/1/e.gif';

                   afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                                     content: 'E';
                                     position:absolute;
                                     left:0px;
                                     top:0px !important;
                                     display:block;
                                     width : 40px;
                                     height :25px;
                                     z-index:11;
                                     color : white;
                                     text-align:center;
                                     border : 1px solid white;
                                     margin : 10px;
                                 }`;
                 n.appendChild(afterStyleEl);
             }


        }

    })

})

const deSelectFunction = ()=>{


}

//-----------------------------------------
//현재 날짜 구하기(20230101)
//-----------------------------------------
function getForcastDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  let currentDate = `${year}${month}${day}`;
    //2300시인경우
  const time = getForcastTime();
  if(time=='0000'){
    // 현재 날짜에 1을 더하여 다음 날을 얻기
    var nD = new Date(today);
    nD.setDate(today.getDate() + 1);

    const newYear = nD.getFullYear();
    const newMonth = String(nD.getMonth()+1).padStart(2, '0');
    const nextDay =  String(nD.getDate()).padStart(2, '0');
    currentDate =  `${newYear}${newMonth}${nextDay}`;
  }
  return currentDate;

}
//현재 시간 구하기 0500
function getForcastTime() {
    const today = new Date();
    let hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');


    hours = String(today.getHours()+1).padStart(2, '0');
    if(hours=='24')
        return`0000`;
    else
        return `${hours}00`;
  }

  //return  `${hours}${minutes}`;



    //-----------------------------------------
    //윈도우 사이즈 이벤트
    //-----------------------------------------

    window.addEventListener('resize', function(){
      // 현재 윈도우의 너비와 높이 가져오기
      const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      // 가져온 크기 출력
      console.log(`윈도우 너비: ${windowWidth}px, 윈도우 높이: ${windowHeight}px`);

    });
    //-----------------------------------------
    //처음로딩될때 이벤트
    //-----------------------------------------
    document.addEventListener('DOMContentLoaded', function() {

                    LChartBlock.style.visibility = 'hidden';
                    RChartBlock.style.visibility = 'hidden';

                    const n = document.querySelector('.buildingDangerFixedBlock .buildingwindGif');
                    let afterStyleEl = document.createElement("style");
                    afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                        content: 'N';
                        position:absolute;
                        left:0px;
                        top:0px !important;
                        display:block;
                        width : 40px;
                        height :25px;
                        z-index:11;
                        color : white;
                        text-align:center;
                        border : 1px solid white;
                        margin : 10px;
                    }`;
                    n.appendChild(afterStyleEl);


                    //모바일 사이즈 이벤트 처리
                   // 현재 윈도우의 너비와 높이 가져오기
                   const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                   const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

                   // 가져온 크기 출력
                   console.log(`DOMContentLoaded 윈도우 너비: ${windowWidth}px, 윈도우 높이: ${windowHeight}px`);

                   if(windowWidth<450){
                        console.log('map : ' + map);
                   }

    });


