package com.homeitem.service.impl;

import com.homeitem.model.User;
import com.homeitem.model.dto.UserDTO;
import com.homeitem.repository.UserRepository;
import com.homeitem.service.UserService;
import com.homeitem.util.JwtUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        BeanUtils.copyProperties(user, dto);
        return dto;
    }

    private User toEntity(UserDTO dto) {
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        return user;
    }

    @Override
    public UserDTO register(UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new RuntimeException("用户名已存在");
        }
        User user = toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User saved = userRepository.save(user);
        return toDTO(saved);
    }

    @Override
    public String login(String username, String password) {
        Optional<User> optional = userRepository.findByUsername(username);
        if (optional.isPresent() && passwordEncoder.matches(password, optional.get().getPassword())) {
            User user = optional.get();
            return jwtUtil.generateToken(user.getUsername(), user.getRole());
        }
        throw new RuntimeException("用户名或密码错误");
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        return userRepository.findByUsername(username).map(this::toDTO).orElse(null);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        Optional<User> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            User user = optional.get();
            BeanUtils.copyProperties(userDTO, user, "id", "createdAt", "password");
            User updated = userRepository.save(user);
            return toDTO(updated);
        }
        throw new RuntimeException("用户不存在");
    }
} 