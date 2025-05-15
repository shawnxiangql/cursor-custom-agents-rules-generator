package com.homeitem.controller;

import com.homeitem.model.dto.UserDTO;
import com.homeitem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@Tag(name = "用户管理", description = "用户信息管理相关API")
@RestController
@RequestMapping("/api/users")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "获取当前登录用户信息", description = "根据JWT令牌获取当前用户的详细信息")
    @ApiResponse(responseCode = "200", description = "成功获取用户信息", 
                content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (String) auth.getPrincipal();
        UserDTO user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "获取指定用户信息", description = "根据用户ID获取用户的详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "成功获取用户信息", 
                    content = @Content(schema = @Schema(implementation = UserDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定用户不存在")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(
            @Parameter(description = "用户ID") @PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        if (user == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "获取所有用户", description = "获取系统中所有用户的列表（需要管理员权限）")
    @ApiResponse(responseCode = "200", description = "成功获取用户列表", 
                content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(summary = "更新用户信息", description = "根据ID更新指定用户的信息（需要本人或管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "用户信息更新成功", 
                    content = @Content(schema = @Schema(implementation = UserDTO.class))),
        @ApiResponse(responseCode = "404", description = "指定用户不存在"),
        @ApiResponse(responseCode = "403", description = "无权限修改该用户信息")
    })
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
            @Parameter(description = "用户ID") @PathVariable Long id, 
            @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    @Operation(summary = "删除用户", description = "根据ID删除指定用户（需要管理员权限）")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "用户删除成功"),
        @ApiResponse(responseCode = "404", description = "指定用户不存在"),
        @ApiResponse(responseCode = "403", description = "无权限删除该用户")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "用户ID") @PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
} 