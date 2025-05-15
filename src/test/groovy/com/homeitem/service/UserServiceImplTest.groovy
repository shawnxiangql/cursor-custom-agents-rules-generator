package com.homeitem.service

import com.homeitem.model.User
import com.homeitem.model.dto.UserDTO
import com.homeitem.repository.UserRepository
import com.homeitem.service.impl.UserServiceImpl
import com.homeitem.util.JwtUtil
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import spock.lang.Specification

class UserServiceImplTest extends Specification {
    def userRepository = Mock(UserRepository)
    def jwtUtil = Mock(JwtUtil)
    def userService = new UserServiceImpl(userRepository: userRepository, jwtUtil: jwtUtil)

    def "注册新用户成功"() {
        given:
        def dto = new UserDTO(username: 'test', password: '123456', role: 'BASIC')
        userRepository.findByUsername('test') >> Optional.empty()
        userRepository.save(_) >> { User u -> u }

        when:
        def result = userService.register(dto)

        then:
        result.username == 'test'
        new BCryptPasswordEncoder().matches('123456', result.password)
    }

    def "注册已存在用户名抛异常"() {
        given:
        def dto = new UserDTO(username: 'test', password: '123456', role: 'BASIC')
        userRepository.findByUsername('test') >> Optional.of(new User())

        when:
        userService.register(dto)

        then:
        thrown(RuntimeException)
    }

    def "登录成功返回token"() {
        given:
        def rawPwd = '123456'
        def encodedPwd = new BCryptPasswordEncoder().encode(rawPwd)
        def user = new User(username: 'test', password: encodedPwd, role: 'BASIC')
        userRepository.findByUsername('test') >> Optional.of(user)
        jwtUtil.generateToken('test', 'BASIC') >> 'token123'

        expect:
        userService.login('test', rawPwd) == 'token123'
    }

    def "登录失败抛异常"() {
        given:
        userRepository.findByUsername('test') >> Optional.empty()

        when:
        userService.login('test', 'wrong')

        then:
        thrown(RuntimeException)
    }
} 