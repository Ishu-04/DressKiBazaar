package com.modamart.repository;

import com.modamart.entity.Accessories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessoriesRepository extends JpaRepository<Accessories, Long> {
    // You can add custom query methods here if needed
}