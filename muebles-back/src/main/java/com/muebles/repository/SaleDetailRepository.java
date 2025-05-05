package com.muebles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.muebles.entity.SaleDetail;

public interface SaleDetailRepository extends CrudRepository<SaleDetail, Integer>, PagingAndSortingRepository<SaleDetail, Integer>{

}
