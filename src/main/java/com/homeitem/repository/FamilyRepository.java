package com.homeitem.repository;

import com.homeitem.model.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FamilyRepository extends JpaRepository<Family, Long> {
    // 可扩展自定义查询
} 