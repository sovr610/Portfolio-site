using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using portfolio.Logic;
using PortfolioMain.interfaces;
using PortfolioMain.Models;
using PortfolioMain.Models.Dto;
using Serilog;

namespace PortfolioMain.Controllers
{
    public class AIController : Controller
    {
        private IApiHub hub;
        public AIController(IApiHub hub)
        {
            this.hub = hub;

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.File("logs\\Portfolio-API-Controller.txt")
                .CreateLogger();
        }

        [HttpPost]
        [Route("/langchain")]
        public async Task<IActionResult> getLLMlangchainResponse([FromBody] LLMrequestDto phrase)
        {
            try
            {
                var data = await hub.getOpenAIResponse(phrase.phrase);
                var response = JsonConvert.DeserializeObject<ChatDTO>(data);
                return Ok(response);
            }
            catch(Exception ex)
            {
                Log.Error(ex, "Error getting langcjain data");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("/nlp")]
        public async Task<IActionResult> getNLPresponse([FromBody] LLMrequestDto phrase)
        {
            try
            {
                var data = await hub.getNlpResponse(phrase.phrase);
                var response = JsonConvert.DeserializeObject<NlpBotResponse>(data);
                return Ok(response);
            } catch(Exception ex)
            {
                Log.Error(ex, "Error getting NLP response");
                return BadRequest(ex.Message);
            }
        }
    }
}
