package com.klef.jfsd.loginservice.repositories;


import com.klef.jfsd.loginservice.models.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitorRepo extends JpaRepository<Visitor, Integer> {
    Visitor findVisitorByName(String username);
}
