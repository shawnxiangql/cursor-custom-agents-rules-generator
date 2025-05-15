package com.homeitem.repository;

import com.homeitem.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // 根据家庭组ID查询物品
    List<Item> findByFamilyId(Long familyId);
    
    // 根据所有者ID查询物品
    List<Item> findByOwnerId(Long ownerId);
} 