package com.homeitem.service.impl;

import com.homeitem.model.Family;
import com.homeitem.model.FamilyMember;
import com.homeitem.model.dto.FamilyDTO;
import com.homeitem.model.dto.FamilyMemberDTO;
import com.homeitem.repository.FamilyMemberRepository;
import com.homeitem.repository.FamilyRepository;
import com.homeitem.service.FamilyService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FamilyServiceImpl implements FamilyService {
    @Autowired
    private FamilyRepository familyRepository;
    @Autowired
    private FamilyMemberRepository familyMemberRepository;

    private FamilyDTO toDTO(Family family) {
        FamilyDTO dto = new FamilyDTO();
        BeanUtils.copyProperties(family, dto);
        return dto;
    }

    private Family toEntity(FamilyDTO dto) {
        Family family = new Family();
        BeanUtils.copyProperties(dto, family);
        return family;
    }

    private FamilyMemberDTO toMemberDTO(FamilyMember member) {
        FamilyMemberDTO dto = new FamilyMemberDTO();
        BeanUtils.copyProperties(member, dto);
        return dto;
    }

    @Override
    public FamilyDTO createFamily(FamilyDTO familyDTO) {
        Family family = toEntity(familyDTO);
        Family saved = familyRepository.save(family);
        return toDTO(saved);
    }

    @Override
    public FamilyDTO updateFamily(Long id, FamilyDTO familyDTO) {
        Optional<Family> optional = familyRepository.findById(id);
        if (optional.isPresent()) {
            Family family = optional.get();
            BeanUtils.copyProperties(familyDTO, family, "id", "createdAt");
            Family updated = familyRepository.save(family);
            return toDTO(updated);
        }
        throw new RuntimeException("家庭组不存在");
    }

    @Override
    public void deleteFamily(Long id) {
        familyRepository.deleteById(id);
    }

    @Override
    public FamilyDTO getFamilyById(Long id) {
        return familyRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public List<FamilyDTO> getAllFamilies() {
        return familyRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public FamilyMemberDTO inviteMember(Long familyId, Long userId, String role) {
        FamilyMember member = new FamilyMember();
        member.setFamilyId(familyId);
        member.setUserId(userId);
        member.setRole(role);
        FamilyMember saved = familyMemberRepository.save(member);
        return toMemberDTO(saved);
    }

    @Override
    public void removeMember(Long familyId, Long userId) {
        familyMemberRepository.deleteByFamilyIdAndUserId(familyId, userId);
    }

    @Override
    public List<FamilyMemberDTO> getMembers(Long familyId) {
        return familyMemberRepository.findByFamilyId(familyId)
                .stream().map(this::toMemberDTO).collect(Collectors.toList());
    }
} 