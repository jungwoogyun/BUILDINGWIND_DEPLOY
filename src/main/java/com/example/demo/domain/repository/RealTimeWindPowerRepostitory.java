package com.example.demo.domain.repository;

import com.example.demo.domain.entity.RealTimeWindNow;
import com.example.demo.domain.entity.RealTimeWindPower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealTimeWindPowerRepostitory extends JpaRepository<RealTimeWindPower,String> {

    @Query("SELECT r FROM RealTimeWindPower r WHERE r.baseTime <= :baseTime")
    List<RealTimeWindPower> selectAllByBaseTime(@Param("baseTime") String baseTime);
}
