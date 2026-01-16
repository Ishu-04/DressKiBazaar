package com.modamart.controller;

import com.modamart.entity.Men;
import com.modamart.repository.MenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/men")
@CrossOrigin(origins = "http://localhost:5173") // frontend allowed
public class MenController {

    @Autowired
    private MenRepository menRepository;

    // ✅ POST: Insert one product
    @PostMapping
    public Men addProduct(@RequestBody Men men) {
        return menRepository.save(men);
    }

    // ✅ POST: Insert multiple products at once
    @PostMapping("/bulk")
    public List<Men> addProducts(@RequestBody List<Men> menList) {
        return menRepository.saveAll(menList);
    }

    // ✅ GET: All products
    @GetMapping
    public List<Men> getAllProducts() {
        return menRepository.findAll();
    }

    // ✅ GET: One by ID
    @GetMapping("/{id}")
    public Optional<Men> getProductById(@PathVariable int id) {
        return menRepository.findById(id);
    }

    // ✅ PUT: Update product
    @PutMapping("/{id}")
    public Men updateProduct(@PathVariable int id, @RequestBody Men updatedMen) {
        updatedMen.setId(id);
        return menRepository.save(updatedMen);
    }

    // ✅ DELETE: Remove product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable int id) {
        menRepository.deleteById(id);
    }
}
