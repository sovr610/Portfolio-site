using JarvisHomeCloud.Server.Logic;
using JarvisMainSite.Models;
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
        private static TTSconfig tts;
        private readonly IHostEnvironment _env;
        public AIController(IApiHub hub, IHostEnvironment env)
        {
            this.hub = hub;
            _env = env;
            tts = new TTSconfig(_env.ContentRootPath);
            tts.setBaseUrl("https://68.43.184.101:5007");
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

        [Route("TTS")]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult TTSconvert(string model)
        {
            try
            {

                var say = model;
                var tempFile = tts.assignFile();
                var tempDir = Path.GetTempFileName();//Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD\\voice_" +
                                                     //tempFile + ".mp3";
                var blob = tts.getTTS(say, tempFile);

                var bits = System.IO.File.ReadAllBytes(blob);
                System.IO.File.Delete(tempDir);
                var dat = Convert.ToBase64String(bits, 0, bits.Length);
                var returns = new TTSmodel();
                returns.data = dat;
                return Ok(returns);
            }
            catch (Exception i)
            {
                Log.Error("Error with TTS", i);
                return BadRequest(i);
            }
        }
    }
}
