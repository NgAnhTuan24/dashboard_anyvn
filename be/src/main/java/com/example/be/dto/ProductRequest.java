package com.example.be.dto;

import com.example.be.entity.Product;

public class ProductRequest {

    private String productID;
    private String imageUrl;
    private String productName;
    private Double price;
    private int quantity;
    private Product.Status status;

    public String getProductID() {
        return productID;
    }

    public void setProductID(String productID) {
        this.productID = productID;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product.Status getStatus() {
        return status;
    }

    public void setStatus(Product.Status status) {
        this.status = status;
    }
}
