package com.google.codeu.servlets;

import com.google.codeu.data.Clinic;
import com.google.gson.Gson;
import com.google.gson.JsonArray;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Iterator;

/**
 * Returns Clinic data as a JSON array, e.g. [{"lat": 38.4404675, "lng": -122.7144313}]
 */
@WebServlet("/clinics-data")
public class ClinicDataServlet extends HttpServlet {

  private static final String CLINIC_DATA_CSV = "./WEB-INF/clinics-data-with-header.csv";

  private JsonArray clinicArray;

  @Override
  public void init() {
    
    clinicArray = new JsonArray();
    Gson gson = new Gson();
    
    try {
            Reader reader = Files.newBufferedReader(Paths.get(CLINIC_DATA_CSV));
            
            CsvToBean<Clinic> csvToBean = new CsvToBeanBuilder<Clinic>(reader)
                    .withType(Clinic.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();
                    
            Iterator<Clinic> clinicIterator = csvToBean.iterator();

            while (clinicIterator.hasNext()) {
              Clinic clinic = clinicIterator.next();  
              clinicArray.add(gson.toJsonTree(clinic));
            }
        }
      catch (Exception IOException){
        System.out.println(IOException);
      }
    
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(clinicArray.toString());
  }

}