package com.homeitem.controller;

import com.homeitem.model.dto.ItemDTO;
import com.homeitem.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@Tag(name = "物品管理", description = "物品信息的增删改查接口")
@SecurityRequirement(name = "bearerAuth")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @PostMapping
    @Operation(summary = "创建新物品", description = "添加一个新的物品记录到系统")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "物品创建成功", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "400", description = "无效的请求参数")
    })
    public ResponseEntity<ItemDTO> createItem(@RequestBody ItemDTO itemDTO) {
        return ResponseEntity.ok(itemService.createItem(itemDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "更新物品信息", description = "根据ID更新指定物品的信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "物品更新成功", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定ID的物品不存在")
    })
    public ResponseEntity<ItemDTO> updateItem(
            @Parameter(description = "物品ID") @PathVariable Long id, 
            @RequestBody ItemDTO itemDTO) {
        return ResponseEntity.ok(itemService.updateItem(id, itemDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除物品", description = "根据ID删除指定物品")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "物品删除成功"),
        @ApiResponse(responseCode = "404", description = "指定ID的物品不存在")
    })
    public ResponseEntity<Void> deleteItem(
            @Parameter(description = "物品ID") @PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取物品详情", description = "根据ID获取指定物品的详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取物品信息", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定ID的物品不存在")
    })
    public ResponseEntity<ItemDTO> getItem(
            @Parameter(description = "物品ID") @PathVariable Long id) {
        ItemDTO dto = itemService.getItemById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    @Operation(summary = "获取所有物品", description = "获取系统中所有物品的列表")
    @ApiResponse(responseCode = "200", description = "成功获取物品列表", 
                content = @Content(schema = @Schema(implementation = ItemDTO.class)))
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }
    
    @GetMapping("/family/{familyId}")
    @Operation(summary = "获取家庭组物品列表", description = "获取指定家庭组的所有物品列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取家庭组物品列表", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定家庭组不存在")
    })
    public ResponseEntity<List<ItemDTO>> getItemsByFamily(
            @Parameter(description = "家庭组ID") @PathVariable Long familyId) {
        return ResponseEntity.ok(itemService.getItemsByFamilyId(familyId));
    }
    
    @PutMapping("/{id}/assign/{familyId}")
    @Operation(summary = "分配物品到家庭组", description = "将指定物品分配到指定家庭组")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "物品分配成功", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定物品或家庭组不存在")
    })
    public ResponseEntity<ItemDTO> assignItemToFamily(
            @Parameter(description = "物品ID") @PathVariable Long id,
            @Parameter(description = "家庭组ID") @PathVariable Long familyId) {
        return ResponseEntity.ok(itemService.assignItemToFamily(id, familyId));
    }
    
    @PutMapping("/{id}/unassign")
    @Operation(summary = "从家庭组移除物品", description = "将物品从当前所属家庭组中移除")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "物品移除成功", 
                    content = @Content(schema = @Schema(implementation = ItemDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定物品不存在")
    })
    public ResponseEntity<ItemDTO> removeItemFromFamily(
            @Parameter(description = "物品ID") @PathVariable Long id) {
        return ResponseEntity.ok(itemService.removeItemFromFamily(id));
    }
} 