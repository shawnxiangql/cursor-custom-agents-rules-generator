package com.homeitem.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "家庭组数据传输对象，包含家庭组的基本信息")
public class FamilyDTO {
    @Schema(description = "家庭组ID", example = "1")
    private Long id;
    
    @Schema(description = "家庭组名称", example = "张家", required = true)
    private String name;
    
    @Schema(description = "创建者用户ID", example = "1", required = true)
    private Long createdBy;
} 