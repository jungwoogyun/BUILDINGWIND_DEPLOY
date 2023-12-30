package com.example.demo.controller;


import com.example.demo.domain.entity.*;
import com.example.demo.domain.repository.*;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BuildingWindController {

    @Autowired
    private RealTimeWindPowerRepostitory realTimeWindPowerRepostitory;
    @Autowired
    private RealTimeWindDirectionRepostitory realTimeWindDirectionRepostitory;

    @Autowired
    private RealTimeWindNowRepostitory realTimeWindNowRepostitory;

    @Autowired
    private LocationRepository locationRepository;


    @Autowired
    private BusanAirRepository busanAirRepository;

    @Autowired
    private RealTimeForcastNowRepository realTimeForcastNowRepository;

    @Autowired
    private BusanZaRepository busanZaRepository;

    //-----------------------------------------------
    //DB 꺼내와서 도표 그리는 용도로 사용
    //-----------------------------------------------
    @GetMapping("/windPower")
    public @ResponseBody List<RealTimeWindPower> getWindPower() {
        return realTimeWindPowerRepostitory.findAll();
    }

    @GetMapping("/windDirection")
    public @ResponseBody List<RealTimeWindDirection> getWindDirection() {

        return realTimeWindDirectionRepostitory.findAll();
    }

    @GetMapping("/windNow")
    public @ResponseBody List<RealTimeWindNow> getWindNow() {
        return realTimeWindNowRepostitory.findAll();
    }


    /*
    * WIND FORCAST REQ
    * */

    @GetMapping(value = "/windForcast/{fcstDate}/{fcstTime}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<RealTimeForcastNow> getWindForcast(
            @PathVariable String fcstDate, @PathVariable String fcstTime
    )
    {
        return realTimeForcastNowRepository.findByBaseDateAndBaseTime(fcstDate, fcstTime);
    }


    @GetMapping(value = "/BusanAir")
    public @ResponseBody List<BusanAir> getAirBusan() throws ParseException {
        return busanAirRepository.findAll();
    }


    @GetMapping(value = "/za")
    public @ResponseBody List<BusanZa> za() throws ParseException {
        return busanZaRepository.findAll();
    }
}



