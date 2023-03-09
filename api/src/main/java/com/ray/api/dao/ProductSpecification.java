package com.ray.api.dao;

import com.ray.api.entity.Product;
import com.ray.api.entity.ProductCategory;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    public static Specification<Product> searchByName(String name) {
        /// where name like %variableName%
        return (root, query, criteriaBuilder) ->
                name.equals("all")
                        ? criteriaBuilder.conjunction()
                        : criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> filterByBrand(String inputBrandList) {
        return (root, query, criteriaBuilder) -> {
            if (inputBrandList.equals("all")) {
                return criteriaBuilder.conjunction();
            } else {
                String[] brandList = inputBrandList.split(",", -1);
                List<Predicate> predicateList = new ArrayList<>();
                for (String b : brandList) {
                    predicateList.add(criteriaBuilder.equal(root.get("brand"), b.trim()));
                }
                return criteriaBuilder.or(predicateList.toArray(new Predicate[0]));
            }
        };
    }

    public static Specification<Product> filterByCategoryId(String categoryList) {
        /// select * from product join category on product.category_id = category.category_id having category.category_id = variable_category_id
        return (root, query, criteriaBuilder) -> {
            if (categoryList.equals("all")) {
                return criteriaBuilder.conjunction();
            } else {
                Join<Product, ProductCategory> productCategory = root.join("category");
                String[] categoryIdList = categoryList.split(",", -1);

                List<Predicate> predicateList = new ArrayList<>();
                for (String categoryId : categoryIdList) {
                    predicateList.add(criteriaBuilder.equal(productCategory.get("id"), Integer.parseInt(categoryId.trim())));
                }
                return criteriaBuilder.or(predicateList.toArray(new Predicate[0]));
            }
        };
    }
}
