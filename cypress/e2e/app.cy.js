import credentials from "../credentials.json";
import { crearClienteFalso } from "../createRandomData";
const BASE_URL = "http://localhost:3001/";

describe("Login", () => {
	it("should login and redirect to base url", () => {
		// Start from the index page
		cy.visit("http://localhost:3001/");
		cy.get("a[href='/login']").click();
		cy.get("input[name='email']").type(credentials.adminCredentials.username);
		cy.get("input[name='password']").type(
			credentials.adminCredentials.password
		);
		cy.get("button[type='submit']").click();
		cy.url().should("eq", BASE_URL);
	});
});

//create a test to go to Clientes page but if the user is not logged in
//the user should be redirected to the login page
describe("Verify redirect when not user not logged in", () => {
	it("should be redirect to login page", () => {
		// Start from the index page
		cy.visit("http://localhost:3001/");
		cy.get("a[href='/login']").should("exist");
		cy.get("a[href='/clientes']").click();
		cy.url().should("include", "/login");
	});
});

describe("Verify errors display when triying to create an empty Cliente", () => {
	it("should display errors when creating a Cliente", () => {
		cy.visit("http://localhost:3001/");
		cy.get("a[href='/login']").click();
		cy.get("input[name='email']").type(credentials.adminCredentials.username);
		cy.get("input[name='password']").type(
			credentials.adminCredentials.password
		);
		cy.get("button[type='submit']").click();
		cy.url().should("eq", BASE_URL);
		cy.get("a[href='/clientes']").click();
		cy.url().should("include", "/clientes");
		cy.get("button", { timeout: 10000 }).contains("Nuevo +").click();
		cy.url().should("include", "/crearCliente");
		cy.get("button[type='submit']").click();
		cy.get("span").should("contain", "Nombre/Razón Social es requerido");
		cy.get("span").should("contain", "CUIT/CUIL es requerido");
		cy.get("span").should("contain", "La condición frente al iva es requerida");
		cy.get("span").should("contain", "Celular es requerido");
		cy.get("span").should("contain", "Localidad es requerida");
		cy.get("span").should("contain", "Calle es requerida");
	});
});

describe("Verify create cliente", () => {
	it("should create a cliente", () => {
		cy.visit("http://localhost:3001/");
		cy.get("a[href='/login']").click();
		cy.get("input[name='email']").type(credentials.adminCredentials.username);
		cy.get("input[name='password']").type(
			credentials.adminCredentials.password
		);
		cy.get("button[type='submit']").click();
		cy.url().should("eq", BASE_URL);
		cy.get("a[href='/clientes']").click();
		cy.url().should("include", "/clientes");
		cy.get("button", { timeout: 10000 }).contains("Nuevo +").click();
		cy.url().should("include", "/crearCliente");
		const clienteFalso = crearClienteFalso();
		cy.get("#nombre").type(clienteFalso.nombre_razon_social);
		cy.get("#cuit").type(clienteFalso.cuit);
		cy.get("#celular").type(clienteFalso.celular);
		cy.get("#mail").type(clienteFalso.email);
		cy.get("#iva").select(clienteFalso.condicion_iva);
		cy.get("#localidad").select(clienteFalso.domicilio.localidad);
		cy.get("#calle").type(clienteFalso.domicilio.calle);
		cy.get("#altura").type(clienteFalso.domicilio.altura);
		cy.get("#piso").type(clienteFalso.domicilio.piso);
		cy.get("#dpto").type(clienteFalso.domicilio.dpto);
		cy.get("#boton-enviar").click();
		cy.emitAsync("wait", 1000).then(() => {
			cy.url().should("include", "/clientes");
			cy.get("td").should("contain", clienteFalso.nombre_razon_social);
			cy.get("td").should("contain", clienteFalso.celular);
			cy.get("td").should("contain", clienteFalso.email);
			cy.get("a[href='/clientes/" + clienteFalso.cuit + "']").click();
			cy.url().should("include", "/clientes/" + clienteFalso.cuit);
			cy.get("span").should("contain", clienteFalso.nombre_razon_social);
			cy.get("span").should("contain", clienteFalso.celular);
			cy.get("span").should("contain", clienteFalso.email);
			cy.get("span")
				.should("contain", clienteFalso.domicilio.calle)
				.should("contain", clienteFalso.domicilio.altura)
				.should("contain", clienteFalso.domicilio.piso)
				.should("contain", clienteFalso.domicilio.dpto);
			cy.get("span").should("contain", clienteFalso.domicilio.localidad);
		});
	});
});
