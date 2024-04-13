namespace PortfolioMain.interfaces
{
    public interface IApiHub
    {
        public Task<string> getOpenAIResponse(string prompt);
        public Task<string> getNlpResponse(string phrase);
    }
}
