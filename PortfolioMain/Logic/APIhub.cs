using Newtonsoft.Json;
using PortfolioMain.interfaces;
using PortfolioMain.Models;
using System.Text;

namespace portfolio.Logic
{
    public class APIhub : IApiHub
    {
        private HttpClient HttpClient;

        public APIhub()
        {
            HttpClient = new HttpClient();
            HttpClient.BaseAddress = new Uri("http://localhost:3500");
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
                return await response.Content.ReadAsStringAsync();
            }
            catch(Exception e)
            {
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
                return await response.Content.ReadAsStringAsync();
            }
            catch (Exception e)
            {
                return "Error - " + e.Message;
            }
        }
    }
}
