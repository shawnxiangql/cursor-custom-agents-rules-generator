package com.homeitem.service

import com.homeitem.model.Family
import com.homeitem.model.FamilyMember
import com.homeitem.model.dto.FamilyDTO
import com.homeitem.model.dto.FamilyMemberDTO
import com.homeitem.repository.FamilyMemberRepository
import com.homeitem.repository.FamilyRepository
import com.homeitem.service.impl.FamilyServiceImpl
import spock.lang.Specification

class FamilyServiceImplTest extends Specification {
    def familyRepository = Mock(FamilyRepository)
    def familyMemberRepository = Mock(FamilyMemberRepository)
    def familyService = new FamilyServiceImpl(familyRepository: familyRepository, familyMemberRepository: familyMemberRepository)

    def "创建家庭组成功"() {
        given:
        def dto = new FamilyDTO(name: 'testFamily', createdBy: 1L)
        familyRepository.save(_) >> { Family f -> f }

        when:
        def result = familyService.createFamily(dto)

        then:
        result.name == 'testFamily'
        result.createdBy == 1L
    }

    def "邀请成员成功"() {
        given:
        def member = new FamilyMember(familyId: 1L, userId: 2L, role: 'BASIC')
        familyMemberRepository.save(_) >> { FamilyMember m -> m }

        when:
        def result = familyService.inviteMember(1L, 2L, 'BASIC')

        then:
        result.familyId == 1L
        result.userId == 2L
        result.role == 'BASIC'
    }

    def "获取家庭组成员列表"() {
        given:
        def members = [new FamilyMember(familyId: 1L, userId: 2L, role: 'BASIC'), new FamilyMember(familyId: 1L, userId: 3L, role: 'ADMIN')]
        familyMemberRepository.findByFamilyId(1L) >> members

        when:
        def result = familyService.getMembers(1L)

        then:
        result.size() == 2
        result*.userId == [2L, 3L]
    }
} 