package com.muebles.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
import com.muebles.entity.Sale;
import com.muebles.entity.SaleDetail;
import com.muebles.repository.SaleDetailRepository;
import com.muebles.service.SaleService;

@RestController
@RequestMapping(path="venta")
@CrossOrigin(origins="http://localhost:5173/", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SaleController {

	@Autowired
	SaleService ss;
	
	@Autowired
	SaleDetailRepository sdr;
	
	@GetMapping(path="listar")
	public Map<String, Object> listar() {
		
		Map<String, Object> result=new HashMap<>();
		
		result.put("ok", true);
		result.put("size", ss.listar().size());
		result.put("list", ss.listar());
		
		return result;
	}
	
	@GetMapping(path="listarDetalle")
	public Map<String, Object> listarDetalles() {
		
		Map<String, Object> result=new HashMap<>();
		
		List<SaleDetail> details=new ArrayList<SaleDetail>();
		sdr.findAll().forEach(details::add);
		
		result.put("ok", true);
		result.put("size", details.size());
		result.put("list", details);
		
		return result;
	} 
	
	@GetMapping(path="buscar/{id}")
	public Map<String, Object> buscarPorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("sale", ss.buscarPorId(id));
		
		return map;
	}
	
	@GetMapping(path="buscarDetalle/{id}")
	public Map<String, Object> buscarDetallePorId(@PathVariable Integer id){
		Map<String, Object> map=new HashMap<>();
		
		Optional<SaleDetail> detail=sdr.findById(id);
		
		if(detail.isPresent()) {
			map.put("ok", true);
			map.put("detail", detail.get());
		}else {
			throw new RuntimeException("No se encontro el detalle de la venta con ID: " + id);
		}
		
		return map;
	}
	
	@GetMapping(path="buscarPorFechaPaginado")
	public Map<String, Object> buscarPorFechaPaginado(@RequestParam LocalDate q, Pageable pageable){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("size", ss.buscarPorFechaPaginado(q, pageable).size());
		map.put("list", ss.buscarPorFechaPaginado(q, pageable));
		
		return map;
	}
	
	@GetMapping(path="buscarPorIdCliente")
	public Map<String, Object> buscarPorIdCliente(@RequestParam Integer q){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("size", ss.buscarPorIdCliente(q).size());
		map.put("list", ss.buscarPorIdCliente(q));
		
		return map;
	}
	
	@GetMapping(path="buscarPorIdUsuario")
	public Map<String, Object> buscarPorIdUsuario(@RequestParam Integer q){
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("size", ss.buscarPorIdUsuario(q).size());
		map.put("list", ss.buscarPorIdUsuario(q));
		
		return map;
	}
	
	@PostMapping(path="guardar")
	public Map<String, Object> guardar(@RequestBody Sale sale) {
		Map<String, Object> map=new HashMap<>();
		
		map.put("ok", true);
		map.put("added", ss.guardar(sale));
		
		return map;
	}
	
	@PostMapping(path="guardarDetalle")
	public Map<String, Object> guardarDetalle(@RequestBody List<SaleDetail> saleDetails) {
		Map<String, Object> map=new HashMap<>();
		
		for(SaleDetail d:saleDetails) {
			sdr.save(d);
		}
		
		map.put("ok", true);
		map.put("added", saleDetails);
		
		return map;
	}
	
	@DeleteMapping(path="eliminar/{id}")
	public Map<String, Object> eliminar(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0;
		
		for(Sale s:ss.listar()) {
			if(s.getId_sale()==id) {
				sw=1;
				break;
			}
		}
		
		if(sw==1) {
			ss.eliminar(id);
			map.put("message", "Registro de ID "+id+" de venta eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@DeleteMapping(path="eliminarDetalle/{id}")
	public Map<String, Object> eliminarDetalle(@PathVariable Integer id) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		int sw=0,subtotal=0,total=0;
		
		Sale venta=new Sale();
		
		for(SaleDetail d:sdr.findAll()) {
			if(d.getId_saledetail().equals(id)) {
				sw=1;
				subtotal=d.getSubtotal();
				venta=d.getSale();
				break;
			}
		}
		
		if(sw==1) {
			total=venta.getTotal()-subtotal;
			
			venta.setTotal(total);
			ss.guardar(venta);
			
			sdr.deleteById(id);
			map.put("message", "Registro de ID "+id+" de detalle eliminado.");
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
	@PutMapping(path="modificar/{id}")
	public Map<String, Object> modificar(@PathVariable Integer id, @RequestBody Sale sale) {
		
		Map<String, Object> map=new HashMap<>();
		map.put("ok", true);
		
		Sale existingSale=ss.buscarPorId(id);
		
		if(existingSale!=null) {
			sale.setId_sale(id);
			map.put("modify", ss.guardar(sale));
		}else {
			map.put("message", "Registro de ID "+id+" no existe.");
		}
		
		return map;
	}
	
}
