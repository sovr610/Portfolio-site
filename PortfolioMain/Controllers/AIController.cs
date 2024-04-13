using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using portfolio.Logic;
using PortfolioMain.interfaces;
using PortfolioMain.Models;
using PortfolioMain.Models.Dto;

namespace PortfolioMain.Controllers
{
    public class AIController : Controller
    {
        private IApiHub hub;
        public AIController(IApiHub hub)
        {
            this.hub = hub;
        }

        [HttpPost]
        [Route("/langchain")]
        public async Task<IActionResult> getLLMlangchainResponse([FromBody] LLMrequestDto phrase)
        {
            var data = await hub.getOpenAIResponse(phrase.phrase);
            var response = JsonConvert.DeserializeObject<LLMmodelResponse>(data);
            return Ok(response);
        }

        [HttpPost]
        [Route("/nlp")]
        public async Task<IActionResult> getNLPresponse([FromBody] LLMrequestDto phrase)
        {
            var data = await hub.getNlpResponse(phrase.phrase);
            var response = JsonConvert.DeserializeObject<NlpBotResponse>(data);
            return Ok(response);
        }
    }
}
