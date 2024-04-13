using System.Text.Json;

namespace portfolio.Logic
{
    public static class ViteHelper
    {
        private static readonly string manifestPath = "wwwroot/dist/.vite/manifest.json";

        public static string GetScriptTag(string entryFileName)
        {
            try
            {
                var manifest = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(
                    File.ReadAllText(manifestPath));

                if (manifest.TryGetValue(entryFileName, out var entry))
                {
                    var src = entry.GetProperty("file").GetString();
                    // Assuming the build files are in wwwroot/dist
                    return $"/dist/{src}";
                }

                return string.Empty; // Or throw an exception if you prefer
            } catch (Exception i)
            {
                return string.Empty;
            }
        }
    }
}
