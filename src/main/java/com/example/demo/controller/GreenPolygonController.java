package com.example.demo.controller;


import com.example.demo.domain.entity.GreenPolygon;
import com.example.demo.domain.repository.GreenPolygonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/polygon")
public class GreenPolygonController {

    @Autowired
    private GreenPolygonRepository greenPolygonRepository;


    @GetMapping("/green")
    public List<GreenPolygon> getGreen(){
        return   greenPolygonRepository.findAll();

    }


}
