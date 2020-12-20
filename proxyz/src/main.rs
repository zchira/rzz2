use actix_web::{web, App, HttpServer, HttpRequest, HttpResponse, Responder};
// use actix_web::client::{Client, ClientBuilder};
// use url::{Url, ParseError};
use reqwest;

// #[get("/url/{tail:.*}")]
async fn index(req: HttpRequest) -> impl Responder {
    let url_string = &req.uri().to_string()[6..]; // Url::parse(&url.to_string()).unwrap();
    println!("__URL: {}", url_string);

    // let client = ClientBuilder::new().max_redirects(10).finish();
    // let response = client.get(url_string).send().await;
    let body = reqwest::get(url_string).await.unwrap().text().await.unwrap();
    HttpResponse::Ok().body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
        .service(web::resource("/cors/{tail:.*}").to(index))
        .service(actix_files::Files::new("/", "../frontend/dist").index_file("index.html"))
        )
    .bind("0.0.0.0:4040")?
        .run()
        .await
}
