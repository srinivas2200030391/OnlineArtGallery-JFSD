package com.klef.jfsd.loginservice.repositories;

import com.klef.jfsd.loginservice.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {
    Admin findAdminByUsername(String username);
}
