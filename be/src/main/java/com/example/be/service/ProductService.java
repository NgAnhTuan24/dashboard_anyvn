package com.example.be.service;

import com.example.be.dto.ProductRequest;
import com.example.be.dto.ProductResponse;
import com.example.be.entity.Product;
import com.example.be.mapper.ProductMapper;
import com.example.be.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductResponse createProduct(ProductRequest request) {

        if (productRepository.existsByProductID(request.getProductID())) {
            throw new RuntimeException("Product ID đã tồn tại");
        }

        Product product = ProductMapper.toEntity(request);

        if (request.getQuantity() == 0) {
            product.setStatus(Product.Status.OUT_OF_STOCK);
        } else {
            product.setStatus(Product.Status.ACTIVE);
        }

        Product saved = productRepository.save(product);

        return ProductMapper.toDTO(saved);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

//        product.setProductID(request.getProductID());
        product.setImageUrl(request.getImageUrl());
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());

        if (request.getStatus() != null) {
            product.setStatus(request.getStatus());
        }

        if (request.getStatus() == null) {
            if (product.getQuantity() == 0) {
                product.setStatus(Product.Status.OUT_OF_STOCK);
            } else {
                product.setStatus(Product.Status.ACTIVE);
            }
        }

        return ProductMapper.toDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        productRepository.delete(product);
    }
}
