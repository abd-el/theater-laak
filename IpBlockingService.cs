using System.Net;

namespace theater_laak;

public class IpBlockingService: IIpBlockingService
{
    private readonly List<string> _blockedIps;

    public IpBlockingService(IConfiguration configuration)
    {
        var blockedIps = configuration.GetValue<string>("BlockedIPs");
        _blockedIps = blockedIps.Split(',').ToList();
    }

    public bool IsBlocked(IPAddress ipAddress) => _blockedIps.Contains(ipAddress.ToString());

}