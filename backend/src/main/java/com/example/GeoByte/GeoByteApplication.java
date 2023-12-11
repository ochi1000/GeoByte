package com.example.GeoByte;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GeoByteApplication {

	public static void main(String[] args) {
		SpringApplication.run(GeoByteApplication.class, args);
	}
	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	    http.authorizeHttpRequests(authorizeRequests -> authorizeRequests.anyRequest()
//	      .permitAll());
//	    return http.build();
//	}
//	@Bean
//	public CommandLineRunner demo(RoleRepo roleRepo, UserRepo userRepo) {
//		return (arg)-> {
//			Role role = new Role();
//			role.setName("ADMIN_ROLE");
//			roleRepo.save(role);
//			
//			User user = new User();
//			user.setName("admin");
//			user.setEmail("admin");
//			user.setPassword("hello");
//			userRepo.save(user);
//		};
//	}


}
