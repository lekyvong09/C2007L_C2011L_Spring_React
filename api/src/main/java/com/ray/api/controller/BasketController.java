package com.ray.api.controller;

import com.ray.api.dao.BasketRepository;
import com.ray.api.dao.ProductRepository;
import com.ray.api.dto.BasketDto;
import com.ray.api.dto.BasketItemDto;
import com.ray.api.entity.Basket;
import com.ray.api.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/baskets")
@CrossOrigin("http://localhost:3000")
public class BasketController {
    private final BasketRepository basketRepository;
    private final ProductRepository productRepository;

    @Autowired
    public BasketController(BasketRepository basketRepository, ProductRepository productRepository) {
        this.basketRepository = basketRepository;
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<BasketDto> getBasket(@CookieValue(name = "buyerId", defaultValue = "") String buyerId) {
        List<Basket> basketList = basketRepository.findByBuyerId(buyerId);

        if (basketList.isEmpty())
            throw new NoResultException("Cannot find the basket");

        List<BasketItemDto> basketItemDtoList = basketList.get(0).getBasketItems().stream().map(item -> new BasketItemDto(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getUnitPrice(),
                item.getProduct().getImageUrl(),
                item.getProduct().getBrand(),
                item.getProduct().getCategory().getCategoryName(),
                item.getQuantity()
        )).collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(basketList.get(0).getId());
        basketDto.setBuyerId(basketList.get(0).getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);

        return new ResponseEntity<>(basketDto, HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<BasketDto> addItemToBasket(@RequestParam("productId") Long productId,
                                                  @RequestParam("quantity") int quantity,
                                                  @CookieValue(name = "buyerId", defaultValue = "") String buyerId,
                                                  HttpServletResponse response) {
        Product product = productRepository.findById(productId).get();

        List<Basket> basketList = basketRepository.findByBuyerId(buyerId);

        Basket basket;
        if (basketList == null || basketList.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            buyerId = uuid.toString();
            basket = new Basket(buyerId);
            Cookie cookie = new Cookie("buyerId", buyerId);
            cookie.setMaxAge(30 * 24 * 60 * 60); /// expire in 30 days
            cookie.setPath("/");
            response.addCookie(cookie);
        } else {
            basket = basketList.get(0);
        }

        basket.addItem(product, quantity);
        Basket returnBasket = basketRepository.save(basket);

        /**
         * Transform to basketDTO
         */
        List<BasketItemDto> basketItemDtoList = returnBasket.getBasketItems().stream().map(item -> new BasketItemDto(
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getProduct().getUnitPrice(),
                item.getProduct().getImageUrl(),
                item.getProduct().getBrand(),
                item.getProduct().getCategory().getCategoryName(),
                item.getQuantity()
        )).collect(Collectors.toList());

        BasketDto basketDto = new BasketDto();
        basketDto.setId(returnBasket.getId());
        basketDto.setBuyerId(returnBasket.getBuyerId());
        basketDto.setBasketItems(basketItemDtoList);

        return new ResponseEntity<>(basketDto, HttpStatus.OK);
    }
}
