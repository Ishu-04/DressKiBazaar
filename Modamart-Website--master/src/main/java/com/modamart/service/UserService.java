//package com.modamart.service;
//
//import com.modamart.entity.User;
//import com.modamart.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import java.util.Optional;
//
//@Service
//public class UserService implements UserDetailsService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    public User saveUser(User user) {
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        return userRepository.save(user);
//    }
//
//    public User getUserByEmail(String email) {
//        Optional<User> user = userRepository.findByEmail(email);
//        return user.orElse(null);
//    }
//
//    public PasswordEncoder getPasswordEncoder() {
//        return passwordEncoder;
//    }
//
//    // This is needed by Spring Security to load users
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = getUserByEmail(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with email: " + username);
//        }
//
//        // Convert your User entity to Spring Security's UserDetails
//        return org.springframework.security.core.userdetails.User
//                .withUsername(user.getEmail())
//                .password(user.getPassword())
//                .authorities("USER") // or get roles from your User entity if you have
//                .build();
//    }
//}





package com.modamart.service;

import com.modamart.dto.SignupRequest;
import com.modamart.entity.User;
import com.modamart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Save new user
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ Get user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // ✅ Update user
    public User updateUser(String email, SignupRequest updatedData) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();
        user.setFullName(updatedData.getFullName());
        user.setPassword(passwordEncoder.encode(updatedData.getPassword()));

        return userRepository.save(user);
    }

    // ✅ Delete user
    public boolean deleteUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) return false;

        userRepository.delete(userOptional.get());
        return true;
    }

    // ✅ For Spring Security
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }

    public PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }
}