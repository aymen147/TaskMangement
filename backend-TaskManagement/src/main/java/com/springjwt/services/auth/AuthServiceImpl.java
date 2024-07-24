package com.springjwt.services.auth;

import com.springjwt.dto.SignupDTO;
import com.springjwt.dto.UserDTO;
import com.springjwt.entities.Role;
import com.springjwt.entities.RoleName;
import com.springjwt.entities.User;
import com.springjwt.repositories.RoleRepository;
import com.springjwt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setUsername(signupDTO.getUsername());
        user.setEmail(signupDTO.getEmail());
        Role role;
        role = roleRepository.findByName(RoleName.ROLE_DEVELOPPEUR);
        user.getRoles().add(role);
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setUsername(createdUser.getUsername());
        return userDTO;
    }
}
