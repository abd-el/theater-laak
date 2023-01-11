using System.Net;

namespace theater_laak;

public interface IIpBlockingService
{
    bool IsBlocked(IPAddress ipAddress);
}