//package com.modamart.controller;
//
//import com.modamart.dto.LoginRequest;
//import com.modamart.dto.SignupRequest;
//import com.modamart.entity.User;
//import com.modamart.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    // ✅ Signup
//    @PostMapping("/signup")
//    public ResponseEntity<String> signup(@RequestBody SignupRequest signupRequest) {
//        User existingUser = userService.getUserByEmail(signupRequest.getEmail());
//        if (existingUser != null) {
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
//        }
//
//        User newUser = new User();
//        newUser.setEmail(signupRequest.getEmail());
//        newUser.setFullName(signupRequest.getFullName());
//        newUser.setPassword(signupRequest.getPassword());
//
//        userService.saveUser(newUser);
//
//        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
//    }
//
//    // ✅ Login
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
//        User existingUser = userService.getUserByEmail(loginRequest.getEmail());
//
//        if (existingUser == null || !userService.getPasswordEncoder().matches(
//                loginRequest.getPassword(), existingUser.getPassword())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
//        }
//
//        return ResponseEntity.ok("Login successful");
//    }
//
//    // ✅ Get User by Email
//    @GetMapping("/user/{email}")
//    public ResponseEntity<User> getUser(@PathVariable String email) {
//        User user = userService.getUserByEmail(email);
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//        return ResponseEntity.ok(user);
//    }
//
//    // ✅ Update User
//    @PutMapping("/user/{email}")
//    public ResponseEntity<String> updateUser(@PathVariable String email, @RequestBody SignupRequest updatedData) {
//        User updated = userService.updateUser(email, updatedData);
//        if (updated == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//        return ResponseEntity.ok("User updated successfully");
//    }
//
//    // ✅ Delete User
//    @DeleteMapping("/user/{email}")
//    public ResponseEntity<String> deleteUser(@PathVariable String email) {
//        boolean deleted = userService.deleteUser(email);
//        if (!deleted) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//        return ResponseEntity.ok("User deleted successfully");
//    }
//}









package com.modamart.controller;

import com.modamart.entity.User;
import com.modamart.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Adjust as needed
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    private  BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody Map<String, String> userData) {
        String email = userData.get("email");
        String password = userData.get("password");
        String fullName = userData.get("fullName");

        Map<String, String> response = new HashMap<>();

        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            response.put("message", "User already exists");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        User newUser = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password)) // NOTE: Plaintext for now; ideally hash this
                .fullName(fullName)
                .build();

        userRepository.save(newUser);

        response.put("message", "User registered successfully");
        response.put("email", email);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Map<String, String> response = new HashMap<>();

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(password,user.getPassword())) {
            response.put("message", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("message", "Login successful");
        response.put("email", email);
        return ResponseEntity.ok(response);
    }
}