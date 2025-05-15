package com.homeitem.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "家庭组成员数据传输对象，包含家庭组成员关系信息")
public class FamilyMemberDTO {
    @Schema(description = "成员关系ID", example = "1")
    private Long id;
    
    @Schema(description = "所属家庭组ID", example = "1", required = true)
    private Long familyId;
    
    @Schema(description = "用户ID", example = "2", required = true)
    private Long userId;
    
    @Schema(description = "用户在家庭组中的角色", example = "ADMIN", allowableValues = {"ADMIN", "ADVANCED", "BASIC", "GUEST"}, required = true)
    private String role;
} 