using EmpregIn.Service;
using FirebaseAdmin;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<FirebaseService>();
builder.Services.AddSingleton<BfsService>();

Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"C:/Credencial/empregin-c82cb-firebase-adminsdk-t6hdk-b9d5c899d9.json");
builder.Services.AddSingleton(FirebaseApp.Create());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();