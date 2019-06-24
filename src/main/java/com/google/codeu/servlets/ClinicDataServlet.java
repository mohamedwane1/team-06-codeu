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

  private JsonArray clinicArray;

  @Override
  public void init() {
    clinicArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream("/WEB-INF/clinics-data.csv"));
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String regex = ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)";
      String[] cells = line.split(regex, -1);
      
      // Initializes to a default value in case the data is faulty
      double lat = 0.0;
      double lng = 0.0;
      String title = "";
      String description = "";
      
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
          description = title + ": \n \n" + cells[3];
        }
    }


      clinicArray.add(gson.toJsonTree(new Clinic(lat, lng, title, description)));
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
    String description;

    private Clinic(double lat, double lng, String title, String description) {
      this.lat = lat;
      this.lng = lng;
      this.title = title;
      this.description = description;
    }
  }
}