package com.muebles.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.muebles.entity.Type;
import com.muebles.service.TypeService;

@RestController
@RequestMapping(path="tipo")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class TypeController {

	@Autowired
	TypeService ts;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ts.listar().size());
		result.put("list", ts.listar());
		
		return result;
	}
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("type", ts.buscarPorId(id));
		
		return map;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Type type) {
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		map.put("added", ts.guardar(type));
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Type t:ts.listar()) {
			if(t.getId_type()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			ts.eliminar(id);
			map.put("message", "Registro de ID "+id+" de tipo eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Type type) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Type existingType=ts.buscarPorId(id);
		
		if(existingType!=null) {
			type.setId_type(id);
			map.put("modify", ts.guardar(type));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
}
