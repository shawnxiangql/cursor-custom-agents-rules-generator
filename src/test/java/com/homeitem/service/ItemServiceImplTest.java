package com.homeitem.service;

import com.homeitem.model.dto.ItemDTO;
import com.homeitem.repository.ItemRepository;
import com.homeitem.service.impl.ItemServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ItemServiceImplTest {
    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemServiceImpl itemService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateItem() {
        ItemDTO dto = new ItemDTO();
        dto.setName("测试物品");
        dto.setPrice(new BigDecimal("99.99"));
        when(itemRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
        ItemDTO result = itemService.createItem(dto);
        assertEquals("测试物品", result.getName());
        assertEquals(new BigDecimal("99.99"), result.getPrice());
    }

    @Test
    void testGetItemById_NotFound() {
        when(itemRepository.findById(1L)).thenReturn(Optional.empty());
        assertNull(itemService.getItemById(1L));
    }

    // 可继续补充更多测试用例
} 