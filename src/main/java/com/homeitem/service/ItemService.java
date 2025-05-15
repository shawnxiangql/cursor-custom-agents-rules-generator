package com.homeitem.service;

import com.homeitem.model.dto.ItemDTO;
import java.util.List;

public interface ItemService {
    ItemDTO createItem(ItemDTO itemDTO);
    ItemDTO updateItem(Long id, ItemDTO itemDTO);
    void deleteItem(Long id);
    ItemDTO getItemById(Long id);
    List<ItemDTO> getAllItems();
    
    // 家庭组物品关联方法
    List<ItemDTO> getItemsByFamilyId(Long familyId);
    ItemDTO assignItemToFamily(Long itemId, Long familyId);
    ItemDTO removeItemFromFamily(Long itemId);
} 