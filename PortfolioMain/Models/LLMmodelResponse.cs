namespace PortfolioMain.Models
{

    public class ChatDTO
    {
        public Result result { get; set; }
    }

    public class Result
    {
        public Response response { get; set; }
        public Predictions predictions { get; set; }
        public Data data { get; set; }
        public object[] actions { get; set; }
    }

    public class Response
    {
        public string output { get; set; }
    }

    public class Predictions
    {
        public string phraseType { get; set; }
        public object areaType { get; set; }
        public string sentiment { get; set; }
    }

    public class Data
    {
        public string modelName { get; set; }
        public bool useVectorDB { get; set; }
    }


}
