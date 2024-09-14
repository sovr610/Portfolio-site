namespace PortfolioMain.Models
{
    public class LLMmodel
    {
        public string Phrase { get; set; }
        public string ModalFile { get; set; }
        public string LlmName { get; set; }
        public List<string> LlmTraits { get; set; } // Assuming traits is an array of strings
        public string LlmBackground { get; set; }
        public bool LlmLangToogle { get; set; }
        public bool ClassificationActive { get; set; }
    }
}
