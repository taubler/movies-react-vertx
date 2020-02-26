package com.me;

import io.vertx.core.AbstractVerticle;

public class Main extends AbstractVerticle {
	
	public void start() throws Exception {
		System.out.println("Movie app starting...");
		new AppServer().run(vertx);
	}

}
