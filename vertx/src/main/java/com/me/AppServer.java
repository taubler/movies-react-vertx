package com.me;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.StaticHandler;

public class AppServer {

	private final Logger LOGGER = LoggerFactory.getLogger( AppServer.class );

	public void run(Vertx vertx) {
		HttpServer server = vertx.createHttpServer();

		Router router = Router.router(vertx);

		//http://localhost:32464/get
		router.get("/movie").handler(ctx -> {
			LOGGER.info("Will get movie");
			//TODO 
			
		});
		
		router.post("/movie").handler(ctx -> {
//			JsonObject json = ctx.getBodyAsJson();
			LOGGER.info("Will post movie");
		});

		router.get().handler(StaticHandler.create());

		server.requestHandler(router).listen(80, http -> {
			if (http.succeeded()) {
				LOGGER.info("MovieApp HTTP server started on port 80");
			} else {
				LOGGER.info("MovieApp HTTP server failed to start");
			}
		});

	}

}