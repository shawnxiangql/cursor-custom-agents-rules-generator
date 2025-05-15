package com.homeitem.service

import com.homeitem.model.Item
import com.homeitem.model.dto.ItemDTO
import com.homeitem.repository.ItemRepository
import com.homeitem.service.impl.ItemServiceImpl
import spock.lang.Specification

import java.math.BigDecimal
import java.time.LocalDate

class ItemServiceImplTest extends Specification {
    def itemRepository = Mock(ItemRepository)
    def itemService = new ItemServiceImpl(itemRepository: itemRepository)

    def "创建物品成功"() {
        given:
        def dto = new ItemDTO(name: "测试物品", price: new BigDecimal("99.99"))
        itemRepository.save(_) >> { Item i -> i }

        when:
        def result = itemService.createItem(dto)

        then:
        result.name == "测试物品"
        result.price == new BigDecimal("99.99")
    }

    def "根据ID获取不存在物品返回null"() {
        given:
        itemRepository.findById(1L) >> Optional.empty()

        expect:
        itemService.getItemById(1L) == null
    }
} 