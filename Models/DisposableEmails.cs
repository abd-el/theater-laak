namespace theater_laak.Models;

public class ApiResponse
{
    public bool disposable {get;set;}
}

public class DisposableEmails
{
    private static readonly HttpClient client = new HttpClient();

    public async Task<bool> CheckEmail(string email)
    {   bool IsDisposable = false;

        try
        {
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri("https://open.kickbox.com/v1/disposable/");
            }
            HttpResponseMessage resp = await client.GetAsync(email);

            if (resp.IsSuccessStatusCode)
            {   
                 var json = await resp.Content.ReadFromJsonAsync<ApiResponse>();
                 IsDisposable = json.disposable;
            }
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine("\nException Caught!");
            Console.WriteLine("Message :{0} ", e.Message);
            throw e;
        }

        return IsDisposable;
    }
}