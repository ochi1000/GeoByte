package com.example.GeoByte.controller;

import java.util.Collections;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GeoByte.dto.LoginDTO;
import com.example.GeoByte.dto.SignUpDTO;
import com.example.GeoByte.model.Role;
import com.example.GeoByte.model.User;
import com.example.GeoByte.repo.RoleRepo;
import com.example.GeoByte.repo.UserRepo;

@RestController
@RequestMapping("/api/auth")
public class UserController {

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody SignUpDTO signUpDTO) {
		//	check if email exists
		if(userRepo.existsByEmail(signUpDTO.getEmail())) {
			return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
		}
		//	create user object
		User userObj = new User();
		userObj.setName(signUpDTO.getName());
		userObj.setEmail(signUpDTO.getEmail());
		
		userObj.setPassword(passwordEncoder.encode(signUpDTO.getPassword()));
		
		Role roles = roleRepo.findByName("admin").get();
		userObj.setRoles(Collections.singleton(roles));	
		
		userRepo.save(userObj);
		
		return new ResponseEntity<>("User is registered successfully", HttpStatus.CREATED);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		return new ResponseEntity<>("User login successful", HttpStatus.OK);
		
	}
	
}
