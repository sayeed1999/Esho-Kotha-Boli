using Data_Access_Layer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Repository_Layer.DerivedRepositories.PostRepository;
using Repository_Layer.DerivedRepositories.PostSummaryRepository;
using Repository_Layer.DerivedRepositories.CommentRepository;
using Repository_Layer.DerivedRepositories.ReplyRepository;
using Repository_Layer.GenericRepository;
using Repository_Layer.UnitOfWork;
using Service_Layer.PostService;
using Service_Layer.CommentService;
using Service_Layer.ReplyService;
using API_Layer.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Entity_Layer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Repository_Layer.DerivedRepositories.ImageRepository;
using Service_Layer.ImageService;
using Repository_Layer.DerivedRepositories.ProfilePictureRepository;
using Service_Layer.ProfilePictureService;
using Repository_Layer.DerivedRepositories.UserRepository;
using Service_Layer.UserService;

namespace API_Layer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Injecting AppSettings written in appsettings.json file.
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));

            // Configure in-memory caching.
            // services.AddMemoryCache(); // no need anymore!!
            services.AddSingleton<InMemoryCaching>();

            // Injecting the SQL Server ConnectionString.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration["AppSettings:ConnectionString"].ToString()));

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithOrigins(Configuration["AppSettings:ClientURL"].ToString());
            }));

            services.AddSignalR();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API_Layer", Version = "v1" });
            });

            services.AddControllers().AddNewtonsoftJson(options => {
                // Camelcase property names resolved into Pascal case when comes from frontend/postman/swagger
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                // Reference cycle loop resolved
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.Configure<IdentityOptions>(options => 
            {
                // this setup is needed to retrieve userId from User.Identity when the project is running!
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
            });

            // Disable automatic 400 response
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Util for ControllerBase
            services.AddScoped(typeof(Util<>));

            // UnitOfWork
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            // ApplicationDbContext
            services.AddScoped<ApplicationDbContext>();

            // GenericRepository
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // DerivedRepositories
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostSummaryRepository, PostSummaryRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IReplyRepository, ReplyRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<IProfilePictureRepository, ProfilePictureRepository>();
            services.AddScoped<IUserRepository, UserRepository>();

            // Services
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IReplyService, ReplyService>();
            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IProfilePictureService, ProfilePictureService>();
            services.AddScoped<IUserService, UserService>();

            // Registering Identity Services
            services.AddIdentity<User, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 5;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredUniqueChars = 2;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();

            // Integrating JWT
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new()
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = Configuration["JWTSettings:validIssuer"],
                    ValidAudience = Configuration["JWTSettings:validAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTSettings:securityKey"]))
                };
            });

            // Register JwtHandler class
            services.AddScoped<JwtHandler>();


            // Global Authorize() filter starts...
            var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();

            services.AddMvc(op =>
            {
                op.Filters.Add(new AuthorizeFilter(policy));
            });
            // Global Authorize() filter ends...

            // Register IHttpContextAccessor
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API_Layer v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
