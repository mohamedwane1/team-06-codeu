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

@WebServlet("/procedureChart")
public class ProcedureServlet extends HttpServlet {
	private JsonArray procedureArray = new JsonArray();
	//this class could be its own file if we needed outside the servlet
	private class procedure {
		String procedure;
		String weeksOfPregnancy;
		
		private procedure(String procedure, String weeksOfPregnancy) {
			this.procedure = procedure;
			this.weeksOfPregnancy = weeksOfPregnancy;
		}
	}
	
	@Override
	public void init() {
		procedureArray = new JsonArray();
		Gson gson = new Gson();
		Scanner scanner = new Scanner(getServletContext().
				getResourceAsStream("WEB_INF/procedures.csv"));
		scanner.nextLine(); //skips header of csv file
		while(scanner.hasNextLine()) {
			String line = scanner.nextLine();
			String[] cells = line.split(",");
			String curProcedure = cells[1];
			String curWeeks = cells[5];
			procedureArray.add(gson.toJsonTree(new procedure(curProcedure, curWeeks)));
		}
		scanner.close();
	}
	
	@Override
	public void doGet(HttpServletRequest request,
			  HttpServletResponse response) throws IOException {
			    response.setContentType("application/json");
			    response.getOutputStream().println(procedureArray.toString());
			  }


	
}