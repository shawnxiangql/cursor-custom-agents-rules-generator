package com.homeitem.service;

import com.homeitem.model.dto.UserDTO;
import java.util.List;

public interface UserService {
    UserDTO register(UserDTO userDTO);
    String login(String username, String password);
    UserDTO getUserById(Long id);
    UserDTO getUserByUsername(String username);
    List<UserDTO> getAllUsers();
    void deleteUser(Long id);
    UserDTO updateUser(Long id, UserDTO userDTO);
} 