package com.modamart.controller;

import com.modamart.entity.Kids;
import com.modamart.repository.KidsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kids")
@CrossOrigin(origins = "http://localhost:5173") // frontend allowed
public class KidsController {

    @Autowired
    private KidsRepository kidsRepository;

    // ✅ POST: Insert one product
    @PostMapping
    public Kids addProduct(@RequestBody Kids kids) {
        return kidsRepository.save(kids);
    }

    // ✅ POST: Insert multiple products at once
    @PostMapping("/bulk")
    public List<Kids> addProducts(@RequestBody List<Kids> kidsList) {
        return kidsRepository.saveAll(kidsList);
    }

    // ✅ GET: All products
    @GetMapping
    public List<Kids> getAllProducts() {
        return kidsRepository.findAll();
    }

    // ✅ GET: One by ID
    @GetMapping("/{id}")
    public Optional<Kids> getProductById(@PathVariable int id) {
        return kidsRepository.findById(id);
    }

    // ✅ PUT: Update product
    @PutMapping("/{id}")
    public Kids updateProduct(@PathVariable int id, @RequestBody Kids updatedKids) {
        updatedKids.setId(id);
        return kidsRepository.save(updatedKids);
    }

    // ✅ DELETE: Remove product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        kidsRepository.deleteById(id);
    }
}