use actix_web::{web, App, HttpServer, HttpRequest, HttpResponse, Responder};
use actix_cors::Cors;
use reqwest;

async fn index(req: HttpRequest) -> impl Responder {
    let url_string = &req.uri().to_string()[6..];
    println!("URL: {}", url_string);

    let body = reqwest::get(url_string).await.unwrap().text().await.unwrap();
    HttpResponse::Ok().body(body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new()
            .wrap(Cors::permissive())
            .service(web::resource("/cors/{tail:.*}").to(index))
            .service(actix_files::Files::new("/", "../frontend/dist").index_file("index.html"))
    ).bind("0.0.0.0:4040")?.run().await
}
