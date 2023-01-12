using Microsoft.AspNetCore.Mvc;

namespace theater_laak.Controllers;

[Route("api/[controller]")]
[ApiController]
public class IpBlockController : ControllerBase
{
    [HttpGet]
    [Route("unblocked")]
    public string Unblocked()
    {
        return "Unblocked access";
    }

    [HttpGet("blocked")]
    public string Blocked()
    {
        return "Blocked access";
    }

}