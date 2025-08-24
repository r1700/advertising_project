using Microsoft.EntityFrameworkCore;
using DAL;
using BLL;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<AdvertisingDb>(o => o.UseLazyLoadingProxies().UseSqlServer
(builder.Configuration.GetConnectionString("SqlServer")));

builder.Services.AddScoped<IRepositoryUser<Users>, UserRepository>();
builder.Services.AddScoped<IRepository<Users>, UserRepository>();
builder.Services.AddScoped<IRepository<Products>, ProductRepository>();
builder.Services.AddScoped<IRepository<Purchase>, PurchaseRepository>();
builder.Services.AddScoped<IRepositoryByUser<Purchase>, PurchaseRepository>();
builder.Services.AddScoped<IRepositoryByUser<Realization>, RealizationRepository>();
builder.Services.AddScoped<IRepository<Realization>, RealizationRepository>();
builder.Services.AddScoped<IRepository<SubScriptions>, SubScriptionsRepository>();

builder.Services.AddCors(option =>
{
    option.AddDefaultPolicy(
        builder =>
        {
        builder.
        AllowAnyOrigin().
        AllowAnyMethod().
        AllowAnyHeader();
    }
    );
});
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new
    SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryveryverysecret...................................................")),
        ValidateAudience = false,
        ValidateIssuer = false,
        ClockSkew = TimeSpan.Zero
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
