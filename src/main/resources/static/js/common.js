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
nav_menu_img_items.forEach(item => {

    item.addEventListener('click', function () {
        const isOpened = item.getAttribute('data-toggle');


        //
        const submenuUrl = item.getAttribute('data-submenu');
        const submenuIdx = item.getAttribute('data-idx');
        if (submenuUrl.includes("02")) {



           const SectionEls = document.querySelectorAll('main section')
                       SectionEls.forEach(sec => {
                           sec.style.display = 'none';
                           if (sec.classList.contains('section02')) {
                               sec.style.display = 'block';
                           }
            })


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
                        buildingDangerFixedBlockEl.style.display = 'none';



        }
        //01MENU 클릭시
        else if (submenuUrl.includes("01")) {
            const SectionEls = document.querySelectorAll('main section')
            SectionEls.forEach(sec => {
                sec.style.display = 'none';
                if (sec.classList.contains('section01')) {
                    sec.style.display = 'block';
                }
            })


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
            buildingDangerFixedBlockEl.style.display = 'none';

        } else if (submenuUrl.includes("05")) {

            //OFFCANVAS 버튼 오른쪽이동

            const windowWidth = window.innerWidth;

            if (windowWidth > 500) {
                const offcanvas_btn_el = document.querySelector('.offcanvas_btn');
                if (!offcanvas_btn_el.classList.contains('ToRight')) {
                    //OFFCANVAS BTN Move To RIGHT
                    offcanvas_btn_el
                        .classList
                        .add("ToRight");
                }

                //OFFCANVAS SHOW
                const myOffcanvas = document.querySelector('.offcanvas')
                let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
                bsOffcanvas.show();
                //05MENU 클릭시 오픈캔버스에 내용표시
                if (submenuUrl.includes("05")) {

                    const buildingWindEl = document.querySelector('.dangerzone');
                    buildingWindEl.style.display = 'block';

                    const buildingDangerFixedBlockEl = document.querySelector(
                        '.buildingDangerFixedBlock'
                    );
                    buildingDangerFixedBlockEl.style.display = 'block';

                }
            }

            // 빌딩풍위험지도 다시 띄우기
            const sectionEls = document.querySelectorAll('main section');
            sectionEls.forEach(sec => {
                sec.style.display = 'none';
                if (sec.classList.contains('section03')) {
                    sec.style.display = "block";
                    document
                        .querySelector('#map')
                        .remove();
                    const mapEl = document.createElement('div');
                    mapEl.setAttribute('id', 'map');
                    sec.appendChild(mapEl);
                    createMap();
                }

            })


        //-------------------------------------
        //실시간 풍속 정보를 클릭했을때
        //-------------------------------------
        } else if (submenuUrl.includes("06")) {

            // 모든 section 을 display:none;
            console.log("menu06!!!");
            const sectionEls = document.querySelectorAll('main section');
            sectionEls.forEach(sec => {
                sec.style.display = 'none';
                if (sec.classList.contains('section06')) {
                    sec.style.display = "block";
                }             
            })

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
                realtimeVECVal =[];

                //실시간 풍속
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
            const buildingDangerFixedBlockEl = document.querySelector(
                '.buildingDangerFixedBlock'
            );
            buildingDangerFixedBlockEl.style.display = 'none';

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





const createMap = () => {

    const LCTlatlng = [35.16073, 129.1688];
    const MARINElatlng = [35.15541, 129.1460];
    const CENTUMPARKlatlan = [35.17899, 129.1227];

    //-------------------------------------------------
    // NAVERMAP START
    //-------------------------------------------------
    var mapOptions = {
        center: new naver.maps.LatLng(35.16073, 129.1688),
        zoom: 15,
        mapTypeId: naver.maps.MapTypeId.HYBRID,
        zoomControl: true,
        zoomControlOptions: {
            style: naver.maps.ZoomControlStyle.SMALL,
            position: naver.maps.Position.RIGHT_TOP
        }
    };

    var map = new naver.maps.Map('map', mapOptions);


    //-----------------------------------------
    //LCT MARKER
    //-----------------------------------------
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.16073, 129.1688),
        map: map
    });
    //-----------------------------------------
    // LCT 마커 정보창
    //-----------------------------------------
    var contentString = [
        '<div class="iw_inner">',
        '   <h3>서울특별시청</h3>',
        '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br>',
        '       <img src="./img/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br>',
        '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
        '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
        '   </p>',
        '</div>'
    ].join('');
    var infowindow = new naver.maps.InfoWindow({
        content: contentString
    });
    //-----------------------------------------
    // LCT 마커 클릭 이벤트
    //-----------------------------------------
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });

    //-----------------------------------------
     //도형 그리기
     //-----------------------------------------
     var polygonGreen = new naver.maps.Polygon({
         map: map,
         paths: [[]],
         fillColor: 'green',
         fillOpacity: 0.6,
         strokeColor: '',
         strokeOpacity: 0.6,
         strokeWeight: 3,
         clickable: true,
         zIndex:1,
     });

     // LCTPOLYGON XY
     var path = polygonGreen.getPaths().getAt(0);
     for(i=0;i<GREEN.length;i++){
         path.push(GREEN[i]);
     }






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
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(35.16073, 129.1688),
        map: map
    });

    //-----------------------------------------
    // 마커 정보창
    //-----------------------------------------
    var contentString = [
        '<div class="iw_inner">',
        '   <h3>서울특별시청</h3>',
        '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br>',
        '       <img src="./img/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br>',
        '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
        '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
        '   </p>',
        '</div>'
    ].join('');
    var infowindow = new naver.maps.InfoWindow({
        content: contentString
    });

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
    //도형 그리기
    //-----------------------------------------
    var polygon = new naver.maps.Polygon({
        map: map,
        paths: [[]],
        fillColor: '#ff0000',
        fillOpacity: 0.3,
        strokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        clickable: true
    });

    naver.maps.Event.addListener(map, 'click', function(e) {

        var point = e.latlng;

        var path = polygon.getPaths().getAt(0);
        path.push(point);

        // new naver.maps.Marker({
        //     map: map,
        //     position: point
        // });
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
        if (el.checked==true)
        {
           if(el.classList.contains('lct-n')){
                fixedblockSection02ImgEl.src='gif/lct/n/1/n.gif';

                afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                    content: 'N';
                }`;
                n.appendChild(afterStyleEl);

            }
            else if(el.classList.contains('lct-ne')){
                fixedblockSection02ImgEl.src='gif/lct/ne/1/ne.gif';

                afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                    content: 'NE';
                }`;
                n.appendChild(afterStyleEl);
            }
            else if(el.classList.contains('lct-e')){
                 fixedblockSection02ImgEl.src='gif/lct/e/1/e.gif';

                 afterStyleEl.innerHTML = `.buildingDangerFixedBlock .buildingwindGif::after{
                     content: 'E';
                 }`;
                 n.appendChild(afterStyleEl);
             }


        }







    })


})
