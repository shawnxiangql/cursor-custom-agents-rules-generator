package com.homeitem.controller;

import com.homeitem.model.dto.UserDTO;
import com.homeitem.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "用户认证", description = "用户注册登录相关接口")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @Operation(summary = "用户注册", description = "创建新用户账号，返回创建成功的用户信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "注册成功", 
                    content = @Content(schema = @Schema(implementation = UserDTO.class))),
        @ApiResponse(responseCode = "400", description = "用户名已存在或请求参数无效")
    })
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.register(userDTO));
    }

    @PostMapping("/login")
    @Operation(summary = "用户登录", description = "验证用户凭据并返回JWT令牌")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "登录成功，返回JWT令牌", 
                    content = @Content(schema = @Schema(type = "string", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."))),
        @ApiResponse(responseCode = "401", description = "用户名或密码错误")
    })
    public ResponseEntity<String> login(@RequestBody UserDTO userDTO) {
        String token = userService.login(userDTO.getUsername(), userDTO.getPassword());
        return ResponseEntity.ok(token);
    }
} 