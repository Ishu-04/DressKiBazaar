package com.modamart.repository;

import com.modamart.entity.Women;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WomenRepository extends JpaRepository<Women, Integer> {
}