package com.homeitem.repository;

import com.homeitem.model.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
    List<FamilyMember> findByFamilyId(Long familyId);
    List<FamilyMember> findByUserId(Long userId);
    void deleteByFamilyIdAndUserId(Long familyId, Long userId);
} 