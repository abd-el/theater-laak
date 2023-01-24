namespace PwnedPasswordsTest;

using theater_laak.Models;
using Xunit;

public class PwnedPasswordsTest {
    [Theory]
    [InlineData("123456")]
    [InlineData("password")]
    [InlineData("password123")]
    async public Task pwShouldBeBreachedTest(string wachtwoord){
        // Arrange
        var pwnedPasswords = new PwnedPasswords();
        var expected = true;

        // Act
        var actual = await pwnedPasswords.isPwBreached(wachtwoord);

        // Assert
        Assert.True(expected == actual);
    }

    [Theory]
    [InlineData("IUFHdgBYU*EFHBUfdYH$(T*F(*TGN$GN*(*EFHBUfdYH$($)NGIOU$NHG")]
    [InlineData("DKFJNIUWHsdfgFNU#WR(#*HFIENH(srN(#*HFIENFIJWIOFDMKMWEOIFN")]
    [InlineData("DOFNIUNEFsfIUNEI$UFU33499*EFHBUfdYH$(9ff13u3854@($(*#$*()")]
    async public Task pwShouldNotBeBreachedTest(string wachtwoord){
        // Arrange
        var pwnedPasswords = new PwnedPasswords();
        var expected = false;

        // Act
        var actual = await pwnedPasswords.isPwBreached(wachtwoord);

        // Assert
        Assert.True(expected == actual);
    }
}