package com.google.codeu.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

/**
 * Returns UFO data as a JSON array, e.g. [{"lat": 38.4404675, "lng": -122.7144313}]
 */
@WebServlet("/clinics-data")
public class ClinicDataServlet extends HttpServlet {

  // Class constant for regex
  private static final String SPLIT_REGEX_PATTERN = ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)"; 

  private JsonArray clinicArray;

  @Override
  public void init() {
    clinicArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/clinics-data.csv"));
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(SPLIT_REGEX_PATTERN, -1);
      
      // Initializes to a default value in case the data is faulty
      double lat = 0.0;
      double lng = 0.0;
      String title = "";
      String address = "";
      String phoneNum = "";
      String [] services = new String[1];

      // Implements checks on input data
      if (cells.length >= 2) {
        lat = Double.parseDouble(cells[0]);
        lng = Double.parseDouble(cells[1]);
      
        // Add Title
        if (cells.length >= 3) {
          title = cells[2];
        }

        // Add Description
        if (cells.length >= 4) {
          address = cells[3];

          // Get rid of quotes
          if (address.charAt(0)=='\"') {
            address = address.substring(1, address.length() - 1);
          }
        }
        System.out.println(address);
        if (cells.length >= 5) {
          phoneNum = cells[4];
        }

        if (cells.length >= 6) {
          // Get rid of quotes
          line = cells[5];
          line = line.substring(1, (line.length() - 1));  
          services = line.split(";");
        }
        
    }
 
    clinicArray.add(gson.toJsonTree(new Clinic(lat, lng, title, address, phoneNum, services)));
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(clinicArray.toString());
  }

  // This class could be its own file if we needed it outside this servlet
  private static class Clinic {
    double lat;
    double lng;
    String title;
    String address;
    String phoneNum; 
    String[] services;

    private Clinic(double lat, double lng, String title, String address, String phoneNum, 
                    String [] services) {
      this.lat = lat;
      this.lng = lng;
      this.title = title;
      this.address = address;
      this.phoneNum = phoneNum;
      this.services = services;
    }
  }
}