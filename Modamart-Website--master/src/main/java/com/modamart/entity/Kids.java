package com.modamart.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "kids_products")
public class Kids {

    @Id
    private int id;
    private String title;
    private String category;
    private String subCategory;
    private int price;
    private String size;
    private String color;
    private String pattern;
    private String occasion;
    private String embellishment;
    private String imageName;


    public Kids() {
    }

    public Kids(int id, String title, String category, String subCategory, int price, String size, String color,
                String pattern, String occasion, String embellishment, String imageName) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.subCategory = subCategory;
        this.price = price;
        this.size = size;
        this.color = color;
        this.pattern = pattern;
        this.occasion = occasion;
        this.embellishment = embellishment;
        this.imageName = imageName;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSubCategory() {
        return subCategory;
    }

    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String getOccasion() {
        return occasion;
    }

    public void setOccasion(String occasion) {
        this.occasion = occasion;
    }

    public String getEmbellishment() {
        return embellishment;
    }

    public void setEmbellishment(String embellishment) {
        this.embellishment = embellishment;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
}