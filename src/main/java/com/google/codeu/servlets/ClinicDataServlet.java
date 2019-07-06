package com.google.codeu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvBindByName;
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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Scanner;

/**
 * Returns UFO data as a JSON array, e.g. [{"lat": 38.4404675, "lng": -122.7144313}]
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
                    
            //Iterator<Clinic> clinicIterator = csvToBean.iterator();
            //System.out.println("hello");
            //System.out.println("2");
            while (csvToBean.iterator().hasNext()) {
              System.out.println("hello");
              Clinic clinic = csvToBean.iterator().next();
              System.out.println("anything");
              System.out.println(clinic.title);
              
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

  // This class could be its own file if we needed it outside this servlet
  public class Clinic {
    @CsvBindByName
    private double lat;
    @CsvBindByName
    private double lng;
    @CsvBindByName
    private String title;
    @CsvBindByName
    private String address;
    @CsvBindByName
    private String phoneNum; 
    @CsvBindByName
    private String services;

    private Clinic(double lat, double lng, String title, String address, String phoneNum, 
                    String services) {
      this.lat = lat;
      this.lng = lng;
      this.title = title;
      this.address = address;
      this.phoneNum = phoneNum;
      this.services = services;
    }
  }
}