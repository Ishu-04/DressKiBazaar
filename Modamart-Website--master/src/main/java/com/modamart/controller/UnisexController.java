package com.modamart.controller;

import com.modamart.entity.Unisex;
import com.modamart.repository.UnisexRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/unisex")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if frontend is hosted elsewhere
public class UnisexController {

    @Autowired
    private UnisexRepository unisexRepository;

    // POST: Insert one product
    @PostMapping
    public Unisex addProduct(@RequestBody Unisex unisex) {
        return unisexRepository.save(unisex);
    }

    // POST: Insert multiple
    @PostMapping("/bulk")
    public List<Unisex> addProducts(@RequestBody List<Unisex> unisexList) {
        return unisexRepository.saveAll(unisexList);
    }

    // GET: All products
    @GetMapping
    public List<Unisex> getAllProducts() {
        return unisexRepository.findAll();
    }

    // GET: One product by ID
    @GetMapping("/{id}")
    public Optional<Unisex> getProductById(@PathVariable int id) {
        return unisexRepository.findById(id);
    }

    // PUT: Update product
    @PutMapping("/{id}")
    public Unisex updateProduct(@PathVariable int id, @RequestBody Unisex updatedUnisex) {
        updatedUnisex.setId(id);
        return unisexRepository.save(updatedUnisex);
    }

    // DELETE: Remove product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        unisexRepository.deleteById(id);
    }
}
