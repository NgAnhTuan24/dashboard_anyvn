package com.example.be.mapper;

import com.example.be.dto.ProductRequest;
import com.example.be.dto.ProductResponse;
import com.example.be.entity.Product;

public class ProductMapper {

    public static Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setProductID(request.getProductID());
        product.setImageUrl(request.getImageUrl());
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        return product;
    }

    public static ProductResponse toDTO(Product product) {
        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setProductID(product.getProductID());
        response.setImageUrl(product.getImageUrl());
        response.setProductName(product.getProductName());
        response.setPrice(product.getPrice());
        response.setQuantity(product.getQuantity());
        response.setDescription(product.getDescription());
        response.setStatus(product.getStatus());
        return response;
    }
}