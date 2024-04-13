namespace PortfolioMain.Models
{
    public class LLMmodelResponse
    {
        public Result result { get; set; }
    }

    public class Result
    {
        public string input { get; set; }
        public string output { get; set; }
    }

}
