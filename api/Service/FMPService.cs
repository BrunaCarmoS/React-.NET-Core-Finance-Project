using api.Interfaces;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;

        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var apiKey = _config["FinnhubKey"];
                var result = await _httpClient.GetAsync(
                    $"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={apiKey}"
                );

                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var profile = JsonConvert.DeserializeObject<dynamic>(content);

                    if (profile == null || profile.name == null)
                        return null;

                    return new Stock
                    {
                        Symbol = profile.ticker ?? symbol,
                        CompanyName = profile.name,
                        Industry = profile.finnhubIndustry ?? "",
                        Purchase = 0,
                        LastDiv = 0,
                        MarketCap = (long)(profile.marketCapitalization ?? 0),
                    };
                }

                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}