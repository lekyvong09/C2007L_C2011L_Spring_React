package com.ray.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Column(name="unit_price")
    private BigDecimal unitPrice;

    @Column(name="image_url")
    private String imageUrl;

    private String brand;

    @Column(name="units_in_stock")
    private int unitsInStock;

    @Column(name="date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name="last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    @ManyToOne
    @JoinColumn(name="category_id")
//    @JsonIgnore
    private ProductCategory category;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonIgnore
    private BasketItem basketItem;

    public Product() {
    }

    public Product(String name, String description, BigDecimal unitPrice, String imageUrl, String brand, int unitsInStock, Date dateCreated, Date lastUpdated) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.brand = brand;
        this.unitsInStock = unitsInStock;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", unitPrice=" + unitPrice +
                ", imageUrl='" + imageUrl + '\'' +
                ", brand='" + brand + '\'' +
                ", unitsInStock=" + unitsInStock +
                ", dateCreated=" + dateCreated +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}
