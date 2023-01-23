namespace StoelTest;

using theater_laak.Models;
using Xunit;

public class StoelTest {
    [Fact]
    public void StoelIsBechikbaarTest() {
        // Arrange
        var stoel = new Stoel { StoelId = 1, Tickets = new List<Ticket>() };
        var expected = true;
        var optreden = new Optreden { OptredenId = 1 };

        // Act
        var actual = stoel.IsBeschikbaar(optreden.OptredenId);

        // Assert
        Assert.True(expected == actual);
    }

    [Fact]
    public void StoelIsNietBechikbaarTest() {
        // Arrange
        var stoel = new Stoel { StoelId = 1, Tickets = new List<Ticket>() };
        var ticket = new Ticket { StoelId = stoel.StoelId };
        var optreden = new Optreden { OptredenId = 1 };
        ticket.OptredenId = optreden.OptredenId;

        var expected = false;
        stoel.Tickets.Add(ticket);

        // Act
        var actual = stoel.IsBeschikbaar(optreden.OptredenId);

        // Assert
        Assert.True(expected == actual);
    }
}