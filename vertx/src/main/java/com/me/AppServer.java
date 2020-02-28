package com.me;

import java.util.UUID;

import org.apache.commons.lang3.StringUtils;

import io.vertx.core.Vertx;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.Json;
import io.vertx.core.logging.Logger;
import io.vertx.core.logging.LoggerFactory;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

public class AppServer {

    private final Logger LOGGER = LoggerFactory.getLogger( AppServer.class );

    public void run(Vertx vertx) {
        HttpServer server = vertx.createHttpServer();

        Router router = Router.router(vertx);

        router.get("/movie").handler(ctx -> {
            HttpServerResponse resp = ctx.response();
            resp.end("No movies!"); 
        });
        
        router.post("/movie").handler(ctx -> postMovie(ctx, vertx));

        server.requestHandler(router).listen(80, http -> {
            if (http.succeeded()) {
                LOGGER.info("MovieApp HTTP server started on port 80");
            } else {
                LOGGER.info("MovieApp HTTP server failed to start");
            }
        });

    }
    
    private void postMovie(RoutingContext ctx, Vertx vertx) {
    	final Movie movie = Json.decodeValue(ctx.getBodyAsString(), Movie.class);
    	if (StringUtils.isEmpty(movie.getGenre()) || StringUtils.isEmpty(movie.getTitle())) {
    		ctx.response().setStatusCode(400).end();
    	}
    	//TODO below, do that on the "database" end
//    	movie.setGuid(UUID.randomUUID());
    	vertx.eventBus().request("service.movie-add", Json.encode(movie), res -> {
    		if ( res.succeeded() ) {
    			ctx.response()
    			.putHeader("content-type", "application/json")
    			.end( res.result().body().toString() );
    		} else {
    			ctx.fail( res.cause() );
    		}
    	});
    }
    
    /*
     * Receiver must explicitly reply, like:
     * private void handleEventBusResponse( AsyncResult<Message<Object>> res, RoutingContext ctx ) {
		if ( res.succeeded() ) {
			ctx.response().end( res.result().body().toString() );
		} else {
			ctx.fail( res.cause() );
		}
		res.result().reply("ok");
	}
     */

}