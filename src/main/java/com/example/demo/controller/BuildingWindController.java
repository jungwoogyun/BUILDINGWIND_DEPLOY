package com.example.demo.controller;


import com.example.demo.domain.entity.RealTimeWindDirection;
import com.example.demo.domain.entity.RealTimeWindPower;
import com.example.demo.domain.repository.LocationRepository;
import com.example.demo.domain.repository.RealTimeWindDirectionRepostitory;
import com.example.demo.domain.repository.RealTimeWindPowerRepostitory;
import lombok.Data;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
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
    private LocationRepository locationRepository;


    //-----------------------------------------------
    //DB 꺼내와서 도표 그리는 용도로 사용
    //-----------------------------------------------
    @GetMapping("/windPower")
    public @ResponseBody List<RealTimeWindPower> getWindPower(){
        return realTimeWindPowerRepostitory.findAll();
    }

    @GetMapping("/windDirection")
    public @ResponseBody List<RealTimeWindDirection> getWindDirection(){

        return realTimeWindDirectionRepostitory.findAll();
    }
}

