using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting.Internal;

namespace PortfolioMain.Controllers
{
    public class UtilController : Controller
    {
        public UtilController() { }

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
    }
}
