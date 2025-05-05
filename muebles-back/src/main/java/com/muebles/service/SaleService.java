package com.muebles.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.muebles.entity.Sale;
import com.muebles.repository.SaleRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

@Service
public class SaleService {

	@Autowired
	SaleRepository sr;
	
	ValidatorFactory factory=Validation.buildDefaultValidatorFactory();
	Validator validator=factory.getValidator();
	
	public List<Sale> listar(){
		List<Sale> result=new ArrayList<Sale>();
		
		sr.findAll().forEach(result::add);
		
		return result;
	}
	
	public Sale buscarPorId(Integer id) {
		
		Optional<Sale> sale=sr.findById(id);
		
		if(sale.isPresent()) {
			return sale.get();
		}else {
			throw new RuntimeException("No se encontro la venta con ID: " + id);
		}
		
	}
	
	public Sale guardar(Sale sale) {
		Set<ConstraintViolation<Sale>> violations=validator.validate(sale);
		
		String errorValidation="";
		for(ConstraintViolation<Sale> cv:violations) {
			errorValidation+="Error "+cv.getPropertyPath()+" "+cv.getMessage();
		}
		
		if(!violations.isEmpty()) {
			throw new RuntimeException(errorValidation);
		}
		return sr.save(sale);
	}
	
	public void eliminar(Integer id) {
		sr.deleteById(id);
	}
	
	public List<Sale> buscarPorFechaPaginado(LocalDate date, Pageable pageable){
		
		return sr.findByDate(date, pageable);
	}
	
	public List<Sale> buscarPorIdCliente(Integer idCustomer){
		
		return sr.findByIdCustomer(idCustomer);
	}
	
	public List<Sale> buscarPorIdUsuario(Integer idUser){
		
		return sr.findByIdUser(idUser);
	}
	
}
