package com.google.codeu.servlets;

import java.io.IOException;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import java.util.Scanner;

@WebServlet("/costChart")
 public class CostServlet extends HttpServlet {
  private JsonArray costArray;
  //This class could be its own file if we needed it outside this servlet
  private static class cost{ 
    String procedure;
    int cost;

    private cost (String procedure, int cost) {
      this.procedure =  procedure;
      this.cost = cost;
    }
  }

  @Override
  public void init() {
    costArray = new JsonArray();
    Gson gson = new Gson();
    Scanner scanner = new Scanner(getServletContext().
    getResourceAsStream("/WEB-INF/procedures.csv")); //sets scanner on csv file
    scanner.nextLine(); //skips first line (the  csv header)
    while(scanner.hasNextLine()) {
      String line = scanner.nextLine();
      String[] cells = line.split(",");
      String curProcedure = cells[1];
      int curCost = Integer.parseInt(cells[2]);
      costArray.add(gson.toJsonTree(new cost(curProcedure, curCost))); //adds each piece of data to the JsonArray
    }
    scanner.close();
  }

  @Override
  public void doGet(HttpServletRequest request,
  HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    response.getOutputStream().println(costArray.toString());
  }



}
