package com.muebles.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.muebles.entity.Customer;
import com.muebles.service.CustomerService;

@RestController
@RequestMapping(path="cliente")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CustomerController {

	@Autowired
	CustomerService cs;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", cs.listar().size());
		result.put("list", cs.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("customer", cs.buscarPorId(id));
		
		return map;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Customer customer) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", cs.guardar(customer));
		
		return map;
	}
	
	@GetMapping(path="buscarPorClientePaginado")
	public Map<String, Object> buscarPorClientePaginado(@RequestParam(required = false) String q, @RequestParam(required = false) String q2, Pageable pageable){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", cs.buscarPorClientePaginado("%"+q+"%", "%"+q2+"%", pageable).size());
		result.put("list", cs.buscarPorClientePaginado("%"+q+"%", "%"+q2+"%", pageable));
		
		return result;
	}
	
	@GetMapping(path="buscarPorEmail")
	public Map<String, Object> buscarPorEmail(@RequestParam(required = false) String q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", cs.buscarPorEmail("%"+q+"%").size());
		result.put("list", cs.buscarPorEmail("%"+q+"%"));
		
		return result;
	}
	
	@GetMapping(path="buscarPorTelefono")
	public Map<String, Object> buscarPorTelefono(@RequestParam(required = false) String q){
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", cs.buscarPorTelefono("%"+q+"%").size());
		result.put("list", cs.buscarPorTelefono("%"+q+"%"));
		
		return result;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Customer c:cs.listar()) {
			if(c.getId_customer()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			cs.eliminar(id);
			map.put("message", "Registro de ID "+id+" de cliente eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Customer customer) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Customer existingCustomer=cs.buscarPorId(id);
		
		if(existingCustomer!=null) {
			customer.setId_customer(id);
			map.put("modify", cs.guardar(customer));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
}
