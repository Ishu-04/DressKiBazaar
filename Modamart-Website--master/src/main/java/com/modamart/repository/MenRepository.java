package com.modamart.repository;

import com.modamart.entity.Men;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenRepository extends JpaRepository<Men, Integer> {
}