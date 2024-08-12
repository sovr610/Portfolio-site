using Newtonsoft.Json;
using PortfolioMain.interfaces;
using PortfolioMain.Models;
using Serilog;
using System.Text;

namespace portfolio.Logic
{
    public class APIhub : IApiHub
    {
        private HttpClient HttpClient;

        public APIhub()
        {
            HttpClient = new HttpClient();
            HttpClient.BaseAddress = new Uri("http://162.255.87.173:3500");

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Information()
                .WriteTo.File("logs\\APIhub.txt")
                .CreateLogger();
        }

        public async Task<string> getOpenAIResponse(string prompt)
        {
            try
            {
                LLMmodel llm = new LLMmodel();
                llm.input = prompt;
                string data = JsonConvert.SerializeObject(llm);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                var response = HttpClient.PostAsync("/llm", content).Result;
                string results = await response.Content.ReadAsStringAsync();
                Log.Information("Got response from /llm: " + results);
                return results;
            }
            catch(Exception e)
            {
                Log.Error(e, "Open AI response issue");
                return "Error - " + e.Message;
            }
        }

        public async Task<string> getNlpResponse(string phrase)
        {
            try
            {
                LLMmodel llm = new LLMmodel();
                llm.input = phrase;
                string data = JsonConvert.SerializeObject(llm);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                var response = HttpClient.PostAsync("/nlp", content).Result;
                string results = await response.Content.ReadAsStringAsync();
                Log.Information("Got response from /nlp" + results);
                return results;
            }
            catch (Exception e)
            {
                Log.Error(e, "NLP response issue");
                return "Error - " + e.Message;
            }
        }
    }
}
