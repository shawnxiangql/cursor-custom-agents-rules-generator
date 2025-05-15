package com.homeitem.service.impl;

import com.homeitem.model.Item;
import com.homeitem.model.dto.ItemDTO;
import com.homeitem.repository.ItemRepository;
import com.homeitem.service.ItemService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemRepository itemRepository;

    private ItemDTO toDTO(Item item) {
        ItemDTO dto = new ItemDTO();
        BeanUtils.copyProperties(item, dto);
        return dto;
    }

    private Item toEntity(ItemDTO dto) {
        Item item = new Item();
        BeanUtils.copyProperties(dto, item);
        return item;
    }

    @Override
    public ItemDTO createItem(ItemDTO itemDTO) {
        Item item = toEntity(itemDTO);
        Item saved = itemRepository.save(item);
        return toDTO(saved);
    }

    @Override
    public ItemDTO updateItem(Long id, ItemDTO itemDTO) {
        Optional<Item> optional = itemRepository.findById(id);
        if (optional.isPresent()) {
            Item item = optional.get();
            BeanUtils.copyProperties(itemDTO, item, "id", "createdAt");
            Item updated = itemRepository.save(item);
            return toDTO(updated);
        }
        throw new RuntimeException("物品不存在");
    }

    @Override
    public void deleteItem(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public ItemDTO getItemById(Long id) {
        return itemRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return itemRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }
    
    @Override
    public List<ItemDTO> getItemsByFamilyId(Long familyId) {
        return itemRepository.findByFamilyId(familyId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public ItemDTO assignItemToFamily(Long itemId, Long familyId) {
        Optional<Item> optional = itemRepository.findById(itemId);
        if (optional.isPresent()) {
            Item item = optional.get();
            item.setFamilyId(familyId);
            Item updated = itemRepository.save(item);
            return toDTO(updated);
        }
        throw new RuntimeException("物品不存在");
    }
    
    @Override
    public ItemDTO removeItemFromFamily(Long itemId) {
        Optional<Item> optional = itemRepository.findById(itemId);
        if (optional.isPresent()) {
            Item item = optional.get();
            item.setFamilyId(null);
            Item updated = itemRepository.save(item);
            return toDTO(updated);
        }
        throw new RuntimeException("物品不存在");
    }
} 