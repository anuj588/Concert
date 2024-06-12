package com.concert.services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.concert.dtos.SearchDTO;
import com.concert.models.Shows;

@Component
public class SearchSpecification {

	public Specification<Shows> getfilteredShows(SearchDTO dto) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (dto.getDate() != null) {
                predicates.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get("fromDate"), dto.getDate()),
                		criteriaBuilder.greaterThanOrEqualTo(root.get("toDate"), dto.getDate())));
            }
            if (dto.getConcertName() != null && !dto.getConcertName().isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("concert").get("concertName")),
                        "%" + dto.getConcertName().toLowerCase() + "%"));
            }
            if (dto.getHallId()>0) {
                predicates.add(criteriaBuilder.equal(root.get("hall"), dto.getHallId()));
            }
            if (dto.getSlot()>0) {
                predicates.add(criteriaBuilder.equal(root.get("slot"), dto.getSlot()));
            }
            query.orderBy(criteriaBuilder.desc(root.get("showId")));
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
