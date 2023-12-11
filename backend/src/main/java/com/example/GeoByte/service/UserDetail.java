package com.example.GeoByte.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.GeoByte.model.User;
import com.example.GeoByte.repo.UserRepo;

@Service
public class UserDetail implements UserDetailsService{
	
	private UserRepo userRepo;
	
	public UserDetail (UserRepo userRepo) {
		this.userRepo  = userRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = userRepo.findByEmail(email).orElseThrow(() ->
        new UsernameNotFoundException("User not found"));

		Set<GrantedAuthority> authorities = user
				.getRoles()
				.stream()
				.map((role) -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
		
		return new org.springframework.security.core.userdetails.User(email, user.getPassword(),authorities);
	}
				
		

}
