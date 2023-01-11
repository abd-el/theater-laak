using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using theater_laak.Data;
using theater_laak.Models;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace theater_laak.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ZaalController : ControllerBase {
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public ZaalController(ApplicationDbContext c, UserManager<ApplicationUser> p)
    {
        _context = c;
        _userManager = p;
    }

    [HttpGet]
    [Route("GetZalen")]
    public async Task<ActionResult> GetZalen(){
        var zalen = await _context.Zalen
            .Include(z => z.Stoelen)
            .ToListAsync();

        return Ok(zalen);
    }
}