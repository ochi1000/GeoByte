package com.example.GeoByte;

import com.example.GeoByte.model.Location;
import com.example.GeoByte.model.Role;
import com.example.GeoByte.model.User;
import com.example.GeoByte.repo.LocationRepo;
import com.example.GeoByte.repo.RoleRepo;
import com.example.GeoByte.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

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
	@Bean
	public CommandLineRunner demo(RoleRepo roleRepo, UserRepo userRepo, LocationRepo locationRepo) {
		return (args)-> {
			Role role = new Role();
			role.setName("admin");
			roleRepo.save(role);

			User user = new User();
			user.setName("admin");
			user.setEmail("admin");
			user.setPassword("hello");
			userRepo.save(user);

			Location location = new Location();
			location.setName("H-Medix");
			location.setLongitude("7.477035798153819");
			location.setLatitude("9.076902275965697");
			location.setCost(50);
			locationRepo.save(location);

			Location location1 = new Location();
			location1.setName("Galaxy Pizza");
			location1.setLongitude("7.478545382294034");
			location1.setLatitude("9.071711909630515");
			location1.setCost(40);
			locationRepo.save(location1);

			Location location2 = new Location();
			location2.setName("Blue Haven Residence");
			location2.setLongitude("7.436383901000763");
			location2.setLatitude("9.127453727604028");
			location2.setCost(30);
			locationRepo.save(location2);

			Location location3 = new Location();
			location3.setName("Nizamiye Hospital");
			location3.setLongitude("7.390923705367082");
			location3.setLatitude("9.062509882248305");
			location3.setCost(60);
			locationRepo.save(location3);

			Location location4 = new Location();
			location4.setName("Jabi Park");
			location4.setLongitude("7.432317190517185");
			location4.setLatitude("9.058924182696892");
			location4.setCost(80);
			locationRepo.save(location4);

			Location location5 = new Location();
			location5.setName("Wuse Market");
			location5.setLongitude("7.465141495147523");
			location5.setLatitude("9.072979920601444");
			location5.setCost(50);
			locationRepo.save(location5);

		};
	}


}
