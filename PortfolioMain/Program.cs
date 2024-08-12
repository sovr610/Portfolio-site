using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.StaticFiles;
using portfolio.Logic;
using PortfolioMain.interfaces;

namespace PortfolioMain
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddSingleton<IApiHub, APIhub>();

            var provider = new FileExtensionContentTypeProvider();
            provider.Mappings.Add(".obj", "application/obj");
            provider.Mappings.Add(".mtl", "application/mtl");
            provider.Mappings.Add(".glb", "text/plain");
            provider.Mappings.Add(".gltf", "application/gltf");
            provider.Mappings.Add(".dae", "text/xml");
            provider.Mappings.Add(".ftl", "application/l10n");

            builder.Services.Configure<StaticFileOptions>(opt => { opt.ContentTypeProvider = provider; });

            builder.Services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;  // Enforce consent requirement
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.Lax;
                options.HttpOnly = Microsoft.AspNetCore.CookiePolicy.HttpOnlyPolicy.Always;
                options.Secure = Microsoft.AspNetCore.Http.CookieSecurePolicy.Always;  // If your site is entirely HTTPS
            });

            builder.Services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[]
                {
                "application/obj", "application/mtl", "text/plain", "application/gltf", "text/xml",
                "application/javascript", "text/css", "application/json", "application/xml", "text/html"
            });
            });

            builder.Services.AddServerSideBlazor();
            builder.Services.AddHttpClient();
            builder.Services.AddDistributedMemoryCache();

            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(240);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            builder.Services.AddSignalR(e => { e.MaximumReceiveMessageSize = 102400000; });

            //rootContent = builder.Environment.ContentRootPath;
            builder.Services.AddSeoTags(seoInfo =>
            {
                seoInfo.SetSiteInfo(
                    "Parker Bidigare - Portfolio Site",
                    "@ParkerBidigare", //optional
                    "https://www.facebook.com/parker.sovr/", //optional
                                                               //openSearchUrl: "https://site.com/open-search.xml",  //optional
                    robots: "index, follow" //optional
                );

                //optional
                /*seoInfo.AddFeed(
                    title: "Post Feeds",
                    url: "https://site.com/rss/",
                    feedType: FeedType.Rss);*/

                //optional
                //seoInfo.AddDnsPrefetch("https://fonts.gstatic.com/", "https://www.google-analytics.com");

                //optional
                /*seoInfo.AddPreload(new Preload("https://jarvishomeautomation.com/site.css"),
                    new Preload("https://jarvishomeautomation.com/app.js"),
                    new Preload("https://jarvishomeautomation.com/fonts/Font.woff2"),
                    new Preload("https://jarvishomeautomation.com/fonts/Font_Light.woff2"),
                    new Preload("https://jarvishomeautomation.com/fonts/Font_Medium.woff2"),
                    new Preload("https://jarvishomeautomation.com/fonts/Font_Bold.woff2"));*/

                //optional
                seoInfo.SetLocales("en_US");
            });


            var app = builder.Build();
            app.UseSession();
            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                if (context.Request.Path == "/" || context.Request.Path == "/home")
                {
                    context.Response.Redirect("/index.html");
                    return;
                }

                await next();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseResponseCompression();
            app.UseAuthorization();
            app.UseCookiePolicy();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            app.MapBlazorHub();
            app.Run();
        }
    }
}