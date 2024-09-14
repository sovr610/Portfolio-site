using Newtonsoft.Json;
using System.Net;
using System.Text;

namespace JarvisHomeCloud.Server.Logic;

public class TTSconfig
{
    private string baseUrl = "http://68.43.184.101:5002"; //"/api/tts?text=";
    private string contentBaseRoot;
    private readonly string localbaseUrl = "http://localhost:5002"; //"/api/tts?text=";

    public TTSconfig(string contentBaseRoot)
    {
        if (!Directory.Exists(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD"))
            Directory.CreateDirectory(
                Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD");
        this.contentBaseRoot = contentBaseRoot;
    }


    public void setBaseUrl(string url)
    {
        baseUrl = url;
    }

    public void setDebugMode(bool mode)
    {
        if (mode) baseUrl = localbaseUrl;
    }

    public string getBaseUrl()
    {
        return baseUrl;
    }

    /// <summary>
    ///     Get the mp3 file from converting  the text to speech
    /// </summary>
    /// <param name="text">the phrase to convert to speech</param>
    /// <param name="fileId">a unique string for naming</param>
    /// <returns>boolean for success</returns>
    public string getTTS(string text, string fileId)
    {
        try
        {
            var handler = new HttpClientHandler();
            handler.ServerCertificateCustomValidationCallback = (message, cert, chain, sslPolicyErrors) => true;


            var client = new HttpClient(handler);
            client.Timeout = TimeSpan.FromMinutes(10);
            client.BaseAddress = new Uri(baseUrl);

            var a = new { text = text };
            string jsonDat = JsonConvert.SerializeObject(a);

            var content = new StringContent(jsonDat, Encoding.UTF8, "application/json");
            /*Uri url = new Uri(baseUrl + "/api/tts");
            WebRequest client = (HttpWebRequest)WebRequest.Create(url);
            client.ContentType = "application/json";
            client.Method = "POST";
            using (StreamWriter writer = new StreamWriter(client.GetRequestStream()))
            {

            }*/
            //client.DefaultRequestHeaders.Add("text", text);
            var data = client.PostAsync("/api/tts", content).Result;

            if (data.IsSuccessStatusCode)
            {
                var aud_dat = data.Content.ReadAsByteArrayAsync().Result;
                
                //string path = HttpContext.Current.Server.MapPath("~/PAD/");
                File.WriteAllBytes(
                    Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD\\voice_" + fileId +
                    ".mp3",
                    aud_dat);

                // File.WriteAllBytes(path + "/voice_" + fileId + ".mp3", aud_dat);
                return Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD\\voice_" + fileId +
                    ".mp3";
            }

            return null;
            //webClient.DownloadFile("/api/tts?text=" + WebUtility.UrlEncode(text), Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + "\\PAD\\voice.mp3");
            //var data = webClient.DownloadData("/api/tts?text=" + WebUtility.UrlEncode(text));
        }
        catch (Exception i)
        {
            Console.WriteLine(i);

            return null;
        }
    }


    /// <summary>
    ///     Used to assign a random string for unique naming to temp mp3 file from PAD's TTS
    /// </summary>
    /// <returns></returns>
    public string assignFile()
    {
        var length = 15;

        // creating a StringBuilder object()
        var str_build = new StringBuilder();
        var random = new Random();

        char letter;

        for (var i = 0; i < length; i++)
        {
            var flt = random.NextDouble();
            var shift = Convert.ToInt32(Math.Floor(25 * flt));
            letter = Convert.ToChar(shift + 65);
            str_build.Append(letter);
        }

        Console.WriteLine(str_build.ToString());
        return str_build.ToString();
    }

    /// <summary>
    ///     Used to delete the temp audio file when using TTS for PAD.
    /// </summary>
    /// <param name="fileName">The temp mp3 file</param>
    /// <returns>boolean if successful</returns>
    public bool deleteFile(string fileName)
    {
        try
        {
            if (File.Exists(fileName)) File.Delete(fileName);
            return true;
        }
        catch (Exception i)
        {
            return false;
        }
    }
}