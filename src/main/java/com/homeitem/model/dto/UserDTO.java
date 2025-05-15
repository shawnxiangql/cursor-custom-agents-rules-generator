package com.homeitem.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "用户数据传输对象，包含用户的基本信息")
public class UserDTO {
    @Schema(description = "用户ID", example = "1")
    private Long id;
    
    @Schema(description = "用户名", example = "zhang_san", required = true)
    private String username;
    
    @Schema(description = "密码", example = "Password123", required = true, accessMode = Schema.AccessMode.WRITE_ONLY)
    private String password;
    
    @Schema(description = "用户角色", example = "ADMIN", allowableValues = {"ADMIN", "ADVANCED", "BASIC", "GUEST"}, required = true)
    private String role;
    
    @Schema(description = "所属家庭组ID", example = "1")
    private Long familyId;
} 