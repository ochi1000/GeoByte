package com.example.GeoByte.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.GeoByte.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}