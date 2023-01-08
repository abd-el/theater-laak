namespace theater_laak.Models;
using System.Text;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Security.Cryptography;


public class PwnedPasswords
{
    
    static HttpClient client = new HttpClient(); 


    private string toSHA1(string input)
    {
        using var sha1 = SHA1.Create();
        byte[] bytes = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));

        var sb = new StringBuilder();
        for (int i = 0; i < bytes.Length; i++)
        {
            sb.Append(bytes[i].ToString("x2"));
        }
        return sb.ToString();
    }


    public async Task<bool> isPwBreached(string wachtwoord)
    {   
        string HashedWachtwoord = toSHA1(wachtwoord);
        Console.WriteLine(HashedWachtwoord);
        string eerste5Hash = HashedWachtwoord.Substring(0,5);

        string url = "https://api.pwnedpasswords.com/range/";

        var request = new HttpRequestMessage(HttpMethod.Get,
        "https://api.pwnedpasswords.com/range/" + eerste5Hash);

        HttpResponseMessage response = await client.SendAsync(request);
    
        var hashes = "";

        if(response.IsSuccessStatusCode)
        {
            hashes = await response.Content.ReadAsStringAsync();
        }

        var hashesList = hashes.Split("\n").ToList();
        Dictionary<string, string> hashesDictionary = new Dictionary<string, string>();
        
        foreach (string hash in hashesList)
        {
            var substrings = hash.Split(":");
            hashesDictionary.Add(substrings[0], substrings[1]);
        }

        string overgeblevenHash = HashedWachtwoord.Substring(5, 35);
        bool isPasswordBreached = hashesDictionary.ContainsKey(overgeblevenHash.ToUpper());
        Console.WriteLine(isPasswordBreached);
        return isPasswordBreached;
    }

}

