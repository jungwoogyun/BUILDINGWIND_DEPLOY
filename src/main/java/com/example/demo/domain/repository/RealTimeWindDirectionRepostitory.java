package com.example.demo.domain.repository;

import com.example.demo.domain.entity.RealTimeWindDirection;
import com.example.demo.domain.entity.RealTimeWindNow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RealTimeWindDirectionRepostitory extends JpaRepository<RealTimeWindDirection,String> {

    @Query("SELECT r FROM RealTimeWindDirection r WHERE r.baseTime <= :baseTime")
    List<RealTimeWindDirection> selectAllByBaseTime(@Param("baseTime") String baseTime);

}

