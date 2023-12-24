package com.example.demo.controller;


import com.example.demo.domain.entity.RealTimeForcastNow;
import com.example.demo.domain.entity.RealTimeWindDirection;
import com.example.demo.domain.entity.RealTimeWindNow;
import com.example.demo.domain.entity.RealTimeWindPower;
import com.example.demo.domain.repository.*;
import com.example.demo.properties.RealTimeProperties;
import lombok.Data;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
    private RealTimeForcastNowRepository realTimeForcastNowRepository;

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

    @GetMapping(value = "/windForcast/{fcstDate}/{fcstTime}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody List<RealTimeForcastNow> getWindForcast(
            @PathVariable String fcstDate, @PathVariable String fcstTime
    )
    {
        return realTimeForcastNowRepository.findByBaseDateAndBaseTime(fcstDate, fcstTime);

    }

}





