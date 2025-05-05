package com.muebles.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import com.muebles.entity.Payment;

public interface PaymentRepository extends CrudRepository<Payment, Integer>, PagingAndSortingRepository<Payment, Integer>{

}
