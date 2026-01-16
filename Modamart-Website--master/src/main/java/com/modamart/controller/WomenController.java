package com.modamart.controller;

import com.modamart.entity.Women;
import com.modamart.repository.WomenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/women")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class WomenController {

    @Autowired
    private WomenRepository womenRepository;

    // ✅ POST: Add single product
    @PostMapping
    public Women addProduct(@RequestBody Women women) {
        return womenRepository.save(women);
    }

    // ✅ POST: Add multiple products
    @PostMapping("/bulk")
    public List<Women> addProducts(@RequestBody List<Women> womenList) {
        return womenRepository.saveAll(womenList);
    }

    // ✅ GET: Get all products
    @GetMapping
    public List<Women> getAllProducts() {
        return womenRepository.findAll();
    }

    // ✅ GET: Get product by ID
    @GetMapping("/{id}")
    public Optional<Women> getProductById(@PathVariable int id) {
        return womenRepository.findById(id);
    }

    // ✅ PUT: Update product
    @PutMapping("/{id}")
    public Women updateProduct(@PathVariable int id, @RequestBody Women updatedWomen) {
        updatedWomen.setId(id);
        return womenRepository.save(updatedWomen);
    }

    // ✅ DELETE: Delete product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        womenRepository.deleteById(id);
    }
}