package com.urbancart.ai.recommendation;

import com.urbancart.ai.products.ProductDto;
import com.urbancart.ai.products.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final AIProvider aiProvider;
    private final ProductRepository productRepository;

    public RecommendationResponse recommend(String query) {
        List<String> keywords = aiProvider.generateKeywords(query);
        List<ProductDto> products = new ArrayList<>();
        if (keywords.isEmpty() && StringUtils.hasText(query)) {
            productRepository.findByTitleContainingIgnoreCase(query, PageRequest.of(0, 10))
                    .forEach(p -> products.add(ProductDto.from(p)));
        } else {
            keywords.forEach(kw -> productRepository.findByTitleContainingIgnoreCase(kw, PageRequest.of(0, 5))
                    .forEach(p -> products.add(ProductDto.from(p))));
        }
        return new RecommendationResponse(products);
    }
}
