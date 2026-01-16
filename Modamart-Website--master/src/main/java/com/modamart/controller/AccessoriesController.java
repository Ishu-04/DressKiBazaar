package com.modamart.controller;

import com.modamart.entity.Accessories;
import com.modamart.repository.AccessoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accessories")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if frontend URL is different
public class AccessoriesController {

    @Autowired
    private AccessoriesRepository accessoriesRepository;

    // ✅ POST: Insert one accessory
    @PostMapping
    public Accessories addAccessory(@RequestBody Accessories accessory) {
        return accessoriesRepository.save(accessory);
    }

    // ✅ GET: All accessories
    @GetMapping
    public List<Accessories> getAllAccessories() {
        return accessoriesRepository.findAll();
    }

    // ✅ GET: One accessory by ID
    @GetMapping("/{id}")
    public Optional<Accessories> getAccessoryById(@PathVariable Long id) {
        return accessoriesRepository.findById(id);
    }

    // ✅ PUT: Update accessory by ID
    @PutMapping("/{id}")
    public Accessories updateAccessory(@PathVariable int id, @RequestBody Accessories updatedAccessory) {
        updatedAccessory.setId(id);
        return accessoriesRepository.save(updatedAccessory);
    }

    // ✅ DELETE: Remove accessory by ID
    @DeleteMapping("/{id}")
    public void deleteAccessory(@PathVariable Long id) {
        accessoriesRepository.deleteById(id);
    }
}