package com.example.GeoByte.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.GeoByte.model.Role;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}