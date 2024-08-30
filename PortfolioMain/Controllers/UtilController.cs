using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting.Internal;

namespace PortfolioMain.Controllers
{
    public class UtilController : Controller
    {

        private readonly string _connectionString;

        public UtilController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [Route("/brainjs-model")]
        [HttpGet]
        public IActionResult getModel()
        {
            string filePath = Environment.CurrentDirectory + "\\wwwroot\\models\\brainjs\\model.json";
            // Use System.IO to read the contents of the file
            string jsonData = "";
            if (System.IO.File.Exists(filePath))
            {
                jsonData = System.IO.File.ReadAllText(filePath);
                return Ok(jsonData);
            }

            return BadRequest();
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VisitData visitData)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var query = @"
                INSERT INTO UserVisits (UserId, Timestamp, UserAgent, Language, ScreenWidth, ScreenHeight)
                VALUES (@UserId, @Timestamp, @UserAgent, @Language, @ScreenWidth, @ScreenHeight)";

                using (var command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", visitData.UserId);
                    command.Parameters.AddWithValue("@Timestamp", visitData.Timestamp);
                    command.Parameters.AddWithValue("@UserAgent", visitData.UserAgent);
                    command.Parameters.AddWithValue("@Language", visitData.Language);
                    command.Parameters.AddWithValue("@ScreenWidth", visitData.ScreenWidth);
                    command.Parameters.AddWithValue("@ScreenHeight", visitData.ScreenHeight);

                    await command.ExecuteNonQueryAsync();
                }
            }

            return Ok(new { message = "Visit tracked successfully" });
        }
    }

    public class VisitData
    {
        public string UserId { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserAgent { get; set; }
        public string Language { get; set; }
        public int ScreenWidth { get; set; }
        public int ScreenHeight { get; set; }
    }
}

