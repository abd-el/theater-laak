namespace ZaalTest;

using theater_laak.Models;
using Xunit;

public class ZaalTest {
    [Fact]
    public void AddRijTest() {
        // Arrange
        var zaal = new Zaal();
        var aantalStoelen = 10;
        var rang = 1;
        var rij = 1;

        var expectedAantalStoelen = 10;
        
        // Act
        zaal.AddRij(aantalStoelen, rang, rij);
        var actualAantalStoelen = zaal.Stoelen.Count;

        // Assert
        Assert.Equal(expectedAantalStoelen, actualAantalStoelen);
    }

    [Fact]
    public void AddRangTest() {
        // Arrange
        var zaal = new Zaal();
        var aantalStoelen = 10;
        var aantalRijen = 2;
        var rang = 1;

        var expectedAantalStoelen = 10;
        
        // Act
        zaal.AddRang(aantalStoelen, aantalRijen, rang);
        var actualAantalStoelen = zaal.Stoelen.Count;

        // Assert
        Assert.Equal(expectedAantalStoelen, actualAantalStoelen);
    }
}