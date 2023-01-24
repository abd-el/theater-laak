namespace WoordenboekTest;

using theater_laak.Models;
using Xunit;

public class WoordenboekTest {
    [Theory]
    [InlineData("Stoel")]
    [InlineData("Tafel")]
    [InlineData("Kast")]
    public void stringBevatWoordTest(string woord){
        // Arrange
        var woordenBoek = new Woordenboek();
        var expected = true;

        // Act
        var actual = woordenBoek.stringBevatWoord(woord, 4);

        // Assert
        Assert.True(expected == actual);
    }

    [Theory]
    [InlineData("sj&{RF%uWRUd)=*#")]
    [InlineData("sdfgdfgdfgdfgdfg")]
    [InlineData("****************")]
    public void stringBevatWoordNietTest(string woord){
        // Arrange
        var woordenBoek = new Woordenboek();
        var expected = false;

        // Act
        var actual = woordenBoek.stringBevatWoord(woord, 4);

        // Assert
        Assert.True(expected == actual);
    }
}