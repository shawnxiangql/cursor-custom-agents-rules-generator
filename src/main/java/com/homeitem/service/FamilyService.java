package com.homeitem.service;

import com.homeitem.model.dto.FamilyDTO;
import com.homeitem.model.dto.FamilyMemberDTO;
import java.util.List;

public interface FamilyService {
    FamilyDTO createFamily(FamilyDTO familyDTO);
    FamilyDTO updateFamily(Long id, FamilyDTO familyDTO);
    void deleteFamily(Long id);
    FamilyDTO getFamilyById(Long id);
    List<FamilyDTO> getAllFamilies();

    // 成员管理
    FamilyMemberDTO inviteMember(Long familyId, Long userId, String role);
    void removeMember(Long familyId, Long userId);
    List<FamilyMemberDTO> getMembers(Long familyId);
} 