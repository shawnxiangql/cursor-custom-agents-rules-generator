package com.homeitem.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Schema(description = "物品数据传输对象，包含物品的基本信息")
public class ItemDTO {
    @Schema(description = "物品ID", example = "1")
    private Long id;
    
    @Schema(description = "物品名称", example = "飞利浦电动牙刷", required = true)
    private String name;
    
    @Schema(description = "物品描述", example = "成人电动牙刷，带有3种模式")
    private String description;
    
    @Schema(description = "物品分类", example = "电子设备", required = true)
    private String category;
    
    @Schema(description = "标签，多个标签用逗号分隔", example = "卫生,电子,日用")
    private String tags;
    
    @Schema(description = "物品存放位置", example = "主卧浴室柜")
    private String location;
    
    @Schema(description = "购买日期", example = "2023-05-12")
    private LocalDate purchaseDate;
    
    @Schema(description = "购买价格", example = "299.99")
    private BigDecimal price;
    
    @Schema(description = "保修截止日期", example = "2025-05-12")
    private LocalDate warrantyExpiry;
    
    @Schema(description = "物品图片，多张图片路径用逗号分隔", example = "/images/toothbrush_1.jpg,/images/toothbrush_2.jpg")
    private String images;
    
    @Schema(description = "物品所有者ID", example = "1")
    private Long ownerId;
    
    @Schema(description = "物品所属家庭组ID", example = "1")
    private Long familyId;
} 