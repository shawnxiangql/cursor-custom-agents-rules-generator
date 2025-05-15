package com.homeitem.controller;

import com.homeitem.model.dto.FamilyDTO;
import com.homeitem.model.dto.FamilyMemberDTO;
import com.homeitem.service.FamilyService;
import com.homeitem.util.SecurityUtil;
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

@Tag(name = "家庭组管理", description = "家庭组及成员管理API")
@RestController
@RequestMapping("/api/families")
@SecurityRequirement(name = "bearerAuth")
public class FamilyController {
    @Autowired
    private FamilyService familyService;

    @Operation(summary = "创建家庭组", description = "创建一个新的家庭组（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "家庭组创建成功", 
                    content = @Content(schema = @Schema(implementation = FamilyDTO.class))),
        @ApiResponse(responseCode = "403", description = "无权限创建家庭组")
    })
    @PostMapping
    public ResponseEntity<FamilyDTO> createFamily(@RequestBody FamilyDTO familyDTO) {
        if (!"ADMIN".equals(SecurityUtil.getCurrentRole())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(familyService.createFamily(familyDTO));
    }

    @Operation(summary = "获取家庭组详情", description = "根据ID获取指定家庭组的详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取家庭组信息", 
                    content = @Content(schema = @Schema(implementation = FamilyDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定家庭组不存在")
    })
    @GetMapping("/{id}")
    public ResponseEntity<FamilyDTO> getFamily(
            @Parameter(description = "家庭组ID") @PathVariable Long id) {
        FamilyDTO dto = familyService.getFamilyById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "获取所有家庭组", description = "获取系统中所有家庭组的列表")
    @ApiResponse(responseCode = "200", description = "成功获取家庭组列表", 
                content = @Content(schema = @Schema(implementation = FamilyDTO.class)))
    @GetMapping
    public ResponseEntity<List<FamilyDTO>> getAllFamilies() {
        return ResponseEntity.ok(familyService.getAllFamilies());
    }

    @Operation(summary = "更新家庭组信息", description = "根据ID更新指定家庭组的信息（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "家庭组更新成功", 
                    content = @Content(schema = @Schema(implementation = FamilyDTO.class))),
        @ApiResponse(responseCode = "403", description = "无权限更新家庭组"),
        @ApiResponse(responseCode = "404", description = "指定家庭组不存在")
    })
    @PutMapping("/{id}")
    public ResponseEntity<FamilyDTO> updateFamily(
            @Parameter(description = "家庭组ID") @PathVariable Long id, 
            @RequestBody FamilyDTO familyDTO) {
        if (!"ADMIN".equals(SecurityUtil.getCurrentRole())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(familyService.updateFamily(id, familyDTO));
    }

    @Operation(summary = "删除家庭组", description = "根据ID删除指定家庭组（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "家庭组删除成功"),
        @ApiResponse(responseCode = "403", description = "无权限删除家庭组"),
        @ApiResponse(responseCode = "404", description = "指定家庭组不存在")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(
            @Parameter(description = "家庭组ID") @PathVariable Long id) {
        if (!"ADMIN".equals(SecurityUtil.getCurrentRole())) {
            return ResponseEntity.status(403).build();
        }
        familyService.deleteFamily(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "邀请成员", description = "邀请用户加入指定家庭组（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "邀请成功", 
                    content = @Content(schema = @Schema(implementation = FamilyMemberDTO.class))),
        @ApiResponse(responseCode = "403", description = "无权限邀请成员"),
        @ApiResponse(responseCode = "404", description = "指定家庭组或用户不存在")
    })
    @PostMapping("/{id}/invite")
    public ResponseEntity<FamilyMemberDTO> inviteMember(
            @Parameter(description = "家庭组ID") @PathVariable Long id,
            @Parameter(description = "被邀请用户ID") @RequestParam Long userId,
            @Parameter(description = "分配的角色") @RequestParam String role) {
        if (!"ADMIN".equals(SecurityUtil.getCurrentRole())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(familyService.inviteMember(id, userId, role));
    }

    @Operation(summary = "移除成员", description = "将用户从指定家庭组中移除（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "成员移除成功"),
        @ApiResponse(responseCode = "403", description = "无权限移除成员"),
        @ApiResponse(responseCode = "404", description = "指定家庭组或成员关系不存在")
    })
    @PostMapping("/{id}/remove")
    public ResponseEntity<Void> removeMember(
            @Parameter(description = "家庭组ID") @PathVariable Long id,
            @Parameter(description = "被移除用户ID") @RequestParam Long userId) {
        if (!"ADMIN".equals(SecurityUtil.getCurrentRole())) {
            return ResponseEntity.status(403).build();
        }
        familyService.removeMember(id, userId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "获取家庭组成员列表", description = "获取指定家庭组的所有成员列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取成员列表", 
                    content = @Content(schema = @Schema(implementation = FamilyMemberDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定家庭组不存在")
    })
    @GetMapping("/{id}/members")
    public ResponseEntity<List<FamilyMemberDTO>> getMembers(
            @Parameter(description = "家庭组ID") @PathVariable Long id) {
        return ResponseEntity.ok(familyService.getMembers(id));
    }
} 